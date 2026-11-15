import { bus as defaultBus } from '../events.js';
import { createInitialState, normalizeState, HISTORY_LIMIT } from '../storage/save.js';

/**
 * Safe AST condition evaluator (no eval).
 * Supports { op: 'eq'|'ne'|'and'|'or'|'not', left, right } where operands are literals or { var: name }.
 */
export function evaluateOperand(operand, variables = {}) {
  if (operand && typeof operand === 'object' && 'var' in operand) {
    return variables[operand.var];
  }
  return operand;
}

export function evaluateCondition(condition, variables = {}) {
  if (!condition) return true;
  if (typeof condition === 'boolean') return condition;
  const { op, left, right } = condition;
  switch (op) {
    case 'eq':
      return evaluateOperand(left, variables) === evaluateOperand(right, variables);
    case 'ne':
      return evaluateOperand(left, variables) !== evaluateOperand(right, variables);
    case 'and':
      return Boolean(evaluateCondition(left, variables) && evaluateCondition(right, variables));
    case 'or':
      return Boolean(evaluateCondition(left, variables) || evaluateCondition(right, variables));
    case 'not':
      return !evaluateCondition(left !== undefined ? left : right, variables);
    default:
      return true;
  }
}

export function applyEffects(effects = [], variables = {}) {
  const nextVars = { ...variables };
  if (!Array.isArray(effects)) return nextVars;
  for (const eff of effects) {
    if (eff && typeof eff.variable === 'string' && eff.variable in nextVars) {
      nextVars[eff.variable] = eff.value;
    }
  }
  return nextVars;
}

/**
 * DEBUG-STUB: Built-in M1 showcase scene to test thought styles (azalia/theo/malfoy),
 * author narration without speaker name, and vertical choice buttons before Scene 2-10 are added in M2.
 * Does not modify src/data/story/scene01.js.
 */
export const M1_DEMO_SCENE = {
  schemaVersion: 1,
  id: 'm1_demo',
  start: 'm1_demo_enter',
  nodes: [
    {
      id: 'm1_demo_enter',
      type: 'scene',
      action: 'enter',
      background: 'bg_train',
      characters: ['azalia', 'theo', 'malfoy'],
      next: 'm1_demo_narration',
    },
    {
      id: 'm1_demo_narration',
      type: 'narration',
      text: 'За окном поезда проплывают зелёные холмы и каменный виадук. Это проверочный экран этапа M1 (DEBUG-STUB до M2) для демонстрации авторского текста, мыслей героев и меню выбора.',
      next: 'm1_demo_thought_azalia',
    },
    {
      id: 'm1_demo_thought_azalia',
      type: 'thought',
      speaker: 'azalia',
      text: '«Главное — сохранять спокойствие и не поддаваться на провокации в первый же день…»',
      next: 'm1_demo_thought_theo',
    },
    {
      id: 'm1_demo_thought_theo',
      type: 'thought',
      speaker: 'theo',
      text: '«Интересно, на какой факультет нас распределит Шляпа? Только бы не скучать!»',
      next: 'm1_demo_thought_malfoy',
    },
    {
      id: 'm1_demo_thought_malfoy',
      type: 'thought',
      speaker: 'malfoy',
      text: '«Посмотрим, чего стоят эти Блэки на самом деле…»',
      next: 'm1_demo_choice',
    },
    {
      id: 'm1_demo_choice',
      type: 'choice',
      text: 'Выберите действие (проверка вертикальных кнопок выбора M1):',
      options: [
        {
          id: 'm1_opt_restart_s01',
          text: 'Вернуться в начало Сцены 1 (Особняк Блэков)',
          effects: [],
          next: 'm1_demo_to_s01',
        },
        {
          id: 'm1_opt_repeat_demo',
          text: 'Повторить проверку мыслей и авторского текста',
          effects: [],
          next: 'm1_demo_narration',
        },
      ],
    },
    {
      id: 'm1_demo_to_s01',
      type: 'end',
      nextScene: 'scene01',
      next: null,
    },
  ],
};

export function createEngine({
  ui,
  stage,
  cutscenes,
  minigames,
  save,
  audio,
  bus = defaultBus,
  scenes = {},
} = {}) {
  const allScenes = {
    m1_demo: M1_DEMO_SCENE,
    ...scenes,
  };

  let state = createInitialState();
  let currentNode = null;
  let isTransitioning = false;
  let instanceCounter = 0;
  let activeAbortController = null;
  let skipMode = false;
  let skipTimer = null;
  let debugAutoWin = false;
  let suppressAutoSave = false;
  const unsubscribers = [];

  function getScene(sceneId) {
    return allScenes[sceneId] || null;
  }

  function getNode(sceneId, nodeId) {
    const sc = getScene(sceneId);
    if (!sc || !Array.isArray(sc.nodes)) return null;
    return sc.nodes.find((n) => n.id === nodeId) || null;
  }

  function markNodeRead(nodeId) {
    if (!nodeId) return;
    if (!state.readNodeIds.includes(nodeId)) {
      state.readNodeIds = [...state.readNodeIds, nodeId];
    }
  }

  function persistIfAllowed() {
    if (suppressAutoSave) return;
    save?.save?.(state);
    bus?.emit?.('state:change', { state: getState() });
  }

  function abortActiveAsync() {
    if (skipTimer !== null) {
      window.clearTimeout(skipTimer);
      skipTimer = null;
    }
    if (activeAbortController) {
      activeAbortController.abort();
      activeAbortController = null;
    }
  }

  function collectPrefetchAssets(scene, fromNode) {
    if (!scene || !fromNode) return [];
    const ids = new Set();
    const map = new Map(scene.nodes.map((n) => [n.id, n]));
    const queue = [fromNode.next, ...(fromNode.options || []).map((o) => o.next)].filter(Boolean);
    let steps = 0;
    while (queue.length > 0 && steps < 6) {
      const nextId = queue.shift();
      const n = map.get(nextId);
      if (!n) continue;
      steps += 1;
      if (n.background) ids.add(n.background);
      if (Array.isArray(n.characters)) n.characters.forEach((c) => ids.add(c));
      if (n.speaker) ids.add(n.speaker);
      if (n.next) queue.push(n.next);
    }
    return Array.from(ids);
  }

  async function enterNode(sceneId, nodeId) {
    if (isTransitioning) return;
    isTransitioning = true;
    const myInstanceId = ++instanceCounter;

    abortActiveAsync();

    try {
      let sc = getScene(sceneId);
      if (!sc) {
        isTransitioning = false;
        handleMissingScene(sceneId);
        return;
      }

      let targetNodeId = nodeId || sc.start;
      let node = getNode(sceneId, targetNodeId);
      if (!node) {
        node = sc.nodes[0] || null;
      }
      if (!node) {
        isTransitioning = false;
        return;
      }

      // Follow non-interactive structural nodes (scene enter/cue, set, if, goto)
      let guard = 0;
      while (node && guard < 100) {
        guard += 1;
        state.sceneId = sceneId;
        state.nodeId = node.id;

        if (node.type === 'scene') {
          markNodeRead(node.id);
          if (node.action === 'enter') {
            await stage?.enter?.({
              background: node.background,
              characters: node.characters || [],
            });
            if (myInstanceId !== instanceCounter) return;
          } else if (node.action === 'cue') {
            if (node.effect || node.cue) {
              stage?.cue?.(node.cue || node);
            }
          }
          if (!node.next) break;
          node = getNode(sceneId, node.next);
          continue;
        }

        if (node.type === 'set') {
          markNodeRead(node.id);
          state.variables = applyEffects(node.effects, state.variables);
          if (!node.next) break;
          node = getNode(sceneId, node.next);
          continue;
        }

        if (node.type === 'if') {
          markNodeRead(node.id);
          const branch = evaluateCondition(node.condition, state.variables)
            ? node.then
            : node.else || node.next;
          if (!branch) break;
          node = getNode(sceneId, branch);
          continue;
        }

        if (node.type === 'goto') {
          markNodeRead(node.id);
          const target = node.target || node.next;
          if (!target) break;
          node = getNode(sceneId, target);
          continue;
        }

        break;
      }

      if (!node || myInstanceId !== instanceCounter) {
        isTransitioning = false;
        return;
      }

      currentNode = node;
      state.sceneId = sceneId;
      state.nodeId = node.id;

      bus?.emit?.('node:enter', { sceneId, nodeId: node.id, node });

      // Prefetch upcoming assets in background without blocking
      const prefetchIds = collectPrefetchAssets(sc, node);
      if (prefetchIds.length > 0) {
        stage?.preload?.(prefetchIds);
      }

      // Handle interactive / episode nodes
      if (node.type === 'dialogue' || node.type === 'thought' || node.type === 'narration') {
        const wasAlreadyRead = state.readNodeIds.includes(node.id);
        markNodeRead(node.id);
        persistIfAllowed();

        await stage?.setActiveSpeaker?.(node.type === 'narration' ? null : node.speaker);
        if (myInstanceId !== instanceCounter) return;

        // If skip mode is active, only skip nodes that were ALREADY in readNodeIds
        if (skipMode && !wasAlreadyRead) {
          skipMode = false;
          ui?.setSkipActive?.(false);
        }

        ui?.show?.(node, { isRead: true });
        isTransitioning = false;

        if (skipMode && wasAlreadyRead && node.next) {
          skipTimer = window.setTimeout(() => {
            skipTimer = null;
            if (skipMode && currentNode?.id === node.id) {
              advance();
            }
          }, 90);
        }
        return;
      }

      if (node.type === 'choice') {
        skipMode = false;
        ui?.setSkipActive?.(false);
        persistIfAllowed();

        const visibleOptions = (node.options || []).filter((opt) =>
          evaluateCondition(opt.condition, state.variables)
        );
        ui?.showChoices?.(visibleOptions, node.text || null);
        isTransitioning = false;
        return;
      }

      if (node.type === 'cutscene') {
        skipMode = false;
        ui?.setSkipActive?.(false);
        // Save at the start of the cutscene episode
        persistIfAllowed();
        isTransitioning = false;

        activeAbortController = new AbortController();
        try {
          await cutscenes?.play?.(stage?.getOverlayRoot?.(), node.cutsceneId, {
            signal: activeAbortController.signal,
            reducedMotion: Boolean(state.settings?.reducedMotion),
          });
        } catch (err) {
          if (err?.name === 'AbortError' || myInstanceId !== instanceCounter) return;
        }
        if (myInstanceId !== instanceCounter) return;
        markNodeRead(node.id);
        persistIfAllowed();
        if (node.next) {
          await enterNode(sceneId, node.next);
        }
        return;
      }

      if (node.type === 'minigame') {
        skipMode = false;
        ui?.setSkipActive?.(false);
        // Save at the start of the minigame episode
        persistIfAllowed();
        isTransitioning = false;

        activeAbortController = new AbortController();
        try {
          const gameModule = await minigames?.load?.(node.gameId);
          if (myInstanceId !== instanceCounter) return;
          const result = await gameModule.run(stage?.getOverlayRoot?.(), {
            sceneId,
            instanceId: myInstanceId,
            seed: node.id,
            signal: activeAbortController.signal,
            reducedMotion: Boolean(state.settings?.reducedMotion),
            debugAutoWin,
            ...(node.params || {}),
          });
          if (myInstanceId !== instanceCounter) return;
          bus?.emit?.('game:result', { instanceId: myInstanceId, result });
          markNodeRead(node.id);
          persistIfAllowed();

          const nextTarget = result?.ok
            ? node.resultRoutes?.success || node.next
            : node.resultRoutes?.failure || node.next;
          if (nextTarget) {
            await enterNode(sceneId, nextTarget);
          }
        } catch (err) {
          if (err?.name === 'AbortError' || myInstanceId !== instanceCounter) return;
        }
        return;
      }

      if (node.type === 'end') {
        markNodeRead(node.id);
        persistIfAllowed();
        isTransitioning = false;
        const nextSceneId = node.nextScene;
        if (nextSceneId && getScene(nextSceneId)) {
          const nextSc = getScene(nextSceneId);
          await enterNode(nextSceneId, nextSc.start);
        } else {
          handleMissingScene(nextSceneId || 'scene02');
        }
        return;
      }

      isTransitioning = false;
    } catch (err) {
      isTransitioning = false;
      console.error('Engine error:', err);
    }
  }

  function handleMissingScene(missingSceneId) {
    skipMode = false;
    ui?.setSkipActive?.(false);
    // Present a clean M1 end-of-scene screen with option to preview M1 thought/narration/choice styles or restart Scene 1
    currentNode = {
      id: '__m1_scene_complete__',
      type: 'choice',
    };
    ui?.show?.({
      id: '__m1_scene_complete_text__',
      type: 'narration',
      text: `Сцена 1 пройдена до конца! Переход к «${missingSceneId}» будет добавлен на этапе M2. Вы можете проверить стили мыслей/выбора (DEBUG-STUB) или пройти Сцену 1 заново.`,
    });
    ui?.showChoices?.([
      {
        id: '__m1_open_demo__',
        text: 'Проверить мысли, авторский текст и выбор (DEBUG-STUB)',
      },
      {
        id: '__m1_restart_s01__',
        text: 'Пройти Сцену 1 сначала',
      },
    ]);
  }

  async function start(initialState = null) {
    suppressAutoSave = false;
    if (initialState) {
      state = normalizeState(initialState);
    } else {
      state = createInitialState();
    }
    ui?.setSettings?.(state.settings);
    stage?.setReducedMotion?.(state.settings.reducedMotion);
    audio?.setVolume?.(state.settings.volume);
    audio?.setMuted?.(state.settings.muted);

    const targetSceneId = getScene(state.sceneId) ? state.sceneId : 'scene01';
    const sc = getScene(targetSceneId);
    const targetNodeId = getNode(targetSceneId, state.nodeId) ? state.nodeId : sc.start;

    // Ensure stage has background/characters if resuming into the middle of a scene
    const resumeStage = findLastStageEnter(sc, targetNodeId);
    if (resumeStage) {
      await stage?.enter?.(resumeStage);
    }

    await enterNode(targetSceneId, targetNodeId);
  }

  function findLastStageEnter(scene, targetNodeId) {
    if (!scene || !Array.isArray(scene.nodes)) return null;
    let lastEnter = null;
    for (const n of scene.nodes) {
      if (n.type === 'scene' && n.action === 'enter') {
        lastEnter = {
          background: n.background,
          characters: n.characters || [],
        };
      }
      if (n.id === targetNodeId) break;
    }
    return lastEnter;
  }

  async function advance() {
    if (isTransitioning || !currentNode) return;
    audio?.unlock?.();
    // Advancing explicitly resumes normal saving after debug jump
    suppressAutoSave = false;

    if (currentNode.type === 'dialogue' || currentNode.type === 'thought' || currentNode.type === 'narration') {
      if (currentNode.next) {
        await enterNode(state.sceneId, currentNode.next);
      }
    }
  }

  async function choose(optionId) {
    if (isTransitioning || !currentNode) return;
    audio?.unlock?.();
    suppressAutoSave = false;

    if (currentNode.id === '__m1_scene_complete__') {
      if (optionId === '__m1_open_demo__') {
        await enterNode('m1_demo', M1_DEMO_SCENE.start);
      } else if (optionId === '__m1_restart_s01__') {
        await enterNode('scene01', 's01_enter');
      }
      return;
    }

    if (currentNode.type !== 'choice') return;
    const option = (currentNode.options || []).find((o) => o.id === optionId);
    if (!option) return;

    state.variables = applyEffects(option.effects, state.variables);
    state.history = [
      ...state.history,
      { nodeId: currentNode.id, optionId: option.id },
    ].slice(-HISTORY_LIMIT);
    markNodeRead(currentNode.id);
    persistIfAllowed();

    if (option.next) {
      await enterNode(state.sceneId, option.next);
    }
  }

  async function jump(sceneId, nodeId, { preserveProductionSave = true } = {}) {
    abortActiveAsync();
    isTransitioning = false;
    skipMode = false;
    ui?.setSkipActive?.(false);
    suppressAutoSave = Boolean(preserveProductionSave);

    const sc = getScene(sceneId);
    if (!sc) return;
    const targetNodeId = nodeId && getNode(sceneId, nodeId) ? nodeId : sc.start;
    const resumeStage = findLastStageEnter(sc, targetNodeId);
    if (resumeStage) {
      await stage?.enter?.(resumeStage);
    }
    await enterNode(sceneId, targetNodeId);
  }

  function setSettings(partial = {}) {
    state.settings = {
      ...state.settings,
      ...partial,
    };
    ui?.setSettings?.(state.settings);
    stage?.setReducedMotion?.(state.settings.reducedMotion);
    audio?.setVolume?.(state.settings.volume);
    audio?.setMuted?.(state.settings.muted);
    persistIfAllowed();
  }

  function setVariables(partial = {}) {
    state.variables = {
      ...state.variables,
      ...partial,
    };
    bus?.emit?.('state:change', { state: getState() });
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  // Subscribe to UI events on shared bus
  unsubscribers.push(
    bus.on('ui:advance', () => {
      advance();
    }),
    bus.on('ui:choice', ({ optionId }) => {
      choose(optionId);
    }),
    bus.on('ui:skip', ({ active }) => {
      skipMode = Boolean(active);
      if (skipMode && currentNode && state.readNodeIds.includes(currentNode.id)) {
        if (ui?.isTyping?.()) {
          ui.completeTyping();
        }
        if (currentNode.type === 'dialogue' || currentNode.type === 'thought' || currentNode.type === 'narration') {
          advance();
        }
      }
    }),
    bus.on('ui:settings', ({ settings: nextSettings }) => {
      if (nextSettings) setSettings(nextSettings);
    }),
    bus.on('debug:jump', ({ sceneId, nodeId }) => {
      jump(sceneId, nodeId, { preserveProductionSave: true });
    })
  );

  function destroy() {
    abortActiveAsync();
    while (unsubscribers.length > 0) {
      const unsub = unsubscribers.pop();
      unsub?.();
    }
  }

  return {
    start,
    advance,
    choose,
    jump,
    getState,
    setSettings,
    setVariables,
    setDebugAutoWin(val) {
      debugAutoWin = Boolean(val);
    },
    getDebugAutoWin() {
      return debugAutoWin;
    },
    getScenes() {
      return allScenes;
    },
    destroy,
  };
}

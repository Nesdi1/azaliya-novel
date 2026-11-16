import { bus as defaultBus } from '../events.js';
import { createInitialState, normalizeState, HISTORY_LIMIT } from '../storage/save.js';
import { FINAL_LOVE_LETTER_TEXT } from '../data/finalLetter.js';

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

export function stageCuesOf(node) {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node.cues)) return node.cues.filter((c) => c && typeof c === 'object' && c.effect);
  if (node.cue && typeof node.cue === 'object' && node.cue.effect) return [node.cue];
  if (typeof node.effect === 'string' && node.effect) return [node];
  return [];
}

function isInteractiveTextNode(node) {
  if (!node || typeof node !== 'object') return false;
  if (node.type === 'dialogue' || node.type === 'thought' || node.type === 'narration') return true;
  if (node.type === 'scene' && node.action === 'cue' && Boolean(node.narration)) return true;
  return false;
}

function extractParentheticalNote(annotation) {
  if (!annotation) return '';
  const m = String(annotation).match(/\(([^)]+)\)/);
  return m ? m[1].trim() : '';
}

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
    ...scenes,
  };

  let state = createInitialState();
  let currentNode = null;
  let pendingRetryNode = null;
  let isTransitioning = false;
  let instanceCounter = 0;
  let activeAbortController = null;
  let skipMode = false;
  let skipTimer = null;
  let debugAutoWin = false;
  let suppressAutoSave = false;
  let lastCutsceneCompletedSceneId = null;
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
      if (n.speaker && (!stage?.isCharacter || stage.isCharacter(n.speaker))) {
        ids.add(n.speaker);
      }
      stageCuesOf(n).forEach((c) => {
        if (c.effect === 'fade' && c.target) ids.add(c.target);
      });
      if (n.next) queue.push(n.next);
    }
    return Array.from(ids);
  }

  function collectSceneInitialAssets(scene) {
    if (!scene || !Array.isArray(scene.nodes) || scene.nodes.length === 0) return [];
    const first = scene.nodes.find((n) => n.id === scene.start) || scene.nodes[0];
    const ids = new Set();
    if (first?.background) ids.add(first.background);
    if (Array.isArray(first?.characters)) first.characters.forEach((c) => ids.add(c));
    collectPrefetchAssets(scene, first).forEach((id) => ids.add(id));
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
      let pendingStageNote = '';
      while (node && guard < 100) {
        guard += 1;
        state.sceneId = sceneId;
        state.nodeId = node.id;

        if (node.type === 'scene') {
          if (node.action === 'enter') {
            markNodeRead(node.id);
            await stage?.enter?.({
              background: node.background,
              characters: node.characters || [],
            });
            if (myInstanceId !== instanceCounter) return;
          } else if (node.action === 'cue') {
            if (node.narration) {
              // Significant plot stage remark: stop here and display as an author/action line with its stage cues
              break;
            }
            markNodeRead(node.id);
            const note = extractParentheticalNote(node.annotation);
            if (note) pendingStageNote = note;
            // Non-stopping stage cue: execute explicit cues and optional holdMs, then advance
            stageCuesOf(node).forEach((c) => stage?.cue?.(c));
            const holdMs = Number(node.holdMs) || 0;
            if (holdMs > 0 && !skipMode && !state.settings?.reducedMotion) {
              await new Promise((resolve) => window.setTimeout(resolve, Math.min(holdMs, 3000)));
              if (myInstanceId !== instanceCounter) return;
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
          if (node.retryPrompt) break;
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

      // Handle interactive / episode nodes (dialogue, thought, narration, or narrative stage cue)
      if (isInteractiveTextNode(node)) {
        const wasAlreadyRead = state.readNodeIds.includes(node.id);
        markNodeRead(node.id);
        persistIfAllowed();

        const isCueNarration = node.type === 'scene' && node.action === 'cue';
        if (!isCueNarration) {
          await stage?.setActiveSpeaker?.(node.type === 'narration' ? null : node.speaker);
          if (myInstanceId !== instanceCounter) return;
        }
        stageCuesOf(node).forEach((c) => stage?.cue?.(c));

        // If skip mode is active, only skip nodes that were ALREADY in readNodeIds
        if (skipMode && !wasAlreadyRead) {
          skipMode = false;
          ui?.setSkipActive?.(false);
        }

        const matchedVariant = Array.isArray(node.variants)
          ? node.variants.find((v) => v && evaluateCondition(v.condition, state.variables))
          : null;
        let resolvedNode = matchedVariant ? { ...node, text: matchedVariant.text } : node;
        if (resolvedNode.useFinalLetter && FINAL_LOVE_LETTER_TEXT) {
          resolvedNode = { ...resolvedNode, text: FINAL_LOVE_LETTER_TEXT };
        }
        const uiNode = isCueNarration
          ? {
              ...resolvedNode,
              type: 'narration',
              speaker: null,
              text: String(resolvedNode.annotation || resolvedNode.text || '').replace(/^\((.*)\)$/s, '$1'),
            }
          : resolvedNode;
        const customStageNote =
          resolvedNode.stageNoteWhenNoRose && state.variables?.roseFriend === false
            ? resolvedNode.stageNoteWhenNoRose
            : resolvedNode.stageNote || pendingStageNote;
        ui?.show?.(uiNode, { isRead: true, stageNote: isCueNarration ? '' : customStageNote });
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

        // If the cutscene is followed by an end node (directly or via an end-of-scene if node), preload next scene assets during playback
        let preloadPromise = null;
        const afterNode = node.next ? getNode(sceneId, node.next) : null;
        let targetEndNode = afterNode?.type === 'end' ? afterNode : null;
        if (!targetEndNode && afterNode?.type === 'if') {
          const branchId = evaluateCondition(afterNode.condition, state.variables)
            ? afterNode.then
            : afterNode.else || afterNode.next;
          const branchNode = branchId ? getNode(sceneId, branchId) : null;
          if (branchNode?.type === 'end') targetEndNode = branchNode;
        }
        if (targetEndNode?.nextScene && getScene(targetEndNode.nextScene)) {
          const nextIds = collectSceneInitialAssets(getScene(targetEndNode.nextScene));
          if (nextIds.length > 0) preloadPromise = stage?.preload?.(nextIds);
        }

        ui?.setOverlayMode?.(true);
        activeAbortController = new AbortController();
        try {
          await cutscenes?.play?.(stage?.getOverlayRoot?.(), node.cutsceneId, {
            signal: activeAbortController.signal,
            reducedMotion: Boolean(state.settings?.reducedMotion),
            preloadPromise,
          });
        } catch (err) {
          ui?.setOverlayMode?.(false);
          if (err?.name === 'AbortError' || myInstanceId !== instanceCounter) return;
        }
        ui?.setOverlayMode?.(false);
        if (myInstanceId !== instanceCounter) return;
        if (targetEndNode) {
          lastCutsceneCompletedSceneId = sceneId;
        }
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

        ui?.setOverlayMode?.(true);
        activeAbortController = new AbortController();
        try {
          const gameModule = await minigames?.load?.(node.gameId);
          if (myInstanceId !== instanceCounter) {
            ui?.setOverlayMode?.(false);
            return;
          }
          const result = await gameModule.run(stage?.getOverlayRoot?.(), {
            sceneId,
            instanceId: myInstanceId,
            seed: node.id,
            signal: activeAbortController.signal,
            reducedMotion: Boolean(state.settings?.reducedMotion),
            debugAutoWin,
            ...(node.params || {}),
          });
          ui?.setOverlayMode?.(false);
          if (myInstanceId !== instanceCounter) return;

          const successRoute = node.resultRoutes?.success || node.next;
          const failureRoute = node.resultRoutes?.failure || node.next;
          const forceStoryWin = Boolean(node.params?.forceStoryWin);
          // Potions/quidditch failure without a distinct story failure branch offers UI retry/skip (04_STORY_SCHEMA L39)
          if (!result?.ok && !forceStoryWin && (!node.resultRoutes?.failure || failureRoute === successRoute)) {
            pendingRetryNode = {
              sceneId,
              node,
              retryTarget: node.id,
              skipTarget: successRoute,
              gameId: node.gameId,
            };
            ui?.showRetry?.({
              kind: node.gameId,
              message: 'Испытание не пройдено. Попробовать снова или пропустить испытание?',
            });
            return;
          }

          bus?.emit?.('game:result', { instanceId: myInstanceId, result });
          markNodeRead(node.id);
          persistIfAllowed();

          const nextTarget = result?.ok || forceStoryWin ? successRoute : failureRoute;
          if (nextTarget) {
            await enterNode(sceneId, nextTarget);
          }
        } catch (err) {
          ui?.setOverlayMode?.(false);
          if (err?.name === 'AbortError' || myInstanceId !== instanceCounter) return;
        }
        return;
      }

      if (node.type === 'goto' && node.retryPrompt) {
        skipMode = false;
        ui?.setSkipActive?.(false);
        markNodeRead(node.id);
        persistIfAllowed();
        isTransitioning = false;

        pendingRetryNode = {
          sceneId,
          node,
          retryTarget: node.target,
          skipTarget: node.else || node.next,
          gameId: node.retryKind || 'stealth',
        };
        ui?.showRetry?.({
          kind: node.retryKind || 'stealth',
          message: 'Испытание не пройдено. Попробовать снова или пропустить испытание?',
        });
        return;
      }

      if (node.type === 'end') {
        const hadEndCutscene = lastCutsceneCompletedSceneId === sceneId;
        lastCutsceneCompletedSceneId = null;
        markNodeRead(node.id);
        persistIfAllowed();
        isTransitioning = false;
        const nextSceneId = node.nextScene;
        if (nextSceneId && getScene(nextSceneId)) {
          const nextSc = getScene(nextSceneId);
          const nextIds = collectSceneInitialAssets(nextSc);
          const preloadPromise = nextIds.length > 0 ? stage?.preload?.(nextIds) : Promise.resolve();
          if (hadEndCutscene) {
            await preloadPromise;
          } else {
            ui?.setOverlayMode?.(true);
            try {
              await cutscenes?.playSceneTransition?.(stage?.getOverlayRoot?.(), {
                fromSceneId: sceneId,
                toSceneId: nextSceneId,
                preloadPromise,
                reducedMotion: Boolean(state.settings?.reducedMotion),
              });
            } finally {
              ui?.setOverlayMode?.(false);
            }
          }
          if (myInstanceId !== instanceCounter) return;
          await enterNode(nextSceneId, nextSc.start);
        } else {
          handleMissingScene(nextSceneId || '__end__');
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
    ui?.setOverlayMode?.(false);
    currentNode = {
      id: '__scene_boundary__',
      type: 'choice',
    };
    const isFinalEnd = !missingSceneId || missingSceneId === '__end__';
    ui?.show?.({
      id: '__scene_boundary_text__',
      type: 'narration',
      text: isFinalEnd
        ? 'Конец истории. Спасибо за прохождение!'
        : `Переход к «${missingSceneId}» недоступен.`,
    });
    ui?.showChoices?.([
      {
        id: '__restart_s10__',
        text: 'Пройти финал (Сцена 10) ещё раз',
      },
      {
        id: '__restart_s01__',
        text: 'Начать новую историю с самого начала (Сцена 1)',
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

    // Ensure stage has background/characters (and staging state) if resuming into the middle of a scene
    await restoreStage(sc, targetNodeId);

    await enterNode(targetSceneId, targetNodeId);
  }

  /**
   * Rebuilds the stage for a node in the middle of a scene: last `enter` before the node plus the
   * final state of every explicit cue between them (no delays, no decorative animations).
   */
  async function restoreStage(scene, targetNodeId) {
    const resume = findStageResume(scene, targetNodeId);
    if (!resume) return;
    await stage?.enter?.(resume.enter);
    resume.cues.forEach((c) => stage?.cue?.(c, { instant: true }));
  }

  function findStageResume(scene, targetNodeId) {
    if (!scene || !Array.isArray(scene.nodes)) return null;
    let lastEnter = null;
    let cues = [];
    for (const n of scene.nodes) {
      const isEnter = n.type === 'scene' && n.action === 'enter';
      if (isEnter) {
        lastEnter = {
          background: n.background,
          characters: n.characters || [],
        };
        cues = [];
      }
      if (n.id === targetNodeId) break;
      if (!isEnter) {
        cues = cues.concat(stageCuesOf(n));
      }
    }
    return lastEnter ? { enter: lastEnter, cues } : null;
  }

  async function advance() {
    if (isTransitioning || !currentNode) return;
    audio?.unlock?.();
    // Advancing explicitly resumes normal saving after debug jump
    suppressAutoSave = false;

    if (isInteractiveTextNode(currentNode)) {
      if (currentNode.next) {
        await enterNode(state.sceneId, currentNode.next);
      }
    }
  }

  async function choose(optionId) {
    if (isTransitioning || !currentNode) return;
    audio?.unlock?.();
    suppressAutoSave = false;

    if (currentNode.id === '__scene_boundary__') {
      if (optionId === '__restart_s10__' && getScene('scene10')) {
        await enterNode('scene10', getScene('scene10').start);
      } else if (optionId === '__restart_s07__' && getScene('scene07')) {
        await enterNode('scene07', getScene('scene07').start);
      } else if (optionId === '__restart_s04__' && getScene('scene04')) {
        await enterNode('scene04', 's04_enter');
      } else if (optionId === '__restart_s01__') {
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
    await restoreStage(sc, targetNodeId);
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
    bus.on('ui:retry', async ({ action }) => {
      if (!pendingRetryNode) return;
      const { sceneId: retrySceneId, node: retryNode, retryTarget, skipTarget } = pendingRetryNode;
      pendingRetryNode = null;
      if (action === 'retry') {
        await enterNode(retrySceneId, retryTarget || retryNode.id);
      } else if (action === 'skip') {
        const skipResult = { ok: true, score: 0, details: { reason: 'skipped' } };
        bus?.emit?.('game:result', { instanceId: instanceCounter, result: skipResult });
        markNodeRead(retryNode.id);
        persistIfAllowed();
        const nextTarget = skipTarget || retryNode.resultRoutes?.success || retryNode.next;
        if (nextTarget) {
          await enterNode(retrySceneId, nextTarget);
        }
      }
    }),
    bus.on('ui:skip', ({ active }) => {
      skipMode = Boolean(active);
      if (skipMode && currentNode && state.readNodeIds.includes(currentNode.id)) {
        if (ui?.isTyping?.()) {
          ui.completeTyping();
        }
        if (isInteractiveTextNode(currentNode)) {
          advance();
        }
      }
    }),
    bus.on('ui:settings', ({ settings: nextSettings }) => {
      if (nextSettings) setSettings(nextSettings);
    }),
    bus.on('debug:jump', ({ sceneId, nodeId }) => {
      jump(sceneId, nodeId, { preserveProductionSave: true });
    }),
    bus.on('debug:cutscene', async ({ cutsceneId }) => {
      if (!cutsceneId) return;
      abortActiveAsync();
      isTransitioning = false;
      skipMode = false;
      ui?.setSkipActive?.(false);
      ui?.setOverlayMode?.(true);
      activeAbortController = new AbortController();
      try {
        await cutscenes?.play?.(stage?.getOverlayRoot?.(), cutsceneId, {
          signal: activeAbortController.signal,
          reducedMotion: Boolean(state.settings?.reducedMotion),
        });
      } catch (err) {
        // Ignore abort errors on debug cutscene preview
      } finally {
        ui?.setOverlayMode?.(false);
      }
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

import { bus as defaultBus } from '../events.js';
import { CUTSCENE_IDS, CUTSCENES } from '../data/cutscenes.js';

/**
 * Debug overlay mounted only when URL has ?debug=1.
 * Contract: mount(engine, root), destroy() | Emits: debug:jump { sceneId, nodeId }
 */
export function mount(engine, root, bus = defaultBus) {
  if (!engine || !root) return { destroy() {} };

  const panel = document.createElement('aside');
  panel.className = 'debug-panel';
  panel.setAttribute('aria-label', 'Панель отладки');

  const header = document.createElement('div');
  header.className = 'debug-header';

  const title = document.createElement('strong');
  title.textContent = 'DEBUG (?debug=1)';

  const fpsBadge = document.createElement('span');
  fpsBadge.className = 'debug-fps';
  fpsBadge.textContent = 'FPS: --';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'ui-btn ui-btn-compact';
  toggleBtn.textContent = 'Свернуть';

  header.append(title, fpsBadge, toggleBtn);

  const body = document.createElement('div');
  body.className = 'debug-body';

  // Jump selector: Scene + Node
  const jumpRow = document.createElement('div');
  jumpRow.className = 'debug-row';

  const sceneSelect = document.createElement('select');
  sceneSelect.className = 'debug-select';
  sceneSelect.setAttribute('aria-label', 'Выбор сцены');

  const nodeSelect = document.createElement('select');
  nodeSelect.className = 'debug-select';
  nodeSelect.setAttribute('aria-label', 'Выбор узла');

  const jumpBtn = document.createElement('button');
  jumpBtn.type = 'button';
  jumpBtn.className = 'ui-btn ui-btn-compact';
  jumpBtn.textContent = 'Перейти';

  const csSelect = document.createElement('select');
  csSelect.className = 'debug-select';
  csSelect.setAttribute('aria-label', 'Выбор кат-сцены');
  for (const csId of CUTSCENE_IDS) {
    const opt = document.createElement('option');
    opt.value = csId;
    const def = CUTSCENES[csId];
    opt.textContent = def?.title ? `${csId} — ${def.title}` : csId;
    csSelect.appendChild(opt);
  }

  const csBtn = document.createElement('button');
  csBtn.type = 'button';
  csBtn.className = 'ui-btn ui-btn-compact';
  csBtn.textContent = 'Кат-сцена ▸';

  const parchmentBtn = document.createElement('button');
  parchmentBtn.type = 'button';
  parchmentBtn.className = 'ui-btn ui-btn-compact';
  parchmentBtn.textContent = 'Пергамент (M4) ▸';

  const quidditchBtn = document.createElement('button');
  quidditchBtn.type = 'button';
  quidditchBtn.className = 'ui-btn ui-btn-compact';
  quidditchBtn.textContent = 'Квиддич (M5) ▸';

  const stealthBtn = document.createElement('button');
  stealthBtn.type = 'button';
  stealthBtn.className = 'ui-btn ui-btn-compact';
  stealthBtn.textContent = 'Стелс (M6) ▸';

  const duelBtn = document.createElement('button');
  duelBtn.type = 'button';
  duelBtn.className = 'ui-btn ui-btn-compact';
  duelBtn.textContent = 'Дуэль (M7) ▸';

  const potionsBtn = document.createElement('button');
  potionsBtn.type = 'button';
  potionsBtn.className = 'ui-btn ui-btn-compact';
  potionsBtn.textContent = 'Зельеварение (M8) ▸';

  jumpRow.append(
    sceneSelect,
    nodeSelect,
    jumpBtn,
    csSelect,
    csBtn,
    parchmentBtn,
    quidditchBtn,
    stealthBtn,
    duelBtn,
    potionsBtn
  );

  // Variables editor (5 story variables with type validation)
  const varsBox = document.createElement('div');
  varsBox.className = 'debug-vars';

  function populateScenes() {
    const scenes = engine.getScenes?.() || {};
    sceneSelect.innerHTML = '';
    for (const scId of Object.keys(scenes)) {
      const opt = document.createElement('option');
      opt.value = scId;
      opt.textContent = scId === 'm1_demo' ? 'm1_demo (DEBUG-STUB)' : scId;
      sceneSelect.appendChild(opt);
    }
    populateNodes(sceneSelect.value);
  }

  function populateNodes(sceneId) {
    const scenes = engine.getScenes?.() || {};
    const sc = scenes[sceneId];
    nodeSelect.innerHTML = '';
    if (!sc || !Array.isArray(sc.nodes)) return;
    for (const n of sc.nodes) {
      const opt = document.createElement('option');
      opt.value = n.id;
      const preview = n.text ? ` — ${n.text.slice(0, 22)}…` : ` (${n.type})`;
      opt.textContent = `${n.id}${preview}`;
      nodeSelect.appendChild(opt);
    }
  }

  function renderVariables() {
    const st = engine.getState();
    const vars = st.variables || {};
    varsBox.innerHTML = '';

    const defs = [
      { key: 'roseFriend', type: 'bool', options: ['false', 'true'] },
      { key: 'duelScene4Win', type: 'tri', options: ['null', 'true', 'false'] },
      { key: 'stealthScene5Win', type: 'tri', options: ['null', 'true', 'false'] },
      { key: 'theoGift', type: 'enum', options: ['null', 'jacket', 'guitar'] },
      { key: 'scene6Route', type: 'enum', options: ['null', 'lake', 'quidditch'] },
    ];

    for (const def of defs) {
      const label = document.createElement('label');
      label.className = 'debug-var-item';
      const span = document.createElement('span');
      span.textContent = def.key;

      const sel = document.createElement('select');
      sel.className = 'debug-select';
      for (const rawOpt of def.options) {
        const o = document.createElement('option');
        o.value = rawOpt;
        o.textContent = rawOpt;
        if (String(vars[def.key]) === rawOpt) o.selected = true;
        sel.appendChild(o);
      }
      sel.addEventListener('change', () => {
        let parsed = null;
        if (sel.value === 'true') parsed = true;
        else if (sel.value === 'false') parsed = false;
        else if (sel.value === 'null') parsed = null;
        else parsed = sel.value;
        engine.setVariables({ [def.key]: parsed });
      });

      label.append(span, sel);
      varsBox.appendChild(label);
    }

    // autoWin toggle
    const autoWinLabel = document.createElement('label');
    autoWinLabel.className = 'debug-var-item';
    const autoWinSpan = document.createElement('span');
    autoWinSpan.textContent = 'autoWin игр';
    const autoWinCheck = document.createElement('input');
    autoWinCheck.type = 'checkbox';
    autoWinCheck.checked = Boolean(engine.getDebugAutoWin?.());
    autoWinCheck.addEventListener('change', () => {
      engine.setDebugAutoWin?.(autoWinCheck.checked);
    });
    autoWinLabel.append(autoWinSpan, autoWinCheck);
    varsBox.appendChild(autoWinLabel);

    // reducedMotion toggle for testing cutscene fallback mode
    const rmLabel = document.createElement('label');
    rmLabel.className = 'debug-var-item';
    const rmSpan = document.createElement('span');
    rmSpan.textContent = 'Без анимаций';
    const rmCheck = document.createElement('input');
    rmCheck.type = 'checkbox';
    rmCheck.checked = Boolean(st.settings?.reducedMotion);
    rmCheck.addEventListener('change', () => {
      engine.setSettings?.({ reducedMotion: rmCheck.checked });
    });
    rmLabel.append(rmSpan, rmCheck);
    varsBox.appendChild(rmLabel);
  }

  sceneSelect.addEventListener('change', () => populateNodes(sceneSelect.value));
  jumpBtn.addEventListener('click', () => {
    bus?.emit?.('debug:jump', {
      sceneId: sceneSelect.value,
      nodeId: nodeSelect.value,
    });
  });
  csBtn.addEventListener('click', () => {
    bus?.emit?.('debug:cutscene', {
      cutsceneId: csSelect.value,
    });
  });
  parchmentBtn.addEventListener('click', () => {
    bus?.emit?.('debug:jump', {
      sceneId: 'scene10',
      nodeId: 's10_enter_parchment',
    });
  });
  quidditchBtn.addEventListener('click', () => {
    bus?.emit?.('debug:jump', {
      sceneId: 'scene06',
      nodeId: 's06_game_quidditch',
    });
  });
  stealthBtn.addEventListener('click', () => {
    bus?.emit?.('debug:jump', {
      sceneId: 'scene05',
      nodeId: 's05_game_stealth',
    });
  });
  duelBtn.addEventListener('click', () => {
    bus?.emit?.('debug:jump', {
      sceneId: 'scene04',
      nodeId: 's04_game_duel',
    });
  });
  potionsBtn.addEventListener('click', () => {
    bus?.emit?.('debug:jump', {
      sceneId: 'scene03',
      nodeId: 's03_game_potions',
    });
  });

  toggleBtn.addEventListener('click', () => {
    const collapsed = body.hidden;
    body.hidden = !collapsed;
    toggleBtn.textContent = collapsed ? 'Свернуть' : 'Развернуть';
  });

  body.append(jumpRow, varsBox);
  panel.append(header, body);
  root.appendChild(panel);

  populateScenes();
  renderVariables();

  const unsubNode = bus.on('node:enter', ({ sceneId, nodeId }) => {
    if (sceneSelect.value !== sceneId) {
      sceneSelect.value = sceneId;
      populateNodes(sceneId);
    }
    nodeSelect.value = nodeId;
    renderVariables();
  });

  // 60-frame rolling average FPS meter
  let rafId = null;
  let frameTimes = [];
  let lastTs = performance.now();

  function tickFps(now) {
    const dt = now - lastTs;
    lastTs = now;
    if (dt > 0 && dt < 1000) {
      frameTimes.push(dt);
      if (frameTimes.length >= 60) {
        const avgDt = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        const fps = Math.round(1000 / avgDt);
        fpsBadge.textContent = `FPS: ${fps}`;
        frameTimes = [];
      }
    }
    rafId = window.requestAnimationFrame(tickFps);
  }
  rafId = window.requestAnimationFrame(tickFps);

  function destroy() {
    if (rafId !== null) window.cancelAnimationFrame(rafId);
    unsubNode?.();
    if (panel.parentNode === root) root.removeChild(panel);
  }

  return { destroy };
}

export function createDebug() {
  return { mount };
}

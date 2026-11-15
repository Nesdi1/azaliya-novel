import { bus } from './events.js';
import { createSave } from './storage/save.js';
import { createAudio } from './audio/audio.js';
import { createStage } from './stage/stage.js';
import { createDialogue } from './ui/dialogue.js';
import { createCutscenePlayer } from './cutscenes/player.js';
import { createMinigameRegistry } from './minigames/registry.js';
import { createEngine } from './engine/storyEngine.js';
import { mount as mountDebug } from './debug/debug.js';
import scene01 from './data/story/scene01.js';

async function bootstrap() {
  const bootWarning = document.getElementById('file-protocol-warning');
  if (bootWarning) {
    bootWarning.hidden = true;
  }

  const appRoot = document.getElementById('app');
  const stageRoot = document.getElementById('stage-root');
  const dialogueRoot = document.getElementById('dialogue-root');
  const modalRoot = document.getElementById('modal-root');
  const toastRoot = document.getElementById('toast-root');

  let manifest = { assets: {}, scenes: {} };
  try {
    const resp = await fetch('./assets/manifest.json');
    if (resp.ok) {
      manifest = await resp.json();
    }
  } catch (err) {
    console.error('Failed to load manifest.json:', err);
  }

  const save = createSave(bus);
  const audio = createAudio();
  const stage = createStage(stageRoot, manifest, bus);
  const ui = createDialogue(dialogueRoot, bus);
  const cutscenes = createCutscenePlayer(stage, bus);
  const minigames = createMinigameRegistry();

  const engine = createEngine({
    ui,
    stage,
    cutscenes,
    minigames,
    save,
    audio,
    bus,
    scenes: {
      scene01,
    },
  });

  // Tap on stage area also advances dialogue (with pointercancel safety)
  let stagePointerId = null;
  let stagePointerStart = null;
  stageRoot.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, a, input, select')) return;
    stagePointerId = e.pointerId;
    stagePointerStart = { x: e.clientX, y: e.clientY };
  });
  stageRoot.addEventListener('pointerup', (e) => {
    if (stagePointerId === null || e.pointerId !== stagePointerId) return;
    const start = stagePointerStart;
    stagePointerId = null;
    stagePointerStart = null;
    if (!start) return;
    if (Math.abs(e.clientX - start.x) < 14 && Math.abs(e.clientY - start.y) < 14) {
      ui.triggerAdvance();
    }
  });
  stageRoot.addEventListener('pointercancel', () => {
    stagePointerId = null;
    stagePointerStart = null;
  });

  // Non-blocking toast notification for save/asset errors
  function showToast(message) {
    if (!toastRoot || !message) return;
    const item = document.createElement('div');
    item.className = 'toast-message';
    item.textContent = message;
    toastRoot.appendChild(item);
    window.setTimeout(() => {
      if (item.parentNode === toastRoot) toastRoot.removeChild(item);
    }, 4500);
  }

  bus.on('save:error', ({ message }) => showToast(message));
  bus.on('asset:error', ({ id }) => showToast(`Ошибка загрузки ресурса: ${id}`));

  // Main menu modal (Continue / New Game + confirmation + corrupted save notice)
  function openMenuModal({ isInitialBoot = false } = {}) {
    const inspection = save.inspect();
    const hasValidSave = inspection.status === 'valid' && Boolean(inspection.state);

    modalRoot.innerHTML = '';
    modalRoot.hidden = false;

    const card = document.createElement('div');
    card.className = 'modal-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');

    const title = document.createElement('h1');
    title.className = 'modal-title';
    title.textContent = 'Хогвартс: история';

    const subtitle = document.createElement('p');
    subtitle.className = 'modal-subtitle';
    if (inspection.status === 'corrupted' || inspection.status === 'version_mismatch') {
      subtitle.textContent = inspection.message;
      subtitle.classList.add('is-warning');
    } else if (hasValidSave) {
      const readCount = inspection.state.readNodeIds?.length || 0;
      subtitle.textContent = `Найдено сохранение (${inspection.state.sceneId}, узел ${inspection.state.nodeId}, пройдено узлов: ${readCount}).`;
    } else {
      subtitle.textContent = 'Визуальная новелла. Выберите действие для начала.';
    }

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

    const continueBtn = document.createElement('button');
    continueBtn.type = 'button';
    continueBtn.className = 'ui-btn modal-btn is-primary';
    continueBtn.textContent = 'Продолжить';
    continueBtn.disabled = !hasValidSave;

    const newGameBtn = document.createElement('button');
    newGameBtn.type = 'button';
    newGameBtn.className = 'ui-btn modal-btn';
    newGameBtn.textContent =
      inspection.status === 'corrupted' || inspection.status === 'version_mismatch'
        ? 'Сбросить и начать новую игру'
        : 'Новая игра';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'ui-btn modal-btn';
    closeBtn.textContent = 'Вернуться к экрану';
    closeBtn.hidden = isInitialBoot;

    const confirmBox = document.createElement('div');
    confirmBox.className = 'modal-confirm';
    confirmBox.hidden = true;

    const confirmText = document.createElement('p');
    confirmText.className = 'modal-confirm-text';
    confirmText.textContent = 'Сбросить существующее сохранение и начать новую игру с самого начала?';

    const confirmYesBtn = document.createElement('button');
    confirmYesBtn.type = 'button';
    confirmYesBtn.className = 'ui-btn modal-btn is-danger';
    confirmYesBtn.textContent = 'Да, сбросить и начать заново';

    const confirmCancelBtn = document.createElement('button');
    confirmCancelBtn.type = 'button';
    confirmCancelBtn.className = 'ui-btn modal-btn';
    confirmCancelBtn.textContent = 'Отмена';

    confirmBox.append(confirmText, confirmYesBtn, confirmCancelBtn);

    continueBtn.addEventListener('click', async () => {
      if (!hasValidSave) return;
      audio.unlock();
      modalRoot.hidden = true;
      modalRoot.innerHTML = '';
      await engine.start(inspection.state);
    });

    const startFreshGame = async () => {
      audio.unlock();
      save.clear();
      modalRoot.hidden = true;
      modalRoot.innerHTML = '';
      await engine.start(null);
    };

    newGameBtn.addEventListener('click', () => {
      if (hasValidSave) {
        actions.hidden = true;
        confirmBox.hidden = false;
      } else {
        startFreshGame();
      }
    });

    confirmYesBtn.addEventListener('click', () => {
      startFreshGame();
    });

    confirmCancelBtn.addEventListener('click', () => {
      confirmBox.hidden = true;
      actions.hidden = false;
    });

    closeBtn.addEventListener('click', () => {
      modalRoot.hidden = true;
      modalRoot.innerHTML = '';
    });

    actions.append(continueBtn, newGameBtn, closeBtn);
    card.append(title, subtitle, actions, confirmBox);
    modalRoot.appendChild(card);
  }

  // Settings modal (speed 0/20/35/60, auto, volume/mute, reducedMotion)
  function openSettingsModal() {
    const st = engine.getState();
    const cur = st.settings || {};

    modalRoot.innerHTML = '';
    modalRoot.hidden = false;

    const card = document.createElement('div');
    card.className = 'modal-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');

    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = 'Настройки';

    // Speed selector (0 / 20 / 35 / 60)
    const speedGroup = document.createElement('div');
    speedGroup.className = 'settings-group';
    const speedLabel = document.createElement('div');
    speedLabel.className = 'settings-label';
    speedLabel.textContent = 'Скорость текста (символов/сек):';
    const speedRow = document.createElement('div');
    speedRow.className = 'settings-speed-row';

    [
      { value: 20, label: '20 (медл.)' },
      { value: 35, label: '35 (обычн.)' },
      { value: 60, label: '60 (быстро)' },
      { value: 0, label: '0 (мгнов.)' },
    ].forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ui-btn ui-btn-compact';
      if (Number(cur.speed) === item.value) btn.classList.add('is-active');
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        speedRow.querySelectorAll('button').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        engine.setSettings({ speed: item.value });
      });
      speedRow.appendChild(btn);
    });
    speedGroup.append(speedLabel, speedRow);

    // Toggles: Auto, Mute, Reduced Motion
    const togglesGroup = document.createElement('div');
    togglesGroup.className = 'settings-group';

    const makeToggle = (labelText, initialValue, onChange) => {
      const row = document.createElement('label');
      row.className = 'settings-toggle-row';
      const span = document.createElement('span');
      span.textContent = labelText;
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = Boolean(initialValue);
      input.addEventListener('change', () => onChange(input.checked));
      row.append(span, input);
      return row;
    };

    togglesGroup.append(
      makeToggle('Автопродвижение реплик (Auto)', cur.auto, (val) => engine.setSettings({ auto: val })),
      makeToggle('Отключить звук', cur.muted, (val) => engine.setSettings({ muted: val })),
      makeToggle('Уменьшить анимации (Reduced Motion)', cur.reducedMotion, (val) =>
        engine.setSettings({ reducedMotion: val })
      )
    );

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'ui-btn modal-btn is-primary';
    closeBtn.textContent = 'Закрыть';
    closeBtn.addEventListener('click', () => {
      modalRoot.hidden = true;
      modalRoot.innerHTML = '';
    });

    card.append(title, speedGroup, togglesGroup, closeBtn);
    modalRoot.appendChild(card);
  }

  bus.on('ui:openMenu', () => openMenuModal({ isInitialBoot: false }));
  bus.on('ui:openSettings', () => openSettingsModal());

  // Mount debug panel only when ?debug=1 is present in URL
  const params = new URLSearchParams(window.location.search);
  if (params.get('debug') === '1') {
    mountDebug(engine, appRoot, bus);
  }

  // Initial boot: restore valid save or start Scene 1, and display Continue / New Game modal if save exists or corrupted
  const initialInspection = save.inspect();
  if (initialInspection.status === 'valid' && initialInspection.state) {
    await engine.start(initialInspection.state);
    openMenuModal({ isInitialBoot: false });
  } else if (
    initialInspection.status === 'corrupted' ||
    initialInspection.status === 'version_mismatch'
  ) {
    await engine.start(null);
    openMenuModal({ isInitialBoot: true });
  } else {
    await engine.start(null);
  }
}

bootstrap();

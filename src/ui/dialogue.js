import { bus as defaultBus } from '../events.js';

export const SPEAKER_LABELS_RU = Object.freeze({
  andromeda: 'Андромеда',
  azalia: 'Азалия',
  blaise: 'Блейз',
  cedric: 'Седрик',
  dima: 'Дима',
  dumbledore: 'Дамблдор',
  elizabeth: 'Элизабет',
  harry: 'Гарри',
  hermione: 'Гермиона',
  malfoy: 'Малфой',
  mcgonagall: 'Макгонагалл',
  nott: 'Нотт',
  pansy: 'Пэнси',
  regulus: 'Регулус',
  ron: 'Рон',
  rose: 'Роуз',
  snape: 'Снейп',
  sprout: 'Профессор Стебль',
  theo: 'Тео Блэк',
  twins: 'Фред и Джордж',
  fred: 'Фред',
  george: 'Джордж',
  theo_azalia: 'Тео и Азалия',
  sorting_hat: 'Распределяющая шляпа',
  crowd: 'Голоса в зале',
  prefect: 'Староста',
  duel_teacher: 'Преподаватель',
  librarian: 'Библиотекарь',
});

export function getSpeakerLabel(speakerId) {
  if (!speakerId) return '';
  return SPEAKER_LABELS_RU[speakerId] || speakerId;
}

/**
 * createDialogue(root, bus, { hudRoot }) — hudRoot (optional) receives the quick controls
 * (Авто / Пропуск / Настройки / Меню) so they live in the top-right corner of the stage
 * instead of inside the dialogue panel (owner-approved layout, docs/OPEN_QUESTIONS.md Q-L01).
 */
export function createDialogue(root, bus = defaultBus, { hudRoot = null } = {}) {
  if (!root) throw new Error('Dialogue root element is required');

  let settings = {
    speed: 35,
    auto: false,
    volume: 0.7,
    muted: false,
    reducedMotion: false,
  };

  let currentNode = null;
  let fullText = '';
  let revealedChars = 0;
  let isTyping = false;
  let isChoiceActive = false;
  let isRetryActive = false;
  let skipActive = false;
  let canSkipCurrent = false;

  let rafId = null;
  let lastTickTs = 0;
  let autoTimer = null;
  let activePointerId = null;
  let pointerStartPos = null;

  root.innerHTML = '';
  root.classList.add('dialogue-panel');

  // Top bar inside dialogue panel: speaker badge + quick controls
  const headerEl = document.createElement('div');
  headerEl.className = 'dialogue-header';

  const speakerBadgeEl = document.createElement('div');
  speakerBadgeEl.className = 'dialogue-speaker';
  speakerBadgeEl.hidden = true;

  const controlsBarEl = document.createElement('div');
  controlsBarEl.className = 'dialogue-controls';

  const autoBtn = document.createElement('button');
  autoBtn.type = 'button';
  autoBtn.className = 'ui-btn ui-btn-compact';
  autoBtn.textContent = 'Авто';
  autoBtn.setAttribute('aria-pressed', 'false');

  const skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className = 'ui-btn ui-btn-compact';
  skipBtn.textContent = 'Пропуск';
  skipBtn.setAttribute('aria-pressed', 'false');
  skipBtn.title = 'Пропускает только уже прочитанные реплики';

  const settingsBtn = document.createElement('button');
  settingsBtn.type = 'button';
  settingsBtn.className = 'ui-btn ui-btn-compact';
  settingsBtn.textContent = 'Настройки';

  const menuBtn = document.createElement('button');
  menuBtn.type = 'button';
  menuBtn.className = 'ui-btn ui-btn-compact';
  menuBtn.textContent = 'Меню';

  controlsBarEl.append(autoBtn, skipBtn, settingsBtn, menuBtn);

  // Scrollable text container (pan-y allowed for long speeches)
  const bodyEl = document.createElement('div');
  bodyEl.className = 'dialogue-body';

  const textEl = document.createElement('div');
  textEl.className = 'dialogue-text';
  bodyEl.appendChild(textEl);

  // Choices vertical stack
  const choicesEl = document.createElement('div');
  choicesEl.className = 'dialogue-choices';
  choicesEl.hidden = true;

  // Retry / Skip bar for minigames
  const retryEl = document.createElement('div');
  retryEl.className = 'dialogue-retry';
  retryEl.hidden = true;

  // "Далее" lives in the name row (saves a whole text line in the compact overlay panel)
  const HINT_TYPING = 'Нажмите, чтобы показать весь текст';
  const HINT_NEXT = 'Нажмите для продолжения';

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'ui-btn dialogue-next-btn';
  nextBtn.textContent = 'Далее ▸';
  nextBtn.setAttribute('aria-label', HINT_NEXT);

  headerEl.append(speakerBadgeEl, nextBtn);
  root.append(headerEl, bodyEl, choicesEl, retryEl);

  if (hudRoot) {
    hudRoot.innerHTML = '';
    hudRoot.appendChild(controlsBarEl);
  } else {
    headerEl.insertBefore(controlsBarEl, nextBtn);
  }

  function setHint(text) {
    nextBtn.setAttribute('aria-label', text);
    nextBtn.title = text;
  }

  function stopTimers() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (autoTimer !== null) {
      window.clearTimeout(autoTimer);
      autoTimer = null;
    }
  }

  function scheduleAutoAdvance() {
    if (autoTimer !== null) {
      window.clearTimeout(autoTimer);
      autoTimer = null;
    }
    if (!settings.auto || isChoiceActive || isRetryActive || !currentNode) return;
    const waitMs = Math.max(1800, 60 * fullText.length);
    autoTimer = window.setTimeout(() => {
      autoTimer = null;
      if (settings.auto && !isTyping && !isChoiceActive && !isRetryActive) {
        bus?.emit?.('ui:advance', { source: 'auto' });
      }
    }, waitMs);
  }

  function finishTyping() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    isTyping = false;
    revealedChars = fullText.length;
    textEl.textContent = fullText;
    root.classList.remove('is-typing');
    setHint(HINT_NEXT);
    scheduleAutoAdvance();
  }

  function tickTypewriter(ts) {
    if (!isTyping) return;
    if (!lastTickTs) lastTickTs = ts;
    const elapsedMs = Math.min(ts - lastTickTs, 50);
    lastTickTs = ts;

    const charsPerSec = Number(settings.speed);
    if (!charsPerSec || charsPerSec <= 0) {
      finishTyping();
      return;
    }

    revealedChars += (elapsedMs / 1000) * charsPerSec;
    const count = Math.floor(revealedChars);
    if (count >= fullText.length) {
      finishTyping();
      return;
    }

    textEl.textContent = fullText.slice(0, count);
    rafId = window.requestAnimationFrame(tickTypewriter);
  }

  function show(node, options = {}) {
    stopTimers();
    root.hidden = false;
    currentNode = node;
    isChoiceActive = false;
    isRetryActive = false;
    choicesEl.hidden = true;
    choicesEl.innerHTML = '';
    retryEl.hidden = true;
    retryEl.innerHTML = '';
    nextBtn.hidden = false;
    root.classList.remove('has-choices');

    canSkipCurrent = Boolean(options.isRead);
    skipBtn.disabled = !canSkipCurrent && !skipActive;

    const type = node?.type || 'dialogue';
    const speaker = node?.speaker || null;
    const stageNote = options?.stageNote ? String(options.stageNote).trim() : '';
    fullText = String(node?.text || '');

    // Reset text style classes
    textEl.className = 'dialogue-text';
    root.dataset.nodeType = type;
    root.dataset.speaker = speaker || '';

    if (type === 'narration' || !speaker) {
      speakerBadgeEl.hidden = true;
      speakerBadgeEl.textContent = '';
      textEl.classList.add('is-narration');
    } else {
      speakerBadgeEl.hidden = false;
      const label = getSpeakerLabel(speaker);
      const baseTitle = type === 'thought' ? `${label} (мысли)` : label;
      speakerBadgeEl.textContent = stageNote ? `${baseTitle} · ${stageNote}` : baseTitle;
      if (type === 'thought') {
        textEl.classList.add('is-thought', `thought-${speaker}`);
      } else {
        textEl.classList.add('is-dialogue');
      }
    }

    bodyEl.scrollTop = 0;

    const speed = Number(settings.speed);
    if (speed === 0 || fullText.length === 0 || skipActive) {
      finishTyping();
    } else {
      isTyping = true;
      revealedChars = 0;
      lastTickTs = 0;
      textEl.textContent = '';
      root.classList.add('is-typing');
      setHint(HINT_TYPING);
      rafId = window.requestAnimationFrame(tickTypewriter);
    }
  }

  function showChoices(options = [], promptText = null) {
    stopTimers();
    if (isTyping) finishTyping();
    isChoiceActive = true;
    isRetryActive = false;
    setSkipActive(false);

    if (promptText) {
      fullText = String(promptText);
      textEl.textContent = fullText;
    }

    choicesEl.innerHTML = '';
    choicesEl.hidden = false;
    nextBtn.hidden = true;
    root.classList.add('has-choices');

    options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ui-btn dialogue-choice-btn';
      btn.dataset.optionId = opt.id;
      btn.textContent = opt.text || `Вариант ${idx + 1}`;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isChoiceActive) return;
        isChoiceActive = false;
        choicesEl.hidden = true;
        bus?.emit?.('ui:choice', { optionId: opt.id });
      });
      choicesEl.appendChild(btn);
    });
  }

  function showRetry({ kind = 'minigame', message = 'Испытание не пройдено. Попробовать снова или пропустить?' } = {}) {
    stopTimers();
    if (isTyping) finishTyping();
    isRetryActive = true;
    isChoiceActive = false;
    setSkipActive(false);

    speakerBadgeEl.hidden = false;
    speakerBadgeEl.textContent = 'Испытание';
    textEl.className = 'dialogue-text is-narration';
    textEl.textContent = message;

    retryEl.innerHTML = '';
    retryEl.hidden = false;
    nextBtn.hidden = true;
    root.classList.add('has-choices');

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'ui-btn dialogue-choice-btn';
    retryBtn.textContent = 'Повторить попытку';
    retryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isRetryActive) return;
      isRetryActive = false;
      retryEl.hidden = true;
      bus?.emit?.('ui:retry', { action: 'retry', kind });
    });

    const skipGameBtn = document.createElement('button');
    skipGameBtn.type = 'button';
    skipGameBtn.className = 'ui-btn dialogue-choice-btn';
    skipGameBtn.textContent = 'Пропустить испытание';
    skipGameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isRetryActive) return;
      isRetryActive = false;
      retryEl.hidden = true;
      bus?.emit?.('ui:retry', { action: 'skip', kind });
    });

    retryEl.append(retryBtn, skipGameBtn);
  }

  function handleAdvanceTrigger() {
    if (isChoiceActive || isRetryActive) return;
    if (skipActive) {
      setSkipActive(false);
    }
    if (isTyping) {
      finishTyping();
    } else {
      bus?.emit?.('ui:advance', { source: 'user' });
    }
  }

  function setSkipActive(nextSkip) {
    skipActive = Boolean(nextSkip);
    skipBtn.classList.toggle('is-active', skipActive);
    skipBtn.setAttribute('aria-pressed', String(skipActive));
  }

  function setSettings(nextSettings = {}) {
    settings = {
      ...settings,
      ...nextSettings,
    };
    autoBtn.classList.toggle('is-active', Boolean(settings.auto));
    autoBtn.setAttribute('aria-pressed', String(Boolean(settings.auto)));
    if (settings.auto && !isTyping && !isChoiceActive && !isRetryActive) {
      scheduleAutoAdvance();
    } else if (!settings.auto && autoTimer !== null) {
      window.clearTimeout(autoTimer);
      autoTimer = null;
    }
  }

  // Button listeners
  const onAutoClick = (e) => {
    e.stopPropagation();
    const nextAuto = !settings.auto;
    setSettings({ auto: nextAuto });
    bus?.emit?.('ui:settings', { settings: { ...settings } });
  };

  const onSkipClick = (e) => {
    e.stopPropagation();
    if (isChoiceActive || isRetryActive) return;
    const nextSkip = !skipActive;
    setSkipActive(nextSkip);
    bus?.emit?.('ui:skip', { active: nextSkip });
  };

  const onSettingsClick = (e) => {
    e.stopPropagation();
    bus?.emit?.('ui:openSettings', {});
  };

  const onMenuClick = (e) => {
    e.stopPropagation();
    bus?.emit?.('ui:openMenu', {});
  };

  const onNextClick = (e) => {
    e.stopPropagation();
    handleAdvanceTrigger();
  };

  // Pointer handling on panel body/footer with pointercancel protection
  const onPointerDown = (e) => {
    if (e.target.closest('button, a, input, select')) return;
    activePointerId = e.pointerId;
    pointerStartPos = { x: e.clientX, y: e.clientY, scrollTop: bodyEl.scrollTop };
  };

  const onPointerUp = (e) => {
    if (activePointerId === null || e.pointerId !== activePointerId) return;
    const start = pointerStartPos;
    activePointerId = null;
    pointerStartPos = null;
    if (!start) return;

    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    const scrolled = Math.abs(bodyEl.scrollTop - start.scrollTop) > 6;
    if (dx < 14 && dy < 14 && !scrolled) {
      handleAdvanceTrigger();
    }
  };

  const onPointerCancel = () => {
    activePointerId = null;
    pointerStartPos = null;
  };

  autoBtn.addEventListener('click', onAutoClick);
  skipBtn.addEventListener('click', onSkipClick);
  settingsBtn.addEventListener('click', onSettingsClick);
  menuBtn.addEventListener('click', onMenuClick);
  nextBtn.addEventListener('click', onNextClick);
  root.addEventListener('pointerdown', onPointerDown);
  root.addEventListener('pointerup', onPointerUp);
  root.addEventListener('pointercancel', onPointerCancel);

  function destroy() {
    stopTimers();
    autoBtn.removeEventListener('click', onAutoClick);
    skipBtn.removeEventListener('click', onSkipClick);
    settingsBtn.removeEventListener('click', onSettingsClick);
    menuBtn.removeEventListener('click', onMenuClick);
    nextBtn.removeEventListener('click', onNextClick);
    root.removeEventListener('pointerdown', onPointerDown);
    root.removeEventListener('pointerup', onPointerUp);
    root.removeEventListener('pointercancel', onPointerCancel);
    if (controlsBarEl.parentNode) controlsBarEl.parentNode.removeChild(controlsBarEl);
    root.innerHTML = '';
  }

  function setOverlayMode(active) {
    root.hidden = Boolean(active);
  }

  return {
    show,
    showChoices,
    showRetry,
    setSettings,
    setSkipActive,
    setOverlayMode,
    isTyping: () => isTyping,
    completeTyping: finishTyping,
    triggerAdvance: handleAdvanceTrigger,
    destroy,
  };
}

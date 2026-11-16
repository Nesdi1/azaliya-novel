import { bus as defaultBus } from '../events.js';

/**
 * Cutscene & living train-transition player (03_ARCHITECTURE + 05_CUTSCENES):
 * play(container, definitionOrId, { signal, assets, reducedMotion, preloadPromise })
 *   -> Promise<{ status: 'completed'|'skipped'|'fallback' }>
 */
const CUTSCENE_DEFS = {
  cs01: {
    id: 'cs01',
    kind: 'train',
    durationMs: 4500,
    caption: 'Хогвартс-экспресс мчится на север. Тео крепко спит, а Азалия задумчиво смотрит в окно…',
    fallback: {
      background: 'bg_train',
      characters: ['azalia', 'theo'],
    },
  },
  cs02: {
    id: 'cs02',
    kind: 'Sequence',
    durationMs: 4200,
    caption: 'За круглым окном гаснут звёзды, ночь сменяется утром, и первый луч солнца ложится на лицо Азалии…',
    steps: [
      {
        atMs: 0,
        background: 'bg_hufflepuff_dorm',
        characters: ['azalia'],
        cues: [
          { target: 'azalia', effect: 'focus' },
          { target: 'azalia', effect: 'breathe', durationMs: 2800 },
          { effect: 'camera', to: 1.03, durationMs: 1800 },
        ],
      },
      {
        atMs: 2000,
        background: 'bg_hufflepuff_dorm_morning',
        characters: ['azalia'],
        cues: [
          { target: 'azalia', effect: 'focus' },
          { effect: 'glow', to: 0.28, durationMs: 1400 },
          { effect: 'camera', to: 1.05, durationMs: 1800 },
        ],
      },
    ],
    fallback: {
      background: 'bg_hufflepuff_dorm_morning',
      characters: ['azalia'],
    },
  },
  cs03: {
    id: 'cs03',
    kind: 'Sequence',
    durationMs: 4800,
    caption: 'Проходит неделя: Азалия, Тео, Гарри, Рон, Гермиона и близнецы Уизли становятся неразлучной компанией…',
    steps: [
      {
        atMs: 0,
        background: 'bg_corridor',
        characters: ['theo', 'harry', 'ron', 'azalia'],
        cues: [
          { target: 'theo', effect: 'bounce', amplitude: 8, durationMs: 520 },
          { target: 'ron', effect: 'bounce', amplitude: 8, durationMs: 520, delayMs: 160 },
        ],
      },
      {
        atMs: 1600,
        background: 'bg_great_hall',
        characters: ['hermione', 'harry', 'twins', 'azalia'],
        cues: [
          { target: 'twins', effect: 'bounce', amplitude: 9, durationMs: 520 },
          { target: 'hermione', effect: 'tilt', amplitude: -2, durationMs: 500, delayMs: 140 },
        ],
      },
      {
        atMs: 3200,
        background: 'bg_fountain_day',
        characters: ['theo', 'hermione', 'twins', 'azalia'],
        cues: [
          { target: 'azalia', effect: 'focus' },
          { effect: 'glow', to: 0.2, durationMs: 900 },
        ],
      },
    ],
    fallback: {
      background: 'bg_fountain_day',
      characters: ['theo', 'hermione', 'twins', 'azalia'],
    },
  },
  cs04: {
    id: 'cs04',
    kind: 'Sequence',
    durationMs: 4800,
    caption: 'Роуз входит в их компанию, а в коридорах и библиотеке взгляды Азалии и Димы пересекаются всё чаще…',
    steps: [
      {
        atMs: 0,
        background: 'bg_library',
        characters: ['rose', 'hermione', 'azalia'],
        cues: [
          { effect: 'group', targets: ['rose', 'azalia'], durationMs: 600 },
          { target: 'rose', effect: 'bounce', amplitude: 7, durationMs: 500 },
        ],
      },
      {
        atMs: 1600,
        background: 'bg_corridor',
        characters: ['dima', 'rose', 'azalia'],
        cues: [
          { target: 'dima', effect: 'focus' },
          { effect: 'glow', to: 0.24, durationMs: 800 },
          { effect: 'camera', to: 1.04, durationMs: 1200 },
        ],
      },
      {
        atMs: 3200,
        background: 'bg_great_hall',
        characters: ['harry', 'ron', 'rose', 'azalia'],
        cues: [
          { target: 'azalia', effect: 'focus' },
          { effect: 'camera', to: 1, durationMs: 800 },
          { effect: 'glow', to: 0.15, durationMs: 800 },
        ],
      },
    ],
    fallback: {
      background: 'bg_great_hall',
      characters: ['harry', 'ron', 'rose', 'azalia'],
    },
  },
  cs05: {
    id: 'cs05',
    kind: 'Sequence',
    durationMs: 4600,
    caption: 'Успокоившись, Азалия читает у фонтана при свете луны, из окна замка на неё смотрит Дима, а затем она крепко засыпает в своей постели…',
    steps: [
      {
        atMs: 0,
        background: 'bg_fountain_night',
        characters: ['dima', 'azalia'],
        cues: [
          { target: 'azalia', effect: 'focus' },
          { effect: 'camera', to: 1.04, durationMs: 2200 },
          { effect: 'glow', to: 0.22, durationMs: 1400 },
        ],
      },
      {
        atMs: 2400,
        background: 'bg_hufflepuff_dorm',
        characters: ['azalia'],
        cues: [
          { target: 'azalia', effect: 'focus' },
          { target: 'azalia', effect: 'breathe', durationMs: 2800 },
          { effect: 'glow', to: 0.16, durationMs: 1200 },
        ],
      },
    ],
    fallback: {
      background: 'bg_hufflepuff_dorm',
      characters: ['azalia'],
    },
  },
  cs06: {
    id: 'cs06',
    kind: 'Sequence',
    durationMs: 3000,
    caption: 'Роуз, смеясь, идёт вместе с Азалией по коридору в библиотеку…',
    steps: [
      {
        atMs: 0,
        background: 'bg_corridor',
        characters: ['rose', 'azalia'],
        cues: [
          { effect: 'group', targets: ['rose', 'azalia'], durationMs: 600 },
          { target: 'rose', effect: 'bounce', amplitude: 7, durationMs: 520 },
          { target: 'azalia', effect: 'breathe', durationMs: 2800 },
        ],
      },
    ],
    fallback: {
      background: 'bg_corridor',
      characters: ['rose', 'azalia'],
    },
  },
  cs07: {
    id: 'cs07',
    kind: 'Sequence',
    durationMs: 3000,
    caption: 'Тео решительно шагает по коридору к выходу во двор, сжимая кулаки…',
    steps: [
      {
        atMs: 0,
        background: 'bg_corridor',
        characters: ['theo'],
        cues: [
          { target: 'theo', effect: 'focus' },
          { target: 'theo', effect: 'shake', amplitude: 3, durationMs: 450 },
          { effect: 'camera', to: 1.03, durationMs: 1800 },
        ],
      },
    ],
    fallback: {
      background: 'bg_corridor',
      characters: ['theo'],
    },
  },
  cs08: {
    id: 'cs08',
    kind: 'Sequence',
    durationMs: 5200,
    caption: 'Азалия и Дима сидят рядом над одной книгой в библиотеке, обнимаются в коридоре, а ночью в своих спальнях не могут уснуть и счастливо улыбаются в темноту…',
    steps: [
      {
        atMs: 0,
        background: 'bg_library',
        characters: ['dima', 'azalia'],
        cues: [
          { effect: 'group', targets: ['dima', 'azalia'], durationMs: 600 },
          { effect: 'glow', to: 0.24, durationMs: 1000 },
        ],
      },
      {
        atMs: 1800,
        background: 'bg_corridor',
        characters: ['dima', 'azalia'],
        cues: [
          { effect: 'group', targets: ['dima', 'azalia'], durationMs: 600 },
          { target: 'dima', effect: 'tilt', amplitude: 2, hold: true, durationMs: 500 },
          { target: 'azalia', effect: 'tilt', amplitude: -2, hold: true, durationMs: 500 },
          { effect: 'camera', to: 1.05, durationMs: 1200 },
        ],
      },
      {
        atMs: 3500,
        background: 'bg_hufflepuff_dorm',
        characters: ['azalia', 'dima'],
        cues: [
          { target: 'dima', effect: 'tilt', amplitude: 0, hold: true, durationMs: 400 },
          { target: 'azalia', effect: 'tilt', amplitude: 0, hold: true, durationMs: 400 },
          { effect: 'group', targets: [], durationMs: 500 },
          { effect: 'camera', to: 1, durationMs: 800 },
          { effect: 'glow', to: 0.28, durationMs: 1200 },
        ],
      },
    ],
    fallback: {
      background: 'bg_hufflepuff_dorm',
      characters: ['azalia', 'dima'],
    },
  },
  cs09: {
    id: 'cs09',
    kind: 'Sequence',
    durationMs: 4200,
    caption: 'Азалия и Тео выходят к друзьям, продолжая смеяться, и вся компания вместе с Димой отправляется гулять…',
    steps: [
      {
        atMs: 0,
        background: 'bg_corridor',
        characters: ['theo', 'azalia', 'rose', 'dima'],
        cues: [
          { target: 'theo', effect: 'bounce', amplitude: 8, durationMs: 520 },
          { target: 'dima', effect: 'focus', delayMs: 250 },
          { effect: 'glow', to: 0.22, durationMs: 1000 },
        ],
      },
      {
        atMs: 2100,
        background: 'bg_fountain_day',
        characters: ['twins', 'theo', 'azalia', 'dima'],
        cues: [
          { target: 'twins', effect: 'bounce', amplitude: 8, durationMs: 520 },
          { effect: 'group', targets: ['azalia', 'dima'], durationMs: 650 },
        ],
      },
    ],
    fallback: {
      background: 'bg_fountain_day',
      characters: ['twins', 'theo', 'azalia', 'dima'],
    },
  },
  cs10: {
    id: 'cs10',
    kind: 'Sequence',
    durationMs: 4800,
    caption: 'Азалия и Дима гуляют по замку, держась за руки, Дима кружит её на руках, а затем перед нами ложится чистый пергамент и волшебная палочка…',
    steps: [
      {
        atMs: 0,
        background: 'bg_corridor',
        characters: ['dima', 'azalia'],
        cues: [
          { effect: 'group', targets: ['dima', 'azalia'], durationMs: 650 },
          { target: 'dima', effect: 'tilt', amplitude: 2.2, hold: true, durationMs: 550 },
          { target: 'azalia', effect: 'tilt', amplitude: -2.2, hold: true, durationMs: 550 },
          { effect: 'camera', to: 1.05, durationMs: 1600 },
          { effect: 'glow', to: 0.3, durationMs: 1600 },
        ],
      },
      {
        atMs: 2800,
        background: 'bg_parchment_clean',
        characters: [],
        cues: [
          { effect: 'camera', to: 1, durationMs: 800 },
          { effect: 'glow', to: 0.18, durationMs: 1000 },
        ],
      },
    ],
    fallback: {
      background: 'bg_parchment_clean',
      characters: [],
    },
  },
  cs06_duel_demo: {
    id: 'cs06_duel_demo',
    kind: 'Sequence',
    durationMs: 3600,
    caption: 'Тео и Дима выходят на помост: вспышки заклинаний озаряют дуэльный зал…',
    steps: [
      {
        atMs: 0,
        background: 'bg_dueling_hall',
        characters: ['theo', 'dima', 'azalia'],
        cues: [
          { effect: 'shake', amplitude: 3.5, durationMs: 450 },
          { effect: 'glow', to: 0.25, durationMs: 800 },
        ],
      },
    ],
    fallback: {
      background: 'bg_dueling_hall',
      characters: ['theo', 'dima', 'azalia'],
    },
  },
  cs06_lake: {
    id: 'cs06_lake',
    kind: 'Sequence',
    durationMs: 3600,
    caption: 'У Чёрного озера заклинание Димы подбрасывает Малфоя в воздух, и тот с плеском летит в воду…',
    steps: [
      {
        atMs: 0,
        background: 'bg_black_lake',
        characters: ['dima', 'malfoy', 'pansy', 'azalia'],
        cues: [
          { effect: 'shake', amplitude: 4, durationMs: 450 },
          { target: 'pansy', effect: 'bounce', amplitude: 9, durationMs: 520 },
        ],
      },
    ],
    fallback: {
      background: 'bg_black_lake',
      characters: ['dima', 'azalia'],
    },
  },
};

function buildTrainSceneDOM({ captionText, showSkip = true, reducedMotion = false }) {
  const overlay = document.createElement('div');
  overlay.className = 'train-transition-overlay';
  if (reducedMotion) overlay.classList.add('is-reduced-motion');

  const carriage = document.createElement('div');
  carriage.className = 'train-carriage';

  // Window viewport with scrolling landscape silhouettes, clouds, and sunbeams outside the glass
  const windowMask = document.createElement('div');
  windowMask.className = 'train-window-mask';
  windowMask.setAttribute('aria-hidden', 'true');

  const skyStrip = document.createElement('div');
  skyStrip.className = 'train-window-sky';

  const hillsFar = document.createElement('div');
  hillsFar.className = 'train-window-hills-far';

  const hillsNear = document.createElement('div');
  hillsNear.className = 'train-window-hills-near';

  const treesStrip = document.createElement('div');
  treesStrip.className = 'train-window-trees';

  const windowGlint = document.createElement('div');
  windowGlint.className = 'train-window-glint';

  const windowMullion = document.createElement('div');
  windowMullion.className = 'train-window-mullion';

  windowMask.append(skyStrip, hillsFar, hillsNear, treesStrip, windowGlint, windowMullion);

  // Compartment background image
  const bgImg = document.createElement('img');
  bgImg.className = 'train-bg-img';
  bgImg.src = './assets/backgrounds/bg_train.webp';
  bgImg.alt = '';
  bgImg.draggable = false;

  // Characters layer: Azalia thoughtfully watching the window, Theo sleeping beside her
  const charsWrap = document.createElement('div');
  charsWrap.className = 'train-chars-wrap';

  const azaliaWrap = document.createElement('div');
  azaliaWrap.className = 'train-char train-char-azalia';
  const azaliaImg = document.createElement('img');
  azaliaImg.src = './assets/characters/azalia.webp';
  azaliaImg.alt = 'Азалия смотрит в окно поезда';
  azaliaImg.draggable = false;
  azaliaWrap.appendChild(azaliaImg);

  const theoWrap = document.createElement('div');
  theoWrap.className = 'train-char train-char-theo';
  const theoImg = document.createElement('img');
  theoImg.src = './assets/characters/theo.webp';
  theoImg.alt = 'Тео спит в поезде';
  theoImg.draggable = false;

  // Floating Zzz sleep particles above Theo
  const zzzContainer = document.createElement('div');
  zzzContainer.className = 'train-zzz-container';
  zzzContainer.setAttribute('aria-hidden', 'true');
  ['Z', 'z', 'z'].forEach((letter, idx) => {
    const span = document.createElement('span');
    span.className = `train-zzz train-zzz-${idx + 1}`;
    span.textContent = letter;
    zzzContainer.appendChild(span);
  });

  theoWrap.append(theoImg, zzzContainer);
  charsWrap.append(azaliaWrap, theoWrap);

  // Sunbeam overlay inside the compartment
  const rays = document.createElement('div');
  rays.className = 'train-light-rays';
  rays.setAttribute('aria-hidden', 'true');

  // Bottom vignette & caption bar
  const footer = document.createElement('div');
  footer.className = 'train-footer';

  const caption = document.createElement('div');
  caption.className = 'train-caption';
  caption.textContent = captionText || 'Поезд мчится в Хогвартс…';

  const skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className = 'ui-btn cutscene-skip-btn';
  skipBtn.textContent = 'Пропустить ▸';
  skipBtn.hidden = !showSkip;

  footer.append(caption, skipBtn);
  carriage.append(bgImg, windowMask, charsWrap, rays);
  overlay.append(carriage, footer);

  return { overlay, skipBtn, caption };
}

export function createCutscenePlayer(stage, bus = defaultBus) {
  let lastFinishedAt = 0;

  async function play(container, definitionOrId, { signal, reducedMotion = false, preloadPromise = null } = {}) {
    const def =
      typeof definitionOrId === 'string'
        ? CUTSCENE_DEFS[definitionOrId] || {
            id: definitionOrId,
            kind: 'train',
            durationMs: 3200,
            caption: `Переход (${definitionOrId})…`,
            fallback: { background: 'bg_train', characters: ['azalia', 'theo'] },
          }
        : definitionOrId || CUTSCENE_DEFS.cs01;

    const id = def.id || 'cs01';
    const fb = def.fallback || { background: 'bg_train', characters: ['azalia', 'theo'] };

    if (!container) {
      if (stage && fb.background) {
        await stage.enter({ background: fb.background, characters: fb.characters || [] });
      }
      bus?.emit?.('cutscene:end', { id, status: 'fallback' });
      return { status: 'fallback' };
    }

    if (def.kind === 'train' || id === 'cs01') {
      await stage?.preload?.(['bg_train', 'azalia', 'theo']);
    }

    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(new DOMException('Cutscene aborted', 'AbortError'));
        return;
      }

      const stepTimers = [];
      let overlay;
      let skipBtn;

      if (def.kind === 'train' || id === 'cs01') {
        const built = buildTrainSceneDOM({
          captionText: def.caption,
          showSkip: true,
          reducedMotion,
        });
        overlay = built.overlay;
        skipBtn = built.skipBtn;
      } else {
        overlay = document.createElement('div');
        overlay.className = 'cutscene-overlay';

        const footer = document.createElement('div');
        footer.className = 'train-footer';

        const caption = document.createElement('div');
        caption.className = 'train-caption';
        caption.textContent = def.caption || '';

        skipBtn = document.createElement('button');
        skipBtn.type = 'button';
        skipBtn.className = 'ui-btn cutscene-skip-btn';
        skipBtn.textContent = 'Пропустить ▸';

        footer.append(caption, skipBtn);
        overlay.appendChild(footer);

        const steps = Array.isArray(def.steps) ? def.steps : [];
        if (reducedMotion || steps.length === 0) {
          stage?.enter?.({ background: fb.background, characters: fb.characters || [] });
        } else {
          steps.forEach((st) => {
            const tid = window.setTimeout(async () => {
              await stage?.enter?.({ background: st.background, characters: st.characters || [] });
              (st.cues || []).forEach((c) => stage?.cue?.(c));
            }, Math.max(0, Number(st.atMs) || 0));
            stepTimers.push(tid);
          });
        }
      }

      container.innerHTML = '';
      container.appendChild(overlay);

      let settled = false;
      const duration = reducedMotion ? 1500 : Number(def.durationMs) || 4000;

      const cleanup = () => {
        window.clearTimeout(timer);
        stepTimers.forEach((t) => window.clearTimeout(t));
        skipBtn?.removeEventListener?.('click', onSkip);
        signal?.removeEventListener?.('abort', onAbort);
      };

      const finish = async (status) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (preloadPromise) {
          try {
            await preloadPromise;
          } catch (_) {
            // Ignore preload errors
          }
        }
        if (status === 'skipped' && def.kind !== 'train' && stage && fb.background) {
          await stage.enter({ background: fb.background, characters: fb.characters || [] });
        }
        overlay.classList.add('is-fading-out');
        await new Promise((r) => window.setTimeout(r, reducedMotion ? 60 : 360));
        if (overlay.parentNode === container) {
          container.removeChild(overlay);
        }
        lastFinishedAt = Date.now();
        bus?.emit?.('cutscene:end', { id, status });
        resolve({ status });
      };

      const onSkip = (e) => {
        e.stopPropagation();
        finish('skipped');
      };

      const onAbort = () => {
        if (settled) return;
        settled = true;
        cleanup();
        if (overlay.parentNode === container) {
          container.removeChild(overlay);
        }
        reject(new DOMException('Cutscene aborted', 'AbortError'));
      };

      skipBtn?.addEventListener?.('click', onSkip);
      signal?.addEventListener?.('abort', onAbort, { once: true });

      const timer = window.setTimeout(() => {
        finish(reducedMotion ? 'fallback' : 'completed');
      }, duration);
    });
  }

  /**
   * Shows the living train transition loader between scenes while `preloadPromise` loads the next
   * scene's assets, then smoothly fades out. If a cutscene (`cs01`..`cs04`) just completed within the
   * last 1.2s, skips the extra overlay so the transition isn't shown twice in a row.
   */
  async function playSceneTransition(container, { preloadPromise, reducedMotion = false, label = null } = {}) {
    if (!container || Date.now() - lastFinishedAt < 1200) {
      if (preloadPromise) await preloadPromise;
      return;
    }

    await stage?.preload?.(['bg_train', 'azalia', 'theo']);
    const { overlay } = buildTrainSceneDOM({
      captionText: label || 'Поезд мчится сквозь шотландские холмы… Загрузка следующей сцены',
      showSkip: false,
      reducedMotion,
    });
    container.innerHTML = '';
    container.appendChild(overlay);

    const minDisplayMs = reducedMotion ? 450 : 1650;
    await Promise.all([
      preloadPromise || Promise.resolve(),
      new Promise((r) => window.setTimeout(r, minDisplayMs)),
    ]);

    overlay.classList.add('is-fading-out');
    await new Promise((r) => window.setTimeout(r, reducedMotion ? 60 : 380));
    if (overlay.parentNode === container) {
      container.removeChild(overlay);
    }
  }

  return { play, playSceneTransition };
}

import { bus as defaultBus } from '../events.js';
import { CUTSCENES, CUTSCENE_IDS, getCutsceneDefinition } from '../data/cutscenes.js';

/**
 * Declarative Cutscene & Living Train-Transition Player (docs/03_ARCHITECTURE.md + docs/05_CUTSCENES.md):
 * play(container, definitionOrId, { signal, assets, reducedMotion, preloadPromise })
 *   -> Promise<{ status: 'completed'|'skipped'|'fallback' }>
 */

const ASSET_PATHS = Object.freeze({
  bg_manor: './assets/backgrounds/bg_manor.webp',
  bg_train: './assets/backgrounds/bg_train.webp',
  bg_great_hall: './assets/backgrounds/bg_great_hall.webp',
  bg_hufflepuff_dorm: './assets/backgrounds/bg_hufflepuff_dorm.webp',
  bg_hufflepuff_dorm_morning: './assets/backgrounds/bg_hufflepuff_dorm_morning.webp',
  bg_hufflepuff_common: './assets/backgrounds/bg_hufflepuff_common.webp',
  bg_ravenclaw_dorm: './assets/backgrounds/bg_ravenclaw_dorm.webp',
  bg_potions: './assets/backgrounds/bg_potions.webp',
  bg_corridor: './assets/backgrounds/bg_corridor.webp',
  bg_corridor_night: './assets/backgrounds/bg_corridor_night.webp',
  bg_hospital: './assets/backgrounds/bg_hospital.webp',
  bg_library: './assets/backgrounds/bg_library.webp',
  bg_classroom: './assets/backgrounds/bg_classroom.webp',
  bg_fountain_day: './assets/backgrounds/bg_fountain_day.webp',
  bg_fountain_night: './assets/backgrounds/bg_fountain_night.webp',
  bg_dueling_hall: './assets/backgrounds/bg_dueling_hall.webp',
  bg_quidditch: './assets/backgrounds/bg_quidditch.webp',
  bg_black_lake: './assets/backgrounds/bg_black_lake.webp',
  bg_greenhouse: './assets/backgrounds/bg_greenhouse.webp',
  bg_parchment_clean: './assets/backgrounds/bg_parchment_clean.webp',
  azalia: './assets/characters/azalia.webp',
  theo: './assets/characters/theo.webp',
  dima: './assets/characters/dima.webp',
  rose: './assets/characters/rose.webp',
  malfoy: './assets/characters/malfoy.webp',
  pansy: './assets/characters/pansy.webp',
  blaise: './assets/characters/blaise.webp',
  nott: './assets/characters/nott.webp',
  harry: './assets/characters/harry.webp',
  ron: './assets/characters/ron.webp',
  hermione: './assets/characters/hermione.webp',
  twins: './assets/characters/twins.webp',
  cedric: './assets/characters/cedric.webp',
  dumbledore: './assets/characters/dumbledore.webp',
  mcgonagall: './assets/characters/mcgonagall.webp',
  snape: './assets/characters/snape.webp',
  sprout: './assets/characters/sprout.webp',
  regulus: './assets/characters/regulus.webp',
  elizabeth: './assets/characters/elizabeth.webp',
  andromeda: './assets/characters/andromeda.webp',
  sorting_hat: './assets/props/sorting_hat.webp',
  magic_wand: './assets/props/magic_wand.webp',
});

function assetSrc(assetId) {
  return ASSET_PATHS[assetId] || `./assets/characters/${assetId}.webp`;
}

function clamp01(t) {
  return Math.max(0, Math.min(1, t));
}

function lerp(a, b, t) {
  return a + (b - a) * clamp01(t);
}

function easeInOutQuad(t) {
  const x = clamp01(t);
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

/**
 * Deterministic PRNG seeded by cutscene ID string (05_CUTSCENES.md: fixed seed per scene).
 */
function createSeededRandom(seedStr = 'cs') {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i += 1) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function nextRand() {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function collectDefinitionAssets(def) {
  const ids = new Set();
  for (const layer of def?.layers || []) {
    if (layer.assetId) ids.add(layer.assetId);
    if (layer.kind === 'split') {
      if (layer.left?.backgroundId) ids.add(layer.left.backgroundId);
      if (layer.left?.characterId) ids.add(layer.left.characterId);
      if (layer.right?.backgroundId) ids.add(layer.right.backgroundId);
      if (layer.right?.characterId) ids.add(layer.right.characterId);
    }
  }
  if (def?.fallback?.background) ids.add(def.fallback.background);
  for (const ch of def?.fallback?.characters || []) ids.add(ch);
  return Array.from(ids);
}

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

  windowMask.append(skyStrip, hillsFar, hillsNear, treesStrip, windowGlint);

  // Train compartment background
  const bgImg = document.createElement('img');
  bgImg.className = 'train-bg-img';
  bgImg.src = assetSrc('bg_train');
  bgImg.alt = '';
  bgImg.draggable = false;

  // Characters in compartment: Theo sleeping on the left, Azalia looking thoughtfully at the window on the right
  const charsWrap = document.createElement('div');
  charsWrap.className = 'train-chars-wrap';

  const theoWrap = document.createElement('div');
  theoWrap.className = 'train-char train-char-theo';
  const theoImg = document.createElement('img');
  theoImg.src = assetSrc('theo');
  theoImg.alt = 'Тео спит';
  theoImg.draggable = false;

  // Floating Zzz over sleeping Theo
  const zzzWrap = document.createElement('div');
  zzzWrap.className = 'train-zzz-wrap';
  zzzWrap.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i += 1) {
    const zSpan = document.createElement('span');
    zSpan.className = `train-zzz train-zzz-${i + 1}`;
    zSpan.textContent = 'Z';
    zzzWrap.appendChild(zSpan);
  }
  theoWrap.append(theoImg, zzzWrap);

  const azaliaWrap = document.createElement('div');
  azaliaWrap.className = 'train-char train-char-azalia';
  const azaliaImg = document.createElement('img');
  azaliaImg.src = assetSrc('azalia');
  azaliaImg.alt = 'Азалия смотрит в окно поезда';
  azaliaImg.draggable = false;
  azaliaWrap.appendChild(azaliaImg);

  charsWrap.append(theoWrap, azaliaWrap);

  // Warm window light overlay
  const lightOverlay = document.createElement('div');
  lightOverlay.className = 'train-light-overlay';
  lightOverlay.setAttribute('aria-hidden', 'true');

  carriage.append(bgImg, windowMask, charsWrap, lightOverlay);

  // Bottom bar with caption + loading indicator + Skip button (>= 44x44px)
  const bottomBar = document.createElement('div');
  bottomBar.className = 'train-bottom-bar';

  const textCol = document.createElement('div');
  textCol.className = 'train-caption-col';

  const badge = document.createElement('div');
  badge.className = 'train-badge';
  badge.textContent = 'Хогвартс-экспресс • В пути';

  const caption = document.createElement('p');
  caption.className = 'train-caption-text';
  caption.textContent = captionText || 'Поезд мчится сквозь шотландские холмы к замку Хогвартс…';

  textCol.append(badge, caption);
  bottomBar.appendChild(textCol);

  let skipBtn = null;
  if (showSkip) {
    skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.className = 'ui-btn ui-btn-primary train-skip-btn';
    skipBtn.textContent = 'Пропустить ▸';
    bottomBar.appendChild(skipBtn);
  }

  overlay.append(carriage, bottomBar);
  return { overlay, skipBtn, badge, caption };
}

function initParticlePool(spec, seedStr) {
  const rand = createSeededRandom(`${seedStr}:${spec.kind}`);
  const count = Math.min(150, Math.max(1, Number(spec.count) || 20));
  const list = [];
  for (let i = 0; i < count; i += 1) {
    if (spec.kind === 'zzz') {
      list.push({
        index: i,
        baseX: spec.x ?? 260,
        baseY: spec.y ?? 420,
        phase: i * 0.33,
      });
    } else if (spec.kind === 'ripples') {
      list.push({
        index: i,
        cx: (spec.x ?? 520) + (rand() - 0.5) * 90,
        cy: (spec.y ?? 880) + (rand() - 0.5) * 36,
        phase: rand(),
        maxR: 35 + rand() * 65,
      });
    } else if (spec.kind === 'sparks') {
      const angle = rand() * Math.PI * 2;
      const speed = 40 + rand() * 160;
      list.push({
        x0: 448 + (rand() - 0.5) * 140,
        y0: 620 + (rand() - 0.5) * 140,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 30,
        size: 2.2 + rand() * 3.2,
        phase: rand(),
        gold: rand() > 0.35,
      });
    } else if (spec.kind === 'fireflies') {
      list.push({
        x: 70 + rand() * 756,
        y: 220 + rand() * 760,
        ampX: 14 + rand() * 24,
        ampY: 10 + rand() * 20,
        phase: rand() * Math.PI * 2,
        size: 2.5 + rand() * 2.8,
      });
    } else {
      // stars
      list.push({
        x: 60 + rand() * 776,
        y: 60 + rand() * 520,
        phase: rand() * Math.PI * 2,
        size: 1.8 + rand() * 2.4,
      });
    }
  }
  return list;
}

function renderParticles(ctx, activeEffects, elapsedMs) {
  ctx.clearRect(0, 0, 896, 1200);
  for (const item of activeEffects) {
    const { spec, pool } = item;
    const localMs = elapsedMs - spec.atMs;
    if (localMs < 0 || localMs > spec.durationMs) continue;
    const progress = clamp01(localMs / Math.max(1, spec.durationMs));
    const fadeEnvelope =
      progress < 0.15 ? progress / 0.15 : progress > 0.85 ? (1 - progress) / 0.15 : 1;

    if (spec.kind === 'stars') {
      for (const p of pool) {
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(elapsedMs / 380 + p.phase));
        ctx.fillStyle = `rgba(255, 244, 204, ${(twinkle * fadeEnvelope).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (spec.kind === 'fireflies') {
      for (const p of pool) {
        const x = p.x + Math.sin(elapsedMs / 900 + p.phase) * p.ampX;
        const y = p.y + Math.cos(elapsedMs / 1100 + p.phase) * p.ampY;
        const glow = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(elapsedMs / 420 + p.phase));
        ctx.fillStyle = `rgba(246, 216, 124, ${(glow * fadeEnvelope).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (spec.kind === 'sparks') {
      for (const p of pool) {
        const cycle = ((localMs / 1200 + p.phase) % 1);
        const x = p.x0 + p.vx * cycle;
        const y = p.y0 + p.vy * cycle + 90 * cycle * cycle;
        const alpha = (1 - cycle) * fadeEnvelope;
        ctx.fillStyle = p.gold
          ? `rgba(255, 215, 110, ${alpha.toFixed(3)})`
          : `rgba(140, 210, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (spec.kind === 'ripples') {
      ctx.lineWidth = 2.2;
      for (const p of pool) {
        const cycle = ((localMs / 1400 + p.phase) % 1);
        const r = 8 + p.maxR * cycle;
        const alpha = (1 - cycle) * 0.75 * fadeEnvelope;
        ctx.strokeStyle = `rgba(195, 232, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(p.cx, p.cy, r, r * 0.36, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (spec.kind === 'zzz') {
      ctx.font = '700 28px Georgia, serif';
      for (const p of pool) {
        const cycle = ((localMs / 2200 + p.phase) % 1);
        const x = p.baseX + cycle * 26;
        const y = p.baseY - cycle * 64;
        const alpha = Math.sin(cycle * Math.PI) * fadeEnvelope;
        ctx.fillStyle = `rgba(243, 214, 146, ${alpha.toFixed(3)})`;
        ctx.fillText('Z', x, y);
      }
    }
  }
}

export function createCutscenePlayer(stage = null, bus = defaultBus) {
  /**
   * Living train transition screen shown between scenes while next-scene assets preload.
   */
  async function playSceneTransition(
    container,
    { preloadPromise = null, signal = null, reducedMotion = false, caption = null } = {}
  ) {
    if (!container) {
      if (preloadPromise) await preloadPromise;
      return { status: 'completed' };
    }

    await stage?.preload?.(['bg_train', 'azalia', 'theo']);

    const minDurationMs = reducedMotion ? 900 : 2400;
    return new Promise((resolve) => {
      let settled = false;
      let timerId = null;
      let fadeTimerId = null;
      let preloadDone = !preloadPromise;

      const { overlay, skipBtn, badge } = buildTrainSceneDOM({
        captionText:
          caption ||
          'Азалия задумчиво смотрит в окно движущегося поезда, Тео крепко спит рядом, а за окном проплывают пейзажи…',
        showSkip: true,
        reducedMotion,
      });

      container.innerHTML = '';
      container.appendChild(overlay);

      if (preloadPromise) {
        Promise.resolve(preloadPromise)
          .catch(() => {})
          .finally(() => {
            preloadDone = true;
            if (badge) badge.textContent = 'Хогвартс-экспресс • Прибытие';
          });
      }

      const finish = (status) => {
        if (settled) return;
        settled = true;
        if (timerId !== null) window.clearTimeout(timerId);
        if (fadeTimerId !== null) window.clearTimeout(fadeTimerId);
        overlay.classList.add('is-fading-out');
        const outMs = reducedMotion ? 80 : 380;
        fadeTimerId = window.setTimeout(() => {
          if (overlay.parentNode === container) container.removeChild(overlay);
          resolve({ status });
        }, outMs);
      };

      const tryComplete = () => {
        if (settled) return;
        if (preloadDone) {
          finish('completed');
        } else {
          Promise.resolve(preloadPromise)
            .catch(() => {})
            .finally(() => finish('completed'));
        }
      };

      if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Promise.resolve(preloadPromise)
            .catch(() => {})
            .finally(() => finish('skipped'));
        });
      }

      if (signal) {
        if (signal.aborted) {
          finish('skipped');
          return;
        }
        signal.addEventListener('abort', () => finish('skipped'), { once: true });
      }

      timerId = window.setTimeout(tryComplete, minDurationMs);
    });
  }

  /**
   * Declarative cutscene player for all 12 IDs in src/data/cutscenes.js.
   */
  async function play(container, definitionOrId, options = {}) {
    const { signal = null, reducedMotion = false, preloadPromise = null } = options;
    const def = getCutsceneDefinition(definitionOrId) || {
      id: String(definitionOrId || 'cutscene'),
      durationMs: 3000,
      caption: `Кат-сцена «${String(definitionOrId)}»`,
      layers: [],
      timeline: [],
      fallback: { background: 'bg_great_hall', characters: ['azalia'] },
    };

    const assetIds = collectDefinitionAssets(def);
    if (assetIds.length > 0) {
      await stage?.preload?.(assetIds);
    }

    // Reduced-motion mode (05_CUTSCENES.md L5): immediately show fallback for 1500ms, then advance
    if (reducedMotion && container) {
      if (def.fallback) {
        await stage?.enter?.(def.fallback);
      }
      return new Promise((resolve) => {
        let settled = false;
        let timerId = null;

        const overlay = document.createElement('div');
        overlay.className = 'cutscene-sequence-overlay is-reduced-motion';
        overlay.style.zIndex = '100';

        const bar = document.createElement('div');
        bar.className = 'train-bottom-bar cutscene-bottom-bar';

        const textCol = document.createElement('div');
        textCol.className = 'train-caption-col';

        const badge = document.createElement('div');
        badge.className = 'train-badge';
        badge.textContent = def.title || `Эпизод • ${def.id.toUpperCase()}`;

        const caption = document.createElement('p');
        caption.className = 'train-caption-text';
        caption.textContent = def.caption || '';

        const skipBtn = document.createElement('button');
        skipBtn.type = 'button';
        skipBtn.className = 'ui-btn ui-btn-primary train-skip-btn';
        skipBtn.textContent = 'Пропустить ▸';

        textCol.append(badge, caption);
        bar.append(textCol, skipBtn);
        overlay.appendChild(bar);
        container.innerHTML = '';
        container.appendChild(overlay);

        const finish = (status) => {
          if (settled) return;
          settled = true;
          if (timerId !== null) window.clearTimeout(timerId);
          if (overlay.parentNode === container) container.removeChild(overlay);
          bus?.emit?.('cutscene:done', { id: def.id, status });
          resolve({ status });
        };

        skipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          finish('skipped');
        });

        if (signal) {
          if (signal.aborted) {
            finish('skipped');
            return;
          }
          signal.addEventListener('abort', () => finish('skipped'), { once: true });
        }

        timerId = window.setTimeout(() => {
          Promise.resolve(preloadPromise)
            .catch(() => {})
            .finally(() => finish('fallback'));
        }, 1500);
      });
    }

    // cs01 uses the living train carriage DOM + timeline
    if (def.kind === 'train') {
      if (def.fallback) {
        await stage?.enter?.(def.fallback);
      }
      const res = await playSceneTransition(container, {
        preloadPromise,
        signal,
        reducedMotion,
        caption: def.caption,
      });
      bus?.emit?.('cutscene:done', { id: def.id, status: res.status });
      return res;
    }

    if (!container) {
      if (def.fallback) await stage?.enter?.(def.fallback);
      return { status: 'completed' };
    }

    return new Promise((resolve) => {
      let settled = false;
      let rafId = null;
      let fadeTimerId = null;
      const startTs = performance.now();
      const totalMs = Math.max(1000, Number(def.durationMs) || 4000);

      // Build 896x1200 declarative layer stage inside overlay
      const rootOverlay = document.createElement('div');
      rootOverlay.className = 'cutscene-stage-overlay';
      rootOverlay.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:auto;z-index:30;';

      const cameraWrap = document.createElement('div');
      cameraWrap.className = 'cutscene-camera-wrap';
      cameraWrap.style.cssText =
        'position:absolute;inset:0;width:896px;height:1200px;transform-origin:50% 50%;will-change:transform;';

      const layerEls = new Map();
      const layerDefs = new Map();

      for (const layer of def.layers || []) {
        layerDefs.set(layer.id, layer);

        if (layer.kind === 'split') {
          // 05_CUTSCENES.md L15: split — two clip rects 448x1200, separate backgrounds & sprites, 2px gold seam
          const splitWrap = document.createElement('div');
          splitWrap.className = 'cutscene-split-layer';
          splitWrap.style.cssText = `position:absolute;inset:0;width:896px;height:1200px;z-index:${layer.z ?? 20};opacity:${layer.opacity ?? 0};pointer-events:none;`;

          const makeHalf = (sideSpec, leftPx) => {
            const pane = document.createElement('div');
            pane.style.cssText = `position:absolute;left:${leftPx}px;top:0;width:448px;height:1200px;overflow:hidden;`;
            const bg = document.createElement('img');
            bg.src = assetSrc(sideSpec.backgroundId);
            bg.alt = '';
            bg.draggable = false;
            bg.style.cssText = 'position:absolute;left:-224px;top:0;width:896px;height:1200px;object-fit:cover;';
            const fig = document.createElement('img');
            fig.className = 'cutscene-split-figure';
            fig.src = assetSrc(sideSpec.characterId);
            fig.alt = '';
            fig.draggable = false;
            const w = sideSpec.charWidth || 520;
            fig.style.cssText = `position:absolute;left:${sideSpec.charX ?? 224}px;top:${sideSpec.charY ?? 1240}px;width:${w}px;height:auto;transform:translate(-50%, -100%);transform-origin:50% 100%;`;
            pane.append(bg, fig);
            return pane;
          };

          const leftPane = makeHalf(layer.left || {}, 0);
          const rightPane = makeHalf(layer.right || {}, 448);
          const seam = document.createElement('div');
          seam.style.cssText =
            'position:absolute;left:447px;top:0;width:2px;height:1200px;background:linear-gradient(180deg,#f6df9e,#d4af37,#f6df9e);box-shadow:0 0 12px rgba(212,175,55,0.85);';

          splitWrap.append(leftPane, rightPane, seam);
          cameraWrap.appendChild(splitWrap);
          layerEls.set(layer.id, splitWrap);
          continue;
        }

        const isBg = (layer.z ?? 0) < 10;
        const img = document.createElement('img');
        img.src = assetSrc(layer.assetId);
        img.alt = '';
        img.draggable = false;

        if (isBg) {
          img.style.cssText = `position:absolute;left:${layer.x ?? 0}px;top:${layer.y ?? 0}px;width:${layer.width ?? 896}px;height:${layer.height ?? 1200}px;object-fit:cover;z-index:${layer.z ?? 0};opacity:${layer.opacity ?? 1};transform-origin:50% 50%;pointer-events:none;`;
          cameraWrap.appendChild(img);
          layerEls.set(layer.id, img);
        } else if (layer.clipRect) {
          // Clipped window figure (e.g. cs05 Dima in castle window x:720, y:120, w:80, h:120)
          const clip = layer.clipRect;
          const mask = document.createElement('div');
          mask.style.cssText = `position:absolute;left:${clip.x}px;top:${clip.y}px;width:${clip.w}px;height:${clip.h}px;overflow:hidden;border-radius:38px 38px 6px 6px;border:1.5px solid rgba(244,212,138,0.55);box-shadow:0 0 18px rgba(244,212,138,0.35);background:radial-gradient(circle at 50% 35%, rgba(255,220,140,0.38), rgba(20,28,48,0.85));z-index:${layer.z ?? 12};opacity:${layer.opacity ?? 1};pointer-events:none;`;
          img.style.cssText = `position:absolute;left:${clip.w / 2}px;top:${clip.h + 55}px;width:${layer.width ?? 170}px;height:auto;transform:translate(-50%, -100%);transform-origin:50% 100%;`;
          mask.appendChild(img);
          cameraWrap.appendChild(mask);
          layerEls.set(layer.id, mask);
        } else {
          img.style.cssText = `position:absolute;left:0;top:0;width:${layer.width ?? 560}px;height:auto;z-index:${layer.z ?? 14};opacity:${layer.opacity ?? 1};transform:translate(${layer.x ?? 448}px, ${layer.y ?? 1200}px) translate(-50%, -100%);transform-origin:50% 100%;pointer-events:none;will-change:transform,opacity;`;
          cameraWrap.appendChild(img);
          layerEls.set(layer.id, img);
        }
      }

      // Overlay glow layer (z: 30)
      const glowOverlay = document.createElement('div');
      glowOverlay.style.cssText =
        'position:absolute;inset:0;z-index:30;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 38%, rgba(255,223,142,0.85), rgba(255,196,92,0.35) 55%, transparent 80%);';

      // Particles Canvas layer (z: 40)
      const canvas = document.createElement('canvas');
      canvas.width = 896;
      canvas.height = 1200;
      canvas.style.cssText = 'position:absolute;inset:0;width:896px;height:1200px;z-index:40;pointer-events:none;';
      const ctx = canvas.getContext('2d');

      const particleSpecs = (def.timeline || [])
        .filter((t) => t.effect === 'particles')
        .map((spec) => ({ spec, pool: initParticlePool(spec, def.id) }));

      // UI bottom bar + Skip button (>= 44x44px, z: 100)
      const bar = document.createElement('div');
      bar.className = 'train-bottom-bar cutscene-bottom-bar';
      bar.style.zIndex = '100';

      const textCol = document.createElement('div');
      textCol.className = 'train-caption-col';

      const badge = document.createElement('div');
      badge.className = 'train-badge';
      badge.textContent = def.title || `Эпизод • ${def.id.toUpperCase()}`;

      const caption = document.createElement('p');
      caption.className = 'train-caption-text';
      caption.textContent = def.caption || '';

      const skipBtn = document.createElement('button');
      skipBtn.type = 'button';
      skipBtn.className = 'ui-btn ui-btn-primary train-skip-btn';
      skipBtn.textContent = 'Пропустить ▸';

      textCol.append(badge, caption);
      bar.append(textCol, skipBtn);

      rootOverlay.append(cameraWrap, glowOverlay, canvas, bar);
      container.innerHTML = '';
      container.appendChild(rootOverlay);

      const finish = async (status) => {
        if (settled) return;
        settled = true;
        if (rafId !== null) window.cancelAnimationFrame(rafId);
        if (fadeTimerId !== null) window.clearTimeout(fadeTimerId);

        if (def.fallback) {
          await stage?.enter?.(def.fallback);
        }

        if (status === 'skipped') {
          if (rootOverlay.parentNode === container) container.removeChild(rootOverlay);
          bus?.emit?.('cutscene:done', { id: def.id, status });
          resolve({ status });
          return;
        }

        rootOverlay.classList.add('is-fading-out');
        fadeTimerId = window.setTimeout(() => {
          if (rootOverlay.parentNode === container) container.removeChild(rootOverlay);
          bus?.emit?.('cutscene:done', { id: def.id, status });
          resolve({ status });
        }, 280);
      };

      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        finish('skipped');
      });

      if (signal) {
        if (signal.aborted) {
          finish('skipped');
          return;
        }
        signal.addEventListener('abort', () => finish('skipped'), { once: true });
      }

      const tick = (now) => {
        if (settled) return;
        try {
          const elapsed = now - startTs;

          // Compute per-layer and camera state at `elapsed`
          let camZoom = 1;
          let camRot = 0;
          let panParallax = 0;
          let glowAlpha = 0;

          const stateByLayer = new Map();
          for (const layer of def.layers || []) {
            stateByLayer.set(layer.id, {
              x: layer.x ?? 448,
              y: layer.y ?? 1200,
              opacity: layer.opacity ?? 1,
              scaleX: 1,
              scaleY: 1,
              rot: 0,
              offsetX: 0,
              offsetY: 0,
            });
          }

          for (const item of def.timeline || []) {
            const { atMs = 0, durationMs = 1000, target, effect, from, to } = item;
            if (elapsed < atMs) continue;
            const rawT = clamp01((elapsed - atMs) / Math.max(1, durationMs));
            const easedT = easeInOutQuad(rawT);
            const active = elapsed <= atMs + durationMs;

            if (target === 'camera') {
              if (effect === 'panZoom') {
                camZoom = lerp(Number(from ?? 1), Number(to ?? 1.035), easedT);
                panParallax = easedT;
              } else if (effect === 'camera') {
                camZoom = lerp(Number(from?.zoom ?? 1), Number(to?.zoom ?? 1.03), easedT);
                camRot = lerp(Number(from?.rot ?? 0), Number(to?.rot ?? 0), easedT);
              }
              continue;
            }

            if (target === 'overlay' && (effect === 'glow' || effect === 'windowGlint')) {
              glowAlpha = lerp(Number(from ?? 0), Number(to ?? 0.2), easedT);
              continue;
            }

            const st = stateByLayer.get(target);
            if (!st) continue;

            switch (effect) {
              case 'crossfade':
              case 'focus':
                st.opacity = lerp(Number(from ?? st.opacity), Number(to ?? 1), easedT);
                break;
              case 'translateX':
                st.x = lerp(Number(from ?? st.x), Number(to ?? st.x), easedT);
                break;
              case 'translateY':
                st.y = lerp(Number(from ?? st.y), Number(to ?? st.y), easedT);
                break;
              case 'breathe':
                if (active) {
                  const wave = 0.5 - 0.5 * Math.cos(((elapsed - atMs) / 2800) * Math.PI * 2);
                  st.scaleY = lerp(Number(from ?? 1), Number(to ?? 1.008), wave);
                }
                break;
              case 'sway':
                if (active) {
                  const wave = Math.sin(((elapsed - atMs) / 2200) * Math.PI * 2);
                  st.rot += wave * Math.abs(Number(to ?? 0.6));
                }
                break;
              case 'trainShake':
                if (active) {
                  const wave = Math.sin(((elapsed - atMs) / 1200) * Math.PI * 2);
                  st.offsetY += wave * Math.abs(Number(to ?? 2));
                }
                break;
              case 'bounce':
                if (active) {
                  const wave = Math.abs(Math.sin(rawT * Math.PI * 2));
                  st.offsetY += wave * Number(to ?? -8);
                }
                break;
              case 'shake':
                if (active) {
                  const wave = Math.sin(rawT * Math.PI * 6);
                  st.offsetX += wave * Math.abs(Number(to ?? 3));
                }
                break;
              default:
                break;
            }
          }

          cameraWrap.style.transform = `scale(${camZoom.toFixed(4)}) rotate(${camRot.toFixed(3)}deg)`;
          glowOverlay.style.opacity = glowAlpha.toFixed(3);

          for (const [id, el] of layerEls) {
            const layer = layerDefs.get(id);
            const st = stateByLayer.get(id);
            if (!layer || !st) continue;
            el.style.opacity = st.opacity.toFixed(3);

            if (layer.kind === 'split') {
              const figs = el.querySelectorAll('.cutscene-split-figure');
              figs.forEach((f) => {
                f.style.transform = `translate(-50%, -100%) scaleY(${st.scaleY.toFixed(4)})`;
              });
            } else if ((layer.z ?? 0) < 10) {
              const px = panParallax * -4 + st.offsetX;
              const py = st.offsetY;
              el.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) rotate(${st.rot.toFixed(3)}deg)`;
            } else if (!layer.clipRect) {
              const px = st.x + panParallax * 8 + st.offsetX;
              const py = st.y + st.offsetY;
              el.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) translate(-50%, -100%) rotate(${st.rot.toFixed(3)}deg) scale(${st.scaleX.toFixed(4)}, ${st.scaleY.toFixed(4)})`;
            }
          }

          if (ctx && particleSpecs.length > 0) {
            renderParticles(ctx, particleSpecs, elapsed);
          }

          if (elapsed >= totalMs) {
            Promise.resolve(preloadPromise)
              .catch(() => {})
              .finally(() => finish('completed'));
            return;
          }

          rafId = window.requestAnimationFrame(tick);
        } catch (err) {
          console.error('Cutscene RAF error, switching to fallback:', err);
          finish('fallback');
        }
      };

      rafId = window.requestAnimationFrame(tick);
    });
  }

  return {
    play,
    playSceneTransition,
    getCutsceneIds() {
      return [...CUTSCENE_IDS];
    },
    getCutscenes() {
      return CUTSCENES;
    },
  };
}

import { bus as defaultBus } from '../events.js';

export const LOGICAL_WIDTH = 896;
export const LOGICAL_HEIGHT = 1200;

const SPEAKER_TO_ASSET = {
  fred: 'twins',
  george: 'twins',
};

export function resolveCharacterAssetId(speakerId) {
  if (!speakerId) return null;
  return SPEAKER_TO_ASSET[speakerId] || speakerId;
}

export function createStage(root, manifest, bus = defaultBus) {
  if (!root) throw new Error('Stage root element is required');

  const imageCache = new Map();
  let currentBackground = null;
  let currentCharacters = [];
  let activeSpeakerAssetId = null;
  let reducedMotion = false;
  let cueTimers = new Set();

  root.innerHTML = '';
  root.classList.add('stage-viewport');

  // Blurred edge backdrop (computed once per background change, never animated)
  const backdropEl = document.createElement('div');
  backdropEl.className = 'stage-backdrop';
  backdropEl.setAttribute('aria-hidden', 'true');

  // Logical 896x1200 stage frame (fitted via contain)
  const frameEl = document.createElement('div');
  frameEl.className = 'stage-frame';

  const bgImgEl = document.createElement('img');
  bgImgEl.className = 'stage-bg-image';
  bgImgEl.alt = '';
  bgImgEl.decoding = 'async';
  bgImgEl.draggable = false;

  const charsLayerEl = document.createElement('div');
  charsLayerEl.className = 'stage-characters-layer';

  const overlayLayerEl = document.createElement('div');
  overlayLayerEl.className = 'stage-overlay-layer';

  frameEl.append(bgImgEl, charsLayerEl, overlayLayerEl);
  root.append(backdropEl, frameEl);

  function getAssetEntry(id) {
    return manifest?.assets?.[id] || null;
  }

  function preloadOne(id) {
    if (!id) return Promise.resolve(null);
    if (imageCache.has(id)) return imageCache.get(id);

    const entry = getAssetEntry(id);
    if (!entry || !entry.src) {
      bus?.emit?.('asset:error', { id, reason: 'missing_in_manifest' });
      return Promise.resolve(null);
    }

    const promise = new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve({ id, src: entry.src, entry, img });
      img.onerror = () => {
        imageCache.delete(id);
        bus?.emit?.('asset:error', { id, src: entry.src });
        resolve(null);
      };
      img.src = `./${entry.src.replace(/^\.?\//, '')}`;
    });

    imageCache.set(id, promise);
    return promise;
  }

  async function preload(ids = []) {
    const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
    await Promise.all(uniqueIds.map((id) => preloadOne(id)));
    bus?.emit?.('stage:ready', { ids: uniqueIds });
    return uniqueIds;
  }

  function layoutCharacters() {
    const count = currentCharacters.length;
    const nodes = Array.from(charsLayerEl.querySelectorAll('.stage-character'));
    nodes.forEach((el, idx) => {
      const charId = el.dataset.charId;
      const entry = getAssetEntry(charId);
      const assetScale = entry?.scale || 1;

      // Distribute characters evenly across the 896px logical stage width
      let xPercent = 50;
      if (count === 2) {
        xPercent = idx === 0 ? 30 : 70;
      } else if (count === 3) {
        xPercent = [22, 50, 78][idx];
      } else if (count === 4) {
        xPercent = [16, 39, 62, 84][idx];
      } else if (count >= 5) {
        const margin = 13;
        const span = 100 - margin * 2;
        xPercent = margin + (span * idx) / (count - 1);
      }

      // Base height in 1200px logical coordinates so 4-5 characters fit comfortably
      const crowdFactor = count >= 5 ? 0.44 : count === 4 ? 0.48 : count === 3 ? 0.52 : 0.56;
      const targetHeightPx = Math.round(LOGICAL_HEIGHT * crowdFactor * assetScale);

      el.style.left = `${xPercent}%`;
      el.style.height = `${targetHeightPx}px`;
      el.style.zIndex = String(10 + idx);
    });
    updateSpeakerFocus();
  }

  function updateSpeakerFocus() {
    const nodes = Array.from(charsLayerEl.querySelectorAll('.stage-character'));
    nodes.forEach((el) => {
      const charId = el.dataset.charId;
      if (!activeSpeakerAssetId) {
        el.classList.remove('is-active', 'is-dimmed');
      } else if (charId === activeSpeakerAssetId) {
        el.classList.add('is-active');
        el.classList.remove('is-dimmed');
      } else {
        el.classList.add('is-dimmed');
        el.classList.remove('is-active');
      }
    });
  }

  async function renderCharacters(characterIds = []) {
    const validIds = [];
    for (const rawId of characterIds) {
      const resolved = resolveCharacterAssetId(rawId);
      if (resolved && !validIds.includes(resolved) && getAssetEntry(resolved)) {
        validIds.push(resolved);
      }
    }
    currentCharacters = validIds;
    await preload(validIds);

    charsLayerEl.innerHTML = '';
    for (const charId of validIds) {
      const entry = getAssetEntry(charId);
      if (!entry) continue;

      const wrapper = document.createElement('div');
      wrapper.className = 'stage-character';
      wrapper.dataset.charId = charId;

      const img = document.createElement('img');
      img.className = 'stage-character-img';
      img.src = `./${entry.src.replace(/^\.?\//, '')}`;
      img.alt = charId;
      img.draggable = false;
      img.decoding = 'async';

      wrapper.appendChild(img);
      charsLayerEl.appendChild(wrapper);
    }

    layoutCharacters();
  }

  async function enter({ background, characters = [] } = {}) {
    const idsToLoad = [background, ...characters.map(resolveCharacterAssetId)].filter(Boolean);
    await preload(idsToLoad);

    if (background && background !== currentBackground) {
      const bgEntry = getAssetEntry(background);
      if (bgEntry) {
        const srcUrl = `./${bgEntry.src.replace(/^\.?\//, '')}`;
        currentBackground = background;
        bgImgEl.src = srcUrl;
        // Set blurred edge backdrop once on scene background change
        backdropEl.style.backgroundImage = `url("${srcUrl}")`;
      } else {
        bus?.emit?.('asset:error', { id: background, reason: 'missing_background' });
      }
    }

    await renderCharacters(characters);
    resize();
    return { background: currentBackground, characters: [...currentCharacters] };
  }

  async function setActiveSpeaker(speakerId) {
    const assetId = resolveCharacterAssetId(speakerId);
    if (
      assetId &&
      getAssetEntry(assetId)?.type === 'character' &&
      !currentCharacters.includes(assetId)
    ) {
      await renderCharacters([...currentCharacters, assetId]);
    }
    activeSpeakerAssetId = assetId && currentCharacters.includes(assetId) ? assetId : null;
    updateSpeakerFocus();
  }

  function cue(cueSpec = {}) {
    if (!cueSpec || typeof cueSpec !== 'object') return;
    const { target, effect, durationMs = 450 } = cueSpec;
    if (effect === 'focus' && target) {
      setActiveSpeaker(target);
      return;
    }
    if (reducedMotion || !effect) return;

    const targetAsset = resolveCharacterAssetId(target);
    const el = targetAsset
      ? charsLayerEl.querySelector(`.stage-character[data-char-id="${targetAsset}"]`)
      : frameEl;
    if (!el) return;

    const className = `cue-${effect}`;
    el.classList.remove(className);
    // Force reflow to restart CSS cue animation cleanly
    void el.offsetWidth;
    el.classList.add(className);

    const timer = window.setTimeout(() => {
      el.classList.remove(className);
      cueTimers.delete(timer);
    }, Math.max(150, Number(durationMs) || 450));
    cueTimers.add(timer);
  }

  function resize() {
    const rect = root.getBoundingClientRect();
    const availW = Math.max(1, rect.width);
    const availH = Math.max(1, rect.height);
    const scale = Math.min(availW / LOGICAL_WIDTH, availH / LOGICAL_HEIGHT);
    const scaledW = Math.round(LOGICAL_WIDTH * scale);
    const scaledH = Math.round(LOGICAL_HEIGHT * scale);

    frameEl.style.width = `${LOGICAL_WIDTH}px`;
    frameEl.style.height = `${LOGICAL_HEIGHT}px`;
    frameEl.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(5)})`;
    root.style.setProperty('--stage-scale', scale.toFixed(5));
    root.style.setProperty('--stage-scaled-w', `${scaledW}px`);
    root.style.setProperty('--stage-scaled-h', `${scaledH}px`);
  }

  const resizeObserver =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => resize())
      : null;
  if (resizeObserver) {
    resizeObserver.observe(root);
  }
  const onWindowResize = () => resize();
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('orientationchange', onWindowResize);

  function setReducedMotion(nextReduced) {
    reducedMotion = Boolean(nextReduced);
    root.classList.toggle('is-reduced-motion', reducedMotion);
  }

  function getOverlayRoot() {
    return overlayLayerEl;
  }

  function destroy() {
    if (resizeObserver) resizeObserver.disconnect();
    window.removeEventListener('resize', onWindowResize);
    window.removeEventListener('orientationchange', onWindowResize);
    for (const timer of cueTimers) {
      window.clearTimeout(timer);
    }
    cueTimers.clear();
    root.innerHTML = '';
  }

  return {
    enter,
    cue,
    preload,
    resize,
    destroy,
    setActiveSpeaker,
    setReducedMotion,
    getOverlayRoot,
    getState() {
      return {
        background: currentBackground,
        characters: [...currentCharacters],
        activeSpeaker: activeSpeakerAssetId,
      };
    },
  };
}

import { bus as defaultBus } from '../events.js';

export const LOGICAL_WIDTH = 896;
export const LOGICAL_HEIGHT = 1200;

const CENTER_X = LOGICAL_WIDTH / 2;
// Logical px beyond the frame edge used for side entrances/exits.
const OFFSTAGE_X = 330;
// 05_CUTSCENES: camera zoom <= 1.06.
const MAX_CAMERA_ZOOM = 1.06;
const MAX_GLOW = 0.35;
const MAX_LEAN_DEG = 4;
const FOCUS_FADE_MS = 150;

const DECORATIVE_DEFAULTS = {
  bounce: { durationMs: 560, amplitude: 8, unit: 'px' },
  shake: { durationMs: 450, amplitude: 3, unit: 'px' },
  tilt: { durationMs: 500, amplitude: -2, unit: 'deg' },
  breathe: { durationMs: 2800, amplitude: 0, unit: 'px' },
};

const SPEAKER_TO_ASSET = {
  fred: 'twins',
  george: 'twins',
};

const OFFSTAGE_SPEAKERS = new Set([
  'crowd',
  'prefect',
  'duel_teacher',
  'librarian',
  'theo_azalia',
]);

export function resolveCharacterAssetId(speakerId) {
  if (!speakerId || OFFSTAGE_SPEAKERS.has(speakerId)) return null;
  return SPEAKER_TO_ASSET[speakerId] || speakerId;
}

function clamp(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

/**
 * Stage cue contract (03_ARCHITECTURE + owner-approved extension, see docs/OPEN_QUESTIONS.md Q-L02):
 * { target, effect, durationMs, amplitude, delayMs }
 *  - breathe / bounce / shake / tilt: short decorative animation (target omitted => whole scene camera).
 *  - tilt + hold:true: keeps a lean of `amplitude` degrees (0 = straighten).
 *  - focus: highlight target as active speaker.
 *  - fade {to:1|0, side:'left'|'right'}: character enters (optionally running in from a side) or leaves.
 *  - group {targets:[...]}: bring listed characters close together in the centre; [] restores normal layout.
 *  - camera {to: 1..1.06}: smooth zoom of the whole scene.
 *  - glow {to: 0..0.35}: soft golden light.
 * No prose interpretation happens here: cues are explicit data built by tools/build_story.py.
 */
export function createStage(root, manifest, bus = defaultBus) {
  if (!root) throw new Error('Stage root element is required');

  const imageCache = new Map();
  const charEls = new Map();
  const leans = new Map();
  const cueTimers = new Set();

  let currentBackground = null;
  let currentCharacters = [];
  let groupIds = [];
  let activeSpeakerAssetId = null;
  let activeSpeakerSet = new Set();
  let dimAllOnOffstageSpeaker = false;
  let reducedMotion = false;
  let sceneToken = 0;
  let emotions = {};
  let emotionRevision = 0;
  let cameraZoom = 1;
  let glowLevel = 0;

  root.innerHTML = '';
  root.classList.add('stage-viewport');

  // CSS variables describing the fitted stage rectangle are published on the app shell,
  // so the dialogue panel and HUD (siblings of the stage) can be placed over the stage.
  const host = root.parentElement || root;

  // Blurred edge backdrop (set once per background change, never animated)
  const backdropEl = document.createElement('div');
  backdropEl.className = 'stage-backdrop';
  backdropEl.setAttribute('aria-hidden', 'true');

  // Logical 896x1200 stage frame (fitted via contain)
  const frameEl = document.createElement('div');
  frameEl.className = 'stage-frame';

  // Camera wrapper: zoom and whole-scene shake apply to background + characters, not to overlays
  const cameraEl = document.createElement('div');
  cameraEl.className = 'stage-camera';

  const bgImgEl = document.createElement('img');
  bgImgEl.className = 'stage-bg-image';
  bgImgEl.alt = '';
  bgImgEl.decoding = 'async';
  bgImgEl.draggable = false;

  const charsLayerEl = document.createElement('div');
  charsLayerEl.className = 'stage-characters-layer';
  const poseEl = document.createElement('img');
  poseEl.className = 'stage-pose';
  poseEl.alt = '';
  poseEl.hidden = true;
  let requestedPose = null;
  let poseMembers = [];
  let poseRevision = 0;

  const glowEl = document.createElement('div');
  glowEl.className = 'stage-glow';
  glowEl.setAttribute('aria-hidden', 'true');

  const overlayLayerEl = document.createElement('div');
  overlayLayerEl.className = 'stage-overlay-layer';

  cameraEl.append(bgImgEl, charsLayerEl, poseEl, glowEl);
  frameEl.append(cameraEl, overlayLayerEl);
  root.append(backdropEl, frameEl);

  function getAssetEntry(id) {
    return manifest?.assets?.[id] || null;
  }

  function isRealCharacter(id) {
    const resolved = resolveCharacterAssetId(id);
    if (!resolved) return false;
    const entry = getAssetEntry(resolved);
    return Boolean(
      entry && (entry.type === 'character' || String(entry.src || '').startsWith('assets/characters/'))
    );
  }

  function assetUrl(entry) {
    return `./${entry.src.replace(/^\.?\//, '')}`;
  }

  function preloadOne(id) {
    if (!id || OFFSTAGE_SPEAKERS.has(id)) return Promise.resolve(null);
    const resolvedId = SPEAKER_TO_ASSET[id] || id;
    if (!resolvedId || OFFSTAGE_SPEAKERS.has(resolvedId)) return Promise.resolve(null);
    if (imageCache.has(resolvedId)) return imageCache.get(resolvedId);

    const entry = getAssetEntry(resolvedId);
    if (!entry || !entry.src) {
      bus?.emit?.('asset:error', { id: resolvedId, reason: 'missing_in_manifest' });
      return Promise.resolve(null);
    }

    const promise = new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve({ id: resolvedId, src: entry.src, entry, img });
      img.onerror = () => {
        imageCache.delete(resolvedId);
        bus?.emit?.('asset:error', { id: resolvedId, src: entry.src });
        resolve(null);
      };
      img.src = assetUrl(entry);
    });

    imageCache.set(resolvedId, promise);
    return promise;
  }

  async function preload(ids = []) {
    const uniqueIds = Array.from(
      new Set(
        ids
          .filter((id) => Boolean(id) && !OFFSTAGE_SPEAKERS.has(id))
          .map((id) => SPEAKER_TO_ASSET[id] || id)
          .filter((id) => Boolean(id) && !OFFSTAGE_SPEAKERS.has(id) && Boolean(getAssetEntry(id)))
      )
    );
    await Promise.all(uniqueIds.map((id) => preloadOne(id)));
    bus?.emit?.('stage:ready', { ids: uniqueIds });
    return uniqueIds;
  }

  function schedule(fn, ms) {
    const timer = window.setTimeout(() => {
      cueTimers.delete(timer);
      fn();
    }, ms);
    cueTimers.add(timer);
  }

  function clearCueTimers() {
    for (const timer of cueTimers) window.clearTimeout(timer);
    cueTimers.clear();
  }

  // Big Club-Romance-style busts: bottom part goes under the dialogue panel.
  // 4 and 5 characters share one size so an entrance does not resize everybody.
  function sizeFactor(count) {
    if (count <= 1) return 0.84;
    if (count === 2) return 0.78;
    if (count === 3) return 0.72;
    return 0.66;
  }

  function evenSlots(count) {
    if (count <= 0) return [];
    if (count === 1) return [CENTER_X];
    let fractions;
    if (count === 2) fractions = [0.3, 0.7];
    else if (count === 3) fractions = [0.22, 0.5, 0.78];
    else if (count === 4) fractions = [0.16, 0.39, 0.62, 0.84];
    else {
      const margin = 0.13;
      const span = 1 - margin * 2;
      fractions = Array.from({ length: count }, (_, i) => margin + (span * i) / (count - 1));
    }
    return fractions.map((f) => f * LOGICAL_WIDTH);
  }

  function computePositions() {
    const ids = currentCharacters;
    const base = evenSlots(ids.length);
    const pos = new Map();
    ids.forEach((id, i) => pos.set(id, base[i]));

    const group = groupIds.filter((id) => ids.includes(id));
    if (group.length === 0) return pos;

    const spacing = group.length <= 3 ? 148 : 124;
    const half = ((group.length - 1) / 2) * spacing;
    group.forEach((id, i) => pos.set(id, CENTER_X - half + i * spacing));

    const others = ids.filter((id) => !group.includes(id));
    const splitIdx = Math.ceil(others.length / 2);
    const left = others.slice(0, splitIdx);
    const right = others.slice(splitIdx);
    left.forEach((id, i) => pos.set(id, Math.min(CENTER_X - half - 115, 110 + i * 105)));
    right.forEach((id, i) =>
      pos.set(id, Math.max(CENTER_X + half + 115, LOGICAL_WIDTH - 110 - (right.length - 1 - i) * 105))
    );
    return pos;
  }

  function translateFor(x) {
    return `calc(${x.toFixed(1)}px - 50%) 0`;
  }

  function setMs(el, name, ms) {
    el.style.setProperty(name, `${Math.max(0, Math.round(ms))}ms`);
  }

  function layoutCharacters() {
    const pos = computePositions();
    const factor = sizeFactor(currentCharacters.length);
    currentCharacters.forEach((charId, idx) => {
      const el = charEls.get(charId);
      if (!el) return;
      const assetScale = getAssetEntry(charId)?.scale || 1;
      el.style.height = `${Math.round(LOGICAL_HEIGHT * factor * assetScale)}px`;
      el.style.translate = translateFor(pos.get(charId) ?? CENTER_X);
      el.style.rotate = `${leans.get(charId) || 0}deg`;
      el.style.zIndex = String((groupIds.includes(charId) ? 14 : 10) + idx);
    });
    updateSpeakerFocus();
  }

  function updateSpeakerFocus() {
    for (const [charId, el] of charEls) {
      if (activeSpeakerSet.size === 0) {
        el.classList.remove('is-active');
        el.classList.toggle('is-dimmed', dimAllOnOffstageSpeaker);
      } else if (activeSpeakerSet.has(charId)) {
        el.classList.add('is-active');
        el.classList.remove('is-dimmed');
      } else {
        el.classList.add('is-dimmed');
        el.classList.remove('is-active');
      }
    }
  }

  function portraitId(charId) {
    const variant = getAssetEntry(charId)?.emotions?.[emotions[charId]];
    return variant && getAssetEntry(variant)?.src ? variant : charId;
  }

  // Full snapshots reset omitted/unknown expressions, without changing stage membership or layout.
  async function setEmotions(snapshot = {}) {
    emotions = { ...snapshot };
    const revision = ++emotionRevision;
    const token = sceneToken;
    await Promise.all(currentCharacters.map(async (charId) => {
      const wrapper = charEls.get(charId);
      const img = wrapper?.querySelector('.stage-character-img');
      const id = portraitId(charId);
      if (!img || img.dataset.portraitId === id) return;
      const loaded = await preloadOne(id);
      if (revision !== emotionRevision || token !== sceneToken || charEls.get(charId) !== wrapper) return;
      const resolved = loaded ? id : charId;
      img.src = assetUrl(getAssetEntry(resolved));
      img.dataset.portraitId = resolved;
    }));
  }

  function createCharEl(charId) {
    const id = portraitId(charId);
    const entry = getAssetEntry(id);
    const wrapper = document.createElement('div');
    wrapper.className = 'stage-character';
    wrapper.dataset.charId = charId;
    wrapper.classList.toggle('in-paired-pose', poseMembers.includes(charId));

    const img = document.createElement('img');
    img.className = 'stage-character-img';
    img.dataset.portraitId = id;
    img.onerror = () => {
      if (img.dataset.portraitId !== charId) {
        img.dataset.portraitId = charId;
        img.src = assetUrl(getAssetEntry(charId));
      }
    };
    img.src = assetUrl(entry);
    img.alt = charId;
    img.draggable = false;
    img.decoding = 'async';

    wrapper.appendChild(img);
    charsLayerEl.appendChild(wrapper);
    charEls.set(charId, wrapper);
    return wrapper;
  }

  async function setPose(id = null) {
    if (requestedPose === id) return;
    requestedPose = id;
    const revision = ++poseRevision;
    const entry = id && getAssetEntry(id);
    const loaded = entry?.type === 'pose' && await preloadOne(id);
    if (revision !== poseRevision) return;
    poseMembers = loaded ? entry.participants : [];
    if (loaded) poseEl.src = assetUrl(entry);
    poseEl.hidden = !loaded;
    for (const [charId, el] of charEls) {
      el.classList.toggle('in-paired-pose', poseMembers.includes(charId));
    }
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
    charEls.clear();
    for (const charId of validIds) createCharEl(charId);
    layoutCharacters();
  }

  function setCamera(to, ms) {
    cameraZoom = reducedMotion ? 1 : clamp(to ?? 1, 1, MAX_CAMERA_ZOOM);
    setMs(cameraEl, '--cam-ms', ms);
    cameraEl.style.scale = String(cameraZoom);
  }

  function setGlow(to, ms) {
    glowLevel = clamp(to ?? 0, 0, MAX_GLOW);
    setMs(glowEl, '--glow-ms', ms);
    glowEl.style.opacity = String(glowLevel);
  }

  async function enter({ background, characters = [] } = {}) {
    sceneToken += 1;
    await setPose(null);
    emotionRevision += 1;
    emotions = {};
    clearCueTimers();
    groupIds = [];
    leans.clear();
    activeSpeakerAssetId = null;
    activeSpeakerSet.clear();
    dimAllOnOffstageSpeaker = false;
    setCamera(1, 0);
    setGlow(0, 0);

    const idsToLoad = [background, ...characters.map(resolveCharacterAssetId)].filter(Boolean);
    await preload(idsToLoad);

    if (background && background !== currentBackground) {
      const bgEntry = getAssetEntry(background);
      if (bgEntry) {
        const srcUrl = assetUrl(bgEntry);
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

  // Highlights the speaker if (s)he is a real character from manifest.json (or an explicitly
  // placed stage prop like sorting_hat) currently on stage. For crowd and other off-stage voices,
  // never attempt to load an image or auto-add a sprite — leave current heroes on stage slightly dimmed.
  async function setActiveSpeaker(speakerId) {
    if (!speakerId) {
      activeSpeakerAssetId = null;
      activeSpeakerSet.clear();
      dimAllOnOffstageSpeaker = false;
      updateSpeakerFocus();
      return;
    }
    if (speakerId === 'theo_azalia') {
      const both = ['theo', 'azalia'].filter((id) => isRealCharacter(id) && currentCharacters.includes(id));
      activeSpeakerAssetId = both[0] || null;
      activeSpeakerSet = new Set(both);
      dimAllOnOffstageSpeaker = both.length === 0;
      updateSpeakerFocus();
      return;
    }
    const assetId = resolveCharacterAssetId(speakerId);
    const canHighlight = Boolean(
      assetId &&
        currentCharacters.includes(assetId) &&
        (isRealCharacter(assetId) || getAssetEntry(assetId)?.type === 'prop')
    );
    if (canHighlight) {
      activeSpeakerAssetId = assetId;
      activeSpeakerSet = new Set([assetId]);
      dimAllOnOffstageSpeaker = false;
    } else {
      activeSpeakerAssetId = null;
      activeSpeakerSet.clear();
      dimAllOnOffstageSpeaker = true;
    }
    updateSpeakerFocus();
  }

  function fadeCharacter(spec, skipAnim) {
    const charId = resolveCharacterAssetId(spec.target);
    if (!charId || !getAssetEntry(charId)) return;
    const to = spec.to === undefined ? 1 : Number(spec.to);
    const ms = skipAnim ? 0 : clamp(spec.durationMs ?? 600, 0, 4000);
    const side = spec.side === 'left' ? -1 : spec.side === 'right' ? 1 : 0;
    const offstageX = side < 0 ? -OFFSTAGE_X : LOGICAL_WIDTH + OFFSTAGE_X;

    if (to > 0) {
      preloadOne(charId);
      if (currentCharacters.includes(charId) && charEls.has(charId)) {
        charEls.get(charId).classList.remove('is-hidden');
        return;
      }
      // A previous exit of the same character may still be fading out
      const stale = charEls.get(charId);
      if (stale) {
        stale.remove();
        charEls.delete(charId);
      }

      currentCharacters = [...currentCharacters, charId];
      const el = createCharEl(charId);
      setMs(el, '--lean-ms', 500);
      el.style.rotate = `${leans.get(charId) || 0}deg`;

      if (skipAnim) {
        setMs(el, '--move-ms', 0);
        setMs(el, '--fade-ms', FOCUS_FADE_MS);
        layoutCharacters();
        return;
      }

      el.classList.add('is-hidden');
      setMs(el, '--move-ms', 0);
      setMs(el, '--fade-ms', 0);
      // Others glide to their new slots together with the entrance
      for (const [id, other] of charEls) {
        if (id !== charId) setMs(other, '--move-ms', ms);
      }
      layoutCharacters();
      const finalTranslate = el.style.translate;
      if (side) el.style.translate = translateFor(offstageX);
      void el.offsetWidth;
      setMs(el, '--move-ms', ms);
      setMs(el, '--fade-ms', ms);
      el.style.translate = finalTranslate;
      el.classList.remove('is-hidden');
      if (ms > 0) schedule(() => setMs(el, '--fade-ms', FOCUS_FADE_MS), ms + 30);
      else setMs(el, '--fade-ms', FOCUS_FADE_MS);
      return;
    }

    const el = charEls.get(charId);
    if (!el) return;
    currentCharacters = currentCharacters.filter((id) => id !== charId);
    groupIds = groupIds.filter((id) => id !== charId);
    leans.delete(charId);
    if (activeSpeakerSet.has(charId)) {
      activeSpeakerSet.delete(charId);
      if (activeSpeakerAssetId === charId) {
        activeSpeakerAssetId = Array.from(activeSpeakerSet)[0] || null;
      }
      updateSpeakerFocus();
    }
    setMs(el, '--move-ms', ms);
    setMs(el, '--fade-ms', ms);
    el.classList.add('is-hidden');
    if (side) el.style.translate = translateFor(offstageX);
    const removeEl = () => {
      if (charEls.get(charId) === el) charEls.delete(charId);
      el.remove();
    };
    // Remaining characters keep their places (no re-layout jump at the end of a scene)
    if (ms > 0) schedule(removeEl, ms + 50);
    else removeEl();
  }

  function setLean(target, amplitude, ms) {
    const charId = resolveCharacterAssetId(target);
    if (!charId) return;
    const deg = clamp(amplitude ?? 0, -MAX_LEAN_DEG, MAX_LEAN_DEG);
    if (deg === 0) leans.delete(charId);
    else leans.set(charId, deg);
    const el = charEls.get(charId);
    if (!el) return;
    setMs(el, '--lean-ms', ms);
    el.style.rotate = `${deg}deg`;
  }

  function playDecorative(spec) {
    const { target, effect } = spec;
    const defaults = DECORATIVE_DEFAULTS[effect];
    if (!defaults) return;
    const targetAsset = resolveCharacterAssetId(target);
    const el = targetAsset ? charEls.get(targetAsset) : cameraEl;
    if (!el) return;

    const amplitude = spec.amplitude ?? defaults.amplitude;
    el.style.setProperty('--cue-amp', `${amplitude}${defaults.unit}`);
    const className = `cue-${effect}`;
    el.classList.remove(className);
    // Force reflow to restart CSS cue animation cleanly
    void el.offsetWidth;
    el.classList.add(className);
    schedule(() => el.classList.remove(className), Math.max(150, Number(spec.durationMs) || defaults.durationMs));
  }

  function runCue(spec, instant) {
    const skipAnim = instant || reducedMotion;
    switch (spec.effect) {
      case 'focus':
        if (spec.target) setActiveSpeaker(spec.target);
        return;
      case 'fade':
        fadeCharacter(spec, skipAnim);
        return;
      case 'group': {
        groupIds = (Array.isArray(spec.targets) ? spec.targets : [])
          .map(resolveCharacterAssetId)
          .filter(Boolean);
        const ms = skipAnim ? 0 : clamp(spec.durationMs ?? 700, 0, 4000);
        for (const el of charEls.values()) setMs(el, '--move-ms', ms);
        layoutCharacters();
        return;
      }
      case 'camera':
        setCamera(spec.to, skipAnim ? 0 : clamp(spec.durationMs ?? 1200, 0, 6000));
        return;
      case 'glow':
        setGlow(spec.to, skipAnim ? 0 : clamp(spec.durationMs ?? 1200, 0, 6000));
        return;
      case 'tilt':
        if (spec.hold) {
          setLean(spec.target, spec.amplitude, skipAnim ? 0 : clamp(spec.durationMs ?? 500, 0, 4000));
          return;
        }
        if (!skipAnim) playDecorative(spec);
        return;
      default:
        // breathe / bounce / shake: decorative only, skipped for reduced motion and resume
        if (!skipAnim) playDecorative(spec);
    }
  }

  /**
   * cue(spec, {instant}) — instant:true applies only the final state (used when resuming a save
   * or jumping into the middle of a scene): no delays, no decorative animations.
   */
  function cue(cueSpec = {}, { instant = false } = {}) {
    if (!cueSpec || typeof cueSpec !== 'object' || !cueSpec.effect) return;
    const delay = instant ? 0 : Math.max(0, Number(cueSpec.delayMs) || 0);
    if (delay > 0) {
      const token = sceneToken;
      schedule(() => {
        if (token === sceneToken) runCue(cueSpec, false);
      }, delay);
      return;
    }
    runCue(cueSpec, instant);
  }

  function resize() {
    const rect = root.getBoundingClientRect();
    const cs = window.getComputedStyle(root);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    const padT = parseFloat(cs.paddingTop) || 0;
    const padB = parseFloat(cs.paddingBottom) || 0;

    const availW = Math.max(1, rect.width - padL - padR);
    const availH = Math.max(1, rect.height - padT - padB);
    const scale = Math.min(availW / LOGICAL_WIDTH, availH / LOGICAL_HEIGHT);
    const scaledW = LOGICAL_WIDTH * scale;
    const scaledH = LOGICAL_HEIGHT * scale;
    const left = padL + (availW - scaledW) / 2;
    const top = padT + (availH - scaledH) / 2;

    frameEl.style.width = `${LOGICAL_WIDTH}px`;
    frameEl.style.height = `${LOGICAL_HEIGHT}px`;
    frameEl.style.transform = `translate(${left.toFixed(2)}px, ${top.toFixed(2)}px) scale(${scale.toFixed(5)})`;

    host.style.setProperty('--stage-scale', scale.toFixed(5));
    host.style.setProperty('--stage-left', `${left.toFixed(1)}px`);
    host.style.setProperty('--stage-top', `${top.toFixed(1)}px`);
    host.style.setProperty('--stage-w', `${scaledW.toFixed(1)}px`);
    host.style.setProperty('--stage-h', `${scaledH.toFixed(1)}px`);
    host.style.setProperty('--stage-right', `${Math.max(0, rect.width - left - scaledW).toFixed(1)}px`);
    host.style.setProperty('--stage-bottom', `${Math.max(0, rect.height - top - scaledH).toFixed(1)}px`);
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
  resize();

  function setReducedMotion(nextReduced) {
    reducedMotion = Boolean(nextReduced);
    root.classList.toggle('is-reduced-motion', reducedMotion);
    if (reducedMotion) setCamera(1, 0);
  }

  function getOverlayRoot() {
    return overlayLayerEl;
  }

  function destroy() {
    poseRevision += 1;
    if (resizeObserver) resizeObserver.disconnect();
    window.removeEventListener('resize', onWindowResize);
    window.removeEventListener('orientationchange', onWindowResize);
    clearCueTimers();
    charEls.clear();
    root.innerHTML = '';
  }

  return {
    enter,
    cue,
    preload,
    resize,
    destroy,
    setActiveSpeaker,
    setEmotions,
    setPose,
    isCharacter: isRealCharacter,
    setReducedMotion,
    getOverlayRoot,
    getState() {
      return {
        background: currentBackground,
        characters: [...currentCharacters],
        emotions: { ...emotions },
        activeSpeaker: activeSpeakerAssetId,
        group: [...groupIds],
        camera: cameraZoom,
        glow: glowLevel,
      };
    },
  };
}

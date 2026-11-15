/**
 * Safe offline audio stub (no external audio assets required until licensed files are added).
 */
let unlocked = false;
let volume = 0.7;
let muted = false;
let activeCtx = null;

export function unlock() {
  unlocked = true;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx && !activeCtx) {
      activeCtx = new AudioCtx();
    }
    if (activeCtx && activeCtx.state === 'suspended') {
      activeCtx.resume().catch(() => {});
    }
  } catch {
    // Safe fallback if Web Audio is unavailable.
  }
  return unlocked;
}

export function play(_id) {
  // Stub: safe no-op while local licensed audio files are absent.
  return { ok: true, stub: true, unlocked, volume: muted ? 0 : volume };
}

export function stopAll() {
  // Safe no-op stub.
}

export function setVolume(nextVolume) {
  const num = Number(nextVolume);
  if (!Number.isNaN(num)) {
    volume = Math.max(0, Math.min(1, num));
  }
  return volume;
}

export function setMuted(nextMuted) {
  muted = Boolean(nextMuted);
  return muted;
}

export function createAudio() {
  return {
    unlock,
    play,
    stopAll,
    setVolume,
    setMuted,
    getState() {
      return { unlocked, volume, muted };
    },
  };
}

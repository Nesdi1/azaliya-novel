import { bus as defaultBus } from '../events.js';

/**
 * Cutscene player matching M3 contract:
 * play(container, definition, { signal, assets, reducedMotion }) -> Promise<{ status: 'completed'|'skipped'|'fallback' }>
 *
 * DEBUG-STUB: Minimal M1 cutscene runner for Scene 1 (cs01); full 12 timeline cutscenes are implemented in M3.
 */
const DEFAULT_CUTSCENE_FALLBACKS = {
  cs01: {
    id: 'cs01',
    durationMs: 3500,
    title: 'Поезд в Хогвартс (кат-сцена cs01 — DEBUG-STUB до M3)',
    fallback: {
      background: 'bg_train',
      characters: ['azalia', 'theo'],
    },
  },
};

export function createCutscenePlayer(stage, bus = defaultBus) {
  async function play(container, definitionOrId, { signal, reducedMotion = false } = {}) {
    const def =
      typeof definitionOrId === 'string'
        ? DEFAULT_CUTSCENE_FALLBACKS[definitionOrId] || {
            id: definitionOrId,
            durationMs: 1500,
            fallback: { background: 'bg_train', characters: ['azalia', 'theo'] },
          }
        : definitionOrId || DEFAULT_CUTSCENE_FALLBACKS.cs01;

    const id = def.id || 'cs01';
    const fb = def.fallback || { background: 'bg_train', characters: ['azalia', 'theo'] };

    if (stage && fb.background) {
      await stage.enter({
        background: fb.background,
        characters: fb.characters || [],
      });
    }

    if (!container) {
      bus?.emit?.('cutscene:end', { id, status: 'fallback' });
      return { status: 'fallback' };
    }

    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        const abortErr = new DOMException('Cutscene aborted', 'AbortError');
        reject(abortErr);
        return;
      }

      const overlay = document.createElement('div');
      overlay.className = 'cutscene-overlay';

      const banner = document.createElement('div');
      banner.className = 'cutscene-banner';
      banner.textContent = def.title || `Кат-сцена ${id} (DEBUG-STUB)`;

      const skipBtn = document.createElement('button');
      skipBtn.type = 'button';
      skipBtn.className = 'ui-btn cutscene-skip-btn';
      skipBtn.textContent = 'Пропустить кат-сцену';

      overlay.append(banner, skipBtn);
      container.innerHTML = '';
      container.appendChild(overlay);

      let settled = false;
      const duration = reducedMotion ? 1500 : Math.min(Number(def.durationMs) || 3500, 4000);

      const cleanup = () => {
        window.clearTimeout(timer);
        skipBtn.removeEventListener('click', onSkip);
        signal?.removeEventListener?.('abort', onAbort);
        if (overlay.parentNode === container) {
          container.removeChild(overlay);
        }
      };

      const finish = (status) => {
        if (settled) return;
        settled = true;
        cleanup();
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
        reject(new DOMException('Cutscene aborted', 'AbortError'));
      };

      skipBtn.addEventListener('click', onSkip);
      signal?.addEventListener?.('abort', onAbort, { once: true });

      const timer = window.setTimeout(() => {
        finish(reducedMotion ? 'fallback' : 'completed');
      }, duration);
    });
  }

  return { play };
}

/**
 * Minigame registry matching M4-M8 contract:
 * load(id) -> Promise<{ run(container, params) -> Promise<{ ok, score, details }> }>
 *
 * DEBUG-STUB: Temporary stub until M4-M8 minigames (parchment, quidditch, stealth, duel, potions) are implemented.
 */
export async function load(gameId) {
  return {
    async run(container, params = {}) {
      const { signal, debugAutoWin } = params;
      if (signal?.aborted) {
        throw new DOMException('Minigame aborted', 'AbortError');
      }
      if (debugAutoWin) {
        return {
          ok: true,
          score: 100,
          details: { gameId, stub: 'DEBUG-STUB', autoWin: true },
        };
      }
      if (!container) {
        return {
          ok: true,
          score: 100,
          details: { gameId, stub: 'DEBUG-STUB' },
        };
      }

      return new Promise((resolve, reject) => {
        const box = document.createElement('div');
        box.className = 'minigame-stub-overlay';

        const title = document.createElement('div');
        title.className = 'minigame-stub-title';
        title.textContent = `Мини-игра «${gameId}» (DEBUG-STUB до этапов M4–M8)`;

        const winBtn = document.createElement('button');
        winBtn.type = 'button';
        winBtn.className = 'ui-btn';
        winBtn.textContent = 'Завершить успешно (DEBUG-STUB)';

        const failBtn = document.createElement('button');
        failBtn.type = 'button';
        failBtn.className = 'ui-btn';
        failBtn.textContent = 'Завершить неудачей (DEBUG-STUB)';

        box.append(title, winBtn, failBtn);
        container.innerHTML = '';
        container.appendChild(box);

        const cleanup = () => {
          signal?.removeEventListener?.('abort', onAbort);
          if (box.parentNode === container) container.removeChild(box);
        };

        const onAbort = () => {
          cleanup();
          reject(new DOMException('Minigame aborted', 'AbortError'));
        };

        winBtn.addEventListener('click', () => {
          cleanup();
          resolve({ ok: true, score: 100, details: { gameId, stub: 'DEBUG-STUB' } });
        });

        failBtn.addEventListener('click', () => {
          cleanup();
          resolve({ ok: false, score: 0, details: { gameId, stub: 'DEBUG-STUB' } });
        });

        signal?.addEventListener?.('abort', onAbort, { once: true });
      });
    },
  };
}

export function createMinigameRegistry() {
  return { load };
}

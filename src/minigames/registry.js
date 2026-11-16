import * as parchmentGame from './parchment.js';
import * as quidditchGame from './quidditch.js';
import * as stealthGame from './stealth.js';
import * as duelGame from './duel.js';
import * as potionsGame from './potions.js';

/**
 * Minigame registry matching M4–M8 contract (docs/03_ARCHITECTURE.md + docs/06_MINIGAMES.md):
 * load(id) -> Promise<{ run(container, params) -> Promise<{ ok, score, details }> }>
 *
 * All 5 minigames are implemented:
 * - parchment (M4)
 * - quidditch (M5)
 * - stealth   (M6)
 * - duel      (M7)
 * - potions   (M8)
 */
const GAMES = Object.freeze({
  parchment: parchmentGame,
  quidditch: quidditchGame,
  stealth: stealthGame,
  duel: duelGame,
  potions: potionsGame,
});

export async function load(gameId) {
  const mod = gameId ? GAMES[gameId] : null;
  if (!mod) {
    throw new Error(`Unknown minigame ID: ${String(gameId)}`);
  }
  return mod;
}

export function createMinigameRegistry() {
  return { load };
}

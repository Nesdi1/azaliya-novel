import { bus as defaultBus } from '../events.js';

export const SAVE_KEY = 'hogwarts.save.v1';
export const SCHEMA_VERSION = 1;
export const STORY_VERSION = 1;
export const HISTORY_LIMIT = 1000;

export const DEFAULT_VARIABLES = Object.freeze({
  roseFriend: false,
  duelScene4Win: null,
  stealthScene5Win: null,
  theoGift: null,
  scene6Route: null,
});

export const DEFAULT_SETTINGS = Object.freeze({
  speed: 35,
  auto: false,
  volume: 0.7,
  muted: false,
  reducedMotion: false,
});

let memoryState = null;

export function createInitialState(overrides = {}) {
  return {
    schemaVersion: SCHEMA_VERSION,
    storyVersion: STORY_VERSION,
    sceneId: overrides.sceneId || 'scene01',
    nodeId: overrides.nodeId || 's01_enter',
    variables: {
      ...DEFAULT_VARIABLES,
      ...(overrides.variables || {}),
    },
    history: Array.isArray(overrides.history) ? overrides.history.slice(-HISTORY_LIMIT) : [],
    readNodeIds: Array.isArray(overrides.readNodeIds)
      ? Array.from(new Set(overrides.readNodeIds))
      : [],
    settings: {
      ...DEFAULT_SETTINGS,
      ...(overrides.settings || {}),
    },
    updatedAt: overrides.updatedAt || new Date().toISOString(),
  };
}

function validateVariables(vars) {
  if (!vars || typeof vars !== 'object') return false;
  if (typeof vars.roseFriend !== 'boolean') return false;
  if (vars.duelScene4Win !== null && typeof vars.duelScene4Win !== 'boolean') return false;
  if (vars.stealthScene5Win !== null && typeof vars.stealthScene5Win !== 'boolean') return false;
  if (vars.theoGift !== null && vars.theoGift !== 'jacket' && vars.theoGift !== 'guitar') return false;
  if (vars.scene6Route !== null && vars.scene6Route !== 'lake' && vars.scene6Route !== 'quidditch') return false;
  return true;
}

export function inspectRawSave(bus = defaultBus) {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) {
      return memoryState
        ? { status: 'valid', state: normalizeState(memoryState) }
        : { status: 'empty', state: null };
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return {
        status: 'corrupted',
        state: null,
        message: 'Сохранение повреждено (некорректный JSON). Начните новую игру для сброса.',
      };
    }
    if (!parsed || typeof parsed !== 'object') {
      return {
        status: 'corrupted',
        state: null,
        message: 'Формат сохранения повреждён. Начните новую игру.',
      };
    }
    if (parsed.schemaVersion !== SCHEMA_VERSION || parsed.storyVersion !== STORY_VERSION) {
      return {
        status: 'version_mismatch',
        state: null,
        message: `Версия сохранения (${parsed.schemaVersion ?? '?'}/${parsed.storyVersion ?? '?'}) не совпадает с текущей (${SCHEMA_VERSION}/${STORY_VERSION}). Сбросьте сохранение кнопкой «Новая игра».`,
      };
    }
    if (
      typeof parsed.sceneId !== 'string' ||
      typeof parsed.nodeId !== 'string' ||
      !validateVariables(parsed.variables)
    ) {
      return {
        status: 'corrupted',
        state: null,
        message: 'Данные сохранения неполные или повреждены. Начните новую игру.',
      };
    }
    return { status: 'valid', state: normalizeState(parsed) };
  } catch (err) {
    const message = 'Доступ к localStorage ограничен; прогресс хранится в памяти сессии.';
    bus?.emit?.('save:error', { message, error: String(err) });
    return memoryState
      ? { status: 'valid', state: normalizeState(memoryState), inMemoryOnly: true }
      : { status: 'empty', state: null, inMemoryOnly: true };
  }
}

export function normalizeState(state) {
  const base = createInitialState(state);
  base.history = (Array.isArray(state.history) ? state.history : [])
    .filter((item) => item && typeof item.nodeId === 'string')
    .slice(-HISTORY_LIMIT);
  base.readNodeIds = Array.from(
    new Set((Array.isArray(state.readNodeIds) ? state.readNodeIds : []).filter((id) => typeof id === 'string'))
  );
  const speed = [0, 20, 35, 60].includes(Number(state.settings?.speed))
    ? Number(state.settings.speed)
    : DEFAULT_SETTINGS.speed;
  base.settings = {
    speed,
    auto: Boolean(state.settings?.auto),
    volume: Math.max(0, Math.min(1, Number(state.settings?.volume ?? DEFAULT_SETTINGS.volume))),
    muted: Boolean(state.settings?.muted),
    reducedMotion: Boolean(state.settings?.reducedMotion),
  };
  base.updatedAt = state.updatedAt || new Date().toISOString();
  return base;
}

export function load(bus = defaultBus) {
  const info = inspectRawSave(bus);
  return info.status === 'valid' ? info.state : null;
}

export function save(state, bus = defaultBus) {
  const normalized = normalizeState({
    ...state,
    updatedAt: new Date().toISOString(),
  });
  memoryState = normalized;
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(normalized));
    return { ok: true, error: null, state: normalized };
  } catch (err) {
    const message = 'Не удалось записать сохранение в браузер. Игра продолжается в памяти.';
    bus?.emit?.('save:error', { message, error: String(err) });
    return { ok: false, error: message, state: normalized };
  }
}

export function clear(bus = defaultBus) {
  memoryState = null;
  try {
    window.localStorage.removeItem(SAVE_KEY);
    return { ok: true, error: null };
  } catch (err) {
    const message = 'Не удалось очистить localStorage.';
    bus?.emit?.('save:error', { message, error: String(err) });
    return { ok: false, error: message };
  }
}

export function createSave(bus = defaultBus) {
  return {
    load: () => load(bus),
    save: (state) => save(state, bus),
    clear: () => clear(bus),
    inspect: () => inspectRawSave(bus),
    createInitialState,
  };
}

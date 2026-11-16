/**
 * Quidditch Minigame — Scene 6 (D656 & reuse from D721).
 * M5-upgrade (owner request 16.11.2026): two-phase gameplay with Golden Snitch.
 *
 * Contract (docs/06_MINIGAMES.md): run(container, params) -> Promise<{ ok, score, details }>
 *
 * FSM: ready -> flight (rings) -> snitch_chase -> snitch_qte (tap-hold) -> result (win/lose)
 *
 * - Logical canvas: 896×1200 (DPR <= 2), background bg_quidditch. All objects are drawn on Canvas
 *   (no new arts): broom rider, rings, Bludgers, rival Chasers, Golden Snitch.
 * - flight:       player x fixed (180), y 160..1040 follows the pointer (smoothing 120ms, <= 500 px/s).
 *                 9 golden rings (r 65), Bludgers (first at 5s), rival Chasers appear after 10s.
 *                 Switches to snitch_chase when 6 rings are collected OR the first half of the timer
 *                 (22.5s) is over.
 * - snitch_chase: free 2D flight; the Snitch darts around and flees when the player is close.
 *                 Catch = swept contact, or staying within 130px for 2.2s ("tailing lock").
 *                 Bludgers and rival Chasers (some cut across the player's height) still cost a heart.
 *                 Time limit 30s; when it runs out the Snitch escapes.
 * - snitch_qte:   mini screen. The Snitch thrashes inside the view; the player taps to fill the grip
 *                 gauge to 100%. Taps on the beat give more. Idle -> gauge drains; at 0 (or after 14s)
 *                 the Snitch breaks free: -10 score and a new chase (max 2 re-tries, then lose).
 * - 3 hearts, 1.5s invulnerability after a hit, 0 hearts -> lose.
 * - ok = Snitch caught and hearts > 0.
 *   score = 30*rings/9 + 50 (Snitch caught) + 20*hearts/3 - 10*escapes (clamped 0..100).
 * - retry/skip is a system UI of the engine (ok:false -> retry/skip window, skip -> ok:true).
 * - Pause on visibilitychange / window blur (paused time is never counted), pointercancel safe.
 */

const LOGICAL_W = 896;
const LOGICAL_H = 1200;

// Player
const PLAYER_X = 180;
const PLAYER_START_Y = 600;
const PLAYER_R = 24;
const MIN_Y = 160;
const MAX_Y = 1040;
const MIN_X = 110;
const MAX_X = 800;
const MAX_SPEED_FLIGHT = 500;
const MAX_SPEED_CHASE = 560;
const SMOOTHING_S = 0.12;

// Hearts
const START_HEARTS = 3;
const INVULN_DURATION_S = 1.5;

// Phase 1: rings
const WORLD_SPEED = 180;
const RING_R = 65;
const RING_TOTAL = 9;
const RING_FIRST_ARRIVAL_S = 2.2;
const RING_INTERVAL_S = 2.4;
const RING_Y_CYCLE = [260, 600, 900];
const RINGS_TARGET_FOR_SNITCH = 6;
const FLIGHT_PHASE_S = 22.5; // first half of the 45s timer

// Hazards
const BLUDGER_R = 25;
const BLUDGER_FIRST_S = 5;
const BLUDGER_INTERVAL_FLIGHT_S = 5;
const BLUDGER_INTERVAL_CHASE_S = 3.4;
const BLUDGER_SPEED_FLIGHT = 220;
const BLUDGER_SPEED_CHASE = 250;
const BLUDGER_Y_CYCLE = [900, 260, 600];

const RIVAL_R = 30;
const RIVAL_SPEED = 250;
const RIVAL_CUT_SPEED = 110;
const RIVAL_FLIGHT_FIRST_S = 10;
const RIVAL_INTERVAL_FLIGHT_S = 6.5;
const RIVAL_INTERVAL_CHASE_S = 4.2;
const RIVAL_Y_CYCLE = [300, 520, 740, 940];

// Phase 2: Snitch chase
const SNITCH_R = 14;
const SNITCH_SPEED = 310;
const SNITCH_FLEE_RANGE = 170;
const SNITCH_FLEE_BOOST = 140;
const SNITCH_BOUNDS = Object.freeze({ x0: 210, x1: 840, y0: 190, y1: 1010 });
const CATCH_EXTRA_R = 20;
const LOCK_RANGE = 130;
const LOCK_NEEDED_S = 2.2;
const CHASE_LIMIT_S = 30;
const CHASE_RETRY_LIMIT_S = 22;

// Phase 3: Snitch QTE
const QTE_START_PROGRESS = 0.25;
const QTE_GAIN_ON_BEAT = 0.1;
const QTE_GAIN_OFF_BEAT = 0.06;
const QTE_IDLE_AFTER_S = 0.18;
const QTE_DECAY_PER_S = 0.35;
const QTE_GRACE_S = 1.0;
const QTE_LIMIT_S = 14;
const QTE_BEAT_PERIOD_S = 0.42;
const MAX_SNITCH_ESCAPES = 2; // 3 attempts in total

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function hashSeed(str) {
  let h = 2166136261 >>> 0;
  const s = String(str ?? 'quidditch');
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createRng(seedStr) {
  let a = hashSeed(seedStr);
  return function next() {
    a += 0x6d2b79f5;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Minimum squared distance between two linearly moving points during one frame (swept check).
 * A and B are the player's and the object's positions at frame start / end.
 */
function sweptMinDistSq(pPrevX, pPrevY, pX, pY, oPrevX, oPrevY, oX, oY) {
  const ax = pPrevX - oPrevX;
  const ay = pPrevY - oPrevY;
  const bx = pX - oX;
  const by = pY - oY;
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq <= 1e-6) return ax * ax + ay * ay;
  const t = clamp(-(ax * dx + ay * dy) / lenSq, 0, 1);
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return cx * cx + cy * cy;
}

function buildRings() {
  const rings = [];
  for (let i = 0; i < RING_TOTAL; i += 1) {
    rings.push({
      index: i,
      arrival: RING_FIRST_ARRIVAL_S + i * RING_INTERVAL_S, // flight time when the ring reaches PLAYER_X
      y: RING_Y_CYCLE[i % RING_Y_CYCLE.length],
      x: LOGICAL_W + 200,
      prevX: LOGICAL_W + 200,
      collected: false,
      passed: false,
      sparkleMs: 0,
    });
  }
  return rings;
}

function isDebugMode() {
  try {
    return new URLSearchParams(window.location.search).get('debug') === '1';
  } catch (_) {
    return false;
  }
}

export async function run(container, params = {}) {
  const { signal = null, reducedMotion = false, debugAutoWin = false, seed = 'quidditch' } = params;

  if (signal?.aborted) {
    throw new DOMException('Minigame aborted', 'AbortError');
  }

  const startWallTs = performance.now();

  // DebugAutoWin resolves after the first RAF without changing normal rules (06_MINIGAMES.md L4)
  if (debugAutoWin) {
    return new Promise((resolve, reject) => {
      const id = window.requestAnimationFrame(() => {
        if (signal?.aborted) {
          reject(new DOMException('Minigame aborted', 'AbortError'));
          return;
        }
        resolve({
          ok: true,
          score: 100,
          details: {
            reason: 'completed',
            autoWin: true,
            rings: RING_TOTAL,
            hearts: START_HEARTS,
            snitchCaught: true,
            escapes: 0,
            elapsedMs: Math.round(performance.now() - startWallTs),
          },
        });
      });
      signal?.addEventListener?.(
        'abort',
        () => {
          window.cancelAnimationFrame(id);
          reject(new DOMException('Minigame aborted', 'AbortError'));
        },
        { once: true }
      );
    });
  }

  if (!container) {
    return {
      ok: true,
      score: 100,
      details: {
        reason: 'completed',
        rings: RING_TOTAL,
        hearts: START_HEARTS,
        snitchCaught: true,
        escapes: 0,
        elapsedMs: 0,
      },
    };
  }

  return new Promise((resolve, reject) => {
    const rand = createRng(seed);

    let settled = false;
    let state = 'ready'; // 'ready' | 'flight' | 'snitch_chase' | 'snitch_qte' | 'result'
    let rafId = null;
    let lastFrameTs = null;
    let paused = false;
    let activePointerId = null;

    // Active (non-paused) time
    let activeElapsedS = 0;

    // Player
    let playerX = PLAYER_X;
    let playerY = PLAYER_START_Y;
    let targetX = PLAYER_X;
    let targetY = PLAYER_START_Y;
    let playerVx = 0;
    let playerVy = 0;
    let hearts = START_HEARTS;
    let invulnS = 0;

    // Phase 1
    let flightT = 0;
    let ringsCollected = 0;
    const rings = buildRings();
    let ringsVisible = true;

    // Hazards
    const bludgers = [];
    const rivals = [];
    let bludgerSpawnIdx = 0;
    let rivalSpawnIdx = 0;
    let nextBludgerT = BLUDGER_FIRST_S; // in phase time
    let nextRivalT = RIVAL_FLIGHT_FIRST_S;
    let hazardClockS = 0; // time since the current phase started (used for spawns)

    // Phase 2
    let chaseT = 0;
    let chaseLimitS = CHASE_LIMIT_S;
    let lockS = 0;
    const snitch = {
      x: 760,
      y: 560,
      prevX: 760,
      prevY: 560,
      vx: 0,
      vy: 0,
      tx: 700,
      ty: 560,
      hopT: 0.5,
      wingPhase: 0,
    };

    // Phase 3
    let qteElapsedS = 0;
    let qteProgress = QTE_START_PROGRESS;
    let qteLastTapT = 0;
    let qteTaps = 0;
    let qteOnBeatTaps = 0;
    const tapFlashes = [];

    // Result bookkeeping
    let snitchCaught = false;
    let escapes = 0;

    const trailParticles = [];

    // ---------- DOM (896x1200 logical space) ----------
    const root = document.createElement('div');
    root.className = 'quidditch-game-root';
    root.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;overflow:hidden;touch-action:none;user-select:none;z-index:35;';

    const bgImg = document.createElement('img');
    bgImg.src = './assets/backgrounds/bg_quidditch.webp';
    bgImg.alt = 'Поле для квиддича';
    bgImg.draggable = false;
    bgImg.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;object-fit:cover;pointer-events:none;z-index:1;';

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(LOGICAL_W * dpr);
    canvas.height = Math.round(LOGICAL_H * dpr);
    canvas.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;pointer-events:none;z-index:2;';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Top HUD
    const topHud = document.createElement('div');
    topHud.style.cssText =
      'position:absolute;left:28px;right:28px;top:86px;z-index:6;display:flex;flex-direction:column;gap:8px;background:rgba(10,16,30,0.88);border:1.5px solid rgba(216,180,103,0.82);border-radius:14px;padding:12px 16px;box-shadow:0 10px 26px rgba(0,0,0,0.55);pointer-events:none;';

    const hudRow = document.createElement('div');
    hudRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:12px;';

    const heartsEl = document.createElement('div');
    heartsEl.style.cssText = 'font-size:22px;color:#f87171;letter-spacing:4px;font-weight:700;';

    const phaseEl = document.createElement('div');
    phaseEl.style.cssText = 'font-size:16px;color:#fde68a;font-weight:700;flex:1;text-align:center;';

    const timerEl = document.createElement('div');
    timerEl.style.cssText =
      'font-size:17px;color:#f8fafc;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap;';

    hudRow.append(heartsEl, phaseEl, timerEl);

    const progressTrack = document.createElement('div');
    progressTrack.style.cssText =
      'width:100%;height:8px;border-radius:999px;background:rgba(255,255,255,0.12);overflow:hidden;';
    const progressFill = document.createElement('div');
    progressFill.style.cssText =
      'width:0%;height:100%;background:linear-gradient(90deg,#f59e0b,#fde68a);';
    progressTrack.appendChild(progressFill);
    topHud.append(hudRow, progressTrack);

    // Floating banner (phase changes / events)
    const banner = document.createElement('div');
    banner.style.cssText =
      'position:absolute;left:50%;top:230px;transform:translateX(-50%);z-index:7;max-width:80%;padding:12px 22px;border-radius:14px;background:rgba(12,18,32,0.93);border:2px solid #facc15;color:#fef9c3;font-size:20px;font-weight:700;text-align:center;box-shadow:0 12px 30px rgba(0,0,0,0.7);pointer-events:none;';
    banner.hidden = true;
    let bannerTimer = null;
    function showBanner(text, ms = 2200) {
      banner.textContent = text;
      banner.hidden = false;
      if (bannerTimer !== null) window.clearTimeout(bannerTimer);
      bannerTimer = window.setTimeout(() => {
        banner.hidden = true;
        bannerTimer = null;
      }, ms);
    }

    // Pause badge
    const pauseBadge = document.createElement('div');
    pauseBadge.style.cssText =
      'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:9;padding:16px 28px;border-radius:16px;background:rgba(12,18,32,0.95);border:2px solid #d8b467;color:#fde68a;font-size:24px;font-weight:700;pointer-events:none;';
    pauseBadge.textContent = 'Пауза — вернитесь в окно игры';
    pauseBadge.hidden = true;

    // Ready card
    const readyCard = document.createElement('div');
    readyCard.style.cssText =
      'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(88%,540px);z-index:8;background:rgba(12,18,32,0.95);border:2px solid #d8b467;border-radius:18px;padding:22px 24px;text-align:center;box-shadow:0 18px 44px rgba(0,0,0,0.75);display:flex;flex-direction:column;gap:12px;';

    const readyTitle = document.createElement('h2');
    readyTitle.style.cssText = 'margin:0;font-size:24px;color:#fde68a;';
    readyTitle.textContent = 'Отборы по квиддичу';

    const readyDesc = document.createElement('p');
    readyDesc.style.cssText = 'margin:0;font-size:16px;line-height:1.45;color:#e2e8f0;text-align:left;';
    readyDesc.innerHTML =
      '<b>1. Кольца.</b> Ведите пальцем или мышью вверх и вниз и пролетайте через золотые кольца (6 штук — и появится Снитч).<br>' +
      '<b>2. Погоня.</b> Догоните Золотой Снитч, уворачиваясь от бладжеров и игроков соперника (3 жизни).<br>' +
      '<b>3. Поимка.</b> Быстро и в ритм тапайте по экрану, чтобы удержать Снитч, пока шкала не заполнится до 100%.';

    const startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.className = 'ui-btn ui-btn-primary';
    startBtn.style.minHeight = '48px';
    startBtn.style.fontSize = '18px';
    startBtn.textContent = 'Начать полёт ▸';

    readyCard.append(readyTitle, readyDesc, startBtn);

    root.append(bgImg, canvas, topHud, banner, pauseBadge, readyCard);

    // Debug-only tools (only with ?debug=1)
    let debugChaseBtn = null;
    let debugQteBtn = null;
    let debugWinBtn = null;
    let debugLoseBtn = null;
    if (isDebugMode()) {
      const bar = document.createElement('div');
      bar.style.cssText =
        'position:absolute;left:20px;right:20px;bottom:36px;z-index:7;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;';
      const mk = (label) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'ui-btn ui-btn-compact';
        b.style.minHeight = '44px';
        b.textContent = label;
        return b;
      };
      debugChaseBtn = mk('DEBUG → Погоня за Снитчем');
      debugQteBtn = mk('DEBUG → QTE-поимка');
      debugWinBtn = mk('DEBUG: победа');
      debugLoseBtn = mk('DEBUG: проигрыш (retry/skip)');
      bar.append(debugChaseBtn, debugQteBtn, debugWinBtn, debugLoseBtn);
      root.appendChild(bar);
    }

    container.innerHTML = '';
    container.appendChild(root);

    // ---------- Helpers ----------
    function toLogical(clientX, clientY) {
      const rect = root.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      return {
        x: ((clientX - rect.left) / w) * LOGICAL_W,
        y: ((clientY - rect.top) / h) * LOGICAL_H,
      };
    }

    function setTargetsFromPoint(pt) {
      targetY = clamp(pt.y, MIN_Y, MAX_Y);
      if (state === 'snitch_chase') {
        targetX = clamp(pt.x, MIN_X, MAX_X);
      }
    }

    let lastHud = '';
    function updateHud() {
      const full = '♥'.repeat(Math.max(0, hearts));
      const empty = '♡'.repeat(Math.max(0, START_HEARTS - hearts));
      let phaseText = '';
      let timerText = '';
      let pct = 0;
      if (state === 'flight') {
        phaseText = `Фаза 1/3 · Кольца ${ringsCollected}/${RING_TOTAL} (для Снитча: ${RINGS_TARGET_FOR_SNITCH})`;
        timerText = `${Math.max(0, FLIGHT_PHASE_S - flightT).toFixed(1)} с`;
        pct = (flightT / FLIGHT_PHASE_S) * 100;
      } else if (state === 'snitch_chase') {
        phaseText = `Фаза 2/3 · Погоня за Снитчем${escapes > 0 ? ` (попытка ${escapes + 1}/${MAX_SNITCH_ESCAPES + 1})` : ''}`;
        timerText = `${Math.max(0, chaseLimitS - chaseT).toFixed(1)} с`;
        pct = (lockS / LOCK_NEEDED_S) * 100;
      } else if (state === 'snitch_qte') {
        phaseText = 'Фаза 3/3 · Держи Снитч! Тапай в ритм!';
        timerText = `${Math.max(0, QTE_LIMIT_S - qteElapsedS).toFixed(1)} с`;
        pct = qteProgress * 100;
      } else {
        phaseText = 'Приготовьтесь к полёту';
      }
      const key = `${full}${empty}|${phaseText}|${timerText}|${Math.round(pct)}`;
      if (key === lastHud) return;
      lastHud = key;
      heartsEl.textContent = `${full}${empty}`;
      phaseEl.textContent = phaseText;
      timerEl.textContent = timerText;
      progressFill.style.width = `${clamp(pct, 0, 100).toFixed(1)}%`;
    }

    function spawnBludger(speed, y) {
      bludgers.push({
        x: LOGICAL_W + BLUDGER_R + 30,
        prevX: LOGICAL_W + BLUDGER_R + 30,
        y,
        prevY: y,
        speed,
        hit: false,
      });
    }

    function spawnRival() {
      const y = RIVAL_Y_CYCLE[rivalSpawnIdx % RIVAL_Y_CYCLE.length];
      rivalSpawnIdx += 1;
      rivals.push({
        x: LOGICAL_W + RIVAL_R + 40,
        prevX: LOGICAL_W + RIVAL_R + 40,
        y,
        prevY: y,
        hit: false,
        number: 2 + (rivalSpawnIdx % 7),
      });
    }

    // ---------- Result & cleanup ----------
    const cleanup = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (bannerTimer !== null) {
        window.clearTimeout(bannerTimer);
        bannerTimer = null;
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('focus', onWindowFocus);
      signal?.removeEventListener?.('abort', onAbort);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', endPointer);
      root.removeEventListener('pointercancel', cancelPointer);
      root.removeEventListener('lostpointercapture', endPointer);
      window.removeEventListener('keydown', onKeyDown);
      if (root.parentNode === container) {
        container.removeChild(root);
      }
    };

    function finishGame(ok, reason) {
      if (settled) return;
      settled = true;
      state = 'result';
      const ringsPart = Math.round((30 * ringsCollected) / RING_TOTAL);
      const catchPart = snitchCaught ? 50 : 0;
      const heartsPart = ok ? Math.round((20 * Math.max(0, hearts)) / START_HEARTS) : 0;
      const score = clamp(ringsPart + catchPart + heartsPart - 10 * escapes, 0, 100);
      const elapsedMs = Math.round(activeElapsedS * 1000);
      cleanup();
      resolve({
        ok,
        score,
        details: {
          reason,
          rings: ringsCollected,
          hearts: Math.max(0, hearts),
          snitchCaught,
          escapes,
          elapsedMs,
        },
      });
    }

    // ---------- Phase transitions ----------
    function beginFlight() {
      if (state !== 'ready') return;
      state = 'flight';
      readyCard.hidden = true;
      flightT = 0;
      hazardClockS = 0;
      nextBludgerT = BLUDGER_FIRST_S;
      nextRivalT = RIVAL_FLIGHT_FIRST_S;
      lastFrameTs = performance.now();
      showBanner('Пролетайте через золотые кольца!', 1800);
    }

    function beginSnitchChase(reasonText, isRetry = false) {
      if (state !== 'ready' && state !== 'flight' && state !== 'snitch_qte' && state !== 'snitch_chase') return;
      const comingFromQte = isRetry;
      state = 'snitch_chase';
      readyCard.hidden = true;
      ringsVisible = false;
      chaseT = 0;
      chaseLimitS = comingFromQte ? CHASE_RETRY_LIMIT_S : CHASE_LIMIT_S;
      lockS = 0;
      hazardClockS = 0;
      nextBludgerT = 2.0;
      nextRivalT = 3.0;
      bludgers.length = 0;
      rivals.length = 0;

      // Snitch appears on the right side, far from the player
      snitch.x = comingFromQte ? clamp(playerX + 420, SNITCH_BOUNDS.x0, SNITCH_BOUNDS.x1) : 780;
      snitch.y = clamp(LOGICAL_H - playerY, SNITCH_BOUNDS.y0, SNITCH_BOUNDS.y1);
      snitch.prevX = snitch.x;
      snitch.prevY = snitch.y;
      snitch.vx = 0;
      snitch.vy = 0;
      snitch.hopT = 0.2;

      if (comingFromQte) invulnS = Math.max(invulnS, INVULN_DURATION_S);
      activePointerId = null;
      targetX = playerX;
      targetY = playerY;
      lastFrameTs = performance.now();
      showBanner(reasonText || 'Золотой Снитч! Догоните его!', 2400);
    }

    function beginSnitchQte() {
      if (state !== 'snitch_chase' && state !== 'flight' && state !== 'ready') return;
      state = 'snitch_qte';
      readyCard.hidden = true;
      ringsVisible = false;
      bludgers.length = 0;
      rivals.length = 0;
      qteElapsedS = 0;
      qteProgress = QTE_START_PROGRESS;
      qteLastTapT = 0;
      qteTaps = 0;
      qteOnBeatTaps = 0;
      tapFlashes.length = 0;
      activePointerId = null;
      lastFrameTs = performance.now();
      showBanner('Снитч у вас в руках! Тапайте в ритм!', 2000);
    }

    function snitchEscaped(reasonText) {
      escapes += 1;
      if (escapes > MAX_SNITCH_ESCAPES) {
        finishGame(false, 'snitch_escaped');
        return;
      }
      beginSnitchChase(
        `${reasonText} Штраф −10 очков. Новый заход (${escapes + 1}/${MAX_SNITCH_ESCAPES + 1})!`,
        true
      );
    }

    function catchSnitch() {
      beginSnitchQte();
    }

    // ---------- Input ----------
    function registerTap() {
      if (state !== 'snitch_qte') return;
      const phase = (qteElapsedS % QTE_BEAT_PERIOD_S) / QTE_BEAT_PERIOD_S;
      const onBeat = phase < 0.18 || phase > 0.82;
      qteProgress = Math.min(1, qteProgress + (onBeat ? QTE_GAIN_ON_BEAT : QTE_GAIN_OFF_BEAT));
      qteLastTapT = qteElapsedS;
      qteTaps += 1;
      if (onBeat) qteOnBeatTaps += 1;
      if (!reducedMotion) {
        tapFlashes.push({ age: 0, onBeat });
        if (tapFlashes.length > 12) tapFlashes.shift();
      }
      if (qteProgress >= 1) {
        snitchCaught = true;
        finishGame(true, 'completed');
      }
    }

    function onPointerDown(e) {
      if (e.target.closest('button')) return;
      if (state === 'ready') {
        beginFlight();
      }
      if (state === 'snitch_qte') {
        registerTap();
        return;
      }
      if (state !== 'flight' && state !== 'snitch_chase') return;
      activePointerId = e.pointerId;
      setTargetsFromPoint(toLogical(e.clientX, e.clientY));
      try {
        root.setPointerCapture(e.pointerId);
      } catch (_) {
        // synthetic pointers cannot be captured
      }
    }

    function onPointerMove(e) {
      if (state !== 'flight' && state !== 'snitch_chase') return;
      if (activePointerId !== null && e.pointerId === activePointerId) {
        setTargetsFromPoint(toLogical(e.clientX, e.clientY));
      } else if (e.pointerType === 'mouse' && e.buttons > 0) {
        setTargetsFromPoint(toLogical(e.clientX, e.clientY));
      }
    }

    function releaseCapture(e) {
      if (e?.pointerId !== undefined) {
        try {
          if (root.hasPointerCapture?.(e.pointerId)) {
            root.releasePointerCapture(e.pointerId);
          }
        } catch (_) {
          // ignore
        }
      }
    }

    function endPointer(e) {
      if (activePointerId === null || (e && e.pointerId !== undefined && e.pointerId !== activePointerId)) {
        return;
      }
      releaseCapture(e);
      activePointerId = null;
    }

    // pointercancel: never lose control — the broom simply holds its current position
    function cancelPointer(e) {
      if (activePointerId === null || (e && e.pointerId !== undefined && e.pointerId !== activePointerId)) {
        return;
      }
      releaseCapture(e);
      activePointerId = null;
      targetX = playerX;
      targetY = playerY;
    }

    function onKeyDown(e) {
      if (state === 'ready' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        beginFlight();
        return;
      }
      if (state === 'snitch_qte' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        if (!e.repeat) registerTap();
        return;
      }
      if (state !== 'flight' && state !== 'snitch_chase') return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        targetY = clamp(playerY - 95, MIN_Y, MAX_Y);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        targetY = clamp(playerY + 95, MIN_Y, MAX_Y);
      } else if (state === 'snitch_chase' && (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A')) {
        targetX = clamp(playerX - 95, MIN_X, MAX_X);
      } else if (state === 'snitch_chase' && (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D')) {
        targetX = clamp(playerX + 95, MIN_X, MAX_X);
      }
    }

    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      beginFlight();
    });

    debugChaseBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state === 'ready' || state === 'flight') beginSnitchChase('DEBUG: Золотой Снитч! Догоните его!');
    });
    debugQteBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state === 'ready' || state === 'flight' || state === 'snitch_chase') beginSnitchQte();
    });
    debugWinBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      ringsCollected = Math.max(ringsCollected, RINGS_TARGET_FOR_SNITCH);
      hearts = Math.max(hearts, 1);
      snitchCaught = true;
      finishGame(true, 'completed');
    });
    debugLoseBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      hearts = 0;
      finishGame(false, 'failed');
    });

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', endPointer);
    root.addEventListener('pointercancel', cancelPointer);
    root.addEventListener('lostpointercapture', endPointer);
    window.addEventListener('keydown', onKeyDown);

    // ---------- Pause (visibilitychange / blur) ----------
    function setPaused(next) {
      if (settled || paused === next) return;
      paused = next;
      pauseBadge.hidden = !(paused && !document.hidden);
      lastFrameTs = null; // time spent paused is never counted
      if (paused) {
        activePointerId = null;
        targetX = playerX;
        targetY = playerY;
      }
    }
    function onVisibilityChange() {
      setPaused(document.hidden);
    }
    function onWindowBlur() {
      if (state !== 'ready' && state !== 'result') setPaused(true);
    }
    function onWindowFocus() {
      if (!document.hidden) setPaused(false);
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('focus', onWindowFocus);

    function onAbort() {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new DOMException('Minigame aborted', 'AbortError'));
    }
    signal?.addEventListener?.('abort', onAbort, { once: true });

    // ---------- Simulation ----------
    function damagePlayer() {
      hearts -= 1;
      invulnS = INVULN_DURATION_S;
      if (hearts <= 0) {
        updateHud();
        finishGame(false, 'failed');
        return true;
      }
      showBanner('Столкновение! −1 жизнь', 1100);
      return false;
    }

    function movePlayer(dt) {
      const prevX = playerX;
      const prevY = playerY;
      if (state === 'flight') {
        playerX += (PLAYER_X - playerX) * clamp(dt / 0.2, 0, 1);
        const desiredVy = (targetY - playerY) / SMOOTHING_S;
        playerVy = clamp(desiredVy, -MAX_SPEED_FLIGHT, MAX_SPEED_FLIGHT);
        playerVx = 0;
        playerY = clamp(playerY + playerVy * dt, MIN_Y, MAX_Y);
      } else {
        const desiredVx = (targetX - playerX) / SMOOTHING_S;
        const desiredVy = (targetY - playerY) / SMOOTHING_S;
        let vx = desiredVx;
        let vy = desiredVy;
        const sp = Math.hypot(vx, vy);
        if (sp > MAX_SPEED_CHASE) {
          vx = (vx / sp) * MAX_SPEED_CHASE;
          vy = (vy / sp) * MAX_SPEED_CHASE;
        }
        playerVx = vx;
        playerVy = vy;
        playerX = clamp(playerX + vx * dt, MIN_X, MAX_X);
        playerY = clamp(playerY + vy * dt, MIN_Y, MAX_Y);
      }
      return { prevX, prevY };
    }

    function updateHazards(dt, prev) {
      hazardClockS += dt;
      const inChase = state === 'snitch_chase';

      // Spawn Bludgers
      if (hazardClockS >= nextBludgerT) {
        if (inChase) {
          const y = clamp(playerY + (rand() - 0.5) * 120, MIN_Y, MAX_Y);
          spawnBludger(BLUDGER_SPEED_CHASE, y);
          nextBludgerT = hazardClockS + BLUDGER_INTERVAL_CHASE_S;
        } else {
          spawnBludger(BLUDGER_SPEED_FLIGHT, BLUDGER_Y_CYCLE[bludgerSpawnIdx % BLUDGER_Y_CYCLE.length]);
          bludgerSpawnIdx += 1;
          nextBludgerT = hazardClockS + BLUDGER_INTERVAL_FLIGHT_S;
        }
      }

      // Spawn rival Chasers
      if (hazardClockS >= nextRivalT) {
        spawnRival();
        nextRivalT = hazardClockS + (inChase ? RIVAL_INTERVAL_CHASE_S : RIVAL_INTERVAL_FLIGHT_S);
      }

      const bludgerHitSq = (PLAYER_R + BLUDGER_R) * (PLAYER_R + BLUDGER_R);
      for (let i = bludgers.length - 1; i >= 0; i -= 1) {
        const b = bludgers[i];
        b.prevX = b.x;
        b.prevY = b.y;
        b.x -= b.speed * dt;
        if (b.x < -80) {
          bludgers.splice(i, 1);
          continue;
        }
        if (
          !b.hit &&
          invulnS <= 0 &&
          sweptMinDistSq(prev.prevX, prev.prevY, playerX, playerY, b.prevX, b.prevY, b.x, b.y) <= bludgerHitSq
        ) {
          b.hit = true;
          if (damagePlayer()) return true;
        }
      }

      const rivalHitSq = (PLAYER_R + RIVAL_R * 0.9) * (PLAYER_R + RIVAL_R * 0.9);
      for (let i = rivals.length - 1; i >= 0; i -= 1) {
        const r = rivals[i];
        r.prevX = r.x;
        r.prevY = r.y;
        r.x -= RIVAL_SPEED * dt;
        // "Cutting" the player's line while still far away, then holding the course
        if (r.x > playerX + 260) {
          const step = RIVAL_CUT_SPEED * dt;
          r.y += clamp(playerY - r.y, -step, step);
        }
        if (r.x < -90) {
          rivals.splice(i, 1);
          continue;
        }
        if (
          !r.hit &&
          invulnS <= 0 &&
          sweptMinDistSq(prev.prevX, prev.prevY, playerX, playerY, r.prevX, r.prevY, r.x, r.y) <= rivalHitSq
        ) {
          r.hit = true;
          if (damagePlayer()) return true;
        }
      }
      return false;
    }

    function updateTrail(dt) {
      if (reducedMotion) return;
      trailParticles.push({
        x: playerX - 28,
        y: playerY + (rand() - 0.5) * 10,
        vx: -110 - rand() * 50,
        vy: (rand() - 0.5) * 24,
        life: 0.45,
        maxLife: 0.45,
      });
      for (let i = trailParticles.length - 1; i >= 0; i -= 1) {
        const p = trailParticles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) trailParticles.splice(i, 1);
      }
      if (trailParticles.length > 40) trailParticles.splice(0, trailParticles.length - 40);
    }

    function updateSnitch(dt) {
      snitch.prevX = snitch.x;
      snitch.prevY = snitch.y;
      snitch.wingPhase += dt * 38;

      snitch.hopT -= dt;
      if (snitch.hopT <= 0) {
        snitch.tx = SNITCH_BOUNDS.x0 + 40 + rand() * (SNITCH_BOUNDS.x1 - SNITCH_BOUNDS.x0 - 80);
        snitch.ty = SNITCH_BOUNDS.y0 + 40 + rand() * (SNITCH_BOUNDS.y1 - SNITCH_BOUNDS.y0 - 80);
        snitch.hopT = 0.8 + rand() * 0.9;
      }

      let dx = snitch.tx - snitch.x;
      let dy = snitch.ty - snitch.y;
      const d = Math.hypot(dx, dy) || 1;
      let dvx = (dx / d) * SNITCH_SPEED;
      let dvy = (dy / d) * SNITCH_SPEED;

      // Flee when the player is close
      const pdx = snitch.x - playerX;
      const pdy = snitch.y - playerY;
      const pd = Math.hypot(pdx, pdy) || 1;
      if (pd < SNITCH_FLEE_RANGE) {
        const k = (SNITCH_FLEE_RANGE - pd) / SNITCH_FLEE_RANGE;
        dvx += (pdx / pd) * SNITCH_FLEE_BOOST * k * 1.6;
        dvy += (pdy / pd) * SNITCH_FLEE_BOOST * k * 1.6;
      }

      // Wobble
      dvx += Math.sin(chaseT * 9.1) * 55;
      dvy += Math.cos(chaseT * 7.3) * 55;

      const blend = clamp(dt / 0.18, 0, 1);
      snitch.vx += (dvx - snitch.vx) * blend;
      snitch.vy += (dvy - snitch.vy) * blend;

      snitch.x += snitch.vx * dt;
      snitch.y += snitch.vy * dt;

      if (snitch.x < SNITCH_BOUNDS.x0) {
        snitch.x = SNITCH_BOUNDS.x0;
        snitch.vx = Math.abs(snitch.vx) * 0.5;
        snitch.hopT = Math.min(snitch.hopT, 0.2);
      } else if (snitch.x > SNITCH_BOUNDS.x1) {
        snitch.x = SNITCH_BOUNDS.x1;
        snitch.vx = -Math.abs(snitch.vx) * 0.5;
        snitch.hopT = Math.min(snitch.hopT, 0.2);
      }
      if (snitch.y < SNITCH_BOUNDS.y0) {
        snitch.y = SNITCH_BOUNDS.y0;
        snitch.vy = Math.abs(snitch.vy) * 0.5;
        snitch.hopT = Math.min(snitch.hopT, 0.2);
      } else if (snitch.y > SNITCH_BOUNDS.y1) {
        snitch.y = SNITCH_BOUNDS.y1;
        snitch.vy = -Math.abs(snitch.vy) * 0.5;
        snitch.hopT = Math.min(snitch.hopT, 0.2);
      }
    }

    function stepFlight(dt) {
      const prev = movePlayer(dt);
      flightT += dt;

      // Rings: counted once, when the ring center crosses PLAYER_X (swept in y)
      if (ringsVisible) {
        for (const ring of rings) {
          ring.prevX = ring.x;
          ring.x = PLAYER_X + (ring.arrival - flightT) * WORLD_SPEED;
          if (!ring.collected && !ring.passed && ring.prevX >= PLAYER_X && ring.x <= PLAYER_X) {
            const span = Math.max(1e-5, ring.prevX - ring.x);
            const frac = clamp((ring.prevX - PLAYER_X) / span, 0, 1);
            const yAtCross = prev.prevY + (playerY - prev.prevY) * frac;
            if (Math.abs(yAtCross - ring.y) <= RING_R + PLAYER_R * 0.65) {
              ring.collected = true;
              ring.sparkleMs = 450;
              ringsCollected += 1;
            } else {
              ring.passed = true;
            }
          }
          if (ring.sparkleMs > 0) ring.sparkleMs = Math.max(0, ring.sparkleMs - dt * 1000);
        }
      }

      if (updateHazards(dt, prev)) return;
      updateTrail(dt);

      if (ringsCollected >= RINGS_TARGET_FOR_SNITCH) {
        beginSnitchChase('Кольца собраны! В небе — Золотой Снитч, догоните его!');
      } else if (flightT >= FLIGHT_PHASE_S) {
        beginSnitchChase('Половина времени позади — в небе Золотой Снитч, догоните его!');
      }
    }

    function stepChase(dt) {
      const prev = movePlayer(dt);
      chaseT += dt;
      updateSnitch(dt);

      if (updateHazards(dt, prev)) return;
      updateTrail(dt);

      // Catch: swept contact between the player and the Snitch
      const catchR = PLAYER_R + SNITCH_R + CATCH_EXTRA_R;
      const contactSq = sweptMinDistSq(
        prev.prevX,
        prev.prevY,
        playerX,
        playerY,
        snitch.prevX,
        snitch.prevY,
        snitch.x,
        snitch.y
      );
      if (contactSq <= catchR * catchR) {
        catchSnitch();
        return;
      }

      // Tailing lock: staying close for long enough also grabs the Snitch
      const dist = Math.hypot(playerX - snitch.x, playerY - snitch.y);
      if (dist <= LOCK_RANGE) {
        lockS += dt;
      } else {
        lockS = Math.max(0, lockS - dt * 1.5);
      }
      if (lockS >= LOCK_NEEDED_S) {
        catchSnitch();
        return;
      }

      if (chaseT >= chaseLimitS) {
        snitchEscaped('Снитч ускользнул!');
      }
    }

    function stepQte(dt) {
      qteElapsedS += dt;
      for (let i = tapFlashes.length - 1; i >= 0; i -= 1) {
        tapFlashes[i].age += dt;
        if (tapFlashes[i].age > 0.35) tapFlashes.splice(i, 1);
      }

      const idleFor = qteElapsedS - qteLastTapT;
      if (qteElapsedS > QTE_GRACE_S && idleFor > QTE_IDLE_AFTER_S) {
        qteProgress = Math.max(0, qteProgress - QTE_DECAY_PER_S * dt);
      }

      if (qteProgress <= 0 && qteElapsedS > QTE_GRACE_S) {
        snitchEscaped('Снитч вырвался из рук!');
        return;
      }
      if (qteElapsedS >= QTE_LIMIT_S) {
        snitchEscaped('Время удержания вышло — Снитч вырвался!');
      }
    }

    function stepSimulation(dt) {
      activeElapsedS += dt;
      if (invulnS > 0) invulnS = Math.max(0, invulnS - dt);

      if (state === 'flight') stepFlight(dt);
      else if (state === 'snitch_chase') stepChase(dt);
      else if (state === 'snitch_qte') stepQte(dt);

      if (!settled) updateHud();
    }

    // ---------- Rendering ----------
    function drawSnitch(cx, cy, r, wingPhase, glow) {
      ctx.save();
      ctx.translate(cx, cy);
      const flap = reducedMotion ? 0.6 : 0.55 + 0.45 * Math.sin(wingPhase);

      // Glow
      const g = ctx.createRadialGradient(0, 0, r * 0.3, 0, 0, r * (2.6 + glow));
      g.addColorStop(0, 'rgba(255, 244, 170, 0.85)');
      g.addColorStop(0.5, 'rgba(250, 204, 21, 0.3)');
      g.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, r * (2.6 + glow), 0, Math.PI * 2);
      ctx.fill();

      // Wings
      ctx.fillStyle = 'rgba(255, 251, 220, 0.88)';
      ctx.strokeStyle = 'rgba(217, 166, 40, 0.9)';
      ctx.lineWidth = Math.max(1.2, r * 0.1);
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side, 1);
        ctx.rotate(-0.5 * flap);
        ctx.beginPath();
        ctx.ellipse(r * 1.35, 0, r * 1.5, r * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Ball
      const bg = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
      bg.addColorStop(0, '#fff7c2');
      bg.addColorStop(0.55, '#facc15');
      bg.addColorStop(1, '#b45309');
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawRival(r) {
      ctx.save();
      ctx.translate(r.x, r.y);
      // Broom
      ctx.strokeStyle = '#57534e';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-40, 8);
      ctx.lineTo(44, 4);
      ctx.stroke();
      ctx.fillStyle = '#7c2d12';
      ctx.beginPath();
      ctx.moveTo(42, 4);
      ctx.lineTo(68, -8);
      ctx.lineTo(62, 18);
      ctx.closePath();
      ctx.fill();
      // Rider (opposing crimson team)
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.arc(0, -4, RIVAL_R * 0.82, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fca5a5';
      ctx.stroke();
      ctx.fillStyle = '#e7d3c0';
      ctx.beginPath();
      ctx.arc(-6, -16, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fee2e2';
      ctx.font = '700 15px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(r.number), 0, 6);
      ctx.restore();
    }

    function drawPlayer(blink) {
      if (blink) return;
      ctx.save();
      ctx.translate(playerX, playerY);
      const tiltRad = clamp((playerVy / MAX_SPEED_CHASE) * 0.28, -0.3, 0.3);
      ctx.rotate(tiltRad);

      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-42, 6);
      ctx.lineTo(36, 2);
      ctx.stroke();

      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.moveTo(-40, 6);
      ctx.lineTo(-64, -6);
      ctx.lineTo(-58, 16);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(0, -4, PLAYER_R * 0.85, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#facc15';
      ctx.stroke();

      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(6, -14, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function renderFlightWorld(now) {
      // Altitude guides
      ctx.strokeStyle = 'rgba(248, 250, 252, 0.16)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(0, MIN_Y);
      ctx.lineTo(LOGICAL_W, MIN_Y);
      ctx.moveTo(0, MAX_Y);
      ctx.lineTo(LOGICAL_W, MAX_Y);
      ctx.stroke();
      ctx.setLineDash([]);

      if (ringsVisible) {
        for (const ring of rings) {
          if (ring.x < -RING_R * 2 || ring.x > LOGICAL_W + RING_R * 2) continue;
          ctx.save();
          ctx.translate(ring.x, ring.y);
          ctx.strokeStyle = 'rgba(180, 142, 68, 0.55)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(0, RING_R);
          ctx.lineTo(0, LOGICAL_H - ring.y);
          ctx.stroke();

          ctx.lineWidth = ring.collected ? 8 : 6;
          ctx.strokeStyle = ring.collected ? 'rgba(134, 239, 172, 0.95)' : 'rgba(250, 204, 21, 0.95)';
          ctx.shadowColor = ring.collected ? 'rgba(74, 222, 128, 0.8)' : 'rgba(250, 204, 21, 0.7)';
          ctx.shadowBlur = ring.collected ? 18 : 12;
          ctx.beginPath();
          ctx.ellipse(0, 0, RING_R * 0.42, RING_R, 0, 0, Math.PI * 2);
          ctx.stroke();

          if (ring.sparkleMs > 0) {
            const a = ring.sparkleMs / 450;
            ctx.fillStyle = `rgba(254, 240, 138, ${(a * 0.55).toFixed(3)})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, RING_R * 0.42, RING_R, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      // Broom trail
      if (!reducedMotion) {
        for (const p of trailParticles) {
          const alpha = clamp(p.life / p.maxLife, 0, 1);
          ctx.fillStyle = `rgba(253, 224, 71, ${(alpha * 0.7).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.5 * alpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Rival Chasers
      for (const r of rivals) {
        if (r.hit || r.x < -100 || r.x > LOGICAL_W + 120) continue;
        drawRival(r);
      }

      // Snitch (chase)
      if (state === 'snitch_chase') {
        // Lock meter ring
        if (lockS > 0.05) {
          const frac = clamp(lockS / LOCK_NEEDED_S, 0, 1);
          ctx.save();
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.95)';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(snitch.x, snitch.y, 34, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        drawSnitch(snitch.x, snitch.y, SNITCH_R, snitch.wingPhase, 0.4 * Math.sin(now / 160));
      }

      // Player
      const blink = invulnS > 0 && Math.floor(invulnS * 12) % 2 === 1;
      drawPlayer(blink);

      // Bludgers
      for (const b of bludgers) {
        if (b.hit || b.x < -BLUDGER_R * 2 || b.x > LOGICAL_W + BLUDGER_R * 2) continue;
        ctx.save();
        ctx.translate(b.x, b.y);
        const grad = ctx.createRadialGradient(-6, -6, 3, 0, 0, BLUDGER_R);
        grad.addColorStop(0, '#94a3b8');
        grad.addColorStop(0.55, '#334155');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.75)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, 0, BLUDGER_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(248, 113, 113, 0.85)';
        ctx.stroke();
        ctx.restore();
      }
    }

    function renderQte(now) {
      // Dim the pitch, show a close-up of the struggling Snitch
      ctx.fillStyle = 'rgba(5, 8, 20, 0.62)';
      ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

      const amp = reducedMotion ? 0.35 : 1;
      const t = qteElapsedS;
      const cx = 448 + (Math.sin(t * 7.3) * 170 + Math.sin(t * 13.1) * 40) * amp;
      const cy = 560 + (Math.cos(t * 5.1) * 120 + Math.cos(t * 11.7) * 30) * amp;

      // Beat ring contracting onto the Snitch
      const phase = (t % QTE_BEAT_PERIOD_S) / QTE_BEAT_PERIOD_S;
      const onBeatWindow = phase < 0.18 || phase > 0.82;
      const ringR = 40 + 80 * (1 - phase);
      ctx.save();
      ctx.strokeStyle = onBeatWindow ? 'rgba(134, 239, 172, 0.95)' : 'rgba(253, 224, 71, 0.6)';
      ctx.lineWidth = onBeatWindow ? 7 : 4;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Tap flashes
      for (const f of tapFlashes) {
        const a = 1 - f.age / 0.35;
        ctx.save();
        ctx.strokeStyle = f.onBeat ? `rgba(134, 239, 172, ${a.toFixed(3)})` : `rgba(248, 250, 252, ${(a * 0.7).toFixed(3)})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, 44 + f.age * 160, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      drawSnitch(cx, cy, 34, t * 44, 0.6 * Math.sin(now / 90));

      // Grip gauge
      const gx = 148;
      const gy = 910;
      const gw = 600;
      const gh = 54;
      ctx.save();
      ctx.fillStyle = 'rgba(10, 16, 30, 0.92)';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(gx, gy, gw, gh, 14);
      ctx.fill();
      ctx.stroke();

      const fillW = Math.max(0, gw - 8) * clamp(qteProgress, 0, 1);
      const gg = ctx.createLinearGradient(gx, 0, gx + gw, 0);
      gg.addColorStop(0, '#f59e0b');
      gg.addColorStop(1, qteProgress > 0.66 ? '#86efac' : '#fde68a');
      ctx.fillStyle = gg;
      ctx.beginPath();
      ctx.roundRect(gx + 4, gy + 4, fillW, gh - 8, 10);
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 22px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Хватка Снитча: ${Math.round(qteProgress * 100)}%`, gx + gw / 2, gy + gh / 2);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = '#fde68a';
      ctx.font = '700 26px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('ТАПАЙ ПО ЭКРАНУ В РИТМ!', 448, 860);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 17px Georgia, serif';
      ctx.fillText(
        qteElapsedS < QTE_GRACE_S ? 'Не медлите — шкала падает, и Снитч вырвется' : 'Тапы на зелёное кольцо дают больше',
        448,
        1000
      );
      ctx.restore();
    }

    function renderScene(now) {
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
      renderFlightWorld(now);
      if (state === 'snitch_qte') renderQte(now);
    }

    const tick = (now) => {
      if (settled) return;
      if (!paused && !document.hidden && state !== 'ready' && state !== 'result') {
        if (lastFrameTs === null) lastFrameTs = now;
        // dt is clamped to 50ms to avoid jumps after hitches (07_MILESTONES M5 risk)
        const dt = clamp((now - lastFrameTs) / 1000, 0, 0.05);
        lastFrameTs = now;
        if (dt > 0) stepSimulation(dt);
      }
      if (!settled) {
        renderScene(now);
        rafId = window.requestAnimationFrame(tick);
      }
    };

    updateHud();
    renderScene(performance.now());
    rafId = window.requestAnimationFrame(tick);
  });
}

export default { run };

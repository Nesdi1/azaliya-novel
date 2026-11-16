/**
 * Duel Minigame — Scene 4 (D407) & Scene 6 (D627), docs/06_MINIGAMES.md L13–20.
 * Contract: run(container, params) -> Promise<{ ok: boolean, score: number, details: object }>
 *
 * - Logical canvas: 896×1200 (DPR <= 2).
 * - States: telegraph -> select -> trace -> resolve -> next turn -> end.
 * - Player HP = 100, Enemy HP = 100, max 5 turns.
 * - Top bar shows enemy incoming spell; right column has 3 spell buttons (>= 56px hit zone);
 *   trace field is x: 80..640, y: 420..900 (560×480).
 * - Enemy spell cycle: Expelliarmus -> Stupefy -> Petrificus.
 * - Counter-spells: Protego -> Expelliarmus -> Finite.
 * - Select timer: 6s; Trace timer: 5s.
 * - Normalized contours:
 *   Protego:      [(0.1, 0.8), (0.5, 0.1), (0.9, 0.8)]
 *   Expelliarmus: [(0.1, 0.2), (0.5, 0.8), (0.9, 0.2)]
 *   Finite:       [(0.1, 0.5), (0.4, 0.2), (0.6, 0.8), (0.9, 0.5)]
 * - Resample gesture into 64 equidistant points; gesture length must be >= 60% of contour length.
 * - error = meanDistance / fieldDiagonal; accuracy = clamp(1 - error / 0.15, 0, 1);
 *   speed = clamp(1 - traceElapsedMs / 5000, 0, 1).
 * - Correct choice + valid trace: damage = round(20 + 20*accuracy + 10*speed), incoming = round(15*(1 - accuracy)).
 * - Wrong choice or timeout: damage = 0, incoming = 30.
 * - Scene 4: ok = (enemyHp <= 0) || (turn == 5 && playerHp > enemyHp); tie is loss.
 * - Scene 6 (forceStoryWin): always ok: true, even at HP 0; details.practiceFailed stores actual result.
 */

const LOGICAL_W = 896;
const LOGICAL_H = 1200;

const FIELD_X0 = 80;
const FIELD_Y0 = 420;
const FIELD_X1 = 640;
const FIELD_Y1 = 900;
const FIELD_W = FIELD_X1 - FIELD_X0; // 560
const FIELD_H = FIELD_Y1 - FIELD_Y0; // 480
const FIELD_DIAG = Math.hypot(FIELD_W, FIELD_H);

const MAX_TURNS = 5;
const START_HP = 100;
const SELECT_TIME_S = 6;
const TRACE_TIME_S = 5;
const TELEGRAPH_TIME_S = 0.75;
const RESOLVE_TIME_S = 1.05;
const RESAMPLE_POINTS = 64;
const MIN_LENGTH_RATIO = 0.6;
const MAX_PARTICLES = 50;

const ENEMY_CYCLE = Object.freeze([
  {
    enemySpell: 'Expelliarmus',
    enemyTitle: 'Экспеллиармус (выбивание палочки)',
    counterSpell: 'Protego',
    hint: 'Защититесь щитом: выберите Protego!',
  },
  {
    enemySpell: 'Stupefy',
    enemyTitle: 'Ступефай (оглушающий луч)',
    counterSpell: 'Expelliarmus',
    hint: 'Перехватите инициативу: выберите Expelliarmus!',
  },
  {
    enemySpell: 'Petrificus',
    enemyTitle: 'Петрификус Тоталус (оцепенение)',
    counterSpell: 'Finite',
    hint: 'Снимите чары: выберите Finite!',
  },
]);

const SPELL_DEFS = Object.freeze({
  Protego: {
    id: 'Protego',
    label: 'Protego',
    subtitle: 'Магический щит (∧)',
    color: '#60a5fa',
    points: [
      [0.1, 0.8],
      [0.5, 0.1],
      [0.9, 0.8],
    ],
  },
  Expelliarmus: {
    id: 'Expelliarmus',
    label: 'Expelliarmus',
    subtitle: 'Обезоруживание (∨)',
    color: '#f87171',
    points: [
      [0.1, 0.2],
      [0.5, 0.8],
      [0.9, 0.2],
    ],
  },
  Finite: {
    id: 'Finite',
    label: 'Finite',
    subtitle: 'Снятие чар (⚡)',
    color: '#fbbf24',
    points: [
      [0.1, 0.5],
      [0.4, 0.2],
      [0.6, 0.8],
      [0.9, 0.5],
    ],
  },
});

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function normalizedToFieldPoints(normPoints) {
  return normPoints.map(([nx, ny]) => ({
    x: FIELD_X0 + nx * FIELD_W,
    y: FIELD_Y0 + ny * FIELD_H,
  }));
}

function polylineLength(pts) {
  let total = 0;
  for (let i = 1; i < pts.length; i += 1) {
    total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  return total;
}

/**
 * Resamples a polyline of {x, y} points into `n` equidistant points (n = 64).
 */
function resamplePolyline(pts, n = RESAMPLE_POINTS) {
  if (!pts || pts.length === 0) return [];
  if (pts.length === 1) {
    return Array.from({ length: n }, () => ({ x: pts[0].x, y: pts[0].y }));
  }
  const totalLen = polylineLength(pts);
  if (totalLen <= 1e-5) {
    return Array.from({ length: n }, () => ({ x: pts[0].x, y: pts[0].y }));
  }

  const step = totalLen / (n - 1);
  const result = [{ x: pts[0].x, y: pts[0].y }];
  let accum = 0;
  let prev = pts[0];
  let idx = 1;

  while (idx < pts.length && result.length < n) {
    const cur = pts[idx];
    const segLen = Math.hypot(cur.x - prev.x, cur.y - prev.y);
    if (accum + segLen >= step) {
      const remain = step - accum;
      const t = segLen > 1e-6 ? remain / segLen : 0;
      const nx = prev.x + (cur.x - prev.x) * t;
      const ny = prev.y + (cur.y - prev.y) * t;
      const nextPt = { x: nx, y: ny };
      result.push(nextPt);
      prev = nextPt;
      accum = 0;
    } else {
      accum += segLen;
      prev = cur;
      idx += 1;
    }
  }

  while (result.length < n) {
    result.push({ x: pts[pts.length - 1].x, y: pts[pts.length - 1].y });
  }
  return result;
}

function evaluateTraceGesture(gesturePts, targetNormPts) {
  const targetFieldPts = normalizedToFieldPoints(targetNormPts);
  const contourLen = polylineLength(targetFieldPts);
  const gestureLen = polylineLength(gesturePts);

  if (gesturePts.length < 2 || gestureLen < contourLen * MIN_LENGTH_RATIO) {
    return { valid: false, accuracy: 0, error: 1, gestureLen, contourLen };
  }

  const resampledTarget = resamplePolyline(targetFieldPts, RESAMPLE_POINTS);
  const resampledGesture = resamplePolyline(gesturePts, RESAMPLE_POINTS);

  let sumForward = 0;
  let sumReverse = 0;
  for (let i = 0; i < RESAMPLE_POINTS; i += 1) {
    const tPt = resampledTarget[i];
    const gPt = resampledGesture[i];
    const gRev = resampledGesture[RESAMPLE_POINTS - 1 - i];
    sumForward += Math.hypot(gPt.x - tPt.x, gPt.y - tPt.y);
    sumReverse += Math.hypot(gRev.x - tPt.x, gRev.y - tPt.y);
  }

  const meanDist = Math.min(sumForward, sumReverse) / RESAMPLE_POINTS;
  const error = meanDist / FIELD_DIAG;
  const accuracy = clamp(1 - error / 0.15, 0, 1);

  return { valid: true, accuracy, error, gestureLen, contourLen };
}

export async function run(container, params = {}) {
  const {
    signal = null,
    reducedMotion = false,
    debugAutoWin = false,
    forceStoryWin = false,
    round = 1,
  } = params;

  if (signal?.aborted) {
    throw new DOMException('Minigame aborted', 'AbortError');
  }

  const startWallTs = performance.now();

  // DebugAutoWin completes after first RAF (06_MINIGAMES.md L4)
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
            practiceFailed: false,
            playerHp: START_HP,
            enemyHp: 0,
            turns: 1,
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
      details: { reason: 'completed', practiceFailed: false, elapsedMs: 0 },
    };
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let state = 'telegraph'; // 'telegraph' | 'select' | 'trace' | 'resolve' | 'end'
    let rafId = null;
    let lastFrameTs = null;
    let activePointerId = null;
    let isTracing = false;

    let turn = 1;
    let playerHp = START_HP;
    let enemyHp = START_HP;
    let phaseElapsedS = 0;
    let selectedSpellId = null;
    let turnResolved = false;

    let tracePoints = [];
    let lastTurnSummary = '';
    let beamEffect = null; // { color, playerHit, enemyHit }
    const particles = [];

    const bgAsset = round === 2 || forceStoryWin ? 'bg_dueling_hall' : 'bg_corridor';

    // Load character portraits for the duel header/arena
    const azaliaImg = new Image();
    azaliaImg.decoding = 'async';
    azaliaImg.src = './assets/characters/azalia.webp';

    const malfoyImg = new Image();
    malfoyImg.decoding = 'async';
    malfoyImg.src = './assets/characters/malfoy.webp';

    // Build DOM in 896x1200 logical space
    const root = document.createElement('div');
    root.className = 'duel-game-root';
    root.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;overflow:hidden;touch-action:none;user-select:none;z-index:35;';

    const bgImg = document.createElement('img');
    bgImg.src = `./assets/backgrounds/${bgAsset}.webp`;
    bgImg.alt = 'Дуэльная арена';
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

    // Top bar: Enemy spell telegraph + HP bars + Turn counter (06_MINIGAMES.md L14)
    const topPanel = document.createElement('div');
    topPanel.style.cssText =
      'position:absolute;left:28px;right:28px;top:86px;z-index:6;background:rgba(10,16,30,0.92);border:1.5px solid rgba(216,180,103,0.85);border-radius:16px;padding:14px 18px;box-shadow:0 12px 30px rgba(0,0,0,0.65);display:flex;flex-direction:column;gap:10px;pointer-events:none;';

    const hpRow = document.createElement('div');
    hpRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:16px;';

    const playerHpCol = document.createElement('div');
    playerHpCol.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:4px;';
    const playerHpLabel = document.createElement('div');
    playerHpLabel.style.cssText = 'font-size:16px;font-weight:700;color:#93c5fd;';
    const playerHpTrack = document.createElement('div');
    playerHpTrack.style.cssText = 'height:10px;border-radius:999px;background:rgba(255,255,255,0.12);overflow:hidden;';
    const playerHpFill = document.createElement('div');
    playerHpFill.style.cssText = 'width:100%;height:100%;background:linear-gradient(90deg,#3b82f6,#60a5fa);transition:width 180ms ease;';
    playerHpTrack.appendChild(playerHpFill);
    playerHpCol.append(playerHpLabel, playerHpTrack);

    const turnBadge = document.createElement('div');
    turnBadge.style.cssText =
      'padding:6px 12px;border-radius:10px;background:rgba(255,255,255,0.08);font-size:16px;font-weight:700;color:#fde68a;white-space:nowrap;';

    const enemyHpCol = document.createElement('div');
    enemyHpCol.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:4px;text-align:right;';
    const enemyHpLabel = document.createElement('div');
    enemyHpLabel.style.cssText = 'font-size:16px;font-weight:700;color:#fca5a5;';
    const enemyHpTrack = document.createElement('div');
    enemyHpTrack.style.cssText = 'height:10px;border-radius:999px;background:rgba(255,255,255,0.12);overflow:hidden;';
    const enemyHpFill = document.createElement('div');
    enemyHpFill.style.cssText = 'width:100%;height:100%;background:linear-gradient(90deg,#ef4444,#f87171);transition:width 180ms ease;';
    enemyHpTrack.appendChild(enemyHpFill);
    enemyHpCol.append(enemyHpLabel, enemyHpTrack);

    hpRow.append(playerHpCol, turnBadge, enemyHpCol);

    const telegraphBar = document.createElement('div');
    telegraphBar.style.cssText =
      'display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 12px;border-radius:10px;background:rgba(255,255,255,0.05);';

    const spellAnnouncementEl = document.createElement('div');
    spellAnnouncementEl.style.cssText = 'font-size:17px;font-weight:700;color:#f8fafc;';

    const timerBadgeEl = document.createElement('div');
    timerBadgeEl.style.cssText = 'font-size:16px;font-weight:700;color:#fde68a;font-variant-numeric:tabular-nums;';

    telegraphBar.append(spellAnnouncementEl, timerBadgeEl);
    topPanel.append(hpRow, telegraphBar);

    // Right column: 3 counter-spell buttons (>= 56px hit zone, x: 660..868, y: 460..780)
    const spellBtnsCol = document.createElement('div');
    spellBtnsCol.style.cssText =
      'position:absolute;left:660px;top:450px;width:208px;z-index:7;display:flex;flex-direction:column;gap:16px;';

    const spellBtns = new Map();
    for (const key of ['Protego', 'Expelliarmus', 'Finite']) {
      const def = SPELL_DEFS[key];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ui-btn';
      btn.style.cssText =
        'min-height:78px;padding:10px 12px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:4px;text-align:left;border-width:2px;';

      const titleSpan = document.createElement('span');
      titleSpan.style.cssText = `font-size:18px;font-weight:700;color:${def.color};`;
      titleSpan.textContent = def.label;

      const subSpan = document.createElement('span');
      subSpan.style.cssText = 'font-size:14px;color:#cbd5e1;';
      subSpan.textContent = def.subtitle;

      btn.append(titleSpan, subSpan);
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectSpell(key);
      });
      spellBtns.set(key, btn);
      spellBtnsCol.appendChild(btn);
    }

    // Bottom debug/accessibility bar (>= 44x44px)
    const bottomBar = document.createElement('div');
    bottomBar.style.cssText =
      'position:absolute;left:28px;right:28px;bottom:36px;z-index:7;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;';

    const quickWinBtn = document.createElement('button');
    quickWinBtn.type = 'button';
    quickWinBtn.className = 'ui-btn ui-btn-compact';
    quickWinBtn.style.minHeight = '44px';
    quickWinBtn.textContent = 'Победа в дуэли (отладка)';

    const quickLoseBtn = document.createElement('button');
    quickLoseBtn.type = 'button';
    quickLoseBtn.className = 'ui-btn ui-btn-compact';
    quickLoseBtn.style.minHeight = '44px';
    quickLoseBtn.textContent = forceStoryWin
      ? 'HP 0 (проверка forced win Сц6)'
      : 'Поражение (ветка медпункта Сц4)';

    bottomBar.append(quickWinBtn, quickLoseBtn);

    root.append(bgImg, canvas, topPanel, spellBtnsCol, bottomBar);
    container.innerHTML = '';
    container.appendChild(root);

    function currentEnemyAttack() {
      return ENEMY_CYCLE[(turn - 1) % ENEMY_CYCLE.length];
    }

    function updateUiHeader() {
      playerHpLabel.textContent = `Азалия: ${playerHp} HP`;
      enemyHpLabel.textContent = `Малфой: ${enemyHp} HP`;
      playerHpFill.style.width = `${clamp(playerHp, 0, 100)}%`;
      enemyHpFill.style.width = `${clamp(enemyHp, 0, 100)}%`;
      turnBadge.textContent = `Ход ${turn} / ${MAX_TURNS}`;

      const attack = currentEnemyAttack();
      if (state === 'telegraph') {
        spellAnnouncementEl.textContent = `Малфой замахивается: ${attack.enemyTitle}!`;
        timerBadgeEl.textContent = 'Приготовьтесь…';
      } else if (state === 'select') {
        spellAnnouncementEl.textContent = `${attack.enemyTitle} — ${attack.hint}`;
        const rem = Math.max(0, SELECT_TIME_S - phaseElapsedS);
        timerBadgeEl.textContent = `Выбор: ${rem.toFixed(1)} с`;
      } else if (state === 'trace') {
        spellAnnouncementEl.textContent = `Обведите контур «${selectedSpellId}» по точкам 1 → 2 → 3!`;
        const rem = Math.max(0, TRACE_TIME_S - phaseElapsedS);
        timerBadgeEl.textContent = `Росчерк: ${rem.toFixed(1)} с`;
      } else if (state === 'resolve') {
        spellAnnouncementEl.textContent = lastTurnSummary;
        timerBadgeEl.textContent = '';
      }

      for (const [key, btn] of spellBtns) {
        const isTarget = state === 'select' && key === attack.counterSpell;
        btn.disabled = state !== 'select';
        btn.style.opacity = state === 'select' ? '1' : '0.55';
        btn.style.boxShadow = isTarget ? '0 0 16px rgba(250, 204, 21, 0.55)' : 'none';
      }
    }

    function spawnClashParticles(cx, cy, colorHex) {
      if (reducedMotion) return;
      for (let i = 0; i < 28; i += 1) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 150;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.55,
          maxLife: 0.55,
          color: colorHex,
          size: 2.5 + Math.random() * 3,
        });
      }
    }

    function applyTurnResolution({ damage, incomingDamage, summary, color = '#facc15' }) {
      if (turnResolved) return;
      turnResolved = true;
      state = 'resolve';
      phaseElapsedS = 0;
      isTracing = false;
      activePointerId = null;

      enemyHp = clamp(enemyHp - damage, 0, START_HP);
      playerHp = clamp(playerHp - incomingDamage, 0, START_HP);
      lastTurnSummary = summary;
      beamEffect = {
        color,
        playerHit: incomingDamage > 0,
        enemyHit: damage > 0,
      };
      spawnClashParticles(360, 340, color);
      updateUiHeader();
    }

    function onSelectSpell(spellKey) {
      if (state !== 'select' || turnResolved) return;
      selectedSpellId = spellKey;
      const attack = currentEnemyAttack();
      if (spellKey !== attack.counterSpell) {
        // Wrong spell choice: damage 0, incoming 30 (06_MINIGAMES.md L17)
        applyTurnResolution({
          damage: 0,
          incomingDamage: 30,
          summary: `Неверное контрзаклинание (${spellKey} вместо ${attack.counterSpell})! Азалия получает −30 HP.`,
          color: '#ef4444',
        });
        return;
      }

      // Correct spell selected -> enter 5s trace phase
      state = 'trace';
      phaseElapsedS = 0;
      tracePoints = [];
      updateUiHeader();
    }

    function toLogicalCoords(clientX, clientY) {
      const rect = root.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      return {
        x: ((clientX - rect.left) / w) * LOGICAL_W,
        y: ((clientY - rect.top) / h) * LOGICAL_H,
      };
    }

    const onPointerDown = (e) => {
      if (state !== 'trace' || turnResolved) return;
      if (e.target.closest('button')) return;
      const pt = toLogicalCoords(e.clientX, e.clientY);
      if (
        pt.x < FIELD_X0 - 30 ||
        pt.x > FIELD_X1 + 30 ||
        pt.y < FIELD_Y0 - 30 ||
        pt.y > FIELD_Y1 + 30
      ) {
        return;
      }
      activePointerId = e.pointerId;
      isTracing = true;
      tracePoints = [{ x: clamp(pt.x, FIELD_X0, FIELD_X1), y: clamp(pt.y, FIELD_Y0, FIELD_Y1) }];
      try {
        root.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerMove = (e) => {
      if (!isTracing || activePointerId === null || e.pointerId !== activePointerId) return;
      if (state !== 'trace' || turnResolved) return;
      const pt = toLogicalCoords(e.clientX, e.clientY);
      const clamped = {
        x: clamp(pt.x, FIELD_X0, FIELD_X1),
        y: clamp(pt.y, FIELD_Y0, FIELD_Y1),
      };
      const last = tracePoints[tracePoints.length - 1];
      if (!last || Math.hypot(clamped.x - last.x, clamped.y - last.y) >= 4) {
        tracePoints.push(clamped);
      }
    };

    const finishTraceGesture = (e) => {
      if (!isTracing || (e && e.pointerId !== undefined && e.pointerId !== activePointerId)) return;
      if (e?.pointerId !== undefined) {
        try {
          if (root.hasPointerCapture?.(e.pointerId)) {
            root.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
      }
      isTracing = false;
      activePointerId = null;

      if (state !== 'trace' || turnResolved) return;
      const def = SPELL_DEFS[selectedSpellId];
      if (!def) return;

      const evalRes = evaluateTraceGesture(tracePoints, def.points);
      if (!evalRes.valid) {
        // Reject single-point tap / short stroke (<60% contour length); let user redraw while timer remains
        spellAnnouncementEl.textContent =
          'Слишком короткий росчерк (нужно ≥60% длины контура)! Проведите линию целиком.';
        tracePoints = [];
        return;
      }

      const traceElapsedMs = phaseElapsedS * 1000;
      const accuracy = evalRes.accuracy;
      const speed = clamp(1 - traceElapsedMs / 5000, 0, 1);
      const damage = Math.round(20 + 20 * accuracy + 10 * speed);
      const incomingDamage = Math.round(15 * (1 - accuracy));

      applyTurnResolution({
        damage,
        incomingDamage,
        summary: `${def.label}! Точность ${Math.round(accuracy * 100)}% — Малфой −${damage} HP, ответный урон −${incomingDamage} HP.`,
        color: def.color,
      });
    };

    const cancelTraceGesture = (e) => {
      if (!isTracing || (e && e.pointerId !== undefined && e.pointerId !== activePointerId)) return;
      isTracing = false;
      activePointerId = null;
      tracePoints = [];
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', finishTraceGesture);
    root.addEventListener('pointercancel', cancelTraceGesture);
    root.addEventListener('lostpointercapture', cancelTraceGesture);

    const cleanup = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      signal?.removeEventListener?.('abort', onAbort);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', finishTraceGesture);
      root.removeEventListener('pointercancel', cancelTraceGesture);
      root.removeEventListener('lostpointercapture', cancelTraceGesture);
      if (root.parentNode === container) {
        container.removeChild(root);
      }
    };

    function finishDuel() {
      if (settled) return;
      settled = true;
      state = 'end';

      // 06_MINIGAMES.md L18: Scene 4 ok = enemyHp <= 0 or on turn 5 playerHp > enemyHp (tie is loss)
      const practiceWon = enemyHp <= 0 && playerHp > 0 ? true : playerHp > enemyHp && playerHp > 0;
      const rawScore = clamp(Math.round(50 + (playerHp - enemyHp) / 2), 0, 100);
      const elapsedMs = Math.round(performance.now() - startWallTs);

      // 06_MINIGAMES.md L19: Scene 6 (forceStoryWin) always returns ok: true, even at HP 0;
      // details.practiceFailed stores the actual practice outcome.
      const finalOk = forceStoryWin ? true : practiceWon;

      cleanup();
      resolve({
        ok: finalOk,
        score: rawScore,
        details: {
          reason: finalOk ? 'completed' : 'failed',
          practiceFailed: !practiceWon,
          playerHp,
          enemyHp,
          turns: turn,
          elapsedMs,
        },
      });
    }

    quickWinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      enemyHp = 0;
      playerHp = Math.max(1, playerHp);
      finishDuel();
    });

    quickLoseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playerHp = 0;
      enemyHp = Math.max(40, enemyHp);
      finishDuel();
    });

    const onVisibilityChange = () => {
      if (document.hidden) {
        lastFrameTs = null;
      } else {
        lastFrameTs = performance.now();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onAbort = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new DOMException('Minigame aborted', 'AbortError'));
    };
    signal?.addEventListener?.('abort', onAbort, { once: true });

    function stepSimulation(dt) {
      phaseElapsedS += dt;

      // Update clash particles
      if (!reducedMotion && particles.length > 0) {
        for (let i = particles.length - 1; i >= 0; i -= 1) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= dt;
          if (p.life <= 0) particles.splice(i, 1);
        }
      }

      if (state === 'telegraph') {
        if (phaseElapsedS >= TELEGRAPH_TIME_S) {
          state = 'select';
          phaseElapsedS = 0;
          turnResolved = false;
          selectedSpellId = null;
          tracePoints = [];
          beamEffect = null;
          updateUiHeader();
        }
      } else if (state === 'select') {
        updateUiHeader();
        if (phaseElapsedS >= SELECT_TIME_S) {
          applyTurnResolution({
            damage: 0,
            incomingDamage: 30,
            summary: 'Время на выбор заклинания вышло! Азалия получает −30 HP.',
            color: '#ef4444',
          });
        }
      } else if (state === 'trace') {
        updateUiHeader();
        if (phaseElapsedS >= TRACE_TIME_S) {
          applyTurnResolution({
            damage: 0,
            incomingDamage: 30,
            summary: 'Время на росчерк заклинания вышло! Азалия получает −30 HP.',
            color: '#ef4444',
          });
        }
      } else if (state === 'resolve') {
        if (phaseElapsedS >= RESOLVE_TIME_S) {
          if (enemyHp <= 0 || playerHp <= 0 || turn >= MAX_TURNS) {
            finishDuel();
            return;
          }
          turn += 1;
          state = 'telegraph';
          phaseElapsedS = 0;
          turnResolved = false;
          selectedSpellId = null;
          tracePoints = [];
          beamEffect = null;
          updateUiHeader();
        }
      }
    }

    function renderScene() {
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      // 1. Draw duelist medallions in upper arena (y: 230..400)
      const drawDuelist = (img, cx, cy, borderColor, isHit) => {
        ctx.save();
        const shakeX = isHit && !reducedMotion ? Math.sin(performance.now() / 35) * 6 : 0;
        ctx.translate(cx + shakeX, cy);

        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, 56, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.clip();
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, -64, -58, 128, 192);
        }
        ctx.restore();

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, 0, 56, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      };

      drawDuelist(azaliaImg, 185, 325, '#60a5fa', Boolean(beamEffect?.playerHit));
      drawDuelist(malfoyImg, 535, 325, '#f87171', Boolean(beamEffect?.enemyHit));

      // Spell beam between duelists during resolve
      if (state === 'resolve' && beamEffect) {
        ctx.save();
        ctx.strokeStyle = beamEffect.color;
        ctx.shadowColor = beamEffect.color;
        ctx.shadowBlur = 18;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(245, 325);
        ctx.lineTo(475, 325);
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw trace field box (x: 80..640, y: 420..900)
      ctx.save();
      ctx.fillStyle = 'rgba(10, 16, 30, 0.82)';
      ctx.strokeStyle = state === 'trace' ? '#facc15' : 'rgba(216, 180, 103, 0.55)';
      ctx.lineWidth = state === 'trace' ? 3 : 2;
      ctx.beginPath();
      ctx.roundRect(FIELD_X0, FIELD_Y0, FIELD_W, FIELD_H, 16);
      ctx.fill();
      ctx.stroke();

      // Guide contour inside trace field
      const attack = currentEnemyAttack();
      const activeSpellKey = selectedSpellId || attack.counterSpell;
      const spellDef = SPELL_DEFS[activeSpellKey];

      if (spellDef) {
        const fieldPts = normalizedToFieldPoints(spellDef.points);

        // Dashed target contour
        ctx.save();
        ctx.strokeStyle = state === 'trace' ? spellDef.color : 'rgba(148, 163, 184, 0.45)';
        ctx.lineWidth = state === 'trace' ? 8 : 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash(state === 'trace' ? [] : [10, 10]);
        ctx.globalAlpha = state === 'trace' ? 0.55 : 0.35;
        ctx.beginPath();
        fieldPts.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.restore();

        // Numbered vertex checkpoints (1, 2, 3...)
        fieldPts.forEach((p, idx) => {
          ctx.save();
          ctx.fillStyle = state === 'trace' ? spellDef.color : '#475569';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#0f172a';
          ctx.font = '700 15px Georgia, serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(idx + 1), p.x, p.y);
          ctx.restore();
        });
      }

      // Player's active trace line
      if (tracePoints.length > 1) {
        ctx.save();
        ctx.strokeStyle = '#fef08a';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 14;
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        tracePoints.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.restore();
      }

      // Field footer caption
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 15px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        state === 'select'
          ? 'Шаг 1: выберите контрзаклинание справа →'
          : state === 'trace'
          ? 'Шаг 2: проведите линию по контуру от точки 1 до конца'
          : lastTurnSummary || 'Приготовьте палочку…',
        FIELD_X0 + FIELD_W / 2,
        FIELD_Y1 - 18
      );
      ctx.restore();

      // 3. Draw clash particles (<= 50)
      if (!reducedMotion && particles.length > 0) {
        for (const p of particles) {
          const alpha = clamp(p.life / p.maxLife, 0, 1);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    updateUiHeader();
    lastFrameTs = performance.now();

    const tick = (now) => {
      if (settled) return;
      if (!document.hidden) {
        if (lastFrameTs === null) lastFrameTs = now;
        const dt = clamp((now - lastFrameTs) / 1000, 0, 0.05);
        lastFrameTs = now;
        if (dt > 0) {
          stepSimulation(dt);
        }
      }
      if (!settled) {
        renderScene();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    renderScene();
    rafId = window.requestAnimationFrame(tick);
  });
}

export default { run };

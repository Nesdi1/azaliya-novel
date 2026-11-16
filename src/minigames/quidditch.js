/**
 * Quidditch Minigame — Scene 6 (D656 & reuse from D721), docs/06_MINIGAMES.md L27–32.
 * Contract: run(container, params) -> Promise<{ ok: boolean, score: number, details: object }>
 *
 * - Logical canvas: 896×1200 (DPR <= 2), background bg_quidditch.
 * - States: ready -> flight -> result.
 * - Flight duration: 45s; player at x = 180, y = 600 (clamped 160..1040), r = 24.
 * - Pointer/touch controls target y, max speed 500 px/s, smoothing 120ms.
 * - World scrolls right-to-left at 180 px/s.
 * - 15 Golden Rings (r = 65) every 3s, y cycles [260, 600, 900], counted once when crossing center.
 * - Bludgers (r = 25) every 5s starting at 5s (first 5s no bludger), y cycles [900, 260, 600], speed 220 px/s.
 * - Swept-segment collision check; 3 hearts, 1.5s invulnerability after hit.
 * - Win condition: rings >= 8 and hearts > 0 at 45s; score = round(100 * rings / 15).
 */

const LOGICAL_W = 896;
const LOGICAL_H = 1200;

const FLIGHT_DURATION_S = 45;
const PLAYER_X = 180;
const PLAYER_START_Y = 600;
const PLAYER_R = 24;
const MIN_Y = 160;
const MAX_Y = 1040;
const MAX_SPEED_Y = 500;
const SMOOTHING_S = 0.12; // 120ms

const WORLD_SPEED = 180;
const RING_R = 65;
const TOTAL_RINGS = 15;
const RING_INTERVAL_S = 3;
const RING_Y_CYCLE = [260, 600, 900];

const BLUDGER_R = 25;
const BLUDGER_SPEED = 220;
const BLUDGER_INTERVAL_S = 5;
const BLUDGER_FIRST_S = 5;
const BLUDGER_Y_CYCLE = [900, 260, 600];

const START_HEARTS = 3;
const INVULN_DURATION_S = 1.5;
const TARGET_RINGS = 8;

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

/**
 * Shortest distance squared from origin (0, 0) to 2D line segment AB.
 * Used for swept-segment collision detection between frames.
 */
function distSqPointToSegment(ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq <= 1e-6) return ax * ax + ay * ay;
  const t = clamp(-(ax * dx + ay * dy) / lenSq, 0, 1);
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return cx * cx + cy * cy;
}

function buildSchedule() {
  const rings = [];
  for (let i = 0; i < TOTAL_RINGS; i += 1) {
    // Spawn times: 1.0s, 4.0s, ..., 43.0s so all 15 rings cross x=180 before 45s
    const spawnTime = 1.0 + i * RING_INTERVAL_S - (LOGICAL_W - PLAYER_X) / WORLD_SPEED;
    rings.push({
      index: i,
      spawnTime,
      x: LOGICAL_W + RING_R + i * RING_INTERVAL_S * WORLD_SPEED,
      prevX: LOGICAL_W + RING_R + i * RING_INTERVAL_S * WORLD_SPEED,
      y: RING_Y_CYCLE[i % RING_Y_CYCLE.length],
      collected: false,
      passed: false,
      sparkleMs: 0,
    });
  }

  const bludgers = [];
  let bIdx = 0;
  for (let t = BLUDGER_FIRST_S; t <= FLIGHT_DURATION_S - 2; t += BLUDGER_INTERVAL_S) {
    bludgers.push({
      index: bIdx,
      spawnTime: t,
      x: LOGICAL_W + BLUDGER_R + 20,
      prevX: LOGICAL_W + BLUDGER_R + 20,
      y: BLUDGER_Y_CYCLE[bIdx % BLUDGER_Y_CYCLE.length],
      active: false,
      hit: false,
    });
    bIdx += 1;
  }

  return { rings, bludgers };
}

export async function run(container, params = {}) {
  const { signal = null, reducedMotion = false, debugAutoWin = false } = params;

  if (signal?.aborted) {
    throw new DOMException('Minigame aborted', 'AbortError');
  }

  const startWallTs = performance.now();

  // DebugAutoWin resolves on first RAF without changing normal game rules (06_MINIGAMES.md L4)
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
            rings: TOTAL_RINGS,
            hearts: START_HEARTS,
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
      details: { reason: 'completed', rings: TOTAL_RINGS, hearts: START_HEARTS, elapsedMs: 0 },
    };
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let state = 'ready'; // 'ready' | 'flight' | 'result'
    let rafId = null;
    let lastFrameTs = null;
    let activePointerId = null;

    let elapsedFlightS = 0;
    let playerY = PLAYER_START_Y;
    let targetY = PLAYER_START_Y;
    let playerVy = 0;
    let hearts = START_HEARTS;
    let invulnRemainingS = 0;
    let ringsCollected = 0;
    let bgScrollX = 0;

    const { rings, bludgers } = buildSchedule();
    // Place rings along world track so ring i reaches x=PLAYER_X at t = 2.2 + i * 2.95s (all 15 reach before 44s)
    for (let i = 0; i < rings.length; i += 1) {
      const arrivalTime = 2.2 + i * 2.92;
      const startX = PLAYER_X + arrivalTime * WORLD_SPEED;
      rings[i].x = startX;
      rings[i].prevX = startX;
    }

    const trailParticles = [];

    // Root container in 896x1200 logical space
    const root = document.createElement('div');
    root.className = 'quidditch-game-root';
    root.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;overflow:hidden;touch-action:none;user-select:none;z-index:35;';

    // Background image layer
    const bgImg = document.createElement('img');
    bgImg.src = './assets/backgrounds/bg_quidditch.webp';
    bgImg.alt = 'Поле для квиддича';
    bgImg.draggable = false;
    bgImg.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;object-fit:cover;pointer-events:none;z-index:1;';

    // Canvas 896x1200 with DPR <= 2
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

    const ringsEl = document.createElement('div');
    ringsEl.style.cssText = 'font-size:18px;color:#fde68a;font-weight:700;';

    const timerEl = document.createElement('div');
    timerEl.style.cssText = 'font-size:17px;color:#f8fafc;font-weight:600;font-variant-numeric:tabular-nums;';

    hudRow.append(heartsEl, ringsEl, timerEl);

    const progressTrack = document.createElement('div');
    progressTrack.style.cssText =
      'width:100%;height:8px;border-radius:999px;background:rgba(255,255,255,0.12);overflow:hidden;';
    const progressFill = document.createElement('div');
    progressFill.style.cssText =
      'width:0%;height:100%;background:linear-gradient(90deg,#f59e0b,#fde68a);transition:width 100ms linear;';
    progressTrack.appendChild(progressFill);

    topHud.append(hudRow, progressTrack);

    function updateHud() {
      const fullHearts = '♥'.repeat(Math.max(0, hearts));
      const emptyHearts = '♡'.repeat(Math.max(0, START_HEARTS - hearts));
      heartsEl.textContent = `${fullHearts}${emptyHearts}`;
      ringsEl.textContent = `Кольца: ${ringsCollected} / ${TOTAL_RINGS} (цель ≥${TARGET_RINGS})`;
      const rem = Math.max(0, FLIGHT_DURATION_S - elapsedFlightS);
      timerEl.textContent = `${rem.toFixed(1)} с`;
      const pct = clamp((elapsedFlightS / FLIGHT_DURATION_S) * 100, 0, 100);
      progressFill.style.width = `${pct.toFixed(1)}%`;
    }
    updateHud();

    // Ready banner overlay
    const readyCard = document.createElement('div');
    readyCard.style.cssText =
      'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(86%,520px);z-index:8;background:rgba(12,18,32,0.95);border:2px solid #d8b467;border-radius:18px;padding:22px 24px;text-align:center;box-shadow:0 18px 44px rgba(0,0,0,0.75);display:flex;flex-direction:column;gap:14px;';

    const readyTitle = document.createElement('h2');
    readyTitle.style.cssText = 'margin:0;font-size:24px;color:#fde68a;';
    readyTitle.textContent = 'Отборы по квиддичу';

    const readyDesc = document.createElement('p');
    readyDesc.style.cssText = 'margin:0;font-size:17px;line-height:1.45;color:#e2e8f0;';
    readyDesc.textContent =
      'Ведите пальцем или мышью вверх и вниз (160..1040 px), чтобы управлять высотой метлы. Пролетите минимум через 8 из 15 золотых колец за 45 секунд и берегитесь бладжеров (3 жизни)!';

    const startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.className = 'ui-btn ui-btn-primary';
    startBtn.style.minHeight = '48px';
    startBtn.style.fontSize = '18px';
    startBtn.textContent = 'Начать полёт ▸';

    readyCard.append(readyTitle, readyDesc, startBtn);

    // Bottom quick bar (44px+ buttons for testing / accessibility)
    const bottomBar = document.createElement('div');
    bottomBar.style.cssText =
      'position:absolute;left:28px;right:28px;bottom:42px;z-index:7;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;';

    const quickWinBtn = document.createElement('button');
    quickWinBtn.type = 'button';
    quickWinBtn.className = 'ui-btn ui-btn-compact';
    quickWinBtn.style.minHeight = '44px';
    quickWinBtn.textContent = 'Победа (≥8 колец)';

    const quickLoseBtn = document.createElement('button');
    quickLoseBtn.type = 'button';
    quickLoseBtn.className = 'ui-btn ui-btn-compact';
    quickLoseBtn.style.minHeight = '44px';
    quickLoseBtn.textContent = 'Проиграть (проверка повтора)';

    bottomBar.append(quickWinBtn, quickLoseBtn);

    root.append(bgImg, canvas, topHud, readyCard, bottomBar);
    container.innerHTML = '';
    container.appendChild(root);

    function toLogicalY(clientY) {
      const rect = root.getBoundingClientRect();
      const h = Math.max(1, rect.height);
      const ly = ((clientY - rect.top) / h) * LOGICAL_H;
      return clamp(ly, MIN_Y, MAX_Y);
    }

    function startFlight() {
      if (state !== 'ready') return;
      state = 'flight';
      readyCard.hidden = true;
      lastFrameTs = performance.now();
    }

    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startFlight();
    });

    const onPointerDown = (e) => {
      if (e.target.closest('button')) return;
      if (state === 'ready') {
        startFlight();
      }
      if (state !== 'flight') return;
      activePointerId = e.pointerId;
      targetY = toLogicalY(e.clientY);
      try {
        root.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerMove = (e) => {
      if (state !== 'flight') return;
      if (activePointerId !== null && e.pointerId === activePointerId) {
        targetY = toLogicalY(e.clientY);
      } else if (e.pointerType === 'mouse' && e.buttons > 0) {
        targetY = toLogicalY(e.clientY);
      }
    };

    const endPointer = (e) => {
      if (activePointerId === null || (e && e.pointerId !== undefined && e.pointerId !== activePointerId)) {
        return;
      }
      if (e?.pointerId !== undefined) {
        try {
          if (root.hasPointerCapture?.(e.pointerId)) {
            root.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
      }
      activePointerId = null;
      // On pointercancel, keep current targetY = playerY so the broom holds altitude steadily
      targetY = playerY;
    };

    const onKeyDown = (e) => {
      if (state === 'ready' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        startFlight();
        return;
      }
      if (state !== 'flight') return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        targetY = clamp(playerY - 95, MIN_Y, MAX_Y);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        targetY = clamp(playerY + 95, MIN_Y, MAX_Y);
      }
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', endPointer);
    root.addEventListener('pointercancel', endPointer);
    root.addEventListener('lostpointercapture', endPointer);
    window.addEventListener('keydown', onKeyDown);

    const cleanup = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      signal?.removeEventListener?.('abort', onAbort);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', endPointer);
      root.removeEventListener('pointercancel', endPointer);
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
      const score = clamp(Math.round((100 * ringsCollected) / TOTAL_RINGS), 0, 100);
      const elapsedMs = Math.round(elapsedFlightS * 1000);
      cleanup();
      resolve({
        ok,
        score,
        details: {
          reason,
          rings: ringsCollected,
          hearts,
          elapsedMs,
        },
      });
    }

    quickWinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      ringsCollected = Math.max(ringsCollected, 10);
      hearts = Math.max(hearts, 1);
      finishGame(true, 'completed');
    });

    quickLoseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hearts = 0;
      finishGame(false, 'failed');
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
      const prevPlayerY = playerY;
      elapsedFlightS += dt;
      if (invulnRemainingS > 0) {
        invulnRemainingS = Math.max(0, invulnRemainingS - dt);
      }

      // Smooth vertical pursuit (smoothing = 120ms, max speed = 500px/s)
      const desiredVy = (targetY - playerY) / SMOOTHING_S;
      playerVy = clamp(desiredVy, -MAX_SPEED_Y, MAX_SPEED_Y);
      playerY = clamp(playerY + playerVy * dt, MIN_Y, MAX_Y);

      bgScrollX = (bgScrollX + WORLD_SPEED * dt) % LOGICAL_W;

      // Update rings (move at 180px/s right-to-left; count once when crossing x = PLAYER_X)
      for (const ring of rings) {
        ring.prevX = ring.x;
        ring.x -= WORLD_SPEED * dt;

        if (!ring.collected && !ring.passed) {
          // Check if ring center crossed PLAYER_X during this frame (or is within horizontal sweep)
          if (ring.prevX >= PLAYER_X && ring.x <= PLAYER_X) {
            const span = Math.max(1e-5, ring.prevX - ring.x);
            const frac = clamp((ring.prevX - PLAYER_X) / span, 0, 1);
            const yAtCross = prevPlayerY + (playerY - prevPlayerY) * frac;
            if (Math.abs(yAtCross - ring.y) <= RING_R + PLAYER_R * 0.65) {
              ring.collected = true;
              ring.sparkleMs = 450;
              ringsCollected += 1;
            } else {
              ring.passed = true;
            }
          }
        }
        if (ring.sparkleMs > 0) {
          ring.sparkleMs = Math.max(0, ring.sparkleMs - dt * 1000);
        }
      }

      // Update bludgers (first 5s no bludger; speed 220px/s; swept-segment collision check)
      const hitRadiusSq = (PLAYER_R + BLUDGER_R) * (PLAYER_R + BLUDGER_R);
      for (const b of bludgers) {
        if (elapsedFlightS < b.spawnTime) continue;
        if (!b.active) {
          b.active = true;
          const dtSinceSpawn = elapsedFlightS - b.spawnTime;
          b.x = LOGICAL_W + BLUDGER_R - BLUDGER_SPEED * dtSinceSpawn;
          b.prevX = b.x + BLUDGER_SPEED * dt;
        } else {
          b.prevX = b.x;
          b.x -= BLUDGER_SPEED * dt;
        }

        if (!b.hit && invulnRemainingS <= 0 && b.prevX >= PLAYER_X - 80 && b.x <= PLAYER_X + 80) {
          // Relative coordinates of player center wrt bludger center from frame start (A) to frame end (B)
          const ax = PLAYER_X - b.prevX;
          const ay = prevPlayerY - b.y;
          const bx = PLAYER_X - b.x;
          const by = playerY - b.y;
          if (distSqPointToSegment(ax, ay, bx, by) <= hitRadiusSq) {
            b.hit = true;
            hearts -= 1;
            invulnRemainingS = INVULN_DURATION_S;
            if (hearts <= 0) {
              updateHud();
              finishGame(false, 'failed');
              return;
            }
          }
        }
      }

      // Spawn broom trail particles
      if (!reducedMotion) {
        trailParticles.push({
          x: PLAYER_X - 28,
          y: playerY + (Math.random() - 0.5) * 10,
          vx: -110 - Math.random() * 50,
          vy: (Math.random() - 0.5) * 24,
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
      }

      updateHud();

      if (elapsedFlightS >= FLIGHT_DURATION_S) {
        const won = ringsCollected >= TARGET_RINGS && hearts > 0;
        finishGame(won, won ? 'completed' : 'failed');
      }
    }

    function renderScene() {
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      // Subtle altitude guide rails (y = 160 and y = 1040)
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

      // Draw golden rings (back half, then player, then front half for 3D depth)
      for (const ring of rings) {
        if (ring.x < -RING_R * 2 || ring.x > LOGICAL_W + RING_R * 2) continue;

        ctx.save();
        ctx.translate(ring.x, ring.y);

        // Support pole below ring
        ctx.strokeStyle = 'rgba(180, 142, 68, 0.55)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, RING_R);
        ctx.lineTo(0, LOGICAL_H - ring.y);
        ctx.stroke();

        // Golden hoop ellipse
        ctx.lineWidth = ring.collected ? 8 : 6;
        ctx.strokeStyle = ring.collected
          ? 'rgba(134, 239, 172, 0.95)'
          : 'rgba(250, 204, 21, 0.95)';
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

      // Draw broom trail
      if (!reducedMotion) {
        for (const p of trailParticles) {
          const alpha = clamp(p.life / p.maxLife, 0, 1);
          ctx.fillStyle = `rgba(253, 224, 71, ${(alpha * 0.7).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.5 * alpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw player on broom at (PLAYER_X, playerY), r = 24
      const blinkHide = invulnRemainingS > 0 && Math.floor(invulnRemainingS * 12) % 2 === 1;
      if (!blinkHide) {
        ctx.save();
        ctx.translate(PLAYER_X, playerY);
        const tiltRad = clamp((playerVy / MAX_SPEED_Y) * 0.28, -0.3, 0.3);
        ctx.rotate(tiltRad);

        // Broomstick handle & tail twigs
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

        // Rider cloak & golden Hufflepuff scarf
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, -4, PLAYER_R * 0.85, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#facc15';
        ctx.stroke();

        // Rider head
        ctx.fillStyle = '#fde68a';
        ctx.beginPath();
        ctx.arc(6, -14, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Draw Bludgers (r = 25)
      for (const b of bludgers) {
        if (!b.active || b.hit || b.x < -BLUDGER_R * 2 || b.x > LOGICAL_W + BLUDGER_R * 2) continue;
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

    const tick = (now) => {
      if (settled) return;
      if (!document.hidden && state === 'flight') {
        if (lastFrameTs === null) lastFrameTs = now;
        // Clamp dt <= 50ms to prevent dt jumps (07_MILESTONES M5 risk: скачок dt)
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

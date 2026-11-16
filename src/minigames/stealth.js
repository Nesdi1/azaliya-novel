/**
 * Stealth Minigame — Scene 5 (D570), docs/06_MINIGAMES.md L21–26.
 * Contract: run(container, params) -> Promise<{ ok: boolean, score: number, details: object }>
 *
 * - Logical map: 896×1200 (DPR <= 2), background bg_corridor_night.
 * - Player circle r = 18 starting at (448, 1100); exit at (448, 80); speed = 140 px/s.
 * - Drag sets movement target, releasing stops immediately (including pointercancel).
 * - Walls at x: 0..80 and x: 816..896.
 * - Hiding alcoves (rectangles): (80, 760, 130, 150) and (686, 360, 130, 150).
 *   Inside an alcove the player is invisible to guards and updates their respawn checkpoint;
 *   vision cones are clipped so they never shine through the alcoves.
 * - Two guards:
 *   1) Snape at (310, 730), cone length 260, angle 55°, swings ±55° over 4s (existing snape.webp sprite).
 *   2) Prefect at (590, 330), cone length 260, angle 55°, swings ±55° over 5s (Canvas silhouette).
 * - Exposure outside alcove >= 0.6s costs 1 heart (start 5 hearts), respawns at last safe checkpoint
 *   with 1.5s invulnerability. Tab minimize (visibilitychange) never costs a heart.
 * - Score = 20 * remainingHearts. 0 hearts -> ok: false -> D571–575 -> UI retry/skip.
 */

const LOGICAL_W = 896;
const LOGICAL_H = 1200;

const WALL_LEFT_X = 80;
const WALL_RIGHT_X = 816;

const START_POS = Object.freeze({ x: 448, y: 1100 });
const EXIT_POS = Object.freeze({ x: 448, y: 80, r: 42 });
const PLAYER_R = 18;
const PLAYER_SPEED = 140; // px/s

const ALCOVES = Object.freeze([
  { id: 'alcove_1', x: 80, y: 760, w: 130, h: 150, label: 'Укрытие I' },
  { id: 'alcove_2', x: 686, y: 360, w: 130, h: 150, label: 'Укрытие II' },
]);

const GUARDS = Object.freeze([
  {
    id: 'snape',
    name: 'Снейп',
    x: 310,
    y: 730,
    coneLen: 260,
    coneAngleDeg: 55,
    baseAngleDeg: 35, // Sweeps across lower-middle corridor (-20° .. +90°)
    swingDeg: 55,
    halfPeriodS: 4,
  },
  {
    id: 'prefect',
    name: 'Староста',
    x: 590,
    y: 330,
    coneLen: 260,
    coneAngleDeg: 55,
    baseAngleDeg: 145, // Sweeps across upper-middle corridor (+90° .. +200°)
    swingDeg: 55,
    halfPeriodS: 5,
  },
]);

const START_HEARTS = 5;
const EXPOSURE_LIMIT_S = 0.6;
const INVULN_DURATION_S = 1.5;

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function normalizeAngleRad(a) {
  let r = a % (Math.PI * 2);
  if (r > Math.PI) r -= Math.PI * 2;
  if (r < -Math.PI) r += Math.PI * 2;
  return r;
}

function findContainingAlcove(px, py) {
  for (const alc of ALCOVES) {
    if (px >= alc.x && px <= alc.x + alc.w && py >= alc.y && py <= alc.y + alc.h) {
      return alc;
    }
  }
  return null;
}

function guardFacingRad(guard, elapsedS) {
  // Smooth sinusoidal swing between -swingDeg and +swingDeg with half-period = halfPeriodS
  const phase = (elapsedS / guard.halfPeriodS) * Math.PI;
  const offsetDeg = Math.sin(phase) * guard.swingDeg;
  return degToRad(guard.baseAngleDeg + offsetDeg);
}

function isPointInGuardCone(px, py, guard, facingRad) {
  const dx = px - guard.x;
  const dy = py - guard.y;
  const dist = Math.hypot(dx, dy);
  if (dist > guard.coneLen + PLAYER_R * 0.6) return false;
  if (dist < 18) return true;
  const angleToPlayer = Math.atan2(dy, dx);
  const diff = Math.abs(normalizeAngleRad(angleToPlayer - facingRad));
  const halfConeRad = degToRad(guard.coneAngleDeg / 2);
  return diff <= halfConeRad;
}

export async function run(container, params = {}) {
  const { signal = null, reducedMotion = false, debugAutoWin = false } = params;

  if (signal?.aborted) {
    throw new DOMException('Minigame aborted', 'AbortError');
  }

  const startWallTs = performance.now();

  // DebugAutoWin resolves after the first RAF (06_MINIGAMES.md L4)
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
      details: { reason: 'completed', hearts: START_HEARTS, elapsedMs: 0 },
    };
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let state = 'ready'; // 'ready' | 'moving' | 'hidden' | 'caught' | 'respawn' | 'won' | 'lost'
    let rafId = null;
    let lastFrameTs = null;
    let activePointerId = null;
    let isDragging = false;

    let elapsedS = 0;
    let playerX = START_POS.x;
    let playerY = START_POS.y;
    let targetX = START_POS.x;
    let targetY = START_POS.y;

    let lastCheckpoint = { x: START_POS.x, y: START_POS.y };
    let hearts = START_HEARTS;
    let exposureS = 0;
    let invulnRemainingS = 0;
    let caughtFlashS = 0;

    const heldKeys = new Set();

    // Load Snape sprite image for Canvas medallion
    const snapeImg = new Image();
    snapeImg.decoding = 'async';
    snapeImg.src = './assets/characters/snape.webp';

    // Build DOM in 896x1200 logical space
    const root = document.createElement('div');
    root.className = 'stealth-game-root';
    root.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;overflow:hidden;touch-action:none;user-select:none;z-index:35;';

    const bgImg = document.createElement('img');
    bgImg.src = './assets/backgrounds/bg_corridor_night.webp';
    bgImg.alt = 'Ночной коридор Хогвартса';
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
      'position:absolute;left:28px;right:28px;top:92px;z-index:6;display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(10,16,30,0.9);border:1.5px solid rgba(216,180,103,0.82);border-radius:14px;padding:10px 16px;box-shadow:0 10px 26px rgba(0,0,0,0.6);pointer-events:none;';

    const heartsEl = document.createElement('div');
    heartsEl.style.cssText = 'font-size:21px;color:#f87171;letter-spacing:3px;font-weight:700;';

    const statusBadge = document.createElement('div');
    statusBadge.style.cssText = 'font-size:16px;color:#fde68a;font-weight:600;text-align:right;';

    topHud.append(heartsEl, statusBadge);

    function updateHud() {
      const full = '♥'.repeat(Math.max(0, hearts));
      const empty = '♡'.repeat(Math.max(0, START_HEARTS - hearts));
      heartsEl.textContent = `${full}${empty}`;
      if (state === 'hidden') {
        statusBadge.textContent = 'В укрытии (невидима)';
        statusBadge.style.color = '#86efac';
      } else if (exposureS > 0.05) {
        statusBadge.textContent = `Внимание! Спрячьтесь (${Math.round((exposureS / EXPOSURE_LIMIT_S) * 100)}%)`;
        statusBadge.style.color = '#fca5a5';
      } else {
        statusBadge.textContent = 'Доберитесь до выхода наверху ↑';
        statusBadge.style.color = '#fde68a';
      }
    }
    updateHud();

    // Ready card
    const readyCard = document.createElement('div');
    readyCard.style.cssText =
      'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(86%,520px);z-index:8;background:rgba(12,18,32,0.95);border:2px solid #d8b467;border-radius:18px;padding:22px 24px;text-align:center;box-shadow:0 18px 44px rgba(0,0,0,0.75);display:flex;flex-direction:column;gap:14px;';

    const readyTitle = document.createElement('h2');
    readyTitle.style.cssText = 'margin:0;font-size:24px;color:#fde68a;';
    readyTitle.textContent = 'Ночная вылазка к фонтану';

    const readyDesc = document.createElement('p');
    readyDesc.style.cssText = 'margin:0;font-size:17px;line-height:1.45;color:#e2e8f0;';
    readyDesc.textContent =
      'Удерживайте палец или кнопку мыши, чтобы вести Азалию к выходу наверху (отпускание останавливает шаг). Прячьтесь в боковых нишах-укрытиях от фонарей Снейпа и старосты. У вас 5 попыток!';

    const startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.className = 'ui-btn ui-btn-primary';
    startBtn.style.minHeight = '48px';
    startBtn.style.fontSize = '18px';
    startBtn.textContent = 'Идти на цыпочках ▸';

    readyCard.append(readyTitle, readyDesc, startBtn);

    // Bottom quick debug/accessibility buttons (>= 44x44px)
    const bottomBar = document.createElement('div');
    bottomBar.style.cssText =
      'position:absolute;left:28px;right:28px;bottom:34px;z-index:7;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;';

    const loseOneBtn = document.createElement('button');
    loseOneBtn.type = 'button';
    loseOneBtn.className = 'ui-btn ui-btn-compact';
    loseOneBtn.style.minHeight = '44px';
    loseOneBtn.textContent = '−1 ♥ (чекпоинт)';

    const loseAllBtn = document.createElement('button');
    loseAllBtn.type = 'button';
    loseAllBtn.className = 'ui-btn ui-btn-compact';
    loseAllBtn.style.minHeight = '44px';
    loseAllBtn.textContent = '0 ♥ (ветка D571–575)';

    const quickWinBtn = document.createElement('button');
    quickWinBtn.type = 'button';
    quickWinBtn.className = 'ui-btn ui-btn-compact';
    quickWinBtn.style.minHeight = '44px';
    quickWinBtn.textContent = 'К выходу (победа)';

    bottomBar.append(loseOneBtn, loseAllBtn, quickWinBtn);

    root.append(bgImg, canvas, topHud, readyCard, bottomBar);
    container.innerHTML = '';
    container.appendChild(root);

    function toLogicalCoords(clientX, clientY) {
      const rect = root.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      return {
        x: clamp(((clientX - rect.left) / w) * LOGICAL_W, WALL_LEFT_X + PLAYER_R, WALL_RIGHT_X - PLAYER_R),
        y: clamp(((clientY - rect.top) / h) * LOGICAL_H, 60, 1140),
      };
    }

    function beginStealth() {
      if (state !== 'ready') return;
      state = 'moving';
      readyCard.hidden = true;
      lastFrameTs = performance.now();
    }

    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      beginStealth();
    });

    const onPointerDown = (e) => {
      if (e.target.closest('button')) return;
      if (state === 'ready') beginStealth();
      if (state === 'won' || state === 'lost') return;
      activePointerId = e.pointerId;
      isDragging = true;
      const pt = toLogicalCoords(e.clientX, e.clientY);
      targetX = pt.x;
      targetY = pt.y;
      try {
        root.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerMove = (e) => {
      if (!isDragging || activePointerId === null || e.pointerId !== activePointerId) return;
      const pt = toLogicalCoords(e.clientX, e.clientY);
      targetX = pt.x;
      targetY = pt.y;
    };

    // Releasing stops movement immediately (06_MINIGAMES.md L22: Drag задаёт цель, отпускание останавливает)
    const stopDrag = (e) => {
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
      isDragging = false;
      targetX = playerX;
      targetY = playerY;
    };

    const onKeyDown = (e) => {
      if (state === 'ready' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        beginStealth();
        return;
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        if (state === 'ready') beginStealth();
        heldKeys.add(e.key.toLowerCase());
      }
    };

    const onKeyUp = (e) => {
      heldKeys.delete(e.key.toLowerCase());
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', stopDrag);
    root.addEventListener('pointercancel', stopDrag);
    root.addEventListener('lostpointercapture', stopDrag);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const cleanup = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      signal?.removeEventListener?.('abort', onAbort);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', stopDrag);
      root.removeEventListener('pointercancel', stopDrag);
      root.removeEventListener('lostpointercapture', stopDrag);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      if (root.parentNode === container) {
        container.removeChild(root);
      }
    };

    function finishGame(ok, reason) {
      if (settled) return;
      settled = true;
      state = ok ? 'won' : 'lost';
      const score = ok ? clamp(20 * hearts, 0, 100) : 0;
      const elapsedMs = Math.round(elapsedS * 1000);
      cleanup();
      resolve({
        ok,
        score,
        details: {
          reason,
          hearts,
          elapsedMs,
        },
      });
    }

    function triggerCaughtPenalty() {
      state = 'caught';
      hearts = Math.max(0, hearts - 1);
      exposureS = 0;
      isDragging = false;
      activePointerId = null;
      heldKeys.clear();
      caughtFlashS = 0.45;

      if (hearts <= 0) {
        updateHud();
        finishGame(false, 'failed');
        return;
      }

      // Respawn at last safe checkpoint with 1.5s invulnerability (06_MINIGAMES.md L23)
      state = 'respawn';
      playerX = lastCheckpoint.x;
      playerY = lastCheckpoint.y;
      targetX = playerX;
      targetY = playerY;
      invulnRemainingS = INVULN_DURATION_S;
      updateHud();
    }

    loseOneBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state === 'ready') beginStealth();
      triggerCaughtPenalty();
    });

    loseAllBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hearts = 1;
      triggerCaughtPenalty();
    });

    quickWinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playerX = EXIT_POS.x;
      playerY = EXIT_POS.y;
      finishGame(true, 'completed');
    });

    // Tab minimize / visibilitychange must never cost a heart (06_MINIGAMES.md L23)
    const onVisibilityChange = () => {
      if (document.hidden) {
        lastFrameTs = null;
        isDragging = false;
        activePointerId = null;
        heldKeys.clear();
        exposureS = 0;
      } else {
        lastFrameTs = performance.now();
        exposureS = 0;
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
      elapsedS += dt;
      if (invulnRemainingS > 0) {
        invulnRemainingS = Math.max(0, invulnRemainingS - dt);
      }
      if (caughtFlashS > 0) {
        caughtFlashS = Math.max(0, caughtFlashS - dt);
      }

      // Keyboard movement vector if keys are held
      let kx = 0;
      let ky = 0;
      if (heldKeys.has('arrowup') || heldKeys.has('w')) ky -= 1;
      if (heldKeys.has('arrowdown') || heldKeys.has('s')) ky += 1;
      if (heldKeys.has('arrowleft') || heldKeys.has('a')) kx -= 1;
      if (heldKeys.has('arrowright') || heldKeys.has('d')) kx += 1;

      if (kx !== 0 || ky !== 0) {
        const len = Math.hypot(kx, ky);
        playerX = clamp(
          playerX + (kx / len) * PLAYER_SPEED * dt,
          WALL_LEFT_X + PLAYER_R,
          WALL_RIGHT_X - PLAYER_R
        );
        playerY = clamp(playerY + (ky / len) * PLAYER_SPEED * dt, 60, 1140);
        targetX = playerX;
        targetY = playerY;
      } else if (isDragging) {
        const dx = targetX - playerX;
        const dy = targetY - playerY;
        const dist = Math.hypot(dx, dy);
        if (dist > 1.5) {
          const step = Math.min(dist, PLAYER_SPEED * dt);
          playerX = clamp(
            playerX + (dx / dist) * step,
            WALL_LEFT_X + PLAYER_R,
            WALL_RIGHT_X - PLAYER_R
          );
          playerY = clamp(playerY + (dy / dist) * step, 60, 1140);
        }
      }

      // Check exit reached (448, 80)
      if (Math.hypot(playerX - EXIT_POS.x, playerY - EXIT_POS.y) <= EXIT_POS.r + PLAYER_R * 0.5) {
        finishGame(true, 'completed');
        return;
      }

      // Check if player is inside a hiding alcove
      const activeAlcove = findContainingAlcove(playerX, playerY);
      if (activeAlcove) {
        state = 'hidden';
        exposureS = 0;
        lastCheckpoint = {
          x: activeAlcove.x + activeAlcove.w / 2,
          y: activeAlcove.y + activeAlcove.h / 2,
        };
      } else {
        state = 'moving';
        if (invulnRemainingS <= 0) {
          let seenByAny = false;
          for (const g of GUARDS) {
            const facing = guardFacingRad(g, elapsedS);
            if (isPointInGuardCone(playerX, playerY, g, facing)) {
              seenByAny = true;
              break;
            }
          }
          if (seenByAny) {
            exposureS += dt;
            if (exposureS >= EXPOSURE_LIMIT_S) {
              triggerCaughtPenalty();
              return;
            }
          } else {
            exposureS = Math.max(0, exposureS - dt * 2.2);
          }
        }
      }

      updateHud();
    }

    function renderScene() {
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      // 1. Draw side walls (x: 0..80 and x: 816..896)
      ctx.fillStyle = 'rgba(8, 12, 24, 0.72)';
      ctx.fillRect(0, 0, WALL_LEFT_X, LOGICAL_H);
      ctx.fillRect(WALL_RIGHT_X, 0, LOGICAL_W - WALL_RIGHT_X, LOGICAL_H);

      ctx.strokeStyle = 'rgba(216, 180, 103, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(WALL_LEFT_X, 0);
      ctx.lineTo(WALL_LEFT_X, LOGICAL_H);
      ctx.moveTo(WALL_RIGHT_X, 0);
      ctx.lineTo(WALL_RIGHT_X, LOGICAL_H);
      ctx.stroke();

      // 2. Draw Exit Portal at (448, 80)
      ctx.save();
      ctx.translate(EXIT_POS.x, EXIT_POS.y);
      const exitGrad = ctx.createRadialGradient(0, 0, 6, 0, 0, EXIT_POS.r);
      exitGrad.addColorStop(0, 'rgba(134, 239, 172, 0.9)');
      exitGrad.addColorStop(0.6, 'rgba(52, 211, 153, 0.35)');
      exitGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = exitGrad;
      ctx.beginPath();
      ctx.arc(0, 0, EXIT_POS.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#6ee7b7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, EXIT_POS.r * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ecfdf5';
      ctx.font = '700 15px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('ВЫХОД ВО ДВОР', 0, -EXIT_POS.r - 8);
      ctx.restore();

      // 3. Draw Hiding Alcoves (80, 760, 130, 150) and (686, 360, 130, 150)
      for (const alc of ALCOVES) {
        const playerInside = state === 'hidden' && findContainingAlcove(playerX, playerY)?.id === alc.id;
        ctx.save();
        ctx.fillStyle = playerInside ? 'rgba(22, 101, 52, 0.55)' : 'rgba(15, 23, 42, 0.65)';
        ctx.strokeStyle = playerInside ? '#86efac' : 'rgba(148, 163, 184, 0.65)';
        ctx.lineWidth = playerInside ? 3 : 2;
        ctx.beginPath();
        ctx.roundRect(alc.x, alc.y, alc.w, alc.h, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = playerInside ? '#bbf7d0' : '#cbd5e1';
        ctx.font = '600 14px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText(alc.label, alc.x + alc.w / 2, alc.y + 24);
        ctx.fillText(playerInside ? 'Скрыта в тени' : 'Ниша-укрытие', alc.x + alc.w / 2, alc.y + alc.h - 14);
        ctx.restore();
      }

      // 4. Draw Guard Vision Cones (clipped so cones NEVER shine through hiding alcoves!)
      ctx.save();
      ctx.beginPath();
      ctx.rect(WALL_LEFT_X, 0, WALL_RIGHT_X - WALL_LEFT_X, LOGICAL_H);
      for (const alc of ALCOVES) {
        ctx.rect(alc.x, alc.y, alc.w, alc.h);
      }
      ctx.clip('evenodd');

      for (const g of GUARDS) {
        const facing = guardFacingRad(g, elapsedS);
        const halfRad = degToRad(g.coneAngleDeg / 2);
        const coneGrad = ctx.createRadialGradient(g.x, g.y, 12, g.x, g.y, g.coneLen);
        if (exposureS > 0.05 && isPointInGuardCone(playerX, playerY, g, facing)) {
          coneGrad.addColorStop(0, 'rgba(248, 113, 113, 0.65)');
          coneGrad.addColorStop(0.7, 'rgba(239, 68, 68, 0.28)');
          coneGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        } else {
          coneGrad.addColorStop(0, 'rgba(253, 224, 71, 0.52)');
          coneGrad.addColorStop(0.7, 'rgba(250, 204, 21, 0.22)');
          coneGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
        }

        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.moveTo(g.x, g.y);
        ctx.arc(g.x, g.y, g.coneLen, facing - halfRad, facing + halfRad);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(253, 224, 71, 0.42)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();

      // 5. Draw Guards (Snape existing sprite medallion at (310, 730); Prefect silhouette at (590, 330))
      for (const g of GUARDS) {
        const facing = guardFacingRad(g, elapsedS);
        ctx.save();
        ctx.translate(g.x, g.y);

        if (g.id === 'snape') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, 30, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = '#0f172a';
          ctx.fill();
          ctx.clip();
          if (snapeImg.complete && snapeImg.naturalWidth > 0) {
            ctx.drawImage(snapeImg, -34, -32, 68, 102);
          }
          ctx.restore();

          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, 30, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Prefect silhouette (06_MINIGAMES.md L25)
          ctx.fillStyle = '#1e293b';
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#93c5fd';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Hooded shoulders & head silhouette
          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath();
          ctx.arc(0, -6, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(0, 12, 14, Math.PI * 1.1, Math.PI * 1.9);
          ctx.fill();
        }

        // Lantern dot in facing direction
        const lx = Math.cos(facing) * 28;
        const ly = Math.sin(facing) * 28;
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(lx, ly, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#f8fafc';
        ctx.font = '700 14px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText(g.name, 0, -38);
        ctx.restore();
      }

      // 6. Draw Player circle r = 18 at (playerX, playerY)
      const blinkHide = invulnRemainingS > 0 && Math.floor(invulnRemainingS * 12) % 2 === 1;
      if (!blinkHide) {
        ctx.save();
        ctx.translate(playerX, playerY);

        ctx.fillStyle = state === 'hidden' ? 'rgba(34, 197, 94, 0.85)' : '#38bdf8';
        ctx.shadowColor = state === 'hidden' ? 'rgba(74, 222, 128, 0.8)' : 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, 0, PLAYER_R, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fef08a';
        ctx.stroke();

        // Exposure ring around player if being spotted
        if (exposureS > 0.02) {
          const frac = clamp(exposureS / EXPOSURE_LIMIT_S, 0, 1);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, PLAYER_R + 7, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = '#f8fafc';
        ctx.font = '700 13px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Азалия', 0, PLAYER_R + 18);
        ctx.restore();
      }

      // Red flash overlay when caught
      if (caughtFlashS > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${(caughtFlashS * 0.55).toFixed(3)})`;
        ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
      }
    }

    const tick = (now) => {
      if (settled) return;
      if (!document.hidden && state !== 'ready') {
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

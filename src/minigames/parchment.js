import { FINAL_LOVE_LETTER_TEXT } from '../data/finalLetter.js';

/**
 * Parchment Minigame — Scene 10 (D978–979), docs/06_MINIGAMES.md L33–37.
 * Contract: run(container, params) -> Promise<{ ok: boolean, score: number, details: object }>
 *
 * - Logical canvas/stage: 896×1200 (DPR <= 2).
 * - Resources: bg_parchment_clean, magic_wand (separate alpha layer, pivot [0.05, 0.5], 64×64+ hit target).
 * - Sheet area: x: 220..665, y: 340..910 (width 445, height 570).
 * - Grid: 32×48 cells inside sheet area, brush radius r = 38 logical px.
 * - At >= 85% coverage: smoothly reveal remaining 15% over 600ms -> state 'complete' -> button «Завершить».
 * - Immediate «Показать письмо» button available at all times (sets details.reason = 'skipped').
 * - The revealed sheet expands into a keyboard- and touch-scrollable letter.
 */

const LOGICAL_W = 896;
const LOGICAL_H = 1200;

const SHEET_X0 = 220;
const SHEET_Y0 = 340;
const SHEET_X1 = 665;
const SHEET_Y1 = 910;
const SHEET_W = SHEET_X1 - SHEET_X0; // 445
const SHEET_H = SHEET_Y1 - SHEET_Y0; // 570

const GRID_COLS = 32;
const GRID_ROWS = 48;
const BRUSH_RADIUS = 38;
const TARGET_COVERAGE = 0.85;
const REVEAL_FINISH_MS = 600;
const MAX_SPARKS = 50;
const SPARK_TTL_MS = 600;

// Wand dock position in the right panel (06_MINIGAMES.md L34)
const WAND_DOCK_X = 780;
const WAND_DOCK_Y = 640;
const WAND_LENGTH_PX = 250;

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export async function run(container, params = {}) {
  const { signal = null, reducedMotion = false, debugAutoWin = false } = params;

  if (signal?.aborted) {
    throw new DOMException('Minigame aborted', 'AbortError');
  }

  const startTime = performance.now();

  // DebugAutoWin completes after the first RAF without altering normal game rules (06_MINIGAMES.md L4)
  if (debugAutoWin) {
    return new Promise((resolve, reject) => {
      const rafId = window.requestAnimationFrame(() => {
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
            coverage: 1,
            elapsedMs: Math.round(performance.now() - startTime),
          },
        });
      });
      signal?.addEventListener?.(
        'abort',
        () => {
          window.cancelAnimationFrame(rafId);
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
      details: { reason: 'completed', coverage: 1, elapsedMs: 0 },
    };
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let state = 'ready'; // 'ready' | 'dragging' | 'revealing' | 'complete'
    let completionReason = 'completed'; // 'completed' | 'skipped'
    let rafId = null;
    let activePointerId = null;

    // Pause tracking on visibilitychange (06_MINIGAMES.md L3)
    let pausedAt = null;
    let totalPausedMs = 0;

    // 32x48 grid inside sheet rect (x: 220..665, y: 340..910)
    const totalCells = GRID_COLS * GRID_ROWS;
    const cellRevealed = new Uint8Array(totalCells);
    let revealedCount = 0;
    let coverage = 0;

    // Wand position (handle at wandX, wandY; tip offset to the left so tip touches sheet)
    let wandX = WAND_DOCK_X;
    let wandY = WAND_DOCK_Y;
    let wandAngleDeg = -28;
    let lastTipX = null;
    let lastTipY = null;

    // Sparks pool (<= 50, ttl 600ms)
    const sparks = [];

    // Build DOM inside container (896x1200 logical coordinate space)
    const root = document.createElement('div');
    root.className = 'parchment-game-root';
    root.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;overflow:hidden;z-index:35;';

    // 1. Clean parchment background image (896x1200)
    const bgImg = document.createElement('img');
    bgImg.src = './assets/backgrounds/bg_parchment_clean.webp';
    bgImg.alt = 'Чистый пергамент';
    bgImg.draggable = false;
    bgImg.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;object-fit:cover;pointer-events:none;z-index:1;';

    // The same ink sits under the wand's mask and in the expanded reading sheet.
    const sheetBox = document.createElement('article');
    sheetBox.className = 'parchment-sheet-box';
    sheetBox.style.cssText = `--sheet-x:${SHEET_X0}px;--sheet-y:${SHEET_Y0}px;--sheet-w:${SHEET_W}px;--sheet-h:${SHEET_H}px;`;
    sheetBox.setAttribute('aria-labelledby', 'parchment-title');
    sheetBox.inert = true;
    sheetBox.tabIndex = 0;
    FINAL_LOVE_LETTER_TEXT.split('\n\n').forEach((paragraph, index) => {
      const el = document.createElement(index === 0 ? 'h1' : 'p');
      if (index === 0) el.id = 'parchment-title';
      if (paragraph.includes('\n')) el.className = 'parchment-stanza';
      if (index > 0) sheetBox.append('\n\n');
      el.textContent = paragraph;
      sheetBox.append(el);
    });

    // 3. Veil canvas covering the sheet area (drawn from bg_parchment_clean crop so unrevealed areas look 100% blank)
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const veilCanvas = document.createElement('canvas');
    veilCanvas.width = Math.round(LOGICAL_W * dpr);
    veilCanvas.height = Math.round(LOGICAL_H * dpr);
    veilCanvas.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;pointer-events:none;z-index:3;transition:opacity 600ms ease;';
    const veilCtx = veilCanvas.getContext('2d');
    veilCtx.scale(dpr, dpr);

    // Paint initial veil inside sheet area + soft golden contour guide
    function drawInitialVeil() {
      veilCtx.globalCompositeOperation = 'source-over';
      veilCtx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      if (bgImg.complete && bgImg.naturalWidth > 0) {
        const sx = (SHEET_X0 / LOGICAL_W) * bgImg.naturalWidth;
        const sy = (SHEET_Y0 / LOGICAL_H) * bgImg.naturalHeight;
        const sw = (SHEET_W / LOGICAL_W) * bgImg.naturalWidth;
        const sh = (SHEET_H / LOGICAL_H) * bgImg.naturalHeight;
        veilCtx.drawImage(bgImg, sx, sy, sw, sh, SHEET_X0, SHEET_Y0, SHEET_W, SHEET_H);
      } else {
        const grad = veilCtx.createLinearGradient(SHEET_X0, SHEET_Y0, SHEET_X1, SHEET_Y1);
        grad.addColorStop(0, '#e5cf9e');
        grad.addColorStop(0.5, '#dcc18b');
        grad.addColorStop(1, '#cfb077');
        veilCtx.fillStyle = grad;
        veilCtx.fillRect(SHEET_X0, SHEET_Y0, SHEET_W, SHEET_H);
      }

      // Subtle golden shimmer border showing the active parchment contour
      veilCtx.strokeStyle = 'rgba(180, 130, 52, 0.42)';
      veilCtx.lineWidth = 2;
      veilCtx.setLineDash([8, 6]);
      veilCtx.strokeRect(SHEET_X0 + 6, SHEET_Y0 + 6, SHEET_W - 12, SHEET_H - 12);
      veilCtx.setLineDash([]);
    }

    bgImg.addEventListener('load', () => {
      if (revealedCount === 0 && state === 'ready') {
        drawInitialVeil();
      }
    });
    drawInitialVeil();

    // 4. FX canvas for wand sparks and contour progress ring (896x1200, DPR <= 2)
    const fxCanvas = document.createElement('canvas');
    fxCanvas.width = Math.round(LOGICAL_W * dpr);
    fxCanvas.height = Math.round(LOGICAL_H * dpr);
    fxCanvas.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;pointer-events:none;z-index:4;';
    const fxCtx = fxCanvas.getContext('2d');
    fxCtx.scale(dpr, dpr);

    // 5. Right-side wand dock & separate alpha layer for magic_wand with >= 64x64 hit target
    const dockHint = document.createElement('div');
    dockHint.className = 'parchment-wand-dock';
    dockHint.style.cssText = `position:absolute;left:${WAND_DOCK_X - 58}px;top:${WAND_DOCK_Y - 120}px;width:104px;height:240px;border-radius:18px;border:1.5px dashed rgba(240,201,120,0.65);background:rgba(15,23,42,0.42);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:10px 6px;pointer-events:none;z-index:5;`;
    const dockLabel = document.createElement('span');
    dockLabel.style.cssText = 'font-size:13px;color:#fde68a;text-align:center;line-height:1.25;';
    dockLabel.textContent = 'Возьмите палочку';
    dockHint.appendChild(dockLabel);

    // Wand interactive wrapper: guarantees >= 88x88 hit zone (>= 64x64 per 06_MINIGAMES.md L34)
    // Pivot of handle at [0.05, 0.5]
    const wandHitEl = document.createElement('div');
    wandHitEl.className = 'parchment-wand-hit';
    wandHitEl.setAttribute('role', 'slider');
    wandHitEl.setAttribute('aria-label', 'Волшебная палочка — проведите по пергаменту');
    wandHitEl.style.cssText = `position:absolute;left:0;top:0;width:${WAND_LENGTH_PX}px;height:88px;transform-origin:5% 50%;cursor:grab;z-index:6;display:flex;align-items:center;touch-action:none;`;

    const wandImg = document.createElement('img');
    wandImg.src = './assets/props/magic_wand.webp';
    wandImg.alt = 'Волшебная палочка';
    wandImg.draggable = false;
    // Flip horizontally so the handle is at 5% (left of wrapper) and the glowing tip extends toward the parchment
    wandImg.style.cssText =
      'width:100%;height:auto;max-height:54px;object-fit:contain;transform:scaleX(-1);filter:drop-shadow(0 6px 14px rgba(0,0,0,0.65)) drop-shadow(0 0 10px rgba(250,214,125,0.55));pointer-events:none;';
    wandHitEl.appendChild(wandImg);

    function updateWandTransform() {
      const yOffset = wandY - 44;
      const xOffset = wandX - WAND_LENGTH_PX * 0.05;
      wandHitEl.style.transform = `translate(${xOffset.toFixed(1)}px, ${yOffset.toFixed(1)}px) rotate(${wandAngleDeg.toFixed(1)}deg)`;
    }
    updateWandTransform();

    function getWandTip() {
      const rad = (wandAngleDeg * Math.PI) / 180;
      const effectiveLen = WAND_LENGTH_PX * 0.9;
      return {
        x: wandX + Math.cos(rad) * effectiveLen,
        y: wandY + Math.sin(rad) * effectiveLen,
      };
    }

    // 6. Top HUD bar (progress % + instruction) & Bottom action bar («Показать письмо» / «Завершить»)
    const topHud = document.createElement('div');
    topHud.className = 'parchment-progress';
    topHud.style.cssText =
      'position:absolute;left:36px;right:36px;top:92px;z-index:8;display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(12,18,32,0.88);border:1.5px solid rgba(216,180,103,0.78);border-radius:14px;padding:12px 18px;box-shadow:0 10px 28px rgba(0,0,0,0.55);';

    const statusText = document.createElement('div');
    statusText.style.cssText = 'font-size:17px;color:#f8fafc;font-weight:600;';
    statusText.textContent = 'Проведите волшебной палочкой по листу пергамента (нужно открыть ≥85%)';

    const pctBadge = document.createElement('div');
    pctBadge.style.cssText =
      'font-size:17px;font-weight:700;color:#fde68a;white-space:nowrap;padding:4px 10px;border-radius:8px;background:rgba(255,255,255,0.07);';
    pctBadge.textContent = '0% / 85%';

    topHud.append(statusText, pctBadge);

    const bottomBar = document.createElement('div');
    bottomBar.className = 'parchment-actions';
    bottomBar.style.cssText =
      'position:absolute;left:36px;right:36px;bottom:48px;z-index:8;display:flex;align-items:center;justify-content:center;gap:16px;';

    // «Показать письмо» is available immediately (06_MINIGAMES.md L37)
    const showLetterBtn = document.createElement('button');
    showLetterBtn.type = 'button';
    showLetterBtn.className = 'ui-btn';
    showLetterBtn.style.minHeight = '48px';
    showLetterBtn.style.minWidth = '210px';
    showLetterBtn.textContent = 'Показать письмо';

    // «Завершить» appears once >=85% is revealed (or «Показать письмо» is clicked)
    const finishBtn = document.createElement('button');
    finishBtn.type = 'button';
    finishBtn.className = 'ui-btn ui-btn-primary';
    finishBtn.style.minHeight = '48px';
    finishBtn.style.minWidth = '220px';
    finishBtn.textContent = 'Завершить ▸';
    finishBtn.hidden = true;

    bottomBar.append(showLetterBtn, finishBtn);

    root.append(bgImg, sheetBox, veilCanvas, fxCanvas, dockHint, wandHitEl, topHud, bottomBar);
    container.innerHTML = '';
    container.appendChild(root);

    function toLogicalCoords(clientX, clientY) {
      const rect = root.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      return {
        x: ((clientX - rect.left) / w) * LOGICAL_W,
        y: ((clientY - rect.top) / h) * LOGICAL_H,
      };
    }

    function eraseVeilAt(lx, ly) {
      veilCtx.save();
      veilCtx.globalCompositeOperation = 'destination-out';
      if (reducedMotion) {
        // 06_MINIGAMES.md L37: in reduced-motion reveal in clean horizontal bands without particles
        const rowH = SHEET_H / GRID_ROWS;
        const bandY = clamp(ly - BRUSH_RADIUS, SHEET_Y0, SHEET_Y1);
        const bandH = Math.max(rowH * 2.5, BRUSH_RADIUS * 1.8);
        veilCtx.fillStyle = 'rgba(0,0,0,1)';
        veilCtx.fillRect(SHEET_X0, bandY - bandH / 2, SHEET_W, bandH);
      } else {
        const grad = veilCtx.createRadialGradient(lx, ly, BRUSH_RADIUS * 0.35, lx, ly, BRUSH_RADIUS * 1.25);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.75, 'rgba(0,0,0,0.92)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        veilCtx.fillStyle = grad;
        veilCtx.beginPath();
        veilCtx.arc(lx, ly, BRUSH_RADIUS * 1.25, 0, Math.PI * 2);
        veilCtx.fill();
      }
      veilCtx.restore();
    }

    function markCellsAtPoint(px, py) {
      if (
        px < SHEET_X0 - BRUSH_RADIUS ||
        px > SHEET_X1 + BRUSH_RADIUS ||
        py < SHEET_Y0 - BRUSH_RADIUS ||
        py > SHEET_Y1 + BRUSH_RADIUS
      ) {
        return;
      }

      eraseVeilAt(px, py);

      const cellW = SHEET_W / GRID_COLS;
      const cellH = SHEET_H / GRID_ROWS;
      const rSq = BRUSH_RADIUS * BRUSH_RADIUS;

      for (let r = 0; r < GRID_ROWS; r += 1) {
        const cy = SHEET_Y0 + (r + 0.5) * cellH;
        const dy = cy - py;
        if (Math.abs(dy) > BRUSH_RADIUS) continue;

        if (reducedMotion) {
          // Reveal the entire horizontal row inside the sheet when touched in reducedMotion
          for (let c = 0; c < GRID_COLS; c += 1) {
            const idx = r * GRID_COLS + c;
            if (!cellRevealed[idx]) {
              cellRevealed[idx] = 1;
              revealedCount += 1;
            }
          }
          continue;
        }

        for (let c = 0; c < GRID_COLS; c += 1) {
          const idx = r * GRID_COLS + c;
          if (cellRevealed[idx]) continue;
          const cx = SHEET_X0 + (c + 0.5) * cellW;
          const dx = cx - px;
          if (dx * dx + dy * dy <= rSq) {
            cellRevealed[idx] = 1;
            revealedCount += 1;
          }
        }
      }

      coverage = revealedCount / totalCells;
      const pct = Math.min(100, Math.round(coverage * 100));
      pctBadge.textContent = `${pct}% / 85%`;

      if (coverage >= TARGET_COVERAGE && (state === 'ready' || state === 'dragging')) {
        triggerSmoothReveal('completed');
      }
    }

    function spawnSparks(tx, ty, now) {
      if (reducedMotion) return;
      for (let i = 0; i < 2; i += 1) {
        if (sparks.length >= MAX_SPARKS) sparks.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = 22 + Math.random() * 68;
        sparks.push({
          x: tx + (Math.random() - 0.5) * 8,
          y: ty + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 18,
          bornAt: now,
          size: 2 + Math.random() * 2.8,
        });
      }
    }

    function sweepWandTo(targetX, targetY) {
      // Position handle slightly to the bottom-right of the pointer so the wand tip lands right under the pointer
      wandAngleDeg = -155;
      const rad = (wandAngleDeg * Math.PI) / 180;
      const effectiveLen = WAND_LENGTH_PX * 0.9;
      wandX = clamp(targetX - Math.cos(rad) * effectiveLen, 40, LOGICAL_W - 20);
      wandY = clamp(targetY - Math.sin(rad) * effectiveLen, 80, LOGICAL_H - 40);
      updateWandTransform();

      const tip = getWandTip();
      const now = performance.now();
      spawnSparks(tip.x, tip.y, now);

      if (lastTipX !== null && lastTipY !== null) {
        const dist = Math.hypot(tip.x - lastTipX, tip.y - lastTipY);
        const steps = Math.max(1, Math.ceil(dist / 8));
        for (let i = 1; i <= steps; i += 1) {
          const t = i / steps;
          markCellsAtPoint(
            lastTipX + (tip.x - lastTipX) * t,
            lastTipY + (tip.y - lastTipY) * t
          );
        }
      } else {
        markCellsAtPoint(tip.x, tip.y);
      }

      lastTipX = tip.x;
      lastTipY = tip.y;
    }

    function triggerSmoothReveal(reason) {
      if (state === 'revealing' || state === 'complete') return;
      completionReason = reason;
      state = 'revealing';
      root.classList.add('is-revealing');
      activePointerId = null;
      lastTipX = null;
      lastTipY = null;
      dockHint.hidden = true;
      veilCanvas.style.opacity = '0';
      pctBadge.textContent = '100%';
      statusText.textContent = 'На пергаменте проступили строки письма…';
      showLetterBtn.hidden = true;

      window.setTimeout(() => {
        if (settled) return;
        state = 'complete';
        veilCtx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
        root.classList.replace('is-revealing', 'is-reading');
        sheetBox.inert = false;
        sheetBox.focus({ preventScroll: true });
        finishBtn.hidden = false;
        statusText.textContent = 'Письмо открыто! Прочитайте текст и нажмите «Завершить».';
      }, reducedMotion ? 120 : REVEAL_FINISH_MS);
    }

    // Pointer handling on root & wand (with pointercancel safety)
    const onPointerDown = (e) => {
      if (state !== 'ready' && state !== 'dragging') return;
      if (e.target.closest('button')) return;

      const pt = toLogicalCoords(e.clientX, e.clientY);
      // Allow grabbing the wand from the right dock (>=64x64 hit target) or touching directly on the sheet
      const nearDock = Math.hypot(pt.x - WAND_DOCK_X, pt.y - WAND_DOCK_Y) <= 130;
      const onSheet =
        pt.x >= SHEET_X0 - 40 &&
        pt.x <= SHEET_X1 + 40 &&
        pt.y >= SHEET_Y0 - 40 &&
        pt.y <= SHEET_Y1 + 40;

      if (!nearDock && !onSheet && state === 'ready') return;

      activePointerId = e.pointerId;
      state = 'dragging';
      dockHint.hidden = true;
      wandHitEl.style.cursor = 'grabbing';
      try {
        root.setPointerCapture(e.pointerId);
      } catch (_) {
        // Ignore capture errors on synthetic pointers
      }
      sweepWandTo(pt.x, pt.y);
    };

    const onPointerMove = (e) => {
      if (activePointerId === null || e.pointerId !== activePointerId) return;
      if (state !== 'dragging') return;
      const pt = toLogicalCoords(e.clientX, e.clientY);
      sweepWandTo(pt.x, pt.y);
    };

    const endDrag = (e) => {
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
      lastTipX = null;
      lastTipY = null;
      wandHitEl.style.cursor = 'grab';
      // Progress in cellRevealed is preserved even on pointercancel!
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', endDrag);
    root.addEventListener('pointercancel', endDrag);
    root.addEventListener('lostpointercapture', endDrag);

    showLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerSmoothReveal('skipped');
    });

    const cleanup = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      signal?.removeEventListener?.('abort', onAbort);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', endDrag);
      root.removeEventListener('pointercancel', endDrag);
      root.removeEventListener('lostpointercapture', endDrag);
      if (root.parentNode === container) {
        container.removeChild(root);
      }
    };

    finishBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (settled) return;
      settled = true;
      const now = performance.now();
      const activeElapsed = Math.max(0, Math.round(now - startTime - totalPausedMs));
      cleanup();
      resolve({
        ok: true,
        score: 100,
        details: {
          reason: completionReason,
          coverage: Number(Math.max(coverage, 1).toFixed(3)),
          elapsedMs: activeElapsed,
        },
      });
    });

    const onVisibilityChange = () => {
      if (document.hidden) {
        pausedAt = performance.now();
      } else if (pausedAt !== null) {
        totalPausedMs += performance.now() - pausedAt;
        pausedAt = null;
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

    // RAF loop for wand tip glow & sparks (<= 50, ttl 600ms)
    const tick = (now) => {
      if (settled || state === 'complete') return;
      if (!document.hidden) {
        fxCtx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

        // Draw wand tip magic aura when dragging
        if (state === 'dragging' || state === 'ready') {
          const tip = getWandTip();
          const pulse = 0.65 + 0.35 * Math.sin(now / 180);
          const grad = fxCtx.createRadialGradient(tip.x, tip.y, 2, tip.x, tip.y, 22);
          grad.addColorStop(0, `rgba(255, 248, 200, ${(0.9 * pulse).toFixed(3)})`);
          grad.addColorStop(0.5, `rgba(245, 202, 105, ${(0.45 * pulse).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(245, 202, 105, 0)');
          fxCtx.fillStyle = grad;
          fxCtx.beginPath();
          fxCtx.arc(tip.x, tip.y, 22, 0, Math.PI * 2);
          fxCtx.fill();
        }

        // Update and draw sparks (ttl 600ms)
        if (!reducedMotion && sparks.length > 0) {
          for (let i = sparks.length - 1; i >= 0; i -= 1) {
            const sp = sparks[i];
            const age = now - sp.bornAt;
            if (age >= SPARK_TTL_MS) {
              sparks.splice(i, 1);
              continue;
            }
            const t = age / SPARK_TTL_MS;
            const x = sp.x + sp.vx * t;
            const y = sp.y + sp.vy * t + 35 * t * t;
            const alpha = 1 - t;
            fxCtx.fillStyle = `rgba(255, 226, 138, ${alpha.toFixed(3)})`;
            fxCtx.beginPath();
            fxCtx.arc(x, y, sp.size * (1 - 0.3 * t), 0, Math.PI * 2);
            fxCtx.fill();
          }
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
  });
}

export default { run };

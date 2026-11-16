import { POTIONS_RECIPES } from '../data/minigames/potionsRecipes.js';

/**
 * Potions Minigame — Scene 3 (D295), docs/06_MINIGAMES.md L5–12.
 * Contract: run(container, params) -> Promise<{ ok: boolean, score: number, details: object }>
 *
 * - Logical canvas/stage: 896×1200 (DPR <= 2), background bg_potions.
 * - States: book -> ingredients -> stir -> qte -> roundResult -> next recipe -> complete.
 * - Fixed 2 rounds: recipe01 («Напиток живой смерти»), recipe02 («Умиротворяющий бальзам»).
 * - Book of 20 recipes: 1 recipe per page, arrows + swipe, case-insensitive search by name & ingredients
 *   (search never alters assigned round recipe); book can be opened any time before QTE and pauses timers.
 * - Ingredients stage: 6 cards (3 required + 3 next in cycle from global list); drag into cauldron circle
 *   center (448, 700) r = 160 in any order. Wrong ingredient returns; up to 3 mistakes per round (3rd -> failed).
 * - Stir stage (8s): gauge 0..1, start 0.5, green zone 0.25..0.75; holding raises +0.18/s, releasing lowers -0.12/s;
 *   needs >= 4.5s in green zone. Single pointer.
 * - QTE stage (8s window): runner 0..1 with reflection at 0.35/s, green zone 0.32..0.68, single tap.
 *   qteAccuracy = clamp(1 - abs(pos - 0.5) / 0.18, 0, 1).
 *   roundScore = clamp(round(70 * greenTime / 8 + 30 * qteAccuracy), 0, 100).
 *   Final score = average of the two rounds.
 */

const LOGICAL_W = 896;
const LOGICAL_H = 1200;

const CAULDRON_X = 448;
const CAULDRON_Y = 700;
const CAULDRON_R = 160;

const ROUND_RECIPE_IDS = ['recipe01', 'recipe02'];
const MAX_MISTAKES_PER_ROUND = 3;

const STIR_DURATION_S = 8;
const STIR_START_VAL = 0.5;
const STIR_GREEN_MIN = 0.25;
const STIR_GREEN_MAX = 0.75;
const STIR_RISE_RATE = 0.18;
const STIR_FALL_RATE = 0.12;
const STIR_TARGET_GREEN_S = 4.5;

const QTE_WINDOW_S = 8;
const QTE_SPEED = 0.35;
const QTE_GREEN_MIN = 0.32;
const QTE_GREEN_MAX = 0.68;

const BUBBLE_COUNT = 20;

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function buildAllIngredientsList() {
  const list = [];
  for (const r of POTIONS_RECIPES) {
    for (const ing of r.ingredients) {
      list.push(ing);
    }
  }
  return list;
}

const ALL_INGREDIENTS = buildAllIngredientsList();

function buildRoundCards(recipeId) {
  const recipeIdx = POTIONS_RECIPES.findIndex((r) => r.id === recipeId);
  const recipe = POTIONS_RECIPES[recipeIdx] || POTIONS_RECIPES[0];
  const required = [...recipe.ingredients];

  // Start after this recipe's 3 ingredients in the global cycle and pick the next 3 distinct distractors
  const distractors = [];
  let cursor = ((recipeIdx >= 0 ? recipeIdx : 0) * 3 + 3) % ALL_INGREDIENTS.length;
  let guard = 0;
  while (distractors.length < 3 && guard < ALL_INGREDIENTS.length * 2) {
    const candidate = ALL_INGREDIENTS[cursor];
    if (!required.includes(candidate) && !distractors.includes(candidate)) {
      distractors.push(candidate);
    }
    cursor = (cursor + 1) % ALL_INGREDIENTS.length;
    guard += 1;
  }

  // Deterministic interleave so cards are nicely arranged across the 6 slots
  const combined = [
    { name: required[0], required: true },
    { name: distractors[0], required: false },
    { name: required[1], required: true },
    { name: distractors[1], required: false },
    { name: required[2], required: true },
    { name: distractors[2], required: false },
  ];

  // 2 rows × 3 columns in the upper shelf area (y: 190..410)
  const slots = [
    { x: 170, y: 245 },
    { x: 448, y: 245 },
    { x: 726, y: 245 },
    { x: 170, y: 365 },
    { x: 448, y: 365 },
    { x: 726, y: 365 },
  ];

  return combined.map((item, idx) => ({
    id: `card_${idx}`,
    name: item.name,
    required: item.required,
    homeX: slots[idx].x,
    homeY: slots[idx].y,
    x: slots[idx].x,
    y: slots[idx].y,
    added: false,
    shakeMs: 0,
    kind: idx % 3 === 0 ? 'herb' : idx % 3 === 1 ? 'powder' : 'vial',
  }));
}

export async function run(container, params = {}) {
  const { signal = null, reducedMotion = false, debugAutoWin = false } = params;

  if (signal?.aborted) {
    throw new DOMException('Minigame aborted', 'AbortError');
  }

  const startWallTs = performance.now();

  // DebugAutoWin resolves after first RAF (06_MINIGAMES.md L4)
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
            rounds: [100, 100],
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
      details: { reason: 'completed', rounds: [100, 100], elapsedMs: 0 },
    };
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    let state = 'book'; // 'book' | 'ingredients' | 'stir' | 'qte' | 'roundResult' | 'complete'
    let stateBeforeBook = 'ingredients';
    let isBookOpen = true;

    let roundIndex = 0; // 0 -> recipe01, 1 -> recipe02
    const roundScores = [];

    let cards = buildRoundCards(ROUND_RECIPE_IDS[0]);
    let addedCount = 0;
    let mistakes = 0;
    let draggingCard = null;
    let activePointerId = null;

    // Stir state
    let stirElapsedS = 0;
    let stirValue = STIR_START_VAL;
    let stirGreenTimeS = 0;
    let isHoldingStir = false;

    // QTE state
    let qteElapsedS = 0;
    let qtePos = 0.15;
    let qteDir = 1;
    let roundResultTimerS = 0;
    let roundSummaryText = '';

    // Book state (20 recipes, search + pagination)
    let searchQuery = '';
    let filteredRecipes = [...POTIONS_RECIPES];
    let bookPageIndex = 0;

    let rafId = null;
    let lastFrameTs = null;
    let pausedMs = 0;
    let pauseStartedAt = null;

    // 20 Cauldron bubbles (06_MINIGAMES.md L11)
    const bubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
      xOffset: ((i * 37) % 200) - 100,
      yOffset: (i * 19) % 70,
      r: 3 + (i % 5) * 1.8,
      speed: 22 + (i % 4) * 10,
      phase: i * 0.6,
    }));

    // Build DOM in 896x1200 logical space
    const root = document.createElement('div');
    root.className = 'potions-game-root';
    root.style.cssText =
      'position:absolute;inset:0;width:896px;height:1200px;overflow:hidden;touch-action:none;user-select:none;z-index:35;';

    const bgImg = document.createElement('img');
    bgImg.src = './assets/backgrounds/bg_potions.webp';
    bgImg.alt = 'Кабинет зельеварения';
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

    // Top HUD bar
    const topHud = document.createElement('div');
    topHud.style.cssText =
      'position:absolute;left:28px;right:28px;top:86px;z-index:6;background:rgba(10,16,30,0.92);border:1.5px solid rgba(216,180,103,0.85);border-radius:14px;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:0 10px 26px rgba(0,0,0,0.6);';

    const roundTitleEl = document.createElement('div');
    roundTitleEl.style.cssText = 'font-size:17px;font-weight:700;color:#fde68a;';

    const stageHintEl = document.createElement('div');
    stageHintEl.style.cssText = 'font-size:15px;color:#e2e8f0;flex:1;text-align:center;';

    const openBookBtn = document.createElement('button');
    openBookBtn.type = 'button';
    openBookBtn.className = 'ui-btn ui-btn-compact';
    openBookBtn.style.minHeight = '44px';
    openBookBtn.textContent = '📖 Книга рецептов';

    topHud.append(roundTitleEl, stageHintEl, openBookBtn);

    // Interactive action button for Stir & QTE below cauldron
    const actionWrap = document.createElement('div');
    actionWrap.style.cssText =
      'position:absolute;left:50%;top:965px;transform:translateX(-50%);z-index:6;display:flex;gap:14px;';

    const qteTapBtn = document.createElement('button');
    qteTapBtn.type = 'button';
    qteTapBtn.className = 'ui-btn ui-btn-primary';
    qteTapBtn.style.cssText = 'min-height:56px;min-width:280px;font-size:19px;';
    qteTapBtn.textContent = 'Зафиксировать огонь! ▸';
    qteTapBtn.hidden = true;

    actionWrap.appendChild(qteTapBtn);

    // Recipe Book Modal Overlay (20 recipes, search by name & ingredients, 1 recipe per page)
    const bookOverlay = document.createElement('div');
    bookOverlay.className = 'potions-book-overlay';
    bookOverlay.style.cssText =
      'position:absolute;inset:0;z-index:10;background:rgba(8,12,24,0.84);display:flex;align-items:center;justify-content:center;padding:28px;';

    const bookCard = document.createElement('div');
    bookCard.style.cssText =
      'width:min(92%,640px);background:linear-gradient(180deg,#241a12,#18110b);border:2px solid #d8b467;border-radius:18px;padding:22px 24px;box-shadow:0 20px 50px rgba(0,0,0,0.85);display:flex;flex-direction:column;gap:14px;color:#f8fafc;';

    const bookHeader = document.createElement('div');
    bookHeader.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;';

    const bookTitle = document.createElement('h2');
    bookTitle.style.cssText = 'margin:0;font-size:22px;color:#fde68a;';
    bookTitle.textContent = 'Книга зелий (20 рецептов)';

    const targetRecipeBtn = document.createElement('button');
    targetRecipeBtn.type = 'button';
    targetRecipeBtn.className = 'ui-btn ui-btn-compact';
    targetRecipeBtn.style.minHeight = '44px';
    targetRecipeBtn.textContent = 'Назначенный рецепт раунда';

    bookHeader.append(bookTitle, targetRecipeBtn);

    const assignedNoticeEl = document.createElement('div');
    assignedNoticeEl.style.cssText =
      'padding:8px 12px;border-radius:10px;background:rgba(245,158,11,0.14);border:1px solid rgba(245,158,11,0.45);font-size:15px;color:#fde68a;';

    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Поиск по названию зелья или ингредиенту…';
    searchInput.setAttribute('aria-label', 'Поиск по названию зелья или ингредиенту');
    searchInput.style.cssText =
      'width:100%;min-height:46px;padding:8px 14px;border-radius:10px;border:1.5px solid #d8b467;background:#0f172a;color:#f8fafc;font-size:16px;box-sizing:border-box;';

    const pageCard = document.createElement('div');
    pageCard.style.cssText =
      'min-height:210px;padding:18px 20px;border-radius:14px;background:rgba(255,248,231,0.94);color:#291a0e;display:flex;flex-direction:column;justify-content:space-between;gap:12px;box-shadow:inset 0 0 24px rgba(139,92,42,0.28);';

    const recipePageTitle = document.createElement('h3');
    recipePageTitle.style.cssText = 'margin:0;font-size:22px;color:#451a03;';

    const recipeIngList = document.createElement('ol');
    recipeIngList.style.cssText = 'margin:0;padding-left:22px;font-size:18px;line-height:1.6;font-weight:600;';

    const recipePageFooter = document.createElement('div');
    recipePageFooter.style.cssText = 'font-size:14px;color:#78350f;font-style:italic;';

    pageCard.append(recipePageTitle, recipeIngList, recipePageFooter);

    const bookNavRow = document.createElement('div');
    bookNavRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;';

    const prevRecipeBtn = document.createElement('button');
    prevRecipeBtn.type = 'button';
    prevRecipeBtn.className = 'ui-btn ui-btn-compact';
    prevRecipeBtn.style.minHeight = '44px';
    prevRecipeBtn.textContent = '◂ Пред.';

    const pageCounterEl = document.createElement('span');
    pageCounterEl.style.cssText = 'font-size:16px;font-weight:700;color:#fde68a;';

    const nextRecipeBtn = document.createElement('button');
    nextRecipeBtn.type = 'button';
    nextRecipeBtn.className = 'ui-btn ui-btn-compact';
    nextRecipeBtn.style.minHeight = '44px';
    nextRecipeBtn.textContent = 'След. ▸';

    bookNavRow.append(prevRecipeBtn, pageCounterEl, nextRecipeBtn);

    const closeBookBtn = document.createElement('button');
    closeBookBtn.type = 'button';
    closeBookBtn.className = 'ui-btn ui-btn-primary';
    closeBookBtn.style.minHeight = '48px';
    closeBookBtn.style.fontSize = '18px';
    closeBookBtn.textContent = 'Закрыть книгу и варить зелье ▸';

    bookCard.append(bookHeader, assignedNoticeEl, searchInput, pageCard, bookNavRow, closeBookBtn);
    bookOverlay.appendChild(bookCard);

    // Bottom debug/accessibility bar (>= 44x44px)
    const bottomBar = document.createElement('div');
    bottomBar.style.cssText =
      'position:absolute;left:28px;right:28px;bottom:34px;z-index:7;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;';

    const quickWinBtn = document.createElement('button');
    quickWinBtn.type = 'button';
    quickWinBtn.className = 'ui-btn ui-btn-compact';
    quickWinBtn.style.minHeight = '44px';
    quickWinBtn.textContent = 'Сварить оба зелья (отладка)';

    const quickFailBtn = document.createElement('button');
    quickFailBtn.type = 'button';
    quickFailBtn.className = 'ui-btn ui-btn-compact';
    quickFailBtn.style.minHeight = '44px';
    quickFailBtn.textContent = 'Ошибка варки (проверка повтора)';

    bottomBar.append(quickWinBtn, quickFailBtn);

    root.append(bgImg, canvas, topHud, actionWrap, bookOverlay, bottomBar);
    container.innerHTML = '';
    container.appendChild(root);

    function currentTargetRecipe() {
      const targetId = ROUND_RECIPE_IDS[roundIndex] || 'recipe01';
      return POTIONS_RECIPES.find((r) => r.id === targetId) || POTIONS_RECIPES[0];
    }

    function renderBookPage() {
      const target = currentTargetRecipe();
      assignedNoticeEl.textContent = `Задание Раунда ${roundIndex + 1} из 2: «${target.name}» (${target.ingredients.join(' + ')})`;

      const q = searchQuery.trim().toLowerCase();
      filteredRecipes = POTIONS_RECIPES.filter((r) => {
        if (!q) return true;
        if (r.name.toLowerCase().includes(q)) return true;
        return r.ingredients.some((ing) => ing.toLowerCase().includes(q));
      });

      if (filteredRecipes.length === 0) {
        recipePageTitle.textContent = 'Рецепт не найден';
        recipeIngList.innerHTML = '';
        recipePageFooter.textContent = 'Попробуйте другой поисковый запрос.';
        pageCounterEl.textContent = '0 / 0';
        prevRecipeBtn.disabled = true;
        nextRecipeBtn.disabled = true;
        return;
      }

      bookPageIndex = clamp(bookPageIndex, 0, filteredRecipes.length - 1);
      const rec = filteredRecipes[bookPageIndex];
      const num = POTIONS_RECIPES.findIndex((r) => r.id === rec.id) + 1;
      recipePageTitle.textContent = `№${num}. ${rec.name}`;
      recipeIngList.innerHTML = '';
      for (const ing of rec.ingredients) {
        const li = document.createElement('li');
        li.textContent = ing;
        recipeIngList.appendChild(li);
      }
      recipePageFooter.textContent =
        rec.id === target.id
          ? '★ Это назначенный рецепт текущего раунда!'
          : 'Справочная страница книги рецептов (назначенный рецепт не меняется).';
      pageCounterEl.textContent = `Стр. ${bookPageIndex + 1} из ${filteredRecipes.length}`;
      prevRecipeBtn.disabled = bookPageIndex <= 0;
      nextRecipeBtn.disabled = bookPageIndex >= filteredRecipes.length - 1;
    }

    function openBook() {
      if (state === 'qte' || state === 'roundResult' || state === 'complete') return;
      if (!isBookOpen) {
        stateBeforeBook = state === 'book' ? 'ingredients' : state;
        isBookOpen = true;
        state = 'book';
        isHoldingStir = false;
        lastFrameTs = null;
        pauseStartedAt = performance.now();
        bookOverlay.hidden = false;
        renderBookPage();
        updateHud();
      }
    }

    function closeBook() {
      if (!isBookOpen) return;
      isBookOpen = false;
      if (pauseStartedAt !== null) {
        pausedMs += performance.now() - pauseStartedAt;
        pauseStartedAt = null;
      }
      bookOverlay.hidden = true;
      state = stateBeforeBook || 'ingredients';
      lastFrameTs = performance.now();
      updateHud();
    }

    // Swipe support on book page card
    let bookSwipeStartX = null;
    pageCard.addEventListener('pointerdown', (e) => {
      bookSwipeStartX = e.clientX;
    });
    pageCard.addEventListener('pointerup', (e) => {
      if (bookSwipeStartX === null) return;
      const dx = e.clientX - bookSwipeStartX;
      bookSwipeStartX = null;
      if (dx < -40 && bookPageIndex < filteredRecipes.length - 1) {
        bookPageIndex += 1;
        renderBookPage();
      } else if (dx > 40 && bookPageIndex > 0) {
        bookPageIndex -= 1;
        renderBookPage();
      }
    });

    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      bookPageIndex = 0;
      renderBookPage();
    });

    prevRecipeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bookPageIndex > 0) {
        bookPageIndex -= 1;
        renderBookPage();
      }
    });

    nextRecipeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bookPageIndex < filteredRecipes.length - 1) {
        bookPageIndex += 1;
        renderBookPage();
      }
    });

    targetRecipeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchQuery = '';
      searchInput.value = '';
      bookPageIndex = roundIndex;
      renderBookPage();
    });

    closeBookBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeBook();
    });

    openBookBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isBookOpen) closeBook();
      else openBook();
    });

    function updateHud() {
      const target = currentTargetRecipe();
      roundTitleEl.textContent = `Раунд ${roundIndex + 1}/2: ${target.name}`;
      openBookBtn.disabled = state === 'qte' || state === 'roundResult';
      qteTapBtn.hidden = state !== 'qte';

      if (state === 'book') {
        stageHintEl.textContent = 'Изучите рецепт в книге (таймер на паузе)';
      } else if (state === 'ingredients') {
        stageHintEl.textContent = `Перенесите 3 нужных ингредиента в котёл (${addedCount}/3, ошибки: ${mistakes}/${MAX_MISTAKES_PER_ROUND})`;
      } else if (state === 'stir') {
        const rem = Math.max(0, STIR_DURATION_S - stirElapsedS);
        stageHintEl.textContent = `Помешивание (${rem.toFixed(1)} с): удерживайте котёл, чтобы держать шкалу в зелёной зоне (${stirGreenTimeS.toFixed(1)} / ${STIR_TARGET_GREEN_S} с)`;
      } else if (state === 'qte') {
        const rem = Math.max(0, QTE_WINDOW_S - qteElapsedS);
        stageHintEl.textContent = `Финал варки (${rem.toFixed(1)} с): нажмите в зелёной зоне!`;
      } else if (state === 'roundResult') {
        stageHintEl.textContent = roundSummaryText;
      }
    }

    function startRound(idx) {
      roundIndex = idx;
      cards = buildRoundCards(ROUND_RECIPE_IDS[idx]);
      addedCount = 0;
      mistakes = 0;
      draggingCard = null;
      stirElapsedS = 0;
      stirValue = STIR_START_VAL;
      stirGreenTimeS = 0;
      isHoldingStir = false;
      qteElapsedS = 0;
      qtePos = 0.15;
      qteDir = 1;
      stateBeforeBook = 'ingredients';
      searchQuery = '';
      searchInput.value = '';
      bookPageIndex = idx;
      isBookOpen = true;
      state = 'book';
      bookOverlay.hidden = false;
      renderBookPage();
      updateHud();
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

    function handleQteTap() {
      if (state !== 'qte' || settled) return;
      if (qtePos < QTE_GREEN_MIN || qtePos > QTE_GREEN_MAX) {
        finishPotions(false, 'failed');
        return;
      }
      const qteAccuracy = clamp(1 - Math.abs(qtePos - 0.5) / 0.18, 0, 1);
      const rScore = clamp(
        Math.round(70 * (stirGreenTimeS / STIR_DURATION_S) + 30 * qteAccuracy),
        0,
        100
      );
      roundScores.push(rScore);
      roundSummaryText = `Зелье «${currentTargetRecipe().name}» готово! Качество: ${rScore}/100`;
      state = 'roundResult';
      roundResultTimerS = 0;
      updateHud();
    }

    qteTapBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleQteTap();
    });

    const onPointerDown = (e) => {
      if (isBookOpen || settled) return;
      if (e.target.closest('button, input')) return;
      const pt = toLogicalCoords(e.clientX, e.clientY);

      if (state === 'ingredients') {
        // Find top-most un-added card under pointer (card size 240x86, hit zone >= 56px)
        for (let i = cards.length - 1; i >= 0; i -= 1) {
          const c = cards[i];
          if (c.added) continue;
          if (Math.abs(pt.x - c.x) <= 122 && Math.abs(pt.y - c.y) <= 46) {
            draggingCard = c;
            activePointerId = e.pointerId;
            c.x = pt.x;
            c.y = pt.y;
            try {
              root.setPointerCapture(e.pointerId);
            } catch (_) {}
            return;
          }
        }
      } else if (state === 'stir') {
        if (activePointerId === null) {
          activePointerId = e.pointerId;
          isHoldingStir = true;
          try {
            root.setPointerCapture(e.pointerId);
          } catch (_) {}
        }
      } else if (state === 'qte') {
        handleQteTap();
      }
    };

    const onPointerMove = (e) => {
      if (activePointerId === null || e.pointerId !== activePointerId) return;
      if (state === 'ingredients' && draggingCard) {
        const pt = toLogicalCoords(e.clientX, e.clientY);
        draggingCard.x = clamp(pt.x, 80, LOGICAL_W - 80);
        draggingCard.y = clamp(pt.y, 150, LOGICAL_H - 120);
      }
    };

    const onPointerEnd = (e) => {
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

      if (state === 'ingredients' && draggingCard) {
        const c = draggingCard;
        draggingCard = null;
        activePointerId = null;

        // Check if dropped inside cauldron circle center (448, 700), r = 160
        const dist = Math.hypot(c.x - CAULDRON_X, c.y - CAULDRON_Y);
        if (dist <= CAULDRON_R) {
          if (c.required) {
            c.added = true;
            addedCount += 1;
            updateHud();
            if (addedCount >= 3) {
              state = 'stir';
              stateBeforeBook = 'stir';
              stirElapsedS = 0;
              stirValue = STIR_START_VAL;
              stirGreenTimeS = 0;
              isHoldingStir = false;
              updateHud();
            }
          } else {
            // Wrong ingredient returns to its slot; 3rd mistake fails the round (06_MINIGAMES.md L7)
            c.x = c.homeX;
            c.y = c.homeY;
            c.shakeMs = 450;
            mistakes += 1;
            updateHud();
            if (mistakes >= MAX_MISTAKES_PER_ROUND) {
              finishPotions(false, 'failed');
            }
          }
        } else {
          c.x = c.homeX;
          c.y = c.homeY;
        }
        return;
      }

      activePointerId = null;
      isHoldingStir = false;
    };

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerEnd);
    root.addEventListener('pointercancel', onPointerEnd);
    root.addEventListener('lostpointercapture', onPointerEnd);

    const cleanup = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      document.removeEventListener('visibilitychange', onVisibilityChange);
      signal?.removeEventListener?.('abort', onAbort);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerEnd);
      root.removeEventListener('pointercancel', onPointerEnd);
      root.removeEventListener('lostpointercapture', onPointerEnd);
      if (root.parentNode === container) {
        container.removeChild(root);
      }
    };

    function finishPotions(ok, reason) {
      if (settled) return;
      settled = true;
      state = 'complete';
      const avgScore =
        ok && roundScores.length > 0
          ? clamp(Math.round(roundScores.reduce((a, b) => a + b, 0) / roundScores.length), 0, 100)
          : ok
          ? 100
          : 0;
      const elapsedMs = Math.max(0, Math.round(performance.now() - startWallTs - pausedMs));
      cleanup();
      resolve({
        ok,
        score: avgScore,
        details: {
          reason,
          rounds: [...roundScores],
          elapsedMs,
        },
      });
    }

    quickWinBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      roundScores.splice(0, roundScores.length, 95, 95);
      finishPotions(true, 'completed');
    });

    quickFailBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      finishPotions(false, 'failed');
    });

    const onVisibilityChange = () => {
      if (document.hidden) {
        lastFrameTs = null;
        isHoldingStir = false;
        if (pauseStartedAt === null) pauseStartedAt = performance.now();
      } else {
        if (pauseStartedAt !== null && !isBookOpen) {
          pausedMs += performance.now() - pauseStartedAt;
          pauseStartedAt = null;
        }
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
      if (isBookOpen) return;

      for (const c of cards) {
        if (c.shakeMs > 0) c.shakeMs = Math.max(0, c.shakeMs - dt * 1000);
      }

      if (state === 'stir') {
        stirElapsedS += dt;
        const delta = isHoldingStir ? STIR_RISE_RATE * dt : -STIR_FALL_RATE * dt;
        stirValue = clamp(stirValue + delta, 0, 1);
        if (stirValue >= STIR_GREEN_MIN && stirValue <= STIR_GREEN_MAX) {
          stirGreenTimeS += dt;
        }
        updateHud();

        if (stirElapsedS >= STIR_DURATION_S) {
          if (stirGreenTimeS >= STIR_TARGET_GREEN_S) {
            state = 'qte';
            qteElapsedS = 0;
            qtePos = 0.15;
            qteDir = 1;
            isHoldingStir = false;
            activePointerId = null;
            updateHud();
          } else {
            finishPotions(false, 'failed');
          }
        }
      } else if (state === 'qte') {
        qteElapsedS += dt;
        qtePos += qteDir * QTE_SPEED * dt;
        if (qtePos >= 1) {
          qtePos = 2 - qtePos;
          qteDir = -1;
        } else if (qtePos <= 0) {
          qtePos = -qtePos;
          qteDir = 1;
        }
        updateHud();

        if (qteElapsedS >= QTE_WINDOW_S) {
          finishPotions(false, 'failed');
        }
      } else if (state === 'roundResult') {
        roundResultTimerS += dt;
        if (roundResultTimerS >= 1.1) {
          if (roundIndex === 0) {
            startRound(1);
          } else {
            finishPotions(true, 'completed');
          }
        }
      }
    }

    function drawIngredientSilhouette(kind, cx, cy) {
      ctx.save();
      ctx.translate(cx, cy);
      if (kind === 'herb') {
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.ellipse(-6, 0, 10, 5, -0.5, 0, Math.PI * 2);
        ctx.ellipse(6, -3, 10, 5, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#166534';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 12);
        ctx.lineTo(0, -10);
        ctx.stroke();
      } else if (kind === 'powder') {
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(-14, 10);
        ctx.lineTo(0, -10);
        ctx.lineTo(14, 10);
        ctx.closePath();
        ctx.fill();
      } else {
        // feather / vial silhouette
        ctx.fillStyle = '#c084fc';
        ctx.beginPath();
        ctx.roundRect(-8, -6, 16, 18, 5);
        ctx.fill();
        ctx.fillStyle = '#e9d5ff';
        ctx.fillRect(-4, -12, 8, 6);
      }
      ctx.restore();
    }

    function renderScene(now) {
      ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

      // 1. Draw Cauldron at (448, 700), r = 160 using Bézier curves + ellipse liquid + 20 bubbles (06_MINIGAMES.md L11)
      ctx.save();
      ctx.translate(CAULDRON_X, CAULDRON_Y);

      // Drop zone target ring
      ctx.strokeStyle =
        state === 'ingredients' && draggingCard
          ? 'rgba(250, 204, 21, 0.85)'
          : 'rgba(216, 180, 103, 0.35)';
      ctx.lineWidth = state === 'ingredients' && draggingCard ? 4 : 2;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, CAULDRON_R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Fire glow underneath cauldron
      const fireGrad = ctx.createRadialGradient(0, 135, 10, 0, 135, 130);
      fireGrad.addColorStop(0, 'rgba(251, 146, 60, 0.75)');
      fireGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.28)');
      fireGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.ellipse(0, 135, 125, 42, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bézier iron cauldron body
      const bodyGrad = ctx.createRadialGradient(-35, -10, 20, 0, 20, 165);
      bodyGrad.addColorStop(0, '#475569');
      bodyGrad.addColorStop(0.55, '#1e293b');
      bodyGrad.addColorStop(1, '#090d16');
      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(-132, -55);
      ctx.bezierCurveTo(-175, 45, -125, 140, 0, 142);
      ctx.bezierCurveTo(125, 140, 175, 45, 132, -55);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cauldron rim
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.ellipse(0, -55, 138, 34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Potion liquid ellipse inside rim
      const liquidHue = roundIndex === 0 ? (addedCount >= 3 ? '#38bdf8' : '#818cf8') : addedCount >= 3 ? '#34d399' : '#fbbf24';
      ctx.fillStyle = liquidHue;
      ctx.beginPath();
      ctx.ellipse(0, -55, 122, 26, 0, 0, Math.PI * 2);
      ctx.fill();

      // 20 rising bubbles inside cauldron
      for (const b of bubbles) {
        const cycle = ((now / 1000) * (b.speed / 40) + b.phase) % 1;
        const bx = b.xOffset * 0.85;
        const by = -45 - cycle * 65;
        const alpha = (1 - cycle) * 0.85;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#fde68a';
      ctx.font = '700 16px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        state === 'ingredients'
          ? `Котёл (${addedCount} / 3 ингр.)`
          : state === 'stir'
          ? isHoldingStir
            ? '🔥 Нагрев и помешивание…'
            : 'Удерживайте палец/мышь на котле!'
          : 'Котёл кипит',
        0,
        45
      );
      ctx.restore();

      // 2. Draw 6 Ingredient Cards during 'ingredients' stage
      if (state === 'ingredients' || state === 'book') {
        for (const c of cards) {
          if (c.added) continue;
          ctx.save();
          const shakeX = c.shakeMs > 0 ? Math.sin(now / 28) * 8 : 0;
          ctx.translate(c.x + shakeX, c.y);

          ctx.fillStyle = draggingCard === c ? 'rgba(30, 41, 59, 0.98)' : 'rgba(15, 23, 42, 0.92)';
          ctx.strokeStyle = c.shakeMs > 0 ? '#ef4444' : draggingCard === c ? '#facc15' : '#d8b467';
          ctx.lineWidth = draggingCard === c ? 3 : 2;
          ctx.beginPath();
          ctx.roundRect(-118, -42, 236, 84, 14);
          ctx.fill();
          ctx.stroke();

          drawIngredientSilhouette(c.kind, -86, 0);

          ctx.fillStyle = '#f8fafc';
          ctx.font = '700 15px Georgia, serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(c.name, -56, 0, 164);
          ctx.restore();
        }
      }

      // 3. Draw Stir Gauge (0..1, green zone 0.25..0.75) during 'stir' stage
      if (state === 'stir') {
        const barX = 148;
        const barY = 270;
        const barW = 600;
        const barH = 44;

        ctx.save();
        ctx.fillStyle = 'rgba(10, 16, 30, 0.92)';
        ctx.strokeStyle = '#d8b467';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, barH, 12);
        ctx.fill();
        ctx.stroke();

        // Green zone 0.25..0.75
        const gzX = barX + STIR_GREEN_MIN * barW;
        const gzW = (STIR_GREEN_MAX - STIR_GREEN_MIN) * barW;
        ctx.fillStyle = 'rgba(34, 197, 94, 0.38)';
        ctx.fillRect(gzX, barY + 3, gzW, barH - 6);

        // Current stirValue marker
        const markerX = barX + stirValue * barW;
        ctx.fillStyle =
          stirValue >= STIR_GREEN_MIN && stirValue <= STIR_GREEN_MAX ? '#4ade80' : '#f87171';
        ctx.beginPath();
        ctx.roundRect(markerX - 8, barY - 6, 16, barH + 12, 6);
        ctx.fill();

        ctx.fillStyle = '#fde68a';
        ctx.font = '700 17px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `Зелёная зона (0.25–0.75): набрано ${stirGreenTimeS.toFixed(1)} с из ${STIR_TARGET_GREEN_S} с`,
          barX + barW / 2,
          barY - 18
        );
        ctx.restore();
      }

      // 4. Draw QTE Runner (0..1, green zone 0.32..0.68) during 'qte' stage
      if (state === 'qte') {
        const barX = 148;
        const barY = 270;
        const barW = 600;
        const barH = 48;

        ctx.save();
        ctx.fillStyle = 'rgba(10, 16, 30, 0.92)';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(barX, barY, barW, barH, 12);
        ctx.fill();
        ctx.stroke();

        // Green zone 0.32..0.68
        const gzX = barX + QTE_GREEN_MIN * barW;
        const gzW = (QTE_GREEN_MAX - QTE_GREEN_MIN) * barW;
        ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
        ctx.fillRect(gzX, barY + 3, gzW, barH - 6);

        // Center optimal line (0.5)
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(barX + barW * 0.5, barY);
        ctx.lineTo(barX + barW * 0.5, barY + barH);
        ctx.stroke();

        // Runner indicator
        const rx = barX + qtePos * barW;
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(rx - 7, barY - 7, 14, barH + 14, 6);
        ctx.fill();

        ctx.fillStyle = '#fde68a';
        ctx.font = '700 18px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('Поймайте бегунок в зелёной зоне одним нажатием!', barX + barW / 2, barY - 18);
        ctx.restore();
      }
    }

    startRound(0);

    const tick = (now) => {
      if (settled) return;
      if (!document.hidden && !isBookOpen) {
        if (lastFrameTs === null) lastFrameTs = now;
        const dt = clamp((now - lastFrameTs) / 1000, 0, 0.05);
        lastFrameTs = now;
        if (dt > 0) {
          stepSimulation(dt);
        }
      }
      if (!settled) {
        renderScene(now);
        rafId = window.requestAnimationFrame(tick);
      }
    };

    renderScene(performance.now());
    rafId = window.requestAnimationFrame(tick);
  });
}

export default { run };

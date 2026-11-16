/**
 * Declarative cutscene definitions (docs/05_CUTSCENES.md).
 * Logical coordinate space: 896×1200, origin top-left (0, 0).
 * Layer z-order: background 0..9, figures 10..19, overlay 30, particles 40, UI 100.
 * All 12 canonical IDs from 05_CUTSCENES.md are exported (plus aliases cs11 -> cs06_duel_demo, cs12 -> cs06_lake).
 */

export const CUTSCENE_IDS = Object.freeze([
  'cs01',
  'cs02',
  'cs03',
  'cs04',
  'cs05',
  'cs06',
  'cs07',
  'cs08',
  'cs09',
  'cs10',
  'cs06_duel_demo',
  'cs06_lake',
]);

export const CUTSCENES = Object.freeze({
  cs01: {
    id: 'cs01',
    title: 'Хогвартс-экспресс (P38)',
    kind: 'train',
    durationMs: 8000,
    caption: 'Хогвартс-экспресс мчится на север. Тео крепко спит, а Азалия задумчиво смотрит в окно…',
    layers: [
      { id: 'bg_train', assetId: 'bg_train', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'fig_theo', assetId: 'theo', z: 12, x: 250, y: 1200, width: 590, opacity: 0.94 },
      { id: 'fig_azalia', assetId: 'azalia', z: 15, x: 640, y: 1200, width: 590, opacity: 1 },
    ],
    timeline: [
      { atMs: 0, durationMs: 8000, target: 'bg_train', effect: 'sway', from: -0.6, to: 0.6 },
      { atMs: 0, durationMs: 8000, target: 'bg_train', effect: 'trainShake', from: -2, to: 2 },
      { atMs: 0, durationMs: 8000, target: 'fig_azalia', effect: 'breathe', from: 1, to: 1.008 },
      { atMs: 0, durationMs: 8000, target: 'fig_theo', effect: 'breathe', from: 1, to: 1.006 },
      { atMs: 1000, durationMs: 7000, target: 'particles', effect: 'particles', kind: 'zzz', count: 3, x: 260, y: 420 },
      { atMs: 2000, durationMs: 5000, target: 'overlay', effect: 'windowGlint', from: 0, to: 0.28 },
    ],
    fallback: {
      background: 'bg_train',
      characters: ['theo', 'azalia'],
    },
    next: 'scene02',
  },

  cs02: {
    id: 'cs02',
    title: 'Ночь и утро в спальне Пуффендуя (D261)',
    durationMs: 7000,
    caption: 'За круглым окном гаснут звёзды, ночь сменяется утром, и первый солнечный луч ложится на лицо Азалии…',
    layers: [
      { id: 'bg_night', assetId: 'bg_hufflepuff_dorm', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'bg_morning', assetId: 'bg_hufflepuff_dorm_morning', z: 1, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      { id: 'fig_azalia', assetId: 'azalia', z: 14, x: 448, y: 1260, width: 720, opacity: 1 },
    ],
    timeline: [
      { atMs: 0, durationMs: 7000, target: 'fig_azalia', effect: 'breathe', from: 1, to: 1.008 },
      { atMs: 0, durationMs: 3200, target: 'particles', effect: 'particles', kind: 'stars', count: 24 },
      { atMs: 0, durationMs: 3000, target: 'camera', effect: 'camera', from: { zoom: 1, rot: 0 }, to: { zoom: 1.04, rot: 0.4 } },
      { atMs: 3000, durationMs: 3000, target: 'bg_morning', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 5800, durationMs: 1200, target: 'overlay', effect: 'glow', from: 0, to: 0.12 },
    ],
    fallback: {
      background: 'bg_hufflepuff_dorm_morning',
      characters: ['azalia'],
    },
    next: 'scene03',
  },

  cs03: {
    id: 'cs03',
    title: 'Неделя дружбы в Хогвартсе (D364–367)',
    durationMs: 9000,
    caption: 'Проходит неделя: Азалия, Тео, Гарри, Рон, Гермиона и близнецы Уизли становятся неразлучной компанией…',
    layers: [
      { id: 'bg_corr', assetId: 'bg_corridor', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'bg_hall', assetId: 'bg_great_hall', z: 1, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      { id: 'bg_yard', assetId: 'bg_fountain_day', z: 2, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      { id: 'fig_theo', assetId: 'theo', z: 12, x: 190, y: 1200, width: 520, opacity: 1 },
      { id: 'fig_harry', assetId: 'harry', z: 13, x: 370, y: 1200, width: 500, opacity: 1 },
      { id: 'fig_ron', assetId: 'ron', z: 14, x: 550, y: 1200, width: 500, opacity: 1 },
      { id: 'fig_hermione', assetId: 'hermione', z: 15, x: 360, y: 1200, width: 500, opacity: 0 },
      { id: 'fig_twins', assetId: 'twins', z: 16, x: 540, y: 1200, width: 540, opacity: 0 },
      { id: 'fig_azalia', assetId: 'azalia', z: 17, x: 720, y: 1200, width: 520, opacity: 1 },
    ],
    timeline: [
      { atMs: 300, durationMs: 560, target: 'fig_theo', effect: 'bounce', from: 0, to: -8 },
      { atMs: 600, durationMs: 560, target: 'fig_ron', effect: 'bounce', from: 0, to: -8 },
      { atMs: 2850, durationMs: 300, target: 'bg_hall', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 2850, durationMs: 300, target: 'fig_ron', effect: 'crossfade', from: 1, to: 0 },
      { atMs: 2850, durationMs: 300, target: 'fig_hermione', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 2850, durationMs: 300, target: 'fig_twins', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 3400, durationMs: 560, target: 'fig_twins', effect: 'bounce', from: 0, to: -8 },
      { atMs: 3700, durationMs: 560, target: 'fig_azalia', effect: 'bounce', from: 0, to: -8 },
      { atMs: 5850, durationMs: 300, target: 'bg_yard', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 5850, durationMs: 300, target: 'fig_harry', effect: 'crossfade', from: 1, to: 0 },
      { atMs: 6400, durationMs: 560, target: 'fig_hermione', effect: 'bounce', from: 0, to: -8 },
      { atMs: 6700, durationMs: 560, target: 'fig_theo', effect: 'bounce', from: 0, to: -8 },
      { atMs: 6000, durationMs: 3000, target: 'overlay', effect: 'glow', from: 0, to: 0.16 },
    ],
    fallback: {
      background: 'bg_fountain_day',
      characters: ['theo', 'hermione', 'twins', 'azalia'],
    },
    next: 'scene04',
  },

  cs04: {
    id: 'cs04',
    title: 'Роуз в компании и взгляды Димы (D489–492)',
    durationMs: 9000,
    caption: 'Роуз входит в их компанию, а в коридорах и библиотеке взгляды Азалии и Димы пересекаются всё чаще…',
    layers: [
      { id: 'bg_lib', assetId: 'bg_library', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'bg_corr', assetId: 'bg_corridor', z: 1, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      { id: 'bg_hall', assetId: 'bg_great_hall', z: 2, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      { id: 'fig_dima_back', assetId: 'dima', z: 11, x: -100, y: 1200, width: 470, opacity: 0 },
      { id: 'fig_hermione', assetId: 'hermione', z: 13, x: 210, y: 1200, width: 510, opacity: 1 },
      { id: 'fig_harry', assetId: 'harry', z: 14, x: 210, y: 1200, width: 510, opacity: 0 },
      { id: 'fig_rose', assetId: 'rose', z: 15, x: 450, y: 1200, width: 530, opacity: 1 },
      { id: 'fig_azalia', assetId: 'azalia', z: 16, x: 690, y: 1200, width: 540, opacity: 1 },
    ],
    timeline: [
      { atMs: 0, durationMs: 9000, target: 'fig_azalia', effect: 'breathe', from: 1, to: 1.008 },
      { atMs: 400, durationMs: 560, target: 'fig_rose', effect: 'bounce', from: 0, to: -8 },
      { atMs: 2850, durationMs: 300, target: 'bg_corr', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 2850, durationMs: 300, target: 'fig_hermione', effect: 'crossfade', from: 1, to: 0 },
      { atMs: 3000, durationMs: 300, target: 'fig_dima_back', effect: 'crossfade', from: 0, to: 0.88 },
      { atMs: 3000, durationMs: 3000, target: 'fig_dima_back', effect: 'translateX', from: -100, to: 996 },
      { atMs: 5850, durationMs: 300, target: 'fig_dima_back', effect: 'crossfade', from: 0.88, to: 0 },
      { atMs: 5850, durationMs: 300, target: 'bg_hall', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 5850, durationMs: 300, target: 'fig_harry', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 6200, durationMs: 2800, target: 'fig_azalia', effect: 'focus', from: 0.85, to: 1 },
      { atMs: 6200, durationMs: 2800, target: 'overlay', effect: 'glow', from: 0, to: 0.18 },
    ],
    fallback: {
      background: 'bg_great_hall',
      characters: ['harry', 'rose', 'azalia'],
    },
    next: 'scene05',
  },

  cs05: {
    id: 'cs05',
    title: 'Лунный свет у фонтана и силуэт в окне (D609)',
    durationMs: 8000,
    caption: 'Успокоившись, Азалия читает у фонтана при свете луны, из окна замка на неё смотрит Дима, а затем она крепко засыпает в своей постели…',
    layers: [
      { id: 'bg_fountain', assetId: 'bg_fountain_night', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'bg_dorm', assetId: 'bg_hufflepuff_dorm', z: 2, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      {
        id: 'fig_dima_window',
        assetId: 'dima',
        z: 12,
        x: 760,
        y: 310,
        width: 170,
        opacity: 0.86,
        clipRect: { x: 720, y: 120, w: 80, h: 120 },
      },
      { id: 'fig_azalia', assetId: 'azalia', z: 15, x: 430, y: 1220, width: 640, opacity: 1 },
    ],
    timeline: [
      { atMs: 0, durationMs: 5000, target: 'camera', effect: 'panZoom', from: 1, to: 1.035 },
      { atMs: 0, durationMs: 8000, target: 'fig_azalia', effect: 'breathe', from: 1, to: 1.008 },
      { atMs: 0, durationMs: 5000, target: 'particles', effect: 'particles', kind: 'fireflies', count: 30 },
      { atMs: 4800, durationMs: 600, target: 'fig_dima_window', effect: 'crossfade', from: 0.86, to: 0 },
      { atMs: 5000, durationMs: 1200, target: 'bg_dorm', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 5200, durationMs: 2800, target: 'overlay', effect: 'glow', from: 0.08, to: 0.2 },
    ],
    fallback: {
      background: 'bg_hufflepuff_dorm',
      characters: ['azalia'],
    },
    next: 'scene06',
  },

  cs06: {
    id: 'cs06',
    title: 'Дорога в библиотеку с Роуз (D735)',
    durationMs: 3000,
    caption: 'Роуз, смеясь, идёт вместе с Азалией по коридору в библиотеку…',
    layers: [
      { id: 'bg_corr', assetId: 'bg_corridor', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'fig_rose', assetId: 'rose', z: 14, x: 310, y: 1200, width: 570, opacity: 1 },
      { id: 'fig_azalia', assetId: 'azalia', z: 15, x: 580, y: 1200, width: 570, opacity: 1 },
    ],
    timeline: [
      { atMs: 0, durationMs: 3000, target: 'fig_rose', effect: 'translateX', from: 280, to: 340 },
      { atMs: 0, durationMs: 3000, target: 'fig_azalia', effect: 'translateX', from: 550, to: 610 },
      { atMs: 0, durationMs: 3000, target: 'fig_rose', effect: 'breathe', from: 1, to: 1.008 },
      { atMs: 0, durationMs: 3000, target: 'fig_azalia', effect: 'breathe', from: 1, to: 1.008 },
      { atMs: 400, durationMs: 560, target: 'fig_rose', effect: 'bounce', from: 0, to: -8 },
    ],
    fallback: {
      background: 'bg_corridor',
      characters: ['rose', 'azalia'],
    },
    next: 'scene07',
  },

  cs07: {
    id: 'cs07',
    title: 'Решительный шаг Тео к фонтану (D794)',
    durationMs: 3000,
    caption: 'Тео решительно шагает по коридору к выходу во двор, сжимая кулаки…',
    layers: [
      { id: 'bg_corr', assetId: 'bg_corridor', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'fig_theo', assetId: 'theo', z: 15, x: 448, y: 1200, width: 660, opacity: 1 },
    ],
    timeline: [
      { atMs: 0, durationMs: 3000, target: 'fig_theo', effect: 'translateX', from: 448, to: 520 },
      { atMs: 0, durationMs: 3000, target: 'camera', effect: 'camera', from: { zoom: 1, rot: 0 }, to: { zoom: 1.02, rot: -0.4 } },
      { atMs: 300, durationMs: 450, target: 'fig_theo', effect: 'shake', from: -3, to: 3 },
    ],
    fallback: {
      background: 'bg_corridor',
      characters: ['theo'],
    },
    next: 'scene08',
  },

  cs08: {
    id: 'cs08',
    title: 'Библиотека, объятия и две спальни (D868)',
    durationMs: 10000,
    caption: 'Азалия и Дима сидят рядом над одной книгой в библиотеке, обнимаются в коридоре, а ночью в двух спальнях не могут уснуть и счастливо улыбаются в темноту…',
    layers: [
      { id: 'bg_lib', assetId: 'bg_library', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'bg_corr', assetId: 'bg_corridor', z: 1, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      { id: 'fig_dima', assetId: 'dima', z: 14, x: 340, y: 1200, width: 590, opacity: 1 },
      { id: 'fig_azalia', assetId: 'azalia', z: 15, x: 560, y: 1200, width: 590, opacity: 1 },
      {
        id: 'split_dorms',
        kind: 'split',
        z: 20,
        opacity: 0,
        left: {
          backgroundId: 'bg_hufflepuff_dorm',
          characterId: 'azalia',
          charX: 224,
          charY: 1240,
          charWidth: 520,
        },
        right: {
          backgroundId: 'bg_ravenclaw_dorm',
          characterId: 'dima',
          charX: 224,
          charY: 1240,
          charWidth: 520,
        },
      },
    ],
    timeline: [
      { atMs: 0, durationMs: 3000, target: 'camera', effect: 'panZoom', from: 1, to: 1.03 },
      { atMs: 2800, durationMs: 400, target: 'bg_corr', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 3000, durationMs: 2000, target: 'fig_dima', effect: 'translateX', from: 340, to: 395 },
      { atMs: 3000, durationMs: 2000, target: 'fig_azalia', effect: 'translateX', from: 560, to: 505 },
      { atMs: 3000, durationMs: 2000, target: 'camera', effect: 'camera', from: { zoom: 1.02, rot: 0 }, to: { zoom: 1.05, rot: 0.4 } },
      { atMs: 4800, durationMs: 600, target: 'split_dorms', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 5000, durationMs: 5000, target: 'split_dorms', effect: 'breathe', from: 1, to: 1.008 },
      { atMs: 5000, durationMs: 5000, target: 'particles', effect: 'particles', kind: 'stars', count: 24 },
      { atMs: 5200, durationMs: 4800, target: 'overlay', effect: 'glow', from: 0.08, to: 0.22 },
    ],
    fallback: {
      background: 'bg_hufflepuff_dorm',
      characters: ['azalia', 'dima'],
    },
    next: 'scene09',
  },

  cs09: {
    id: 'cs09',
    title: 'Прогулка всей компанией с Димой (D935)',
    durationMs: 5000,
    caption: 'Азалия и Тео выходят из гостиной, продолжая смеяться, их встречает вся компания — и вместе с ними идёт Дима…',
    layers: [
      { id: 'bg_corr', assetId: 'bg_corridor', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      // Background layer figures (z: 11..13, slightly smaller and softer)
      { id: 'fig_twins_bg', assetId: 'twins', z: 11, x: 150, y: 1190, width: 430, opacity: 0 },
      { id: 'fig_rose_bg', assetId: 'rose', z: 12, x: 448, y: 1190, width: 420, opacity: 0 },
      { id: 'fig_hermione_bg', assetId: 'hermione', z: 13, x: 755, y: 1190, width: 420, opacity: 0 },
      // Up to 3 foreground figures (z: 15..17) per 05_CUTSCENES.md L29
      { id: 'fig_theo', assetId: 'theo', z: 15, x: 230, y: 1200, width: 540, opacity: 0 },
      { id: 'fig_azalia', assetId: 'azalia', z: 16, x: 465, y: 1200, width: 540, opacity: 0 },
      { id: 'fig_dima', assetId: 'dima', z: 17, x: 695, y: 1200, width: 540, opacity: 0 },
    ],
    timeline: [
      { atMs: 0, durationMs: 1200, target: 'fig_theo', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 200, durationMs: 1200, target: 'fig_azalia', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 500, durationMs: 1300, target: 'fig_dima', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 700, durationMs: 1200, target: 'fig_twins_bg', effect: 'crossfade', from: 0, to: 0.68 },
      { atMs: 850, durationMs: 1200, target: 'fig_rose_bg', effect: 'crossfade', from: 0, to: 0.68 },
      { atMs: 1000, durationMs: 1200, target: 'fig_hermione_bg', effect: 'crossfade', from: 0, to: 0.68 },
      { atMs: 2000, durationMs: 3000, target: 'bg_corr', effect: 'sway', from: -0.5, to: 0.5 },
      { atMs: 2100, durationMs: 560, target: 'fig_theo', effect: 'bounce', from: 0, to: -8 },
      { atMs: 2600, durationMs: 560, target: 'fig_azalia', effect: 'bounce', from: 0, to: -8 },
      { atMs: 3100, durationMs: 560, target: 'fig_dima', effect: 'bounce', from: 0, to: -8 },
      { atMs: 2000, durationMs: 3000, target: 'overlay', effect: 'glow', from: 0, to: 0.2 },
    ],
    fallback: {
      background: 'bg_corridor',
      characters: ['theo', 'azalia', 'dima'],
    },
    next: 'scene10',
  },

  cs10: {
    id: 'cs10',
    title: 'Прогулка по замку и чистый пергамент (D978)',
    durationMs: 8000,
    caption: 'Азалия и Дима гуляют по замку, держась за руки, Дима кружит её на руках, а затем на столе появляется чистый лист пергамента и волшебная палочка…',
    layers: [
      { id: 'bg_corr', assetId: 'bg_corridor', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'bg_parchment', assetId: 'bg_parchment_clean', z: 2, x: 0, y: 0, width: 896, height: 1200, opacity: 0 },
      { id: 'fig_dima', assetId: 'dima', z: 14, x: 340, y: 1220, width: 620, opacity: 1 },
      { id: 'fig_azalia', assetId: 'azalia', z: 15, x: 555, y: 1220, width: 620, opacity: 1 },
      { id: 'prop_wand', assetId: 'magic_wand', z: 18, x: 448, y: 1040, width: 460, opacity: 0 },
    ],
    timeline: [
      { atMs: 0, durationMs: 3000, target: 'fig_dima', effect: 'translateX', from: 320, to: 380 },
      { atMs: 0, durationMs: 3000, target: 'fig_azalia', effect: 'translateX', from: 575, to: 515 },
      { atMs: 3000, durationMs: 3000, target: 'camera', effect: 'camera', from: { zoom: 1.01, rot: 0 }, to: { zoom: 1.06, rot: 0.6 } },
      { atMs: 3000, durationMs: 3000, target: 'fig_dima', effect: 'translateX', from: 380, to: 415 },
      { atMs: 3000, durationMs: 3000, target: 'fig_azalia', effect: 'translateX', from: 515, to: 480 },
      { atMs: 3000, durationMs: 2800, target: 'overlay', effect: 'glow', from: 0.08, to: 0.34 },
      { atMs: 3000, durationMs: 3000, target: 'particles', effect: 'particles', kind: 'sparks', count: 50 },
      { atMs: 5600, durationMs: 800, target: 'fig_dima', effect: 'crossfade', from: 1, to: 0 },
      { atMs: 5600, durationMs: 800, target: 'fig_azalia', effect: 'crossfade', from: 1, to: 0 },
      { atMs: 5800, durationMs: 1000, target: 'bg_parchment', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 6200, durationMs: 1200, target: 'prop_wand', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 6000, durationMs: 1200, target: 'camera', effect: 'camera', from: { zoom: 1.06, rot: 0.6 }, to: { zoom: 1, rot: 0 } },
    ],
    fallback: {
      background: 'bg_parchment_clean',
      characters: [],
    },
    next: 'parchment',
  },

  cs06_duel_demo: {
    id: 'cs06_duel_demo',
    title: 'Постановочная дуэль Тео и Димы (D633–637)',
    durationMs: 6000,
    caption: 'Тео и Дима выходят на дуэльный помост: вспышки заклинаний разлетаются в стороны, но в финале Тео оказывается проворнее…',
    layers: [
      { id: 'bg_duel', assetId: 'bg_dueling_hall', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'fig_theo', assetId: 'theo', z: 14, x: 270, y: 1200, width: 580, opacity: 1 },
      { id: 'fig_dima', assetId: 'dima', z: 15, x: 630, y: 1200, width: 580, opacity: 1 },
    ],
    timeline: [
      { atMs: 0, durationMs: 2000, target: 'fig_theo', effect: 'focus', from: 0.85, to: 1 },
      { atMs: 1000, durationMs: 2000, target: 'fig_dima', effect: 'focus', from: 0.85, to: 1 },
      { atMs: 2000, durationMs: 2200, target: 'particles', effect: 'particles', kind: 'sparks', count: 50 },
      { atMs: 2000, durationMs: 2000, target: 'overlay', effect: 'glow', from: 0.05, to: 0.32 },
      { atMs: 2200, durationMs: 450, target: 'fig_theo', effect: 'shake', from: -3, to: 3 },
      { atMs: 2800, durationMs: 450, target: 'fig_dima', effect: 'shake', from: -3, to: 3 },
      { atMs: 4000, durationMs: 1800, target: 'fig_theo', effect: 'translateX', from: 270, to: 360 },
      { atMs: 4000, durationMs: 1800, target: 'fig_dima', effect: 'translateX', from: 630, to: 540 },
      { atMs: 4200, durationMs: 1500, target: 'overlay', effect: 'glow', from: 0.32, to: 0.12 },
    ],
    fallback: {
      background: 'bg_dueling_hall',
      characters: ['theo', 'dima', 'azalia'],
    },
    next: 's06_l637_0',
  },

  cs06_lake: {
    id: 'cs06_lake',
    title: 'У Чёрного озера: полёт Малфоя в воду (D670–684)',
    durationMs: 6000,
    caption: 'Не поднимая головы от книги, Дима взмахивает палочкой — Малфой с громким плеском летит в Чёрное озеро, а Пэнси бросается его спасать…',
    layers: [
      { id: 'bg_lake', assetId: 'bg_black_lake', z: 0, x: 0, y: 0, width: 896, height: 1200, opacity: 1 },
      { id: 'fig_dima', assetId: 'dima', z: 13, x: 220, y: 1200, width: 540, opacity: 1 },
      { id: 'fig_malfoy', assetId: 'malfoy', z: 14, x: 520, y: 1200, width: 540, opacity: 1 },
      { id: 'fig_pansy', assetId: 'pansy', z: 15, x: 960, y: 1200, width: 540, opacity: 0 },
      { id: 'fig_azalia', assetId: 'azalia', z: 16, x: 730, y: 1200, width: 520, opacity: 0.92 },
    ],
    timeline: [
      { atMs: 0, durationMs: 2000, target: 'camera', effect: 'panZoom', from: 1, to: 1.035 },
      { atMs: 2000, durationMs: 1800, target: 'fig_malfoy', effect: 'translateY', from: 1200, to: 1320 },
      { atMs: 2000, durationMs: 1800, target: 'fig_malfoy', effect: 'crossfade', from: 1, to: 0 },
      { atMs: 2200, durationMs: 2400, target: 'particles', effect: 'particles', kind: 'ripples', count: 18, x: 520, y: 880 },
      { atMs: 3800, durationMs: 800, target: 'fig_pansy', effect: 'crossfade', from: 0, to: 1 },
      { atMs: 3800, durationMs: 1400, target: 'fig_pansy', effect: 'translateX', from: 920, to: 520 },
      { atMs: 4200, durationMs: 560, target: 'fig_pansy', effect: 'bounce', from: 0, to: -8 },
      { atMs: 5200, durationMs: 700, target: 'fig_pansy', effect: 'crossfade', from: 1, to: 0 },
    ],
    fallback: {
      background: 'bg_black_lake',
      characters: ['dima', 'azalia'],
    },
    next: 's06_l686_0',
  },
});

const ALIAS_MAP = Object.freeze({
  cs11: 'cs06_duel_demo',
  cs12: 'cs06_lake',
  staging06_01: 'cs06_duel_demo',
  staging06_02: 'cs06_lake',
});

export function getCutsceneDefinition(idOrDef) {
  if (!idOrDef) return null;
  if (typeof idOrDef === 'object' && idOrDef.id) return idOrDef;
  const key = String(idOrDef);
  const canonical = ALIAS_MAP[key] || key;
  return CUTSCENES[canonical] || null;
}

export default CUTSCENES;

export default {
  "schemaVersion": 1,
  "id": "scene04",
  "start": "s04_enter",
  "nodes": [
    {
      "id": "s04_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "dima",
        "azalia"
      ],
      "source": [],
      "next": "s04_l375_0",
      "emotions": {}
    },
    {
      "id": "s04_l375_0",
      "type": "narration",
      "text": "Коридор. Азалия идёт на урок, прижимая к груди учебники. За спиной слышатся шаги. Она чувствует на себе взгляд: знакомый, странный. Азалия оборачивается. Позади идёт Дима, и в его взгляде снова то же самое.",
      "source": [
        {
          "file": "dialogues",
          "line": 375,
          "start": 0,
          "end": 206
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "effect": "glow",
          "to": 0.16,
          "durationMs": 800
        }
      ],
      "next": "s04_l377_0",
      "emotions": {}
    },
    {
      "id": "s04_l377_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (разворачиваясь, с угрозой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 377,
          "start": 0,
          "end": 36
        }
      ],
      "next": "s04_l377_1",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s04_l377_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Слушай, а ты...»",
      "source": [
        {
          "file": "dialogues",
          "line": 377,
          "start": 36,
          "end": 53
        }
      ],
      "next": "s04_l379_0",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s04_l379_0",
      "type": "narration",
      "text": "Договорить она не успевает: впереди, у стены, собралась толпа. Шёпот, смешки. Азалия, нахмурившись, решает посмотреть, что там, и протискивается вперёд. Дима остаётся позади, затерявшись среди учеников.",
      "source": [
        {
          "file": "dialogues",
          "line": 379,
          "start": 0,
          "end": 202
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 450
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 500
        },
        {
          "target": "rose",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 500,
          "delayMs": 80
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 500,
          "delayMs": 140
        }
      ],
      "next": "s04_l381_0",
      "emotions": {}
    },
    {
      "id": "s04_l381_0",
      "type": "narration",
      "text": "В центре круга Малфой прижимает к стене Роуз. Её учебники рассыпаны по полу. Палочка Малфоя направлена прямо на неё.",
      "source": [
        {
          "file": "dialogues",
          "line": 381,
          "start": 0,
          "end": 116
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "rose",
            "malfoy"
          ],
          "durationMs": 600
        },
        {
          "target": "malfoy",
          "effect": "focus"
        }
      ],
      "next": "s04_l383_0",
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_l383_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Малфой: ",
      "source": [
        {
          "file": "dialogues",
          "line": 383,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s04_l383_1",
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_l383_1",
      "type": "dialogue",
      "speaker": "malfoy",
      "text": "«Ты смеялась надо мной, да?»",
      "source": [
        {
          "file": "dialogues",
          "line": 383,
          "start": 8,
          "end": 36
        }
      ],
      "next": "s04_l385_0",
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_l385_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (вскинув подбородок): ",
      "source": [
        {
          "file": "dialogues",
          "line": 385,
          "start": 0,
          "end": 27
        }
      ],
      "next": "s04_l385_1",
      "emotions": {
        "rose": "defiant"
      }
    },
    {
      "id": "s04_l385_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Я смеялась над анекдотом, Малфой. Не всё в мире про тебя».",
      "source": [
        {
          "file": "dialogues",
          "line": 385,
          "start": 27,
          "end": 86
        }
      ],
      "next": "s04_l387_0",
      "emotions": {
        "rose": "defiant"
      }
    },
    {
      "id": "s04_l387_0",
      "type": "narration",
      "text": "Толпа ахает.",
      "source": [
        {
          "file": "dialogues",
          "line": 387,
          "start": 0,
          "end": 12
        }
      ],
      "cues": [
        {
          "effect": "shake",
          "amplitude": 3,
          "durationMs": 450
        }
      ],
      "next": "s04_l389_0",
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_l389_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Малфой (багровея): ",
      "source": [
        {
          "file": "dialogues",
          "line": 389,
          "start": 0,
          "end": 19
        }
      ],
      "next": "s04_l389_1",
      "emotions": {
        "rose": "fear",
        "malfoy": "angry"
      }
    },
    {
      "id": "s04_l389_1",
      "type": "dialogue",
      "speaker": "malfoy",
      "text": "«Сейчас посмотрим, кому будет смешно».",
      "source": [
        {
          "file": "dialogues",
          "line": 389,
          "start": 19,
          "end": 57
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        }
      ],
      "next": "s04_l391_0",
      "emotions": {
        "rose": "fear",
        "malfoy": "angry"
      }
    },
    {
      "id": "s04_l391_0",
      "type": "narration",
      "text": "Он замахивается, собираясь избить её.",
      "source": [
        {
          "file": "dialogues",
          "line": 391,
          "start": 0,
          "end": 37
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "tilt",
          "amplitude": -3,
          "durationMs": 450
        }
      ],
      "next": "choice04_01",
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "choice04_01",
      "type": "choice",
      "text": "ВЫБОР: что делает Азалия?",
      "options": [
        {
          "id": "choice04_01_1",
          "text": "Вариант 1. Пройти мимо и пойти на урок.",
          "effects": [
            {
              "variable": "roseFriend",
              "value": false
            }
          ],
          "next": "s04_l396_1",
          "source": [
            {
              "file": "dialogues",
              "line": 394,
              "start": 0,
              "end": 39
            }
          ]
        },
        {
          "id": "choice04_01_2",
          "text": "Вариант 2. Заступиться за Роуз (будет дуэль).",
          "effects": [
            {
              "variable": "roseFriend",
              "value": true
            }
          ],
          "next": "s04_l398_1",
          "source": [
            {
              "file": "dialogues",
              "line": 395,
              "start": 0,
              "end": 45
            }
          ]
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 393,
          "start": 0,
          "end": 25
        }
      ],
      "next": null,
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_l396_1",
      "type": "narration",
      "text": "Азалия отводит взгляд и идёт дальше. За спиной слышится смех толпы и дрожащий голос Роуз, который постепенно стихает. Азалия не оборачивается. Подружиться с Роуз она теперь не сможет.",
      "cues": [
        {
          "target": "rose",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 550
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 550
        },
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 396,
          "start": 16,
          "end": 199
        }
      ],
      "next": "s04_end",
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_l398_1",
      "type": "narration",
      "text": "Азалия выхватывает палочку.",
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 550
        },
        {
          "target": "azalia",
          "effect": "focus"
        },
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 398,
          "start": 16,
          "end": 43
        }
      ],
      "next": "s04_l399_0",
      "emotions": {
        "rose": "fear",
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s04_l399_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 399,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s04_l399_1",
      "emotions": {
        "azalia": "wand_draw",
        "rose": "fear"
      }
    },
    {
      "id": "s04_l399_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Эй, Малфой. Оставь её».",
      "source": [
        {
          "file": "dialogues",
          "line": 399,
          "start": 8,
          "end": 32
        }
      ],
      "next": "s04_l401_0",
      "emotions": {
        "azalia": "wand_draw",
        "rose": "fear"
      }
    },
    {
      "id": "s04_l401_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Малфой (оборачиваясь, с кривой усмешкой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 401,
          "start": 0,
          "end": 42
        }
      ],
      "next": "s04_l401_1",
      "emotions": {
        "rose": "fear",
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s04_l401_1",
      "type": "dialogue",
      "speaker": "malfoy",
      "text": "«О, Блэк. Решила встрять? Ну давай. Покажи, чему тебя научили в твоём Пуффендуе».",
      "source": [
        {
          "file": "dialogues",
          "line": 401,
          "start": 42,
          "end": 123
        }
      ],
      "next": "s04_l403_0",
      "emotions": {
        "rose": "fear",
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s04_l403_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 403,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s04_l403_1",
      "emotions": {
        "rose": "fear",
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s04_l403_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«С удовольствием».",
      "source": [
        {
          "file": "dialogues",
          "line": 403,
          "start": 8,
          "end": 26
        }
      ],
      "next": "s04_l405_0",
      "emotions": {
        "rose": "fear",
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s04_l405_0",
      "type": "narration",
      "text": "Толпа расступается, освобождая место. Роуз, тяжело дыша, прижимается к стене.",
      "source": [
        {
          "file": "dialogues",
          "line": 405,
          "start": 0,
          "end": 77
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 480
        }
      ],
      "next": "s04_game_duel",
      "emotions": {
        "rose": "fear",
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s04_game_duel",
      "type": "minigame",
      "gameId": "duel",
      "params": {},
      "resultRoutes": {
        "success": "s04_duel_win_set",
        "failure": "s04_duel_lose_set"
      },
      "source": [
        {
          "file": "dialogues",
          "line": 407,
          "start": 0,
          "end": 83
        }
      ],
      "next": null,
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_duel_win_set",
      "type": "set",
      "effects": [
        {
          "variable": "duelScene4Win",
          "value": true
        }
      ],
      "source": [],
      "next": "s04_l409_0",
      "emotions": {}
    },
    {
      "id": "s04_l409_0",
      "type": "narration",
      "text": "Малфой падает на пол, палочка вылетает у него из руки. Повисает тишина. Азалия оборачивается к толпе.",
      "source": [
        {
          "file": "dialogues",
          "line": 409,
          "start": 0,
          "end": 101
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "shake",
          "amplitude": 5,
          "durationMs": 450
        },
        {
          "target": "malfoy",
          "effect": "tilt",
          "amplitude": 3.5,
          "hold": true,
          "durationMs": 500
        }
      ],
      "next": "s04_l411_0",
      "emotions": {}
    },
    {
      "id": "s04_l411_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (очень громко): ",
      "source": [
        {
          "file": "dialogues",
          "line": 411,
          "start": 0,
          "end": 23
        }
      ],
      "next": "s04_l411_1",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s04_l411_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Что вы тут встали, как в цирке?! Выступление окончено! А теперь пошли прочь отсюда!»",
      "source": [
        {
          "file": "dialogues",
          "line": 411,
          "start": 23,
          "end": 108
        }
      ],
      "cues": [
        {
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s04_l413_0",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s04_l413_0",
      "type": "narration",
      "text": "Толпа разбегается. Малфой, подобрав палочку, бросает на Азалию злобный взгляд и убирается следом.",
      "source": [
        {
          "file": "dialogues",
          "line": 413,
          "start": 0,
          "end": 97
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 300
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 500
        },
        {
          "target": "rose",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 500,
          "delayMs": 120
        }
      ],
      "next": "s04_l415_0",
      "emotions": {}
    },
    {
      "id": "s04_l415_0",
      "type": "narration",
      "text": "Азалия подходит к Роуз и протягивает ей руку.",
      "source": [
        {
          "file": "dialogues",
          "line": 415,
          "start": 0,
          "end": 45
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "rose",
            "azalia"
          ],
          "durationMs": 600
        }
      ],
      "next": "s04_l417_0",
      "emotions": {}
    },
    {
      "id": "s04_l417_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 417,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s04_l417_1",
      "emotions": {
        "azalia": "worried"
      }
    },
    {
      "id": "s04_l417_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ты в порядке?»",
      "source": [
        {
          "file": "dialogues",
          "line": 417,
          "start": 8,
          "end": 23
        }
      ],
      "next": "s04_l419_0",
      "emotions": {
        "azalia": "worried"
      }
    },
    {
      "id": "s04_l419_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (слабо смеясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 419,
          "start": 0,
          "end": 21
        }
      ],
      "next": "s04_l419_1",
      "emotions": {
        "rose": "relief"
      }
    },
    {
      "id": "s04_l419_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Вроде да. Спасибо. Правда».",
      "source": [
        {
          "file": "dialogues",
          "line": 419,
          "start": 21,
          "end": 49
        }
      ],
      "next": "s04_l421_0",
      "emotions": {
        "rose": "relief"
      }
    },
    {
      "id": "s04_l421_0",
      "type": "narration",
      "text": "И тут Азалия снова чувствует это. До боли знакомое ощущение чужого взгляда. Но на этот раз в нём есть что-то ещё: беспокойство о ней. Азалия оборачивается. В опустевшем коридоре стоит Дима.",
      "source": [
        {
          "file": "dialogues",
          "line": 421,
          "start": 0,
          "end": 189
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 550
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 520
        },
        {
          "target": "dima",
          "effect": "focus",
          "delayMs": 160
        },
        {
          "effect": "glow",
          "to": 0.2,
          "durationMs": 800
        }
      ],
      "next": "choice04_02",
      "emotions": {
        "dima": "worried"
      }
    },
    {
      "id": "choice04_02",
      "type": "choice",
      "text": "ВЫБОР: что сказать?",
      "options": [
        {
          "id": "choice04_02_1",
          "text": "Вариант 1. «Что?» (спокойно)",
          "effects": [],
          "next": "s04_l427_1",
          "source": [
            {
              "file": "dialogues",
              "line": 424,
              "start": 0,
              "end": 28
            }
          ]
        },
        {
          "id": "choice04_02_2",
          "text": "Вариант 2. «А ты тут хули палишь?»",
          "effects": [],
          "next": "s04_l427_1",
          "source": [
            {
              "file": "dialogues",
              "line": 425,
              "start": 0,
              "end": 34
            }
          ]
        },
        {
          "id": "choice04_02_3",
          "text": "Вариант 3. Промолчать.",
          "effects": [],
          "next": "s04_l433_1",
          "source": [
            {
              "file": "dialogues",
              "line": 426,
              "start": 0,
              "end": 22
            }
          ]
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 423,
          "start": 0,
          "end": 19
        }
      ],
      "next": null,
      "emotions": {}
    },
    {
      "id": "s04_l427_1",
      "type": "narration",
      "text": "Дима тихо смеётся.",
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "target": "dima",
          "effect": "bounce",
          "amplitude": 6,
          "durationMs": 480
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 427,
          "start": 21,
          "end": 39
        }
      ],
      "next": "s04_l429_0",
      "emotions": {}
    },
    {
      "id": "s04_l429_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 429,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s04_l429_1",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s04_l429_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Прости. Просто ты была бесподобной, вот я и залюбовался и не смог отвести взгляд. Ладно, встретимся ещё как-нибудь. Хорошего тебе дня».",
      "source": [
        {
          "file": "dialogues",
          "line": 429,
          "start": 6,
          "end": 142
        }
      ],
      "next": "s04_l431_0",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s04_l431_0",
      "type": "narration",
      "text": "Он уходит, оставляя Азалию в ступоре. Несколько секунд она хлопает глазами, потом опоминается, убеждается, что с Роуз всё в порядке, и вместе они идут в Большой зал.",
      "source": [
        {
          "file": "dialogues",
          "line": 431,
          "start": 0,
          "end": 165
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 520
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 600
        }
      ],
      "next": "s04_enter_great_hall",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s04_l433_1",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (очень тепло и очень спокойно): ",
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "effect": "glow",
          "to": 0.25,
          "durationMs": 700
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 433,
          "start": 16,
          "end": 53
        }
      ],
      "next": "s04_l433_2",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s04_l433_2",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Ты была бесподобной».",
      "source": [
        {
          "file": "dialogues",
          "line": 433,
          "start": 53,
          "end": 75
        }
      ],
      "next": "s04_l435_0",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s04_l435_0",
      "type": "narration",
      "text": "Это звучит так тихо, что Азалии кажется, будто ей послышалось. Дима просто уходит. Азалия моргает, убеждается, что с Роуз всё в порядке, и они вместе идут в Большой зал.",
      "source": [
        {
          "file": "dialogues",
          "line": 435,
          "start": 0,
          "end": 169
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 520
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 600
        }
      ],
      "next": "s04_enter_great_hall",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s04_duel_lose_set",
      "type": "set",
      "effects": [
        {
          "variable": "duelScene4Win",
          "value": false
        }
      ],
      "source": [],
      "next": "s04_l439_0",
      "emotions": {}
    },
    {
      "id": "s04_l439_0",
      "type": "narration",
      "text": "Заклинание Малфоя бьёт Азалию в грудь. Она падает, палочка отлетает в сторону. Мир плывёт. Малфой, тяжело дыша, поднимает палочку для последнего удара.",
      "source": [
        {
          "file": "dialogues",
          "line": 439,
          "start": 0,
          "end": 151
        }
      ],
      "cues": [
        {
          "effect": "shake",
          "amplitude": 5,
          "durationMs": 450
        },
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -3.5,
          "hold": true,
          "durationMs": 550
        }
      ],
      "next": "s04_l440_0",
      "emotions": {
        "rose": "fear"
      }
    },
    {
      "id": "s04_l440_0",
      "type": "narration",
      "text": "И тут позади вспыхивает свет: Малфоя отшвыривает к стене сильным заклинанием.",
      "source": [
        {
          "file": "dialogues",
          "line": 440,
          "start": 0,
          "end": 77
        }
      ],
      "cues": [
        {
          "effect": "glow",
          "to": 0.35,
          "durationMs": 500
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480
        },
        {
          "target": "malfoy",
          "effect": "shake",
          "amplitude": 6,
          "durationMs": 450,
          "delayMs": 120
        }
      ],
      "next": "s04_l442_0",
      "emotions": {
        "dima": "serious",
        "rose": "fear"
      }
    },
    {
      "id": "s04_l442_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (холодно, тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 442,
          "start": 0,
          "end": 22
        }
      ],
      "next": "s04_l442_1",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s04_l442_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Пошёл вон».",
      "source": [
        {
          "file": "dialogues",
          "line": 442,
          "start": 22,
          "end": 34
        }
      ],
      "next": "s04_l444_0",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s04_l444_0",
      "type": "narration",
      "text": "Малфой, увидев его лицо, не спорит. Он вскакивает и бежит прочь, не оглядываясь. Дима бросается к Азалии, подхватывает её на руки и бегом несёт в медпункт. Роуз, собрав учебники, мчится следом.",
      "source": [
        {
          "file": "dialogues",
          "line": 444,
          "start": 0,
          "end": 193
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 450
        },
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 450
        },
        {
          "effect": "group",
          "targets": [
            "dima",
            "azalia"
          ],
          "durationMs": 600,
          "delayMs": 100
        },
        {
          "effect": "camera",
          "to": 1.05,
          "durationMs": 900
        }
      ],
      "next": "s04_enter_hospital",
      "emotions": {
        "malfoy": "fear"
      }
    },
    {
      "id": "s04_enter_hospital",
      "type": "scene",
      "action": "enter",
      "background": "bg_hospital",
      "characters": [
        "dima",
        "azalia"
      ],
      "source": [],
      "next": "s04_l446_0",
      "emotions": {}
    },
    {
      "id": "s04_l446_0",
      "type": "narration",
      "text": "Медпункт. Азалия медленно открывает глаза. Рядом сидит Дима, и вид у него такой, будто он не спал неделю.",
      "source": [
        {
          "file": "dialogues",
          "line": 446,
          "start": 0,
          "end": 105
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        }
      ],
      "next": "s04_l448_0",
      "emotions": {}
    },
    {
      "id": "s04_l448_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 448,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s04_l448_1",
      "emotions": {
        "dima": "relief"
      }
    },
    {
      "id": "s04_l448_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Слава богу».",
      "source": [
        {
          "file": "dialogues",
          "line": 448,
          "start": 13,
          "end": 26
        }
      ],
      "next": "s04_l450_0",
      "emotions": {
        "dima": "relief"
      }
    },
    {
      "id": "s04_l450_0",
      "type": "narration",
      "text": "Он выдыхает и проводит рукой по лицу.",
      "source": [
        {
          "file": "dialogues",
          "line": 450,
          "start": 0,
          "end": 37
        }
      ],
      "next": "s04_l452_0",
      "emotions": {
        "dima": "relief"
      }
    },
    {
      "id": "s04_l452_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 452,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s04_l452_1",
      "emotions": {
        "dima": "tired"
      }
    },
    {
      "id": "s04_l452_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Ты себя хорошо чувствуешь?»",
      "source": [
        {
          "file": "dialogues",
          "line": 452,
          "start": 6,
          "end": 34
        }
      ],
      "next": "s04_l454_0",
      "emotions": {
        "dima": "tired"
      }
    },
    {
      "id": "s04_l454_0",
      "type": "narration",
      "text": "Азалия в ступоре просто кивает.",
      "source": [
        {
          "file": "dialogues",
          "line": 454,
          "start": 0,
          "end": 31
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -1.8,
          "durationMs": 480
        }
      ],
      "next": "s04_l456_0",
      "emotions": {}
    },
    {
      "id": "s04_l456_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 456,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s04_l456_1",
      "emotions": {}
    },
    {
      "id": "s04_l456_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Я этому очень рад».",
      "source": [
        {
          "file": "dialogues",
          "line": 456,
          "start": 6,
          "end": 26
        }
      ],
      "next": "s04_l458_0",
      "emotions": {}
    },
    {
      "id": "s04_l458_0",
      "type": "narration",
      "text": "Он встаёт, поправляет ей одеяло и смущённо улыбается.",
      "source": [
        {
          "file": "dialogues",
          "line": 458,
          "start": 0,
          "end": 53
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "tilt",
          "amplitude": 1.8,
          "durationMs": 500
        },
        {
          "effect": "glow",
          "to": 0.2,
          "durationMs": 700
        }
      ],
      "next": "s04_l460_0",
      "emotions": {
        "dima": "blush"
      }
    },
    {
      "id": "s04_l460_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 460,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s04_l460_1",
      "emotions": {
        "dima": "blush"
      }
    },
    {
      "id": "s04_l460_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Что ж... выздоравливай. Мы тебе с Роуз оставили фруктиков, возьми с собой».",
      "source": [
        {
          "file": "dialogues",
          "line": 460,
          "start": 6,
          "end": 82
        }
      ],
      "next": "s04_l462_0",
      "emotions": {
        "dima": "blush"
      }
    },
    {
      "id": "s04_l462_0",
      "type": "narration",
      "text": "На тумбочке стоит вазочка с яблоками и виноградом.",
      "source": [
        {
          "file": "dialogues",
          "line": 462,
          "start": 0,
          "end": 50
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 500
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 600
        }
      ],
      "next": "s04_enter_great_hall",
      "emotions": {}
    },
    {
      "id": "s04_enter_great_hall",
      "type": "scene",
      "action": "enter",
      "background": "bg_great_hall",
      "characters": [
        "rose",
        "azalia"
      ],
      "source": [],
      "next": "s04_l467_0",
      "emotions": {}
    },
    {
      "id": "s04_l467_0",
      "type": "narration",
      "text": "Большой зал. Гул голосов, звон посуды. Азалия и Роуз сидят рядом за столом Пуффендуя.",
      "source": [
        {
          "file": "dialogues",
          "line": 467,
          "start": 0,
          "end": 85
        }
      ],
      "next": "s04_l469_0",
      "emotions": {}
    },
    {
      "id": "s04_l469_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 469,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s04_l469_1",
      "emotions": {}
    },
    {
      "id": "s04_l469_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Азалия... Спасибо тебе. Правда. Если бы не ты...»",
      "source": [
        {
          "file": "dialogues",
          "line": 469,
          "start": 6,
          "end": 56
        }
      ],
      "next": "s04_l471_0",
      "emotions": {}
    },
    {
      "id": "s04_l471_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (отмахиваясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 471,
          "start": 0,
          "end": 22
        }
      ],
      "next": "s04_l471_1",
      "emotions": {}
    },
    {
      "id": "s04_l471_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Брось. Малфой в последнее время какой-то ненормальный, и не стоит об этом думать. Он просто чувствует себя самым крутым из-за того, что с ним дружат старшие слизеринцы».",
      "source": [
        {
          "file": "dialogues",
          "line": 471,
          "start": 22,
          "end": 192
        }
      ],
      "next": "s04_l473_0",
      "emotions": {}
    },
    {
      "id": "s04_l473_0",
      "type": "narration",
      "text": "Они переглядываются и начинают смеяться. К ним подходит компания Азалии.",
      "source": [
        {
          "file": "dialogues",
          "line": 473,
          "start": 0,
          "end": 72
        }
      ],
      "cues": [
        {
          "target": "ron",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480
        },
        {
          "target": "twins",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480,
          "delayMs": 100
        }
      ],
      "next": "s04_l475_0",
      "emotions": {}
    },
    {
      "id": "s04_l475_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Рон: ",
      "source": [
        {
          "file": "dialogues",
          "line": 475,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s04_l475_1",
      "emotions": {}
    },
    {
      "id": "s04_l475_1",
      "type": "dialogue",
      "speaker": "ron",
      "text": "«Вы чего так смеётесь?»",
      "source": [
        {
          "file": "dialogues",
          "line": 475,
          "start": 5,
          "end": 28
        }
      ],
      "next": "s04_l477_0",
      "emotions": {}
    },
    {
      "id": "s04_l477_0",
      "type": "narration",
      "text": "Азалия и Роуз рассказывают о том, что произошло. Лица ребят мрачнеют.",
      "source": [
        {
          "file": "dialogues",
          "line": 477,
          "start": 0,
          "end": 69
        }
      ],
      "next": "s04_l479_0",
      "emotions": {
        "ron": "frown"
      }
    },
    {
      "id": "s04_l479_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Фред: ",
      "source": [
        {
          "file": "dialogues",
          "line": 479,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s04_l479_1",
      "emotions": {
        "ron": "frown"
      }
    },
    {
      "id": "s04_l479_1",
      "type": "dialogue",
      "speaker": "fred",
      "text": "«Значит, так. Идём добивать Малфоя».",
      "source": [
        {
          "file": "dialogues",
          "line": 479,
          "start": 6,
          "end": 42
        }
      ],
      "next": "s04_l481_0",
      "emotions": {
        "ron": "frown"
      }
    },
    {
      "id": "s04_l481_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Джордж: ",
      "source": [
        {
          "file": "dialogues",
          "line": 481,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s04_l481_1",
      "emotions": {}
    },
    {
      "id": "s04_l481_1",
      "type": "dialogue",
      "speaker": "george",
      "text": "«Мы уже специальные бомбы придумали».",
      "source": [
        {
          "file": "dialogues",
          "line": 481,
          "start": 8,
          "end": 45
        }
      ],
      "next": "s04_l483_0",
      "emotions": {}
    },
    {
      "id": "s04_l483_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Гермиона (встревоженно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 483,
          "start": 0,
          "end": 25
        }
      ],
      "cues": [
        {
          "target": "ron",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 400
        },
        {
          "target": "hermione",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 450,
          "delayMs": 60
        }
      ],
      "next": "s04_l483_1",
      "emotions": {
        "hermione": "worried"
      }
    },
    {
      "id": "s04_l483_1",
      "type": "dialogue",
      "speaker": "hermione",
      "text": "«Только давайте обойдёмся без...»",
      "source": [
        {
          "file": "dialogues",
          "line": 483,
          "start": 25,
          "end": 58
        }
      ],
      "next": "s04_l485_0",
      "emotions": {
        "hermione": "worried"
      }
    },
    {
      "id": "s04_l485_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (смеясь, но уверенно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 485,
          "start": 0,
          "end": 28
        }
      ],
      "next": "s04_l485_1",
      "emotions": {}
    },
    {
      "id": "s04_l485_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Всё в порядке. В следующий раз я и сама смогу ему шею свернуть».",
      "source": [
        {
          "file": "dialogues",
          "line": 485,
          "start": 28,
          "end": 93
        }
      ],
      "next": "s04_l487_0",
      "emotions": {}
    },
    {
      "id": "s04_l487_0",
      "type": "narration",
      "text": "Секунда молчания. И вся компания взрывается хохотом. Они ещё минут десять смеются, перебивая друг друга, и наконец расходятся по урокам.",
      "source": [
        {
          "file": "dialogues",
          "line": 487,
          "start": 0,
          "end": 136
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520
        },
        {
          "target": "twins",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520,
          "delayMs": 140
        }
      ],
      "next": "s04_l489_0",
      "emotions": {
        "azalia": "smile",
        "ron": "laugh"
      }
    },
    {
      "id": "s04_l489_0",
      "type": "narration",
      "text": "Затемнение. Прошла ещё неделя.",
      "source": [
        {
          "file": "dialogues",
          "line": 489,
          "start": 0,
          "end": 30
        }
      ],
      "next": "s04_l490_0",
      "emotions": {}
    },
    {
      "id": "s04_l490_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Анимация: кадры сменяют друг друга. Роуз и Азалия склонились над одним учебником. Роуз что-то шепчет Гарри на ухо, и тот краснеет. Роуз спорит с Роном, и оба хохочут. Вся компания сидит за одним столом. За эту неделю Роуз стала лучшей подругой Азалии и хорошим другом для остальных, и вошла в их компанию.",
      "cues": [
        {
          "target": "rose",
          "effect": "focus"
        },
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 490,
          "start": 0,
          "end": 305
        }
      ],
      "next": "s04_l491_0",
      "emotions": {}
    },
    {
      "id": "s04_l491_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Параллельно в кадре мелькает Дима: в коридоре, в библиотеке, в Большом зале. Их взгляды пересекаются, Азалия отводит глаза, а потом сама не знает почему оглядывается. Они стали чаще встречаться. Дошло до того, что при встрече они даже здороваются.",
      "cues": [
        {
          "target": "twins",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 420
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 500,
          "delayMs": 80
        },
        {
          "target": "dima",
          "effect": "focus",
          "delayMs": 180
        },
        {
          "effect": "glow",
          "to": 0.22,
          "durationMs": 800
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 491,
          "start": 0,
          "end": 247
        }
      ],
      "next": "s04_l492_0",
      "emotions": {}
    },
    {
      "id": "s04_cs04",
      "type": "cutscene",
      "cutsceneId": "cs04_rose_dima",
      "source": [],
      "next": "s04_end",
      "emotions": {}
    },
    {
      "id": "s04_l492_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 492,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s04_l492_1",
      "emotions": {
        "azalia": "shy"
      }
    },
    {
      "id": "s04_l492_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Почему я так странно на него реагирую?..»",
      "source": [
        {
          "file": "dialogues",
          "line": 492,
          "start": 14,
          "end": 56
        }
      ],
      "next": "s04_cs04",
      "emotions": {
        "azalia": "shy"
      }
    },
    {
      "id": "s04_end",
      "type": "end",
      "nextScene": "scene05",
      "source": [],
      "next": null,
      "emotions": {}
    }
  ],
  "sourceLedger": [
    {
      "line": 371,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "metadata",
          "text": "Сцена 4. Роуз"
        }
      ],
      "original": "Сцена 4. Роуз"
    },
    {
      "line": 372,
      "parts": [],
      "original": ""
    },
    {
      "line": 373,
      "parts": [
        {
          "start": 0,
          "end": 35,
          "kind": "metadata",
          "text": "Где: коридор, медпункт, Большой зал"
        }
      ],
      "original": "Где: коридор, медпункт, Большой зал"
    },
    {
      "line": 374,
      "parts": [],
      "original": ""
    },
    {
      "line": 375,
      "parts": [
        {
          "start": 0,
          "end": 206,
          "kind": "narration",
          "node": "s04_l375_0",
          "field": "text"
        }
      ],
      "original": "Коридор. Азалия идёт на урок, прижимая к груди учебники. За спиной слышатся шаги. Она чувствует на себе взгляд: знакомый, странный. Азалия оборачивается. Позади идёт Дима, и в его взгляде снова то же самое."
    },
    {
      "line": 376,
      "parts": [],
      "original": ""
    },
    {
      "line": 377,
      "parts": [
        {
          "start": 0,
          "end": 36,
          "kind": "stage",
          "node": "s04_l377_0",
          "field": "annotation"
        },
        {
          "start": 36,
          "end": 53,
          "kind": "dialogue",
          "node": "s04_l377_1",
          "field": "text"
        }
      ],
      "original": "Азалия (разворачиваясь, с угрозой): «Слушай, а ты...»"
    },
    {
      "line": 378,
      "parts": [],
      "original": ""
    },
    {
      "line": 379,
      "parts": [
        {
          "start": 0,
          "end": 202,
          "kind": "narration",
          "node": "s04_l379_0",
          "field": "text"
        }
      ],
      "original": "Договорить она не успевает: впереди, у стены, собралась толпа. Шёпот, смешки. Азалия, нахмурившись, решает посмотреть, что там, и протискивается вперёд. Дима остаётся позади, затерявшись среди учеников."
    },
    {
      "line": 380,
      "parts": [],
      "original": ""
    },
    {
      "line": 381,
      "parts": [
        {
          "start": 0,
          "end": 116,
          "kind": "narration",
          "node": "s04_l381_0",
          "field": "text"
        }
      ],
      "original": "В центре круга Малфой прижимает к стене Роуз. Её учебники рассыпаны по полу. Палочка Малфоя направлена прямо на неё."
    },
    {
      "line": 382,
      "parts": [],
      "original": ""
    },
    {
      "line": 383,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s04_l383_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 36,
          "kind": "dialogue",
          "node": "s04_l383_1",
          "field": "text"
        }
      ],
      "original": "Малфой: «Ты смеялась надо мной, да?»"
    },
    {
      "line": 384,
      "parts": [],
      "original": ""
    },
    {
      "line": 385,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "stage",
          "node": "s04_l385_0",
          "field": "annotation"
        },
        {
          "start": 27,
          "end": 86,
          "kind": "dialogue",
          "node": "s04_l385_1",
          "field": "text"
        }
      ],
      "original": "Роуз (вскинув подбородок): «Я смеялась над анекдотом, Малфой. Не всё в мире про тебя»."
    },
    {
      "line": 386,
      "parts": [],
      "original": ""
    },
    {
      "line": 387,
      "parts": [
        {
          "start": 0,
          "end": 12,
          "kind": "narration",
          "node": "s04_l387_0",
          "field": "text"
        }
      ],
      "original": "Толпа ахает."
    },
    {
      "line": 388,
      "parts": [],
      "original": ""
    },
    {
      "line": 389,
      "parts": [
        {
          "start": 0,
          "end": 19,
          "kind": "stage",
          "node": "s04_l389_0",
          "field": "annotation"
        },
        {
          "start": 19,
          "end": 57,
          "kind": "dialogue",
          "node": "s04_l389_1",
          "field": "text"
        }
      ],
      "original": "Малфой (багровея): «Сейчас посмотрим, кому будет смешно»."
    },
    {
      "line": 390,
      "parts": [],
      "original": ""
    },
    {
      "line": 391,
      "parts": [
        {
          "start": 0,
          "end": 37,
          "kind": "narration",
          "node": "s04_l391_0",
          "field": "text"
        }
      ],
      "original": "Он замахивается, собираясь избить её."
    },
    {
      "line": 392,
      "parts": [],
      "original": ""
    },
    {
      "line": 393,
      "parts": [
        {
          "start": 0,
          "end": 25,
          "kind": "choice",
          "node": "choice04_01",
          "field": "text"
        }
      ],
      "original": "ВЫБОР: что делает Азалия?"
    },
    {
      "line": 394,
      "parts": [
        {
          "start": 0,
          "end": 39,
          "kind": "option",
          "node": "choice04_01",
          "option": "choice04_01_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. Пройти мимо и пойти на урок."
    },
    {
      "line": 395,
      "parts": [
        {
          "start": 0,
          "end": 45,
          "kind": "option",
          "node": "choice04_01",
          "option": "choice04_01_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. Заступиться за Роуз (будет дуэль)."
    },
    {
      "line": 396,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "Если выбрать 1. "
        },
        {
          "start": 16,
          "end": 199,
          "kind": "narration",
          "node": "s04_l396_1",
          "field": "text"
        },
        {
          "start": 199,
          "end": 647,
          "kind": "metadata",
          "text": " Продолжение в этой ветке будет таким что Роуз просто нету в их компании и Азалия все сама но не будет момента с подарком для Тео потому что Тео просто услышит что Азалия в библиотеку чтобы узнать что Дима ей сказал он подслушает и потом после услышанного что оно означает подойдет к Азалии начнет с ней разговаривать но не обидеться а диалог с димой будет такой же кроме того что он будет зол на Азалию и так далее и все перейдет сразу к 10 сцене."
        }
      ],
      "original": "Если выбрать 1. Азалия отводит взгляд и идёт дальше. За спиной слышится смех толпы и дрожащий голос Роуз, который постепенно стихает. Азалия не оборачивается. Подружиться с Роуз она теперь не сможет. Продолжение в этой ветке будет таким что Роуз просто нету в их компании и Азалия все сама но не будет момента с подарком для Тео потому что Тео просто услышит что Азалия в библиотеку чтобы узнать что Дима ей сказал он подслушает и потом после услышанного что оно означает подойдет к Азалии начнет с ней разговаривать но не обидеться а диалог с димой будет такой же кроме того что он будет зол на Азалию и так далее и все перейдет сразу к 10 сцене."
    },
    {
      "line": 397,
      "parts": [],
      "original": ""
    },
    {
      "line": 398,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "Если выбрать 2. "
        },
        {
          "start": 16,
          "end": 43,
          "kind": "narration",
          "node": "s04_l398_1",
          "field": "text"
        }
      ],
      "original": "Если выбрать 2. Азалия выхватывает палочку."
    },
    {
      "line": 399,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s04_l399_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 32,
          "kind": "dialogue",
          "node": "s04_l399_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Эй, Малфой. Оставь её»."
    },
    {
      "line": 400,
      "parts": [],
      "original": ""
    },
    {
      "line": 401,
      "parts": [
        {
          "start": 0,
          "end": 42,
          "kind": "stage",
          "node": "s04_l401_0",
          "field": "annotation"
        },
        {
          "start": 42,
          "end": 123,
          "kind": "dialogue",
          "node": "s04_l401_1",
          "field": "text"
        }
      ],
      "original": "Малфой (оборачиваясь, с кривой усмешкой): «О, Блэк. Решила встрять? Ну давай. Покажи, чему тебя научили в твоём Пуффендуе»."
    },
    {
      "line": 402,
      "parts": [],
      "original": ""
    },
    {
      "line": 403,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s04_l403_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 26,
          "kind": "dialogue",
          "node": "s04_l403_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «С удовольствием»."
    },
    {
      "line": 404,
      "parts": [],
      "original": ""
    },
    {
      "line": 405,
      "parts": [
        {
          "start": 0,
          "end": 77,
          "kind": "narration",
          "node": "s04_l405_0",
          "field": "text"
        }
      ],
      "original": "Толпа расступается, освобождая место. Роуз, тяжело дыша, прижимается к стене."
    },
    {
      "line": 406,
      "parts": [],
      "original": ""
    },
    {
      "line": 407,
      "parts": [
        {
          "start": 0,
          "end": 83,
          "kind": "metadata",
          "text": "Дуэль. Мини-игра: нужно применять правильные заклинания. Механику обсудим отдельно."
        }
      ],
      "original": "Дуэль. Мини-игра: нужно применять правильные заклинания. Механику обсудим отдельно."
    },
    {
      "line": 408,
      "parts": [
        {
          "start": 0,
          "end": 20,
          "kind": "metadata",
          "text": "Если Азалия победила"
        }
      ],
      "original": "Если Азалия победила"
    },
    {
      "line": 409,
      "parts": [
        {
          "start": 0,
          "end": 101,
          "kind": "narration",
          "node": "s04_l409_0",
          "field": "text"
        }
      ],
      "original": "Малфой падает на пол, палочка вылетает у него из руки. Повисает тишина. Азалия оборачивается к толпе."
    },
    {
      "line": 410,
      "parts": [],
      "original": ""
    },
    {
      "line": 411,
      "parts": [
        {
          "start": 0,
          "end": 23,
          "kind": "stage",
          "node": "s04_l411_0",
          "field": "annotation"
        },
        {
          "start": 23,
          "end": 108,
          "kind": "dialogue",
          "node": "s04_l411_1",
          "field": "text"
        }
      ],
      "original": "Азалия (очень громко): «Что вы тут встали, как в цирке?! Выступление окончено! А теперь пошли прочь отсюда!»"
    },
    {
      "line": 412,
      "parts": [],
      "original": ""
    },
    {
      "line": 413,
      "parts": [
        {
          "start": 0,
          "end": 97,
          "kind": "narration",
          "node": "s04_l413_0",
          "field": "text"
        }
      ],
      "original": "Толпа разбегается. Малфой, подобрав палочку, бросает на Азалию злобный взгляд и убирается следом."
    },
    {
      "line": 414,
      "parts": [],
      "original": ""
    },
    {
      "line": 415,
      "parts": [
        {
          "start": 0,
          "end": 45,
          "kind": "narration",
          "node": "s04_l415_0",
          "field": "text"
        }
      ],
      "original": "Азалия подходит к Роуз и протягивает ей руку."
    },
    {
      "line": 416,
      "parts": [],
      "original": ""
    },
    {
      "line": 417,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s04_l417_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 23,
          "kind": "dialogue",
          "node": "s04_l417_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ты в порядке?»"
    },
    {
      "line": 418,
      "parts": [],
      "original": ""
    },
    {
      "line": 419,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "stage",
          "node": "s04_l419_0",
          "field": "annotation"
        },
        {
          "start": 21,
          "end": 49,
          "kind": "dialogue",
          "node": "s04_l419_1",
          "field": "text"
        }
      ],
      "original": "Роуз (слабо смеясь): «Вроде да. Спасибо. Правда»."
    },
    {
      "line": 420,
      "parts": [],
      "original": ""
    },
    {
      "line": 421,
      "parts": [
        {
          "start": 0,
          "end": 189,
          "kind": "narration",
          "node": "s04_l421_0",
          "field": "text"
        }
      ],
      "original": "И тут Азалия снова чувствует это. До боли знакомое ощущение чужого взгляда. Но на этот раз в нём есть что-то ещё: беспокойство о ней. Азалия оборачивается. В опустевшем коридоре стоит Дима."
    },
    {
      "line": 422,
      "parts": [],
      "original": ""
    },
    {
      "line": 423,
      "parts": [
        {
          "start": 0,
          "end": 19,
          "kind": "choice",
          "node": "choice04_02",
          "field": "text"
        }
      ],
      "original": "ВЫБОР: что сказать?"
    },
    {
      "line": 424,
      "parts": [
        {
          "start": 0,
          "end": 28,
          "kind": "option",
          "node": "choice04_02",
          "option": "choice04_02_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. «Что?» (спокойно)"
    },
    {
      "line": 425,
      "parts": [
        {
          "start": 0,
          "end": 34,
          "kind": "option",
          "node": "choice04_02",
          "option": "choice04_02_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. «А ты тут хули палишь?»"
    },
    {
      "line": 426,
      "parts": [
        {
          "start": 0,
          "end": 22,
          "kind": "option",
          "node": "choice04_02",
          "option": "choice04_02_3",
          "field": "text"
        }
      ],
      "original": "Вариант 3. Промолчать."
    },
    {
      "line": 427,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "metadata",
          "text": "При вариантах 1 и 2. "
        },
        {
          "start": 21,
          "end": 39,
          "kind": "narration",
          "node": "s04_l427_1",
          "field": "text"
        }
      ],
      "original": "При вариантах 1 и 2. Дима тихо смеётся."
    },
    {
      "line": 428,
      "parts": [],
      "original": ""
    },
    {
      "line": 429,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s04_l429_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 142,
          "kind": "dialogue",
          "node": "s04_l429_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Прости. Просто ты была бесподобной, вот я и залюбовался и не смог отвести взгляд. Ладно, встретимся ещё как-нибудь. Хорошего тебе дня»."
    },
    {
      "line": 430,
      "parts": [],
      "original": ""
    },
    {
      "line": 431,
      "parts": [
        {
          "start": 0,
          "end": 165,
          "kind": "narration",
          "node": "s04_l431_0",
          "field": "text"
        }
      ],
      "original": "Он уходит, оставляя Азалию в ступоре. Несколько секунд она хлопает глазами, потом опоминается, убеждается, что с Роуз всё в порядке, и вместе они идут в Большой зал."
    },
    {
      "line": 432,
      "parts": [],
      "original": ""
    },
    {
      "line": 433,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "При варианте 3. "
        },
        {
          "start": 16,
          "end": 53,
          "kind": "stage",
          "node": "s04_l433_1",
          "field": "annotation"
        },
        {
          "start": 53,
          "end": 75,
          "kind": "dialogue",
          "node": "s04_l433_2",
          "field": "text"
        }
      ],
      "original": "При варианте 3. Дима (очень тепло и очень спокойно): «Ты была бесподобной»."
    },
    {
      "line": 434,
      "parts": [],
      "original": ""
    },
    {
      "line": 435,
      "parts": [
        {
          "start": 0,
          "end": 169,
          "kind": "narration",
          "node": "s04_l435_0",
          "field": "text"
        }
      ],
      "original": "Это звучит так тихо, что Азалии кажется, будто ей послышалось. Дима просто уходит. Азалия моргает, убеждается, что с Роуз всё в порядке, и они вместе идут в Большой зал."
    },
    {
      "line": 436,
      "parts": [],
      "original": ""
    },
    {
      "line": 437,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "metadata",
          "text": "Если Азалия проиграла"
        }
      ],
      "original": "Если Азалия проиграла"
    },
    {
      "line": 438,
      "parts": [],
      "original": ""
    },
    {
      "line": 439,
      "parts": [
        {
          "start": 0,
          "end": 151,
          "kind": "narration",
          "node": "s04_l439_0",
          "field": "text"
        }
      ],
      "original": "Заклинание Малфоя бьёт Азалию в грудь. Она падает, палочка отлетает в сторону. Мир плывёт. Малфой, тяжело дыша, поднимает палочку для последнего удара."
    },
    {
      "line": 440,
      "parts": [
        {
          "start": 0,
          "end": 77,
          "kind": "narration",
          "node": "s04_l440_0",
          "field": "text"
        }
      ],
      "original": "И тут позади вспыхивает свет: Малфоя отшвыривает к стене сильным заклинанием."
    },
    {
      "line": 441,
      "parts": [],
      "original": ""
    },
    {
      "line": 442,
      "parts": [
        {
          "start": 0,
          "end": 22,
          "kind": "stage",
          "node": "s04_l442_0",
          "field": "annotation"
        },
        {
          "start": 22,
          "end": 34,
          "kind": "dialogue",
          "node": "s04_l442_1",
          "field": "text"
        }
      ],
      "original": "Дима (холодно, тихо): «Пошёл вон»."
    },
    {
      "line": 443,
      "parts": [],
      "original": ""
    },
    {
      "line": 444,
      "parts": [
        {
          "start": 0,
          "end": 193,
          "kind": "narration",
          "node": "s04_l444_0",
          "field": "text"
        }
      ],
      "original": "Малфой, увидев его лицо, не спорит. Он вскакивает и бежит прочь, не оглядываясь. Дима бросается к Азалии, подхватывает её на руки и бегом несёт в медпункт. Роуз, собрав учебники, мчится следом."
    },
    {
      "line": 445,
      "parts": [],
      "original": ""
    },
    {
      "line": 446,
      "parts": [
        {
          "start": 0,
          "end": 105,
          "kind": "narration",
          "node": "s04_l446_0",
          "field": "text"
        }
      ],
      "original": "Медпункт. Азалия медленно открывает глаза. Рядом сидит Дима, и вид у него такой, будто он не спал неделю."
    },
    {
      "line": 447,
      "parts": [],
      "original": ""
    },
    {
      "line": 448,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s04_l448_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 26,
          "kind": "dialogue",
          "node": "s04_l448_1",
          "field": "text"
        }
      ],
      "original": "Дима (тихо): «Слава богу»."
    },
    {
      "line": 449,
      "parts": [],
      "original": ""
    },
    {
      "line": 450,
      "parts": [
        {
          "start": 0,
          "end": 37,
          "kind": "narration",
          "node": "s04_l450_0",
          "field": "text"
        }
      ],
      "original": "Он выдыхает и проводит рукой по лицу."
    },
    {
      "line": 451,
      "parts": [],
      "original": ""
    },
    {
      "line": 452,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s04_l452_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 34,
          "kind": "dialogue",
          "node": "s04_l452_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Ты себя хорошо чувствуешь?»"
    },
    {
      "line": 453,
      "parts": [],
      "original": ""
    },
    {
      "line": 454,
      "parts": [
        {
          "start": 0,
          "end": 31,
          "kind": "narration",
          "node": "s04_l454_0",
          "field": "text"
        }
      ],
      "original": "Азалия в ступоре просто кивает."
    },
    {
      "line": 455,
      "parts": [],
      "original": ""
    },
    {
      "line": 456,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s04_l456_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 26,
          "kind": "dialogue",
          "node": "s04_l456_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Я этому очень рад»."
    },
    {
      "line": 457,
      "parts": [],
      "original": ""
    },
    {
      "line": 458,
      "parts": [
        {
          "start": 0,
          "end": 53,
          "kind": "narration",
          "node": "s04_l458_0",
          "field": "text"
        }
      ],
      "original": "Он встаёт, поправляет ей одеяло и смущённо улыбается."
    },
    {
      "line": 459,
      "parts": [],
      "original": ""
    },
    {
      "line": 460,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s04_l460_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 82,
          "kind": "dialogue",
          "node": "s04_l460_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Что ж... выздоравливай. Мы тебе с Роуз оставили фруктиков, возьми с собой»."
    },
    {
      "line": 461,
      "parts": [],
      "original": ""
    },
    {
      "line": 462,
      "parts": [
        {
          "start": 0,
          "end": 50,
          "kind": "narration",
          "node": "s04_l462_0",
          "field": "text"
        }
      ],
      "original": "На тумбочке стоит вазочка с яблоками и виноградом."
    },
    {
      "line": 463,
      "parts": [],
      "original": ""
    },
    {
      "line": 464,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Большой зал"
        }
      ],
      "original": "Большой зал"
    },
    {
      "line": 465,
      "parts": [
        {
          "start": 0,
          "end": 32,
          "kind": "metadata",
          "text": "Эта часть общая для обеих веток."
        }
      ],
      "original": "Эта часть общая для обеих веток."
    },
    {
      "line": 466,
      "parts": [],
      "original": ""
    },
    {
      "line": 467,
      "parts": [
        {
          "start": 0,
          "end": 85,
          "kind": "narration",
          "node": "s04_l467_0",
          "field": "text"
        }
      ],
      "original": "Большой зал. Гул голосов, звон посуды. Азалия и Роуз сидят рядом за столом Пуффендуя."
    },
    {
      "line": 468,
      "parts": [],
      "original": ""
    },
    {
      "line": 469,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s04_l469_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 56,
          "kind": "dialogue",
          "node": "s04_l469_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Азалия... Спасибо тебе. Правда. Если бы не ты...»"
    },
    {
      "line": 470,
      "parts": [],
      "original": ""
    },
    {
      "line": 471,
      "parts": [
        {
          "start": 0,
          "end": 22,
          "kind": "stage",
          "node": "s04_l471_0",
          "field": "annotation"
        },
        {
          "start": 22,
          "end": 192,
          "kind": "dialogue",
          "node": "s04_l471_1",
          "field": "text"
        }
      ],
      "original": "Азалия (отмахиваясь): «Брось. Малфой в последнее время какой-то ненормальный, и не стоит об этом думать. Он просто чувствует себя самым крутым из-за того, что с ним дружат старшие слизеринцы»."
    },
    {
      "line": 472,
      "parts": [],
      "original": ""
    },
    {
      "line": 473,
      "parts": [
        {
          "start": 0,
          "end": 72,
          "kind": "narration",
          "node": "s04_l473_0",
          "field": "text"
        }
      ],
      "original": "Они переглядываются и начинают смеяться. К ним подходит компания Азалии."
    },
    {
      "line": 474,
      "parts": [],
      "original": ""
    },
    {
      "line": 475,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s04_l475_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 28,
          "kind": "dialogue",
          "node": "s04_l475_1",
          "field": "text"
        }
      ],
      "original": "Рон: «Вы чего так смеётесь?»"
    },
    {
      "line": 476,
      "parts": [],
      "original": ""
    },
    {
      "line": 477,
      "parts": [
        {
          "start": 0,
          "end": 69,
          "kind": "narration",
          "node": "s04_l477_0",
          "field": "text"
        }
      ],
      "original": "Азалия и Роуз рассказывают о том, что произошло. Лица ребят мрачнеют."
    },
    {
      "line": 478,
      "parts": [],
      "original": ""
    },
    {
      "line": 479,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s04_l479_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 42,
          "kind": "dialogue",
          "node": "s04_l479_1",
          "field": "text"
        }
      ],
      "original": "Фред: «Значит, так. Идём добивать Малфоя»."
    },
    {
      "line": 480,
      "parts": [],
      "original": ""
    },
    {
      "line": 481,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s04_l481_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 45,
          "kind": "dialogue",
          "node": "s04_l481_1",
          "field": "text"
        }
      ],
      "original": "Джордж: «Мы уже специальные бомбы придумали»."
    },
    {
      "line": 482,
      "parts": [],
      "original": ""
    },
    {
      "line": 483,
      "parts": [
        {
          "start": 0,
          "end": 25,
          "kind": "stage",
          "node": "s04_l483_0",
          "field": "annotation"
        },
        {
          "start": 25,
          "end": 58,
          "kind": "dialogue",
          "node": "s04_l483_1",
          "field": "text"
        }
      ],
      "original": "Гермиона (встревоженно): «Только давайте обойдёмся без...»"
    },
    {
      "line": 484,
      "parts": [],
      "original": ""
    },
    {
      "line": 485,
      "parts": [
        {
          "start": 0,
          "end": 28,
          "kind": "stage",
          "node": "s04_l485_0",
          "field": "annotation"
        },
        {
          "start": 28,
          "end": 93,
          "kind": "dialogue",
          "node": "s04_l485_1",
          "field": "text"
        }
      ],
      "original": "Роуз (смеясь, но уверенно): «Всё в порядке. В следующий раз я и сама смогу ему шею свернуть»."
    },
    {
      "line": 486,
      "parts": [],
      "original": ""
    },
    {
      "line": 487,
      "parts": [
        {
          "start": 0,
          "end": 136,
          "kind": "narration",
          "node": "s04_l487_0",
          "field": "text"
        }
      ],
      "original": "Секунда молчания. И вся компания взрывается хохотом. Они ещё минут десять смеются, перебивая друг друга, и наконец расходятся по урокам."
    },
    {
      "line": 488,
      "parts": [],
      "original": ""
    },
    {
      "line": 489,
      "parts": [
        {
          "start": 0,
          "end": 30,
          "kind": "narration",
          "node": "s04_l489_0",
          "field": "text"
        }
      ],
      "original": "Затемнение. Прошла ещё неделя."
    },
    {
      "line": 490,
      "parts": [
        {
          "start": 0,
          "end": 305,
          "kind": "stage",
          "node": "s04_l490_0",
          "field": "annotation"
        }
      ],
      "original": "Анимация: кадры сменяют друг друга. Роуз и Азалия склонились над одним учебником. Роуз что-то шепчет Гарри на ухо, и тот краснеет. Роуз спорит с Роном, и оба хохочут. Вся компания сидит за одним столом. За эту неделю Роуз стала лучшей подругой Азалии и хорошим другом для остальных, и вошла в их компанию."
    },
    {
      "line": 491,
      "parts": [
        {
          "start": 0,
          "end": 247,
          "kind": "stage",
          "node": "s04_l491_0",
          "field": "annotation"
        }
      ],
      "original": "Параллельно в кадре мелькает Дима: в коридоре, в библиотеке, в Большом зале. Их взгляды пересекаются, Азалия отводит глаза, а потом сама не знает почему оглядывается. Они стали чаще встречаться. Дошло до того, что при встрече они даже здороваются."
    },
    {
      "line": 492,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s04_l492_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 56,
          "kind": "thought",
          "node": "s04_l492_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Почему я так странно на него реагирую?..»"
    },
    {
      "line": 493,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "metadata",
          "text": "Конец сцены 4."
        }
      ],
      "original": "Конец сцены 4."
    },
    {
      "line": 494,
      "parts": [],
      "original": ""
    }
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "scope": [
    371,
    494
  ]
};

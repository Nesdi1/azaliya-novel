export default {
  "schemaVersion": 1,
  "id": "scene05",
  "start": "s05_start",
  "scope": [
    495,
    612
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "nodes": [
    {
      "id": "s05_start",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s05_enter_dorm_night",
      "source": [],
      "else": "s05_enter_classroom",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s05_enter_classroom",
      "type": "scene",
      "action": "enter",
      "background": "bg_classroom",
      "characters": [
        "azalia",
        "rose",
        "dima"
      ],
      "source": [],
      "next": "s05_l499_0",
      "emotions": {}
    },
    {
      "id": "s05_l499_0",
      "type": "narration",
      "text": "Урок. Азалия сидит, подперев голову рукой, и изо всех сил пытается отбиться от вопросов своей лучшей подруги. Роуз наклонилась к ней почти вплотную. За соседним столом сидит Дима и смотрит на Азалию с мягкой улыбкой, словно любуется ею.",
      "source": [
        {
          "file": "dialogues",
          "line": 499,
          "start": 0,
          "end": 236
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
        },
        {
          "target": "rose",
          "effect": "tilt",
          "amplitude": 2,
          "hold": true,
          "durationMs": 500
        },
        {
          "target": "dima",
          "effect": "focus",
          "delayMs": 250
        }
      ],
      "next": "s05_l501_0",
      "emotions": {
        "azalia": "annoyed",
        "dima": "love"
      }
    },
    {
      "id": "s05_l501_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (шёпотом, взахлёб): ",
      "source": [
        {
          "file": "dialogues",
          "line": 501,
          "start": 0,
          "end": 25
        }
      ],
      "next": "s05_l501_1",
      "emotions": {
        "azalia": "annoyed",
        "rose": "tease"
      }
    },
    {
      "id": "s05_l501_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Ты знаешь, я тут кое-что про него узнала. Он любит животных. Он очень умный. Красивый, тут и спорить нечего. И, самое главное, спокойный. Характер у него просто золотой».",
      "source": [
        {
          "file": "dialogues",
          "line": 501,
          "start": 25,
          "end": 196
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500
        }
      ],
      "next": "s05_l503_0",
      "emotions": {
        "azalia": "annoyed",
        "rose": "tease"
      }
    },
    {
      "id": "s05_l503_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 503,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s05_l503_1",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_l503_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Не слушаю. Я ничего не слушаю».",
      "source": [
        {
          "file": "dialogues",
          "line": 503,
          "start": 14,
          "end": 46
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s05_l505_0",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_l505_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 505,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s05_l505_1",
      "emotions": {
        "rose": "tease"
      }
    },
    {
      "id": "s05_l505_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Конечно, бывают моменты, когда он как будто издевается. Но это даже хорошо: он не нюня! Азалия, он, возможно, твоя судьба!»",
      "source": [
        {
          "file": "dialogues",
          "line": 505,
          "start": 6,
          "end": 130
        }
      ],
      "next": "s05_l507_0",
      "emotions": {
        "rose": "tease"
      }
    },
    {
      "id": "s05_l507_0",
      "type": "narration",
      "text": "Азалия чувствует, как взгляд Димы скользит по её затылку, и изо всех сил сдерживает раздражение.",
      "source": [
        {
          "file": "dialogues",
          "line": 507,
          "start": 0,
          "end": 96
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 3,
          "durationMs": 450
        }
      ],
      "next": "choice05_01",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "choice05_01",
      "type": "choice",
      "options": [
        {
          "id": "choice05_01_1",
          "text": "«Да, он мой будущий парень. Согласна».",
          "next": "s05_l513_1",
          "source": [
            {
              "file": "dialogues",
              "line": 510,
              "start": 11,
              "end": 49
            }
          ]
        },
        {
          "id": "choice05_01_2",
          "text": "Отрицать всё.",
          "next": "s05_l517_0",
          "source": [
            {
              "file": "dialogues",
              "line": 511,
              "start": 11,
              "end": 24
            }
          ]
        },
        {
          "id": "choice05_01_3",
          "text": "Промолчать и думать о своём.",
          "next": "s05_l521_1",
          "source": [
            {
              "file": "dialogues",
              "line": 512,
              "start": 11,
              "end": 39
            }
          ]
        }
      ],
      "source": [],
      "next": null,
      "emotions": {}
    },
    {
      "id": "s05_l513_1",
      "type": "narration",
      "text": "Роуз смотрит на Азалию так, будто довела её окончательно.",
      "source": [
        {
          "file": "dialogues",
          "line": 513,
          "start": 16,
          "end": 73
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s05_l515_0",
      "emotions": {}
    },
    {
      "id": "s05_l515_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (осторожно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 515,
          "start": 0,
          "end": 18
        }
      ],
      "next": "s05_l515_1",
      "emotions": {}
    },
    {
      "id": "s05_l515_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Азалия... Может, тебе стоит обратиться к специалисту? Это на тебя совсем не похоже».",
      "source": [
        {
          "file": "dialogues",
          "line": 515,
          "start": 18,
          "end": 103
        }
      ],
      "next": "s05_l522_0",
      "emotions": {}
    },
    {
      "id": "s05_l517_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (шёпотом): ",
      "source": [
        {
          "file": "dialogues",
          "line": 517,
          "start": 16,
          "end": 34
        }
      ],
      "next": "s05_l517_1",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_l517_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ничего подобного. Он мне не нравится. Вообще. Совсем».",
      "cues": [
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 3,
          "durationMs": 450
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 517,
          "start": 34,
          "end": 89
        }
      ],
      "next": "s05_l519_0",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_l519_0",
      "type": "narration",
      "text": "Нападки Роуз только усиливаются: любя, но очень раздражающе она лезет к Азалии ещё настойчивее.",
      "source": [
        {
          "file": "dialogues",
          "line": 519,
          "start": 0,
          "end": 95
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520
        }
      ],
      "next": "s05_l522_0",
      "emotions": {
        "azalia": "annoyed",
        "rose": "tease"
      }
    },
    {
      "id": "s05_l521_1",
      "type": "narration",
      "text": "Азалия молчит и думает о своём. Ничего не меняется: Роуз продолжает тараторить.",
      "source": [
        {
          "file": "dialogues",
          "line": 521,
          "start": 16,
          "end": 95
        }
      ],
      "next": "s05_l522_0",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_l522_0",
      "type": "narration",
      "text": "Урок заканчивается. Азалия провожает Диму раздражённым взглядом: из-за того, что он так нагло пялился на неё, подруга не отстала ни на секунду.",
      "source": [
        {
          "file": "dialogues",
          "line": 522,
          "start": 0,
          "end": 143
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 400
        },
        {
          "effect": "group",
          "targets": [],
          "durationMs": 500
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 480
        }
      ],
      "next": "s05_enter_corridor",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_enter_corridor",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "azalia",
        "rose",
        "theo",
        "twins"
      ],
      "source": [],
      "next": "s05_l523_0",
      "emotions": {}
    },
    {
      "id": "s05_l523_0",
      "type": "narration",
      "text": "К ним подходит их компания: Гермиона, Гарри, Рон, близнецы и, конечно, Тео, который всегда с ними. И тут Роуз вдруг начинает говорить о парнях при брате Азалии.",
      "source": [
        {
          "file": "dialogues",
          "line": 523,
          "start": 0,
          "end": 160
        }
      ],
      "next": "s05_l525_0",
      "emotions": {}
    },
    {
      "id": "s05_l525_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (с загадочной улыбкой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 525,
          "start": 0,
          "end": 29
        }
      ],
      "next": "s05_l525_1",
      "emotions": {
        "rose": "tease"
      }
    },
    {
      "id": "s05_l525_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«А вы знаете, что на Азалию тут один парень...»",
      "source": [
        {
          "file": "dialogues",
          "line": 525,
          "start": 29,
          "end": 76
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500
        }
      ],
      "next": "s05_l527_0",
      "emotions": {
        "rose": "tease"
      }
    },
    {
      "id": "s05_l527_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 527,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s05_l527_1",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s05_l527_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Роуз!»",
      "source": [
        {
          "file": "dialogues",
          "line": 527,
          "start": 8,
          "end": 15
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s05_l529_0",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s05_l529_0",
      "type": "narration",
      "text": "Азалия бросается к подруге, пытаясь закрыть ей рот, но не успевает.",
      "source": [
        {
          "file": "dialogues",
          "line": 529,
          "start": 0,
          "end": 67
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "azalia",
            "rose"
          ],
          "durationMs": 500
        },
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s05_l531_0",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s05_l531_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (хохоча, уворачиваясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 531,
          "start": 0,
          "end": 29
        }
      ],
      "next": "s05_l531_1",
      "emotions": {
        "rose": "tease"
      }
    },
    {
      "id": "s05_l531_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«...пялится на каждом уроке! А она вся такая «мне не нравится», а сама покраснела!»",
      "source": [
        {
          "file": "dialogues",
          "line": 531,
          "start": 29,
          "end": 112
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520
        }
      ],
      "next": "s05_l533_0",
      "emotions": {
        "rose": "tease"
      }
    },
    {
      "id": "s05_l533_0",
      "type": "narration",
      "text": "Все смеются. Только Тео не смеётся. Он смотрит на сестру и подходит к ней ближе.",
      "source": [
        {
          "file": "dialogues",
          "line": 533,
          "start": 0,
          "end": 80
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "theo",
            "azalia"
          ],
          "durationMs": 600
        },
        {
          "target": "theo",
          "effect": "focus"
        },
        {
          "target": "theo",
          "effect": "tilt",
          "amplitude": 2,
          "hold": true,
          "durationMs": 500
        }
      ],
      "next": "s05_l535_0",
      "emotions": {
        "theo": "care"
      }
    },
    {
      "id": "s05_l535_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 535,
          "start": 0,
          "end": 12
        }
      ],
      "next": "s05_l535_1",
      "emotions": {
        "theo": "care"
      }
    },
    {
      "id": "s05_l535_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Он к тебе лезет?»",
      "source": [
        {
          "file": "dialogues",
          "line": 535,
          "start": 12,
          "end": 30
        }
      ],
      "next": "s05_l537_0",
      "emotions": {
        "theo": "care"
      }
    },
    {
      "id": "s05_l537_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 537,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s05_l537_1",
      "emotions": {}
    },
    {
      "id": "s05_l537_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Нет. Всё хорошо. Если у меня будут какие-то проблемы, я и сама могу справиться. И вообще, если у меня будет парень или кто-то будет пытаться за мной ухаживать, не стоит лезть в мою личную жизнь. Это я тебе на будущее говорю».",
      "source": [
        {
          "file": "dialogues",
          "line": 537,
          "start": 8,
          "end": 234
        }
      ],
      "next": "s05_l539_0",
      "emotions": {}
    },
    {
      "id": "s05_l539_0",
      "type": "narration",
      "text": "Тео вздыхает. Он понимает, что бояться ему, в общем-то, нечего, и возвращается к ребятам, снова начиная веселиться.",
      "source": [
        {
          "file": "dialogues",
          "line": 539,
          "start": 0,
          "end": 115
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 450
        },
        {
          "effect": "group",
          "targets": [],
          "durationMs": 550
        }
      ],
      "next": "s05_l541_0",
      "emotions": {
        "theo": "accept"
      }
    },
    {
      "id": "s05_l541_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Фред: ",
      "source": [
        {
          "file": "dialogues",
          "line": 541,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s05_l541_1",
      "emotions": {}
    },
    {
      "id": "s05_l541_1",
      "type": "dialogue",
      "speaker": "fred",
      "text": "«Слушайте, а давайте проверим, подходит ли ей этот Дима».",
      "source": [
        {
          "file": "dialogues",
          "line": 541,
          "start": 6,
          "end": 63
        }
      ],
      "cues": [
        {
          "target": "twins",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500
        }
      ],
      "next": "s05_l543_0",
      "emotions": {}
    },
    {
      "id": "s05_l543_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео и Азалия (в унисон): ",
      "source": [
        {
          "file": "dialogues",
          "line": 543,
          "start": 0,
          "end": 25
        }
      ],
      "next": "s05_l543_1",
      "emotions": {
        "azalia": "shock",
        "theo": "suspicious"
      }
    },
    {
      "id": "s05_l543_1",
      "type": "dialogue",
      "speaker": "theo_azalia",
      "text": "«ЧТО?!»",
      "source": [
        {
          "file": "dialogues",
          "line": 543,
          "start": 25,
          "end": 32
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        },
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        }
      ],
      "next": "s05_l545_0",
      "emotions": {
        "azalia": "shock",
        "theo": "suspicious"
      }
    },
    {
      "id": "s05_l545_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Джордж: ",
      "source": [
        {
          "file": "dialogues",
          "line": 545,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s05_l545_1",
      "emotions": {}
    },
    {
      "id": "s05_l545_1",
      "type": "dialogue",
      "speaker": "george",
      "text": "«Кто за?»",
      "source": [
        {
          "file": "dialogues",
          "line": 545,
          "start": 8,
          "end": 17
        }
      ],
      "next": "s05_l547_0",
      "emotions": {}
    },
    {
      "id": "s05_l547_0",
      "type": "narration",
      "text": "Руки поднимают все, кроме Тео и Азалии.",
      "source": [
        {
          "file": "dialogues",
          "line": 547,
          "start": 0,
          "end": 39
        }
      ],
      "next": "s05_l549_0",
      "emotions": {}
    },
    {
      "id": "s05_l549_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Фред: ",
      "source": [
        {
          "file": "dialogues",
          "line": 549,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s05_l549_1",
      "emotions": {}
    },
    {
      "id": "s05_l549_1",
      "type": "dialogue",
      "speaker": "fred",
      "text": "«Мнение большинства победило».",
      "source": [
        {
          "file": "dialogues",
          "line": 549,
          "start": 6,
          "end": 36
        }
      ],
      "next": "s05_enter_fountain_day",
      "emotions": {}
    },
    {
      "id": "s05_enter_fountain_day",
      "type": "scene",
      "action": "enter",
      "background": "bg_fountain_day",
      "characters": [
        "dima",
        "ron",
        "hermione",
        "azalia"
      ],
      "source": [],
      "next": "s05_l551_0",
      "emotions": {}
    },
    {
      "id": "s05_l551_0",
      "type": "narration",
      "text": "Смена кадра: двор. Вся компания прячется за кустами и колонной. У фонтана на скамейке сидит Дима. Он достаёт из сумки книгу и начинает читать.",
      "source": [
        {
          "file": "dialogues",
          "line": 551,
          "start": 0,
          "end": 142
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "target": "dima",
          "effect": "breathe",
          "durationMs": 2800
        }
      ],
      "next": "s05_l553_0",
      "emotions": {}
    },
    {
      "id": "s05_l553_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Рон (шёпотом): ",
      "source": [
        {
          "file": "dialogues",
          "line": 553,
          "start": 0,
          "end": 15
        }
      ],
      "next": "s05_l553_1",
      "emotions": {}
    },
    {
      "id": "s05_l553_1",
      "type": "dialogue",
      "speaker": "ron",
      "text": "«Ну вот. Первое сходство».",
      "source": [
        {
          "file": "dialogues",
          "line": 553,
          "start": 15,
          "end": 41
        }
      ],
      "next": "s05_l555_0",
      "emotions": {}
    },
    {
      "id": "s05_l555_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Гермиона (шёпотом): ",
      "source": [
        {
          "file": "dialogues",
          "line": 555,
          "start": 0,
          "end": 20
        }
      ],
      "next": "s05_l555_1",
      "emotions": {}
    },
    {
      "id": "s05_l555_1",
      "type": "dialogue",
      "speaker": "hermione",
      "text": "«Они оба любят читать».",
      "source": [
        {
          "file": "dialogues",
          "line": 555,
          "start": 20,
          "end": 43
        }
      ],
      "next": "s05_l557_0",
      "emotions": {}
    },
    {
      "id": "s05_l557_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 557,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s05_l557_1",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_l557_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Туф. Идите вы».",
      "source": [
        {
          "file": "dialogues",
          "line": 557,
          "start": 8,
          "end": 24
        }
      ],
      "next": "s05_l559_0",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s05_l559_0",
      "type": "narration",
      "text": "Через некоторое время всем становится скучно, и компания уходит, болтая и дурачась. Азалия задерживается на секунду и окидывает Диму взглядом.",
      "source": [
        {
          "file": "dialogues",
          "line": 559,
          "start": 0,
          "end": 142
        }
      ],
      "cues": [
        {
          "target": "ron",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 450
        },
        {
          "target": "hermione",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 450,
          "delayMs": 80
        },
        {
          "target": "azalia",
          "effect": "focus",
          "delayMs": 200
        }
      ],
      "next": "s05_l561_0",
      "emotions": {}
    },
    {
      "id": "s05_l561_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 561,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s05_l561_1",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s05_l561_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Действительно. У нас с ним есть что-то общее».",
      "source": [
        {
          "file": "dialogues",
          "line": 561,
          "start": 14,
          "end": 61
        }
      ],
      "next": "s05_enter_dorm_night",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s05_enter_dorm_night",
      "type": "scene",
      "action": "enter",
      "background": "bg_hufflepuff_dorm",
      "characters": [
        "azalia"
      ],
      "source": [],
      "next": "s05_l564_0",
      "emotions": {}
    },
    {
      "id": "s05_l564_0",
      "type": "narration",
      "text": "Спальня Пуффендуя. Азалия лежит в кровати с открытыми глазами и ворочается с боку на бок. Сон не идёт.",
      "source": [
        {
          "file": "dialogues",
          "line": 564,
          "start": 0,
          "end": 102
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -1.8,
          "durationMs": 500
        }
      ],
      "next": "s05_l566_0",
      "emotions": {}
    },
    {
      "id": "s05_l566_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 566,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s05_l566_1",
      "emotions": {}
    },
    {
      "id": "s05_l566_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Так. Всё. Тихо выйду и посижу у фонтана. Успокою мысли, а потом лягу спать».",
      "source": [
        {
          "file": "dialogues",
          "line": 566,
          "start": 14,
          "end": 91
        }
      ],
      "next": "s05_l568_0",
      "emotions": {}
    },
    {
      "id": "s05_l568_0",
      "type": "narration",
      "text": "Она берёт с тумбочки книгу и на цыпочках выходит из комнаты.",
      "source": [
        {
          "file": "dialogues",
          "line": 568,
          "start": 0,
          "end": 60
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 520
        }
      ],
      "next": "s05_enter_corridor_night",
      "emotions": {}
    },
    {
      "id": "s05_enter_corridor_night",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor_night",
      "characters": [
        "azalia",
        "snape"
      ],
      "source": [],
      "next": "s05_game_stealth",
      "emotions": {}
    },
    {
      "id": "s05_game_stealth",
      "type": "minigame",
      "gameId": "stealth",
      "params": {
        "attempts": 5,
        "teacherId": "snape",
        "prefectId": "prefect"
      },
      "resultRoutes": {
        "success": "s05_set_stealth_win",
        "failure": "s05_set_stealth_lose"
      },
      "source": [
        {
          "file": "dialogues",
          "line": 570,
          "start": 0,
          "end": 99
        }
      ],
      "next": "s05_set_stealth_win",
      "emotions": {}
    },
    {
      "id": "s05_set_stealth_lose",
      "type": "set",
      "effects": [
        {
          "variable": "stealthScene5Win",
          "value": false
        }
      ],
      "source": [],
      "next": "s05_enter_fail_fountain",
      "emotions": {}
    },
    {
      "id": "s05_enter_fail_fountain",
      "type": "scene",
      "action": "enter",
      "background": "bg_fountain_night",
      "characters": [
        "dima"
      ],
      "source": [],
      "next": "s05_l571_1",
      "emotions": {}
    },
    {
      "id": "s05_l571_1",
      "type": "narration",
      "text": "Азалия через силу засыпает сидя прямо в комнате. Смена кадра: двор. Дима сидит на скамейке у фонтана и читает. Он закрывает книгу и тихо говорит.",
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "target": "dima",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 571,
          "start": 28,
          "end": 173
        }
      ],
      "next": "s05_l573_0",
      "emotions": {
        "dima": "disappointed"
      }
    },
    {
      "id": "s05_l573_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 573,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s05_l573_1",
      "emotions": {
        "dima": "disappointed"
      }
    },
    {
      "id": "s05_l573_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«А я думал, она придёт...»",
      "source": [
        {
          "file": "dialogues",
          "line": 573,
          "start": 6,
          "end": 32
        }
      ],
      "next": "s05_cs_fail",
      "emotions": {
        "dima": "disappointed"
      }
    },
    {
      "id": "s05_cs_fail",
      "type": "cutscene",
      "cutsceneId": "cs05_fountain_fail",
      "source": [],
      "next": "s05_stealth_retry",
      "emotions": {}
    },
    {
      "id": "s05_stealth_retry",
      "type": "goto",
      "target": "s05_game_stealth",
      "retryPrompt": true,
      "retryKind": "stealth",
      "source": [],
      "else": "s05_set_stealth_win",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s05_set_stealth_win",
      "type": "set",
      "effects": [
        {
          "variable": "stealthScene5Win",
          "value": true
        }
      ],
      "source": [],
      "next": "s05_enter_fountain_night",
      "emotions": {}
    },
    {
      "id": "s05_enter_fountain_night",
      "type": "scene",
      "action": "enter",
      "background": "bg_fountain_night",
      "characters": [
        "azalia"
      ],
      "source": [],
      "next": "s05_l577_1",
      "emotions": {}
    },
    {
      "id": "s05_l577_1",
      "type": "narration",
      "text": "Двор. Лунный свет, тихий плеск фонтана. Азалия садится на скамейку, открывает книгу и начинает читать. Из темноты за её спиной выползает тёмный силуэт и медленно подкрадывается. Рука ложится ей на плечо.",
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        },
        {
          "target": "azalia",
          "effect": "breathe",
          "durationMs": 2800
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 577,
          "start": 25,
          "end": 228
        }
      ],
      "next": "s05_l579_0",
      "emotions": {}
    },
    {
      "id": "s05_l579_0",
      "type": "narration",
      "text": "Азалия вскакивает, кувырком уходит вперёд, выхватывает палочку и встаёт в боевую стойку. Силуэт выходит из темноты. Это Дима, с поднятыми руками.",
      "source": [
        {
          "file": "dialogues",
          "line": 579,
          "start": 0,
          "end": 145
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 10,
          "durationMs": 480
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 500,
          "delayMs": 120
        },
        {
          "target": "dima",
          "effect": "focus",
          "delayMs": 220
        }
      ],
      "next": "s05_l581_0",
      "emotions": {
        "azalia": "wand_stance"
      }
    },
    {
      "id": "s05_l581_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 581,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s05_l581_1",
      "emotions": {
        "azalia": "wand_stance"
      }
    },
    {
      "id": "s05_l581_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Тише, тише!»",
      "source": [
        {
          "file": "dialogues",
          "line": 581,
          "start": 6,
          "end": 19
        }
      ],
      "next": "s05_l583_0",
      "emotions": {
        "azalia": "wand_stance"
      }
    },
    {
      "id": "s05_l583_0",
      "type": "narration",
      "text": "Азалия, поняв, кто это, опускает палочку и шипит шёпотом, чтобы не разбудить замок.",
      "source": [
        {
          "file": "dialogues",
          "line": 583,
          "start": 0,
          "end": 83
        }
      ],
      "next": "s05_l585_0",
      "emotions": {}
    },
    {
      "id": "s05_l585_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 585,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s05_l585_1",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s05_l585_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ты какого лешего меня так пугаешь?! Да ещё ночью! Что ты тут вообще делаешь?»",
      "source": [
        {
          "file": "dialogues",
          "line": 585,
          "start": 8,
          "end": 86
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s05_l587_0",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s05_l587_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (спокойно, чуть улыбаясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 587,
          "start": 0,
          "end": 32
        }
      ],
      "next": "s05_l587_1",
      "emotions": {}
    },
    {
      "id": "s05_l587_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Я вообще-то тут всегда перед сном читаю. Мне интереснее другое: почему ты именно сюда резко решила прийти? До этого тебя тут не было».",
      "source": [
        {
          "file": "dialogues",
          "line": 587,
          "start": 32,
          "end": 167
        }
      ],
      "next": "s05_l587_2",
      "emotions": {}
    },
    {
      "id": "s05_l587_2",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": " (Пауза.) ",
      "source": [
        {
          "file": "dialogues",
          "line": 587,
          "start": 167,
          "end": 177
        }
      ],
      "next": "s05_l587_3",
      "emotions": {}
    },
    {
      "id": "s05_l587_3",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«И на всякий случай: если ещё раз придёшь, лучше убегай, а не доставай палочку. У преподавателей всё-таки опыта больше, чем у тебя».",
      "source": [
        {
          "file": "dialogues",
          "line": 587,
          "start": 177,
          "end": 309
        }
      ],
      "next": "s05_l589_0",
      "emotions": {}
    },
    {
      "id": "s05_l589_0",
      "type": "narration",
      "text": "Азалия вспоминает, как они всей компанией следили за ним, как он сидел вот на этой самой скамейке. Щёки слегка розовеют.",
      "source": [
        {
          "file": "dialogues",
          "line": 589,
          "start": 0,
          "end": 120
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        },
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s05_l591_0",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s05_l591_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 591,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s05_l591_1",
      "emotions": {
        "azalia": "shy"
      }
    },
    {
      "id": "s05_l591_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Туф. Отстань».",
      "source": [
        {
          "file": "dialogues",
          "line": 591,
          "start": 8,
          "end": 23
        }
      ],
      "next": "s05_l593_0",
      "emotions": {
        "azalia": "shy"
      }
    },
    {
      "id": "s05_l593_0",
      "type": "narration",
      "text": "Дима замечает румянец. Он подходит ближе и, наклонившись к самому её уху, шепчет.",
      "source": [
        {
          "file": "dialogues",
          "line": 593,
          "start": 0,
          "end": 81
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "dima",
            "azalia"
          ],
          "durationMs": 650
        },
        {
          "target": "dima",
          "effect": "tilt",
          "amplitude": 2.5,
          "hold": true,
          "durationMs": 550
        },
        {
          "effect": "camera",
          "to": 1.05,
          "durationMs": 1000
        },
        {
          "effect": "glow",
          "to": 0.26,
          "durationMs": 1000
        }
      ],
      "next": "s05_l595_0",
      "emotions": {},
      "pose": "pose_stupenda_whisper"
    },
    {
      "id": "s05_l595_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 595,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s05_l595_1",
      "emotions": {},
      "pose": "pose_stupenda_whisper"
    },
    {
      "id": "s05_l595_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Stupenda».",
      "source": [
        {
          "file": "dialogues",
          "line": 595,
          "start": 6,
          "end": 17
        }
      ],
      "next": "s05_l597_0",
      "emotions": {},
      "pose": "pose_stupenda_whisper"
    },
    {
      "id": "s05_l597_0",
      "type": "narration",
      "text": "Он отстраняется и добавляет как ни в чём не бывало.",
      "source": [
        {
          "file": "dialogues",
          "line": 597,
          "start": 0,
          "end": 51
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 500
        },
        {
          "effect": "group",
          "targets": [],
          "durationMs": 600
        },
        {
          "effect": "camera",
          "to": 1,
          "durationMs": 800
        },
        {
          "effect": "glow",
          "to": 0.1,
          "durationMs": 800
        }
      ],
      "next": "s05_l599_0",
      "emotions": {}
    },
    {
      "id": "s05_l599_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 599,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s05_l599_1",
      "emotions": {}
    },
    {
      "id": "s05_l599_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Ладно, не буду тебе мешать отдыхать. Будь аккуратнее: великий и ужасный Снейп понял, что я сюда бегаю, так что тебе тоже стоит остерегаться. Спокойной ночи».",
      "source": [
        {
          "file": "dialogues",
          "line": 599,
          "start": 6,
          "end": 164
        }
      ],
      "next": "s05_l601_0",
      "emotions": {}
    },
    {
      "id": "s05_l601_0",
      "type": "narration",
      "text": "Он уходит. Азалия остаётся сидеть на скамейке, оглушённая.",
      "source": [
        {
          "file": "dialogues",
          "line": 601,
          "start": 0,
          "end": 58
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 550
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 600
        }
      ],
      "next": "s05_l603_0",
      "emotions": {}
    },
    {
      "id": "s05_l603_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (тихо и очень нежно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 603,
          "start": 0,
          "end": 29
        }
      ],
      "next": "s05_l603_1",
      "emotions": {
        "azalia": "tender"
      }
    },
    {
      "id": "s05_l603_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Спокойной...»",
      "source": [
        {
          "file": "dialogues",
          "line": 603,
          "start": 29,
          "end": 43
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": 1.5,
          "durationMs": 500
        }
      ],
      "next": "s05_l605_0",
      "emotions": {
        "azalia": "tender"
      }
    },
    {
      "id": "s05_l605_0",
      "type": "narration",
      "text": "Несколько секунд она смотрит ему вслед. Затем лицо меняется.",
      "source": [
        {
          "file": "dialogues",
          "line": 605,
          "start": 0,
          "end": 60
        }
      ],
      "next": "s05_l607_0",
      "emotions": {}
    },
    {
      "id": "s05_l607_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (возмущённо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 607,
          "start": 0,
          "end": 21
        }
      ],
      "next": "s05_l607_1",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s05_l607_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Стоп. Он что, назвал меня тупой?! Что это слово вообще означает?!»",
      "source": [
        {
          "file": "dialogues",
          "line": 607,
          "start": 21,
          "end": 88
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        }
      ],
      "next": "s05_l609_0",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s05_l609_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Затемнение. Азалия, успокоившись, спокойно читает у фонтана при свете луны. В одном из окон замка стоит Дима и смотрит на неё, пока она читает. Потом мы видим Азалию в её постели: она спит сладким сном.",
      "source": [
        {
          "file": "dialogues",
          "line": 609,
          "start": 0,
          "end": 202
        }
      ],
      "next": "s05_cs05",
      "emotions": {}
    },
    {
      "id": "s05_cs05",
      "type": "cutscene",
      "cutsceneId": "cs05_fountain_win",
      "source": [],
      "next": "s05_end",
      "emotions": {}
    },
    {
      "id": "s05_end",
      "type": "end",
      "nextScene": "scene06",
      "source": [],
      "next": null,
      "emotions": {}
    }
  ],
  "sourceLedger": [
    {
      "line": 495,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "metadata",
          "text": "Сцена 5. Фонтан"
        }
      ],
      "original": "Сцена 5. Фонтан"
    },
    {
      "line": 496,
      "parts": [],
      "original": ""
    },
    {
      "line": 497,
      "parts": [
        {
          "start": 0,
          "end": 78,
          "kind": "metadata",
          "text": "Где: кабинет на уроке, коридор, двор у фонтана днём и ночью, спальня Пуффендуя"
        }
      ],
      "original": "Где: кабинет на уроке, коридор, двор у фонтана днём и ночью, спальня Пуффендуя"
    },
    {
      "line": 498,
      "parts": [],
      "original": ""
    },
    {
      "line": 499,
      "parts": [
        {
          "start": 0,
          "end": 236,
          "kind": "narration",
          "node": "s05_l499_0",
          "field": "text"
        }
      ],
      "original": "Урок. Азалия сидит, подперев голову рукой, и изо всех сил пытается отбиться от вопросов своей лучшей подруги. Роуз наклонилась к ней почти вплотную. За соседним столом сидит Дима и смотрит на Азалию с мягкой улыбкой, словно любуется ею."
    },
    {
      "line": 500,
      "parts": [],
      "original": ""
    },
    {
      "line": 501,
      "parts": [
        {
          "start": 0,
          "end": 25,
          "kind": "stage",
          "node": "s05_l501_0",
          "field": "annotation"
        },
        {
          "start": 25,
          "end": 196,
          "kind": "dialogue",
          "node": "s05_l501_1",
          "field": "text"
        }
      ],
      "original": "Роуз (шёпотом, взахлёб): «Ты знаешь, я тут кое-что про него узнала. Он любит животных. Он очень умный. Красивый, тут и спорить нечего. И, самое главное, спокойный. Характер у него просто золотой»."
    },
    {
      "line": 502,
      "parts": [],
      "original": ""
    },
    {
      "line": 503,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s05_l503_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 46,
          "kind": "thought",
          "node": "s05_l503_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Не слушаю. Я ничего не слушаю»."
    },
    {
      "line": 504,
      "parts": [],
      "original": ""
    },
    {
      "line": 505,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s05_l505_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 130,
          "kind": "dialogue",
          "node": "s05_l505_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Конечно, бывают моменты, когда он как будто издевается. Но это даже хорошо: он не нюня! Азалия, он, возможно, твоя судьба!»"
    },
    {
      "line": 506,
      "parts": [],
      "original": ""
    },
    {
      "line": 507,
      "parts": [
        {
          "start": 0,
          "end": 96,
          "kind": "narration",
          "node": "s05_l507_0",
          "field": "text"
        }
      ],
      "original": "Азалия чувствует, как взгляд Димы скользит по её затылку, и изо всех сил сдерживает раздражение."
    },
    {
      "line": 508,
      "parts": [],
      "original": ""
    },
    {
      "line": 509,
      "parts": [
        {
          "start": 0,
          "end": 25,
          "kind": "metadata",
          "text": "ВЫБОР: что ответить Роуз?"
        }
      ],
      "original": "ВЫБОР: что ответить Роуз?"
    },
    {
      "line": 510,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 1. "
        },
        {
          "start": 11,
          "end": 49,
          "kind": "choice",
          "node": "choice05_01",
          "option": "choice05_01_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. «Да, он мой будущий парень. Согласна»."
    },
    {
      "line": 511,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 2. "
        },
        {
          "start": 11,
          "end": 24,
          "kind": "choice",
          "node": "choice05_01",
          "option": "choice05_01_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. Отрицать всё."
    },
    {
      "line": 512,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 3. "
        },
        {
          "start": 11,
          "end": 39,
          "kind": "choice",
          "node": "choice05_01",
          "option": "choice05_01_3",
          "field": "text"
        }
      ],
      "original": "Вариант 3. Промолчать и думать о своём."
    },
    {
      "line": 513,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "При варианте 1. "
        },
        {
          "start": 16,
          "end": 73,
          "kind": "narration",
          "node": "s05_l513_1",
          "field": "text"
        }
      ],
      "original": "При варианте 1. Роуз смотрит на Азалию так, будто довела её окончательно."
    },
    {
      "line": 514,
      "parts": [],
      "original": ""
    },
    {
      "line": 515,
      "parts": [
        {
          "start": 0,
          "end": 18,
          "kind": "stage",
          "node": "s05_l515_0",
          "field": "annotation"
        },
        {
          "start": 18,
          "end": 103,
          "kind": "dialogue",
          "node": "s05_l515_1",
          "field": "text"
        }
      ],
      "original": "Роуз (осторожно): «Азалия... Может, тебе стоит обратиться к специалисту? Это на тебя совсем не похоже»."
    },
    {
      "line": 516,
      "parts": [],
      "original": ""
    },
    {
      "line": 517,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "При варианте 2. "
        },
        {
          "start": 16,
          "end": 34,
          "kind": "stage",
          "node": "s05_l517_0",
          "field": "annotation"
        },
        {
          "start": 34,
          "end": 89,
          "kind": "dialogue",
          "node": "s05_l517_1",
          "field": "text"
        }
      ],
      "original": "При варианте 2. Азалия (шёпотом): «Ничего подобного. Он мне не нравится. Вообще. Совсем»."
    },
    {
      "line": 518,
      "parts": [],
      "original": ""
    },
    {
      "line": 519,
      "parts": [
        {
          "start": 0,
          "end": 95,
          "kind": "narration",
          "node": "s05_l519_0",
          "field": "text"
        }
      ],
      "original": "Нападки Роуз только усиливаются: любя, но очень раздражающе она лезет к Азалии ещё настойчивее."
    },
    {
      "line": 520,
      "parts": [],
      "original": ""
    },
    {
      "line": 521,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "При варианте 3. "
        },
        {
          "start": 16,
          "end": 95,
          "kind": "narration",
          "node": "s05_l521_1",
          "field": "text"
        }
      ],
      "original": "При варианте 3. Азалия молчит и думает о своём. Ничего не меняется: Роуз продолжает тараторить."
    },
    {
      "line": 522,
      "parts": [
        {
          "start": 0,
          "end": 143,
          "kind": "narration",
          "node": "s05_l522_0",
          "field": "text"
        }
      ],
      "original": "Урок заканчивается. Азалия провожает Диму раздражённым взглядом: из-за того, что он так нагло пялился на неё, подруга не отстала ни на секунду."
    },
    {
      "line": 523,
      "parts": [
        {
          "start": 0,
          "end": 160,
          "kind": "narration",
          "node": "s05_l523_0",
          "field": "text"
        }
      ],
      "original": "К ним подходит их компания: Гермиона, Гарри, Рон, близнецы и, конечно, Тео, который всегда с ними. И тут Роуз вдруг начинает говорить о парнях при брате Азалии."
    },
    {
      "line": 524,
      "parts": [],
      "original": ""
    },
    {
      "line": 525,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "stage",
          "node": "s05_l525_0",
          "field": "annotation"
        },
        {
          "start": 29,
          "end": 76,
          "kind": "dialogue",
          "node": "s05_l525_1",
          "field": "text"
        }
      ],
      "original": "Роуз (с загадочной улыбкой): «А вы знаете, что на Азалию тут один парень...»"
    },
    {
      "line": 526,
      "parts": [],
      "original": ""
    },
    {
      "line": 527,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s05_l527_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 15,
          "kind": "dialogue",
          "node": "s05_l527_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Роуз!»"
    },
    {
      "line": 528,
      "parts": [],
      "original": ""
    },
    {
      "line": 529,
      "parts": [
        {
          "start": 0,
          "end": 67,
          "kind": "narration",
          "node": "s05_l529_0",
          "field": "text"
        }
      ],
      "original": "Азалия бросается к подруге, пытаясь закрыть ей рот, но не успевает."
    },
    {
      "line": 530,
      "parts": [],
      "original": ""
    },
    {
      "line": 531,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "stage",
          "node": "s05_l531_0",
          "field": "annotation"
        },
        {
          "start": 29,
          "end": 112,
          "kind": "dialogue",
          "node": "s05_l531_1",
          "field": "text"
        }
      ],
      "original": "Роуз (хохоча, уворачиваясь): «...пялится на каждом уроке! А она вся такая «мне не нравится», а сама покраснела!»"
    },
    {
      "line": 532,
      "parts": [],
      "original": ""
    },
    {
      "line": 533,
      "parts": [
        {
          "start": 0,
          "end": 80,
          "kind": "narration",
          "node": "s05_l533_0",
          "field": "text"
        }
      ],
      "original": "Все смеются. Только Тео не смеётся. Он смотрит на сестру и подходит к ней ближе."
    },
    {
      "line": 534,
      "parts": [],
      "original": ""
    },
    {
      "line": 535,
      "parts": [
        {
          "start": 0,
          "end": 12,
          "kind": "stage",
          "node": "s05_l535_0",
          "field": "annotation"
        },
        {
          "start": 12,
          "end": 30,
          "kind": "dialogue",
          "node": "s05_l535_1",
          "field": "text"
        }
      ],
      "original": "Тео (тихо): «Он к тебе лезет?»"
    },
    {
      "line": 536,
      "parts": [],
      "original": ""
    },
    {
      "line": 537,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s05_l537_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 234,
          "kind": "dialogue",
          "node": "s05_l537_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Нет. Всё хорошо. Если у меня будут какие-то проблемы, я и сама могу справиться. И вообще, если у меня будет парень или кто-то будет пытаться за мной ухаживать, не стоит лезть в мою личную жизнь. Это я тебе на будущее говорю»."
    },
    {
      "line": 538,
      "parts": [],
      "original": ""
    },
    {
      "line": 539,
      "parts": [
        {
          "start": 0,
          "end": 115,
          "kind": "narration",
          "node": "s05_l539_0",
          "field": "text"
        }
      ],
      "original": "Тео вздыхает. Он понимает, что бояться ему, в общем-то, нечего, и возвращается к ребятам, снова начиная веселиться."
    },
    {
      "line": 540,
      "parts": [],
      "original": ""
    },
    {
      "line": 541,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s05_l541_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 63,
          "kind": "dialogue",
          "node": "s05_l541_1",
          "field": "text"
        }
      ],
      "original": "Фред: «Слушайте, а давайте проверим, подходит ли ей этот Дима»."
    },
    {
      "line": 542,
      "parts": [],
      "original": ""
    },
    {
      "line": 543,
      "parts": [
        {
          "start": 0,
          "end": 25,
          "kind": "stage",
          "node": "s05_l543_0",
          "field": "annotation"
        },
        {
          "start": 25,
          "end": 32,
          "kind": "dialogue",
          "node": "s05_l543_1",
          "field": "text"
        }
      ],
      "original": "Тео и Азалия (в унисон): «ЧТО?!»"
    },
    {
      "line": 544,
      "parts": [],
      "original": ""
    },
    {
      "line": 545,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s05_l545_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 17,
          "kind": "dialogue",
          "node": "s05_l545_1",
          "field": "text"
        }
      ],
      "original": "Джордж: «Кто за?»"
    },
    {
      "line": 546,
      "parts": [],
      "original": ""
    },
    {
      "line": 547,
      "parts": [
        {
          "start": 0,
          "end": 39,
          "kind": "narration",
          "node": "s05_l547_0",
          "field": "text"
        }
      ],
      "original": "Руки поднимают все, кроме Тео и Азалии."
    },
    {
      "line": 548,
      "parts": [],
      "original": ""
    },
    {
      "line": 549,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s05_l549_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 36,
          "kind": "dialogue",
          "node": "s05_l549_1",
          "field": "text"
        }
      ],
      "original": "Фред: «Мнение большинства победило»."
    },
    {
      "line": 550,
      "parts": [],
      "original": ""
    },
    {
      "line": 551,
      "parts": [
        {
          "start": 0,
          "end": 142,
          "kind": "narration",
          "node": "s05_l551_0",
          "field": "text"
        }
      ],
      "original": "Смена кадра: двор. Вся компания прячется за кустами и колонной. У фонтана на скамейке сидит Дима. Он достаёт из сумки книгу и начинает читать."
    },
    {
      "line": 552,
      "parts": [],
      "original": ""
    },
    {
      "line": 553,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "stage",
          "node": "s05_l553_0",
          "field": "annotation"
        },
        {
          "start": 15,
          "end": 41,
          "kind": "dialogue",
          "node": "s05_l553_1",
          "field": "text"
        }
      ],
      "original": "Рон (шёпотом): «Ну вот. Первое сходство»."
    },
    {
      "line": 554,
      "parts": [],
      "original": ""
    },
    {
      "line": 555,
      "parts": [
        {
          "start": 0,
          "end": 20,
          "kind": "stage",
          "node": "s05_l555_0",
          "field": "annotation"
        },
        {
          "start": 20,
          "end": 43,
          "kind": "dialogue",
          "node": "s05_l555_1",
          "field": "text"
        }
      ],
      "original": "Гермиона (шёпотом): «Они оба любят читать»."
    },
    {
      "line": 556,
      "parts": [],
      "original": ""
    },
    {
      "line": 557,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s05_l557_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 24,
          "kind": "dialogue",
          "node": "s05_l557_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Туф. Идите вы»."
    },
    {
      "line": 558,
      "parts": [],
      "original": ""
    },
    {
      "line": 559,
      "parts": [
        {
          "start": 0,
          "end": 142,
          "kind": "narration",
          "node": "s05_l559_0",
          "field": "text"
        }
      ],
      "original": "Через некоторое время всем становится скучно, и компания уходит, болтая и дурачась. Азалия задерживается на секунду и окидывает Диму взглядом."
    },
    {
      "line": 560,
      "parts": [],
      "original": ""
    },
    {
      "line": 561,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s05_l561_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 61,
          "kind": "thought",
          "node": "s05_l561_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Действительно. У нас с ним есть что-то общее»."
    },
    {
      "line": 562,
      "parts": [],
      "original": ""
    },
    {
      "line": 563,
      "parts": [
        {
          "start": 0,
          "end": 4,
          "kind": "metadata",
          "text": "Ночь"
        }
      ],
      "original": "Ночь"
    },
    {
      "line": 564,
      "parts": [
        {
          "start": 0,
          "end": 102,
          "kind": "narration",
          "node": "s05_l564_0",
          "field": "text"
        }
      ],
      "original": "Спальня Пуффендуя. Азалия лежит в кровати с открытыми глазами и ворочается с боку на бок. Сон не идёт."
    },
    {
      "line": 565,
      "parts": [],
      "original": ""
    },
    {
      "line": 566,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s05_l566_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 91,
          "kind": "thought",
          "node": "s05_l566_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Так. Всё. Тихо выйду и посижу у фонтана. Успокою мысли, а потом лягу спать»."
    },
    {
      "line": 567,
      "parts": [],
      "original": ""
    },
    {
      "line": 568,
      "parts": [
        {
          "start": 0,
          "end": 60,
          "kind": "narration",
          "node": "s05_l568_0",
          "field": "text"
        }
      ],
      "original": "Она берёт с тумбочки книгу и на цыпочках выходит из комнаты."
    },
    {
      "line": 569,
      "parts": [],
      "original": ""
    },
    {
      "line": 570,
      "parts": [
        {
          "start": 0,
          "end": 99,
          "kind": "metadata",
          "text": "Мини-игра: нужно пробраться незамеченной мимо одного учителя и одного старосты. Всего пять попыток."
        }
      ],
      "original": "Мини-игра: нужно пробраться незамеченной мимо одного учителя и одного старосты. Всего пять попыток."
    },
    {
      "line": 571,
      "parts": [
        {
          "start": 0,
          "end": 28,
          "kind": "metadata",
          "text": "Если мини-игра не пройдена. "
        },
        {
          "start": 28,
          "end": 173,
          "kind": "narration",
          "node": "s05_l571_1",
          "field": "text"
        }
      ],
      "original": "Если мини-игра не пройдена. Азалия через силу засыпает сидя прямо в комнате. Смена кадра: двор. Дима сидит на скамейке у фонтана и читает. Он закрывает книгу и тихо говорит."
    },
    {
      "line": 572,
      "parts": [],
      "original": ""
    },
    {
      "line": 573,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s05_l573_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 32,
          "kind": "dialogue",
          "node": "s05_l573_1",
          "field": "text"
        }
      ],
      "original": "Дима: «А я думал, она придёт...»"
    },
    {
      "line": 574,
      "parts": [],
      "original": ""
    },
    {
      "line": 575,
      "parts": [
        {
          "start": 0,
          "end": 12,
          "kind": "metadata",
          "text": "Конец ветки."
        }
      ],
      "original": "Конец ветки."
    },
    {
      "line": 576,
      "parts": [],
      "original": ""
    },
    {
      "line": 577,
      "parts": [
        {
          "start": 0,
          "end": 25,
          "kind": "metadata",
          "text": "Если мини-игра пройдена. "
        },
        {
          "start": 25,
          "end": 228,
          "kind": "narration",
          "node": "s05_l577_1",
          "field": "text"
        }
      ],
      "original": "Если мини-игра пройдена. Двор. Лунный свет, тихий плеск фонтана. Азалия садится на скамейку, открывает книгу и начинает читать. Из темноты за её спиной выползает тёмный силуэт и медленно подкрадывается. Рука ложится ей на плечо."
    },
    {
      "line": 578,
      "parts": [],
      "original": ""
    },
    {
      "line": 579,
      "parts": [
        {
          "start": 0,
          "end": 145,
          "kind": "narration",
          "node": "s05_l579_0",
          "field": "text"
        }
      ],
      "original": "Азалия вскакивает, кувырком уходит вперёд, выхватывает палочку и встаёт в боевую стойку. Силуэт выходит из темноты. Это Дима, с поднятыми руками."
    },
    {
      "line": 580,
      "parts": [],
      "original": ""
    },
    {
      "line": 581,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s05_l581_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 19,
          "kind": "dialogue",
          "node": "s05_l581_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Тише, тише!»"
    },
    {
      "line": 582,
      "parts": [],
      "original": ""
    },
    {
      "line": 583,
      "parts": [
        {
          "start": 0,
          "end": 83,
          "kind": "narration",
          "node": "s05_l583_0",
          "field": "text"
        }
      ],
      "original": "Азалия, поняв, кто это, опускает палочку и шипит шёпотом, чтобы не разбудить замок."
    },
    {
      "line": 584,
      "parts": [],
      "original": ""
    },
    {
      "line": 585,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s05_l585_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 86,
          "kind": "dialogue",
          "node": "s05_l585_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ты какого лешего меня так пугаешь?! Да ещё ночью! Что ты тут вообще делаешь?»"
    },
    {
      "line": 586,
      "parts": [],
      "original": ""
    },
    {
      "line": 587,
      "parts": [
        {
          "start": 0,
          "end": 32,
          "kind": "stage",
          "node": "s05_l587_0",
          "field": "annotation"
        },
        {
          "start": 32,
          "end": 167,
          "kind": "dialogue",
          "node": "s05_l587_1",
          "field": "text"
        },
        {
          "start": 167,
          "end": 177,
          "kind": "stage",
          "node": "s05_l587_2",
          "field": "annotation"
        },
        {
          "start": 177,
          "end": 309,
          "kind": "dialogue",
          "node": "s05_l587_3",
          "field": "text"
        }
      ],
      "original": "Дима (спокойно, чуть улыбаясь): «Я вообще-то тут всегда перед сном читаю. Мне интереснее другое: почему ты именно сюда резко решила прийти? До этого тебя тут не было». (Пауза.) «И на всякий случай: если ещё раз придёшь, лучше убегай, а не доставай палочку. У преподавателей всё-таки опыта больше, чем у тебя»."
    },
    {
      "line": 588,
      "parts": [],
      "original": ""
    },
    {
      "line": 589,
      "parts": [
        {
          "start": 0,
          "end": 120,
          "kind": "narration",
          "node": "s05_l589_0",
          "field": "text"
        }
      ],
      "original": "Азалия вспоминает, как они всей компанией следили за ним, как он сидел вот на этой самой скамейке. Щёки слегка розовеют."
    },
    {
      "line": 590,
      "parts": [],
      "original": ""
    },
    {
      "line": 591,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s05_l591_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 23,
          "kind": "dialogue",
          "node": "s05_l591_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Туф. Отстань»."
    },
    {
      "line": 592,
      "parts": [],
      "original": ""
    },
    {
      "line": 593,
      "parts": [
        {
          "start": 0,
          "end": 81,
          "kind": "narration",
          "node": "s05_l593_0",
          "field": "text"
        }
      ],
      "original": "Дима замечает румянец. Он подходит ближе и, наклонившись к самому её уху, шепчет."
    },
    {
      "line": 594,
      "parts": [],
      "original": ""
    },
    {
      "line": 595,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s05_l595_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 17,
          "kind": "dialogue",
          "node": "s05_l595_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Stupenda»."
    },
    {
      "line": 596,
      "parts": [],
      "original": ""
    },
    {
      "line": 597,
      "parts": [
        {
          "start": 0,
          "end": 51,
          "kind": "narration",
          "node": "s05_l597_0",
          "field": "text"
        }
      ],
      "original": "Он отстраняется и добавляет как ни в чём не бывало."
    },
    {
      "line": 598,
      "parts": [],
      "original": ""
    },
    {
      "line": 599,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s05_l599_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 164,
          "kind": "dialogue",
          "node": "s05_l599_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Ладно, не буду тебе мешать отдыхать. Будь аккуратнее: великий и ужасный Снейп понял, что я сюда бегаю, так что тебе тоже стоит остерегаться. Спокойной ночи»."
    },
    {
      "line": 600,
      "parts": [],
      "original": ""
    },
    {
      "line": 601,
      "parts": [
        {
          "start": 0,
          "end": 58,
          "kind": "narration",
          "node": "s05_l601_0",
          "field": "text"
        }
      ],
      "original": "Он уходит. Азалия остаётся сидеть на скамейке, оглушённая."
    },
    {
      "line": 602,
      "parts": [],
      "original": ""
    },
    {
      "line": 603,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "stage",
          "node": "s05_l603_0",
          "field": "annotation"
        },
        {
          "start": 29,
          "end": 43,
          "kind": "dialogue",
          "node": "s05_l603_1",
          "field": "text"
        }
      ],
      "original": "Азалия (тихо и очень нежно): «Спокойной...»"
    },
    {
      "line": 604,
      "parts": [],
      "original": ""
    },
    {
      "line": 605,
      "parts": [
        {
          "start": 0,
          "end": 60,
          "kind": "narration",
          "node": "s05_l605_0",
          "field": "text"
        }
      ],
      "original": "Несколько секунд она смотрит ему вслед. Затем лицо меняется."
    },
    {
      "line": 606,
      "parts": [],
      "original": ""
    },
    {
      "line": 607,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "stage",
          "node": "s05_l607_0",
          "field": "annotation"
        },
        {
          "start": 21,
          "end": 88,
          "kind": "dialogue",
          "node": "s05_l607_1",
          "field": "text"
        }
      ],
      "original": "Азалия (возмущённо): «Стоп. Он что, назвал меня тупой?! Что это слово вообще означает?!»"
    },
    {
      "line": 608,
      "parts": [],
      "original": ""
    },
    {
      "line": 609,
      "parts": [
        {
          "start": 0,
          "end": 202,
          "kind": "stage",
          "node": "s05_l609_0",
          "field": "annotation"
        }
      ],
      "original": "Затемнение. Азалия, успокоившись, спокойно читает у фонтана при свете луны. В одном из окон замка стоит Дима и смотрит на неё, пока она читает. Потом мы видим Азалию в её постели: она спит сладким сном."
    },
    {
      "line": 610,
      "parts": [],
      "original": ""
    },
    {
      "line": 611,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "metadata",
          "text": "Конец сцены 5."
        }
      ],
      "original": "Конец сцены 5."
    },
    {
      "line": 612,
      "parts": [],
      "original": ""
    }
  ]
};

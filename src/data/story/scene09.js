export default {
  "schemaVersion": 1,
  "id": "scene09",
  "start": "s09_start",
  "scope": [
    871,
    936
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "nodes": [
    {
      "id": "s09_start",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s09_end",
      "source": [],
      "else": "s09_enter",
      "next": null
    },
    {
      "id": "s09_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_hufflepuff_dorm_morning",
      "characters": [
        "azalia",
        "rose"
      ],
      "source": [],
      "next": "s09_l873_0"
    },
    {
      "id": "s09_l873_0",
      "type": "narration",
      "text": "Утро. Спальня Пуффендуя. Азалия стоит перед Роуз, скрестив руки на груди.",
      "source": [
        {
          "file": "dialogues",
          "line": 873,
          "start": 0,
          "end": 73
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
      "next": "s09_l875_0"
    },
    {
      "id": "s09_l875_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 875,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s09_l875_1"
    },
    {
      "id": "s09_l875_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Роуз. Ты пошла рассказывать моему родному брату, что у меня там какой-то мальчик. Даже не подумав о последствиях».",
      "source": [
        {
          "file": "dialogues",
          "line": 875,
          "start": 8,
          "end": 123
        }
      ],
      "next": "s09_l877_0"
    },
    {
      "id": "s09_l877_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (виновато): ",
      "source": [
        {
          "file": "dialogues",
          "line": 877,
          "start": 0,
          "end": 17
        }
      ],
      "next": "s09_l877_1"
    },
    {
      "id": "s09_l877_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Я просто так обрадовалась...»",
      "source": [
        {
          "file": "dialogues",
          "line": 877,
          "start": 17,
          "end": 47
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "tilt",
          "amplitude": 2,
          "durationMs": 500
        }
      ],
      "next": "s09_l879_0"
    },
    {
      "id": "s09_l879_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 879,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s09_l879_1"
    },
    {
      "id": "s09_l879_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Теперь ты будешь помогать мне с оформлением подарка для Тео. Я хочу перед ним извиниться и помириться».",
      "source": [
        {
          "file": "dialogues",
          "line": 879,
          "start": 8,
          "end": 112
        }
      ],
      "next": "s09_l881_0"
    },
    {
      "id": "s09_l881_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (жалобно и грустно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 881,
          "start": 0,
          "end": 26
        }
      ],
      "next": "s09_l881_1"
    },
    {
      "id": "s09_l881_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«А что мы будем дарить?»",
      "source": [
        {
          "file": "dialogues",
          "line": 881,
          "start": 26,
          "end": 50
        }
      ],
      "next": "choice09_01"
    },
    {
      "id": "choice09_01",
      "type": "choice",
      "options": [
        {
          "id": "choice09_01_1",
          "text": "Кожаную куртку.",
          "effects": [
            {
              "variable": "theoGift",
              "value": "jacket"
            }
          ],
          "next": "s09_l886_1",
          "source": [
            {
              "file": "dialogues",
              "line": 883,
              "start": 11,
              "end": 26
            }
          ]
        },
        {
          "id": "choice09_01_2",
          "text": "Электрогитару.",
          "effects": [
            {
              "variable": "theoGift",
              "value": "guitar"
            }
          ],
          "next": "s09_l886_1",
          "source": [
            {
              "file": "dialogues",
              "line": 884,
              "start": 11,
              "end": 25
            }
          ]
        },
        {
          "id": "choice09_01_3",
          "text": "Роуз.",
          "effects": [
            {
              "variable": "theoGift",
              "value": "guitar"
            }
          ],
          "next": "s09_l887_1",
          "source": [
            {
              "file": "dialogues",
              "line": 885,
              "start": 11,
              "end": 16
            }
          ]
        }
      ],
      "source": [],
      "next": null
    },
    {
      "id": "s09_l886_1",
      "type": "narration",
      "text": "Роуз кивает и достаёт из-под кровати рулон упаковочной бумаги.",
      "source": [
        {
          "file": "dialogues",
          "line": 886,
          "start": 21,
          "end": 83
        }
      ],
      "next": "s09_l891_0"
    },
    {
      "id": "s09_l887_1",
      "type": "narration",
      "text": "Роуз краснеет.",
      "cues": [
        {
          "target": "rose",
          "effect": "shake",
          "amplitude": 3,
          "durationMs": 450
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 887,
          "start": 16,
          "end": 30
        }
      ],
      "next": "s09_l888_0"
    },
    {
      "id": "s09_l888_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 888,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s09_l888_1"
    },
    {
      "id": "s09_l888_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Так. Мы так не шутим. Предлагаю гитару».",
      "source": [
        {
          "file": "dialogues",
          "line": 888,
          "start": 6,
          "end": 47
        }
      ],
      "next": "s09_l889_0"
    },
    {
      "id": "s09_l889_0",
      "type": "narration",
      "text": "Она достаёт упаковочную бумагу и принимается заворачивать гитару.",
      "source": [
        {
          "file": "dialogues",
          "line": 889,
          "start": 0,
          "end": 65
        }
      ],
      "next": "s09_l891_0"
    },
    {
      "id": "s09_l891_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 891,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s09_l891_1"
    },
    {
      "id": "s09_l891_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Иди к Диме, объясни ему план. А ещё...»",
      "source": [
        {
          "file": "dialogues",
          "line": 891,
          "start": 6,
          "end": 46
        }
      ],
      "next": "s09_l891_2"
    },
    {
      "id": "s09_l891_2",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": " (Пауза.) ",
      "source": [
        {
          "file": "dialogues",
          "line": 891,
          "start": 46,
          "end": 56
        }
      ],
      "next": "s09_l891_3"
    },
    {
      "id": "s09_l891_3",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Вы уже встречаетесь?»",
      "source": [
        {
          "file": "dialogues",
          "line": 891,
          "start": 56,
          "end": 78
        }
      ],
      "next": "s09_l893_0"
    },
    {
      "id": "s09_l893_0",
      "type": "narration",
      "text": "Азалия замирает.",
      "source": [
        {
          "file": "dialogues",
          "line": 893,
          "start": 0,
          "end": 16
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
      "next": "s09_l895_0"
    },
    {
      "id": "s09_l895_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 895,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s09_l895_1"
    },
    {
      "id": "s09_l895_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«А правда. Мы с ним встречаемся или нет?»",
      "source": [
        {
          "file": "dialogues",
          "line": 895,
          "start": 14,
          "end": 55
        }
      ],
      "next": "s09_l897_0"
    },
    {
      "id": "s09_l897_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 897,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s09_l897_1"
    },
    {
      "id": "s09_l897_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ладно. Потом об этом ничего не буду тебе говорить. Всё, я пошла, а ты упаковывай».",
      "source": [
        {
          "file": "dialogues",
          "line": 897,
          "start": 8,
          "end": 91
        }
      ],
      "next": "s09_l899_0"
    },
    {
      "id": "s09_l899_0",
      "type": "narration",
      "text": "Коридор. Азалия находит Диму.",
      "source": [
        {
          "file": "dialogues",
          "line": 899,
          "start": 0,
          "end": 29
        }
      ],
      "next": "s09_enter_corridor"
    },
    {
      "id": "s09_enter_corridor",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "azalia",
        "dima"
      ],
      "source": [],
      "next": "s09_l901_0"
    },
    {
      "id": "s09_l901_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 901,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s09_l901_1"
    },
    {
      "id": "s09_l901_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Мне нужна твоя помощь. Надо, чтобы ты привёл Тео в комнату Пуффендуя, но так, чтобы он не понял зачем. Если что, скажи что-нибудь про Седрика».",
      "source": [
        {
          "file": "dialogues",
          "line": 901,
          "start": 8,
          "end": 152
        }
      ],
      "next": "s09_l903_0"
    },
    {
      "id": "s09_l903_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 903,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s09_l903_1"
    },
    {
      "id": "s09_l903_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Хорошо».",
      "source": [
        {
          "file": "dialogues",
          "line": 903,
          "start": 6,
          "end": 15
        }
      ],
      "next": "s09_l905_0"
    },
    {
      "id": "s09_l905_0",
      "type": "narration",
      "text": "Он остаётся ждать в коридоре. Вскоре появляется Тео. Они здороваются.",
      "source": [
        {
          "file": "dialogues",
          "line": 905,
          "start": 0,
          "end": 69
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 450
        },
        {
          "target": "theo",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 480,
          "delayMs": 100
        },
        {
          "target": "theo",
          "effect": "focus",
          "delayMs": 220
        }
      ],
      "next": "s09_l907_0"
    },
    {
      "id": "s09_l907_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 907,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s09_l907_1"
    },
    {
      "id": "s09_l907_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Тебя в комнате Пуффендуя ждёт Седрик. Он там что-то хотел обсудить».",
      "source": [
        {
          "file": "dialogues",
          "line": 907,
          "start": 6,
          "end": 75
        }
      ],
      "next": "s09_l909_0"
    },
    {
      "id": "s09_l909_0",
      "type": "narration",
      "text": "Тео смотрит на него максимально странно. Он прекрасно понимает, к чему всё идёт.",
      "source": [
        {
          "file": "dialogues",
          "line": 909,
          "start": 0,
          "end": 80
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "focus"
        },
        {
          "target": "theo",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s09_l911_0"
    },
    {
      "id": "s09_l911_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 911,
          "start": 0,
          "end": 11
        }
      ],
      "next": "s09_l911_1"
    },
    {
      "id": "s09_l911_1",
      "type": "thought",
      "speaker": "theo",
      "text": "«Ладно. Нельзя же вечно обижаться».",
      "source": [
        {
          "file": "dialogues",
          "line": 911,
          "start": 11,
          "end": 46
        }
      ],
      "next": "s09_l913_0"
    },
    {
      "id": "s09_l913_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 913,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s09_l913_1"
    },
    {
      "id": "s09_l913_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Пошли».",
      "source": [
        {
          "file": "dialogues",
          "line": 913,
          "start": 5,
          "end": 13
        }
      ],
      "next": "s09_enter_common"
    },
    {
      "id": "s09_enter_common",
      "type": "scene",
      "action": "enter",
      "background": "bg_hufflepuff_common",
      "characters": [
        "azalia",
        "theo"
      ],
      "source": [],
      "next": "s09_l915_0"
    },
    {
      "id": "s09_l915_0",
      "type": "narration",
      "text": "Комната Пуффендуя. Тео входит. Там стоит Азалия, одна.",
      "source": [
        {
          "file": "dialogues",
          "line": 915,
          "start": 0,
          "end": 54
        }
      ],
      "next": "s09_l917_0"
    },
    {
      "id": "s09_l917_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 917,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s09_l917_1"
    },
    {
      "id": "s09_l917_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Тео, прости меня. Прости, что я тебе ничего не говорила. Просто я никому вообще не хотела об этом рассказывать. Но Роуз догадалась, а я не смогла её остановить. Прости меня, пожалуйста. Давай мириться. Я правда тебе доверяю, просто тогда я хотела сначала всё сама понять».",
      "source": [
        {
          "file": "dialogues",
          "line": 917,
          "start": 8,
          "end": 281
        }
      ],
      "next": "s09_l919_0"
    },
    {
      "id": "s09_l919_0",
      "type": "narration",
      "text": "Тео подходит к ней и обнимает.",
      "source": [
        {
          "file": "dialogues",
          "line": 919,
          "start": 0,
          "end": 30
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "theo",
            "azalia"
          ],
          "durationMs": 650
        },
        {
          "target": "theo",
          "effect": "tilt",
          "amplitude": 2,
          "hold": true,
          "durationMs": 500
        },
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -2,
          "hold": true,
          "durationMs": 500
        },
        {
          "effect": "camera",
          "to": 1.04,
          "durationMs": 900
        },
        {
          "effect": "glow",
          "to": 0.25,
          "durationMs": 900
        }
      ],
      "next": "s09_l921_0"
    },
    {
      "id": "s09_l921_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 921,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s09_l921_1"
    },
    {
      "id": "s09_l921_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Всё хорошо. Я и сам немного вспылил. Так что извини меня».",
      "source": [
        {
          "file": "dialogues",
          "line": 921,
          "start": 5,
          "end": 64
        }
      ],
      "next": "s09_l923_0"
    },
    {
      "id": "s09_l923_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (отстраняясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 923,
          "start": 0,
          "end": 22
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
          "target": "azalia",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 450
        },
        {
          "effect": "camera",
          "to": 1,
          "durationMs": 700
        }
      ],
      "next": "s09_l923_1"
    },
    {
      "id": "s09_l923_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«И вот тебе. В честь примирения».",
      "source": [
        {
          "file": "dialogues",
          "line": 923,
          "start": 22,
          "end": 55
        }
      ],
      "next": "s09_l925_0"
    },
    {
      "id": "s09_l925_0",
      "type": "narration",
      "text": "Она протягивает ему подарок. Тео разворачивает упаковку, достаёт кожаную куртку или электрогитару (в зависимости от выбора) и просто светится.",
      "source": [
        {
          "file": "dialogues",
          "line": 925,
          "start": 0,
          "end": 142
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520
        }
      ],
      "next": "s09_l927_0"
    },
    {
      "id": "s09_l927_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 927,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s09_l927_1"
    },
    {
      "id": "s09_l927_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Не стоило! Мы же могли просто поговорить и всё решить».",
      "source": [
        {
          "file": "dialogues",
          "line": 927,
          "start": 5,
          "end": 61
        }
      ],
      "next": "s09_l929_0"
    },
    {
      "id": "s09_l929_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 929,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s09_l929_1"
    },
    {
      "id": "s09_l929_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Я просто захотела сделать тебе приятно. Что, не нравится?»",
      "source": [
        {
          "file": "dialogues",
          "line": 929,
          "start": 8,
          "end": 67
        }
      ],
      "next": "s09_l931_0"
    },
    {
      "id": "s09_l931_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (поспешно прижимая подарок к груди): ",
      "source": [
        {
          "file": "dialogues",
          "line": 931,
          "start": 0,
          "end": 41
        }
      ],
      "next": "s09_l931_1"
    },
    {
      "id": "s09_l931_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Ладно-ладно, всё понял! Всё мне нравится! Только не забирай!»",
      "source": [
        {
          "file": "dialogues",
          "line": 931,
          "start": 41,
          "end": 103
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s09_l933_0"
    },
    {
      "id": "s09_l933_0",
      "type": "narration",
      "text": "Они смеются.",
      "source": [
        {
          "file": "dialogues",
          "line": 933,
          "start": 0,
          "end": 12
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 550
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 600
        }
      ],
      "next": "s09_l935_0"
    },
    {
      "id": "s09_l935_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Анимация: они выходят из комнаты, продолжая угорать. Их встречает вся оставшаяся компания, и все вместе идут гулять. Но в компании появился новый человек: Дима.",
      "source": [
        {
          "file": "dialogues",
          "line": 935,
          "start": 0,
          "end": 160
        }
      ],
      "next": "s09_cs09"
    },
    {
      "id": "s09_cs09",
      "type": "cutscene",
      "cutsceneId": "cs09",
      "source": [],
      "next": "s09_end"
    },
    {
      "id": "s09_end",
      "type": "end",
      "nextScene": "scene10",
      "source": [],
      "next": null
    }
  ],
  "sourceLedger": [
    {
      "line": 871,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "Сцена 9. Подарок"
        }
      ],
      "original": "Сцена 9. Подарок"
    },
    {
      "line": 872,
      "parts": [
        {
          "start": 0,
          "end": 31,
          "kind": "metadata",
          "text": "Где: спальня Пуффендуя, коридор"
        }
      ],
      "original": "Где: спальня Пуффендуя, коридор"
    },
    {
      "line": 873,
      "parts": [
        {
          "start": 0,
          "end": 73,
          "kind": "narration",
          "node": "s09_l873_0",
          "field": "text"
        }
      ],
      "original": "Утро. Спальня Пуффендуя. Азалия стоит перед Роуз, скрестив руки на груди."
    },
    {
      "line": 874,
      "parts": [],
      "original": ""
    },
    {
      "line": 875,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s09_l875_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 123,
          "kind": "dialogue",
          "node": "s09_l875_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Роуз. Ты пошла рассказывать моему родному брату, что у меня там какой-то мальчик. Даже не подумав о последствиях»."
    },
    {
      "line": 876,
      "parts": [],
      "original": ""
    },
    {
      "line": 877,
      "parts": [
        {
          "start": 0,
          "end": 17,
          "kind": "stage",
          "node": "s09_l877_0",
          "field": "annotation"
        },
        {
          "start": 17,
          "end": 47,
          "kind": "dialogue",
          "node": "s09_l877_1",
          "field": "text"
        }
      ],
      "original": "Роуз (виновато): «Я просто так обрадовалась...»"
    },
    {
      "line": 878,
      "parts": [],
      "original": ""
    },
    {
      "line": 879,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s09_l879_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 112,
          "kind": "dialogue",
          "node": "s09_l879_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Теперь ты будешь помогать мне с оформлением подарка для Тео. Я хочу перед ним извиниться и помириться»."
    },
    {
      "line": 880,
      "parts": [],
      "original": ""
    },
    {
      "line": 881,
      "parts": [
        {
          "start": 0,
          "end": 26,
          "kind": "stage",
          "node": "s09_l881_0",
          "field": "annotation"
        },
        {
          "start": 26,
          "end": 50,
          "kind": "dialogue",
          "node": "s09_l881_1",
          "field": "text"
        }
      ],
      "original": "Роуз (жалобно и грустно): «А что мы будем дарить?»"
    },
    {
      "line": 882,
      "parts": [
        {
          "start": 0,
          "end": 24,
          "kind": "metadata",
          "text": "ВЫБОР: что подарить Тео?"
        }
      ],
      "original": "ВЫБОР: что подарить Тео?"
    },
    {
      "line": 883,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 1. "
        },
        {
          "start": 11,
          "end": 26,
          "kind": "choice",
          "node": "choice09_01",
          "option": "choice09_01_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. Кожаную куртку."
    },
    {
      "line": 884,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 2. "
        },
        {
          "start": 11,
          "end": 25,
          "kind": "choice",
          "node": "choice09_01",
          "option": "choice09_01_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. Электрогитару."
    },
    {
      "line": 885,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 3. "
        },
        {
          "start": 11,
          "end": 16,
          "kind": "choice",
          "node": "choice09_01",
          "option": "choice09_01_3",
          "field": "text"
        }
      ],
      "original": "Вариант 3. Роуз."
    },
    {
      "line": 886,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "metadata",
          "text": "При вариантах 1 и 2. "
        },
        {
          "start": 21,
          "end": 83,
          "kind": "narration",
          "node": "s09_l886_1",
          "field": "text"
        },
        {
          "start": 83,
          "end": 164,
          "kind": "metadata",
          "text": " Дальше подарком будет кожаная куртка или электрогитара, в зависимости от выбора."
        }
      ],
      "original": "При вариантах 1 и 2. Роуз кивает и достаёт из-под кровати рулон упаковочной бумаги. Дальше подарком будет кожаная куртка или электрогитара, в зависимости от выбора."
    },
    {
      "line": 887,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "При варианте 3. "
        },
        {
          "start": 16,
          "end": 30,
          "kind": "narration",
          "node": "s09_l887_1",
          "field": "text"
        }
      ],
      "original": "При варианте 3. Роуз краснеет."
    },
    {
      "line": 888,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s09_l888_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 47,
          "kind": "dialogue",
          "node": "s09_l888_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Так. Мы так не шутим. Предлагаю гитару»."
    },
    {
      "line": 889,
      "parts": [
        {
          "start": 0,
          "end": 65,
          "kind": "narration",
          "node": "s09_l889_0",
          "field": "text"
        }
      ],
      "original": "Она достаёт упаковочную бумагу и принимается заворачивать гитару."
    },
    {
      "line": 890,
      "parts": [
        {
          "start": 0,
          "end": 36,
          "kind": "metadata",
          "text": "Дальше для всех вариантов одинаково."
        }
      ],
      "original": "Дальше для всех вариантов одинаково."
    },
    {
      "line": 891,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s09_l891_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 46,
          "kind": "dialogue",
          "node": "s09_l891_1",
          "field": "text"
        },
        {
          "start": 46,
          "end": 56,
          "kind": "stage",
          "node": "s09_l891_2",
          "field": "annotation"
        },
        {
          "start": 56,
          "end": 78,
          "kind": "dialogue",
          "node": "s09_l891_3",
          "field": "text"
        }
      ],
      "original": "Роуз: «Иди к Диме, объясни ему план. А ещё...» (Пауза.) «Вы уже встречаетесь?»"
    },
    {
      "line": 892,
      "parts": [],
      "original": ""
    },
    {
      "line": 893,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "narration",
          "node": "s09_l893_0",
          "field": "text"
        }
      ],
      "original": "Азалия замирает."
    },
    {
      "line": 894,
      "parts": [],
      "original": ""
    },
    {
      "line": 895,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s09_l895_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 55,
          "kind": "thought",
          "node": "s09_l895_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «А правда. Мы с ним встречаемся или нет?»"
    },
    {
      "line": 896,
      "parts": [],
      "original": ""
    },
    {
      "line": 897,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s09_l897_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 91,
          "kind": "dialogue",
          "node": "s09_l897_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ладно. Потом об этом ничего не буду тебе говорить. Всё, я пошла, а ты упаковывай»."
    },
    {
      "line": 898,
      "parts": [],
      "original": ""
    },
    {
      "line": 899,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "narration",
          "node": "s09_l899_0",
          "field": "text"
        }
      ],
      "original": "Коридор. Азалия находит Диму."
    },
    {
      "line": 900,
      "parts": [],
      "original": ""
    },
    {
      "line": 901,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s09_l901_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 152,
          "kind": "dialogue",
          "node": "s09_l901_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Мне нужна твоя помощь. Надо, чтобы ты привёл Тео в комнату Пуффендуя, но так, чтобы он не понял зачем. Если что, скажи что-нибудь про Седрика»."
    },
    {
      "line": 902,
      "parts": [],
      "original": ""
    },
    {
      "line": 903,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s09_l903_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 15,
          "kind": "dialogue",
          "node": "s09_l903_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Хорошо»."
    },
    {
      "line": 904,
      "parts": [],
      "original": ""
    },
    {
      "line": 905,
      "parts": [
        {
          "start": 0,
          "end": 69,
          "kind": "narration",
          "node": "s09_l905_0",
          "field": "text"
        }
      ],
      "original": "Он остаётся ждать в коридоре. Вскоре появляется Тео. Они здороваются."
    },
    {
      "line": 906,
      "parts": [],
      "original": ""
    },
    {
      "line": 907,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s09_l907_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 75,
          "kind": "dialogue",
          "node": "s09_l907_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Тебя в комнате Пуффендуя ждёт Седрик. Он там что-то хотел обсудить»."
    },
    {
      "line": 908,
      "parts": [],
      "original": ""
    },
    {
      "line": 909,
      "parts": [
        {
          "start": 0,
          "end": 80,
          "kind": "narration",
          "node": "s09_l909_0",
          "field": "text"
        }
      ],
      "original": "Тео смотрит на него максимально странно. Он прекрасно понимает, к чему всё идёт."
    },
    {
      "line": 910,
      "parts": [],
      "original": ""
    },
    {
      "line": 911,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "stage",
          "node": "s09_l911_0",
          "field": "annotation"
        },
        {
          "start": 11,
          "end": 46,
          "kind": "thought",
          "node": "s09_l911_1",
          "field": "text"
        }
      ],
      "original": "Мысли Тео: «Ладно. Нельзя же вечно обижаться»."
    },
    {
      "line": 912,
      "parts": [],
      "original": ""
    },
    {
      "line": 913,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s09_l913_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 13,
          "kind": "dialogue",
          "node": "s09_l913_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Пошли»."
    },
    {
      "line": 914,
      "parts": [],
      "original": ""
    },
    {
      "line": 915,
      "parts": [
        {
          "start": 0,
          "end": 54,
          "kind": "narration",
          "node": "s09_l915_0",
          "field": "text"
        }
      ],
      "original": "Комната Пуффендуя. Тео входит. Там стоит Азалия, одна."
    },
    {
      "line": 916,
      "parts": [],
      "original": ""
    },
    {
      "line": 917,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s09_l917_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 281,
          "kind": "dialogue",
          "node": "s09_l917_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Тео, прости меня. Прости, что я тебе ничего не говорила. Просто я никому вообще не хотела об этом рассказывать. Но Роуз догадалась, а я не смогла её остановить. Прости меня, пожалуйста. Давай мириться. Я правда тебе доверяю, просто тогда я хотела сначала всё сама понять»."
    },
    {
      "line": 918,
      "parts": [],
      "original": ""
    },
    {
      "line": 919,
      "parts": [
        {
          "start": 0,
          "end": 30,
          "kind": "narration",
          "node": "s09_l919_0",
          "field": "text"
        }
      ],
      "original": "Тео подходит к ней и обнимает."
    },
    {
      "line": 920,
      "parts": [],
      "original": ""
    },
    {
      "line": 921,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s09_l921_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 64,
          "kind": "dialogue",
          "node": "s09_l921_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Всё хорошо. Я и сам немного вспылил. Так что извини меня»."
    },
    {
      "line": 922,
      "parts": [],
      "original": ""
    },
    {
      "line": 923,
      "parts": [
        {
          "start": 0,
          "end": 22,
          "kind": "stage",
          "node": "s09_l923_0",
          "field": "annotation"
        },
        {
          "start": 22,
          "end": 55,
          "kind": "dialogue",
          "node": "s09_l923_1",
          "field": "text"
        }
      ],
      "original": "Азалия (отстраняясь): «И вот тебе. В честь примирения»."
    },
    {
      "line": 924,
      "parts": [],
      "original": ""
    },
    {
      "line": 925,
      "parts": [
        {
          "start": 0,
          "end": 142,
          "kind": "narration",
          "node": "s09_l925_0",
          "field": "text"
        }
      ],
      "original": "Она протягивает ему подарок. Тео разворачивает упаковку, достаёт кожаную куртку или электрогитару (в зависимости от выбора) и просто светится."
    },
    {
      "line": 926,
      "parts": [],
      "original": ""
    },
    {
      "line": 927,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s09_l927_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 61,
          "kind": "dialogue",
          "node": "s09_l927_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Не стоило! Мы же могли просто поговорить и всё решить»."
    },
    {
      "line": 928,
      "parts": [],
      "original": ""
    },
    {
      "line": 929,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s09_l929_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 67,
          "kind": "dialogue",
          "node": "s09_l929_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Я просто захотела сделать тебе приятно. Что, не нравится?»"
    },
    {
      "line": 930,
      "parts": [],
      "original": ""
    },
    {
      "line": 931,
      "parts": [
        {
          "start": 0,
          "end": 41,
          "kind": "stage",
          "node": "s09_l931_0",
          "field": "annotation"
        },
        {
          "start": 41,
          "end": 103,
          "kind": "dialogue",
          "node": "s09_l931_1",
          "field": "text"
        }
      ],
      "original": "Тео (поспешно прижимая подарок к груди): «Ладно-ладно, всё понял! Всё мне нравится! Только не забирай!»"
    },
    {
      "line": 932,
      "parts": [],
      "original": ""
    },
    {
      "line": 933,
      "parts": [
        {
          "start": 0,
          "end": 12,
          "kind": "narration",
          "node": "s09_l933_0",
          "field": "text"
        }
      ],
      "original": "Они смеются."
    },
    {
      "line": 934,
      "parts": [],
      "original": ""
    },
    {
      "line": 935,
      "parts": [
        {
          "start": 0,
          "end": 160,
          "kind": "stage",
          "node": "s09_l935_0",
          "field": "annotation"
        }
      ],
      "original": "Анимация: они выходят из комнаты, продолжая угорать. Их встречает вся оставшаяся компания, и все вместе идут гулять. Но в компании появился новый человек: Дима."
    },
    {
      "line": 936,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "metadata",
          "text": "Конец сцены 9."
        }
      ],
      "original": "Конец сцены 9."
    }
  ]
};

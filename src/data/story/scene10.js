export default {
  "schemaVersion": 1,
  "id": "scene10",
  "start": "s10_enter",
  "scope": [
    937,
    980
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "nodes": [
    {
      "id": "s10_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_greenhouse",
      "characters": [
        "sprout",
        "azalia",
        "theo",
        "rose"
      ],
      "source": [],
      "next": "s10_l941_0"
    },
    {
      "id": "s10_l941_0",
      "type": "narration",
      "text": "Теплица. Влажный тёплый воздух, густой запах земли. Ученики стоят вокруг длинных столов, на которых расставлены горшки.",
      "source": [
        {
          "file": "dialogues",
          "line": 941,
          "start": 0,
          "end": 119
        }
      ],
      "cues": [
        {
          "target": "sprout",
          "effect": "focus"
        }
      ],
      "next": "s10_l943_0"
    },
    {
      "id": "s10_l943_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Профессор Стебль (строго): ",
      "source": [
        {
          "file": "dialogues",
          "line": 943,
          "start": 0,
          "end": 27
        }
      ],
      "next": "s10_l943_1"
    },
    {
      "id": "s10_l943_1",
      "type": "dialogue",
      "speaker": "sprout",
      "text": "«Сегодня мы работаем с мандрагорами. Это опасное растение: его крик может оглушить, а может и убить. Наушники надеваете до того, как возьмётесь за растение. Будьте аккуратны».",
      "source": [
        {
          "file": "dialogues",
          "line": 943,
          "start": 27,
          "end": 202
        }
      ],
      "next": "s10_l945_0"
    },
    {
      "id": "s10_l945_0",
      "type": "narration",
      "text": "Она ставит учеников по парам.",
      "source": [
        {
          "file": "dialogues",
          "line": 945,
          "start": 0,
          "end": 29
        }
      ],
      "next": "s10_l947_0"
    },
    {
      "id": "s10_l947_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Профессор Стебль: ",
      "source": [
        {
          "file": "dialogues",
          "line": 947,
          "start": 0,
          "end": 18
        }
      ],
      "next": "s10_l947_1"
    },
    {
      "id": "s10_l947_1",
      "type": "dialogue",
      "speaker": "sprout",
      "text": "«Тео Блэк и Роуз...»",
      "source": [
        {
          "file": "dialogues",
          "line": 947,
          "start": 18,
          "end": 38
        }
      ],
      "next": "s10_l949_0"
    },
    {
      "id": "s10_l949_0",
      "type": "narration",
      "text": "Азалия принимается лихорадочно думать, с кем же поставят её.",
      "source": [
        {
          "file": "dialogues",
          "line": 949,
          "start": 0,
          "end": 60
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 450
        },
        {
          "target": "rose",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 450,
          "delayMs": 80
        },
        {
          "target": "azalia",
          "effect": "focus",
          "delayMs": 200
        }
      ],
      "next": "s10_l951_0"
    },
    {
      "id": "s10_l951_0",
      "type": "narration",
      "text": "И тут она замечает у стола Диму, и её лицо расплывается в улыбке. Они начинают болтать, расставляя инструменты.",
      "source": [
        {
          "file": "dialogues",
          "line": 951,
          "start": 0,
          "end": 111
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 500
        },
        {
          "effect": "group",
          "targets": [
            "dima",
            "azalia"
          ],
          "durationMs": 600,
          "delayMs": 120
        },
        {
          "target": "dima",
          "effect": "focus",
          "delayMs": 220
        }
      ],
      "next": "s10_l953_0"
    },
    {
      "id": "s10_l953_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 953,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s10_l953_1"
    },
    {
      "id": "s10_l953_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ты вообще понимаешь, что мы можем остаться без слуха?»",
      "source": [
        {
          "file": "dialogues",
          "line": 953,
          "start": 8,
          "end": 63
        }
      ],
      "next": "s10_l955_0"
    },
    {
      "id": "s10_l955_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 955,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s10_l955_1"
    },
    {
      "id": "s10_l955_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Понимаю. Я приму удар на себя».",
      "source": [
        {
          "file": "dialogues",
          "line": 955,
          "start": 6,
          "end": 38
        }
      ],
      "next": "s10_l957_0"
    },
    {
      "id": "s10_l957_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 957,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s10_l957_1"
    },
    {
      "id": "s10_l957_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Очень смешно».",
      "source": [
        {
          "file": "dialogues",
          "line": 957,
          "start": 8,
          "end": 23
        }
      ],
      "next": "s10_l959_0"
    },
    {
      "id": "s10_l959_0",
      "type": "narration",
      "text": "Но тут Малфой, стоящий за соседним столом, ухмыляясь, выдёргивает свою мандрагору из горшка. Без наушников.",
      "source": [
        {
          "file": "dialogues",
          "line": 959,
          "start": 0,
          "end": 107
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 450
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 480
        },
        {
          "target": "malfoy",
          "effect": "focus",
          "delayMs": 150
        }
      ],
      "next": "s10_l961_0"
    },
    {
      "id": "s10_l961_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Профессор Стебль: ",
      "source": [
        {
          "file": "dialogues",
          "line": 961,
          "start": 0,
          "end": 18
        }
      ],
      "next": "s10_l961_1"
    },
    {
      "id": "s10_l961_1",
      "type": "dialogue",
      "speaker": "sprout",
      "text": "«МАЛФОЙ!»",
      "source": [
        {
          "file": "dialogues",
          "line": 961,
          "start": 18,
          "end": 27
        }
      ],
      "cues": [
        {
          "target": "sprout",
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        }
      ],
      "next": "s10_l963_0"
    },
    {
      "id": "s10_l963_0",
      "type": "narration",
      "text": "Оглушительный вопль. Звуковая волна накрывает теплицу.",
      "source": [
        {
          "file": "dialogues",
          "line": 963,
          "start": 0,
          "end": 54
        }
      ],
      "cues": [
        {
          "effect": "shake",
          "amplitude": 4.5,
          "durationMs": 520
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 450
        },
        {
          "target": "sprout",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 450
        }
      ],
      "next": "s10_l965_0"
    },
    {
      "id": "s10_l965_0",
      "type": "narration",
      "text": "Дима мгновенно надевает наушники. Азалия садится на корточки, зажимая уши ладонями. Дима тут же надевает наушники и на неё. Их лица оказываются очень близко друг к другу. Сквозь гул они смотрят друг другу в глаза.",
      "source": [
        {
          "file": "dialogues",
          "line": 965,
          "start": 0,
          "end": 213
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
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -2.2,
          "hold": true,
          "durationMs": 550
        },
        {
          "effect": "camera",
          "to": 1.06,
          "durationMs": 1000
        },
        {
          "effect": "glow",
          "to": 0.3,
          "durationMs": 1000
        }
      ],
      "next": "choice10_01"
    },
    {
      "id": "choice10_01",
      "type": "choice",
      "options": [
        {
          "id": "choice10_01_1",
          "text": "Поцеловаться.",
          "next": "s10_l970_1",
          "source": [
            {
              "file": "dialogues",
              "line": 968,
              "start": 11,
              "end": 24
            }
          ]
        },
        {
          "id": "choice10_01_2",
          "text": "Не целоваться.",
          "next": "s10_l974_1",
          "source": [
            {
              "file": "dialogues",
              "line": 969,
              "start": 11,
              "end": 25
            }
          ]
        }
      ],
      "source": [],
      "next": null
    },
    {
      "id": "s10_l970_1",
      "type": "narration",
      "text": "Они целуются. Потом Дима отстраняется и говорит достаточно громко, чтобы его было слышно сквозь наушники.",
      "cues": [
        {
          "effect": "glow",
          "to": 0.35,
          "durationMs": 700
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 970,
          "start": 16,
          "end": 121
        }
      ],
      "next": "s10_l971_0"
    },
    {
      "id": "s10_l971_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 971,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s10_l971_1"
    },
    {
      "id": "s10_l971_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Азалия, ты будешь моей девушкой? Хочешь ли ты со мной встречаться?»",
      "source": [
        {
          "file": "dialogues",
          "line": 971,
          "start": 6,
          "end": 74
        }
      ],
      "next": "s10_l972_0"
    },
    {
      "id": "s10_l972_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (смеясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 972,
          "start": 0,
          "end": 17
        }
      ],
      "next": "s10_l972_1"
    },
    {
      "id": "s10_l972_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Да!»",
      "source": [
        {
          "file": "dialogues",
          "line": 972,
          "start": 17,
          "end": 22
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500
        }
      ],
      "next": "s10_l973_0"
    },
    {
      "id": "s10_l973_0",
      "type": "narration",
      "text": "Они целуются ещё раз, пока растение убирают.",
      "source": [
        {
          "file": "dialogues",
          "line": 973,
          "start": 0,
          "end": 44
        }
      ],
      "next": "s10_l978_0"
    },
    {
      "id": "s10_l974_1",
      "type": "narration",
      "text": "Дима просто встаёт и помогает подняться Азалии. После урока, когда они выходят из теплицы, он останавливает её.",
      "cues": [
        {
          "target": "dima",
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
          "to": 1.03,
          "durationMs": 700
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 974,
          "start": 16,
          "end": 127
        }
      ],
      "next": "s10_l975_0"
    },
    {
      "id": "s10_l975_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 975,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s10_l975_1"
    },
    {
      "id": "s10_l975_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Азалия, ты будешь моей девушкой? Хочешь ли ты со мной встречаться?»",
      "source": [
        {
          "file": "dialogues",
          "line": 975,
          "start": 6,
          "end": 74
        }
      ],
      "next": "s10_l976_0"
    },
    {
      "id": "s10_l976_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 976,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s10_l976_1"
    },
    {
      "id": "s10_l976_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Да».",
      "source": [
        {
          "file": "dialogues",
          "line": 976,
          "start": 8,
          "end": 13
        }
      ],
      "next": "s10_l977_0"
    },
    {
      "id": "s10_l977_0",
      "type": "narration",
      "text": "Они целуются.",
      "source": [
        {
          "file": "dialogues",
          "line": 977,
          "start": 0,
          "end": 13
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "tilt",
          "amplitude": 2.2,
          "hold": true,
          "durationMs": 500
        },
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -2.2,
          "hold": true,
          "durationMs": 500
        },
        {
          "effect": "glow",
          "to": 0.35,
          "durationMs": 700
        }
      ],
      "next": "s10_l978_0"
    },
    {
      "id": "s10_l978_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Анимация: они гуляют по замку, держась за руки. Дима носит её на руках. Потом на экране появляется лист бумаги, рядом лежит волшебная палочка. Нужно взять её и взмахнуть: на листе проступает текст.",
      "source": [
        {
          "file": "dialogues",
          "line": 978,
          "start": 0,
          "end": 197
        }
      ],
      "next": "s10_cs10"
    },
    {
      "id": "s10_cs10",
      "type": "cutscene",
      "cutsceneId": "cs10",
      "source": [],
      "next": "s10_enter_parchment"
    },
    {
      "id": "s10_enter_parchment",
      "type": "scene",
      "action": "enter",
      "background": "bg_parchment_clean",
      "characters": [],
      "source": [],
      "next": "s10_game_parchment"
    },
    {
      "id": "s10_game_parchment",
      "type": "minigame",
      "gameId": "parchment",
      "params": {
        "forceStoryWin": true
      },
      "resultRoutes": {
        "success": "s10_l979_1",
        "failure": "s10_l979_1"
      },
      "source": [],
      "next": "s10_l979_1"
    },
    {
      "id": "s10_l979_1",
      "type": "narration",
      "text": "будет добавлен позже.",
      "useFinalLetter": true,
      "source": [
        {
          "file": "dialogues",
          "line": 979,
          "start": 16,
          "end": 37
        }
      ],
      "next": "s10_end"
    },
    {
      "id": "s10_end",
      "type": "end",
      "nextScene": null,
      "source": [],
      "next": null
    }
  ],
  "sourceLedger": [
    {
      "line": 937,
      "parts": [
        {
          "start": 0,
          "end": 17,
          "kind": "metadata",
          "text": "Сцена 10. Теплица"
        }
      ],
      "original": "Сцена 10. Теплица"
    },
    {
      "line": 938,
      "parts": [],
      "original": ""
    },
    {
      "line": 939,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "metadata",
          "text": "Где: теплица, урок травологии"
        }
      ],
      "original": "Где: теплица, урок травологии"
    },
    {
      "line": 940,
      "parts": [],
      "original": ""
    },
    {
      "line": 941,
      "parts": [
        {
          "start": 0,
          "end": 119,
          "kind": "narration",
          "node": "s10_l941_0",
          "field": "text"
        }
      ],
      "original": "Теплица. Влажный тёплый воздух, густой запах земли. Ученики стоят вокруг длинных столов, на которых расставлены горшки."
    },
    {
      "line": 942,
      "parts": [],
      "original": ""
    },
    {
      "line": 943,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "stage",
          "node": "s10_l943_0",
          "field": "annotation"
        },
        {
          "start": 27,
          "end": 202,
          "kind": "dialogue",
          "node": "s10_l943_1",
          "field": "text"
        }
      ],
      "original": "Профессор Стебль (строго): «Сегодня мы работаем с мандрагорами. Это опасное растение: его крик может оглушить, а может и убить. Наушники надеваете до того, как возьмётесь за растение. Будьте аккуратны»."
    },
    {
      "line": 944,
      "parts": [],
      "original": ""
    },
    {
      "line": 945,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "narration",
          "node": "s10_l945_0",
          "field": "text"
        }
      ],
      "original": "Она ставит учеников по парам."
    },
    {
      "line": 946,
      "parts": [],
      "original": ""
    },
    {
      "line": 947,
      "parts": [
        {
          "start": 0,
          "end": 18,
          "kind": "stage",
          "node": "s10_l947_0",
          "field": "annotation"
        },
        {
          "start": 18,
          "end": 38,
          "kind": "dialogue",
          "node": "s10_l947_1",
          "field": "text"
        }
      ],
      "original": "Профессор Стебль: «Тео Блэк и Роуз...»"
    },
    {
      "line": 948,
      "parts": [],
      "original": ""
    },
    {
      "line": 949,
      "parts": [
        {
          "start": 0,
          "end": 60,
          "kind": "narration",
          "node": "s10_l949_0",
          "field": "text"
        }
      ],
      "original": "Азалия принимается лихорадочно думать, с кем же поставят её."
    },
    {
      "line": 950,
      "parts": [],
      "original": ""
    },
    {
      "line": 951,
      "parts": [
        {
          "start": 0,
          "end": 111,
          "kind": "narration",
          "node": "s10_l951_0",
          "field": "text"
        }
      ],
      "original": "И тут она замечает у стола Диму, и её лицо расплывается в улыбке. Они начинают болтать, расставляя инструменты."
    },
    {
      "line": 952,
      "parts": [],
      "original": ""
    },
    {
      "line": 953,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s10_l953_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 63,
          "kind": "dialogue",
          "node": "s10_l953_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ты вообще понимаешь, что мы можем остаться без слуха?»"
    },
    {
      "line": 954,
      "parts": [],
      "original": ""
    },
    {
      "line": 955,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s10_l955_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 38,
          "kind": "dialogue",
          "node": "s10_l955_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Понимаю. Я приму удар на себя»."
    },
    {
      "line": 956,
      "parts": [],
      "original": ""
    },
    {
      "line": 957,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s10_l957_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 23,
          "kind": "dialogue",
          "node": "s10_l957_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Очень смешно»."
    },
    {
      "line": 958,
      "parts": [],
      "original": ""
    },
    {
      "line": 959,
      "parts": [
        {
          "start": 0,
          "end": 107,
          "kind": "narration",
          "node": "s10_l959_0",
          "field": "text"
        }
      ],
      "original": "Но тут Малфой, стоящий за соседним столом, ухмыляясь, выдёргивает свою мандрагору из горшка. Без наушников."
    },
    {
      "line": 960,
      "parts": [],
      "original": ""
    },
    {
      "line": 961,
      "parts": [
        {
          "start": 0,
          "end": 18,
          "kind": "stage",
          "node": "s10_l961_0",
          "field": "annotation"
        },
        {
          "start": 18,
          "end": 27,
          "kind": "dialogue",
          "node": "s10_l961_1",
          "field": "text"
        }
      ],
      "original": "Профессор Стебль: «МАЛФОЙ!»"
    },
    {
      "line": 962,
      "parts": [],
      "original": ""
    },
    {
      "line": 963,
      "parts": [
        {
          "start": 0,
          "end": 54,
          "kind": "narration",
          "node": "s10_l963_0",
          "field": "text"
        }
      ],
      "original": "Оглушительный вопль. Звуковая волна накрывает теплицу."
    },
    {
      "line": 964,
      "parts": [],
      "original": ""
    },
    {
      "line": 965,
      "parts": [
        {
          "start": 0,
          "end": 213,
          "kind": "narration",
          "node": "s10_l965_0",
          "field": "text"
        }
      ],
      "original": "Дима мгновенно надевает наушники. Азалия садится на корточки, зажимая уши ладонями. Дима тут же надевает наушники и на неё. Их лица оказываются очень близко друг к другу. Сквозь гул они смотрят друг другу в глаза."
    },
    {
      "line": 966,
      "parts": [],
      "original": ""
    },
    {
      "line": 967,
      "parts": [
        {
          "start": 0,
          "end": 23,
          "kind": "metadata",
          "text": "ВЫБОР: поцеловать Диму?"
        }
      ],
      "original": "ВЫБОР: поцеловать Диму?"
    },
    {
      "line": 968,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 1. "
        },
        {
          "start": 11,
          "end": 24,
          "kind": "choice",
          "node": "choice10_01",
          "option": "choice10_01_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. Поцеловаться."
    },
    {
      "line": 969,
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
          "node": "choice10_01",
          "option": "choice10_01_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. Не целоваться."
    },
    {
      "line": 970,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "При варианте 1. "
        },
        {
          "start": 16,
          "end": 121,
          "kind": "narration",
          "node": "s10_l970_1",
          "field": "text"
        }
      ],
      "original": "При варианте 1. Они целуются. Потом Дима отстраняется и говорит достаточно громко, чтобы его было слышно сквозь наушники."
    },
    {
      "line": 971,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s10_l971_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 74,
          "kind": "dialogue",
          "node": "s10_l971_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Азалия, ты будешь моей девушкой? Хочешь ли ты со мной встречаться?»"
    },
    {
      "line": 972,
      "parts": [
        {
          "start": 0,
          "end": 17,
          "kind": "stage",
          "node": "s10_l972_0",
          "field": "annotation"
        },
        {
          "start": 17,
          "end": 22,
          "kind": "dialogue",
          "node": "s10_l972_1",
          "field": "text"
        }
      ],
      "original": "Азалия (смеясь): «Да!»"
    },
    {
      "line": 973,
      "parts": [
        {
          "start": 0,
          "end": 44,
          "kind": "narration",
          "node": "s10_l973_0",
          "field": "text"
        }
      ],
      "original": "Они целуются ещё раз, пока растение убирают."
    },
    {
      "line": 974,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "При варианте 2. "
        },
        {
          "start": 16,
          "end": 127,
          "kind": "narration",
          "node": "s10_l974_1",
          "field": "text"
        }
      ],
      "original": "При варианте 2. Дима просто встаёт и помогает подняться Азалии. После урока, когда они выходят из теплицы, он останавливает её."
    },
    {
      "line": 975,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s10_l975_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 74,
          "kind": "dialogue",
          "node": "s10_l975_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Азалия, ты будешь моей девушкой? Хочешь ли ты со мной встречаться?»"
    },
    {
      "line": 976,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s10_l976_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 13,
          "kind": "dialogue",
          "node": "s10_l976_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Да»."
    },
    {
      "line": 977,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "narration",
          "node": "s10_l977_0",
          "field": "text"
        }
      ],
      "original": "Они целуются."
    },
    {
      "line": 978,
      "parts": [
        {
          "start": 0,
          "end": 197,
          "kind": "stage",
          "node": "s10_l978_0",
          "field": "annotation"
        }
      ],
      "original": "Анимация: они гуляют по замку, держась за руки. Дима носит её на руках. Потом на экране появляется лист бумаги, рядом лежит волшебная палочка. Нужно взять её и взмахнуть: на листе проступает текст."
    },
    {
      "line": 979,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "Текст на листе: "
        },
        {
          "start": 16,
          "end": 37,
          "kind": "narration",
          "node": "s10_l979_1",
          "field": "text"
        }
      ],
      "original": "Текст на листе: будет добавлен позже."
    },
    {
      "line": 980,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "metadata",
          "text": "Конец сцены 10."
        }
      ],
      "original": "Конец сцены 10."
    }
  ]
};

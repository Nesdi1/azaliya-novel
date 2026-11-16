export default {
  "schemaVersion": 1,
  "id": "scene07",
  "start": "s07_start",
  "scope": [
    737,
    797
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "nodes": [
    {
      "id": "s07_start",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s07_enter_no_rose",
      "source": [],
      "else": "s07_enter",
      "next": null
    },
    {
      "id": "s07_enter_no_rose",
      "type": "scene",
      "action": "enter",
      "background": "bg_library",
      "characters": [
        "azalia"
      ],
      "source": [],
      "next": "s07_goto_759"
    },
    {
      "id": "s07_goto_759",
      "type": "goto",
      "target": "s07_l759_0",
      "source": [],
      "next": null
    },
    {
      "id": "s07_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_library",
      "characters": [
        "azalia",
        "rose"
      ],
      "source": [],
      "next": "s07_l741_0"
    },
    {
      "id": "s07_l741_0",
      "type": "narration",
      "text": "Библиотека. Тишина, пыль в лучах света. Азалия и Роуз ходят вдоль высоких стеллажей и перебирают корешки на третьей полке.",
      "source": [
        {
          "file": "dialogues",
          "line": 741,
          "start": 0,
          "end": 122
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "azalia",
            "rose"
          ],
          "durationMs": 600
        }
      ],
      "next": "s07_l743_0"
    },
    {
      "id": "s07_l743_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (шёпотом): ",
      "source": [
        {
          "file": "dialogues",
          "line": 743,
          "start": 0,
          "end": 16
        }
      ],
      "next": "s07_l743_1"
    },
    {
      "id": "s07_l743_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Слушай, а что вообще за книга?»",
      "source": [
        {
          "file": "dialogues",
          "line": 743,
          "start": 16,
          "end": 48
        }
      ],
      "next": "s07_l745_0"
    },
    {
      "id": "s07_l745_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 745,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s07_l745_1"
    },
    {
      "id": "s07_l745_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Словарь итальянских слов».",
      "source": [
        {
          "file": "dialogues",
          "line": 745,
          "start": 8,
          "end": 35
        }
      ],
      "next": "s07_l747_0"
    },
    {
      "id": "s07_l747_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (театрально вздыхая): ",
      "source": [
        {
          "file": "dialogues",
          "line": 747,
          "start": 0,
          "end": 27
        }
      ],
      "next": "s07_l747_1"
    },
    {
      "id": "s07_l747_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Как романтично!»",
      "source": [
        {
          "file": "dialogues",
          "line": 747,
          "start": 27,
          "end": 44
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
      "next": "s07_l749_0"
    },
    {
      "id": "s07_l749_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 749,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s07_l749_1"
    },
    {
      "id": "s07_l749_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Роуз».",
      "source": [
        {
          "file": "dialogues",
          "line": 749,
          "start": 8,
          "end": 15
        }
      ],
      "next": "s07_l751_0"
    },
    {
      "id": "s07_l751_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (не унимаясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 751,
          "start": 0,
          "end": 20
        }
      ],
      "next": "s07_l751_1"
    },
    {
      "id": "s07_l751_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Нет, я просто к тому, что ты в последнее время очень часто как-то пересекаешься с Димой. И он у тебя в голове как-то слишком часто».",
      "source": [
        {
          "file": "dialogues",
          "line": 751,
          "start": 20,
          "end": 153
        }
      ],
      "next": "s07_l753_0"
    },
    {
      "id": "s07_l753_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 753,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s07_l753_1"
    },
    {
      "id": "s07_l753_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Туууууф. Тебе кажется».",
      "source": [
        {
          "file": "dialogues",
          "line": 753,
          "start": 8,
          "end": 32
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
      "next": "s07_l755_0"
    },
    {
      "id": "s07_l755_0",
      "type": "narration",
      "text": "Азалия проводит пальцами по корешкам и вдруг замирает.",
      "source": [
        {
          "file": "dialogues",
          "line": 755,
          "start": 0,
          "end": 54
        }
      ],
      "next": "s07_l757_0"
    },
    {
      "id": "s07_l757_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 757,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s07_l757_1"
    },
    {
      "id": "s07_l757_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«НАШЛА!!»",
      "source": [
        {
          "file": "dialogues",
          "line": 757,
          "start": 8,
          "end": 17
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        }
      ],
      "next": "s07_l759_0"
    },
    {
      "id": "s07_l759_0",
      "type": "narration",
      "text": "Они устраиваются за столом и открывают словарь. Страницы шуршат. Азалия водит пальцем по строчкам.",
      "source": [
        {
          "file": "dialogues",
          "line": 759,
          "start": 0,
          "end": 98
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        }
      ],
      "next": "s07_if_rose_after_759"
    },
    {
      "id": "s07_if_rose_after_759",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s07_l763_0",
      "source": [],
      "else": "s07_l761_0",
      "next": null
    },
    {
      "id": "s07_l761_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 761,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s07_l761_1"
    },
    {
      "id": "s07_l761_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Ну? И что это вообще за слово?»",
      "source": [
        {
          "file": "dialogues",
          "line": 761,
          "start": 6,
          "end": 38
        }
      ],
      "next": "s07_l763_0"
    },
    {
      "id": "s07_l763_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 763,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s07_l763_1"
    },
    {
      "id": "s07_l763_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Вот это».",
      "source": [
        {
          "file": "dialogues",
          "line": 763,
          "start": 8,
          "end": 18
        }
      ],
      "next": "s07_l765_0"
    },
    {
      "id": "s07_l765_0",
      "type": "narration",
      "text": "Она показывает пальцем. Среди множества слов на странице написано: Stupend — потрясающая, великолепная, сногшибательная.",
      "source": [
        {
          "file": "dialogues",
          "line": 765,
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
          "effect": "camera",
          "to": 1.05,
          "durationMs": 900
        },
        {
          "effect": "glow",
          "to": 0.25,
          "durationMs": 900
        }
      ],
      "next": "s07_l766_0"
    },
    {
      "id": "s07_l766_0",
      "type": "narration",
      "text": "Азалия читает. Перечитывает. Лицо вспыхивает. Она медленно опускает голову и падает лицом на парту.",
      "source": [
        {
          "file": "dialogues",
          "line": 766,
          "start": 0,
          "end": 99
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -3,
          "hold": true,
          "durationMs": 550
        },
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s07_if_rose_after_766"
    },
    {
      "id": "s07_if_rose_after_766",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s07_end",
      "source": [],
      "else": "s07_l768_0",
      "next": null
    },
    {
      "id": "s07_l768_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (на всю библиотеку, захлёбываясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 768,
          "start": 0,
          "end": 40
        }
      ],
      "next": "s07_l768_1"
    },
    {
      "id": "s07_l768_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«АААААААА! Я ЗНАЛА! КАК ЭТО МИЛО! БОЖЕ МОЙ!»",
      "source": [
        {
          "file": "dialogues",
          "line": 768,
          "start": 40,
          "end": 84
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 10,
          "durationMs": 520
        },
        {
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        }
      ],
      "next": "s07_l770_0"
    },
    {
      "id": "s07_l770_0",
      "type": "narration",
      "text": "Где-то вдалеке раздаётся шиканье библиотекаря, но Роуз уже вскочила.",
      "source": [
        {
          "file": "dialogues",
          "line": 770,
          "start": 0,
          "end": 68
        }
      ],
      "next": "s07_l772_0"
    },
    {
      "id": "s07_l772_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 772,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s07_l772_1"
    },
    {
      "id": "s07_l772_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Я сейчас приду! Надо всем рассказать!»",
      "source": [
        {
          "file": "dialogues",
          "line": 772,
          "start": 6,
          "end": 45
        }
      ],
      "next": "s07_l774_0"
    },
    {
      "id": "s07_l774_0",
      "type": "narration",
      "text": "Она убегает. Азалия, уткнувшись лицом в парту, ничего не слышит.",
      "source": [
        {
          "file": "dialogues",
          "line": 774,
          "start": 0,
          "end": 64
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 400
        },
        {
          "effect": "camera",
          "to": 1,
          "durationMs": 600
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 600
        },
        {
          "target": "rose",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 480
        }
      ],
      "next": "s07_enter_corridor"
    },
    {
      "id": "s07_enter_corridor",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "rose",
        "theo"
      ],
      "source": [],
      "next": "s07_l776_0"
    },
    {
      "id": "s07_l776_0",
      "type": "narration",
      "text": "Смена кадра: коридор. Роуз налетает на Тео.",
      "source": [
        {
          "file": "dialogues",
          "line": 776,
          "start": 0,
          "end": 43
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "rose",
            "theo"
          ],
          "durationMs": 550
        },
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        }
      ],
      "next": "s07_l778_0"
    },
    {
      "id": "s07_l778_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (запыхавшись, сияя): ",
      "source": [
        {
          "file": "dialogues",
          "line": 778,
          "start": 0,
          "end": 26
        }
      ],
      "next": "s07_l778_1"
    },
    {
      "id": "s07_l778_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Тео! Ты не поверишь...»",
      "source": [
        {
          "file": "dialogues",
          "line": 778,
          "start": 26,
          "end": 50
        }
      ],
      "next": "s07_l780_0"
    },
    {
      "id": "s07_l780_0",
      "type": "narration",
      "text": "Она выкладывает ему всё: про слово, про Диму, про взгляды, про то, как Азалия упала лицом в парту.",
      "source": [
        {
          "file": "dialogues",
          "line": 780,
          "start": 0,
          "end": 98
        }
      ],
      "next": "s07_l781_0"
    },
    {
      "id": "s07_l781_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 781,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s07_l781_1"
    },
    {
      "id": "s07_l781_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Азалия, конечно, ещё на стадии понимания всего этого. Но я уверена, что ей Дима тоже симпатизирует!»",
      "source": [
        {
          "file": "dialogues",
          "line": 781,
          "start": 6,
          "end": 107
        }
      ],
      "next": "s07_l782_0"
    },
    {
      "id": "s07_l782_0",
      "type": "narration",
      "text": "Лицо Тео слегка кривится. Видно, что он напрягся.",
      "source": [
        {
          "file": "dialogues",
          "line": 782,
          "start": 0,
          "end": 49
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "focus"
        },
        {
          "target": "theo",
          "effect": "shake",
          "amplitude": 3,
          "durationMs": 450
        }
      ],
      "next": "s07_l784_0"
    },
    {
      "id": "s07_l784_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (ровным голосом): ",
      "source": [
        {
          "file": "dialogues",
          "line": 784,
          "start": 0,
          "end": 22
        }
      ],
      "next": "s07_l784_1"
    },
    {
      "id": "s07_l784_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Где сейчас Дима?»",
      "source": [
        {
          "file": "dialogues",
          "line": 784,
          "start": 22,
          "end": 40
        }
      ],
      "next": "s07_l786_0"
    },
    {
      "id": "s07_l786_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 786,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s07_l786_1"
    },
    {
      "id": "s07_l786_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Ну... он после квиддича вроде бы пошёл, сел на скамейку возле фонтана».",
      "source": [
        {
          "file": "dialogues",
          "line": 786,
          "start": 6,
          "end": 78
        }
      ],
      "next": "s07_l788_0"
    },
    {
      "id": "s07_l788_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 788,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s07_l788_1"
    },
    {
      "id": "s07_l788_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Хорошо. Пойду с ним поговорю».",
      "source": [
        {
          "file": "dialogues",
          "line": 788,
          "start": 5,
          "end": 36
        }
      ],
      "next": "s07_l790_0"
    },
    {
      "id": "s07_l790_0",
      "type": "narration",
      "text": "Он уходит. Роуз смотрит ему вслед и медленно понимает, что ему не стоило этого рассказывать.",
      "source": [
        {
          "file": "dialogues",
          "line": 790,
          "start": 0,
          "end": 92
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 500
        },
        {
          "target": "theo",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 520
        }
      ],
      "next": "s07_l792_0"
    },
    {
      "id": "s07_l792_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 792,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s07_l792_1"
    },
    {
      "id": "s07_l792_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Ой».",
      "source": [
        {
          "file": "dialogues",
          "line": 792,
          "start": 13,
          "end": 18
        }
      ],
      "next": "s07_l794_0"
    },
    {
      "id": "s07_l794_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Анимация: Тео идёт по коридору к выходу во двор, сжимая кулаки.",
      "source": [
        {
          "file": "dialogues",
          "line": 794,
          "start": 0,
          "end": 63
        }
      ],
      "next": "s07_cs07"
    },
    {
      "id": "s07_cs07",
      "type": "cutscene",
      "cutsceneId": "cs07",
      "source": [],
      "next": "s07_end"
    },
    {
      "id": "s07_end",
      "type": "end",
      "nextScene": "scene08",
      "source": [],
      "next": null
    }
  ],
  "sourceLedger": [
    {
      "line": 737,
      "parts": [
        {
          "start": 0,
          "end": 19,
          "kind": "metadata",
          "text": "Сцена 7. Библиотека"
        }
      ],
      "original": "Сцена 7. Библиотека"
    },
    {
      "line": 738,
      "parts": [],
      "original": ""
    },
    {
      "line": 739,
      "parts": [
        {
          "start": 0,
          "end": 24,
          "kind": "metadata",
          "text": "Где: библиотека, коридор"
        }
      ],
      "original": "Где: библиотека, коридор"
    },
    {
      "line": 740,
      "parts": [],
      "original": ""
    },
    {
      "line": 741,
      "parts": [
        {
          "start": 0,
          "end": 122,
          "kind": "narration",
          "node": "s07_l741_0",
          "field": "text"
        }
      ],
      "original": "Библиотека. Тишина, пыль в лучах света. Азалия и Роуз ходят вдоль высоких стеллажей и перебирают корешки на третьей полке."
    },
    {
      "line": 742,
      "parts": [],
      "original": ""
    },
    {
      "line": 743,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "stage",
          "node": "s07_l743_0",
          "field": "annotation"
        },
        {
          "start": 16,
          "end": 48,
          "kind": "dialogue",
          "node": "s07_l743_1",
          "field": "text"
        }
      ],
      "original": "Роуз (шёпотом): «Слушай, а что вообще за книга?»"
    },
    {
      "line": 744,
      "parts": [],
      "original": ""
    },
    {
      "line": 745,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s07_l745_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 35,
          "kind": "dialogue",
          "node": "s07_l745_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Словарь итальянских слов»."
    },
    {
      "line": 746,
      "parts": [],
      "original": ""
    },
    {
      "line": 747,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "stage",
          "node": "s07_l747_0",
          "field": "annotation"
        },
        {
          "start": 27,
          "end": 44,
          "kind": "dialogue",
          "node": "s07_l747_1",
          "field": "text"
        }
      ],
      "original": "Роуз (театрально вздыхая): «Как романтично!»"
    },
    {
      "line": 748,
      "parts": [],
      "original": ""
    },
    {
      "line": 749,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s07_l749_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 15,
          "kind": "dialogue",
          "node": "s07_l749_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Роуз»."
    },
    {
      "line": 750,
      "parts": [],
      "original": ""
    },
    {
      "line": 751,
      "parts": [
        {
          "start": 0,
          "end": 20,
          "kind": "stage",
          "node": "s07_l751_0",
          "field": "annotation"
        },
        {
          "start": 20,
          "end": 153,
          "kind": "dialogue",
          "node": "s07_l751_1",
          "field": "text"
        }
      ],
      "original": "Роуз (не унимаясь): «Нет, я просто к тому, что ты в последнее время очень часто как-то пересекаешься с Димой. И он у тебя в голове как-то слишком часто»."
    },
    {
      "line": 752,
      "parts": [],
      "original": ""
    },
    {
      "line": 753,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s07_l753_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 32,
          "kind": "dialogue",
          "node": "s07_l753_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Туууууф. Тебе кажется»."
    },
    {
      "line": 754,
      "parts": [],
      "original": ""
    },
    {
      "line": 755,
      "parts": [
        {
          "start": 0,
          "end": 54,
          "kind": "narration",
          "node": "s07_l755_0",
          "field": "text"
        }
      ],
      "original": "Азалия проводит пальцами по корешкам и вдруг замирает."
    },
    {
      "line": 756,
      "parts": [],
      "original": ""
    },
    {
      "line": 757,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s07_l757_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 17,
          "kind": "dialogue",
          "node": "s07_l757_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «НАШЛА!!»"
    },
    {
      "line": 758,
      "parts": [],
      "original": ""
    },
    {
      "line": 759,
      "parts": [
        {
          "start": 0,
          "end": 98,
          "kind": "narration",
          "node": "s07_l759_0",
          "field": "text"
        }
      ],
      "original": "Они устраиваются за столом и открывают словарь. Страницы шуршат. Азалия водит пальцем по строчкам."
    },
    {
      "line": 760,
      "parts": [],
      "original": ""
    },
    {
      "line": 761,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s07_l761_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 38,
          "kind": "dialogue",
          "node": "s07_l761_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Ну? И что это вообще за слово?»"
    },
    {
      "line": 762,
      "parts": [],
      "original": ""
    },
    {
      "line": 763,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s07_l763_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 18,
          "kind": "dialogue",
          "node": "s07_l763_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Вот это»."
    },
    {
      "line": 764,
      "parts": [],
      "original": ""
    },
    {
      "line": 765,
      "parts": [
        {
          "start": 0,
          "end": 120,
          "kind": "narration",
          "node": "s07_l765_0",
          "field": "text"
        }
      ],
      "original": "Она показывает пальцем. Среди множества слов на странице написано: Stupend — потрясающая, великолепная, сногшибательная."
    },
    {
      "line": 766,
      "parts": [
        {
          "start": 0,
          "end": 99,
          "kind": "narration",
          "node": "s07_l766_0",
          "field": "text"
        }
      ],
      "original": "Азалия читает. Перечитывает. Лицо вспыхивает. Она медленно опускает голову и падает лицом на парту."
    },
    {
      "line": 767,
      "parts": [],
      "original": ""
    },
    {
      "line": 768,
      "parts": [
        {
          "start": 0,
          "end": 40,
          "kind": "stage",
          "node": "s07_l768_0",
          "field": "annotation"
        },
        {
          "start": 40,
          "end": 84,
          "kind": "dialogue",
          "node": "s07_l768_1",
          "field": "text"
        }
      ],
      "original": "Роуз (на всю библиотеку, захлёбываясь): «АААААААА! Я ЗНАЛА! КАК ЭТО МИЛО! БОЖЕ МОЙ!»"
    },
    {
      "line": 769,
      "parts": [],
      "original": ""
    },
    {
      "line": 770,
      "parts": [
        {
          "start": 0,
          "end": 68,
          "kind": "narration",
          "node": "s07_l770_0",
          "field": "text"
        }
      ],
      "original": "Где-то вдалеке раздаётся шиканье библиотекаря, но Роуз уже вскочила."
    },
    {
      "line": 771,
      "parts": [],
      "original": ""
    },
    {
      "line": 772,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s07_l772_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 45,
          "kind": "dialogue",
          "node": "s07_l772_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Я сейчас приду! Надо всем рассказать!»"
    },
    {
      "line": 773,
      "parts": [],
      "original": ""
    },
    {
      "line": 774,
      "parts": [
        {
          "start": 0,
          "end": 64,
          "kind": "narration",
          "node": "s07_l774_0",
          "field": "text"
        }
      ],
      "original": "Она убегает. Азалия, уткнувшись лицом в парту, ничего не слышит."
    },
    {
      "line": 775,
      "parts": [],
      "original": ""
    },
    {
      "line": 776,
      "parts": [
        {
          "start": 0,
          "end": 43,
          "kind": "narration",
          "node": "s07_l776_0",
          "field": "text"
        }
      ],
      "original": "Смена кадра: коридор. Роуз налетает на Тео."
    },
    {
      "line": 777,
      "parts": [],
      "original": ""
    },
    {
      "line": 778,
      "parts": [
        {
          "start": 0,
          "end": 26,
          "kind": "stage",
          "node": "s07_l778_0",
          "field": "annotation"
        },
        {
          "start": 26,
          "end": 50,
          "kind": "dialogue",
          "node": "s07_l778_1",
          "field": "text"
        }
      ],
      "original": "Роуз (запыхавшись, сияя): «Тео! Ты не поверишь...»"
    },
    {
      "line": 779,
      "parts": [],
      "original": ""
    },
    {
      "line": 780,
      "parts": [
        {
          "start": 0,
          "end": 98,
          "kind": "narration",
          "node": "s07_l780_0",
          "field": "text"
        }
      ],
      "original": "Она выкладывает ему всё: про слово, про Диму, про взгляды, про то, как Азалия упала лицом в парту."
    },
    {
      "line": 781,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s07_l781_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 107,
          "kind": "dialogue",
          "node": "s07_l781_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Азалия, конечно, ещё на стадии понимания всего этого. Но я уверена, что ей Дима тоже симпатизирует!»"
    },
    {
      "line": 782,
      "parts": [
        {
          "start": 0,
          "end": 49,
          "kind": "narration",
          "node": "s07_l782_0",
          "field": "text"
        }
      ],
      "original": "Лицо Тео слегка кривится. Видно, что он напрягся."
    },
    {
      "line": 783,
      "parts": [],
      "original": ""
    },
    {
      "line": 784,
      "parts": [
        {
          "start": 0,
          "end": 22,
          "kind": "stage",
          "node": "s07_l784_0",
          "field": "annotation"
        },
        {
          "start": 22,
          "end": 40,
          "kind": "dialogue",
          "node": "s07_l784_1",
          "field": "text"
        }
      ],
      "original": "Тео (ровным голосом): «Где сейчас Дима?»"
    },
    {
      "line": 785,
      "parts": [],
      "original": ""
    },
    {
      "line": 786,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s07_l786_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 78,
          "kind": "dialogue",
          "node": "s07_l786_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Ну... он после квиддича вроде бы пошёл, сел на скамейку возле фонтана»."
    },
    {
      "line": 787,
      "parts": [],
      "original": ""
    },
    {
      "line": 788,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s07_l788_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 36,
          "kind": "dialogue",
          "node": "s07_l788_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Хорошо. Пойду с ним поговорю»."
    },
    {
      "line": 789,
      "parts": [],
      "original": ""
    },
    {
      "line": 790,
      "parts": [
        {
          "start": 0,
          "end": 92,
          "kind": "narration",
          "node": "s07_l790_0",
          "field": "text"
        }
      ],
      "original": "Он уходит. Роуз смотрит ему вслед и медленно понимает, что ему не стоило этого рассказывать."
    },
    {
      "line": 791,
      "parts": [],
      "original": ""
    },
    {
      "line": 792,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s07_l792_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 18,
          "kind": "dialogue",
          "node": "s07_l792_1",
          "field": "text"
        }
      ],
      "original": "Роуз (тихо): «Ой»."
    },
    {
      "line": 793,
      "parts": [],
      "original": ""
    },
    {
      "line": 794,
      "parts": [
        {
          "start": 0,
          "end": 63,
          "kind": "stage",
          "node": "s07_l794_0",
          "field": "annotation"
        }
      ],
      "original": "Анимация: Тео идёт по коридору к выходу во двор, сжимая кулаки."
    },
    {
      "line": 795,
      "parts": [],
      "original": ""
    },
    {
      "line": 796,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "metadata",
          "text": "Конец сцены 7."
        }
      ],
      "original": "Конец сцены 7."
    },
    {
      "line": 797,
      "parts": [],
      "original": ""
    }
  ]
};

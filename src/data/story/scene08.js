export default {
  "schemaVersion": 1,
  "id": "scene08",
  "start": "s08_enter",
  "scope": [
    798,
    870
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "nodes": [
    {
      "id": "s08_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_fountain_day",
      "characters": [
        "dima",
        "theo"
      ],
      "source": [],
      "next": "s08_l802_0",
      "emotions": {}
    },
    {
      "id": "s08_l802_0",
      "type": "narration",
      "text": "Двор. Дима сидит на скамейке у фонтана и читает. К нему приближается Тео. Шаги тяжёлые, но он изо всех сил держит себя в руках.",
      "source": [
        {
          "file": "dialogues",
          "line": 802,
          "start": 0,
          "end": 127
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "focus"
        },
        {
          "target": "dima",
          "effect": "breathe",
          "durationMs": 2800
        }
      ],
      "next": "s08_l804_0",
      "emotions": {}
    },
    {
      "id": "s08_l804_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 804,
          "start": 0,
          "end": 11
        }
      ],
      "next": "s08_l804_1",
      "emotions": {
        "theo": "restrained"
      }
    },
    {
      "id": "s08_l804_1",
      "type": "thought",
      "speaker": "theo",
      "text": "«Спокойно. Если скажет, что они просто друзья, то отлично. Если пошлёт меня подальше, тоже хорошо, хоть повод будет. Любой из этих ответов меня устроит».",
      "source": [
        {
          "file": "dialogues",
          "line": 804,
          "start": 11,
          "end": 164
        }
      ],
      "next": "s08_l806_0",
      "emotions": {
        "theo": "restrained"
      }
    },
    {
      "id": "s08_l806_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (сдержанно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 806,
          "start": 0,
          "end": 17
        }
      ],
      "next": "s08_l806_1",
      "emotions": {
        "theo": "restrained"
      }
    },
    {
      "id": "s08_l806_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Нам надо поговорить».",
      "source": [
        {
          "file": "dialogues",
          "line": 806,
          "start": 17,
          "end": 39
        }
      ],
      "next": "s08_l808_0",
      "emotions": {
        "theo": "restrained"
      }
    },
    {
      "id": "s08_l808_0",
      "type": "narration",
      "text": "Дима поднимает голову. На его лице искреннее удивление: он явно ожидал увидеть здесь кого-то другого.",
      "source": [
        {
          "file": "dialogues",
          "line": 808,
          "start": 0,
          "end": 101
        }
      ],
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
      "next": "s08_l810_0",
      "emotions": {}
    },
    {
      "id": "s08_l810_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 810,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s08_l810_1",
      "emotions": {
        "dima": "surprise"
      }
    },
    {
      "id": "s08_l810_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Так. Я, конечно, ожидал увидеть здесь другого Блэка. Ну ладно. Давай начнём сначала. Меня зовут Дмитрий Де Нестер. ",
      "source": [
        {
          "file": "dialogues",
          "line": 810,
          "start": 6,
          "end": 122
        }
      ],
      "next": "s08_l810_2",
      "emotions": {
        "dima": "surprise"
      }
    },
    {
      "id": "s08_l810_2",
      "type": "dialogue",
      "speaker": "dima",
      "text": "Обо мне можешь не волноваться: я нормальный, никаких плохих мыслей по поводу твоей сестры у меня нет. Но что касается дружбы... нет. Я хочу быть для неё больше».",
      "source": [
        {
          "file": "dialogues",
          "line": 810,
          "start": 122,
          "end": 283
        }
      ],
      "next": "s08_l812_0",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s08_l812_0",
      "type": "narration",
      "text": "Лицо Тео наливается краской от злости. Рука сама тянется к палочке, а в голове одна мысль: врезать ему.",
      "source": [
        {
          "file": "dialogues",
          "line": 812,
          "start": 0,
          "end": 103
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
          "amplitude": 4,
          "durationMs": 450
        }
      ],
      "next": "s08_l814_0",
      "emotions": {
        "dima": "serious",
        "theo": "angry"
      }
    },
    {
      "id": "s08_l814_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (быстро, не дав ему вставить слово): ",
      "source": [
        {
          "file": "dialogues",
          "line": 814,
          "start": 0,
          "end": 42
        }
      ],
      "next": "s08_l814_1",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s08_l814_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Если ты мне не веришь, я готов доказать, что не шучу. Она мне нравится. Я всегда наблюдал за ней на уроках, и, честно говоря, это первый человек, которого я так сильно стесняюсь. Именно с ней мне интересно разговаривать. Говори, что надо сделать, чтобы доказать, что я готов ради неё на всё, и чтобы получить твоё доверие».",
      "source": [
        {
          "file": "dialogues",
          "line": 814,
          "start": 42,
          "end": 366
        }
      ],
      "next": "s08_l816_0",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s08_l816_0",
      "type": "narration",
      "text": "Тео замирает. Злость отступает. Перед ним сидит нормальный парень, но для верности Тео решает проверить его.",
      "source": [
        {
          "file": "dialogues",
          "line": 816,
          "start": 0,
          "end": 108
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
          "amplitude": 1.8,
          "durationMs": 500
        }
      ],
      "next": "s08_l818_0",
      "emotions": {
        "theo": "suspicious"
      }
    },
    {
      "id": "s08_l818_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (прищурившись): ",
      "source": [
        {
          "file": "dialogues",
          "line": 818,
          "start": 0,
          "end": 20
        }
      ],
      "next": "s08_l818_1",
      "emotions": {
        "dima": "serious",
        "theo": "suspicious"
      }
    },
    {
      "id": "s08_l818_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Готов ли ты лишиться руки?»",
      "source": [
        {
          "file": "dialogues",
          "line": 818,
          "start": 20,
          "end": 48
        }
      ],
      "next": "s08_l820_0",
      "emotions": {
        "dima": "serious",
        "theo": "suspicious"
      }
    },
    {
      "id": "s08_l820_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (без раздумий): ",
      "source": [
        {
          "file": "dialogues",
          "line": 820,
          "start": 0,
          "end": 21
        }
      ],
      "next": "s08_l820_1",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s08_l820_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Да».",
      "source": [
        {
          "file": "dialogues",
          "line": 820,
          "start": 21,
          "end": 26
        }
      ],
      "next": "s08_l822_0",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s08_l822_0",
      "type": "narration",
      "text": "Тео вскидывает палочку и делает вид, что разрубает Диме руку. Тот даже не дёргается.",
      "source": [
        {
          "file": "dialogues",
          "line": 822,
          "start": 0,
          "end": 84
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 480
        },
        {
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s08_l824_0",
      "emotions": {
        "dima": "serious"
      }
    },
    {
      "id": "s08_l824_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (опуская палочку и вздыхая): ",
      "source": [
        {
          "file": "dialogues",
          "line": 824,
          "start": 0,
          "end": 33
        }
      ],
      "next": "s08_l824_1",
      "emotions": {
        "dima": "relief",
        "theo": "accept"
      }
    },
    {
      "id": "s08_l824_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Хорошо. Я тебе верю. Не знаю почему, но тебе можно довериться».",
      "source": [
        {
          "file": "dialogues",
          "line": 824,
          "start": 33,
          "end": 97
        }
      ],
      "next": "s08_l824_2",
      "emotions": {
        "dima": "relief",
        "theo": "accept"
      }
    },
    {
      "id": "s08_l824_2",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": " (Пауза.) ",
      "source": [
        {
          "file": "dialogues",
          "line": 824,
          "start": 97,
          "end": 107
        }
      ],
      "next": "s08_l824_3",
      "emotions": {}
    },
    {
      "id": "s08_l824_3",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Пойду ещё поговорю с сестрой. Представляешь, я узнаю об этом не от неё и не от тебя, а от Роуз. Я в шоке».",
      "variants": [
        {
          "id": "noRose_D824",
          "condition": {
            "op": "eq",
            "left": {
              "var": "roseFriend"
            },
            "right": false
          },
          "text": "«Пойду ещё поговорю с сестрой. »."
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 824,
          "start": 107,
          "end": 214
        }
      ],
      "next": "s08_if_rose_826",
      "emotions": {}
    },
    {
      "id": "s08_if_rose_826",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s08_l828_0",
      "source": [],
      "else": "s08_l826_0",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s08_l826_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 826,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s08_l826_1",
      "emotions": {}
    },
    {
      "id": "s08_l826_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Хорошо. Удачи. Только не дави на неё сильно: у неё, скорее всего, были на это причины».",
      "source": [
        {
          "file": "dialogues",
          "line": 826,
          "start": 6,
          "end": 94
        }
      ],
      "next": "s08_l828_0",
      "emotions": {}
    },
    {
      "id": "s08_l828_0",
      "type": "narration",
      "text": "Затемнение.",
      "source": [
        {
          "file": "dialogues",
          "line": 828,
          "start": 0,
          "end": 11
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 500
        }
      ],
      "next": "s08_enter_fountain_night",
      "emotions": {}
    },
    {
      "id": "s08_enter_fountain_night",
      "type": "scene",
      "action": "enter",
      "background": "bg_fountain_night",
      "characters": [
        "azalia",
        "dima"
      ],
      "source": [],
      "next": "s08_l830_0",
      "emotions": {}
    },
    {
      "id": "s08_l830_0",
      "type": "narration",
      "text": "Ночь. Двор у фонтана. Азалия сидит одна на скамейке, обхватив колени. Лунный свет отражается в воде. Слышатся шаги. Из тени выходит Дима, уже готовый начать с шутки, но, увидев её лицо, замолкает.",
      "source": [
        {
          "file": "dialogues",
          "line": 830,
          "start": 0,
          "end": 196
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
      "next": "s08_if_rose_832",
      "emotions": {
        "dima": "worried"
      }
    },
    {
      "id": "s08_if_rose_832",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s08_l842_0",
      "source": [],
      "else": "s08_l832_0",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s08_l832_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 832,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s08_l832_1",
      "emotions": {
        "azalia": "sad",
        "dima": "worried"
      }
    },
    {
      "id": "s08_l832_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Азалия, что произошло? Всё нормально?»",
      "source": [
        {
          "file": "dialogues",
          "line": 832,
          "start": 6,
          "end": 45
        }
      ],
      "next": "s08_l834_0",
      "emotions": {
        "azalia": "sad",
        "dima": "worried"
      }
    },
    {
      "id": "s08_l834_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 834,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s08_l834_1",
      "emotions": {
        "azalia": "sad"
      }
    },
    {
      "id": "s08_l834_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Да... Просто мы с Тео поссорились. Из-за того, что я промолчала и ничего не сказала брату. А я ему доверяю почти так же, как себе».",
      "source": [
        {
          "file": "dialogues",
          "line": 834,
          "start": 8,
          "end": 140
        }
      ],
      "next": "s08_l836_0",
      "emotions": {
        "azalia": "sad"
      }
    },
    {
      "id": "s08_l836_0",
      "type": "narration",
      "text": "Дима молча подсаживается и обнимает её.",
      "source": [
        {
          "file": "dialogues",
          "line": 836,
          "start": 0,
          "end": 39
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
          "amplitude": 2,
          "hold": true,
          "durationMs": 500
        },
        {
          "target": "azalia",
          "effect": "tilt",
          "amplitude": -1.8,
          "hold": true,
          "durationMs": 500
        },
        {
          "effect": "glow",
          "to": 0.2,
          "durationMs": 800
        }
      ],
      "next": "s08_l838_0",
      "emotions": {},
      "pose": "pose_bench_hug"
    },
    {
      "id": "s08_l838_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 838,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s08_l838_1",
      "emotions": {},
      "pose": "pose_bench_hug"
    },
    {
      "id": "s08_l838_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Всё будет нормально. Мы с тобой решим, что с этим делать. Я всё-таки тоже тут замешан. Поэтому решим вместе, и всё будет хорошо. Не переживай».",
      "source": [
        {
          "file": "dialogues",
          "line": 838,
          "start": 6,
          "end": 150
        }
      ],
      "next": "s08_l840_0",
      "emotions": {},
      "pose": "pose_bench_hug"
    },
    {
      "id": "s08_l840_0",
      "type": "narration",
      "text": "Они сидят так минут пять. Азалия понемногу успокаивается и вдруг ясно понимает одну вещь.",
      "source": [
        {
          "file": "dialogues",
          "line": 840,
          "start": 0,
          "end": 89
        }
      ],
      "next": "s08_l842_0",
      "emotions": {},
      "pose": "pose_bench_hug"
    },
    {
      "id": "s08_l842_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 842,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s08_l842_1",
      "emotions": {
        "azalia": "tender"
      }
    },
    {
      "id": "s08_l842_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Мне он тоже нравится».",
      "source": [
        {
          "file": "dialogues",
          "line": 842,
          "start": 14,
          "end": 37
        }
      ],
      "next": "s08_l844_0",
      "emotions": {
        "azalia": "tender"
      }
    },
    {
      "id": "s08_l844_0",
      "type": "narration",
      "text": "Она резко встаёт и разворачивается к нему.",
      "source": [
        {
          "file": "dialogues",
          "line": 844,
          "start": 0,
          "end": 42
        }
      ],
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
          "effect": "group",
          "targets": [],
          "durationMs": 550
        },
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        }
      ],
      "next": "s08_l846_0",
      "emotions": {
        "azalia": "resolve"
      }
    },
    {
      "id": "s08_l846_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 846,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s08_l846_1",
      "emotions": {
        "azalia": "resolve"
      }
    },
    {
      "id": "s08_l846_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Так. Для начала: почему, когда я тебе приглянулась, ты ко мне не подходил? Даже не пытался подружиться?»",
      "source": [
        {
          "file": "dialogues",
          "line": 846,
          "start": 8,
          "end": 113
        }
      ],
      "next": "s08_l848_0",
      "emotions": {
        "azalia": "resolve"
      }
    },
    {
      "id": "s08_l848_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (спокойно, улыбаясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 848,
          "start": 0,
          "end": 27
        }
      ],
      "next": "s08_l848_1",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s08_l848_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Просто я хотел сразу больше, чем дружбу. Поэтому и засыпал тебя комплиментами. Вообще считаю, что мне очень сильно повезло: всё сложилось именно так, как я хотел. Ха-ха-ха!»",
      "source": [
        {
          "file": "dialogues",
          "line": 848,
          "start": 27,
          "end": 201
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "bounce",
          "amplitude": 6,
          "durationMs": 500
        }
      ],
      "next": "s08_l850_0",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s08_l850_0",
      "type": "narration",
      "text": "Он встаёт, обнимает её за талию и шепчет на ухо.",
      "source": [
        {
          "file": "dialogues",
          "line": 850,
          "start": 0,
          "end": 48
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
          "amplitude": -2,
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
          "to": 0.28,
          "durationMs": 1000
        }
      ],
      "next": "s08_l852_0",
      "emotions": {
        "dima": "love"
      },
      "pose": "pose_bench_hug"
    },
    {
      "id": "s08_l852_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 852,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s08_l852_1",
      "emotions": {},
      "pose": "pose_bench_hug"
    },
    {
      "id": "s08_l852_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Всё-таки мы друг другу оба нравимся».",
      "source": [
        {
          "file": "dialogues",
          "line": 852,
          "start": 6,
          "end": 44
        }
      ],
      "next": "s08_l854_0",
      "emotions": {},
      "pose": "pose_bench_hug"
    },
    {
      "id": "s08_l854_0",
      "type": "narration",
      "text": "Азалия шутливо отталкивает его.",
      "source": [
        {
          "file": "dialogues",
          "line": 854,
          "start": 0,
          "end": 31
        }
      ],
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
          "to": 1,
          "durationMs": 700
        },
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 480
        }
      ],
      "next": "s08_l856_0",
      "emotions": {}
    },
    {
      "id": "s08_l856_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 856,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s08_l856_1",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s08_l856_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Туууф!»",
      "source": [
        {
          "file": "dialogues",
          "line": 856,
          "start": 8,
          "end": 16
        }
      ],
      "next": "s08_l858_0",
      "emotions": {
        "azalia": "blush"
      }
    },
    {
      "id": "s08_l858_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 858,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s08_l858_1",
      "emotions": {}
    },
    {
      "id": "s08_l858_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Теперь, второе, это правда, что ты во время распределения имел мысли только обо мне?»",
      "source": [
        {
          "file": "dialogues",
          "line": 858,
          "start": 8,
          "end": 94
        }
      ],
      "next": "s08_l860_0",
      "emotions": {}
    },
    {
      "id": "s08_l860_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 860,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s08_l860_1",
      "emotions": {}
    },
    {
      "id": "s08_l860_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«А?... Ты откуда это знаешь? Мысли что-ли еще умеешь читать?»",
      "source": [
        {
          "file": "dialogues",
          "line": 860,
          "start": 6,
          "end": 67
        }
      ],
      "next": "s08_l862_0",
      "emotions": {}
    },
    {
      "id": "s08_l862_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 862,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s08_l862_1",
      "emotions": {
        "azalia": "smile",
        "dima": "blush"
      }
    },
    {
      "id": "s08_l862_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Хахах, нееее. Мне просто шляпа сказала, хахах»",
      "source": [
        {
          "file": "dialogues",
          "line": 862,
          "start": 8,
          "end": 55
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
      "next": "s08_l864_0",
      "emotions": {
        "azalia": "smile",
        "dima": "blush"
      }
    },
    {
      "id": "s08_l864_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 864,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s08_l864_1",
      "emotions": {
        "azalia": "smile",
        "dima": "blush"
      }
    },
    {
      "id": "s08_l864_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Хахаха, какая однако подстава»",
      "source": [
        {
          "file": "dialogues",
          "line": 864,
          "start": 6,
          "end": 37
        }
      ],
      "next": "s08_l867_0",
      "emotions": {
        "azalia": "smile",
        "dima": "blush"
      }
    },
    {
      "id": "s08_l867_0",
      "type": "narration",
      "text": "Она смеётся. Дима смеётся тоже. Немного поговорив, они расходятся по комнатам спать.",
      "source": [
        {
          "file": "dialogues",
          "line": 867,
          "start": 0,
          "end": 84
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
      "next": "s08_l868_0",
      "emotions": {}
    },
    {
      "id": "s08_l868_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Анимация: библиотека. Азалия разговаривает с Димой, они сидят рядом над одной книгой. Потом они обнимаются в коридоре. Но поцелуев пока нет. Смена кадра: две спальни. Азалия и Дима не могут уснуть, обнимают подушки и счастливо улыбаются в темноту.",
      "source": [
        {
          "file": "dialogues",
          "line": 868,
          "start": 0,
          "end": 247
        }
      ],
      "next": "s08_cs08",
      "emotions": {}
    },
    {
      "id": "s08_cs08",
      "type": "cutscene",
      "cutsceneId": "cs08_closeness",
      "source": [],
      "next": "s08_if_rose_end",
      "emotions": {}
    },
    {
      "id": "s08_if_rose_end",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s08_end_skip_s09",
      "source": [],
      "else": "s08_end",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s08_end_skip_s09",
      "type": "end",
      "nextScene": "scene10",
      "source": [],
      "next": null,
      "emotions": {}
    },
    {
      "id": "s08_end",
      "type": "end",
      "nextScene": "scene09",
      "source": [],
      "next": null,
      "emotions": {}
    }
  ],
  "sourceLedger": [
    {
      "line": 798,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "metadata",
          "text": "Сцена 8. Разговор у фонтана"
        }
      ],
      "original": "Сцена 8. Разговор у фонтана"
    },
    {
      "line": 799,
      "parts": [],
      "original": ""
    },
    {
      "line": 800,
      "parts": [
        {
          "start": 0,
          "end": 48,
          "kind": "metadata",
          "text": "Где: скамейка у фонтана днём и ночью, библиотека"
        }
      ],
      "original": "Где: скамейка у фонтана днём и ночью, библиотека"
    },
    {
      "line": 801,
      "parts": [],
      "original": ""
    },
    {
      "line": 802,
      "parts": [
        {
          "start": 0,
          "end": 127,
          "kind": "narration",
          "node": "s08_l802_0",
          "field": "text"
        }
      ],
      "original": "Двор. Дима сидит на скамейке у фонтана и читает. К нему приближается Тео. Шаги тяжёлые, но он изо всех сил держит себя в руках."
    },
    {
      "line": 803,
      "parts": [],
      "original": ""
    },
    {
      "line": 804,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "stage",
          "node": "s08_l804_0",
          "field": "annotation"
        },
        {
          "start": 11,
          "end": 164,
          "kind": "thought",
          "node": "s08_l804_1",
          "field": "text"
        }
      ],
      "original": "Мысли Тео: «Спокойно. Если скажет, что они просто друзья, то отлично. Если пошлёт меня подальше, тоже хорошо, хоть повод будет. Любой из этих ответов меня устроит»."
    },
    {
      "line": 805,
      "parts": [],
      "original": ""
    },
    {
      "line": 806,
      "parts": [
        {
          "start": 0,
          "end": 17,
          "kind": "stage",
          "node": "s08_l806_0",
          "field": "annotation"
        },
        {
          "start": 17,
          "end": 39,
          "kind": "dialogue",
          "node": "s08_l806_1",
          "field": "text"
        }
      ],
      "original": "Тео (сдержанно): «Нам надо поговорить»."
    },
    {
      "line": 807,
      "parts": [],
      "original": ""
    },
    {
      "line": 808,
      "parts": [
        {
          "start": 0,
          "end": 101,
          "kind": "narration",
          "node": "s08_l808_0",
          "field": "text"
        }
      ],
      "original": "Дима поднимает голову. На его лице искреннее удивление: он явно ожидал увидеть здесь кого-то другого."
    },
    {
      "line": 809,
      "parts": [],
      "original": ""
    },
    {
      "line": 810,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s08_l810_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 122,
          "kind": "dialogue",
          "node": "s08_l810_1",
          "field": "text"
        },
        {
          "start": 122,
          "end": 283,
          "kind": "dialogue",
          "node": "s08_l810_2",
          "field": "text"
        }
      ],
      "original": "Дима: «Так. Я, конечно, ожидал увидеть здесь другого Блэка. Ну ладно. Давай начнём сначала. Меня зовут Дмитрий Де Нестер. Обо мне можешь не волноваться: я нормальный, никаких плохих мыслей по поводу твоей сестры у меня нет. Но что касается дружбы... нет. Я хочу быть для неё больше»."
    },
    {
      "line": 811,
      "parts": [],
      "original": ""
    },
    {
      "line": 812,
      "parts": [
        {
          "start": 0,
          "end": 103,
          "kind": "narration",
          "node": "s08_l812_0",
          "field": "text"
        }
      ],
      "original": "Лицо Тео наливается краской от злости. Рука сама тянется к палочке, а в голове одна мысль: врезать ему."
    },
    {
      "line": 813,
      "parts": [],
      "original": ""
    },
    {
      "line": 814,
      "parts": [
        {
          "start": 0,
          "end": 42,
          "kind": "stage",
          "node": "s08_l814_0",
          "field": "annotation"
        },
        {
          "start": 42,
          "end": 366,
          "kind": "dialogue",
          "node": "s08_l814_1",
          "field": "text"
        }
      ],
      "original": "Дима (быстро, не дав ему вставить слово): «Если ты мне не веришь, я готов доказать, что не шучу. Она мне нравится. Я всегда наблюдал за ней на уроках, и, честно говоря, это первый человек, которого я так сильно стесняюсь. Именно с ней мне интересно разговаривать. Говори, что надо сделать, чтобы доказать, что я готов ради неё на всё, и чтобы получить твоё доверие»."
    },
    {
      "line": 815,
      "parts": [],
      "original": ""
    },
    {
      "line": 816,
      "parts": [
        {
          "start": 0,
          "end": 108,
          "kind": "narration",
          "node": "s08_l816_0",
          "field": "text"
        }
      ],
      "original": "Тео замирает. Злость отступает. Перед ним сидит нормальный парень, но для верности Тео решает проверить его."
    },
    {
      "line": 817,
      "parts": [],
      "original": ""
    },
    {
      "line": 818,
      "parts": [
        {
          "start": 0,
          "end": 20,
          "kind": "stage",
          "node": "s08_l818_0",
          "field": "annotation"
        },
        {
          "start": 20,
          "end": 48,
          "kind": "dialogue",
          "node": "s08_l818_1",
          "field": "text"
        }
      ],
      "original": "Тео (прищурившись): «Готов ли ты лишиться руки?»"
    },
    {
      "line": 819,
      "parts": [],
      "original": ""
    },
    {
      "line": 820,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "stage",
          "node": "s08_l820_0",
          "field": "annotation"
        },
        {
          "start": 21,
          "end": 26,
          "kind": "dialogue",
          "node": "s08_l820_1",
          "field": "text"
        }
      ],
      "original": "Дима (без раздумий): «Да»."
    },
    {
      "line": 821,
      "parts": [],
      "original": ""
    },
    {
      "line": 822,
      "parts": [
        {
          "start": 0,
          "end": 84,
          "kind": "narration",
          "node": "s08_l822_0",
          "field": "text"
        }
      ],
      "original": "Тео вскидывает палочку и делает вид, что разрубает Диме руку. Тот даже не дёргается."
    },
    {
      "line": 823,
      "parts": [],
      "original": ""
    },
    {
      "line": 824,
      "parts": [
        {
          "start": 0,
          "end": 33,
          "kind": "stage",
          "node": "s08_l824_0",
          "field": "annotation"
        },
        {
          "start": 33,
          "end": 97,
          "kind": "dialogue",
          "node": "s08_l824_1",
          "field": "text"
        },
        {
          "start": 97,
          "end": 107,
          "kind": "stage",
          "node": "s08_l824_2",
          "field": "annotation"
        },
        {
          "start": 107,
          "end": 214,
          "kind": "dialogue",
          "node": "s08_l824_3",
          "field": "text"
        }
      ],
      "original": "Тео (опуская палочку и вздыхая): «Хорошо. Я тебе верю. Не знаю почему, но тебе можно довериться». (Пауза.) «Пойду ещё поговорю с сестрой. Представляешь, я узнаю об этом не от неё и не от тебя, а от Роуз. Я в шоке»."
    },
    {
      "line": 825,
      "parts": [],
      "original": ""
    },
    {
      "line": 826,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s08_l826_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 94,
          "kind": "dialogue",
          "node": "s08_l826_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Хорошо. Удачи. Только не дави на неё сильно: у неё, скорее всего, были на это причины»."
    },
    {
      "line": 827,
      "parts": [],
      "original": ""
    },
    {
      "line": 828,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "narration",
          "node": "s08_l828_0",
          "field": "text"
        }
      ],
      "original": "Затемнение."
    },
    {
      "line": 829,
      "parts": [],
      "original": ""
    },
    {
      "line": 830,
      "parts": [
        {
          "start": 0,
          "end": 196,
          "kind": "narration",
          "node": "s08_l830_0",
          "field": "text"
        }
      ],
      "original": "Ночь. Двор у фонтана. Азалия сидит одна на скамейке, обхватив колени. Лунный свет отражается в воде. Слышатся шаги. Из тени выходит Дима, уже готовый начать с шутки, но, увидев её лицо, замолкает."
    },
    {
      "line": 831,
      "parts": [],
      "original": ""
    },
    {
      "line": 832,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s08_l832_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 45,
          "kind": "dialogue",
          "node": "s08_l832_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Азалия, что произошло? Всё нормально?»"
    },
    {
      "line": 833,
      "parts": [],
      "original": ""
    },
    {
      "line": 834,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s08_l834_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 140,
          "kind": "dialogue",
          "node": "s08_l834_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Да... Просто мы с Тео поссорились. Из-за того, что я промолчала и ничего не сказала брату. А я ему доверяю почти так же, как себе»."
    },
    {
      "line": 835,
      "parts": [],
      "original": ""
    },
    {
      "line": 836,
      "parts": [
        {
          "start": 0,
          "end": 39,
          "kind": "narration",
          "node": "s08_l836_0",
          "field": "text"
        }
      ],
      "original": "Дима молча подсаживается и обнимает её."
    },
    {
      "line": 837,
      "parts": [],
      "original": ""
    },
    {
      "line": 838,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s08_l838_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 150,
          "kind": "dialogue",
          "node": "s08_l838_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Всё будет нормально. Мы с тобой решим, что с этим делать. Я всё-таки тоже тут замешан. Поэтому решим вместе, и всё будет хорошо. Не переживай»."
    },
    {
      "line": 839,
      "parts": [],
      "original": ""
    },
    {
      "line": 840,
      "parts": [
        {
          "start": 0,
          "end": 89,
          "kind": "narration",
          "node": "s08_l840_0",
          "field": "text"
        }
      ],
      "original": "Они сидят так минут пять. Азалия понемногу успокаивается и вдруг ясно понимает одну вещь."
    },
    {
      "line": 841,
      "parts": [],
      "original": ""
    },
    {
      "line": 842,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s08_l842_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 37,
          "kind": "thought",
          "node": "s08_l842_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Мне он тоже нравится»."
    },
    {
      "line": 843,
      "parts": [],
      "original": ""
    },
    {
      "line": 844,
      "parts": [
        {
          "start": 0,
          "end": 42,
          "kind": "narration",
          "node": "s08_l844_0",
          "field": "text"
        }
      ],
      "original": "Она резко встаёт и разворачивается к нему."
    },
    {
      "line": 845,
      "parts": [],
      "original": ""
    },
    {
      "line": 846,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s08_l846_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 113,
          "kind": "dialogue",
          "node": "s08_l846_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Так. Для начала: почему, когда я тебе приглянулась, ты ко мне не подходил? Даже не пытался подружиться?»"
    },
    {
      "line": 847,
      "parts": [],
      "original": ""
    },
    {
      "line": 848,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "stage",
          "node": "s08_l848_0",
          "field": "annotation"
        },
        {
          "start": 27,
          "end": 201,
          "kind": "dialogue",
          "node": "s08_l848_1",
          "field": "text"
        }
      ],
      "original": "Дима (спокойно, улыбаясь): «Просто я хотел сразу больше, чем дружбу. Поэтому и засыпал тебя комплиментами. Вообще считаю, что мне очень сильно повезло: всё сложилось именно так, как я хотел. Ха-ха-ха!»"
    },
    {
      "line": 849,
      "parts": [],
      "original": ""
    },
    {
      "line": 850,
      "parts": [
        {
          "start": 0,
          "end": 48,
          "kind": "narration",
          "node": "s08_l850_0",
          "field": "text"
        }
      ],
      "original": "Он встаёт, обнимает её за талию и шепчет на ухо."
    },
    {
      "line": 851,
      "parts": [],
      "original": ""
    },
    {
      "line": 852,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s08_l852_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 44,
          "kind": "dialogue",
          "node": "s08_l852_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Всё-таки мы друг другу оба нравимся»."
    },
    {
      "line": 853,
      "parts": [],
      "original": ""
    },
    {
      "line": 854,
      "parts": [
        {
          "start": 0,
          "end": 31,
          "kind": "narration",
          "node": "s08_l854_0",
          "field": "text"
        }
      ],
      "original": "Азалия шутливо отталкивает его."
    },
    {
      "line": 855,
      "parts": [],
      "original": ""
    },
    {
      "line": 856,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s08_l856_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 16,
          "kind": "dialogue",
          "node": "s08_l856_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Туууф!»"
    },
    {
      "line": 857,
      "parts": [],
      "original": ""
    },
    {
      "line": 858,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s08_l858_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 94,
          "kind": "dialogue",
          "node": "s08_l858_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Теперь, второе, это правда, что ты во время распределения имел мысли только обо мне?»"
    },
    {
      "line": 859,
      "parts": [],
      "original": ""
    },
    {
      "line": 860,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s08_l860_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 67,
          "kind": "dialogue",
          "node": "s08_l860_1",
          "field": "text"
        }
      ],
      "original": "Дима: «А?... Ты откуда это знаешь? Мысли что-ли еще умеешь читать?»"
    },
    {
      "line": 861,
      "parts": [],
      "original": ""
    },
    {
      "line": 862,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s08_l862_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 55,
          "kind": "dialogue",
          "node": "s08_l862_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Хахах, нееее. Мне просто шляпа сказала, хахах»"
    },
    {
      "line": 863,
      "parts": [],
      "original": ""
    },
    {
      "line": 864,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s08_l864_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 37,
          "kind": "dialogue",
          "node": "s08_l864_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Хахаха, какая однако подстава»"
    },
    {
      "line": 865,
      "parts": [],
      "original": ""
    },
    {
      "line": 866,
      "parts": [],
      "original": ""
    },
    {
      "line": 867,
      "parts": [
        {
          "start": 0,
          "end": 84,
          "kind": "narration",
          "node": "s08_l867_0",
          "field": "text"
        }
      ],
      "original": "Она смеётся. Дима смеётся тоже. Немного поговорив, они расходятся по комнатам спать."
    },
    {
      "line": 868,
      "parts": [
        {
          "start": 0,
          "end": 247,
          "kind": "stage",
          "node": "s08_l868_0",
          "field": "annotation"
        }
      ],
      "original": "Анимация: библиотека. Азалия разговаривает с Димой, они сидят рядом над одной книгой. Потом они обнимаются в коридоре. Но поцелуев пока нет. Смена кадра: две спальни. Азалия и Дима не могут уснуть, обнимают подушки и счастливо улыбаются в темноту."
    },
    {
      "line": 869,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "metadata",
          "text": "Конец сцены 8."
        }
      ],
      "original": "Конец сцены 8."
    },
    {
      "line": 870,
      "parts": [],
      "original": ""
    }
  ]
};

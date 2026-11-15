export default {
  "schemaVersion": 1,
  "id": "scene03",
  "start": "s03_enter",
  "nodes": [
    {
      "id": "s03_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_potions",
      "characters": [
        "theo",
        "harry",
        "hermione",
        "azalia"
      ],
      "source": [],
      "next": "s03_l269_0"
    },
    {
      "id": "s03_l269_0",
      "type": "narration",
      "text": "Подземелье. Сырой холодный воздух, чадят факелы, на полках стоят банки с чем-то мутным, что когда-то было живым. Гриффиндорцы и пуффендуйцы рассаживаются за столами. Тео уже болтает с соседями, и вокруг него быстро собирается целая компания.",
      "source": [
        {
          "file": "dialogues",
          "line": 269,
          "start": 0,
          "end": 241
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "focus"
        },
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500
        }
      ],
      "next": "s03_l271_0"
    },
    {
      "id": "s03_l271_0",
      "type": "narration",
      "text": "Двери распахиваются, и в класс стремительно входит Снейп. Мантия развевается за ним, как крылья летучей мыши. Разговоры мгновенно смолкают.",
      "source": [
        {
          "file": "dialogues",
          "line": 271,
          "start": 0,
          "end": 139
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 420
        },
        {
          "target": "snape",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 500,
          "delayMs": 80
        },
        {
          "target": "snape",
          "effect": "focus",
          "delayMs": 180
        }
      ],
      "next": "s03_l273_0"
    },
    {
      "id": "s03_l273_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Снейп (негромко, почти шёпотом, и от этого ещё страшнее): ",
      "source": [
        {
          "file": "dialogues",
          "line": 273,
          "start": 0,
          "end": 58
        }
      ],
      "next": "s03_l273_1"
    },
    {
      "id": "s03_l273_1",
      "type": "dialogue",
      "speaker": "snape",
      "text": "«Вы пришли учиться зельеварению. Это не фокусы и не размахивание палочкой. Это точность, терпение и дисциплина. Тот, у кого их нет, может покинуть класс прямо сейчас».",
      "source": [
        {
          "file": "dialogues",
          "line": 273,
          "start": 58,
          "end": 225
        }
      ],
      "next": "s03_l275_0"
    },
    {
      "id": "s03_l275_0",
      "type": "narration",
      "text": "Он начинает перекличку. На имени «Поттер» замолкает и медленно поднимает глаза.",
      "source": [
        {
          "file": "dialogues",
          "line": 275,
          "start": 0,
          "end": 79
        }
      ],
      "cues": [
        {
          "target": "snape",
          "effect": "focus"
        }
      ],
      "next": "s03_l277_0"
    },
    {
      "id": "s03_l277_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Снейп: ",
      "source": [
        {
          "file": "dialogues",
          "line": 277,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s03_l277_1"
    },
    {
      "id": "s03_l277_1",
      "type": "dialogue",
      "speaker": "snape",
      "text": "«Гарри Поттер. Ну что ж. Раз уж вы у нас знаменитость, вам не составит труда ответить на пару вопросов. Что получится, если добавить порошок корня асфоделя к настою полыни? Где мне следует искать безоар? Я жду».",
      "source": [
        {
          "file": "dialogues",
          "line": 277,
          "start": 7,
          "end": 218
        }
      ],
      "next": "s03_l279_0"
    },
    {
      "id": "s03_l279_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Гарри (растерянно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 279,
          "start": 0,
          "end": 20
        }
      ],
      "cues": [
        {
          "target": "harry",
          "effect": "focus"
        },
        {
          "target": "harry",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s03_l279_1"
    },
    {
      "id": "s03_l279_1",
      "type": "dialogue",
      "speaker": "harry",
      "text": "«Я... не знаю, сэр».",
      "source": [
        {
          "file": "dialogues",
          "line": 279,
          "start": 20,
          "end": 40
        }
      ],
      "next": "s03_l281_0"
    },
    {
      "id": "s03_l281_0",
      "type": "narration",
      "text": "Рука Гермионы взлетает так высоко, что она почти привстаёт со скамьи. Снейп даже не смотрит в её сторону.",
      "source": [
        {
          "file": "dialogues",
          "line": 281,
          "start": 0,
          "end": 105
        }
      ],
      "cues": [
        {
          "target": "hermione",
          "effect": "focus"
        },
        {
          "target": "hermione",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s03_l283_0"
    },
    {
      "id": "s03_l283_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Снейп (с холодной усмешкой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 283,
          "start": 0,
          "end": 29
        }
      ],
      "next": "s03_l283_1"
    },
    {
      "id": "s03_l283_1",
      "type": "dialogue",
      "speaker": "snape",
      "text": "«Печально. Выходит, известность заменяет вам знания. Сядьте, Грейнджер».",
      "source": [
        {
          "file": "dialogues",
          "line": 283,
          "start": 29,
          "end": 101
        }
      ],
      "next": "s03_l285_0"
    },
    {
      "id": "s03_l285_0",
      "type": "narration",
      "text": "Гарри опускает голову. Гриффиндорцы мрачно переглядываются.",
      "source": [
        {
          "file": "dialogues",
          "line": 285,
          "start": 0,
          "end": 59
        }
      ],
      "cues": [
        {
          "target": "harry",
          "effect": "tilt",
          "amplitude": -2.5,
          "durationMs": 500
        }
      ],
      "next": "s03_l287_0"
    },
    {
      "id": "s03_l287_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 287,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s03_l287_1"
    },
    {
      "id": "s03_l287_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«По факту, Гарри ничего не знает. Но надо понимать, что до недавнего времени он даже не знал, что он волшебник. Логично, что он не ответит. А этот белый гуль прекрасно это понимает и специально лезет. Бедный Гарри».",
      "source": [
        {
          "file": "dialogues",
          "line": 287,
          "start": 14,
          "end": 229
        }
      ],
      "next": "s03_l289_0"
    },
    {
      "id": "s03_l289_0",
      "type": "narration",
      "text": "Взгляд Снейпа скользит по классу и останавливается на Азалии. Он смотрит на неё с таким откровенным негативом, что любой другой на её месте втянул бы голову в плечи. Азалия спокойно смотрит в ответ. Проходит несколько долгих секунд. Снейп, поджав губы, первым отводит глаза.",
      "source": [
        {
          "file": "dialogues",
          "line": 289,
          "start": 0,
          "end": 274
        }
      ],
      "cues": [
        {
          "target": "snape",
          "effect": "focus"
        },
        {
          "effect": "camera",
          "to": 1.04,
          "durationMs": 900
        },
        {
          "target": "azalia",
          "effect": "focus",
          "delayMs": 500
        }
      ],
      "next": "s03_l291_0"
    },
    {
      "id": "s03_l291_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 291,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s03_l291_1"
    },
    {
      "id": "s03_l291_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Смотри-смотри. Ты же знаешь, что на любой твой вопрос я отвечу. Поэтому и не спрашиваешь. Что поделать».",
      "source": [
        {
          "file": "dialogues",
          "line": 291,
          "start": 14,
          "end": 119
        }
      ],
      "next": "s03_l291_2"
    },
    {
      "id": "s03_l291_2",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": " (Пауза.) ",
      "source": [
        {
          "file": "dialogues",
          "line": 291,
          "start": 119,
          "end": 129
        }
      ],
      "next": "s03_l291_3"
    },
    {
      "id": "s03_l291_3",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Как зельевара я его уважаю. А вот как человек он редкостная дрянь».",
      "source": [
        {
          "file": "dialogues",
          "line": 291,
          "start": 129,
          "end": 197
        }
      ],
      "next": "s03_l293_0"
    },
    {
      "id": "s03_l293_0",
      "type": "narration",
      "text": "Остаток урока проходит на удивление спокойно. Азалия решает, что в первый день просто посмотрит, что к чему, и пообщается с ребятами, чтобы сразу понять, где её круг общения.",
      "source": [
        {
          "file": "dialogues",
          "line": 293,
          "start": 0,
          "end": 174
        }
      ],
      "cues": [
        {
          "effect": "camera",
          "to": 1,
          "durationMs": 700
        }
      ],
      "next": "s03_game_potions"
    },
    {
      "id": "s03_game_potions",
      "type": "minigame",
      "gameId": "potions",
      "params": {},
      "resultRoutes": {
        "success": "s03_l297_0",
        "failure": "s03_l297_0"
      },
      "source": [
        {
          "file": "dialogues",
          "line": 295,
          "start": 0,
          "end": 65
        }
      ],
      "next": "s03_l297_0"
    },
    {
      "id": "s03_l297_0",
      "type": "narration",
      "text": "Она бросает взгляд на Тео: вокруг него уже целая толпа, он что-то рассказывает, и все смеются.",
      "source": [
        {
          "file": "dialogues",
          "line": 297,
          "start": 0,
          "end": 94
        }
      ],
      "cues": [
        {
          "target": "snape",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 420
        },
        {
          "target": "theo",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480,
          "delayMs": 80
        },
        {
          "target": "theo",
          "effect": "focus",
          "delayMs": 160
        },
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500,
          "delayMs": 200
        }
      ],
      "next": "s03_l299_0"
    },
    {
      "id": "s03_l299_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 299,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s03_l299_1"
    },
    {
      "id": "s03_l299_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Ничему не удивляюсь. Тео легко заводит знакомства. Да и вообще он очень похож на нашего с ним дядю. Наверное, в этом он пошёл в него».",
      "source": [
        {
          "file": "dialogues",
          "line": 299,
          "start": 14,
          "end": 149
        }
      ],
      "next": "s03_l300_0"
    },
    {
      "id": "s03_l300_0",
      "type": "narration",
      "text": "Урок заканчивается. Пока ученики шумно собирают вещи, к Азалии подсаживается Гермиона.",
      "source": [
        {
          "file": "dialogues",
          "line": 300,
          "start": 0,
          "end": 86
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 420
        },
        {
          "effect": "group",
          "targets": [
            "hermione",
            "azalia"
          ],
          "durationMs": 600
        }
      ],
      "next": "s03_l302_0"
    },
    {
      "id": "s03_l302_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Гермиона: ",
      "source": [
        {
          "file": "dialogues",
          "line": 302,
          "start": 0,
          "end": 10
        }
      ],
      "next": "s03_l302_1"
    },
    {
      "id": "s03_l302_1",
      "type": "dialogue",
      "speaker": "hermione",
      "text": "«Нет, ну это просто невозможно! Снейп такой мерзкий! Ты ему ничего не сделала, а он на тебя весь урок смотрел так, будто готов тебя растерзать!»",
      "source": [
        {
          "file": "dialogues",
          "line": 302,
          "start": 10,
          "end": 154
        }
      ],
      "next": "s03_l304_0"
    },
    {
      "id": "s03_l304_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 304,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s03_l304_1"
    },
    {
      "id": "s03_l304_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ну это же Снейп. Он очень мерзкий».",
      "source": [
        {
          "file": "dialogues",
          "line": 304,
          "start": 8,
          "end": 44
        }
      ],
      "next": "s03_l306_0"
    },
    {
      "id": "s03_l306_0",
      "type": "narration",
      "text": "К ним подходят Рон и Гарри.",
      "source": [
        {
          "file": "dialogues",
          "line": 306,
          "start": 0,
          "end": 27
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 550
        },
        {
          "target": "ron",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480
        }
      ],
      "next": "s03_l308_0"
    },
    {
      "id": "s03_l308_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Рон: ",
      "source": [
        {
          "file": "dialogues",
          "line": 308,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s03_l308_1"
    },
    {
      "id": "s03_l308_1",
      "type": "dialogue",
      "speaker": "ron",
      "text": "«Вы это тоже видели? Он смотрит так, будто мы все его личные враги».",
      "source": [
        {
          "file": "dialogues",
          "line": 308,
          "start": 5,
          "end": 73
        }
      ],
      "next": "s03_l310_0"
    },
    {
      "id": "s03_l310_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Гарри (тихо, с кривой усмешкой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 310,
          "start": 0,
          "end": 33
        }
      ],
      "next": "s03_l310_1"
    },
    {
      "id": "s03_l310_1",
      "type": "dialogue",
      "speaker": "harry",
      "text": "«Ага. Особенно я».",
      "source": [
        {
          "file": "dialogues",
          "line": 310,
          "start": 33,
          "end": 51
        }
      ],
      "next": "s03_l312_0"
    },
    {
      "id": "s03_l312_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 312,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s03_l312_1"
    },
    {
      "id": "s03_l312_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Не бери в голову, Гарри. Ты же совсем недавно узнал, что ты волшебник. Откуда тебе знать про асфодель? Он это прекрасно понимает. Ему просто нравится издеваться».",
      "source": [
        {
          "file": "dialogues",
          "line": 312,
          "start": 8,
          "end": 171
        }
      ],
      "next": "s03_l314_0"
    },
    {
      "id": "s03_l314_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Гарри (удивлённо, с облегчением): ",
      "source": [
        {
          "file": "dialogues",
          "line": 314,
          "start": 0,
          "end": 34
        }
      ],
      "next": "s03_l314_1"
    },
    {
      "id": "s03_l314_1",
      "type": "dialogue",
      "speaker": "harry",
      "text": "«Спасибо. Серьёзно».",
      "source": [
        {
          "file": "dialogues",
          "line": 314,
          "start": 34,
          "end": 54
        }
      ],
      "next": "s03_enter_corridor"
    },
    {
      "id": "s03_enter_corridor",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "harry",
        "hermione",
        "ron",
        "azalia"
      ],
      "source": [],
      "next": "s03_l316_0"
    },
    {
      "id": "s03_l316_0",
      "type": "narration",
      "text": "Они выходят в коридор, и разговор завязывается сам собой. Они перебивают друг друга, передразнивают Снейпа и смеются, и вскоре уже кажется, что они знакомы целую вечность. Всё идёт хорошо. Пока позади не раздаётся знакомый голос.",
      "source": [
        {
          "file": "dialogues",
          "line": 316,
          "start": 0,
          "end": 229
        }
      ],
      "next": "s03_l318_0"
    },
    {
      "id": "s03_l318_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Малфой (лениво, с ухмылкой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 318,
          "start": 0,
          "end": 29
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
          "to": 0,
          "side": "left",
          "durationMs": 400
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 500,
          "delayMs": 80
        },
        {
          "target": "malfoy",
          "effect": "focus",
          "delayMs": 160
        }
      ],
      "next": "s03_l318_1"
    },
    {
      "id": "s03_l318_1",
      "type": "dialogue",
      "speaker": "malfoy",
      "text": "«Ну, я, в принципе, не удивлён. Убожества привлекают ещё больше убожеств».",
      "source": [
        {
          "file": "dialogues",
          "line": 318,
          "start": 29,
          "end": 103
        }
      ],
      "next": "s03_l320_0"
    },
    {
      "id": "s03_l320_0",
      "type": "narration",
      "text": "Все четверо оборачиваются. Малфой стоит, скрестив руки на груди, довольный собой. Но договорить ему не дают: рядом тут же возникают братья Уизли.",
      "source": [
        {
          "file": "dialogues",
          "line": 320,
          "start": 0,
          "end": 145
        }
      ],
      "cues": [
        {
          "target": "twins",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480
        },
        {
          "target": "twins",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520,
          "delayMs": 120
        }
      ],
      "next": "s03_l322_0"
    },
    {
      "id": "s03_l322_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Фред: ",
      "source": [
        {
          "file": "dialogues",
          "line": 322,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s03_l322_1"
    },
    {
      "id": "s03_l322_1",
      "type": "dialogue",
      "speaker": "fred",
      "text": "«Малфой, ты заблудился? Выход там».",
      "source": [
        {
          "file": "dialogues",
          "line": 322,
          "start": 6,
          "end": 41
        }
      ],
      "next": "s03_l324_0"
    },
    {
      "id": "s03_l324_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Джордж: ",
      "source": [
        {
          "file": "dialogues",
          "line": 324,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s03_l324_1"
    },
    {
      "id": "s03_l324_1",
      "type": "dialogue",
      "speaker": "george",
      "text": "«Для твоей же безопасности».",
      "source": [
        {
          "file": "dialogues",
          "line": 324,
          "start": 8,
          "end": 36
        }
      ],
      "next": "s03_l326_0"
    },
    {
      "id": "s03_l326_0",
      "type": "narration",
      "text": "Малфой не обращает на них внимания и продолжает, глядя на Азалию.",
      "source": [
        {
          "file": "dialogues",
          "line": 326,
          "start": 0,
          "end": 65
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "focus"
        }
      ],
      "next": "s03_l328_0"
    },
    {
      "id": "s03_l328_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Малфой: ",
      "source": [
        {
          "file": "dialogues",
          "line": 328,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s03_l328_1"
    },
    {
      "id": "s03_l328_1",
      "type": "dialogue",
      "speaker": "malfoy",
      "text": "«А ты, Блэк, вообще позор для своей фамилии. Пуффендуй! На твоём месте я бы сменил имя».",
      "source": [
        {
          "file": "dialogues",
          "line": 328,
          "start": 8,
          "end": 96
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s03_l330_0"
    },
    {
      "id": "s03_l330_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 330,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s03_l330_1"
    },
    {
      "id": "s03_l330_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Тупой, что ли? Хули ты прикопался? Как же он достал».",
      "source": [
        {
          "file": "dialogues",
          "line": 330,
          "start": 14,
          "end": 68
        }
      ],
      "next": "s03_l332_0"
    },
    {
      "id": "s03_l332_0",
      "type": "narration",
      "text": "Рука Азалии потихоньку тянется к карману, где лежит волшебная палочка.",
      "source": [
        {
          "file": "dialogues",
          "line": 332,
          "start": 0,
          "end": 70
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
          "amplitude": 1.8,
          "durationMs": 500
        }
      ],
      "next": "s03_l334_0"
    },
    {
      "id": "s03_l334_0",
      "type": "narration",
      "text": "И тут между ними вклинивается Пэнси.",
      "source": [
        {
          "file": "dialogues",
          "line": 334,
          "start": 0,
          "end": 36
        }
      ],
      "cues": [
        {
          "target": "harry",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 400
        },
        {
          "target": "pansy",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 480,
          "delayMs": 80
        },
        {
          "target": "pansy",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500,
          "delayMs": 120
        }
      ],
      "next": "s03_l336_0"
    },
    {
      "id": "s03_l336_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Пэнси (поспешно, примирительно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 336,
          "start": 0,
          "end": 33
        }
      ],
      "next": "s03_l336_1"
    },
    {
      "id": "s03_l336_1",
      "type": "dialogue",
      "speaker": "pansy",
      "text": "«Ну, ребята, тише, тише!»",
      "source": [
        {
          "file": "dialogues",
          "line": 336,
          "start": 33,
          "end": 58
        }
      ],
      "next": "s03_l338_0"
    },
    {
      "id": "s03_l338_0",
      "type": "narration",
      "text": "Она хватает Малфоя под руку.",
      "source": [
        {
          "file": "dialogues",
          "line": 338,
          "start": 0,
          "end": 28
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "pansy",
            "malfoy"
          ],
          "durationMs": 550
        }
      ],
      "next": "s03_l340_0"
    },
    {
      "id": "s03_l340_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Пэнси: ",
      "source": [
        {
          "file": "dialogues",
          "line": 340,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s03_l340_1"
    },
    {
      "id": "s03_l340_1",
      "type": "dialogue",
      "speaker": "pansy",
      "text": "«Вы же знаете, что это Малфой. Отстаньте от него. Пошли, Драко».",
      "source": [
        {
          "file": "dialogues",
          "line": 340,
          "start": 7,
          "end": 71
        }
      ],
      "next": "s03_l342_0"
    },
    {
      "id": "s03_l342_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Малфой (оглядываясь на ходу, срываясь на визг): ",
      "source": [
        {
          "file": "dialogues",
          "line": 342,
          "start": 0,
          "end": 48
        }
      ],
      "next": "s03_l342_1"
    },
    {
      "id": "s03_l342_1",
      "type": "dialogue",
      "speaker": "malfoy",
      "text": "«Я вам ещё наподдам! Слышите?! Я вам всем ещё покажу!»",
      "source": [
        {
          "file": "dialogues",
          "line": 342,
          "start": 48,
          "end": 102
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
      "next": "s03_enter_slytherin_end"
    },
    {
      "id": "s03_enter_slytherin_end",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "pansy",
        "malfoy",
        "blaise",
        "nott"
      ],
      "source": [],
      "next": "s03_l344_0"
    },
    {
      "id": "s03_l344_0",
      "type": "narration",
      "text": "Смена кадра: конец коридора. Пэнси с Малфоем подходят к Блейзу и Нотту. Малфой сразу начинает жаловаться, размахивая руками.",
      "source": [
        {
          "file": "dialogues",
          "line": 344,
          "start": 0,
          "end": 124
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "focus"
        },
        {
          "target": "malfoy",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520
        }
      ],
      "next": "s03_l346_0"
    },
    {
      "id": "s03_l346_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Малфой: ",
      "source": [
        {
          "file": "dialogues",
          "line": 346,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s03_l346_1"
    },
    {
      "id": "s03_l346_1",
      "type": "dialogue",
      "speaker": "malfoy",
      "text": "«Они... Эти... Вы должны с этим разобраться! Вы же старшие!»",
      "source": [
        {
          "file": "dialogues",
          "line": 346,
          "start": 8,
          "end": 68
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s03_l348_0"
    },
    {
      "id": "s03_l348_0",
      "type": "narration",
      "text": "Нотт, не меняя выражения лица, отвешивает ему подзатыльник.",
      "source": [
        {
          "file": "dialogues",
          "line": 348,
          "start": 0,
          "end": 59
        }
      ],
      "cues": [
        {
          "target": "nott",
          "effect": "focus"
        },
        {
          "target": "malfoy",
          "effect": "shake",
          "amplitude": 5,
          "durationMs": 450,
          "delayMs": 180
        },
        {
          "target": "malfoy",
          "effect": "tilt",
          "amplitude": 3,
          "durationMs": 500,
          "delayMs": 180
        }
      ],
      "next": "s03_l350_0"
    },
    {
      "id": "s03_l350_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Нотт (очень надменно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 350,
          "start": 0,
          "end": 23
        }
      ],
      "next": "s03_l350_1"
    },
    {
      "id": "s03_l350_1",
      "type": "dialogue",
      "speaker": "nott",
      "text": "«Успокойся. Не обращай внимания на подобных людей. Не трать на них своё мнение».",
      "source": [
        {
          "file": "dialogues",
          "line": 350,
          "start": 23,
          "end": 103
        }
      ],
      "next": "s03_l352_0"
    },
    {
      "id": "s03_l352_0",
      "type": "narration",
      "text": "Малфой, потирая затылок, смотрит на Нотта с восхищением.",
      "source": [
        {
          "file": "dialogues",
          "line": 352,
          "start": 0,
          "end": 56
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "focus"
        }
      ],
      "next": "s03_l354_0"
    },
    {
      "id": "s03_l354_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Малфоя: ",
      "source": [
        {
          "file": "dialogues",
          "line": 354,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s03_l354_1"
    },
    {
      "id": "s03_l354_1",
      "type": "thought",
      "speaker": "malfoy",
      "text": "«Вот это уровень. Ему всё равно, он даже не замечает такой мусор».",
      "source": [
        {
          "file": "dialogues",
          "line": 354,
          "start": 14,
          "end": 80
        }
      ],
      "next": "s03_l356_0"
    },
    {
      "id": "s03_l356_0",
      "type": "narration",
      "text": "Малфой важно кивает. Четвёрка, Пэнси, Блейз, Нотт и Малфой, не спеша уходит прочь.",
      "source": [
        {
          "file": "dialogues",
          "line": 356,
          "start": 0,
          "end": 82
        }
      ],
      "cues": [
        {
          "target": "pansy",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 520
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 520,
          "delayMs": 60
        },
        {
          "target": "blaise",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 520,
          "delayMs": 120
        },
        {
          "target": "nott",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 520,
          "delayMs": 180
        }
      ],
      "next": "s03_enter_friends_after"
    },
    {
      "id": "s03_enter_friends_after",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "twins",
        "harry",
        "hermione",
        "azalia"
      ],
      "source": [],
      "next": "s03_l358_0"
    },
    {
      "id": "s03_l358_0",
      "type": "narration",
      "text": "Азалия смотрит им вслед.",
      "source": [
        {
          "file": "dialogues",
          "line": 358,
          "start": 0,
          "end": 24
        }
      ],
      "next": "s03_l360_0"
    },
    {
      "id": "s03_l360_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 360,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s03_l360_1"
    },
    {
      "id": "s03_l360_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ну и цирк».",
      "source": [
        {
          "file": "dialogues",
          "line": 360,
          "start": 8,
          "end": 20
        }
      ],
      "next": "s03_l362_0"
    },
    {
      "id": "s03_l362_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Фред: ",
      "source": [
        {
          "file": "dialogues",
          "line": 362,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s03_l362_1"
    },
    {
      "id": "s03_l362_1",
      "type": "dialogue",
      "speaker": "fred",
      "text": "«Билеты, между прочим, были бесплатные».",
      "source": [
        {
          "file": "dialogues",
          "line": 362,
          "start": 6,
          "end": 46
        }
      ],
      "next": "s03_l364_0"
    },
    {
      "id": "s03_l364_0",
      "type": "narration",
      "text": "Затемнение. Прошла неделя.",
      "source": [
        {
          "file": "dialogues",
          "line": 364,
          "start": 0,
          "end": 26
        }
      ],
      "next": "s03_enter_courtyard"
    },
    {
      "id": "s03_enter_courtyard",
      "type": "scene",
      "action": "enter",
      "background": "bg_fountain_day",
      "characters": [
        "theo",
        "hermione",
        "twins",
        "azalia"
      ],
      "source": [],
      "next": "s03_l366_0"
    },
    {
      "id": "s03_l366_0",
      "type": "narration",
      "text": "За эту неделю Азалия, Тео, Гермиона, Гарри, Рон, Фред и Джордж так сильно сдружились, что их теперь сложно представить по отдельности. У них образовалась своя компания.",
      "source": [
        {
          "file": "dialogues",
          "line": 366,
          "start": 0,
          "end": 168
        }
      ],
      "next": "s03_l367_0"
    },
    {
      "id": "s03_l367_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Анимация, коротко, кадр за кадром: они смеются, угорают, сбегают с уроков, гуляют по замку и по территории.",
      "cues": [
        {
          "target": "twins",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520
        },
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 520,
          "delayMs": 160
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 367,
          "start": 0,
          "end": 107
        }
      ],
      "next": "s03_cs03"
    },
    {
      "id": "s03_cs03",
      "type": "cutscene",
      "cutsceneId": "cs03",
      "source": [],
      "next": "s03_end"
    },
    {
      "id": "s03_end",
      "type": "end",
      "nextScene": "scene04",
      "source": [],
      "next": null
    }
  ],
  "sourceLedger": [
    {
      "line": 265,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "metadata",
          "text": "Сцена 3."
        }
      ],
      "original": "Сцена 3."
    },
    {
      "line": 266,
      "parts": [
        {
          "start": 0,
          "end": 19,
          "kind": "metadata",
          "text": " Класс зельеварения"
        }
      ],
      "original": " Класс зельеварения"
    },
    {
      "line": 267,
      "parts": [
        {
          "start": 0,
          "end": 37,
          "kind": "metadata",
          "text": "Где: подземелье зельеварения, коридор"
        }
      ],
      "original": "Где: подземелье зельеварения, коридор"
    },
    {
      "line": 268,
      "parts": [],
      "original": ""
    },
    {
      "line": 269,
      "parts": [
        {
          "start": 0,
          "end": 241,
          "kind": "narration",
          "node": "s03_l269_0",
          "field": "text"
        }
      ],
      "original": "Подземелье. Сырой холодный воздух, чадят факелы, на полках стоят банки с чем-то мутным, что когда-то было живым. Гриффиндорцы и пуффендуйцы рассаживаются за столами. Тео уже болтает с соседями, и вокруг него быстро собирается целая компания."
    },
    {
      "line": 270,
      "parts": [],
      "original": ""
    },
    {
      "line": 271,
      "parts": [
        {
          "start": 0,
          "end": 139,
          "kind": "narration",
          "node": "s03_l271_0",
          "field": "text"
        }
      ],
      "original": "Двери распахиваются, и в класс стремительно входит Снейп. Мантия развевается за ним, как крылья летучей мыши. Разговоры мгновенно смолкают."
    },
    {
      "line": 272,
      "parts": [],
      "original": ""
    },
    {
      "line": 273,
      "parts": [
        {
          "start": 0,
          "end": 58,
          "kind": "stage",
          "node": "s03_l273_0",
          "field": "annotation"
        },
        {
          "start": 58,
          "end": 225,
          "kind": "dialogue",
          "node": "s03_l273_1",
          "field": "text"
        }
      ],
      "original": "Снейп (негромко, почти шёпотом, и от этого ещё страшнее): «Вы пришли учиться зельеварению. Это не фокусы и не размахивание палочкой. Это точность, терпение и дисциплина. Тот, у кого их нет, может покинуть класс прямо сейчас»."
    },
    {
      "line": 274,
      "parts": [],
      "original": ""
    },
    {
      "line": 275,
      "parts": [
        {
          "start": 0,
          "end": 79,
          "kind": "narration",
          "node": "s03_l275_0",
          "field": "text"
        }
      ],
      "original": "Он начинает перекличку. На имени «Поттер» замолкает и медленно поднимает глаза."
    },
    {
      "line": 276,
      "parts": [],
      "original": ""
    },
    {
      "line": 277,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s03_l277_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 218,
          "kind": "dialogue",
          "node": "s03_l277_1",
          "field": "text"
        }
      ],
      "original": "Снейп: «Гарри Поттер. Ну что ж. Раз уж вы у нас знаменитость, вам не составит труда ответить на пару вопросов. Что получится, если добавить порошок корня асфоделя к настою полыни? Где мне следует искать безоар? Я жду»."
    },
    {
      "line": 278,
      "parts": [],
      "original": ""
    },
    {
      "line": 279,
      "parts": [
        {
          "start": 0,
          "end": 20,
          "kind": "stage",
          "node": "s03_l279_0",
          "field": "annotation"
        },
        {
          "start": 20,
          "end": 40,
          "kind": "dialogue",
          "node": "s03_l279_1",
          "field": "text"
        }
      ],
      "original": "Гарри (растерянно): «Я... не знаю, сэр»."
    },
    {
      "line": 280,
      "parts": [],
      "original": ""
    },
    {
      "line": 281,
      "parts": [
        {
          "start": 0,
          "end": 105,
          "kind": "narration",
          "node": "s03_l281_0",
          "field": "text"
        }
      ],
      "original": "Рука Гермионы взлетает так высоко, что она почти привстаёт со скамьи. Снейп даже не смотрит в её сторону."
    },
    {
      "line": 282,
      "parts": [],
      "original": ""
    },
    {
      "line": 283,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "stage",
          "node": "s03_l283_0",
          "field": "annotation"
        },
        {
          "start": 29,
          "end": 101,
          "kind": "dialogue",
          "node": "s03_l283_1",
          "field": "text"
        }
      ],
      "original": "Снейп (с холодной усмешкой): «Печально. Выходит, известность заменяет вам знания. Сядьте, Грейнджер»."
    },
    {
      "line": 284,
      "parts": [],
      "original": ""
    },
    {
      "line": 285,
      "parts": [
        {
          "start": 0,
          "end": 59,
          "kind": "narration",
          "node": "s03_l285_0",
          "field": "text"
        }
      ],
      "original": "Гарри опускает голову. Гриффиндорцы мрачно переглядываются."
    },
    {
      "line": 286,
      "parts": [],
      "original": ""
    },
    {
      "line": 287,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s03_l287_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 229,
          "kind": "thought",
          "node": "s03_l287_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «По факту, Гарри ничего не знает. Но надо понимать, что до недавнего времени он даже не знал, что он волшебник. Логично, что он не ответит. А этот белый гуль прекрасно это понимает и специально лезет. Бедный Гарри»."
    },
    {
      "line": 288,
      "parts": [],
      "original": ""
    },
    {
      "line": 289,
      "parts": [
        {
          "start": 0,
          "end": 274,
          "kind": "narration",
          "node": "s03_l289_0",
          "field": "text"
        }
      ],
      "original": "Взгляд Снейпа скользит по классу и останавливается на Азалии. Он смотрит на неё с таким откровенным негативом, что любой другой на её месте втянул бы голову в плечи. Азалия спокойно смотрит в ответ. Проходит несколько долгих секунд. Снейп, поджав губы, первым отводит глаза."
    },
    {
      "line": 290,
      "parts": [],
      "original": ""
    },
    {
      "line": 291,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s03_l291_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 119,
          "kind": "thought",
          "node": "s03_l291_1",
          "field": "text"
        },
        {
          "start": 119,
          "end": 129,
          "kind": "stage",
          "node": "s03_l291_2",
          "field": "annotation"
        },
        {
          "start": 129,
          "end": 197,
          "kind": "thought",
          "node": "s03_l291_3",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Смотри-смотри. Ты же знаешь, что на любой твой вопрос я отвечу. Поэтому и не спрашиваешь. Что поделать». (Пауза.) «Как зельевара я его уважаю. А вот как человек он редкостная дрянь»."
    },
    {
      "line": 292,
      "parts": [],
      "original": ""
    },
    {
      "line": 293,
      "parts": [
        {
          "start": 0,
          "end": 174,
          "kind": "narration",
          "node": "s03_l293_0",
          "field": "text"
        }
      ],
      "original": "Остаток урока проходит на удивление спокойно. Азалия решает, что в первый день просто посмотрит, что к чему, и пообщается с ребятами, чтобы сразу понять, где её круг общения."
    },
    {
      "line": 294,
      "parts": [],
      "original": ""
    },
    {
      "line": 295,
      "parts": [
        {
          "start": 0,
          "end": 65,
          "kind": "metadata",
          "text": "(Тут начинается мини игра с зельевареньем про нее потом расскажу)"
        }
      ],
      "original": "(Тут начинается мини игра с зельевареньем про нее потом расскажу)"
    },
    {
      "line": 296,
      "parts": [],
      "original": ""
    },
    {
      "line": 297,
      "parts": [
        {
          "start": 0,
          "end": 94,
          "kind": "narration",
          "node": "s03_l297_0",
          "field": "text"
        }
      ],
      "original": "Она бросает взгляд на Тео: вокруг него уже целая толпа, он что-то рассказывает, и все смеются."
    },
    {
      "line": 298,
      "parts": [],
      "original": ""
    },
    {
      "line": 299,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s03_l299_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 149,
          "kind": "thought",
          "node": "s03_l299_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Ничему не удивляюсь. Тео легко заводит знакомства. Да и вообще он очень похож на нашего с ним дядю. Наверное, в этом он пошёл в него»."
    },
    {
      "line": 300,
      "parts": [
        {
          "start": 0,
          "end": 86,
          "kind": "narration",
          "node": "s03_l300_0",
          "field": "text"
        }
      ],
      "original": "Урок заканчивается. Пока ученики шумно собирают вещи, к Азалии подсаживается Гермиона."
    },
    {
      "line": 301,
      "parts": [],
      "original": ""
    },
    {
      "line": 302,
      "parts": [
        {
          "start": 0,
          "end": 10,
          "kind": "stage",
          "node": "s03_l302_0",
          "field": "annotation"
        },
        {
          "start": 10,
          "end": 154,
          "kind": "dialogue",
          "node": "s03_l302_1",
          "field": "text"
        }
      ],
      "original": "Гермиона: «Нет, ну это просто невозможно! Снейп такой мерзкий! Ты ему ничего не сделала, а он на тебя весь урок смотрел так, будто готов тебя растерзать!»"
    },
    {
      "line": 303,
      "parts": [],
      "original": ""
    },
    {
      "line": 304,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s03_l304_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 44,
          "kind": "dialogue",
          "node": "s03_l304_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ну это же Снейп. Он очень мерзкий»."
    },
    {
      "line": 305,
      "parts": [],
      "original": ""
    },
    {
      "line": 306,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "narration",
          "node": "s03_l306_0",
          "field": "text"
        }
      ],
      "original": "К ним подходят Рон и Гарри."
    },
    {
      "line": 307,
      "parts": [],
      "original": ""
    },
    {
      "line": 308,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s03_l308_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 73,
          "kind": "dialogue",
          "node": "s03_l308_1",
          "field": "text"
        }
      ],
      "original": "Рон: «Вы это тоже видели? Он смотрит так, будто мы все его личные враги»."
    },
    {
      "line": 309,
      "parts": [],
      "original": ""
    },
    {
      "line": 310,
      "parts": [
        {
          "start": 0,
          "end": 33,
          "kind": "stage",
          "node": "s03_l310_0",
          "field": "annotation"
        },
        {
          "start": 33,
          "end": 51,
          "kind": "dialogue",
          "node": "s03_l310_1",
          "field": "text"
        }
      ],
      "original": "Гарри (тихо, с кривой усмешкой): «Ага. Особенно я»."
    },
    {
      "line": 311,
      "parts": [],
      "original": ""
    },
    {
      "line": 312,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s03_l312_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 171,
          "kind": "dialogue",
          "node": "s03_l312_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Не бери в голову, Гарри. Ты же совсем недавно узнал, что ты волшебник. Откуда тебе знать про асфодель? Он это прекрасно понимает. Ему просто нравится издеваться»."
    },
    {
      "line": 313,
      "parts": [],
      "original": ""
    },
    {
      "line": 314,
      "parts": [
        {
          "start": 0,
          "end": 34,
          "kind": "stage",
          "node": "s03_l314_0",
          "field": "annotation"
        },
        {
          "start": 34,
          "end": 54,
          "kind": "dialogue",
          "node": "s03_l314_1",
          "field": "text"
        }
      ],
      "original": "Гарри (удивлённо, с облегчением): «Спасибо. Серьёзно»."
    },
    {
      "line": 315,
      "parts": [],
      "original": ""
    },
    {
      "line": 316,
      "parts": [
        {
          "start": 0,
          "end": 229,
          "kind": "narration",
          "node": "s03_l316_0",
          "field": "text"
        }
      ],
      "original": "Они выходят в коридор, и разговор завязывается сам собой. Они перебивают друг друга, передразнивают Снейпа и смеются, и вскоре уже кажется, что они знакомы целую вечность. Всё идёт хорошо. Пока позади не раздаётся знакомый голос."
    },
    {
      "line": 317,
      "parts": [],
      "original": ""
    },
    {
      "line": 318,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "stage",
          "node": "s03_l318_0",
          "field": "annotation"
        },
        {
          "start": 29,
          "end": 103,
          "kind": "dialogue",
          "node": "s03_l318_1",
          "field": "text"
        }
      ],
      "original": "Малфой (лениво, с ухмылкой): «Ну, я, в принципе, не удивлён. Убожества привлекают ещё больше убожеств»."
    },
    {
      "line": 319,
      "parts": [],
      "original": ""
    },
    {
      "line": 320,
      "parts": [
        {
          "start": 0,
          "end": 145,
          "kind": "narration",
          "node": "s03_l320_0",
          "field": "text"
        }
      ],
      "original": "Все четверо оборачиваются. Малфой стоит, скрестив руки на груди, довольный собой. Но договорить ему не дают: рядом тут же возникают братья Уизли."
    },
    {
      "line": 321,
      "parts": [],
      "original": ""
    },
    {
      "line": 322,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s03_l322_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 41,
          "kind": "dialogue",
          "node": "s03_l322_1",
          "field": "text"
        }
      ],
      "original": "Фред: «Малфой, ты заблудился? Выход там»."
    },
    {
      "line": 323,
      "parts": [],
      "original": ""
    },
    {
      "line": 324,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s03_l324_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 36,
          "kind": "dialogue",
          "node": "s03_l324_1",
          "field": "text"
        }
      ],
      "original": "Джордж: «Для твоей же безопасности»."
    },
    {
      "line": 325,
      "parts": [],
      "original": ""
    },
    {
      "line": 326,
      "parts": [
        {
          "start": 0,
          "end": 65,
          "kind": "narration",
          "node": "s03_l326_0",
          "field": "text"
        }
      ],
      "original": "Малфой не обращает на них внимания и продолжает, глядя на Азалию."
    },
    {
      "line": 327,
      "parts": [],
      "original": ""
    },
    {
      "line": 328,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s03_l328_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 96,
          "kind": "dialogue",
          "node": "s03_l328_1",
          "field": "text"
        }
      ],
      "original": "Малфой: «А ты, Блэк, вообще позор для своей фамилии. Пуффендуй! На твоём месте я бы сменил имя»."
    },
    {
      "line": 329,
      "parts": [],
      "original": ""
    },
    {
      "line": 330,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s03_l330_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 68,
          "kind": "thought",
          "node": "s03_l330_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Тупой, что ли? Хули ты прикопался? Как же он достал»."
    },
    {
      "line": 331,
      "parts": [],
      "original": ""
    },
    {
      "line": 332,
      "parts": [
        {
          "start": 0,
          "end": 70,
          "kind": "narration",
          "node": "s03_l332_0",
          "field": "text"
        }
      ],
      "original": "Рука Азалии потихоньку тянется к карману, где лежит волшебная палочка."
    },
    {
      "line": 333,
      "parts": [],
      "original": ""
    },
    {
      "line": 334,
      "parts": [
        {
          "start": 0,
          "end": 36,
          "kind": "narration",
          "node": "s03_l334_0",
          "field": "text"
        }
      ],
      "original": "И тут между ними вклинивается Пэнси."
    },
    {
      "line": 335,
      "parts": [],
      "original": ""
    },
    {
      "line": 336,
      "parts": [
        {
          "start": 0,
          "end": 33,
          "kind": "stage",
          "node": "s03_l336_0",
          "field": "annotation"
        },
        {
          "start": 33,
          "end": 58,
          "kind": "dialogue",
          "node": "s03_l336_1",
          "field": "text"
        }
      ],
      "original": "Пэнси (поспешно, примирительно): «Ну, ребята, тише, тише!»"
    },
    {
      "line": 337,
      "parts": [],
      "original": ""
    },
    {
      "line": 338,
      "parts": [
        {
          "start": 0,
          "end": 28,
          "kind": "narration",
          "node": "s03_l338_0",
          "field": "text"
        }
      ],
      "original": "Она хватает Малфоя под руку."
    },
    {
      "line": 339,
      "parts": [],
      "original": ""
    },
    {
      "line": 340,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s03_l340_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 71,
          "kind": "dialogue",
          "node": "s03_l340_1",
          "field": "text"
        }
      ],
      "original": "Пэнси: «Вы же знаете, что это Малфой. Отстаньте от него. Пошли, Драко»."
    },
    {
      "line": 341,
      "parts": [],
      "original": ""
    },
    {
      "line": 342,
      "parts": [
        {
          "start": 0,
          "end": 48,
          "kind": "stage",
          "node": "s03_l342_0",
          "field": "annotation"
        },
        {
          "start": 48,
          "end": 102,
          "kind": "dialogue",
          "node": "s03_l342_1",
          "field": "text"
        }
      ],
      "original": "Малфой (оглядываясь на ходу, срываясь на визг): «Я вам ещё наподдам! Слышите?! Я вам всем ещё покажу!»"
    },
    {
      "line": 343,
      "parts": [],
      "original": ""
    },
    {
      "line": 344,
      "parts": [
        {
          "start": 0,
          "end": 124,
          "kind": "narration",
          "node": "s03_l344_0",
          "field": "text"
        }
      ],
      "original": "Смена кадра: конец коридора. Пэнси с Малфоем подходят к Блейзу и Нотту. Малфой сразу начинает жаловаться, размахивая руками."
    },
    {
      "line": 345,
      "parts": [],
      "original": ""
    },
    {
      "line": 346,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s03_l346_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 68,
          "kind": "dialogue",
          "node": "s03_l346_1",
          "field": "text"
        }
      ],
      "original": "Малфой: «Они... Эти... Вы должны с этим разобраться! Вы же старшие!»"
    },
    {
      "line": 347,
      "parts": [],
      "original": ""
    },
    {
      "line": 348,
      "parts": [
        {
          "start": 0,
          "end": 59,
          "kind": "narration",
          "node": "s03_l348_0",
          "field": "text"
        }
      ],
      "original": "Нотт, не меняя выражения лица, отвешивает ему подзатыльник."
    },
    {
      "line": 349,
      "parts": [],
      "original": ""
    },
    {
      "line": 350,
      "parts": [
        {
          "start": 0,
          "end": 23,
          "kind": "stage",
          "node": "s03_l350_0",
          "field": "annotation"
        },
        {
          "start": 23,
          "end": 103,
          "kind": "dialogue",
          "node": "s03_l350_1",
          "field": "text"
        }
      ],
      "original": "Нотт (очень надменно): «Успокойся. Не обращай внимания на подобных людей. Не трать на них своё мнение»."
    },
    {
      "line": 351,
      "parts": [],
      "original": ""
    },
    {
      "line": 352,
      "parts": [
        {
          "start": 0,
          "end": 56,
          "kind": "narration",
          "node": "s03_l352_0",
          "field": "text"
        }
      ],
      "original": "Малфой, потирая затылок, смотрит на Нотта с восхищением."
    },
    {
      "line": 353,
      "parts": [],
      "original": ""
    },
    {
      "line": 354,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s03_l354_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 80,
          "kind": "thought",
          "node": "s03_l354_1",
          "field": "text"
        }
      ],
      "original": "Мысли Малфоя: «Вот это уровень. Ему всё равно, он даже не замечает такой мусор»."
    },
    {
      "line": 355,
      "parts": [],
      "original": ""
    },
    {
      "line": 356,
      "parts": [
        {
          "start": 0,
          "end": 82,
          "kind": "narration",
          "node": "s03_l356_0",
          "field": "text"
        }
      ],
      "original": "Малфой важно кивает. Четвёрка, Пэнси, Блейз, Нотт и Малфой, не спеша уходит прочь."
    },
    {
      "line": 357,
      "parts": [],
      "original": ""
    },
    {
      "line": 358,
      "parts": [
        {
          "start": 0,
          "end": 24,
          "kind": "narration",
          "node": "s03_l358_0",
          "field": "text"
        }
      ],
      "original": "Азалия смотрит им вслед."
    },
    {
      "line": 359,
      "parts": [],
      "original": ""
    },
    {
      "line": 360,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s03_l360_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 20,
          "kind": "dialogue",
          "node": "s03_l360_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ну и цирк»."
    },
    {
      "line": 361,
      "parts": [],
      "original": ""
    },
    {
      "line": 362,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s03_l362_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 46,
          "kind": "dialogue",
          "node": "s03_l362_1",
          "field": "text"
        }
      ],
      "original": "Фред: «Билеты, между прочим, были бесплатные»."
    },
    {
      "line": 363,
      "parts": [],
      "original": ""
    },
    {
      "line": 364,
      "parts": [
        {
          "start": 0,
          "end": 26,
          "kind": "narration",
          "node": "s03_l364_0",
          "field": "text"
        }
      ],
      "original": "Затемнение. Прошла неделя."
    },
    {
      "line": 365,
      "parts": [],
      "original": ""
    },
    {
      "line": 366,
      "parts": [
        {
          "start": 0,
          "end": 168,
          "kind": "narration",
          "node": "s03_l366_0",
          "field": "text"
        }
      ],
      "original": "За эту неделю Азалия, Тео, Гермиона, Гарри, Рон, Фред и Джордж так сильно сдружились, что их теперь сложно представить по отдельности. У них образовалась своя компания."
    },
    {
      "line": 367,
      "parts": [
        {
          "start": 0,
          "end": 107,
          "kind": "stage",
          "node": "s03_l367_0",
          "field": "annotation"
        }
      ],
      "original": "Анимация, коротко, кадр за кадром: они смеются, угорают, сбегают с уроков, гуляют по замку и по территории."
    },
    {
      "line": 368,
      "parts": [],
      "original": ""
    },
    {
      "line": 369,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "metadata",
          "text": "Конец сцены 3."
        }
      ],
      "original": "Конец сцены 3."
    },
    {
      "line": 370,
      "parts": [],
      "original": ""
    }
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "scope": [
    265,
    370
  ]
};

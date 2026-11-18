export default {
  "schemaVersion": 1,
  "id": "scene02",
  "start": "s02_enter",
  "nodes": [
    {
      "id": "s02_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_great_hall",
      "characters": [
        "dumbledore",
        "mcgonagall",
        "theo",
        "azalia"
      ],
      "source": [],
      "next": "s02_l067_0",
      "emotions": {}
    },
    {
      "id": "s02_l067_0",
      "type": "narration",
      "text": "Главный зал. Под зачарованным потолком мерцают звёзды, над столами плывут сотни свечей. Старшекурсники с любопытством разглядывают новичков, которые жмутся друг к другу перед преподавательским столом. Тео крутит головой во все стороны. Азалия смотрит на всё это с лёгкой скукой.",
      "source": [
        {
          "file": "dialogues",
          "line": 67,
          "start": 0,
          "end": 278
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "tilt",
          "amplitude": 2,
          "durationMs": 500
        },
        {
          "target": "azalia",
          "effect": "breathe",
          "durationMs": 2800
        }
      ],
      "next": "s02_l068_0",
      "emotions": {}
    },
    {
      "id": "s02_l068_0",
      "type": "narration",
      "text": "Дамблдор поднимается со своего места. Шум в зале стихает.",
      "source": [
        {
          "file": "dialogues",
          "line": 68,
          "start": 0,
          "end": 57
        }
      ],
      "cues": [
        {
          "target": "dumbledore",
          "effect": "focus"
        },
        {
          "target": "dumbledore",
          "effect": "breathe",
          "durationMs": 2800
        }
      ],
      "next": "s02_l070_0",
      "emotions": {}
    },
    {
      "id": "s02_l070_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дамблдор (тепло, с лёгкой улыбкой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 70,
          "start": 0,
          "end": 36
        }
      ],
      "cues": [
        {
          "target": "dumbledore",
          "effect": "focus"
        },
        {
          "target": "dumbledore",
          "effect": "tilt",
          "amplitude": 1.5,
          "durationMs": 500
        }
      ],
      "next": "s02_l070_1",
      "emotions": {}
    },
    {
      "id": "s02_l070_1",
      "type": "dialogue",
      "speaker": "dumbledore",
      "text": "«Добро пожаловать в Хогвартс! Сегодня вы переступили порог не просто школы. Здесь вы найдёте знания, друзей и, надеюсь, второй дом. Ваш факультет станет вашей семьёй: за успехи он будет получать очки, за проступки терять их, так что подумайте дважды, прежде чем нарушать правила. А теперь, пока мы не приступили к ужину, пусть профессор Макгонагалл начнёт церемонию».",
      "source": [
        {
          "file": "dialogues",
          "line": 70,
          "start": 36,
          "end": 403
        }
      ],
      "next": "s02_l072_0",
      "emotions": {}
    },
    {
      "id": "s02_l072_0",
      "type": "narration",
      "text": "Макгонагалл выходит вперёд, неся в руках потрёпанную остроконечную шляпу. Ставит перед собой стул и кладёт на него шляпу.",
      "source": [
        {
          "file": "dialogues",
          "line": 72,
          "start": 0,
          "end": 121
        }
      ],
      "cues": [
        {
          "target": "dumbledore",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 500
        },
        {
          "target": "sorting_hat",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 550,
          "delayMs": 120
        },
        {
          "target": "mcgonagall",
          "effect": "focus",
          "delayMs": 150
        }
      ],
      "next": "s02_l074_0",
      "emotions": {}
    },
    {
      "id": "s02_l074_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл (строго, чётко): ",
      "source": [
        {
          "file": "dialogues",
          "line": 74,
          "start": 0,
          "end": 29
        }
      ],
      "cues": [
        {
          "target": "mcgonagall",
          "effect": "focus"
        }
      ],
      "next": "s02_l074_1",
      "emotions": {}
    },
    {
      "id": "s02_l074_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Сейчас я буду называть ваши имена. Тот, кого я назову, подходит сюда и садится на стул, а я надеваю ему на голову эту шляпу. Она определит, на каком факультете вы будете учиться. Прошу соблюдать тишину».",
      "source": [
        {
          "file": "dialogues",
          "line": 74,
          "start": 29,
          "end": 233
        }
      ],
      "next": "s02_l076_0",
      "emotions": {}
    },
    {
      "id": "s02_l076_0",
      "type": "narration",
      "text": "Первые ребята по одному садятся на стул, шляпа выкрикивает названия факультетов, столы аплодируют. Азалия откровенно скучает и негромко переговаривается с Тео, который комментирует всё подряд.",
      "source": [
        {
          "file": "dialogues",
          "line": 76,
          "start": 0,
          "end": 192
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 6,
          "durationMs": 520
        },
        {
          "target": "theo",
          "effect": "focus",
          "delayMs": 300
        }
      ],
      "next": "s02_l078_0",
      "emotions": {}
    },
    {
      "id": "s02_l078_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (шёпотом): ",
      "source": [
        {
          "file": "dialogues",
          "line": 78,
          "start": 0,
          "end": 15
        }
      ],
      "next": "s02_l078_1",
      "emotions": {
        "azalia": "bored"
      }
    },
    {
      "id": "s02_l078_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Эту шляпу надо не на головы надевать, а в химчистку сдавать. Она же старше нашего дома».",
      "source": [
        {
          "file": "dialogues",
          "line": 78,
          "start": 15,
          "end": 104
        }
      ],
      "next": "s02_l080_0",
      "emotions": {
        "azalia": "bored"
      }
    },
    {
      "id": "s02_l080_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (шёпотом, не отрывая взгляда от потолка): ",
      "source": [
        {
          "file": "dialogues",
          "line": 80,
          "start": 0,
          "end": 49
        }
      ],
      "next": "s02_l080_1",
      "emotions": {
        "azalia": "bored"
      }
    },
    {
      "id": "s02_l080_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Тео, помолчи хотя бы минуту».",
      "source": [
        {
          "file": "dialogues",
          "line": 80,
          "start": 49,
          "end": 79
        }
      ],
      "next": "s02_l082_0",
      "emotions": {
        "azalia": "bored"
      }
    },
    {
      "id": "s02_l082_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 82,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s02_l082_1",
      "emotions": {
        "azalia": "bored"
      }
    },
    {
      "id": "s02_l082_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Физически невозможно. Это вредно для здоровья».",
      "source": [
        {
          "file": "dialogues",
          "line": 82,
          "start": 5,
          "end": 53
        }
      ],
      "next": "s02_l084_0",
      "emotions": {
        "azalia": "bored"
      }
    },
    {
      "id": "s02_l084_0",
      "type": "narration",
      "text": "Но вот Макгонагалл называет имена, которые Азалия узнаёт. Она вдруг выпрямляется и начинает слушать внимательнее.",
      "source": [
        {
          "file": "dialogues",
          "line": 84,
          "start": 0,
          "end": 113
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        },
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 6,
          "durationMs": 480
        }
      ],
      "next": "s02_l086_0",
      "emotions": {}
    },
    {
      "id": "s02_l086_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 86,
          "start": 0,
          "end": 15
        }
      ],
      "next": "s02_l086_1",
      "emotions": {}
    },
    {
      "id": "s02_l086_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Тео. Тише».",
      "source": [
        {
          "file": "dialogues",
          "line": 86,
          "start": 15,
          "end": 27
        }
      ],
      "next": "s02_l088_0",
      "emotions": {}
    },
    {
      "id": "s02_l088_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (прижимая ладонь к груди, с театральной обидой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 88,
          "start": 0,
          "end": 53
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
          "amplitude": 2.2,
          "durationMs": 500
        }
      ],
      "next": "s02_l088_1",
      "emotions": {
        "theo": "pout"
      }
    },
    {
      "id": "s02_l088_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Ну и пожалуйста. Не слушай меня. Слушай там каких-то ноунеймов вместо своего самого лучшего, самого крутого брата».",
      "source": [
        {
          "file": "dialogues",
          "line": 88,
          "start": 53,
          "end": 169
        }
      ],
      "next": "s02_l090_0",
      "emotions": {
        "theo": "pout"
      }
    },
    {
      "id": "s02_l090_0",
      "type": "narration",
      "text": "Азалия его уже не слышит. Она внимательно ловит каждое имя и каждый факультет.",
      "source": [
        {
          "file": "dialogues",
          "line": 90,
          "start": 0,
          "end": 78
        }
      ],
      "next": "s02_l093_0",
      "emotions": {}
    },
    {
      "id": "s02_l093_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 93,
          "start": 0,
          "end": 13
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 450
        }
      ],
      "next": "s02_l093_1",
      "emotions": {}
    },
    {
      "id": "s02_l093_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Драко Малфой».",
      "source": [
        {
          "file": "dialogues",
          "line": 93,
          "start": 13,
          "end": 28
        }
      ],
      "next": "s02_l095_0",
      "emotions": {}
    },
    {
      "id": "s02_l095_0",
      "type": "narration",
      "text": "Малфой выходит и садится на стул. Шляпа едва касается его волос.",
      "source": [
        {
          "file": "dialogues",
          "line": 95,
          "start": 0,
          "end": 64
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 500
        },
        {
          "target": "malfoy",
          "effect": "focus",
          "delayMs": 120
        },
        {
          "target": "sorting_hat",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 450,
          "delayMs": 260
        }
      ],
      "next": "s02_l097_0",
      "emotions": {}
    },
    {
      "id": "s02_l097_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа: ",
      "source": [
        {
          "file": "dialogues",
          "line": 97,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l097_1",
      "emotions": {}
    },
    {
      "id": "s02_l097_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«СЛИЗЕРИН!»",
      "source": [
        {
          "file": "dialogues",
          "line": 97,
          "start": 7,
          "end": 18
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s02_l099_0",
      "emotions": {}
    },
    {
      "id": "s02_l099_0",
      "type": "narration",
      "text": "Стол Слизерина аплодирует. Малфой с самодовольной ухмылкой идёт к своим.",
      "source": [
        {
          "file": "dialogues",
          "line": 99,
          "start": 0,
          "end": 72
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 480
        }
      ],
      "next": "s02_l101_0",
      "emotions": {}
    },
    {
      "id": "s02_l101_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 101,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s02_l101_1",
      "emotions": {}
    },
    {
      "id": "s02_l101_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Гермиона Грейнджер».",
      "source": [
        {
          "file": "dialogues",
          "line": 101,
          "start": 13,
          "end": 34
        }
      ],
      "next": "s02_l103_0",
      "emotions": {}
    },
    {
      "id": "s02_l103_0",
      "type": "narration",
      "text": "Гермиона быстро подходит к стулу и садится. Шляпа надета.",
      "source": [
        {
          "file": "dialogues",
          "line": 103,
          "start": 0,
          "end": 57
        }
      ],
      "cues": [
        {
          "target": "hermione",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480
        },
        {
          "target": "hermione",
          "effect": "focus",
          "delayMs": 120
        }
      ],
      "next": "s02_l105_0",
      "emotions": {}
    },
    {
      "id": "s02_l105_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа: ",
      "source": [
        {
          "file": "dialogues",
          "line": 105,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l105_1",
      "emotions": {}
    },
    {
      "id": "s02_l105_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«ГРИФФИНДОР!»",
      "source": [
        {
          "file": "dialogues",
          "line": 105,
          "start": 7,
          "end": 20
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s02_l107_0",
      "emotions": {}
    },
    {
      "id": "s02_l107_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 107,
          "start": 0,
          "end": 13
        }
      ],
      "cues": [
        {
          "target": "hermione",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 420
        }
      ],
      "next": "s02_l107_1",
      "emotions": {}
    },
    {
      "id": "s02_l107_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Рон Уизли».",
      "source": [
        {
          "file": "dialogues",
          "line": 107,
          "start": 13,
          "end": 25
        }
      ],
      "next": "s02_l108_0",
      "emotions": {}
    },
    {
      "id": "s02_l108_0",
      "type": "narration",
      "text": "Рон на стуле. Шляпа надета.",
      "source": [
        {
          "file": "dialogues",
          "line": 108,
          "start": 0,
          "end": 27
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
          "target": "ron",
          "effect": "focus",
          "delayMs": 120
        }
      ],
      "next": "s02_l110_0",
      "emotions": {}
    },
    {
      "id": "s02_l110_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа: ",
      "source": [
        {
          "file": "dialogues",
          "line": 110,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l110_1",
      "emotions": {}
    },
    {
      "id": "s02_l110_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«ГРИФФИНДОР!»",
      "source": [
        {
          "file": "dialogues",
          "line": 110,
          "start": 7,
          "end": 20
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s02_l112_0",
      "emotions": {}
    },
    {
      "id": "s02_l112_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 112,
          "start": 0,
          "end": 13
        }
      ],
      "cues": [
        {
          "target": "ron",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 420
        }
      ],
      "next": "s02_l112_1",
      "emotions": {}
    },
    {
      "id": "s02_l112_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Гарри Поттер».",
      "source": [
        {
          "file": "dialogues",
          "line": 112,
          "start": 13,
          "end": 28
        }
      ],
      "next": "s02_l113_0",
      "emotions": {}
    },
    {
      "id": "s02_l113_0",
      "type": "narration",
      "text": "Зал наполняется шёпотом. Головы поворачиваются, все ждут. Гарри идёт к стулу под перекрёстными взглядами.",
      "source": [
        {
          "file": "dialogues",
          "line": 113,
          "start": 0,
          "end": 105
        }
      ],
      "cues": [
        {
          "target": "harry",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 520
        },
        {
          "target": "harry",
          "effect": "focus",
          "delayMs": 150
        }
      ],
      "next": "s02_l115_0",
      "emotions": {}
    },
    {
      "id": "s02_l115_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 115,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l115_1",
      "emotions": {
        "azalia": "sad"
      }
    },
    {
      "id": "s02_l115_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«О... Гарри».",
      "source": [
        {
          "file": "dialogues",
          "line": 115,
          "start": 14,
          "end": 27
        }
      ],
      "next": "s02_l117_0",
      "emotions": {
        "azalia": "sad"
      }
    },
    {
      "id": "s02_l117_0",
      "type": "narration",
      "text": "В глазах Азалии на секунду мелькает горечь.",
      "source": [
        {
          "file": "dialogues",
          "line": 117,
          "start": 0,
          "end": 43
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
      "next": "s02_l119_0",
      "emotions": {}
    },
    {
      "id": "s02_l119_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 119,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l119_1",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s02_l119_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Дядя Сириус... как же жалко, что он не может быть дядей этого парня, так бы у него было нормальное детство и мы бы с ним даже подружились. Надо кстати как нибудь поболтать с ним может быть найдем что общее и станем друзьями».",
      "source": [
        {
          "file": "dialogues",
          "line": 119,
          "start": 14,
          "end": 240
        }
      ],
      "next": "s02_l121_0",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s02_l121_0",
      "type": "narration",
      "text": "Шляпу надевают на Гарри. Секунда. Две. Десять. Шляпа непривычно долго молчит, словно спорит сама с собой. Зал затаил дыхание. И вдруг:",
      "source": [
        {
          "file": "dialogues",
          "line": 121,
          "start": 0,
          "end": 134
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "focus"
        },
        {
          "target": "sorting_hat",
          "effect": "tilt",
          "amplitude": 2.5,
          "durationMs": 550
        },
        {
          "effect": "camera",
          "to": 1.03,
          "durationMs": 900
        }
      ],
      "next": "s02_l123_0",
      "emotions": {}
    },
    {
      "id": "s02_l123_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа: ",
      "source": [
        {
          "file": "dialogues",
          "line": 123,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l123_1",
      "emotions": {}
    },
    {
      "id": "s02_l123_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«ГРИФФИНДОР!!!»",
      "source": [
        {
          "file": "dialogues",
          "line": 123,
          "start": 7,
          "end": 22
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 10,
          "durationMs": 560
        },
        {
          "effect": "shake",
          "amplitude": 3,
          "durationMs": 450
        }
      ],
      "next": "s02_l125_0",
      "emotions": {}
    },
    {
      "id": "s02_l125_0",
      "type": "narration",
      "text": "Зал взрывается аплодисментами. Громче всех кричат близнецы Уизли за столом Гриффиндора, размахивая руками: им достался сам Поттер.",
      "source": [
        {
          "file": "dialogues",
          "line": 125,
          "start": 0,
          "end": 130
        }
      ],
      "cues": [
        {
          "effect": "camera",
          "to": 1,
          "durationMs": 600
        },
        {
          "target": "harry",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 450
        },
        {
          "target": "twins",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 480,
          "delayMs": 100
        },
        {
          "target": "twins",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 560,
          "delayMs": 160
        }
      ],
      "next": "s02_l127_0",
      "emotions": {}
    },
    {
      "id": "s02_l127_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 127,
          "start": 0,
          "end": 13
        }
      ],
      "cues": [
        {
          "target": "twins",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 420
        }
      ],
      "next": "s02_l127_1",
      "emotions": {}
    },
    {
      "id": "s02_l127_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Роуз..».",
      "source": [
        {
          "file": "dialogues",
          "line": 127,
          "start": 13,
          "end": 22
        }
      ],
      "next": "s02_l129_0",
      "emotions": {}
    },
    {
      "id": "s02_l129_0",
      "type": "narration",
      "text": "Не успев договорить Роуз уже сидела на стуле. Шляпа надета.",
      "source": [
        {
          "file": "dialogues",
          "line": 129,
          "start": 0,
          "end": 59
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 450
        },
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        }
      ],
      "next": "s02_l130_0",
      "emotions": {}
    },
    {
      "id": "s02_l130_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа: ",
      "source": [
        {
          "file": "dialogues",
          "line": 130,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l130_1",
      "emotions": {}
    },
    {
      "id": "s02_l130_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«ПУФФЕНДУЙ!!»",
      "source": [
        {
          "file": "dialogues",
          "line": 130,
          "start": 7,
          "end": 20
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s02_l132_0",
      "emotions": {}
    },
    {
      "id": "s02_l132_0",
      "type": "narration",
      "text": "Стол Пуффендуя тепло аплодирует.",
      "source": [
        {
          "file": "dialogues",
          "line": 132,
          "start": 0,
          "end": 32
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 450
        }
      ],
      "next": "s02_l134_0",
      "emotions": {}
    },
    {
      "id": "s02_l134_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 134,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s02_l134_1",
      "emotions": {}
    },
    {
      "id": "s02_l134_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Дмитрий Де Нестер».",
      "source": [
        {
          "file": "dialogues",
          "line": 134,
          "start": 13,
          "end": 33
        }
      ],
      "next": "s02_l136_0",
      "emotions": {}
    },
    {
      "id": "s02_l136_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 136,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l136_1",
      "emotions": {}
    },
    {
      "id": "s02_l136_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Де Нестер? Он что, француз?»",
      "source": [
        {
          "file": "dialogues",
          "line": 136,
          "start": 14,
          "end": 43
        }
      ],
      "next": "s02_l138_0",
      "emotions": {}
    },
    {
      "id": "s02_l138_0",
      "type": "narration",
      "text": "На стуле уже сидит высокий парень со светлыми волосами. Шляпу надевают ему на голову, но она почему-то молчит. Азалия окидывает его взглядом.",
      "source": [
        {
          "file": "dialogues",
          "line": 138,
          "start": 0,
          "end": 141
        }
      ],
      "cues": [
        {
          "target": "mcgonagall",
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
          "durationMs": 520,
          "delayMs": 80
        },
        {
          "target": "theo",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 520,
          "delayMs": 120
        },
        {
          "target": "dima",
          "effect": "focus",
          "delayMs": 200
        }
      ],
      "next": "s02_l140_0",
      "emotions": {}
    },
    {
      "id": "s02_l140_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (слишком громко, сама того не заметив): ",
      "source": [
        {
          "file": "dialogues",
          "line": 140,
          "start": 0,
          "end": 47
        }
      ],
      "next": "s02_l140_1",
      "emotions": {}
    },
    {
      "id": "s02_l140_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Нихуя он не француз. Пиздабол».",
      "source": [
        {
          "file": "dialogues",
          "line": 140,
          "start": 47,
          "end": 79
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 480
        }
      ],
      "next": "s02_l142_0",
      "emotions": {}
    },
    {
      "id": "s02_l142_0",
      "type": "narration",
      "text": "Тео медленно поворачивает голову и смотрит на сестру настороженно, как на человека, который вот-вот сорвётся.",
      "source": [
        {
          "file": "dialogues",
          "line": 142,
          "start": 0,
          "end": 109
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
      "next": "s02_l144_0",
      "emotions": {
        "theo": "suspicious"
      }
    },
    {
      "id": "s02_l144_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 144,
          "start": 0,
          "end": 11
        }
      ],
      "next": "s02_l144_1",
      "emotions": {
        "theo": "suspicious"
      }
    },
    {
      "id": "s02_l144_1",
      "type": "thought",
      "speaker": "theo",
      "text": "«Я, конечно, знал, что ей не нравится подолгу находиться в толпе незнакомцев, но это уже страшно. Крепись дорогая моя сестра...».",
      "source": [
        {
          "file": "dialogues",
          "line": 144,
          "start": 11,
          "end": 140
        }
      ],
      "next": "s02_l146_0",
      "emotions": {
        "theo": "suspicious"
      }
    },
    {
      "id": "s02_l146_0",
      "type": "narration",
      "text": "Взгляд Тео смягчается. Теперь он смотрит на Азалию с лаской и заботой, почти с жалостью.",
      "source": [
        {
          "file": "dialogues",
          "line": 146,
          "start": 0,
          "end": 88
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
          "amplitude": 2,
          "durationMs": 500
        }
      ],
      "next": "s02_l148_0",
      "emotions": {
        "theo": "care"
      }
    },
    {
      "id": "s02_l148_0",
      "type": "narration",
      "text": "Азалия замечает этот взгляд. Смотрит на брата как на полного дебила и отворачивается.",
      "source": [
        {
          "file": "dialogues",
          "line": 148,
          "start": 0,
          "end": 85
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
      "next": "s02_l150_0",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s02_l150_0",
      "type": "narration",
      "text": "Тео, поняв, что его осудили, вспоминает, как сестра велела ему помолчать, и демонстративно отворачивается в другую сторону, задрав подбородок.",
      "source": [
        {
          "file": "dialogues",
          "line": 150,
          "start": 0,
          "end": 142
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
          "amplitude": 2.5,
          "durationMs": 500
        }
      ],
      "next": "s02_l152_0",
      "emotions": {}
    },
    {
      "id": "s02_l152_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (вполголоса, с достоинством):",
      "source": [
        {
          "file": "dialogues",
          "line": 152,
          "start": 0,
          "end": 33
        }
      ],
      "next": "s02_l152_1",
      "emotions": {
        "theo": "pout"
      }
    },
    {
      "id": "s02_l152_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "ну и иди ты.",
      "source": [
        {
          "file": "dialogues",
          "line": 152,
          "start": 33,
          "end": 45
        }
      ],
      "next": "s02_l154_0",
      "emotions": {
        "theo": "pout"
      }
    },
    {
      "id": "s02_l154_0",
      "type": "narration",
      "text": "Азалия снова переводит взгляд на «фальшивого француза» и теперь разглядывает его внимательнее: светлые волосы, голубые глаза, высокий рост,.",
      "source": [
        {
          "file": "dialogues",
          "line": 154,
          "start": 0,
          "end": 140
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        }
      ],
      "next": "s02_l156_0",
      "emotions": {}
    },
    {
      "id": "s02_l156_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 156,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l156_1",
      "emotions": {}
    },
    {
      "id": "s02_l156_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Ну как, как у тебя может быть французская фамилия? Не понимаю. Ладно, плевать».",
      "source": [
        {
          "file": "dialogues",
          "line": 156,
          "start": 14,
          "end": 94
        }
      ],
      "next": "s02_l158_0",
      "emotions": {}
    },
    {
      "id": "s02_l158_0",
      "type": "narration",
      "text": "И тут она замечает, что он смотрит прямо на неё. Пристально, не отрываясь.",
      "source": [
        {
          "file": "dialogues",
          "line": 158,
          "start": 0,
          "end": 74
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "effect": "camera",
          "to": 1.04,
          "durationMs": 900
        },
        {
          "effect": "glow",
          "to": 0.2,
          "durationMs": 900
        }
      ],
      "next": "s02_l160_0",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s02_l160_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа: ",
      "source": [
        {
          "file": "dialogues",
          "line": 160,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l160_1",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s02_l160_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«КОГТЕВРАН!!!»",
      "source": [
        {
          "file": "dialogues",
          "line": 160,
          "start": 7,
          "end": 21
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 10,
          "durationMs": 560
        }
      ],
      "next": "s02_l162_0",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s02_l162_0",
      "type": "narration",
      "text": "Стол Когтеврана аплодирует. Но Дима не двигается. Он так и сидит со шляпой на голове и смотрит на Азалию, словно завис.",
      "source": [
        {
          "file": "dialogues",
          "line": 162,
          "start": 0,
          "end": 119
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        }
      ],
      "next": "s02_l164_0",
      "emotions": {
        "dima": "love"
      }
    },
    {
      "id": "s02_l164_0",
      "type": "narration",
      "text": "Азалия бросает на него взгляд, в котором ясно читается каждое слово.",
      "source": [
        {
          "file": "dialogues",
          "line": 164,
          "start": 0,
          "end": 68
        }
      ],
      "next": "s02_l166_0",
      "emotions": {}
    },
    {
      "id": "s02_l166_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 166,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l166_1",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s02_l166_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Хули вылупился?!»",
      "source": [
        {
          "file": "dialogues",
          "line": 166,
          "start": 14,
          "end": 32
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
      "next": "s02_l168_0",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s02_l168_0",
      "type": "narration",
      "text": "Дима вздрагивает, будто очнувшись, мгновенно вскакивает и торопливо идёт к столу Когтеврана. Садится рядом с другими когтевранцами.",
      "source": [
        {
          "file": "dialogues",
          "line": 168,
          "start": 0,
          "end": 131
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 480
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 500,
          "delayMs": 220
        },
        {
          "target": "mcgonagall",
          "effect": "fade",
          "to": 1,
          "side": "left",
          "durationMs": 500,
          "delayMs": 300
        },
        {
          "effect": "camera",
          "to": 1,
          "durationMs": 700
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 700
        }
      ],
      "next": "s02_l170_0",
      "emotions": {}
    },
    {
      "id": "s02_l170_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 170,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s02_l170_1",
      "emotions": {}
    },
    {
      "id": "s02_l170_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Тео Блэк.»",
      "source": [
        {
          "file": "dialogues",
          "line": 170,
          "start": 13,
          "end": 24
        }
      ],
      "next": "s02_l172_0",
      "emotions": {}
    },
    {
      "id": "s02_l172_0",
      "type": "narration",
      "text": "По залу прокатывается шёпот. Все знают: все Блэки, кроме одного, сидящего в Азкабане, учились в Слизерине. Значит, и этот пойдёт туда же. Тео шагает к стулу очень гордо, расправив плечи, и садится. Шляпа опускается на его голову.",
      "source": [
        {
          "file": "dialogues",
          "line": 172,
          "start": 0,
          "end": 229
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
          "durationMs": 520
        },
        {
          "effect": "group",
          "targets": [
            "sorting_hat",
            "theo"
          ],
          "durationMs": 600
        }
      ],
      "next": "s02_l174_0",
      "emotions": {}
    },
    {
      "id": "s02_l174_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа: ",
      "source": [
        {
          "file": "dialogues",
          "line": 174,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l174_1",
      "emotions": {
        "theo": "laugh"
      }
    },
    {
      "id": "s02_l174_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«ПУФФЕНДУЙ!!!»",
      "source": [
        {
          "file": "dialogues",
          "line": 174,
          "start": 7,
          "end": 21
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 10,
          "durationMs": 560
        },
        {
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s02_l176_0",
      "emotions": {
        "theo": "laugh"
      }
    },
    {
      "id": "s02_l176_0",
      "type": "narration",
      "text": "В зале повисает тишина. Секунда, и она взрывается ропотом.",
      "source": [
        {
          "file": "dialogues",
          "line": 176,
          "start": 0,
          "end": 58
        }
      ],
      "next": "s02_l178_0",
      "emotions": {}
    },
    {
      "id": "s02_l178_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шёпот в зале: ",
      "source": [
        {
          "file": "dialogues",
          "line": 178,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l178_1",
      "emotions": {}
    },
    {
      "id": "s02_l178_1",
      "type": "dialogue",
      "speaker": "crowd",
      "text": "«Пуффендуй?.. Блэк в Пуффендуе? Как так?..»",
      "source": [
        {
          "file": "dialogues",
          "line": 178,
          "start": 14,
          "end": 57
        }
      ],
      "next": "s02_l180_0",
      "emotions": {}
    },
    {
      "id": "s02_l180_0",
      "type": "narration",
      "text": "Тео смотрит на ошарашенные лица и от него идет небольшой смешок.",
      "source": [
        {
          "file": "dialogues",
          "line": 180,
          "start": 0,
          "end": 64
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
      "next": "s02_l181_0",
      "emotions": {
        "theo": "laugh"
      }
    },
    {
      "id": "s02_l181_0",
      "type": "narration",
      "text": "Он всё ещё смеётся, идя к столу Пуффендуя.",
      "source": [
        {
          "file": "dialogues",
          "line": 181,
          "start": 0,
          "end": 42
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 550
        }
      ],
      "next": "s02_l183_0",
      "emotions": {
        "theo": "laugh"
      }
    },
    {
      "id": "s02_l183_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Макгонагалл: ",
      "source": [
        {
          "file": "dialogues",
          "line": 183,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s02_l183_1",
      "emotions": {}
    },
    {
      "id": "s02_l183_1",
      "type": "dialogue",
      "speaker": "mcgonagall",
      "text": "«Азалия Блэк».",
      "source": [
        {
          "file": "dialogues",
          "line": 183,
          "start": 13,
          "end": 27
        }
      ],
      "next": "s02_l185_0",
      "emotions": {}
    },
    {
      "id": "s02_l185_0",
      "type": "narration",
      "text": "Азалия выходит к стулу. Она ловит те же взгляды, что и брат: любопытные, настороженные, оценивающие. Но один из них отличается от всех. Дима. Он смотрит на неё совсем иначе, будто любуется и не может отвести глаз. Этот взгляд она чувствует намного сильнее остальных.",
      "source": [
        {
          "file": "dialogues",
          "line": 185,
          "start": 0,
          "end": 266
        }
      ],
      "cues": [
        {
          "target": "mcgonagall",
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
          "durationMs": 520,
          "delayMs": 100
        },
        {
          "target": "dima",
          "effect": "focus",
          "delayMs": 220
        },
        {
          "effect": "glow",
          "to": 0.22,
          "durationMs": 900
        }
      ],
      "next": "s02_l187_0",
      "emotions": {
        "dima": "love",
        "azalia": "resolve"
      }
    },
    {
      "id": "s02_l187_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 187,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l187_1",
      "emotions": {
        "azalia": "shy"
      }
    },
    {
      "id": "s02_l187_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Он смотрит так, будто... Почему?..»",
      "source": [
        {
          "file": "dialogues",
          "line": 187,
          "start": 14,
          "end": 50
        }
      ],
      "next": "s02_l189_0",
      "emotions": {
        "azalia": "shy"
      }
    },
    {
      "id": "s02_l189_0",
      "type": "narration",
      "text": "Азалию с головы до ног пробирает дрожь.",
      "source": [
        {
          "file": "dialogues",
          "line": 189,
          "start": 0,
          "end": 39
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        },
        {
          "target": "azalia",
          "effect": "shake",
          "amplitude": 3,
          "durationMs": 450
        }
      ],
      "next": "s02_l191_0",
      "emotions": {}
    },
    {
      "id": "s02_l191_0",
      "type": "narration",
      "text": "Она садится на стул. Шляпа опускается на голову, шум зала глохнет. Азалия ждёт приговора, но вместо этого слышит шёпот у самого уха.",
      "source": [
        {
          "file": "dialogues",
          "line": 191,
          "start": 0,
          "end": 132
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "sorting_hat",
            "azalia"
          ],
          "durationMs": 600
        },
        {
          "effect": "camera",
          "to": 1.05,
          "durationMs": 900
        }
      ],
      "next": "s02_l193_0",
      "emotions": {}
    },
    {
      "id": "s02_l193_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа (шёпотом, только для неё): ",
      "source": [
        {
          "file": "dialogues",
          "line": 193,
          "start": 0,
          "end": 33
        }
      ],
      "next": "s02_l193_1",
      "emotions": {}
    },
    {
      "id": "s02_l193_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«А ведь у того голубоглазого парня были мысли только о тебе...»",
      "source": [
        {
          "file": "dialogues",
          "line": 193,
          "start": 33,
          "end": 96
        }
      ],
      "next": "s02_l195_0",
      "emotions": {}
    },
    {
      "id": "s02_l195_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 195,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l195_1",
      "emotions": {
        "azalia": "shock"
      }
    },
    {
      "id": "s02_l195_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Что?.. А.. Э ЧЕГ...?!»",
      "source": [
        {
          "file": "dialogues",
          "line": 195,
          "start": 14,
          "end": 37
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
      "next": "s02_l197_0",
      "emotions": {
        "azalia": "shock"
      }
    },
    {
      "id": "s02_l197_0",
      "type": "narration",
      "text": "Она не успевает спросить.",
      "source": [
        {
          "file": "dialogues",
          "line": 197,
          "start": 0,
          "end": 25
        }
      ],
      "next": "s02_l199_0",
      "emotions": {}
    },
    {
      "id": "s02_l199_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шляпа (во весь голос): ",
      "source": [
        {
          "file": "dialogues",
          "line": 199,
          "start": 0,
          "end": 23
        }
      ],
      "next": "s02_l199_1",
      "emotions": {
        "azalia": "shock"
      }
    },
    {
      "id": "s02_l199_1",
      "type": "dialogue",
      "speaker": "sorting_hat",
      "text": "«ПУФФЕНДУЙ!!»",
      "source": [
        {
          "file": "dialogues",
          "line": 199,
          "start": 23,
          "end": 36
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "bounce",
          "amplitude": 10,
          "durationMs": 560
        },
        {
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        }
      ],
      "next": "s02_l201_0",
      "emotions": {
        "azalia": "shock"
      }
    },
    {
      "id": "s02_l201_0",
      "type": "narration",
      "text": "Зал взрывается. Теперь шок никто не скрывает.",
      "source": [
        {
          "file": "dialogues",
          "line": 201,
          "start": 0,
          "end": 45
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 600
        },
        {
          "effect": "camera",
          "to": 1,
          "durationMs": 700
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 700
        }
      ],
      "next": "s02_l203_0",
      "emotions": {}
    },
    {
      "id": "s02_l203_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Шёпот в зале: ",
      "source": [
        {
          "file": "dialogues",
          "line": 203,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l203_1",
      "emotions": {}
    },
    {
      "id": "s02_l203_1",
      "type": "dialogue",
      "speaker": "crowd",
      "text": "«Ещё один?! Уже третий Блэк, который не в Слизерине!..»",
      "source": [
        {
          "file": "dialogues",
          "line": 203,
          "start": 14,
          "end": 69
        }
      ],
      "next": "s02_l205_0",
      "emotions": {}
    },
    {
      "id": "s02_l205_0",
      "type": "narration",
      "text": "Азалия, в полном недоумении, медленно идёт к столу Пуффендуя и садится на свободное место. Несколько секунд смотрит в пустую тарелку.",
      "source": [
        {
          "file": "dialogues",
          "line": 205,
          "start": 0,
          "end": 133
        }
      ],
      "cues": [
        {
          "target": "sorting_hat",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 450
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 450
        },
        {
          "target": "azalia",
          "effect": "focus",
          "delayMs": 150
        }
      ],
      "next": "s02_l207_0",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s02_l207_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 207,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l207_1",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s02_l207_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Мысли только о тебе... Но почему?..»",
      "source": [
        {
          "file": "dialogues",
          "line": 207,
          "start": 14,
          "end": 51
        }
      ],
      "next": "s02_l209_0",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s02_l209_0",
      "type": "narration",
      "text": "К ней подсаживается Тео и заглядывает в лицо.",
      "source": [
        {
          "file": "dialogues",
          "line": 209,
          "start": 0,
          "end": 45
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
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s02_l211_0",
      "emotions": {
        "theo": "care"
      }
    },
    {
      "id": "s02_l211_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 211,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s02_l211_1",
      "emotions": {
        "theo": "care"
      }
    },
    {
      "id": "s02_l211_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Эй, ты в порядке? Просто ты так задумчиво сидишь».",
      "source": [
        {
          "file": "dialogues",
          "line": 211,
          "start": 5,
          "end": 56
        }
      ],
      "next": "s02_l213_0",
      "emotions": {
        "theo": "care"
      }
    },
    {
      "id": "s02_l213_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 213,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s02_l213_1",
      "emotions": {}
    },
    {
      "id": "s02_l213_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Всё хорошо...».",
      "source": [
        {
          "file": "dialogues",
          "line": 213,
          "start": 8,
          "end": 24
        }
      ],
      "next": "s02_l215_0",
      "emotions": {}
    },
    {
      "id": "s02_l215_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 215,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l215_1",
      "emotions": {}
    },
    {
      "id": "s02_l215_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Показалось. Конечно, показалось. В голове роились мысли, пока я шла к этому стулу, вот и послышалось. Не бывает такого. Забудь».",
      "source": [
        {
          "file": "dialogues",
          "line": 215,
          "start": 14,
          "end": 143
        }
      ],
      "next": "s02_l216_0",
      "emotions": {}
    },
    {
      "id": "s02_l216_0",
      "type": "narration",
      "text": "Затемнение. Церемония и ужин закончились, и факультеты расходятся по своим комнатам.",
      "source": [
        {
          "file": "dialogues",
          "line": 216,
          "start": 0,
          "end": 84
        }
      ],
      "next": "s02_enter_dorm",
      "emotions": {}
    },
    {
      "id": "s02_enter_dorm",
      "type": "scene",
      "action": "enter",
      "background": "bg_hufflepuff_dorm",
      "characters": [
        "azalia"
      ],
      "source": [],
      "next": "s02_l219_0",
      "emotions": {}
    },
    {
      "id": "s02_l219_0",
      "type": "narration",
      "text": "Спальня Пуффендуя. Азалия расстилает постель. Круглое окошко, тёплый свет, мягкие жёлто-чёрные одеяла.",
      "source": [
        {
          "file": "dialogues",
          "line": 219,
          "start": 0,
          "end": 102
        }
      ],
      "next": "s02_l221_0",
      "emotions": {}
    },
    {
      "id": "s02_l221_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 221,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s02_l221_1",
      "emotions": {}
    },
    {
      "id": "s02_l221_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Интересно, что сейчас творится в голове у Тео. Он весь вечер улыбался, будто так и задумано. Надо спуститься и спросить, что он вообще чувствует».",
      "source": [
        {
          "file": "dialogues",
          "line": 221,
          "start": 14,
          "end": 161
        }
      ],
      "next": "s02_enter_common",
      "emotions": {}
    },
    {
      "id": "s02_enter_common",
      "type": "scene",
      "action": "enter",
      "background": "bg_hufflepuff_common",
      "characters": [
        "theo",
        "cedric",
        "azalia"
      ],
      "source": [],
      "next": "s02_l223_0",
      "emotions": {}
    },
    {
      "id": "s02_l223_0",
      "type": "narration",
      "text": "Она спускается в гостиную: круглая комната с низким потолком, горшки с растениями на подоконниках, потрескивает камин. Тео оживлённо разговаривает с высоким парнем с тёмными волосами. Азалия замирает на последней ступеньке: она узнаёт этот смех.",
      "source": [
        {
          "file": "dialogues",
          "line": 223,
          "start": 0,
          "end": 245
        }
      ],
      "cues": [
        {
          "target": "cedric",
          "effect": "focus"
        }
      ],
      "next": "s02_l225_0",
      "emotions": {}
    },
    {
      "id": "s02_l225_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 225,
          "start": 0,
          "end": 15
        }
      ],
      "next": "s02_l225_1",
      "emotions": {}
    },
    {
      "id": "s02_l225_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Седрик?..»",
      "source": [
        {
          "file": "dialogues",
          "line": 225,
          "start": 15,
          "end": 26
        }
      ],
      "next": "s02_l227_0",
      "emotions": {}
    },
    {
      "id": "s02_l227_0",
      "type": "narration",
      "text": "Лучший друг детства, с которым они столько играли. Азалия срывается с места.",
      "source": [
        {
          "file": "dialogues",
          "line": 227,
          "start": 0,
          "end": 76
        }
      ],
      "cues": [
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
      "next": "s02_l229_0",
      "emotions": {}
    },
    {
      "id": "s02_l229_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 229,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s02_l229_1",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      },
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l229_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«СЕДРИК!»",
      "source": [
        {
          "file": "dialogues",
          "line": 229,
          "start": 8,
          "end": 17
        }
      ],
      "next": "s02_l231_0",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      },
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l231_0",
      "type": "narration",
      "text": "Седрик оборачивается и не успевает ничего сказать: Азалия налетает на него и обнимает изо всех сил. Он смеётся и обнимает её в ответ.",
      "source": [
        {
          "file": "dialogues",
          "line": 231,
          "start": 0,
          "end": 133
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "cedric",
            "azalia"
          ],
          "durationMs": 600
        },
        {
          "target": "cedric",
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
          "to": 0.22,
          "durationMs": 900
        }
      ],
      "next": "s02_l233_0",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      },
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l233_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Седрик: ",
      "source": [
        {
          "file": "dialogues",
          "line": 233,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s02_l233_1",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      },
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l233_1",
      "type": "dialogue",
      "speaker": "cedric",
      "text": "«Азалия! Я так и знал, что это ты! Слышал, вы с Тео устроили сегодня настоящий переполох».",
      "source": [
        {
          "file": "dialogues",
          "line": 233,
          "start": 8,
          "end": 98
        }
      ],
      "next": "s02_l235_0",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      },
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l235_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (с притворной обидой): ",
      "source": [
        {
          "file": "dialogues",
          "line": 235,
          "start": 0,
          "end": 27
        }
      ],
      "next": "s02_l235_1",
      "emotions": {
        "theo": "pout"
      },
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l235_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«А меня обнять не хочешь? Я, между прочим, тоже тут стою».",
      "source": [
        {
          "file": "dialogues",
          "line": 235,
          "start": 27,
          "end": 85
        }
      ],
      "next": "s02_l237_0",
      "emotions": {
        "theo": "pout"
      },
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l237_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (не выпуская Седрика): ",
      "source": [
        {
          "file": "dialogues",
          "line": 237,
          "start": 0,
          "end": 30
        }
      ],
      "next": "s02_l237_1",
      "emotions": {},
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l237_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Тебя я вижу каждый день. Ты мне уже надоел».",
      "source": [
        {
          "file": "dialogues",
          "line": 237,
          "start": 30,
          "end": 75
        }
      ],
      "next": "s02_l239_0",
      "emotions": {},
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l239_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Седрик (смеясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 239,
          "start": 0,
          "end": 17
        }
      ],
      "cues": [
        {
          "target": "cedric",
          "effect": "bounce",
          "amplitude": 6,
          "durationMs": 500
        }
      ],
      "next": "s02_l239_1",
      "emotions": {},
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l239_1",
      "type": "dialogue",
      "speaker": "cedric",
      "text": "«Два Блэка в Пуффендуе. Замок будет обсуждать это до самого Рождества. Но знаете, по-моему, вам тут самое место».",
      "source": [
        {
          "file": "dialogues",
          "line": 239,
          "start": 17,
          "end": 130
        }
      ],
      "next": "s02_l241_0",
      "emotions": {},
      "pose": "pose_cedric_hug"
    },
    {
      "id": "s02_l241_0",
      "type": "narration",
      "text": "Азалия отстраняется и улыбается ему.",
      "source": [
        {
          "file": "dialogues",
          "line": 241,
          "start": 0,
          "end": 36
        }
      ],
      "cues": [
        {
          "target": "cedric",
          "effect": "tilt",
          "amplitude": 0,
          "hold": true,
          "durationMs": 500
        },
        {
          "target": "azalia",
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
          "durationMs": 700
        },
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 700
        }
      ],
      "next": "s02_l243_0",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      }
    },
    {
      "id": "s02_l243_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 243,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s02_l243_1",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      }
    },
    {
      "id": "s02_l243_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Сто лет не виделись. Как ты? Как дела?»",
      "source": [
        {
          "file": "dialogues",
          "line": 243,
          "start": 8,
          "end": 48
        }
      ],
      "next": "s02_l245_0",
      "emotions": {
        "azalia": "smile",
        "cedric": "laugh"
      }
    },
    {
      "id": "s02_l245_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Седрик: ",
      "source": [
        {
          "file": "dialogues",
          "line": 245,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s02_l245_1",
      "emotions": {}
    },
    {
      "id": "s02_l245_1",
      "type": "dialogue",
      "speaker": "cedric",
      "text": "«Всё хорошо. Правда хорошо. Учёба, друзья... Не жалуюсь. Ты лучше про себя расскажи!»",
      "source": [
        {
          "file": "dialogues",
          "line": 245,
          "start": 8,
          "end": 93
        }
      ],
      "next": "s02_l247_0",
      "emotions": {}
    },
    {
      "id": "s02_l247_0",
      "type": "narration",
      "text": "Они ещё какое-то время болтают: о доме, о старых играх, о том, кто как изменился. Азалия видит, что у Седрика и правда всё хорошо, и на душе становится легче. Наконец она зевает.",
      "source": [
        {
          "file": "dialogues",
          "line": 247,
          "start": 0,
          "end": 178
        }
      ],
      "next": "s02_l249_0",
      "emotions": {}
    },
    {
      "id": "s02_l249_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 249,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s02_l249_1",
      "emotions": {}
    },
    {
      "id": "s02_l249_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Всё, я иду спать. Завтра первый день, не хочу выглядеть как зомби. Спокойной ночи, Седрик. Спокойной ночи, ээ…  как тебя там... Ну ты короче понял».",
      "source": [
        {
          "file": "dialogues",
          "line": 249,
          "start": 8,
          "end": 157
        }
      ],
      "next": "s02_l251_0",
      "emotions": {}
    },
    {
      "id": "s02_l251_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 251,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s02_l251_1",
      "emotions": {
        "theo": "pout"
      }
    },
    {
      "id": "s02_l251_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Э обидно вообще-то».",
      "source": [
        {
          "file": "dialogues",
          "line": 251,
          "start": 5,
          "end": 26
        }
      ],
      "next": "s02_l253_0",
      "emotions": {
        "theo": "pout"
      }
    },
    {
      "id": "s02_l253_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия:",
      "source": [
        {
          "file": "dialogues",
          "line": 253,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s02_l253_1",
      "emotions": {
        "azalia": "smile"
      }
    },
    {
      "id": "s02_l253_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Хахаха, ну прости, спокойной ночи, Тео».",
      "source": [
        {
          "file": "dialogues",
          "line": 253,
          "start": 7,
          "end": 48
        }
      ],
      "next": "s02_l255_0",
      "emotions": {
        "azalia": "smile"
      }
    },
    {
      "id": "s02_l255_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: ",
      "source": [
        {
          "file": "dialogues",
          "line": 255,
          "start": 0,
          "end": 5
        }
      ],
      "next": "s02_l255_1",
      "emotions": {}
    },
    {
      "id": "s02_l255_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Вот теперь я доволен, спокойной ночи, Азалия».",
      "source": [
        {
          "file": "dialogues",
          "line": 255,
          "start": 5,
          "end": 52
        }
      ],
      "next": "s02_l257_0",
      "emotions": {}
    },
    {
      "id": "s02_l257_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Седрик: ",
      "source": [
        {
          "file": "dialogues",
          "line": 257,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s02_l257_1",
      "emotions": {}
    },
    {
      "id": "s02_l257_1",
      "type": "dialogue",
      "speaker": "cedric",
      "text": "«Спокойной ночи, Азалия»",
      "source": [
        {
          "file": "dialogues",
          "line": 257,
          "start": 8,
          "end": 32
        }
      ],
      "next": "s02_l259_0",
      "emotions": {}
    },
    {
      "id": "s02_l259_0",
      "type": "narration",
      "text": "Азалия поднимается по лестнице. Затемнение.",
      "source": [
        {
          "file": "dialogues",
          "line": 259,
          "start": 0,
          "end": 43
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "fade",
          "to": 0,
          "side": "right",
          "durationMs": 550
        }
      ],
      "next": "s02_enter_dorm_night",
      "emotions": {}
    },
    {
      "id": "s02_enter_dorm_night",
      "type": "scene",
      "action": "enter",
      "background": "bg_hufflepuff_dorm",
      "characters": [
        "azalia"
      ],
      "source": [],
      "next": "s02_l261_0",
      "emotions": {}
    },
    {
      "id": "s02_l261_0",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Анимация: Азалия спит в своей постели, волосы разметались по подушке. За круглым окном проплывает луна, звёзды гаснут одна за другой. Небо светлеет, ночь сменяется утром. Первый луч солнца ложится ей на лицо.",
      "source": [
        {
          "file": "dialogues",
          "line": 261,
          "start": 0,
          "end": 208
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        },
        {
          "target": "azalia",
          "effect": "breathe",
          "durationMs": 2800
        },
        {
          "effect": "glow",
          "to": 0.28,
          "durationMs": 1200
        }
      ],
      "next": "s02_cs02",
      "emotions": {}
    },
    {
      "id": "s02_cs02",
      "type": "cutscene",
      "cutsceneId": "cs02_sleep",
      "source": [],
      "next": "s02_enter_dorm_morning",
      "emotions": {}
    },
    {
      "id": "s02_enter_dorm_morning",
      "type": "scene",
      "action": "enter",
      "background": "bg_hufflepuff_dorm_morning",
      "characters": [
        "azalia"
      ],
      "source": [],
      "cues": [
        {
          "effect": "glow",
          "to": 0.26,
          "durationMs": 800
        }
      ],
      "next": "s02_end",
      "emotions": {}
    },
    {
      "id": "s02_end",
      "type": "end",
      "nextScene": "scene03",
      "source": [],
      "next": null,
      "emotions": {}
    }
  ],
  "sourceLedger": [
    {
      "line": 61,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "metadata",
          "text": "2 СЦЕНА:"
        }
      ],
      "original": "2 СЦЕНА:"
    },
    {
      "line": 62,
      "parts": [
        {
          "start": 0,
          "end": 91,
          "kind": "metadata",
          "text": "кто участвует: Макгонагалл, Дамблдор, Азалия, Дима, Малфой, Роуз, Тео, Гарри, Гермиона, Рон"
        }
      ],
      "original": "кто участвует: Макгонагалл, Дамблдор, Азалия, Дима, Малфой, Роуз, Тео, Гарри, Гермиона, Рон"
    },
    {
      "line": 63,
      "parts": [],
      "original": ""
    },
    {
      "line": 64,
      "parts": [
        {
          "start": 0,
          "end": 57,
          "kind": "metadata",
          "text": "Где: Главный зал Хогвартса → гостиная и спальня Пуффендуя"
        }
      ],
      "original": "Где: Главный зал Хогвартса → гостиная и спальня Пуффендуя"
    },
    {
      "line": 65,
      "parts": [],
      "original": ""
    },
    {
      "line": 66,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "metadata",
          "text": "Речь Дамблдора:"
        }
      ],
      "original": "Речь Дамблдора:"
    },
    {
      "line": 67,
      "parts": [
        {
          "start": 0,
          "end": 278,
          "kind": "narration",
          "node": "s02_l067_0",
          "field": "text"
        }
      ],
      "original": "Главный зал. Под зачарованным потолком мерцают звёзды, над столами плывут сотни свечей. Старшекурсники с любопытством разглядывают новичков, которые жмутся друг к другу перед преподавательским столом. Тео крутит головой во все стороны. Азалия смотрит на всё это с лёгкой скукой."
    },
    {
      "line": 68,
      "parts": [
        {
          "start": 0,
          "end": 57,
          "kind": "narration",
          "node": "s02_l068_0",
          "field": "text"
        }
      ],
      "original": "Дамблдор поднимается со своего места. Шум в зале стихает."
    },
    {
      "line": 69,
      "parts": [],
      "original": ""
    },
    {
      "line": 70,
      "parts": [
        {
          "start": 0,
          "end": 36,
          "kind": "stage",
          "node": "s02_l070_0",
          "field": "annotation"
        },
        {
          "start": 36,
          "end": 403,
          "kind": "dialogue",
          "node": "s02_l070_1",
          "field": "text"
        }
      ],
      "original": "Дамблдор (тепло, с лёгкой улыбкой): «Добро пожаловать в Хогвартс! Сегодня вы переступили порог не просто школы. Здесь вы найдёте знания, друзей и, надеюсь, второй дом. Ваш факультет станет вашей семьёй: за успехи он будет получать очки, за проступки терять их, так что подумайте дважды, прежде чем нарушать правила. А теперь, пока мы не приступили к ужину, пусть профессор Макгонагалл начнёт церемонию»."
    },
    {
      "line": 71,
      "parts": [],
      "original": ""
    },
    {
      "line": 72,
      "parts": [
        {
          "start": 0,
          "end": 121,
          "kind": "narration",
          "node": "s02_l072_0",
          "field": "text"
        }
      ],
      "original": "Макгонагалл выходит вперёд, неся в руках потрёпанную остроконечную шляпу. Ставит перед собой стул и кладёт на него шляпу."
    },
    {
      "line": 73,
      "parts": [],
      "original": ""
    },
    {
      "line": 74,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "stage",
          "node": "s02_l074_0",
          "field": "annotation"
        },
        {
          "start": 29,
          "end": 233,
          "kind": "dialogue",
          "node": "s02_l074_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл (строго, чётко): «Сейчас я буду называть ваши имена. Тот, кого я назову, подходит сюда и садится на стул, а я надеваю ему на голову эту шляпу. Она определит, на каком факультете вы будете учиться. Прошу соблюдать тишину»."
    },
    {
      "line": 75,
      "parts": [],
      "original": ""
    },
    {
      "line": 76,
      "parts": [
        {
          "start": 0,
          "end": 192,
          "kind": "narration",
          "node": "s02_l076_0",
          "field": "text"
        }
      ],
      "original": "Первые ребята по одному садятся на стул, шляпа выкрикивает названия факультетов, столы аплодируют. Азалия откровенно скучает и негромко переговаривается с Тео, который комментирует всё подряд."
    },
    {
      "line": 77,
      "parts": [],
      "original": ""
    },
    {
      "line": 78,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "stage",
          "node": "s02_l078_0",
          "field": "annotation"
        },
        {
          "start": 15,
          "end": 104,
          "kind": "dialogue",
          "node": "s02_l078_1",
          "field": "text"
        }
      ],
      "original": "Тео (шёпотом): «Эту шляпу надо не на головы надевать, а в химчистку сдавать. Она же старше нашего дома»."
    },
    {
      "line": 79,
      "parts": [],
      "original": ""
    },
    {
      "line": 80,
      "parts": [
        {
          "start": 0,
          "end": 49,
          "kind": "stage",
          "node": "s02_l080_0",
          "field": "annotation"
        },
        {
          "start": 49,
          "end": 79,
          "kind": "dialogue",
          "node": "s02_l080_1",
          "field": "text"
        }
      ],
      "original": "Азалия (шёпотом, не отрывая взгляда от потолка): «Тео, помолчи хотя бы минуту»."
    },
    {
      "line": 81,
      "parts": [],
      "original": ""
    },
    {
      "line": 82,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s02_l082_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 53,
          "kind": "dialogue",
          "node": "s02_l082_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Физически невозможно. Это вредно для здоровья»."
    },
    {
      "line": 83,
      "parts": [],
      "original": ""
    },
    {
      "line": 84,
      "parts": [
        {
          "start": 0,
          "end": 113,
          "kind": "narration",
          "node": "s02_l084_0",
          "field": "text"
        }
      ],
      "original": "Но вот Макгонагалл называет имена, которые Азалия узнаёт. Она вдруг выпрямляется и начинает слушать внимательнее."
    },
    {
      "line": 85,
      "parts": [],
      "original": ""
    },
    {
      "line": 86,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "stage",
          "node": "s02_l086_0",
          "field": "annotation"
        },
        {
          "start": 15,
          "end": 27,
          "kind": "dialogue",
          "node": "s02_l086_1",
          "field": "text"
        }
      ],
      "original": "Азалия (тихо): «Тео. Тише»."
    },
    {
      "line": 87,
      "parts": [],
      "original": ""
    },
    {
      "line": 88,
      "parts": [
        {
          "start": 0,
          "end": 53,
          "kind": "stage",
          "node": "s02_l088_0",
          "field": "annotation"
        },
        {
          "start": 53,
          "end": 169,
          "kind": "dialogue",
          "node": "s02_l088_1",
          "field": "text"
        }
      ],
      "original": "Тео (прижимая ладонь к груди, с театральной обидой): «Ну и пожалуйста. Не слушай меня. Слушай там каких-то ноунеймов вместо своего самого лучшего, самого крутого брата»."
    },
    {
      "line": 89,
      "parts": [],
      "original": ""
    },
    {
      "line": 90,
      "parts": [
        {
          "start": 0,
          "end": 78,
          "kind": "narration",
          "node": "s02_l090_0",
          "field": "text"
        }
      ],
      "original": "Азалия его уже не слышит. Она внимательно ловит каждое имя и каждый факультет."
    },
    {
      "line": 91,
      "parts": [],
      "original": ""
    },
    {
      "line": 92,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "metadata",
          "text": "Распределение"
        }
      ],
      "original": "Распределение"
    },
    {
      "line": 93,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l093_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 28,
          "kind": "dialogue",
          "node": "s02_l093_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Драко Малфой»."
    },
    {
      "line": 94,
      "parts": [],
      "original": ""
    },
    {
      "line": 95,
      "parts": [
        {
          "start": 0,
          "end": 64,
          "kind": "narration",
          "node": "s02_l095_0",
          "field": "text"
        }
      ],
      "original": "Малфой выходит и садится на стул. Шляпа едва касается его волос."
    },
    {
      "line": 96,
      "parts": [],
      "original": ""
    },
    {
      "line": 97,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l097_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 18,
          "kind": "dialogue",
          "node": "s02_l097_1",
          "field": "text"
        }
      ],
      "original": "Шляпа: «СЛИЗЕРИН!»"
    },
    {
      "line": 98,
      "parts": [],
      "original": ""
    },
    {
      "line": 99,
      "parts": [
        {
          "start": 0,
          "end": 72,
          "kind": "narration",
          "node": "s02_l099_0",
          "field": "text"
        }
      ],
      "original": "Стол Слизерина аплодирует. Малфой с самодовольной ухмылкой идёт к своим."
    },
    {
      "line": 100,
      "parts": [],
      "original": ""
    },
    {
      "line": 101,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l101_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 34,
          "kind": "dialogue",
          "node": "s02_l101_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Гермиона Грейнджер»."
    },
    {
      "line": 102,
      "parts": [],
      "original": ""
    },
    {
      "line": 103,
      "parts": [
        {
          "start": 0,
          "end": 57,
          "kind": "narration",
          "node": "s02_l103_0",
          "field": "text"
        }
      ],
      "original": "Гермиона быстро подходит к стулу и садится. Шляпа надета."
    },
    {
      "line": 104,
      "parts": [],
      "original": ""
    },
    {
      "line": 105,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l105_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 20,
          "kind": "dialogue",
          "node": "s02_l105_1",
          "field": "text"
        }
      ],
      "original": "Шляпа: «ГРИФФИНДОР!»"
    },
    {
      "line": 106,
      "parts": [],
      "original": ""
    },
    {
      "line": 107,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l107_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 25,
          "kind": "dialogue",
          "node": "s02_l107_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Рон Уизли»."
    },
    {
      "line": 108,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "narration",
          "node": "s02_l108_0",
          "field": "text"
        }
      ],
      "original": "Рон на стуле. Шляпа надета."
    },
    {
      "line": 109,
      "parts": [],
      "original": ""
    },
    {
      "line": 110,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l110_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 20,
          "kind": "dialogue",
          "node": "s02_l110_1",
          "field": "text"
        }
      ],
      "original": "Шляпа: «ГРИФФИНДОР!»"
    },
    {
      "line": 111,
      "parts": [],
      "original": ""
    },
    {
      "line": 112,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l112_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 28,
          "kind": "dialogue",
          "node": "s02_l112_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Гарри Поттер»."
    },
    {
      "line": 113,
      "parts": [
        {
          "start": 0,
          "end": 105,
          "kind": "narration",
          "node": "s02_l113_0",
          "field": "text"
        }
      ],
      "original": "Зал наполняется шёпотом. Головы поворачиваются, все ждут. Гарри идёт к стулу под перекрёстными взглядами."
    },
    {
      "line": 114,
      "parts": [],
      "original": ""
    },
    {
      "line": 115,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l115_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 27,
          "kind": "thought",
          "node": "s02_l115_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «О... Гарри»."
    },
    {
      "line": 116,
      "parts": [],
      "original": ""
    },
    {
      "line": 117,
      "parts": [
        {
          "start": 0,
          "end": 43,
          "kind": "narration",
          "node": "s02_l117_0",
          "field": "text"
        }
      ],
      "original": "В глазах Азалии на секунду мелькает горечь."
    },
    {
      "line": 118,
      "parts": [],
      "original": ""
    },
    {
      "line": 119,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l119_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 240,
          "kind": "thought",
          "node": "s02_l119_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Дядя Сириус... как же жалко, что он не может быть дядей этого парня, так бы у него было нормальное детство и мы бы с ним даже подружились. Надо кстати как нибудь поболтать с ним может быть найдем что общее и станем друзьями»."
    },
    {
      "line": 120,
      "parts": [],
      "original": ""
    },
    {
      "line": 121,
      "parts": [
        {
          "start": 0,
          "end": 134,
          "kind": "narration",
          "node": "s02_l121_0",
          "field": "text"
        }
      ],
      "original": "Шляпу надевают на Гарри. Секунда. Две. Десять. Шляпа непривычно долго молчит, словно спорит сама с собой. Зал затаил дыхание. И вдруг:"
    },
    {
      "line": 122,
      "parts": [],
      "original": ""
    },
    {
      "line": 123,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l123_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 22,
          "kind": "dialogue",
          "node": "s02_l123_1",
          "field": "text"
        }
      ],
      "original": "Шляпа: «ГРИФФИНДОР!!!»"
    },
    {
      "line": 124,
      "parts": [],
      "original": ""
    },
    {
      "line": 125,
      "parts": [
        {
          "start": 0,
          "end": 130,
          "kind": "narration",
          "node": "s02_l125_0",
          "field": "text"
        }
      ],
      "original": "Зал взрывается аплодисментами. Громче всех кричат близнецы Уизли за столом Гриффиндора, размахивая руками: им достался сам Поттер."
    },
    {
      "line": 126,
      "parts": [],
      "original": ""
    },
    {
      "line": 127,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l127_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 22,
          "kind": "dialogue",
          "node": "s02_l127_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Роуз..»."
    },
    {
      "line": 128,
      "parts": [],
      "original": ""
    },
    {
      "line": 129,
      "parts": [
        {
          "start": 0,
          "end": 59,
          "kind": "narration",
          "node": "s02_l129_0",
          "field": "text"
        }
      ],
      "original": "Не успев договорить Роуз уже сидела на стуле. Шляпа надета."
    },
    {
      "line": 130,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l130_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 20,
          "kind": "dialogue",
          "node": "s02_l130_1",
          "field": "text"
        }
      ],
      "original": "Шляпа: «ПУФФЕНДУЙ!!»"
    },
    {
      "line": 131,
      "parts": [],
      "original": ""
    },
    {
      "line": 132,
      "parts": [
        {
          "start": 0,
          "end": 32,
          "kind": "narration",
          "node": "s02_l132_0",
          "field": "text"
        }
      ],
      "original": "Стол Пуффендуя тепло аплодирует."
    },
    {
      "line": 133,
      "parts": [],
      "original": ""
    },
    {
      "line": 134,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l134_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 33,
          "kind": "dialogue",
          "node": "s02_l134_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Дмитрий Де Нестер»."
    },
    {
      "line": 135,
      "parts": [],
      "original": ""
    },
    {
      "line": 136,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l136_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 43,
          "kind": "thought",
          "node": "s02_l136_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Де Нестер? Он что, француз?»"
    },
    {
      "line": 137,
      "parts": [],
      "original": ""
    },
    {
      "line": 138,
      "parts": [
        {
          "start": 0,
          "end": 141,
          "kind": "narration",
          "node": "s02_l138_0",
          "field": "text"
        }
      ],
      "original": "На стуле уже сидит высокий парень со светлыми волосами. Шляпу надевают ему на голову, но она почему-то молчит. Азалия окидывает его взглядом."
    },
    {
      "line": 139,
      "parts": [],
      "original": ""
    },
    {
      "line": 140,
      "parts": [
        {
          "start": 0,
          "end": 47,
          "kind": "stage",
          "node": "s02_l140_0",
          "field": "annotation"
        },
        {
          "start": 47,
          "end": 79,
          "kind": "dialogue",
          "node": "s02_l140_1",
          "field": "text"
        }
      ],
      "original": "Азалия (слишком громко, сама того не заметив): «Нихуя он не француз. Пиздабол»."
    },
    {
      "line": 141,
      "parts": [],
      "original": ""
    },
    {
      "line": 142,
      "parts": [
        {
          "start": 0,
          "end": 109,
          "kind": "narration",
          "node": "s02_l142_0",
          "field": "text"
        }
      ],
      "original": "Тео медленно поворачивает голову и смотрит на сестру настороженно, как на человека, который вот-вот сорвётся."
    },
    {
      "line": 143,
      "parts": [],
      "original": ""
    },
    {
      "line": 144,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "stage",
          "node": "s02_l144_0",
          "field": "annotation"
        },
        {
          "start": 11,
          "end": 140,
          "kind": "thought",
          "node": "s02_l144_1",
          "field": "text"
        }
      ],
      "original": "Мысли Тео: «Я, конечно, знал, что ей не нравится подолгу находиться в толпе незнакомцев, но это уже страшно. Крепись дорогая моя сестра...»."
    },
    {
      "line": 145,
      "parts": [],
      "original": ""
    },
    {
      "line": 146,
      "parts": [
        {
          "start": 0,
          "end": 88,
          "kind": "narration",
          "node": "s02_l146_0",
          "field": "text"
        }
      ],
      "original": "Взгляд Тео смягчается. Теперь он смотрит на Азалию с лаской и заботой, почти с жалостью."
    },
    {
      "line": 147,
      "parts": [],
      "original": ""
    },
    {
      "line": 148,
      "parts": [
        {
          "start": 0,
          "end": 85,
          "kind": "narration",
          "node": "s02_l148_0",
          "field": "text"
        }
      ],
      "original": "Азалия замечает этот взгляд. Смотрит на брата как на полного дебила и отворачивается."
    },
    {
      "line": 149,
      "parts": [],
      "original": ""
    },
    {
      "line": 150,
      "parts": [
        {
          "start": 0,
          "end": 142,
          "kind": "narration",
          "node": "s02_l150_0",
          "field": "text"
        }
      ],
      "original": "Тео, поняв, что его осудили, вспоминает, как сестра велела ему помолчать, и демонстративно отворачивается в другую сторону, задрав подбородок."
    },
    {
      "line": 151,
      "parts": [],
      "original": ""
    },
    {
      "line": 152,
      "parts": [
        {
          "start": 0,
          "end": 33,
          "kind": "stage",
          "node": "s02_l152_0",
          "field": "annotation"
        },
        {
          "start": 33,
          "end": 45,
          "kind": "dialogue",
          "node": "s02_l152_1",
          "field": "text"
        }
      ],
      "original": "Тео (вполголоса, с достоинством):ну и иди ты."
    },
    {
      "line": 153,
      "parts": [],
      "original": ""
    },
    {
      "line": 154,
      "parts": [
        {
          "start": 0,
          "end": 140,
          "kind": "narration",
          "node": "s02_l154_0",
          "field": "text"
        }
      ],
      "original": "Азалия снова переводит взгляд на «фальшивого француза» и теперь разглядывает его внимательнее: светлые волосы, голубые глаза, высокий рост,."
    },
    {
      "line": 155,
      "parts": [],
      "original": ""
    },
    {
      "line": 156,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l156_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 94,
          "kind": "thought",
          "node": "s02_l156_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Ну как, как у тебя может быть французская фамилия? Не понимаю. Ладно, плевать»."
    },
    {
      "line": 157,
      "parts": [],
      "original": ""
    },
    {
      "line": 158,
      "parts": [
        {
          "start": 0,
          "end": 74,
          "kind": "narration",
          "node": "s02_l158_0",
          "field": "text"
        }
      ],
      "original": "И тут она замечает, что он смотрит прямо на неё. Пристально, не отрываясь."
    },
    {
      "line": 159,
      "parts": [],
      "original": ""
    },
    {
      "line": 160,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l160_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 21,
          "kind": "dialogue",
          "node": "s02_l160_1",
          "field": "text"
        }
      ],
      "original": "Шляпа: «КОГТЕВРАН!!!»"
    },
    {
      "line": 161,
      "parts": [],
      "original": ""
    },
    {
      "line": 162,
      "parts": [
        {
          "start": 0,
          "end": 119,
          "kind": "narration",
          "node": "s02_l162_0",
          "field": "text"
        }
      ],
      "original": "Стол Когтеврана аплодирует. Но Дима не двигается. Он так и сидит со шляпой на голове и смотрит на Азалию, словно завис."
    },
    {
      "line": 163,
      "parts": [],
      "original": ""
    },
    {
      "line": 164,
      "parts": [
        {
          "start": 0,
          "end": 68,
          "kind": "narration",
          "node": "s02_l164_0",
          "field": "text"
        }
      ],
      "original": "Азалия бросает на него взгляд, в котором ясно читается каждое слово."
    },
    {
      "line": 165,
      "parts": [],
      "original": ""
    },
    {
      "line": 166,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l166_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 32,
          "kind": "thought",
          "node": "s02_l166_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Хули вылупился?!»"
    },
    {
      "line": 167,
      "parts": [],
      "original": ""
    },
    {
      "line": 168,
      "parts": [
        {
          "start": 0,
          "end": 131,
          "kind": "narration",
          "node": "s02_l168_0",
          "field": "text"
        }
      ],
      "original": "Дима вздрагивает, будто очнувшись, мгновенно вскакивает и торопливо идёт к столу Когтеврана. Садится рядом с другими когтевранцами."
    },
    {
      "line": 169,
      "parts": [],
      "original": ""
    },
    {
      "line": 170,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l170_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 24,
          "kind": "dialogue",
          "node": "s02_l170_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Тео Блэк.»"
    },
    {
      "line": 171,
      "parts": [],
      "original": ""
    },
    {
      "line": 172,
      "parts": [
        {
          "start": 0,
          "end": 229,
          "kind": "narration",
          "node": "s02_l172_0",
          "field": "text"
        }
      ],
      "original": "По залу прокатывается шёпот. Все знают: все Блэки, кроме одного, сидящего в Азкабане, учились в Слизерине. Значит, и этот пойдёт туда же. Тео шагает к стулу очень гордо, расправив плечи, и садится. Шляпа опускается на его голову."
    },
    {
      "line": 173,
      "parts": [],
      "original": ""
    },
    {
      "line": 174,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l174_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 21,
          "kind": "dialogue",
          "node": "s02_l174_1",
          "field": "text"
        }
      ],
      "original": "Шляпа: «ПУФФЕНДУЙ!!!»"
    },
    {
      "line": 175,
      "parts": [],
      "original": ""
    },
    {
      "line": 176,
      "parts": [
        {
          "start": 0,
          "end": 58,
          "kind": "narration",
          "node": "s02_l176_0",
          "field": "text"
        }
      ],
      "original": "В зале повисает тишина. Секунда, и она взрывается ропотом."
    },
    {
      "line": 177,
      "parts": [],
      "original": ""
    },
    {
      "line": 178,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l178_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 57,
          "kind": "dialogue",
          "node": "s02_l178_1",
          "field": "text"
        }
      ],
      "original": "Шёпот в зале: «Пуффендуй?.. Блэк в Пуффендуе? Как так?..»"
    },
    {
      "line": 179,
      "parts": [],
      "original": ""
    },
    {
      "line": 180,
      "parts": [
        {
          "start": 0,
          "end": 64,
          "kind": "narration",
          "node": "s02_l180_0",
          "field": "text"
        }
      ],
      "original": "Тео смотрит на ошарашенные лица и от него идет небольшой смешок."
    },
    {
      "line": 181,
      "parts": [
        {
          "start": 0,
          "end": 42,
          "kind": "narration",
          "node": "s02_l181_0",
          "field": "text"
        }
      ],
      "original": "Он всё ещё смеётся, идя к столу Пуффендуя."
    },
    {
      "line": 182,
      "parts": [],
      "original": ""
    },
    {
      "line": 183,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "stage",
          "node": "s02_l183_0",
          "field": "annotation"
        },
        {
          "start": 13,
          "end": 27,
          "kind": "dialogue",
          "node": "s02_l183_1",
          "field": "text"
        }
      ],
      "original": "Макгонагалл: «Азалия Блэк»."
    },
    {
      "line": 184,
      "parts": [],
      "original": ""
    },
    {
      "line": 185,
      "parts": [
        {
          "start": 0,
          "end": 266,
          "kind": "narration",
          "node": "s02_l185_0",
          "field": "text"
        }
      ],
      "original": "Азалия выходит к стулу. Она ловит те же взгляды, что и брат: любопытные, настороженные, оценивающие. Но один из них отличается от всех. Дима. Он смотрит на неё совсем иначе, будто любуется и не может отвести глаз. Этот взгляд она чувствует намного сильнее остальных."
    },
    {
      "line": 186,
      "parts": [],
      "original": ""
    },
    {
      "line": 187,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l187_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 50,
          "kind": "thought",
          "node": "s02_l187_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Он смотрит так, будто... Почему?..»"
    },
    {
      "line": 188,
      "parts": [],
      "original": ""
    },
    {
      "line": 189,
      "parts": [
        {
          "start": 0,
          "end": 39,
          "kind": "narration",
          "node": "s02_l189_0",
          "field": "text"
        }
      ],
      "original": "Азалию с головы до ног пробирает дрожь."
    },
    {
      "line": 190,
      "parts": [],
      "original": ""
    },
    {
      "line": 191,
      "parts": [
        {
          "start": 0,
          "end": 132,
          "kind": "narration",
          "node": "s02_l191_0",
          "field": "text"
        }
      ],
      "original": "Она садится на стул. Шляпа опускается на голову, шум зала глохнет. Азалия ждёт приговора, но вместо этого слышит шёпот у самого уха."
    },
    {
      "line": 192,
      "parts": [],
      "original": ""
    },
    {
      "line": 193,
      "parts": [
        {
          "start": 0,
          "end": 33,
          "kind": "stage",
          "node": "s02_l193_0",
          "field": "annotation"
        },
        {
          "start": 33,
          "end": 96,
          "kind": "dialogue",
          "node": "s02_l193_1",
          "field": "text"
        }
      ],
      "original": "Шляпа (шёпотом, только для неё): «А ведь у того голубоглазого парня были мысли только о тебе...»"
    },
    {
      "line": 194,
      "parts": [],
      "original": ""
    },
    {
      "line": 195,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l195_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 37,
          "kind": "thought",
          "node": "s02_l195_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Что?.. А.. Э ЧЕГ...?!»"
    },
    {
      "line": 196,
      "parts": [],
      "original": ""
    },
    {
      "line": 197,
      "parts": [
        {
          "start": 0,
          "end": 25,
          "kind": "narration",
          "node": "s02_l197_0",
          "field": "text"
        }
      ],
      "original": "Она не успевает спросить."
    },
    {
      "line": 198,
      "parts": [],
      "original": ""
    },
    {
      "line": 199,
      "parts": [
        {
          "start": 0,
          "end": 23,
          "kind": "stage",
          "node": "s02_l199_0",
          "field": "annotation"
        },
        {
          "start": 23,
          "end": 36,
          "kind": "dialogue",
          "node": "s02_l199_1",
          "field": "text"
        }
      ],
      "original": "Шляпа (во весь голос): «ПУФФЕНДУЙ!!»"
    },
    {
      "line": 200,
      "parts": [],
      "original": ""
    },
    {
      "line": 201,
      "parts": [
        {
          "start": 0,
          "end": 45,
          "kind": "narration",
          "node": "s02_l201_0",
          "field": "text"
        }
      ],
      "original": "Зал взрывается. Теперь шок никто не скрывает."
    },
    {
      "line": 202,
      "parts": [],
      "original": ""
    },
    {
      "line": 203,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l203_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 69,
          "kind": "dialogue",
          "node": "s02_l203_1",
          "field": "text"
        }
      ],
      "original": "Шёпот в зале: «Ещё один?! Уже третий Блэк, который не в Слизерине!..»"
    },
    {
      "line": 204,
      "parts": [],
      "original": ""
    },
    {
      "line": 205,
      "parts": [
        {
          "start": 0,
          "end": 133,
          "kind": "narration",
          "node": "s02_l205_0",
          "field": "text"
        }
      ],
      "original": "Азалия, в полном недоумении, медленно идёт к столу Пуффендуя и садится на свободное место. Несколько секунд смотрит в пустую тарелку."
    },
    {
      "line": 206,
      "parts": [],
      "original": ""
    },
    {
      "line": 207,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l207_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 51,
          "kind": "thought",
          "node": "s02_l207_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Мысли только о тебе... Но почему?..»"
    },
    {
      "line": 208,
      "parts": [],
      "original": ""
    },
    {
      "line": 209,
      "parts": [
        {
          "start": 0,
          "end": 45,
          "kind": "narration",
          "node": "s02_l209_0",
          "field": "text"
        }
      ],
      "original": "К ней подсаживается Тео и заглядывает в лицо."
    },
    {
      "line": 210,
      "parts": [],
      "original": ""
    },
    {
      "line": 211,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s02_l211_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 56,
          "kind": "dialogue",
          "node": "s02_l211_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Эй, ты в порядке? Просто ты так задумчиво сидишь»."
    },
    {
      "line": 212,
      "parts": [],
      "original": ""
    },
    {
      "line": 213,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s02_l213_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 24,
          "kind": "dialogue",
          "node": "s02_l213_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Всё хорошо...»."
    },
    {
      "line": 214,
      "parts": [],
      "original": ""
    },
    {
      "line": 215,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l215_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 143,
          "kind": "thought",
          "node": "s02_l215_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Показалось. Конечно, показалось. В голове роились мысли, пока я шла к этому стулу, вот и послышалось. Не бывает такого. Забудь»."
    },
    {
      "line": 216,
      "parts": [
        {
          "start": 0,
          "end": 84,
          "kind": "narration",
          "node": "s02_l216_0",
          "field": "text"
        }
      ],
      "original": "Затемнение. Церемония и ужин закончились, и факультеты расходятся по своим комнатам."
    },
    {
      "line": 217,
      "parts": [],
      "original": ""
    },
    {
      "line": 218,
      "parts": [
        {
          "start": 0,
          "end": 9,
          "kind": "metadata",
          "text": "Пуффендуй"
        }
      ],
      "original": "Пуффендуй"
    },
    {
      "line": 219,
      "parts": [
        {
          "start": 0,
          "end": 102,
          "kind": "narration",
          "node": "s02_l219_0",
          "field": "text"
        }
      ],
      "original": "Спальня Пуффендуя. Азалия расстилает постель. Круглое окошко, тёплый свет, мягкие жёлто-чёрные одеяла."
    },
    {
      "line": 220,
      "parts": [],
      "original": ""
    },
    {
      "line": 221,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s02_l221_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 161,
          "kind": "thought",
          "node": "s02_l221_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Интересно, что сейчас творится в голове у Тео. Он весь вечер улыбался, будто так и задумано. Надо спуститься и спросить, что он вообще чувствует»."
    },
    {
      "line": 222,
      "parts": [],
      "original": ""
    },
    {
      "line": 223,
      "parts": [
        {
          "start": 0,
          "end": 245,
          "kind": "narration",
          "node": "s02_l223_0",
          "field": "text"
        }
      ],
      "original": "Она спускается в гостиную: круглая комната с низким потолком, горшки с растениями на подоконниках, потрескивает камин. Тео оживлённо разговаривает с высоким парнем с тёмными волосами. Азалия замирает на последней ступеньке: она узнаёт этот смех."
    },
    {
      "line": 224,
      "parts": [],
      "original": ""
    },
    {
      "line": 225,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "stage",
          "node": "s02_l225_0",
          "field": "annotation"
        },
        {
          "start": 15,
          "end": 26,
          "kind": "dialogue",
          "node": "s02_l225_1",
          "field": "text"
        }
      ],
      "original": "Азалия (тихо): «Седрик?..»"
    },
    {
      "line": 226,
      "parts": [],
      "original": ""
    },
    {
      "line": 227,
      "parts": [
        {
          "start": 0,
          "end": 76,
          "kind": "narration",
          "node": "s02_l227_0",
          "field": "text"
        }
      ],
      "original": "Лучший друг детства, с которым они столько играли. Азалия срывается с места."
    },
    {
      "line": 228,
      "parts": [],
      "original": ""
    },
    {
      "line": 229,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s02_l229_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 17,
          "kind": "dialogue",
          "node": "s02_l229_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «СЕДРИК!»"
    },
    {
      "line": 230,
      "parts": [],
      "original": ""
    },
    {
      "line": 231,
      "parts": [
        {
          "start": 0,
          "end": 133,
          "kind": "narration",
          "node": "s02_l231_0",
          "field": "text"
        }
      ],
      "original": "Седрик оборачивается и не успевает ничего сказать: Азалия налетает на него и обнимает изо всех сил. Он смеётся и обнимает её в ответ."
    },
    {
      "line": 232,
      "parts": [],
      "original": ""
    },
    {
      "line": 233,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s02_l233_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 98,
          "kind": "dialogue",
          "node": "s02_l233_1",
          "field": "text"
        }
      ],
      "original": "Седрик: «Азалия! Я так и знал, что это ты! Слышал, вы с Тео устроили сегодня настоящий переполох»."
    },
    {
      "line": 234,
      "parts": [],
      "original": ""
    },
    {
      "line": 235,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "stage",
          "node": "s02_l235_0",
          "field": "annotation"
        },
        {
          "start": 27,
          "end": 85,
          "kind": "dialogue",
          "node": "s02_l235_1",
          "field": "text"
        }
      ],
      "original": "Тео (с притворной обидой): «А меня обнять не хочешь? Я, между прочим, тоже тут стою»."
    },
    {
      "line": 236,
      "parts": [],
      "original": ""
    },
    {
      "line": 237,
      "parts": [
        {
          "start": 0,
          "end": 30,
          "kind": "stage",
          "node": "s02_l237_0",
          "field": "annotation"
        },
        {
          "start": 30,
          "end": 75,
          "kind": "dialogue",
          "node": "s02_l237_1",
          "field": "text"
        }
      ],
      "original": "Азалия (не выпуская Седрика): «Тебя я вижу каждый день. Ты мне уже надоел»."
    },
    {
      "line": 238,
      "parts": [],
      "original": ""
    },
    {
      "line": 239,
      "parts": [
        {
          "start": 0,
          "end": 17,
          "kind": "stage",
          "node": "s02_l239_0",
          "field": "annotation"
        },
        {
          "start": 17,
          "end": 130,
          "kind": "dialogue",
          "node": "s02_l239_1",
          "field": "text"
        }
      ],
      "original": "Седрик (смеясь): «Два Блэка в Пуффендуе. Замок будет обсуждать это до самого Рождества. Но знаете, по-моему, вам тут самое место»."
    },
    {
      "line": 240,
      "parts": [],
      "original": ""
    },
    {
      "line": 241,
      "parts": [
        {
          "start": 0,
          "end": 36,
          "kind": "narration",
          "node": "s02_l241_0",
          "field": "text"
        }
      ],
      "original": "Азалия отстраняется и улыбается ему."
    },
    {
      "line": 242,
      "parts": [],
      "original": ""
    },
    {
      "line": 243,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s02_l243_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 48,
          "kind": "dialogue",
          "node": "s02_l243_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Сто лет не виделись. Как ты? Как дела?»"
    },
    {
      "line": 244,
      "parts": [],
      "original": ""
    },
    {
      "line": 245,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s02_l245_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 93,
          "kind": "dialogue",
          "node": "s02_l245_1",
          "field": "text"
        }
      ],
      "original": "Седрик: «Всё хорошо. Правда хорошо. Учёба, друзья... Не жалуюсь. Ты лучше про себя расскажи!»"
    },
    {
      "line": 246,
      "parts": [],
      "original": ""
    },
    {
      "line": 247,
      "parts": [
        {
          "start": 0,
          "end": 178,
          "kind": "narration",
          "node": "s02_l247_0",
          "field": "text"
        }
      ],
      "original": "Они ещё какое-то время болтают: о доме, о старых играх, о том, кто как изменился. Азалия видит, что у Седрика и правда всё хорошо, и на душе становится легче. Наконец она зевает."
    },
    {
      "line": 248,
      "parts": [],
      "original": ""
    },
    {
      "line": 249,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s02_l249_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 157,
          "kind": "dialogue",
          "node": "s02_l249_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Всё, я иду спать. Завтра первый день, не хочу выглядеть как зомби. Спокойной ночи, Седрик. Спокойной ночи, ээ…  как тебя там... Ну ты короче понял»."
    },
    {
      "line": 250,
      "parts": [],
      "original": ""
    },
    {
      "line": 251,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s02_l251_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 26,
          "kind": "dialogue",
          "node": "s02_l251_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Э обидно вообще-то»."
    },
    {
      "line": 252,
      "parts": [],
      "original": ""
    },
    {
      "line": 253,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s02_l253_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 48,
          "kind": "dialogue",
          "node": "s02_l253_1",
          "field": "text"
        }
      ],
      "original": "Азалия:«Хахаха, ну прости, спокойной ночи, Тео»."
    },
    {
      "line": 254,
      "parts": [],
      "original": ""
    },
    {
      "line": 255,
      "parts": [
        {
          "start": 0,
          "end": 5,
          "kind": "stage",
          "node": "s02_l255_0",
          "field": "annotation"
        },
        {
          "start": 5,
          "end": 52,
          "kind": "dialogue",
          "node": "s02_l255_1",
          "field": "text"
        }
      ],
      "original": "Тео: «Вот теперь я доволен, спокойной ночи, Азалия»."
    },
    {
      "line": 256,
      "parts": [],
      "original": ""
    },
    {
      "line": 257,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s02_l257_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 32,
          "kind": "dialogue",
          "node": "s02_l257_1",
          "field": "text"
        }
      ],
      "original": "Седрик: «Спокойной ночи, Азалия»"
    },
    {
      "line": 258,
      "parts": [],
      "original": ""
    },
    {
      "line": 259,
      "parts": [
        {
          "start": 0,
          "end": 43,
          "kind": "narration",
          "node": "s02_l259_0",
          "field": "text"
        }
      ],
      "original": "Азалия поднимается по лестнице. Затемнение."
    },
    {
      "line": 260,
      "parts": [],
      "original": ""
    },
    {
      "line": 261,
      "parts": [
        {
          "start": 0,
          "end": 208,
          "kind": "stage",
          "node": "s02_l261_0",
          "field": "annotation"
        }
      ],
      "original": "Анимация: Азалия спит в своей постели, волосы разметались по подушке. За круглым окном проплывает луна, звёзды гаснут одна за другой. Небо светлеет, ночь сменяется утром. Первый луч солнца ложится ей на лицо."
    },
    {
      "line": 262,
      "parts": [],
      "original": ""
    },
    {
      "line": 263,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "metadata",
          "text": "Конец сцены 2."
        }
      ],
      "original": "Конец сцены 2."
    },
    {
      "line": 264,
      "parts": [],
      "original": ""
    }
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "scope": [
    61,
    264
  ]
};

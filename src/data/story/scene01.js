export default {
  "schemaVersion": 1,
  "id": "scene01",
  "start": "s01_enter",
  "nodes": [
    {
      "id": "s01_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_manor",
      "characters": [
        "regulus",
        "elizabeth",
        "theo",
        "azalia"
      ],
      "source": [],
      "next": "s01_l006_0"
    },
    {
      "id": "s01_l006_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Стоит прямо, руки за спиной. Пару секунд молча смотрит на детей, затем говорит ровно, без лишних эмоций.)",
      "source": [
        {
          "file": "dialogues",
          "line": 6,
          "start": 0,
          "end": 106
        }
      ],
      "next": "s01_l008_0"
    },
    {
      "id": "s01_l008_0",
      "type": "dialogue",
      "speaker": "regulus",
      "text": "«Вы Блэки. Это имя не украшение, а ответственность. Вести себя нужно соответственно: достойно».",
      "source": [
        {
          "file": "dialogues",
          "line": 8,
          "start": 0,
          "end": 95
        }
      ],
      "next": "s01_l010_0"
    },
    {
      "id": "s01_l010_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Короткая пауза. Взгляд на Элизабет, она едва заметно кивает.)",
      "source": [
        {
          "file": "dialogues",
          "line": 10,
          "start": 0,
          "end": 62
        }
      ],
      "next": "s01_l012_0"
    },
    {
      "id": "s01_l012_0",
      "type": "dialogue",
      "speaker": "regulus",
      "text": "«Когда-то меня учили, что достоинство Блэка определяется кровью. Я больше так не считаю. Достоинство в том, что вы знаете, как держитесь и как поступаете, когда никто не смотрит. Людей надо судить по делам, а не по фамилии и происхождению. Мне самому это даётся нелегко, но я учусь».",
      "source": [
        {
          "file": "dialogues",
          "line": 12,
          "start": 0,
          "end": 283
        }
      ],
      "next": "s01_l014_0"
    },
    {
      "id": "s01_l014_0",
      "type": "dialogue",
      "speaker": "regulus",
      "text": "«Учитесь и вы. Всегда. Тот, кто решил, что знает достаточно, уже проиграл. Думайте, прежде чем говорить и действовать: эмоции плохие советчики, логика хороший. Не позволяйте никому выводить вас из равновесия. Достойный человек не срывается и не оправдывается. Держитесь друг друга. Это всё».",
      "source": [
        {
          "file": "dialogues",
          "line": 14,
          "start": 0,
          "end": 291
        }
      ],
      "next": "s01_l016_0"
    },
    {
      "id": "s01_l016_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Элизабет мягко касается его руки. Регулус на секунду замолкает и, уже тише, добавляет.)",
      "source": [
        {
          "file": "dialogues",
          "line": 16,
          "start": 0,
          "end": 88
        }
      ],
      "next": "s01_l018_0"
    },
    {
      "id": "s01_l018_0",
      "type": "dialogue",
      "speaker": "regulus",
      "text": "«И ещё. Что бы ни случилось, вам есть куда вернуться. Этот дом всегда ваш».",
      "source": [
        {
          "file": "dialogues",
          "line": 18,
          "start": 0,
          "end": 75
        }
      ],
      "next": "s01_l022_0"
    },
    {
      "id": "s01_l022_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Подходит к детям, поправляет Тео воротник, Азалии выбившуюся прядь. Голос мягкий, манеры безупречные.)",
      "source": [
        {
          "file": "dialogues",
          "line": 22,
          "start": 0,
          "end": 103
        }
      ],
      "next": "s01_l024_0"
    },
    {
      "id": "s01_l024_0",
      "type": "dialogue",
      "speaker": "elizabeth",
      "text": "«Я скажу всего несколько слов, мои дорогие. Следите за своими манерами. По манерам о вас будут судить ещё до того, как вы откроете рот».",
      "source": [
        {
          "file": "dialogues",
          "line": 24,
          "start": 0,
          "end": 136
        }
      ],
      "next": "s01_l026_0"
    },
    {
      "id": "s01_l026_0",
      "type": "dialogue",
      "speaker": "elizabeth",
      "text": "«И будьте вежливы со всеми. Со всеми, слышите? Откуда человек родом и кто его родители, не имеет значения. Вежливость не выбирает собеседника».",
      "source": [
        {
          "file": "dialogues",
          "line": 26,
          "start": 0,
          "end": 143
        }
      ],
      "next": "s01_l028_0"
    },
    {
      "id": "s01_l028_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Смотрит на Тео, улыбаясь уголками губ.)",
      "source": [
        {
          "file": "dialogues",
          "line": 28,
          "start": 0,
          "end": 40
        }
      ],
      "next": "s01_l029_0"
    },
    {
      "id": "s01_l029_0",
      "type": "dialogue",
      "speaker": "elizabeth",
      "text": "«Тео, острить можно, но не за чужой счёт. И не нужно ничего никому доказывать: настоящее достоинство не нуждается в публике».",
      "source": [
        {
          "file": "dialogues",
          "line": 29,
          "start": 0,
          "end": 125
        }
      ],
      "next": "s01_l031_0"
    },
    {
      "id": "s01_l031_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Поворачивается к Азалии.)",
      "source": [
        {
          "file": "dialogues",
          "line": 31,
          "start": 0,
          "end": 26
        }
      ],
      "next": "s01_l032_0"
    },
    {
      "id": "s01_l032_0",
      "type": "dialogue",
      "speaker": "elizabeth",
      "text": "«А ты Азалия не начни ругаться пассивно-агрессивно со Снейпом, он все таки ваш преподаватель и как преподавателя уважай его«",
      "source": [
        {
          "file": "dialogues",
          "line": 32,
          "start": 0,
          "end": 124
        }
      ],
      "next": "s01_l034_0"
    },
    {
      "id": "s01_l034_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео: (расплывается в самоуверенной улыбке, выпрямляется и картинно прикладывает ладонь к груди): ",
      "source": [
        {
          "file": "dialogues",
          "line": 34,
          "start": 0,
          "end": 97
        }
      ],
      "next": "s01_l034_1"
    },
    {
      "id": "s01_l034_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Всё будет хорошо! Мы нашу фамилию и свою честь не запятнаем! «Да, Азалия?»",
      "source": [
        {
          "file": "dialogues",
          "line": 34,
          "start": 97,
          "end": 172
        }
      ],
      "next": "s01_l036_0"
    },
    {
      "id": "s01_l036_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (спокойно встречает взгляд родителей и кивает, без бравады, но очень серьёзно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 36,
          "start": 0,
          "end": 87
        }
      ],
      "next": "s01_l036_1"
    },
    {
      "id": "s01_l036_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Да. Мы вас не подведём».",
      "source": [
        {
          "file": "dialogues",
          "line": 36,
          "start": 87,
          "end": 112
        }
      ],
      "next": "s01_l038_0"
    },
    {
      "id": "s01_l038_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Элизабет первой обнимает обоих детей сразу, прижимая к себе. Регулус делает шаг вперёд. Объятие выходит чуть скованным, будто он до сих пор этому учится. Потом его ладонь ложится на затылок Тео, другая на плечо Азалии, и он держит их дольше, чем нужно.)",
      "source": [
        {
          "file": "dialogues",
          "line": 38,
          "start": 0,
          "end": 254
        }
      ],
      "next": "s01_l040_0"
    },
    {
      "id": "s01_l040_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Регулус (тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 40,
          "start": 0,
          "end": 16
        }
      ],
      "next": "s01_l040_1"
    },
    {
      "id": "s01_l040_1",
      "type": "dialogue",
      "speaker": "regulus",
      "text": "«Я в вас не сомневаюсь».",
      "source": [
        {
          "file": "dialogues",
          "line": 40,
          "start": 16,
          "end": 40
        }
      ],
      "next": "s01_l042_0"
    },
    {
      "id": "s01_l042_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Голос Андромеды (срывающийся, грустный и удивительно мягкий): ",
      "source": [
        {
          "file": "dialogues",
          "line": 42,
          "start": 0,
          "end": 62
        }
      ],
      "next": "s01_l042_1"
    },
    {
      "id": "s01_l042_1",
      "type": "dialogue",
      "speaker": "andromeda",
      "text": "«ТЕООООО! АЗАЛИЯЯЯЯ!»",
      "source": [
        {
          "file": "dialogues",
          "line": 42,
          "start": 62,
          "end": 83
        }
      ],
      "next": "s01_l043_0"
    },
    {
      "id": "s01_l043_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Все оборачиваются. Элизабет улыбается, на лице Регулуса на миг мелькает удивление: он узнал этот голос. К ним, запыхавшись, бежит Андромеда, мантия наспех наброшена на плечи. Не сбавляя шага, она налетает на детей и обнимает обоих.)",
      "source": [
        {
          "file": "dialogues",
          "line": 43,
          "start": 0,
          "end": 233
        }
      ],
      "next": "s01_l045_0"
    },
    {
      "id": "s01_l045_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Андромеда (голос дрожит, в глазах слёзы): ",
      "source": [
        {
          "file": "dialogues",
          "line": 45,
          "start": 0,
          "end": 42
        }
      ],
      "next": "s01_l045_1"
    },
    {
      "id": "s01_l045_1",
      "type": "dialogue",
      "speaker": "andromeda",
      "text": "«Господи, как же вы выросли... Такие большие стали! Уже в Хогвартс поступаете...»",
      "source": [
        {
          "file": "dialogues",
          "line": 45,
          "start": 42,
          "end": 123
        }
      ],
      "next": "s01_l045_2"
    },
    {
      "id": "s01_l045_2",
      "type": "scene",
      "action": "cue",
      "annotation": " (смеётся сквозь слёзы) ",
      "source": [
        {
          "file": "dialogues",
          "line": 45,
          "start": 123,
          "end": 147
        }
      ],
      "next": "s01_l045_3"
    },
    {
      "id": "s01_l045_3",
      "type": "dialogue",
      "speaker": "andromeda",
      "text": "«Вы хотя бы пишите мне, хорошо? А то я буду ужасно скучать».",
      "source": [
        {
          "file": "dialogues",
          "line": 45,
          "start": 147,
          "end": 207
        }
      ],
      "next": "s01_l047_0"
    },
    {
      "id": "s01_l047_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Она чуть отстраняется, но не выпускает их из рук. Смотрит то на одного, то на другого, нежно и тепло, прямо в глаза, словно хочет запомнить их такими.)",
      "source": [
        {
          "file": "dialogues",
          "line": 47,
          "start": 0,
          "end": 152
        }
      ],
      "next": "s01_l049_0"
    },
    {
      "id": "s01_l049_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (улыбаясь во все 32 зуба с небольшой влажностью в глазаъ): ",
      "source": [
        {
          "file": "dialogues",
          "line": 49,
          "start": 0,
          "end": 63
        }
      ],
      "next": "s01_l049_1"
    },
    {
      "id": "s01_l049_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Обязательно! Как мы можем про вас забыть?",
      "source": [
        {
          "file": "dialogues",
          "line": 49,
          "start": 63,
          "end": 105
        }
      ],
      "next": "s01_l051_0"
    },
    {
      "id": "s01_l051_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (глаза слегка влажные, говорит тихо, с той теплотой, на которую способна, и с долей грусти): ",
      "source": [
        {
          "file": "dialogues",
          "line": 51,
          "start": 0,
          "end": 100
        }
      ],
      "next": "s01_l051_1"
    },
    {
      "id": "s01_l051_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Конечно, будем писать. Мы вас так сильно любим, что просто не сможем не писать».",
      "source": [
        {
          "file": "dialogues",
          "line": 51,
          "start": 100,
          "end": 181
        }
      ],
      "next": "s01_l053_0"
    },
    {
      "id": "s01_l053_0",
      "type": "scene",
      "action": "cue",
      "annotation": "(Андромеда на секунду закрывает глаза и снова прижимает их к себе. Элизабет и Регулус подходят ближе. Ещё несколько секунд никто не торопится разжимать руки.)",
      "source": [
        {
          "file": "dialogues",
          "line": 53,
          "start": 0,
          "end": 158
        }
      ],
      "next": "s01_l055_0"
    },
    {
      "id": "s01_l055_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Регулус (негромко, вернув привычную сдержанность, но не без мягкости): ",
      "source": [
        {
          "file": "dialogues",
          "line": 55,
          "start": 0,
          "end": 71
        }
      ],
      "next": "s01_l055_1"
    },
    {
      "id": "s01_l055_1",
      "type": "dialogue",
      "speaker": "regulus",
      "text": "«Пора. Поезд ждать не будет».",
      "source": [
        {
          "file": "dialogues",
          "line": 55,
          "start": 71,
          "end": 100
        }
      ],
      "next": "s01_l057_0"
    },
    {
      "id": "s01_l057_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Элизабет (с улыбкой, в последний раз поправляя Тео воротник): ",
      "source": [
        {
          "file": "dialogues",
          "line": 57,
          "start": 0,
          "end": 62
        }
      ],
      "next": "s01_l057_1"
    },
    {
      "id": "s01_l057_1",
      "type": "dialogue",
      "speaker": "elizabeth",
      "text": "«Идите, мои хорошие».",
      "source": [
        {
          "file": "dialogues",
          "line": 57,
          "start": 62,
          "end": 83
        }
      ],
      "next": "s01_cs01"
    },
    {
      "id": "s01_cs01",
      "type": "cutscene",
      "cutsceneId": "cs01",
      "source": [
        {
          "file": "plot",
          "line": 38
        }
      ],
      "next": "s01_end"
    },
    {
      "id": "s01_end",
      "type": "end",
      "nextScene": "scene02",
      "source": [],
      "next": null
    }
  ],
  "sourceLedger": [
    {
      "line": 1,
      "original": "сцена 1:",
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "metadata",
          "text": "сцена 1:"
        }
      ]
    },
    {
      "line": 2,
      "original": "участвует: Азалия, Тео, Регулус, Андромеда, Элизабет",
      "parts": [
        {
          "start": 0,
          "end": 52,
          "kind": "metadata",
          "text": "участвует: Азалия, Тео, Регулус, Андромеда, Элизабет"
        }
      ]
    },
    {
      "line": 3,
      "original": "",
      "parts": []
    },
    {
      "line": 4,
      "original": "Регулус:",
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "metadata",
          "text": "Регулус:"
        }
      ]
    },
    {
      "line": 5,
      "original": "",
      "parts": []
    },
    {
      "line": 6,
      "original": "(Стоит прямо, руки за спиной. Пару секунд молча смотрит на детей, затем говорит ровно, без лишних эмоций.)",
      "parts": [
        {
          "start": 0,
          "end": 106,
          "kind": "stage",
          "node": "s01_l006_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 7,
      "original": "",
      "parts": []
    },
    {
      "line": 8,
      "original": "«Вы Блэки. Это имя не украшение, а ответственность. Вести себя нужно соответственно: достойно».",
      "parts": [
        {
          "start": 0,
          "end": 95,
          "kind": "dialogue",
          "node": "s01_l008_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 9,
      "original": "",
      "parts": []
    },
    {
      "line": 10,
      "original": "(Короткая пауза. Взгляд на Элизабет, она едва заметно кивает.)",
      "parts": [
        {
          "start": 0,
          "end": 62,
          "kind": "stage",
          "node": "s01_l010_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 11,
      "original": "",
      "parts": []
    },
    {
      "line": 12,
      "original": "«Когда-то меня учили, что достоинство Блэка определяется кровью. Я больше так не считаю. Достоинство в том, что вы знаете, как держитесь и как поступаете, когда никто не смотрит. Людей надо судить по делам, а не по фамилии и происхождению. Мне самому это даётся нелегко, но я учусь».",
      "parts": [
        {
          "start": 0,
          "end": 283,
          "kind": "dialogue",
          "node": "s01_l012_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 13,
      "original": "",
      "parts": []
    },
    {
      "line": 14,
      "original": "«Учитесь и вы. Всегда. Тот, кто решил, что знает достаточно, уже проиграл. Думайте, прежде чем говорить и действовать: эмоции плохие советчики, логика хороший. Не позволяйте никому выводить вас из равновесия. Достойный человек не срывается и не оправдывается. Держитесь друг друга. Это всё».",
      "parts": [
        {
          "start": 0,
          "end": 291,
          "kind": "dialogue",
          "node": "s01_l014_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 15,
      "original": "",
      "parts": []
    },
    {
      "line": 16,
      "original": "(Элизабет мягко касается его руки. Регулус на секунду замолкает и, уже тише, добавляет.)",
      "parts": [
        {
          "start": 0,
          "end": 88,
          "kind": "stage",
          "node": "s01_l016_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 17,
      "original": "",
      "parts": []
    },
    {
      "line": 18,
      "original": "«И ещё. Что бы ни случилось, вам есть куда вернуться. Этот дом всегда ваш».",
      "parts": [
        {
          "start": 0,
          "end": 75,
          "kind": "dialogue",
          "node": "s01_l018_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 19,
      "original": "",
      "parts": []
    },
    {
      "line": 20,
      "original": "Элизабет:",
      "parts": [
        {
          "start": 0,
          "end": 9,
          "kind": "metadata",
          "text": "Элизабет:"
        }
      ]
    },
    {
      "line": 21,
      "original": "",
      "parts": []
    },
    {
      "line": 22,
      "original": "(Подходит к детям, поправляет Тео воротник, Азалии выбившуюся прядь. Голос мягкий, манеры безупречные.)",
      "parts": [
        {
          "start": 0,
          "end": 103,
          "kind": "stage",
          "node": "s01_l022_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 23,
      "original": "",
      "parts": []
    },
    {
      "line": 24,
      "original": "«Я скажу всего несколько слов, мои дорогие. Следите за своими манерами. По манерам о вас будут судить ещё до того, как вы откроете рот».",
      "parts": [
        {
          "start": 0,
          "end": 136,
          "kind": "dialogue",
          "node": "s01_l024_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 25,
      "original": "",
      "parts": []
    },
    {
      "line": 26,
      "original": "«И будьте вежливы со всеми. Со всеми, слышите? Откуда человек родом и кто его родители, не имеет значения. Вежливость не выбирает собеседника».",
      "parts": [
        {
          "start": 0,
          "end": 143,
          "kind": "dialogue",
          "node": "s01_l026_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 27,
      "original": "",
      "parts": []
    },
    {
      "line": 28,
      "original": "(Смотрит на Тео, улыбаясь уголками губ.)",
      "parts": [
        {
          "start": 0,
          "end": 40,
          "kind": "stage",
          "node": "s01_l028_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 29,
      "original": "«Тео, острить можно, но не за чужой счёт. И не нужно ничего никому доказывать: настоящее достоинство не нуждается в публике».",
      "parts": [
        {
          "start": 0,
          "end": 125,
          "kind": "dialogue",
          "node": "s01_l029_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 30,
      "original": "",
      "parts": []
    },
    {
      "line": 31,
      "original": "(Поворачивается к Азалии.)",
      "parts": [
        {
          "start": 0,
          "end": 26,
          "kind": "stage",
          "node": "s01_l031_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 32,
      "original": "«А ты Азалия не начни ругаться пассивно-агрессивно со Снейпом, он все таки ваш преподаватель и как преподавателя уважай его«",
      "parts": [
        {
          "start": 0,
          "end": 124,
          "kind": "dialogue",
          "node": "s01_l032_0",
          "field": "text"
        }
      ]
    },
    {
      "line": 33,
      "original": "",
      "parts": []
    },
    {
      "line": 34,
      "original": "Тео: (расплывается в самоуверенной улыбке, выпрямляется и картинно прикладывает ладонь к груди): «Всё будет хорошо! Мы нашу фамилию и свою честь не запятнаем! «Да, Азалия?»",
      "parts": [
        {
          "start": 0,
          "end": 97,
          "kind": "stage",
          "node": "s01_l034_0",
          "field": "annotation"
        },
        {
          "start": 97,
          "end": 172,
          "kind": "dialogue",
          "node": "s01_l034_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 35,
      "original": "",
      "parts": []
    },
    {
      "line": 36,
      "original": "Азалия (спокойно встречает взгляд родителей и кивает, без бравады, но очень серьёзно): «Да. Мы вас не подведём».",
      "parts": [
        {
          "start": 0,
          "end": 87,
          "kind": "stage",
          "node": "s01_l036_0",
          "field": "annotation"
        },
        {
          "start": 87,
          "end": 112,
          "kind": "dialogue",
          "node": "s01_l036_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 37,
      "original": "",
      "parts": []
    },
    {
      "line": 38,
      "original": "(Элизабет первой обнимает обоих детей сразу, прижимая к себе. Регулус делает шаг вперёд. Объятие выходит чуть скованным, будто он до сих пор этому учится. Потом его ладонь ложится на затылок Тео, другая на плечо Азалии, и он держит их дольше, чем нужно.)",
      "parts": [
        {
          "start": 0,
          "end": 254,
          "kind": "stage",
          "node": "s01_l038_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 39,
      "original": "",
      "parts": []
    },
    {
      "line": 40,
      "original": "Регулус (тихо): «Я в вас не сомневаюсь».",
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "stage",
          "node": "s01_l040_0",
          "field": "annotation"
        },
        {
          "start": 16,
          "end": 40,
          "kind": "dialogue",
          "node": "s01_l040_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 41,
      "original": "",
      "parts": []
    },
    {
      "line": 42,
      "original": "Голос Андромеды (срывающийся, грустный и удивительно мягкий): «ТЕООООО! АЗАЛИЯЯЯЯ!»",
      "parts": [
        {
          "start": 0,
          "end": 62,
          "kind": "stage",
          "node": "s01_l042_0",
          "field": "annotation"
        },
        {
          "start": 62,
          "end": 83,
          "kind": "dialogue",
          "node": "s01_l042_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 43,
      "original": "(Все оборачиваются. Элизабет улыбается, на лице Регулуса на миг мелькает удивление: он узнал этот голос. К ним, запыхавшись, бежит Андромеда, мантия наспех наброшена на плечи. Не сбавляя шага, она налетает на детей и обнимает обоих.)",
      "parts": [
        {
          "start": 0,
          "end": 233,
          "kind": "stage",
          "node": "s01_l043_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 44,
      "original": "",
      "parts": []
    },
    {
      "line": 45,
      "original": "Андромеда (голос дрожит, в глазах слёзы): «Господи, как же вы выросли... Такие большие стали! Уже в Хогвартс поступаете...» (смеётся сквозь слёзы) «Вы хотя бы пишите мне, хорошо? А то я буду ужасно скучать».",
      "parts": [
        {
          "start": 0,
          "end": 42,
          "kind": "stage",
          "node": "s01_l045_0",
          "field": "annotation"
        },
        {
          "start": 42,
          "end": 123,
          "kind": "dialogue",
          "node": "s01_l045_1",
          "field": "text"
        },
        {
          "start": 123,
          "end": 147,
          "kind": "stage",
          "node": "s01_l045_2",
          "field": "annotation"
        },
        {
          "start": 147,
          "end": 207,
          "kind": "dialogue",
          "node": "s01_l045_3",
          "field": "text"
        }
      ]
    },
    {
      "line": 46,
      "original": "",
      "parts": []
    },
    {
      "line": 47,
      "original": "(Она чуть отстраняется, но не выпускает их из рук. Смотрит то на одного, то на другого, нежно и тепло, прямо в глаза, словно хочет запомнить их такими.)",
      "parts": [
        {
          "start": 0,
          "end": 152,
          "kind": "stage",
          "node": "s01_l047_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 48,
      "original": "",
      "parts": []
    },
    {
      "line": 49,
      "original": "Тео (улыбаясь во все 32 зуба с небольшой влажностью в глазаъ): «Обязательно! Как мы можем про вас забыть?",
      "parts": [
        {
          "start": 0,
          "end": 63,
          "kind": "stage",
          "node": "s01_l049_0",
          "field": "annotation"
        },
        {
          "start": 63,
          "end": 105,
          "kind": "dialogue",
          "node": "s01_l049_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 50,
      "original": "",
      "parts": []
    },
    {
      "line": 51,
      "original": "Азалия (глаза слегка влажные, говорит тихо, с той теплотой, на которую способна, и с долей грусти): «Конечно, будем писать. Мы вас так сильно любим, что просто не сможем не писать».",
      "parts": [
        {
          "start": 0,
          "end": 100,
          "kind": "stage",
          "node": "s01_l051_0",
          "field": "annotation"
        },
        {
          "start": 100,
          "end": 181,
          "kind": "dialogue",
          "node": "s01_l051_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 52,
      "original": "",
      "parts": []
    },
    {
      "line": 53,
      "original": "(Андромеда на секунду закрывает глаза и снова прижимает их к себе. Элизабет и Регулус подходят ближе. Ещё несколько секунд никто не торопится разжимать руки.)",
      "parts": [
        {
          "start": 0,
          "end": 158,
          "kind": "stage",
          "node": "s01_l053_0",
          "field": "annotation"
        }
      ]
    },
    {
      "line": 54,
      "original": "",
      "parts": []
    },
    {
      "line": 55,
      "original": "Регулус (негромко, вернув привычную сдержанность, но не без мягкости): «Пора. Поезд ждать не будет».",
      "parts": [
        {
          "start": 0,
          "end": 71,
          "kind": "stage",
          "node": "s01_l055_0",
          "field": "annotation"
        },
        {
          "start": 71,
          "end": 100,
          "kind": "dialogue",
          "node": "s01_l055_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 56,
      "original": "",
      "parts": []
    },
    {
      "line": 57,
      "original": "Элизабет (с улыбкой, в последний раз поправляя Тео воротник): «Идите, мои хорошие».",
      "parts": [
        {
          "start": 0,
          "end": 62,
          "kind": "stage",
          "node": "s01_l057_0",
          "field": "annotation"
        },
        {
          "start": 62,
          "end": 83,
          "kind": "dialogue",
          "node": "s01_l057_1",
          "field": "text"
        }
      ]
    },
    {
      "line": 58,
      "original": "",
      "parts": []
    },
    {
      "line": 59,
      "original": "КОНЕЦ 1 СЦЕНЫ",
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "metadata",
          "text": "КОНЕЦ 1 СЦЕНЫ"
        }
      ]
    },
    {
      "line": 60,
      "original": "",
      "parts": []
    }
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "scope": [
    1,
    60
  ]
};

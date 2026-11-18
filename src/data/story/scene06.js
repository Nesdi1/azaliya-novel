export default {
  "schemaVersion": 1,
  "id": "scene06",
  "start": "s06_enter",
  "scope": [
    613,
    736
  ],
  "sourceSha256": "25963956c5835837610786dd375bc5aa6ddb66a4052bbc65362c266a09ca73eb",
  "nodes": [
    {
      "id": "s06_enter",
      "type": "scene",
      "action": "enter",
      "background": "bg_dueling_hall",
      "characters": [
        "azalia",
        "malfoy",
        "theo"
      ],
      "source": [],
      "next": "s06_l617_0",
      "emotions": {}
    },
    {
      "id": "s06_l617_0",
      "type": "narration",
      "text": "Дуэльный зал. Длинная каменная платформа, вокруг трибуны для учеников. Азалию вызывают на платформу. Напротив неё стоит Малфой и смотрит с нескрываемой ненавистью.",
      "source": [
        {
          "file": "dialogues",
          "line": 617,
          "start": 0,
          "end": 163
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "focus"
        },
        {
          "target": "malfoy",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s06_l619_0",
      "emotions": {
        "malfoy": "angry"
      }
    },
    {
      "id": "s06_l619_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (с трибуны, размахивая руками): ",
      "source": [
        {
          "file": "dialogues",
          "line": 619,
          "start": 0,
          "end": 36
        }
      ],
      "next": "s06_l619_1",
      "emotions": {
        "malfoy": "angry"
      }
    },
    {
      "id": "s06_l619_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«АЗАЛИЯ! РАЗНЕСИ ЕГО!»",
      "source": [
        {
          "file": "dialogues",
          "line": 619,
          "start": 36,
          "end": 58
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
      "next": "s06_if_rose_621",
      "emotions": {
        "malfoy": "angry"
      }
    },
    {
      "id": "s06_if_rose_621",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s06_l623_0",
      "source": [],
      "else": "s06_l621_0",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s06_l621_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз (рядом, подпрыгивая): ",
      "source": [
        {
          "file": "dialogues",
          "line": 621,
          "start": 0,
          "end": 27
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 450
        }
      ],
      "next": "s06_l621_1",
      "emotions": {}
    },
    {
      "id": "s06_l621_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«ДА! ПОКАЖИ ЕМУ!»",
      "source": [
        {
          "file": "dialogues",
          "line": 621,
          "start": 27,
          "end": 44
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "next": "s06_l623_0",
      "emotions": {}
    },
    {
      "id": "s06_l623_0",
      "type": "narration",
      "text": "Азалия поднимает палочку и незаметно обводит взглядом трибуны. Она ищет глазами Диму.",
      "source": [
        {
          "file": "dialogues",
          "line": 623,
          "start": 0,
          "end": 85
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        }
      ],
      "next": "s06_l625_0",
      "emotions": {
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s06_l625_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Мысли Азалии: ",
      "source": [
        {
          "file": "dialogues",
          "line": 625,
          "start": 0,
          "end": 14
        }
      ],
      "next": "s06_l625_1",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s06_l625_1",
      "type": "thought",
      "speaker": "azalia",
      "text": "«Где он? Почему я вообще его ищу? После той ночи я веду себя по отношению к нему максимально странно...»",
      "source": [
        {
          "file": "dialogues",
          "line": 625,
          "start": 14,
          "end": 118
        }
      ],
      "next": "s06_game_duel",
      "emotions": {
        "azalia": "thought"
      }
    },
    {
      "id": "s06_game_duel",
      "type": "minigame",
      "gameId": "duel",
      "params": {
        "round": 2,
        "opponent": "malfoy",
        "forceStoryWin": true
      },
      "resultRoutes": {
        "success": "s06_l629_0",
        "failure": "s06_l629_0"
      },
      "source": [
        {
          "file": "dialogues",
          "line": 627,
          "start": 0,
          "end": 52
        }
      ],
      "next": "s06_l629_0",
      "emotions": {
        "azalia": "wand_draw"
      }
    },
    {
      "id": "s06_l629_0",
      "type": "narration",
      "text": "Малфой отлетает назад, спотыкается и падает. Трибуны взрываются криками. Тео и Роуз вопят от восторга.",
      "cues": [
        {
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        },
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 480
        },
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 520
        }
      ],
      "variants": [
        {
          "id": "noRose_D629",
          "condition": {
            "op": "eq",
            "left": {
              "var": "roseFriend"
            },
            "right": false
          },
          "text": "Малфой отлетает назад, спотыкается и падает. Трибуны взрываются криками. Тео вопит от восторга."
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 629,
          "start": 0,
          "end": 102
        }
      ],
      "next": "s06_l631_0",
      "emotions": {}
    },
    {
      "id": "s06_l631_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Преподаватель: ",
      "source": [
        {
          "file": "dialogues",
          "line": 631,
          "start": 0,
          "end": 15
        }
      ],
      "next": "s06_l631_1",
      "emotions": {}
    },
    {
      "id": "s06_l631_1",
      "type": "dialogue",
      "speaker": "duel_teacher",
      "text": "«Следующая дуэль: Тео Блэк и Дмитрий Де Нестер».",
      "source": [
        {
          "file": "dialogues",
          "line": 631,
          "start": 15,
          "end": 63
        }
      ],
      "next": "s06_enter_duel_theo_dima",
      "emotions": {}
    },
    {
      "id": "s06_enter_duel_theo_dima",
      "type": "scene",
      "action": "enter",
      "background": "bg_dueling_hall",
      "characters": [
        "theo",
        "dima",
        "azalia"
      ],
      "source": [],
      "next": "s06_l633_0",
      "emotions": {}
    },
    {
      "id": "s06_l633_0",
      "type": "narration",
      "text": "Тео выходит на платформу, широко улыбаясь. Дима занимает место напротив. Короткий поклон, и дуэль начинается.",
      "source": [
        {
          "file": "dialogues",
          "line": 633,
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
          "target": "dima",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500,
          "delayMs": 200
        }
      ],
      "next": "s06_l635_0",
      "emotions": {}
    },
    {
      "id": "s06_l635_0",
      "type": "narration",
      "text": "Заклинания вспыхивают и разлетаются в стороны, зал замирает. Дуэль длится на удивление долго. Дима держится достойно, но в конце концов Тео оказывается проворнее, и палочка Димы вылетает у него из руки.",
      "source": [
        {
          "file": "dialogues",
          "line": 635,
          "start": 0,
          "end": 202
        }
      ],
      "cues": [
        {
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        },
        {
          "effect": "glow",
          "to": 0.25,
          "durationMs": 600
        },
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        }
      ],
      "next": "s06_cs06_duel_demo",
      "emotions": {}
    },
    {
      "id": "s06_cs06_duel_demo",
      "type": "cutscene",
      "cutsceneId": "cs_duel",
      "next": "s06_l637_0",
      "source": [],
      "emotions": {}
    },
    {
      "id": "s06_l637_0",
      "type": "narration",
      "text": "Дима, тяжело дыша, смеётся, поднимается и подходит к Тео. Протягивает руку.",
      "source": [
        {
          "file": "dialogues",
          "line": 637,
          "start": 0,
          "end": 75
        }
      ],
      "cues": [
        {
          "effect": "glow",
          "to": 0,
          "durationMs": 500
        },
        {
          "effect": "group",
          "targets": [
            "theo",
            "dima"
          ],
          "durationMs": 600
        }
      ],
      "next": "s06_l639_0",
      "emotions": {}
    },
    {
      "id": "s06_l639_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 639,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l639_1",
      "emotions": {}
    },
    {
      "id": "s06_l639_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Хорошая была дуэль».",
      "source": [
        {
          "file": "dialogues",
          "line": 639,
          "start": 6,
          "end": 27
        }
      ],
      "next": "s06_l641_0",
      "emotions": {}
    },
    {
      "id": "s06_l641_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Тео (пожимая руку, сияя): ",
      "source": [
        {
          "file": "dialogues",
          "line": 641,
          "start": 0,
          "end": 26
        }
      ],
      "next": "s06_l641_1",
      "emotions": {}
    },
    {
      "id": "s06_l641_1",
      "type": "dialogue",
      "speaker": "theo",
      "text": "«Надо будет повторить. Мне понравилась наша дуэль».",
      "source": [
        {
          "file": "dialogues",
          "line": 641,
          "start": 26,
          "end": 77
        }
      ],
      "cues": [
        {
          "target": "theo",
          "effect": "bounce",
          "amplitude": 7,
          "durationMs": 500
        }
      ],
      "next": "s06_enter_corridor",
      "emotions": {}
    },
    {
      "id": "s06_enter_corridor",
      "type": "scene",
      "action": "enter",
      "background": "bg_corridor",
      "characters": [
        "azalia",
        "theo"
      ],
      "source": [],
      "next": "s06_l643_0",
      "emotions": {}
    },
    {
      "id": "s06_l643_0",
      "type": "narration",
      "text": "Урок заканчивается. Азалия поспешно собирает вещи и ищет Диму: она хочет спросить, как переводится то слово, и похвалить его, сказав, что далеко не каждый смог бы так долго выстоять против Тео. Она расспрашивает всех подряд. Наконец кто-то говорит ей, что Дима ушёл к Чёрному озеру.",
      "source": [
        {
          "file": "dialogues",
          "line": 643,
          "start": 0,
          "end": 282
        }
      ],
      "next": "s06_if_rose_645",
      "emotions": {}
    },
    {
      "id": "s06_if_rose_645",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s06_l649_0",
      "source": [],
      "else": "s06_l645_0",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s06_l645_0",
      "type": "narration",
      "text": "Она разворачивается и сталкивается с Роуз и Тео.",
      "source": [
        {
          "file": "dialogues",
          "line": 645,
          "start": 0,
          "end": 48
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 450
        }
      ],
      "next": "s06_l647_0",
      "emotions": {}
    },
    {
      "id": "s06_l647_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 647,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l647_1",
      "emotions": {}
    },
    {
      "id": "s06_l647_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Азалия! Ты пойдёшь на отборы в квиддич? Или позже?»",
      "source": [
        {
          "file": "dialogues",
          "line": 647,
          "start": 6,
          "end": 58
        }
      ],
      "next": "s06_l649_0",
      "emotions": {}
    },
    {
      "id": "s06_l649_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (замирая): ",
      "source": [
        {
          "file": "dialogues",
          "line": 649,
          "start": 0,
          "end": 18
        }
      ],
      "next": "s06_l649_1",
      "emotions": {}
    },
    {
      "id": "s06_l649_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Чёрт. Точно. Совсем забыла!»",
      "source": [
        {
          "file": "dialogues",
          "line": 649,
          "start": 18,
          "end": 47
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
      "next": "choice06_01",
      "emotions": {}
    },
    {
      "id": "choice06_01",
      "type": "choice",
      "options": [
        {
          "id": "choice06_01_1",
          "text": "Искать Диму у Чёрного озера.",
          "effects": [
            {
              "variable": "scene6Route",
              "value": "lake"
            }
          ],
          "next": "s06_enter_lake",
          "source": [
            {
              "file": "dialogues",
              "line": 652,
              "start": 11,
              "end": 39
            }
          ]
        },
        {
          "id": "choice06_01_2",
          "text": "Идти на отборы по квиддичу.",
          "effects": [
            {
              "variable": "scene6Route",
              "value": "quidditch"
            }
          ],
          "next": "s06_enter_quidditch",
          "source": [
            {
              "file": "dialogues",
              "line": 653,
              "start": 11,
              "end": 38
            }
          ]
        }
      ],
      "source": [],
      "next": null,
      "emotions": {}
    },
    {
      "id": "s06_enter_quidditch",
      "type": "scene",
      "action": "enter",
      "background": "bg_quidditch",
      "characters": [
        "azalia",
        "dima"
      ],
      "source": [],
      "next": "s06_l655_0",
      "emotions": {}
    },
    {
      "id": "s06_l655_0",
      "type": "narration",
      "text": "Поле для квиддича. Яркое солнце, на трибунах шумят ученики. Азалия выходит на стартовую линию. У самого края поля среди зрителей стоит Дима: он решил не пропустить момент, когда Азалия вступит в команду.",
      "source": [
        {
          "file": "dialogues",
          "line": 655,
          "start": 0,
          "end": 203
        }
      ],
      "cues": [
        {
          "target": "azalia",
          "effect": "focus"
        },
        {
          "target": "dima",
          "effect": "breathe",
          "durationMs": 2800
        }
      ],
      "next": "s06_game_quidditch",
      "emotions": {}
    },
    {
      "id": "s06_game_quidditch",
      "type": "minigame",
      "gameId": "quidditch",
      "params": {
        "rings": 7
      },
      "resultRoutes": {
        "success": "s06_l657_1",
        "failure": "s06_l657_1"
      },
      "source": [
        {
          "file": "dialogues",
          "line": 656,
          "start": 0,
          "end": 30
        }
      ],
      "next": "s06_l657_1",
      "emotions": {}
    },
    {
      "id": "s06_l657_1",
      "type": "narration",
      "text": "она спускается на землю и видит Диму.",
      "source": [
        {
          "file": "dialogues",
          "line": 657,
          "start": 32,
          "end": 69
        }
      ],
      "next": "choice06_02",
      "emotions": {}
    },
    {
      "id": "choice06_02",
      "type": "choice",
      "options": [
        {
          "id": "choice06_02_1",
          "text": "Пойти к Диме хвастаться.",
          "next": "s06_l663_1",
          "source": [
            {
              "file": "dialogues",
              "line": 659,
              "start": 11,
              "end": 35
            }
          ]
        },
        {
          "id": "choice06_02_2",
          "text": "Пойти к друзьям хвастаться.",
          "next": "s06_l661_1",
          "source": [
            {
              "file": "dialogues",
              "line": 660,
              "start": 11,
              "end": 38
            }
          ]
        }
      ],
      "source": [],
      "next": null,
      "emotions": {}
    },
    {
      "id": "s06_l661_1",
      "type": "narration",
      "text": "Дима сам подходит к ним и, улыбаясь, хвалит Азалию.",
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "effect": "group",
          "targets": [
            "dima",
            "azalia"
          ],
          "durationMs": 600
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 661,
          "start": 16,
          "end": 67
        }
      ],
      "next": "s06_l662_0",
      "emotions": {}
    },
    {
      "id": "s06_l662_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 662,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l662_1",
      "emotions": {}
    },
    {
      "id": "s06_l662_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Чтож ты была как обычно бесподобно, но это все равно удивляет».",
      "source": [
        {
          "file": "dialogues",
          "line": 662,
          "start": 6,
          "end": 70
        }
      ],
      "next": "s06_if_route_after_quidditch",
      "emotions": {}
    },
    {
      "id": "s06_l663_1",
      "type": "narration",
      "text": "Азалия подбегает и взахлёб рассказывает, как обошла соперников. Дима слушает и осыпает её похвалой.",
      "cues": [
        {
          "target": "azalia",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        },
        {
          "effect": "group",
          "targets": [
            "dima",
            "azalia"
          ],
          "durationMs": 600
        }
      ],
      "source": [
        {
          "file": "dialogues",
          "line": 663,
          "start": 13,
          "end": 112
        }
      ],
      "next": "s06_if_route_after_quidditch",
      "emotions": {}
    },
    {
      "id": "s06_if_route_after_quidditch",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "scene6Route"
        },
        "right": "lake"
      },
      "then": "s06_if_rose_724",
      "source": [],
      "else": "s06_l665_0",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s06_l665_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (вдруг, резко): ",
      "source": [
        {
          "file": "dialogues",
          "line": 665,
          "start": 0,
          "end": 23
        }
      ],
      "next": "s06_l665_1",
      "emotions": {}
    },
    {
      "id": "s06_l665_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Кстати! Что значит то слово?»",
      "source": [
        {
          "file": "dialogues",
          "line": 665,
          "start": 23,
          "end": 53
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
      "next": "s06_l666_0",
      "emotions": {}
    },
    {
      "id": "s06_l666_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (улыбаясь): ",
      "source": [
        {
          "file": "dialogues",
          "line": 666,
          "start": 0,
          "end": 17
        }
      ],
      "next": "s06_l666_1",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s06_l666_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Вот тебе подсказка».",
      "source": [
        {
          "file": "dialogues",
          "line": 666,
          "start": 17,
          "end": 38
        }
      ],
      "next": "s06_l667_0",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s06_l667_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 667,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s06_l667_1",
      "emotions": {}
    },
    {
      "id": "s06_l667_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«А может, ты сразу скажешь?»",
      "source": [
        {
          "file": "dialogues",
          "line": 667,
          "start": 8,
          "end": 36
        }
      ],
      "next": "s06_l668_0",
      "emotions": {}
    },
    {
      "id": "s06_l668_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 668,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l668_1",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s06_l668_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Так неинтересно. Поэтому иди ищи книгу, которая начинается на «и» и стоит на третьей полке».",
      "source": [
        {
          "file": "dialogues",
          "line": 668,
          "start": 6,
          "end": 99
        }
      ],
      "next": "s06_if_rose_724",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s06_enter_lake",
      "type": "scene",
      "action": "enter",
      "background": "bg_black_lake",
      "characters": [
        "dima",
        "malfoy",
        "azalia"
      ],
      "source": [],
      "next": "s06_l670_0",
      "emotions": {}
    },
    {
      "id": "s06_l670_0",
      "type": "narration",
      "text": "Чёрное озеро. Тихий ветер, вода блестит на солнце. Под раскидистым деревом сидит Дима и читает книгу. К нему направляется Малфой с ухмылкой, и на конце его палочки уже собирается вода: он хочет облить Диму и испортить ему книгу.",
      "source": [
        {
          "file": "dialogues",
          "line": 670,
          "start": 0,
          "end": 228
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "focus"
        },
        {
          "target": "malfoy",
          "effect": "tilt",
          "amplitude": -2,
          "durationMs": 500
        }
      ],
      "next": "s06_l672_0",
      "emotions": {
        "malfoy": "angry"
      }
    },
    {
      "id": "s06_l672_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (сквозь зубы): ",
      "source": [
        {
          "file": "dialogues",
          "line": 672,
          "start": 0,
          "end": 22
        }
      ],
      "next": "s06_l672_1",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s06_l672_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Вот гад».",
      "source": [
        {
          "file": "dialogues",
          "line": 672,
          "start": 22,
          "end": 32
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
      "next": "s06_l674_0",
      "emotions": {
        "azalia": "angry"
      }
    },
    {
      "id": "s06_l674_0",
      "type": "narration",
      "text": "Она уже собирается вмешаться, но Дима опережает её. Не поднимая головы от книги, он произносит заклинание. Малфоя подбрасывает в воздух, и он с громким плеском падает в озеро. Дима смеётся.",
      "source": [
        {
          "file": "dialogues",
          "line": 674,
          "start": 0,
          "end": 189
        }
      ],
      "cues": [
        {
          "effect": "shake",
          "amplitude": 4,
          "durationMs": 450
        },
        {
          "target": "malfoy",
          "effect": "bounce",
          "amplitude": 10,
          "durationMs": 520
        }
      ],
      "next": "s06_l676_0",
      "emotions": {}
    },
    {
      "id": "s06_l676_0",
      "type": "narration",
      "text": "Мимо Азалии пулей проносится Пэнси.",
      "source": [
        {
          "file": "dialogues",
          "line": 676,
          "start": 0,
          "end": 35
        }
      ],
      "cues": [
        {
          "target": "pansy",
          "effect": "fade",
          "to": 1,
          "side": "right",
          "durationMs": 460
        },
        {
          "target": "pansy",
          "effect": "bounce",
          "amplitude": 9,
          "durationMs": 500,
          "delayMs": 100
        }
      ],
      "next": "s06_l678_0",
      "emotions": {
        "pansy": "panic"
      }
    },
    {
      "id": "s06_l678_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Пэнси (визжа): ",
      "source": [
        {
          "file": "dialogues",
          "line": 678,
          "start": 0,
          "end": 15
        }
      ],
      "next": "s06_l678_1",
      "emotions": {
        "pansy": "panic"
      }
    },
    {
      "id": "s06_l678_1",
      "type": "dialogue",
      "speaker": "pansy",
      "text": "«Малфой, быстрее вставай! Давай, мой хорошенький, быстрее, быстрее!»",
      "source": [
        {
          "file": "dialogues",
          "line": 678,
          "start": 15,
          "end": 83
        }
      ],
      "cues": [
        {
          "target": "pansy",
          "effect": "shake",
          "amplitude": 3.5,
          "durationMs": 450
        }
      ],
      "next": "s06_l680_0",
      "emotions": {
        "pansy": "panic"
      }
    },
    {
      "id": "s06_l680_0",
      "type": "narration",
      "text": "Малфой, мокрый и взбешённый, выбирается на берег и начинает орать на Диму, но Пэнси хватает его под руку.",
      "source": [
        {
          "file": "dialogues",
          "line": 680,
          "start": 0,
          "end": 105
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
      "next": "s06_l682_0",
      "emotions": {
        "malfoy": "hysteria_wet"
      }
    },
    {
      "id": "s06_l682_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Пэнси: ",
      "source": [
        {
          "file": "dialogues",
          "line": 682,
          "start": 0,
          "end": 7
        }
      ],
      "next": "s06_l682_1",
      "emotions": {
        "malfoy": "hysteria_wet",
        "pansy": "peace"
      }
    },
    {
      "id": "s06_l682_1",
      "type": "dialogue",
      "speaker": "pansy",
      "text": "«Всё-всё, хватит, мой хороший».",
      "source": [
        {
          "file": "dialogues",
          "line": 682,
          "start": 7,
          "end": 38
        }
      ],
      "next": "s06_l684_0",
      "emotions": {
        "malfoy": "hysteria_wet",
        "pansy": "peace"
      }
    },
    {
      "id": "s06_l684_0",
      "type": "narration",
      "text": "Она уводит его под ручку. Азалия смотрит им вслед.",
      "source": [
        {
          "file": "dialogues",
          "line": 684,
          "start": 0,
          "end": 50
        }
      ],
      "cues": [
        {
          "target": "malfoy",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 500
        },
        {
          "target": "pansy",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 500,
          "delayMs": 80
        },
        {
          "effect": "group",
          "targets": [],
          "durationMs": 500
        }
      ],
      "next": "s06_cs06_lake",
      "emotions": {}
    },
    {
      "id": "s06_cs06_lake",
      "type": "cutscene",
      "cutsceneId": "cs06_lake",
      "next": "s06_l686_0",
      "source": [],
      "emotions": {}
    },
    {
      "id": "s06_l686_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (тихо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 686,
          "start": 0,
          "end": 15
        }
      ],
      "next": "s06_l686_1",
      "emotions": {}
    },
    {
      "id": "s06_l686_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Пиздец».",
      "source": [
        {
          "file": "dialogues",
          "line": 686,
          "start": 15,
          "end": 24
        }
      ],
      "next": "s06_l688_0",
      "emotions": {}
    },
    {
      "id": "s06_l688_0",
      "type": "narration",
      "text": "Затем она подходит к Диме и садится рядом.",
      "source": [
        {
          "file": "dialogues",
          "line": 688,
          "start": 0,
          "end": 42
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [
            "dima",
            "azalia"
          ],
          "durationMs": 600
        },
        {
          "target": "dima",
          "effect": "focus"
        }
      ],
      "next": "s06_l690_0",
      "emotions": {}
    },
    {
      "id": "s06_l690_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 690,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s06_l690_1",
      "emotions": {
        "azalia": "worried"
      }
    },
    {
      "id": "s06_l690_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Всё хорошо? Ты просто так резко ушёл».",
      "source": [
        {
          "file": "dialogues",
          "line": 690,
          "start": 8,
          "end": 47
        }
      ],
      "next": "s06_l692_0",
      "emotions": {
        "azalia": "worried"
      }
    },
    {
      "id": "s06_l692_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 692,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l692_1",
      "emotions": {}
    },
    {
      "id": "s06_l692_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Да, всё хорошо».",
      "source": [
        {
          "file": "dialogues",
          "line": 692,
          "start": 6,
          "end": 23
        }
      ],
      "next": "s06_l692_2",
      "emotions": {}
    },
    {
      "id": "s06_l692_2",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": " (Пауза.) ",
      "source": [
        {
          "file": "dialogues",
          "line": 692,
          "start": 23,
          "end": 33
        }
      ],
      "next": "s06_l692_3",
      "emotions": {}
    },
    {
      "id": "s06_l692_3",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«А ты почему не на квиддиче? У вас же там отбор».",
      "source": [
        {
          "file": "dialogues",
          "line": 692,
          "start": 33,
          "end": 82
        }
      ],
      "next": "choice06_03",
      "emotions": {}
    },
    {
      "id": "choice06_03",
      "type": "choice",
      "options": [
        {
          "id": "choice06_03_1",
          "text": "Сказать правду.",
          "next": "s06_l707_0",
          "source": [
            {
              "file": "dialogues",
              "line": 695,
              "start": 11,
              "end": 26
            }
          ]
        },
        {
          "id": "choice06_03_2",
          "text": "Сказать, что отбор перенесли.",
          "next": "s06_l697_1",
          "source": [
            {
              "file": "dialogues",
              "line": 696,
              "start": 11,
              "end": 40
            }
          ]
        }
      ],
      "source": [],
      "next": null,
      "emotions": {}
    },
    {
      "id": "s06_l697_1",
      "type": "narration",
      "text": "Дима смотрит на неё очень странно.",
      "cues": [],
      "source": [
        {
          "file": "dialogues",
          "line": 697,
          "start": 35,
          "end": 69
        }
      ],
      "next": "s06_l699_0",
      "emotions": {
        "dima": "skeptical"
      }
    },
    {
      "id": "s06_l699_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима (серьёзно): ",
      "source": [
        {
          "file": "dialogues",
          "line": 699,
          "start": 0,
          "end": 17
        }
      ],
      "next": "s06_l699_1",
      "emotions": {
        "dima": "skeptical"
      }
    },
    {
      "id": "s06_l699_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Просто я видел, как ребята собирались на поле и что-то бурно обсуждали.».",
      "source": [
        {
          "file": "dialogues",
          "line": 699,
          "start": 17,
          "end": 91
        }
      ],
      "next": "s06_l701_0",
      "emotions": {
        "dima": "skeptical"
      }
    },
    {
      "id": "s06_l701_0",
      "type": "narration",
      "text": "Азалия вздыхает.",
      "source": [
        {
          "file": "dialogues",
          "line": 701,
          "start": 0,
          "end": 16
        }
      ],
      "next": "s06_l703_0",
      "emotions": {}
    },
    {
      "id": "s06_l703_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 703,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s06_l703_1",
      "emotions": {}
    },
    {
      "id": "s06_l703_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ладно. Правда в том, что мне стало очень любопытно то слово».",
      "source": [
        {
          "file": "dialogues",
          "line": 703,
          "start": 8,
          "end": 70
        }
      ],
      "next": "s06_l705_0",
      "emotions": {}
    },
    {
      "id": "s06_l705_0",
      "type": "narration",
      "text": "Дима смеётся.",
      "source": [
        {
          "file": "dialogues",
          "line": 705,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s06_l707_0",
      "emotions": {}
    },
    {
      "id": "s06_l707_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 707,
          "start": 21,
          "end": 29
        }
      ],
      "next": "s06_l707_1",
      "emotions": {}
    },
    {
      "id": "s06_l707_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Я хотела найти тебя, чтобы похвалить и узнать про слово. А на квиддич не пошла: он может подождать».",
      "source": [
        {
          "file": "dialogues",
          "line": 707,
          "start": 29,
          "end": 130
        }
      ],
      "next": "s06_l709_0",
      "emotions": {}
    },
    {
      "id": "s06_l709_0",
      "type": "narration",
      "text": "Дима очень смущённо смеётся.",
      "source": [
        {
          "file": "dialogues",
          "line": 709,
          "start": 0,
          "end": 28
        }
      ],
      "cues": [
        {
          "target": "dima",
          "effect": "tilt",
          "amplitude": 1.8,
          "durationMs": 500
        }
      ],
      "next": "s06_l711_0",
      "emotions": {
        "dima": "blush"
      }
    },
    {
      "id": "s06_l711_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 711,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l711_1",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s06_l711_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Какая ты интересная. Ну, спасибо тебе большое. А по поводу слова, вот тебе подсказка: третья полка. Удачи».",
      "source": [
        {
          "file": "dialogues",
          "line": 711,
          "start": 6,
          "end": 114
        }
      ],
      "next": "s06_l713_0",
      "emotions": {
        "dima": "sly"
      }
    },
    {
      "id": "s06_l713_0",
      "type": "narration",
      "text": "Он встаёт.",
      "source": [
        {
          "file": "dialogues",
          "line": 713,
          "start": 0,
          "end": 10
        }
      ],
      "next": "s06_l715_0",
      "emotions": {}
    },
    {
      "id": "s06_l715_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Дима: ",
      "source": [
        {
          "file": "dialogues",
          "line": 715,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l715_1",
      "emotions": {}
    },
    {
      "id": "s06_l715_1",
      "type": "dialogue",
      "speaker": "dima",
      "text": "«Мне надо торопиться, меня друзья ждут. Тебе удачи ещё и на квиддиче».",
      "source": [
        {
          "file": "dialogues",
          "line": 715,
          "start": 6,
          "end": 76
        }
      ],
      "next": "s06_l717_0",
      "emotions": {}
    },
    {
      "id": "s06_l717_0",
      "type": "narration",
      "text": "Он уходит. Азалия вздыхает.",
      "source": [
        {
          "file": "dialogues",
          "line": 717,
          "start": 0,
          "end": 27
        }
      ],
      "cues": [
        {
          "effect": "group",
          "targets": [],
          "durationMs": 500
        },
        {
          "target": "dima",
          "effect": "fade",
          "to": 0,
          "side": "left",
          "durationMs": 500
        }
      ],
      "next": "s06_l719_0",
      "emotions": {}
    },
    {
      "id": "s06_l719_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 719,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s06_l719_1",
      "emotions": {}
    },
    {
      "id": "s06_l719_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Ну ладно. Зато не надо будет искать этот учебник по всей библиотеке».",
      "source": [
        {
          "file": "dialogues",
          "line": 719,
          "start": 8,
          "end": 78
        }
      ],
      "next": "s06_l721_0",
      "emotions": {}
    },
    {
      "id": "s06_l721_0",
      "type": "narration",
      "text": "Азалия оказывается на поле для квиддича.",
      "source": [
        {
          "file": "dialogues",
          "line": 721,
          "start": 0,
          "end": 40
        }
      ],
      "next": "s06_enter_quidditch",
      "emotions": {}
    },
    {
      "id": "s06_if_rose_724",
      "type": "if",
      "condition": {
        "op": "eq",
        "left": {
          "var": "roseFriend"
        },
        "right": false
      },
      "then": "s06_end",
      "source": [],
      "else": "s06_enter_quidditch_end",
      "next": null,
      "emotions": {}
    },
    {
      "id": "s06_enter_quidditch_end",
      "type": "scene",
      "action": "enter",
      "background": "bg_quidditch",
      "characters": [
        "azalia",
        "rose"
      ],
      "source": [],
      "next": "s06_l724_0",
      "emotions": {}
    },
    {
      "id": "s06_l724_0",
      "type": "narration",
      "text": "Поле для квиддича. Азалия, закончив с отбором, идёт к выходу. К ней подбегает Роуз.",
      "source": [
        {
          "file": "dialogues",
          "line": 724,
          "start": 0,
          "end": 83
        }
      ],
      "cues": [
        {
          "target": "rose",
          "effect": "bounce",
          "amplitude": 8,
          "durationMs": 500
        }
      ],
      "next": "s06_l725_0",
      "emotions": {}
    },
    {
      "id": "s06_l725_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 725,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l725_1",
      "emotions": {}
    },
    {
      "id": "s06_l725_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Ты куда сейчас?»",
      "source": [
        {
          "file": "dialogues",
          "line": 725,
          "start": 6,
          "end": 23
        }
      ],
      "next": "s06_l726_0",
      "emotions": {}
    },
    {
      "id": "s06_l726_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия: ",
      "source": [
        {
          "file": "dialogues",
          "line": 726,
          "start": 0,
          "end": 8
        }
      ],
      "next": "s06_l726_1",
      "emotions": {}
    },
    {
      "id": "s06_l726_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«В библиотеку».",
      "source": [
        {
          "file": "dialogues",
          "line": 726,
          "start": 8,
          "end": 23
        }
      ],
      "next": "s06_l727_0",
      "emotions": {}
    },
    {
      "id": "s06_l727_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 727,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l727_1",
      "emotions": {}
    },
    {
      "id": "s06_l727_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Зачем?»",
      "source": [
        {
          "file": "dialogues",
          "line": 727,
          "start": 6,
          "end": 14
        }
      ],
      "next": "s06_l729_0",
      "emotions": {}
    },
    {
      "id": "s06_l729_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Азалия (возмущённо): ",
      "source": [
        {
          "file": "dialogues",
          "line": 729,
          "start": 0,
          "end": 21
        }
      ],
      "next": "s06_l729_1",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s06_l729_1",
      "type": "dialogue",
      "speaker": "azalia",
      "text": "«Этот придурок вместо того, чтобы сразу сказать перевод, дал мне подсказку, чтобы я искала. Видимо, ему так интереснее. Как же он любит всё усложнять, это просто ужас».",
      "source": [
        {
          "file": "dialogues",
          "line": 729,
          "start": 21,
          "end": 189
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
      "next": "s06_l731_0",
      "emotions": {
        "azalia": "annoyed"
      }
    },
    {
      "id": "s06_l731_0",
      "type": "narration",
      "text": "Роуз смеётся.",
      "source": [
        {
          "file": "dialogues",
          "line": 731,
          "start": 0,
          "end": 13
        }
      ],
      "next": "s06_l733_0",
      "emotions": {}
    },
    {
      "id": "s06_l733_0",
      "type": "scene",
      "action": "cue",
      "annotation": "Роуз: ",
      "source": [
        {
          "file": "dialogues",
          "line": 733,
          "start": 0,
          "end": 6
        }
      ],
      "next": "s06_l733_1",
      "emotions": {}
    },
    {
      "id": "s06_l733_1",
      "type": "dialogue",
      "speaker": "rose",
      "text": "«Ну пошли тогда».",
      "source": [
        {
          "file": "dialogues",
          "line": 733,
          "start": 6,
          "end": 23
        }
      ],
      "next": "s06_l735_1",
      "emotions": {}
    },
    {
      "id": "s06_l735_1",
      "type": "scene",
      "action": "cue",
      "narration": true,
      "annotation": "Роуз, смеясь, идёт вместе с Азалией в библиотеку.",
      "source": [
        {
          "file": "dialogues",
          "line": 735,
          "start": 15,
          "end": 64
        }
      ],
      "next": "s06_cs06",
      "emotions": {}
    },
    {
      "id": "s06_cs06",
      "type": "cutscene",
      "cutsceneId": "cs06_to_library",
      "source": [],
      "next": "s06_end",
      "emotions": {}
    },
    {
      "id": "s06_end",
      "type": "end",
      "nextScene": "scene07",
      "source": [],
      "next": null,
      "emotions": {}
    }
  ],
  "sourceLedger": [
    {
      "line": 613,
      "parts": [
        {
          "start": 0,
          "end": 24,
          "kind": "metadata",
          "text": "Сцена 6. Дуэль и квиддич"
        }
      ],
      "original": "Сцена 6. Дуэль и квиддич"
    },
    {
      "line": 614,
      "parts": [],
      "original": ""
    },
    {
      "line": 615,
      "parts": [
        {
          "start": 0,
          "end": 50,
          "kind": "metadata",
          "text": "Где: дуэльный зал, поле для квиддича, Чёрное озеро"
        }
      ],
      "original": "Где: дуэльный зал, поле для квиддича, Чёрное озеро"
    },
    {
      "line": 616,
      "parts": [],
      "original": ""
    },
    {
      "line": 617,
      "parts": [
        {
          "start": 0,
          "end": 163,
          "kind": "narration",
          "node": "s06_l617_0",
          "field": "text"
        }
      ],
      "original": "Дуэльный зал. Длинная каменная платформа, вокруг трибуны для учеников. Азалию вызывают на платформу. Напротив неё стоит Малфой и смотрит с нескрываемой ненавистью."
    },
    {
      "line": 618,
      "parts": [],
      "original": ""
    },
    {
      "line": 619,
      "parts": [
        {
          "start": 0,
          "end": 36,
          "kind": "stage",
          "node": "s06_l619_0",
          "field": "annotation"
        },
        {
          "start": 36,
          "end": 58,
          "kind": "dialogue",
          "node": "s06_l619_1",
          "field": "text"
        }
      ],
      "original": "Тео (с трибуны, размахивая руками): «АЗАЛИЯ! РАЗНЕСИ ЕГО!»"
    },
    {
      "line": 620,
      "parts": [],
      "original": ""
    },
    {
      "line": 621,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "stage",
          "node": "s06_l621_0",
          "field": "annotation"
        },
        {
          "start": 27,
          "end": 44,
          "kind": "dialogue",
          "node": "s06_l621_1",
          "field": "text"
        }
      ],
      "original": "Роуз (рядом, подпрыгивая): «ДА! ПОКАЖИ ЕМУ!»"
    },
    {
      "line": 622,
      "parts": [],
      "original": ""
    },
    {
      "line": 623,
      "parts": [
        {
          "start": 0,
          "end": 85,
          "kind": "narration",
          "node": "s06_l623_0",
          "field": "text"
        }
      ],
      "original": "Азалия поднимает палочку и незаметно обводит взглядом трибуны. Она ищет глазами Диму."
    },
    {
      "line": 624,
      "parts": [],
      "original": ""
    },
    {
      "line": 625,
      "parts": [
        {
          "start": 0,
          "end": 14,
          "kind": "stage",
          "node": "s06_l625_0",
          "field": "annotation"
        },
        {
          "start": 14,
          "end": 118,
          "kind": "thought",
          "node": "s06_l625_1",
          "field": "text"
        }
      ],
      "original": "Мысли Азалии: «Где он? Почему я вообще его ищу? После той ночи я веду себя по отношению к нему максимально странно...»"
    },
    {
      "line": 626,
      "parts": [],
      "original": ""
    },
    {
      "line": 627,
      "parts": [
        {
          "start": 0,
          "end": 52,
          "kind": "metadata",
          "text": "Дуэль. Мини-игра. Азалия побеждает при любом исходе."
        }
      ],
      "original": "Дуэль. Мини-игра. Азалия побеждает при любом исходе."
    },
    {
      "line": 628,
      "parts": [],
      "original": ""
    },
    {
      "line": 629,
      "parts": [
        {
          "start": 0,
          "end": 102,
          "kind": "narration",
          "node": "s06_l629_0",
          "field": "text"
        }
      ],
      "original": "Малфой отлетает назад, спотыкается и падает. Трибуны взрываются криками. Тео и Роуз вопят от восторга."
    },
    {
      "line": 630,
      "parts": [],
      "original": ""
    },
    {
      "line": 631,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "stage",
          "node": "s06_l631_0",
          "field": "annotation"
        },
        {
          "start": 15,
          "end": 63,
          "kind": "dialogue",
          "node": "s06_l631_1",
          "field": "text"
        }
      ],
      "original": "Преподаватель: «Следующая дуэль: Тео Блэк и Дмитрий Де Нестер»."
    },
    {
      "line": 632,
      "parts": [],
      "original": ""
    },
    {
      "line": 633,
      "parts": [
        {
          "start": 0,
          "end": 109,
          "kind": "narration",
          "node": "s06_l633_0",
          "field": "text"
        }
      ],
      "original": "Тео выходит на платформу, широко улыбаясь. Дима занимает место напротив. Короткий поклон, и дуэль начинается."
    },
    {
      "line": 634,
      "parts": [],
      "original": ""
    },
    {
      "line": 635,
      "parts": [
        {
          "start": 0,
          "end": 202,
          "kind": "narration",
          "node": "s06_l635_0",
          "field": "text"
        }
      ],
      "original": "Заклинания вспыхивают и разлетаются в стороны, зал замирает. Дуэль длится на удивление долго. Дима держится достойно, но в конце концов Тео оказывается проворнее, и палочка Димы вылетает у него из руки."
    },
    {
      "line": 636,
      "parts": [],
      "original": ""
    },
    {
      "line": 637,
      "parts": [
        {
          "start": 0,
          "end": 75,
          "kind": "narration",
          "node": "s06_l637_0",
          "field": "text"
        }
      ],
      "original": "Дима, тяжело дыша, смеётся, поднимается и подходит к Тео. Протягивает руку."
    },
    {
      "line": 638,
      "parts": [],
      "original": ""
    },
    {
      "line": 639,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l639_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 27,
          "kind": "dialogue",
          "node": "s06_l639_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Хорошая была дуэль»."
    },
    {
      "line": 640,
      "parts": [],
      "original": ""
    },
    {
      "line": 641,
      "parts": [
        {
          "start": 0,
          "end": 26,
          "kind": "stage",
          "node": "s06_l641_0",
          "field": "annotation"
        },
        {
          "start": 26,
          "end": 77,
          "kind": "dialogue",
          "node": "s06_l641_1",
          "field": "text"
        }
      ],
      "original": "Тео (пожимая руку, сияя): «Надо будет повторить. Мне понравилась наша дуэль»."
    },
    {
      "line": 642,
      "parts": [],
      "original": ""
    },
    {
      "line": 643,
      "parts": [
        {
          "start": 0,
          "end": 282,
          "kind": "narration",
          "node": "s06_l643_0",
          "field": "text"
        }
      ],
      "original": "Урок заканчивается. Азалия поспешно собирает вещи и ищет Диму: она хочет спросить, как переводится то слово, и похвалить его, сказав, что далеко не каждый смог бы так долго выстоять против Тео. Она расспрашивает всех подряд. Наконец кто-то говорит ей, что Дима ушёл к Чёрному озеру."
    },
    {
      "line": 644,
      "parts": [],
      "original": ""
    },
    {
      "line": 645,
      "parts": [
        {
          "start": 0,
          "end": 48,
          "kind": "narration",
          "node": "s06_l645_0",
          "field": "text"
        }
      ],
      "original": "Она разворачивается и сталкивается с Роуз и Тео."
    },
    {
      "line": 646,
      "parts": [],
      "original": ""
    },
    {
      "line": 647,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l647_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 58,
          "kind": "dialogue",
          "node": "s06_l647_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Азалия! Ты пойдёшь на отборы в квиддич? Или позже?»"
    },
    {
      "line": 648,
      "parts": [],
      "original": ""
    },
    {
      "line": 649,
      "parts": [
        {
          "start": 0,
          "end": 18,
          "kind": "stage",
          "node": "s06_l649_0",
          "field": "annotation"
        },
        {
          "start": 18,
          "end": 47,
          "kind": "dialogue",
          "node": "s06_l649_1",
          "field": "text"
        }
      ],
      "original": "Азалия (замирая): «Чёрт. Точно. Совсем забыла!»"
    },
    {
      "line": 650,
      "parts": [],
      "original": ""
    },
    {
      "line": 651,
      "parts": [
        {
          "start": 0,
          "end": 18,
          "kind": "metadata",
          "text": "ВЫБОР: куда пойти?"
        }
      ],
      "original": "ВЫБОР: куда пойти?"
    },
    {
      "line": 652,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 1. "
        },
        {
          "start": 11,
          "end": 39,
          "kind": "choice",
          "node": "choice06_01",
          "option": "choice06_01_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. Искать Диму у Чёрного озера."
    },
    {
      "line": 653,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 2. "
        },
        {
          "start": 11,
          "end": 38,
          "kind": "choice",
          "node": "choice06_01",
          "option": "choice06_01_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. Идти на отборы по квиддичу."
    },
    {
      "line": 654,
      "parts": [
        {
          "start": 0,
          "end": 29,
          "kind": "metadata",
          "text": "Вариант 2. Отборы по квиддичу"
        }
      ],
      "original": "Вариант 2. Отборы по квиддичу"
    },
    {
      "line": 655,
      "parts": [
        {
          "start": 0,
          "end": 203,
          "kind": "narration",
          "node": "s06_l655_0",
          "field": "text"
        }
      ],
      "original": "Поле для квиддича. Яркое солнце, на трибунах шумят ученики. Азалия выходит на стартовую линию. У самого края поля среди зрителей стоит Дима: он решил не пропустить момент, когда Азалия вступит в команду."
    },
    {
      "line": 656,
      "parts": [
        {
          "start": 0,
          "end": 30,
          "kind": "metadata",
          "text": "Мини-игра: отборы по квиддичу."
        }
      ],
      "original": "Мини-игра: отборы по квиддичу."
    },
    {
      "line": 657,
      "parts": [
        {
          "start": 0,
          "end": 32,
          "kind": "metadata",
          "text": "Если Азалия проходит мини-игру, "
        },
        {
          "start": 32,
          "end": 69,
          "kind": "narration",
          "node": "s06_l657_1",
          "field": "text"
        }
      ],
      "original": "Если Азалия проходит мини-игру, она спускается на землю и видит Диму."
    },
    {
      "line": 658,
      "parts": [
        {
          "start": 0,
          "end": 19,
          "kind": "metadata",
          "text": "ВЫБОР: к кому идти?"
        }
      ],
      "original": "ВЫБОР: к кому идти?"
    },
    {
      "line": 659,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 1. "
        },
        {
          "start": 11,
          "end": 35,
          "kind": "choice",
          "node": "choice06_02",
          "option": "choice06_02_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. Пойти к Диме хвастаться."
    },
    {
      "line": 660,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 2. "
        },
        {
          "start": 11,
          "end": 38,
          "kind": "choice",
          "node": "choice06_02",
          "option": "choice06_02_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. Пойти к друзьям хвастаться."
    },
    {
      "line": 661,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "metadata",
          "text": "Если к друзьям. "
        },
        {
          "start": 16,
          "end": 67,
          "kind": "narration",
          "node": "s06_l661_1",
          "field": "text"
        }
      ],
      "original": "Если к друзьям. Дима сам подходит к ним и, улыбаясь, хвалит Азалию."
    },
    {
      "line": 662,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l662_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 70,
          "kind": "dialogue",
          "node": "s06_l662_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Чтож ты была как обычно бесподобно, но это все равно удивляет»."
    },
    {
      "line": 663,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "metadata",
          "text": "Если к Диме. "
        },
        {
          "start": 13,
          "end": 112,
          "kind": "narration",
          "node": "s06_l663_1",
          "field": "text"
        }
      ],
      "original": "Если к Диме. Азалия подбегает и взахлёб рассказывает, как обошла соперников. Дима слушает и осыпает её похвалой."
    },
    {
      "line": 664,
      "parts": [
        {
          "start": 0,
          "end": 33,
          "kind": "metadata",
          "text": "В обоих случаях дальше одинаково."
        }
      ],
      "original": "В обоих случаях дальше одинаково."
    },
    {
      "line": 665,
      "parts": [
        {
          "start": 0,
          "end": 23,
          "kind": "stage",
          "node": "s06_l665_0",
          "field": "annotation"
        },
        {
          "start": 23,
          "end": 53,
          "kind": "dialogue",
          "node": "s06_l665_1",
          "field": "text"
        }
      ],
      "original": "Азалия (вдруг, резко): «Кстати! Что значит то слово?»"
    },
    {
      "line": 666,
      "parts": [
        {
          "start": 0,
          "end": 17,
          "kind": "stage",
          "node": "s06_l666_0",
          "field": "annotation"
        },
        {
          "start": 17,
          "end": 38,
          "kind": "dialogue",
          "node": "s06_l666_1",
          "field": "text"
        }
      ],
      "original": "Дима (улыбаясь): «Вот тебе подсказка»."
    },
    {
      "line": 667,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s06_l667_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 36,
          "kind": "dialogue",
          "node": "s06_l667_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «А может, ты сразу скажешь?»"
    },
    {
      "line": 668,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l668_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 99,
          "kind": "dialogue",
          "node": "s06_l668_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Так неинтересно. Поэтому иди ищи книгу, которая начинается на «и» и стоит на третьей полке»."
    },
    {
      "line": 669,
      "parts": [
        {
          "start": 0,
          "end": 23,
          "kind": "metadata",
          "text": "Вариант 1. Чёрное озеро"
        }
      ],
      "original": "Вариант 1. Чёрное озеро"
    },
    {
      "line": 670,
      "parts": [
        {
          "start": 0,
          "end": 228,
          "kind": "narration",
          "node": "s06_l670_0",
          "field": "text"
        }
      ],
      "original": "Чёрное озеро. Тихий ветер, вода блестит на солнце. Под раскидистым деревом сидит Дима и читает книгу. К нему направляется Малфой с ухмылкой, и на конце его палочки уже собирается вода: он хочет облить Диму и испортить ему книгу."
    },
    {
      "line": 671,
      "parts": [],
      "original": ""
    },
    {
      "line": 672,
      "parts": [
        {
          "start": 0,
          "end": 22,
          "kind": "stage",
          "node": "s06_l672_0",
          "field": "annotation"
        },
        {
          "start": 22,
          "end": 32,
          "kind": "dialogue",
          "node": "s06_l672_1",
          "field": "text"
        }
      ],
      "original": "Азалия (сквозь зубы): «Вот гад»."
    },
    {
      "line": 673,
      "parts": [],
      "original": ""
    },
    {
      "line": 674,
      "parts": [
        {
          "start": 0,
          "end": 189,
          "kind": "narration",
          "node": "s06_l674_0",
          "field": "text"
        }
      ],
      "original": "Она уже собирается вмешаться, но Дима опережает её. Не поднимая головы от книги, он произносит заклинание. Малфоя подбрасывает в воздух, и он с громким плеском падает в озеро. Дима смеётся."
    },
    {
      "line": 675,
      "parts": [],
      "original": ""
    },
    {
      "line": 676,
      "parts": [
        {
          "start": 0,
          "end": 35,
          "kind": "narration",
          "node": "s06_l676_0",
          "field": "text"
        }
      ],
      "original": "Мимо Азалии пулей проносится Пэнси."
    },
    {
      "line": 677,
      "parts": [],
      "original": ""
    },
    {
      "line": 678,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "stage",
          "node": "s06_l678_0",
          "field": "annotation"
        },
        {
          "start": 15,
          "end": 83,
          "kind": "dialogue",
          "node": "s06_l678_1",
          "field": "text"
        }
      ],
      "original": "Пэнси (визжа): «Малфой, быстрее вставай! Давай, мой хорошенький, быстрее, быстрее!»"
    },
    {
      "line": 679,
      "parts": [],
      "original": ""
    },
    {
      "line": 680,
      "parts": [
        {
          "start": 0,
          "end": 105,
          "kind": "narration",
          "node": "s06_l680_0",
          "field": "text"
        }
      ],
      "original": "Малфой, мокрый и взбешённый, выбирается на берег и начинает орать на Диму, но Пэнси хватает его под руку."
    },
    {
      "line": 681,
      "parts": [],
      "original": ""
    },
    {
      "line": 682,
      "parts": [
        {
          "start": 0,
          "end": 7,
          "kind": "stage",
          "node": "s06_l682_0",
          "field": "annotation"
        },
        {
          "start": 7,
          "end": 38,
          "kind": "dialogue",
          "node": "s06_l682_1",
          "field": "text"
        }
      ],
      "original": "Пэнси: «Всё-всё, хватит, мой хороший»."
    },
    {
      "line": 683,
      "parts": [],
      "original": ""
    },
    {
      "line": 684,
      "parts": [
        {
          "start": 0,
          "end": 50,
          "kind": "narration",
          "node": "s06_l684_0",
          "field": "text"
        }
      ],
      "original": "Она уводит его под ручку. Азалия смотрит им вслед."
    },
    {
      "line": 685,
      "parts": [],
      "original": ""
    },
    {
      "line": 686,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "stage",
          "node": "s06_l686_0",
          "field": "annotation"
        },
        {
          "start": 15,
          "end": 24,
          "kind": "dialogue",
          "node": "s06_l686_1",
          "field": "text"
        }
      ],
      "original": "Азалия (тихо): «Пиздец»."
    },
    {
      "line": 687,
      "parts": [],
      "original": ""
    },
    {
      "line": 688,
      "parts": [
        {
          "start": 0,
          "end": 42,
          "kind": "narration",
          "node": "s06_l688_0",
          "field": "text"
        }
      ],
      "original": "Затем она подходит к Диме и садится рядом."
    },
    {
      "line": 689,
      "parts": [],
      "original": ""
    },
    {
      "line": 690,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s06_l690_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 47,
          "kind": "dialogue",
          "node": "s06_l690_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Всё хорошо? Ты просто так резко ушёл»."
    },
    {
      "line": 691,
      "parts": [],
      "original": ""
    },
    {
      "line": 692,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l692_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 23,
          "kind": "dialogue",
          "node": "s06_l692_1",
          "field": "text"
        },
        {
          "start": 23,
          "end": 33,
          "kind": "stage",
          "node": "s06_l692_2",
          "field": "annotation"
        },
        {
          "start": 33,
          "end": 82,
          "kind": "dialogue",
          "node": "s06_l692_3",
          "field": "text"
        }
      ],
      "original": "Дима: «Да, всё хорошо». (Пауза.) «А ты почему не на квиддиче? У вас же там отбор»."
    },
    {
      "line": 693,
      "parts": [],
      "original": ""
    },
    {
      "line": 694,
      "parts": [
        {
          "start": 0,
          "end": 20,
          "kind": "metadata",
          "text": "ВЫБОР: что ответить?"
        }
      ],
      "original": "ВЫБОР: что ответить?"
    },
    {
      "line": 695,
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
          "node": "choice06_03",
          "option": "choice06_03_1",
          "field": "text"
        }
      ],
      "original": "Вариант 1. Сказать правду."
    },
    {
      "line": 696,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Вариант 2. "
        },
        {
          "start": 11,
          "end": 40,
          "kind": "choice",
          "node": "choice06_03",
          "option": "choice06_03_2",
          "field": "text"
        }
      ],
      "original": "Вариант 2. Сказать, что отбор перенесли."
    },
    {
      "line": 697,
      "parts": [
        {
          "start": 0,
          "end": 35,
          "kind": "metadata",
          "text": "Если сказать, что отбор перенесли. "
        },
        {
          "start": 35,
          "end": 69,
          "kind": "narration",
          "node": "s06_l697_1",
          "field": "text"
        }
      ],
      "original": "Если сказать, что отбор перенесли. Дима смотрит на неё очень странно."
    },
    {
      "line": 698,
      "parts": [],
      "original": ""
    },
    {
      "line": 699,
      "parts": [
        {
          "start": 0,
          "end": 17,
          "kind": "stage",
          "node": "s06_l699_0",
          "field": "annotation"
        },
        {
          "start": 17,
          "end": 91,
          "kind": "dialogue",
          "node": "s06_l699_1",
          "field": "text"
        }
      ],
      "original": "Дима (серьёзно): «Просто я видел, как ребята собирались на поле и что-то бурно обсуждали.»."
    },
    {
      "line": 700,
      "parts": [],
      "original": ""
    },
    {
      "line": 701,
      "parts": [
        {
          "start": 0,
          "end": 16,
          "kind": "narration",
          "node": "s06_l701_0",
          "field": "text"
        }
      ],
      "original": "Азалия вздыхает."
    },
    {
      "line": 702,
      "parts": [],
      "original": ""
    },
    {
      "line": 703,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s06_l703_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 70,
          "kind": "dialogue",
          "node": "s06_l703_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ладно. Правда в том, что мне стало очень любопытно то слово»."
    },
    {
      "line": 704,
      "parts": [],
      "original": ""
    },
    {
      "line": 705,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "narration",
          "node": "s06_l705_0",
          "field": "text"
        },
        {
          "start": 13,
          "end": 43,
          "kind": "metadata",
          "text": " Дальше как в ветке с правдой."
        }
      ],
      "original": "Дима смеётся. Дальше как в ветке с правдой."
    },
    {
      "line": 706,
      "parts": [],
      "original": ""
    },
    {
      "line": 707,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "metadata",
          "text": "Если сказать правду. "
        },
        {
          "start": 21,
          "end": 29,
          "kind": "stage",
          "node": "s06_l707_0",
          "field": "annotation"
        },
        {
          "start": 29,
          "end": 130,
          "kind": "dialogue",
          "node": "s06_l707_1",
          "field": "text"
        }
      ],
      "original": "Если сказать правду. Азалия: «Я хотела найти тебя, чтобы похвалить и узнать про слово. А на квиддич не пошла: он может подождать»."
    },
    {
      "line": 708,
      "parts": [],
      "original": ""
    },
    {
      "line": 709,
      "parts": [
        {
          "start": 0,
          "end": 28,
          "kind": "narration",
          "node": "s06_l709_0",
          "field": "text"
        }
      ],
      "original": "Дима очень смущённо смеётся."
    },
    {
      "line": 710,
      "parts": [],
      "original": ""
    },
    {
      "line": 711,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l711_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 114,
          "kind": "dialogue",
          "node": "s06_l711_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Какая ты интересная. Ну, спасибо тебе большое. А по поводу слова, вот тебе подсказка: третья полка. Удачи»."
    },
    {
      "line": 712,
      "parts": [],
      "original": ""
    },
    {
      "line": 713,
      "parts": [
        {
          "start": 0,
          "end": 10,
          "kind": "narration",
          "node": "s06_l713_0",
          "field": "text"
        }
      ],
      "original": "Он встаёт."
    },
    {
      "line": 714,
      "parts": [],
      "original": ""
    },
    {
      "line": 715,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l715_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 76,
          "kind": "dialogue",
          "node": "s06_l715_1",
          "field": "text"
        }
      ],
      "original": "Дима: «Мне надо торопиться, меня друзья ждут. Тебе удачи ещё и на квиддиче»."
    },
    {
      "line": 716,
      "parts": [],
      "original": ""
    },
    {
      "line": 717,
      "parts": [
        {
          "start": 0,
          "end": 27,
          "kind": "narration",
          "node": "s06_l717_0",
          "field": "text"
        }
      ],
      "original": "Он уходит. Азалия вздыхает."
    },
    {
      "line": 718,
      "parts": [],
      "original": ""
    },
    {
      "line": 719,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s06_l719_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 78,
          "kind": "dialogue",
          "node": "s06_l719_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «Ну ладно. Зато не надо будет искать этот учебник по всей библиотеке»."
    },
    {
      "line": 720,
      "parts": [],
      "original": ""
    },
    {
      "line": 721,
      "parts": [
        {
          "start": 0,
          "end": 40,
          "kind": "narration",
          "node": "s06_l721_0",
          "field": "text"
        },
        {
          "start": 40,
          "end": 139,
          "kind": "metadata",
          "text": " Здесь всё так же, как при выборе отборов, только Дима просто хвалит её, без уточнений и подсказок."
        }
      ],
      "original": "Азалия оказывается на поле для квиддича. Здесь всё так же, как при выборе отборов, только Дима просто хвалит её, без уточнений и подсказок."
    },
    {
      "line": 722,
      "parts": [],
      "original": ""
    },
    {
      "line": 723,
      "parts": [
        {
          "start": 0,
          "end": 11,
          "kind": "metadata",
          "text": "Общий финал"
        }
      ],
      "original": "Общий финал"
    },
    {
      "line": 724,
      "parts": [
        {
          "start": 0,
          "end": 83,
          "kind": "narration",
          "node": "s06_l724_0",
          "field": "text"
        }
      ],
      "original": "Поле для квиддича. Азалия, закончив с отбором, идёт к выходу. К ней подбегает Роуз."
    },
    {
      "line": 725,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l725_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 23,
          "kind": "dialogue",
          "node": "s06_l725_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Ты куда сейчас?»"
    },
    {
      "line": 726,
      "parts": [
        {
          "start": 0,
          "end": 8,
          "kind": "stage",
          "node": "s06_l726_0",
          "field": "annotation"
        },
        {
          "start": 8,
          "end": 23,
          "kind": "dialogue",
          "node": "s06_l726_1",
          "field": "text"
        }
      ],
      "original": "Азалия: «В библиотеку»."
    },
    {
      "line": 727,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l727_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 14,
          "kind": "dialogue",
          "node": "s06_l727_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Зачем?»"
    },
    {
      "line": 728,
      "parts": [],
      "original": ""
    },
    {
      "line": 729,
      "parts": [
        {
          "start": 0,
          "end": 21,
          "kind": "stage",
          "node": "s06_l729_0",
          "field": "annotation"
        },
        {
          "start": 21,
          "end": 189,
          "kind": "dialogue",
          "node": "s06_l729_1",
          "field": "text"
        }
      ],
      "original": "Азалия (возмущённо): «Этот придурок вместо того, чтобы сразу сказать перевод, дал мне подсказку, чтобы я искала. Видимо, ему так интереснее. Как же он любит всё усложнять, это просто ужас»."
    },
    {
      "line": 730,
      "parts": [],
      "original": ""
    },
    {
      "line": 731,
      "parts": [
        {
          "start": 0,
          "end": 13,
          "kind": "narration",
          "node": "s06_l731_0",
          "field": "text"
        }
      ],
      "original": "Роуз смеётся."
    },
    {
      "line": 732,
      "parts": [],
      "original": ""
    },
    {
      "line": 733,
      "parts": [
        {
          "start": 0,
          "end": 6,
          "kind": "stage",
          "node": "s06_l733_0",
          "field": "annotation"
        },
        {
          "start": 6,
          "end": 23,
          "kind": "dialogue",
          "node": "s06_l733_1",
          "field": "text"
        }
      ],
      "original": "Роуз: «Ну пошли тогда»."
    },
    {
      "line": 734,
      "parts": [],
      "original": ""
    },
    {
      "line": 735,
      "parts": [
        {
          "start": 0,
          "end": 15,
          "kind": "metadata",
          "text": "Конец сцены 6. "
        },
        {
          "start": 15,
          "end": 64,
          "kind": "stage",
          "node": "s06_l735_1",
          "field": "annotation"
        }
      ],
      "original": "Конец сцены 6. Роуз, смеясь, идёт вместе с Азалией в библиотеку."
    },
    {
      "line": 736,
      "parts": [],
      "original": ""
    }
  ]
};

"""Short reactions from the user's 2026-11-17 scene map.

Ranges never propagate to source-free nodes. The two expressly requested holds
are Rose's fear during the duel and Azalia's blush through her quiet goodnight.
"""
SCHEDULE = {
 'azalia_bored': [(78,82)],
 'azalia_shock': [(195,195),(199,199),(543,543)],
 'azalia_annoyed': [(148,148),(377,377),(499,503),(507,507),(517,522),
                    (557,557),(729,729),(753,753),(875,877)],
 'azalia_angry': [(166,166),(330,332),(399,399),(411,411),
                  (579,579),(585,585),(607,607),(627,627),(672,672)],
 'azalia_blush': [(431,431),(435,435),(527,529),(589,589),
                  (766,768),(856,856),(895,895),(965,965)],
 'azalia_smile': [(229,233),(253,253),(487,487),(862,864),
                  (925,927),(931,931),(951,951),(971,972),(975,976)],
 'azalia_sad': [(51,51),(115,115),(119,119),(832,834),(917,917)],
 'dima_love': [(158,162),(185,185),(429,429),(433,433),(499,499),(965,965)],
 'dima_blush': [(458,460),(709,711),(862,864),(971,972),(975,976)],
 'dima_serious': [(440,442),(812,814),(818,822)],
 'dima_surprise': [(699,699),(810,810)],
 'dima_tired': [(448,452)],
 'theo_laugh': [(34,34),(49,49),(174,174),(180,181),(925,927),(931,931)],
 'theo_pout': [(88,88),(152,152),(235,235),(251,251)],
 'theo_suspicious': [(142,144),(543,543),(806,806),(816,818),(907,907)],
 'theo_angry': [(782,784),(788,788),(812,812)],
 'rose_tease': [(501,501),(505,505),(519,519),(525,525),(531,531),
                 (747,747),(751,751),(887,887)],
 'rose_delight': [(768,770),(778,780)],
 'rose_fear': [(381,407),(439,440)],
 'rose_guilty': [(792,792),(877,881)],
 'malfoy_angry': [(389,389),(617,619),(670,670)],
 'malfoy_hysteria_dry': [(342,346)],
 'malfoy_hysteria_wet': [(680,682)],
 'malfoy_fear': [(444,444)],
 'regulus_soft': [(38,40)],
 'regulus_surprise': [(43,43)],
 'elizabeth_tender': [(38,40)],
 'andromeda_tears': [(45,45)],
 'cedric_laugh': [(229,233)],
 'pansy_peace': [(336,338),(682,682)],
 'pansy_panic': [(676,678)],
 'nott_disdain': [(348,350)],
 'harry_confused': [(277,279)],
 'harry_grateful': [(314,314)],
 'hermione_indignant': [(302,302)],
 'hermione_worried': [(483,483)],
 'ron_frown': [(308,308),(477,479)],
 'ron_laugh': [(487,487)],
 'sprout_shout': [(961,963)],
}

# A source line can contain several dialogue steps. Target the precise step.
NODE_EMOTIONS = {
 's08_l810_2': {'dima': 'serious'},
 'choice10_01': {'dima': 'love', 'azalia': 'blush'},
 's09_l891_3': {'rose': 'tease', 'azalia':'shy'},
 's08_l824_2': {},
 's08_l824_3': {},
 's07_if_rose_after_766': {'azalia':'desk_down'},
}

# Overrides take precedence over the older facial expressions at these exact beats.
PACK2 = {
 'azalia_resolve': [36,185,844,846],
 'azalia_thought': [119,205,207,561,625,895],
 'azalia_worried': [417,690],
 'azalia_shy': [187,492,591],
 'azalia_tender': [603,842,972,976],
 'azalia_wand_draw': [398,399,401,403,405,623,627],
 'azalia_wand_stance': [579,581],
 'azalia_desk_down': [766,768,770,772,774],
 'azalia_blush': [765],
 'azalia_smile': [241,243],
 'cedric_laugh': [241,243],
 'dima_sly': [666,668,711,848],
 'dima_worried': [421,830,832],
 'dima_relief': [448,450,824],
 'dima_skeptical': [697,699],
 'dima_disappointed': [571,573],
 'dima_love': [850,971,975],
 'theo_care': [146,209,211,533,535],
 'theo_restrained': [804,806],
 'theo_accept': [539,824,911,913],
 'theo_touched': [49,925,927],
 'rose_defiant': [385],
 'rose_relief': [419],
 'rose_blush': [887,888],
}
PAIRED = {
 'pose_andromeda_hug': [43,45],
 'pose_cedric_hug': [229,231,233,235,237,239],
 'pose_stupenda_whisper': [593,595],
 'pose_bench_hug': [836,838,840,850,852],
 'pose_theo_hug': [919,921],
 'pose_earmuffs': [965,967],
 'pose_kiss': [970,973,977],
}

def apply_emotions(scene):
    ledger = {p['node']:r['line'] for r in scene['sourceLedger'] for p in r['parts']
              if 'node' in p and 'option' not in p}
    for node in scene['nodes']:
        refs = [s['line'] for s in node.get('source', []) if s.get('file') == 'dialogues']
        line = refs[0] if refs else ledger.get(node['id'])
        snapshot = {}
        if line is not None and node['type'] not in ('end', 'cutscene') and not (
            node['type'] == 'scene' and node.get('action') == 'enter'
        ):
            for asset, intervals in SCHEDULE.items():
                if any(a <= line <= b for a, b in intervals):
                    character, emotion = asset.split('_', 1)
                    assert character not in snapshot, (node['id'], character)
                    snapshot[character] = emotion
            for asset, lines in PACK2.items():
                if line in lines:
                    character, emotion = asset.split('_',1)
                    snapshot[character] = emotion
        if node['id'] in NODE_EMOTIONS:
            snapshot = dict(NODE_EMOTIONS[node['id']])
        pose = next((asset for asset,lines in PAIRED.items() if line in lines), None)
        if node['id']=='choice10_01': pose='pose_earmuffs'
        if pose: node['pose']=pose
        else: node.pop('pose',None)
        node['emotions'] = snapshot
    return scene

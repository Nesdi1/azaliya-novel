"""Deterministic scene01 transfer pilot; later scenes need reviewed transfer maps."""
import json,hashlib,argparse
from pathlib import Path
P=Path(__file__).resolve().parents[1]
def build():
 ap=argparse.ArgumentParser();ap.add_argument('--scene',type=int,default=1);args=ap.parse_args()
 if args.scene!=1:
  if not 2<=args.scene<=10:raise SystemExit('Scene must be 1..10')
  plan=P/f'tools/story_maps/scene{args.scene:02}.json'
  if not plan.exists():raise SystemExit('Missing reviewed map: '+str(plan))
  data=json.loads(plan.read_text(encoding='utf-8'));src=P.parent/'raw_files/диалоги.txt';full=src.read_text(encoding='utf-8').splitlines();nodes={n['id']:n for n in data['nodes']}
  for row in data['sourceLedger']:
   text=full[row['line']-1];row['original']=text
   for part in row['parts']:
    value=text[part['start']:part['end']]
    if 'node' in part:
     node=nodes[part['node']];node[part['field']]=value;node['source']=[dict(file='dialogues',line=row['line'],start=part['start'],end=part['end'])]
    else:part['text']=value
  data['sourceSha256']=hashlib.sha256(src.read_bytes()).hexdigest()
  from verify_story import verify
  out=P/f'src/data/story/scene{args.scene:02}.js';out.parent.mkdir(parents=True,exist_ok=True);temp=P/f'audit/build_scene{args.scene:02}.js'
  temp.write_text('export default '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8');report=verify(temp)
  if report['errors']:raise SystemExit(json.dumps(report,ensure_ascii=False))
  temp.replace(out);print('Built and verified '+out.name);return
 src=P.parent/'raw_files/диалоги.txt';lines=src.read_text(encoding='utf-8').splitlines()[:60]
 speakers={8:'regulus',12:'regulus',14:'regulus',18:'regulus',24:'elizabeth',26:'elizabeth',29:'elizabeth',32:'elizabeth',34:'theo',36:'azalia',40:'regulus',42:'andromeda',45:'andromeda',49:'theo',51:'azalia',55:'regulus',57:'elizabeth'}
 narration_cues={'s01_l010_0','s01_l016_0','s01_l022_0','s01_l028_0','s01_l031_0','s01_l038_0','s01_l043_0','s01_l047_0','s01_l053_0'}
 stage_cues={
  's01_l006_0':[dict(target='regulus',effect='focus'),dict(target='regulus',effect='breathe',durationMs=2800)],
  's01_l010_0':[dict(target='elizabeth',effect='focus'),dict(target='elizabeth',effect='tilt',amplitude=-1.8,durationMs=500)],
  's01_l016_0':[dict(target='elizabeth',effect='focus'),dict(target='elizabeth',effect='tilt',amplitude=-2,durationMs=550),dict(target='regulus',effect='focus',delayMs=450)],
  's01_l022_0':[dict(target='elizabeth',effect='focus'),dict(effect='group',targets=['elizabeth','theo','azalia'],durationMs=650),dict(target='elizabeth',effect='tilt',amplitude=2,durationMs=500)],
  's01_l026_0':[dict(target='elizabeth',effect='shake',amplitude=3.5,durationMs=450)],
  's01_l028_0':[dict(target='elizabeth',effect='focus'),dict(target='elizabeth',effect='tilt',amplitude=1.8,durationMs=500)],
  's01_l031_0':[dict(target='elizabeth',effect='focus'),dict(target='elizabeth',effect='tilt',amplitude=-1.8,durationMs=500)],
  's01_l032_0':[dict(target='elizabeth',effect='shake',amplitude=4,durationMs=450)],
  's01_l034_0':[dict(effect='group',targets=[],durationMs=550),dict(target='theo',effect='bounce',amplitude=8,durationMs=560)],
  's01_l036_0':[dict(target='azalia',effect='tilt',amplitude=-2,durationMs=500)],
  's01_l038_0':[
   dict(target='elizabeth',effect='focus'),
   dict(effect='group',targets=['regulus','elizabeth','theo','azalia'],durationMs=700),
   dict(target='elizabeth',effect='tilt',amplitude=2,hold=True,durationMs=600),
   dict(target='regulus',effect='tilt',amplitude=1.5,hold=True,durationMs=650,delayMs=250),
   dict(effect='camera',to=1.03,durationMs=1000),
  ],
  's01_l040_0':[
   dict(target='regulus',effect='tilt',amplitude=0,hold=True,durationMs=500),
   dict(target='elizabeth',effect='tilt',amplitude=0,hold=True,durationMs=500),
   dict(effect='group',targets=[],durationMs=600),
   dict(effect='camera',to=1,durationMs=800),
  ],
  's01_l042_0':[dict(effect='shake',amplitude=3,durationMs=450)],
  's01_l043_0':[
   dict(target='regulus',effect='tilt',amplitude=-2,durationMs=350),
   dict(target='andromeda',effect='fade',to=1,side='left',durationMs=520,delayMs=120),
   dict(target='andromeda',effect='bounce',amplitude=10,durationMs=560,delayMs=140),
   dict(target='andromeda',effect='focus',delayMs=200),
   dict(effect='group',targets=['andromeda','azalia','theo'],durationMs=650,delayMs=560),
   dict(target='andromeda',effect='tilt',amplitude=2.5,hold=True,durationMs=550,delayMs=900),
   dict(target='azalia',effect='tilt',amplitude=-1.8,hold=True,durationMs=550,delayMs=900),
   dict(target='theo',effect='tilt',amplitude=-2.2,hold=True,durationMs=550,delayMs=900),
   dict(effect='camera',to=1.05,durationMs=1200,delayMs=850),
   dict(effect='glow',to=0.28,durationMs=1200,delayMs=850),
  ],
  's01_l045_0':[dict(target='andromeda',effect='shake',amplitude=2,durationMs=400)],
  's01_l045_2':[dict(target='andromeda',effect='bounce',amplitude=6,durationMs=520)],
  's01_l047_0':[dict(target='andromeda',effect='focus'),dict(target='andromeda',effect='tilt',amplitude=1.2,hold=True,durationMs=500)],
  's01_l049_0':[dict(target='theo',effect='bounce',amplitude=6,durationMs=500)],
  's01_l051_0':[dict(target='azalia',effect='tilt',amplitude=-2.2,hold=True,durationMs=500)],
  's01_l053_0':[
   dict(target='andromeda',effect='focus'),
   dict(effect='group',targets=['regulus','andromeda','azalia','theo','elizabeth'],durationMs=700),
   dict(target='andromeda',effect='tilt',amplitude=2.5,hold=True,durationMs=500),
   dict(effect='camera',to=1.06,durationMs=1000),
   dict(effect='glow',to=0.34,durationMs=1000),
  ],
  's01_l055_0':[
   dict(target='andromeda',effect='tilt',amplitude=0,hold=True,durationMs=500),
   dict(target='azalia',effect='tilt',amplitude=0,hold=True,durationMs=500),
   dict(target='theo',effect='tilt',amplitude=0,hold=True,durationMs=500),
   dict(effect='group',targets=[],durationMs=650),
   dict(effect='camera',to=1,durationMs=900),
   dict(effect='glow',to=0.1,durationMs=900),
  ],
  's01_l057_0':[dict(target='elizabeth',effect='tilt',amplitude=1.5,durationMs=500)],
 }
 nodes=[dict(id='s01_enter',type='scene',action='enter',background='bg_manor',characters=['regulus','elizabeth','theo','azalia'],source=[])]
 ledger=[]
 for line,text in enumerate(lines,1):
  row=dict(line=line,original=text,parts=[])
  def part(start,end,kind,speaker=None):
   if start==end:return
   idx=len(nodes);id=f's01_l{line:03}_{len(row["parts"])}';ref=dict(file='dialogues',line=line,start=start,end=end)
   if kind=='dialogue':
    n=dict(id=id,type='dialogue',speaker=speaker,text=text[start:end],source=[ref])
    if id in stage_cues:n['cues']=stage_cues[id]
    nodes.append(n)
    row['parts'].append(dict(start=start,end=end,kind=kind,node=id,field='text'))
   elif kind=='stage':
    n=dict(id=id,type='scene',action='cue',annotation=text[start:end],source=[ref])
    if id in narration_cues:n['narration']=True
    if id in stage_cues:n['cues']=stage_cues[id]
    nodes.append(n)
    row['parts'].append(dict(start=start,end=end,kind=kind,node=id,field='annotation'))
   else:row['parts'].append(dict(start=start,end=end,kind=kind,text=text[start:end]))
  if line in speakers:
   start=text.index('«');part(0,start,'stage')
   if line==45:
    a=text.index(' (смеётся');b=text.index(' «',a)
    part(start,a,'dialogue',speakers[line]);part(a,b+1,'stage');part(b+1,len(text),'dialogue',speakers[line])
   else:part(start,len(text),'dialogue',speakers[line])
  elif text.startswith('('):part(0,len(text),'stage')
  else:part(0,len(text),'metadata')
  ledger.append(row)
 nodes += [
  dict(
   id='s01_exit',
   type='scene',
   action='cue',
   holdMs=650,
   cues=[
    dict(target='theo',effect='fade',to=0,side='right',durationMs=600),
    dict(target='azalia',effect='fade',to=0,side='right',durationMs=600,delayMs=80),
    dict(effect='glow',to=0,durationMs=600),
   ],
   source=[],
  ),
  dict(id='s01_cs01',type='cutscene',cutsceneId='cs01',source=[dict(file='plot',line=38)]),
  dict(id='s01_end',type='end',nextScene='scene02',source=[]),
 ]
 for i,n in enumerate(nodes):n['next']=nodes[i+1]['id'] if i+1<len(nodes) else None
 result=dict(schemaVersion=1,id='scene01',start='s01_enter',nodes=nodes,sourceLedger=ledger,sourceSha256=hashlib.sha256(src.read_bytes()).hexdigest(),scope=[1,60])
 out=P/'src/data/story';out.mkdir(parents=True,exist_ok=True)
 (out/'scene01.js').write_text('export default '+json.dumps(result,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
 letter=P/'src/data/finalLetter.js'
 if not letter.exists():letter.write_text('export const FINAL_LOVE_LETTER_TEXT = '+json.dumps('Текст письма будет добавлен здесь',ensure_ascii=False)+';\n',encoding='utf-8')
 full=src.read_text(encoding='utf-8').splitlines();variants=[]
 for line in [629,824]:
  base=full[line-1]
  if line==629:
   old='Тео и Роуз вопят от восторга.';start=base.index(old);end=start+len(old);replacement='Тео вопит от восторга.'
  else:
   start=base.index('Представляешь,');end=base.index('»',start);replacement=''
  variants.append(dict(id=f'noRose_D{line}',line=line,condition=dict(op='eq',left=dict(var='roseFriend'),right=False),base=base,operations=[dict(start=start,end=end,replacement=replacement)],text=base[:start]+replacement+base[end:],approval='user_2026_11_16'))
 (P/'tools/story_overrides.json').write_text(json.dumps(variants,ensure_ascii=False,indent=2),encoding='utf-8')
 print('scene01: 60 source lines; '+str(len(nodes))+' nodes; data only')
if __name__=='__main__':build()

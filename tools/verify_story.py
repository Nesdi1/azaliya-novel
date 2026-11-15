import json,re,argparse
from pathlib import Path
P=Path(__file__).resolve().parents[1]
def norm(s):return re.sub(r'\s+',' ',s.translate(str.maketrans({'«':'"','»':'"','“':'"','”':'"','—':'-','–':'-'}))).strip()
def verify(path):
 raw=path.read_text(encoding='utf-8');data=json.loads(raw.removeprefix('export default ').rstrip().removesuffix(';'))
 src=(P.parent/'raw_files/диалоги.txt').read_text(encoding='utf-8').splitlines();lo,hi=data['scope'];errors=[];nodes={n['id']:n for n in data['nodes']};used=set()
 if len(nodes)!=len(data['nodes']):errors.append('duplicate node ID')
 if [r['line'] for r in data['sourceLedger']]!=list(range(lo,hi+1)):errors.append('missing/extra/reordered source lines')
 for r in data['sourceLedger']:
  line=r['line'];actual=src[line-1];pieces=[];cursor=0
  if norm(actual)!=norm(r['original']):errors.append(f'changed baseline D{line}')
  for p in r['parts']:
   if p['start']!=cursor:errors.append(f'gap/overlap D{line}')
   cursor=p['end']
   if 'option' in p:
    n=nodes.get(p['node'],{});opt=next((o for o in n.get('options',[]) if o.get('id')==p['option']),{})
    value=opt.get(p['field'],'');used.add(p['option'])
    if opt.get('source')!=[dict(file='dialogues',line=line,start=p['start'],end=p['end'])]:errors.append(f'wrong reference D{line}')
   elif 'node' in p:
    n=nodes.get(p['node'],{});value=n.get(p['field'],'');used.add(p['node'])
    if n.get('source')!=[dict(file='dialogues',line=line,start=p['start'],end=p['end'])]:errors.append(f'wrong reference D{line}')
   else:value=p['text']
   if norm(value)!=norm(actual[p['start']:p['end']]):errors.append(f'changed output D{line}')
   pieces.append(value)
  if cursor!=len(actual) or norm(''.join(pieces))!=norm(actual):errors.append(f'missing/extra text D{line}')
 for n in nodes.values():
  if ('text' in n or 'annotation' in n) and n['id'] not in used:errors.append('extra text '+n['id'])
  for opt in n.get('options',[]):
   if 'text' in opt and opt['id'] not in used:errors.append('extra option text '+opt['id'])
   if opt.get('next') is not None and opt['next'] not in nodes:errors.append('broken option next '+opt['id'])
  for key in ('next','then','else','target'):
   if n.get(key) is not None and n[key] not in nodes:errors.append(f'broken {key} '+n['id'])
  for route in (n.get('resultRoutes') or {}).values():
   if route is not None and route not in nodes:errors.append('broken route '+n['id'])
 variants=json.loads((P/'tools/story_overrides.json').read_text(encoding='utf-8'))
 for v in variants:
  base=src[v['line']-1]
  if base!=v['base']:errors.append('variant base changed '+v['id'])
  result=base
  for op in sorted(v['operations'],key=lambda x:x['start'],reverse=True):
   if not 0<=op['start']<=op['end']<=len(base):errors.append('bad variant span '+v['id'])
   result=result[:op['start']]+op['replacement']+result[op['end']:]
  if result!=v['text']:errors.append('unapproved variant text '+v['id'])
 report=dict(scope=[lo,hi],lines=hi-lo+1,approvedVariants=len(variants),errors=errors,completeStory=lo==1 and hi==len(src))
 return report
def verify_many(paths):
 src=(P.parent/'raw_files/диалоги.txt').read_text(encoding='utf-8').splitlines()
 reports=[verify(p) for p in paths]
 errors=[]
 for p,rep in zip(paths,reports):
  errors.extend(f'{p.name}: {e}' for e in rep['errors'])
 for a,b in zip(reports,reports[1:]):
  if a['scope'][1]+1!=b['scope'][0]:
   errors.append(f'scope gap/overlap {a["scope"]} -> {b["scope"]}')
 lo=reports[0]['scope'][0];hi=reports[-1]['scope'][1]
 return dict(
  scenes=[p.stem for p in paths],
  scope=[lo,hi],
  lines=sum(r['lines'] for r in reports),
  approvedVariants=reports[0]['approvedVariants'],
  errors=errors,
  completeStory=lo==1 and hi==len(src) and not errors,
 )
if __name__=='__main__':
 ap=argparse.ArgumentParser()
 ap.add_argument('--file',type=Path,default=None)
 ap.add_argument('--scenes',type=int,nargs='*',default=None)
 args=ap.parse_args()
 if args.scenes:
  paths=[P/f'src/data/story/scene{s:02}.js' for s in args.scenes]
  r=verify_many(paths)
 elif args.file:
  r=verify(args.file)
 else:
  existing=sorted((P/'src/data/story').glob('scene*.js'))
  r=verify_many(existing) if len(existing)>1 else verify(existing[0])
 (P/'audit/story_validation.json').write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps(r,ensure_ascii=True))
 raise SystemExit(bool(r['errors']))

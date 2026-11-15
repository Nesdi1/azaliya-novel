import json,hashlib,argparse
from pathlib import Path
from PIL import Image
P=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--allow-partial',action='store_true');args=ap.parse_args()
m=json.loads((P/'assets/manifest.json').read_text(encoding='utf-8'));errors=[]
for id,a in m['assets'].items():
 p=(P/a['src']).resolve()
 if not p.is_relative_to(P/'assets') or not p.exists():errors.append(id+': missing/unsafe');continue
 if p.stat().st_size!=a['bytes'] or hashlib.sha256(p.read_bytes()).hexdigest()!=a['sha256']:errors.append(id+': bytes/hash')
 original=P/a['source']
 if not original.exists():errors.append(id+': original missing')
 elif hashlib.sha256(original.read_bytes()).hexdigest()!=a['sourceSha256']:errors.append(id+': original changed')
 with Image.open(p) as im:
  if list(im.size)!=[a['width'],a['height']] or max(im.size)>(2048 if a['type']=='background' else 1600):errors.append(id+': dimensions')
  if a['type']!='background':
   if 'A' not in im.getbands():errors.append(id+': no alpha')
   elif any(im.getchannel('A').getpixel(pt)>0 for pt in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]):errors.append(id+': opaque corner')
total=sum(p.stat().st_size for p in (P/'assets').rglob('*') if p.is_file())
for size in [180,192,512]:
 p=P/f'assets/icons/icon-{size}.png'
 if not p.exists():errors.append(f'missing icon{size}')
 else:
  with Image.open(p) as im:
   if im.size!=(size,size):errors.append(f'bad icon{size}')
if total>40000000:errors.append('total >40MB')
for s,ids in m['scenes'].items():
 if sum(m['assets'].get(id,{}).get('bytes',0) for id in ids)>10000000:errors.append(s+': >10MB')
if m['missingRequired'] and not args.allow_partial:errors.append('missing: '+','.join(m['missingRequired']))
r=dict(assets=len(m['assets']),bytes=total,missing=m['missingRequired'],errors=errors,complete=not m['missingRequired'])
(P/'audit/asset_validation.json').write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(r,ensure_ascii=True));raise SystemExit(bool(errors))

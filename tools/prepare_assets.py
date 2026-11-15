"""Offline asset preparation after first download of segmentation models."""
import os,json,hashlib,argparse
from pathlib import Path
from PIL import Image,ImageOps,ImageFilter,ImageDraw
P=Path(__file__).resolve().parents[1]
os.environ['U2NET_HOME']=str(P/'.models')
os.environ['NUMBA_CACHE_DIR']=str(P/'.venv/numba_cache')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--ids',nargs='+',default=['azalia','magic_wand','bg_manor']);ap.add_argument('--model',default='isnet-anime');ap.add_argument('--compare',action='store_true');ap.add_argument('--all',action='store_true');args=ap.parse_args()
 m=json.loads((P/'tools/asset_map.json').read_text(encoding='utf-8'));items=[a for a in m['assets'] if a['usage_status']!='unused' and (args.all or a['id'] in args.ids)]
 from rembg import remove,new_session
 sessions={}
 def segment(im,model):
  if model not in sessions:sessions[model]=new_session(model,providers=['CPUExecutionProvider'])
  return remove(im,session=sessions[model]).convert('RGBA')
 outdir=P/'assets';outdir.mkdir(exist_ok=True)
 mf=outdir/'manifest.json';manifest=json.loads(mf.read_text(encoding='utf-8')) if mf.exists() else dict(schemaVersion=1,version='assets-v1',assets={},scenes={})
 previews=[]
 for a in items:
  src=(P/a['source']).resolve();assert sha(src)==a['sha256'];im=Image.open(src).convert('RGB');kind=a['kind']
  if kind=='background':im.thumbnail((2048,2048));out=im;method='resize'
  else:
   im.thumbnail((1592,1592))
   if args.compare:
    for model in ['isnet-anime','u2netp']:
     cut=segment(im,model);p=P/f'audit/{a["id"]}_{model}.png';cut.save(p);previews.append((a['id']+' '+model,cut))
   selected='u2netp' if kind=='prop' else args.model
   cut=segment(im,selected)
   alpha=cut.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.5))
   # One-pixel erosion and 0.5px feather; remove contaminated low-alpha colour.
   import numpy as np
   from scipy.ndimage import distance_transform_edt
   rgb=np.asarray(cut)[:,:,:3].copy();av=np.asarray(alpha).copy();av[av<12]=0;alpha=Image.fromarray(av);opaque=av>=240
   if not opaque.any():raise ValueError('Empty foreground: '+a['id'])
   _,idx=distance_transform_edt(~opaque,return_indices=True)
   edge=(av>0)&(av<240);rgb[edge]=rgb[idx[0][edge],idx[1][edge]]
   out=Image.fromarray(rgb).convert('RGBA');out.putalpha(alpha)
   box=alpha.getbbox()
   if not box:raise ValueError('Empty mask')
   out=ImageOps.expand(out.crop(box),border=4,fill=(0,0,0,0));out.thumbnail((1600,1600));method=selected
   previews.append((a['id']+' final',out))
  folder={'character':'characters','background':'backgrounds','prop':'props'}[kind];dst=outdir/folder/(a['id']+'.webp');dst.parent.mkdir(exist_ok=True)
  temp=dst.with_suffix('.tmp');out.save(temp,format='WEBP',quality=82,method=6);temp.replace(dst)
  entry=dict(src=dst.relative_to(P).as_posix(),type=kind,width=out.width,height=out.height,bytes=dst.stat().st_size,sha256=sha(dst),source=a['source'],sourceSha256=a['sha256'],processing=method)
  if kind!='background':entry.update(anchor=[.5,1],scale=1.12 if a['id'] in ['regulus','elizabeth','andromeda','snape','sprout','dumbledore','mcgonagall'] else 1)
  manifest['assets'][a['id']]=entry
  print(a['id'],out.size,dst.stat().st_size,flush=True)
 manifest['scenes']={f'scene{i:02}':[a['id'] for a in m['assets'] if f'scene{i:02}' in a['scenes'] and a['usage_status']!='unused'] for i in range(1,11)}
 extras={'scene03':['bg_great_hall','bg_fountain_day'],'scene06':['bg_corridor'],'scene08':['bg_hufflepuff_dorm'],'scene10':['bg_corridor']}
 for scene,ids in extras.items():manifest['scenes'][scene]=sorted(set(manifest['scenes'][scene]+ids))
 manifest['missingRequired']=[a['id'] for a in m['assets'] if a['usage_status']!='unused' and a['id'] not in manifest['assets']]
 temp=mf.with_suffix('.tmp');temp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8');temp.replace(mf)
 if previews:
  sheet=Image.new('RGB',(900,len(previews)*350),'#ddd');d=ImageDraw.Draw(sheet)
  for row,(label,im) in enumerate(previews):
   for col,color in enumerate(['white','black','#407c9c']):
    tile=Image.new('RGBA',(300,320),color);small=ImageOps.contain(im,(290,310));tile.alpha_composite(small,((300-small.width)//2,5));sheet.paste(tile.convert('RGB'),(col*300,row*350))
   d.text((5,row*350+323),label,fill='black')
  sheet.save(P/'audit/edge_check.jpg',quality=95)
 icon=Image.open(P/next(a['source'] for a in m['assets'] if a['id']=='bg_manor')).convert('RGB');(outdir/'icons').mkdir(exist_ok=True)
 for size in [180,192,512]:ImageOps.fit(icon,(size,size)).save(outdir/f'icons/icon-{size}.png')
if __name__=='__main__':main()

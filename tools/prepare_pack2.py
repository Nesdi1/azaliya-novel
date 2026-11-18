"""Prepare the supplied portraits in one sequential, local pass."""
from pathlib import Path
import hashlib
import json
import os
import shutil

os.environ['OMP_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT.parent / 'raw_files'
BACKUP = ROOT / '_originals_emotions'
REVIEW = ROOT / '_review/pack2'
CHAR = ROOT / 'assets/characters'
GROUPS = dict(azalia='thought resolve worried shy tender wand_draw wand_stance desk_down',
              dima='sly worried relief skeptical disappointed', theo='care restrained accept touched',
              rose='defiant relief blush')
MEMBERS = dict(andromeda_hug=['andromeda','azalia','theo'], cedric_hug=['cedric','azalia'],
               theo_hug=['theo','azalia'], bench_hug=['azalia','dima'], earmuffs=['azalia','dima'],
               kiss=['azalia','dima'], stupenda_whisper=['azalia','dima'])
MOVIES = 'cs01_train cs02_sleep cs03_friends cs04_rose_dima cs05_fountain_win cs05_fountain_fail cs06_to_library cs07_theo_walk cs08_closeness cs09_company_dima cs10_finale cs_duel'.split()

def digest(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f,'sha256').hexdigest()

def studio_cut(im, session, keep_props):
    from rembg import remove
    im.thumbnail((1600,1600),Image.Resampling.LANCZOS)
    rgb=np.array(im.convert('RGB'))
    matte=np.array(remove(im.convert('RGB'),session=session,only_mask=True))
    if keep_props:
        # Retain the desk, the narrow wand and its spark. Sample the actual studio
        # colour from the upper corners, and flood only connected backdrop.
        colors=np.vstack([rgb[:15,:15].reshape(-1,3),rgb[:15,-15:].reshape(-1,3)])
        dist=np.linalg.norm(rgb.astype(float)-np.median(colors,axis=0),axis=2)
        bg=dist<22
        seeds=np.zeros_like(bg);seeds[0]=bg[0];seeds[:,0]=bg[:,0];seeds[:,-1]=bg[:,-1]
        exterior=ndimage.binary_propagation(seeds,mask=bg)
        matte=np.maximum(matte,np.where(~exterior & (dist>24),255,0).astype('uint8'))
    matte[matte<42]=0
    alpha=Image.fromarray(matte).filter(ImageFilter.GaussianBlur(.45))
    rgba=Image.fromarray(rgb).convert('RGBA');rgba.putalpha(alpha)
    return rgba.crop(alpha.getbbox())

def compose(cut,base,wide):
    bbox=base.getchannel('A').getbbox()
    scale=min((bbox[3]-bbox[1])/cut.height,(base.width-8)/cut.width)
    resized=cut.resize((round(cut.width*scale),round(cut.height*scale)),Image.Resampling.LANCZOS)
    def head_x(im):
        a=np.asarray(im.getchannel('A'));return float(np.median(np.where(a[:im.height//4]>128)[1]))
    x=(base.width-resized.width)//2 if wide else round(head_x(base)-head_x(resized))
    x=max(4,min(x,base.width-4-resized.width))
    canvas=Image.new('RGBA',base.size)
    canvas.alpha_composite(resized,(x,bbox[3]-resized.height))
    return canvas

def index_scene_media(manifest):
    assets=manifest['assets']
    for path in sorted((ROOT/'src/data/story').glob('scene*.js')):
        scene=json.loads(path.read_text(encoding='utf-8').removeprefix('export default ').rstrip().removesuffix(';'))
        entries=manifest['scenes'][scene['id']]
        referenced=set()
        for node in scene['nodes']:
            referenced.update(c+'_'+e for c,e in node.get('emotions',{}).items())
            referenced.update(filter(None,[node.get('pose'),node.get('cutsceneId')]))
        entries[:]=list(dict.fromkeys(entries+sorted(referenced & assets.keys())))

def main():
    from rembg import new_session
    os.environ['U2NET_HOME']=str(ROOT/'.models')
    os.environ['NUMBA_CACHE_DIR']=str(ROOT/'.venv/numba_cache')
    session=new_session('isnet-anime',providers=['CPUExecutionProvider'],intra_op_num_threads=1,inter_op_num_threads=1)
    BACKUP.mkdir(exist_ok=True);REVIEW.mkdir(parents=True,exist_ok=True)
    mpath=ROOT/'assets/manifest.json';manifest=json.loads(mpath.read_text(encoding='utf-8'));assets=manifest['assets']
    ids=[c+'_'+e for c,group in GROUPS.items() for e in group.split()]
    folders=[RAW/'персонажи',BACKUP,CHAR]
    poses=sorted(set(['pose_'+key for key in MEMBERS]+[p.stem for folder in folders for p in folder.glob('pose_*')]))
    sheet=Image.new('RGB',(760,((len(ids)+len(poses)+4)//5)*206),'#44515c');draw=ImageDraw.Draw(sheet)
    for i,id in enumerate(ids+poses):
        stems={id,id.replace('azalia_','azaliya_')}
        files=[p for folder in folders for p in folder.iterdir() if p.stem in stems and p.suffix.lower() in {'.png','.jfif','.jpg','.jpeg','.webp'}]
        if not files:
            print('Missing:',id);continue
        source=files[0]; backup=BACKUP/source.name
        if not backup.exists():shutil.copy2(source,backup)
        if digest(source)!=digest(backup):raise ValueError(f'Conflicting original {id}')
        im=Image.open(backup)
        # The supplied contact sheet shows no text strips. Keep the desk/table.
        pose=id.startswith('pose_')
        custom=id in ('azalia_desk_down','azalia_wand_stance','azalia_wand_draw')
        if pose and id[5:] not in MEMBERS:
            # Unknown illustrations retain their original composition.
            cut=im.convert('RGBA')
        else:cut=studio_cut(im,session,custom)
        if pose:
            cut.thumbnail((896,1200),Image.Resampling.LANCZOS)
            dst=ROOT/f'assets/poses/{id}.webp';entry=dict(type='pose',participants=MEMBERS.get(id[5:],[]))
        else:
            char,emotion=id.split('_',1);base=assets[char]
            cut=compose(cut,Image.open(ROOT/base['src']).convert('RGBA'),custom)
            dst=CHAR/f'{id}.webp';entry={k:base[k] for k in ('type','scale','anchor')}
            base.setdefault('emotions',{})[emotion]=id
        dst.parent.mkdir(exist_ok=True);cut.save(dst,'WEBP',quality=92,method=6)
        assets[id]=dict(**entry,src=dst.relative_to(ROOT).as_posix(),width=cut.width,height=cut.height,
                        bytes=dst.stat().st_size,sha256=digest(dst),sourceSha256=digest(backup))
        cut.thumbnail((145,178));x=i%5*152;y=i//5*206;sheet.paste(cut,(x+(152-cut.width)//2,y+178-cut.height),cut)
        draw.text((x+2,y+182),id,fill='white')
        print(id,flush=True)
    sheet.save(REVIEW/'processed.jpg',quality=90)
    for id in MOVIES:
        files=[p for name in ('cutscenes','animations','анимации') for p in (RAW/name).glob(id+'.*') if p.suffix.lower() in {'.mp4','.webm','.gif','.webp'}]
        if not files:print('Missing:',id);continue
        src=files[0];dst=ROOT/'assets/cutscenes'/src.name;dst.parent.mkdir(exist_ok=True);shutil.copy2(src,dst)
        assets[id]=dict(type='cutscene',src=dst.relative_to(ROOT).as_posix(),bytes=dst.stat().st_size,sha256=digest(dst))
    index_scene_media(manifest)
    mpath.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

if __name__=='__main__':main()

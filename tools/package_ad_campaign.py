"""Build current review gallery and exact manifest from a campaign project list."""
from pathlib import Path
import json,sys,hashlib,struct,html,zipfile
root=Path(__file__).resolve().parent.parent
campaign=sys.argv[1]; projects=json.loads((root/f'campaigns/{campaign}-projects.json').read_text());entries=[]
for name in projects:
 p=json.loads((root/name).read_text());folder=Path('output')/Path(name).stem;files=[]
 for scene in p['scenes']:
  f=root/folder/scene['filename'];raw=f.read_bytes();w,h=struct.unpack('>II',raw[16:24]);assert [w,h]==[p['output']['width'],p['output']['height']]
  files.append({'file':str(f.relative_to(root)),'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw),'width':w,'height':h,'scene':scene['id']})
 entries.append({'project':name,'projectSha256':hashlib.sha256((root/name).read_bytes()).hexdigest(),'kind':p['creativeKind'],'format':p['formatId'],'output':p['output'],'files':files,'status':'awaiting-owner-artwork-review'})
 with zipfile.ZipFile(root/folder/'screenshots.zip','w',zipfile.ZIP_DEFLATED) as z:
  for f in files:z.write(root/f['file'],Path(f['file']).name)
(root/f'output/{campaign}-manifest.json').write_text(json.dumps(entries,indent=2)+'\n')
page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Spanish learner ad review</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f1e9;color:#20251e;font:16px 'Avenir Next',sans-serif}main{padding:28px;max-width:1440px;margin:auto}h1,h2{font-family:'Bodoni 72',serif}h1{font-size:44px}h2{font-size:30px}p{max-width:800px;line-height:1.5}a{color:inherit}.cards{display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap}figure{margin:0;width:360px;max-width:100%}img{width:100%;height:auto;display:block}figcaption{padding:8px 0;font-size:14px}section{margin:40px 0}.edit{display:inline-block;margin:0 0 20px;border:1px solid #9da592;padding:10px 18px;border-radius:24px;text-decoration:none}</style><main><h1>Spanish learners · ad review</h1><p>Large type and genuine app screenshots, shown at a 360 px feed width. Carousel sequences and standalone static alternatives are separate below. All artwork awaits your review; nothing has been uploaded.</p><p>Seven-card story: introduction → photo → selected word → meaning → vocabulary → revealed Study → checked-correct Test. Device crops enlarge the relevant UI. Backgrounds follow the App Store reference family.</p>'''
for e in entries:
 page+=f'<section><h2>{html.escape(e["kind"].title())} · {html.escape(e["format"])}</h2><a class="edit" href="editor.html?project={e["project"]}">Open in editor</a><div class="cards">'
 for f in e['files']:
  page+=f'<figure><a href="{f["file"]}"><img loading="lazy" src="{f["file"]}" alt="{html.escape(f["scene"])}"></a><figcaption>{html.escape(f["scene"])} · {f["width"]} × {f["height"]}</figcaption></figure>'
 page+='</div></section>'
(root/'spanish-learners.html').write_text(page+'</main></html>')
print(f'Packaged {sum(len(e["files"]) for e in entries)} images in {len(entries)} sets.')

"""Package existing exports and generate a review gallery; never modifies their pixels."""
from pathlib import Path
import json, hashlib, struct, zipfile, html
root=Path(__file__).resolve().parent.parent
projects=sorted((root/'projects').glob('spanish-*.json'))
entries=[]
for p in projects:
    project=json.loads(p.read_text()); out=root/'output'/p.stem
    files=[]
    for scene in project['scenes']:
        f=out/scene['filename']; b=f.read_bytes(); size=struct.unpack('>II',b[16:24]); assert size==(project['output']['width'],project['output']['height']), f
        files.append({'file':str(f.relative_to(root)),'width':size[0],'height':size[1],'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
    with zipfile.ZipFile(out/'screenshots.zip','w',zipfile.ZIP_DEFLATED) as z:
        for f in files: z.write(root/f['file'],Path(f['file']).name)
    entries.append({'project':str(p.relative_to(root)), 'format':project['formatId'],'output':project['output'],'files':files,'status':'review-draft-not-published'})
(root/'output/spanish-ads-manifest.json').write_text(json.dumps(entries,indent=2)+'\n')
page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Omato · Spanish learner creatives</title><style>*{box-sizing:border-box}body{background:#f4f1e9;color:#20251e;margin:0;font:16px 'Avenir Next',sans-serif}main{max-width:1450px;margin:auto;padding:36px}h1{font:700 48px 'Bodoni 72',serif;margin:12px 0}h2{font:700 30px 'Bodoni 72',serif}p{line-height:1.6;max-width:880px}.nav{display:flex;gap:10px;flex-wrap:wrap}a{color:inherit}nav a,.actions a{display:inline-block;padding:10px 16px;border:1px solid #bcc3b0;border-radius:24px;text-decoration:none}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}figure{margin:0}img{width:100%;height:auto;display:block;border-radius:6px}figcaption{padding:10px 0;font-size:13px}section{padding-top:36px}.actions{margin:18px 0;display:flex;gap:12px;flex-wrap:wrap}@media(max-width:1000px){.cards{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:550px){main{padding:20px}.cards{grid-template-columns:1fr}}</style><main><p>OMATO / SPANISH LEARNERS / CREATIVE REVIEW</p><h1>One story. Made for each placement.</h1><p>Six genuine app captures, the existing iPhone 17 Pro silver frame, and the App Store’s Bodoni 72 Bold / Avenir Next Medium typography. English copy for Spanish learners. All exports are local drafts.</p><nav class="nav">'''
# Put the primary Reddit set first.
entries.sort(key=lambda e:(e['format']!='reddit-carousel-square',e['format']))
for e in entries:page+=f'<a href="#{e["format"]}">{e["format"]}</a>'
page+='</nav><p>Reddit, Google, Facebook/Instagram Feed and Instagram Stories sizes were checked against official guides. The vertical layout respects Instagram Stories safe-area guidance. Check objective-specific previews and other placements before upload. No assets have been uploaded or ads activated.</p>'
for e in entries:
    folder=Path(e['project']).stem;w=e['output']['width'];h=e['output']['height']
    page+=f'<section id="{e["format"]}"><h2>{e["format"]} · {w} × {h}</h2><div class="actions"><a href="editor.html?project={e["project"]}">Edit this set</a><a href="output/{folder}/screenshots.zip" download>Download six PNGs</a><a href="{e["project"]}" download>Project JSON</a></div><div class="cards">'
    for n,f in enumerate(e['files'],1):page+=f'<figure><a href="{f["file"]}"><img loading="lazy" src="{f["file"]}" alt="Spanish learner creative {n}, {e["format"]}"></a><figcaption>{n:02} · {Path(f["file"]).stem} · {f["bytes"]//1024} KB</figcaption></figure>'
    page+='</div></section>'
page+='</main></html>'
(root/'spanish-learners.html').write_text(page)
print(f'Packaged {sum(len(e["files"]) for e in entries)} PNGs in {len(entries)} format ZIPs; created gallery and manifest.')

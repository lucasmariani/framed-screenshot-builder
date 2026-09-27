"""Validate and package the Sept 27 translation-first draft; never publishes ads."""
import hashlib, html, json, struct, zipfile
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
NAME = 'spanish-meta-relaunch-20260927'
OUT = ROOT / 'output' / NAME
OUT.mkdir(parents=True, exist_ok=True)
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def overlaps(a,b): return a['x'] < b['x']+b['width'] and a['x']+a['width'] > b['x'] and a['y'] < b['y']+b['height'] and a['y']+a['height'] > b['y']
entries=[]; package_files=set(); cards=[]; validations=[]
for fmt, label in [('square','Square · 1:1'),('feed','Facebook / Instagram feed · 4:5'),('stories','Stories · 9:16')]:
 project_rel=f'projects/{NAME}-{fmt}.json'; project=ROOT/project_rel
 p=json.loads(project.read_text()); scene=p['scenes'][0]; layers={l['id']:l for l in scene['layers']}
 png_rel=f'output/{NAME}-{fmt}/{scene["filename"]}'; png=ROOT/png_rel
 width,height=struct.unpack('>II',png.read_bytes()[16:24]); assert (width,height)==(p['output']['width'],p['output']['height'])
 assert png.stat().st_size<30_000_000
 metrics=json.loads((png.parent/'layout-metrics.json').read_text())[0]
 contrast=json.loads((png.parent/'contrast-check.json').read_text()); assert all(r['pass'] for r in contrast['results'])
 d=layers['device']; device={'x':d['x'],'y':d['y'],'width':d['width'],'height':d['width']*d['aspectRatio']}
 assert abs(d['aspectRatio']-2760/1350)<1e-10
 for t in metrics['text']:
  b=t['bounds']; assert b['x']>=0 and b['y']>=0 and b['x']+b['width']<=width and b['y']+b['height']<=height
  assert max(t['lineWidths'])<=b['width']; assert not overlaps(b,device)
 assert not overlaps(metrics['text'][0]['bounds'], metrics['text'][1]['bounds'])
 assert layers['title']['fontFamily']=='Bodoni 72' and layers['title']['fontWeight']==700
 assert layers['subtitle']['fontFamily']=='Baskerville' and layers['subtitle']['fontWeight']==400 and layers['subtitle']['fontSize']>=83
 assert 'wordmark' not in layers
 if p.get('safeInsets'):
  s=p['safeInsets']; safe={'left':width*s['left'],'right':width*(1-s['right']),'top':height*s['top'],'bottom':height*(1-s['bottom'])}
  def inside(b): return b['x']>=safe['left'] and b['x']+b['width']<=safe['right'] and b['y']>=safe['top'] and b['y']+b['height']<=safe['bottom']
  assert all(inside(t['bounds']) for t in metrics['text'])
  r=scene['essentialDeviceRegion']['sourceRect']; scale=d['width']/1350
  proof={key:(d[key] if key in ['x','y'] else 0)+r[key]*scale for key in ['x','y','width','height']}
  assert inside(proof),proof
 sources=[]
 for l in scene['layers']:
  if l['type']=='image':
   source=ROOT/l['src']; assert source.exists(); sources.append({'path':l['src'],'sha256':digest(source)}); package_files.add(l['src'])
 entry={'creative_id':f'CR-META-LNG-EN-ES-TRANSLATION-20260927-{fmt.upper()}-V1','format':fmt,'label':label,'project':project_rel,'project_sha256':digest(project),'png':png_rel,'sha256':digest(png),'width':width,'height':height,'bytes':png.stat().st_size,'sources':sources,'image_title':layers['title']['text'],'image_subtitle':layers['subtitle']['text'],'status':'awaiting-owner-artwork-review','provider_preview':'pending; not uploaded'}
 entries.append(entry); validations.append({'format':fmt,'dimensions':True,'fonts':True,'text_bounds_and_no_overlap':True,'device_ratio':True,'contrast_minimum':min(r['minimumRatio'] for r in contrast['results']),'essential_stories_proof_inside_local_guide':True if fmt=='stories' else None})
 package_files.update([project_rel,png_rel,str((png.parent/'layout-metrics.json').relative_to(ROOT)),str((png.parent/'contrast-check.json').relative_to(ROOT))])
 cards.append(f'<section><h2>{html.escape(label)}</h2><a class="edit" href="editor.html?project={project_rel}">Open in editor</a><figure><a href="{png_rel}"><img src="{png_rel}" alt="Reading in Spanish? Understand the words. Remember them later."></a><figcaption>{width} × {height} · preview at 360 px wide</figcaption></figure></section>')
provenance={'source':'project-assets/spanish-verosimil-v7/provenance.json','raw':'project-assets/spanish-verosimil-v7/raw/meaning.png','framed':'project-assets/spanish-verosimil-v7/meaning.png','capture_owner':'Lucas','capture_date':'2026-09-24','app_build':'Not independently verified for supplied capture; no new simulator session','languages':{'ui':'en','source':'es','definition':'en','copy':'en-US'},'frame':'iPhone_17_pro-silver-portrait','status_bar':'Reused real capture: 9:41, full cellular/Wi-Fi, full battery without charging bolt','renderer':'Existing editor.js via tools/render_project.cjs; no generated UI or changed screenshot pixels','fonts':'Existing locally extracted macOS Bodoni 72 Bold and Baskerville Regular; not distributed'}
for key in ['source','raw','framed']: package_files.add(provenance[key]); provenance[key+'_sha256']=digest(ROOT/provenance[key])
manifest={'campaign_revision':NAME,'recorded_on':'2026-09-27','status':'awaiting-owner-artwork-review','upload_authorized':False,'creative_concepts':1,'placement_variants':entries,'primary_text':'Reading in Spanish? Understand the words. Remember them later. Scan a page, get the English meaning, and practice your saved words with Omato.','headline':'Build your Spanish vocabulary','cta':'Install now','destination':'Spanish-learner CPP under provider preflight; do not publish until validated','provenance':provenance,'existing_carousel':'Unchanged approved seven-card Spanish Meta v3 carousel','budget_approval':'Up to ARS 15,000 additional media spend over five days after approved launch; ARS 5,000 financial checkpoint; no launch performed','provider_validation':'Pending upload/placement preview after exact artwork review. Local ratio/safe-area checks are not platform acceptance.'}
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(OUT/'validation.json').write_text(json.dumps({'results':validations,'visual_review':'Full-size PNGs and all three 360 CSS-pixel gallery previews inspected in Codex browser; editable feed project opened and visually matched on 2026-09-27'},indent=2)+'\n')
package_files.update([f'output/{NAME}/manifest.json',f'output/{NAME}/validation.json'])
gallery='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Omato · Meta translation-first review</title><style>*{box-sizing:border-box}body{margin:0;background:#f4f1e9;color:#20251e;font:16px system-ui,sans-serif}main{padding:28px;max-width:1240px;margin:auto}h1,h2{font-family:"Bodoni 72",serif}h1{font-size:40px;margin-bottom:16px}h2{font-size:23px}p{max-width:880px;line-height:1.55}a{color:inherit}.cards{display:flex;flex-wrap:wrap;gap:28px;align-items:flex-start}section{width:360px;max-width:100%}figure{margin:12px 0}img{width:100%;height:auto;display:block}figcaption{font-size:13px;margin-top:10px}.edit{display:inline-block;padding:10px 16px;border:1px solid #9da592;border-radius:24px;margin:0 10px 8px 0}.status{color:#4d5b42;font-weight:600}.copy{background:#fffcf6;padding:18px;border-radius:12px}footer{margin-top:28px;font-size:14px;line-height:1.5}</style><main><h1>Reading in Spanish?</h1><p class="status">One new standalone ad · three placement layouts · ready for your artwork review</p><p>The translation appears immediately in the genuine app screenshot. The existing seven-card carousel stays unchanged. Bodoni 72 Bold titles, Baskerville Regular supporting copy, and the silver iPhone 17 Pro frame.</p><p class="copy"><strong>Ad text:</strong> '+html.escape(manifest['primary_text'])+'<br><strong>Headline:</strong> Build your Spanish vocabulary · <strong>Button:</strong> Install now</p><p>The additional ARS 15,000 budget is approved. Delivery remains paused while you review these exact images. The five-day test starts only after launch; no new images have been uploaded.</p><a class="edit" href="output/'+NAME+'/omato-meta-translation-first.zip">Download images + editable sources</a><a class="edit" href="output/'+NAME+'/manifest.json">Asset manifest</a><div class="cards">'+''.join(cards)+'</div><footer>All marketing text passes the local 4.5:1 contrast check. Stories uses the existing conservative safe-area guide with the Spanish term and English translation inside it; lower phone content intentionally continues beyond the canvas. Meta placement previews remain a separate check before activation. Source: Lucas’s September 24 screenshot, unchanged. No tracking added.</footer></main></html>'
(ROOT/'meta-relaunch-20260927.html').write_text(gallery)
with zipfile.ZipFile(OUT/'omato-meta-translation-first.zip','w',zipfile.ZIP_DEFLATED) as z:
 for rel in sorted(package_files): z.write(ROOT/rel,rel)
print(json.dumps({'variants':len(entries),'validation':validations,'gallery':'meta-relaunch-20260927.html'},indent=2))

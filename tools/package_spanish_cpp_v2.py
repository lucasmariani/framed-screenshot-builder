"""Package the reviewed renderer output; never uploads or changes App Store Connect."""
from pathlib import Path
import hashlib, html, json, struct, zipfile

root = Path(__file__).resolve().parents[1]
project_path = root / 'projects/cpp-spanish-learners-v2.json'
project = json.loads(project_path.read_text())
out = root / 'output/cpp-spanish-learners-v2'
promotional_text = 'Build your Spanish vocabulary as you read. Scan a page, look up words in English, save them to your vocabulary, and practice with Study and Test.'
assert len(promotional_text) <= 170
metrics = json.loads((out / 'layout-metrics.json').read_text())
contrast = json.loads((out / 'contrast-report.json').read_text())
assert all(x['pass'] for x in contrast['results'])
for scene in metrics:
    title, subtitle = scene['text']
    assert title['bounds']['y'] + title['bounds']['height'] + 20 < subtitle['bounds']['y']
    assert subtitle['bounds']['y'] + subtitle['bounds']['height'] + 40 < 745
    assert all(t['bounds']['x'] >= 0 and t['bounds']['x'] + t['bounds']['width'] <= 1320 for t in scene['text'])

def record(p):
    return {'path': str(p.relative_to(root)), 'sha256': hashlib.sha256(p.read_bytes()).hexdigest(), 'bytes': p.stat().st_size}

images = []
for scene in project['scenes']:
    p = out / scene['filename']
    assert struct.unpack('>II', p.read_bytes()[16:24]) == (1320, 2868)
    images.append({'id': f'CR-APPLE-LNG-ES-en-US-{scene["id"]}-v2',
                   **record(p), 'copy': {l['id']: l['text'] for l in scene['layers'] if l['type'] == 'text'}})
sources = sorted({l['src'] for s in project['scenes'] for l in s['layers'] if l['type'] == 'image'})
manifest = {'id': 'cpp-spanish-learners-v2', 'status': 'awaiting-owner-artwork-review',
 'targetPageName': 'Language Learners', 'targetLocale': 'en-US', 'targetSlot': 'APP_IPHONE_67',
 'dimensions': [1320, 2868], 'languageMatrix': {'ui': 'en', 'source': 'es', 'definition': 'en', 'copy': 'en-US'},
 'promotionalText': promotional_text, 'promotionalTextCharacters': len(promotional_text),
 'frame': 'iPhone_17_pro-silver-portrait', 'project': record(project_path), 'images': images,
 'sources': [record(root / src) for src in sources],
 'captureProvenance': ['project-assets/spanish-verosimil-v7/provenance.json', 'project-assets/spanish-hidalgo-v6/provenance.json'],
 'captureNote': 'Reuses Lucas-supplied native September 24 captures and the prior Translation Scan capture. No new simulator capture or public-build verification in this task.',
 'validation': {'allTextContrastAtLeast4_5': True, 'textOverlap': False, 'subtitlePx': 83},
 'uploadState': 'not_uploaded', 'reviewSubmissionState': 'not_submitted', 'adsActivation': 'not_authorized'}
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False)+'\n')
(out / 'promotional-text-en-US.txt').write_text(promotional_text+'\n')
with zipfile.ZipFile(out / 'screenshots.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for scene in project['scenes']: z.write(out / scene['filename'], scene['filename'])
cards = ''.join(f'<article><h2>{i+1}. {html.escape(s["name"])}</h2><a href="output/cpp-spanish-learners-v2/{s["filename"]}"><img src="output/cpp-spanish-learners-v2/{s["filename"]}" width="1320" height="2868" alt="{html.escape(s["name"])}"></a></article>' for i,s in enumerate(project['scenes']))
page = f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Omato · Spanish learner App Store page</title>
<style>*{{box-sizing:border-box}}body{{margin:0;background:#f6f2e9;color:#20251e;font:17px/1.5 system-ui,sans-serif}}header{{padding:32px;max-width:1100px}}h1{{font:700 42px/1.1 'Bodoni 72',serif;margin:10px 0}}h2{{font-size:17px}}nav{{display:flex;flex-wrap:wrap;gap:12px}}nav a{{border:1px solid #aaa;padding:8px 14px;border-radius:25px;text-decoration:none;color:inherit}}.copy{{font:25px/1.4 Baskerville,serif;max-width:900px}}.gallery{{display:flex;gap:22px;overflow-x:auto;padding:0 32px 32px;align-items:flex-start}}article{{flex:0 0 360px}}img{{display:block;width:360px;height:auto;border-radius:12px;box-shadow:0 8px 25px #20251e18}}small{{color:#626b5c}}</style>
<header><small>LANGUAGE LEARNERS · ENGLISH → SPANISH · APP STORE</small><h1>Build your Spanish vocabulary as you read.</h1><p>Seven editable screenshots · 1320 × 2868 · iPhone 17 Pro silver. Scroll horizontally to review the complete story at phone width. Click any image for the full PNG.</p><nav><a href="editor.html?project=projects/cpp-spanish-learners-v2.json">Open screenshot editor</a><a href="output/cpp-spanish-learners-v2/screenshots.zip">Download screenshots</a><a href="output/cpp-spanish-learners-v2/manifest.json">Asset manifest</a></nav><h2>Proposed promotional text · English (U.S.)</h2><p class="copy">{html.escape(promotional_text)}</p><small>Prepared for artwork review. Not uploaded or submitted to Apple. Existing campaigns unchanged.</small></header><main class="gallery">{cards}</main></html>'''
(root / 'apple-spanish-v2.html').write_text(page)
print(f'Packaged {len(images)} screenshots and {len(promotional_text)}-character promotional text.')

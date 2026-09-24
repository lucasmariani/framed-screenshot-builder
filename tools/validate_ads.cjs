const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const presets=require('../format-presets.js');
process.chdir(path.resolve(__dirname,'..'));
let count=0;
const campaign=process.argv[2];
const files=campaign?JSON.parse(fs.readFileSync(`campaigns/${campaign}-projects.json`)).map(p=>path.basename(p)):fs.readdirSync('projects').filter(n=>n.startsWith('spanish-')&&n.endsWith('.json'));
for(const file of files){
 const p=JSON.parse(fs.readFileSync('projects/'+file)),folder='output/'+file.slice(0,-5),preset=presets.find(x=>x.id===p.formatId);
 const metrics=JSON.parse(fs.readFileSync(folder+'/layout-metrics.json'));
 for(const scene of p.scenes){
  if(p.campaignId){
   assert.ok(!scene.layers.some(l=>l.id==='wordmark'),'No added wordmark');
   for(const l of scene.layers.filter(l=>l.type==='text'))assert.ok(l.fontSize*360/p.output.width>=(l.id==='title'?28:16),`${file}/${scene.id}: copy too small at phone width`);
   const d=scene.layers.find(l=>l.id==='device'),source=scene.sourceCrop;assert.ok(source&&source.height>0,'Explicit genuine screenshot crop required');
   assert.ok(d.width>=p.output.width*.4,'Device detail too small');
  }
  const b=fs.readFileSync(folder+'/'+scene.filename),w=b.readUInt32BE(16),h=b.readUInt32BE(20);
  assert.equal(w,p.output.width);assert.equal(h,p.output.height);
  if(p.creativeKind==='carousel')assert.equal(p.scenes.length,7);
  if(preset.maxBytes)assert.ok(b.length<=preset.maxBytes,`${file}/${scene.id}: file limit`);
  const m=metrics.find(x=>x.scene===scene.id),title=m.text.find(x=>x.id==='title'),sub=m.text.find(x=>x.id==='subtitle');
  assert.ok(title.bounds.y+title.bounds.height<=sub.bounds.y,`${file}/${scene.id}: copy overlap`);
  for(const t of m.text){
   const r=t.bounds;assert.ok(r.x>=0&&r.y>=0&&r.x+r.width<=w+.01&&r.y+r.height<=h+.01,`${file}/${scene.id}/${t.id}: clipped text`);
   assert.ok(t.lineWidths.every(l=>l<=r.width+.01),`${file}/${scene.id}/${t.id}: overflowing word`);
   if(p.safeInsets){const s=p.safeInsets;assert.ok(r.x>=w*s.left-.01&&r.y>=h*s.top-.01&&r.x+r.width<=w*(1-s.right)+.01&&r.y+r.height<=h*(1-s.bottom)+.01,`${file}/${scene.id}: text outside internal safe guide`);}
  }
  if(p.safeInsets){const d=scene.layers.find(l=>l.id==='device'),b=fs.readFileSync(d.src),dh=d.width*b.readUInt32BE(20)/b.readUInt32BE(16),s=p.safeInsets;assert.ok(d.x>=w*s.left&&d.y>=h*s.top&&d.x+d.width<=w*(1-s.right)&&d.y+dh<=h*(1-s.bottom),`${file}/${scene.id}: device outside internal safe guide`);}
  count++;
 }
}
console.log(`PASS: ${count} PNGs; exact dimensions, known file limits, copy bounds/wrapping/separation and vertical safe guide.`);

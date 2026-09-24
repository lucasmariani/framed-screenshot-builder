// Check foreground/background contrast at glyph locations using the editor renderer.
// Usage: OMATO_RENDER_FONTS=/path node tools/check_ad_contrast.cjs project.json report.json
// This is an internal artwork check, not a complete accessibility conformance audit.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {createCanvas,Image,GlobalFonts}=require('@napi-rs/canvas');
const project=JSON.parse(fs.readFileSync(path.resolve(process.argv[2]),'utf8'));
const reportPath=path.resolve(process.argv[3]);process.chdir(path.resolve(__dirname,'..'));
if(!process.env.OMATO_RENDER_FONTS)throw Error('Provide extracted local fonts');
const requiredFaces={'Baskerville':'Baskerville.ttf','Bodoni 72':'BodoniSvtyTwoITCTT-Bold.ttf'};
for(const scene of project.scenes)for(const layer of scene.layers)if(layer.type==='text'&&requiredFaces[layer.fontFamily]&&!fs.existsSync(path.join(process.env.OMATO_RENDER_FONTS,requiredFaces[layer.fontFamily])))throw Error('Missing extracted font face: '+requiredFaces[layer.fontFamily]);
for(const file of fs.readdirSync(process.env.OMATO_RENDER_FONTS))GlobalFonts.registerFromPath(path.join(process.env.OMATO_RENDER_FONTS,file));
const linear=v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;};
const luminance=(r,g,b)=>.2126*linear(r)+.7152*linear(g)+.0722*linear(b);
const measure=(back,mask,color)=>{
 if(!/^#[0-9a-f]{6}$/i.test(color))throw Error('Contrast checker requires opaque six-digit hex text colors');
 const fg=luminance(...[1,3,5].map(i=>parseInt(color.slice(i,i+2),16)));let min=Infinity,below=0,count=0;
 for(let i=0;i<mask.length;i+=4)if(mask[i+3]>=128){const bg=luminance(back[i],back[i+1],back[i+2]);const ratio=(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);min=Math.min(min,ratio);if(ratio<4.5)below++;count++;}
 if(!count)throw Error('No rendered text pixels');return {minimumRatio:Number(min.toFixed(2)),pixelsBelow4_5:below,glyphPixels:count,pass:below===0};
};
const context=vm.createContext({console,Image,URLSearchParams,TextEncoder,window:{location:{protocol:'http:',search:''}},localStorage:{getItem(){return null;}},document:{getElementById(){return{}},querySelector(){return{}},createElement(){return createCanvas(1,1)}},createCanvas,project,measure,fs,reportPath,process});
fs.mkdirSync(path.dirname(reportPath),{recursive:true});
const source=fs.readFileSync('editor.js','utf8').split('init().catch(')[0];
vm.runInContext(source+`
(async()=>{
 state.project=project;const results=[];
 for(const scene of project.scenes){
  const bg=createCanvas(project.output.width,project.output.height);
  await renderSceneToCanvas({...scene,layers:scene.layers.filter(l=>l.type!=='text')},bg);
  const pixels=bg.getContext('2d').getImageData(0,0,bg.width,bg.height).data;
  for(const layer of scene.layers.filter(l=>l.type==='text')){
   const mask=createCanvas(bg.width,bg.height);drawTextLayer(mask.getContext('2d'),{...layer,color:'#ffffff'});
   results.push({scene:scene.id,layer:layer.id,...measure(pixels,mask.getContext('2d').getImageData(0,0,bg.width,bg.height).data,layer.color)});
  }
 }
 fs.writeFileSync(reportPath,JSON.stringify({threshold:4.5,method:'Local sRGB background contrast at glyph-mask pixels with alpha >= 128; excludes antialiasing of the foreground and does not replace visual review.',results},null,2)+'\\n');
 console.log(results.filter(r=>!r.pass).length+' failed text layers / '+results.length);if(results.some(r=>!r.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
`,context);

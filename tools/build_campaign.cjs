// Reusable campaign compiler. Real UI is only framed, scaled and explicitly cropped.
// node tools/build_campaign.cjs campaigns/<audience>-vN.json
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
const {frameCapture}=require('./frame_capture.cjs');const presets=require('../format-presets.js');
const root=path.resolve(__dirname,'..');process.chdir(root);
const briefPath=process.argv[2];const brief=JSON.parse(fs.readFileSync(briefPath));
const dir=`project-assets/${brief.id}`;fs.mkdirSync(dir,{recursive:true});
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const txt=(id,text,x,y,width,size)=>({id,type:'text',name:id,text,x,y,width,fontFamily:id==='title'?'Bodoni 72':'Avenir Next',fontWeight:id==='title'?700:500,fontSize:size,lineHeight:id==='title'?1.03:1.14,letterSpacing:0,color:'#20251e',align:'left'});
const img=(id,src,x,y,width)=>({id,type:'image',name:id,src,x,y,width,rotation:0,opacity:1,shadow:false});
(async()=>{
 const provenance=[];
 for(const [id,a] of Object.entries(brief.assets)){
  const src=path.resolve(brief.captureRoot,a.file),dest=`${dir}/${id}.png`;
  if(a.framed)fs.copyFileSync(src,dest);else await frameCapture(src,dest);
  provenance.push({id,source:path.relative(path.dirname(root),src),sourceSha256:hash(src),framed:dest,framedSha256:hash(dest),method:a.framed?'User-selected historical framed vocabulary':'Official Xcode capture + iPhone 17 Pro silver frame'});
 }
 const outputs=[];
 for(const format of brief.formats){
  const preset=presets.find(p=>p.id===format.preset);if(!preset)throw Error('Unknown preset');
  const w=preset.width,h=preset.height,s=w/1200,landscape=h/w<.75,vertical=!!preset.safeInsets;
  const top=vertical?h*preset.safeInsets.top+24*s:48*s;
  const bottom=vertical?h*(1-preset.safeInsets.bottom)-24*s:h;
  const left=vertical?90*s:54*s,tw=w-left*2;
  const scenes=[];
  for(const [i,card] of brief[format.kind].entries()){
   const intro=card.id==='01-introduction';
   let title=card.title,subtitle=card.subtitle;
   let tx=left,ty=top,titleW=tw,ts=(intro?96:108)*s,sy=ty+(intro?220:246)*s,ss=56*s;
   let px=60*s,py=sy+(intro?286:168)*s,pw=1080*s,panelH=bottom-py;
   if(vertical){ts=104*s;sy=ty+244*s;py=sy+162*s;pw=1020*s;px=(w-pw)/2;panelH=bottom-py;}
   if(landscape){title=card.landscapeTitle||title;subtitle=card.landscapeSubtitle||subtitle;titleW=650*s;ts=96*s;sy=ty+254*s;ss=56*s;px=720*s;py=38*s;pw=480*s;panelH=h-py;}
   const original=await loadImage(`${dir}/${card.asset}.png`);
   const sourceY=brief.assets[card.asset].focusY;
   const cropH=Math.min(original.height-sourceY,Math.ceil(panelH*original.width/pw));
   const c=createCanvas(original.width,cropH),ctx=c.getContext('2d');ctx.beginPath();ctx.roundRect(0,0,original.width,cropH,50);ctx.clip();ctx.drawImage(original,0,sourceY,original.width,cropH,0,0,original.width,cropH);
   const focus=`${dir}/${format.preset}-${card.id}-focus.png`;fs.writeFileSync(focus,c.toBuffer('image/png'));
   const bg=`project-assets/reading-companion/${card.background}`;
   const bgImage=await loadImage(bg);const bgW=Math.max(w,h*bgImage.width/bgImage.height);
   const layers=[img('background',bg,(w-bgW)/2,(h-bgW*bgImage.height/bgImage.width)*.20,bgW),img('device',focus,px,py,pw),txt('title',title,tx,ty,titleW,ts),txt('subtitle',subtitle,tx,sy,titleW,ss)];
   scenes.push({id:card.id,name:title.replace(/\n/g,' '),filename:card.id+'.png',background:{color:'#f6f2e9',accent:'#a9b49e',accentX:w/2,accentY:h/2,accentRadius:w,accentOpacity:0,texture:0},layers,sourceFramed:`${dir}/${card.asset}.png`,sourceCrop:{x:0,y:sourceY,width:original.width,height:cropH},reviewNote:'Intentional device detail crop at mobile-readable scale; genuine UI pixels unchanged.'});
  }
  const file=`projects/${brief.id}-${format.preset}.json`;
  const p={version:1,name:`${brief.name} · ${format.kind} · ${preset.label}`,revision:brief.revision,campaignId:brief.id,creativeKind:format.kind,output:{width:w,height:h},formatId:preset.id,safeInsets:preset.safeInsets||null,locale:brief.locale,sourceLanguage:brief.sourceLanguage,definitionLanguage:brief.definitionLanguage,status:'awaiting-owner-artwork-review',editorPolicy:{omittedLayerIds:['wordmark']},scenes};
  fs.writeFileSync(file,JSON.stringify(p,null,2)+'\n');outputs.push(file);
 }
 fs.writeFileSync(`${dir}/provenance.json`,JSON.stringify({brief:briefPath,briefSha256:hash(briefPath),uiPolicy:'No recreated app UI; deterministic frame/scale/crop only',assets:provenance},null,2)+'\n');
 fs.writeFileSync(`campaigns/${brief.id}-projects.json`,JSON.stringify(outputs,null,2)+'\n');
 console.log(JSON.stringify(outputs));
})().catch(e=>{console.error(e);process.exitCode=1});

// Historical v1 reproduction only: Avenir subtitles are superseded by Baskerville Regular for new ads.
// Reproducible, editable projects using genuine captures and the existing App Store visual system.
// Run from any directory: NODE_PATH=... node tools/build_spanish_ads.cjs
const fs=require('node:fs'), path=require('node:path'), crypto=require('node:crypto');
const {frameCapture}=require('./frame_capture.cjs');
const presets=require('../format-presets.js');
const root=path.resolve(__dirname,'..');
const captureRoot=path.resolve(root,'../omato-ios/docs/marketing/drafts/reddit-spanish-2026-09-24/assets');
const target=path.join(root,'project-assets/spanish-learners');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const text=(id,text,x,y,width,fontSize,family='Bodoni 72',weight=700)=>({id,type:'text',name:id,text,x,y,width,fontFamily:family,fontWeight:weight,fontSize,lineHeight:1.06,letterSpacing:0,color:'#20251e',align:'left'});
const image=(id,src,x,y,width,shadow=false)=>({id,type:'image',name:id,src,x,y,width,rotation:0,opacity:1,shadow});
const stories=[
 ['01-meaning','01-meaning.png','Spanish word.\nEnglish meaning.','Look up crecer.\nSee “to grow”.','background-translation-v5.png'],
 ['02-vocabulary','vocabulary-populated-framed.png','Your words.\nOne place.','Keep the words\nyou look up.','background-book.png'],
 ['03-study-front','04-study-front.png','Recall the\nmeaning.','Recall the meaning\nbefore you reveal it.','background-paper.png'],
 ['04-study-back','05-study-back.png','Reveal.\nReview.\nRemember.','Practice with words\nyou have saved.','background-sage.png'],
 ['05-test-filled','06-test-filled.png','Know the\nSpanish word?','Read the meaning.\nType your answer.','background-test-v5.png'],
 ['06-test-correct','07-test-correct.png','Put your words\nto the test.','Check your answer.\nKeep practicing.','background-test-v5.png']
];
(async()=>{
 fs.mkdirSync(target,{recursive:true});const provenance=[];
 for(const [id,file] of stories){
  const source=path.join(captureRoot,file), dest=path.join(target,id+'.png');
  if(file.includes('framed')) fs.copyFileSync(source,dest);else await frameCapture(source,dest);
  provenance.push({asset:'project-assets/spanish-learners/'+id+'.png',sha256:hash(dest),source:path.relative(path.dirname(root),source),sourceSha256:hash(source),method:file.includes('framed')?'Exact reuse of existing framed vocabulary image':'frame_capture.cjs with iPhone_17_pro-silver-portrait'});
 }
 const formats=['reddit-carousel-square','google-app-landscape','google-app-portrait','meta-feed','meta-vertical'];
 for(const id of formats){
  const preset=presets.find(p=>p.id===id), w=preset.width,h=preset.height;
  const base=id==='google-app-landscape'?{w:1200,h:628,px:810,py:24,pw:270,tx:66,ty:150,tw:690,ts:76,sy:430,ss:32,wy:50,bgy:-560}:id==='meta-vertical'?{w:1440,h:2560,px:748,py:410,pw:574,tx:90,ty:650,tw:620,ts:104,sy:1070,ss:40,wy:440,bgy:0}:id==='reddit-carousel-square'?{w:1200,h:1200,px:630,py:70,pw:510,tx:66,ty:285,tw:550,ts:96,sy:650,ss:36,wy:125,bgy:-550}:{w:1200,h:1500,px:610,py:190,pw:530,tx:66,ty:380,tw:530,ts:90,sy:780,ss:36,wy:205,bgy:-450};
  const scale=w/base.w;
  const scenes=stories.map(([name,file,title,subtitle,bg])=>{
   const layers=[image('background',`project-assets/reading-companion/${bg}`,0,base.bgy,base.w),image('device',`project-assets/spanish-learners/${name}.png`,base.px,base.py,base.pw,true),text('title',title,base.tx,base.ty,base.tw,base.ts),text('subtitle',subtitle,base.tx,base.sy,base.tw,base.ss,'Avenir Next',500)];
   for(const l of layers){for(const key of ['x','y','width','fontSize'])if(l[key]!==undefined)l[key]*=scale;}
   return {id:name,name:title.replace(/\n/g,' '),filename:name+'.png',background:{color:'#f6f2e9',accent:'#a9b49e',accentX:w/2,accentY:h*.6,accentRadius:w,accentOpacity:0,texture:0},layers};
  });
  const project={version:1,name:`Omato · Spanish learners · en-US · ${preset.label}`,output:{width:w,height:h},formatId:id,safeInsets:preset.safeInsets||null,locale:'en-US',sourceLanguage:'es',definitionLanguage:'en',status:'review-draft-not-published',editorPolicy:{omittedLayerIds:['wordmark']},scenes};
  fs.writeFileSync(path.join(root,'projects','spanish-'+id+'.json'),JSON.stringify(project,null,2)+'\n');
 }
 fs.writeFileSync(path.join(target,'provenance.json'),JSON.stringify({captured:'2026-09-24',appSourceCommit:'7861ef02b04349793b3671c16f1146c3effa83a9',captureDevice:'iPhone 17 Simulator / iOS 27.0; 1206×2622',captureRoute:'Live manual-entry lookup; Study and Test; no camera/OCR demonstrated',fonts:'Bodoni 72 Bold; Avenir Next Medium (installed macOS faces, not redistributed)',assets:provenance},null,2)+'\n');
 console.log('Prepared six framed assets and five editable format projects.');
})().catch(e=>{console.error(e);process.exitCode=1;});

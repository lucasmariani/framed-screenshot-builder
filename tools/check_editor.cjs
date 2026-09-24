// Focused regression checks for canvas sizes, proportional fitting and legacy pixel output.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {execFileSync}=require('node:child_process');
const {createCanvas,Image,GlobalFonts}=require('@napi-rs/canvas');
process.chdir(path.resolve(__dirname,'..'));
if(process.env.OMATO_RENDER_FONTS)for(const f of fs.readdirSync(process.env.OMATO_RENDER_FONTS))GlobalFonts.registerFromPath(path.join(process.env.OMATO_RENDER_FONTS,f));
function context(source){const c=vm.createContext({console,Image,URLSearchParams,TextEncoder,window:{location:{protocol:'http:',search:''}},localStorage:{getItem(){return null}},document:{getElementById(){return{}},querySelector(){return{}},createElement(){return createCanvas(1,1)}},createCanvas});vm.runInContext(source.split('init().catch(')[0],c);return c;}
(async()=>{
 const c=context(fs.readFileSync('editor.js','utf8'));
 assert.equal(vm.runInContext("isValidProject({...BUILT_IN_PROJECT, output:{width:-1,height:1200}})",c),false);
 assert.equal(vm.runInContext("isValidProject({...BUILT_IN_PROJECT, output:{width:1200.5,height:1200}})",c),false);
 assert.equal(vm.runInContext("isValidProject({...BUILT_IN_PROJECT, output:{width:1200,height:628}})",c),true);
 const fixture={version:1,name:'check',output:{width:1200,height:1200},scenes:[{id:'test',name:'test',background:{color:'#ffffff',accent:'#ffffff',accentX:600,accentY:600,accentRadius:100,accentOpacity:0,texture:0},layers:[{id:'text',type:'text',text:'Example',x:100,y:100,width:400,fontSize:100,lineHeight:1,fontFamily:'Georgia',fontWeight:400,align:'left',color:'#000000'}]}]};
 c.fixture=fixture;
 vm.runInContext('state.project=fixture;resizeProject(state.project,{width:1200,height:628})',c);
 assert.ok(Math.abs(fixture.scenes[0].layers[0].fontSize-100*628/1200)<1e-10);
 assert.ok(Math.abs(fixture.scenes[0].layers[0].x-(100*628/1200+286))<1e-10);
 c.canvas=createCanvas(1,1);
 await vm.runInContext('renderSceneToCanvas(state.project.scenes[0],canvas)',c);
 assert.equal(c.canvas.width,1200);assert.equal(c.canvas.height,628);
 const pristine=c.canvas.toBuffer('image/png');
 vm.runInContext('state.project.safeInsets={top:.14,bottom:.35,left:.06,right:.06}',c);
 await vm.runInContext('renderSceneToCanvas(state.project.scenes[0],canvas)',c);
 assert.ok(pristine.equals(c.canvas.toBuffer('image/png')),'Safe guides must not leak into export');
 await vm.runInContext('renderSceneToCanvas(state.project.scenes[0],canvas,{guides:true})',c);
 assert.ok(!pristine.equals(c.canvas.toBuffer('image/png')),'Preview guide should be visible');
 await assert.rejects(vm.runInContext("drawImageLayer(canvas.getContext('2d'),{src:'project-assets/not-present.png'})",c));
 // Compare the same existing ASC scene against the pre-migration renderer using the same fonts/runtime.
 const baseline=execFileSync('git',['show','3499ec5:editor.js'],{encoding:'utf8'});
 const old=context(baseline), project=JSON.parse(fs.readFileSync('projects/reading-companion.json'));
 for(const ctx of [old,c]){ctx.fixture=structuredClone(project);ctx.canvas=createCanvas(1,1);await vm.runInContext('state.project=fixture;renderSceneToCanvas(state.project.scenes[0],canvas)',ctx);}
 assert.ok(old.canvas.toBuffer('image/png').equals(c.canvas.toBuffer('image/png')),'Legacy App Store render changed');
 console.log('PASS: valid sizes, proportional fitting, exact exports, preview-only guides, missing asset failure, unchanged legacy ASC pixels.');
})().catch(e=>{console.error(e);process.exitCode=1;});

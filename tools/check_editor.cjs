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

 const editable = context(fs.readFileSync('editor.js', 'utf8'));
 editable.console = { warn() {}, error() {} };
 editable.fixture = structuredClone(project);
 vm.runInContext(`
   window.clearTimeout = () => {};
   localStorage.setItem = () => { throw new Error('Storage quota exceeded'); };
   syncOutputControls = () => {};
   renderGallery = async () => {};
   selectScene = async (id) => { globalThis.displayedScene = id; };
   setStatus = (message) => { globalThis.statusMessage = message; };
 `, editable);
 await vm.runInContext("openProjectFile({ name: 'portable.json', text: async () => JSON.stringify(fixture) })", editable);
 assert.equal(editable.displayedScene, project.scenes[0].id, 'Opening a project must render even when autosave fails');
 assert.match(editable.statusMessage, /Autosave unavailable/);

 await vm.runInContext(`(async () => {
   const scene = currentScene();
   state.selectedLayerId = scene.layers.find(layer => layer.type === 'image').id;
   const previous = selectedLayer();
   const sourceBeforeImport = previous.src;
   const layerCountBeforeImport = scene.layers.length;
   fileAsDataUrl = async () => 'data:image/png;base64,invalid';
   loadImage = async () => { throw new Error('Invalid PNG'); };
   const file = { type: 'image/png', name: 'broken.png' };
   await addImageFromFile(file, true);
   await addImageFromFile(file);
   globalThis.imageImportPreservedProject = previous.src === sourceBeforeImport
     && scene.layers.length === layerCountBeforeImport;
 })()`, editable);
 assert.ok(editable.imageImportPreservedProject, 'Undecodable images must leave existing layers intact');
 assert.match(editable.statusMessage, /Could not load image: broken.png/);

 await vm.runInContext(`(async () => {
   state.project = {
     output: { width: 1200, height: 628 },
     scenes: [{ name: 'First', filename: 'first.png' }, { name: 'Second', filename: 'second.png' }]
   };
   globalThis.exportedScenes = [];
   exportScene = async (scene, output) => {
     exportedScenes.push(scene.name + ':' + output.width + 'x' + output.height);
     state.project = { output: { width: 100, height: 100 }, scenes: [] };
   };
   buildTar = async () => ({});
   downloadBlob = (_archive, filename) => { globalThis.archiveName = filename; };
   await exportAllScenes();
 })()`, editable);
 assert.deepEqual(Array.from(editable.exportedScenes), ['First:1200x628', 'Second:1200x628']);
 assert.equal(editable.archiveName, 'omato-screenshots-1200x628.tar');
 await assert.rejects(vm.runInContext(`
   state.project = { scenes: [{ filename: 'sample.png' }, { filename: 'SAMPLE.png' }] };
   exportAllScenes();
 `, editable), /Use unique screenshot filenames/);
 console.log('PASS: canvas and export checks, unchanged legacy ASC pixels, import and autosave recovery, and consistent batch exports.');
})().catch(e=>{console.error(e);process.exitCode=1;});

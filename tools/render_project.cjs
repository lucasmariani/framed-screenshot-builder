// Render an editor project with the same canvas layout functions used in editor.js.
// Usage: NODE_PATH=/path/to/node_modules node tools/render_project.cjs project.json output-dir
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createCanvas, Image, GlobalFonts } = require('@napi-rs/canvas');
const projectPath = path.resolve(process.argv[2]);
const outputDir = path.resolve(process.argv[3]);
process.chdir(path.resolve(__dirname, '..'));
if (process.env.OMATO_RENDER_FONTS) {
  for (const file of fs.readdirSync(process.env.OMATO_RENDER_FONTS)) {
    GlobalFonts.registerFromPath(path.join(process.env.OMATO_RENDER_FONTS, file));
  }
}
const source = fs.readFileSync('editor.js', 'utf8').split('init().catch(')[0];
const context = vm.createContext({
  console, Image, URLSearchParams, TextEncoder,
  window: { location: { protocol: 'http:', search: '' } },
  localStorage: { getItem() { return null; } },
  document: { getElementById() { return {}; }, querySelector() { return {}; },
    createElement(tag) { if (tag === 'canvas') return createCanvas(1320, 2868); return {}; } },
  createCanvas, fs, outputDir,
  inputProject: JSON.parse(fs.readFileSync(projectPath, 'utf8'))
});
fs.mkdirSync(outputDir, { recursive: true });
vm.runInContext(source + `
(async () => {
  state.project = inputProject;
  const metrics = [];
  for (const scene of state.project.scenes) {
    const canvas = createCanvas(1320, 2868);
    await renderSceneToCanvas(scene, canvas);
    fs.writeFileSync(outputDir + '/' + scene.filename, canvas.toBuffer('image/png'));
    const ctx = canvas.getContext('2d');
    metrics.push({scene:scene.id, text:scene.layers.filter(l=>l.type==='text').map(l=>({id:l.id,lines:linesForTextLayer(ctx,l),bounds:layerBounds(l)}))});
  }
  fs.writeFileSync(outputDir + '/layout-metrics.json', JSON.stringify(metrics,null,2));
  console.log('Rendered ' + state.project.scenes.length + ' scenes');
})().catch(error=>{console.error(error); throw error;});
`, context);

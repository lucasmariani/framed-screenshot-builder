// Author a new, editable ASC adaptation without overwriting approved social projects.
const fs = require('node:fs');
const path = require('node:path');
const { createCanvas } = require('@napi-rs/canvas');
process.chdir(path.resolve(__dirname, '..'));
const source = JSON.parse(fs.readFileSync('projects/spanish-meta-v3-carousel-square.json'));
const assets = 'project-assets/cpp-spanish-learners-v2';
fs.mkdirSync(assets, { recursive: true });
const wash = createCanvas(1320, 2868), ctx = wash.getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
gradient.addColorStop(0, 'rgba(246,242,233,0.96)');
gradient.addColorStop(0.72, 'rgba(246,242,233,0.94)');
gradient.addColorStop(1, 'rgba(246,242,233,0)');
ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1320, 1000);
fs.writeFileSync(`${assets}/ivory-copy-wash.png`, wash.toBuffer('image/png'));
const copy = [
  ['Build your Spanish\nvocabulary as you read.', 'Scan a page. Look up words.\nKeep them. Practice later.'],
  ['Take a photo\nas you read.', 'Start with a page\nin Spanish.'],
  ['Tap a word\nyou want to learn.', 'Select it in the scanned text.'],
  ['See what it means\nin English.', 'A translation, definition\nand example for context.'],
  ['Keep the words\nyou discover.', 'Every lookup is saved\nto your vocabulary.'],
  ['Study your\nnew words.', 'Recall the meaning.\nTap to reveal it.'],
  ['Test what\nyou remember.', 'Type the word.\nCheck your answer.']
];
const project = {
  version: 1, name: 'Language Learners · Spanish · App Store · v2',
  revision: 2, output: { width: 1320, height: 2868 }, formatId: 'asc-69',
  locale: 'en-US', sourceLanguage: 'es', definitionLanguage: 'en',
  status: 'awaiting-owner-artwork-review', editorPolicy: { omittedLayerIds: ['wordmark'] },
  sourceProject: 'projects/spanish-meta-v3-carousel-square.json',
  scenes: source.scenes.map((scene, i) => {
    const get = id => structuredClone(scene.layers.find(l => l.id === id));
    const background = get('background');
    Object.assign(background, { x: -2, y: 0, width: 1324 });
    const device = get('device');
    const width = i === 1 ? 1030 : 1140;
    Object.assign(device, { x: (1320-width)/2, y: 745, width });
    const title = get('title');
    Object.assign(title, { text: copy[i][0], x: 80, y: 95, width: 1160,
      fontSize: i === 0 ? 124 : 150, lineHeight: 1.06 });
    const subtitle = get('subtitle');
    Object.assign(subtitle, { text: copy[i][1], x: 84, y: 470, width: 1152,
      fontSize: 83, lineHeight: 1.18 });
    return { ...scene, creativeKind: 'app-store-screenshot',
      background: { ...scene.background, accentX: 660, accentY: 1434 },
      layers: [background, { id: 'contrast-wash', type: 'image', name: 'Soft ivory behind copy',
        src: `${assets}/ivory-copy-wash.png`, x: 0, y: 0, width: 1320,
        aspectRatio: 2868/1320, rotation: 0, opacity: 1, shadow: false }, device, title, subtitle] };
  })
};
fs.writeFileSync('projects/cpp-spanish-learners-v2.json', JSON.stringify(project, null, 2)+'\n');
console.log('Created seven editable ASC scenes. Nothing uploaded.');

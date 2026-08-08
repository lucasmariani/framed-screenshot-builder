const OUTPUT_SIZE = { width: 1320, height: 2868 };
const STORAGE_KEY = 'omato.ascScreenshotEditor.v1';
const PROJECT_VERSION = 1;
const ASSET_ROOT = 'project-assets/omato-asc';
const USE_EMBEDDED_ASSETS = window.location.protocol === 'file:'
  || new URLSearchParams(window.location.search).has('embeddedAssets');
const TITLE_PRESET = {
  x: 78,
  y: 120,
  width: 1164,
  fontFamily: 'Bodoni 72',
  fontWeight: 700,
  fontSize: 142,
  lineHeight: 0.96,
  color: '#090807'
};
const SUBTITLE_PRESET = {
  x: 80,
  y: 450,
  width: 1160,
  fontFamily: 'Avenir Next',
  fontWeight: 600,
  fontSize: 58,
  lineHeight: 1.1,
  color: '#11100f'
};

const textLayer = (id, name, text, options = {}) => ({
  id,
  type: 'text',
  name,
  text,
  x: options.x ?? 80,
  y: options.y ?? 130,
  width: options.width ?? 1160,
  fontFamily: options.fontFamily ?? 'Bodoni 72',
  fontWeight: options.fontWeight ?? 700,
  fontSize: options.fontSize ?? 184,
  lineHeight: options.lineHeight ?? 0.95,
  letterSpacing: options.letterSpacing ?? 0,
  color: options.color ?? '#090807',
  align: options.align ?? 'left'
});

const imageLayer = (id, name, src, options = {}) => ({
  id,
  type: 'image',
  name,
  src,
  x: options.x ?? 100,
  y: options.y ?? 640,
  width: options.width ?? 1040,
  rotation: options.rotation ?? 0,
  opacity: options.opacity ?? 1,
  shadow: options.shadow ?? true
});

const scene = (id, name, filename, reference, accent, layers, background = {}) => ({
  id,
  name,
  filename,
  referenceSrc: `${ASSET_ROOT}/${reference}`,
  background: {
    color: background.color ?? '#fbf8f1',
    accent,
    accentX: background.accentX ?? 660,
    accentY: background.accentY ?? 970,
    accentRadius: background.accentRadius ?? 760,
    accentOpacity: background.accentOpacity ?? 0.32,
    texture: background.texture ?? 0.13
  },
  layers
});

const BUILT_IN_PROJECT = {
  version: PROJECT_VERSION,
  name: 'Omato App Store Connect · en-US',
  output: { ...OUTPUT_SIZE },
  scenes: [
    scene(
      '01-scan',
      'Scan Words From Books',
      '01-scan-words-from-books.png',
      'reference-01-scan-words-from-books.png',
      '#f6a04d',
      [
        imageLayer('device-scan', 'Scan phone', `${ASSET_ROOT}/device-scan.png`, { x: 104, y: 650, width: 1110, rotation: 1.2 }),
        textLayer('title', 'Title', 'Scan Words\nFrom Books', TITLE_PRESET),
        textLayer('subtitle', 'Subtitle', 'Scan book pages without retyping.', SUBTITLE_PRESET)
      ],
      { accentY: 1040, accentRadius: 790, accentOpacity: 0.42 }
    ),
    scene(
      '02-meaning',
      'Tap A Word For Meaning',
      '02-tap-a-word-for-meaning.png',
      'reference-02-tap-a-word-for-meaning.png',
      '#b9d9ef',
      [
        imageLayer('device-scan-back', 'Scan phone', `${ASSET_ROOT}/device-scan.png`, { x: -84, y: 775, width: 720, rotation: -7.3, opacity: 0.92 }),
        imageLayer('device-detail', 'Meaning phone', `${ASSET_ROOT}/device-detail.png`, { x: 354, y: 704, width: 890, rotation: 1.6 }),
        textLayer('title', 'Title', 'Tap A Word\nFor Meaning', TITLE_PRESET),
        textLayer('subtitle', 'Subtitle', 'Get useful meanings in seconds.', SUBTITLE_PRESET)
      ],
      { accentX: 895, accentY: 910, accentRadius: 760, accentOpacity: 0.34 }
    ),
    scene(
      '03-vocabulary',
      'Save Vocabulary Fast',
      '03-save-vocabulary-fast.png',
      'reference-03-save-vocabulary-fast.png',
      '#dbe7c6',
      [
        imageLayer('device-detail-back', 'Detail phone', `${ASSET_ROOT}/device-detail.png`, { x: -42, y: 785, width: 700, rotation: -5.2, opacity: 0.9 }),
        imageLayer('device-list', 'Vocabulary phone', `${ASSET_ROOT}/device-list.png`, { x: 342, y: 710, width: 890, rotation: 1.8 }),
        textLayer('title', 'Title', 'Save Vocabulary\nFast', TITLE_PRESET),
        textLayer('subtitle', 'Subtitle', 'Keep every saved word organized.', SUBTITLE_PRESET)
      ],
      { accentX: 620, accentY: 930, accentRadius: 790, accentOpacity: 0.34 }
    ),
    scene(
      '04-practice',
      'Practice What You Read',
      '04-practice-what-you-read.png',
      'reference-04-practice-what-you-read.png',
      '#efc9d7',
      [
        imageLayer('device-practice-back', 'Practice menu phone', `${ASSET_ROOT}/device-practice.png`, { x: -62, y: 770, width: 700, rotation: -6.8, opacity: 0.94 }),
        imageLayer('device-study', 'Study session phone', `${ASSET_ROOT}/device-study.png`, { x: 355, y: 725, width: 875, rotation: 1.7 }),
        textLayer('title', 'Title', 'Practice What\nYou Read', TITLE_PRESET),
        textLayer('subtitle', 'Subtitle', 'Review the words you actually read.', SUBTITLE_PRESET)
      ],
      { accentX: 610, accentY: 930, accentRadius: 780, accentOpacity: 0.38 }
    ),
    scene(
      '05-test',
      'Test What You Remember',
      '05-test-what-you-remember.png',
      'reference-05-test-what-you-remember.png',
      '#f2b6ab',
      [
        imageLayer('device-test', 'Test session phone', `${ASSET_ROOT}/device-test.png`, { x: 165, y: 670, width: 990, rotation: 0 }),
        textLayer('title', 'Title', 'Test What\nYou Remember', TITLE_PRESET),
        textLayer('subtitle', 'Subtitle', 'Strengthen memory with active recall.', SUBTITLE_PRESET)
      ],
      { accentX: 660, accentY: 980, accentRadius: 820, accentOpacity: 0.44 }
    ),
    scene(
      '06-widget',
      'Review From Your Home Screen',
      '06-review-from-home-screen.png',
      'reference-06-review-from-home-screen.png',
      '#bfe8df',
      [
        imageLayer('device-widget', 'Widget phone', `${ASSET_ROOT}/device-widget.png`, { x: 150, y: 650, width: 1020, rotation: 0 }),
        textLayer('title', 'Title', 'Review From\nYour Home Screen', TITLE_PRESET),
        textLayer('subtitle', 'Subtitle', 'See saved words throughout your day.', SUBTITLE_PRESET)
      ],
      { accentX: 655, accentY: 900, accentRadius: 760, accentOpacity: 0.42 }
    )
  ]
};

const elements = {
  status: document.getElementById('editor-status'),
  sceneList: document.getElementById('scene-list'),
  sceneCount: document.getElementById('scene-count'),
  stageCanvas: document.getElementById('stage-canvas'),
  stageName: document.getElementById('stage-name'),
  stageHint: document.getElementById('stage-hint'),
  layerList: document.getElementById('layer-list'),
  inspectorTitle: document.getElementById('inspector-title'),
  sceneName: document.getElementById('scene-name'),
  sceneFilename: document.getElementById('scene-filename'),
  layerX: document.getElementById('layer-x'),
  layerY: document.getElementById('layer-y'),
  layerWidth: document.getElementById('layer-width'),
  layerWidthLabel: document.getElementById('layer-width-label'),
  textControls: document.getElementById('text-controls'),
  imageControls: document.getElementById('image-controls'),
  textContent: document.getElementById('text-content'),
  fontFamily: document.getElementById('font-family'),
  fontWeight: document.getElementById('font-weight'),
  customFont: document.getElementById('custom-font'),
  applyCustomFont: document.getElementById('apply-custom-font'),
  fontSize: document.getElementById('font-size'),
  lineHeight: document.getElementById('line-height'),
  letterSpacing: document.getElementById('letter-spacing'),
  textColor: document.getElementById('editor-text-color'),
  textAlign: document.getElementById('text-align'),
  imageSize: document.getElementById('image-size'),
  imageSizeValue: document.getElementById('image-size-value'),
  imageSmaller: document.getElementById('image-smaller'),
  imageLarger: document.getElementById('image-larger'),
  imageRotation: document.getElementById('image-rotation'),
  imageOpacity: document.getElementById('image-opacity'),
  imageShadow: document.getElementById('image-shadow'),
  backgroundColor: document.getElementById('background-color'),
  accentColor: document.getElementById('accent-color'),
  accentX: document.getElementById('accent-x'),
  accentY: document.getElementById('accent-y'),
  accentRadius: document.getElementById('accent-radius'),
  accentOpacity: document.getElementById('accent-opacity'),
  paperTexture: document.getElementById('paper-texture'),
  addImage: document.getElementById('add-image'),
  replaceImage: document.getElementById('replace-image'),
  duplicateLayer: document.getElementById('duplicate-layer'),
  moveLayerUp: document.getElementById('move-layer-up'),
  moveLayerDown: document.getElementById('move-layer-down'),
  deleteLayer: document.getElementById('delete-layer'),
  openProject: document.getElementById('open-project'),
  projectFile: document.getElementById('project-file'),
  saveProject: document.getElementById('save-project'),
  resetProject: document.getElementById('reset-project'),
  exportCurrent: document.getElementById('export-current'),
  exportAll: document.getElementById('export-all')
};

const state = {
  project: loadStoredProject() ?? clone(BUILT_IN_PROJECT),
  selectedSceneId: null,
  selectedLayerId: 'title',
  view: 'editable',
  imageCache: new Map(),
  drag: null,
  saveTimer: null,
  renderToken: 0,
  stageRenderToken: 0
};

state.selectedSceneId = state.project.scenes[0]?.id ?? null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadStoredProject() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (parsed?.version === PROJECT_VERSION && Array.isArray(parsed.scenes) && parsed.scenes.length) {
      return parsed;
    }
  } catch (error) {
    console.warn('Saved project could not be loaded', error);
  }
  return null;
}

function currentScene() {
  return state.project.scenes.find((item) => item.id === state.selectedSceneId) ?? state.project.scenes[0];
}

function selectedLayer() {
  return currentScene()?.layers.find((item) => item.id === state.selectedLayerId) ?? null;
}

function setStatus(message) {
  elements.status.textContent = message;
}

function clamp(value, min, max, fallback = min) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function sanitizeFilename(value, fallback = 'screenshot.png') {
  const safe = String(value || '')
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const filename = safe || fallback;
  return filename.toLowerCase().endsWith('.png') ? filename : `${filename}.png`;
}

function escapeFontFamily(value) {
  const family = String(value || 'system-ui').replace(/["\\]/g, '');
  return family === 'system-ui' ? family : `"${family}"`;
}

function uid(prefix) {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadImage(src) {
  if (!src) {
    return Promise.reject(new Error('Missing image source'));
  }
  if (state.imageCache.has(src)) {
    return state.imageCache.get(src);
  }
  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    const embeddedSource = USE_EMBEDDED_ASSETS
      ? globalThis.OMATO_EMBEDDED_DEVICE_ASSETS?.[src]
      : null;
    const resolvedSource = embeddedSource || src;
    image.src = resolvedSource.startsWith('data:') || resolvedSource.startsWith('blob:')
      ? resolvedSource
      : encodeURI(resolvedSource);
  });
  state.imageCache.set(src, promise);
  return promise;
}

async function ensureSceneAssets(targetScene, includeReference = false) {
  const sources = targetScene.layers
    .filter((layer) => layer.type === 'image' && layer.src)
    .map((layer) => layer.src);
  if (includeReference && targetScene.referenceSrc) {
    sources.push(targetScene.referenceSrc);
  }
  await Promise.allSettled(sources.map(loadImage));
}

function hexToRgb(hex) {
  const normalized = String(hex || '#000000').replace('#', '');
  const expanded = normalized.length === 3
    ? normalized.split('').map((part) => part + part).join('')
    : normalized.padEnd(6, '0').slice(0, 6);
  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16)
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function textureHash(x, y, seed = 17) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

function drawBackground(ctx, targetScene) {
  const background = targetScene.background;
  ctx.fillStyle = background.color;
  ctx.fillRect(0, 0, OUTPUT_SIZE.width, OUTPUT_SIZE.height);

  const gradient = ctx.createRadialGradient(
    background.accentX,
    background.accentY,
    0,
    background.accentX,
    background.accentY,
    background.accentRadius
  );
  gradient.addColorStop(0, rgba(background.accent, background.accentOpacity));
  gradient.addColorStop(0.52, rgba(background.accent, background.accentOpacity * 0.52));
  gradient.addColorStop(1, rgba(background.accent, 0));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, OUTPUT_SIZE.width, OUTPUT_SIZE.height);

  if (background.texture <= 0) {
    return;
  }
  ctx.save();
  ctx.globalAlpha = background.texture * 0.22;
  ctx.lineWidth = 0.8;
  for (let y = 12; y < OUTPUT_SIZE.height; y += 23) {
    for (let x = 10; x < OUTPUT_SIZE.width; x += 25) {
      const hash = textureHash(x, y, targetScene.id.length);
      const length = 2 + hash * 6;
      const angle = (hash - 0.5) * 1.8;
      ctx.strokeStyle = hash > 0.5 ? '#b8aa98' : '#ffffff';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
      ctx.stroke();
    }
  }
  ctx.restore();
}

async function drawImageLayer(ctx, layer) {
  try {
    const image = await loadImage(layer.src);
    layer.aspectRatio = image.naturalHeight / image.naturalWidth;
    const height = layer.width * layer.aspectRatio;
    const centerX = layer.x + layer.width / 2;
    const centerY = layer.y + height / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((layer.rotation * Math.PI) / 180);
    ctx.globalAlpha = layer.opacity;
    if (layer.shadow) {
      ctx.shadowColor = 'rgba(29, 23, 18, 0.22)';
      ctx.shadowBlur = 42;
      ctx.shadowOffsetY = 24;
    }
    ctx.drawImage(image, -layer.width / 2, -height / 2, layer.width, height);
    ctx.restore();
  } catch (error) {
    console.warn(error);
  }
}

function fontString(layer) {
  return `${Number(layer.fontWeight) || 400} ${layer.fontSize}px ${escapeFontFamily(layer.fontFamily)}`;
}

function measureWithTracking(ctx, text, tracking) {
  const base = ctx.measureText(text).width;
  return base + Math.max(0, text.length - 1) * tracking;
}

function wrapParagraph(ctx, paragraph, maxWidth, tracking) {
  if (!paragraph.trim()) {
    return [''];
  }
  const words = paragraph.split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measureWithTracking(ctx, candidate, tracking) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) {
    lines.push(line);
  }
  return lines;
}

function linesForTextLayer(ctx, layer) {
  ctx.font = fontString(layer);
  return String(layer.text ?? '')
    .split('\n')
    .flatMap((paragraph) => wrapParagraph(ctx, paragraph, layer.width, layer.letterSpacing || 0));
}

function drawTrackedText(ctx, text, x, y, layer) {
  const tracking = layer.letterSpacing || 0;
  if (!tracking) {
    ctx.fillText(text, x, y);
    return;
  }

  const totalWidth = measureWithTracking(ctx, text, tracking);
  let cursor = x;
  if (layer.align === 'center') {
    cursor -= totalWidth / 2;
  } else if (layer.align === 'right') {
    cursor -= totalWidth;
  }
  ctx.save();
  ctx.textAlign = 'left';
  for (const character of text) {
    ctx.fillText(character, cursor, y);
    cursor += ctx.measureText(character).width + tracking;
  }
  ctx.restore();
}

function drawTextLayer(ctx, layer) {
  ctx.save();
  ctx.font = fontString(layer);
  ctx.fillStyle = layer.color;
  ctx.textBaseline = 'top';
  ctx.textAlign = layer.align;
  const lines = linesForTextLayer(ctx, layer);
  const anchorX = layer.align === 'center'
    ? layer.x + layer.width / 2
    : layer.align === 'right'
      ? layer.x + layer.width
      : layer.x;
  const lineAdvance = layer.fontSize * layer.lineHeight;
  lines.forEach((line, index) => {
    drawTrackedText(ctx, line, anchorX, layer.y + index * lineAdvance, layer);
  });
  ctx.restore();
  return lines.length * lineAdvance;
}

async function renderSceneToCanvas(targetScene, canvas, options = {}) {
  const token = ++state.renderToken;
  canvas.width = options.width ?? OUTPUT_SIZE.width;
  canvas.height = options.height ?? OUTPUT_SIZE.height;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const scaleX = canvas.width / OUTPUT_SIZE.width;
  const scaleY = canvas.height / OUTPUT_SIZE.height;

  if (options.reference && targetScene.referenceSrc) {
    try {
      const reference = await loadImage(targetScene.referenceSrc);
      if (token !== state.renderToken && canvas === elements.stageCanvas) {
        return;
      }
      ctx.drawImage(reference, 0, 0, canvas.width, canvas.height);
      return;
    } catch (error) {
      console.warn(error);
    }
  }

  ctx.save();
  ctx.scale(scaleX, scaleY);
  drawBackground(ctx, targetScene);
  for (const layer of targetScene.layers) {
    if (layer.type === 'image') {
      await drawImageLayer(ctx, layer);
    } else if (layer.type === 'text') {
      drawTextLayer(ctx, layer);
    }
  }
  if (options.selection) {
    drawSelection(ctx, options.selection, targetScene);
  }
  ctx.restore();
}

function layerBounds(layer) {
  if (layer.type === 'text') {
    const temporary = document.createElement('canvas').getContext('2d');
    const lineCount = linesForTextLayer(temporary, layer).length;
    return {
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: Math.max(layer.fontSize, lineCount * layer.fontSize * layer.lineHeight),
      rotation: 0
    };
  }
  const ratio = Number(layer.aspectRatio) || (2868 / 1320);
  return {
    x: layer.x,
    y: layer.y,
    width: layer.width,
    height: layer.width * ratio,
    rotation: layer.rotation || 0
  };
}

function drawSelection(ctx, layer) {
  const bounds = layerBounds(layer);
  ctx.save();
  ctx.strokeStyle = '#f07f2f';
  ctx.fillStyle = '#fff8f1';
  ctx.lineWidth = 4;
  ctx.setLineDash([15, 10]);
  if (layer.type === 'image') {
    ctx.translate(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    ctx.rotate(((layer.rotation || 0) * Math.PI) / 180);
    ctx.strokeRect(-bounds.width / 2, -bounds.height / 2, bounds.width, bounds.height);
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(bounds.width / 2, bounds.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }
  ctx.restore();
}

async function renderGallery() {
  elements.sceneList.innerHTML = '';
  elements.sceneCount.textContent = `${state.project.scenes.length} scenes`;
  for (const targetScene of state.project.scenes) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scene-card';
    button.classList.toggle('active', targetScene.id === state.selectedSceneId);
    button.dataset.sceneId = targetScene.id;

    const canvas = document.createElement('canvas');
    canvas.width = 132;
    canvas.height = 287;
    const copy = document.createElement('span');
    copy.className = 'scene-card-copy';
    const title = document.createElement('strong');
    title.textContent = targetScene.name;
    const filename = document.createElement('span');
    filename.textContent = targetScene.filename;
    copy.append(title, filename);
    button.append(canvas, copy);
    button.addEventListener('click', () => selectScene(targetScene.id));
    elements.sceneList.appendChild(button);

    renderSceneToCanvas(targetScene, canvas, {
      width: 132,
      height: 287,
      reference: true
    });
  }
}

async function renderStage() {
  const targetScene = currentScene();
  if (!targetScene) {
    return;
  }
  const layer = selectedLayer();
  const renderToken = ++state.stageRenderToken;
  elements.stageName.textContent = targetScene.name;
  elements.stageHint.textContent = state.view === 'reference'
    ? 'Reference view is read-only'
    : layer
      ? `Selected: ${layer.name} · drag to move`
      : 'Select a layer to edit';
  elements.stageCanvas.classList.toggle('is-draggable', state.view === 'editable' && Boolean(layer));
  const buffer = document.createElement('canvas');
  await renderSceneToCanvas(targetScene, buffer, {
    reference: state.view === 'reference',
    selection: state.view === 'editable' ? layer : null
  });
  if (renderToken !== state.stageRenderToken) {
    return;
  }
  const ctx = elements.stageCanvas.getContext('2d', { alpha: false });
  ctx.clearRect(0, 0, elements.stageCanvas.width, elements.stageCanvas.height);
  ctx.drawImage(buffer, 0, 0);
}

async function updateSelectedThumbnail() {
  const targetScene = currentScene();
  const canvas = elements.sceneList.querySelector(`[data-scene-id="${CSS.escape(targetScene.id)}"] canvas`);
  if (!canvas) {
    return;
  }
  await renderSceneToCanvas(targetScene, canvas, { width: 132, height: 287 });
}

function renderLayerList() {
  const targetScene = currentScene();
  elements.layerList.innerHTML = '';
  [...targetScene.layers].reverse().forEach((layer) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'layer-button';
    button.classList.toggle('active', layer.id === state.selectedLayerId);
    const label = document.createElement('span');
    label.textContent = layer.name;
    const kind = document.createElement('span');
    kind.className = 'layer-kind';
    kind.textContent = layer.type;
    button.append(label, kind);
    button.addEventListener('click', () => selectLayer(layer.id));
    elements.layerList.appendChild(button);
  });
}

function addFontOptionIfNeeded(fontFamily) {
  if ([...elements.fontFamily.options].some((option) => option.value === fontFamily)) {
    return;
  }
  const option = document.createElement('option');
  option.value = fontFamily;
  option.textContent = fontFamily;
  elements.fontFamily.appendChild(option);
}

function syncInspector() {
  const targetScene = currentScene();
  const layer = selectedLayer();
  elements.sceneName.value = targetScene.name;
  elements.sceneFilename.value = targetScene.filename;
  elements.backgroundColor.value = targetScene.background.color;
  elements.accentColor.value = targetScene.background.accent;
  elements.accentX.value = Math.round(targetScene.background.accentX);
  elements.accentY.value = Math.round(targetScene.background.accentY);
  elements.accentRadius.value = Math.round(targetScene.background.accentRadius);
  elements.accentOpacity.value = targetScene.background.accentOpacity;
  elements.paperTexture.value = targetScene.background.texture;

  if (!layer) {
    elements.inspectorTitle.textContent = 'No layer selected';
    elements.textControls.hidden = true;
    elements.imageControls.hidden = true;
    return;
  }

  elements.inspectorTitle.textContent = layer.name;
  elements.layerX.value = Math.round(layer.x * 10) / 10;
  elements.layerY.value = Math.round(layer.y * 10) / 10;
  elements.layerWidth.value = Math.round(layer.width * 10) / 10;
  elements.layerWidthLabel.textContent = layer.type === 'image' ? 'Image width' : 'Text box width';
  elements.textControls.hidden = layer.type !== 'text';
  elements.imageControls.hidden = layer.type !== 'image';
  elements.duplicateLayer.disabled = layer.type !== 'image';

  if (layer.type === 'text') {
    addFontOptionIfNeeded(layer.fontFamily);
    elements.textContent.value = layer.text;
    elements.fontFamily.value = layer.fontFamily;
    elements.fontWeight.value = String(layer.fontWeight);
    elements.fontSize.value = layer.fontSize;
    elements.lineHeight.value = layer.lineHeight;
    elements.letterSpacing.value = layer.letterSpacing;
    elements.textColor.value = layer.color;
    elements.textAlign.value = layer.align;
  } else {
    elements.imageSize.value = clamp(layer.width, 40, 3000, 1000);
    elements.imageSizeValue.value = `${Math.round(layer.width)} px`;
    elements.imageRotation.value = layer.rotation;
    elements.imageOpacity.value = layer.opacity;
    elements.imageShadow.checked = Boolean(layer.shadow);
  }
}

async function selectScene(sceneId) {
  state.selectedSceneId = sceneId;
  const targetScene = currentScene();
  state.selectedLayerId = targetScene.layers.find((layer) => layer.id === 'title')?.id
    ?? targetScene.layers.at(-1)?.id
    ?? null;
  elements.sceneList.querySelectorAll('.scene-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.sceneId === sceneId);
  });
  await ensureSceneAssets(targetScene, true);
  renderLayerList();
  syncInspector();
  await renderStage();
}

async function selectLayer(layerId) {
  state.selectedLayerId = layerId;
  renderLayerList();
  syncInspector();
  await renderStage();
}

function scheduleProjectUpdate(message = 'Changes saved locally') {
  window.clearTimeout(state.saveTimer);
  state.saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.project));
      setStatus(message);
    } catch (error) {
      console.warn('Autosave failed', error);
      setStatus('Project changed · use Save project to keep custom image data');
    }
  }, 180);
}

async function commitVisualChange(message) {
  scheduleProjectUpdate(message);
  syncInspector();
  await renderStage();
  await updateSelectedThumbnail();
}

function updateSceneCardCopy() {
  const targetScene = currentScene();
  const card = elements.sceneList.querySelector(`[data-scene-id="${CSS.escape(targetScene.id)}"]`);
  if (!card) {
    return;
  }
  card.querySelector('strong').textContent = targetScene.name;
  card.querySelector('.scene-card-copy span').textContent = targetScene.filename;
}

function bindNumber(input, updater, options = {}) {
  input.addEventListener('input', async () => {
    const fallback = options.fallback?.() ?? 0;
    const value = clamp(input.value, options.min ?? -10000, options.max ?? 10000, fallback);
    updater(value);
    await commitVisualChange();
  });
}

function bindText(input, updater, options = {}) {
  input.addEventListener(options.event ?? 'input', async () => {
    updater(input.value);
    await commitVisualChange();
  });
}

function bindColor(input, updater) {
  input.addEventListener('input', async () => {
    updater(input.value);
    await commitVisualChange();
  });
}

function fileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error ?? new Error('File could not be read'));
    reader.readAsDataURL(file);
  });
}

async function addImageFromFile(file, replace = false) {
  if (!file?.type?.startsWith('image/')) {
    return;
  }
  const src = await fileAsDataUrl(file);
  const targetScene = currentScene();
  if (replace && selectedLayer()?.type === 'image') {
    const layer = selectedLayer();
    state.imageCache.delete(layer.src);
    layer.src = src;
    layer.name = file.name.replace(/\.[^.]+$/, '') || layer.name;
    await loadImage(src);
    await commitVisualChange(`Replaced ${layer.name}`);
    renderLayerList();
    elements.replaceImage.value = '';
    return;
  }

  const layer = imageLayer(uid('image'), file.name.replace(/\.[^.]+$/, '') || 'Image', src, {
    x: 210,
    y: 700,
    width: 900,
    rotation: 0,
    opacity: 1
  });
  targetScene.layers.push(layer);
  state.selectedLayerId = layer.id;
  await loadImage(src);
  renderLayerList();
  await commitVisualChange(`Added ${layer.name}`);
  elements.addImage.value = '';
}

function downloadBlob(blob, filename) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function canvasAsBlob(canvas, type = 'image/png') {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('The canvas could not be exported'));
      }
    }, type);
  });
}

function writeTarText(header, offset, length, value) {
  const bytes = new TextEncoder().encode(String(value));
  header.set(bytes.slice(0, length), offset);
}

function writeTarOctal(header, offset, length, value) {
  const text = Math.max(0, Number(value) || 0)
    .toString(8)
    .padStart(length - 2, '0');
  writeTarText(header, offset, length, `${text}\0`);
}

function tarHeader(filename, size) {
  const header = new Uint8Array(512);
  writeTarText(header, 0, 100, filename);
  writeTarOctal(header, 100, 8, 0o644);
  writeTarOctal(header, 108, 8, 0);
  writeTarOctal(header, 116, 8, 0);
  writeTarOctal(header, 124, 12, size);
  writeTarOctal(header, 136, 12, Math.floor(Date.now() / 1000));
  header.fill(32, 148, 156);
  header[156] = '0'.charCodeAt(0);
  writeTarText(header, 257, 6, 'ustar');
  writeTarText(header, 263, 2, '00');
  writeTarText(header, 265, 32, 'omato');
  writeTarText(header, 297, 32, 'omato');
  const checksum = header.reduce((total, byte) => total + byte, 0);
  const checksumText = checksum.toString(8).padStart(6, '0');
  writeTarText(header, 148, 8, `${checksumText}\0 `);
  return header;
}

async function buildTar(files) {
  const chunks = [];
  for (const file of files) {
    const data = new Uint8Array(await file.blob.arrayBuffer());
    chunks.push(tarHeader(file.filename, data.byteLength), data);
    const padding = (512 - (data.byteLength % 512)) % 512;
    if (padding) {
      chunks.push(new Uint8Array(padding));
    }
  }
  chunks.push(new Uint8Array(1024));
  return new Blob(chunks, { type: 'application/x-tar' });
}

async function exportScene(targetScene) {
  const canvas = document.createElement('canvas');
  await ensureSceneAssets(targetScene);
  await renderSceneToCanvas(targetScene, canvas);
  return canvasAsBlob(canvas);
}

async function exportCurrentScene() {
  const targetScene = currentScene();
  setStatus(`Rendering ${targetScene.name}…`);
  const blob = await exportScene(targetScene);
  downloadBlob(blob, sanitizeFilename(targetScene.filename));
  setStatus(`Exported ${sanitizeFilename(targetScene.filename)}`);
}

async function exportAllScenes() {
  const files = [];
  elements.exportAll.disabled = true;
  elements.exportCurrent.disabled = true;
  try {
    for (let index = 0; index < state.project.scenes.length; index += 1) {
      const targetScene = state.project.scenes[index];
      setStatus(`Rendering ${index + 1} of ${state.project.scenes.length}: ${targetScene.name}…`);
      files.push({
        filename: sanitizeFilename(targetScene.filename, `screenshot-${index + 1}.png`),
        blob: await exportScene(targetScene)
      });
    }
    const archive = await buildTar(files);
    downloadBlob(archive, 'omato-asc-en-US-screenshots.tar');
    setStatus(`Exported all ${files.length} screenshots at 1320 × 2868`);
  } finally {
    elements.exportAll.disabled = false;
    elements.exportCurrent.disabled = false;
  }
}

function saveProjectFile() {
  const projectBlob = new Blob(
    [JSON.stringify(state.project, null, 2)],
    { type: 'application/json' }
  );
  downloadBlob(projectBlob, 'omato-asc-editor-project.json');
  setStatus('Project file saved');
}

function isValidProject(project) {
  if (!project || project.version !== PROJECT_VERSION || !Array.isArray(project.scenes) || !project.scenes.length) {
    return false;
  }
  return project.scenes.every((targetScene) => (
    typeof targetScene.id === 'string'
    && typeof targetScene.name === 'string'
    && targetScene.background
    && Array.isArray(targetScene.layers)
    && targetScene.layers.every((layer) => (
      typeof layer.id === 'string'
      && (layer.type === 'text' || layer.type === 'image')
    ))
  ));
}

async function openProjectFile(file) {
  try {
    const parsed = JSON.parse(await file.text());
    if (!isValidProject(parsed)) {
      throw new Error('This is not an Omato ASC editor project');
    }
    state.project = parsed;
    state.project.output = { ...OUTPUT_SIZE };
    state.selectedSceneId = state.project.scenes[0].id;
    state.selectedLayerId = state.project.scenes[0].layers.find((layer) => layer.id === 'title')?.id
      ?? state.project.scenes[0].layers.at(-1)?.id
      ?? null;
    state.imageCache.clear();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.project));
    await renderGallery();
    await selectScene(state.selectedSceneId);
    setStatus(`Opened ${file.name}`);
  } catch (error) {
    console.error(error);
    setStatus(error.message || 'Project could not be opened');
  } finally {
    elements.projectFile.value = '';
  }
}

async function resetProject() {
  if (!window.confirm('Reset all six screenshots to the built-in editable project?')) {
    return;
  }
  state.project = clone(BUILT_IN_PROJECT);
  state.selectedSceneId = state.project.scenes[0].id;
  state.selectedLayerId = 'title';
  state.imageCache.clear();
  localStorage.removeItem(STORAGE_KEY);
  await renderGallery();
  await selectScene(state.selectedSceneId);
  setStatus('Project reset to the built-in Omato set');
}

async function moveSelectedLayer(direction) {
  const targetScene = currentScene();
  const index = targetScene.layers.findIndex((layer) => layer.id === state.selectedLayerId);
  if (index < 0) {
    return;
  }
  const nextIndex = clamp(index + direction, 0, targetScene.layers.length - 1, index);
  if (nextIndex === index) {
    return;
  }
  const [layer] = targetScene.layers.splice(index, 1);
  targetScene.layers.splice(nextIndex, 0, layer);
  renderLayerList();
  await commitVisualChange(direction > 0 ? 'Layer moved forward' : 'Layer moved backward');
}

async function duplicateSelectedLayer() {
  const layer = selectedLayer();
  if (!layer) {
    return;
  }
  const copy = clone(layer);
  copy.id = uid(layer.type);
  copy.name = `${layer.name} copy`;
  copy.x += 32;
  copy.y += 32;
  const targetScene = currentScene();
  const index = targetScene.layers.findIndex((item) => item.id === layer.id);
  targetScene.layers.splice(index + 1, 0, copy);
  state.selectedLayerId = copy.id;
  renderLayerList();
  await commitVisualChange(`Duplicated ${layer.name}`);
}

async function deleteSelectedLayer() {
  const layer = selectedLayer();
  if (!layer || layer.type !== 'image') {
    return;
  }
  const targetScene = currentScene();
  targetScene.layers = targetScene.layers.filter((item) => item.id !== layer.id);
  state.selectedLayerId = targetScene.layers.find((item) => item.id === 'title')?.id
    ?? targetScene.layers.at(-1)?.id
    ?? null;
  renderLayerList();
  await commitVisualChange(`Deleted ${layer.name}`);
}

function canvasPoint(event) {
  const rect = elements.stageCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (OUTPUT_SIZE.width / rect.width),
    y: (event.clientY - rect.top) * (OUTPUT_SIZE.height / rect.height)
  };
}

function containsPoint(layer, point) {
  const bounds = layerBounds(layer);
  if (layer.type === 'text' || !bounds.rotation) {
    return point.x >= bounds.x
      && point.x <= bounds.x + bounds.width
      && point.y >= bounds.y
      && point.y <= bounds.y + bounds.height;
  }
  const centerX = bounds.x + bounds.width / 2;
  const centerY = bounds.y + bounds.height / 2;
  const radians = (-bounds.rotation * Math.PI) / 180;
  const deltaX = point.x - centerX;
  const deltaY = point.y - centerY;
  const localX = deltaX * Math.cos(radians) - deltaY * Math.sin(radians) + centerX;
  const localY = deltaX * Math.sin(radians) + deltaY * Math.cos(radians) + centerY;
  return localX >= bounds.x
    && localX <= bounds.x + bounds.width
    && localY >= bounds.y
    && localY <= bounds.y + bounds.height;
}

function hitTest(point) {
  return [...currentScene().layers]
    .reverse()
    .find((layer) => containsPoint(layer, point)) ?? null;
}

function refreshPositionInputs() {
  const layer = selectedLayer();
  if (!layer) {
    return;
  }
  elements.layerX.value = Math.round(layer.x);
  elements.layerY.value = Math.round(layer.y);
}

function handlePointerDown(event) {
  if (state.view !== 'editable') {
    return;
  }
  const point = canvasPoint(event);
  const hit = hitTest(point);
  if (!hit) {
    return;
  }
  if (hit.id !== state.selectedLayerId) {
    state.selectedLayerId = hit.id;
    renderLayerList();
    syncInspector();
  }
  state.drag = {
    pointerId: event.pointerId,
    offsetX: point.x - hit.x,
    offsetY: point.y - hit.y
  };
  elements.stageCanvas.setPointerCapture(event.pointerId);
  renderStage();
  event.preventDefault();
}

function handlePointerMove(event) {
  if (!state.drag || state.drag.pointerId !== event.pointerId) {
    return;
  }
  const point = canvasPoint(event);
  const layer = selectedLayer();
  layer.x = Math.round(point.x - state.drag.offsetX);
  layer.y = Math.round(point.y - state.drag.offsetY);
  refreshPositionInputs();
  renderStage();
  event.preventDefault();
}

function handlePointerUp(event) {
  if (!state.drag || state.drag.pointerId !== event.pointerId) {
    return;
  }
  state.drag = null;
  if (elements.stageCanvas.hasPointerCapture(event.pointerId)) {
    elements.stageCanvas.releasePointerCapture(event.pointerId);
  }
  scheduleProjectUpdate('Layer position saved locally');
  updateSelectedThumbnail();
}

async function handleCanvasKeydown(event) {
  if (state.view !== 'editable' || !selectedLayer() || !event.key.startsWith('Arrow')) {
    return;
  }
  const amount = event.shiftKey ? 10 : 1;
  const layer = selectedLayer();
  if (event.key === 'ArrowLeft') layer.x -= amount;
  if (event.key === 'ArrowRight') layer.x += amount;
  if (event.key === 'ArrowUp') layer.y -= amount;
  if (event.key === 'ArrowDown') layer.y += amount;
  event.preventDefault();
  refreshPositionInputs();
  await commitVisualChange('Layer position saved locally');
}

function wireInspector() {
  elements.sceneName.addEventListener('input', () => {
    currentScene().name = elements.sceneName.value;
    elements.stageName.textContent = currentScene().name;
    updateSceneCardCopy();
    scheduleProjectUpdate();
  });
  elements.sceneFilename.addEventListener('input', () => {
    currentScene().filename = elements.sceneFilename.value;
    updateSceneCardCopy();
    scheduleProjectUpdate();
  });

  bindNumber(elements.layerX, (value) => { selectedLayer().x = value; }, { fallback: () => selectedLayer()?.x });
  bindNumber(elements.layerY, (value) => { selectedLayer().y = value; }, { fallback: () => selectedLayer()?.y });
  bindNumber(elements.layerWidth, (value) => { selectedLayer().width = value; }, {
    min: 20,
    max: 3000,
    fallback: () => selectedLayer()?.width
  });

  bindText(elements.textContent, (value) => { selectedLayer().text = value; });
  elements.fontFamily.addEventListener('change', async () => {
    selectedLayer().fontFamily = elements.fontFamily.value;
    await commitVisualChange();
  });
  elements.fontWeight.addEventListener('change', async () => {
    selectedLayer().fontWeight = Number(elements.fontWeight.value);
    await commitVisualChange();
  });
  elements.applyCustomFont.addEventListener('click', async () => {
    const family = elements.customFont.value.trim();
    if (!family || selectedLayer()?.type !== 'text') {
      return;
    }
    selectedLayer().fontFamily = family;
    addFontOptionIfNeeded(family);
    elements.fontFamily.value = family;
    await commitVisualChange(`Applied ${family}`);
  });
  bindNumber(elements.fontSize, (value) => { selectedLayer().fontSize = value; }, {
    min: 8,
    max: 500,
    fallback: () => selectedLayer()?.fontSize
  });
  bindNumber(elements.lineHeight, (value) => { selectedLayer().lineHeight = value; }, {
    min: 0.5,
    max: 3,
    fallback: () => selectedLayer()?.lineHeight
  });
  bindNumber(elements.letterSpacing, (value) => { selectedLayer().letterSpacing = value; }, {
    min: -20,
    max: 80,
    fallback: () => selectedLayer()?.letterSpacing
  });
  bindColor(elements.textColor, (value) => { selectedLayer().color = value; });
  elements.textAlign.addEventListener('change', async () => {
    selectedLayer().align = elements.textAlign.value;
    await commitVisualChange();
  });

  bindNumber(elements.imageSize, (value) => { selectedLayer().width = value; }, {
    min: 40,
    max: 3000,
    fallback: () => selectedLayer()?.width
  });
  elements.imageSmaller.addEventListener('click', async () => {
    const layer = selectedLayer();
    if (layer?.type !== 'image') {
      return;
    }
    layer.width = clamp(Math.round(layer.width * 0.9), 40, 3000, layer.width);
    await commitVisualChange(`Reduced ${layer.name}`);
  });
  elements.imageLarger.addEventListener('click', async () => {
    const layer = selectedLayer();
    if (layer?.type !== 'image') {
      return;
    }
    layer.width = clamp(Math.round(layer.width * 1.1), 40, 3000, layer.width);
    await commitVisualChange(`Enlarged ${layer.name}`);
  });

  bindNumber(elements.imageRotation, (value) => { selectedLayer().rotation = value; }, {
    min: -180,
    max: 180,
    fallback: () => selectedLayer()?.rotation
  });
  bindNumber(elements.imageOpacity, (value) => { selectedLayer().opacity = value; }, {
    min: 0,
    max: 1,
    fallback: () => selectedLayer()?.opacity
  });
  elements.imageShadow.addEventListener('change', async () => {
    selectedLayer().shadow = elements.imageShadow.checked;
    await commitVisualChange();
  });

  bindColor(elements.backgroundColor, (value) => { currentScene().background.color = value; });
  bindColor(elements.accentColor, (value) => { currentScene().background.accent = value; });
  bindNumber(elements.accentX, (value) => { currentScene().background.accentX = value; }, {
    fallback: () => currentScene().background.accentX
  });
  bindNumber(elements.accentY, (value) => { currentScene().background.accentY = value; }, {
    fallback: () => currentScene().background.accentY
  });
  bindNumber(elements.accentRadius, (value) => { currentScene().background.accentRadius = value; }, {
    min: 100,
    max: 2400,
    fallback: () => currentScene().background.accentRadius
  });
  bindNumber(elements.accentOpacity, (value) => { currentScene().background.accentOpacity = value; }, {
    min: 0,
    max: 1,
    fallback: () => currentScene().background.accentOpacity
  });
  bindNumber(elements.paperTexture, (value) => { currentScene().background.texture = value; }, {
    min: 0,
    max: 1,
    fallback: () => currentScene().background.texture
  });
}

function wireActions() {
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.view = button.dataset.view;
      document.querySelectorAll('[data-view]').forEach((candidate) => {
        candidate.classList.toggle('active', candidate === button);
      });
      await renderStage();
    });
  });
  elements.addImage.addEventListener('change', () => addImageFromFile(elements.addImage.files[0]));
  elements.replaceImage.addEventListener('change', () => addImageFromFile(elements.replaceImage.files[0], true));
  elements.duplicateLayer.addEventListener('click', duplicateSelectedLayer);
  elements.moveLayerUp.addEventListener('click', () => moveSelectedLayer(1));
  elements.moveLayerDown.addEventListener('click', () => moveSelectedLayer(-1));
  elements.deleteLayer.addEventListener('click', deleteSelectedLayer);
  elements.openProject.addEventListener('click', () => elements.projectFile.click());
  elements.projectFile.addEventListener('change', () => openProjectFile(elements.projectFile.files[0]));
  elements.saveProject.addEventListener('click', saveProjectFile);
  elements.resetProject.addEventListener('click', resetProject);
  elements.exportCurrent.addEventListener('click', async () => {
    try {
      await exportCurrentScene();
    } catch (error) {
      console.error(error);
      setStatus(error.message || 'Screenshot could not be exported');
    }
  });
  elements.exportAll.addEventListener('click', async () => {
    try {
      await exportAllScenes();
    } catch (error) {
      console.error(error);
      setStatus(error.message || 'Screenshots could not be exported');
    }
  });
  elements.stageCanvas.addEventListener('pointerdown', handlePointerDown);
  elements.stageCanvas.addEventListener('pointermove', handlePointerMove);
  elements.stageCanvas.addEventListener('pointerup', handlePointerUp);
  elements.stageCanvas.addEventListener('pointercancel', handlePointerUp);
  elements.stageCanvas.addEventListener('keydown', handleCanvasKeydown);
}

async function init() {
  wireInspector();
  wireActions();
  await renderGallery();
  await selectScene(state.selectedSceneId);
  setStatus(loadStoredProject() ? 'Restored local edits' : 'Omato ASC project ready');
}

init().catch((error) => {
  console.error(error);
  setStatus(error.message || 'Editor could not be started');
});

const FRAME_KIT = {
  device: 'iPhone 17 Pro Max 6.9"',
  frameSrc: '',
  outputSize: { width: 1470, height: 3000 },
  screenRect: { x: 76, y: 60, width: 1318, height: 2866 },
  cornerRadius: 234,
  scaleMode: 'cover'
};

const FRAME_BACKGROUND = { type: 'solid', solid: '#ffffff' };
const OUTPUT_FORMATS = {
  frame: { mime: 'image/jpeg', extension: 'jpeg', quality: 0.98 },
  frameTransparent: { mime: 'image/png', extension: 'png' },
  template: { mime: 'image/png', extension: 'png' }
};

const frameKit = JSON.parse(JSON.stringify(FRAME_KIT));
const OUTPUT_SIZE = { width: 1320, height: 2868 };

const EMBEDDED_MANIFEST = {
  "defaultId": "iPhone_17_pro_max-cosmic_orange-portrait",
  "frames": [
    {
      "cornerRadius": 201,
      "id": "iPhone_17-black-portrait",
      "label": "iPhone 17 \u2022 Black",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17-black-portrait.png"
    },
    {
      "cornerRadius": 201,
      "id": "iPhone_17-lavender-portrait",
      "label": "iPhone 17 \u2022 Lavender",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17-lavender-portrait.png"
    },
    {
      "cornerRadius": 201,
      "id": "iPhone_17-mist_blue-portrait",
      "label": "iPhone 17 \u2022 Mist Blue",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17-mist_blue-portrait.png"
    },
    {
      "cornerRadius": 201,
      "id": "iPhone_17-sage-portrait",
      "label": "iPhone 17 \u2022 Sage",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17-sage-portrait.png"
    },
    {
      "cornerRadius": 201,
      "id": "iPhone_17-white-portrait",
      "label": "iPhone 17 \u2022 White",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17-white-portrait.png"
    },
    {
      "cornerRadius": 199,
      "id": "iPhone_17_pro-cosmic_orange-portrait",
      "label": "iPhone 17 Pro \u2022 Cosmic Orange",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17_pro-cosmic_orange-portrait.png"
    },
    {
      "cornerRadius": 199,
      "id": "iPhone_17_pro-deep_blue-portrait",
      "label": "iPhone 17 Pro \u2022 Deep Blue",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17_pro-deep_blue-portrait.png"
    },
    {
      "cornerRadius": 199,
      "id": "iPhone_17_pro-silver-portrait",
      "label": "iPhone 17 Pro \u2022 Silver",
      "outputSize": {
        "height": 2760,
        "width": 1350
      },
      "screenRect": {
        "height": 2622,
        "width": 1206,
        "x": 72,
        "y": 69
      },
      "src": "assets/iPhone_17_pro-silver-portrait.png"
    },
    {
      "cornerRadius": 200,
      "id": "iPhone_17_pro_max-cosmic_orange-portrait",
      "label": "iPhone 17 Pro Max \u2022 Cosmic Orange",
      "outputSize": {
        "height": 3000,
        "width": 1470
      },
      "screenRect": {
        "height": 2868,
        "width": 1320,
        "x": 75,
        "y": 66
      },
      "src": "assets/iPhone_17_pro_max-cosmic_orange-portrait.png"
    },
    {
      "cornerRadius": 200,
      "id": "iPhone_17_pro_max-deep_blue-portrait",
      "label": "iPhone 17 Pro Max \u2022 Deep Blue",
      "outputSize": {
        "height": 3000,
        "width": 1470
      },
      "screenRect": {
        "height": 2868,
        "width": 1320,
        "x": 75,
        "y": 66
      },
      "src": "assets/iPhone_17_pro_max-deep_blue-portrait.png"
    },
    {
      "cornerRadius": 200,
      "id": "iPhone_17_pro_max-silver-portrait",
      "label": "iPhone 17 Pro Max \u2022 Silver",
      "outputSize": {
        "height": 3000,
        "width": 1470
      },
      "screenRect": {
        "height": 2868,
        "width": 1320,
        "x": 75,
        "y": 66
      },
      "src": "assets/iPhone_17_pro_max-silver-portrait.png"
    },
    {
      "cornerRadius": 199,
      "id": "iPhone_air-cloud_white-portrait",
      "label": "iPhone Air \u2022 Cloud White",
      "outputSize": {
        "height": 2880,
        "width": 1380
      },
      "screenRect": {
        "height": 2736,
        "width": 1260,
        "x": 60,
        "y": 72
      },
      "src": "assets/iPhone_air-cloud_white-portrait.png"
    },
    {
      "cornerRadius": 199,
      "id": "iPhone_air-light_gold-portrait",
      "label": "iPhone Air \u2022 Light Gold",
      "outputSize": {
        "height": 2880,
        "width": 1380
      },
      "screenRect": {
        "height": 2736,
        "width": 1260,
        "x": 60,
        "y": 72
      },
      "src": "assets/iPhone_air-light_gold-portrait.png"
    },
    {
      "cornerRadius": 199,
      "id": "iPhone_air-sky_blue-portrait",
      "label": "iPhone Air \u2022 Sky Blue",
      "outputSize": {
        "height": 2880,
        "width": 1380
      },
      "screenRect": {
        "height": 2736,
        "width": 1260,
        "x": 60,
        "y": 72
      },
      "src": "assets/iPhone_air-sky_blue-portrait.png"
    },
    {
      "cornerRadius": 199,
      "id": "iPhone_air-space_black-portrait",
      "label": "iPhone Air \u2022 Space Black",
      "outputSize": {
        "height": 2880,
        "width": 1380
      },
      "screenRect": {
        "height": 2736,
        "width": 1260,
        "x": 60,
        "y": 72
      },
      "src": "assets/iPhone_air-space_black-portrait.png"
    }
  ]
};

const TEMPLATE_DEFINITIONS = {
  template1: {
    id: 'template1',
    name: 'Hero',
    showSubtitle: true,
    device: { scale: 0.88, offsetX: 0, offsetY: 520 },
    text: {
      title: 'Scan Words From Books',
      subtitle: 'Capture text from books without retyping.',
      titleSize: 88,
      subtitleSize: 42,
      color: '#1f1b16',
      subtitleColor: '#4b4037',
      fontFamily: '"Bodoni 72", "Didot", "Times New Roman", serif',
      subtitleFontFamily: '"Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif',
      align: 'center',
      maxWidth: 1120,
      lineHeight: 1.04,
      topPadding: 156,
      subtitleSpacing: 28
    },
    background: { type: 'gradient', colors: ['#f7f1ea', '#eee6da'], solid: '#f7f1ea' }
  },
  template2: {
    id: 'template2',
    name: 'Feature',
    showSubtitle: true,
    device: { scale: 0.93, offsetX: 0, offsetY: 610 },
    text: {
      title: 'Save Vocabulary Fast',
      subtitle: 'Keep vocabulary searchable and organized.',
      titleSize: 84,
      subtitleSize: 40,
      color: '#1f1b16',
      subtitleColor: '#4b4037',
      fontFamily: '"Bodoni 72", "Didot", "Times New Roman", serif',
      subtitleFontFamily: '"Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif',
      align: 'center',
      maxWidth: 1110,
      lineHeight: 1.06,
      topPadding: 164,
      subtitleSpacing: 24
    },
    background: { type: 'gradient', colors: ['#faf5ee', '#ece8de'], solid: '#faf5ee' }
  },
  template3: {
    id: 'template3',
    name: 'Single line',
    showSubtitle: false,
    device: { scale: 0.95, offsetX: 0, offsetY: 570 },
    text: {
      title: 'Practice What You Read',
      titleSize: 88,
      color: '#1f1b16',
      fontFamily: '"Bodoni 72", "Didot", "Times New Roman", serif',
      align: 'center',
      maxWidth: 1120,
      lineHeight: 1.06,
      topPadding: 170
    },
    background: { type: 'gradient', colors: ['#faf5ef', '#ece5db'], solid: '#faf5ef' }
  },
  template4: {
    id: 'template4',
    name: 'Practice',
    showSubtitle: true,
    device: { scale: 0.96, offsetX: 0, offsetY: 620 },
    text: {
      title: 'Test What You Remember',
      subtitle: 'Use Test sessions to strengthen memory.',
      titleSize: 82,
      subtitleSize: 38,
      color: '#1f1b16',
      subtitleColor: '#4b4037',
      fontFamily: '"Bodoni 72", "Didot", "Times New Roman", serif',
      subtitleFontFamily: '"Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif',
      align: 'center',
      maxWidth: 1080,
      lineHeight: 1.05,
      topPadding: 164,
      subtitleSpacing: 22
    },
    background: { type: 'gradient', colors: ['#f6f0e8', '#ece7de'], solid: '#f6f0e8' }
  }
};

const MARKETING_PRESETS = {
  bookabularyAscRefresh: {
    id: 'bookabularyAscRefresh',
    name: 'Bookabulary ASC Refresh',
    items: [
      {
        templateId: 'template1',
        screenName: '01_scan',
        locale: 'en-US',
        headline: 'Scan Words From Books',
        subheadline: 'Capture text from books without retyping.'
      },
      {
        templateId: 'template2',
        screenName: '02_vocabulary',
        locale: 'en-US',
        headline: 'Tap A Word For Meaning',
        subheadline: 'Go from page to meaning in seconds.'
      },
      {
        templateId: 'template2',
        screenName: '03_detail',
        locale: 'en-US',
        headline: 'Save Vocabulary Fast',
        subheadline: 'Keep vocabulary searchable and organized.'
      },
      {
        templateId: 'template4',
        screenName: '04_study',
        locale: 'en-US',
        headline: 'Practice What You Read',
        subheadline: 'Turn saved words into repeat review.'
      },
      {
        templateId: 'template4',
        screenName: '05_test',
        locale: 'en-US',
        headline: 'Test What You Remember',
        subheadline: 'Use Test sessions to strengthen memory.'
      }
    ]
  }
};

const state = {
  mode: 'frame',
  frameBackgroundMode: 'solid',
  backgroundMode: 'gradient',
  templateId: 'template1',
  images: [],
  frame: null,
  manifest: null,
  outputs: [],
  enabled: true
};

const elements = {
  dropzone: document.getElementById('dropzone'),
  fileInput: document.getElementById('file-input'),
  status: document.getElementById('status'),
  previewGrid: document.getElementById('preview-grid'),
  count: document.getElementById('count'),
  downloadAll: document.getElementById('download-all'),
  clear: document.getElementById('clear'),
  frameSelect: document.getElementById('frame-select'),
  frameExportControls: document.getElementById('frame-export-controls'),
  templateControls: document.getElementById('template-controls'),
  applyBookabularyPreset: document.getElementById('apply-bookabulary-preset'),
  headlineSize: document.getElementById('headline-size'),
  subheadlineSize: document.getElementById('subheadline-size'),
  textColor: document.getElementById('text-color'),
  subtextColor: document.getElementById('subtext-color'),
  deviceScale: document.getElementById('device-scale'),
  deviceOffset: document.getElementById('device-offset'),
  bgColor: document.getElementById('bg-color')
};

const templates = JSON.parse(JSON.stringify(TEMPLATE_DEFINITIONS));

function getTemplate(templateId = state.templateId) {
  return templates[templateId] ?? templates[state.templateId];
}

function currentTemplate() {
  return getTemplate(state.templateId);
}

function templateForItem(item) {
  return getTemplate(item?.templateId);
}

function currentOutputFormat() {
  if (state.mode === 'template') {
    return OUTPUT_FORMATS.template;
  }
  return state.frameBackgroundMode === 'transparent'
    ? OUTPUT_FORMATS.frameTransparent
    : OUTPUT_FORMATS.frame;
}

function currentFrameBackground() {
  return state.mode === 'frame' && state.frameBackgroundMode === 'transparent'
    ? null
    : FRAME_BACKGROUND;
}

function syncFrameBackgroundInputs() {
  document.querySelectorAll('[data-frame-bg]').forEach((button) => {
    button.classList.toggle('active', button.dataset.frameBg === state.frameBackgroundMode);
  });
}

function syncModeInputs() {
  document.querySelectorAll('[data-mode]').forEach((button) => {
    const isActive = button.dataset.mode === (state.mode === 'frame' ? 'frame' : state.templateId);
    button.classList.toggle('active', isActive);
  });
}

function syncTemplateBackgroundInputs() {
  document.querySelectorAll('[data-bg]').forEach((button) => {
    button.classList.toggle('active', button.dataset.bg === currentTemplate().background.type);
  });
}

function updateModeVisibility() {
  if (elements.templateControls) {
    elements.templateControls.style.display = state.mode === 'template' ? 'grid' : 'none';
  }
  if (elements.frameExportControls) {
    elements.frameExportControls.style.display = state.mode === 'frame' ? 'grid' : 'none';
  }
}

init();

async function init() {
  syncTemplateInputs();
  syncFrameBackgroundInputs();
  syncModeInputs();
  syncTemplateBackgroundInputs();
  syncFrameInputs();
  updateSubtitleVisibility();
  updateModeVisibility();
  wireEvents();
  placeDropzone();

  await loadManifest();
}

function wireEvents() {
  elements.dropzone.addEventListener('dragover', (event) => {
    if (!state.enabled) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    elements.dropzone.classList.add('dragover');
  });

  elements.dropzone.addEventListener('dragleave', () => {
    if (!state.enabled) {
      return;
    }
    elements.dropzone.classList.remove('dragover');
  });

  elements.dropzone.addEventListener('drop', (event) => {
    if (!state.enabled) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    elements.dropzone.classList.remove('dragover');
    if (event.dataTransfer?.files?.length) {
      handleFiles(event.dataTransfer.files);
    }
  });

  elements.fileInput.addEventListener('change', (event) => {
    if (!state.enabled) {
      return;
    }
    if (event.target.files?.length) {
      handleFiles(event.target.files);
      event.target.value = '';
    }
  });

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.mode;
      if (mode === 'frame') {
        state.mode = 'frame';
      } else {
        state.mode = 'template';
        state.templateId = mode;
      }
      syncModeInputs();
      updateModeVisibility();
      updateSubtitleVisibility();
      syncTemplateInputs();
      syncTemplateBackgroundInputs();
      renderAll();
    });
  });

  if (elements.frameExportControls) {
    elements.frameExportControls.addEventListener('click', (event) => {
      const button = event.target.closest('[data-frame-bg]');
      if (!button || button.disabled) {
        return;
      }
      state.frameBackgroundMode = button.dataset.frameBg;
      syncFrameBackgroundInputs();
      renderAll();
    });
  }

  document.querySelectorAll('[data-bg]').forEach((button) => {
    button.addEventListener('click', () => {
      state.backgroundMode = button.dataset.bg;
      currentTemplate().background.type = state.backgroundMode;
      syncTemplateBackgroundInputs();
      renderAll();
    });
  });

  elements.frameSelect.addEventListener('change', async (event) => {
    const id = event.target.value;
    const frame = state.manifest?.frames?.find((item) => item.id === id);
    if (frame) {
      await applyFrame(frame);
    }
  });

  elements.headlineSize.addEventListener('input', (event) => {
    currentTemplate().text.titleSize = clampNumber(event.target.value, 10, 400, currentTemplate().text.titleSize);
    renderAll();
  });

  elements.subheadlineSize.addEventListener('input', (event) => {
    currentTemplate().text.subtitleSize = clampNumber(event.target.value, 10, 200, currentTemplate().text.subtitleSize ?? 44);
    renderAll();
  });

  elements.textColor.addEventListener('input', (event) => {
    currentTemplate().text.color = event.target.value;
    renderAll();
  });

  elements.subtextColor.addEventListener('input', (event) => {
    currentTemplate().text.subtitleColor = event.target.value;
    renderAll();
  });

  elements.deviceScale.addEventListener('input', (event) => {
    currentTemplate().device.scale = clampNumber(event.target.value, 0.6, 1.2, currentTemplate().device.scale);
    renderAll();
  });

  elements.deviceOffset.addEventListener('input', (event) => {
    currentTemplate().device.offsetY = clampNumber(event.target.value, -2000, 2000, currentTemplate().device.offsetY);
    renderAll();
  });

  elements.bgColor.addEventListener('input', (event) => {
    currentTemplate().background.solid = event.target.value;
    renderAll();
  });

  elements.applyBookabularyPreset?.addEventListener('click', () => {
    applyMarketingPreset('bookabularyAscRefresh');
  });

  elements.downloadAll.addEventListener('click', downloadAll);
  elements.clear.addEventListener('click', clearAll);
}

function syncTemplateInputs() {
  const template = currentTemplate();
  elements.headlineSize.value = template.text.titleSize ?? 96;
  elements.subheadlineSize.value = template.text.subtitleSize ?? 44;
  elements.textColor.value = template.text.color ?? '#1f1b16';
  elements.subtextColor.value = template.text.subtitleColor ?? '#4b4037';
  elements.deviceScale.value = template.device.scale;
  elements.deviceOffset.value = template.device.offsetY;
  elements.bgColor.value = template.background.solid;
  state.backgroundMode = template.background.type;
}

function updateSubtitleVisibility() {
  const template = currentTemplate();
  document.querySelectorAll('.template-subtitle-controls').forEach((el) => {
    if (!template.showSubtitle) {
      el.style.display = 'none';
      return;
    }
    const display = el.tagName === 'INPUT' ? 'block' : 'grid';
    el.style.display = display;
  });
}

function syncFrameInputs() {
  // No-op: screen rect inputs removed from the UI.
}

async function loadManifest() {
  try {
    if (location.protocol === 'file:') {
      if (!EMBEDDED_MANIFEST?.frames?.length) {
        throw new Error('Manifest not available');
      }
      await applyManifest(EMBEDDED_MANIFEST);
      return;
    }

    const response = await fetch('frame-manifest.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Manifest not found');
    }
    const manifest = await response.json();
    if (!manifest.frames?.length) {
      throw new Error('Manifest empty');
    }
    await applyManifest(manifest);
  } catch (error) {
    if (EMBEDDED_MANIFEST?.frames?.length) {
      await applyManifest(EMBEDDED_MANIFEST);
      elements.status.textContent = 'Frame kit ready (embedded manifest)';
      return;
    }
    disableApp('Error: frame manifest unavailable');
  }
}

function populateFrameSelect(frames, defaultId) {
  elements.frameSelect.innerHTML = '';
  frames.forEach((frame) => {
    const option = document.createElement('option');
    option.value = frame.id;
    option.textContent = frame.label ?? frame.id;
    if (frame.id === defaultId) {
      option.selected = true;
    }
    elements.frameSelect.appendChild(option);
  });
}

async function applyManifest(manifest) {
  state.manifest = manifest;
  populateFrameSelect(manifest.frames, manifest.defaultId);
  const defaultFrame = manifest.frames.find((item) => item.id === manifest.defaultId) || manifest.frames[0];
  await applyFrame(defaultFrame);
  setUiEnabled(true);
}

async function applyFrame(frame) {
  frameKit.device = frame.label ?? frame.id;
  frameKit.frameSrc = frame.src;
  frameKit.outputSize = frame.outputSize ?? FRAME_KIT.outputSize;
  frameKit.screenRect = frame.screenRect ?? FRAME_KIT.screenRect;
  frameKit.cornerRadius = frame.cornerRadius ?? FRAME_KIT.cornerRadius;
  syncFrameInputs();
  try {
    state.frame = await loadImage(encodeURI(frameKit.frameSrc));
    elements.status.textContent = `Frame loaded: ${frameKit.device}`;
    renderAll();
  } catch (error) {
    elements.status.textContent = `Failed to load frame: ${frameKit.device}`;
  }
}

async function handleFiles(fileList) {
  if (!state.enabled) {
    return;
  }
  elements.status.textContent = 'Loading screenshots...';
  const files = Array.from(fileList);
  const results = await Promise.allSettled(files.map(loadImageFromFile));
  const newItems = [];
  let failed = 0;
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      newItems.push({
        image: result.value,
        name: files[index].name,
        screenName: '',
        locale: '',
        headline: '',
        subheadline: '',
        templateId: state.templateId
      });
    } else {
      failed += 1;
    }
  });

  if (newItems.length) {
    state.images = state.images.concat(newItems);
    renderAll();
  }

  const total = state.images.length;
  elements.status.textContent = failed
    ? `${total} screenshot(s) loaded, ${failed} failed`
    : `${total} screenshot(s) loaded`;
}

function renderAll() {
  elements.previewGrid.innerHTML = '';
  state.outputs = [];

  if (!state.images.length || !state.frame) {
    elements.count.textContent = '0 processed';
    placeDropzone();
    return;
  }

  const filenames = computeFilenames();
  state.images.forEach((item, index) => {
    const framedCanvas = renderFramed(item.image);
    const renderedCanvas = state.mode === 'template' ? renderTemplate(framedCanvas, item) : framedCanvas;
    const itemTemplate = templateForItem(item);
    const finalOutput = normalizeOutputCanvas(renderedCanvas, {
      width: OUTPUT_SIZE.width,
      height: OUTPUT_SIZE.height,
      mode: 'contain',
      background: state.mode === 'template' ? itemTemplate.background : currentFrameBackground()
    });
    const filename = filenames[index];
    const card = renderPreviewCard(finalOutput, item, index, filename);
    elements.previewGrid.appendChild(card);
    state.outputs.push({ canvas: finalOutput, name: filename });
  });

  elements.count.textContent = `${state.outputs.length} processed`;
  placeDropzone();
  updateSubtitleVisibility();
}

function placeDropzone() {
  const count = state.images.length;
  elements.dropzone.classList.remove('dropzone--span', 'dropzone--empty');
  elements.previewGrid.classList.remove('is-empty');

  if (!count) {
    elements.previewGrid.classList.add('is-empty');
    elements.dropzone.classList.add('dropzone--empty');
  } else if (count % 2 === 0) {
    elements.dropzone.classList.add('dropzone--span');
  }

  elements.previewGrid.appendChild(elements.dropzone);
}

function renderFramed(sourceImage) {
  const canvas = document.createElement('canvas');
  canvas.width = frameKit.outputSize.width;
  canvas.height = frameKit.outputSize.height;

  const transparentFrameExport = state.mode === 'frame' && state.frameBackgroundMode === 'transparent';
  const ctx = canvas.getContext('2d', { alpha: transparentFrameExport });
  if (!transparentFrameExport) {
    fillCanvasBackground(ctx, canvas.width, canvas.height, FRAME_BACKGROUND);
  }

  const rect = frameKit.screenRect;
  const scale = Math.max(rect.width / sourceImage.width, rect.height / sourceImage.height);
  const drawWidth = sourceImage.width * scale;
  const drawHeight = sourceImage.height * scale;
  const drawX = rect.x + (rect.width - drawWidth) / 2;
  const drawY = rect.y + (rect.height - drawHeight) / 2;

  ctx.drawImage(sourceImage, drawX, drawY, drawWidth, drawHeight);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  roundedRectPath(ctx, rect.x, rect.y, rect.width, rect.height, frameKit.cornerRadius);
  ctx.fill();
  ctx.restore();

  ctx.drawImage(state.frame, 0, 0, canvas.width, canvas.height);

  return canvas;
}

function roundedRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function renderTemplate(framedCanvas, item) {
  const template = templateForItem(item);
  const canvas = document.createElement('canvas');
  canvas.width = OUTPUT_SIZE.width;
  canvas.height = OUTPUT_SIZE.height;
  const ctx = canvas.getContext('2d', { alpha: false });

  if (template.background.type === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, template.background.colors[0]);
    gradient.addColorStop(1, template.background.colors[1]);
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = template.background.solid;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scale = template.device.scale;
  const deviceWidth = framedCanvas.width * scale;
  const deviceHeight = framedCanvas.height * scale;
  const deviceX = (canvas.width - deviceWidth) / 2 + template.device.offsetX;
  const deviceY = template.device.offsetY;

  ctx.drawImage(framedCanvas, deviceX, deviceY, deviceWidth, deviceHeight);

  const topPadding = template.text.topPadding ?? Math.max(96, Math.round(canvas.height * 0.06));
  const maxWidth = Math.min(template.text.maxWidth, canvas.width - 120);

  const titleText = (item?.headline ?? '').trim() || template.text.title;
  if (titleText) {
    drawWrappedText(ctx, titleText, {
      x: canvas.width / 2,
      y: topPadding,
      maxWidth,
      fontSize: template.text.titleSize,
      color: template.text.color,
      align: template.text.align,
      lineHeight: template.text.lineHeight,
      fontFamily: template.text.fontFamily ?? '"Bodoni 72", "Didot", "Times New Roman", serif'
    });
  }

  const subtitleText = (item?.subheadline ?? '').trim() || template.text.subtitle;
  if (template.showSubtitle && subtitleText) {
    const spacing = template.text.subtitleSpacing ?? Math.round(template.text.titleSize * 0.6);
    drawWrappedText(ctx, subtitleText, {
      x: canvas.width / 2,
      y: topPadding + template.text.titleSize * template.text.lineHeight + spacing,
      maxWidth,
      fontSize: template.text.subtitleSize ?? 44,
      color: template.text.subtitleColor ?? '#4b4037',
      align: template.text.align,
      lineHeight: 1.2,
      fontFamily: template.text.subtitleFontFamily ?? template.text.fontFamily ?? '"Bodoni 72", "Didot", "Times New Roman", serif'
    });
  }

  return canvas;
}

function normalizeOutputCanvas(sourceCanvas, options = {}) {
  const width = options.width ?? OUTPUT_SIZE.width;
  const height = options.height ?? OUTPUT_SIZE.height;
  const mode = options.mode ?? 'contain';
  const background = options.background ?? null;

  if (sourceCanvas.width === width && sourceCanvas.height === height) {
    return sourceCanvas;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: !background });
  ctx.imageSmoothingQuality = 'high';

  if (background) {
    fillCanvasBackground(ctx, width, height, background);
  }

  const scale = mode === 'cover'
    ? Math.max(width / sourceCanvas.width, height / sourceCanvas.height)
    : Math.min(width / sourceCanvas.width, height / sourceCanvas.height);
  const drawWidth = sourceCanvas.width * scale;
  const drawHeight = sourceCanvas.height * scale;
  const drawX = (width - drawWidth) / 2;
  const drawY = (height - drawHeight) / 2;

  ctx.drawImage(sourceCanvas, drawX, drawY, drawWidth, drawHeight);
  return canvas;
}

function fillCanvasBackground(ctx, width, height, background) {
  if (background.type === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, background.colors[0]);
    gradient.addColorStop(1, background.colors[1]);
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = background.solid;
  }
  ctx.fillRect(0, 0, width, height);
}

function drawWrappedText(ctx, text, options) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  ctx.font = `${options.fontSize}px ${options.fontFamily}`;
  ctx.textAlign = options.align;
  ctx.fillStyle = options.color;

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    const { width } = ctx.measureText(testLine);
    if (width > options.maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  if (line) {
    lines.push(line);
  }

  let y = options.y;
  lines.forEach((ln) => {
    ctx.fillText(ln, options.x, y);
    y += options.fontSize * options.lineHeight;
  });
}

function renderPreviewCard(canvas, item, index, filename) {
  const card = document.createElement('div');
  card.className = 'preview-card';
  card.dataset.index = `${index}`;

  const preview = document.createElement('canvas');
  preview.width = canvas.width;
  preview.height = canvas.height;
  preview.getContext('2d').drawImage(canvas, 0, 0);

  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = filename;

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'screen-name-input';
  input.placeholder = 'Screen name';
  input.value = item.screenName ?? '';
  input.disabled = !state.enabled;
  input.addEventListener('input', () => {
    item.screenName = input.value.trim();
    updateAllFilenameDisplays();
  });

  const localeInput = document.createElement('input');
  localeInput.type = 'text';
  localeInput.className = 'locale-input';
  localeInput.placeholder = 'Locale (en-US)';
  localeInput.value = item.locale ?? '';
  localeInput.disabled = !state.enabled;
  localeInput.addEventListener('input', () => {
    item.locale = localeInput.value.trim();
    updateAllFilenameDisplays();
  });

  let templateSelect = null;
  let headlineInput = null;
  let subheadlineInput = null;
  if (state.mode === 'template') {
    templateSelect = document.createElement('select');
    templateSelect.className = 'card-template-select';
    Object.values(templates).forEach((template) => {
      const option = document.createElement('option');
      option.value = template.id;
      option.textContent = template.name;
      option.selected = (item.templateId ?? state.templateId) === template.id;
      templateSelect.appendChild(option);
    });
    templateSelect.disabled = !state.enabled;
    templateSelect.addEventListener('change', () => {
      item.templateId = templateSelect.value;
      syncCardTemplateVisibility(card, item);
      updatePreviewAtIndex(index);
    });

    headlineInput = document.createElement('input');
    headlineInput.type = 'text';
    headlineInput.className = 'headline-input';
    headlineInput.placeholder = 'Headline';
    headlineInput.value = item.headline ?? '';
    headlineInput.disabled = !state.enabled;
    headlineInput.addEventListener('input', () => {
      item.headline = headlineInput.value;
      updatePreviewAtIndex(index);
    });

    subheadlineInput = document.createElement('input');
    subheadlineInput.type = 'text';
    subheadlineInput.className = 'subheadline-input';
    subheadlineInput.placeholder = 'Subheadline';
    subheadlineInput.value = item.subheadline ?? '';
    subheadlineInput.disabled = !state.enabled;
    subheadlineInput.addEventListener('input', () => {
      item.subheadline = subheadlineInput.value;
      updatePreviewAtIndex(index);
    });
  }

  const button = document.createElement('button');
  button.textContent = 'Download';
  button.disabled = !state.enabled;
  button.addEventListener('click', () => {
    const output = state.outputs[index];
    const currentName = output?.name ?? filename;
    downloadCanvas(output?.canvas ?? canvas, currentName);
  });

  const removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.textContent = 'Remove';
  removeButton.disabled = !state.enabled;
  removeButton.addEventListener('click', () => {
    state.images.splice(index, 1);
    renderAll();
  });

  actions.append(button, removeButton);
  if (templateSelect && headlineInput && subheadlineInput) {
    card.append(preview, name, input, localeInput, templateSelect, headlineInput, subheadlineInput, actions);
    syncCardTemplateVisibility(card, item);
  } else {
    card.append(preview, name, input, localeInput, actions);
  }
  return card;
}

function updatePreviewAtIndex(index) {
  if (!state.enabled || !state.frame) {
    return;
  }
  const item = state.images[index];
  if (!item) {
    return;
  }

  const framedCanvas = renderFramed(item.image);
  const renderedCanvas = state.mode === 'template' ? renderTemplate(framedCanvas, item) : framedCanvas;
  const itemTemplate = templateForItem(item);
  const finalOutput = normalizeOutputCanvas(renderedCanvas, {
    width: OUTPUT_SIZE.width,
    height: OUTPUT_SIZE.height,
    mode: 'contain',
    background: state.mode === 'template' ? itemTemplate.background : currentFrameBackground()
  });

  const card = elements.previewGrid.querySelector(`.preview-card[data-index="${index}"]`);
  const preview = card?.querySelector('canvas');
  if (preview) {
    preview.width = finalOutput.width;
    preview.height = finalOutput.height;
    preview.getContext('2d').drawImage(finalOutput, 0, 0);
  }

  const name = state.outputs[index]?.name ?? computeFilenames()[index];
  state.outputs[index] = { canvas: finalOutput, name };
}

function syncCardTemplateVisibility(card, item) {
  const subheadlineInput = card.querySelector('.subheadline-input');
  if (!subheadlineInput) {
    return;
  }
  const template = templateForItem(item);
  subheadlineInput.style.display = template.showSubtitle ? 'block' : 'none';
}

function applyMarketingPreset(presetId) {
  const preset = MARKETING_PRESETS[presetId];
  if (!preset || !state.images.length) {
    return;
  }

  const appliedCount = Math.min(state.images.length, preset.items.length);
  for (let index = 0; index < appliedCount; index += 1) {
    const item = state.images[index];
    const slot = preset.items[index];
    item.templateId = slot.templateId;
    item.screenName = slot.screenName;
    item.locale = slot.locale;
    item.headline = slot.headline;
    item.subheadline = slot.subheadline;
  }

  state.mode = 'template';
  state.templateId = preset.items[0]?.templateId ?? state.templateId;
  syncModeInputs();
  updateModeVisibility();
  syncTemplateInputs();
  syncTemplateBackgroundInputs();
  updateSubtitleVisibility();
  renderAll();
  elements.status.textContent = `Applied ${preset.name} to ${appliedCount} screenshot(s)`;
}

async function downloadAll() {
  if (!state.outputs.length) {
    return;
  }

  if (window.showDirectoryPicker && location.protocol !== 'file:') {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      for (const output of state.outputs) {
        const fileHandle = await directoryHandle.getFileHandle(output.name, { create: true });
        const writable = await fileHandle.createWritable();
        const blob = await canvasToBlob(output.canvas);
        await writable.write(blob);
        await writable.close();
      }
      elements.status.textContent = `Saved ${state.outputs.length} file(s)`;
      return;
    } catch (error) {
      elements.status.textContent = 'Folder save unavailable, downloading files...';
    }
  }

  elements.status.textContent = 'Preparing archive...';
  try {
    await downloadAllAsTar();
    elements.status.textContent = `Downloaded ${state.outputs.length} file(s)`;
  } catch (error) {
    elements.status.textContent = 'Archive failed, downloading individually...';
    state.outputs.forEach((output) => downloadCanvas(output.canvas, output.name));
  }
}

function downloadCanvas(canvas, filename) {
  if (isSafari()) {
    downloadCanvasDataUrl(canvas, filename);
    return;
  }
  canvasToBlob(canvas).then((blob) => {
    if (!blob) {
      downloadCanvasDataUrl(canvas, filename);
      return;
    }
    downloadBlob(blob, filename);
  });
}

function canvasToBlob(canvas) {
  const { mime, quality } = currentOutputFormat();
  return new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
}

function downloadCanvasDataUrl(canvas, filename) {
  const { mime, quality } = currentOutputFormat();
  const dataUrl = canvas.toDataURL(mime, quality);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function downloadBlob(blob, filename) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadAllAsTar() {
  const entries = await Promise.all(
    state.outputs.map(async (output) => {
      const blob = await canvasToBlob(output.canvas);
      if (blob) {
        const buffer = await blob.arrayBuffer();
        return { name: output.name, data: new Uint8Array(buffer) };
      }
      const { mime, quality } = currentOutputFormat();
      const dataUrl = output.canvas.toDataURL(mime, quality);
      return { name: output.name, data: dataUrlToUint8(dataUrl) };
    })
  );

  const tarData = buildTar(entries);
  const tarName = `framed_screenshots_${new Date().toISOString().replace(/[:.]/g, '-')}.tar`;
  downloadBlob(new Blob([tarData], { type: 'application/x-tar' }), tarName);
}

function buildTar(entries) {
  const blocks = [];
  entries.forEach((entry) => {
    const header = new Uint8Array(512);
    writeString(header, 0, 100, entry.name);
    writeString(header, 100, 8, writeOctal(0o644, 8));
    writeString(header, 108, 8, writeOctal(0, 8));
    writeString(header, 116, 8, writeOctal(0, 8));
    writeString(header, 124, 12, writeOctal(entry.data.length, 12));
    writeString(header, 136, 12, writeOctal(Math.floor(Date.now() / 1000), 12));
    writeString(header, 148, 8, '        ');
    writeString(header, 156, 1, '0');
    writeString(header, 257, 6, 'ustar');
    writeString(header, 263, 2, '00');

    let sum = 0;
    for (let i = 0; i < header.length; i += 1) {
      sum += header[i];
    }
    writeString(header, 148, 8, writeChecksum(sum));

    blocks.push(header);
    blocks.push(entry.data);
    const pad = (512 - (entry.data.length % 512)) % 512;
    if (pad) {
      blocks.push(new Uint8Array(pad));
    }
  });
  blocks.push(new Uint8Array(1024));
  return concatUint8(blocks);
}

function writeString(buffer, offset, length, value) {
  const bytes = new TextEncoder().encode(value);
  const end = Math.min(bytes.length, length);
  buffer.set(bytes.subarray(0, end), offset);
}

function writeOctal(value, length) {
  const str = value.toString(8).padStart(length - 1, '0');
  return `${str}\0`;
}

function writeChecksum(value) {
  const str = value.toString(8).padStart(6, '0');
  return `${str}\0 `;
}

function concatUint8(chunks) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  chunks.forEach((chunk) => {
    result.set(chunk, offset);
    offset += chunk.length;
  });
  return result;
}

function dataUrlToUint8(dataUrl) {
  const base64 = dataUrl.split(',')[1] ?? '';
  const binary = atob(base64);
  const result = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    result[i] = binary.charCodeAt(i);
  }
  return result;
}

function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function buildBaseKey(item) {
  const frameBase = getFrameBaseName();
  const screenName = item.screenName ? `_${item.screenName}` : '';
  const localeText = item.locale ? `_${item.locale}` : '';
  const raw = `${frameBase}${screenName}${localeText}`;
  return sanitizeFilename(raw);
}

function getFrameBaseName() {
  const src = frameKit.frameSrc || 'frame';
  const parts = src.split('/');
  const name = parts[parts.length - 1] || 'frame';
  return name.replace(/\.[^/.]+$/, '');
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9-_.]+/g, '_');
}

function computeFilenames() {
  const { extension } = currentOutputFormat();
  const baseKeys = state.images.map((item) => buildBaseKey(item));
  const counts = new Map();
  baseKeys.forEach((key) => counts.set(key, (counts.get(key) ?? 0) + 1));
  const seen = new Map();

  return baseKeys.map((key) => {
    const count = counts.get(key) ?? 1;
    if (count <= 1) {
      return `${key}.${extension}`;
    }
    const next = (seen.get(key) ?? 0) + 1;
    seen.set(key, next);
    return `${key}_${next}.${extension}`;
  });
}

function updateAllFilenameDisplays() {
  const filenames = computeFilenames();
  const cards = elements.previewGrid.querySelectorAll('.preview-card');
  cards.forEach((card) => {
    const index = Number(card.dataset.index);
    const item = state.images[index];
    if (!item) {
      return;
    }
    const nameEl = card.querySelector('.name');
    const next = filenames[index];
    if (nameEl) {
      nameEl.textContent = next;
    }
    if (state.outputs[index]) {
      state.outputs[index].name = next;
    }
  });
}

function clearAll() {
  state.images = [];
  state.outputs = [];
  renderAll();
  elements.status.textContent = 'Cleared';
}

function setUiEnabled(enabled) {
  state.enabled = enabled;
  elements.dropzone.classList.toggle('is-disabled', !enabled);
  elements.fileInput.disabled = !enabled;
  elements.downloadAll.disabled = !enabled;
  elements.clear.disabled = !enabled;
  elements.frameSelect.disabled = !enabled;
  if (elements.applyBookabularyPreset) {
    elements.applyBookabularyPreset.disabled = !enabled;
  }
  document.querySelectorAll('.segmented-btn').forEach((button) => {
    // Keep frame-background toggle clickable to allow format switching even if other controls are disabled.
    if (button.dataset.frameBg) {
      button.disabled = false;
      return;
    }
    button.disabled = !enabled;
  });
  document.querySelectorAll('.controls input, .controls select, .template-controls input').forEach((input) => {
    input.disabled = !enabled;
  });
}

function disableApp(message) {
  state.enabled = false;
  state.frame = null;
  state.manifest = null;
  state.images = [];
  state.outputs = [];
  elements.status.textContent = message;
  elements.count.textContent = '0 processed';
  elements.previewGrid.innerHTML = '';
  setUiEnabled(false);
  placeDropzone();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImageFromFile(file) {
  if (window.createImageBitmap) {
    return createImageBitmap(file);
  }
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  URL.revokeObjectURL(url);
  return img;
}

function clampNumber(value, min, max, fallback) {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return fallback;
  }
  return Math.min(Math.max(num, min), max);
}

const FRAME_KIT = {
  device: 'iPhone 17 Pro Max 6.9"',
  frameSrc: 'frame.png',
  outputSize: { width: 1470, height: 3000 },
  screenRect: { x: 76, y: 60, width: 1318, height: 2866 },
  cornerRadius: 234,
  dynamicIsland: { x: 549, y: 150, width: 372, height: 67, radius: 34, padding: 4 },
  scaleMode: 'cover'
};

const frameKit = JSON.parse(JSON.stringify(FRAME_KIT));

const TEMPLATE_DEFAULTS = {
  canvas: { width: 1470, height: 3000 },
  device: { scale: 0.9, offsetX: 0, offsetY: 220 },
  text: {
    title: 'Build your vocabulary',
    subtitle: 'Scan any page, learn words instantly.',
    titleSize: 96,
    subtitleSize: 44,
    color: '#1f1b16',
    subtitleColor: '#4b4037',
    align: 'center',
    maxWidth: 1200,
    lineHeight: 1.1
  },
  background: { type: 'gradient', colors: ['#f7f1ea', '#e8efe9'], solid: '#f7f1ea' }
};

const state = {
  mode: 'frame',
  backgroundMode: 'gradient',
  prefix: '',
  images: [],
  frame: null,
  manifest: null,
  outputs: []
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
  prefix: document.getElementById('prefix'),
  templateControls: document.getElementById('template-controls'),
  screenX: document.getElementById('screen-x'),
  screenY: document.getElementById('screen-y'),
  screenW: document.getElementById('screen-w'),
  screenH: document.getElementById('screen-h'),
  cornerRadius: document.getElementById('corner-radius'),
  canvasWidth: document.getElementById('canvas-width'),
  canvasHeight: document.getElementById('canvas-height'),
  headline: document.getElementById('headline'),
  subheadline: document.getElementById('subheadline'),
  headlineSize: document.getElementById('headline-size'),
  subheadlineSize: document.getElementById('subheadline-size'),
  textColor: document.getElementById('text-color'),
  subtextColor: document.getElementById('subtext-color'),
  deviceScale: document.getElementById('device-scale'),
  deviceOffset: document.getElementById('device-offset'),
  bgColor: document.getElementById('bg-color')
};

const template = JSON.parse(JSON.stringify(TEMPLATE_DEFAULTS));

init();

async function init() {
  syncTemplateInputs();
  syncFrameInputs();

  await loadManifest();
  if (!state.manifest) {
    state.frame = await loadImage(frameKit.frameSrc);
    elements.status.textContent = 'Frame kit loaded';
  }

  wireEvents();
}

function wireEvents() {
  elements.dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    elements.dropzone.classList.add('dragover');
  });

  elements.dropzone.addEventListener('dragleave', () => {
    elements.dropzone.classList.remove('dragover');
  });

  elements.dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    elements.dropzone.classList.remove('dragover');
    if (event.dataTransfer?.files?.length) {
      handleFiles(event.dataTransfer.files);
    }
  });

  elements.fileInput.addEventListener('change', (event) => {
    if (event.target.files?.length) {
      handleFiles(event.target.files);
      event.target.value = '';
    }
  });

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-mode]').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      state.mode = button.dataset.mode;
      elements.templateControls.style.display = state.mode === 'template' ? 'grid' : 'none';
      renderAll();
    });
  });

  document.querySelectorAll('[data-bg]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-bg]').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      state.backgroundMode = button.dataset.bg;
      template.background.type = state.backgroundMode;
      renderAll();
    });
  });

  elements.prefix.addEventListener('input', (event) => {
    state.prefix = event.target.value.trim();
    renderAll();
  });

  elements.frameSelect.addEventListener('change', async (event) => {
    const id = event.target.value;
    const frame = state.manifest?.frames?.find((item) => item.id === id);
    if (frame) {
      await applyFrame(frame);
    }
  });

  elements.screenX.addEventListener('input', (event) => {
    frameKit.screenRect.x = clampNumber(event.target.value, 0, frameKit.outputSize.width, FRAME_KIT.screenRect.x);
    renderAll();
  });

  elements.screenY.addEventListener('input', (event) => {
    frameKit.screenRect.y = clampNumber(event.target.value, 0, frameKit.outputSize.height, FRAME_KIT.screenRect.y);
    renderAll();
  });

  elements.screenW.addEventListener('input', (event) => {
    frameKit.screenRect.width = clampNumber(event.target.value, 1, frameKit.outputSize.width, FRAME_KIT.screenRect.width);
    renderAll();
  });

  elements.screenH.addEventListener('input', (event) => {
    frameKit.screenRect.height = clampNumber(event.target.value, 1, frameKit.outputSize.height, FRAME_KIT.screenRect.height);
    renderAll();
  });

  elements.cornerRadius.addEventListener('input', (event) => {
    frameKit.cornerRadius = clampNumber(event.target.value, 0, 1000, FRAME_KIT.cornerRadius);
    renderAll();
  });

  elements.canvasWidth.addEventListener('input', (event) => {
    template.canvas.width = clampNumber(event.target.value, 1, 10000, TEMPLATE_DEFAULTS.canvas.width);
    renderAll();
  });

  elements.canvasHeight.addEventListener('input', (event) => {
    template.canvas.height = clampNumber(event.target.value, 1, 10000, TEMPLATE_DEFAULTS.canvas.height);
    renderAll();
  });

  elements.headline.addEventListener('input', (event) => {
    template.text.title = event.target.value;
    renderAll();
  });

  elements.subheadline.addEventListener('input', (event) => {
    template.text.subtitle = event.target.value;
    renderAll();
  });

  elements.headlineSize.addEventListener('input', (event) => {
    template.text.titleSize = clampNumber(event.target.value, 10, 400, TEMPLATE_DEFAULTS.text.titleSize);
    renderAll();
  });

  elements.subheadlineSize.addEventListener('input', (event) => {
    template.text.subtitleSize = clampNumber(event.target.value, 10, 200, TEMPLATE_DEFAULTS.text.subtitleSize);
    renderAll();
  });

  elements.textColor.addEventListener('input', (event) => {
    template.text.color = event.target.value;
    renderAll();
  });

  elements.subtextColor.addEventListener('input', (event) => {
    template.text.subtitleColor = event.target.value;
    renderAll();
  });

  elements.deviceScale.addEventListener('input', (event) => {
    template.device.scale = clampNumber(event.target.value, 0.6, 1.2, TEMPLATE_DEFAULTS.device.scale);
    renderAll();
  });

  elements.deviceOffset.addEventListener('input', (event) => {
    template.device.offsetY = clampNumber(event.target.value, -2000, 2000, TEMPLATE_DEFAULTS.device.offsetY);
    renderAll();
  });

  elements.bgColor.addEventListener('input', (event) => {
    template.background.solid = event.target.value;
    renderAll();
  });

  elements.downloadAll.addEventListener('click', downloadAll);
  elements.clear.addEventListener('click', clearAll);
}

function syncTemplateInputs() {
  elements.canvasWidth.value = template.canvas.width;
  elements.canvasHeight.value = template.canvas.height;
  elements.headline.value = template.text.title;
  elements.subheadline.value = template.text.subtitle;
  elements.headlineSize.value = template.text.titleSize;
  elements.subheadlineSize.value = template.text.subtitleSize;
  elements.textColor.value = template.text.color;
  elements.subtextColor.value = template.text.subtitleColor;
  elements.deviceScale.value = template.device.scale;
  elements.deviceOffset.value = template.device.offsetY;
  elements.bgColor.value = template.background.solid;
  elements.templateControls.style.display = 'none';
}

function syncFrameInputs() {
  elements.screenX.value = frameKit.screenRect.x;
  elements.screenY.value = frameKit.screenRect.y;
  elements.screenW.value = frameKit.screenRect.width;
  elements.screenH.value = frameKit.screenRect.height;
  elements.cornerRadius.value = frameKit.cornerRadius;
}

async function loadManifest() {
  try {
    const response = await fetch('frame-manifest.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Manifest not found');
    }
    const manifest = await response.json();
    if (!manifest.frames?.length) {
      return;
    }
    state.manifest = manifest;
    populateFrameSelect(manifest.frames, manifest.defaultId);
    const defaultFrame = manifest.frames.find((item) => item.id === manifest.defaultId) || manifest.frames[0];
    await applyFrame(defaultFrame);
  } catch (error) {
    elements.status.textContent = 'Using default frame';
    elements.frameSelect.innerHTML = '';
    const option = document.createElement('option');
    option.value = 'default';
    option.textContent = 'Default frame';
    option.selected = true;
    elements.frameSelect.appendChild(option);
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

async function applyFrame(frame) {
  frameKit.device = frame.label ?? frame.id;
  frameKit.frameSrc = frame.src;
  frameKit.outputSize = frame.outputSize ?? FRAME_KIT.outputSize;
  frameKit.screenRect = frame.screenRect ?? FRAME_KIT.screenRect;
  frameKit.cornerRadius = frame.cornerRadius ?? FRAME_KIT.cornerRadius;
  frameKit.dynamicIsland = frame.dynamicIsland ?? FRAME_KIT.dynamicIsland;

  syncFrameInputs();
  state.frame = await loadImage(encodeURI(frameKit.frameSrc));
  elements.status.textContent = `Frame loaded: ${frameKit.device}`;
  renderAll();
}

async function handleFiles(fileList) {
  elements.status.textContent = 'Loading screenshots...';
  const files = Array.from(fileList);
  const images = await Promise.all(files.map(loadImageFromFile));
  state.images = images.map((image, index) => ({
    image,
    name: files[index].name
  }));
  elements.status.textContent = `${state.images.length} screenshot(s) loaded`;
  renderAll();
}

function renderAll() {
  elements.previewGrid.innerHTML = '';
  state.outputs = [];

  if (!state.images.length || !state.frame) {
    elements.count.textContent = '0 processed';
    return;
  }

  state.images.forEach((item) => {
    const framedCanvas = renderFramed(item.image);
    const output = state.mode === 'template' ? renderTemplate(framedCanvas) : framedCanvas;
    const filename = buildFilename(item.name);
    const card = renderPreviewCard(output, filename);
    elements.previewGrid.appendChild(card);
    state.outputs.push({ canvas: output, name: filename });
  });

  elements.count.textContent = `${state.outputs.length} processed`;
}

function renderFramed(sourceImage) {
  const canvas = document.createElement('canvas');
  canvas.width = frameKit.outputSize.width;
  canvas.height = frameKit.outputSize.height;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  // Mask out the screenshot's dynamic island so the frame's island is clean.
  if (frameKit.dynamicIsland) {
    const island = frameKit.dynamicIsland;
    const pad = island.padding ?? 0;
    ctx.fillStyle = '#000';
    roundedRectPath(
      ctx,
      island.x - pad,
      island.y - pad,
      island.width + pad * 2,
      island.height + pad * 2,
      island.radius + pad
    );
    ctx.fill();
  }
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

function renderTemplate(framedCanvas) {
  const canvas = document.createElement('canvas');
  canvas.width = template.canvas.width;
  canvas.height = template.canvas.height;
  const ctx = canvas.getContext('2d');

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

  const topPadding = Math.max(96, Math.round(canvas.height * 0.06));
  const maxWidth = Math.min(template.text.maxWidth, canvas.width - 120);

  drawWrappedText(ctx, template.text.title, {
    x: canvas.width / 2,
    y: topPadding,
    maxWidth,
    fontSize: template.text.titleSize,
    color: template.text.color,
    align: template.text.align,
    lineHeight: template.text.lineHeight,
    fontFamily: '"Bodoni 72", "Didot", "Times New Roman", serif'
  });

  drawWrappedText(ctx, template.text.subtitle, {
    x: canvas.width / 2,
    y: topPadding + template.text.titleSize * template.text.lineHeight * 1.8,
    maxWidth,
    fontSize: template.text.subtitleSize,
    color: template.text.subtitleColor,
    align: template.text.align,
    lineHeight: 1.2,
    fontFamily: '"Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif'
  });

  return canvas;
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

function renderPreviewCard(canvas, filename) {
  const card = document.createElement('div');
  card.className = 'preview-card';

  const preview = document.createElement('canvas');
  preview.width = canvas.width;
  preview.height = canvas.height;
  preview.getContext('2d').drawImage(canvas, 0, 0);

  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = filename;

  const button = document.createElement('button');
  button.textContent = 'Download';
  button.addEventListener('click', () => downloadCanvas(canvas, filename));

  card.append(preview, name, button);
  return card;
}

async function downloadAll() {
  if (!state.outputs.length) {
    return;
  }

  if (window.showDirectoryPicker) {
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
      elements.status.textContent = 'Download cancelled';
      return;
    }
  }

  elements.status.textContent = 'Downloading files...';
  state.outputs.forEach((output, index) => {
    setTimeout(() => {
      downloadCanvas(output.canvas, output.name);
    }, index * 200);
  });
}

function downloadCanvas(canvas, filename) {
  canvasToBlob(canvas).then((blob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

function buildFilename(originalName) {
  const base = originalName.replace(/\.[^/.]+$/, '');
  const safe = base.replace(/[^a-zA-Z0-9-_]+/g, '_');
  const prefix = state.prefix ? `${state.prefix}_` : '';
  const suffix = state.mode === 'template' ? 'framed_template1' : 'framed';
  return `${prefix}${safe}__${suffix}.png`;
}

function clearAll() {
  state.images = [];
  state.outputs = [];
  elements.previewGrid.innerHTML = '';
  elements.count.textContent = '0 processed';
  elements.status.textContent = 'Cleared';
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

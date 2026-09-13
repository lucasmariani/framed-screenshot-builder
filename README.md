# Framed Screenshot Builder

Local-only, client-side tools for framing iPhone screenshots and editing Omato's App Store Connect artwork.

## Quick start

- Open `index.html` in a browser, or serve the folder locally:
  - `python3 -m http.server` (then visit `http://localhost:8000`)
- Drop screenshots into the UI.
- Switch between **Frame only** and the marketing templates.
- Use **Apply ASC Refresh Copy** to fill the first five screenshots with the current Bookabulary App Store copy, ordering, and template assignments.
- Adjust template settings globally, then fine-tune each screenshot with its own template and headline fields in the preview cards.
- Click **Download all**.

## ASC screenshot editor

### The Reading Companion campaign

Serve this folder locally and open `reading-companion.html` to review the eight-image
ivory-and-sage campaign selected on September 12, 2026. The gallery includes the
1320 × 2868 PNGs, a ZIP download, and an **Edit screenshots** link.

`editor.html?campaign=reading-companion` loads `projects/reading-companion.json`.
Its autosave is separate from the original editor project. Reset restores this
campaign. Titles, supporting copy, background photographs, and original device
captures remain separate editable layers. Use **Save project** for a portable
JSON with embedded assets. This campaign route requires the local HTTP server.

The campaign uses macOS **Bodoni 72 Bold** and **Avenir Next Medium**. Browser
exports use those installed fonts. Backgrounds are generated photographic assets;
all app UI comes from the supplied, unchanged framed captures.

For batch rendering, `tools/render_project.cjs` uses the editor's canvas renderer
with `@napi-rs/canvas`. Set `NODE_PATH` to a directory containing that package and
`OMATO_RENDER_FONTS` to a directory containing the individual font faces extracted
from the macOS font collections; registering only a TTC may select the wrong
weight. Run `node tools/render_project.cjs projects/reading-companion.json
output/reading-companion`. Exported review assets are checked in for immediate
preview; regenerate the PNGs and ZIP together after changing the project. Run
`python3 tools/package_campaign.py` (Pillow required) after rendering to rebuild
the RGB PNGs, ZIP, portable JSON, and small-size previews.

Revision 3 follows the reading journey: scan → tap a word → vocabulary list →
dictionary definition → Study → Test → translation. The opening scan device is
fully visible at 900 px wide, including its shutter and navigation controls.
Other scenes use a larger 1200 px device crop. Headlines remain 178 px and
supporting copy 90 px. The gallery defaults to a swipeable 264 px image preview.
Each revision preserves earlier browser autosaves under its previous key.
Revision 4 appends a conjugation image after translation: “Know your verb forms.”


### Original campaign

Open `editor.html` (or select **Open ASC Editor** from the frame builder) to edit the six current English App Store screenshots. The editor includes the current finished PNG beside an editable version of every scene.

For each screenshot you can:

- Edit title and subtitle text, font family, weight, size, line height, tracking, color, and alignment.
- Select, drag, position, resize with a dedicated slider or − / + controls, rotate, replace, duplicate, reorder, or delete image layers.
- Adjust the paper color, accent glow, and texture.
- Save/open a portable JSON project; browser edits also autosave locally.
- Export one full-resolution PNG or all six as a TAR archive. All exported PNGs are **1320 × 2868**.
- Keep the complete screenshot visible with the default **Fit** canvas mode, then switch to **Zoom** for detailed positioning.

The built-in editable scenes use extracted device artwork from the approved Omato compositions, while **Current PNG** always shows the original finished screenshot for comparison.
All six editable titles begin with one shared typography preset, and all six subtitles begin with a second shared preset, so the set is consistent before any per-scene changes.

Directly opening `editor.html` with a `file://` URL is supported. The editor loads its built-in device layers from `embedded-device-assets.js` in that mode so browsers do not taint the export canvas. Regenerate that bundle after changing a built-in device PNG:

```bash
node tools/generate_embedded_device_assets.mjs
node tools/generate_embedded_device_assets.mjs --check
```

Notes:
- Running via `http://localhost` enables directory saving in Chrome using the File System Access API.
- All processing happens locally in the browser; nothing is uploaded.

## Frame kit

- Frames directory: `assets/`
- Manifest: `frame-manifest.json`
- A manifest is required; if it's missing, the app disables uploads and downloads.
- Missing Dynamic Islands are composited at native screen scale: 376 × 110 pixels,
  centered 42 pixels below the screen top (60 pixels for iPhone Air). The resting
  size and standard offset were measured from the seven previous native Omato
  captures at 1206 × 2622; Air's offset follows its frame's sensor artwork.
  Screenshots that already contain a black island retain their original edges.

### Regenerate the manifest

If you add or replace frames, regenerate the manifest with:

```bash
swiftc -module-cache-path /tmp/swift-module-cache tools/generate_frame_manifest.swift -o /tmp/generate_frame_manifest
/tmp/generate_frame_manifest
```

The generator derives `assets/` and `frame-manifest.json` from this repo by default. You can also pass explicit paths:

```bash
/tmp/generate_frame_manifest /path/to/assets /path/to/frame-manifest.json
```

Update the `FRAME_KIT` constants in `app.js` only if you change the base frame geometry defaults.

## Templates

Template outputs are fixed at **1320 x 2868**. All previews and downloads are normalized to this size.

The builder now includes marketing-focused layouts:

- `Hero` for the opening scan/value-prop screenshot
- `Feature` for list/detail screenshots with headline + supporting line
- `Single line` for simpler headline-led compositions
- `Practice` for study/test screenshots that need a larger device treatment

Each screenshot card can override the active template so a full App Store set can be exported in a single batch.

## Alpha channels

Frame-only exports now support two options in the UI:

- **Solid (JPEG)**: flattens onto a solid background (default white) for App Store Connect-safe output.
- **Transparent (PNG)**: preserves alpha around the framed device.

You can change the solid color by editing `FRAME_BACKGROUND` in `app.js`.

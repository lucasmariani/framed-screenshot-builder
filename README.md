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

Open `editor.html` (or select **Open ASC Editor** from the frame builder) to edit the six current English App Store screenshots. The editor includes the current finished PNG beside an editable version of every scene.

For each screenshot you can:

- Edit title and subtitle text, font family, weight, size, line height, tracking, color, and alignment.
- Select, drag, position, resize, rotate, replace, duplicate, reorder, or delete image layers.
- Adjust the paper color, accent glow, and texture.
- Save/open a portable JSON project; browser edits also autosave locally.
- Export one full-resolution PNG or all six as a TAR archive. All exported PNGs are **1320 × 2868**.

The built-in editable scenes use extracted device artwork from the approved Omato compositions, while **Current PNG** always shows the original finished screenshot for comparison.
All six editable titles begin with one shared typography preset, and all six subtitles begin with a second shared preset, so the set is consistent before any per-scene changes.

Notes:
- Running via `http://localhost` enables directory saving in Chrome using the File System Access API.
- All processing happens locally in the browser; nothing is uploaded.

## Frame kit

- Frames directory: `assets/`
- Manifest: `frame-manifest.json`
- A manifest is required; if it's missing, the app disables uploads and downloads.

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

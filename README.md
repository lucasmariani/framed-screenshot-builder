# Framed Screenshot Builder

Local-only, client-side mockup tool for 6.9" iPhone frames. Drag screenshots in, get framed PNGs out.

## Quick start

- Open `index.html` in a browser, or serve the folder locally:
  - `python3 -m http.server` (then visit `http://localhost:8000`)
- Drop screenshots into the UI.
- Switch between **Frame only** and the marketing templates.
- Use **Apply ASC Refresh Copy** to fill the first five screenshots with the current Bookabulary App Store copy, ordering, and template assignments.
- Adjust template settings globally, then fine-tune each screenshot with its own template and headline fields in the preview cards.
- Click **Download all**.

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

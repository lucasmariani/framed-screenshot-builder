# Framed Screenshot Builder

Local-only, client-side mockup tool for 6.9" iPhone frames. Drag screenshots in, get framed PNGs out.

## Quick start

- Open `index.html` in a browser, or serve the folder locally:
  - `python3 -m http.server` (then visit `http://localhost:8000`)
- Drop screenshots into the UI.
- Switch between **Frame only** and **Template 1**.
- Click **Download all**.

Notes:
- Running via `http://localhost` enables directory saving in Chrome using the File System Access API.
- All processing happens locally in the browser; nothing is uploaded.

## Frame kit

- Frames directory: `frame assets/`
- Manifest: `frame-manifest.json`
- Default frame: `frame.png` (fallback when manifest isn't available)

### Regenerate the manifest

If you add or replace frames, regenerate the manifest with:

```bash
swiftc -module-cache-path /tmp/swift-module-cache tools/generate_frame_manifest.swift -o /tmp/generate_frame_manifest
/tmp/generate_frame_manifest
```

Update the `FRAME_KIT` constants in `app.js` only if you change the fallback `frame.png`.

## Template 1

Template output size is configurable in the UI. If you need App Store Connect sizes, set the canvas width/height in the template settings and re-render.

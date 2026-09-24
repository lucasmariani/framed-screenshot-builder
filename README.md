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


### Custom product pages — September 21, 2026

The Readers and Language Learners variants reuse the Reading Companion artwork
and unchanged app captures. Their editable projects are
`projects/cpp-readers.json` and `projects/cpp-language-learners.json`; final RGB
PNGs are in the corresponding `output/cpp-*` folders. Upload the eight numbered
PNGs in numeric order to App Store Connect's iPhone 6.9-inch screenshot slot.
Each export is 1320 × 2868 and has no alpha channel.

Readers opens with “Look up words in your books.” and follows photo → word
selection → dictionary → saved vocabulary → Study → Test → translation →
conjugations. Language Learners opens with “Practice the words you look up.” and
follows Study → Test → saved vocabulary → photo → word selection → dictionary →
translation → conjugations. Both photo cards say “Take a photo of the page
you’re reading.” The learner headline uses 160 px to fit cleanly in two lines.

Only the changed compositions were rendered for these exports; all other PNGs
were copied from the Reading Companion exports to preserve their exact artwork.
The renderer above can render either project; normalize any regenerated PNGs to
RGB before uploading. Font files remain local and are not checked in.

App Store Connect pages:

- [Readers](https://appstoreconnect.apple.com/apps/6756230098/distribution/productpages/f5fa86e5-b893-4af2-8a19-0b20880ac9d7)
- [Language Learners](https://appstoreconnect.apple.com/apps/6756230098/distribution/productpages/628048f8-8712-481d-8bc9-95b5961f7449)

These are English-US custom pages, separate from the main listing. Their copy,
keywords, review status, and deferred metadata are recorded in the sibling iOS
repository's `docs/APP_STORE_ASO_2026-09-21.md`.

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

Revision 5 refines only the backgrounds of Test, Translation, and Conjugations:
three photographic ivory/paper/bookcloth compositions replace the repeated sage
curve. The first five exports, all copy, and all device layers remain unchanged.

### Multi-format advertising studio — September 24, 2026

Open `spanish-learners.html` for the six-card Spanish-learner story, using the real
**crecer → to grow** lookup, the existing populated vocabulary asset, Study and
filled/correct Test screens. It includes **30 exported PNGs across five layouts**,
editable JSON and local ZIP downloads. These are local review drafts, not published ads.

`editor.html?project=projects/spanish-reddit-carousel-square.json` opens the square
set. The inspector now offers 12 named App Store, Reddit, Meta and Google image
presets plus custom 100–8192 pixel dimensions. Canvas size is preserved through
save/open, autosave/reload, thumbnails, pointer coordinates and PNG/archive export.
Each project route has isolated autosave; existing App Store routes retain theirs.
Applying another size fits layers uniformly. Recompose the background, copy and
phone for the placement rather than assuming a proportional fit is finished art.
Safe-area guides affect preview only.

`format-presets.js` records primary sources and dates. The current checked guides are:

- [Reddit image formats](https://www.business.reddit.com/learning-hub/articles/reddit-image-ad-specs) and [carousel](https://www.business.reddit.com/advertise/ad-types/carousel-ads): these have different file limits. The six-card primary export is 1200 × 1200.
- [Google App campaign image assets](https://support.google.com/google-ads/answer/9948381): 1200 × 1200, 1200 × 628, 1200 × 1500 recommended, up to 5 MB. The Reddit square set can also supply square image candidates; it is not automatically a Google carousel campaign.
- Meta's official guides, read in browser after web extraction returned login pages: [Facebook Feed image](https://www.facebook.com/business/ads-guide/update/image/facebook-feed) and [Instagram Feed image](https://www.facebook.com/business/ads-guide/update/image/instagram-feed), 1440 × 1800; [Instagram Stories image](https://www.facebook.com/business/ads-guide/update/image/instagram-story), 1440 × 2560; [Facebook Feed carousel](https://www.facebook.com/business/ads-guide/update/carousel), at least 1080 × 1080. These pages displayed the Awareness objective. Confirm install-campaign placement previews before upload. The Stories guide reserves 14% top, 35% bottom and 6% sides for essential elements; other placements are not implicitly verified.

#### Local reproduction

Load Codex workspace dependencies for Node, its `node_modules` and Python. Set
`NODE_PATH` accordingly. Extract installed macOS font faces with
`python tools/prepare_fonts.py /tmp/omato-font-faces` (fontTools), then set
`OMATO_RENDER_FONTS=/tmp/omato-font-faces`. Font files remain local, outside git.
The renderer requires the font directory for the Omato typefaces.

```sh
node tools/build_spanish_ads.cjs
node tools/render_project.cjs projects/spanish-reddit-carousel-square.json output/spanish-reddit-carousel-square
# Repeat render_project for the other four projects/spanish-*.json files.
node tools/check_editor.cjs
node tools/validate_ads.cjs
python3 tools/package_spanish_ads.py
```

The generator is specific to this capture set and overwrites its generated JSON;
inspect and preserve manual edits first. Raw screenshots remain in the iOS draft,
framed assets and hashes in `project-assets/spanish-learners/`, final output hashes
in `output/spanish-ads-manifest.json`. ZIPs are reproducible local files excluded
from git. Required missing images fail export rather than silently disappearing.

The reusable operational skill is versioned at
`skills/omato-marketing-screenshots/SKILL.md` and installed in Lucas's personal
Codex skills under the same name. Invoke **$omato-marketing-screenshots** for
future simulator capture, localization, framing and artwork production.

### Audience campaigns: carousel and standalone images

The current review is `spanish-learners.html`; its editor links use new v3 routes,
so prior autosaves and artwork remain intact. `campaigns/spanish-learners-v3.json`
is the example brief for future audiences and languages. It separates language
pair, genuine captures, seven-card story, standalone messages and format presets.

With the documented Node dependencies and extracted font faces configured:

```sh
node tools/build_campaign.cjs campaigns/spanish-learners-v3.json
# Render each entry in campaigns/spanish-learners-v3-projects.json:
node tools/render_project.cjs projects/<name>.json output/<name>
node tools/validate_ads.cjs spanish-learners-v3
python3 tools/package_ad_campaign.py spanish-learners-v3
```

These are explicit-generation tools: preserve edits before regenerating. For a
new audience, create a new brief and capture that language's real UI; translating
headlines alone is insufficient. Source crops are recorded per scene and preserve
real pixels. Inspect the 360 px gallery, including each crop's meaningful content.
The checks enforce internal marketing font targets (28 px headings, 16 px support
at 360 px display width), dimensions and known placement limits. These are design
targets, not provider eligibility guarantees. Owner review remains required before
upload; tools do not publish ads.

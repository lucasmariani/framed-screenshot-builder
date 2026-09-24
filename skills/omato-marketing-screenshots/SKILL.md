---
name: omato-marketing-screenshots
description: Capture genuine Omato simulator screens in one or more languages, frame them with the existing iPhone artwork, and compose editable App Store or advertising creatives with verified fonts and placement dimensions. Use for Omato screenshot, carousel, App Store, Reddit, Meta, Instagram or Google creative production; not campaign activation.
---

# Omato capture → frame → compose → verify

Use the saved checkout `/Users/lucas/Developer/Omato/framed-screenshot-builder`. This is an operational skill, not a Template Gallery artifact. Its versioned source is `skills/omato-marketing-screenshots/` in that repository. Announce this skill on first use.

## Establish the brief and authority

Read workspace/repository AGENTS instructions and `omato-ios/docs/MARKETING_AUDIENCE_INSIGHTS.md`, then the appropriate provider playbook and creative registry under `omato-ios/docs/marketing/`. Reuse current user decisions without asking again. Drafting, simulator capture, local rendering and reversible builder changes do not imply ad activation, new spending, app release or backend deployment.

Record a capture matrix before a multilingual batch. Keep these independent: **interface locale**, **source word/text language**, **definition/translation language**, **ad-copy locale**, **storefront**. English UI with Spanish words is not a Spanish UI localization. Start with the requested pair; do not invent a multi-country rollout. Maintain identical stories/copy intent across locales, but allow different wrapping and word choice. Get unfamiliar translations reviewed rather than silently correcting screenshots.

## Capture genuine app states

1. Read `/Users/lucas/.codex/references/apple-development.md` once, then the personal `xcode-device-interaction` skill. Use official `mcp__xcode__*` tools for discovery, build/install and UI operations. Native CLI is a supported-operation fallback only; never XcodeBuildMCP. One owner handles each interaction session and closes it on success or failure. Do not delegate without applicable authorization.
2. Inspect git status, source commit, app version/build, scheme, runtime and target. Prefer an isolated simulator with no personal iCloud data. Do not reset a user's existing simulator or personal vocabulary merely for attractive captures.
3. Use `DeviceInteractionStartWorkspaceSession` for a build/install, or `DeviceInteractionStartSession` for the already installed app. Consume current tool schemas; returned session key goes in `interactSessionKey` for Synthesize, `interactionSessionKey` for InstallAndRun/EndSession.
4. For UI localization, the repository's `OmatoUITests/OmatoRegressionUITests.swift` uses launch arguments `-AppleLanguages`, `(de)` and `-AppleLocale`, `de_DE` (replace with the requested locale). Pass these via the official launch API; verify visible labels after launch. They do **not** select the source or translation language. Select those inside the app and verify the displayed values.
5. Prefer the normal live app path. Do not casually set `UITEST_MODE=1`: `UITestConfiguration.swift` controls resets, seeds and mocked network behavior. `UITEST_FORCE_INTERFACE_STYLE` is honored only in UI-test mode. If fixtures are necessary and authorized, record them as fixtures, inspect current flags and never report a mocked result as a live provider response.
6. Read the fresh UI hierarchy and use its hit points for every action. Do not carry coordinates between screens/locales. Capture after animations/network completion. Verify actual PNG pixel dimensions: the official Xcode screenshotPath may still be point-resolution (e.g. 402 × 874), even when distinct from its thumbnail. For native-resolution marketing capture, if the official API exposes no scale control, use the authorized CLI fallback `xcrun simctl io <verified-UUID> screenshot <path>` after official Xcode UI interaction; expect this simulator’s 1206 × 2622 pixels. Never upscale a point-resolution capture and call it full-resolution. Inspect screenshots as well as text.
7. Default marketing story: introductory value proposition with populated vocabulary → Scan → actual OCR selection → definition/translation → vocabulary → Study revealed → Test checked correct. For Study, show both the term and its definition. For Test, show the filled answer after Check with the word visibly green. Do not include unrevealed Study or pre-check Test as default marketing cards. A manual-entry lookup is a valid fallback for a meaning/practice story but is not evidence that camera/OCR was tested. For photo examples, use user-owned, original or public-domain text; document source and rights. Never paint new words over a capture or use generated UI as product proof.
8. In Test, enter the actual expected word (e.g. `crecer`), press Check, verify the correct answer is visibly green, and capture that result. A pre-check capture is unnecessary for the default marketing set. Preserve accents. Avoid password fields, private vocabulary, debug menus, permission prompts and transient loading/error states in ad assets. Do not hide a functional or visual bug by editing the bitmap.
9. End the device session promptly. Record source commit/build, capture time, device/runtime, language matrix, live-versus-fixture route, source paths and SHA-256 hashes. Reusing a historical populated vocabulary capture is fine when selected by the user; identify it as historical rather than implying it was captured in the same session.

## Frame with the existing tool

The selected default for this campaign is `iPhone_17_pro-silver-portrait`, **not** Pro Max. Read `frame-manifest.json`; its screen is 1206 × 2622 inside a 1350 × 2760 frame, x=72, y=69, corner radius=199. Confirm current values instead of copying them into new tools.

Use the user's authorized deterministic screenshot builder for pixel-preserving composition. `tools/frame_capture.cjs` reads that manifest, clips to the screen, overlays the exact bundled frame, preserves an existing Dynamic Island or adds the builder's resting island. It rejects mismatched capture ratios. Never double-frame an existing framed screenshot. Keep raw captures, framed device assets, photographic backgrounds and copy as distinct sources.

Load workspace dependencies with `mcp__codex_app__load_workspace_dependencies`. Set `NODE_PATH` to its Node package directory; use its Node executable. Example arguments:

```sh
node tools/frame_capture.cjs /absolute/raw.png /absolute/framed.png iPhone_17_pro-silver-portrait
```

## Compose editable format projects

These rules apply to **all future Omato audiences and languages**, not only Spanish. Keep audience, source language, explanation language and copy independently configurable.

**Design for smartphone viewing:** Use the canvas effectively: large type, concise copy and prominent genuine app screenshots. Check at 360–390 CSS-pixel feed width without zoom. Judge legibility and hierarchy in the complete composition at phone size, against the approved ASC references. Numeric font-size targets must not override visual balance or create oversized copy. Shorten copy first. Preserve a recognizable iPhone silhouette: use the whole device or the ASC-style continuation beyond the canvas bottom. Avoid floating rectangular screen fragments, cutting away the device top, or enlarging UI until the frame loses its identity. Lucas rejected the v3 crops and oversized/crowded layouts; those are not a reusable default. Respect placement safe areas. Do not force every format into the same layout.

**Choose the ad structure first:** Carousel = the agreed seven-card progression. Single static image = one complete, audience-specific value proposition, one strong screenshot and brief supporting copy; it cannot rely on previous/next cards or use a multi-step carousel squeezed into one frame. Prepare standalone variants separately, with distinct IDs and copy. The introductory vocabulary image, translation result, revealed Study or checked-correct Test can be used when they prove that standalone promise.

**Permanent artwork rule (Lucas, September 24, 2026): Do not add a decorative “Omato” title/wordmark to screenshots or ad compositions. This includes the top-left wordmark. Preserve genuine app UI; the restriction is on added branding layers.**

Use the exact approved copy and story from `MARKETING_AUDIENCE_INSIGHTS.md` and the creative registry. The established carousel backbone is introduction → photo → selection in scanned text → meaning → saved vocabulary → later practice. Do not omit acquisition steps or replace them with multiple Study/Test states without the user's review. The default is seven cards: introductory value proposition with the populated vocabulary list → photo → selection in scanned text → meaning/translation → saved vocabulary → revealed Study → checked-correct Test. The opening overview is separate from the later vocabulary step. Audience-specific copy may change; proposed order changes require review. Historical variants remain immutable.


The current App Store reference is `projects/reading-companion.json`: **Bodoni 72 Bold (700)** headings; **Avenir Next Medium (500)** supporting copy; charcoal `#20251e`, ivory `#f6f2e9`, muted sage and the existing book/paper backgrounds. Use the actual fonts, not Georgia approximations. For another user-selected reference, read that project first.

- Browser editor: serve the builder over loopback, then `editor.html?project=projects/<name>.json`. Each project route has separate autosave. New output dimensions survive open/save/reload/export.
- Presets live in `format-presets.js` with placement names, checked sources and known limits. These are **image** canvases, not video production. Recheck current provider docs when specs matter. A square size shared by providers does not make all other ratios interchangeable. Meta Feed, Facebook Feed carousel and Instagram Stories presets were verified against their official guides on September 24, 2026; other placements and objective-specific previews still need checking. Safe guides are placement-specific, not universal guarantees.
- Set each project's `output.width/height`, `formatId` and optional fractional `safeInsets`. Keep separate project JSON files for different art directions. The UI's resize action fits layers **uniformly** and centers them; it does not intelligently recompose backgrounds/copy. Review/reposition after a ratio change. Clear stale reference images when changing dimensions.
- Experimental v3 compiler (its visual output was rejected; do not reuse its crops as the default): `tools/build_campaign.cjs campaigns/<audience>-vN.json`, then `tools/render_project.cjs` for its project list and `tools/package_ad_campaign.py <audience>-vN`. The brief separates language matrix, capture roles, carousel copy, standalone static copy and placement selection. Make a new revision/route so browser edits and prior artwork remain available. Crop coordinates are recorded in each scene; verify all claimed UI content remains visible.
- Legacy `tools/build_spanish_ads.cjs` creates the superseded six-card draft. Do not use it for the current/future default; retain only for reproducibility. Use it only to regenerate the **current Spanish source set**; it overwrites its named generated projects. For another locale/campaign, copy the pattern into a new named generator or author a new project. Never overwrite manual edits without inspecting git and preserving them.
- Design a clear first-card promise. Keep screenshot text genuine and readable; make marketing copy understandable even when UI detail is too small. Use actual app behavior, no fluency guarantees, no fabricated Save button, no Anki integration claims. Match the destination and audience.
- Background theme is fixed by Lucas's reference set at `/Users/lucas/Developer/Omato/marketing-screenshots/asc/en-US`: warm ivory/paper texture, natural wood, books, soft daylight and shadows, muted sage/olive details, and generous quiet space for typography. Each card should have a different composition within that same theme. Inspect these actual references; sharing a color palette alone is insufficient. Existing photographic backgrounds can be reused and repositioned using editable image layers. If genuinely new artwork is needed, use ImageGen for backgrounds only; no generated app UI or baked-in copy. Preserve original/background generation provenance.

## Render and validate

Headless exports use the same `editor.js` layout renderer. Load the dependency runtime first. Extract the installed macOS font collection into individual faces using `tools/prepare_fonts.py /tmp/omato-font-faces` with Python/fontTools; set `OMATO_RENDER_FONTS` to that directory. Never commit or redistribute proprietary font files. Do not claim exact typography if fonts are unavailable.

```sh
node tools/render_project.cjs projects/<name>.json output/<name>
node tools/check_editor.cjs
node tools/validate_ads.cjs
```

`render_project.cjs` respects project output sizes, rejects unsafe output names, fails on missing required images and records text metrics. `check_editor.cjs` checks dimension validation, proportional fitting, guide exclusion, missing-asset failure and unchanged legacy App Store pixels. `validate_ads.cjs` checks this campaign's dimensions, bytes, text wrapping/overlap and vertical safe bounds. Broaden testing only for relevant new changes.

Verify exported PNG header dimensions, hashes, provider file sizes and all copy. Open a review gallery through CUA and inspect actual PNGs at full size and realistic feed size. Verify device aspect ratios, frame alignment, Dynamic Island, title/subtitle separation, accents, long translations, low-contrast regions and status/nav bars. Guides must be preview-only, never baked into export. Compare a legacy App Store export when modifying the shared renderer.

The example packaging script `tools/package_spanish_ads.py` makes ZIPs, a manifest and `spanish-learners.html` from existing exports without changing pixels. ZIPs are reproducible local outputs. In future locales, make equally traceable manifests/gallery entries rather than mixing assets under old IDs.

## Handoff

Record immutable creative IDs and exact copy/assets in the marketing registry/package before publication. Link the local review, editable JSON, PNGs and manifest. State which simulator/locales and formats were verified, any provider-preview gap, and that local creative preparation is separate from campaign activation. Commit and push only scoped verified changes when the repository workflow calls for it. Keep user-owned work intact.

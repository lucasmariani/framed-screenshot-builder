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
6. Read the fresh UI hierarchy and use its hit points for every action. Do not carry coordinates between screens/locales. Capture after animations/network completion. Save **full-size** screenshot paths, not tool thumbnails. Inspect screenshots as well as text.
7. Required story options: Scan → actual OCR selection → definition/translation → vocabulary → Practice → Study front → Study revealed → Test answer filled → Test correct/incorrect feedback. Select the smallest set proving the creative promise. A manual-entry lookup is a valid fallback for a meaning/practice story but is not evidence that camera/OCR was tested. For photo examples, use user-owned, original or public-domain text; document source and rights. Never paint new words over a capture or use generated UI as product proof.
8. In Test, enter the actual expected word (e.g. `crecer`), save before Check, press Check, verify feedback and save again. Preserve accents. Avoid password fields, private vocabulary, debug menus, permission prompts and transient loading/error states in ad assets. Do not hide a functional or visual bug by editing the bitmap.
9. End the device session promptly. Record source commit/build, capture time, device/runtime, language matrix, live-versus-fixture route, source paths and SHA-256 hashes. Reusing a historical populated vocabulary capture is fine when selected by the user; identify it as historical rather than implying it was captured in the same session.

## Frame with the existing tool

The selected default for this campaign is `iPhone_17_pro-silver-portrait`, **not** Pro Max. Read `frame-manifest.json`; its screen is 1206 × 2622 inside a 1350 × 2760 frame, x=72, y=69, corner radius=199. Confirm current values instead of copying them into new tools.

Use the user's authorized deterministic screenshot builder for pixel-preserving composition. `tools/frame_capture.cjs` reads that manifest, clips to the screen, overlays the exact bundled frame, preserves an existing Dynamic Island or adds the builder's resting island. It rejects mismatched capture ratios. Never double-frame an existing framed screenshot. Keep raw captures, framed device assets, photographic backgrounds and copy as distinct sources.

Load workspace dependencies with `mcp__codex_app__load_workspace_dependencies`. Set `NODE_PATH` to its Node package directory; use its Node executable. Example arguments:

```sh
node tools/frame_capture.cjs /absolute/raw.png /absolute/framed.png iPhone_17_pro-silver-portrait
```

## Compose editable format projects

The current App Store reference is `projects/reading-companion.json`: **Bodoni 72 Bold (700)** headings/wordmark; **Avenir Next Medium (500)** supporting copy; charcoal `#20251e`, ivory `#f6f2e9`, muted sage and the existing book/paper backgrounds. Use the actual fonts, not Georgia approximations. For another user-selected reference, read that project first.

- Browser editor: serve the builder over loopback, then `editor.html?project=projects/<name>.json`. Each project route has separate autosave. New output dimensions survive open/save/reload/export.
- Presets live in `format-presets.js` with placement names, checked sources and known limits. These are **image** canvases, not video production. Recheck current provider docs when specs matter. A square size shared by providers does not make all other ratios interchangeable. Meta Feed, Facebook Feed carousel and Instagram Stories presets were verified against their official guides on September 24, 2026; other placements and objective-specific previews still need checking. Safe guides are placement-specific, not universal guarantees.
- Set each project's `output.width/height`, `formatId` and optional fractional `safeInsets`. Keep separate project JSON files for different art directions. The UI's resize action fits layers **uniformly** and centers them; it does not intelligently recompose backgrounds/copy. Review/reposition after a ratio change. Clear stale reference images when changing dimensions.
- Use `tools/build_spanish_ads.cjs` only to regenerate the **current Spanish source set**; it overwrites its named generated projects. For another locale/campaign, copy the pattern into a new named generator or author a new project. Never overwrite manual edits without inspecting git and preserving them.
- Design a clear first-card promise. Keep screenshot text genuine and readable; make marketing copy understandable even when UI detail is too small. Use actual app behavior, no fluency guarantees, no fabricated Save button, no Anki integration claims. Match the destination and audience.
- Existing photographic backgrounds can be reused and repositioned using editable image layers. If genuinely new artwork is needed, use ImageGen for backgrounds only; no generated app UI or baked-in copy. Preserve original/background generation provenance.

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

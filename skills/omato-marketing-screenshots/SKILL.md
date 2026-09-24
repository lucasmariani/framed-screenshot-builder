---
name: omato-marketing-screenshots
description: Produce Omato marketing screenshots and ad sets end to end for any audience or language pair: clean localized simulator, 9:41/full-signal/discharging battery, words-only live batch lookup, public-domain book page in Translation viewfinder, OCR selection, meaning and practice captures, iPhone 17 Pro silver frames, and editable App Store, Reddit, Facebook, Instagram or Google image formats. Use for capturing or refreshing campaign creative; not campaign activation.
---

# Omato capture → frame → compose → verify

Use the saved checkout `/Users/lucas/Developer/Omato/framed-screenshot-builder`. This is an operational skill, not a Template Gallery artifact. Its versioned source is `skills/omato-marketing-screenshots/` in that repository. Announce this skill on first use.

## Complete workflow

This is the canonical reusable skill for the entire process, including future language pairs. Reuse it instead of creating a separate skill per audience.

1. **Brief:** copy [the audience brief template](templates/audience-brief.json) into a new campaign revision. Fill in the independent audience/UI/source/translation/copy languages and requested placements from the user's brief and the marketing source of truth.
2. **Prepare:** create or reset a dedicated disposable simulator, configure the actual device language and region, install the current Debug app with official Xcode tools, complete onboarding, and apply the exact status bar.
3. **Populate:** derive a words-only CSV from the preserved `heroWords` folder, transfer it through the terminal and run the actual app's batch lookups. Never reuse CSV definitions, examples or synonyms.
4. **Stage the page:** choose and document public-domain source text and its featured word, generate and inspect its page image. **In Scan, select Translation and the target language before loading the image into the viewfinder.** Dismiss tips first; then use Debug Settings → Load Viewfinder Image. This is Lucas's required order for future translated-lookup captures.
5. **Capture:** follow [the language capture protocol](references/language-capture-protocol.md) for Scan, highlighted selection after Cancel, live meaning, populated vocabulary, revealed Study, and checked-green Test. Use the same featured word throughout.
6. **Frame:** use the existing `iPhone_17_pro-silver-portrait` asset and native-resolution raw captures. Preserve the device aspect ratio.
7. **Compose:** follow [the format production protocol](references/ad-format-production.md) to create editable projects for every requested placement, with the established fonts, background theme and appropriate standalone or carousel story.
8. **Deliver:** validate actual exports and phone-size previews, record source hashes and immutable creative IDs, package PNGs/projects, and open the gallery and editor for Lucas. Complete the authorized preparation without repeated approval; artwork review precedes upload.

The brief template is an authoring checklist, not input to the legacy campaign compiler. Do not send it to a script without checking that script's schema.

## Establish the brief and authority

Read workspace/repository AGENTS instructions and `omato-ios/docs/MARKETING_AUDIENCE_INSIGHTS.md`, then the appropriate provider playbook and creative registry under `omato-ios/docs/marketing/`. Reuse current user decisions without asking again. Drafting, simulator capture, local rendering and reversible builder changes do not imply ad activation, new spending, app release or backend deployment.

Record a capture matrix before a multilingual batch. Keep these independent: **interface locale**, **source word/text language**, **definition/translation language**, **ad-copy locale**, **storefront**. English UI with Spanish words is not a Spanish UI localization. Start with the requested pair; do not invent a multi-country rollout. Maintain identical stories/copy intent across locales, but allow different wrapping and word choice. Get unfamiliar translations reviewed rather than silently correcting screenshots.

## Capture genuine app states

For language-learning capture batches, follow [the verified source → live lookup → capture protocol](references/language-capture-protocol.md). It includes words-only CSV derivation, terminal transfer, actual OCR, audience localization, and the mandatory 9:41/full-signal/100% **discharging** battery setup.

1. Read `/Users/lucas/.codex/references/apple-development.md` once, then the personal `xcode-device-interaction` skill. Use official `mcp__xcode__*` tools for discovery, build/install and UI operations. Native CLI is a supported-operation fallback only; never XcodeBuildMCP. One owner handles each interaction session and closes it on success or failure. Do not delegate without applicable authorization.
2. Inspect git status, source commit, app version/build, scheme, runtime and target. Prefer an isolated simulator with no personal iCloud data. Do not reset a user's existing simulator or personal vocabulary merely for attractive captures.
3. Use `DeviceInteractionStartWorkspaceSession` for a build/install, or `DeviceInteractionStartSession` for the already installed app. Consume current tool schemas; returned session key goes in `interactSessionKey` for Synthesize, `interactionSessionKey` for InstallAndRun/EndSession.
4. Set the dedicated simulator's actual language and region for the audience before first launch, following the capture protocol. Additionally, the repository's `OmatoUITests/OmatoRegressionUITests.swift` uses launch arguments `-AppleLanguages`, `(de)` and `-AppleLocale`, `de_DE` (replace with the requested locale). Pass these via the official launch API; verify visible app labels and system pickers after launch. They do **not** select the source or translation language. In Scan, select Translation and the explanation language **before** loading the page fixture; verify the displayed values.
5. Prefer the normal live app path. Do not casually set `UITEST_MODE=1`: `UITestConfiguration.swift` controls resets, seeds and mocked network behavior. `UITEST_FORCE_INTERFACE_STYLE` is honored only in UI-test mode. If fixtures are necessary and authorized, record them as fixtures, inspect current flags and never report a mocked result as a live provider response.
6. Read the fresh UI hierarchy and use its hit points for every action. Do not carry coordinates between screens/locales. Capture after animations/network completion. Verify actual PNG pixel dimensions: the official Xcode screenshotPath may still be point-resolution (e.g. 402 × 874), even when distinct from its thumbnail. For native-resolution marketing capture, if the official API exposes no scale control, use the authorized CLI fallback `xcrun simctl io <verified-UUID> screenshot <path>` after official Xcode UI interaction; expect this simulator’s 1206 × 2622 pixels. Never upscale a point-resolution capture and call it full-resolution. Inspect screenshots as well as text.
7. Default marketing story: introductory value proposition with populated vocabulary → Scan → actual OCR selection → definition/translation → vocabulary → Study revealed → Test checked correct. For Study, show both the term and its definition. For Test, show the filled answer after Check with the word visibly green. Do not include unrevealed Study or pre-check Test as default marketing cards. A manual-entry lookup is a valid fallback for a meaning/practice story but is not evidence that camera/OCR was tested. For photo examples, use user-owned, original or public-domain text; document source and rights. Never paint new words over a capture or use generated UI as product proof.
8. In Test, enter the actual expected word (e.g. `crecer`), press Check, verify the correct answer is visibly green, and capture that result. A pre-check capture is unnecessary for the default marketing set. Preserve accents. Avoid password fields, private vocabulary, debug menus, permission prompts and transient loading/error states in ad assets. Do not hide a functional or visual bug by editing the bitmap.
9. End the device session promptly. Record source commit/build, capture time, device/runtime, language matrix, live-versus-fixture route, source paths and SHA-256 hashes. Reusing a historical populated vocabulary capture is fine when selected by the user; identify it as historical rather than implying it was captured in the same session.

## Frame with the existing tool

The default across future audiences is **iPhone 17 Pro silver**, frame ID `iPhone_17_pro-silver-portrait`, unless Lucas explicitly requests another frame. Read `frame-manifest.json`; its screen is 1206 × 2622 inside a 1350 × 2760 frame, x=72, y=69, corner radius=199. Confirm current values instead of copying them into new tools.

Use the user's authorized deterministic screenshot builder for pixel-preserving composition. `tools/frame_capture.cjs` reads that manifest, clips to the screen, overlays the exact bundled frame, preserves an existing Dynamic Island or adds the builder's resting island. It rejects mismatched capture ratios. Never double-frame an existing framed screenshot. Keep raw captures, framed device assets, photographic backgrounds and copy as distinct sources.

Load workspace dependencies with `mcp__codex_app__load_workspace_dependencies`. Set `NODE_PATH` to its Node package directory; use its Node executable. Example arguments:

```sh
node tools/frame_capture.cjs /absolute/raw.png /absolute/framed.png iPhone_17_pro-silver-portrait
```

## Compose editable format projects

These rules apply to **all future Omato audiences and languages**, not only Spanish. Keep audience, source language, explanation language and copy independently configurable.

**Design for smartphone viewing:** Use the canvas effectively: large type, concise copy and prominent genuine app screenshots. Check at 360–390 CSS-pixel feed width without zoom. Judge legibility and hierarchy in the complete composition at phone size, against the approved ASC references. Numeric font-size targets must not override visual balance or create oversized copy. Shorten copy first. Preserve a recognizable iPhone silhouette: use the whole device or the ASC-style continuation beyond the canvas bottom. Avoid floating rectangular screen fragments, cutting away the device top, or enlarging UI until the frame loses its identity. Lucas rejected the v3 crops and oversized/crowded layouts; those are not a reusable default. Respect placement safe areas. Do not force every format into the same layout.

**Accepted composition reference (September 24, 2026):** Lucas accepted the v4 direction and adjusted the editor to use more empty space. Use `projects/spanish-composition-review-v4-owner-adjusted.json` as the reference: higher/larger vocabulary phone, larger near-full-height standalone phone, and larger supporting type. Preserve those exact owner adjustments; adapt their balance to each format instead of copying coordinates blindly. This is design-direction acceptance, not upload or campaign authorization.

**Accepted complete capture reference (September 24, 2026):** Lucas endorsed the refreshed v6 work. Use `campaigns/spanish-reddit-v6.json`, its three editable projects and `project-assets/spanish-hidalgo-v6/provenance.json` as the current end-to-end example. Keep the original v4 owner edits and all historical revisions. The v6 introduction uses y=430 for the device to clear its support copy; this is an example of adapting spacing to a new capture, not a universal coordinate for every locale. The new process correction is Translation **before** viewfinder loading; do not copy the historical opposite order.

**Reddit carousel exception — September 24, 2026:** Reddit supports at most six cards. Lucas approved omitting the repeated saved-vocabulary card for Reddit: vocabulary-led introduction → photo → selection → meaning → revealed Study → checked Test. Keep the seven-card master story for other eligible placements. Provider limits take precedence over a reusable card count; get any new story adaptation reviewed.

**Choose the ad structure first:** Carousel = the agreed seven-card progression. Single static image = one complete, audience-specific value proposition, one strong screenshot and brief supporting copy; it cannot rely on previous/next cards or use a multi-step carousel squeezed into one frame. Prepare standalone variants separately, with distinct IDs and copy. The introductory vocabulary image, translation result, revealed Study or checked-correct Test can be used when they prove that standalone promise.

**Permanent artwork rule (Lucas, September 24, 2026): Do not add a decorative “Omato” title/wordmark to screenshots or ad compositions. This includes the top-left wordmark. Preserve genuine app UI; the restriction is on added branding layers.**

Use the exact approved copy and story from `MARKETING_AUDIENCE_INSIGHTS.md` and the creative registry. The established carousel backbone is introduction → photo → selection in scanned text → meaning → saved vocabulary → later practice. Do not omit acquisition steps or replace them with multiple Study/Test states without the user's review. The default is seven cards: introductory value proposition with the populated vocabulary list → photo → selection in scanned text → meaning/translation → saved vocabulary → revealed Study → checked-correct Test. The opening overview is separate from the later vocabulary step. Audience-specific copy may change; proposed order changes require review. Historical variants remain immutable.


**Typography correction confirmed by Lucas — September 24, 2026:** All new ad layouts use **Bodoni 72 Bold (700)** headings and **Baskerville Regular (400)** subtitles/supporting copy. Set `fontFamily: "Baskerville"`, `fontWeight: 400`; use 83 px subtitles and preserve existing positioning where it still fits; adjust wrapping and spacing for readability. The serif supporting-copy reference is `../marketing-screenshots/review/asc-intro-2026-09-22/intro-editor-project.json`, alongside the actual ASC PNGs. `projects/reading-companion.json` and old CPP/v1–v7 exports use Avenir Next Medium historically; they are not the subtitle-font default. Use `campaigns/spanish-reddit-v8.json` for the corrected current layouts. Keep charcoal `#20251e`, ivory `#f6f2e9`, muted sage and the existing book/paper backgrounds. Use actual installed fonts; never silently substitute or redistribute them.

**Subtitle readability default — Lucas, September 24, 2026:** Use **83 px** for all ad subtitle/support layers across formats and future audiences. Keep Baskerville Regular (400). Adjust line breaks, text-box placement and surrounding layout to fit; do not quietly shrink subtitles to fit. Check at phone-feed size. This explicit newer instruction supersedes earlier smaller support sizes and the instruction to preserve their size.

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

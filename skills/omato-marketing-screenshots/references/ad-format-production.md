# From framed captures to a complete ad set

Use this after `language-capture-protocol.md`. All paths below are relative to the saved `framed-screenshot-builder` checkout unless absolute.

## Scope and source material

Fill in `templates/audience-brief.json` for each audience. Record every requested provider, placement, creative kind and copy locale. “All formats” means all applicable requested image placements, not automatically every provider, campaign type or video placement. If no narrower scope is given, prepare a sensible image matrix from the presets below and state it; do not invent campaigns or upload rights.

Start from `omato-ios/docs/MARKETING_AUDIENCE_INSIGHTS.md` and the creative registry. Adapt the value proposition to the audience; do not merely replace “Spanish” with another language where the claim or demonstration no longer fits. The six native capture roles are vocabulary, Scan, selection, meaning, revealed Study and checked Test. The vocabulary capture can support both the introduction and saved-vocabulary card. A language pair is complete only when source words, page, selection, meaning and practice agree.

Use `campaigns/spanish-reddit-v6.json` and its three projects as the accepted complete example. Preserve prior projects and browser edits. Create a unique audience/revision filename and editor URL for each new set; never regenerate over an owner-edited project without preserving it first. Replace each device image with the newly framed asset and its actual aspect ratio; do not stretch the old vocabulary frame.

## Placement matrix

Read **the current local `format-presets.js`** for dimensions, byte limits, sources, dates and safe-area guides. The following are supported preset IDs, not timeless provider eligibility promises. Check current official provider specifications for the actual objective and placement when producing a new set. Update evidence if the requirements changed.

| Surface | Existing preset IDs | Production rule |
|---|---|---|
| App Store | `asc-69` | Validate the actual App Store screenshot slot; preserve the narrative sequence and localization. |
| Reddit carousel | `reddit-carousel-square` | Approved six-card adaptation: introduction/vocabulary → Scan → selection → meaning → revealed Study → checked Test. Omit only the repeated saved-vocabulary card. Recheck the provider's card limit. |
| Reddit static images | `reddit-image-square`, `reddit-image-portrait`, `reddit-image-landscape` | Each variant must make sense alone. Recompose for square, portrait and landscape instead of stretching. |
| Reddit thumbnail | `reddit-thumbnail` | Simplify to a recognizable image and short promise; a miniature full carousel card will not be legible. |
| Facebook/Instagram carousel | `meta-square` | Use the seven-card master story where the selected placement supports it. Verify its placement-specific card count and crop. |
| Facebook/Instagram feed | `meta-feed` | Compose a standalone benefit and prominent phone for the feed canvas. Verify automatic cropping. |
| Facebook/Instagram vertical | `meta-vertical` | Keep key copy/UI clear of placement overlays. The current guide is for Instagram Stories; verify other vertical placements separately. A PNG is not a video. |
| Google App campaign images | `google-app-square`, `google-app-landscape`, `google-app-portrait` | Make each image independently understandable because the service can combine assets. Use its own landscape ratio, not Reddit's. |
| Apple Ads | No generic uploaded-image preset | Where creative derives from an App Store product page, prepare the appropriate App Store screenshots and product-page variant. Do not label a generic image export as a supported direct Apple Ads upload. Verify the current ad placement workflow. |

For each chosen format, create a project with its own `output.width`, `output.height`, `formatId`, optional `safeInsets`, copy and layer positions. Inspect the editor's output dimensions after loading. The resize control only scales proportionally; it does not redesign the composition.

## Composition requirements for every language

- Headings: **Bodoni 72 Bold (700)**. Subtitles/support: **Baskerville Regular (400)**, family `Baskerville`. This is Lucas’s September 24 correction for all future ad audiences/formats. Match the ASC intro source at `../marketing-screenshots/review/asc-intro-2026-09-22/intro-editor-project.json`; old Reading Companion/CPP Avenir typography is historical, not the default. Current corrected layouts: `campaigns/spanish-reddit-v8.json`. Extract installed faces with `tools/prepare_fonts.py`; set `OMATO_RENDER_FONTS`. Do not distribute proprietary fonts.
- Backgrounds: inspect `/Users/lucas/Developer/Omato/marketing-screenshots/asc/en-US`. Use varied scenes within its consistent warm ivory/paper, books, wood, soft daylight, shadow, muted sage/olive theme. Reuse its approved image assets or generate new backgrounds in that theme. ImageGen may also create the separately documented book-page fixture; it must never fabricate app UI or bake marketing copy into the background.
- Use available space, a prominent recognizable iPhone, concise copy and large readable type. Show the whole device or the accepted bottom continuation. Avoid floating screen fragments, sliced-off device tops, arbitrary zoom crops and oversized crowded headings.
- **Never add a decorative Omato wordmark/title.** Genuine app UI stays unchanged.
- Localize copy for the audience and meaning, then adjust wrapping and spacing. Shorten copy before shrinking text. Check accents and longer words. Do not force every language into English line breaks.
- Carousel master: value proposition with populated vocabulary → photo → selected word → meaning → saved vocabulary → revealed Study → checked-green Test. The introduction is a separate benefit overview. The Reddit exception is above.
- A static ad is one complete promise with one strong proof screen. It must work without previous/next cards. Lookup, vocabulary growth and practice can be separate static concepts; do not squeeze the entire carousel into one image.

## Export and verify

1. Load the workspace runtime with `mcp__codex_app__load_workspace_dependencies`; use its Node executable/packages for the existing renderer. With installed font faces prepared, run `node tools/render_project.cjs projects/<unique-name>.json output/<unique-name>` for each project.
2. Inspect `layout-metrics.json`: text within bounds, no title/support collisions, no copy hidden behind the phone. Check actual PNG dimensions, bytes, transparency and source aspect ratios. Confirm safe guides were not exported.
3. View the actual exported images at **360–390 CSS pixels wide**, as well as full size. Check typography, contrast, prominent app proof, correct silver frame, Dynamic Island, 9:41/full signal/100% discharging status bar, selection highlight, revealed Study and green checked Test. Do not treat merely passing numerical checks as a visual review.
4. If the renderer itself changed, run its appropriate regression checks. Legacy `validate_ads.cjs` and packaging scripts may name a fixed old campaign: inspect their inputs before use. A pass for an old Spanish set does not validate the new set. Do not rerun unrelated app tests for a copy/layout-only change.
5. Create a campaign-specific gallery, manifest and ZIP without modifying pixels. Verify the gallery's image/editor/download links resolve and its manifest hashes match the final exports **after** any last layout change. Include every requested placement in the manifest. Keep raw captures, frames and source/page provenance separately traceable.
6. Register immutable copy and asset IDs in `omato-ios/docs/marketing/creative-registry.json`, with locale, audience, sources/hashes and local-review status. Keep existing IDs immutable. Do not introduce click/impression trackers as part of creative packaging.
7. Open the gallery and correct project in the editor for Lucas, and preserve those tabs. State which formats are complete, whether provider previews remain pending and any genuine remaining limitation. His review applies to the exact artwork; preparing or approving a draft does not itself activate ads or authorize new spending.

## Completion record

Deliver the review URL, editable project URLs, manifest/PNG/ZIP location and capture provenance. Include the app build/commit, clean simulator/model/runtime, locale matrix, source text and rights, actual lookup/OCR versus fixture routes, exact frame ID and verified status bar. Save scoped changes using the repository workflow. Update the installed skill from its versioned source whenever this protocol changes so later tasks use the same rules.

# Revision 5 — final-three background refinement

Scope: background layers only for Test (6), Translation (7), and Conjugations (8). The selected ivory/sage literary direction is retained. Before-state: commit 1938838. Source style references: existing campaign PNGs and background-book.png. New background-only image assets were generated and visually inspected individually.

## Evidence and normalization

Combined comparison: output/reading-companion/qa-backgrounds-v5.jpg shows all three before and after compositions together. Each 1320 × 2868 export is normalized to 264 × 574. Final detail board: output/reading-companion/last-three-backgrounds.jpg. Browser preview checked at 1280 × 720 with 264 CSS px images; the final conjugation image visibly loads the new paper background. Original backgrounds are 851 × 1848/1849 and scale proportionally to 1322 px wide with x=-1, ensuring full bleed without stretching.

## Findings

The repeated hard sage curve was replaced by physical paper/book surfaces with quiet ivory copy areas. Test uses warm window light, a subtle notebook edge, and oak. Translation uses sage bookcloth and an open book. Conjugations uses fanned cream pages, sage binding, and oak. The narrow visible side regions carry the material detail while the app remains dominant. No dark texture or object crosses the marketing copy. No actionable P0/P1/P2 findings in the final comparison.

Fonts and typography: unchanged Bodoni/Avenir scale, wrapping, and contrast. Spacing and layout: every device and text coordinate unchanged. Color: warm ivory, soft sage, and oak remain consistent with concept 1. Image quality: original app screenshots retained; newly generated backgrounds contain no UI or lettering and have clean crops. Copy/content: unchanged.

## Checks

- First five PNGs verified byte-identical to the preceding commit.
- All text and device-layer objects verified unchanged in the project JSON.
- Eight RGB PNGs, embedded portable project, and ZIP rebuilt; ZIP integrity passed.
- Browser gallery shows refreshed image assets and eight scenes.
- Source syntax and Git whitespace checks passed.
- Earlier browser autosaves preserved under their prior key.

Photographic details are deliberately subtle at mobile size; background raster resolution is lower than the 1320 × 2868 export, while the genuine UI retains its original source resolution. No App Store upload performed.

final result: passed

---

# Revision 4 — conjugations appended

An eighth image now follows translation, using the original device-conjugations.png capture and the existing sage layout. Copy: “Know your verb forms.” / “Explore conjugations across tenses.” Both layers fit two lines at the established 178 px and 90 px sizes.

Source style: revision 3 translation composition, output/reading-companion/07-translate-as-you-read.png. Implementation: 08-explore-conjugations.png in that directory. The pair is normalized together to 264 × 574 in qa-conjugations-pair.jpg. Native 1320 × 2868 export inspected for phone crop and the complete present-tense table. Mobile-size browser preview inspected at 264 CSS px in a 1280 × 720 viewport.

The new image retains the same fonts, margins, colors, sage transition, and device scale. The actual conjugation UI is unchanged. No title/body clipping or overlap observed. The continuing imperfect table is intentionally cropped below the fully visible present table. No actionable P0/P1/P2 differences from the established style.

Eight RGB PNGs, portable embedded project, and eight-file ZIP regenerated and integrity checked. Existing seven images retain their order. Browser gallery shows eight entries with conjugations last. Earlier browser autosaves preserved under their prior key. Checks are local; no App Store upload performed.

final result: passed

---

# Reading Companion revision 3 — design QA

September 12, 2026. Current result supersedes revision 2 below.

## Revision 3 target and evidence

User target: full scan screen, tappable word selection, saved vocabulary list, dictionary definitions, Study, Test, then translation. Art direction remains concept 1. Source before-state: commit 306baf5. Implementation: seven 1320 × 2868 RGB PNGs named in projects/reading-companion.json.

Combined evidence: output/reading-companion/qa-comparison-v3.jpg places the old and revised first two images in one input, all normalized to 264 × 574. The change in scene 2 content is intentional. Full-set evidence: output/reading-companion/qa-mobile-strip.jpg. Focused browser evidence: qa-v3-scan.jpg and qa-v3-word-selection.jpg in that directory, captured at 390 × 844 with 264 px image widths. Viewport restored after inspection.

## Findings and resolved issues

- Resolved P1: scan shutter and navigation were cropped out. The first device is now 900 px wide, x=210, y=900. Its complete visible frame and screen fit the canvas; browser inspection confirms shutter, keyboard/manual button, flash, and all four tabs.
- Resolved P1: the scan-to-lookup interaction was absent. Scene 2 now uses the supplied word-selection capture with its native tap instruction and explicit tap-to-look-up marketing headline.
- Resolved P1: sequence did not match the requested journey. Seven scenes now follow scan, selection, vocabulary, dictionary, Study, Test, translation. Vocabulary copy explicitly says looked-up words live there.
- No remaining actionable P0/P1/P2 issues in this revision.

## Fidelity and verification

Typography remains Bodoni 72 Bold 178 px and Avenir Next Medium 90 px; every title and supporting passage fits two lines. Ivory, sage, book imagery, shared margins, and clear background/text separation remain intact. The first phone intentionally has a smaller scale to show all controls; remaining device crops prioritize app content. Original app UI, Dynamic Islands, and the new word-selection capture are unchanged. No fabricated tap overlays or UI were added.

The mobile browser inspection confirms the first complete phone and the next selection step. Editor navigation loads seven scenes, reports ready, and successfully exports 01-scan-a-page.png. The package helper verified seven opaque RGB images, rebuilt the portable embedded project, and checked the seven-file ZIP integrity. The full set was inspected at 264 px per image. No live App Store upload or conversion test was performed.

## Checklist

- [x] Complete scan screen and controls visible.
- [x] Actual word-selection screen explains tapping.
- [x] Vocabulary list follows and explains saved lookups.
- [x] Dictionary, Study, Test, then translation in the requested order.
- [x] Mobile-size copy and original art direction retained.
- [x] Seven-scene editor and exports verified.

final result: passed

---

## Previous revision audit (historical)

# Reading Companion revision 2 — design QA

September 12, 2026. Revision target: distinguish dictionary readers from translation users and make the campaign legible on mobile. Source art direction: /Users/lucas/Developer/Omato/marketing-screenshots/design/concept-1.png. Before state: commit 36af633. Implementation: the six PNGs named in projects/reading-companion.json under output/reading-companion/.

## Comparison evidence

Combined before/after: output/reading-companion/qa-comparison-v2.jpg. Each source and revised image is normalized from 1320 × 2868 to 264 × 574; the first three images of each sequence appear together. Content and order changes are intentional; this tests the user's revision, not pixel identity with the original concept. Full-set small-size evidence: output/reading-companion/qa-mobile-strip.jpg.

Focused browser captures: output/reading-companion/qa-mobile-dictionary.jpg and qa-mobile-translation.jpg. Viewport: 390 × 844 CSS pixels, screenshots 390 × 844 pixels, image width 264 CSS pixels. Large overview checked at 1280 × 720. Temporary viewport restored.

## Findings and iteration history

- Resolved P1: the combined dictionary/translation image blurred audiences. Positions 2 and 3 now have separate messages and matching app screenshots. Collection and practice remain shared benefits.
- Resolved P2: 57 px supporting copy reduced to 11.4 px at 264 px image width. Supporting copy is now 90 px Medium (18 px at review size); titles are 178 px (35.6 px); each scene uses one 1200 px phone. The combined comparison and phone-width browser captures confirm stronger legibility. Every headline and supporting passage fits two lines.
- Previous wrapping and sage/text overlap fixes remain effective. Sage backgrounds were enlarged further so their transition clears the new supporting text.
- No remaining actionable P0/P1/P2 findings in the reviewed revision.

## Fidelity surfaces

- Typography: Bodoni 72 Bold preserves the editorial identity. Avenir Next Medium supporting copy is shorter, larger, and more robust. Both browser rendering and native exports checked; individual font faces registered for native export.
- Layout: consistent margins, title/body positions, and one enlarged phone per image. Lower phone portions intentionally extend beyond the canvas to prioritize feature content. This is a marketing composition, not a complete navigation tutorial.
- Color: ivory paper, dark olive text, muted sage, oak and books preserve concept 1. Background transitions clear supporting copy; app UI colors remain native.
- Assets: original framed app captures and Dynamic Islands retained. Existing generated photographic backgrounds reused. Main dictionary and translated meanings are readable at the tested size. Fine metadata and book prose remain supporting imagery; the marketing message does not depend on reading them.
- Copy: the reader image explicitly says dictionary and book language; the learner image says new language and translate. Collection and practice address both audiences. No invented ratings, outcomes, or language-coverage promises.

## Verification

- Mobile preview renders 264 px images inside a 390 px viewport.
- Horizontal swipe reaches the separate dictionary and translation images.
- Large overview toggle works; mobile mode can be restored.
- Revised editor loads six scenes with the new font settings.
- Six RGB PNGs at 1320 × 2868, no alpha channel.
- ZIP rebuilt from exactly the six current filenames; integrity check passes.
- Portable project rebuilt with all image layers embedded.
- JavaScript syntax and Git whitespace checks pass.
- Earlier campaign browser autosaves preserved under their prior key.

## Limits and follow-up

This is browser-based small-size verification, not a live App Store upload or conversion test. App Store placements vary in size. Headlines communicate the feature at sizes where secondary app details become small. P3: future captures could use a simpler, consistent word across the flow.

## Checklist

- [x] Separate audience messages and screenshots.
- [x] Increase text and feature-image sizes.
- [x] Compare before/after at equal small dimensions.
- [x] Check phone-width rendering and swipe behavior.
- [x] Regenerate the six-image exports and editable project.

final result: passed

## September 24 — Spanish learner ad studio

Six genuine device images support a 30-PNG set across square, landscape, portrait,
Meta feed and Instagram Stories layouts. Reused the exact populated vocabulary
asset requested by Lucas; the other device images show the live crecer lookup,
Study and filled/correct Test states. Original UI pixels are preserved. The
renderer uses individually extracted Bodoni 72 Bold / Avenir Next Medium faces.
Existing book, paper and sage backgrounds retain their source files.

Automated layout checks found and resolved a three-line landscape headline
collision, a portrait headline wrap collision and a long square headline word.
Final checks cover PNG dimensions, known provider file limits, text box overflow,
title/subtitle separation and the Stories safe area. Shared-renderer regression
compares the existing first Reading Companion scene to commit 3499ec5 and produces
identical PNG pixels. Browser checks confirmed preset resize, real canvas size,
autosave/reload and reset back to the original square project. Export guides are
excluded from PNGs. Representative square, landscape and vertical PNGs were
visually inspected; the full gallery is available for Lucas's art-direction review.

**Review gate:** Lucas requested review in the Screenshot & Ad Editor before any
upload. These are local drafts. No provider upload, campaign activation, spending,
app distribution or backend deployment occurred. Repository changes are retained
locally pending that review; no push of this artwork set was performed.

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

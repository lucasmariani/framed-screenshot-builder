# Reading Companion campaign QA — 2026-09-12

**Final result: passed**

Source visual truth: `/Users/lucas/Developer/Omato/marketing-screenshots/design/concept-1.png`.
Implementation: `output/reading-companion/01-turn-reading-into-vocabulary.png`
through `06-learn-how-the-word-works.png`; full set in `overview.jpg`.
Combined comparison evidence: `output/reading-companion/qa-comparison.jpg`.
Browser evidence: `output/reading-companion/qa-browser.jpg`.

## Comparison conditions

The source is a generated three-panel concept board at 1040 × 1513. Each source
panel is much taller than the required App Store format. Production uses six
1320 × 2868 canvases. The comparison places the source and first three exports
together at approximately equal panel widths, preserving both aspect ratios.
This is an art-direction adaptation, not a claim of pixel-identical reproduction.
The additional three scenes extend the same direction using actual app captures.

The gallery was checked in the Codex browser at 1280 × 720. The editor's Fit
canvas was checked in the same viewport. Export PNG succeeded for scene 5.
The gallery loaded all six images and exposes individual PNG, ZIP, and editor
links. Browser console check returned no warnings or errors. The screenshot
files themselves are the production canvases; browser gallery sizing does not
alter their pixel dimensions. Responsive CSS was inspected; a separate narrow
viewport interaction pass was not performed.

## Findings and comparison history

- Resolved P2: the second title wrapped to three lines in the native renderer.
  Registered individual macOS font faces and set the shared title size to 150 px.
  Final exports and editor preview show two-line titles without body overlap.
- Resolved P2: the sage boundary intersected body text on scenes 3 and 5.
  Enlarged the background layer to 1650 px, centered at x = -165. Re-rendered
  all exports. The final combined comparison and full-size scene 5 show clear
  ivory space behind both lines of supporting copy.
- No remaining actionable P0/P1/P2 findings in the final comparison.

## Required fidelity surfaces

- Typography: Bodoni 72 Bold preserves the literary display character; Avenir
  Next Regular provides the quieter supporting voice. Shared title size, line
  height, width, and alignment across all six scenes. No text truncation.
- Layout: consistent headline and body origins; enlarged actual phone imagery;
  intentional overlapping devices on scenes 2, 5, and 6. Scene 6 intentionally
  crops the continuing conjugation table and occludes part of the rear phone.
  Main single phones fit the canvas. Decorative rules and tiny footer slogans
  from the concept were omitted to keep attention on benefit copy and app UI.
- Colors: warm ivory, dark olive text, muted sage, and oak/book photography
  retain the selected direction. The darker test answer remains native app UI.
- Assets: backgrounds were generated separately to fit the production format.
  Device layers are the supplied framed captures, with their native app content
  and Dynamic Islands retained. No generated replacement app UI. Fine text is
  sharp at export resolution; small UI details naturally reduce at thumbnail size.
- Content: first three images communicate scan → meaning → practice. Remaining
  scenes cover library, recall/reveal, and examples/synonyms/conjugations.
  No invented ratings, performance statistics, or unsupported product promises.

Full-size scenes 5 and 6 were opened for focused inspection of supporting copy,
phone edges, card text, and conjugation content; the first three were inspected
in the combined comparison and browser gallery. The overview covers set rhythm.

## Verification

- Six PNGs verified as RGB, 1320 × 2868, with no alpha channel.
- ZIP contains exactly six PNGs and passes archive integrity checking.
- Portable project contains all six scenes and embeds every image layer.
- Editor JavaScript and batch-render helper pass syntax checks.
- Git diff whitespace checks pass.
- Existing editor autosave uses a separate key from this campaign.

## Follow-up polish

P3: future capture sessions could use a more approachable word and carry that
same word through scan, lookup, and recall. Current genuine captures were used
without rewriting their UI. Conversion performance remains unmeasured.

## Implementation checklist

- [x] Preserve selected concept 1 art direction.
- [x] Compose six scenes with editable text and original device captures.
- [x] Correct text wrapping and sage boundary interference.
- [x] Verify exports, package downloads, and open the review gallery.

final result: passed

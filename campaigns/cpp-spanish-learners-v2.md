# Spanish learner App Store page refresh

September 24, 2026. Status: prepared for Lucas's exact artwork review; not uploaded, submitted or activated.

Review: `http://127.0.0.1:4186/apple-spanish-v2.html`

Editor: `projects/cpp-spanish-learners-v2.json`. Rendered package and source hashes: `output/cpp-spanish-learners-v2/manifest.json`.

Replace the English (U.S.) Language Learners custom product page's eight historical images with seven screenshots: vocabulary-led value proposition → Translation Scan → highlighted selection → English translation → saved vocabulary → revealed Study → checked-correct Test. Other locales, default product page, app build selection and campaigns are outside this change. The approved page currently has one explicit en-US localization; other English variants observed in Apple Ads use fallback content.

The seven 1320 × 2868 PNGs use Apple-listed screenshot dimensions, iPhone 17 Pro silver, 83 px Baskerville Regular supporting text, Bodoni 72 Bold headings, the approved book/paper/sage backgrounds and an editable ivory contrast wash. No decorative wordmark. The scan phone is fully visible; other phones use the accepted continuation below the canvas. Featured text and practice proof remain visible.

Captures are reused unchanged from Lucas's September 24 verosímil replacements and the existing Don Quijote Translation Scan. These are not new captures, and the current public App Store build was not visually verified during this task. Raw paths/build limitations remain in the linked capture provenance. No generated UI or substituted dictionary content.

Validation: seven PNG dimensions; all 14 text layers meet at least 4.5:1 sampled contrast; title/support separation and support/phone separation; actual exports inspected at 360 px width; source hashes and ZIP created; editor displays the correct seven scenes and ASC preset. No shared renderer code changes.

Proposed promotional text (145 characters):

> Build your Spanish vocabulary as you read. Scan a page, look up words in English, save them to your vocabulary, and practice with Study and Test.

Reproduce with `tools/build_spanish_cpp_v2.cjs`, `tools/render_project.cjs`, `tools/check_ad_contrast.cjs`, then `tools/package_spanish_cpp_v2.py`. Use the skill's extracted local fonts; font files are never committed. Do not rerun the authoring script over later owner edits; preserve them as a new revision first.

After artwork approval, create an editable version of the existing CPP, replace only its en-US iPhone screenshot set, save the exact promotional text and verify ordered hashes/processing. Submit that CPP for Apple review only with the appropriate authorization. A saved draft is not a reviewed or live page.

Sources: [Apple screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications), [edit a custom product page](https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions/). Verified September 24, 2026.

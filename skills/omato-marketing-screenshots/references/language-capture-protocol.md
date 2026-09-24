# Language-learning capture protocol

Verified with English UI, Spanish source text and English translations on September 24, 2026. Example assets and provenance: `project-assets/spanish-hidalgo-v6/`.

## Inputs and clean simulator

- Preserve originals in `/Users/lucas/Developer/Omato/marketing-screenshots/fixtures/heroWords/`. These are the eleven CSVs copied unchanged from Lucas's Desktop folder.
- **Use only the words as lookup content. Never seed definitions, translations, examples or synonyms from the CSVs, and never use their example sentences as lookup context.** The app retrieves that content through its normal live lookup service. Language and part of speech are importer request metadata.
- Derive a CSV with only `language,word,part_of_speech,ui_locale,translation_language`. `language` identifies the word; `ui_locale` identifies the interface; `translation_language` selects the explanation language. The importer otherwise filters by the source language when `ui_locale` is absent. For this case use `es,...,...,en,en`. Preserve original CSVs; record any spelling corrections in the derived file's provenance.
- Use a dedicated freshly created and erased simulator, never erase another simulator containing user data. Verify its model, runtime and UUID before operating. iPhone 17 gives 1206 × 2622 captures matching the selected iPhone 17 Pro frame.
- Use official Xcode tools to build/install/run the saved checkout. Launch with `-AppleLanguages (en)` and `-AppleLocale en_US`, replacing both for the audience. Verify visible UI; separately set Translate into English. Do not enable `UITEST_MODE` or Mock Vocabulary. Complete onboarding; Debug Subscription Override is sufficient for this disposable screenshot environment, without purchase or personal iCloud sign-in.

## Terminal transfer and live vocabulary

1. Use `xcrun simctl listapps <UUID>` to discover the `group.com.apple.FileProvider.LocalStorage` group container. Do not reuse another simulator's container UUID.
2. Create `File Provider Storage/Omato Marketing/` inside that container and copy the derived CSV and canonical text file there. This path was verified through the native Files picker.
3. In Omato: Settings → Debug Settings → Batch Dictionary Import → Browse → On My iPhone → Omato Marketing → derived CSV. Allow all live requests to finish; verify Spanish words with English meanings in Vocabulary. Failed lookups must be resolved or documented, never replaced with invented content.
4. Add the campaign's featured word through the actual selection/lookup flow afterward. In this example that places `hidalgo` at the top of the populated list, and first in the new-word practice session.

## One source for Scan and selection

Choose a public-domain work in the source language, and verify the actual original text and rights from a primary source. Avoid modern translations, editorial notes or edition artwork. Don Quijote Part I, Chapter I (1605), original Spanish by Cervantes, is recorded in `source/source-manifest.json` with Project Gutenberg links. Choose a featured word that actually occurs in the passage; Lucas approved `hidalgo` for this set.

Save an exact UTF-8 excerpt, source URL and rights note. Ask ImageGen to typeset it as a newly designed first chapter page: warm ivory paper, crisp black serif text, modest chapter title, no app UI, no props, no modern publisher branding. Inspect spelling, accents and page readability. Generated typography can contain errors; do not call it an exact transcription without checking. The first generated page has a minor extra accent in `recia`, recorded in provenance. Preserve the generation original.

Transfer the generated page with `xcrun simctl addmedia <UUID> /absolute/page.png`. The clean simulator may also contain Apple's stock sample photos; select the actual imported page by its thumbnail/date.

- **Scan:** Debug Settings → Load Viewfinder Image → select page. The app returns to Scan. Select Translation and confirm the explanation language. Dismiss first-run tips. The viewfinder uses the real app crop, so inspect the complete frame. Hide Manual Image Upload may be enabled for the clean Scan presentation. The image fixture is in memory and must be reloaded after app relaunch.
- **Selection:** Debug Settings → Mock Camera → same page → Translation. This runs the actual OCR pipeline and presents native word selection. Read the resulting text, tap the featured word, then **Cancel** its Add confirmation. Verify that the word remains highlighted before capture. Do not confuse Cancel in the alert with Cancel closing the selection screen. Record OCR line breaks and any source-image transcription artifacts. No separate text-file import was needed for this verified case.
- **Meaning:** Tap the highlighted word again → Add; wait for the live response. Capture the definition/translation screen. Do not replace the response with CSV definitions.
- **Vocabulary:** Return to the populated list; show the featured word alongside other source-language entries.
- **Study:** Practice → Study → tap the featured card to reveal it. Capture term and definition together.
- **Test:** Close Study → Test → enter the exact word → Check. Capture the green correct answer with keyboard dismissed. Do not capture the unverified answer or advance to another card.

Use fresh official Xcode hierarchies for interaction. If a session disappears, reconnect to the same UUID and inspect state before continuing. Reconnection can relaunch the app and discard the in-memory image fixture. Keep one session owner and close sessions promptly.

## Required status bar and native export

Before **every final capture**, use the verified UUID:

```sh
xcrun simctl status_bar <UUID> override --time '9:41' \
  --dataNetwork wifi --wifiMode active --wifiBars 3 \
  --cellularMode active --cellularBars 4 \
  --batteryState discharging --batteryLevel 100
```

The battery must be **full and discharging**, black without a lightning bolt. Do not use `charging` or `charged` for the required appearance. Wi-Fi and cellular bars must both be full. Check the image, not only command success.

If the device uses 24-hour time and displays `09:41`, configure the dedicated simulator's `NSGlobalDomain` with `AppleICUForce24HourTime=false` and `AppleICUForce12HourTime=true`, then relaunch before loading fixtures. The verified English set displays `9:41`. Preserve the appropriate audience's localized UI while retaining this marketing status-bar convention.

The official screenshot API currently returns point-resolution images. After arranging the native UI with official tools, use `xcrun simctl io <UUID> screenshot /absolute/raw.png` for the native 1206 × 2622 export. Keep raw pixels unchanged. Run `tools/frame_capture.cjs` with `iPhone_17_pro-silver-portrait`, yielding 1350 × 2760. Set the composed device layer's aspect ratio to `2760 / 1350`; never inherit the old Pro Max vocabulary ratio.

Save hashes, build/commit, locale matrix, source rights, live-versus-fixture routes and debug state. Create a new editable project revision so the owner's earlier adjustments remain intact. Use the accepted ASC backgrounds/fonts and phone-size review. Reddit retains the approved six-card adaptation; standalone ads remain independent promises. All artwork requires Lucas's review before upload.

# Editable text contrast washes

These transparent PNG layers were composed locally with the existing Canvas runtime, not ImageGen. Original background photographs and framed app captures are unchanged. They sit after the background and before device/text layers and remain editable in the screenshot editor.

Color: ivory RGB 246, 242, 233. Horizontal washes have alpha 0.92 through the widest text-box right edge + 14 px, feathering to transparent over 150 px. Intro and Stories washes have alpha 0.93 through y=475 and y=765 respectively, feathering to transparent over 180 px. All current project layers use opacity 0.85, preserving photographic texture. PNG dimensions match their target canvases.

Validate the final composed background after moving, replacing or resizing any layer: `tools/check_ad_contrast.cjs`. The internal threshold is 4.5:1 at sampled glyph positions, followed by a 360–390 px visual review. Source files are not a guarantee of contrast after later edits.

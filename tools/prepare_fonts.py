"""Extract installed macOS font faces for faithful local Canvas exports; do not redistribute."""
import sys
from pathlib import Path
from fontTools.ttLib import TTCollection
out = Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
for source in ['/System/Library/Fonts/Supplemental/Bodoni 72.ttc', '/System/Library/Fonts/Avenir Next.ttc', '/System/Library/Fonts/Supplemental/Baskerville.ttc']:
    for font in TTCollection(source).fonts:
        name = font['name'].getDebugName(6)
        if name and '/' not in name:
            font.save(out / (name + '.ttf'))
print(f'Extracted local font faces to {out}')

"""Package the rendered Reading Companion campaign. Requires Pillow."""
import base64
import json
from pathlib import Path
import zipfile

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "output/reading-companion"
project = json.loads((ROOT / "projects/reading-companion.json").read_text())
scenes = project["scenes"]
for scene in scenes:
    target = OUT / scene["filename"]
    with Image.open(target) as image:
        assert image.size == (1320, 2868), target
        if image.mode == "RGBA":
            assert image.getchannel("A").getextrema() == (255, 255), target
        image.convert("RGB").save(target)
    for layer in scene["layers"]:
        if layer["type"] == "image":
            layer["src"] = "data:image/png;base64," + base64.b64encode(
                (ROOT / layer["src"]).read_bytes()
            ).decode()
(OUT / "editable-project.json").write_text(json.dumps(project, ensure_ascii=False))
with zipfile.ZipFile(OUT / "omato-reading-companion.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    for scene in scenes:
        archive.write(OUT / scene["filename"], scene["filename"])
with zipfile.ZipFile(OUT / "omato-reading-companion.zip") as archive:
    assert archive.testzip() is None
    assert len(archive.namelist()) == len(scenes)
for name, width in [("overview.jpg", 294), ("qa-mobile-strip.jpg", 264)]:
    height = round(width * 2868 / 1320)
    board = Image.new("RGB", ((width + 12) * len(scenes), height + 25), "#e9e7df")
    for index, scene in enumerate(scenes):
        with Image.open(OUT / scene["filename"]) as image:
            board.paste(image.resize((width, height), Image.Resampling.LANCZOS), ((width + 12) * index, 0))
        ImageDraw.Draw(board).text(((width + 12) * index + 8, height + 7), str(index + 1).zfill(2), fill="#262b22")
    board.save(OUT / name, quality=95)
print(f"Packaged {len(scenes)} RGB PNGs, ZIP, portable project, and size previews")

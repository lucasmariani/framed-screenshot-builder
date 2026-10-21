"""Check the Pillow operations used by packaging, without rewriting artwork."""
from io import BytesIO
import unittest

from PIL import Image, ImageDraw


class ImageToolingTests(unittest.TestCase):
    def test_png_conversion_resize_and_jpeg_preview(self):
        source = BytesIO()
        Image.new("RGBA", (1320, 2868), (250, 245, 230, 255)).save(source, "PNG")
        source.seek(0)
        with Image.open(source) as image:
            self.assertEqual(image.size, (1320, 2868))
            rgb = image.convert("RGB")
            preview = rgb.resize((264, 574), Image.Resampling.LANCZOS)
            ImageDraw.Draw(preview).text((8, 8), "Omato", fill="#262b22")
            output = BytesIO()
            preview.save(output, "JPEG", quality=95)
        output.seek(0)
        with Image.open(output) as image:
            image.load()
            self.assertEqual(image.size, (264, 574))
            self.assertEqual(image.mode, "RGB")

    def test_negative_eps_binary_lengths_are_rejected(self):
        for length in (-18, -100):
            with self.subTest(length=length):
                source = BytesIO(
                    ("%!PS-Adobe-3.0 EPSF-3.0\n%%BoundingBox: 0 0 10 10\n"
                     "%%EndComments\n% body\n"
                     f"%%BeginBinary:{length}\n%%EOF\n").encode()
                )
                with self.assertRaisesRegex(ValueError, "bytecount cannot be negative"):
                    Image.open(source)


if __name__ == "__main__":
    unittest.main()

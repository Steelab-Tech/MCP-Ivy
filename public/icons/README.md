# Icons for IVY Fashion App

Place your app icons here:

- `icon-16.png` (16x16px)
- `icon-32.png` (32x32px)
- `icon-48.png` (48x48px)
- `icon-128.png` (128x128px)

These icons are referenced in `/public/manifest.json` and will be used by ChatGPT to display your app icon.

## Recommended Design

- Use IVY MODA brand colors (black, white, gold accents)
- Simple, recognizable logo
- High contrast for visibility
- PNG format with transparency

## Quick Generation

You can use any of these tools to generate icons:
- Figma (export at multiple sizes)
- Adobe Illustrator
- Online tools like favicon.io
- ImageMagick CLI

Example with ImageMagick:
```bash
convert source.png -resize 16x16 icon-16.png
convert source.png -resize 32x32 icon-32.png
convert source.png -resize 48x48 icon-48.png
convert source.png -resize 128x128 icon-128.png
```

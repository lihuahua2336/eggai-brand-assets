# EggAi Brand Assets

Official brand asset package for EggAi.

## Files

- `logo.svg`: Primary stacked logo with mark, wordmark, and tagline.
- `logo-horizontal.svg`: Horizontal logo for headers and wide surfaces.
- `logo-mark.svg`: Square mark wrapper for avatars, app icons, and social previews.
- `favicon.svg`: SVG favicon source.
- `favicon.ico`: Multi-size ICO containing 16, 32, and 48 px icons.
- `icons/favicon-16.png`: 16 px PNG favicon.
- `icons/favicon-32.png`: 32 px PNG favicon.
- `icons/favicon-48.png`: 48 px PNG favicon.
- `icons/apple-touch-icon.png`: 180 px Apple touch icon.
- `icons/icon-192.png`: 192 px web app icon.
- `icons/icon-512.png`: 512 px web app icon.
- `manifest.webmanifest`: Basic web manifest referencing the PNG app icons.
- `source/eggai-generated-mark.png`: Source mark used by the SVG wrappers and icon generation.

## Usage

Reference files directly from this repository or copy them into an application's public assets directory.

Example HTML:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

## Notes

The SVG files embed the generated PNG mark so they preserve the finalized EggAi image mark exactly. They are SVG wrappers rather than pure-vector redraws of the mark.

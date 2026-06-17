# EggAi Brand Assets

Official brand asset package for EggAi.

## Files

- `logo.svg`: Primary stacked logo with mark, wordmark, and tagline.
- `logo.png`: Standalone PNG version of the primary logo.
- `logo.webp`: Standalone WebP version of the primary logo.
- `logo-horizontal.svg`: Horizontal logo for headers and wide surfaces.
- `logo-horizontal.png`: Standalone PNG version of the horizontal logo.
- `logo-horizontal.webp`: Standalone WebP version of the horizontal logo.
- `logo-mark.svg`: Square mark wrapper for avatars, app icons, and social previews.
- `logo-mark.png`: Standalone PNG version of the logo mark.
- `logo-mark.webp`: Standalone WebP version of the logo mark.
- `favicon.svg`: SVG favicon source.
- `favicon.png`: Standalone PNG favicon source.
- `favicon.webp`: Standalone WebP favicon source.
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

Recommended CDN URLs:

```text
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo.svg
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo.png
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo.webp
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.svg
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.ico
```

Example HTML:

```html
<link rel="icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.ico" sizes="any">
<link rel="icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/icons/apple-touch-icon.png">
<link rel="manifest" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/manifest.webmanifest">
```

## Notes

The SVG files are self-contained and embed the finalized EggAi image mark as a data URI. They do not depend on any other repository file at render time.

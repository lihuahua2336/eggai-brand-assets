# EggAi Brand Assets

Official brand asset package for EggAi.

## Files

- `logo.svg`: Transparent primary stacked logo with mark, wordmark, and tagline.
- `logo.png`: Standalone PNG version of the transparent primary logo.
- `logo.webp`: Standalone WebP version of the transparent primary logo.
- `logo-white.svg`: Primary stacked logo on a white background board.
- `logo-white.png`: Standalone PNG version of the white-board primary logo.
- `logo-white.webp`: Standalone WebP version of the white-board primary logo.
- `logo-dark.svg`: Primary stacked logo on a dark brand background board.
- `logo-dark.png`: Standalone PNG version of the dark-board primary logo.
- `logo-dark.webp`: Standalone WebP version of the dark-board primary logo.
- `logo-horizontal.svg`: Transparent horizontal logo for headers and wide surfaces.
- `logo-horizontal.png`: Standalone PNG version of the transparent horizontal logo.
- `logo-horizontal.webp`: Standalone WebP version of the transparent horizontal logo.
- `logo-horizontal-white.svg`: Horizontal logo on a white background board.
- `logo-horizontal-white.png`: Standalone PNG version of the white-board horizontal logo.
- `logo-horizontal-white.webp`: Standalone WebP version of the white-board horizontal logo.
- `logo-horizontal-dark.svg`: Horizontal logo on a dark brand background board.
- `logo-horizontal-dark.png`: Standalone PNG version of the dark-board horizontal logo.
- `logo-horizontal-dark.webp`: Standalone WebP version of the dark-board horizontal logo.
- `logo-mark.svg`: Square mark on a dark brand background board for avatars, app icons, and social previews.
- `logo-mark.png`: Standalone PNG version of the dark-board logo mark.
- `logo-mark.webp`: Standalone WebP version of the dark-board logo mark.
- `logo-mark-white.svg`: Square mark on a white background board.
- `logo-mark-white.png`: Standalone PNG version of the white-board mark.
- `logo-mark-white.webp`: Standalone WebP version of the white-board mark.
- `logo-mark-dark.svg`: Square mark on a dark brand background board.
- `logo-mark-dark.png`: Standalone PNG version of the dark-board mark.
- `logo-mark-dark.webp`: Standalone WebP version of the dark-board mark.
- `favicon.svg`: Small-size optimized SVG favicon source using the EggAi mark on a dark board.
- `favicon.png`: Standalone PNG favicon source on a dark board.
- `favicon.webp`: Standalone WebP favicon source on a dark board.
- `favicon-dark.svg`: Dark-board favicon SVG source.
- `favicon-dark.png`: Standalone PNG favicon on a dark board.
- `favicon-dark.webp`: Standalone WebP favicon on a dark board.
- `favicon-dark.ico`: Multi-size ICO containing 16, 32, and 48 px dark-board icons.
- `favicon.ico`: Alias of `favicon-dark.ico` for legacy browser support.
- `favicon-white.svg`: Light-board favicon SVG source.
- `favicon-white.png`: Standalone PNG favicon on a white board.
- `favicon-white.webp`: Standalone WebP favicon on a white board.
- `favicon-white.ico`: Multi-size ICO containing 16, 32, and 48 px light-board icons.
- `icons/favicon-16.png`: Legacy 16 px PNG favicon alias, same as `icons/favicon-dark-16.png`.
- `icons/favicon-32.png`: Legacy 32 px PNG favicon alias, same as `icons/favicon-dark-32.png`.
- `icons/favicon-48.png`: Legacy 48 px PNG favicon alias, same as `icons/favicon-dark-48.png`.
- `icons/favicon-dark-16.png`: 16 px PNG favicon on a dark board.
- `icons/favicon-dark-32.png`: 32 px PNG favicon on a dark board.
- `icons/favicon-dark-48.png`: 48 px PNG favicon on a dark board.
- `icons/favicon-white-16.png`: 16 px PNG favicon on a white board.
- `icons/favicon-white-32.png`: 32 px PNG favicon on a white board.
- `icons/favicon-white-48.png`: 48 px PNG favicon on a white board.
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
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo-dark.svg
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo-dark.png
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo-white.svg
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo-white.png
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo.png
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/logo.webp
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon-dark.ico
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon-dark.png
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon-white.ico
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon-white.png
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.svg
https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.ico
```

Default dark-board favicon HTML:

```html
<link rel="icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.ico" sizes="any">
<link rel="icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/icons/apple-touch-icon.png">
<link rel="manifest" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/manifest.webmanifest">
```

White-board favicon HTML:

```html
<link rel="icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon-white.ico" sizes="any">
<link rel="icon" href="https://cdn.jsdelivr.net/gh/lihuahua2336/eggai-brand-assets@main/favicon-white.svg" type="image/svg+xml">
```

## Notes

The SVG files are self-contained and embed the finalized EggAi image mark as a data URI. They do not depend on any other repository file at render time.

Transparent full-logo variants are for overlays and in-app composition. White-board and dark-board variants are ready for direct use on surfaces that need an explicit background.

`favicon.*` and `favicon-dark.*` use the same dark-board EggAi mark for tab-sized rendering. `favicon-white.*` is the light-board counterpart.

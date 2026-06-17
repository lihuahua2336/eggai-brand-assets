import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceMark = path.join(root, 'source', 'eggai-generated-mark.png');
const markBase64 = await fs.readFile(sourceMark, 'base64');
const markDataUri = `data:image/png;base64,${markBase64}`;
const brandDark = '#1f2630';
const brandWhite = '#ffffff';

const svgFiles = ['logo.svg', 'logo-horizontal.svg', 'logo-mark.svg'];

const makeFaviconSvg = (background) => `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="EggAi favicon">
  <rect width="64" height="64" rx="14" fill="${background}"/>
  <image href="${markDataUri}" x="2" y="7" width="60" height="50" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

const faviconSvg = makeFaviconSvg(brandDark);
const faviconWhiteSvg = makeFaviconSvg(brandWhite);
const faviconSizes = [16, 32, 48];

const setCanvasBackground = (svg, fill) => {
  const backgroundPattern = /<rect width="([^"]+)" height="([^"]+)" fill="none"\/>/;
  if (!backgroundPattern.test(svg)) throw new Error('Could not find transparent canvas background to replace.');
  return svg.replace(backgroundPattern, `<rect width="$1" height="$2" fill="${fill}"/>`);
};

const setMarkBackground = (svg, fill) => {
  const backgroundPattern = /<rect width="1024" height="1024" rx="190" fill="[^"]+"\/>/;
  if (!backgroundPattern.test(svg)) throw new Error('Could not find mark background to replace.');
  return svg.replace(backgroundPattern, `<rect width="1024" height="1024" rx="190" fill="${fill}"/>`);
};

const useLightWordmark = (svg) => svg
  .replace(/stop-color="#06236d"/g, 'stop-color="#e9fbff"')
  .replace(/stop-color="#0a3d94"/g, 'stop-color="#7defff"')
  .replace(/stop-color="#041856"/g, 'stop-color="#28bfff"')
  .replace(/fill:#06236d/g, 'fill:#bff4ff');

const writeBackgroundVariant = async ({ source, target, background, lightWordmark = false, mark = false }) => {
  let svg = await fs.readFile(path.join(root, source), 'utf8');
  svg = mark ? setMarkBackground(svg, background) : setCanvasBackground(svg, background);
  if (lightWordmark) svg = useLightWordmark(svg);
  await fs.writeFile(path.join(root, target), svg);
};

for (const file of svgFiles) {
  const fullPath = path.join(root, file);
  let svg = await fs.readFile(fullPath, 'utf8');
  svg = svg.replace(/href="(?:source\/eggai-generated-mark\.png|data:image\/png;base64,[^"]+)"/g, `href="${markDataUri}"`);
  await fs.writeFile(fullPath, svg);
}

await fs.writeFile(path.join(root, 'favicon.svg'), faviconSvg);
await fs.writeFile(path.join(root, 'favicon-dark.svg'), faviconSvg);
await fs.writeFile(path.join(root, 'favicon-white.svg'), faviconWhiteSvg);

await writeBackgroundVariant({ source: 'logo.svg', target: 'logo-white.svg', background: brandWhite });
await writeBackgroundVariant({ source: 'logo.svg', target: 'logo-dark.svg', background: brandDark, lightWordmark: true });
await writeBackgroundVariant({ source: 'logo-horizontal.svg', target: 'logo-horizontal-white.svg', background: brandWhite });
await writeBackgroundVariant({ source: 'logo-horizontal.svg', target: 'logo-horizontal-dark.svg', background: brandDark, lightWordmark: true });
await writeBackgroundVariant({ source: 'logo-mark.svg', target: 'logo-mark-white.svg', background: brandWhite, mark: true });
await writeBackgroundVariant({ source: 'logo-mark.svg', target: 'logo-mark-dark.svg', background: brandDark, mark: true });

const renders = [
  { svg: 'logo.svg', png: 'logo.png', webp: 'logo.webp' },
  { svg: 'logo-white.svg', png: 'logo-white.png', webp: 'logo-white.webp' },
  { svg: 'logo-dark.svg', png: 'logo-dark.png', webp: 'logo-dark.webp' },
  { svg: 'logo-horizontal.svg', png: 'logo-horizontal.png', webp: 'logo-horizontal.webp' },
  { svg: 'logo-horizontal-white.svg', png: 'logo-horizontal-white.png', webp: 'logo-horizontal-white.webp' },
  { svg: 'logo-horizontal-dark.svg', png: 'logo-horizontal-dark.png', webp: 'logo-horizontal-dark.webp' },
  { svg: 'logo-mark.svg', png: 'logo-mark.png', webp: 'logo-mark.webp' },
  { svg: 'logo-mark-white.svg', png: 'logo-mark-white.png', webp: 'logo-mark-white.webp' },
  { svg: 'logo-mark-dark.svg', png: 'logo-mark-dark.png', webp: 'logo-mark-dark.webp' },
  { svg: 'favicon.svg', png: 'favicon.png', webp: 'favicon.webp' },
  { svg: 'favicon-dark.svg', png: 'favicon-dark.png', webp: 'favicon-dark.webp' },
  { svg: 'favicon-white.svg', png: 'favicon-white.png', webp: 'favicon-white.webp' },
];

for (const render of renders) {
  const svg = await fs.readFile(path.join(root, render.svg));
  await sharp(svg).png().toFile(path.join(root, render.png));
  await sharp(svg).webp({ quality: 92 }).toFile(path.join(root, render.webp));
}

const renderFaviconPngs = async ({ svg, prefix, legacy = false }) => Promise.all(
  faviconSizes.map(async (size) => {
    const file = `icons/${prefix}-${size}.png`;
    const data = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
    await fs.writeFile(path.join(root, file), data);
    if (legacy) await fs.writeFile(path.join(root, `icons/favicon-${size}.png`), data);
    return { size, data };
  })
);

const makeIco = (pngImages) => {
  const icoHeaderSize = 6;
  const icoDirectorySize = 16 * pngImages.length;
  let dataOffset = icoHeaderSize + icoDirectorySize;
  const icoHeader = Buffer.alloc(dataOffset);

  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(pngImages.length, 4);

  for (const [index, image] of pngImages.entries()) {
    const entryOffset = icoHeaderSize + index * 16;
    icoHeader.writeUInt8(image.size === 256 ? 0 : image.size, entryOffset);
    icoHeader.writeUInt8(image.size === 256 ? 0 : image.size, entryOffset + 1);
    icoHeader.writeUInt8(0, entryOffset + 2);
    icoHeader.writeUInt8(0, entryOffset + 3);
    icoHeader.writeUInt16LE(1, entryOffset + 4);
    icoHeader.writeUInt16LE(32, entryOffset + 6);
    icoHeader.writeUInt32LE(image.data.length, entryOffset + 8);
    icoHeader.writeUInt32LE(dataOffset, entryOffset + 12);
    dataOffset += image.data.length;
  }

  return Buffer.concat([icoHeader, ...pngImages.map((image) => image.data)]);
};

const darkFaviconPngs = await renderFaviconPngs({ svg: faviconSvg, prefix: 'favicon-dark', legacy: true });
const whiteFaviconPngs = await renderFaviconPngs({ svg: faviconWhiteSvg, prefix: 'favicon-white' });
const darkFaviconIco = makeIco(darkFaviconPngs);

await fs.writeFile(path.join(root, 'favicon.ico'), darkFaviconIco);
await fs.writeFile(path.join(root, 'favicon-dark.ico'), darkFaviconIco);
await fs.writeFile(path.join(root, 'favicon-white.ico'), makeIco(whiteFaviconPngs));

console.log('Generated standalone self-contained SVG, PNG, WebP, and favicon ICO brand assets.');

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceMark = path.join(root, 'source', 'eggai-generated-mark.png');
const markBase64 = await fs.readFile(sourceMark, 'base64');
const markDataUri = `data:image/png;base64,${markBase64}`;

const svgFiles = ['logo.svg', 'logo-horizontal.svg', 'logo-mark.svg'];

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="EggAi favicon">
  <defs>
    <linearGradient id="eggai-favicon-gradient" x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7df7ff"/>
      <stop offset="0.52" stop-color="#23b9ff"/>
      <stop offset="1" stop-color="#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#1f2630"/>
  <path d="M20 48c-8-10-5-29 11-35 16 6 22 25 13 35-6 6-18 6-24 0Z" fill="none" stroke="url(#eggai-favicon-gradient)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M23 45 32 20l9 25M27 36h10" fill="none" stroke="#d8fbff" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="48" cy="22" r="4.5" fill="#1f2630" stroke="#7df7ff" stroke-width="3.4"/>
</svg>
`;

for (const file of svgFiles) {
  const fullPath = path.join(root, file);
  let svg = await fs.readFile(fullPath, 'utf8');
  svg = svg.replace(/href="(?:source\/eggai-generated-mark\.png|data:image\/png;base64,[^"]+)"/g, `href="${markDataUri}"`);
  await fs.writeFile(fullPath, svg);
}

await fs.writeFile(path.join(root, 'favicon.svg'), faviconSvg);

const renders = [
  { svg: 'logo.svg', png: 'logo.png', webp: 'logo.webp' },
  { svg: 'logo-horizontal.svg', png: 'logo-horizontal.png', webp: 'logo-horizontal.webp' },
  { svg: 'logo-mark.svg', png: 'logo-mark.png', webp: 'logo-mark.webp' },
  { svg: 'favicon.svg', png: 'favicon.png', webp: 'favicon.webp' },
];

for (const render of renders) {
  const svg = await fs.readFile(path.join(root, render.svg));
  await sharp(svg).png().toFile(path.join(root, render.png));
  await sharp(svg).webp({ quality: 92 }).toFile(path.join(root, render.webp));
}

const faviconPngs = [
  { file: 'icons/favicon-16.png', size: 16 },
  { file: 'icons/favicon-32.png', size: 32 },
  { file: 'icons/favicon-48.png', size: 48 },
];

for (const icon of faviconPngs) {
  await sharp(Buffer.from(faviconSvg))
    .resize(icon.size, icon.size)
    .png()
    .toFile(path.join(root, icon.file));
}

const pngImages = await Promise.all(
  faviconPngs.map(async (icon) => ({
    size: icon.size,
    data: await fs.readFile(path.join(root, icon.file)),
  }))
);

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

await fs.writeFile(path.join(root, 'favicon.ico'), Buffer.concat([icoHeader, ...pngImages.map((image) => image.data)]));

console.log('Generated standalone self-contained SVG, PNG, WebP, and favicon ICO brand assets.');

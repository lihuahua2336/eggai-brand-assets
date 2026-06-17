import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceMark = path.join(root, 'source', 'eggai-generated-mark.png');
const markBase64 = await fs.readFile(sourceMark, 'base64');
const markDataUri = `data:image/png;base64,${markBase64}`;

const svgFiles = ['logo.svg', 'logo-horizontal.svg', 'logo-mark.svg', 'favicon.svg'];

for (const file of svgFiles) {
  const fullPath = path.join(root, file);
  let svg = await fs.readFile(fullPath, 'utf8');
  svg = svg.replace(/href="(?:source\/eggai-generated-mark\.png|data:image\/png;base64,[^"]+)"/g, `href="${markDataUri}"`);
  await fs.writeFile(fullPath, svg);
}

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

console.log('Generated standalone self-contained SVG, PNG, and WebP brand assets.');

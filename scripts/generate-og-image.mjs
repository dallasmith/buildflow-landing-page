import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'images', 'og-image.png');
const mockupPath = join(root, 'images', 'task-status.png');

const W = 1200;
const H = 630;
const bg = { r: 1, g: 94, b: 244, alpha: 1 }; // #015ef4

await sharp(mockupPath)
  .resize(W, H, {
    fit: 'contain',
    background: bg,
    position: 'centre',
  })
  .png()
  .toFile(outPath);

console.log(`Wrote ${outPath} (${W}x${H})`);

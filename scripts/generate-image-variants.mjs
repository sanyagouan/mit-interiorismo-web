// Genera variantes responsivas de las imágenes de proyectos:
//   public/images/projects/**/X.jpg → X-w800/-w1600/-w2400 en AVIF + WebP
// Uso: node scripts/generate-image-variants.mjs [--force]
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOTS = [
  path.resolve(process.cwd(), 'public/images/projects'),
  path.resolve(process.cwd(), 'public/images/instagram'),
];
const WIDTHS = [800, 1600, 2400];
const FORCE = process.argv.includes('--force');

let files = [];
for (const ROOT of ROOTS) {
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(jpg|jpeg|png)$/i.test(e.name)) files.push(p);
    }
  }
  if (fs.existsSync(ROOT)) walk(ROOT);
}

let made = 0, skipped = 0, bytesOut = 0, bytesIn = 0;
for (const src of files) {
  const base = src.replace(/\.(jpg|jpeg)$/i, '');
  bytesIn += fs.statSync(src).size;
  for (const w of WIDTHS) {
    for (const [ext, fmt, q] of [['avif', 'avif', 55], ['webp', 'webp', 72]]) {
      const out = `${base}-w${w}.${ext}`;
      if (!FORCE && fs.existsSync(out) && fs.statSync(out).mtime >= fs.statSync(src).mtime) {
        skipped++; bytesOut += fs.statSync(out).size; continue;
      }
      const tmp = out + '.tmp';
      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        [fmt]({ quality: q })
        .toFile(tmp);
      fs.renameSync(tmp, out);
      bytesOut += fs.statSync(out).size;
      made++;
    }
  }
  console.log('OK', path.relative(process.cwd(), src), '→ 3 anchos × avif/webp');
}

const mb = (n) => (n / 1024 / 1024).toFixed(1) + 'MB';
console.log(`\nResumen: ${made} variantes creadas, ${skipped} reutilizadas.`);
console.log(`Peso originals: ${mb(bytesIn)} (${files.length} jpg) → variantes: ${mb(bytesOut)} (${Math.round(files.length * 6)} ficheros)`);

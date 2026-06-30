const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dirs = [
  '/root/mit-interiorismo-web/public/images/projects',
  '/root/mit-interiorismo-web/public/images/hero',
  '/root/mit-interiorismo-web/public/team',
];

async function processDir(dir) {
  const files = [];
  const walk = (d) => {
    for (const f of fs.readdirSync(d)) {
      const full = path.join(d, f);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (['.jpg','.jpeg','.png'].includes(path.extname(full).toLowerCase())) {
        // Solo procesar si no existe WebP o AVIF
        const webp = full.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        if (!fs.existsSync(webp)) files.push(full);
      }
    }
  };
  walk(dir);
  console.log(`[${dir}] ${files.length} imágenes sin optimizar`);
  let n = 0, avif_ok = 0;
  for (const f of files) {
    const webp = f.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const avif = f.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    try {
      await sharp(f).webp({ quality: 78 }).toFile(webp);
      n++;
    } catch (e) {
      console.log('  ERR webp', path.basename(f), e.message);
    }
    if (!fs.existsSync(avif)) {
      try {
        await sharp(f).avif({ quality: 55, effort: 3 }).toFile(avif);
        avif_ok++;
      } catch (e) {
        console.log('  ERR avif', path.basename(f), e.message);
      }
    } else avif_ok++;
  }
  console.log(`  ${n} webp created, ${avif_ok} avif present/processed`);
}

(async () => {
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    await processDir(d);
  }
  console.log('=== FIN ===');
})();

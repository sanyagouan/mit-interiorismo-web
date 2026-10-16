const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const errors = [];
  const p = await (await b.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
  p.on('pageerror', e => errors.push('PAGEERR: ' + e));
  p.on('console', m => { if (m.type() === 'error') errors.push('CON: ' + m.text()); });
  await p.goto('https://mitinteriorismo.studio/?v=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 30000 });
  await p.waitForSelector('.hero-morph-layer', { timeout: 10000 });
  const snap = async (t) => {
    const op = await p.evaluate(() => [...document.querySelectorAll('.hero-morph-layer')].map(l => parseFloat(l.style.opacity) || 0));
    const h  = await p.evaluate(() => document.getElementById('hero-scrub-handle')?.style.left || '?');
    const st = await p.evaluate(() => { const a = document.querySelector('#hero-morph-foot .mf-step.is-active'); return a?.textContent; });
    console.log(`t=${t}s  [${op.map(x=>x.toFixed(2)).join(',')}]  handle=${h}  step=${st||'-'}`);
  };
  await snap(0);
  await p.waitForTimeout(4000); await snap(4);
  await p.waitForTimeout(4000); await snap(8);
  await p.waitForTimeout(4000); await snap(12);
  console.log('errores:', errors.length ? errors : '0');
  await b.close();
})();

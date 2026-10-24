import puppeteer from 'puppeteer-core';

const EXE = 'C:/Users/Administor/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const URL = process.argv[2] || 'http://127.0.0.1:8123/index.html';

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1600,1000'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000 });

const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => logs.push(`[reqfail] ${r.url()} :: ${r.failure()?.errorText}`));

const t0 = Date.now();
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

// poll loading visibility
let state = {};
for (let i = 0; i < 40; i++) {
  await new Promise((r) => setTimeout(r, 1000));
  state = await page.evaluate(() => {
    const el = document.getElementById('loading');
    const cs = el ? getComputedStyle(el) : null;
    return {
      loadingExists: !!el,
      loadingDisplay: el ? el.style.display : null,
      loadingOpacity: cs ? cs.opacity : null,
      hasCastle: !!window.__castle,
      canvas: !!document.querySelector('#scene'),
      calls: window.__castle?.renderer?.info?.render?.calls ?? null,
      tris: window.__castle?.renderer?.info?.render?.triangles ?? null,
      title: document.title,
    };
  });
  if (state.loadingOpacity === '0' || state.loadingDisplay === 'none') break;
}
const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

console.log('ELAPSED', elapsed, 's');
console.log('STATE', JSON.stringify(state));
console.log('--- LOGS ---');
console.log(logs.slice(0, 60).join('\n'));

await page.screenshot({ path: '_diag.png' });
await browser.close();

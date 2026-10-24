import puppeteer from 'puppeteer-core';

const EXE = 'C:/Users/Administor/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const URL = process.argv[2];
const OUT = process.argv[3] || '_t.png';

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1500,950'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 950 });
const logs = [];
page.on('console', (m) => { if (m.type() === 'error') logs.push('[err] ' + m.text().slice(0, 200)); });
page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message.slice(0, 300)));
page.on('requestfailed', (r) => logs.push('[reqfail] ' + r.url().slice(-60) + ' :: ' + (r.failure()?.errorText || '')));

const t0 = Date.now();
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise((r) => setTimeout(r, 20000));

const info = await page.evaluate(() => {
  const c = document.querySelector('canvas');
  const loader = document.querySelector('#loader, .loader, .loading');
  const cs = loader ? getComputedStyle(loader) : null;
  return {
    title: document.title,
    canvas: c ? [c.width, c.height] : null,
    loaderDisplay: cs ? cs.display : null,
    loaderOpacity: cs ? cs.opacity : null,
    hasWebGL: !!(c && c.getContext && c.getContext('webgl2')),
    ready: window.__ready ?? null,
  };
});
console.log('ELAPSED', ((Date.now() - t0) / 1000).toFixed(1) + 's');
console.log('INFO', JSON.stringify(info));
console.log('LOGS', logs.length ? '\n' + logs.slice(0, 12).join('\n') : '(none)');
await page.screenshot({ path: OUT });
await browser.close();

import puppeteer from 'puppeteer-core';

const EXE = 'C:/Users/Administor/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const URL = process.argv[2];
const GPU = process.argv[3] === 'gpu';

const args = ['--no-sandbox', '--window-size=1440,900'];
if (GPU) args.push('--enable-gpu', '--ignore-gpu-blocklist');
else args.push('--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader');

const browser = await puppeteer.launch({ executablePath: EXE, headless: 'new', args });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`.slice(0, 200)));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`.slice(0, 300)));

const t0 = Date.now();
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

let ready = false;
for (let i = 0; i < 60; i++) {
  await new Promise((r) => setTimeout(r, 500));
  ready = await page.evaluate(() => window.__ready === true).catch(() => false);
  if (ready) break;
}
const t = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`READY=${ready} after ${t}s`);
console.log(logs.slice(0, 20).join('\n') || '(no console output)');
await browser.close();

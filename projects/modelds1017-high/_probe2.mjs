import puppeteer from 'puppeteer-core';

const EXE = 'C:/Users/Administor/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const URL = process.argv[2];

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

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise((r) => setTimeout(r, 12000));

const info = await page.evaluate(() => {
  const c = document.querySelector('canvas');
  return {
    title: document.title,
    canvas: !!c,
    canvasSize: c ? [c.width, c.height] : null,
    bodyText: document.body.innerText.slice(0, 300),
    threeLoaded: typeof window.THREE !== 'undefined',
  };
});
console.log('INFO', JSON.stringify(info, null, 1));
console.log('--- LOGS ---');
console.log(logs.slice(0, 40).join('\n'));
await page.screenshot({ path: process.argv[3] || '_shot.png' });
await browser.close();

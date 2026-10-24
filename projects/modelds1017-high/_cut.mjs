import puppeteer from 'puppeteer-core';

const EXE = 'C:/Users/Administor/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
const URL = process.argv[2];
const LABEL = process.argv[3] || '城堡剖面';
const OUT = process.argv[4] || '_cut.png';

const browser = await puppeteer.launch({
  executablePath: EXE,
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--window-size=1600,1000'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000 });
page.on('pageerror', (e) => console.log('[pageerror]', e.message.slice(0, 200)));
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise((r) => setTimeout(r, 14000));

const clicked = await page.evaluate((label) => {
  const btns = [...document.querySelectorAll('button')];
  const b = btns.find((x) => (x.textContent || '').trim() === label);
  if (b) { b.click(); return true; }
  return btns.map((x) => (x.textContent || '').trim()).join('|');
}, LABEL);
console.log('CLICK', clicked);
await new Promise((r) => setTimeout(r, 6000));
await page.screenshot({ path: OUT });
console.log('shot saved', OUT);
await browser.close();

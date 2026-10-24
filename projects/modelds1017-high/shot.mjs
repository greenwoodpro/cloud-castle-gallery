import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.env.BASE || 'http://localhost:4173';
const outDir = 'shots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const shots = process.argv.slice(2);
const targets = shots.length
  ? shots
  : [
      'overview',
      'gate',
      'keep',
      'courtyard',
      'hall',
      'kitchen',
      'library',
      'solar',
      'observatory',
      'terrace',
      'chapel',
      'garden',
      'fields',
      'waterfall',
      'night',
    ];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-gpu-sandbox',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--window-size=1600,1000',
    '--hide-scrollbars',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    console.log(`[console.${msg.type()}]`, msg.text());
  }
});
page.on('pageerror', (err) => {
  errors.push(String(err));
  console.log('[pageerror]', String(err));
});

for (const id of targets) {
  const night = id === 'night' ? '&night=1' : '';
  const url = `${BASE}/?spot=${id}${night}&norotate=1`;
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  try {
    await page.waitForFunction('window.__ready === true', { timeout: 45000 });
  } catch (e) {
    console.log('[warn] not ready for', id);
  }
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(() => {
    if (window.__castle) window.__castle.waveTime(6.2);
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `${outDir}/${id}.png` });
  console.log('shot', id);
}

console.log('errors:', errors.length ? errors : 'none');
await browser.close();
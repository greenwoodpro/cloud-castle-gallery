import puppeteer from 'puppeteer-core';
import fs from 'fs';

const BASE = 'http://127.0.0.1:8848/index.html';
const DIR = 'C:/Users/Administor/AppData/Local/Temp/castle-final';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
fs.mkdirSync(DIR, { recursive: true });

// 只跑指定的一组（命令行参数：01,02 或 all）
const which = (process.argv[2] || 'all').split(',');

const VIEWS = {
  '01-overview': [[86, 52, 96], [0, 6, 0], 0],
  '02-castle': [[44, 26, 46], [0, 14, -2], 0],
  '03-gate': [[10, 14, 52], [0, 9, 18], 0],
  '04-island-bottom': [[112, -6, 98], [0, -16, 0], 0],
  '05-courtyard': [[16, 12, 26], [0, 6, 2], 0],
  '06-cutaway': [[34, 20, 34], [0, 11, -3], 1],
  '07-night': [[86, 52, 96], [0, 6, 0], 2],
  '08-lake': [[64, 18, 52], [34, 0, 20], 0],
  '09-village': [[-24, 16, 8], [-40, 2, -24], 0],
  '10-keep-interior': [[24, 15, 12], [0, 10, -5], 1],
  '11-closeup-prince': [[34, 13, 13], [23, 11, 6.5], 0],
  '12-fox-meadow': [[22, 6, 36], [12, 1, 26], 0],
};

const list = which.includes('all') ? Object.keys(VIEWS) : Object.keys(VIEWS).filter((k) => which.includes(k.slice(0, 2)));

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle',
    '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

const errs = [];
page.on('pageerror', (e) => errs.push('[pageerror] ' + e.message));
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404')) errs.push('[console] ' + m.text()); });

await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise((r) => setTimeout(r, 8000));

for (const key of list) {
  const [pos, tgt, mode] = VIEWS[key];
  await page.evaluate((p, t, m) => {
    const s = window.__scene;
    s.setCutaway(m === 1);
    s.state.targetNight = m === 2 ? 1 : 0;
    s.tweenCamera(p, t, 10);
  }, pos, tgt, mode);
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `${DIR}/${key}.png` });
  console.log('✓', key);
}

console.log('=== ERRORS (' + errs.length + ') ===');
[...new Set(errs)].slice(0, 10).forEach((e) => console.log(e));
await browser.close();

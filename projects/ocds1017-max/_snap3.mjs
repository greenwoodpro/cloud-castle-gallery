import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = 'D:/OneDrive/Desktop/temp/test/魔搭/ocds1017-high/final';
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: 'C://Users//Administor//AppData//Local//ms-playwright//chromium-1234//chrome-win64//chrome.exe', headless: true, args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-sandbox'] });
const p = await b.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push('ERR:' + e.message));
await p.goto('http://127.0.0.1:8124/', { waitUntil: 'networkidle', timeout: 120000 });
await p.waitForTimeout(7000);
await p.evaluate(() => { const c = window.__castle; if (c?.controls) c.controls.autoRotate = false; });
await p.waitForTimeout(800);
const keys = ['overview','keep','hall','library','bedroom','observatory','chapel'];
for (let i = 0; i < keys.length; i++) {
  const k = keys[i];
  try {
    await p.evaluate(kk => { const c = window.__castle; c.focusView(kk, 0); }, k);
    await p.waitForTimeout(2300);
    await p.screenshot({ path: `${OUT}/${String(i).padStart(2,'0')}-${k}.jpg`, type: 'jpeg', quality: 85 });
    console.log('shot', k);
  } catch(e) { console.log('fail', k, e.message.slice(0,50)); }
}
console.log('errors:', errs.length);
await b.close();

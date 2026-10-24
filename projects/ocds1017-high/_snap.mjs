import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = 'final'; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: 'C://Users//Administor//AppData//Local//ms-playwright//chromium-1234//chrome-win64//chrome.exe', headless: true, args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-sandbox'] });
const p = await b.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push('ERR: ' + e.message));
p.on('console', m => { if (m.type()==='error') errs.push('CON: ' + m.text().slice(0,150)); });
await p.goto('http://127.0.0.1:8124/', { waitUntil: 'networkidle', timeout: 120000 });
await p.waitForTimeout(6000);
const meta = await p.evaluate(() => {
  const c = window.__castle || window.__app || null;
  return { has: !!c, views: c?.VIEWS?.map(v=>v.id) || [], objects: c?.scene?.children?.length ?? null };
});
console.log('meta:', JSON.stringify(meta));
await p.screenshot({ path: `${OUT}/00-overview.jpg`, type: 'jpeg', quality: 84 });
for (const id of (meta.views||[]).slice(0,6)) {
  try {
    await p.evaluate(vid => { const c = window.__castle || window.__app; const v = c.VIEWS.find(x=>x.id===vid); if(!v) return; if(c.controls) c.controls.autoRotate=false; if(c.selectView) c.selectView(vid,false); if(v.pos){c.camera.position.set(...v.pos);} if(v.target&&c.controls){c.controls.target.set(...v.target); c.controls.update();} }, id);
    await p.waitForTimeout(1800);
    await p.screenshot({ path: `${OUT}/view-${id}.jpg`, type: 'jpeg', quality: 84 });
    console.log('shot', id);
  } catch(e) { console.log('skip', id, e.message.slice(0,50)); }
}
console.log('errors:', errs.length, errs.slice(0,3).join(' | '));
await b.close();

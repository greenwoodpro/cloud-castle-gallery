import puppeteer from 'puppeteer-core';
import fs from 'fs';

const URL = process.argv[2] || 'http://127.0.0.1:8848/index.html';
const OUT = process.argv[3] || 'D:/OneDrive/Desktop/temp/test/魔搭/wbminimaxm3.1flash-max/castle/shot.png';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: [
    '--no-sandbox', '--disable-setuid-sandbox',
    '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist',
    '--window-size=1600,900',
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });

const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${(e.stack || '').split('\n').slice(0, 4).join('\n')}`));
page.on('requestfailed', (r) => logs.push(`[reqfail] ${r.url()} :: ${r.failure()?.errorText}`));

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise((r) => setTimeout(r, 12000));

const health = await page.evaluate(() => {
  const s = window.__scene;
  if (!s) return { ok: false, reason: 'window.__scene undefined' };
  const info = s.renderer.info;
  const gl = s.renderer.getContext();
  return {
    ok: true,
    objects: s.scene.children.length,
    drawCalls: info.render.calls,
    triangles: info.render.triangles,
    geometries: info.memory.geometries,
    textures: info.memory.textures,
    camPos: s.camera.position.toArray().map((n) => +n.toFixed(1)),
    target: s.controls.target.toArray().map((n) => +n.toFixed(1)),
    glError: gl ? gl.getError() : 'no ctx',
    renderer: gl ? gl.getParameter(gl.RENDERER) : '',
  };
});

console.log('=== HEALTH ===');
console.log(JSON.stringify(health, null, 2));
console.log('=== LOGS (' + logs.length + ') ===');
logs.slice(0, 30).forEach((l) => console.log(l));

await page.screenshot({ path: OUT });
console.log('shot:', OUT, fs.existsSync(OUT) ? 'OK' : 'MISSING');
await browser.close();

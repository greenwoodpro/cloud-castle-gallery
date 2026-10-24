import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle',
    '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
await page.goto('http://127.0.0.1:8848/index.html', { waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 9000));

const pts = [[300, 640], [900, 650], [520, 560]];
const names = ['左下', '右下', '中部'];

async function sample(label, setup) {
  await page.evaluate(setup);
  await new Promise((r) => setTimeout(r, 1500));
  const b64 = await page.screenshot({ encoding: 'base64' });
  const res = await page.evaluate(async (b64, pts) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height;
    const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0);
    return pts.map(([x, y]) => { const d = cx.getImageData(x, y, 1, 1).data; return [d[0], d[1], d[2]]; });
  }, b64, pts);
  console.log(label.padEnd(22), res.map((r, i) => names[i] + '=' + r.join(',')).join('  |  '));
}

await page.evaluate(() => window.__scene.tweenCamera([86, 52, 96], [0, 6, 0], 10));
await new Promise((r) => setTimeout(r, 2500));

await sample('基线(当前)', () => {});
await sample('草皮改纯绿无贴图', () => {
  const s = window.__scene;
  s.scene.traverse((o) => {
    if (o.isMesh && o.material && o.material.map && o.geometry.attributes.position.count > 5000) {
      o.material = new (o.material.constructor)({ color: '#00ff00' });
    }
  });
});
await sample('再关雾', () => { window.__scene.scene.fog.density = 0; });
await sample('再关雾+暖阳', () => {
  const s = window.__scene;
  s.scene.children.forEach((c) => { if (c.isDirectionalLight && c.intensity > 1) c.color.set('#ffffff'); });
});
await browser.close();

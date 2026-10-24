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

const out = await page.evaluate(async () => {
  const s = window.__scene;
  s.tweenCamera([86, 52, 96], [0, 6, 0], 10);
  await new Promise((r) => setTimeout(r, 2000));

  // 列出 island group 下所有 mesh 的几何信息
  const res = [];
  s.scene.traverse((o) => {
    if (!o.isMesh) return;
    const g = o.geometry;
    g.computeBoundingBox();
    const bb = g.boundingBox;
    const size = [bb.max.x - bb.min.x, bb.max.y - bb.min.y, bb.max.z - bb.min.z].map((n) => +n.toFixed(1));
    // 只关心大的、位于岛区域的
    if (Math.max(size[0], size[2]) > 40) {
      res.push({
        type: g.type,
        size,
        pos: o.position.toArray().map((n) => +n.toFixed(1)),
        visible: o.visible,
        matColor: '#' + (o.material.color ? o.material.color.getHexString() : '??'),
        hasMap: !!o.material.map,
        mapRepeat: o.material.map ? o.material.map.repeat.toArray() : null,
        renderOrder: o.renderOrder,
      });
    }
  });
  return res;
});
console.log(JSON.stringify(out, null, 2));
await browser.close();

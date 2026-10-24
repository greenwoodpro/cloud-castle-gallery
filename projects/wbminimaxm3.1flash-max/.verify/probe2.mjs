import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
await page.goto('http://127.0.0.1:8848/index.html', { waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 9000));
const out = await page.evaluate(() => {
  const s = window.__scene;
  const res = [];
  s.scene.traverse((o) => {
    try {
      if (!o.isMesh) return;
      const g = o.geometry;
      if (!g) return;
      if (!g.boundingBox) g.computeBoundingBox();
      const bb = g.boundingBox;
      if (!bb) return;
      const sx = bb.max.x - bb.min.x, sy = bb.max.y - bb.min.y, sz = bb.max.z - bb.min.z;
      if (sx > 100 || sz > 100) {
        res.push({
          name: o.name || g.type,
          size: [sx, sy, sz].map((n) => +n.toFixed(1)),
          bbY: [+bb.min.y.toFixed(1), +bb.max.y.toFixed(1)],
          matColor: '#' + (o.material.color ? o.material.color.getHexString() : '??'),
          hasMap: !!o.material.map,
          uv: g.attributes.uv ? 'yes' : 'no',
          tris: g.index ? g.index.count / 3 : 0,
        });
      }
    } catch (e) { /* skip */ }
  });
  return res;
});
out.forEach((o) => console.log(JSON.stringify(o)));
await browser.close();

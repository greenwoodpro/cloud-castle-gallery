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

const out = await page.evaluate(async () => {
  const THREE = await import('/vendor/three.module.js');
  const s = window.__scene;
  s.tweenCamera([86, 52, 96], [0, 6, 0], 10);
  await new Promise((r) => setTimeout(r, 2000));

  const rc = new THREE.Raycaster();
  const W = innerWidth, H = innerHeight;
  const pts = [[300, 640], [900, 650], [520, 560], [430, 300]];
  const names = ['左下', '右下', '中部', '城堡区'];

  return pts.map(([px, py], i) => {
    const ndc = new THREE.Vector2((px / W) * 2 - 1, -(py / H) * 2 + 1);
    rc.setFromCamera(ndc, s.camera);
    const hits = rc.intersectObjects(s.scene.children, true).filter((h) => h.object.visible);
    const h = hits[0];
    if (!h) return { name: names[i], hit: 'none' };
    const m = h.object;
    const g = m.geometry;
    g.computeBoundingBox();
    const bb = g.boundingBox;
    return {
      name: names[i],
      dist: +h.distance.toFixed(1),
      geo: g.type,
      tris: g.index ? g.index.count / 3 : g.attributes.position.count / 3,
      matColor: m.material.color ? '#' + m.material.color.getHexString() : '??',
      hasMap: !!m.material.map,
      vertexColors: !!m.material.vertexColors,
      bbSize: [bb.max.x - bb.min.x, bb.max.y - bb.min.y, bb.max.z - bb.min.z].map((n) => +n.toFixed(1)),
      objPos: m.position.toArray().map((n) => +n.toFixed(1)),
      hitPoint: h.point.toArray().map((n) => +n.toFixed(1)),
    };
  });
});
out.forEach((o) => console.log(JSON.stringify(o)));
await browser.close();

import puppeteer from 'puppeteer-core';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
await page.setViewport({width:1280,height:800});
await page.goto('http://localhost:4173/?spot=courtyard&norotate=1', {waitUntil:'load'});
await page.waitForFunction('window.__ready===true', {timeout:60000});
await new Promise(r=>setTimeout(r,1200));
const out = await page.evaluate(() => {
  const { scene, camera } = window.__castle;
  const THREE = window.__THREE;
  const ray = new THREE.Raycaster();
  const res = [];
  for (const [sx, sy] of [[0.0,0.3],[0.2,0.3],[-0.2,0.35],[0.35,0.4],[0.0,0.0]]) {
    ray.setFromCamera(new THREE.Vector2(sx, sy), camera);
    const hit = ray.intersectObjects(scene.children, true)[0];
    if (!hit) { res.push([sx,sy,'none']); continue; }
    res.push({ndc:[sx,sy], type: hit.object.geometry?.type, color: hit.object.material?.color?.getHexString?.(), pos: hit.object.getWorldPosition(new THREE.Vector3()).toArray().map(v=>+v.toFixed(2)), dist:+hit.distance.toFixed(2), sc: hit.object.scale.toArray().map(v=>+v.toFixed(2))});
  }
  return res;
});
console.log(JSON.stringify(out));
await browser.close();

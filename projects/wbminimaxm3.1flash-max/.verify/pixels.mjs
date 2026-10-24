import puppeteer from 'puppeteer-core';
import fs from 'fs';

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

await page.evaluate(() => window.__scene.tweenCamera([86, 52, 96], [0, 6, 0], 10));
await new Promise((r) => setTimeout(r, 2500));

const buf = await page.screenshot({ encoding: 'base64' });
fs.writeFileSync('C:/Users/Administor/AppData/Local/Temp/castle-shots/probe.png', Buffer.from(buf, 'base64'));

// 在页面内把 PNG 解码后取色
const pts = [[300, 640], [900, 650], [260, 430], [520, 560], [640, 40], [1100, 200], [760, 555]];
const names = ['左下草地', '右下草地', '城堡左草地', '草地中部', '天空顶部', '天空中部', '湖面'];
const res = await page.evaluate(async (b64, pts) => {
  const img = new Image();
  img.src = 'data:image/png;base64,' + b64;
  await img.decode();
  const cv = document.createElement('canvas');
  cv.width = img.width; cv.height = img.height;
  const cx = cv.getContext('2d');
  cx.drawImage(img, 0, 0);
  return pts.map(([x, y], i) => {
    const d = cx.getImageData(x, y, 1, 1).data;
    return { name: i, rgb: [d[0], d[1], d[2]] };
  });
}, buf, pts);

res.forEach((r, i) => console.log(names[i].padEnd(12), 'rgb(' + r.rgb.join(', ') + ')'));
await browser.close();

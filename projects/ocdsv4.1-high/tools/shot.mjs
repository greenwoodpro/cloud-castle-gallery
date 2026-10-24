import fs from 'node:fs';
import path from 'node:path';

const CDP = process.env.CDP_PORT || 9333;
const url = process.argv[2] || 'http://127.0.0.1:8123/index.html';
const outDir = process.argv[3] || 'shots';
fs.mkdirSync(outDir, { recursive: true });

const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const page = list.find((t) => t.type === 'page') || list[0];
if (!page) throw new Error('no page target');

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const logs = [];

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    return;
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    const d = msg.params.exceptionDetails;
    logs.push('[EXC] ' + (d.exception?.description || d.text));
  }
  if (msg.method === 'Runtime.consoleAPICalled') {
    const t = msg.params.type;
    if (t === 'error' || t === 'warning') logs.push('[' + t + '] ' + msg.params.args.map((a) => a.value ?? a.description ?? a.type).join(' '));
  }
  if (msg.method === 'Log.entryAdded') {
    const e = msg.params.entry;
    if (e.level === 'error' || e.level === 'warning') logs.push('[log.' + e.level + '] ' + e.text + ' ' + (e.url || ''));
  }
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
    setTimeout(() => pending.has(mid) && (pending.delete(mid), reject(new Error('timeout ' + method))), 240000);
  });

await new Promise((r) => ws.addEventListener('open', r));
await send('Runtime.enable');
await send('Page.enable');
await send('Log.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url, transitionType: 'reload' });

const evalJs = async (expression, awaitPromise = false) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails.text));
  return r.result.value;
};

const t0 = Date.now();
let ready = false;
while (Date.now() - t0 < 60000) {
  await new Promise((r) => setTimeout(r, 2000));
  try {
    ready = await evalJs('!!(window.__oc && document.body.classList.contains("ready"))');
  } catch (e) {
    logs.push('[eval] ' + e.message.slice(0, 300));
  }
  if (ready) break;
}

if (!ready) {
  console.log('NOT READY after ' + ((Date.now() - t0) / 1000).toFixed(1) + 's');
  console.log(logs.slice(0, 40).join('\n'));
  process.exit(2);
}
const boot = ((Date.now() - t0) / 1000).toFixed(1);
console.log('booted in ' + boot + 's');
console.log('figures=' + (await evalJs('__oc.reg.figures.length')) + ' tickers=' + (await evalJs('__oc.reg.tickers.length')) + ' labels=' + (await evalJs('__oc.reg.labels.length')));
console.log('drawcalls=' + (await evalJs('__oc.renderer.info.render.calls')) + ' tris=' + (await evalJs('__oc.renderer.info.render.triangles')) + ' geoms=' + (await evalJs('__oc.renderer.info.memory.geometries')) + ' programs=' + (await evalJs('__oc.renderer.info.programs.length')));

const shotsArg = process.argv[4] || '[]';
const shots = shotsArg.endsWith('.json') ? JSON.parse(fs.readFileSync(shotsArg, 'utf8')) : JSON.parse(shotsArg);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(name) {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(outDir, name + '.png'), Buffer.from(r.data, 'base64'));
  console.log('shot ' + name);
}

async function settle(frames = 3) {
  await evalJs(`new Promise(r=>{let n=0;const f=()=>{n++<${frames}?requestAnimationFrame(f):r(1)};requestAnimationFrame(f)})`, true);
}

for (const s of shots) {
  if (s.ui === false) await evalJs(`document.getElementById('ui').classList.add('fold');document.getElementById('keys').style.display='none';document.getElementById('brand').style.display='none'`);
  if (s.ui === true) await evalJs(`document.getElementById('ui').classList.remove('fold');document.getElementById('keys').style.display='';document.getElementById('brand').style.display=''`);
  if (s.view) {
    await evalJs(`(()=>{const P=__oc.presets;for(const g of P){for(const it of g.items){if(it[0]===${JSON.stringify(s.view)}){__oc.flyTo(it[1],it[2],0.01,it[3]||46);return 'ok'}}}return 'miss'})()`);
  }
  if (s.time !== undefined) await evalJs(`__oc.setTime(${s.time})`);
  if (s.cut !== undefined) await evalJs(`__oc.setCut(${s.cut})`);
  if (s.js) {
    const r = await evalJs(s.js);
    if (s.dump) console.log('dump[' + (s.name || '') + ']: ' + JSON.stringify(r));
  }
  await settle(s.frames || 4);
  if (s.post) {
    const r = await evalJs(s.post);
    console.log('post[' + (s.name || '') + ']: ' + JSON.stringify(r));
  }
  if (s.wait) await wait(s.wait);
  if (s.name) await shot(s.name);
}

console.log('--- logs (' + logs.length + ') ---');
console.log(logs.slice(0, 60).join('\n'));
ws.close();
process.exit(0);

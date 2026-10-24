import puppeteer from 'puppeteer-core';
const EDGE='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage(); await p.setViewport({width:800,height:600});
p.on('pageerror',e=>console.log('PAGEERROR',String(e)));
p.on('console',m=>{ if(m.type()==='error') console.log('CONSOLE',m.text()); });
await p.goto('http://localhost:4173/?norotate=1',{waitUntil:'domcontentloaded',timeout:90000});
try{ await p.waitForFunction('window.__ready===true',{timeout:90000}); }catch(e){ console.log('not ready'); }
await new Promise(r=>setTimeout(r,800));
console.log(await p.evaluate(()=>{const {renderer,scene}=window.__castle||{}; if(!renderer) return 'no app'; let meshes=0,cast=0; scene.traverse(o=>{if(o.isMesh)meshes++; if(o.isMesh&&o.castShadow)cast++;}); return {calls:renderer.info.render.calls,meshes,cast,dpr:renderer.getPixelRatio()};}));
await b.close();

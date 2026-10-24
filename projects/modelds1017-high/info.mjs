import puppeteer from 'puppeteer-core';
const EDGE='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage(); await p.setViewport({width:1280,height:800});
await p.goto('http://localhost:4173/?norotate=1',{waitUntil:'load'});
await p.waitForFunction('window.__ready===true',{timeout:60000});
await new Promise(r=>setTimeout(r,1500));
console.log(await p.evaluate(()=>{
  const {renderer, scene}=window.__castle;
  let meshes=0, pts=0, lights=0;
  scene.traverse(o=>{ if(o.isMesh) meshes++; if(o.isPoints) pts++; if(o.isLight) lights++; });
  return {calls:renderer.info.render.calls, triangles:renderer.info.render.triangles, meshes, pts, lights, programs:renderer.info.programs.length, dpr:renderer.getPixelRatio()};
}));
await b.close();

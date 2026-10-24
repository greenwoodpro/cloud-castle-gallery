import puppeteer from 'puppeteer-core';
const EDGE='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage(); await p.setViewport({width:800,height:600});
p.on('pageerror',e=>console.log('ERR',String(e)));
await p.goto('http://localhost:4173/?spot=courtyard&norotate=1',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForFunction('window.__ready===true',{timeout:90000});
await new Promise(r=>setTimeout(r,2500));
console.log(await p.evaluate(()=>{
  const {ctx,renderer}=window.__castle;
  let ghosts=0, invisible=0;
  ctx.cutWalls.forEach(w=>{ if(w.opacity<0.2) ghosts++; if(!w.obj.visible) invisible++; });
  return {walls:ctx.cutWalls.length, ghosts, invisible, calls:renderer.info.render.calls};
}));
await b.close();

import puppeteer from 'puppeteer-core';
const EDGE='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage(); await p.setViewport({width:800,height:600});
p.on('pageerror',e=>console.log('ERR',String(e)));
await p.goto('http://localhost:4173/?norotate=1',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForFunction('window.__ready===true',{timeout:90000});
console.log(await p.evaluate(()=>{
  const {scene,ctx}=window.__castle;
  const out=[];
  ctx.banners.slice(0,8).forEach((b,i)=>{
    if(!b) return;
    const wp=new window.__THREE.Vector3(); b.getWorldPosition(wp);
    out.push({i, visible:b.visible, parent:b.parent?.type, pos:wp.toArray().map(v=>+v.toFixed(1)), count:b.geometry.attributes.position.count, inScene:!!b.parent});
  });
  let flags=0,toon=0; scene.traverse(o=>{if(o.isMesh&&o.material?.side===2)flags++; if(o.isMesh&&o.material?.isMeshToonMaterial)toon++;});
  return {banners:ctx.banners.length, sample:out, doubleSided:flags, toonMeshes:toon};
}));
await b.close();

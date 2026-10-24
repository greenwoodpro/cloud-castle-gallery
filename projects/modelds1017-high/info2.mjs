import puppeteer from 'puppeteer-core';
const EDGE='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b=await puppeteer.launch({executablePath:EDGE,headless:'new',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage(); await p.setViewport({width:800,height:600});
await p.goto('http://localhost:4173/?norotate=1',{waitUntil:'domcontentloaded',timeout:90000});
await p.waitForFunction('window.__ready===true',{timeout:60000});
await new Promise(r=>setTimeout(r,800));
console.log(await p.evaluate(()=>{
  const {scene}=window.__castle;
  const byType={}, byColor={}, topGroups={};
  let total=0, cast=0;
  const rootOf=(o)=>{let n=o; while(n.parent && n.parent!==scene) n=n.parent; return n.name||n.type;};
  scene.traverse(o=>{
    if(!o.isMesh) return; total++; if(o.castShadow) cast++;
    const t=o.geometry?.type||'?'; byType[t]=(byType[t]||0)+1;
    const c=o.material?.color?.getHexString?.()||'?'; byColor[c]=(byColor[c]||0)+1;
    const r=rootOf(o); topGroups[r]=(topGroups[r]||0)+1;
  });
  const sort=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,12);
  return {total,cast,byType:sort(byType),byColor:sort(byColor),topGroups:sort(topGroups)};
}));
await b.close();

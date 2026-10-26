import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Every component belongs to a readable room or removable architectural shell.
export function buildCastle(scene) {
  const group = new THREE.Group(); group.name = '玫瑰风城堡'; scene.add(group);
  const shell = new THREE.Group(); shell.name = '可揭开的城墙'; group.add(shell);
  const roof = new THREE.Group(); roof.name = '可揭开的屋顶'; group.add(roof);
  const interior = new THREE.Group(); interior.name = '四季生活室'; group.add(interior);
  const m = {};
  const material = (id, color, opts = {}) => m[id] = new THREE.MeshStandardMaterial({color, roughness: .89, ...opts});
  material('stone', '#e8d2ae'); material('trim', '#f5e7ca'); material('rose', '#caa685');
  material('roof', '#567d84'); material('tile', '#ae7060'); material('ridge', '#46676f');
  material('wood', '#8f6848'); material('lightwood', '#bc9568'); material('dark', '#514b43');
  material('glass', '#e8bf74', {emissive: '#d6a357', emissiveIntensity: .2});
  material('blue', '#6a8e98'); material('red', '#b9756a'); material('leaf', '#7c9870');
  material('linen', '#e6dec0'); material('gold', '#cfb16e', {metalness:.24}); material('water','#79aaa4');
  const unitBox = new THREE.BoxGeometry(1,1,1);
  const sphere = new THREE.IcosahedronGeometry(1, 1);
  const mesh = (geo, mat, x,y,z,parent = group) => {
    const o = new THREE.Mesh(geo, typeof mat === 'string' ? m[mat] : mat);
    o.position.set(x,y,z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o;
  };
  const box = (w,h,d,x,y,z,mat='stone',parent=group) => {
    const o=mesh(unitBox,mat,x,y,z,parent); o.scale.set(w,h,d); return o;
  };
  const cyl = (r,h,x,y,z,mat='stone',parent=group,rt=r,n=16) => mesh(new THREE.CylinderGeometry(rt,r,h,n),mat,x,y,z,parent);
  const ball=(r,x,y,z,mat='leaf',parent=group)=>{const o=mesh(sphere,mat,x,y,z,parent);o.scale.setScalar(r);return o;};
  const beam=(a,b,r,mat='wood',parent=group)=>{
    const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),d=bv.clone().sub(av);
    const o=cyl(r,d.length(),...(av.add(bv).multiplyScalar(.5).toArray()),mat,parent,r,6);
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;
  };
  const archShape=(w,h)=>{const s=new THREE.Shape(),r=w/2;s.moveTo(-r,0);s.lineTo(r,0);s.lineTo(r,h-r);s.absarc(0,h-r,r,0,Math.PI,false);s.closePath();return s;};
  const arch=(w,h,d,x,y,z,mat='dark',parent=group)=>mesh(new THREE.ExtrudeGeometry(archShape(w,h),{depth:d,bevelEnabled:false,curveSegments:10}),mat,x,y,z,parent);
  function windowAt(x,y,z,w=.55,h=1.25,parent=group,rotation=0){
    const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=rotation;parent.add(g);
    arch(w+.17,h+.16,.11,0,-.08,0,'rose',g); arch(w,h,.12,0,0,.045,'glass',g);
    box(.065,h-.15,.06,0,(h-.15)/2,.185,'wood',g);box(w,.065,.06,0,h*.46,.19,'wood',g);
    box(w+.26,.12,.34,0,-.07,.10,'trim',g);return g;
  }
  function gable(w,d,rise,x,y,z,mat='roof',parent=roof){
    const s=new THREE.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(0,rise);s.closePath();
    const o=mesh(new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:false}),mat,x,y,z-d/2,parent);
    beam([x,y+rise+.035,z-d/2-.12],[x,y+rise+.035,z+d/2+.12],.08,'ridge',parent);
    for(let k=1;k<5;k++){const t=k/5,xx=(w/2)*(1-t);for(const side of [-1,1])beam([x+side*xx,y+rise*t+.04,z-d/2],[x+side*xx,y+rise*t+.04,z+d/2],.024,'ridge',parent);}
    return o;
  }
  function parapet(x,z,len,axis='x',parent=group,height=3.2){
    box(axis==='x'?len:.52,height,axis==='x'?.52:len,x,height/2+.2,z,'stone',parent);
    box(axis==='x'?len+.1:.68,.17,axis==='x'?.68:len+.1,x,height+.26,z,'trim',parent);
    const count=Math.floor(len/.9);for(let i=0;i<count;i++){const q=(i-(count-1)/2)*.9;box(.44,.7,.56,x+(axis==='x'?q:0),height+.68,z+(axis==='z'?q:0),'stone',parent);}
    for(let i=0;i<3;i++)box(axis==='x'?len:.56,.05,axis==='x'?.56:len,x,.7+i*.85,z,'rose',parent);
  }
  function flag(x,y,z,col='red'){
    beam([x,y-1,z],[x,y+1.05,z],.035,'gold');
    const geom=new THREE.PlaneGeometry(1.25,.65,8,2),o=mesh(geom,col,x+.61,y+.52,z);o.material.side=THREE.DoubleSide;o.userData.flag=true;
    flags.push(o);ball(.085,x,y+1.1,z,'gold');return o;
  }
  const flags=[];
  // Foundation and enclosed garden court, with a genuine open gateway.
  box(15.4,.36,13.8,0,.1,-1.3,'rose');box(14.9,.16,13.3,0,.36,-1.3,'trim');
  box(12,.08,5,0,.49,2.25,'lightwood');
  for(let i=-6;i<=6;i++)for(let j=0;j<4;j++)box(.84,.025,.72,i*.89,.54,.85+j*.82,'stone');
  parapet(0,-7.6,13,'x');parapet(-6.8,-1.6,11.5,'z');parapet(6.8,-1.6,11.5,'z',shell);
  parapet(-4.7,4.8,4.3,'x',shell);parapet(4.7,4.8,4.3,'x',shell);
  // Voussoirs form the arched entry instead of a dark rectangle on a solid wall.
  box(.75,3.45,.9,-1.55,1.9,4.8,'trim',shell);box(.75,3.45,.9,1.55,1.9,4.8,'trim',shell);
  for(let k=0;k<11;k++){const a=k*Math.PI/10;const q=box(.46,.46,.95,Math.cos(a)*1.33,2.15+Math.sin(a)*1.33,4.8,'trim',shell);q.rotation.z=a;}
  box(4.0,.42,1.0,0,3.95,4.8,'stone',shell);for(let i=-2;i<=2;i++)box(.45,.7,.7,i*.84,4.48,4.8,'stone',shell);
  box(2.7,.15,2.7,0,.58,5.5,'wood');for(let i=-6;i<=6;i++)box(2.7,.035,.035,0,.68,4.3+i*.19,'dark');
  for(let x of [-1.42,1.42]){beam([x,.65,4.55],[x,.65,6.9],.055,'wood');for(let z of [4.5,5.4,6.3,6.9])beam([x,.68,z],[x,1.23,z],.045,'wood');beam([x,1.25,4.5],[x,1.25,6.9],.05,'wood');}
  function tower(x,z,h,col='tile',point=3.0){
    cyl(1.46,.42,x,.55,z,'rose');cyl(1.23,h,x,h/2+.5,z,'stone');cyl(1.34,.25,x,h+.3,z,'trim');
    for(let y=1.5;y<h;y+=1.25)cyl(1.245,.045,x,y,z,'rose');
    for(let k=0;k<12;k++){const a=k/12*Math.PI*2;const q=box(.35,.65,.35,x+Math.sin(a)*1.12,h+.66,z+Math.cos(a)*1.12,'stone');q.rotation.y=a;}
    cyl(1.65,point,x,h+.75+point/2,z,col,roof,0,20);cyl(1.69,.17,x,h+.73,z,col,roof);
    for(let k=1;k<5;k++){const t=k/5;cyl(1.65*(1-t)+.015,.045,x,h+.75+point*t,z,col,roof);}
    ball(.12,x,h+point+.85,z,'gold',roof);
    windowAt(x,h*.48,z+1.237,.42,1.15);windowAt(x+1.237,h*.55,z,.42,1.15,group,Math.PI/2);
    return h+point+.8;
  }
  const tall=tower(-6.55,-6.7,9.5,'roof',4.6);tower(6.55,-6.7,7.5,'tile',3.5);tower(-6.55,4.3,5.4,'tile',3.4);tower(6.55,4.3,6.4,'roof',3.8);
  flag(-6.55,tall+.7,-6.7,'red');flag(6.55,11.6,4.3,'blue');
  // The main keep has three real floors. Its south/east faces lift away.
  const kx=-1.2,kz=-3.25,w=8.4,d=6.6;
  box(w,10,.48,kx,5.5,kz-d/2,'stone');box(.5,10,d,kx-w/2,5.5,kz,'stone');
  box(w,10,.48,kx,5.5,kz+d/2,'stone',shell);box(.5,10,d,kx+w/2,5.5,kz,'stone',shell);
  for(let lev=0;lev<3;lev++){
    const fy=.57+lev*3.15;box(w-.45,.2,d-.45,kx,fy,kz,'lightwood',interior);
    for(let j=0;j<12;j++)box(w-.45,.025,.025,kx,fy+.11,kz-d/2+.4+j*.51,'wood',interior);
    box(w+.28,.22,d+.25,kx,fy+.15,kz,'trim',lev===0?group:shell);
    for(let x of [-3.7,-1.2,1.3])windowAt(x,1.4+lev*3.12,.31,.66,1.5,shell);
    for(let z of [-5.2,-2.9,-.8])windowAt(3.04,1.4+lev*3.12,z,.66,1.5,shell,Math.PI/2);
    for(let x of [-3.7,-1.2,1.3])windowAt(x,1.4+lev*3.12,-6.82,.66,1.5,group,Math.PI);
    for(let x of [-5.36,2.98])for(let j=0;j<5;j++)box(.6,.32,.62,x,fy+.4+j*.48,.04,j%2?'rose':'trim',shell);
  }
  gable(w+.9,d+1.0,3.25,kx,10.52,kz,'roof');
  // Dormer windows soften the long roof silhouette.
  for(let x of [-3.4,1.0]){box(1.25,1.05,.85,x,11.15,.13,'trim',roof);windowAt(x,10.8,.59,.55,.85,roof);gable(1.6,1.0,.7,x,11.68,.16,'tile');}
  for(let x of [-4.35,2]){box(.58,1.9,.7,x,12.5,-4.8,'rose',roof);box(.75,.18,.86,x,13.48,-4.8,'trim',roof);}
  // An off-center observatory spire gives the castle its recognizable skyline.
  cyl(.95,3.8,-1.35,13.45,-4.45,'trim');cyl(1.07,.24,-1.35,15.34,-4.45,'rose');
  cyl(1.47,4.0,-1.35,17.45,-4.45,'tile',roof,0,20);ball(.12,-1.35,19.55,-4.45,'gold',roof);
  windowAt(-1.35,13.2,-3.48,.44,1.2);flag(-1.35,20.0,-4.45,'blue');
  // The lower kitchen/chapel wing is distinct from the keep.
  const wing = new THREE.Group();group.add(wing);
  box(3.05,4.0,.4,4.7,2.5,-4.9,'stone',wing);box(.4,4,6,6.02,2.5,-2.1,'stone',shell);
  box(2.75,4,.4,4.65,2.5,.7,'stone',shell);box(2.85,.2,5.8,4.6,.64,-2.1,'lightwood',interior);
  gable(3.8,6.5,2.0,4.65,4.58,-2.1,'tile');
  windowAt(4.65,1.75,.95,.8,1.65,shell);for(let z of [-3.7,-1.5])windowAt(6.25,1.7,z,.65,1.65,shell,Math.PI/2);
  box(.7,2.1,.75,5.3,6.13,-3.4,'stone',roof);box(.9,.15,.95,5.3,7.19,-3.4,'rose',roof);
  // Furnishings are modeled at human scale, with distinct activities in each room.
  function table(x,y,z,ww=2,dd=1){
    box(ww,.13,dd,x,y+.85,z,'wood',interior);for(let xx of [-1,1])for(let zz of [-1,1])box(.12,.8,.12,x+xx*(ww/2-.15),y+.4,z+zz*(dd/2-.15),'dark',interior);
  }
  function stool(x,y,z){cyl(.25,.12,x,y+.5,z,'wood',interior);for(let a=0;a<3;a++){const t=a/3*Math.PI*2;beam([x+Math.cos(t)*.17,y,z+Math.sin(t)*.17],[x+Math.cos(t)*.12,y+.48,z+Math.sin(t)*.12],.035,'wood',interior);}}
  // Great hall: trestle table, food, woven carpet, hearth, musicians' balcony.
  box(3.1,.025,4.45,-1.8,.81,-3.0,'red',interior);table(-1.9,.77,-3.1,2.15,3.3);
  for(let z of [-4.1,-3,-1.9])for(let x of [-3.35,-.45])stool(x,.76,z);
  for(let z of [-4.0,-3.1,-2.2]){cyl(.22,.045,-1.9,1.71,z,'linen',interior);ball(.11,-1.9,1.8,z,'gold',interior);}
  box(1.7,2.1,.56,-4.25,1.8,-6.04,'rose',interior);arch(.95,1.25,.25,-4.25,.78,-5.72,'dark',interior);
  for(let x of [-4.55,-4.23,-3.94]){beam([x,.85,-5.42],[x+.15,1.05,-5.45],.10,'wood',interior);ball(.12,x,1.09,-5.44,'gold',interior);}
  box(.5,1.1,.16,1.85,2.3,-6.03,'red',interior);box(.07,1.1,.05,1.85,2.3,-5.93,'gold',interior);
  // Library, y=3.9: filled shelves, map desk and a small rolling ladder.
  for(let x of [-4.15,-1.7,.75]){
    box(1.8,2.3,.42,x,5.02,-6.05,'wood',interior);
    for(let row=0;row<3;row++){box(1.85,.09,.58,x,4.25+row*.65,-5.99,'lightwood',interior);for(let j=0;j<8;j++)box(.13,.36+(j%3)*.055,.30,x-.73+j*.21,4.46+row*.65,-5.86,['red','blue','gold','linen'][j%4],interior);}
  }
  table(.2,3.95,-1.7,2.4,1.1);box(1.5,.023,.65,.2,4.88,-1.7,'linen',interior);stool(.1,3.94,-.65);
  for(let i=0;i<7;i++)beam([-3.25,4.0+i*.25,-5.05],[-2.67,4.0+i*.25,-5.05],.025,'lightwood',interior);
  for(let x of [-3.3,-2.62])beam([x,3.97,-4.88],[x,5.95,-5.35],.04,'wood',interior);
  cyl(.25,.09,1.0,4.97,-1.6,'gold',interior);ball(.25,1.0,5.18,-1.6,'blue',interior);
  // Bedroom at y=7.0: four poster bed, linen, trunk, writing desk and a telescope.
  box(2.15,.5,2.7,-2.75,7.37,-3.9,'wood',interior);box(2,.22,2.55,-2.75,7.72,-3.9,'linen',interior);
  box(2,.07,1.7,-2.75,7.89,-3.4,'blue',interior);for(let x of [-3.25,-2.25])box(.76,.18,.46,x,7.91,-4.85,'linen',interior);
  for(let x of [-3.8,-1.7])for(let z of [-5.25,-2.55]){beam([x,7.1,z],[x,9.25,z],.055,'wood',interior);ball(.09,x,9.3,z,'gold',interior);}
  box(2.3,.12,2.9,-2.75,9.29,-3.9,'red',interior);table(.5,7.1,-4.8,1.5,.8);stool(.5,7.1,-3.8);
  box(1.3,.65,.7,.65,7.46,-1.65,'wood',interior);box(.16,.22,.06,.65,7.52,-1.25,'gold',interior);
  // A continuous stair along the west wall links all three occupied stories.
  for(let lev=0;lev<2;lev++)for(let i=0;i<13;i++)box(.82,.25,.32,-4.65,.84+lev*3.15+i*.24,-.65-i*.29,'wood',interior);
  // Kitchen: bread oven, preparation table, hanging pans, sacks and a water barrel.
  box(1.4,1.75,.8,5.13,1.6,-4.23,'rose',interior);arch(.85,1.1,.15,5.13,.77,-3.78,'dark',interior);
  box(1.4,.12,1.02,5.13,1.2,-4.05,'trim',interior);table(4.6,.77,-1.75,1.65,.9);
  for(let i=0;i<3;i++){const o=ball(.16,4.14+i*.4,1.77,-1.7,'gold',interior);o.scale.set(.22,.12,.15);}
  cyl(.42,.92,5.55,1.19,-.4,'wood',interior);for(let y of [.8,1.15,1.55])cyl(.435,.055,5.55,y,-.4,'dark',interior);
  cyl(.30,.07,5.55,1.68,-.4,'water',interior);beam([3.55,2.6,-4.13],[5.75,2.6,-4.13],.045,'wood',interior);
  for(let i=0;i<4;i++){cyl(.17,.10,3.75+i*.5,2.24,-4.05,'dark',interior);beam([3.75+i*.5,2.3,-4.05],[3.75+i*.5,2.6,-4.05],.025,'dark',interior);}
  // Courtyard fountain and rose garden make the defensive enclosure a lived place.
  cyl(.85,.32,.1,.72,2.45,'rose');cyl(.67,.06,.1,.9,2.45,'water');cyl(.18,.7,.1,1.17,2.45,'trim');ball(.23,.1,1.58,2.45,'gold');
  for(let side of [-1,1]){box(1.3,.42,2.4,side*4.8,.76,2.15,'rose');for(let i=0;i<9;i++){const x=side*4.8+Math.sin(i*7)*.42,z=1.3+(i%4)*.52;ball(.28,x,1.1,z,'leaf');ball(.13,x+.06,1.35,z,'red');}}
  // Wandering ivy and hand-set quoins add scale without photo textures.
  for(let k=0;k<45;k++){const y=.8+k*.11,x=-5.63+Math.sin(k*.75)*.27;ball(.12,x,y,-1.35+Math.sin(k*.8)*.17,'leaf');}
  for(let x of [-6.8,6.8])for(let z of [-6.7,4.3])for(let k=0;k<4;k++)box(.38,.22,.1,x-.5,.9+k*.64,z+1.21,'trim');
  // Merge static geometry by material separately inside every removable shell.
  function consolidate(root){
    root.updateWorldMatrix(true,true);const inv=root.matrixWorld.clone().invert(),bins=new Map(),remove=[];
    root.traverse(o=>{if(!o.isMesh||o.userData.flag)return;let skip=false;for(let p=o.parent;p&&p!==root;p=p.parent)if(p===shell||p===roof||p===interior)skip=true;if(skip)return;
      const g=o.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld));const ng=g.index?g.toNonIndexed():g;
      if(!bins.has(o.material))bins.set(o.material,[]);bins.get(o.material).push(ng);remove.push(o);});
    for(const o of remove)o.parent.remove(o);
    for(const [mat,geos]of bins){const merged=mergeGeometries(geos,false);if(!merged)continue;const o=new THREE.Mesh(merged,mat);o.castShadow=true;o.receiveShadow=true;root.add(o);}
  }
  consolidate(shell);consolidate(roof);consolidate(interior);consolidate(group);
  const rooms=[
    {id:'hall',title:'宴会厅',position:[-1.8,1.7,-2.8]},
    {id:'library',title:'藏书室',position:[.1,4.85,-1.7]},
    {id:'bedroom',title:'卧房',position:[-2.5,8.05,-3.2]},
    {id:'kitchen',title:'厨房',position:[4.7,1.65,-1.6]},
    {id:'courtyard',title:'玫瑰庭院',position:[0,1.2,2.4]},
  ];
  return {group,cutawayObjects:[shell],roofs:[roof],rooms,update(time){
    for(const f of flags){const a=f.geometry.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i);a.setZ(i,Math.sin(time*1.6+x*3)*.10*(x+.65));}a.needsUpdate=true;}
  }};
}

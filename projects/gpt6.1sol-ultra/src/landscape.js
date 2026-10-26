import * as THREE from 'three';

// The landscape is entirely modeled, including the taper under the meadow.
export function buildLandscape(scene) {
  const group = new THREE.Group();
  group.name = '风眠岛 · 浮空地貌与田园';
  scene.add(group);
  let seed = 12457;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const mat = (color, roughness = .9) => new THREE.MeshStandardMaterial({ color, roughness });
  const m = {
    grass: mat('#aabf85'), moss: mat('#899d73'), paleGrass: mat('#bdc795'),
    stone: mat('#c7b6a0'), stoneLight: mat('#dfcfb5'), cliff: mat('#bdad99'),
    path: mat('#dbcaa6'), wood: mat('#94785c'), darkWood: mat('#695b4d'),
    plaster: mat('#f2dfbf'), plasterRose: mat('#e6cbb4'), roof: mat('#ac7566'), roofBlue: mat('#7b9696'),
    trunk: mat('#8c795e'), leaf: mat('#91ad83'), leafLight: mat('#b3c69a'), pine: mat('#789989'),
    gold: mat('#d7b66b'), wheat: mat('#dcc081'), stems: mat('#bcaa70'),
    water: new THREE.MeshStandardMaterial({ color: '#86c5c3', roughness: .32, metalness: .05, transparent: true, opacity: .86, side: THREE.DoubleSide }),
    waterFoam: new THREE.MeshBasicMaterial({ color: '#e4f0db', transparent: true, opacity: .68, depthWrite: false }),
    window: new THREE.MeshStandardMaterial({ color: '#edcc84', emissive: '#bd7c37', emissiveIntensity: .13, roughness: .6 }),
    pink: mat('#d6a8a1'), flower: mat('#efe3bf'), violet: mat('#a7a0b7'), green: mat('#6f8e69'),
  };
  const geos = {
    box: new THREE.BoxGeometry(1, 1, 1),
    sphere: new THREE.IcosahedronGeometry(1, 1),
    rock: new THREE.IcosahedronGeometry(1, 0),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 8),
    cone: new THREE.ConeGeometry(1, 1, 9),
  };
  function mesh(geo, material, pos, scale = [1, 1, 1], parent = group, name = '') {
    const object = new THREE.Mesh(geo, material);
    object.position.set(...pos); object.scale.set(...scale);
    object.castShadow = true; object.receiveShadow = true;
    if (name) object.name = name;
    parent.add(object); return object;
  }
  const box = (pos, scale, material, parent = group) => mesh(geos.box, material, pos, scale, parent);
  const tmp = new THREE.Object3D();
  const instanced = (geometry, material, transforms, name) => {
    const object = new THREE.InstancedMesh(geometry, material, transforms.length);
    transforms.forEach((a, i) => {
      tmp.position.set(...a.p); tmp.scale.set(...(a.s || [1,1,1]));
      tmp.rotation.set(...(a.r || [0,0,0])); tmp.updateMatrix(); object.setMatrixAt(i, tmp.matrix);
    });
    object.castShadow = true; object.receiveShadow = true; object.name = name;
    group.add(object); return object;
  };
  const topY = (x, z) => .025 + .05 * Math.sin(x * .41) * Math.cos(z * .36);
  const count = 64;
  const rim = Array.from({ length: count }, (_, i) => {
    const a = i / count * Math.PI * 2;
    const irregularity = 1 + .035 * Math.sin(a*5+.8) + .025 * Math.cos(a*9);
    return new THREE.Vector3(Math.cos(a)*23*irregularity, -.05 + .12*Math.sin(a*7), Math.sin(a)*19*irregularity);
  });
  const topPositions=[], topColors=[];
  const meadowColors = ['#aabc86','#b0c18c','#b6c493','#a4b783','#bbc897'].map(c=>new THREE.Color(c));
  function terrainTriangle(a,b,c,color) {
    [a,b,c].forEach(v=>{topPositions.push(v.x,v.y,v.z);topColors.push(color.r,color.g,color.b);});
  }
  for(let r=0;r<5;r++) {
    const ri=r/5, ro=(r+1)/5;
    for(let i=0;i<count;i++) {
      const j=(i+1)%count;
      const pt=(index,f)=>{
        const v=rim[index].clone().multiplyScalar(f);v.y=topY(v.x,v.z)+(f===1?rim[index].y:0);return v;
      };
      const a=pt(i,ri),b=pt(j,ri),c=pt(i,ro),d=pt(j,ro);
      const color=meadowColors[Math.floor(rand()*meadowColors.length)];
      terrainTriangle(a,d,c,color); if(r) terrainTriangle(a,b,d,color);
    }
  }
  const topGeometry=new THREE.BufferGeometry();
  topGeometry.setAttribute('position',new THREE.Float32BufferAttribute(topPositions,3));
  topGeometry.setAttribute('color',new THREE.Float32BufferAttribute(topColors,3));topGeometry.computeVertexNormals();
  mesh(topGeometry,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}),[0,0,0], [1,1,1],group,'连续的草甸表面');

  // Continuous rings keep the cliffs a solid, watertight-looking hanging landmass.
  const cliffPositions=[],cliffColors=[];
  const rings=[{r:1,y:-.12},{r:.98,y:-2},{r:.79,y:-6.5},{r:.63,y:-11.5},{r:.35,y:-17},{r:.035,y:-21}];
  const bandColors=['#c8b99d','#baa98f','#cabaa3','#b2a48d','#c8b9a1'];
  const ringPoint=(i,k)=>{
    const base=rim[i], ring=rings[k],a=i/count*Math.PI*2;
    return new THREE.Vector3(base.x*ring.r+Math.sin(a*3+k)*.28,ring.y+Math.sin(a*5+k)*(.08+k*.12),base.z*ring.r);
  };
  for(let k=0;k<rings.length-1;k++)for(let i=0;i<count;i++) {
    const j=(i+1)%count,a=ringPoint(i,k),b=ringPoint(j,k),c=ringPoint(i,k+1),d=ringPoint(j,k+1);
    const col=new THREE.Color(bandColors[k]).multiplyScalar(.94+rand()*.12);
    [a,d,c,a,b,d].forEach(v=>{cliffPositions.push(v.x,v.y,v.z);cliffColors.push(col.r,col.g,col.b);});
  }
  const cliffGeometry=new THREE.BufferGeometry();cliffGeometry.setAttribute('position',new THREE.Float32BufferAttribute(cliffPositions,3));
  cliffGeometry.setAttribute('color',new THREE.Float32BufferAttribute(cliffColors,3));cliffGeometry.computeVertexNormals();
  mesh(cliffGeometry,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true}),[0,0,0],[1,1,1],group,'悬垂的层状岩体');
  const rocks=[];
  for(let i=0;i<34;i++){
    const a=rand()*Math.PI*2,r=.88+rand()*.13;
    rocks.push({p:[Math.cos(a)*21.5*r,-1.7-rand()*1.6,Math.sin(a)*17.8*r],s:[.65+rand()*1.1,1.2+rand()*2.1,.6+rand()],r:[rand(),rand(),rand()]});
  }
  instanced(geos.rock,m.stone,rocks,'崖边的风化石');
  // Long, slightly offset seams break up the hanging mass into weathered spires.
  const hangingStone=mat('#ad9e8a');
  const spireGeometry=new THREE.ConeGeometry(1,1,6);
  [[15.5,-8.5,7.8,1.25,6.4],[-16.2,-8,4.5,1.5,6.2],[-12.8,-10.3,10.9,1.3,7.3],
   [8.5,-12.1,12.6,1.12,6.6],[17,-8.8,-5.2,1.2,6.1],[-10.5,-12.3,-12.8,1.1,6.7]]
    .forEach(([x,y,z,r,h],i)=>{
      const spire=mesh(spireGeometry,hangingStone,[x,y,z],[r,h,r*.82],group,'下垂的风化岩锥');
      spire.rotation.set(.04*(i%3-1),i*.63,Math.PI+.055*(i%2?1:-1));
    });
  for(let i=0;i<9;i++){
    const a=i/9*Math.PI*2+.3;
    const start=new THREE.Vector3(Math.cos(a)*15,-4,Math.sin(a)*12);
    const curve=new THREE.CatmullRomCurve3([start,start.clone().add(new THREE.Vector3(.6,-1.6,.4)),start.clone().add(new THREE.Vector3(-.3,-3.8,.7)),start.clone().add(new THREE.Vector3(-1,-5,.2))]);
    mesh(new THREE.TubeGeometry(curve,12,.065,5,false),m.trunk,[0,0,0],[1,1,1],group,'探出岩壁的古树根');
  }

  // Paths are thick ribbons of warm compacted limestone, raised only slightly.
  function ribbon(points,width,material,name,y=.13){
    const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(p[0],p[1]??y,p[2])));
    const positions=[],indices=[],n=80;
    for(let i=0;i<=n;i++){
      const t=i/n,p=curve.getPoint(t),v=curve.getTangent(t);const side=new THREE.Vector3(-v.z,0,v.x).normalize().multiplyScalar(width/2);
      positions.push(p.x+side.x,p.y,p.z+side.z,p.x-side.x,p.y,p.z-side.z);
      if(i<n){const k=i*2;indices.push(k,k+2,k+1,k+1,k+2,k+3);}
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();
    const obj=mesh(g,material,[0,0,0],[1,1,1],group,name);return {obj,curve};
  }
  ribbon([[0,.16,6.3],[0,.16,9],[-4,.16,10.5],[-8,.16,10],[-12,.16,8],[-15,.16,4]],1.25,m.path,'城门通向村庄的石灰小路');
  ribbon([[0,.15,9],[4,.15,10],[7,.15,8],[10,.15,6],[13,.15,6],[16,.15,7]],.9,m.path,'去风车与溪流的小径');
  ribbon([[-13,.14,7],[-15,.14,1],[-13,.14,-5],[-9,.14,-8]],.7,m.path,'林间小径');
  const pathStone=[];
  for(let i=0;i<72;i++){
    const t=i/71,z=6.4+t*3.4;
    pathStone.push({p:[(i%3-1)*.28,.18,z],s:[.23,.045,.16+rand()*.14],r:[0,rand()*.2,0]});
  }
  instanced(geos.rock,m.stoneLight,pathStone,'城门前的小块铺路石');

  // Gentle outcrops and a meadow knoll behind the mill.
  mesh(new THREE.SphereGeometry(1,24,12),m.paleGrass,[12.2,-.7,-9.4],[6.8,2.4,5.3],group,'针叶林下的小丘');
  const boulder=[];
  for(let i=0;i<44;i++){
    const a=rand()*Math.PI*2,rr=.72+rand()*.21;const x=Math.cos(a)*23*rr,z=Math.sin(a)*19*rr;
    if(x>10&&z>8)continue;
    boulder.push({p:[x,.25+rand()*.3,z],s:[.28+rand()*.7,.3+rand()*.6,.35+rand()*.8],r:[rand(),rand()*6,rand()]});
  }
  instanced(geos.rock,m.stoneLight,boulder,'草地上的圆润石头');

  const treeTrunks=[],treeCrowns=[],lightCrowns=[],pineTrunks=[],pineCrowns=[];
  function broadTree(x,z,height=3.2){
    const y=topY(x,z), s=height/3.2;
    treeTrunks.push({p:[x,y+height*.34,z],s:[.16*s,height*.68,.16*s],r:[0,rand()*6,.04]});
    treeCrowns.push({p:[x,y+height*.79,z],s:[1.15*s,1.14*s,1.08*s],r:[rand(),rand(),rand()]});
    lightCrowns.push({p:[x-.6*s,y+height*.72,z+.15*s],s:[.85*s,.82*s,.84*s],r:[rand(),rand(),rand()]});
    if(rand()>.6)lightCrowns.push({p:[x+.58*s,y+height*.89,z-.2*s],s:[.76*s,.83*s,.76*s],r:[rand(),rand(),rand()]});
  }
  function pineTree(x,z,height=4,y=0){
    pineTrunks.push({p:[x,y+height*.35,z],s:[.11,height*.7,.11]});
    for(let i=0;i<3;i++)pineCrowns.push({p:[x,y+height*(.38+i*.21),z],s:[height*(.28-i*.05),height*.55,height*(.28-i*.05)],r:[0,rand()*6,0]});
  }
  [[-18,0],[-18,-4],[-16,-7],[-13,-11],[-10,-12],[-17,10],[-14,13],[-9,14],[-6,15],[5,15],[2,16],[-20,3],[-19,7],[-14,-2]].forEach(([x,z])=>broadTree(x,z,2.7+rand()*1.4));
  for(let i=0;i<28;i++){
    const x=8+rand()*10,z=-13+rand()*10;
    if((x/22)**2+(z/18)**2>.88||x<9&&z>-9||x>15&&z>-10)continue;
    const y=Math.max(0,1.5*(1-((x-12.2)/6.8)**2-((z+9.4)/5.3)**2));
    pineTree(x,z,2.5+rand()*2,y);
  }
  for(let i=0;i<12;i++){
    const x=-20+rand()*8,z=-11+rand()*8;if((x/23)**2+(z/19)**2<.85)pineTree(x,z,3+rand()*1.6);
  }
  instanced(geos.cylinder,m.trunk,treeTrunks,'果园和草甸中的树干');
  instanced(geos.sphere,m.leaf,treeCrowns,'鼠尾草绿的圆叶树冠');
  instanced(geos.sphere,m.leafLight,lightCrowns,'柔亮的树叶');
  instanced(geos.cylinder,m.trunk,pineTrunks,'松林树干');
  instanced(geos.cone,m.pine,pineCrowns,'层层叠叠的松树');
  const flowerSets=[[],[],[]],grassTufts=[];
  for(let i=0;i<820;i++){
    const x=(rand()-.5)*43,z=(rand()-.5)*35;
    if((x/22)**2+(z/18)**2>.9||Math.abs(x)<8.5&&z<7&&z>-10||x>7&&z>8||x>10&&z<-4)continue;
    if(Math.abs(z-10)<1.1&&x>-13&&x<7)continue;
    const y=topY(x,z),h=.10+rand()*.16;
    flowerSets[i%3].push({p:[x,y+h,z],s:[.065+rand()*.035,.06,.065+rand()*.035],r:[0,rand()*6,0]});
    if(i%3===0)grassTufts.push({p:[x,y+.12,z],s:[.035,.26,.04],r:[0,rand()*6,.15]});
  }
  [m.flower,m.pink,m.violet].forEach((material,i)=>instanced(geos.sphere,material,flowerSets[i],['雏菊','野蔷薇','蓝色小花'][i]));
  instanced(geos.cone,m.green,grassTufts,'纤细的草叶');

  function roofGeometry(width,depth,eave,ridge){
    const shape=new THREE.Shape();shape.moveTo(-width/2,eave);shape.lineTo(0,ridge);shape.lineTo(width/2,eave);shape.closePath();
    return new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:false,steps:1});
  }
  function cottage(x,z,scale,angle,roofMaterial,rose=false){
    const home=new THREE.Group();home.name='半木构的田园小屋';home.position.set(x,.12,z);home.rotation.y=angle;home.scale.setScalar(scale);group.add(home);
    box([0,.9,0],[2.5,1.8,2.8],rose?m.plasterRose:m.plaster,home);
    const roof=mesh(roofGeometry(3.05,3.4,1.85,3.2),roofMaterial,[0,0,-1.7],[1,1,1],home);
    // Half-timbering, including diagonal braces on the front facade.
    for(const px of [-1.2,0,1.2])box([px,.9,1.414],[.105,1.8,.07],m.darkWood,home);
    for(const py of [.12,.85,1.75])box([0,py,1.43],[2.5,.085,.09],m.darkWood,home);
    for(const px of [-.6,.6]){
      const brace=box([px,1.3,1.45],[.07,1.05,.07],m.wood,home);brace.rotation.z=px>0?-.6:.6;
    }
    box([0,.63,1.48],[.55,1.12,.1],m.wood,home);
    box([.12,.63,1.55],[.04,.07,.04],m.gold,home);
    for(const px of [-.8,.8]){
      box([px,1.19,1.49],[.43,.5,.08],m.darkWood,home);
      box([px,1.2,1.54],[.32,.38,.03],m.window,home);
      box([px,1.2,1.565],[.035,.4,.025],m.wood,home);
      box([px,1.2,1.565],[.35,.035,.025],m.wood,home);
      box([px,.89,1.57],[.56,.15,.23],m.wood,home);
      for(let f=0;f<3;f++)mesh(geos.sphere,f%2?m.pink:m.green,[px-.16+f*.16,.99,1.59],[.13,.12,.12],home);
    }
    box([0,2.32,1.72],[.1,1.03,.08],m.wood,home);
    box([0,1.91,1.72],[2.75,.1,.09],m.wood,home);
    for(const s of [-1,1]){
      const beam=box([s*.63,2.46,1.72],[.075,1.68,.08],m.wood,home);beam.rotation.z=s*.79;
    }
    box([.75,2.65,-.55],[.37,1.43,.42],m.stoneLight,home);box([.75,3.37,-.55],[.49,.13,.53],m.stone,home);
    box([0,.08,1.9],[.9,.15,.65],m.stoneLight,home);
    // Fine roof ridges lend a tiled rather than solid-plastic appearance.
    for(let j=0;j<6;j++){
      const y=2+j*.18,w=2.7*(1-(y-1.85)/1.4);
      const s=box([0,y+.035,0],[Math.max(.1,w),.035,3.43],roofMaterial,home);
      s.material=roofMaterial;
    }
    return home;
  }
  cottage(-12.5,5.5,1.05,-.15,m.roof,false);
  cottage(-10.5,11,.83,-.2,m.roofBlue,true);
  cottage(-16,4,.8,.55,m.roof,false);
  // Village well with a proper open center and spindle under the tiny roof.
  const well=new THREE.Group();well.position.set(-9.2,.18,7.6);group.add(well);well.name='村口的石井';
  mesh(new THREE.CylinderGeometry(.6,.66,.64,16,1,true),m.stoneLight,[0,.32,0],[1,1,1],well);
  mesh(new THREE.CylinderGeometry(.52,.52,.04,16),m.water,[0,.13,0],[1,1,1],well);
  for(const s of [-1,1])box([s*.7,1,0],[.1,1.5,.12],m.wood,well);
  mesh(roofGeometry(1.9,1.35,1.7,2.25),m.roof,[0,0,-.675],[1,1,1],well);
  const spindle=mesh(geos.cylinder,m.wood,[0,1.15,0],[.07,1.6,.07],well);spindle.rotation.z=Math.PI/2;
  mesh(geos.cylinder,m.wood,[.2,.75,0],[.2,.27,.2],well);
  box([.2,1.02,0],[.025,.4,.025],m.darkWood,well);

  // A small working mill watches over an irregular gold field.
  const fieldShape=new THREE.Shape();fieldShape.moveTo(6.7,8.3);fieldShape.quadraticCurveTo(10,7.6,12.9,9);fieldShape.lineTo(12.7,13.1);fieldShape.quadraticCurveTo(10,14,7,12.5);fieldShape.closePath();
  const fieldGeometry=new THREE.ShapeGeometry(fieldShape,16);fieldGeometry.rotateX(-Math.PI/2);
  // Shape's 2D y becomes world -z, so reflect back into the front meadow.
  fieldGeometry.scale(1,1,-1);fieldGeometry.computeVertexNormals();
  mesh(fieldGeometry,new THREE.MeshStandardMaterial({color:'#b8aa76',roughness:1,side:THREE.DoubleSide}),[0,.14,0],[1,1,1],group,'金黄的麦田');
  const stems=[],heads=[];
  for(let row=0;row<15;row++)for(let col=0;col<28;col++){
    const x=7.05+col*.205+(rand()-.5)*.11,z=8.65+row*.28+(rand()-.5)*.14;
    if(z<8.7+.09*(x-9)**2||z>13.1-.06*(x-9.5)**2)continue;
    const h=.47+rand()*.2,a=(rand()-.5)*.2;
    stems.push({p:[x,.18+h*.5,z],s:[.013,h,.013],r:[a,0,a]});
    heads.push({p:[x+Math.sin(a)*h,.18+h,z],s:[.045,.18,.052],r:[a,0,a]});
  }
  instanced(geos.cylinder,m.stems,stems,'麦田里细细的麦秆');
  instanced(geos.sphere,m.wheat,heads,'成熟的麦穗');
  function fence(points){
    const rails=[],posts=[];
    for(let i=0;i<points.length;i++){
      const [x,z]=points[i];posts.push({p:[x,.52,z],s:[.09,.94,.09]});
      if(i){const [px,pz]=points[i-1],dx=x-px,dz=z-pz,len=Math.hypot(dx,dz),angle=Math.atan2(-dz,dx);
        for(const y of [.4,.72])rails.push({p:[(x+px)/2,y,(z+pz)/2],s:[len,.065,.07],r:[0,angle,0]});}
    }
    instanced(geos.box,m.wood,posts,'围栏立柱');instanced(geos.box,m.wood,rails,'田间木围栏');
  }
  fence([[6.5,8.1],[8,7.95],[9.5,8],[11,8.2],[12.7,8.6]]);
  fence([[6.6,8.2],[6.6,9.7],[6.6,11.2],[6.6,12.6],[8.2,13.1],[9.8,13.4],[11.4,13.2],[12.8,12.9]]);
  const mill=new THREE.Group();mill.position.set(12.7,.15,3.3);mill.rotation.y=-.3;mill.name='四叶风车磨坊';group.add(mill);
  mesh(new THREE.CylinderGeometry(.7,1.1,4.5,14),m.plaster,[0,2.25,0],[1,1,1],mill);
  mesh(new THREE.ConeGeometry(1.06,1.6,14),m.roofBlue,[0,5.05,0],[1,1,1],mill);
  box([0,.7,1.03],[.55,1.3,.09],m.wood,mill);
  for(const y of [2.1,3.15])box([.22,y,.91],[.31,.48,.08],m.window,mill);
  const rotor=new THREE.Group();rotor.position.set(0,3.5,1.01);mill.add(rotor);
  for(let i=0;i<4;i++){
    const blade=new THREE.Group();blade.rotation.z=i*Math.PI/2;rotor.add(blade);
    box([0,1.24,0],[.075,2.6,.075],m.darkWood,blade);
    box([.19,1.61,-.02],[.49,1.7,.035],m.plaster,blade);
    for(let j=0;j<5;j++)box([.19,.9+j*.34,.015],[.55,.035,.055],m.wood,blade);
    box([.45,1.6,.015],[.045,1.75,.055],m.wood,blade);
  }
  mesh(geos.sphere,m.gold,[0,0,.07],[.16,.16,.16],rotor);
  const hay=new THREE.Group();hay.position.set(6.4,.2,12.9);group.add(hay);
  for(let i=0;i<3;i++)mesh(geos.sphere,m.wheat,[(i-1)*.47,.35,0],[.48,.42,.42],hay);

  // The creek remains one continuous ribbon from its source to the lip.
  const waterPoints=[[16.4,.18,-12.5],[18.1,.18,-8],[17.8,.18,-3],[16.3,.18,1],[16.9,.18,5.5],[15.2,.18,9.8],[15.1,.18,13.8]];
  const {curve:riverCurve}=ribbon(waterPoints,1.15,m.water,'青绿色的蜿蜒溪流');
  const bankRocks=[];
  for(let i=0;i<55;i++){
    const t=i/54,p=riverCurve.getPoint(t),tangent=riverCurve.getTangent(t),s=i%2?1:-1;
    const x=p.x-tangent.z*.69*s,z=p.z+tangent.x*.69*s;
    bankRocks.push({p:[x,.19,z],s:[.2+rand()*.2,.12+rand()*.12,.23+rand()*.23],r:[rand(),rand()*6,rand()]});
  }
  instanced(geos.rock,m.stoneLight,bankRocks,'溪流岸边的鹅卵石');
  const ripples=[];
  for(let i=0;i<13;i++){
    const p=riverCurve.getPoint((i+.5)/14);
    const ring=mesh(new THREE.RingGeometry(.12,.135,18),m.waterFoam,[p.x,.203,p.z],[1,1,1],group,'溪水的涟漪');
    ring.rotation.x=-Math.PI/2;ring.scale.set(.9,.45,1);ring.castShadow=false;ripples.push(ring);
  }
  // Board-and-rail arched footbridge crosses the full width of the stream.
  const bridge=new THREE.Group();bridge.position.set(16.55,.22,5.4);bridge.rotation.y=.13;group.add(bridge);bridge.name='跨溪的木拱桥';
  for(let i=0;i<13;i++){
    const x=-1.8+i*.3,y=.24+Math.sin(i/12*Math.PI)*.4;
    box([x,y,0],[.285,.13,1.1],m.wood,bridge);
    if(i%3===0)for(const s of [-1,1]){
      box([x,y+.43,s*.52],[.07,.8,.075],m.darkWood,bridge);
      if(i<12){const nextY=.24+Math.sin((i+3)/12*Math.PI)*.4;
        const rail=box([x+.45,(y+nextY)/2+.78,s*.52],[.93,.065,.065],m.wood,bridge);rail.rotation.z=Math.atan2(nextY-y,.9);}
    }
  }
  // Front-right waterfall: broad translucent sheets with fine white threads.
  const waterfall=new THREE.Group();waterfall.position.set(15.1,0,13.85);group.add(waterfall);waterfall.name='从岛沿落入云海的瀑布';
  const fallMat=m.water.clone();fallMat.opacity=.6;fallMat.side=THREE.DoubleSide;fallMat.depthWrite=false;
  const fallGeometry=new THREE.PlaneGeometry(1.18,24,5,48);
  const fallPos=fallGeometry.attributes.position;
  for(let i=0;i<fallPos.count;i++){
    const y=fallPos.getY(i);fallPos.setZ(i,.10*Math.sin(y*.8+fallPos.getX(i)*2));
    fallPos.setX(i,fallPos.getX(i)*(1+(12-y)*.011));
  }
  fallGeometry.computeVertexNormals();mesh(fallGeometry,fallMat,[0,-11.85,.26],[1,1,1],waterfall).castShadow=false;
  const streams=[];
  for(let i=0;i<9;i++){
    const strip=mesh(new THREE.PlaneGeometry(.035+rand()*.045,16+rand()*6),m.waterFoam,[(i-4)*.13,-11-rand()*1.6,.39+rand()*.05],[1,1,1],waterfall);
    strip.castShadow=false;streams.push(strip);
  }
  const foam=[];
  for(let i=0;i<24;i++)foam.push({p:[15.1+(rand()-.5)*1.9,-22.4-rand()*1.6,14.1+(rand()-.5)*1.1],s:[.07+rand()*.12,.1+rand()*.17,.07+rand()*.1]});
  const droplets=instanced(geos.sphere,m.waterFoam,foam,'坠落的瀑布水雾');droplets.castShadow=false;

  // Wooden bench overlooking the clouds, and two rows of a small kitchen garden.
  const bench=new THREE.Group();bench.position.set(-5.4,.16,14.5);bench.rotation.y=-.15;group.add(bench);bench.name='面向云海的长椅';
  for(const x of [-.65,.65])box([x,.33,0],[.12,.66,.62],m.darkWood,bench);
  for(let i=0;i<3;i++)box([0,.64,-.22+i*.23],[1.9,.08,.16],m.wood,bench);
  for(let i=0;i<2;i++)box([0,.96+i*.18,-.36],[1.9,.12,.07],m.wood,bench);
  for(const x of [-.65,.65])box([x,.9,-.37],[.08,.82,.08],m.darkWood,bench);
  const crops=[];
  for(let r=0;r<3;r++){
    box([-13.2,.14,10.2+r*.4],[2.2,.1,.27],m.cliff);
    for(let c=0;c<8;c++)crops.push({p:[-14.15+c*.27,.31,10.2+r*.4],s:[.13,.18,.13],r:[rand(),rand()*6,rand()]});
  }
  instanced(geos.sphere,m.green,crops,'小屋旁的卷心菜');

  return {
    group,
    landmarks:[
      {id:'village',title:'风铃村落',position:[-12.3,1.6,7]},
      {id:'fields',title:'金色麦田',position:[9.3,.9,10.8]},
      {id:'forest',title:'低语松林',position:[12.3,2,-9.6]},
      {id:'waterfall',title:'云端瀑布',position:[15.1,-3,13.9]},
      {id:'mill',title:'四叶风车',position:[12.7,3.7,3.3]},
    ],
    update(time){
      rotor.rotation.z=-time*.13;
      ripples.forEach((ring,i)=>{const phase=(time*.28+i*.19)%1;const s=.5+phase*.8;ring.scale.set(s,s*.45,1);ring.material.opacity=.48;});
      streams.forEach((s,i)=>{s.position.y=-11.1-Math.sin(time*.8+i)*.42-i*.04;});
      droplets.position.y=-((time*.65)%1);
    },
  };
}

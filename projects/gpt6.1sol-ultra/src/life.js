import * as THREE from 'three';

/** Tiny inhabitants, made from shared, soft-edged geometry. Coordinates are feet. */
export function buildLife(scene) {
  const group = new THREE.Group();
  group.name = '岛上的居民与小动物';
  scene.add(group);
  const geometry = {
    sphere: new THREE.SphereGeometry(1, 10, 8),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 10),
    cone: new THREE.ConeGeometry(1, 1, 10),
    box: new THREE.BoxGeometry(1, 1, 1),
    tunic: new THREE.CylinderGeometry(0.19, 0.26, 0.53, 10),
    skirt: new THREE.CylinderGeometry(0.17, 0.34, 0.66, 12),
  };
  const palette = {
    skin: '#e8bd98', skinRose: '#d7a58b', hair: '#735b4c', silver: '#d6d0bb',
    wheat: '#ddbb69', blue: '#547b95', sage: '#7e9b78', cream: '#f0e5c9',
    rose: '#be8680', plum: '#817891', leather: '#705c47', ink: '#434f54',
    brass: '#bf9a57', wood: '#957455', white: '#eee8d9', fox: '#c99264',
  };
  const materials = Object.fromEntries(Object.entries(palette).map(([key, color]) => [key,
    new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: key === 'brass' ? 0.3 : 0 })]));
  const mat = (name) => materials[name] || materials.cream;
  function mesh(parent, shape, color, pos, scale, rotation) {
    const object = new THREE.Mesh(geometry[shape], mat(color));
    object.position.set(...pos);
    if (scale) object.scale.set(...scale);
    if (rotation) object.rotation.set(...rotation);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function rod(parent, a, b, radius, color) {
    const p = new THREE.Vector3(...a), q = new THREE.Vector3(...b);
    const object = mesh(parent, 'cylinder', color, p.clone().add(q).multiplyScalar(0.5).toArray(), [radius, p.distanceTo(q), radius]);
    object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), q.sub(p).normalize());
    return object;
  }
  function book(parent, position, color = 'rose', angle = 0) {
    const b = new THREE.Group();
    b.position.set(...position);
    b.rotation.y = angle;
    mesh(b, 'box', color, [0, 0, 0], [0.29, 0.36, 0.09]);
    mesh(b, 'box', 'cream', [0.01, 0, 0.055], [0.24, 0.30, 0.025]);
    parent.add(b);
    return b;
  }

  const characters = [];
  const breathing = [];
  function human({id, name, role, description, position, color = 'blue', hair = 'hair', dress = false, rotation = 0, prop}) {
    const person = new THREE.Group();
    person.name = `${name} · ${role}`;
    person.userData.characterId = id;
    person.position.set(...position);
    person.rotation.y = rotation;
    group.add(person);
    const torso = new THREE.Group();
    torso.name = '衣袍与呼吸';
    person.add(torso);
    mesh(torso, dress ? 'skirt' : 'tunic', color, [0, dress ? 0.62 : 0.68, 0]);
    mesh(torso, 'cylinder', 'cream', [0, 0.98, 0], [0.115, 0.12, 0.115]);
    mesh(torso, 'sphere', 'skin', [0, 1.19, 0.015], [0.183, 0.218, 0.175]);
    mesh(torso, 'sphere', hair, [0, 1.31, -0.03], [0.19, 0.13, 0.177]);
    mesh(torso, 'sphere', 'skin', [0, 1.175, 0.185], [0.033, 0.043, 0.035]);
    [-1, 1].forEach((sign) => {
      mesh(torso, 'sphere', 'ink', [sign * 0.064, 1.22, 0.164], [0.013, 0.016, 0.009]);
      if (!dress) rod(person, [sign * 0.12, 0.45, 0], [sign * 0.12, 0.10, 0.025], 0.075, 'leather');
      mesh(person, 'sphere', 'leather', [sign * 0.115, 0.08, 0.07], [0.093, 0.08, 0.16]);
      rod(torso, [sign * 0.20, 0.89, 0], [sign * 0.29, 0.60, 0.08], 0.076, color);
      mesh(torso, 'sphere', 'skin', [sign * 0.29, 0.58, 0.08], [0.068, 0.074, 0.065]);
    });
    mesh(torso, 'cylinder', 'leather', [0, 0.57, 0], [0.252, 0.048, 0.252]);
    mesh(torso, 'box', 'brass', [0, 0.57, 0.247], [0.07, 0.055, 0.018]);
    if (prop) prop(person, torso);
    breathing.push({ torso, phase: characters.length * 1.7 });
    const meta = { id, name, role, description, position: [...position] };
    person.userData.character = meta;
    characters.push(meta);
    return person;
  }

  const traveler = human({
    id: 'traveler', name: '里昂', role: '收集故事的旅人', position: [0.1, 0.18, 9.2], color: 'blue', hair: 'wheat', rotation: -0.5,
    description: '蓝色短袍、金色围巾，是里昂所有的行李。他沿着石阶走来，把路上的故事换成面包；黄昏时，喜欢坐在岛边数慢慢飘过的云。',
    prop(p, t) {
      mesh(t, 'cylinder', 'wheat', [0, 0.99, 0], [0.16, 0.095, 0.16]);
      mesh(t, 'box', 'wheat', [-0.22, 0.88, -0.045], [0.40, 0.085, 0.035], [0.1, 0, -0.2]);
      mesh(t, 'sphere', 'leather', [-0.26, 0.58, -0.17], [0.12, 0.16, 0.09]);
      rod(t, [-0.18, 0.92, 0.04], [0.17, 0.61, 0.17], 0.022, 'leather');
    },
  });
  const scarf = traveler.children[0].children.find(o => o.geometry === geometry.box && o.material === mat('wheat'));

  human({
    id: 'astronomer', name: '阿德里安', role: '庭院里的观星人', position: [-1.15, 0.56, 3.4], color: 'plum', hair: 'silver', rotation: 0.65,
    description: '阿德里安白天记录风向，夜晚在塔顶校准星盘。他说城堡没有锚，星辰就是航标；庭院里的铜望远镜一直朝着最早亮起的那颗星。',
    prop(p, t) {
      mesh(t, 'cone', 'plum', [0, 1.50, -0.015], [0.21, 0.44, 0.21], [0, 0, 0.06]);
      mesh(t, 'sphere', 'silver', [0, 1.10, 0.15], [0.11, 0.17, 0.07]);
      mesh(t, 'sphere', 'brass', [-0.08, 1.56, 0.175], [0.026, 0.026, 0.014]);
      const telescope = new THREE.Group();
      telescope.position.set(-0.72, 0, 0.25);
      rod(telescope, [0, 0.87, 0], [-0.29, 0, 0.22], 0.025, 'wood');
      rod(telescope, [0, 0.87, 0], [0.30, 0, 0.23], 0.025, 'wood');
      rod(telescope, [0, 0.87, 0], [0, 0, -0.29], 0.025, 'wood');
      rod(telescope, [0, 0.89, -0.22], [0, 1.13, 0.42], 0.085, 'brass');
      p.add(telescope);
    },
  });
  human({
    id: 'gardener', name: '艾拉', role: '照看玫瑰的园丁', position: [-9.1, 0.06, 1.3], color: 'sage', dress: true, hair: 'hair', rotation: -0.3,
    description: '艾拉照看着城墙边的藤蔓和岛上的小花。她用溪水浇灌玫瑰，把落叶堆成肥料，还给每一株被风吹歪的小树系上柔软的布带。',
    prop(p, t) {
      mesh(t, 'cylinder', 'wheat', [0, 1.39, 0], [0.32, 0.055, 0.32]);
      mesh(t, 'cone', 'wheat', [0, 1.47, 0], [0.20, 0.18, 0.20]);
      mesh(t, 'cylinder', 'blue', [0.39, 0.48, 0.10], [0.11, 0.22, 0.11]);
      rod(t, [0.42, 0.51, 0.09], [0.58, 0.60, 0.19], 0.035, 'blue');
      rod(t, [0.33, 0.60, 0.10], [0.43, 0.67, 0.10], 0.02, 'blue');
    },
  });
  human({
    id: 'baker', name: '玛尔塔', role: '晨光面包师', position: [-11.75, 0.07, 7.2], color: 'rose', dress: true, hair: 'hair', rotation: 0.6,
    description: '玛尔塔在村舍的石炉里烤黑麦面包。麦田、风车和厨房沿着同一条小路相连；每天第一炉出炉时，她会给守门人和早起的牧羊人留一份。',
    prop(p, t) {
      mesh(t, 'box', 'cream', [0, 0.68, 0.245], [0.31, 0.43, 0.025]);
      mesh(t, 'sphere', 'cream', [0, 1.43, 0], [0.24, 0.14, 0.21]);
      mesh(t, 'box', 'wood', [0.30, 0.67, 0.30], [0.45, 0.03, 0.33]);
      [-0.08, 0.08].forEach(x => mesh(t, 'sphere', 'wheat', [0.30 + x, 0.73, 0.30], [0.075, 0.06, 0.13]));
    },
  });
  human({
    id: 'shepherd', name: '诺埃', role: '草坡上的牧羊人', position: [2.1, 0.08, 12.0], color: 'sage', hair: 'wheat', rotation: -0.45,
    description: '诺埃记得每一只羊的铃声。他带着羊群在草坡慢慢走，木杖上刻着一年里的风向；靠近岛缘时，他总会先替最小的那只羊挡住风。',
    prop(p, t) {
      mesh(t, 'cylinder', 'leather', [0, 1.38, 0], [0.25, 0.06, 0.25]);
      mesh(t, 'sphere', 'leather', [0, 1.42, 0], [0.18, 0.11, 0.17]);
      rod(p, [0.42, 0.02, 0.09], [0.42, 1.45, 0.09], 0.025, 'wood');
      rod(p, [0.42, 1.45, 0.09], [0.51, 1.50, 0.09], 0.025, 'wood');
    },
  });
  human({
    id: 'librarian', name: '塞西尔', role: '藏书室的守书人', position: [1.9, 3.84, -1.1], color: 'rose', dress: true, hair: 'silver', rotation: 0.35,
    description: '塞西尔把航海图、草药图谱和旅人的书信分类收好。藏书室厚重的石墙能挡住潮气，窗边的小桌则留给每一个想写信的人。',
    prop(p, t) {
      mesh(t, 'sphere', 'silver', [0.15, 1.31, -0.12], [0.11, 0.10, 0.11]);
      book(t, [0.26, 0.78, 0.19], 'blue', -0.30);
      [-0.064, 0.064].forEach(x => mesh(t, 'cylinder', 'brass', [x, 1.22, 0.179], [0.039, 0.012, 0.039], [Math.PI / 2, 0, 0]));
    },
  });
  human({
    id: 'guard', name: '奥斯卡', role: '钟楼下的守门人', position: [3.0, 0.08, 6.5], color: 'blue', hair: 'hair', rotation: -0.2,
    description: '奥斯卡负责吊桥、城门和傍晚的钟声。他的长矛更多用来挑起飘落的旗绳；熟悉每一位居民的脚步，也给远来的客人指一条去面包房的路。',
    prop(p, t) {
      mesh(t, 'sphere', 'silver', [0, 1.36, -0.015], [0.20, 0.13, 0.19]);
      mesh(t, 'box', 'silver', [0, 0.80, 0.20], [0.27, 0.29, 0.065]);
      rod(p, [0.43, 0.03, 0.1], [0.43, 1.70, 0.1], 0.023, 'wood');
      mesh(p, 'cone', 'silver', [0.43, 1.80, 0.1], [0.065, 0.22, 0.04]);
      mesh(t, 'sphere', 'blue', [-0.28, 0.68, 0.11], [0.12, 0.23, 0.045]);
      mesh(t, 'box', 'brass', [-0.28, 0.68, 0.16], [0.03, 0.23, 0.01]);
    },
  });
  human({
    id: 'painter', name: '露西', role: '溪边的小画家', position: [10.4, 0.10, 8.7], color: 'plum', hair: 'hair', rotation: -0.75,
    description: '露西喜欢把城堡画得比实际更高一点，把瀑布画得比实际更轻一点。她在木桥旁调颜色，画纸上最常出现的，是夕阳里的蓝屋顶。',
    prop(p, t) {
      mesh(t, 'sphere', 'plum', [0.03, 1.39, 0], [0.23, 0.075, 0.20], [0, 0, -0.2]);
      mesh(t, 'sphere', 'wood', [-0.30, 0.64, 0.15], [0.14, 0.025, 0.11], [0.2, 0, 0.2]);
      mesh(t, 'sphere', 'rose', [-0.33, 0.67, 0.16], [0.033, 0.012, 0.025]);
      mesh(t, 'sphere', 'blue', [-0.24, 0.66, 0.17], [0.027, 0.012, 0.025]);
      rod(t, [0.28, 0.57, 0.08], [0.35, 0.93, 0.14], 0.012, 'wood');
    },
  });

  const sheep = [];
  function addSheep(x, z, angle, scale) {
    const animal = new THREE.Group();
    animal.name = '戴着铜铃的小绵羊';
    animal.position.set(x, 0.07, z);
    animal.scale.setScalar(scale);
    animal.rotation.y = angle;
    group.add(animal);
    mesh(animal, 'sphere', 'white', [0, 0.48, 0], [0.36, 0.28, 0.47]);
    mesh(animal, 'sphere', 'white', [0.17, 0.56, 0.06], [0.23, 0.20, 0.25]);
    mesh(animal, 'sphere', 'white', [-0.17, 0.56, 0.06], [0.23, 0.20, 0.25]);
    mesh(animal, 'sphere', 'leather', [0, 0.57, 0.42], [0.15, 0.17, 0.20]);
    [-1, 1].forEach(s => {
      mesh(animal, 'sphere', 'leather', [s * 0.18, 0.60, 0.40], [0.12, 0.04, 0.06], [0, 0, s * 0.3]);
      for (const z of [-0.23, 0.25]) rod(animal, [s * 0.20, 0.37, z], [s * 0.20, 0.04, z], 0.047, 'leather');
    });
    mesh(animal, 'sphere', 'brass', [0, 0.39, 0.40], [0.05, 0.055, 0.05]);
    mesh(animal, 'sphere', 'white', [0, 0.51, -0.45], [0.10, 0.10, 0.13]);
    sheep.push({ animal, phase: sheep.length * 2.1 });
  }
  addSheep(3.65, 11.1, -0.8, 1.0);
  addSheep(0.8, 13.2, 0.5, 0.85);
  addSheep(4.0, 13.0, 2.0, 0.66);

  const fox = new THREE.Group();
  fox.name = '松林边的小狐狸';
  // Match the ellipsoidal forest knoll in landscape.js, rather than the meadow.
  const foxGroundY = -0.7 + 2.4 * Math.sqrt(1 - ((10.5 - 12.2) / 6.8) ** 2 - ((-7 + 9.4) / 5.3) ** 2);
  fox.position.set(10.5, foxGroundY + 0.035, -7.0);
  fox.rotation.y = -0.7;
  group.add(fox);
  mesh(fox, 'sphere', 'fox', [0, 0.39, 0], [0.20, 0.26, 0.43]);
  mesh(fox, 'sphere', 'fox', [0, 0.68, 0.27], [0.21, 0.22, 0.23]);
  mesh(fox, 'cone', 'cream', [0, 0.60, 0.47], [0.14, 0.26, 0.13], [Math.PI / 2, 0, 0]);
  [-1, 1].forEach(s => {
    mesh(fox, 'cone', 'fox', [s * 0.14, 0.91, 0.25], [0.10, 0.29, 0.09], [0, 0, s * -0.15]);
    mesh(fox, 'sphere', 'ink', [s * 0.09, 0.71, 0.46], [0.018, 0.02, 0.012]);
    rod(fox, [s * 0.13, 0.35, 0.18], [s * 0.13, 0.04, 0.23], 0.045, 'leather');
  });
  mesh(fox, 'sphere', 'ink', [0, 0.60, 0.61], [0.035, 0.031, 0.025]);
  const tail = mesh(fox, 'sphere', 'fox', [0.25, 0.24, -0.47], [0.16, 0.15, 0.42], [0, -0.7, 0]);
  mesh(fox, 'sphere', 'cream', [0.49, 0.24, -0.73], [0.11, 0.12, 0.19], [0, -0.7, 0]);

  const birds = [];
  const wingGeo = new THREE.BufferGeometry();
  wingGeo.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0, 0.64,0.05,-0.16, 0.4,0,-0.34], 3));
  wingGeo.computeVertexNormals();
  const birdMat = new THREE.MeshStandardMaterial({color: '#ded9c8', roughness: 0.95, side: THREE.DoubleSide});
  for (let i = 0; i < 7; i++) {
    const bird = new THREE.Group();
    bird.name = '掠过塔楼的飞鸟';
    mesh(bird, 'sphere', 'cream', [0, 0, 0], [0.08, 0.075, 0.24]);
    const left = new THREE.Mesh(wingGeo, birdMat), right = new THREE.Mesh(wingGeo, birdMat);
    right.scale.x = -1;
    bird.add(left, right);
    const size = 0.75 + (i % 3) * 0.12;
    bird.scale.setScalar(size);
    group.add(bird);
    birds.push({bird, left, right, phase: i * 0.87, radius: 17 + i * 0.65, height: 13 + i * 0.8});
  }

  const butterflies = [];
  const butterflyGeo = new THREE.CircleGeometry(0.09, 8);
  const butterflyMats = ['#d9af74', '#cca3a9', '#c5d1a0'].map(color => new THREE.MeshStandardMaterial({color, side: THREE.DoubleSide, roughness: 1}));
  for (let i = 0; i < 9; i++) {
    const butterfly = new THREE.Group();
    const wingA = new THREE.Mesh(butterflyGeo, butterflyMats[i % 3]);
    const wingB = new THREE.Mesh(butterflyGeo, butterflyMats[i % 3]);
    wingA.position.x = -0.065;
    wingB.position.x = 0.065;
    butterfly.add(wingA, wingB);
    group.add(butterfly);
    butterflies.push({butterfly, wingA, wingB, phase: i * 1.3, x: -8 + (i % 3) * 7, z: 8 + Math.floor(i / 3) * 2.2});
  }

  function update(time) {
    for (const {torso, phase} of breathing) torso.position.y = Math.sin(time * 1.35 + phase) * 0.012;
    if (scarf) scarf.rotation.z = -0.2 + Math.sin(time * 2) * 0.08;
    for (const {animal, phase} of sheep) animal.rotation.z = Math.sin(time * 0.8 + phase) * 0.025;
    tail.rotation.z = Math.sin(time * 1.1) * 0.10;
    for (const {bird, left, right, phase, radius, height} of birds) {
      const angle = time * 0.065 + phase;
      bird.position.set(Math.cos(angle) * radius, height + Math.sin(time * 0.6 + phase) * 0.35, Math.sin(angle) * radius * 0.67);
      bird.rotation.y = -angle;
      left.rotation.z = Math.sin(time * 3.2 + phase) * 0.24;
      right.rotation.z = -left.rotation.z;
    }
    for (const {butterfly, wingA, wingB, phase, x, z} of butterflies) {
      butterfly.position.set(x + Math.sin(time * 0.35 + phase) * 0.8, 1.1 + Math.sin(time * 0.65 + phase) * 0.35, z + Math.cos(time * 0.45 + phase) * 0.6);
      butterfly.rotation.y = time * 0.3 + phase;
      wingA.rotation.y = Math.sin(time * 9 + phase) * 0.85;
      wingB.rotation.y = -wingA.rotation.y;
    }
  }
  return { group, update, characters };
}

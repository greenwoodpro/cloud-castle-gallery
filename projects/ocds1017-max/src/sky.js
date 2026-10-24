import * as THREE from 'three';
import {
  P, rnd, onFrame, cloudTexture, glowTexture, sphere, cyl, cone, box, toon, ico,
} from './utils.js';

export const SUN_DIR = new THREE.Vector3(0.52, 0.46, 0.72).normalize();

function makeSky() {
  const geo = new THREE.SphereGeometry(420, 48, 32);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: new THREE.Color(0x7fb1d6) },
      uHorizon: { value: new THREE.Color(0xffd8b2) },
      uWarm: { value: new THREE.Color(0xf0af9f) },
      uSunColor: { value: new THREE.Color(0xfff0c8) },
      uSunDir: { value: SUN_DIR.clone() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uWarm;
      uniform vec3 uSunColor;
      uniform vec3 uSunDir;
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      void main() {
        vec3 dir = normalize(vDir);
        float h = dir.y;
        vec3 col = mix(uHorizon, uTop, smoothstep(-0.02, 0.34, h));
        float band = exp(-max(h, 0.0) * 7.5);
        col = mix(col, uWarm, band * 0.5);
        float mu = max(dot(dir, uSunDir), 0.0);
        col = mix(col, uSunColor, pow(mu, 5.0) * 0.3);
        col += uSunColor * pow(mu, 280.0) * 0.9;
        float n = noise(dir.xz * 2.4 + dir.y * 3.2);
        float n2 = noise(dir.xz * 6.0 - dir.y * 2.0);
        col += (n - 0.5) * 0.03 + (n2 - 0.5) * 0.012;
        if (h < 0.0) {
          col = mix(col, vec3(0.93, 0.84, 0.83), smoothstep(0.0, -0.4, h) * 0.55);
        }
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const sky = new THREE.Mesh(geo, mat);
  sky.frustumCulled = false;
  return sky;
}

function makeSun() {
  const group = new THREE.Group();
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture(),
      color: 0xffecc0,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      toneMapped: false,
    })
  );
  halo.scale.setScalar(150);
  group.add(halo);
  const disc = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture(),
      color: 0xfff6dd,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      toneMapped: false,
    })
  );
  disc.scale.setScalar(52);
  group.add(disc);
  return group;
}

function makeCloudSprite(tex, scale, opacity, color = 0xfff5ec) {
  const mat = new THREE.SpriteMaterial({
    map: tex,
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    fog: true,
    toneMapped: true,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(scale, scale * 0.55, 1);
  return s;
}

function makeDistantIsland(x, y, z, scale, hasTower) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.scale.setScalar(scale);
  ico(g, 3.2, 0xd5baa2, 0, -1.0, 0, { scale: [1, 0.7, 1], rot: [0.2, 0.6, 0.1] });
  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(1, 14, 7, 0, Math.PI * 2, 0, Math.PI / 2),
    toon(0xa9c996)
  );
  cap.scale.set(3.2, 0.55, 3.0);
  cap.position.y = 0.5;
  g.add(cap);
  if (hasTower) {
    cyl(g, 0.24, 0.34, 2.4, 0xe8d4bb, 0.3, 1.8, 0, { segments: 8 });
    cone(g, 0.42, 0.8, P.roof, 0.3, 3.35, 0, { segments: 8 });
    cyl(g, 0.22, 0.3, 1.5, 0xe8d4bb, -0.9, 1.35, 0.2, { segments: 8 });
    cone(g, 0.36, 0.6, P.roofRose, -0.9, 2.35, 0.2, { segments: 8 });
    box(g, 1.6, 0.6, 0.5, 0xe4d0b6, -0.3, 1.0, 0.7);
    cone(g, 0.1, 0.5, P.leafDeep, 1.5, 1.1, -0.4, { segments: 5 });
    sphere(g, 0.42, P.leaf, 1.5, 1.25, -0.4, { scale: [1, 0.85, 1] });
  }
  return g;
}

export function buildSky(scene) {
  const sky = makeSky();
  scene.add(sky);
  const sun = makeSun();
  sun.position.copy(SUN_DIR).multiplyScalar(280);
  scene.add(sun);

  const cloudTex = cloudTexture();
  const clouds = new THREE.Group();
  scene.add(clouds);
  for (let i = 0; i < 26; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(95, 220);
    const s = makeCloudSprite(cloudTex, rnd(38, 95), rnd(0.18, 0.45));
    s.position.set(Math.cos(a) * r, rnd(-4, 58), Math.sin(a) * r);
    clouds.add(s);
  }
  for (let i = 0; i < 16; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(48, 105);
    const s = makeCloudSprite(cloudTex, rnd(24, 58), rnd(0.26, 0.5), 0xfff8ef);
    s.position.set(Math.cos(a) * r, rnd(8, 42), Math.sin(a) * r);
    s.material.rotation = rnd(-0.18, 0.18);
    clouds.add(s);
  }
  const lowClouds = [];
  for (let i = 0; i < 36; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(14, 85);
    const s = makeCloudSprite(cloudTex, rnd(22, 46), rnd(0.24, 0.52), 0xfff6ec);
    s.position.set(Math.cos(a) * r, rnd(-21, -10), Math.sin(a) * r);
    s.material.rotation = rnd(-0.3, 0.3);
    clouds.add(s);
    lowClouds.push({ sprite: s, speed: rnd(0.15, 0.4), phase: rnd(0, 6.28) });
  }
  for (let i = 0; i < 5; i++) {
    const a = rnd(0, Math.PI * 2);
    const r = rnd(24, 30);
    const s = makeCloudSprite(cloudTex, rnd(10, 17), rnd(0.18, 0.3), 0xfff7ee);
    s.position.set(Math.cos(a) * r, rnd(-8, -3), Math.sin(a) * r);
    clouds.add(s);
  }

  const far = new THREE.Group();
  scene.add(far);
  far.add(makeDistantIsland(-62, 10, -86, 1.35, true));
  far.add(makeDistantIsland(78, 21, -104, 1.6, true));
  far.add(makeDistantIsland(-105, 12, -130, 2.6, true));
  far.add(makeDistantIsland(135, -26, -160, 3.8, false));
  far.add(makeDistantIsland(62, 34, -185, 2.0, true));
  far.add(makeDistantIsland(-160, -34, 40, 2.4, false));

  const birds = new THREE.Group();
  scene.add(birds);

  onFrame((t) => {
    clouds.rotation.y = t * 0.003;
    for (const c of lowClouds) {
      c.sprite.position.y += Math.sin(t * c.speed + c.phase) * 0.002;
    }
  });

  return { sky, sun, clouds };
}

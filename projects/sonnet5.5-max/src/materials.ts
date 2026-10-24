import * as THREE from 'three'

/** 柔和的三阶水彩渐变：阴影不压黑，边缘微微晕开 */
export function makeGradientMap(): THREE.DataTexture {
  const N = 64
  const data = new Uint8Array(N)
  const ss = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)
  }
  for (let i = 0; i < N; i++) {
    const t = (i + 0.5) / N
    const v = 0.6 + 0.4 * (0.34 * ss(0.28, 0.46, t) + 0.4 * ss(0.52, 0.7, t) + 0.26 * ss(0.78, 0.93, t))
    data[i] = Math.round(v * 255)
  }
  const tex = new THREE.DataTexture(data, N, 1, THREE.RedFormat)
  tex.minFilter = tex.magFilter = THREE.LinearFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true
  return tex
}

const NOISE_GLSL = /* glsl */ `
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm3(vec2 p){ return vnoise(p) * 0.5 + vnoise(p * 2.03) * 0.25 + vnoise(p * 4.1) * 0.125; }
`

export function makeWaterMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uShallow: { value: new THREE.Color('#a9e3d6') },
      uDeep: { value: new THREE.Color('#62b9c6') },
      uLight: { value: new THREE.Color(1, 1, 1) },
      uAlpha: { value: 0.88 },
    },
    vertexShader: /* glsl */ `
      attribute float edge;
      varying vec3 vWorld; varying float vEdge;
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz; vEdge = edge;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform vec3 uShallow; uniform vec3 uDeep; uniform vec3 uLight; uniform float uAlpha;
      varying vec3 vWorld; varying float vEdge;
      ${NOISE_GLSL}
      void main(){
        vec2 p = vWorld.xz;
        float w1 = vnoise(p * 0.8 + vec2(uTime * 0.13, uTime * 0.07));
        float w2 = vnoise(p * 2.2 - vec2(uTime * 0.11, -uTime * 0.09));
        float rip = smoothstep(0.58, 0.66, w1 * 0.55 + w2 * 0.45);
        vec3 col = mix(uDeep, uShallow, 0.3 + 0.55 * w1);
        col = mix(col, vec3(1.0, 0.98, 0.92), rip * 0.4);
        float a = uAlpha * smoothstep(0.0, 0.5, vEdge);
        gl_FragColor = vec4(col * uLight, a);
      }`,
  })
}

export function makeWaterfallMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uLight: { value: new THREE.Color(1, 1, 1) },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform vec3 uLight; varying vec2 vUv;
      ${NOISE_GLSL}
      void main(){
        float v = vUv.y;
        float s1 = vnoise(vec2(vUv.x * 9.0, v * 5.0 + uTime * 2.6));
        float s2 = vnoise(vec2(vUv.x * 17.0 + 3.0, v * 9.0 + uTime * 3.4));
        float s = smoothstep(0.38, 0.82, s1 * 0.6 + s2 * 0.4);
        vec3 col = mix(vec3(0.62, 0.86, 0.9), vec3(1.0), s);
        float side = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
        float fade = smoothstep(0.0, 0.55, v);
        float a = (0.5 + 0.42 * s) * side * fade;
        gl_FragColor = vec4(col * uLight, a);
      }`,
  })
}

export function makeSkyMaterial() {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color() },
      uMid: { value: new THREE.Color() },
      uBot: { value: new THREE.Color() },
      uSunCol: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3(0.5, 0.6, 0.4) },
      uSunSize: { value: 0.9992 },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main(){
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uBot; uniform vec3 uSunCol; uniform vec3 uSunDir;
      uniform float uSunSize; uniform float uTime;
      varying vec3 vDir;
      ${NOISE_GLSL}
      void main(){
        vec3 d = normalize(vDir);
        float y = d.y;
        vec3 col = y > 0.0
          ? mix(uMid, uTop, pow(clamp(y, 0.0, 1.0), 0.6))
          : mix(uMid, uBot, pow(clamp(-y, 0.0, 1.0), 0.55));
        vec2 q = d.xz / (abs(d.y) + 0.55);
        float wash = fbm3(q * 2.4 + vec2(uTime * 0.004, 0.0));
        col *= 0.95 + 0.1 * wash;
        float sd = dot(d, normalize(uSunDir));
        float disc = smoothstep(uSunSize, uSunSize + 0.0012, sd);
        float halo = pow(max(sd, 0.0), 26.0) * 0.5 + pow(max(sd, 0.0), 5.0) * 0.16;
        col += uSunCol * (disc * 1.2 + halo);
        gl_FragColor = vec4(col, 1.0);
      }`,
  })
}

export function makeStarMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uOpacity: { value: 0 },
      uTime: { value: 0 },
      uPx: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute float aSize; attribute float aPhase;
      uniform float uTime; uniform float uPx;
      varying float vTw;
      void main(){
        vTw = 0.75 + 0.25 * sin(uTime * 1.6 + aPhase * 6.2831);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
        gl_PointSize = aSize * uPx * vTw;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uOpacity; varying float vTw;
      void main(){
        vec2 p = gl_PointCoord - 0.5;
        float d = length(p);
        float glow = exp(-d * 9.0);
        float cross = max(0.0, 1.0 - abs(p.x) * 16.0) * max(0.0, 1.0 - abs(p.y) * 2.2)
                    + max(0.0, 1.0 - abs(p.y) * 16.0) * max(0.0, 1.0 - abs(p.x) * 2.2);
        float a = (glow * 0.85 + cross * 0.85) * uOpacity * vTw;
        gl_FragColor = vec4(1.0, 0.93, 0.72, a);
      }`,
  })
}

export interface Materials {
  gradientMap: THREE.DataTexture
  toon: THREE.MeshToonMaterial
  roof: THREE.MeshToonMaterial
  front: THREE.MeshToonMaterial
  island: THREE.MeshToonMaterial
  glow: THREE.MeshBasicMaterial
  windowGlow: THREE.MeshBasicMaterial
  cloud: THREE.MeshToonMaterial
  water: THREE.ShaderMaterial
  fall: THREE.ShaderMaterial
  sky: THREE.ShaderMaterial
  stars: THREE.ShaderMaterial
  cloth: (color: THREE.ColorRepresentation) => THREE.MeshToonMaterial
  dispose: () => void
}

export function createMaterials(groundTex: THREE.Texture): Materials {
  const gradientMap = makeGradientMap()
  const toon = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap })
  const roof = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap })
  const front = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap })
  const island = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap, map: groundTex })
  const glow = new THREE.MeshBasicMaterial({ vertexColors: true })
  const windowGlow = new THREE.MeshBasicMaterial({ vertexColors: true })
  const cloud = new THREE.MeshToonMaterial({ color: '#ffffff', gradientMap })
  const water = makeWaterMaterial()
  const fall = makeWaterfallMaterial()
  const sky = makeSkyMaterial()
  const stars = makeStarMaterial()
  const cloths: THREE.Material[] = []
  const cloth = (color: THREE.ColorRepresentation) => {
    const m = new THREE.MeshToonMaterial({ color, gradientMap, side: THREE.DoubleSide })
    cloths.push(m)
    return m
  }
  return {
    gradientMap,
    toon,
    roof,
    front,
    island,
    glow,
    windowGlow,
    cloud,
    water,
    fall,
    sky,
    stars,
    cloth,
    dispose() {
      gradientMap.dispose()
      for (const m of [toon, roof, front, island, glow, windowGlow, cloud, water, fall, sky, stars, ...cloths]) m.dispose()
    },
  }
}

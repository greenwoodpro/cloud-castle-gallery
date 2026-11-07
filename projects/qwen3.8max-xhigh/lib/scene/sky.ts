import * as THREE from 'three'
import { C } from './palette'
import { Batcher, clamp, mulberry32, smoothstep, softDotTexture, toonMaterial } from './utils'

const SKY_RADIUS = 420

const vertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uHorizon;
  uniform float uTime;
  uniform float uNight;
  varying vec3 vDir;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float wash(vec2 p) {
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
    float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(uBottom, uHorizon, smoothstep(0.42, 0.52, h));
    col = mix(col, uTop, smoothstep(0.5, 0.92, h));

    // 水彩晕染：两层低频斑块，让天空像纸上洇开的颜料
    vec2 uv = vDir.xz / max(abs(vDir.y) + 0.35, 0.12);
    float n1 = wash(uv * 0.55 + vec2(uTime * 0.006, uTime * 0.004));
    float n2 = wash(uv * 1.7 - vec2(uTime * 0.01, 0.0));
    col += (n1 - 0.5) * 0.055 + (n2 - 0.5) * 0.028;

    // 地平线附近的一抹暖光
    float glow = pow(1.0 - abs(vDir.y), 8.0);
    col += uHorizon * glow * 0.16;

    gl_FragColor = vec4(col, 1.0);
  }
`

export type SkyHandle = {
  group: THREE.Group
  sun: THREE.DirectionalLight
  moon: THREE.DirectionalLight
  hemi: THREE.HemisphereLight
  ambient: THREE.AmbientLight
  setTimeOfDay: (t: number) => void
  update: (time: number, delta: number) => void
  nightAmount: () => number
  fogColor: THREE.Color
}

export function createSky(): SkyHandle {
  const random = mulberry32(1717)
  const group = new THREE.Group()
  group.name = 'sky'

  /* 天穹 */
  const uniforms = {
    uTop: { value: new THREE.Color(C.skyDayTop) },
    uBottom: { value: new THREE.Color(C.skyDayBottom) },
    uHorizon: { value: new THREE.Color(C.fogDay) },
    uTime: { value: 0 },
    uNight: { value: 0 },
  }
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(SKY_RADIUS, 40, 24),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    }),
  )
  dome.renderOrder = -10
  dome.frustumCulled = false
  group.add(dome)

  /* 太阳与月亮 */
  const sunTex = softDotTexture('rgba(255,244,214,1)', 'rgba(255,214,150,0)')
  const sunSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: sunTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(0xfff2cf),
      fog: false,
    }),
  )
  sunSprite.scale.set(70, 70, 1)
  group.add(sunSprite)

  const sunCore = new THREE.Mesh(
    new THREE.CircleGeometry(13, 28),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff6de), fog: false, transparent: true, depthWrite: false }),
  )
  group.add(sunCore)

  const moonGroup = new THREE.Group()
  const moonBatch = new Batcher()
  moonBatch.add(new THREE.SphereGeometry(9, 20, 16), 0xf2ecdc)
  for (let i = 0; i < 7; i++) {
    const a = random() * Math.PI * 2
    const b = (random() - 0.5) * Math.PI
    const r = 9
    moonBatch.add(new THREE.SphereGeometry(0.7 + random() * 1.5, 8, 6), 0xd8d0be, {
      position: [Math.cos(a) * Math.cos(b) * r * 0.96, Math.sin(b) * r * 0.96, Math.sin(a) * Math.cos(b) * r * 0.96],
    })
  }
  const moonMesh = moonBatch.build(new THREE.MeshBasicMaterial({ vertexColors: true, fog: false }))
  if (moonMesh) moonGroup.add(moonMesh)
  const moonHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: sunTex,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(0xcfd8f0),
      fog: false,
    }),
  )
  moonHalo.scale.set(56, 56, 1)
  moonGroup.add(moonHalo)
  group.add(moonGroup)

  /* 星星 */
  const starCount = 900
  const starPos = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    const a = random() * Math.PI * 2
    const y = random() * 0.92 + 0.02
    const r = Math.sqrt(1 - y * y)
    const rad = SKY_RADIUS * 0.92
    starPos[i * 3] = Math.cos(a) * r * rad
    starPos[i * 3 + 1] = y * rad
    starPos[i * 3 + 2] = Math.sin(a) * r * rad
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  const starMat = new THREE.PointsMaterial({
    size: 3.4,
    map: softDotTexture('rgba(255,244,220,1)', 'rgba(255,244,220,0)'),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    sizeAttenuation: true,
    color: new THREE.Color(C.starWhite),
    fog: false,
  })
  const stars = new THREE.Points(starGeo, starMat)
  stars.frustumCulled = false
  group.add(stars)

  /* 云：不受光照渐变影响，否则背光面会被切成暗档、看起来像灰石头 */
  const cloudDay = new THREE.Color(0xffffff)
  const cloudNight = new THREE.Color(0x66719c)
  const cloudMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.94,
    depthWrite: false,
  })
  const clouds: Array<{ mesh: THREE.Mesh; r: number; a: number; y: number; speed: number }> = []
  for (let i = 0; i < 16; i++) {
    const b = new Batcher()
    const blobs = 5 + Math.floor(random() * 4)
    const scale = 2.4 + random() * 3.4
    for (let k = 0; k < blobs; k++) {
      const t = (k / blobs - 0.5) * 2
      b.add(new THREE.IcosahedronGeometry((1.5 - Math.abs(t) * 0.7) * scale, 1), k % 2 ? 0xffffff : C.clothCream, {
        position: [t * scale * 1.5, (random() - 0.5) * scale * 0.4, (random() - 0.5) * scale * 0.8],
        scale: [1, 0.62, 1],
      })
    }
    const mesh = b.build(cloudMat, { mottle: 0.05 })
    if (!mesh) continue
    mesh.castShadow = false
    mesh.receiveShadow = false
    const r = 62 + random() * 130
    const a = random() * Math.PI * 2
    const y = -18 + random() * 62
    mesh.position.set(Math.cos(a) * r, y, Math.sin(a) * r)
    group.add(mesh)
    clouds.push({ mesh, r, a, y, speed: 0.006 + random() * 0.014 })
  }

  /* 岛下的云海 */
  const seaMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  })
  const seaClouds: Array<{ mesh: THREE.Mesh; r: number; a: number; speed: number }> = []
  for (let i = 0; i < 12; i++) {
    const b = new Batcher()
    const scale = 7 + random() * 9
    for (let k = 0; k < 6; k++) {
      b.add(new THREE.IcosahedronGeometry(scale * (0.6 + random() * 0.5), 1), k % 2 ? 0xf6f1e6 : C.clothCream, {
        position: [(random() - 0.5) * scale * 3, (random() - 0.5) * scale * 0.4, (random() - 0.5) * scale * 2],
        scale: [1, 0.34, 1],
      })
    }
    const mesh = b.build(seaMat, { mottle: 0.06 })
    if (!mesh) continue
    mesh.castShadow = false
    const r = 40 + random() * 150
    const a = random() * Math.PI * 2
    mesh.position.set(Math.cos(a) * r, -52 - random() * 22, Math.sin(a) * r)
    group.add(mesh)
    seaClouds.push({ mesh, r, a, speed: 0.004 + random() * 0.008 })
  }

  /* 远处的小行星，包括 B-612 */
  const planetGroup = new THREE.Group()
  const planets: Array<{ mesh: THREE.Mesh; spin: number }> = []
  const planetSpecs: Array<[number, number, number, number, number]> = [
    // x, y, z, 半径, 颜色
    [-190, 78, -150, 11, C.leafRose],
    [165, 108, -190, 8, C.clothBlue],
    [-140, 40, 210, 6.5, C.gold],
    [210, 30, 120, 9.5, C.leaf],
  ]
  for (const [px, py, pz, pr, pc] of planetSpecs) {
    const b = new Batcher()
    b.add(new THREE.IcosahedronGeometry(pr, 1), pc)
    for (let k = 0; k < 4; k++) {
      b.add(new THREE.IcosahedronGeometry(pr * 0.28, 0), C.stoneShade, {
        position: [(random() - 0.5) * pr * 1.4, (random() - 0.5) * pr * 1.4, (random() - 0.5) * pr * 1.4],
      })
    }
    const mesh = b.build(toonMaterial({ flatShading: true }), { mottle: 0.1 })
    if (!mesh) continue
    mesh.position.set(px, py, pz)
    planetGroup.add(mesh)
    planets.push({ mesh, spin: (random() - 0.5) * 0.12 })
  }
  // 一颗带环的气态行星
  {
    const ringed = new Batcher()
    ringed.add(new THREE.IcosahedronGeometry(10, 1), C.roofLight)
    const ringMesh = ringed.build(toonMaterial({ flatShading: true }), { mottle: 0.1 })
    if (ringMesh) {
      ringMesh.position.set(-230, 130, 60)
      planetGroup.add(ringMesh)
      planets.push({ mesh: ringMesh, spin: 0.05 })
      const ring = new THREE.Mesh(new THREE.TorusGeometry(16, 1.6, 4, 44), toonMaterial({}))
      ring.position.copy(ringMesh.position)
      ring.rotation.set(Math.PI / 2.4, 0.3, 0)
      planetGroup.add(ring)
    }
  }

  /* B-612：小王子的家 */
  const b612 = new THREE.Group()
  {
    const b = new Batcher()
    b.add(new THREE.IcosahedronGeometry(6.5, 1), C.grass)
    b.add(new THREE.IcosahedronGeometry(6.6, 1), C.dirt, { scale: [1, 0.5, 1], position: [0, -2.4, 0] })
    // 两座火山
    b.add(new THREE.ConeGeometry(1.5, 2.4, 8), C.rockDeep, { position: [2.4, 5.6, 1.2] })
    b.add(new THREE.ConeGeometry(1.1, 1.7, 8), C.rock, { position: [-2.6, 5.2, -1.4] })
    // 玫瑰
    b.add(new THREE.CylinderGeometry(0.12, 0.16, 2.0, 5), C.leafDeep, { position: [-0.6, 6.8, 2.6] })
    b.add(new THREE.SphereGeometry(0.72, 10, 8), C.clothRed, { position: [-0.6, 8.1, 2.6] })
    // 猴面包树幼苗
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2
      b.add(new THREE.ConeGeometry(0.4, 1.1, 5), C.leafDeep, {
        position: [Math.cos(a) * 3.4, 5.6, Math.sin(a) * 3.4],
      })
    }
    const mesh = b.build(toonMaterial({ flatShading: true }), { mottle: 0.1 })
    if (mesh) b612.add(mesh)
  }
  b612.position.set(120, 96, -120)
  b612.scale.setScalar(1.15)
  planetGroup.add(b612)
  group.add(planetGroup)

  /* 灯光 */
  const sun = new THREE.DirectionalLight(0xfff2d8, 0.85)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 220
  sun.shadow.camera.left = -55
  sun.shadow.camera.right = 55
  sun.shadow.camera.top = 70
  sun.shadow.camera.bottom = -55
  sun.shadow.bias = -0.0009
  sun.shadow.normalBias = 0.035
  sun.target.position.set(0, 6, 0)
  group.add(sun)
  group.add(sun.target)

  const moon = new THREE.DirectionalLight(0xa8bce8, 0)
  moon.target.position.set(0, 6, 0)
  group.add(moon)
  group.add(moon.target)

  const hemi = new THREE.HemisphereLight(0xcfe4f2, 0x6b6252, 0.62)
  group.add(hemi)

  const ambient = new THREE.AmbientLight(0xffffff, 0.09)
  group.add(ambient)

  /* 颜色关键帧 */
  const dayTop = new THREE.Color(C.skyDayTop)
  const dayBottom = new THREE.Color(C.skyDayBottom)
  const dayHorizon = new THREE.Color(C.fogDay)
  const duskTop = new THREE.Color(C.skyDuskTop)
  const duskBottom = new THREE.Color(C.skyDuskBottom)
  const duskHorizon = new THREE.Color(C.fogDusk)
  const nightTop = new THREE.Color(C.skyNightTop)
  const nightBottom = new THREE.Color(C.skyNightBottom)
  const nightHorizon = new THREE.Color(C.fogNight)

  const fogColor = new THREE.Color(C.fogDay)
  const sunColorDay = new THREE.Color(0xfff4dc)
  const sunColorDusk = new THREE.Color(0xffb27a)
  const tmp = new THREE.Color()

  let night = 0
  let timeOfDay = 0.22

  function apply(t: number) {
    timeOfDay = ((t % 1) + 1) % 1
    const a = (timeOfDay - 0.25) * Math.PI * 2
    const elev = Math.cos(a)

    const duskT = 1 - smoothstep(-0.14, 0.3, elev)
    night = 1 - smoothstep(-0.4, -0.03, elev)

    // 天空
    tmp.copy(dayTop).lerp(duskTop, duskT).lerp(nightTop, night)
    uniforms.uTop.value.copy(tmp)
    tmp.copy(dayBottom).lerp(duskBottom, duskT).lerp(nightBottom, night)
    uniforms.uBottom.value.copy(tmp)
    tmp.copy(dayHorizon).lerp(duskHorizon, duskT).lerp(nightHorizon, night)
    uniforms.uHorizon.value.copy(tmp)
    uniforms.uNight.value = night
    fogColor.copy(uniforms.uHorizon.value).lerp(uniforms.uBottom.value, 0.35)

    // 太阳
    const sx = Math.sin(a) * 0.62
    const sy = elev
    const sz = Math.cos(a) * 0.4 + 0.3
    const dir = new THREE.Vector3(sx, sy, sz).normalize()
    sun.position.copy(dir).multiplyScalar(120)
    // 无 tone mapping，总光强控制在 ~1.15 倍反照率以内，避免水彩配色过曝成一片奶油色
    sun.intensity = clamp(elev, 0, 1) * 0.85 + 0.03
    sun.color.copy(sunColorDay).lerp(sunColorDusk, duskT)
    sunSprite.position.copy(dir).multiplyScalar(SKY_RADIUS * 0.72)
    sunCore.position.copy(sunSprite.position).addScaledVector(dir, -2)
    sunCore.lookAt(0, 0, 0)
    const sunVis = clamp(smoothstep(-0.16, 0.02, elev), 0, 1)
    sunSprite.material.opacity = sunVis * 0.85
    ;(sunCore.material as THREE.MeshBasicMaterial).opacity = sunVis
    sunSprite.visible = sunVis > 0.01
    sunCore.visible = sunVis > 0.01
    sunSprite.scale.setScalar(64 + duskT * 26)

    // 月亮
    moonGroup.position.copy(dir).multiplyScalar(-SKY_RADIUS * 0.68)
    moonGroup.lookAt(0, 0, 0)
    const moonVis = clamp(smoothstep(-0.02, -0.2, elev), 0, 1)
    moonGroup.visible = moonVis > 0.01
    moonHalo.material.opacity = moonVis * 0.42
    moon.position.copy(dir).multiplyScalar(-110)
    moon.intensity = night * 0.3

    // 环境光
    hemi.intensity = 0.2 + (1 - night) * 0.42
    tmp.copy(new THREE.Color(0xcfe4f2)).lerp(new THREE.Color(0x39406e), night)
    hemi.color.copy(tmp)
    tmp.copy(new THREE.Color(0x6b6252)).lerp(new THREE.Color(0x2a2740), night)
    hemi.groundColor.copy(tmp)
    ambient.intensity = 0.09 + night * 0.1

    // 星星
    starMat.opacity = night * 0.95
    stars.visible = night > 0.02

    // 云与行星在夜里压暗
    cloudMat.opacity = 0.94 - night * 0.5
    seaMat.opacity = 0.7 - night * 0.36
    cloudMat.color.copy(cloudDay).lerp(cloudNight, night)
    seaMat.color.copy(cloudDay).lerp(cloudNight, night * 0.9)
  }

  apply(timeOfDay)

  return {
    group,
    sun,
    moon,
    hemi,
    ambient,
    fogColor,
    setTimeOfDay: apply,
    nightAmount: () => night,
    update(time, delta) {
      uniforms.uTime.value = time
      for (const c of clouds) {
        c.a += c.speed * delta
        c.mesh.position.x = Math.cos(c.a) * c.r
        c.mesh.position.z = Math.sin(c.a) * c.r
        c.mesh.position.y = c.y + Math.sin(time * 0.16 + c.a * 3) * 1.6
        c.mesh.rotation.y = -c.a
      }
      for (const c of seaClouds) {
        c.a += c.speed * delta
        c.mesh.position.x = Math.cos(c.a) * c.r
        c.mesh.position.z = Math.sin(c.a) * c.r
        c.mesh.rotation.y = -c.a
      }
      for (const p of planets) {
        p.mesh.rotation.y += p.spin * delta
      }
      b612.rotation.y += delta * 0.06
      stars.rotation.y += delta * 0.004
      starMat.size = 3.2 + Math.sin(time * 1.7) * 0.35
    },
  }
}

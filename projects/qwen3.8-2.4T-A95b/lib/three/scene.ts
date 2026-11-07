import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PALETTE } from './palette'
import { clamp, lerp } from './noise'
import { waveFlag } from './materials'
import { buildIsland, ISLAND } from './island'
import { buildTerrain } from './terrain'
import { buildCastle, CASTLE_Y, type XRayTargets } from './castle'
import { buildCharacters, type CharacterRig } from './characters'
import { buildEnvironment } from './environment'
import { mergeGroupLocal, mergeStaticGeometry } from './optimize'
import type { CastleSceneHandle, CastleSceneOptions, TimeKey } from './scene-types'

export type { CastleSceneHandle, CastleSceneOptions, SceneStats, TimeKey } from './scene-types'

// ---------- 视角预设 ----------

import { VIEW_PRESETS } from './views'
export { VIEW_PRESETS, presetsByCategory, findPreset, type ViewCategory, type ViewPreset } from './views'

// ---------- 昼夜 ----------

interface TimeParams {
  skyTop: THREE.Color
  skyMid: THREE.Color
  skyBottom: THREE.Color
  hemiSky: THREE.Color
  hemiGround: THREE.Color
  hemiIntensity: number
  sunColor: THREE.Color
  sunIntensity: number
  sunDir: THREE.Vector3
  moonIntensity: number
  moonDir: THREE.Vector3
  ambientColor: THREE.Color
  ambientIntensity: number
  fogColor: THREE.Color
  fogNear: number
  fogFar: number
  exposure: number
  starOpacity: number
  fireflyOpacity: number
  lampBoost: number
}

function params(p: {
  skyTop: string
  skyMid: string
  skyBottom: string
  hemiSky: string
  hemiGround: string
  hemiIntensity: number
  sunColor: string
  sunIntensity: number
  sunDir: [number, number, number]
  moonIntensity: number
  moonDir: [number, number, number]
  ambientColor: string
  ambientIntensity: number
  fogColor: string
  fogNear: number
  fogFar: number
  exposure: number
  starOpacity: number
  fireflyOpacity: number
  lampBoost: number
}): TimeParams {
  return {
    skyTop: new THREE.Color(p.skyTop),
    skyMid: new THREE.Color(p.skyMid),
    skyBottom: new THREE.Color(p.skyBottom),
    hemiSky: new THREE.Color(p.hemiSky),
    hemiGround: new THREE.Color(p.hemiGround),
    hemiIntensity: p.hemiIntensity,
    sunColor: new THREE.Color(p.sunColor),
    sunIntensity: p.sunIntensity,
    sunDir: new THREE.Vector3(...p.sunDir).normalize(),
    moonIntensity: p.moonIntensity,
    moonDir: new THREE.Vector3(...p.moonDir).normalize(),
    ambientColor: new THREE.Color(p.ambientColor),
    ambientIntensity: p.ambientIntensity,
    fogColor: new THREE.Color(p.fogColor),
    fogNear: p.fogNear,
    fogFar: p.fogFar,
    exposure: p.exposure,
    starOpacity: p.starOpacity,
    fireflyOpacity: p.fireflyOpacity,
    lampBoost: p.lampBoost,
  }
}

/** 顺序即插值轴：0 = 星夜，1 = 黄昏，2 = 白昼。 */
const TIME_STOPS: TimeParams[] = [
  params({
    skyTop: '#131c3c',
    skyMid: '#2a3763',
    skyBottom: '#4e5580',
    hemiSky: '#3a4a7a',
    hemiGround: '#23263d',
    hemiIntensity: 0.46,
    sunColor: '#a8bce8',
    sunIntensity: 0,
    sunDir: [0.3, -0.5, 0.4],
    moonIntensity: 0.66,
    moonDir: [-0.55, 0.62, -0.42],
    ambientColor: '#3d4a72',
    ambientIntensity: 0.32,
    fogColor: '#232b4d',
    fogNear: 70,
    fogFar: 330,
    exposure: 1.06,
    starOpacity: 1,
    fireflyOpacity: 0.9,
    lampBoost: 1.2,
  }),
  params({
    skyTop: '#5d6f9e',
    skyMid: '#e2a184',
    skyBottom: '#f7d6a6',
    hemiSky: '#8d94b8',
    hemiGround: '#6a5a54',
    hemiIntensity: 0.74,
    sunColor: '#ffab6e',
    sunIntensity: 1.6,
    sunDir: [-0.84, 0.15, 0.34],
    moonIntensity: 0.2,
    moonDir: [0.62, 0.5, -0.5],
    ambientColor: '#b98a72',
    ambientIntensity: 0.34,
    fogColor: '#cfa28c',
    fogNear: 82,
    fogFar: 340,
    exposure: 1.02,
    starOpacity: 0.34,
    fireflyOpacity: 0.42,
    lampBoost: 1.18,
  }),
  params({
    skyTop: PALETTE.skyDayTop,
    skyMid: PALETTE.skyDayMid,
    skyBottom: PALETTE.skyDayBottom,
    hemiSky: '#dceaf2',
    hemiGround: '#c8b79c',
    hemiIntensity: 1.06,
    sunColor: '#fff0d4',
    sunIntensity: 2.15,
    sunDir: [0.55, 0.72, 0.42],
    moonIntensity: 0,
    moonDir: [-0.6, 0.4, -0.5],
    ambientColor: '#f4e6d4',
    ambientIntensity: 0.36,
    fogColor: '#e8ded0',
    fogNear: 96,
    fogFar: 370,
    exposure: 1.0,
    starOpacity: 0,
    fireflyOpacity: 0,
    lampBoost: 0.5,
  }),
]

const TIME_INDEX: Record<TimeKey, number> = { night: 0, dusk: 1, day: 2 }

// ---------- 动画对象收集 ----------

interface AnimState {
  cloths: THREE.Mesh[]
  flames: THREE.Mesh[]
  lamps: THREE.Mesh[]
  swayers: THREE.Object3D[]
  bobbers: THREE.Object3D[]
  smokes: THREE.Mesh[]
  flows: THREE.Mesh[]
  water: THREE.Mesh | null
  mist: THREE.Points | null
  debris: THREE.Points | null
  crystals: THREE.Mesh[]
  crystalHalos: THREE.Mesh[]
  windmill: THREE.Object3D | null
  spinners: THREE.Object3D[]
  rose: THREE.Object3D | null
}

function collectAnim(root: THREE.Object3D): AnimState {
  const state: AnimState = {
    cloths: [],
    flames: [],
    lamps: [],
    swayers: [],
    bobbers: [],
    smokes: [],
    flows: [],
    water: null,
    mist: null,
    debris: null,
    crystals: [],
    crystalHalos: [],
    windmill: null,
    spinners: [],
    rose: null,
  }
  root.traverse((o) => {
    const u = o.userData
    const mesh = o as THREE.Mesh
    if (u.wave && mesh.isMesh) state.cloths.push(mesh)
    if (u.flame) state.flames.push(mesh)
    if (u.lamp && mesh.isMesh) state.lamps.push(mesh)
    if (u.sway) state.swayers.push(o)
    if (u.bob) state.bobbers.push(o)
    if (u.smoke && mesh.isMesh) state.smokes.push(mesh)
    if (u.flow && mesh.isMesh) state.flows.push(mesh)
    if (u.water && mesh.isMesh) state.water = mesh
    if (u.mist) state.mist = o as THREE.Points
    if (u.speeds) state.debris = o as THREE.Points
    if (u.crystal) state.crystals.push(mesh)
    if (u.crystalHalo) state.crystalHalos.push(mesh)
    if (u.windmill) state.windmill = u.windmill
    if (u.globe || u.armillary) state.spinners.push(u.globe ?? u.armillary)
    if (u.rose) state.rose = o
  })
  return state
}

// ---------- 主控制器 ----------

export function createCastleScene(container: HTMLElement, options: CastleSceneOptions = {}): CastleSceneHandle {
  // ----- 渲染器 -----
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(container.clientWidth || 1, container.clientHeight || 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  // 阴影只在需要时重算：太阳只在昼夜切换时移动，静态阴影可以缓存
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  container.appendChild(renderer.domElement)

  // ----- 场景与相机 -----
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(new THREE.Color('#e8ded0'), 96, 370)

  const camera = new THREE.PerspectiveCamera(46, (container.clientWidth || 1) / (container.clientHeight || 1), 0.12, 1600)
  camera.position.set(96, 50, 108)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.rotateSpeed = 0.62
  controls.zoomSpeed = 0.85
  controls.panSpeed = 0.6
  controls.minDistance = 0.6
  controls.maxDistance = 520
  controls.maxPolarAngle = Math.PI * 0.985
  controls.target.set(0, 4, 0)
  controls.autoRotateSpeed = 0.42

  // ----- 光照 -----
  const hemi = new THREE.HemisphereLight(new THREE.Color('#dceaf2'), new THREE.Color('#c8b79c'), 1.06)
  scene.add(hemi)
  const ambient = new THREE.AmbientLight(new THREE.Color('#f4e6d4'), 0.36)
  scene.add(ambient)

  // ----- 组装世界 -----
  const island = buildIsland()
  const terrain = buildTerrain()
  const castleResult = buildCastle()
  const characters: CharacterRig = buildCharacters()
  const env = buildEnvironment()

  scene.add(island)
  scene.add(terrain)
  scene.add(castleResult.group)
  scene.add(characters.group)
  scene.add(env.group)
  scene.add(env.sun.light)
  scene.add(env.moon.light)
  scene.add(env.sun.light.target)
  scene.add(env.moon.light.target)

  // ----- 透视模式的目标 -----
  const xray: XRayTargets = castleResult.xray
  const xrayFadeOriginal = xray.fade.map((m) => {
    const lm = m as THREE.MeshLambertMaterial
    return { material: lm, opacity: lm.opacity, transparent: lm.transparent, depthWrite: lm.depthWrite }
  })

  // ----- 收集动画对象（必须在合并之前）-----
  const anim = collectAnim(scene)

  // ----- 室内点光源：吊灯与壁炉的光锚 -----
  const interiorLights: { light: THREE.PointLight; base: number }[] = []
  scene.updateMatrixWorld(true)
  scene.traverse((o) => {
    const spec = o.userData.lightSpec as { color: string; intensity: number; distance: number; decay: number } | undefined
    if (!spec) return
    const light = new THREE.PointLight(new THREE.Color(spec.color), spec.intensity, spec.distance, spec.decay)
    light.position.setFromMatrixPosition(o.matrixWorld)
    scene.add(light)
    interiorLights.push({ light, base: spec.intensity })
  })
  const walkers = characters.walkers
  const walkerSet = new Set<THREE.Object3D>(walkers.map((w) => w.obj))
  const birds = characters.birds
  const butterflies = characters.butterflies

  // ----- 组内局部合并：整体动画的对象（村民、树、云、玫瑰丛）-----
  scene.updateMatrixWorld(true)
  const localTargets: THREE.Object3D[] = []
  scene.traverse((o) => {
    if (o.userData.anim || o.userData.sway || o.userData.rose || o.name === 'cloud-puff') localTargets.push(o)
  })
  for (const t of localTargets) {
    mergeGroupLocal(t, { allowTransparent: t.name === 'cloud-puff', bakeColors: true })
  }

  // ----- 合并静态几何 -----
  const mergeResult = mergeStaticGeometry(scene, xray.hide)
  for (const m of mergeResult.hideMeshes) xray.hide.push(m)

  // ----- 昼夜状态 -----
  let timeT = TIME_INDEX[options.initialTime ?? 'day']
  let targetTimeT = timeT
  let currentTimeKey: TimeKey = options.initialTime ?? 'day'
  // 固定时长的过渡：帧率波动不影响过渡速度（逐帧指数收敛在低帧率下会卡在半路）
  const TIME_TRANSITION_MS = 2600
  let timeTransStart = -1
  let timeTransFrom = timeT

  const tmpA = new THREE.Color()
  const tmpB = new THREE.Color()
  const tmpV = new THREE.Vector3()

  function blendTimeParams(t: number): TimeParams {
    const i = clamp(Math.floor(t), 0, TIME_STOPS.length - 2)
    const f = clamp(t - i, 0, 1)
    const a = TIME_STOPS[i]
    const b = TIME_STOPS[i + 1]
    return {
      skyTop: tmpA.copy(a.skyTop).lerp(b.skyTop, f).clone(),
      skyMid: new THREE.Color().copy(a.skyMid).lerp(b.skyMid, f),
      skyBottom: new THREE.Color().copy(a.skyBottom).lerp(b.skyBottom, f),
      hemiSky: new THREE.Color().copy(a.hemiSky).lerp(b.hemiSky, f),
      hemiGround: new THREE.Color().copy(a.hemiGround).lerp(b.hemiGround, f),
      hemiIntensity: lerp(a.hemiIntensity, b.hemiIntensity, f),
      sunColor: new THREE.Color().copy(a.sunColor).lerp(b.sunColor, f),
      sunIntensity: lerp(a.sunIntensity, b.sunIntensity, f),
      sunDir: new THREE.Vector3().copy(a.sunDir).lerp(b.sunDir, f).normalize(),
      moonIntensity: lerp(a.moonIntensity, b.moonIntensity, f),
      moonDir: new THREE.Vector3().copy(a.moonDir).lerp(b.moonDir, f).normalize(),
      ambientColor: new THREE.Color().copy(a.ambientColor).lerp(b.ambientColor, f),
      ambientIntensity: lerp(a.ambientIntensity, b.ambientIntensity, f),
      fogColor: new THREE.Color().copy(a.fogColor).lerp(b.fogColor, f),
      fogNear: lerp(a.fogNear, b.fogNear, f),
      fogFar: lerp(a.fogFar, b.fogFar, f),
      exposure: lerp(a.exposure, b.exposure, f),
      starOpacity: lerp(a.starOpacity, b.starOpacity, f),
      fireflyOpacity: lerp(a.fireflyOpacity, b.fireflyOpacity, f),
      lampBoost: lerp(a.lampBoost, b.lampBoost, f),
    }
  }

  let shadowDirty = true

  function applyTime(p: TimeParams): void {
    env.sky.uniforms.uTop.value.copy(p.skyTop)
    env.sky.uniforms.uMid.value.copy(p.skyMid)
    env.sky.uniforms.uBottom.value.copy(p.skyBottom)

    hemi.color.copy(p.hemiSky)
    hemi.groundColor.copy(p.hemiGround)
    hemi.intensity = p.hemiIntensity
    ambient.color.copy(p.ambientColor)
    ambient.intensity = p.ambientIntensity

    env.sun.light.color.copy(p.sunColor)
    env.sun.light.intensity = p.sunIntensity
    tmpV.copy(p.sunDir).multiplyScalar(230)
    env.sun.light.position.copy(tmpV)
    env.sun.light.target.position.set(0, 0, 0)
    env.sun.group.position.copy(tmpV).multiplyScalar(1.9)
    env.sun.group.lookAt(0, 0, 0)
    const sunVisible = clamp((p.sunDir.y + 0.08) * 4, 0, 1)
    ;(env.sun.disc.material as THREE.MeshBasicMaterial).opacity = 0.95 * sunVisible
    ;(env.sun.halo.material as THREE.MeshBasicMaterial).opacity = 0.16 * sunVisible
    env.sun.group.visible = sunVisible > 0.02

    env.moon.light.intensity = p.moonIntensity
    tmpV.copy(p.moonDir).multiplyScalar(230)
    env.moon.light.position.copy(tmpV)
    env.moon.light.target.position.set(0, 0, 0)
    env.moon.group.position.copy(tmpV).multiplyScalar(1.9)
    env.moon.group.lookAt(0, 0, 0)
    const moonVisible = clamp(p.moonIntensity * 2.2, 0, 1)
    env.moon.group.visible = moonVisible > 0.02

    const fog = scene.fog as THREE.Fog
    fog.color.copy(p.fogColor)
    fog.near = p.fogNear
    fog.far = p.fogFar
    renderer.toneMappingExposure = p.exposure

    env.stars.material.opacity = p.starOpacity
    env.stars.points.visible = p.starOpacity > 0.01
    env.fireflies.material.opacity = p.fireflyOpacity
    env.fireflies.points.visible = p.fireflyOpacity > 0.01

    // 灯光与火焰在夜里更亮
    for (const lamp of anim.lamps) {
      const lm = lamp.material as THREE.MeshLambertMaterial
      if (lm.emissive) lm.emissiveIntensity = (lm.userData.baseEmissive ?? 0.7) * p.lampBoost
    }
    for (const il of interiorLights) il.light.intensity = il.base * p.lampBoost
    for (const c of anim.crystalHalos) {
      const cm = c.material as THREE.MeshBasicMaterial
      cm.opacity = 0.06 + 0.14 * (1 - clamp(p.sunIntensity / 2, 0, 1))
    }
  }

  // 记录每盏灯的基准 emissive，便于按昼夜缩放
  for (const lamp of anim.lamps) {
    const lm = lamp.material as THREE.MeshLambertMaterial
    if (lm.emissive && lm.userData.baseEmissive === undefined) {
      lm.userData.baseEmissive = lm.emissiveIntensity || 0.7
    }
  }

  applyTime(blendTimeParams(timeT))

  // ----- 透视模式 -----
  let xrayOn = false
  function setXRay(on: boolean): void {
    if (on === xrayOn) return
    xrayOn = on
    for (const entry of xrayFadeOriginal) {
      const lm = entry.material
      if (on) {
        lm.transparent = true
        lm.opacity = 0.15
        lm.depthWrite = false
      } else {
        lm.transparent = entry.transparent
        lm.opacity = entry.opacity
        lm.depthWrite = entry.depthWrite
      }
      lm.needsUpdate = true
    }
    for (const obj of xray.hide) obj.visible = !on
    shadowDirty = true
  }

  // ----- 视角飞行 -----
  let activePreset: string | null = options.initialPreset ?? null
  let flying = false
  let flyStart = 0
  const flyDuration = 1500
  const fromPos = new THREE.Vector3()
  const toPos = new THREE.Vector3()
  const fromTarget = new THREE.Vector3()
  const toTarget = new THREE.Vector3()

  function flyTo(presetId: string): void {
    const preset = VIEW_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    fromPos.copy(camera.position)
    fromTarget.copy(controls.target)
    toPos.set(...preset.position)
    toTarget.set(...preset.target)
    flyStart = performance.now()
    flying = true
    activePreset = presetId
    options.onPresetChange?.(presetId)
    if (preset.suggestXRay !== undefined) setXRay(preset.suggestXRay)
  }

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  // ----- 尺寸 -----
  function resize(): void {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
    shadowDirty = true
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  window.addEventListener('resize', resize)

  // 用户手动操作后取消「当前预设」高亮
  controls.addEventListener('start', () => {
    if (!flying && activePreset !== null) {
      activePreset = null
      options.onPresetChange?.(null)
    }
  })

  // ----- 动画循环 -----
  const clock = new THREE.Clock()
  let raf = 0
  let frame = 0
  let fpsAccum = 0
  let fpsFrames = 0
  let lastStats = 0
  let readyFired = false
  const walkerPos = new THREE.Vector3()
  const walkerNext = new THREE.Vector3()

  function animate(): void {
    raf = requestAnimationFrame(animate)
    const dt = Math.min(clock.getDelta(), 0.05)
    const t = clock.elapsedTime
    frame++

    // 昼夜过渡
    if (timeTransStart >= 0) {
      const k = clamp((performance.now() - timeTransStart) / TIME_TRANSITION_MS, 0, 1)
      timeT = lerp(timeTransFrom, targetTimeT, easeInOutCubic(k))
      applyTime(blendTimeParams(timeT))
      shadowDirty = true
      if (k >= 1) timeTransStart = -1
    }

    // 相机飞行
    if (flying) {
      const k = clamp((performance.now() - flyStart) / flyDuration, 0, 1)
      const e = easeInOutCubic(k)
      camera.position.lerpVectors(fromPos, toPos, e)
      controls.target.lerpVectors(fromTarget, toTarget, e)
      if (k >= 1) flying = false
    }

    controls.update()

    // 旗帜与布料
    for (let i = 0; i < anim.cloths.length; i++) {
      waveFlag(anim.cloths[i], t, i * 0.7, 0.13)
    }

    // 火焰跳动
    for (let i = 0; i < anim.flames.length; i++) {
      const f = anim.flames[i]
      const phase = (f.userData.flame?.phase ?? 0) as number
      const s = 1 + Math.sin(t * 9.3 + phase) * 0.14 + Math.sin(t * 15.7 + phase * 2) * 0.07
      f.scale.set(1 / Math.sqrt(s), s, 1 / Math.sqrt(s))
      f.rotation.y = t * 1.4 + phase
    }

    // 湖面涟漪
    if (anim.water) {
      const pos = anim.water.geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      for (let i = 0; i < arr.length; i += 3) {
        const x = arr[i]
        const z = arr[i + 2]
        arr[i + 1] = Math.sin(x * 0.55 + t * 1.5) * 0.075 + Math.cos(z * 0.48 + t * 1.15) * 0.07 + Math.sin((x + z) * 0.9 + t * 2.3) * 0.03
      }
      pos.needsUpdate = true
      anim.water.geometry.computeVertexNormals()
    }

    // 溪流与瀑布：滚动 UV 制造流动感
    for (const flow of anim.flows) {
      const mat = flow.material as THREE.MeshLambertMaterial
      const speed = (flow.userData.flow?.speed ?? 1) as number
      if (mat.map) mat.map.offset.y -= dt * speed
    }

    // 水雾
    if (anim.mist) {
      const data = anim.mist.userData.mist as { seeds: Float32Array; top: THREE.Vector3; bottom: THREE.Vector3 }
      const pos = anim.mist.geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      const span = data.top.y - data.bottom.y
      for (let i = 0; i < data.seeds.length; i++) {
        const k = ((data.seeds[i] / 6.283 + t * 0.09) % 1 + 1) % 1
        arr[i * 3 + 1] = data.top.y - k * span + Math.sin(t * 1.6 + data.seeds[i]) * 1.2
      }
      pos.needsUpdate = true
    }

    // 坠落的碎石
    if (anim.debris) {
      const speeds = anim.debris.userData.speeds as Float32Array
      const pos = anim.debris.geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      for (let i = 0; i < speeds.length; i++) {
        arr[i * 3 + 1] -= speeds[i] * dt
        if (arr[i * 3 + 1] < -78) arr[i * 3 + 1] = -6
      }
      pos.needsUpdate = true
    }

    // 云
    for (const d of env.clouds.drifters) {
      d.angle += d.speed * dt
      d.obj.position.x = Math.cos(d.angle) * d.radius
      d.obj.position.z = Math.sin(d.angle) * d.radius
      d.obj.position.y = d.baseY + Math.sin(t * 0.22 + d.bob) * 1.4
    }

    // 远处的小浮岛
    for (const b of env.islets.bobbers) {
      b.obj.position.y = b.baseY + Math.sin(t * 0.35 + b.phase) * b.amp
      b.obj.rotation.y += b.spin * dt
    }

    // 星空闪烁
    if (env.stars.points.visible) {
      env.stars.material.size = 2.2 + Math.sin(t * 1.7) * 0.35
    }

    // 萤火
    if (env.fireflies.points.visible) {
      const ff = env.fireflies
      const pos = ff.points.geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      for (let i = 0; i < ff.seeds.length; i++) {
        const s = ff.seeds[i]
        arr[i * 3] = ff.centers[i * 3] + Math.sin(t * 0.7 + s) * 2.4
        arr[i * 3 + 1] = ff.centers[i * 3 + 1] + Math.sin(t * 0.5 + s * 2) * 1.5
        arr[i * 3 + 2] = ff.centers[i * 3 + 2] + Math.cos(t * 0.62 + s * 1.4) * 2.4
      }
      pos.needsUpdate = true
      ff.material.size = 0.6 + Math.sin(t * 3.1) * 0.18
    }

    // 树冠摆动
    for (const s of anim.swayers) {
      const d = s.userData.sway as { phase: number; amp: number }
      s.rotation.z = Math.sin(t * 0.9 + d.phase) * d.amp
      s.rotation.x = Math.cos(t * 0.72 + d.phase) * d.amp * 0.7
    }

    // 漂浮物（睡莲、小船）
    for (const b of anim.bobbers) {
      const d = b.userData.bob as { phase: number; amp: number; rock?: boolean }
      b.position.y += Math.sin(t * 1.3 + d.phase) * d.amp * dt * 2
      if (d.rock) {
        b.rotation.z = Math.sin(t * 0.9 + d.phase) * 0.05
        b.rotation.x = Math.cos(t * 0.7 + d.phase) * 0.04
      }
    }

    // 炊烟
    for (const s of anim.smokes) {
      const d = s.userData.smoke as { phase: number; baseY: number }
      const k = ((t * 0.22 + d.phase / 6.28) % 1 + 1) % 1
      s.position.y = d.baseY + k * 4.2
      const sc = 0.5 + k * 1.5
      s.scale.setScalar(sc)
      ;(s.material as THREE.MeshBasicMaterial).opacity = 0.42 * (1 - k)
    }

    // 风车
    if (anim.windmill) anim.windmill.rotation.z += dt * 0.55

    // 地球仪与浑天仪
    for (const sp of anim.spinners) {
      sp.rotation.y += dt * 0.22
      sp.rotation.x += dt * 0.07
    }

    // 玫瑰轻轻摇曳
    if (anim.rose) {
      anim.rose.rotation.z = Math.sin(t * 0.8) * 0.05
      anim.rose.rotation.x = Math.cos(t * 0.63) * 0.04
    }

    // 人物
    for (const w of walkers) {
      w.t = (w.t + dt * w.speed) % 1
      const path = w.path
      const segCount = path.length - 1
      const global = w.t * segCount
      const idx = clamp(Math.floor(global), 0, segCount - 1)
      const local = global - idx
      walkerPos.lerpVectors(path[idx], path[idx + 1], local)
      walkerNext.lerpVectors(path[idx], path[idx + 1], Math.min(1, local + 0.05))
      w.obj.position.copy(walkerPos)
      w.obj.rotation.y = Math.atan2(walkerNext.x - walkerPos.x, walkerNext.z - walkerPos.z)
      const a = w.obj.userData.anim
      if (a?.arms) {
        const swing = Math.sin(t * 5.2 + a.phase) * 0.42
        a.arms[0].rotation.x = swing
        a.arms[1].rotation.x = -swing
      }
      w.obj.position.y += Math.abs(Math.sin(t * 5.2 + (a?.phase ?? 0))) * 0.045
    }

    for (const obj of characters.group.children) {
      const a = obj.userData.anim
      if (!a) continue
      // 巡逻中的人物由 walker 逻辑驱动，这里跳过避免互相覆盖
      if (walkerSet.has(obj)) continue
      if (a.pose) {
        // 人形：呼吸般的轻微起伏
        const breathe = Math.sin(t * 1.5 + a.phase) * 0.012
        obj.position.y = (a.baseY ?? obj.position.y) + breathe
        if (a.baseY === undefined) a.baseY = obj.position.y - breathe
        if (a.head) a.head.rotation.y = Math.sin(t * 0.42 + a.phase) * 0.16
        if (a.arms && a.pose !== 'walk') {
          const s = Math.sin(t * 1.2 + a.phase) * 0.05
          a.arms[0].rotation.x = (a.arms[0].rotation.x ?? 0) * 0.9 + s * 0.1
        }
      } else if (a.type === 'fox') {
        if (a.tail) a.tail.rotation.y = Math.sin(t * 1.1 + a.phase) * 0.22
        if (a.head) a.head.rotation.y = Math.sin(t * 0.5 + a.phase) * 0.2
      } else if (a.type === 'graze') {
        if (a.head) a.head.rotation.x = Math.sin(t * 0.6 + a.phase) * 0.22
        obj.position.y += Math.sin(t * 0.6 + a.phase) * 0.004
      } else if (a.type === 'horse') {
        if (a.tail) a.tail.rotation.x = 0.5 + Math.sin(t * 1.3 + a.phase) * 0.16
        if (a.neck) a.neck.rotation.z = Math.sin(t * 0.55 + a.phase) * 0.05
      }
    }

    // 飞鸟
    for (const b of birds) {
      const center = b.obj.userData.orbitCenter as THREE.Vector3 | undefined
      const cx = center?.x ?? 0
      const cy = center?.y ?? 0
      const cz = center?.z ?? 0
      b.phase += b.speed * dt
      const x = cx + Math.cos(b.phase) * b.radius
      const z = cz + Math.sin(b.phase) * b.radius
      const y = cy + b.height + Math.sin(b.phase * 2.1) * 2.4
      b.obj.position.set(x, y, z)
      b.obj.rotation.y = -b.phase + (b.speed > 0 ? Math.PI / 2 : -Math.PI / 2)
      b.obj.rotation.z = b.tilt + Math.sin(b.phase * 2.1) * 0.12
      const flap = Math.sin(t * 11 + b.phase * 3) * 0.85
      const wings = b.obj.userData.anim?.wings as THREE.Object3D[] | undefined
      if (wings) {
        wings[0].rotation.z = flap
        wings[1].rotation.z = -flap
      }
    }

    // 蝴蝶
    for (const bf of butterflies) {
      bf.phase += bf.speed * dt
      const x = bf.center.x + Math.cos(bf.phase) * bf.radius
      const z = bf.center.z + Math.sin(bf.phase * 1.3) * bf.radius
      const y = bf.center.y + Math.sin(bf.phase * 2.4) * 0.5
      bf.obj.position.set(x, y, z)
      bf.obj.rotation.y = -bf.phase
      const flap = Math.sin(t * 16 + bf.phase * 4) * 1.0
      const wings = bf.obj.userData.anim?.wings as THREE.Object3D[] | undefined
      if (wings) {
        wings[0].rotation.y = flap
        wings[1].rotation.y = -flap
      }
    }

    // 阴影按需刷新
    if (shadowDirty || frame % 12 === 0) {
      renderer.shadowMap.needsUpdate = true
      shadowDirty = false
    }

    renderer.render(scene, camera)

    if (!readyFired) {
      readyFired = true
      options.onReady?.()
    }

    // 统计
    fpsAccum += dt
    fpsFrames++
    if (fpsAccum >= 0.5) {
      const fps = Math.round(fpsFrames / fpsAccum)
      fpsAccum = 0
      fpsFrames = 0
      if (options.onStats && performance.now() - lastStats > 500) {
        lastStats = performance.now()
        options.onStats({
          drawCalls: renderer.info.render.calls,
          triangles: renderer.info.render.triangles,
          fps,
        })
      }
    }
  }

  animate()

  // 初始视角
  if (options.initialPreset) {
    const preset = VIEW_PRESETS.find((p) => p.id === options.initialPreset)
    if (preset) {
      camera.position.set(...preset.position)
      controls.target.set(...preset.target)
      if (preset.suggestXRay !== undefined) setXRay(preset.suggestXRay)
    }
  }
  controls.update()

  // ----- 对外接口 -----
  return {
    setTime(key: TimeKey) {
      currentTimeKey = key
      targetTimeT = TIME_INDEX[key]
      timeTransFrom = timeT
      timeTransStart = performance.now()
    },
    getTime() {
      return currentTimeKey
    },
    setXRay,
    getXRay() {
      return xrayOn
    },
    setAutoRotate(on: boolean) {
      controls.autoRotate = on
    },
    flyTo,
    getActivePreset() {
      return activePreset
    },
    resetView() {
      flyTo('panorama')
    },
    getStats() {
      return {
        drawCalls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        fps: 0,
      }
    },
    dispose() {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener('resize', resize)
      controls.dispose()
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh || (mesh as unknown as THREE.Points).isPoints) {
          mesh.geometry?.dispose()
          const mat = mesh.material as THREE.Material | THREE.Material[]
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
          else mat?.dispose()
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    },
  }
}

export { ISLAND, CASTLE_Y }

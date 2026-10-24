import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { paintGround } from './ground'
import { createMaterials } from './materials'
import { buildIsland, buildWater, buildRoots, heightAt } from './terrain'
import { buildCastle, buildTown, keepAt, courtAt, floorTop } from './buildings'
import { buildNature } from './nature'
import { buildSky } from './sky'
import { populate } from './characters'
import { VILLAGE, LAKE, MOUNTAIN, FARM, onIsland } from './layout'

export type Mood = 'day' | 'dusk' | 'night'
type V3 = [number, number, number]

export interface ViewPreset {
  id: string
  label: string
  hint: string
  pos: V3
  target: V3
}

const pr = onIsland(70, 3.8)
const pry = heightAt(pr[0], pr[1])
const FT = [floorTop(0), floorTop(1), floorTop(2), 3 * 2.2 + 0.36]

export const VIEWS: ViewPreset[] = [
  { id: 'overview', label: '全景', hint: '浮空岛全貌', pos: [10, 42, 106], target: [0, -3, -6] },
  { id: 'prince', label: '小王子', hint: '岛沿的小王子与狐狸', pos: [pr[0] + 2.4, pry + 2.3, pr[1] + 6.4], target: [pr[0] + 0.2, pry + 1.0, pr[1]] },
  { id: 'castle', label: '城堡', hint: '城墙、塔楼与吊桥', pos: [-2, 14, 30], target: [-2, 6, -9] },
  { id: 'courtyard', label: '庭院', hint: '礼拜堂、马厩、铁匠铺', pos: [...courtAt(0, 6.5, 12.5)], target: [...courtAt(0, 1.2, 2.5)] },
  { id: 'interior', label: '主堡剖面', hint: '四层室内全景', pos: [...keepAt(-6.5, 5.5, 15.6)], target: [...keepAt(0.5, 3.0, 0)] },
  { id: 'hall', label: '王座大厅', hint: '国王、王后与宴会', pos: [...keepAt(1.4, FT[0] + 1.9, 7.6)], target: [...keepAt(1.6, FT[0] + 1.0, -1.0)] },
  { id: 'kitchen', label: '厨房', hint: '炉灶与大锅', pos: [...keepAt(-2.0, FT[0] + 2.8, 6.8)], target: [...keepAt(-3.4, FT[0] + 0.7, -1.0)] },
  { id: 'library', label: '图书馆', hint: '书架与地球仪', pos: [...keepAt(-2.6, FT[1] + 1.8, 6.4)], target: [...keepAt(-2.6, FT[1] + 1.0, -1.2)] },
  { id: 'bedroom', label: '玫瑰房', hint: '玻璃罩下的玫瑰', pos: [...keepAt(-3.1, FT[2] + 1.5, 5.4)], target: [...keepAt(-3.2, FT[2] + 0.9, 1.4)] },
  { id: 'observatory', label: '天文台', hint: '望远镜与星象仪', pos: [...keepAt(-3.2, FT[3] + 1.8, 6.4)], target: [...keepAt(-3.2, FT[3] + 1.0, 0)] },
  { id: 'village', label: '村庄', hint: '民居、水井与面包摊', pos: [VILLAGE.x + 5, 8.5, VILLAGE.z + 18], target: [VILLAGE.x, 1.4, VILLAGE.z] },
  { id: 'farm', label: '农田风车', hint: '麦田、谷仓与风车', pos: [-14, 11, 41], target: [-14, 1.2, 14] },
  { id: 'lake', label: '湖泊', hint: '栈桥、小船与睡莲', pos: [LAKE.x - 5, 8.5, LAKE.z + 17], target: [LAKE.x, 0, LAKE.z] },
  { id: 'mountain', label: '山与洞穴', hint: '雪峰、瀑布与小龙', pos: [MOUNTAIN.x + 8, 14, MOUNTAIN.z + 29], target: [MOUNTAIN.x - 3, 4.5, MOUNTAIN.z + 3] },
  { id: 'under', label: '岛底', hint: '悬垂的岩壁与根须', pos: [26, -14, 62], target: [0, -16, 0] },
]

interface MoodSet {
  top: string
  mid: string
  bot: string
  sunCol: string
  sunDir: V3
  hemiSky: string
  hemiGround: string
  hemiI: number
  sunLight: string
  sunI: number
  fog: string
  fogD: number
  stars: number
  rooms: number
  waterLight: string
}

const MOODS: Record<Mood, MoodSet> = {
  day: {
    top: '#7aa6d6',
    mid: '#c3e1ea',
    bot: '#fbe8d0',
    sunCol: '#fff3cf',
    sunDir: [0.45, 0.62, 0.55],
    hemiSky: '#d6e9f5',
    hemiGround: '#f3dcbc',
    hemiI: 1.25,
    sunLight: '#fff0d6',
    sunI: 2.4,
    fog: '#d8eaf0',
    fogD: 0.0024,
    stars: 0,
    rooms: 0.3,
    waterLight: '#ffffff',
  },
  dusk: {
    top: '#7d84c3',
    mid: '#f0b9b2',
    bot: '#ffdcae',
    sunCol: '#ffd29c',
    sunDir: [-0.75, 0.2, 0.62],
    hemiSky: '#c8b6da',
    hemiGround: '#f2c6a2',
    hemiI: 1.0,
    sunLight: '#ffb98a',
    sunI: 2.0,
    fog: '#e9c5ba',
    fogD: 0.0028,
    stars: 0.28,
    rooms: 1.0,
    waterLight: '#ffd9c2',
  },
  night: {
    top: '#101a40',
    mid: '#28427f',
    bot: '#6e72ad',
    sunCol: '#dce6ff',
    sunDir: [0.4, 0.55, -0.35],
    hemiSky: '#5568a8',
    hemiGround: '#2f3560',
    hemiI: 0.8,
    sunLight: '#a5b8ff',
    sunI: 0.9,
    fog: '#2b3c70',
    fogD: 0.003,
    stars: 1,
    rooms: 1.9,
    waterLight: '#7f90c8',
  },
}

export interface CastleViewer {
  views: ViewPreset[]
  flyTo: (id: string) => void
  setMood: (m: Mood) => void
  setAutoRotate: (on: boolean) => void
  dispose: () => void
}

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export async function createViewer(
  container: HTMLElement,
  onProgress?: (p: number, text: string) => void,
  isCancelled?: () => boolean,
): Promise<CastleViewer> {
  const holder: { renderer?: THREE.WebGLRenderer } = {}
  try {
    return await create(container, holder, onProgress, isCancelled)
  } catch (e) {
    holder.renderer?.dispose()
    holder.renderer?.domElement.remove()
    throw e
  }
}

async function create(
  container: HTMLElement,
  holder: { renderer?: THREE.WebGLRenderer },
  onProgress?: (p: number, text: string) => void,
  isCancelled?: () => boolean,
): Promise<CastleViewer> {
  const step = async (p: number, t: string) => {
    onProgress?.(p, t)
    await nextFrame()
    if (isCancelled?.()) throw new Error('cancelled')
  }
  await step(0.02, '准备画布')

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;outline:none'
  container.appendChild(renderer.domElement)
  holder.renderer = renderer

  const scene = new THREE.Scene()
  const fog = new THREE.FogExp2(MOODS.day.fog, MOODS.day.fogD)
  scene.fog = fog
  const camera = new THREE.PerspectiveCamera(42, 1, 0.3, 2600)
  camera.position.set(...VIEWS[0].pos)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(...VIEWS[0].target)
  controls.enableDamping = true
  controls.dampingFactor = 0.07
  controls.minDistance = 1.5
  controls.maxDistance = 260
  controls.zoomToCursor = true
  controls.autoRotateSpeed = 0.45
  controls.update()

  const hemi = new THREE.HemisphereLight(MOODS.day.hemiSky, MOODS.day.hemiGround, MOODS.day.hemiI)
  scene.add(hemi)
  const sun = new THREE.DirectionalLight(MOODS.day.sunLight, MOODS.day.sunI)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  const sc = sun.shadow.camera
  sc.left = -58
  sc.right = 58
  sc.top = 58
  sc.bottom = -58
  sc.near = 10
  sc.far = 260
  sun.shadow.bias = -0.0005
  sun.shadow.normalBias = 0.05
  scene.add(sun, sun.target)

  const roomLights: THREE.PointLight[] = []
  for (const [x, y, z, c] of [
    [1.6, FT[0] + 1.5, 0.6, '#ffc98a'],
    [-3.3, FT[0] + 1.5, 0.4, '#ffb877'],
    [-2.4, FT[1] + 1.5, 0.6, '#ffd39a'],
    [3.4, FT[1] + 1.5, 0.4, '#ffc98a'],
    [-3.2, FT[2] + 1.5, 0.8, '#ffc0c8'],
    [2.2, FT[2] + 1.5, 0.8, '#ffd39a'],
    [-3.2, FT[3] + 1.4, 0.2, '#bcd2ff'],
  ] as Array<[number, number, number, string]>) {
    const l = new THREE.PointLight(c, 0, 7.5, 1.6)
    l.position.set(...keepAt(x, y, z))
    scene.add(l)
    roomLights.push(l)
  }

  await step(0.1, '绘制水彩地面')
  const groundTex = paintGround(renderer.capabilities.getMaxAnisotropy())
  const mats = createMaterials(groundTex)
  const glassMat = new THREE.MeshBasicMaterial({ color: '#dff6ff', transparent: true, opacity: 0.3, depthWrite: false })

  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(1000, 32, 16), mats.sky)
  skyDome.frustumCulled = false
  skyDome.renderOrder = -2
  scene.add(skyDome)

  await step(0.2, '隆起浮空岛与河流')
  const island = buildIsland(mats.island)
  island.castShadow = true
  island.receiveShadow = true
  scene.add(island)
  const water = buildWater(mats.water, mats.fall)
  scene.add(water.group)
  scene.add(buildRoots())

  await step(0.38, '垒砌城堡与内部房间')
  const castle = buildCastle(mats, glassMat)
  scene.add(castle.group)

  await step(0.55, '搭建村庄、风车与农场')
  const town = buildTown(mats)
  scene.add(town.group)

  await step(0.68, '种下森林、花草与山峦')
  const nature = buildNature(mats)
  scene.add(nature.group)

  await step(0.8, '请出国王、骑士与村民')
  const people = populate(mats)
  scene.add(people.group)

  await step(0.92, '铺开天空与云')
  const sky = buildSky(mats)
  scene.add(sky.group)

  const anims = [...castle.anims, ...town.anims, ...nature.anims, ...people.anims, ...sky.anims]

  /* ---- 昼夜过渡 ---- */
  const cur = {
    top: new THREE.Color(MOODS.day.top),
    mid: new THREE.Color(MOODS.day.mid),
    bot: new THREE.Color(MOODS.day.bot),
    sunCol: new THREE.Color(MOODS.day.sunCol),
    sunDir: new THREE.Vector3(...MOODS.day.sunDir).normalize(),
    hemiSky: new THREE.Color(MOODS.day.hemiSky),
    hemiGround: new THREE.Color(MOODS.day.hemiGround),
    hemiI: MOODS.day.hemiI,
    sunLight: new THREE.Color(MOODS.day.sunLight),
    sunI: MOODS.day.sunI,
    fog: new THREE.Color(MOODS.day.fog),
    fogD: MOODS.day.fogD,
    stars: MOODS.day.stars,
    rooms: MOODS.day.rooms,
    waterLight: new THREE.Color(MOODS.day.waterLight),
  }
  let target = MOODS.day
  const tmpC = new THREE.Color()
  const tmpV = new THREE.Vector3()
  const approach = (k: number) => {
    cur.top.lerp(tmpC.set(target.top), k)
    cur.mid.lerp(tmpC.set(target.mid), k)
    cur.bot.lerp(tmpC.set(target.bot), k)
    cur.sunCol.lerp(tmpC.set(target.sunCol), k)
    cur.sunDir.lerp(tmpV.set(...target.sunDir).normalize(), k).normalize()
    cur.hemiSky.lerp(tmpC.set(target.hemiSky), k)
    cur.hemiGround.lerp(tmpC.set(target.hemiGround), k)
    cur.sunLight.lerp(tmpC.set(target.sunLight), k)
    cur.fog.lerp(tmpC.set(target.fog), k)
    cur.waterLight.lerp(tmpC.set(target.waterLight), k)
    cur.hemiI += (target.hemiI - cur.hemiI) * k
    cur.sunI += (target.sunI - cur.sunI) * k
    cur.fogD += (target.fogD - cur.fogD) * k
    cur.stars += (target.stars - cur.stars) * k
    cur.rooms += (target.rooms - cur.rooms) * k
  }
  const applyMood = () => {
    const su = mats.sky.uniforms
    su.uTop.value.copy(cur.top)
    su.uMid.value.copy(cur.mid)
    su.uBot.value.copy(cur.bot)
    su.uSunCol.value.copy(cur.sunCol)
    su.uSunDir.value.copy(cur.sunDir)
    hemi.color.copy(cur.hemiSky)
    hemi.groundColor.copy(cur.hemiGround)
    hemi.intensity = cur.hemiI
    sun.color.copy(cur.sunLight)
    sun.intensity = cur.sunI
    sun.position.copy(cur.sunDir).multiplyScalar(110)
    fog.color.copy(cur.fog)
    fog.density = cur.fogD
    mats.stars.uniforms.uOpacity.value = cur.stars
    mats.water.uniforms.uLight.value.copy(cur.waterLight)
    mats.fall.uniforms.uLight.value.copy(cur.waterLight)
    for (const l of roomLights) l.intensity = cur.rooms * 5
  }
  approach(1)
  applyMood()

  /* ---- 尺寸与相机飞行 ---- */
  const resize = () => {
    const w = Math.max(1, container.clientWidth)
    const h = Math.max(1, container.clientHeight)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = w / h < 0.8 ? 56 : 42
    camera.updateProjectionMatrix()
    mats.stars.uniforms.uPx.value = renderer.getPixelRatio()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(container)

  let fly: null | { t0: number; dur: number; p0: THREE.Vector3; p1: THREE.Vector3; t0v: THREE.Vector3; t1v: THREE.Vector3 } = null
  const stopFly = () => {
    fly = null
  }
  renderer.domElement.addEventListener('pointerdown', stopFly)
  renderer.domElement.addEventListener('wheel', stopFly, { passive: true })

  const clock = new THREE.Clock()
  let raf = 0
  let disposed = false
  const loop = () => {
    if (disposed) return
    raf = requestAnimationFrame(loop)
    const dt = Math.min(clock.getDelta(), 0.1)
    const t = clock.elapsedTime
    approach(1 - Math.exp(-dt * 2.4))
    applyMood()
    mats.water.uniforms.uTime.value = t
    mats.fall.uniforms.uTime.value = t
    mats.sky.uniforms.uTime.value = t
    mats.stars.uniforms.uTime.value = t
    for (const a of anims) a(t)
    if (fly) {
      const k = Math.min(1, (performance.now() - fly.t0) / fly.dur)
      const e = easeInOut(k)
      camera.position.lerpVectors(fly.p0, fly.p1, e)
      controls.target.lerpVectors(fly.t0v, fly.t1v, e)
      if (k >= 1) fly = null
    }
    controls.update()
    skyDome.position.copy(camera.position)
    renderer.render(scene, camera)
  }
  await step(1, '完成')
  loop()

  return {
    views: VIEWS,
    flyTo(id) {
      const v = VIEWS.find((x) => x.id === id)
      if (!v) return
      controls.autoRotate = false
      fly = {
        t0: performance.now(),
        dur: 1800,
        p0: camera.position.clone(),
        p1: new THREE.Vector3(...v.pos),
        t0v: controls.target.clone(),
        t1v: new THREE.Vector3(...v.target),
      }
    },
    setMood(m) {
      target = MOODS[m]
    },
    setAutoRotate(on) {
      controls.autoRotate = on
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointerdown', stopFly)
      renderer.domElement.removeEventListener('wheel', stopFly)
      controls.dispose()
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
      })
      glassMat.dispose()
      mats.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}

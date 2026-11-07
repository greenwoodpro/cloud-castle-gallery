import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { C } from './palette'
import { BAILEY_Y, FLOOR_LEVELS, WALL_HEIGHT, WALL_RADIUS } from './layout'
import { createIsland } from './island'
import { createTerrain, ROSE_GARDEN } from './terrain'
import { createCastle } from './castle'
import { createKeep } from './keep'
import { createInterior, ROOM_SPOTS } from './interior'
import { createSky } from './sky'
import { HOTSPOTS, type Hotspot } from './hotspots'
import { groundAt, islandSurfaceHeight } from './island'
import {
  makeAstronomer,
  makeCat,
  makeChild,
  makeCook,
  makeFox,
  makeFlock,
  makeGuard,
  makeHorse,
  makeKing,
  makeLady,
  makeLamplighter,
  makeMerchant,
  makeMinstrel,
  makePrince,
  makeSheep,
  makeShepherd,
  type Character,
  type CharacterInfo,
} from './characters'
import { Batcher, roundedBoxGeometry, toonMaterial } from './utils'

export type SceneHandle = {
  setCutaway: (on: boolean) => void
  setTimeOfDay: (t: number) => void
  setAutoRotate: (on: boolean) => void
  setAutoCycle: (on: boolean) => void
  setPeople: (on: boolean) => void
  setHotspots: (on: boolean) => void
  setGateOpen: (on: boolean) => void
  setQuality: (high: boolean) => void
  focusHotspot: (id: string) => void
  focusFloor: (level: number) => void
  resetView: () => void
  onCharacter: (cb: (info: CharacterInfo | null) => void) => void
  onHotspot: (cb: (id: string | null) => void) => void
  onReady: (cb: (stats: { drawCalls: number; triangles: number }) => void) => void
  dispose: () => void
}

const DEFAULT_CAM = new THREE.Vector3(44, 27, 48)
const DEFAULT_TARGET = new THREE.Vector3(0, 9, 0)

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** 小王子那只"带孔的木箱"——绵羊就住在里面。 */
function buildSheepBox(): THREE.Mesh | null {
  const b = new Batcher()
  b.add(roundedBoxGeometry(1.5, 1.1, 1.1, 0.06, 1), C.woodLight, { position: [0, 0.55, 0] })
  for (const s of [-1, 1]) {
    b.add(roundedBoxGeometry(1.56, 0.12, 1.16, 0.03, 1), C.woodDark, { position: [0, 0.55 + s * 0.42, 0] })
  }
  // 三个透气孔
  for (let i = 0; i < 3; i++) {
    b.add(new THREE.TorusGeometry(0.13, 0.035, 4, 12), C.woodDark, {
      position: [-0.42 + i * 0.42, 0.72, 0.56],
    })
  }
  b.add(roundedBoxGeometry(0.5, 0.08, 0.08, 0.02, 1), C.woodDark, { position: [0, 1.12, 0] })
  const mesh = b.build(toonMaterial({}))
  if (mesh) mesh.castShadow = true
  return mesh
}

export function createCastleScene(container: HTMLElement, overlay: HTMLElement): SceneHandle {
  /* ---------------- 渲染器 ---------------- */
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(container.clientWidth || 1, container.clientHeight || 1)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping
  renderer.shadowMap.enabled = true
  // 场景里只有极少量的东西在动，隔帧刷新阴影可以省下大量开销
  renderer.shadowMap.autoUpdate = false
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.touchAction = 'none'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(new THREE.Color(C.fogDay), 110, 400)

  const camera = new THREE.PerspectiveCamera(
    42,
    (container.clientWidth || 1) / (container.clientHeight || 1),
    0.5,
    1400,
  )
  camera.position.copy(DEFAULT_CAM)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.copy(DEFAULT_TARGET)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.minDistance = 12
  controls.maxDistance = 260
  controls.maxPolarAngle = Math.PI * 0.92
  controls.autoRotateSpeed = 0.42
  controls.update()

  /* ---------------- 组装世界 ---------------- */
  const sky = createSky()
  scene.add(sky.group)

  const island = createIsland()
  scene.add(island.group)

  const terrain = createTerrain()
  scene.add(terrain.group)

  const castle = createCastle()
  scene.add(castle.group)

  const keep = createKeep()
  scene.add(keep.group)

  const interior = createInterior()
  scene.add(interior.group)

  /* ---------------- 人物 ---------------- */
  const peopleGroup = new THREE.Group()
  peopleGroup.name = 'people'
  scene.add(peopleGroup)

  const characters: Character[] = []
  const addChar = (c: Character) => {
    characters.push(c)
    peopleGroup.add(c.group)
    return c
  }

  // 室内
  addChar(makeKing(ROOM_SPOTS.king.pos, ROOM_SPOTS.king.face))
  addChar(makeGuard(ROOM_SPOTS.hallGuardL.pos, ROOM_SPOTS.hallGuardL.face))
  addChar(makeGuard(ROOM_SPOTS.hallGuardR.pos, ROOM_SPOTS.hallGuardR.face))
  addChar(makeMinstrel(ROOM_SPOTS.minstrel.pos, ROOM_SPOTS.minstrel.face))
  addChar(makeLady(ROOM_SPOTS.servantA.pos, ROOM_SPOTS.servantA.face))
  addChar(makeChild(ROOM_SPOTS.servantB.pos, ROOM_SPOTS.servantB.face))
  addChar(makeCook(ROOM_SPOTS.cook.pos, ROOM_SPOTS.cook.face))
  addChar(makeChild(ROOM_SPOTS.scullion.pos, ROOM_SPOTS.scullion.face))
  addChar(makeCat(new THREE.Vector3(3.1, FLOOR_LEVELS.kitchen, 0.4), -1.2))
  addChar(makeAstronomer(ROOM_SPOTS.astronomer.pos, ROOM_SPOTS.astronomer.face))
  addChar(makeGuard(ROOM_SPOTS.dungeonGuard.pos, ROOM_SPOTS.dungeonGuard.face))

  // 小王子与狐狸：白天在岛上，夜里回到寝室
  const princeDay = addChar(makePrince(ROOM_SPOTS.prince.pos, ROOM_SPOTS.prince.face, true))
  const princeNight = addChar(makePrince(ROOM_SPOTS.roofPrince.pos, ROOM_SPOTS.roofPrince.face))
  const foxNight = addChar(makeFox(ROOM_SPOTS.fox.pos, ROOM_SPOTS.fox.face))
  const foxDay = addChar(
    makeFox(new THREE.Vector3(ROSE_GARDEN.x + 2.6, groundAt(ROSE_GARDEN.x + 2.6, ROSE_GARDEN.y + 1.8), ROSE_GARDEN.y + 1.8), -2.2),
  )

  // 室外
  const gateY = BAILEY_Y
  addChar(makeGuard(new THREE.Vector3(-3.1, gateY, 15.2), 0))
  addChar(makeGuard(new THREE.Vector3(3.1, gateY, 15.2), 0))
  const walkY = BAILEY_Y + WALL_HEIGHT + 0.3
  const walkR = WALL_RADIUS * Math.cos(Math.PI / 8)
  addChar(makeGuard(new THREE.Vector3(Math.cos((5 * Math.PI) / 4) * walkR, walkY, Math.sin((5 * Math.PI) / 4) * walkR), Math.PI / 4))
  addChar(makeGuard(new THREE.Vector3(Math.cos((7 * Math.PI) / 8) * walkR, walkY, Math.sin((7 * Math.PI) / 8) * walkR), -Math.PI / 8, false))
  addChar(makeLamplighter(new THREE.Vector3(1.1, groundAt(1.1, 23), 23), Math.PI))
  addChar(makeMerchant(new THREE.Vector3(5.4, BAILEY_Y, 9.4), -2.4))
  addChar(makeLady(new THREE.Vector3(6.3, BAILEY_Y, -6.2), 2.6))
  addChar(makeChild(new THREE.Vector3(-4.2, BAILEY_Y, 6.8), 1.2))
  addChar(makeHorse(new THREE.Vector3(9.4, BAILEY_Y, 3.4), -1.9))
  const shepherdPos = new THREE.Vector3(-7.5, 0, -17.5)
  shepherdPos.y = groundAt(shepherdPos.x, shepherdPos.z)
  addChar(makeShepherd(shepherdPos, 0.7))
  for (let i = 0; i < 3; i++) {
    const sx = shepherdPos.x + 2.2 + i * 1.5
    const sz = shepherdPos.z + 1.4 + (i % 2) * 1.8
    if (islandSurfaceHeight(sx, sz) === null) continue
    addChar(makeSheep(new THREE.Vector3(sx, groundAt(sx, sz), sz), -0.6 + i * 0.8))
  }

  // 绵羊的木箱
  const sheepBox = buildSheepBox()
  if (sheepBox) {
    const bx = ROSE_GARDEN.x - 4.6
    const bz = ROSE_GARDEN.y + 2.4
    sheepBox.position.set(bx, groundAt(bx, bz), bz)
    sheepBox.rotation.y = 0.5
    scene.add(sheepBox)
  }

  const flock = makeFlock(9, 52, 30)
  scene.add(flock.group)

  /* ---------------- 标注热点 ---------------- */
  const hotspotEls = new Map<string, HTMLElement>()
  for (const h of HOTSPOTS) {
    const el = document.createElement('div')
    el.className = 'hotspot'
    el.dataset.id = h.id
    el.dataset.active = 'false'
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'hotspot-dot'
    dot.textContent = String(h.index)
    dot.setAttribute('aria-label', `${h.title}：${h.subtitle}`)
    const label = document.createElement('span')
    label.className = 'hotspot-label'
    label.textContent = h.title
    el.append(dot, label)
    overlay.appendChild(el)
    hotspotEls.set(h.id, el)
    dot.addEventListener('click', (e) => {
      e.stopPropagation()
      selectHotspot(h.id)
    })
  }

  /* ---------------- 交互状态 ---------------- */
  let cutaway = false
  let showHotspots = true
  let showPeople = true
  let autoCycle = false
  let timeOfDay = 0.22
  let activeHotspot: string | null = null
  let characterCb: ((info: CharacterInfo | null) => void) | null = null
  let hotspotCb: ((id: string | null) => void) | null = null
  let readyCb: ((stats: { drawCalls: number; triangles: number }) => void) | null = null

  let tween: {
    fromPos: THREE.Vector3
    toPos: THREE.Vector3
    fromTarget: THREE.Vector3
    toTarget: THREE.Vector3
    t: number
    dur: number
  } | null = null

  function flyTo(cam: THREE.Vector3, target: THREE.Vector3, dur = 1.15) {
    tween = {
      fromPos: camera.position.clone(),
      toPos: cam.clone(),
      fromTarget: controls.target.clone(),
      toTarget: target.clone(),
      t: 0,
      dur,
    }
  }

  function selectHotspot(id: string) {
    const h = HOTSPOTS.find((x) => x.id === id)
    if (!h) return
    if (h.interior && !cutaway) {
      cutaway = true
      keep.setCutaway(true)
    }
    activeHotspot = id
    for (const [key, el] of hotspotEls) el.dataset.active = String(key === id)
    flyTo(h.view.cam, h.view.target)
    hotspotCb?.(id)
  }

  /* ---------------- 拾取人物 ---------------- */
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  let downX = 0
  let downY = 0
  let downTime = 0

  const onPointerDown = (e: PointerEvent) => {
    downX = e.clientX
    downY = e.clientY
    downTime = performance.now()
  }
  const onPointerUp = (e: PointerEvent) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 7) return
    if (performance.now() - downTime > 600) return
    const rect = renderer.domElement.getBoundingClientRect()
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    const hits = raycaster.intersectObjects(peopleGroup.children, true)
    if (hits.length === 0) {
      characterCb?.(null)
      return
    }
    let obj: THREE.Object3D | null = hits[0].object
    while (obj && !obj.userData.character) obj = obj.parent
    if (obj) characterCb?.(obj.userData.character as CharacterInfo)
  }
  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  renderer.domElement.addEventListener('pointerup', onPointerUp)

  /* ---------------- 尺寸 ---------------- */
  const resize = () => {
    const w = container.clientWidth || 1
    const h = container.clientHeight || 1
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)
  resize()

  /* ---------------- 主循环 ---------------- */
  const clock = new THREE.Clock()
  const proj = new THREE.Vector3()
  let frame = 0
  let running = true
  let raf = 0
  let reported = false

  const tick = () => {
    if (!running) return
    raf = requestAnimationFrame(tick)
    const delta = Math.min(clock.getDelta(), 0.05)
    const time = clock.elapsedTime
    frame++

    // 昼夜自动流转
    if (autoCycle) {
      timeOfDay = (timeOfDay + delta * 0.012) % 1
      sky.setTimeOfDay(timeOfDay)
    }
    const night = sky.nightAmount()

    // 相机补间
    if (tween) {
      tween.t = Math.min(1, tween.t + delta / tween.dur)
      const k = easeInOutCubic(tween.t)
      camera.position.lerpVectors(tween.fromPos, tween.toPos, k)
      controls.target.lerpVectors(tween.fromTarget, tween.toTarget, k)
      if (tween.t >= 1) tween = null
    }
    controls.update()

    // 各模块更新
    sky.update(time, delta)
    island.update(time, delta)
    island.setNight(night)
    terrain.update(time, delta)
    terrain.setNight(night)
    castle.update(time, delta)
    castle.setNight(night)
    keep.update(time, delta)
    keep.setNight(night)
    interior.update(time, delta)
    interior.setNight(night)
    flock.tick(time)

    if (showPeople) {
      for (const c of characters) c.tick(time)
    }
    // 小王子与狐狸的昼夜换位
    const isNight = night > 0.45
    princeDay.group.visible = showPeople && !isNight
    foxDay.group.visible = showPeople && !isNight
    princeNight.group.visible = showPeople && isNight
    foxNight.group.visible = showPeople && isNight

    // 雾随天色变化
    ;(scene.fog as THREE.Fog).color.copy(sky.fogColor)
    renderer.setClearColor(sky.fogColor, 1)

    // 标注投影
    if (showHotspots) {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      for (const hs of HOTSPOTS) {
        const el = hotspotEls.get(hs.id)
        if (!el) continue
        if (hs.interior && !cutaway) {
          el.style.opacity = '0'
          el.style.pointerEvents = 'none'
          continue
        }
        proj.copy(hs.position).project(camera)
        const behind = proj.z > 1
        const dist = camera.position.distanceTo(hs.position)
        const fade = behind ? 0 : Math.min(1, Math.max(0, (260 - dist) / 90))
        el.style.opacity = String(fade)
        el.style.pointerEvents = fade > 0.25 ? 'auto' : 'none'
        if (!behind) {
          const x = (proj.x * 0.5 + 0.5) * w
          const y = (-proj.y * 0.5 + 0.5) * h
          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`
        }
      }
    }

    // 隔帧刷新阴影
    if (frame % 3 === 0) renderer.shadowMap.needsUpdate = true
    renderer.render(scene, camera)

    if (!reported && frame === 3) {
      reported = true
      readyCb?.({
        drawCalls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
      })
    }
  }
  tick()

  /* ---------------- 对外接口 ---------------- */
  return {
    setCutaway(on) {
      cutaway = on
      keep.setCutaway(on)
      if (!on && activeHotspot) {
        const h = HOTSPOTS.find((x) => x.id === activeHotspot)
        if (h?.interior) {
          activeHotspot = null
          for (const el of hotspotEls.values()) el.dataset.active = 'false'
          hotspotCb?.(null)
        }
      }
    },
    setTimeOfDay(t) {
      timeOfDay = ((t % 1) + 1) % 1
      sky.setTimeOfDay(timeOfDay)
    },
    setAutoRotate(on) {
      controls.autoRotate = on
    },
    setAutoCycle(on) {
      autoCycle = on
    },
    setPeople(on) {
      showPeople = on
      peopleGroup.visible = on
    },
    setHotspots(on) {
      showHotspots = on
      overlay.style.display = on ? '' : 'none'
    },
    setGateOpen(on) {
      castle.setGateOpen(on)
    },
    setQuality(high) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, high ? 2 : 1))
      sky.sun.shadow.mapSize.set(high ? 2048 : 1024, high ? 2048 : 1024)
      sky.sun.shadow.map?.dispose()
      sky.sun.shadow.map = null as unknown as THREE.WebGLRenderTarget
      renderer.shadowMap.needsUpdate = true
      resize()
    },
    focusHotspot(id) {
      selectHotspot(id)
    },
    focusFloor(level) {
      if (!cutaway) {
        cutaway = true
        keep.setCutaway(true)
      }
      flyTo(new THREE.Vector3(19, level + 4.5, 29), new THREE.Vector3(0, level + 1.4, 0))
    },
    resetView() {
      activeHotspot = null
      for (const el of hotspotEls.values()) el.dataset.active = 'false'
      hotspotCb?.(null)
      characterCb?.(null)
      flyTo(DEFAULT_CAM, DEFAULT_TARGET, 1.0)
    },
    onCharacter(cb) {
      characterCb = cb
    },
    onHotspot(cb) {
      hotspotCb = cb
    },
    onReady(cb) {
      readyCb = cb
    },
    dispose() {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      for (const el of hotspotEls.values()) el.remove()
      hotspotEls.clear()
      controls.dispose()
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else if (mat) mat.dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    },
  }
}

export type { Hotspot }

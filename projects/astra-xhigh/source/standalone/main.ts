import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import { buildWorld, setWorldCutaway, setWorldNight } from '../lib/world-builder'
import { palette, views, chapters, type WorldView, type TimeOfDay } from '../lib/world-data'

const canvas = document.querySelector<HTMLCanvasElement>('#world')!
const scene = new THREE.Scene()
scene.background = new THREE.Color(palette.paper)
const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, 0.1, 180)
camera.position.set(...views.island.position)
let renderer: THREE.WebGLRenderer
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true })
} catch {
  document.querySelector('#status')!.textContent = '浏览器不支持 WebGL，请启用硬件加速或换用最新版 Chrome、Edge、Safari。'
  throw new Error('WebGL unavailable')
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
const controls = new OrbitControls(camera, canvas)
controls.target.set(...views.island.target)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.minDistance = 4
controls.maxDistance = 55
controls.maxPolarAngle = Math.PI - 0.04
controls.autoRotateSpeed = 0.35
const ambient = new THREE.AmbientLight(palette.paper, 1.35)
const hemisphere = new THREE.HemisphereLight(palette.paper, palette.sage, 1.4)
const sun = new THREE.DirectionalLight(palette.paper, 2.8)
sun.position.set(-8, 15, 10)
sun.castShadow = true
sun.shadow.mapSize.set(2048, 2048)
Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 15, bottom: -12 })
sun.shadow.normalBias = 0.045
sun.shadow.bias = -0.0001
const fill = new THREE.DirectionalLight(palette.slate, 0.6)
fill.position.set(8, 6, -8)
scene.add(ambient, hemisphere, sun, fill)
const world = buildWorld()
scene.add(world)
let currentView: WorldView = 'island'
let cutaway = false
let destination: { position: THREE.Vector3; target: THREE.Vector3 } | null = null
const starGeometry = new THREE.BufferGeometry()
const positions: number[] = []
for (let i = 0; i < 800; i++) {
  const angle = i * 2.39996, y = 1 - (i / 800) * 2, r = Math.sqrt(1 - y * y)
  positions.push(Math.cos(angle) * r * 70, y * 70, Math.sin(angle) * r * 70)
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: palette.paper, size: 0.12 }))
stars.visible = false
scene.add(stars)

function resize() {
  const { width, height } = canvas.getBoundingClientRect()
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}
window.addEventListener('resize', resize)
resize()
controls.addEventListener('start', () => { destination = null })

function goTo(view: WorldView) {
  currentView = view
  destination = { position: new THREE.Vector3(...views[view].position), target: new THREE.Vector3(...views[view].target) }
  cutaway = view === 'castle'
  setWorldCutaway(world, cutaway)
  document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.view === view))
  })
  document.querySelector('#cutaway')!.setAttribute('aria-pressed', String(cutaway))
}

document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(button => {
  button.onclick = () => goTo(button.dataset.view as WorldView)
})
document.querySelectorAll<HTMLButtonElement>('[data-time]').forEach(button => {
  button.onclick = () => {
    const time = button.dataset.time as TimeOfDay
    const night = time === 'night'
    document.body.dataset.time = time
    scene.background = new THREE.Color(night ? '#343f46' : time === 'sunset' ? '#f1e8d8' : palette.paper)
    ambient.intensity = night ? 0.65 : 1.35
    hemisphere.intensity = night ? 0.5 : 1.4
    sun.intensity = night ? 0.7 : time === 'sunset' ? 3.4 : 2.8
    sun.color.set(time === 'sunset' ? palette.gold : palette.paper)
    sun.position.set(...(time === 'sunset' ? [-14, 6, 8] : [-8, 15, 10]) as [number, number, number])
    stars.visible = night
    setWorldNight(world, night)
    document.querySelectorAll<HTMLButtonElement>('[data-time]').forEach(b => b.setAttribute('aria-pressed', String(b === button)))
  }
})

document.querySelector<HTMLButtonElement>('#cutaway')!.onclick = () => {
  cutaway = !cutaway
  setWorldCutaway(world, cutaway)
  document.querySelector('#cutaway')!.setAttribute('aria-pressed', String(cutaway))
}
document.querySelector<HTMLButtonElement>('#rotate')!.onclick = () => {
  controls.autoRotate = !controls.autoRotate
  document.querySelector('#rotate')!.setAttribute('aria-pressed', String(controls.autoRotate))
}
document.querySelector<HTMLButtonElement>('#reset')!.onclick = () => goTo(currentView)
for (const [id, factor] of [['zoom-in', 0.8], ['zoom-out', 1.25]] as const) {
  document.getElementById(id)!.onclick = () => {
    destination = null
    const offset = camera.position.clone().sub(controls.target)
    camera.position.copy(controls.target).add(offset.setLength(THREE.MathUtils.clamp(offset.length() * factor, 4, 55)))
  }
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = name; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
document.querySelector<HTMLButtonElement>('#capture')!.onclick = () => {
  renderer.render(scene, camera)
  canvas.toBlob(blob => { if (blob) download(blob, '星屿明信片.png') })
}
document.querySelector<HTMLButtonElement>('#export')!.onclick = async () => {
  const button = document.querySelector<HTMLButtonElement>('#export')!
  button.disabled = true; button.textContent = '正在导出…'
  setWorldCutaway(world, false)
  try {
    const data = await new GLTFExporter().parseAsync(world, { binary: true })
    if (data instanceof ArrayBuffer) download(new Blob([data], { type: 'model/gltf-binary' }), 'star-isle.glb')
  } catch { alert('导出未完成，请重试。') }
  finally { setWorldCutaway(world, cutaway); button.disabled = false; button.textContent = '导出 GLB 模型' }
}
const dialog = document.querySelector<HTMLDialogElement>('#stories')!
const storyBody = document.querySelector('#story-body')!
for (const chapter of chapters) {
  const section = document.createElement('section')
  const heading = document.createElement('h2')
  heading.textContent = chapter.title
  section.append(heading)
  const description = document.createElement('p')
  description.textContent = chapter.description
  section.append(description)
  for (const detail of chapter.sections) {
    const h3 = document.createElement('h3'); h3.textContent = detail.title
    const p = document.createElement('p'); p.textContent = detail.text
    section.append(h3, p)
  }
  storyBody.append(section)
}
document.querySelector<HTMLButtonElement>('#open-stories')!.onclick = () => dialog.showModal()
document.querySelector<HTMLButtonElement>('#close-stories')!.onclick = () => dialog.close()
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close() })
document.querySelector('#status')!.textContent = '拖动旋转 · 右键平移 · 滚轮缩放 · 手机双指缩放'
let lastTime = 0
renderer.setAnimationLoop(time => {
  const delta = Math.min((time - lastTime) / 1000, 0.1)
  lastTime = time
  if (destination) {
    const smoothing = 1 - Math.exp(-delta * 3.5)
    camera.position.lerp(destination.position, smoothing)
    controls.target.lerp(destination.target, smoothing)
    if (camera.position.distanceTo(destination.position) < 0.015) destination = null
  }
  controls.update()
  renderer.render(scene, camera)
})
document.body.dataset.ready = 'true'

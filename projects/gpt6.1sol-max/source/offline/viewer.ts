import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { createWorld, setInterior, getAnimatedObjects, animateWorld } from '../lib/world/build-world'
import { DEFAULT_CAMERA, DEFAULT_TARGET, INTERIOR_CAMERA, INTERIOR_TARGET, PALETTE, PLACES, type TimeOfDay } from '../lib/world/config'
import { MAT, seededRandom } from '../lib/world/primitives'

const host = document.getElementById('scene')!
const scene = new THREE.Scene()
scene.background = new THREE.Color(PALETTE.paper)
const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.1, 200)
camera.position.set(...DEFAULT_CAMERA)
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7))
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.12
renderer.domElement.setAttribute('aria-label', '可以自由探索的童话浮空岛三维模型')
host.append(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(...DEFAULT_TARGET)
controls.enableDamping = true
controls.dampingFactor = 0.065
controls.minDistance = 5
controls.maxDistance = 85
controls.maxPolarAngle = Math.PI * 0.92
controls.autoRotateSpeed = 0.25
controls.update()
const world = createWorld()
scene.add(world)
const animated = getAnimatedObjects(world)
const ambient = new THREE.AmbientLight(PALETTE.paper, 0.9)
const hemisphere = new THREE.HemisphereLight(PALETTE.paper, PALETTE.sage, 1.0)
const sun = new THREE.DirectionalLight(PALETTE.paper, 2.3)
sun.position.set(-9, 16, 12)
sun.castShadow = true
sun.shadow.mapSize.set(2048, 2048)
sun.shadow.camera.left = -15; sun.shadow.camera.right = 15
sun.shadow.camera.top = 16; sun.shadow.camera.bottom = -12
sun.shadow.camera.far = 55
sun.shadow.bias = -0.0003
sun.shadow.normalBias = 0.035
scene.add(ambient, hemisphere, sun)
const fill = new THREE.DirectionalLight(PALETTE.paper, 1.1)
fill.position.set(10, 6, -8)
scene.add(fill)
const random = seededRandom(62)
const starPositions = new Float32Array(850 * 3)
for (let i = 0; i < 850; i++) {
  const a = random() * Math.PI * 2
  const b = Math.acos(2 * random() - 1)
  starPositions[i * 3] = 65 * Math.sin(b) * Math.cos(a)
  starPositions[i * 3 + 1] = 65 * Math.cos(b)
  starPositions[i * 3 + 2] = 65 * Math.sin(b) * Math.sin(a)
}
const starGeo = new THREE.BufferGeometry()
starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: PALETTE.paper, size: 0.13, transparent: true, opacity: 0.75, depthWrite: false }))
stars.visible = false
scene.add(stars)
let moving = false
let mode: 'overview' | 'interior' = 'overview'
const destination = new THREE.Vector3(...DEFAULT_CAMERA)
const lookAt = new THREE.Vector3(...DEFAULT_TARGET)
const goto = (position: readonly [number, number, number], target: readonly [number, number, number]) => {
  destination.set(...position)
  lookAt.set(...target)
  if (innerWidth < 650) destination.sub(lookAt).multiplyScalar(Math.max(1.2, innerHeight / innerWidth * 0.95)).clampLength(5, 80).add(lookAt)
  moving = true
}
controls.addEventListener('start', () => { moving = false })
const modeButtons = document.querySelectorAll<HTMLButtonElement>('[data-mode]')
function changeMode(next: 'overview' | 'interior') {
  mode = next
  setInterior(world, mode === 'interior')
  modeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)))
  if (mode === 'interior') goto(INTERIOR_CAMERA, INTERIOR_TARGET)
  else goto(DEFAULT_CAMERA, DEFAULT_TARGET)
}
modeButtons.forEach((button) => button.addEventListener('click', () => changeMode(button.dataset.mode as typeof mode)))
const placeSelect = document.getElementById('places') as HTMLSelectElement
PLACES.forEach((place) => { const option = document.createElement('option'); option.value = place.id; option.textContent = place.name; placeSelect.append(option) })
const title = document.getElementById('place-title')!
const description = document.getElementById('place-description')!
const details = document.getElementById('place-details')!
function showPlace() {
  const place = PLACES.find((p) => p.id === placeSelect.value)!
  title.textContent = place.name
  description.textContent = place.description
  details.replaceChildren()
  for (const detail of place.details) {
    const section = document.createElement('section')
    const heading = document.createElement('h3'); heading.textContent = detail.title
    const paragraph = document.createElement('p'); paragraph.textContent = detail.text
    section.append(heading, paragraph); details.append(section)
  }
}
placeSelect.addEventListener('change', () => { const place = PLACES.find((p) => p.id === placeSelect.value)!; changeMode('overview'); goto(place.camera, place.target); showPlace() })
showPlace()
const timeButtons = document.querySelectorAll<HTMLButtonElement>('[data-time]')
function changeTime(time: TimeOfDay) {
  const night = time === 'night', day = time === 'day'
  scene.background = new THREE.Color(night ? PALETTE.ink : PALETTE.paper)
  if (time === 'sunset') (scene.background as THREE.Color).lerp(new THREE.Color(PALETTE.gold), 0.16)
  ambient.intensity = night ? 0.6 : 0.9
  hemisphere.intensity = night ? 0.7 : 1
  sun.intensity = night ? 1.3 : day ? 2.3 : 2.7
  sun.color.set(time === 'sunset' ? PALETTE.gold : PALETTE.paper)
  sun.position.set(...(night ? [-8, 12, -8] : day ? [-9, 16, 12] : [-14, 7, 8]) as [number, number, number])
  fill.intensity = night ? 0.4 : 1.1
  renderer.toneMappingExposure = night ? 0.9 : 1.12
  MAT.glow.emissiveIntensity = night ? 2.4 : 0.3
  MAT.dark.emissive.set(night ? PALETTE.gold : PALETTE.ink)
  MAT.dark.emissiveIntensity = night ? 0.38 : 0
  stars.visible = night
  document.body.dataset.time = time
  timeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.time === time)))
}
timeButtons.forEach((button) => button.addEventListener('click', () => changeTime(button.dataset.time as TimeOfDay)))
const orbit = document.getElementById('orbit') as HTMLButtonElement
orbit.addEventListener('click', () => { controls.autoRotate = !controls.autoRotate; orbit.textContent = controls.autoRotate ? '暂停环游' : '自动环游'; orbit.setAttribute('aria-pressed', String(controls.autoRotate)) })
document.getElementById('reset')!.addEventListener('click', () => changeMode('overview'))
const journal = document.getElementById('journal') as HTMLDialogElement
document.getElementById('open-journal')!.addEventListener('click', () => journal.showModal())
document.getElementById('close-journal')!.addEventListener('click', () => journal.close())
journal.addEventListener('click', (event) => { if (event.target === journal) journal.close() })
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight) })
addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLElement && event.target.matches('button,select,input') || journal.open) return
  if (event.code === 'Space') { event.preventDefault(); orbit.click() }
  if (event.key.toLowerCase() === 'r') changeMode('overview')
})
let previousTime = performance.now()
let elapsed = 0
renderer.setAnimationLoop((timestamp) => {
  const frameDelta = Math.max(0, (timestamp - previousTime) / 1000)
  const delta = Math.min(frameDelta, 0.06)
  previousTime = timestamp
  elapsed += delta
  animateWorld(animated, elapsed, delta)
  if (moving) {
    const t = 1 - Math.exp(-frameDelta * 4.5)
    camera.position.lerp(destination, t)
    controls.target.lerp(lookAt, t)
    if (camera.position.distanceTo(destination) < 0.025) moving = false
  }
  controls.update()
  renderer.render(scene, camera)
})
goto(DEFAULT_CAMERA, DEFAULT_TARGET)
document.getElementById('loading')?.remove()
document.body.dataset.ready = 'true'

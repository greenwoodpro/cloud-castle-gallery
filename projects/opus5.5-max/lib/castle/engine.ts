import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js'
import { createCastle } from './castle'
import { createCharacters } from './characters'
import { disposeGeometryCache, disposeMaterialCache } from './core'
import { createEnvironment } from './environment'
import { createIsland } from './island'
import type { Location } from './locations'
import { createVegetation } from './vegetation'
import { createWorld } from './world'

const HOME_POSITION = new THREE.Vector3(58, 36, 66)
const HOME_TARGET = new THREE.Vector3(0, 2, 0)

interface Flight {
  fromPos: THREE.Vector3
  toPos: THREE.Vector3
  fromTarget: THREE.Vector3
  toTarget: THREE.Vector3
  t: number
  duration: number
  arc: number
}

interface MarkerBinding {
  id: string
  position: THREE.Vector3
  element: HTMLElement
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export class CastleEngine {
  private renderer: THREE.WebGLRenderer
  private effect: OutlineEffect
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private resizeObserver: ResizeObserver
  private flight: Flight | null = null
  private markers: MarkerBinding[] = []
  private hour = 17.4
  private targetHour = 17.4
  private outlines = true
  private elapsed = 0
  private last = performance.now()
  private projected = new THREE.Vector3()
  private updaters: ((time: number, dt: number, night: number) => void)[] = []
  private shell: THREE.Object3D | undefined
  private characterGroups = new Map<string, THREE.Object3D>()
  private environment: ReturnType<typeof createEnvironment>

  constructor(private container: HTMLElement) {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap
    this.renderer.domElement.style.display = 'block'
    this.renderer.domElement.setAttribute('aria-label', '浮空岛城堡三维场景，可拖拽旋转、滚轮缩放')
    this.renderer.domElement.setAttribute('role', 'img')
    container.appendChild(this.renderer.domElement)

    this.effect = new OutlineEffect(this.renderer, {
      defaultThickness: 0.003,
      defaultColor: [0.27, 0.2, 0.16],
      defaultAlpha: 0.85,
    })

    this.camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 1400)
    this.camera.position.copy(this.homePosition())

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.copy(HOME_TARGET)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.07
    this.controls.minDistance = 2.5
    this.controls.maxDistance = 240
    this.controls.screenSpacePanning = true
    this.controls.autoRotateSpeed = 0.45
    this.controls.addEventListener('start', () => {
      this.flight = null
    })

    const island = createIsland()
    const vegetation = createVegetation()
    const castle = createCastle()
    const world = createWorld(castle.materials)
    const characters = createCharacters(castle.anchors)
    this.environment = createEnvironment(this.scene, pixelRatio, [...castle.smokeSources, ...world.smokeSources], world.volcanoVents)
    this.shell = castle.shell
    characters.list.forEach((c) => this.characterGroups.set(c.id, c.group))

    this.scene.add(island.group, vegetation.group, castle.group, world.group, characters.group)
    this.updaters.push(
      (t, _dt, night) => island.update(t, night),
      (t) => vegetation.update(t),
      (t, _dt, night) => castle.update(t, night),
      (t) => world.update(t),
      (t, _dt, night) => characters.update(t, night),
    )

    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(container)
    this.renderer.setAnimationLoop(() => this.tick())
  }

  private resize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (w === 0 || h === 0) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  private tick() {
    const now = performance.now()
    const realDt = Math.min(0.35, (now - this.last) / 1000)
    const dt = Math.min(0.05, realDt)
    this.last = now
    this.elapsed += dt

    const remaining = (this.targetHour - this.hour + 24) % 24
    if (remaining > 0.001) {
      const speed = Math.min(7, Math.max(0.5, remaining * 2.4))
      this.hour = (this.hour + Math.min(remaining, speed * realDt)) % 24
    }

    if (this.flight) {
      const f = this.flight
      f.t = Math.min(1, f.t + realDt / f.duration)
      const k = easeInOut(f.t)
      this.camera.position.lerpVectors(f.fromPos, f.toPos, k)
      this.camera.position.y += Math.sin(k * Math.PI) * f.arc
      this.controls.target.lerpVectors(f.fromTarget, f.toTarget, k)
      if (f.t >= 1) this.flight = null
    }
    this.controls.update()

    const night = this.environment.update(this.elapsed, dt, this.hour, this.camera)
    for (const u of this.updaters) u(this.elapsed, dt, night)

    if (this.outlines) this.effect.render(this.scene, this.camera)
    else this.renderer.render(this.scene, this.camera)
    this.updateMarkers()
  }

  private updateMarkers() {
    if (this.markers.length === 0) return
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    for (const m of this.markers) {
      this.projected.copy(m.position).project(this.camera)
      const visible = this.projected.z < 1 && Math.abs(this.projected.x) < 1.05 && Math.abs(this.projected.y) < 1.05
      if (!visible) {
        m.element.style.visibility = 'hidden'
        continue
      }
      const x = (this.projected.x * 0.5 + 0.5) * w
      const y = (-this.projected.y * 0.5 + 0.5) * h
      m.element.style.visibility = 'visible'
      m.element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    }
  }

  setMarkers(markers: { id: string; position: [number, number, number]; element: HTMLElement }[]) {
    this.markers = markers.map((m) => ({ id: m.id, position: new THREE.Vector3(...m.position), element: m.element }))
    this.updateMarkers()
  }

  setTimeOfDay(hour: number) {
    this.targetHour = hour
  }

  setCutaway(enabled: boolean) {
    if (this.shell) this.shell.visible = !enabled
  }

  setAutoRotate(enabled: boolean) {
    this.controls.autoRotate = enabled
  }

  setOutlines(enabled: boolean) {
    this.outlines = enabled
  }

  private flyTo(toPos: THREE.Vector3, toTarget: THREE.Vector3, duration = 1.8) {
    const travel = this.camera.position.distanceTo(toPos)
    this.flight = {
      fromPos: this.camera.position.clone(),
      toPos,
      fromTarget: this.controls.target.clone(),
      toTarget,
      t: 0,
      duration,
      arc: Math.min(14, travel * 0.22),
    }
  }

  focusLocation(location: Location) {
    if (location.characterId) {
      const group = this.characterGroups.get(location.characterId)
      if (group) {
        const pos = new THREE.Vector3()
        group.getWorldPosition(pos)
        const target = pos.clone().add(new THREE.Vector3(0, location.lift ?? 0.9, 0))
        const facing = group.rotation.y + (location.angle ?? 0.55)
        const distance = location.distance ?? 4
        const camPos = target
          .clone()
          .add(new THREE.Vector3(Math.sin(facing) * distance, location.height ?? 1.4, Math.cos(facing) * distance))
        this.flyTo(camPos, target)
        return
      }
    }
    const target = new THREE.Vector3(...location.target)
    const camPos = target.clone().add(new THREE.Vector3(...location.offset))
    this.flyTo(camPos, target)
  }

  /** Portrait screens see far less of the island horizontally, so the home shot backs away. */
  private homePosition() {
    const aspect = this.camera.aspect
    const factor = aspect < 1.2 ? Math.min(1.9, Math.pow(1.2 / aspect, 0.7)) : 1
    return HOME_POSITION.clone().sub(HOME_TARGET).multiplyScalar(factor).add(HOME_TARGET)
  }

  resetView() {
    this.flyTo(this.homePosition(), HOME_TARGET.clone(), 2.2)
  }

  dispose() {
    this.renderer.setAnimationLoop(null)
    this.resizeObserver.disconnect()
    this.controls.dispose()
    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const material = mesh.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(material)) material.forEach((m) => m.dispose())
      else material?.dispose()
    })
    disposeMaterialCache()
    disposeGeometryCache()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}

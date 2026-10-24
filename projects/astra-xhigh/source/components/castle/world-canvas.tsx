'use client'

import { Component, Suspense, useEffect, useImperativeHandle, useMemo, useRef, type ComponentRef, type ReactNode, type Ref, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'
import * as THREE from 'three'
import { buildWorld, setWorldCutaway, setWorldNight } from '@/lib/world-builder'
import { disposeWorld, ModelKit } from '@/lib/model-kit'
import { palette, views, type TimeOfDay, type WorldView } from '@/lib/world-data'

export interface WorldApi {
  zoom: (direction: number) => void
  reset: () => void
  capture: () => void
  exportModel: () => Promise<void>
}

interface WorldProps {
  view: WorldView
  time: TimeOfDay
  cutaway: boolean
  autoRotate: boolean
  labels: boolean
  apiRef: Ref<WorldApi>
  onReady: () => void
  onExplore: (chapter: number) => void
}

const sceneMarkers = [
  { position: new THREE.Vector3(2.1, 0.9, 0.3), label: '1F · 宴会厅与厨房', interior: true, chapter: 0 },
  { position: new THREE.Vector3(2.1, 2.5, 0.3), label: '2F · 藏书室与卧房', interior: true, chapter: 0 },
  { position: new THREE.Vector3(2.1, 4, 0.3), label: '3F · 观星室', interior: true, chapter: 0 },
  { position: new THREE.Vector3(-0.5, 6.5, -0.5), label: '观星高塔', interior: false, chapter: 0 },
  { position: new THREE.Vector3(-3.7, 1.25, 2.2), label: '花园与居民', interior: false, chapter: 1 },
  { position: new THREE.Vector3(4.7, -0.6, 3.9), label: '云间瀑布', interior: false, chapter: 2 },
]

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function Clouds() {
  const ref = useRef<THREE.Group>(null)
  const model = useMemo(() => {
    const k = new ModelKit()
    const clouds = [[-7, -1.6, 1, 1.3], [7.5, -1, -4, 1.4], [-4, 1.5, -6, 0.9], [5, -4.3, 5, 0.9], [-4.4, -4, 1.5, 0.8], [1, -3.5, -5, 1.2]]
    for (const [x, y, z, s] of clouds) {
      for (let i = 0; i < 5; i++) k.ball([x + (i - 2) * 0.48 * s, y + Math.sin(i * 1.8) * 0.12, z], [(0.55 + Math.sin(i) * 0.15) * s, (i === 2 ? 0.5 : 0.32) * s, 0.6 * s], 'stone', 2)
    }
    const group = k.finish()
    group.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = false
        object.receiveShadow = false
        const material = object.material as THREE.MeshStandardMaterial
        material.transparent = true
        material.opacity = 0.62
        material.depthWrite = false
      }
    })
    return group
  }, [])
  useEffect(() => () => disposeWorld(model), [model])
  useFrame(({ clock }) => { if (ref.current) ref.current.position.y = Math.sin(clock.elapsedTime * 0.16) * 0.12 })
  return <group ref={ref}><primitive object={model} /></group>
}

function SceneContent({ view, time, cutaway, autoRotate, apiRef, onReady, markerRefs }: WorldProps & { markerRefs: RefObject<(HTMLDivElement | null)[]> }) {
  const { camera, gl, scene, size } = useThree()
  const projection = useMemo(() => new THREE.Vector3(), [])
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const world = useMemo(() => buildWorld(), [])
  const destination = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null)
  const night = time === 'night'

  useEffect(() => { onReady(); return () => disposeWorld(world) }, [world, onReady])
  useEffect(() => { setWorldCutaway(world, cutaway) }, [world, cutaway])
  useEffect(() => { setWorldNight(world, night) }, [world, night])
  useEffect(() => {
    const preset = views[view]
    destination.current = { position: new THREE.Vector3(...preset.position), target: new THREE.Vector3(...preset.target) }
  }, [view])

  useImperativeHandle(apiRef, () => ({
    zoom(direction) {
      if (!controls.current) return
      destination.current = null
      const offset = camera.position.clone().sub(controls.current.target)
      const distance = THREE.MathUtils.clamp(offset.length() * (direction > 0 ? 0.8 : 1.25), 4, 55)
      camera.position.copy(controls.current.target).add(offset.setLength(distance))
      controls.current.update()
    },
    reset() {
      destination.current = { position: new THREE.Vector3(...views[view].position), target: new THREE.Vector3(...views[view].target) }
    },
    capture() {
      gl.render(scene, camera)
      gl.domElement.toBlob(blob => { if (blob) saveBlob(blob, '星屿-云端明信片.png') })
    },
    async exportModel() {
      const exporter = new GLTFExporter()
      const originalVisibility = world.getObjectByName('cutaway-shell')?.visible
      setWorldCutaway(world, false)
      try {
        const result = await exporter.parseAsync(world, { binary: true })
        if (result instanceof ArrayBuffer) saveBlob(new Blob([result], { type: 'model/gltf-binary' }), 'star-isle-castle.glb')
      } finally {
        if (originalVisibility !== undefined) setWorldCutaway(world, !originalVisibility)
      }
    },
  }), [camera, gl, scene, view, world])

  useFrame((_, delta) => {
    if (destination.current && controls.current) {
      const smoothing = 1 - Math.exp(-delta * 3.5)
      camera.position.lerp(destination.current.position, smoothing)
      controls.current.target.lerp(destination.current.target, smoothing)
      controls.current.update()
      if (camera.position.distanceTo(destination.current.position) < 0.015) destination.current = null
    }
    camera.updateMatrixWorld()
    sceneMarkers.forEach((marker, index) => {
      const element = markerRefs.current[index]
      if (!element) return
      projection.copy(marker.position).project(camera)
      element.style.visibility = projection.z > -1 && projection.z < 1 ? 'visible' : 'hidden'
      element.style.transform = `translate(${(projection.x * 0.5 + 0.5) * size.width}px, ${(-projection.y * 0.5 + 0.5) * size.height}px) translate(-50%, -50%)`
    })
  })

  return <>
    <color attach="background" args={[night ? '#343f46' : time === 'sunset' ? '#f1e8d8' : palette.paper]} />
    <fog attach="fog" args={[night ? '#343f46' : time === 'sunset' ? '#f1e8d8' : palette.paper, 45, 100]} />
    <ambientLight intensity={night ? 0.65 : 1.35} color={palette.paper} />
    <hemisphereLight args={[palette.paper, palette.sage, night ? 0.5 : 1.4]} />
    <directionalLight position={time === 'sunset' ? [-14, 6, 8] : [-8, 15, 10]} intensity={night ? 0.7 : time === 'sunset' ? 3.4 : 2.8} color={time === 'sunset' ? palette.gold : palette.paper} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={15} shadow-camera-bottom={-12} shadow-normalBias={0.045} shadow-bias={-0.0001} />
    <directionalLight position={[8, 6, -8]} intensity={night ? 0.7 : 0.6} color={palette.slate} />
    <primitive object={world} />
    <Clouds />
    {night && <Stars radius={55} depth={30} count={1200} factor={2.1} saturation={0} fade speed={0.3} />}
    <OrbitControls ref={controls} makeDefault target={views.island.target} enableDamping dampingFactor={0.06} minDistance={4} maxDistance={55} minPolarAngle={0.04} maxPolarAngle={Math.PI - 0.04} autoRotate={autoRotate} autoRotateSpeed={0.35} onStart={() => { destination.current = null }} />
  </>
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <div className="scene-error"><p>这片天空暂时未能展开</p><span>请开启浏览器硬件加速，或下载离线场景，在支持 WebGL 的浏览器中打开。</span><button onClick={() => window.location.reload()}>重新加载</button></div>
    return this.props.children
  }
}

export default function WorldCanvas(props: WorldProps) {
  const markerRefs = useRef<(HTMLDivElement | null)[]>([])
  // Keep projected labels in the owning root: nested Drei Html roots race with React 19 Strict Mode cleanup.
  return <SceneBoundary>
    <Canvas shadows={{ type: THREE.PCFShadowMap }} dpr={[1, 1.5]} camera={{ position: views.island.position, fov: 34, near: 0.1, far: 180 }} gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' }} aria-label="可旋转、缩放的中世纪浮空城堡 3D 场景" fallback={<div className="scene-error">你的浏览器暂不支持 WebGL，请换用最新版 Chrome、Edge 或 Safari。</div>}>
      <Suspense fallback={null}><SceneContent {...props} markerRefs={markerRefs} /></Suspense>
    </Canvas>
    <div className="scene-marker-layer">
      {sceneMarkers.map((marker, index) => <div key={marker.label} className="scene-marker" ref={element => { markerRefs.current[index] = element }} style={{ display: (marker.interior ? props.cutaway : props.labels) ? 'block' : 'none' }}>
        <button className="scene-label" onClick={() => props.onExplore(marker.chapter)}><span />{marker.label}</button>
      </div>)}
    </div>
  </SceneBoundary>
}

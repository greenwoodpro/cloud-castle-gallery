'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Component, useEffect, useMemo, useRef, type ComponentRef, type ReactNode, type RefObject } from 'react'
import * as THREE from 'three'
import { Castle, MapPin, RotateCcw } from 'lucide-react'
import { createWorld, animateWorld, getAnimatedObjects, setInterior } from '@/lib/world/build-world'
import { DEFAULT_CAMERA, DEFAULT_TARGET, INTERIOR_CAMERA, INTERIOR_TARGET, PALETTE, PLACES, type PlaceId, type TimeOfDay, type ViewMode } from '@/lib/world/config'
import { MAT } from '@/lib/world/primitives'
import { cn } from '@/lib/utils'

export type CameraAction = { kind: 'reset' | 'zoomIn' | 'zoomOut' | 'focus'; tick: number }
export interface WorldCanvasProps {
  selected: PlaceId
  mode: ViewMode
  time: TimeOfDay
  rotating: boolean
  labels: boolean
  action: CameraAction
  onSelect: (place: PlaceId) => void
  onReady: () => void
  onHeading?: (angle: number) => void
}

const ROOM_MARKERS: { label: string; position: [number, number, number] }[] = [
  { label: '炉火大厅', position: [1.9, 1.25, 1] },
  { label: '书房与寝室', position: [1.9, 3.35, 1] },
  { label: '星光观测台', position: [1.9, 5.4, 1] },
]
const MARKER_POSITIONS = [...PLACES.map((place) => place.marker), ...ROOM_MARKERS.map((room) => room.position)]

function WorldContent({ selected, mode, time, rotating, action, onReady, onHeading, markerElements }: WorldCanvasProps & { markerElements: RefObject<(HTMLDivElement | null)[]> }) {
  const world = useMemo(() => createWorld(), [])
  const projected = useMemo(() => new THREE.Vector3(), [])
  const animated = useMemo(() => getAnimatedObjects(world), [world])
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const { camera, gl, size } = useThree()
  const targetPosition = useRef(new THREE.Vector3(...DEFAULT_CAMERA))
  const targetLook = useRef(new THREE.Vector3(...DEFAULT_TARGET))
  const moving = useRef(false)
  const lastHeading = useRef(0)
  const daylight = time === 'day'
  const night = time === 'night'

  useEffect(() => {
    setInterior(world, mode === 'interior')
  }, [world, mode])

  useEffect(() => {
    const c = controls.current
    if (!c) return
    if (action.kind === 'zoomIn' || action.kind === 'zoomOut') {
      const offset = camera.position.clone().sub(c.target)
      const distance = THREE.MathUtils.clamp(offset.length() * (action.kind === 'zoomIn' ? 0.8 : 1.25), 5, 80)
      targetPosition.current.copy(c.target).add(offset.setLength(distance))
      targetLook.current.copy(c.target)
    } else if (action.kind === 'reset') {
      targetPosition.current.set(...DEFAULT_CAMERA)
      targetLook.current.set(...DEFAULT_TARGET)
    } else if (mode === 'interior') {
      targetPosition.current.set(...INTERIOR_CAMERA)
      targetLook.current.set(...INTERIOR_TARGET)
    } else {
      const place = PLACES.find((p) => p.id === selected)!
      targetPosition.current.set(...place.camera)
      targetLook.current.set(...place.target)
    }
    if (size.width < 600 && (action.kind === 'focus' || action.kind === 'reset')) {
      targetPosition.current.sub(targetLook.current).multiplyScalar(Math.max(1.2, (size.height / size.width) * 1.05)).clampLength(5, 80).add(targetLook.current)
    }
    moving.current = true
    gl.domElement.dataset.cameraMoving = 'true'
  }, [action, camera, selected, mode, size.width, size.height, gl])

  useEffect(() => {
    MAT.glow.emissiveIntensity = night ? 2.4 : 0.3
    MAT.dark.emissive.set(night ? PALETTE.gold : PALETTE.ink)
    MAT.dark.emissiveIntensity = night ? 0.38 : 0
    gl.toneMappingExposure = daylight ? 1.12 : night ? 0.9 : 1.08
  }, [time, daylight, night, gl])

  useEffect(() => { onReady() }, [onReady])

  useFrame(({ clock }, delta) => {
    const safeDelta = Math.min(delta, 0.06)
    animateWorld(animated, clock.elapsedTime, safeDelta)
    if (controls.current) controls.current.autoRotate = rotating && !moving.current
    if (moving.current && controls.current) {
      const factor = 1 - Math.exp(-delta * 4.5)
      camera.position.lerp(targetPosition.current, factor)
      controls.current.target.lerp(targetLook.current, factor)
      controls.current.update()
      if (camera.position.distanceTo(targetPosition.current) < 0.025) {
        moving.current = false
        gl.domElement.dataset.cameraMoving = 'false'
      }
    }
    // Keep labels in the page root to avoid nested Html roots racing during Strict Mode cleanup.
    camera.updateMatrixWorld()
    markerElements.current.forEach((element, index) => {
      if (!element) return
      projected.set(...MARKER_POSITIONS[index]).project(camera)
      const visible = projected.z > -1 && projected.z < 1 && Math.abs(projected.x) < 1.25 && Math.abs(projected.y) < 1.25
      element.style.visibility = visible ? 'visible' : 'hidden'
      if (visible) element.style.transform = `translate3d(${(projected.x + 1) * size.width / 2}px,${(1 - projected.y) * size.height / 2}px,0) translate(-50%,-50%)`
    })
    if (controls.current && clock.elapsedTime - lastHeading.current > 0.15) {
      onHeading?.(controls.current.getAzimuthalAngle())
      lastHeading.current = clock.elapsedTime
    }
  })

  return (
    <>
      <ambientLight intensity={night ? 0.6 : 0.9} color={PALETTE.paper} />
      <hemisphereLight args={[PALETTE.paper, PALETTE.sage, night ? 0.7 : 1.0]} />
      <directionalLight
        position={daylight ? [-9, 16, 12] : night ? [-8, 12, -8] : [-14, 7, 8]}
        intensity={night ? 1.3 : daylight ? 2.3 : 2.7}
        color={daylight || night ? PALETTE.paper : PALETTE.gold}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-15} shadow-camera-right={15}
        shadow-camera-top={16} shadow-camera-bottom={-12}
        shadow-camera-near={0.5} shadow-camera-far={55}
        shadow-bias={-0.0003} shadow-normalBias={0.035}
      />
      <directionalLight position={[10, 6, -8]} intensity={night ? 0.4 : 1.1} color={PALETTE.paper} />
      {night && <Stars radius={65} depth={30} count={850} factor={2.2} saturation={0} fade speed={0.3} />}
      <primitive object={world} dispose={null} />
      <OrbitControls
        ref={controls}
        makeDefault
        target={DEFAULT_TARGET}
        enableDamping dampingFactor={0.065}
        minDistance={5} maxDistance={85}
        minPolarAngle={0.04} maxPolarAngle={Math.PI * 0.92}
        autoRotate={rotating && !moving.current} autoRotateSpeed={0.25}
        rotateSpeed={0.6} zoomSpeed={0.8} panSpeed={0.65}
        onStart={() => { moving.current = false; gl.domElement.dataset.cameraMoving = 'false' }}
      />
    </>
  )
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <div className="scene-fallback"><Castle size={40} strokeWidth={1} /><h2>云间世界暂时走丢了</h2><p>请确认浏览器已开启硬件加速与 WebGL，然后重新载入。</p><button onClick={() => window.location.reload()}><RotateCcw size={16} /> 重新载入</button></div>
    return this.props.children
  }
}

export default function WorldCanvas(props: WorldCanvasProps) {
  const markerElements = useRef<(HTMLDivElement | null)[]>([])

  return (
    <SceneBoundary>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 1.6]}
        camera={{ position: DEFAULT_CAMERA, fov: 36, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
        fallback={<div className="scene-fallback"><Castle size={40} /><p>浏览器需要支持 WebGL 才能打开这座小岛。</p></div>}
        aria-label="可自由旋转、缩放和平移的童话浮空岛三维模型"
      >
        <WorldContent {...props} markerElements={markerElements} />
      </Canvas>
      <div className="world-markers">
        {PLACES.map((place, index) => (
          <div key={place.id} className="world-marker-anchor" data-place={place.id} data-selected={props.selected === place.id} hidden={!props.labels || props.mode === 'interior'} ref={(element) => { markerElements.current[index] = element }}>
            <button className={cn('world-marker', props.selected === place.id && 'world-marker-selected')} onClick={() => props.onSelect(place.id)} aria-label={`探索${place.name}`}>
              <span className="marker-dot" />
              <span>{place.name}</span>
            </button>
          </div>
        ))}
        {ROOM_MARKERS.map((room, index) => (
          <div key={room.label} className="world-marker-anchor" hidden={props.mode !== 'interior'} ref={(element) => { markerElements.current[PLACES.length + index] = element }}>
            <span className="room-marker"><MapPin size={14} />{room.label}</span>
          </div>
        ))}
      </div>
    </SceneBoundary>
  )
}

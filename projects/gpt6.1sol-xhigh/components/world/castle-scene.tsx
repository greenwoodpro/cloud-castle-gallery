'use client'

import { Component, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import { Castle } from './architecture'
import { Clouds, Landscape } from './landscape'
import { overviewCamera, overviewTarget, palette as p, places, type PlaceId, type TimeOfDay } from '@/lib/world-data'
import * as THREE from 'three'
type OrbitControlsImpl = React.ComponentRef<typeof OrbitControls>

export type SceneAPI = { zoom: (direction: number) => void; reset: () => void; screenshot: () => void; modelData: () => Promise<ArrayBuffer>; exportModel: () => Promise<void> }
export type SceneProps = {
  cutaway: boolean; time: TimeOfDay; autoRotate: boolean; labels: boolean; selected: PlaceId | null; focus: { id: PlaceId | null; key: number }; onSelect: (id: PlaceId) => void; onReady: (api: SceneAPI) => void
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob), a = document.createElement('a')
  a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function World({ cutaway, time, autoRotate, labels, selected, focus, onSelect, onReady }: SceneProps) {
  const world = useRef<THREE.Group>(null)
  const controls = useRef<OrbitControlsImpl>(null)
  const { camera, gl, scene } = useThree()
  const destination = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null)
  const night = time === 'night'
  const [ready, setReady] = useState(false)

  const reset = useCallback(() => {
    destination.current = { position: new THREE.Vector3(...overviewCamera), target: new THREE.Vector3(...overviewTarget) }
  }, [])

  useEffect(() => {
    const place = places.find(v => v.id === focus.id)
    destination.current = { position: new THREE.Vector3(...(place?.camera ?? overviewCamera)), target: new THREE.Vector3(...(place?.target ?? overviewTarget)) }
  }, [focus])

  useEffect(() => {
    const modelData = async () => {
      if (!world.current) throw new Error('模型尚未加载')
      const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js')
      const result = await new GLTFExporter().parseAsync(world.current, { binary: true, onlyVisible: true })
      return result as ArrayBuffer
    }
    onReady({
      modelData,
      zoom: (direction) => {
        if (!controls.current) return
        destination.current = null
        const offset = camera.position.clone().sub(controls.current.target)
        offset.multiplyScalar(direction > 0 ? 0.82 : 1.22)
        offset.clampLength(7, 70)
        camera.position.copy(controls.current.target).add(offset)
        controls.current.update()
      },
      reset,
      screenshot: () => {
        gl.render(scene, camera)
        gl.domElement.toBlob(blob => { if (blob) downloadBlob(blob, '云上来信.png') }, 'image/png')
      },
      exportModel: async () => {
        downloadBlob(new Blob([await modelData()], { type: 'model/gltf-binary' }), '星语城堡.glb')
      },
    })
    setReady(true)
  }, [camera, gl, scene, onReady, reset])

  useFrame((_, dt) => {
    if (!destination.current || !controls.current) return
    const alpha = 1 - Math.exp(-dt * 4)
    camera.position.lerp(destination.current.position, alpha)
    controls.current.target.lerp(destination.current.target, alpha)
    controls.current.update()
    if (camera.position.distanceTo(destination.current.position) < 0.025) destination.current = null
  })

  return <>
    <ambientLight intensity={night ? 0.65 : 0.8} color={p.paper} />
    <hemisphereLight args={[p.paper, p.stone, night ? 0.5 : 0.75]} />
    <directionalLight position={[-8, 18, 10]} intensity={night ? 0.6 : time === 'sunset' ? 3.2 : 2.6} color={time === 'sunset' ? p.gold : p.paper} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-15} shadow-camera-right={15} shadow-camera-top={18} shadow-camera-bottom={-15} shadow-normalBias={0.05} shadow-bias={-0.0002} />
    <directionalLight position={[10, 5, -8]} intensity={night ? 0.7 : 1} color={p.paper} />
    <group ref={world} name="云上来信_完整浮岛模型"><Landscape /><Castle cutaway={cutaway} night={night} /></group>
    <Clouds />
    {night && <Stars radius={65} depth={30} count={650} factor={2} saturation={0} fade speed={0.12} />}
    {labels && places.map(place => <Html key={place.id} position={place.pin} center zIndexRange={[15, 0]} style={{ pointerEvents: 'none' }}>
      <button className={`world-pin${selected === place.id ? ' is-selected' : ''}`} onClick={(e) => { e.stopPropagation(); onSelect(place.id) }} style={{ pointerEvents: 'auto' }} aria-label={`探索${place.title}`}><span className="pin-dot" /><span>{place.title}</span></button>
    </Html>)}
    <OrbitControls ref={controls} makeDefault enableDamping dampingFactor={0.06} minDistance={7} maxDistance={70} minPolarAngle={0.05} maxPolarAngle={Math.PI * 0.92} autoRotate={autoRotate} autoRotateSpeed={0.35} target={overviewTarget} onStart={() => { destination.current = null }} />
    {ready && <Html position={[0, -12, 0]} style={{ display: 'none' }}><span data-scene-ready="true" /></Html>}
  </>
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <div className="scene-unavailable"><p>这座小岛需要 WebGL 的支持</p><span>请启用浏览器硬件加速，或下载项目后在支持 WebGL 的浏览器中打开。</span><a href="/downloads/cloud-castle.zip" download>下载完整项目 ZIP</a></div>
    return this.props.children
  }
}

export default function CastleScene(props: SceneProps) {
  return <SceneErrorBoundary><Canvas shadows dpr={[1, 1.5]} camera={{ position: overviewCamera, fov: 36, near: 0.1, far: 180 }} gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }} style={{ touchAction: 'none' }} aria-label="可以拖动旋转、滚轮缩放的浮空岛城堡三维场景" fallback={<div className="scene-unavailable">当前浏览器不支持 WebGL，仍可下载完整项目。</div>}>
    <Suspense fallback={null}><World {...props} /></Suspense>
  </Canvas></SceneErrorBoundary>
}

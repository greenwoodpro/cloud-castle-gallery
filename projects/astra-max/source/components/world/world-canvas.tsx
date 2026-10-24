'use client'

import { Suspense, useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowUpRight } from 'lucide-react'
import { createWorld } from '@/lib/world/model'
import { mix } from '@/lib/world/primitives'
import { PLACES, WORLD_COLORS, type PlaceId, type TimeOfDay } from '@/lib/world-data'

export type WorldApi = {
  exportModel: () => Promise<ArrayBuffer>
  screenshot: () => string
  zoom: (direction: number) => void
}

export type WorldCanvasProps = {
  place: PlaceId
  viewVersion: number
  cutaway: boolean
  time: TimeOfDay
  autoRotate: boolean
  showLabels: boolean
  reduceMotion: boolean
  onSelect: (place: PlaceId) => void
  onReady: (api: WorldApi) => void
  onThumbnails: (images: Record<string, string>) => void
  onError: (message: string) => void
}

const MARKERS: { id: Exclude<PlaceId, 'overview'>; title: string; position: [number, number, number] }[] = [
  { id: 'castle', title: '风栖城堡', position: [-2.3, 3.0, 1.3] },
  { id: 'forest', title: '低语森林', position: [4.9, 1.8, -0.6] },
  { id: 'village', title: '云边村庄', position: [-4.2, 1.2, 2.3] },
  { id: 'garden', title: '玫瑰花园', position: [1.7, 0.55, 3.7] },
]

function Scene(props: WorldCanvasProps) {
  const { camera, gl, scene, size } = useThree()
  const model = useMemo(() => createWorld(), [])
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const sun = useRef<THREE.DirectionalLight>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const transition = useRef<{ from: THREE.Vector3; to: THREE.Vector3; targetFrom: THREE.Vector3; targetTo: THREE.Vector3; elapsed: number } | null>(null)
  const background = useMemo(() => new THREE.Color(WORLD_COLORS.paper), [])
  const dayColor = useMemo(() => new THREE.Color(WORLD_COLORS.paper), [])
  const warmColor = useMemo(() => new THREE.Color(WORLD_COLORS.gold), [])
  const nightColor = useMemo(() => mix(WORLD_COLORS.ink, WORLD_COLORS.sage, 0.05), [])
  const sunsetColor = useMemo(() => mix(WORLD_COLORS.paper, WORLD_COLORS.rose, 0.12), [])

  useEffect(() => {
    scene.background = background
    return () => { scene.background = null }
  }, [scene, background])

  useEffect(() => {
    const location = PLACES.find((item) => item.id === props.place)
    const mobile = size.width < 650
    const to = location ? new THREE.Vector3(...location.camera) : mobile ? new THREE.Vector3(15, 11, 20) : new THREE.Vector3(12.5, 9.0, 16)
    const targetTo = location ? new THREE.Vector3(...location.target) : new THREE.Vector3(0, 0.6, 0)
    gl.domElement.dataset.settled = 'false'
    transition.current = {
      from: camera.position.clone(), to,
      targetFrom: controls.current?.target.clone() ?? new THREE.Vector3(0, 0.6, 0),
      targetTo, elapsed: props.reduceMotion ? 1 : 0,
    }
  }, [props.place, props.viewVersion, camera, size.width, props.reduceMotion, gl])

  useEffect(() => { model.shell.visible = !props.cutaway }, [model, props.cutaway])

  useEffect(() => {
    const screenshot = () => {
      gl.render(scene, camera)
      return gl.domElement.toDataURL('image/png')
    }
    props.onReady({
      screenshot,
      async exportModel() {
        const { GLTFExporter } = await import('three/addons/exporters/GLTFExporter.js')
        const clone = model.root.clone(true)
        clone.position.set(0, 0, 0)
        clone.updateMatrixWorld(true)
        const result = await new GLTFExporter().parseAsync(clone, { binary: true, onlyVisible: false })
        if (!(result instanceof ArrayBuffer)) throw new Error('模型导出格式不正确')
        return result
      },
      zoom(direction) {
        if (!controls.current) return
        transition.current = null
        const target = controls.current.target
        const offset = camera.position.clone().sub(target)
        offset.multiplyScalar(direction > 0 ? 0.83 : 1.2)
        offset.clampLength(3, 42)
        camera.position.copy(target).add(offset)
        controls.current.update()
      },
    })
    let cancelled = false
    const frame = requestAnimationFrame(() => {
      if (cancelled) return
      const width = 360, height = 230
      const renderTarget = new THREE.WebGLRenderTarget(width, height)
      renderTarget.texture.colorSpace = THREE.SRGBColorSpace
      const oldTarget = gl.getRenderTarget()
      const pixels = new Uint8Array(width * height * 4)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      const thumbnails: Record<string, string> = {}
      try {
        if (context) for (const place of PLACES) {
          const thumbnailCamera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100)
          thumbnailCamera.position.set(...place.camera)
          thumbnailCamera.lookAt(new THREE.Vector3(...place.target))
          gl.setRenderTarget(renderTarget)
          gl.render(scene, thumbnailCamera)
          gl.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixels)
          const image = context.createImageData(width, height)
          for (let row = 0; row < height; row++) {
            const start = (height - row - 1) * width * 4
            image.data.set(pixels.subarray(start, start + width * 4), row * width * 4)
          }
          context.putImageData(image, 0, 0)
          thumbnails[place.id] = canvas.toDataURL('image/jpeg', 0.88)
        }
        if (!cancelled) props.onThumbnails(thumbnails)
      } catch {
        // Thumbnails are optional; a restricted canvas must not prevent exploration.
      } finally {
        gl.setRenderTarget(oldTarget)
        renderTarget.dispose()
      }
    })
    return () => { cancelled = true; cancelAnimationFrame(frame) }
  }, [model, gl, scene, camera, props.onReady, props.onThumbnails])

  useEffect(() => {
    const onLost = (event: Event) => {
      event.preventDefault()
      props.onError('3D 图形连接暂时中断，请点击重新载入恢复场景。')
    }
    gl.domElement.addEventListener('webglcontextlost', onLost)
    return () => { gl.domElement.removeEventListener('webglcontextlost', onLost) }
  }, [gl, props.onError])

  useEffect(() => () => model.dispose(), [model])

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime()
    const speed = Math.min(delta, 0.05)
    background.lerp(props.time === 'night' ? nightColor : props.time === 'sunset' ? sunsetColor : dayColor, Math.min(1, delta * 4))
    if (sun.current) {
      sun.current.intensity = THREE.MathUtils.lerp(sun.current.intensity, props.time === 'night' ? 0.4 : props.time === 'sunset' ? 1.8 : 2.2, speed * 3)
      sun.current.color.lerp(props.time === 'sunset' ? warmColor : dayColor, speed * 3)
    }
    if (ambient.current) ambient.current.intensity = THREE.MathUtils.lerp(ambient.current.intensity, props.time === 'night' ? 0.45 : 0.85, speed * 3)
    model.materials.window.emissiveIntensity = THREE.MathUtils.lerp(model.materials.window.emissiveIntensity, props.time === 'night' ? 2.5 : 0.18, speed * 2)

    if (!props.reduceMotion) {
      model.root.position.y = Math.sin(time * 0.32) * 0.065
      model.windmill.rotation.z -= speed * 0.3
      for (const [index, flag] of model.flags.entries()) flag.rotation.y = Math.sin(time * 1.5 + index) * 0.15
      for (const streak of model.foam.children) streak.position.y = -(((-Number(streak.userData.startY) + time * 0.8) % 4.45))
      model.clouds.children.forEach((cloud, index) => { cloud.position.x += Math.sin(time * 0.2 + index) * speed * 0.055 })
    }
    model.birds.children.forEach((bird, index) => {
      const angle = (props.reduceMotion ? 0 : time * 0.1) + index * 1.16
      bird.position.set(Math.cos(angle) * (5 + index * 0.2), 3.2 + Math.sin(angle * 2) * 0.3 + index * 0.23, Math.sin(angle) * 3.8 - 1)
      bird.rotation.y = -angle
      bird.rotation.z = Math.sin(time * 2 + index) * (props.reduceMotion ? 0 : 0.1)
    })
    if (transition.current && controls.current) {
      const move = transition.current
      move.elapsed = Math.min(1, move.elapsed + delta * 0.85)
      const t = 1 - Math.pow(1 - move.elapsed, 3)
      camera.position.lerpVectors(move.from, move.to, t)
      controls.current.target.lerpVectors(move.targetFrom, move.targetTo, t)
      controls.current.update()
      if (move.elapsed >= 1) { transition.current = null; gl.domElement.dataset.settled = 'true' }
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={0.85} />
      <hemisphereLight args={[WORLD_COLORS.paper, WORLD_COLORS.sage, 0.85]} />
      <directionalLight ref={sun} position={[-6, 12, 8]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-11} shadow-camera-right={11} shadow-camera-top={12} shadow-camera-bottom={-9} shadow-camera-far={45} shadow-normalBias={0.045} shadow-bias={-0.0003} />
      <directionalLight position={[5, 4, -8]} color={WORLD_COLORS.paper} intensity={0.65} />
      <primitive object={model.root} dispose={null} />
      <primitive object={model.clouds} dispose={null} />
      <primitive object={model.birds} dispose={null} />
      {props.time === 'night' && <Stars radius={55} depth={25} count={800} factor={2} saturation={0} fade speed={props.reduceMotion ? 0 : 0.15} />}
      {props.showLabels && !props.cutaway && MARKERS.map((marker) => (
        <Html key={marker.id} position={marker.position} center zIndexRange={[9, 0]} style={{ pointerEvents: 'auto' }}>
          <button className="world-marker" onClick={() => props.onSelect(marker.id)} aria-label={`前往${marker.title}`}>
            <span className="marker-dot" />
            <span>{marker.title}</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </button>
        </Html>
      ))}
      <OrbitControls ref={controls} makeDefault target={[0, 0.6, 0]} enableDamping dampingFactor={0.07} minDistance={3} maxDistance={42} minPolarAngle={0.07} maxPolarAngle={Math.PI * 0.9} autoRotate={props.autoRotate && !props.reduceMotion} autoRotateSpeed={0.4} onStart={() => { transition.current = null }} />
    </>
  )
}

export default function WorldCanvas(props: WorldCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.7]}
      camera={{ position: [12.5, 9, 16], fov: 36, near: 0.1, far: 140 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1 }}
      fallback={<div className="canvas-fallback">当前浏览器不支持 WebGL。请使用支持硬件加速的现代浏览器打开此世界。</div>}
      onCreated={({ gl }) => { gl.setClearColor(WORLD_COLORS.paper); gl.shadowMap.type = THREE.PCFShadowMap }}
      aria-label="可自由旋转和缩放的中世纪浮空城堡 3D 场景"
    >
      <Suspense fallback={null}><Scene {...props} /></Suspense>
    </Canvas>
  )
}

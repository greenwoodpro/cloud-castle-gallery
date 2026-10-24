'use client'

import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, type ComponentRef } from 'react'
import { NightContext } from './materials'
import { Castle } from './castle'
import { Island } from './island'
import { AsteroidB612, Birds, Celestial, Clouds, FloatingRocks, SKY, SkyDome } from './environment'
import { HotspotProjector } from './hotspots'
import { HOME_VIEW, type FocusRequest } from './camera'

type OrbitControlsImpl = ComponentRef<typeof OrbitControls>

function CameraRig({ focus, autoRotate, panelOpen }: { focus: FocusRequest; autoRotate: boolean; panelOpen: boolean }) {
  const controls = useRef<OrbitControlsImpl>(null)
  const goal = useRef<FocusRequest>(null)
  const { camera, size } = useThree()

  useEffect(() => {
    goal.current = focus
  }, [focus])

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    if (panelOpen) {
      const desktop = size.width >= 768
      const dx = desktop ? -Math.min(220, size.width * 0.16) : 0
      const dy = desktop ? 0 : size.height * 0.2
      cam.setViewOffset(size.width, size.height, dx, dy, size.width, size.height)
    } else {
      cam.clearViewOffset()
    }
    cam.updateProjectionMatrix()
  }, [panelOpen, size.width, size.height, camera])

  useEffect(() => {
    const c = controls.current
    if (!c) return
    const stop = () => {
      goal.current = null
    }
    c.addEventListener('start', stop)
    return () => c.removeEventListener('start', stop)
  }, [])

  useFrame((_, dt) => {
    const c = controls.current
    const g = goal.current
    if (!c || !g) return
    const k = 1 - Math.pow(0.02, dt)
    camera.position.lerp(g.position, k)
    c.target.lerp(g.target, k)
    c.update()
    if (camera.position.distanceTo(g.position) < 0.03 && c.target.distanceTo(g.target) < 0.03) {
      goal.current = null
    }
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={1.5}
      maxDistance={110}
      autoRotate={autoRotate}
      autoRotateSpeed={0.35}
      target={HOME_VIEW.target}
    />
  )
}

function Lights({ night }: { night: boolean }) {
  const sun = useRef<THREE.DirectionalLight>(null)
  useEffect(() => {
    const cam = sun.current?.shadow.camera
    if (!cam) return
    cam.left = -24
    cam.right = 24
    cam.top = 24
    cam.bottom = -24
    cam.near = 1
    cam.far = 140
    cam.updateProjectionMatrix()
  }, [])
  return (
    <>
      <hemisphereLight args={night ? ['#7d88c6', '#2a2e4d', 0.9] : ['#fff4e6', '#b9cfa8', 1.5]} />
      <ambientLight intensity={night ? 0.35 : 0.35} color={night ? '#9aa6e0' : '#ffffff'} />
      <directionalLight
        ref={sun}
        castShadow
        position={night ? [-30, 45, -25] : [32, 44, 22]}
        intensity={night ? 0.9 : 2.3}
        color={night ? '#c3cdff' : '#fff0d8'}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
        shadow-normalBias={0.04}
      />
    </>
  )
}

export function CastleScene({
  night,
  cutaway,
  autoRotate,
  showLabels,
  selectedId,
  focus,
}: {
  night: boolean
  cutaway: boolean
  autoRotate: boolean
  showLabels: boolean
  selectedId: string | null
  focus: FocusRequest
}) {
  const fog = night ? SKY.night.fog : SKY.day.fog
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      flat
      dpr={[1, 2]}
      camera={{ position: HOME_VIEW.position.toArray(), fov: 42, near: 0.1, far: 600 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[fog]} />
      <fog attach="fog" args={[fog, 60, 190]} />
      <NightContext.Provider value={night}>
        <Suspense fallback={null}>
          <SkyDome />
          <Celestial />
          <Lights night={night} />
          <Island />
          <Castle cutaway={cutaway} />
          <AsteroidB612 />
          <FloatingRocks />
          <Clouds />
          <Birds />
          {showLabels && <HotspotProjector />}
        </Suspense>
      </NightContext.Provider>
      <CameraRig focus={focus} autoRotate={autoRotate} panelOpen={selectedId !== null} />
    </Canvas>
  )
}

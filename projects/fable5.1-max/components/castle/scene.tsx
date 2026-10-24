'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Group } from 'three'
import { Castle } from './castle'
import { Island } from './island'
import { Environment } from './environment'
import { useScene } from '@/lib/scene-store'

function FloatingWorld() {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = Math.sin(t * 0.5) * 0.25
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.004
  })
  return (
    <group ref={ref}>
      <Island />
      <Castle />
    </group>
  )
}

function Controls() {
  const { autoRotate } = useScene()
  return (
    <OrbitControls
      makeDefault
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      enableDamping
      dampingFactor={0.06}
      minDistance={8}
      maxDistance={70}
      maxPolarAngle={Math.PI * 0.85}
      target={[0, 3, 0]}
    />
  )
}

export function CastleScene() {
  const { setSelected } = useScene()
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [26, 16, 30], fov: 42, near: 0.1, far: 300 }}
      gl={{ antialias: true }}
      onPointerMissed={() => setSelected(null)}
      className="touch-none"
    >
      <Suspense fallback={null}>
        <Environment />
        <FloatingWorld />
      </Suspense>
      <Controls />
    </Canvas>
  )
}

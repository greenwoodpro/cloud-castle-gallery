'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { SkyDome, Sun, StarField } from './scene/sky-dome'
import { FloatingIsland } from './scene/floating-island'
import { Castle } from './scene/castle'
import { Grounds } from './scene/grounds'
import { Characters } from './scene/characters'
import { Clouds, Islets, Birds } from './scene/surroundings'
import { Hotspot } from './scene/hotspot'
import { SCENE_INFOS } from '@/lib/scene-data'
import { UIOverlay } from './ui-overlay'

function SceneContent({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <>
      {/* 光照：黄昏暖光 */}
      <hemisphereLight args={['#bcd3f0', '#e8d0b0', 0.55]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[45, 40, -30]}
        intensity={1.7}
        color="#ffd9a0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-45}
        shadow-camera-right={45}
        shadow-camera-top={45}
        shadow-camera-bottom={-45}
        shadow-camera-far={160}
      />
      <directionalLight position={[-30, 20, 40]} intensity={0.35} color="#a8c3e6" />

      <SkyDome />
      <Sun />
      <StarField />
      <fog attach="fog" args={['#f2e2cc', 130, 380]} />

      <FloatingIsland />
      <Castle />
      <Grounds />
      <Characters />
      <Clouds />
      <Islets />
      <Birds />

      {SCENE_INFOS.map((info) => (
        <Hotspot
          key={info.id}
          position={info.position}
          label={info.label}
          selected={selectedId === info.id}
          onSelect={() => onSelect(info.id)}
        />
      ))}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        autoRotate
        autoRotateSpeed={0.35}
        minDistance={14}
        maxDistance={130}
        maxPolarAngle={1.72}
        target={[0, 2, 0]}
      />
    </>
  )
}

export function CastleExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [48, 30, 54], fov: 42, near: 0.1, far: 900 }}
        onCreated={() => setReady(true)}
      >
        <Suspense fallback={null}>
          <SceneContent selectedId={selectedId} onSelect={setSelectedId} />
        </Suspense>
      </Canvas>

      {/* 加载过渡 */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-background transition-opacity duration-1000 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="font-serif text-lg text-muted-foreground">正在升起浮空岛…</p>
      </div>

      <UIOverlay
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id)}
        onClose={() => setSelectedId(null)}
      />
    </div>
  )
}

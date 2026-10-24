'use client'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { PALETTE, Part, Toon, useNight } from './materials'
import type { Vec3 } from './layout'

export function Gable({
  width,
  height,
  length,
  color,
  position = [0, 0, 0],
  rotation = 0,
  outline = true,
}: {
  width: number
  height: number
  length: number
  color: string
  position?: Vec3
  rotation?: number
  outline?: boolean
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Part
        color={color}
        position={[0, height / 3, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[width / 1.732, length, height / 1.5]}
        outline={outline}
        outlineThickness={0.02}
      >
        <cylinderGeometry args={[1, 1, 1, 3]} />
      </Part>
    </group>
  )
}

export function Window({
  position,
  rotation = 0,
  width = 0.16,
  height = 0.28,
  glow = 1,
}: {
  position: Vec3
  rotation?: number
  width?: number
  height?: number
  glow?: number
}) {
  const night = useNight()
  const color = night ? '#ffd889' : '#5f6f8c'
  const emissive = night ? '#ffb24d' : '#000000'
  const intensity = night ? 1.4 * glow : 0
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh>
        <boxGeometry args={[width, height, 0.05]} />
        <Toon color={color} emissive={emissive} emissiveIntensity={intensity} />
      </mesh>
      <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[width / 2, width / 2, 0.05, 12, 1, false, Math.PI / 2, Math.PI]} />
        <Toon color={color} emissive={emissive} emissiveIntensity={intensity} />
      </mesh>
    </group>
  )
}

export function Flag({
  position,
  color = PALETTE.clothBlue,
  poleHeight = 1,
  size = [0.5, 0.32],
  phase = 0,
  star = true,
}: {
  position: Vec3
  color?: string
  poleHeight?: number
  size?: [number, number]
  phase?: number
  star?: boolean
}) {
  const geo = useMemo(() => new THREE.PlaneGeometry(size[0], size[1], 10, 4), [size])
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo])
  const mesh = useRef<THREE.Mesh>(null)
  const starRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 3 + phase
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3] + size[0] / 2
      const k = x / size[0]
      pos.setZ(i, Math.sin(t + x * 7) * 0.06 * k)
      pos.setY(i, base[i * 3 + 1] - k * 0.03)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    if (starRef.current) {
      starRef.current.position.z = Math.sin(t + (size[0] / 2) * 7) * 0.06 * 0.5 + 0.004
    }
  })

  return (
    <group position={position}>
      <Part color={PALETTE.woodDark} position={[0, poleHeight / 2, 0]}>
        <cylinderGeometry args={[0.018, 0.022, poleHeight, 6]} />
      </Part>
      <Part color={PALETTE.gold} position={[0, poleHeight + 0.03, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
      </Part>
      <mesh ref={mesh} geometry={geo} position={[size[0] / 2, poleHeight - size[1] / 2 - 0.02, 0]} castShadow>
        <Toon color={color} side={THREE.DoubleSide} />
      </mesh>
      {star && (
        <mesh ref={starRef} position={[size[0] / 2, poleHeight - size[1] / 2 - 0.03, 0.004]}>
          <circleGeometry args={[size[1] * 0.22, 5]} />
          <meshBasicMaterial color={PALETTE.gold} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

export function Barrel({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Part color={PALETTE.wood} position={[0, 0.16, 0]} outline outlineThickness={0.008}>
        <cylinderGeometry args={[0.12, 0.12, 0.32, 12]} />
      </Part>
      <Part color={PALETTE.woodDark} position={[0, 0.16, 0]} scale={[1.02, 0.12, 1.02]}>
        <cylinderGeometry args={[0.13, 0.13, 0.32, 12]} />
      </Part>
    </group>
  )
}

export function Crate({ position, size = 0.28, rotation = 0 }: { position: Vec3; size?: number; rotation?: number }) {
  return (
    <Part
      color={PALETTE.stoneWarm}
      position={[position[0], position[1] + size / 2, position[2]]}
      rotation={[0, rotation, 0]}
      outline
      outlineThickness={0.008}
    >
      <boxGeometry args={[size, size, size]} />
    </Part>
  )
}

export function Sack({ position }: { position: Vec3 }) {
  return (
    <Part color="#e6d3b0" position={[position[0], position[1] + 0.1, position[2]]} scale={[1, 0.85, 0.9]} outline outlineThickness={0.008}>
      <sphereGeometry args={[0.13, 10, 8]} />
    </Part>
  )
}

export function Fire({ position, scale = 1, light = true }: { position: Vec3; scale?: number; light?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (group.current) {
      group.current.scale.y = scale * (1 + Math.sin(t * 9) * 0.12 + Math.sin(t * 13) * 0.06)
    }
    if (lightRef.current) lightRef.current.intensity = 2.2 + Math.sin(t * 11) * 0.4
  })
  return (
    <group position={position}>
      <group ref={group} scale={scale}>
        <mesh position={[0, 0.09, 0]}>
          <coneGeometry args={[0.1, 0.24, 8]} />
          <meshBasicMaterial color={PALETTE.fire} />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <coneGeometry args={[0.055, 0.16, 8]} />
          <meshBasicMaterial color="#fff0b8" />
        </mesh>
      </group>
      {light && <pointLight ref={lightRef} color="#ffb05a" distance={3.2} decay={1.6} intensity={2.2} position={[0, 0.25, 0]} />}
    </group>
  )
}

export function Candle({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <Part color={PALETTE.snow} position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.08, 6]} />
      </Part>
      <mesh position={[0, 0.095, 0]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshBasicMaterial color="#ffd27a" />
      </mesh>
    </group>
  )
}

export function LampPost({ position }: { position: Vec3 }) {
  const night = useNight()
  return (
    <group position={position}>
      <Part color={PALETTE.ink} position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.9, 6]} />
      </Part>
      <Part color={PALETTE.ink} position={[0, 0.93, 0]}>
        <coneGeometry args={[0.09, 0.08, 4]} />
      </Part>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={night ? '#ffd27a' : '#e9eef0'} />
      </mesh>
    </group>
  )
}

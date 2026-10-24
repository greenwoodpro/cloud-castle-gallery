'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { P } from '@/lib/palette'

// 一朵低多边形胖云
function CloudPuff({ scale = 1 }: { scale?: number }) {
  const puffs = useMemo(
    () => [
      { pos: [0, 0, 0] as const, r: 2.2 },
      { pos: [2.1, -0.3, 0.4] as const, r: 1.6 },
      { pos: [-2.0, -0.4, -0.3] as const, r: 1.5 },
      { pos: [0.9, 0.9, -0.5] as const, r: 1.3 },
      { pos: [-0.9, 0.7, 0.6] as const, r: 1.2 },
    ],
    [],
  )
  return (
    <group scale={scale}>
      {puffs.map((p, i) => (
        <mesh key={i} position={[p.pos[0], p.pos[1], p.pos[2]]}>
          <sphereGeometry args={[p.r, 12, 12]} />
          <meshStandardMaterial color={P.cloud} flatShading />
        </mesh>
      ))}
    </group>
  )
}

// 环绕岛屿缓慢漂移的云
export function Clouds() {
  const groupRef = useRef<THREE.Group>(null)
  const clouds = useMemo(
    () => [
      { angle: 0.2, radius: 52, y: 10, scale: 1.4, speed: 0.018 },
      { angle: 1.5, radius: 62, y: -6, scale: 1.8, speed: 0.012 },
      { angle: 2.6, radius: 48, y: 22, scale: 1.0, speed: 0.022 },
      { angle: 3.8, radius: 70, y: 4, scale: 2.0, speed: 0.01 },
      { angle: 4.9, radius: 55, y: -14, scale: 1.3, speed: 0.016 },
      { angle: 5.8, radius: 44, y: 16, scale: 0.9, speed: 0.025 },
    ],
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    groupRef.current?.children.forEach((cloud, i) => {
      const c = clouds[i]
      const a = c.angle + t * c.speed
      cloud.position.set(Math.cos(a) * c.radius, c.y + Math.sin(t * 0.4 + i) * 1.2, Math.sin(a) * c.radius)
    })
  })

  return (
    <group ref={groupRef}>
      {clouds.map((c, i) => (
        <group key={i} position={[Math.cos(c.angle) * c.radius, c.y, Math.sin(c.angle) * c.radius]}>
          <CloudPuff scale={c.scale} />
        </group>
      ))}
    </group>
  )
}

// 小小的伴岛：草皮 + 岩锥 + 一棵树
function MiniIslet({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[3.2, 3.0, 1.2, 12]} />
        <meshStandardMaterial color={P.grass} flatShading />
      </mesh>
      <mesh position={[0, -2.6, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[3.0, 4.2, 10]} />
        <meshStandardMaterial color={P.rock} flatShading />
      </mesh>
      <mesh position={[0.4, 1.4, 0.2]}>
        <cylinderGeometry args={[0.16, 0.22, 1.8, 6]} />
        <meshStandardMaterial color={P.trunk} flatShading />
      </mesh>
      <mesh position={[0.4, 2.8, 0.2]}>
        <sphereGeometry args={[1.1, 10, 10]} />
        <meshStandardMaterial color={P.leaf} flatShading />
      </mesh>
      <mesh position={[1.1, 2.2, 0.5]}>
        <sphereGeometry args={[0.7, 10, 10]} />
        <meshStandardMaterial color={P.leafLight} flatShading />
      </mesh>
    </group>
  )
}

// 散布四周、轻轻起伏的伴岛群
export function Islets() {
  const groupRef = useRef<THREE.Group>(null)
  const islets = useMemo(
    () => [
      { pos: [-46, 6, -20] as const, scale: 1.2, phase: 0 },
      { pos: [42, -10, 30] as const, scale: 0.9, phase: 1.8 },
      { pos: [20, 18, -48] as const, scale: 1.5, phase: 3.4 },
      { pos: [-30, -18, 38] as const, scale: 0.7, phase: 5.1 },
    ],
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    groupRef.current?.children.forEach((islet, i) => {
      const it = islets[i]
      islet.position.set(it.pos[0], it.pos[1] + Math.sin(t * 0.5 + it.phase) * 1.4, it.pos[2])
      islet.rotation.y = t * 0.05 + it.phase
    })
  })

  return (
    <group ref={groupRef}>
      {islets.map((it, i) => (
        <group key={i} position={[it.pos[0], it.pos[1], it.pos[2]]}>
          <MiniIslet scale={it.scale} />
        </group>
      ))}
    </group>
  )
}

// 单只候鸟：两片翅膀轻轻扑动
function Bird() {
  const leftRef = useRef<THREE.Mesh>(null)
  const rightRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const flap = Math.sin(clock.elapsedTime * 7) * 0.5
    if (leftRef.current) leftRef.current.rotation.z = 0.25 + flap
    if (rightRef.current) rightRef.current.rotation.z = -0.25 - flap
  })

  return (
    <group>
      <mesh ref={leftRef} position={[-0.45, 0, 0]}>
        <boxGeometry args={[0.9, 0.06, 0.28]} />
        <meshStandardMaterial color={P.night} flatShading />
      </mesh>
      <mesh ref={rightRef} position={[0.45, 0, 0]}>
        <boxGeometry args={[0.9, 0.06, 0.28]} />
        <meshStandardMaterial color={P.night} flatShading />
      </mesh>
    </group>
  )
}

// 绕岛盘旋的候鸟小队
export function Birds() {
  const groupRef = useRef<THREE.Group>(null)
  const birds = useMemo(
    () => [
      { radius: 36, y: 20, speed: 0.14, phase: 0 },
      { radius: 38, y: 23, speed: 0.14, phase: 0.5 },
      { radius: 34, y: 17, speed: 0.14, phase: 1.1 },
      { radius: 40, y: 26, speed: 0.11, phase: 2.6 },
    ],
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    groupRef.current?.children.forEach((bird, i) => {
      const b = birds[i]
      const a = b.phase + t * b.speed
      bird.position.set(Math.cos(a) * b.radius, b.y + Math.sin(t * 0.8 + i) * 0.8, Math.sin(a) * b.radius)
      bird.rotation.y = -a - Math.PI / 2
    })
  })

  return (
    <group ref={groupRef}>
      {birds.map((_, i) => (
        <group key={i}>
          <Bird />
        </group>
      ))}
    </group>
  )
}

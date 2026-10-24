'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Baobab, Box, Mat, Tree } from './primitives'
import { Selectable } from './selectable'
import { Figure, Sheep } from './characters'
import { useScene } from '@/lib/scene-store'
import { P } from './palette'

const R = 15

/** 伪随机：让每次渲染的分布一致 */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function IslandBody() {
  const topGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(R, R * 0.92, 1.2, 48, 1)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const d = Math.hypot(x, z)
      if (d > R * 0.8) {
        const n = 0.85 + rand(i) * 0.3
        pos.setX(i, x * n)
        pos.setZ(i, z * n)
      }
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  const bottomGeo = useMemo(() => {
    const geo = new THREE.ConeGeometry(R * 0.92, 14, 48, 6, false)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const n = 0.8 + rand(i * 3) * 0.4
      pos.setX(i, x * n)
      pos.setZ(i, z * n)
      pos.setY(i, y + (rand(i * 7) - 0.5) * 1.2)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  const crystals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = rand(i * 11) * Math.PI * 2
        const r = 3 + rand(i * 13) * 8
        const y = -4 - rand(i * 17) * 7
        return { pos: [Math.cos(a) * r * (1 - (-y) / 16), y, Math.sin(a) * r * (1 - (-y) / 16)] as [number, number, number], s: 0.5 + rand(i * 19) * 1.2 }
      }),
    [],
  )

  return (
    <Selectable id="cliff" labelOffset={-14}>
      {/* 草皮顶层 */}
      <mesh geometry={topGeo} position={[0, -0.6, 0]} receiveShadow>
        <Mat color={P.grass} />
      </mesh>
      {/* 岩层 */}
      <mesh position={[0, -1.9, 0]} receiveShadow>
        <cylinderGeometry args={[R * 0.9, R * 0.78, 1.6, 48]} />
        <Mat color={P.rock} />
      </mesh>
      {/* 倒锥岛底 */}
      <mesh geometry={bottomGeo} position={[0, -9.6, 0]} rotation={[Math.PI, 0, 0]}>
        <Mat color={P.rockDark} />
      </mesh>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={[rand(i) * 0.4, 0, rand(i * 2) * 0.4]} scale={c.s}>
          <octahedronGeometry args={[0.6, 0]} />
          <Mat color={P.crystal} emissive={P.crystal} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </Selectable>
  )
}

function Meadow() {
  const hills: [number, number, number, number][] = [
    [-9, 0, 6, 1.6],
    [-11, 0, 1, 1.2],
    [8, 0, 9, 1.4],
    [-7, 0, 10, 1.1],
  ]
  return (
    <Selectable id="meadow" position={[0, 0, 0]} labelOffset={3}>
      {hills.map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y - 0.4, z]} scale={[s * 1.6, s, s * 1.6]} castShadow receiveShadow>
          <sphereGeometry args={[1.4, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <Mat color={P.grassDark} />
        </mesh>
      ))}
      {Array.from({ length: 30 }, (_, i) => {
        const a = rand(i * 5) * Math.PI * 2
        const r = 7.5 + rand(i * 9) * 6
        const x = Math.cos(a) * r
        const z = Math.sin(a) * r
        if (z < -3 && x > -6) return null
        return (
          <mesh key={i} position={[x, 0.08, z]}>
            <sphereGeometry args={[0.08, 6, 5]} />
            <Mat color={i % 3 === 0 ? P.rose : '#ffffff'} />
          </mesh>
        )
      })}
      <group position={[-9.5, 1.1, 5.5]}>
        <Selectable id="shepherdess" labelOffset={1.6}>
          <Figure body="#a9cbe6" hair="#8c5a3c" scale={0.85} />
          <mesh position={[0.3, 0.9, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 1.6, 6]} />
            <Mat color={P.wood} />
          </mesh>
          <mesh position={[0.3, 1.75, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.14, 0.025, 6, 12, Math.PI]} />
            <Mat color={P.wood} />
          </mesh>
        </Selectable>
      </group>
      <Sheep position={[-8, 0.6, 7.5]} rotation={0.5} />
      <Sheep position={[-10.5, 0.2, 7.8]} rotation={-1.2} />
      <Sheep position={[-7.2, 1, 5.2]} rotation={2.2} />
      <Sheep position={[-11.5, 0.9, 3.4]} rotation={1} />
    </Selectable>
  )
}

function Forest() {
  const trees = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const a = -Math.PI / 2 + (rand(i * 3) - 0.5) * 1.3
        const r = 8.5 + rand(i * 7) * 4.5
        return { x: Math.cos(a) * r, z: Math.sin(a) * r, s: 0.7 + rand(i * 11) * 0.5, round: i % 3 !== 0 }
      }),
    [],
  )
  return (
    <Selectable id="forest" labelOffset={5}>
      <Baobab position={[1, 0, -10.5]} scale={1.1} />
      <Baobab position={[-4, 0, -11]} scale={0.9} />
      <Baobab position={[5.5, 0, -11.5]} scale={0.8} />
      {trees.map((t, i) => (
        <Tree key={i} position={[t.x, 0, t.z]} scale={t.s} round={t.round} />
      ))}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[-1 + i * 1.6, 0, -9 + (i % 2) * 0.8]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 0.3, 6]} />
            <Mat color="#fff3dd" />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <sphereGeometry args={[0.16, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <Mat color={P.red} />
          </mesh>
        </group>
      ))}
    </Selectable>
  )
}

function Lake() {
  const water = useRef<THREE.Mesh>(null)
  const fall = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (water.current) water.current.position.y = 0.05 + Math.sin(t * 1.2) * 0.02
    if (fall.current) {
      const m = fall.current.material as THREE.MeshStandardMaterial
      m.opacity = 0.65 + Math.sin(t * 4) * 0.1
    }
  })
  return (
    <Selectable id="lake" position={[9.5, 0, -2]} labelOffset={2.4}>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[3.6, 3.4, 0.3, 32]} />
        <Mat color="#d9cfb0" />
      </mesh>
      <mesh ref={water} position={[0, 0.05, 0]} scale={[1, 1, 0.8]}>
        <cylinderGeometry args={[3.2, 3.2, 0.1, 32]} />
        <meshStandardMaterial color={P.water} roughness={0.2} metalness={0.1} transparent opacity={0.92} />
      </mesh>
      {/* 从岛缘倾泻的瀑布 */}
      <mesh position={[4.6, -0.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.2, 1.6]} />
        <meshStandardMaterial color={P.water} transparent opacity={0.9} />
      </mesh>
      <mesh ref={fall} position={[5.6, -4.5, 0]}>
        <boxGeometry args={[0.6, 9, 1.4]} />
        <meshStandardMaterial color={P.water} transparent opacity={0.7} />
      </mesh>
      <mesh position={[5.7, -9.5, 0]}>
        <sphereGeometry args={[1.6, 14, 10]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-1 + i * 1.1, 0.12, -0.6 + (i % 2) * 1.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.28, 8]} />
          <Mat color={P.leaf} />
        </mesh>
      ))}
    </Selectable>
  )
}

function Wheat() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.children.forEach((c, i) => {
      c.rotation.z = Math.sin(t * 1.5 + i * 0.4) * 0.12
    })
  })
  const stalks = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        x: -12.5 + rand(i * 3) * 4.5,
        z: -5 + rand(i * 5) * 5.5,
        h: 0.6 + rand(i * 7) * 0.4,
      })),
    [],
  )
  return (
    <Selectable id="wheat" labelOffset={2.2} position={[0, 0, 0]}>
      <Box size={[5, 0.12, 6]} position={[-10.3, 0.02, -2.2]} color="#e8d9a0" castShadow={false} />
      <group ref={ref}>
        {stalks.map((s, i) => (
          <group key={i} position={[s.x, 0.06, s.z]}>
            <mesh position={[0, s.h / 2, 0]}>
              <cylinderGeometry args={[0.015, 0.02, s.h, 4]} />
              <Mat color="#d8b45a" />
            </mesh>
            <mesh position={[0, s.h + 0.12, 0]}>
              <capsuleGeometry args={[0.05, 0.18, 3, 6]} />
              <Mat color={P.wheat} />
            </mesh>
          </group>
        ))}
      </group>
    </Selectable>
  )
}

function Islet() {
  const ref = useRef<THREE.Group>(null)
  const { night } = useScene()
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    }
  })
  return (
    <Selectable id="islet" position={[18, 0, 9]} labelOffset={4.5}>
      <group ref={ref}>
        <mesh position={[0, -0.4, 0]} receiveShadow>
          <cylinderGeometry args={[2.6, 2.2, 0.8, 20]} />
          <Mat color={P.grass} />
        </mesh>
        <mesh position={[0, -2.6, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[2.2, 3.6, 16]} />
          <Mat color={P.rockDark} />
        </mesh>
        {/* 路灯 */}
        <mesh position={[0.6, 1.2, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 2.4, 8]} />
          <Mat color="#4b4a55" />
        </mesh>
        <mesh position={[0.6, 2.5, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.4]} />
          <Mat color={P.lamp} emissive={P.lamp} emissiveIntensity={night ? 2.5 : 0.4} />
        </mesh>
        <pointLight position={[0.6, 2.5, 0]} color={P.lamp} intensity={night ? 6 : 0.5} distance={8} />
        <Box size={[1.2, 0.08, 0.4]} position={[-0.9, 0.45, 0.5]} color={P.wood} />
        <Box size={[1.2, 0.4, 0.08]} position={[-0.9, 0.7, 0.3]} color={P.wood} />
        <group position={[0, 0, -0.6]} rotation={[0, 0.6, 0]}>
          <Selectable id="lamplighter" labelOffset={1.6}>
            <Figure body="#6d7f9b" hair="#5a4635" hat="cap" scale={0.85} />
          </Selectable>
        </group>
        <Tree position={[-1.6, 0, -1.2]} scale={0.7} />
      </group>
      <RopeBridge />
    </Selectable>
  )
}

function RopeBridge() {
  // 从主岛边缘 (约 x=-5.5, z=-3.5 相对小岛) 到小岛边缘
  const planks = useMemo(() => {
    const from = new THREE.Vector3(-5.3, 0, -3.2)
    const to = new THREE.Vector3(-2.2, 0, -1.2)
    return Array.from({ length: 9 }, (_, i) => {
      const t = i / 8
      const p = from.clone().lerp(to, t)
      p.y = -Math.sin(t * Math.PI) * 0.5
      return p
    })
  }, [])
  const dir = Math.atan2(-1.2 + 3.2, -2.2 + 5.3)
  return (
    <group>
      {planks.map((p, i) => (
        <mesh key={i} position={p.toArray() as [number, number, number]} rotation={[0, -dir, 0]}>
          <boxGeometry args={[0.35, 0.06, 0.9]} />
          <Mat color={P.wood} />
        </mesh>
      ))}
      {[-0.45, 0.45].map((off) => (
        <mesh key={off} position={[-3.75, 0.5, -2.2 + off]} rotation={[0, -dir, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.8, 5]} />
          <Mat color="#b39b7a" />
        </mesh>
      ))}
    </group>
  )
}

export function Island() {
  return (
    <group>
      <IslandBody />
      <Meadow />
      <Forest />
      <Lake />
      <Wheat />
      <Islet />
    </group>
  )
}

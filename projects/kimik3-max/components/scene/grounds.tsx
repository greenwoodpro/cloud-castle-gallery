'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import { P } from '@/lib/palette'

// 玻璃罩中的独一无二的玫瑰
function DomedRose({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 玉石台座 */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.9, 1.1, 1, 12]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.12, 12]} />
        <meshStandardMaterial color={P.gold} flatShading />
      </mesh>
      {/* 花茎与叶 */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 1.3, 6]} />
        <meshStandardMaterial color={P.grassDark} />
      </mesh>
      {[-0.5, 0.4].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.2, 1.5 + i * 0.3, Math.sin(a) * 0.2]} rotation={[0, 0, a]}>
          <sphereGeometry args={[0.14, 8, 8]} />
          <meshStandardMaterial color={P.leaf} flatShading />
        </mesh>
      ))}
      {/* 花瓣：层层环抱 */}
      <mesh position={[0, 2.45, 0]}>
        <sphereGeometry args={[0.3, 10, 10]} />
        <meshStandardMaterial color={P.roseDark} flatShading />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.24, 2.34, Math.sin(a) * 0.24]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color={P.rose} flatShading />
          </mesh>
        )
      })}
      {/* 四根小刺 */}
      {[0.9, 1.9, 2.9, 3.9].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.08, 1.3 + i * 0.25, Math.sin(a) * 0.08]} rotation={[0, 0, a]}>
          <coneGeometry args={[0.03, 0.12, 5]} />
          <meshStandardMaterial color={P.grassDark} />
        </mesh>
      ))}
      {/* 玻璃罩 */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[1.05, 20, 20]} />
        <meshStandardMaterial color="#eaf6f8" transparent opacity={0.22} roughness={0.1} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.05, 20]} />
        <meshStandardMaterial color="#eaf6f8" transparent opacity={0.3} depthWrite={false} />
      </mesh>
    </group>
  )
}

// 圆形玫瑰园
function RoseGarden({ position }: { position: [number, number, number] }) {
  const bushes = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + 0.4
        return { x: Math.cos(a) * 4.2, z: Math.sin(a) * 4.2 }
      }),
    [],
  )
  return (
    <group position={position}>
      {/* 花坛土壤 */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[6, 6.2, 0.35, 28]} />
        <meshStandardMaterial color={P.earth} flatShading />
      </mesh>
      {/* 绿篱圆环 */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 6.1, 0.55, Math.sin(a) * 6.1]}>
            <sphereGeometry args={[0.75, 10, 10]} />
            <meshStandardMaterial color={P.grassDark} flatShading />
          </mesh>
        )
      })}
      {/* 灌木玫瑰丛 */}
      {bushes.map((b, i) => (
        <group key={i} position={[b.x, 0, b.z]}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <sphereGeometry args={[0.7, 10, 10]} />
            <meshStandardMaterial color={P.leaf} flatShading />
          </mesh>
          {[
            [0.2, 1.15, 0.1],
            [-0.3, 1.0, 0.3],
            [0.1, 0.95, -0.35],
          ].map(([x, y, z], j) => (
            <mesh key={j} position={[x, y, z]}>
              <sphereGeometry args={[0.16, 8, 8]} />
              <meshStandardMaterial color={j % 2 ? P.rose : P.roseDark} flatShading />
            </mesh>
          ))}
        </group>
      ))}
      <DomedRose position={[0, 0.2, 0]} />
    </group>
  )
}

// 金色麦田（实例化麦穗，随风轻摆）
function WheatField({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const stalks = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed
      return () => {
        s = (s * 16807) % 2147483647
        return s / 2147483647
      }
    }
    const rand = rng(42)
    return Array.from({ length: 90 }, () => ({
      x: (rand() - 0.5) * 11,
      z: (rand() - 0.5) * 7,
      r: rand() * Math.PI,
      s: 0.8 + rand() * 0.5,
    }))
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.2) * 0.02
      groupRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.9) * 0.015
    }
  })

  return (
    <group position={position}>
      {/* 田垄 */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[12.5, 0.25, 8.5]} />
        <meshStandardMaterial color={P.earth} flatShading />
      </mesh>
      <group ref={groupRef}>
        <Instances limit={90} position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 1.3, 5]} />
          <meshStandardMaterial color={P.wheat} flatShading />
          {stalks.map((s, i) => (
            <Instance key={i} position={[s.x, 0.65 * s.s, s.z]} rotation={[0, s.r, 0]} scale={[s.s, s.s, s.s]} />
          ))}
        </Instances>
        <Instances limit={90} position={[0, 0.2, 0]}>
          <coneGeometry args={[0.12, 0.5, 5]} />
          <meshStandardMaterial color={P.gold} flatShading />
          {stalks.map((s, i) => (
            <Instance key={i} position={[s.x, 1.35 * s.s, s.z]} rotation={[0, s.r, 0]} scale={s.s} />
          ))}
        </Instances>
      </group>
      {/* 稻草人 */}
      <group position={[4.5, 0, -3]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 2, 6]} />
          <meshStandardMaterial color={P.woodDark} />
        </mesh>
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 1.6, 6]} />
          <meshStandardMaterial color={P.woodDark} />
        </mesh>
        <mesh position={[0, 1.95, 0]}>
          <sphereGeometry args={[0.3, 10, 10]} />
          <meshStandardMaterial color={P.wheat} flatShading />
        </mesh>
        <mesh position={[0, 2.25, 0]}>
          <coneGeometry args={[0.4, 0.4, 8]} />
          <meshStandardMaterial color={P.roof} flatShading />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[0.7, 0.7, 0.4]} />
          <meshStandardMaterial color={P.rose} flatShading />
        </mesh>
      </group>
    </group>
  )
}

// 镜湖：百合、芦苇与湖岸石
function Pond({ position }: { position: [number, number, number] }) {
  const waterRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.78 + Math.sin(clock.elapsedTime * 1.4) * 0.06
    }
  })

  return (
    <group position={position}>
      {/* 湖床与湖水 */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[4.6, 4.6, 0.15, 28]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>
      <mesh ref={waterRef} position={[0, 0.16, 0]}>
        <cylinderGeometry args={[4.3, 4.3, 0.12, 28]} />
        <meshStandardMaterial color={P.water} transparent opacity={0.8} roughness={0.15} />
      </mesh>
      {/* 湖岸石 */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2 + 0.3
        return (
          <mesh key={i} position={[Math.cos(a) * 4.7, 0.2, Math.sin(a) * 4.7]} rotation={[i, i * 0.7, 0]}>
            <sphereGeometry args={[0.4 + (i % 3) * 0.12, 8, 8]} />
            <meshStandardMaterial color={P.rock} flatShading />
          </mesh>
        )
      })}
      {/* 百合叶与莲花 */}
      {[
        [1.2, 0.8],
        [-1.5, 1.4],
        [0.4, -1.8],
        [-2, -1],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.26, z]} rotation={[-Math.PI / 2, 0, i]}>
          <circleGeometry args={[0.45, 10]} />
          <meshStandardMaterial color={P.leaf} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <group position={[1.2, 0.3, 0.8]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.14, 0.08, Math.sin(a) * 0.14]}>
              <sphereGeometry args={[0.11, 8, 8]} />
              <meshStandardMaterial color="#fdf8ee" flatShading />
            </mesh>
          )
        })}
        <mesh position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color={P.gold} />
        </mesh>
      </group>
      {/* 芦苇 */}
      {[
        [3.6, 2.2],
        [4, 1.4],
        [-3.8, 1.8],
        [-3.4, 2.6],
        [2.2, -3.6],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 1.6, 5]} />
            <meshStandardMaterial color={P.grassDark} />
          </mesh>
          <mesh position={[0, 1.7, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.4, 6]} />
            <meshStandardMaterial color={P.wood} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// 圆冠树
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.34, 2.2, 7]} />
        <meshStandardMaterial color={P.trunk} flatShading />
      </mesh>
      <mesh position={[0, 3, 0]} castShadow>
        <sphereGeometry args={[1.5, 12, 12]} />
        <meshStandardMaterial color={P.leaf} flatShading />
      </mesh>
      <mesh position={[1, 2.3, 0.5]}>
        <sphereGeometry args={[0.95, 10, 10]} />
        <meshStandardMaterial color={P.leafLight} flatShading />
      </mesh>
      <mesh position={[-0.9, 2.4, -0.4]}>
        <sphereGeometry args={[0.85, 10, 10]} />
        <meshStandardMaterial color={P.grassDark} flatShading />
      </mesh>
    </group>
  )
}

// 石板小径
function StonePath() {
  const stones = useMemo(
    () => [
      [0, 4.6, 0.9],
      [-0.8, 6.4, 0.75],
      [-2.2, 8, 0.95],
      [-4.2, 9.2, 0.8],
      [-6.6, 10.2, 0.9],
      [-9.2, 11, 0.75],
      [-11.6, 11.6, 0.85],
      [1.6, 6.8, 0.7],
      [3.8, 8, 0.85],
      [6.4, 8.9, 0.75],
      [9, 9.6, 0.9],
      [11.2, 10, 0.7],
    ] as const,
    [],
  )
  return (
    <group>
      {stones.map(([x, z, r], i) => (
        <mesh key={i} position={[x, 0.12, z]} rotation={[0, i * 0.8, 0]} receiveShadow>
          <cylinderGeometry args={[r, r * 1.05, 0.14, 9]} />
          <meshStandardMaterial color={P.path} flatShading />
        </mesh>
      ))}
    </group>
  )
}

// 散落的草丛与野花
function MeadowDetails() {
  const tufts = useMemo(() => {
    const spots: { x: number; z: number; s: number }[] = []
    let seed = 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < 40; i++) {
      const a = rand() * Math.PI * 2
      const r = 8 + rand() * 20
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      // 避开城堡与园区
      if (x > -16 && x < 16 && z > -19 && z < 3) continue
      if (Math.hypot(x + 14, z - 12) < 7.5) continue
      if (Math.abs(x - 12) < 7 && Math.abs(z - 11) < 5) continue
      if (Math.hypot(x - 22, z + 4) < 5.5) continue
      spots.push({ x, z, s: 0.6 + rand() * 0.7 })
    }
    return spots
  }, [])

  const flowers = useMemo(
    () => tufts.filter((_, i) => i % 3 === 0),
    [tufts],
  )

  return (
    <group>
      <Instances limit={40}>
        <coneGeometry args={[0.22, 0.7, 5]} />
        <meshStandardMaterial color={P.grassDark} flatShading />
        {tufts.map((t, i) => (
          <Instance key={i} position={[t.x, 0.35 * t.s, t.z]} scale={t.s} />
        ))}
      </Instances>
      {flowers.map((f, i) => (
        <group key={i} position={[f.x + 0.5, 0, f.z + 0.4]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.6, 5]} />
            <meshStandardMaterial color={P.grassDark} />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshStandardMaterial color={i % 2 ? P.rose : '#fdf8ee'} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// 岛上所有地形园区
export function Grounds() {
  return (
    <group>
      <RoseGarden position={[-14, 0, 12]} />
      <WheatField position={[12, 0, 11]} />
      <Pond position={[22, 0, -4]} />
      <Tree position={[-22, 0, -4]} scale={1.2} />
      <Tree position={[-21, 0, 16]} />
      <Tree position={[5, 0, 17]} scale={0.9} />
      <Tree position={[20, 0, 14]} scale={1.1} />
      <Tree position={[-6, 0, 20]} scale={0.8} />
      <StonePath />
      <MeadowDetails />
    </group>
  )
}

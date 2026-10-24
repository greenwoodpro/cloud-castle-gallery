'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { P } from '@/lib/palette'

// 岛缘瀑布：从镜湖溢出，坠入云海
function Waterfall({ position }: { position: [number, number, number] }) {
  const fallRef = useRef<THREE.Mesh>(null)
  const mistRefs = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (fallRef.current) {
      const mat = fallRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.32 + Math.sin(t * 2.2) * 0.06
    }
    mistRefs.current.forEach((m, i) => {
      if (!m) return
      const s = 1 + Math.sin(t * 1.6 + i * 2.1) * 0.25
      m.scale.setScalar(s)
      const mat = m.material as THREE.MeshStandardMaterial
      mat.opacity = 0.18 + Math.sin(t * 1.3 + i) * 0.08
    })
  })

  return (
    <group position={position}>
      {/* 水流 */}
      <mesh ref={fallRef} position={[0, -8.5, 0]}>
        <cylinderGeometry args={[1.1, 1.7, 17, 10, 1, true]} />
        <meshStandardMaterial
          color={P.water}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* 底部云雾 */}
      {[
        [0, -17.5, 0, 2.6],
        [1.6, -18.5, 0.8, 1.8],
        [-1.4, -18.2, -0.6, 2.0],
      ].map(([x, y, z, r], i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) mistRefs.current[i] = el
          }}
          position={[x, y, z]}
        >
          <sphereGeometry args={[r, 12, 12]} />
          <meshStandardMaterial color={P.cloud} transparent opacity={0.2} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

// 岛底悬挂的发光水晶
function Crystals() {
  const crystals = useMemo(
    () => [
      { pos: [8, -12, 6] as const, s: 1.6 },
      { pos: [-10, -14, 3] as const, s: 2.1 },
      { pos: [2, -17, -6] as const, s: 1.3 },
      { pos: [-4, -11, 12] as const, s: 1.0 },
      { pos: [12, -9, -8] as const, s: 1.2 },
    ],
    [],
  )
  return (
    <group>
      {crystals.map((c, i) => (
        <mesh key={i} position={[c.pos[0], c.pos[1], c.pos[2]]} rotation={[0.3 * i, 0.7 * i, 0.2]}>
          <octahedronGeometry args={[c.s, 0]} />
          <meshStandardMaterial
            color={P.crystal}
            emissive={P.crystal}
            emissiveIntensity={0.55}
            flatShading
          />
        </mesh>
      ))}
    </group>
  )
}

// 岛底垂下的古老树根
function Roots() {
  const roots = useMemo(
    () => [
      { pos: [5, -6, 10] as const, len: 7, tilt: 0.15 },
      { pos: [-8, -7, 8] as const, len: 9, tilt: -0.1 },
      { pos: [-3, -8, -12] as const, len: 6, tilt: 0.2 },
      { pos: [11, -6, -3] as const, len: 8, tilt: -0.18 },
    ],
    [],
  )
  return (
    <group>
      {roots.map((r, i) => (
        <mesh
          key={i}
          position={[r.pos[0], r.pos[1] - r.len / 2, r.pos[2]]}
          rotation={[r.tilt, 0, r.tilt * 0.6]}
        >
          <cylinderGeometry args={[0.18, 0.5, r.len, 6]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
      ))}
    </group>
  )
}

export function FloatingIsland() {
  return (
    <group>
      {/* 草甸表层 */}
      <mesh position={[0, -1.3, 0]} receiveShadow>
        <cylinderGeometry args={[30, 29.2, 2.6, 48]} />
        <meshStandardMaterial color={P.grass} flatShading />
      </mesh>
      {/* 草甸浅色顶面 */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[29.6, 29.6, 0.1, 48]} />
        <meshStandardMaterial color={P.leafLight} flatShading />
      </mesh>
      {/* 泥土层 */}
      <mesh position={[0, -3.4, 0]}>
        <cylinderGeometry args={[29.2, 26.5, 1.8, 48]} />
        <meshStandardMaterial color={P.earth} flatShading />
      </mesh>
      {/* 紫色岩层（三层收分） */}
      <mesh position={[0, -9.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[26.5, 10.5, 24]} />
        <meshStandardMaterial color={P.rock} flatShading />
      </mesh>
      <mesh position={[0, -17, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[17, 7, 20]} />
        <meshStandardMaterial color={P.rockDark} flatShading />
      </mesh>
      <mesh position={[0, -23.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[9.5, 7, 16]} />
        <meshStandardMaterial color={P.rock} flatShading />
      </mesh>
      {/* 岛尖 */}
      <mesh position={[0, -28.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[3.5, 4, 10]} />
        <meshStandardMaterial color={P.rockDark} flatShading />
      </mesh>

      <Crystals />
      <Roots />
      <Waterfall position={[27.5, 0, -4]} />
    </group>
  )
}

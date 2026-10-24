'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { P } from './palette'

interface MatProps {
  color: string
  emissive?: string
  emissiveIntensity?: number
  transparent?: boolean
  opacity?: number
}

export function Mat({ color, emissive, emissiveIntensity = 0, transparent, opacity = 1 }: MatProps) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.95}
      metalness={0}
      emissive={emissive ?? '#000000'}
      emissiveIntensity={emissiveIntensity}
      transparent={transparent}
      opacity={opacity}
    />
  )
}

interface BoxProps {
  size: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  color: string
  castShadow?: boolean
  receiveShadow?: boolean
  opacity?: number
}

export function Box({ size, position, rotation, color, castShadow = true, receiveShadow = true, opacity = 1 }: BoxProps) {
  return (
    <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={size} />
      <Mat color={color} transparent={opacity < 1} opacity={opacity} />
    </mesh>
  )
}

interface GableRoofProps {
  width: number
  depth: number
  height: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  overhang?: number
}

/** 山形屋顶：三角形截面沿 depth 方向挤出 */
export function GableRoof({ width, depth, height, position, rotation, color = P.roof, overhang = 0.25 }: GableRoofProps) {
  const geometry = useMemo(() => {
    const w = width / 2 + overhang
    const shape = new THREE.Shape()
    shape.moveTo(-w, 0)
    shape.lineTo(w, 0)
    shape.lineTo(0, height)
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, { depth: depth + overhang * 2, bevelEnabled: false })
    geo.translate(0, 0, -(depth + overhang * 2) / 2)
    return geo
  }, [width, depth, height, overhang])

  return (
    <mesh geometry={geometry} position={position} rotation={rotation} castShadow receiveShadow>
      <Mat color={color} />
    </mesh>
  )
}

interface TowerProps {
  position: [number, number, number]
  radius: number
  height: number
  roofHeight?: number
  color?: string
  roofColor?: string
  flag?: boolean
  windows?: boolean
}

/** 圆形塔楼 + 锥形屋顶 */
export function RoundTower({ position, radius, height, roofHeight = radius * 1.8, color = P.stone, roofColor = P.roof, flag = true, windows = true }: TowerProps) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius * 1.08, height, 24]} />
        <Mat color={color} />
      </mesh>
      {/* 塔顶环形雉堞 */}
      <mesh position={[0, height + 0.12, 0]} castShadow>
        <cylinderGeometry args={[radius * 1.15, radius * 1.05, 0.25, 24]} />
        <Mat color={P.stoneShade} />
      </mesh>
      <mesh position={[0, height + 0.25 + roofHeight / 2, 0]} castShadow>
        <coneGeometry args={[radius * 1.2, roofHeight, 24]} />
        <Mat color={roofColor} />
      </mesh>
      {windows && (
        <>
          <Window position={[0, height * 0.65, radius + 0.01]} />
          <Window position={[0, height * 0.35, radius + 0.01]} />
        </>
      )}
      {flag && <Flag position={[0, height + 0.25 + roofHeight, 0]} />}
    </group>
  )
}

export function Window({ position, rotation, lit = false }: { position: [number, number, number]; rotation?: [number, number, number]; lit?: boolean }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[0.22, 0.4, 0.04]} />
      <Mat color={lit ? P.lamp : '#5b6f8a'} emissive={lit ? P.lamp : '#000'} emissiveIntensity={lit ? 1.2 : 0} />
    </mesh>
  )
}

export function Flag({ position, color = P.red }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.8, 6]} />
        <Mat color={P.woodDark} />
      </mesh>
      <mesh position={[0.22, 0.65, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.18, 0.45, 3]} />
        <Mat color={color} />
      </mesh>
    </group>
  )
}

/** 雉堞：沿 length 方向排列的小方块 */
export function Crenellation({ length, position, rotation, count }: { length: number; position: [number, number, number]; rotation?: [number, number, number]; count?: number }) {
  const n = count ?? Math.max(3, Math.floor(length / 0.9))
  const items = useMemo(() => Array.from({ length: n }, (_, i) => -length / 2 + (i + 0.5) * (length / n)), [n, length])
  return (
    <group position={position} rotation={rotation}>
      {items.map((x) => (
        <mesh key={x} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.6]} />
          <Mat color={P.stoneShade} />
        </mesh>
      ))}
    </group>
  )
}

export function Tree({ position, scale = 1, round = false }: { position: [number, number, number]; scale?: number; round?: boolean }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.16, 1, 8]} />
        <Mat color={P.trunk} />
      </mesh>
      {round ? (
        <>
          <mesh position={[0, 1.4, 0]} castShadow>
            <sphereGeometry args={[0.75, 16, 12]} />
            <Mat color={P.leaf} />
          </mesh>
          <mesh position={[0.35, 1.7, 0.2]} castShadow>
            <sphereGeometry args={[0.45, 12, 10]} />
            <Mat color={P.leafDark} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[0, 1.3, 0]} castShadow>
            <coneGeometry args={[0.65, 1.2, 10]} />
            <Mat color={P.leafDark} />
          </mesh>
          <mesh position={[0, 1.95, 0]} castShadow>
            <coneGeometry args={[0.45, 0.9, 10]} />
            <Mat color={P.leaf} />
          </mesh>
        </>
      )}
    </group>
  )
}

/** 猴面包树：粗壮树干 + 平顶巨大的树冠 */
export function Baobab({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.6, 2.4, 10]} />
        <Mat color={P.trunk} />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.5, 2.6, Math.sin(a) * 0.5]} rotation={[Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6]} castShadow>
            <cylinderGeometry args={[0.08, 0.18, 1, 6]} />
            <Mat color={P.trunk} />
          </mesh>
        )
      })}
      <mesh position={[0, 3.1, 0]} castShadow>
        <sphereGeometry args={[1.3, 16, 10]} />
        <Mat color={P.leaf} />
      </mesh>
    </group>
  )
}

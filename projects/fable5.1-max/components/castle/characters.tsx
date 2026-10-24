'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { Mat } from './primitives'
import { P } from './palette'

interface FigureProps {
  body: string
  hair?: string
  hat?: 'crown' | 'helmet' | 'cap' | 'none'
  scarf?: string
  cape?: string
  scale?: number
}

/** 通用小人：圆头、锥形身体，略带呼吸起伏 */
export function Figure({ body, hair = P.hair, hat = 'none', scarf, cape, scale = 1 }: FigureProps) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.6 + scale * 7) * 0.015
  })
  return (
    <group ref={ref} scale={scale}>
      {cape && (
        <mesh position={[0, 0.42, -0.08]} castShadow>
          <coneGeometry args={[0.36, 0.9, 12, 1, false, Math.PI * 0.5, Math.PI]} />
          <Mat color={cape} />
        </mesh>
      )}
      <mesh position={[0, 0.42, 0]} castShadow>
        <coneGeometry args={[0.26, 0.85, 12]} />
        <Mat color={body} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 12]} />
        <Mat color={P.skin} />
      </mesh>
      {/* 头发 */}
      <mesh position={[0, 1.1, -0.02]} castShadow>
        <sphereGeometry args={[0.23, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <Mat color={hair} />
      </mesh>
      {scarf && (
        <>
          <mesh position={[0, 0.8, 0]}>
            <torusGeometry args={[0.2, 0.06, 8, 16]} />
            <Mat color={scarf} />
          </mesh>
          <mesh position={[0.28, 0.72, -0.1]} rotation={[0, 0, -0.9]}>
            <boxGeometry args={[0.1, 0.5, 0.06]} />
            <Mat color={scarf} />
          </mesh>
        </>
      )}
      {hat === 'crown' && (
        <mesh position={[0, 1.26, 0]}>
          <cylinderGeometry args={[0.17, 0.14, 0.18, 8]} />
          <Mat color={P.gold} emissive={P.gold} emissiveIntensity={0.3} />
        </mesh>
      )}
      {hat === 'helmet' && (
        <mesh position={[0, 1.06, 0]}>
          <sphereGeometry args={[0.25, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <Mat color={P.silver} />
        </mesh>
      )}
      {hat === 'cap' && (
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.2, 0.26, 0.14, 12]} />
          <Mat color={P.woodDark} />
        </mesh>
      )}
    </group>
  )
}

export function LittlePrince() {
  return (
    <group>
      <Figure body={P.prince} hair={P.hair} scarf="#f6d85a" />
      {/* 小王子的黄色围巾飘带 */}
    </group>
  )
}

export function Fox() {
  const tail = useRef<Group>(null)
  useFrame((state) => {
    if (tail.current) tail.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.4
  })
  return (
    <group scale={0.6}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 14, 10]} />
        <Mat color={P.fox} />
      </mesh>
      <mesh position={[0.3, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.22, 14, 10]} />
        <Mat color={P.fox} />
      </mesh>
      <mesh position={[0.5, 0.45, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.1, 0.25, 8]} />
        <Mat color="#ffffff" />
      </mesh>
      {[-0.1, 0.1].map((z) => (
        <mesh key={z} position={[0.3, 0.72, z]}>
          <coneGeometry args={[0.07, 0.2, 6]} />
          <Mat color={P.fox} />
        </mesh>
      ))}
      <group ref={tail} position={[-0.3, 0.35, 0]}>
        <mesh position={[-0.2, 0.1, 0]} rotation={[0, 0, Math.PI / 2 + 0.6]}>
          <coneGeometry args={[0.12, 0.5, 8]} />
          <Mat color={P.fox} />
        </mesh>
        <mesh position={[-0.42, 0.26, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <Mat color="#ffffff" />
        </mesh>
      </group>
    </group>
  )
}

export function Sheep({ position, rotation }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation ?? 0, 0]} scale={0.55}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.4, 12, 10]} />
        <Mat color="#fbfbf7" />
      </mesh>
      <mesh position={[0.38, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.18, 10, 8]} />
        <Mat color="#4b4a55" />
      </mesh>
      {[
        [-0.18, 0.12],
        [0.18, 0.12],
        [-0.18, -0.12],
        [0.18, -0.12],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.1, z]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 6]} />
          <Mat color="#4b4a55" />
        </mesh>
      ))}
    </group>
  )
}

export function Horse({ position, rotation, color = P.wood }: { position: [number, number, number]; rotation?: number; color?: string }) {
  return (
    <group position={position} rotation={[0, rotation ?? 0, 0]} scale={0.7}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1, 0.5, 0.45]} />
        <Mat color={color} />
      </mesh>
      <mesh position={[0.55, 1.05, 0]} rotation={[0, 0, -0.6]} castShadow>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <Mat color={color} />
      </mesh>
      <mesh position={[0.72, 1.25, 0]} castShadow>
        <boxGeometry args={[0.4, 0.28, 0.28]} />
        <Mat color={color} />
      </mesh>
      {[
        [-0.35, 0.15],
        [0.35, 0.15],
        [-0.35, -0.15],
        [0.35, -0.15],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.25, z]}>
          <cylinderGeometry args={[0.07, 0.07, 0.5, 6]} />
          <Mat color={P.woodDark} />
        </mesh>
      ))}
    </group>
  )
}

export function Birds() {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.25
    ref.current.children.forEach((c, i) => {
      c.position.y = 13 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.4
    })
  })
  return (
    <group ref={ref}>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2
        const r = 9 + (i % 3)
        return (
          <group key={i} position={[Math.cos(a) * r, 13, Math.sin(a) * r]} rotation={[0, -a + Math.PI / 2, 0]}>
            <mesh rotation={[0, 0, 0.5]} position={[-0.2, 0, 0]}>
              <boxGeometry args={[0.45, 0.04, 0.1]} />
              <Mat color="#ffffff" />
            </mesh>
            <mesh rotation={[0, 0, -0.5]} position={[0.2, 0, 0]}>
              <boxGeometry args={[0.45, 0.04, 0.1]} />
              <Mat color="#ffffff" />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

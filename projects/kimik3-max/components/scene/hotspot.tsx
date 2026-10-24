'use client'

import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

interface HotspotProps {
  position: [number, number, number]
  label: string
  selected: boolean
  onSelect: () => void
}

// 可点击的发光标记：呼吸的光球 + 悬停标签
export function Hotspot({ position, label, selected, onSelect }: HotspotProps) {
  const [hovered, setHovered] = useState(false)
  const orbRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (orbRef.current) {
      orbRef.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.16)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.45 + Math.sin(t * 2.4) * 0.2
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={orbRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial
          color={selected ? '#ff9d5c' : hovered ? '#ffe9b0' : '#ffd27d'}
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[0.72, 0.045, 8, 32]} />
        <meshBasicMaterial color="#ffcf7d" transparent opacity={0.5} depthWrite={false} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={55} position={[0, 1.1, 0]} zIndexRange={[20, 0]}>
          <div className="pointer-events-none rounded-full border border-border bg-card/95 px-3 py-1 font-serif text-sm font-bold whitespace-nowrap text-card-foreground shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

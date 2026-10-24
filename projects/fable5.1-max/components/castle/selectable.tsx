'use client'

import { useRef, useState, type ReactNode } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Group } from 'three'
import { useScene } from '@/lib/scene-store'
import { findItem } from '@/lib/castle-data'

interface SelectableProps {
  id: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  labelOffset?: number
  children: ReactNode
}

export function Selectable({ id, position, rotation, labelOffset = 3, children }: SelectableProps) {
  const ref = useRef<Group>(null)
  const { selected, setSelected } = useScene()
  const [hovered, setHovered] = useState(false)
  const isSelected = selected === id
  const item = findItem(id)

  useFrame((state) => {
    if (!ref.current) return
    const target = isSelected ? 1.04 : hovered ? 1.02 : 1
    const s = ref.current.scale.x + (target - ref.current.scale.x) * 0.15
    ref.current.scale.setScalar(s)
    if (isSelected) {
      ref.current.position.y = (position?.[1] ?? 0) + Math.sin(state.clock.elapsedTime * 2) * 0.05
    } else {
      ref.current.position.y = position?.[1] ?? 0
    }
  })

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    setSelected(isSelected ? null : id)
  }

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={handleClick}
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
      {children}
      {(hovered || isSelected) && item && (
        <Html position={[0, labelOffset, 0]} center distanceFactor={18} zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
          <div className="whitespace-nowrap rounded-full bg-card/90 px-3 py-1 font-serif text-sm text-card-foreground shadow-md backdrop-blur">
            {item.name}
          </div>
        </Html>
      )}
    </group>
  )
}

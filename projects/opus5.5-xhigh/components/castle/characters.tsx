'use client'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { PALETTE, Part, Toon, seeded } from './materials'
import type { Vec3 } from './layout'

type Hat = 'none' | 'crown' | 'helmet' | 'straw' | 'wizard' | 'hood' | 'kerchief' | 'cap'
type Pose = 'idle' | 'walk' | 'hammer' | 'wave' | 'look' | 'bend' | 'pole'

type FigureProps = {
  position?: Vec3
  rotation?: number
  scale?: number
  robe: string
  trim?: string
  hat?: Hat
  hatColor?: string
  hair?: string
  pose?: Pose
  cape?: string
  phase?: number
  children?: React.ReactNode
}

export function Figure({
  position = [0, 0, 0],
  rotation = 0,
  scale = 1,
  robe,
  trim,
  hat = 'none',
  hatColor = PALETTE.gold,
  hair = PALETTE.woodDark,
  pose = 'idle',
  cape,
  phase = 0,
  children,
}: FigureProps) {
  const leftArm = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase
    if (!leftArm.current || !rightArm.current || !body.current) return
    switch (pose) {
      case 'walk': {
        const s = Math.sin(t * 6)
        leftArm.current.rotation.x = s * 0.6
        rightArm.current.rotation.x = -s * 0.6
        body.current.position.y = Math.abs(Math.cos(t * 6)) * 0.015
        break
      }
      case 'hammer': {
        const h = Math.max(0, Math.sin(t * 4))
        rightArm.current.rotation.x = -1.6 + h * 1.4
        leftArm.current.rotation.x = -0.6
        break
      }
      case 'wave': {
        rightArm.current.rotation.z = 2.4 + Math.sin(t * 5) * 0.35
        break
      }
      case 'look': {
        leftArm.current.rotation.x = -1.3
        rightArm.current.rotation.x = -1.1
        body.current.rotation.x = Math.sin(t * 0.6) * 0.03
        break
      }
      case 'bend': {
        body.current.rotation.x = 0.45 + Math.sin(t * 1.5) * 0.08
        leftArm.current.rotation.x = -0.9 + Math.sin(t * 3) * 0.3
        rightArm.current.rotation.x = -0.9 - Math.sin(t * 3) * 0.3
        break
      }
      case 'pole': {
        rightArm.current.rotation.x = -0.4
        leftArm.current.rotation.x = -0.2 + Math.sin(t) * 0.05
        break
      }
      default: {
        body.current.position.y = Math.sin(t * 1.4) * 0.006
        leftArm.current.rotation.x = Math.sin(t * 1.2) * 0.05
        rightArm.current.rotation.x = -Math.sin(t * 1.2) * 0.05
      }
    }
  })

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <group ref={body}>
        <Part color={robe} position={[0, 0.17, 0]} outline outlineThickness={0.008}>
          <cylinderGeometry args={[0.075, 0.15, 0.34, 12]} />
        </Part>
        {trim && (
          <Part color={trim} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.152, 0.155, 0.04, 12]} />
          </Part>
        )}
        <Part color={PALETTE.skin} position={[0, 0.42, 0]} outline outlineThickness={0.008}>
          <sphereGeometry args={[0.085, 16, 12]} />
        </Part>
        {hat !== 'helmet' && hat !== 'hood' && (
          <Part color={hair} position={[0, 0.45, -0.012]} scale={[1, 0.8, 1]}>
            <sphereGeometry args={[0.088, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </Part>
        )}
        <HatMesh hat={hat} color={hatColor} />
        {cape && (
          <Part color={cape} position={[0, 0.18, -0.05]} rotation={[0.12, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.19, 0.38, 14, 1, true, Math.PI * 0.6, Math.PI * 0.8]} />
          </Part>
        )}
        <group ref={leftArm} position={[-0.1, 0.3, 0]}>
          <Part color={robe} position={[0, -0.08, 0]} rotation={[0, 0, 0.15]}>
            <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
          </Part>
        </group>
        <group ref={rightArm} position={[0.1, 0.3, 0]}>
          <Part color={robe} position={[0, -0.08, 0]} rotation={[0, 0, -0.15]}>
            <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
          </Part>
          {children}
        </group>
      </group>
    </group>
  )
}

function HatMesh({ hat, color }: { hat: Hat; color: string }) {
  switch (hat) {
    case 'crown':
      return (
        <group position={[0, 0.51, 0]}>
          <Part color={color} emissive={color} emissiveIntensity={0.15}>
            <cylinderGeometry args={[0.065, 0.06, 0.05, 10, 1, true]} />
          </Part>
          {Array.from({ length: 5 }).map((_, i) => {
            const a = (i / 5) * Math.PI * 2
            return (
              <Part key={i} color={color} position={[Math.cos(a) * 0.06, 0.04, Math.sin(a) * 0.06]}>
                <coneGeometry args={[0.014, 0.04, 4]} />
              </Part>
            )
          })}
        </group>
      )
    case 'helmet':
      return (
        <group position={[0, 0.44, 0]}>
          <Part color={PALETTE.roofSlate} outline outlineThickness={0.006}>
            <sphereGeometry args={[0.094, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          </Part>
          <Part color={PALETTE.roofSlate} position={[0, -0.03, 0.09]}>
            <boxGeometry args={[0.014, 0.07, 0.01]} />
          </Part>
        </group>
      )
    case 'straw':
      return (
        <group position={[0, 0.5, 0]}>
          <Part color={PALETTE.thatch} outline outlineThickness={0.006}>
            <cylinderGeometry args={[0.15, 0.15, 0.012, 16]} />
          </Part>
          <Part color={PALETTE.thatch} position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.06, 0.075, 0.06, 12]} />
          </Part>
        </group>
      )
    case 'wizard':
      return (
        <group position={[0, 0.5, 0]}>
          <Part color={color} outline outlineThickness={0.006}>
            <cylinderGeometry args={[0.13, 0.13, 0.01, 16]} />
          </Part>
          <Part color={color} position={[0, 0.11, 0]} rotation={[0.1, 0, 0.08]}>
            <coneGeometry args={[0.075, 0.24, 12]} />
          </Part>
          <Part color={PALETTE.gold} position={[0.02, 0.1, 0.06]} emissive={PALETTE.gold} emissiveIntensity={0.5}>
            <octahedronGeometry args={[0.015]} />
          </Part>
        </group>
      )
    case 'hood':
      return (
        <Part color={color} position={[0, 0.44, -0.01]} outline outlineThickness={0.006}>
          <sphereGeometry args={[0.1, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        </Part>
      )
    case 'kerchief':
      return (
        <Part color={color} position={[0, 0.465, -0.01]} scale={[1, 0.7, 1]}>
          <sphereGeometry args={[0.094, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </Part>
      )
    case 'cap':
      return (
        <group position={[0, 0.49, 0]}>
          <Part color={color}>
            <cylinderGeometry args={[0.07, 0.08, 0.05, 12]} />
          </Part>
          <Part color={color} position={[0, 0.03, 0.02]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.03, 0.09, 8]} />
          </Part>
        </group>
      )
    default:
      return null
  }
}

export function Patroller({
  from,
  to,
  speed = 0.35,
  phase = 0,
  ...figure
}: Omit<FigureProps, 'position' | 'rotation' | 'pose'> & { from: Vec3; to: Vec3; speed?: number }) {
  const group = useRef<THREE.Group>(null)
  const a = useMemo(() => new THREE.Vector3(...from), [from])
  const b = useMemo(() => new THREE.Vector3(...to), [to])
  const forward = Math.atan2(b.x - a.x, b.z - a.z)

  useFrame(({ clock }) => {
    if (!group.current) return
    const len = a.distanceTo(b)
    const cycle = (clock.elapsedTime * speed + phase) % (len * 2)
    const goingOut = cycle < len
    const d = goingOut ? cycle / len : 2 - cycle / len
    group.current.position.lerpVectors(a, b, d)
    group.current.rotation.y = goingOut ? forward : forward + Math.PI
  })

  return (
    <group ref={group}>
      <Figure {...figure} pose="walk" phase={phase}>
        <Part color={PALETTE.woodDark} position={[0, 0.05, 0.03]}>
          <cylinderGeometry args={[0.008, 0.008, 0.75, 5]} />
        </Part>
        <Part color={PALETTE.roofSlate} position={[0, 0.44, 0.03]}>
          <coneGeometry args={[0.02, 0.07, 4]} />
        </Part>
      </Figure>
    </group>
  )
}

export function Fox({ position, rotation = 0 }: { position: Vec3; rotation?: number }) {
  const tail = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (tail.current) tail.current.rotation.y = Math.sin(t * 1.6) * 0.35
    if (head.current) head.current.rotation.y = Math.sin(t * 0.4) * 0.4
  })
  const orange = '#e8935a'
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={1.1}>
      <Part color={orange} position={[0, 0.13, 0]} rotation={[-0.5, 0, 0]} scale={[0.85, 1.25, 0.9]} outline outlineThickness={0.008}>
        <sphereGeometry args={[0.1, 14, 12]} />
      </Part>
      <Part color={PALETTE.snow} position={[0, 0.15, 0.06]} scale={[0.6, 1, 0.5]}>
        <sphereGeometry args={[0.08, 12, 10]} />
      </Part>
      <group ref={head} position={[0, 0.29, 0.03]}>
        <Part color={orange} outline outlineThickness={0.008}>
          <sphereGeometry args={[0.075, 14, 12]} />
        </Part>
        <Part color={orange} position={[0, -0.015, 0.075]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.04, 0.09, 10]} />
        </Part>
        <Part color={PALETTE.ink} position={[0, -0.015, 0.12]}>
          <sphereGeometry args={[0.012, 8, 8]} />
        </Part>
        {[-1, 1].map((s) => (
          <Part key={s} color={orange} position={[s * 0.045, 0.075, -0.005]} rotation={[0, 0, -s * 0.2]} outline outlineThickness={0.006}>
            <coneGeometry args={[0.025, 0.07, 6]} />
          </Part>
        ))}
        {[-1, 1].map((s) => (
          <mesh key={`e${s}`} position={[s * 0.03, 0.015, 0.062]}>
            <sphereGeometry args={[0.009, 6, 6]} />
            <meshBasicMaterial color={PALETTE.ink} />
          </mesh>
        ))}
      </group>
      <group ref={tail} position={[0, 0.06, -0.09]}>
        <Part color={orange} position={[0.06, 0.02, -0.12]} rotation={[0.2, 0.5, Math.PI / 2.2]} scale={[1, 2.2, 1]} outline outlineThickness={0.008}>
          <sphereGeometry args={[0.055, 12, 10]} />
        </Part>
        <Part color={PALETTE.snow} position={[0.14, 0.03, -0.2]}>
          <sphereGeometry args={[0.04, 10, 8]} />
        </Part>
      </group>
    </group>
  )
}

export function Sheep({ position, rotation = 0, phase = 0 }: { position: Vec3; rotation?: number; phase?: number }) {
  const ref = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase
    if (head.current) head.current.rotation.x = 0.4 + Math.max(0, Math.sin(t * 0.8)) * 0.5
    if (ref.current) ref.current.position.y = position[1] + Math.abs(Math.sin(t * 0.5)) * 0.004
  })
  const puffs = useMemo(() => {
    const r = seeded(Math.floor(phase * 1000) + 7)
    return Array.from({ length: 7 }).map(() => [
      (r() - 0.5) * 0.18,
      0.2 + r() * 0.07,
      (r() - 0.5) * 0.26,
    ]) as Vec3[]
  }, [phase])
  return (
    <group ref={ref} position={position} rotation={[0, rotation, 0]}>
      {puffs.map((p, i) => (
        <Part key={i} color={PALETTE.snow} position={p} outline={i === 0} outlineThickness={0.006}>
          <sphereGeometry args={[0.085, 10, 8]} />
        </Part>
      ))}
      <group ref={head} position={[0, 0.22, 0.17]}>
        <Part color={PALETTE.ink} position={[0, 0, 0.05]} scale={[0.8, 0.9, 1.2]}>
          <sphereGeometry args={[0.05, 10, 8]} />
        </Part>
      </group>
      {[
        [-0.06, 0.08],
        [0.06, 0.08],
        [-0.06, -0.08],
        [0.06, -0.08],
      ].map(([x, z], i) => (
        <Part key={`l${i}`} color={PALETTE.ink} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.014, 0.014, 0.12, 5]} />
        </Part>
      ))}
    </group>
  )
}

export function Horse({ position, rotation = 0 }: { position: Vec3; rotation?: number }) {
  const head = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (head.current) head.current.rotation.x = Math.sin(clock.elapsedTime * 0.7) * 0.15
  })
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={0.9}>
      <Part color={PALETTE.snow} position={[0, 0.36, 0]} scale={[1, 0.9, 1.7]} outline outlineThickness={0.008}>
        <sphereGeometry args={[0.13, 14, 10]} />
      </Part>
      {[
        [-0.07, 0.14],
        [0.07, 0.14],
        [-0.07, -0.14],
        [0.07, -0.14],
      ].map(([x, z], i) => (
        <Part key={i} color={PALETTE.snow} position={[x, 0.15, z]}>
          <cylinderGeometry args={[0.025, 0.02, 0.3, 6]} />
        </Part>
      ))}
      <group ref={head} position={[0, 0.45, 0.2]}>
        <Part color={PALETTE.snow} position={[0, 0.08, 0.04]} rotation={[0.6, 0, 0]} outline outlineThickness={0.008}>
          <capsuleGeometry args={[0.05, 0.14, 4, 8]} />
        </Part>
        <Part color={PALETTE.stoneShade} position={[0, 0.16, -0.02]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[0.02, 0.14, 0.05]} />
        </Part>
      </group>
      <Part color={PALETTE.stoneShade} position={[0, 0.34, -0.24]} rotation={[-0.5, 0, 0]}>
        <coneGeometry args={[0.03, 0.18, 6]} />
      </Part>
    </group>
  )
}

export function LittlePrince({ position, rotation = 0 }: { position: Vec3; rotation?: number }) {
  const scarf = useRef<THREE.Mesh>(null)
  const scarfGeo = useMemo(() => new THREE.PlaneGeometry(0.06, 0.5, 1, 12), [])
  const base = useMemo(() => Float32Array.from(scarfGeo.attributes.position.array), [scarfGeo])

  useFrame(({ clock }) => {
    if (!scarf.current) return
    const t = clock.elapsedTime
    const pos = scarfGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const y = base[i * 3 + 1]
      const k = (0.25 - y) / 0.5
      pos.setX(i, base[i * 3] + Math.sin(t * 4 + k * 5) * 0.03 * k)
      pos.setZ(i, Math.sin(t * 3 + k * 4) * 0.06 * k)
    }
    pos.needsUpdate = true
  })

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={1.6}>
      <Figure robe="#7fb07a" trim={PALETTE.gold} hair={PALETTE.wheat} pose="idle" phase={2} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Part
          key={i}
          color={PALETTE.wheat}
          position={[Math.cos(i * 1.3) * 0.07, 0.5 + (i % 2) * 0.01, Math.sin(i * 1.3) * 0.05 - 0.01]}
          rotation={[Math.sin(i) * 0.6, 0, Math.cos(i) * 0.7]}
        >
          <coneGeometry args={[0.02, 0.06, 5]} />
        </Part>
      ))}
      <Part color={PALETTE.wheat} position={[0, 0.33, 0]}>
        <torusGeometry args={[0.06, 0.018, 8, 16]} />
      </Part>
      <mesh ref={scarf} geometry={scarfGeo} position={[0.05, 0.33, -0.06]} rotation={[0, 0, Math.PI / 2.2]}>
        <Toon color={PALETTE.wheat} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

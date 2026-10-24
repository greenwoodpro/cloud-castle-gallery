'use client'

import * as THREE from 'three'
import { Instance, Instances } from '@react-three/drei'
import { useMemo } from 'react'
import { PALETTE, Part, Toon, getGradientMap } from './materials'
import { Barrel, Candle, Crate, Fire, Flag, Gable, Sack, Window } from './props'
import { Figure, Horse, Patroller } from './characters'
import {
  CASTLE_ORIGIN,
  CHAPEL_LOCAL,
  FLOOR_HEIGHT,
  FORGE_LOCAL,
  KEEP_FLOORS,
  KEEP_LOCAL,
  KEEP_SIZE,
  TOWER_RADIUS,
  WALL_HALF,
  WALL_HEIGHT,
  WELL_LOCAL,
  type Vec3,
} from './layout'

const WALL_THICK = 0.5
const MERLON = { w: 0.2, h: 0.28, d: 0.13, gap: 0.42 }

type MerlonSpec = { position: Vec3; rotation: number }

function lineMerlons(a: [number, number], b: [number, number], y: number, outward: [number, number], inset: number): MerlonSpec[] {
  const dx = b[0] - a[0]
  const dz = b[1] - a[1]
  const len = Math.hypot(dx, dz)
  const count = Math.max(1, Math.floor(len / MERLON.gap))
  const rot = Math.atan2(dx, dz) + Math.PI / 2
  const out: MerlonSpec[] = []
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count
    out.push({
      position: [a[0] + dx * t + outward[0] * inset, y + MERLON.h / 2, a[1] + dz * t + outward[1] * inset],
      rotation: rot,
    })
  }
  return out
}

function ringMerlons(center: Vec3, radius: number, y: number, count: number): MerlonSpec[] {
  return Array.from({ length: count }).map((_, i) => {
    const a = (i / count) * Math.PI * 2
    return {
      position: [center[0] + Math.sin(a) * radius, y + MERLON.h / 2, center[2] + Math.cos(a) * radius] as Vec3,
      rotation: a,
    }
  })
}

function Tower({
  position,
  height,
  radius = TOWER_RADIUS,
  roof,
  roofHeight = 2.2,
  flagColor,
  windowRows = 2,
}: {
  position: Vec3
  height: number
  radius?: number
  roof?: string
  roofHeight?: number
  flagColor?: string
  windowRows?: number
}) {
  const windows = useMemo(() => {
    const list: { pos: Vec3; rot: number }[] = []
    for (let row = 0; row < windowRows; row++) {
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + row * 0.9 + 0.4
        list.push({
          pos: [Math.sin(a) * (radius + 0.005), 1.3 + row * ((height - 1.8) / Math.max(1, windowRows - 1 || 1)), Math.cos(a) * (radius + 0.005)],
          rot: a,
        })
      }
    }
    return list
  }, [height, radius, windowRows])

  return (
    <group position={position}>
      <Part color={PALETTE.stone} position={[0, height / 2, 0]} outline>
        <cylinderGeometry args={[radius, radius * 1.08, height, 24]} />
      </Part>
      <Part color={PALETTE.stoneShade} position={[0, 0.25, 0]}>
        <cylinderGeometry args={[radius * 1.14, radius * 1.18, 0.5, 24]} />
      </Part>
      {windows.map((w, i) => (
        <Window key={i} position={w.pos} rotation={w.rot} />
      ))}
      {roof && (
        <>
          <Part color={PALETTE.stoneShade} position={[0, height + 0.08, 0]} outline>
            <cylinderGeometry args={[radius * 1.15, radius * 1.05, 0.16, 24]} />
          </Part>
          <Part color={roof} position={[0, height + 0.16 + roofHeight / 2, 0]} outline outlineThickness={0.03}>
            <coneGeometry args={[radius * 1.28, roofHeight, 24]} />
          </Part>
          {flagColor && <Flag position={[0, height + 0.12 + roofHeight, 0]} color={flagColor} poleHeight={0.7} size={[0.45, 0.28]} phase={position[0]} />}
        </>
      )}
    </group>
  )
}

function Gatehouse() {
  const z = WALL_HALF
  return (
    <group position={[0, 0, z]}>
      <Tower position={[-1.15, 0, 0.15]} height={3.9} radius={0.72} roof={PALETTE.roofRose} roofHeight={1.6} windowRows={1} />
      <Tower position={[1.15, 0, 0.15]} height={3.9} radius={0.72} roof={PALETTE.roofRose} roofHeight={1.6} windowRows={1} />
      <Part color={PALETTE.stone} position={[0, 1.75, 0]} outline>
        <boxGeometry args={[1.7, 3.5, 1.3]} />
      </Part>
      <Part color={PALETTE.ink} position={[0, 0.6, 0.62]}>
        <boxGeometry args={[0.85, 1.2, 0.08]} />
      </Part>
      <Part color={PALETTE.ink} position={[0, 1.2, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.425, 0.425, 0.08, 16, 1, false, Math.PI / 2, Math.PI]} />
      </Part>
      <group position={[0, 1.05, 0.68]}>
        {[-0.3, -0.15, 0, 0.15, 0.3].map((x) => (
          <Part key={x} color={PALETTE.rockDark} position={[x, 0, 0]}>
            <boxGeometry args={[0.03, 0.9, 0.03]} />
          </Part>
        ))}
        {[-0.3, 0, 0.3].map((y) => (
          <Part key={`h${y}`} color={PALETTE.rockDark} position={[0, y, 0]}>
            <boxGeometry args={[0.72, 0.03, 0.03]} />
          </Part>
        ))}
      </group>
      <Window position={[0, 2.5, 0.66]} width={0.22} height={0.3} />
      <Part color={PALETTE.wood} position={[0, 0.06, 1.65]} outline outlineThickness={0.015}>
        <boxGeometry args={[0.9, 0.1, 2]} />
      </Part>
      {[-0.4, 0.4].map((x) => (
        <Part key={x} color={PALETTE.ink} position={[x, 1.1, 1.3]} rotation={[0.72, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 2.1, 4]} />
        </Part>
      ))}
      <Flag position={[0, 3.5, 0]} poleHeight={1} />
    </group>
  )
}

function Keep({ cutaway }: { cutaway: boolean }) {
  const S = KEEP_SIZE
  const H = FLOOR_HEIGHT * KEEP_FLOORS
  const T = 0.3
  const inner = S - T * 2

  const stairSteps = useMemo(() => {
    const steps: { y: number; a: number }[] = []
    const perFloor = 14
    const total = perFloor * KEEP_FLOORS
    const start = 0.8
    for (let i = 0; i < total; i++) {
      steps.push({ y: start + (i * (H - start)) / total, a: -(i / perFloor) * Math.PI * 2 })
    }
    return steps
  }, [])

  const sideWindows = (floor: number) => {
    const y = floor * FLOOR_HEIGHT + 1.15
    return [
      <Window key={`l${floor}`} position={[-S / 2 - 0.005, y, 0.4]} rotation={-Math.PI / 2} width={0.2} height={0.34} />,
      <Window key={`r${floor}`} position={[S / 2 + 0.005, y, -0.4]} rotation={Math.PI / 2} width={0.2} height={0.34} />,
      <Window key={`b${floor}`} position={[0.5, y, -S / 2 - 0.005]} rotation={Math.PI} width={0.2} height={0.34} />,
    ]
  }

  return (
    <group position={KEEP_LOCAL}>
      <Part color={PALETTE.stoneShade} position={[0, 0.35, 0]} outline>
        <boxGeometry args={[S + 0.4, 0.7, S + 0.4]} />
      </Part>
      <Part color={PALETTE.stone} position={[0, H / 2, -S / 2 + T / 2]} outline>
        <boxGeometry args={[S, H, T]} />
      </Part>
      <Part color={PALETTE.stone} position={[-S / 2 + T / 2, H / 2, 0]} outline>
        <boxGeometry args={[T, H, S]} />
      </Part>
      <Part color={PALETTE.stone} position={[S / 2 - T / 2, H / 2, 0]} outline>
        <boxGeometry args={[T, H, S]} />
      </Part>
      {!cutaway && (
        <group>
          <Part color={PALETTE.stone} position={[0, H / 2, S / 2 - T / 2]} outline>
            <boxGeometry args={[S, H, T]} />
          </Part>
          {[0, 1, 2].map((f) => (
            <group key={f}>
              <Window position={[-0.5, f * FLOOR_HEIGHT + 1.15, S / 2 + 0.005]} width={0.2} height={0.34} />
              {f !== 1 && <Window position={[0.5, f * FLOOR_HEIGHT + 1.15, S / 2 + 0.005]} width={0.2} height={0.34} />}
            </group>
          ))}
        </group>
      )}
      {[0, 1, 2].map((f) => sideWindows(f))}
      {cutaway && (
        <group>
          {[1, 2, 3].map((f) => (
            <Part key={f} color={PALETTE.stoneShade} position={[0, f * FLOOR_HEIGHT, S / 2 - T / 2]}>
              <boxGeometry args={[S, 0.12, T]} />
            </Part>
          ))}
        </group>
      )}

      {Array.from({ length: KEEP_FLOORS + 1 }).map((_, f) => (
        <Part
          key={f}
          color={f === 0 ? PALETTE.stoneShade : PALETTE.wood}
          position={[0, f * FLOOR_HEIGHT + (f === 0 ? 0.71 : 0), 0]}
        >
          <boxGeometry args={[inner, 0.12, inner]} />
        </Part>
      ))}

      <group position={[-inner / 2 + 0.42, 0, -inner / 2 + 0.42]}>
        <Part color={PALETTE.stoneShade} position={[0, H / 2, 0]}>
          <cylinderGeometry args={[0.08, 0.08, H, 8]} />
        </Part>
        {stairSteps.map((s, i) => (
          <Part key={i} color={PALETTE.stoneWarm} position={[Math.sin(s.a) * 0.2, s.y, Math.cos(s.a) * 0.2]} rotation={[0, s.a + Math.PI / 2, 0]}>
            <boxGeometry args={[0.4, 0.06, 0.16]} />
          </Part>
        ))}
      </group>

      <Cellar />
      <GreatHall />
      <Solar />
      <KeepRoof />

      {!cutaway && (
        <group position={[0.9, FLOOR_HEIGHT, S / 2]}>
          <Part color={PALETTE.woodDark} position={[0, 0.5, 0.02]}>
            <boxGeometry args={[0.5, 1, 0.06]} />
          </Part>
          <Part color={PALETTE.wood} position={[0, -0.02, 0.45]} outline outlineThickness={0.01}>
            <boxGeometry args={[0.6, 0.08, 0.6]} />
          </Part>
          <Part color={PALETTE.wood} position={[-1.38, -1.12, 0.5]} rotation={[0, 0, 0.78]} outline outlineThickness={0.01}>
            <boxGeometry args={[3.1, 0.08, 0.45]} />
          </Part>
        </group>
      )}
    </group>
  )
}

function Cellar() {
  const y = 0.77
  return (
    <group position={[0, y, 0]}>
      <Barrel position={[0.9, 0, -0.9]} />
      <Barrel position={[0.62, 0, -0.95]} />
      <Barrel position={[0.95, 0, -0.62]} />
      <Barrel position={[0.78, 0.32, -0.8]} scale={0.9} />
      <Crate position={[-0.2, 0, -1]} rotation={0.2} />
      <Crate position={[0.15, 0, -1.05]} rotation={-0.1} size={0.24} />
      <Crate position={[-0.05, 0.27, -1.0]} size={0.22} rotation={0.5} />
      <Sack position={[0.9, 0, 0.3]} />
      <Sack position={[1.0, 0, 0.6]} />
      <Sack position={[0.75, 0.15, 0.45]} />
      <Barrel position={[-0.9, 0, 0.9]} />
      <Crate position={[-0.5, 0, 1]} />
      <Part color={PALETTE.wood} position={[0.3, 0.71, 0.2]}>
        <boxGeometry args={[0.1, 1.32, 0.1]} />
      </Part>
    </group>
  )
}

function GreatHall() {
  const y = FLOOR_HEIGHT + 0.06
  return (
    <group position={[0, y, 0]}>
      <Part color={PALETTE.stoneWarm} position={[0, 0.09, -1.05]}>
        <boxGeometry args={[1.1, 0.18, 0.55]} />
      </Part>
      <group position={[0, 0.18, -1.12]}>
        <Part color={PALETTE.cloth} position={[0, 0.12, 0]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.42, 0.24, 0.36]} />
        </Part>
        <Part color={PALETTE.gold} position={[0, 0.5, -0.16]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.46, 0.75, 0.06]} />
        </Part>
        {[-0.21, 0.21].map((x) => (
          <Part key={x} color={PALETTE.gold} position={[x, 0.9, -0.16]}>
            <sphereGeometry args={[0.04, 8, 8]} />
          </Part>
        ))}
        <Figure position={[0, 0.06, 0.04]} robe={PALETTE.cloth} trim={PALETTE.snow} hat="crown" hair={PALETTE.snow} pose="idle" scale={1.2}>
          <Part color={PALETTE.gold} position={[0.02, -0.1, 0.05]}>
            <cylinderGeometry args={[0.01, 0.01, 0.3, 5]} />
          </Part>
        </Figure>
        <Part color={PALETTE.cloth} position={[0, 0.03, 0.22]} scale={[1, 0.2, 1]}>
          <coneGeometry args={[0.38, 0.3, 16]} />
        </Part>
      </group>
      <mesh position={[0, 1.1, -1.38]}>
        <planeGeometry args={[1.1, 1.3]} />
        <Toon color={PALETTE.clothBlue} />
      </mesh>
      <mesh position={[0, 1.25, -1.37]}>
        <circleGeometry args={[0.18, 5]} />
        <meshBasicMaterial color={PALETTE.gold} />
      </mesh>

      <Part color={PALETTE.wood} position={[0.15, 0.36, 0.15]} outline outlineThickness={0.01}>
        <boxGeometry args={[0.6, 0.06, 1.6]} />
      </Part>
      {[
        [-0.08, -0.55],
        [0.38, -0.55],
        [-0.08, 0.85],
        [0.38, 0.85],
      ].map(([x, z], i) => (
        <Part key={i} color={PALETTE.woodDark} position={[x, 0.17, z]}>
          <boxGeometry args={[0.05, 0.34, 0.05]} />
        </Part>
      ))}
      {[-0.35, 0.65].map((x) => (
        <Part key={x} color={PALETTE.woodDark} position={[x, 0.18, 0.15]}>
          <boxGeometry args={[0.18, 0.05, 1.5]} />
        </Part>
      ))}
      <Candle position={[0.15, 0.39, -0.3]} />
      <Candle position={[0.15, 0.39, 0.6]} />
      <Part color={PALETTE.gold} position={[0.05, 0.43, 0.15]}>
        <cylinderGeometry args={[0.03, 0.025, 0.08, 8]} />
      </Part>
      <Part color={PALETTE.wheat} position={[0.28, 0.42, 0.25]} scale={[1.4, 0.6, 1]}>
        <sphereGeometry args={[0.05, 8, 6]} />
      </Part>

      <group position={[-1.32, 0, 0.55]}>
        <Part color={PALETTE.stoneShade} position={[0.05, 0.4, 0]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.25, 0.8, 0.8]} />
        </Part>
        <Part color={PALETTE.ink} position={[0.12, 0.25, 0]}>
          <boxGeometry args={[0.12, 0.4, 0.5]} />
        </Part>
        <Part color={PALETTE.stoneShade} position={[0.08, 1.2, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.6]} />
        </Part>
        <Fire position={[0.18, 0.06, 0]} scale={0.9} />
      </group>

      <group position={[0.15, 1.8, 0.15]}>
        <Part color={PALETTE.ink} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.015, 6, 24]} />
        </Part>
        <Part color={PALETTE.ink} position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.35, 4]} />
        </Part>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2
          return <Candle key={i} position={[Math.cos(a) * 0.35, 0, Math.sin(a) * 0.35]} />
        })}
      </group>

      {[-0.6, 0.6].map((z) => (
        <mesh key={z} position={[1.38, 1.2, z]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.35, 0.9]} />
          <Toon color={PALETTE.cloth} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function Solar() {
  const y = FLOOR_HEIGHT * 2 + 0.06
  return (
    <group position={[0, y, 0]}>
      <mesh position={[0, 0.005, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 24]} />
        <Toon color={PALETTE.roofRose} />
      </mesh>
      <group position={[0.65, 0, -0.75]}>
        <Part color={PALETTE.woodDark} position={[0, 0.15, 0]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.8, 0.22, 1.1]} />
        </Part>
        <Part color={PALETTE.snow} position={[0, 0.3, -0.4]} scale={[1, 0.5, 0.6]}>
          <sphereGeometry args={[0.18, 10, 8]} />
        </Part>
        <Part color={PALETTE.roofRose} position={[0, 0.28, 0.12]}>
          <boxGeometry args={[0.82, 0.08, 0.8]} />
        </Part>
        {[
          [-0.38, -0.52],
          [0.38, -0.52],
          [-0.38, 0.52],
          [0.38, 0.52],
        ].map(([x, z], i) => (
          <Part key={i} color={PALETTE.woodDark} position={[x, 0.65, z]}>
            <cylinderGeometry args={[0.025, 0.025, 1.3, 6]} />
          </Part>
        ))}
        <Part color={PALETTE.roofRose} position={[0, 1.32, 0]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.84, 0.06, 1.12]} />
        </Part>
        <mesh position={[-0.42, 1.0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.1, 0.6]} />
          <Toon color={PALETTE.roofRose} side={THREE.DoubleSide} transparent opacity={0.85} />
        </mesh>
        <Part color={PALETTE.wood} position={[0, 0.12, 0.72]} outline outlineThickness={0.008}>
          <boxGeometry args={[0.6, 0.24, 0.28]} />
        </Part>
      </group>
      <group position={[-1.3, 0, 0.35]}>
        <Part color={PALETTE.woodDark} position={[0, 0.7, 0]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.2, 1.4, 0.9]} />
        </Part>
        {[0.3, 0.7, 1.1].map((sy) =>
          [-0.3, -0.15, 0, 0.12, 0.28].map((sz, i) => (
            <Part
              key={`${sy}-${sz}`}
              color={[PALETTE.cloth, PALETTE.clothBlue, PALETTE.gold, PALETTE.leafDark, PALETTE.roofRose][(i + sy * 10) % 5 | 0]}
              position={[0.08, sy, sz]}
            >
              <boxGeometry args={[0.1, 0.24, 0.1]} />
            </Part>
          )),
        )}
      </group>
      <group position={[-0.5, 0, 0.9]}>
        <Part color={PALETTE.wood} position={[0, 0.36, 0]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.7, 0.05, 0.4]} />
        </Part>
        {[
          [-0.3, -0.15],
          [0.3, -0.15],
          [-0.3, 0.15],
          [0.3, 0.15],
        ].map(([x, z], i) => (
          <Part key={i} color={PALETTE.woodDark} position={[x, 0.17, z]}>
            <boxGeometry args={[0.04, 0.34, 0.04]} />
          </Part>
        ))}
        <Candle position={[0.22, 0.385, -0.05]} />
        <Part color={PALETTE.snow} position={[-0.05, 0.395, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.24, 0.01, 0.18]} />
        </Part>
        <Part color={PALETTE.snow} position={[0.05, 0.45, 0.05]} rotation={[0.3, 0, 0.5]}>
          <coneGeometry args={[0.012, 0.16, 4]} />
        </Part>
        <Part color={PALETTE.woodDark} position={[0, 0.2, -0.4]}>
          <boxGeometry args={[0.28, 0.04, 0.28]} />
        </Part>
      </group>
    </group>
  )
}

function KeepRoof() {
  const S = KEEP_SIZE
  const H = FLOOR_HEIGHT * KEEP_FLOORS
  return (
    <group position={[0, H, 0]}>
      <Part color={PALETTE.stoneShade} position={[0, 0.08, 0]} outline>
        <boxGeometry args={[S + 0.16, 0.16, S + 0.16]} />
      </Part>
      <group position={[-S / 2 + 0.55, 0, -S / 2 + 0.55]}>
        <Part color={PALETTE.stone} position={[0, 0.75, 0]} outline>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 18]} />
        </Part>
        <Part color={PALETTE.roofBlue} position={[0, 2.1, 0]} outline outlineThickness={0.03}>
          <coneGeometry args={[0.66, 1.3, 18]} />
        </Part>
        <Window position={[0.36, 0.8, 0.36]} rotation={Math.PI / 4} />
      </group>
      <Flag position={[0.4, 0.16, 0.2]} poleHeight={1.8} size={[0.7, 0.44]} phase={1.2} />
      <Figure position={[0.8, 0.16, 0.9]} rotation={0.6} robe={PALETTE.clothBlue} hat="helmet" pose="idle" phase={3}>
        <Part color={PALETTE.woodDark} position={[0, 0.05, 0.03]}>
          <cylinderGeometry args={[0.008, 0.008, 0.75, 5]} />
        </Part>
      </Figure>
    </group>
  )
}

function Chapel() {
  return (
    <group position={CHAPEL_LOCAL}>
      <Part color={PALETTE.stone} position={[0, 0.75, 0]} outline>
        <boxGeometry args={[1.3, 1.5, 2.4]} />
      </Part>
      <Gable width={1.6} height={1.2} length={2.6} color={PALETTE.roofSlate} position={[0, 1.5, 0]} />
      <group position={[0, 1.95, 1.21]}>
        <mesh>
          <circleGeometry args={[0.26, 24]} />
          <meshBasicMaterial color={PALETTE.ink} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          const colors = [PALETTE.roofRose, PALETTE.roofBlue, PALETTE.gold, PALETTE.leaf]
          return (
            <mesh key={i} position={[Math.cos(a) * 0.15, Math.sin(a) * 0.15, 0.005]}>
              <circleGeometry args={[0.07, 12]} />
              <meshBasicMaterial color={colors[i % 4]} />
            </mesh>
          )
        })}
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.07, 12]} />
          <meshBasicMaterial color={PALETTE.gold} />
        </mesh>
      </group>
      <Part color={PALETTE.woodDark} position={[0, 0.4, 1.21]}>
        <boxGeometry args={[0.4, 0.8, 0.04]} />
      </Part>
      {[-0.5, 0.2].map((z) => (
        <group key={z}>
          <Window position={[0.655, 0.75, z]} rotation={Math.PI / 2} width={0.14} height={0.4} />
          <Window position={[-0.655, 0.75, z]} rotation={-Math.PI / 2} width={0.14} height={0.4} />
        </group>
      ))}
      <group position={[0, 0, -1.35]}>
        <Part color={PALETTE.stone} position={[0, 1.5, 0]} outline>
          <boxGeometry args={[0.65, 3, 0.65]} />
        </Part>
        <Part color={PALETTE.ink} position={[0, 2.55, 0]}>
          <boxGeometry args={[0.67, 0.4, 0.3]} />
        </Part>
        <Part color={PALETTE.gold} position={[0, 2.5, 0]}>
          <coneGeometry args={[0.1, 0.18, 10]} />
        </Part>
        <Part color={PALETTE.roofSlate} position={[0, 3.45, 0]} rotation={[0, Math.PI / 4, 0]} outline outlineThickness={0.02}>
          <coneGeometry args={[0.55, 0.9, 4]} />
        </Part>
        <Part color={PALETTE.gold} position={[0, 4.0, 0]}>
          <boxGeometry args={[0.03, 0.22, 0.03]} />
        </Part>
        <Part color={PALETTE.gold} position={[0, 4.03, 0]}>
          <boxGeometry args={[0.13, 0.03, 0.03]} />
        </Part>
      </group>
    </group>
  )
}

function Forge() {
  return (
    <group position={FORGE_LOCAL}>
      <Part color={PALETTE.thatch} position={[0, 1.8, 0.35]} rotation={[0, 0, -0.32]} outline outlineThickness={0.02}>
        <boxGeometry args={[2.3, 0.1, 2.9]} />
      </Part>
      {[-1.1, 0.35, 1.8].map((z) => (
        <Part key={z} color={PALETTE.woodDark} position={[0.85, 0.75, z]}>
          <boxGeometry args={[0.08, 1.5, 0.08]} />
        </Part>
      ))}
      <Part color={PALETTE.woodDark} position={[0.4, 0.4, 0.35]}>
        <boxGeometry args={[1, 0.8, 0.06]} />
      </Part>
      <group position={[-0.45, 0, -0.55]}>
        <Part color={PALETTE.rockDark} position={[0, 0.3, 0]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
        </Part>
        <Part color={PALETTE.rockDark} position={[0, 1.1, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
        </Part>
        <Fire position={[0.1, 0.6, 0]} scale={0.8} />
      </group>
      <group position={[0.2, 0, -0.4]}>
        <Part color={PALETTE.woodDark} position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.3, 8]} />
        </Part>
        <Part color={PALETTE.ink} position={[0, 0.33, 0]}>
          <boxGeometry args={[0.28, 0.08, 0.12]} />
        </Part>
        <mesh position={[0.02, 0.38, 0]}>
          <torusGeometry args={[0.04, 0.012, 6, 12, Math.PI * 1.4]} />
          <meshBasicMaterial color={PALETTE.fire} />
        </mesh>
      </group>
      <Figure position={[0.45, 0, -0.2]} rotation={-2.2} robe={PALETTE.wood} hat="none" hair={PALETTE.ink} pose="hammer" phase={0.5}>
        <group position={[0, -0.2, 0.02]}>
          <Part color={PALETTE.woodDark} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.16, 4]} />
          </Part>
          <Part color={PALETTE.ink} position={[0, 0, 0.08]}>
            <boxGeometry args={[0.07, 0.04, 0.04]} />
          </Part>
        </group>
      </Figure>
      {[-0.6, -0.3, 0].map((z) => (
        <mesh key={z} position={[-0.95, 1.0, z - 0.3]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.05, 0.01, 6, 12, Math.PI * 1.3]} />
          <Toon color={PALETTE.ink} />
        </mesh>
      ))}
      <Horse position={[-0.2, 0, 1.2]} rotation={Math.PI / 2} />
      <Part color={PALETTE.thatch} position={[-0.75, 0.15, 1.75]} outline outlineThickness={0.01}>
        <boxGeometry args={[0.45, 0.3, 0.35]} />
      </Part>
      <Part color={PALETTE.thatch} position={[-0.75, 0.42, 1.7]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.25, 0.3]} />
      </Part>
      <Part color={PALETTE.wood} position={[0.5, 0.2, 1.3]}>
        <boxGeometry args={[0.2, 0.18, 0.6]} />
      </Part>
    </group>
  )
}

function Well() {
  return (
    <group position={WELL_LOCAL}>
      <Part color={PALETTE.stoneShade} position={[0, 0.22, 0]} outline outlineThickness={0.015}>
        <cylinderGeometry args={[0.38, 0.4, 0.44, 18, 1, true]} />
      </Part>
      <Part color={PALETTE.stoneWarm} position={[0, 0.45, 0]}>
        <torusGeometry args={[0.38, 0.05, 6, 20]} />
      </Part>
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.36, 18]} />
        <Toon color={PALETTE.waterDeep} />
      </mesh>
      {[-0.35, 0.35].map((x) => (
        <Part key={x} color={PALETTE.woodDark} position={[x, 0.65, 0]}>
          <boxGeometry args={[0.05, 0.9, 0.05]} />
        </Part>
      ))}
      <Part color={PALETTE.woodDark} position={[0, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.72, 6]} />
      </Part>
      <Gable width={0.95} height={0.4} length={0.6} color={PALETTE.roofRose} position={[0, 1.08, 0]} rotation={Math.PI / 2} />
      <Part color={PALETTE.wood} position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.1, 8]} />
      </Part>
    </group>
  )
}

function Courtyard() {
  const pebbles = useMemo(() => {
    const pts: Vec3[] = []
    for (let i = 0; i < 7; i++) pts.push([0.05 * Math.sin(i * 3), 0.025, WALL_HALF - 0.4 - i * 0.28])
    return pts
  }, [])
  return (
    <group>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[WALL_HALF * 2 - 0.4, WALL_HALF * 2 - 0.4]} />
        <Toon color="#e6d4ae" />
      </mesh>
      {pebbles.map((p, i) => (
        <mesh key={i} position={p} rotation={[-Math.PI / 2, 0, i]} receiveShadow>
          <circleGeometry args={[0.18, 6]} />
          <Toon color={PALETTE.stoneShade} />
        </mesh>
      ))}
      <group position={[0.6, 0.03, 2.9]}>
        {[0, 1, 2].map((i) => (
          <group key={i} position={[i * 0.48, 0, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[0.4, 0.75]} />
              <Toon color={PALETTE.soil} />
            </mesh>
            {[-0.25, 0, 0.25].map((z) => (
              <Part key={z} color={i === 1 ? PALETTE.lavender : PALETTE.leafDark} position={[0, 0.07, z]}>
                <sphereGeometry args={[0.08, 8, 6]} />
              </Part>
            ))}
          </group>
        ))}
      </group>
      <Figure position={[-0.75, 0.02, 2.3]} rotation={0.7} robe={PALETTE.roofBlue} hat="kerchief" hatColor={PALETTE.snow} pose="idle" phase={1.7}>
        <Part color={PALETTE.wood} position={[0, -0.18, 0.03]}>
          <cylinderGeometry args={[0.04, 0.035, 0.07, 8]} />
        </Part>
      </Figure>
    </group>
  )
}

export function Castle({ cutaway }: { cutaway: boolean }) {
  const merlons = useMemo(() => {
    const list: MerlonSpec[] = []
    const h = WALL_HALF
    const r = TOWER_RADIUS
    const inset = WALL_THICK / 2 - MERLON.d / 2
    list.push(...lineMerlons([-h + r, -h], [h - r, -h], WALL_HEIGHT, [0, -1], inset))
    list.push(...lineMerlons([-h, -h + r], [-h, h - r], WALL_HEIGHT, [-1, 0], inset))
    list.push(...lineMerlons([h, -h + r], [h, h - r], WALL_HEIGHT, [1, 0], inset))
    list.push(...lineMerlons([-h + r, h], [-1.9, h], WALL_HEIGHT, [0, 1], inset))
    list.push(...lineMerlons([1.9, h], [h - r, h], WALL_HEIGHT, [0, 1], inset))
    list.push(...lineMerlons([-0.8, WALL_HALF + 0.6], [0.8, WALL_HALF + 0.6], 3.5, [0, 0], 0))
    const S = KEEP_SIZE
    const kh = FLOOR_HEIGHT * KEEP_FLOORS + 0.16
    const kz = KEEP_LOCAL[2]
    list.push(...lineMerlons([-S / 2, kz - S / 2], [S / 2, kz - S / 2], kh, [0, -1], -0.02))
    list.push(...lineMerlons([-S / 2, kz - S / 2], [-S / 2, kz + S / 2], kh, [-1, 0], -0.02))
    list.push(...lineMerlons([S / 2, kz - S / 2], [S / 2, kz + S / 2], kh, [1, 0], -0.02))
    if (!cutaway) list.push(...lineMerlons([-S / 2, kz + S / 2], [S / 2, kz + S / 2], kh, [0, 1], -0.02))
    list.push(...ringMerlons([h, 0, -h], TOWER_RADIUS * 1.04, 6.37, 12))
    return list
  }, [cutaway])

  const gradient = useMemo(() => getGradientMap(), [])
  const h = WALL_HALF

  return (
    <group position={CASTLE_ORIGIN}>
      <Courtyard />
      <Part color={PALETTE.stone} position={[0, WALL_HEIGHT / 2, -h]} outline>
        <boxGeometry args={[h * 2, WALL_HEIGHT, WALL_THICK]} />
      </Part>
      <Part color={PALETTE.stone} position={[-h, WALL_HEIGHT / 2, 0]} outline>
        <boxGeometry args={[WALL_THICK, WALL_HEIGHT, h * 2]} />
      </Part>
      <Part color={PALETTE.stone} position={[h, WALL_HEIGHT / 2, 0]} outline>
        <boxGeometry args={[WALL_THICK, WALL_HEIGHT, h * 2]} />
      </Part>
      {[-1, 1].map((s) => (
        <Part key={s} color={PALETTE.stone} position={[s * (h + 1.7) / 2, WALL_HEIGHT / 2, h]} outline>
          <boxGeometry args={[h - 1.7, WALL_HEIGHT, WALL_THICK]} />
        </Part>
      ))}
      {[
        [-h, 1.2, Math.PI / 2],
        [-h, -1.8, Math.PI / 2],
        [h, 1.0, -Math.PI / 2],
        [h, -2.2, -Math.PI / 2],
      ].map(([x, z, r], i) => (
        <Part key={i} color={PALETTE.ink} position={[x + (x > 0 ? 0.255 : -0.255), 1.6, z]} rotation={[0, r, 0]}>
          <boxGeometry args={[0.05, 0.45, 0.02]} />
        </Part>
      ))}

      <Instances limit={200} castShadow receiveShadow>
        <boxGeometry args={[MERLON.w, MERLON.h, MERLON.d]} />
        <meshToonMaterial color={PALETTE.stone} gradientMap={gradient} />
        {merlons.map((m, i) => (
          <Instance key={i} position={m.position} rotation={[0, m.rotation, 0]} />
        ))}
      </Instances>

      <Tower position={[-h, 0, -h]} height={4.4} roof={PALETTE.roofBlue} flagColor={PALETTE.roofRose} />
      <Tower position={[-h, 0, h]} height={4.2} roof={PALETTE.roofRose} flagColor={PALETTE.clothBlue} />
      <Tower position={[h, 0, h]} height={4.2} roof={PALETTE.roofBlue} flagColor={PALETTE.roofRose} />
      <Tower position={[h, 0, -h]} height={6.25} windowRows={3} />
      <Observatory />

      <Gatehouse />
      <Keep cutaway={cutaway} />
      <Chapel />
      <Forge />
      <Well />

      <Patroller
        from={[-h + 1.1, WALL_HEIGHT, -h + 0.06]}
        to={[h - 1.1, WALL_HEIGHT, -h + 0.06]}
        robe={PALETTE.clothBlue}
        hat="helmet"
        speed={0.32}
        phase={0}
      />
      <Patroller
        from={[-h + 0.06, WALL_HEIGHT, -h + 1.1]}
        to={[-h + 0.06, WALL_HEIGHT, h - 1.1]}
        robe={PALETTE.clothBlue}
        hat="helmet"
        speed={0.3}
        phase={3.2}
      />
    </group>
  )
}

function Observatory() {
  const top = 6.25
  return (
    <group position={[WALL_HALF, top, -WALL_HALF]}>
      <Part color={PALETTE.stoneShade} position={[0, 0.06, 0]} outline>
        <cylinderGeometry args={[TOWER_RADIUS * 1.12, TOWER_RADIUS * 1.02, 0.12, 24]} />
      </Part>
      <group position={[0.1, 0.12, -0.05]} rotation={[0, 2.0, 0]}>
        {[0, 1, 2].map((i) => {
          const a = (i * 2 * Math.PI) / 3
          return (
            <Part key={i} color={PALETTE.woodDark} position={[Math.sin(a) * 0.1, 0.2, Math.cos(a) * 0.1]} rotation={[Math.cos(a) * -0.25, 0, Math.sin(a) * 0.25]}>
              <cylinderGeometry args={[0.01, 0.012, 0.42, 4]} />
            </Part>
          )
        })}
        <group position={[0, 0.44, 0]} rotation={[-0.5, 0, 0]}>
          <Part color={PALETTE.gold} position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} outline outlineThickness={0.008}>
            <cylinderGeometry args={[0.03, 0.045, 0.6, 10]} />
          </Part>
        </group>
      </group>
      <Figure position={[-0.2, 0.12, 0.08]} rotation={2.0} robe="#3f5a86" hat="wizard" hatColor="#3f5a86" hair={PALETTE.snow} pose="look" phase={4} />
      <Part color={PALETTE.wood} position={[-0.35, 0.3, 0.35]}>
        <boxGeometry args={[0.35, 0.04, 0.25]} />
      </Part>
      <Part color={PALETTE.gold} position={[-0.35, 0.36, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.06, 0.01, 6, 16]} />
      </Part>
    </group>
  )
}

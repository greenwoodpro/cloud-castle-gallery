'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { Box, Crenellation, GableRoof, Mat, RoundTower, Window, Flag } from './primitives'
import { Selectable } from './selectable'
import { Figure, Fox, Horse, LittlePrince } from './characters'
import { useScene } from '@/lib/scene-store'
import { P } from './palette'

const WALL = 6
const WALL_H = 3
const BOOK_COLORS = ['#e07a7a', '#8fb3d9', '#f3c35b', '#8fcf9a']

function CurtainWall() {
  const { night } = useScene()
  const segs: { pos: [number, number, number]; rot: [number, number, number]; len: number }[] = [
    { pos: [0, WALL_H / 2, -WALL], rot: [0, 0, 0], len: WALL * 2 },
    { pos: [-WALL, WALL_H / 2, 0], rot: [0, Math.PI / 2, 0], len: WALL * 2 },
    { pos: [WALL, WALL_H / 2, 0], rot: [0, Math.PI / 2, 0], len: WALL * 2 },
  ]
  return (
    <Selectable id="curtain-wall" labelOffset={4.2}>
      {segs.map((s, i) => (
        <group key={i} position={s.pos} rotation={s.rot}>
          <Box size={[s.len, WALL_H, 0.8]} color={P.stone} />
          <Crenellation length={s.len} position={[0, WALL_H / 2 + 0.2, 0]} />
          {/* 巡逻步道 */}
          <Box size={[s.len, 0.1, 1.2]} position={[0, WALL_H / 2 - 0.05, 0]} color={P.stoneShade} />
          <Window position={[-s.len * 0.3, 0.3, 0.41]} lit={night} />
          <Window position={[s.len * 0.3, 0.3, 0.41]} lit={night} />
        </group>
      ))}
      {/* 前墙分成两段，留出门楼 */}
      {[-1, 1].map((d) => (
        <group key={d} position={[d * (WALL / 2 + 1), WALL_H / 2, WALL]}>
          <Box size={[WALL - 2, WALL_H, 0.8]} color={P.stone} />
          <Crenellation length={WALL - 2} position={[0, WALL_H / 2 + 0.2, 0]} />
        </group>
      ))}
    </Selectable>
  )
}

function Towers() {
  return (
    <Selectable id="towers" labelOffset={8.5}>
      {[
        [-WALL, -WALL],
        [WALL, -WALL],
        [-WALL, WALL],
        [WALL, WALL],
      ].map(([x, z]) => (
        <RoundTower key={`${x}${z}`} position={[x, 0, z]} radius={1.15} height={4.8} roofHeight={2.4} />
      ))}
    </Selectable>
  )
}

function Gatehouse() {
  const chain = useRef<Mesh>(null)
  useFrame((state) => {
    if (chain.current) chain.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.01
  })
  return (
    <Selectable id="gatehouse" position={[0, 0, WALL]} labelOffset={6.5}>
      {[-1.6, 1.6].map((x) => (
        <RoundTower key={x} position={[x, 0, 0.2]} radius={0.85} height={4.2} roofHeight={1.9} roofColor={P.roofDark} flag={false} />
      ))}
      {/* 门拱上方的横梁 */}
      <Box size={[3.4, 1.4, 1.2]} position={[0, 3.3, 0.2]} color={P.stone} />
      <Crenellation length={3.4} position={[0, 4.2, 0.2]} count={4} />
      {/* 拱门（深色洞口） */}
      <mesh position={[0, 1.2, 0.2]}>
        <boxGeometry args={[1.5, 2.4, 1.3]} />
        <Mat color="#4a4a5c" />
      </mesh>
      <mesh position={[0, 2.4, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 1.3, 16, 1, false, 0, Math.PI]} />
        <Mat color="#4a4a5c" />
      </mesh>
      {/* 铁闸 */}
      <group position={[0, 1.6, 0.9]}>
        {[-0.5, -0.25, 0, 0.25, 0.5].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.05, 1.6, 0.05]} />
            <Mat color="#6b6b7a" />
          </mesh>
        ))}
      </group>
      {/* 吊桥 */}
      <mesh ref={chain} position={[0, 0.08, 1.9]} rotation={[0.04, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.12, 2.6]} />
        <Mat color={P.wood} />
      </mesh>
      {[-0.7, 0.7].map((x) => (
        <mesh key={x} position={[x, 1.8, 2.0]} rotation={[-0.55, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 3.6, 6]} />
          <Mat color="#6b6b7a" />
        </mesh>
      ))}
      <Flag position={[0, 4.4, 0.2]} color={P.gold} />
    </Selectable>
  )
}

/** 主楼：四层 + 地下室；剖面模式下切掉前半部分展示内部 */
function Keep() {
  const { cutaway, night } = useScene()
  const W = 4.2
  const FLOOR = 2.2
  const base: [number, number, number] = [-1.6, 0, -1.6]

  const floors = [
    { y: 0, label: 'kitchen' },
    { y: FLOOR, label: 'throne-room' },
    { y: FLOOR * 2, label: 'bedchamber' },
    { y: FLOOR * 3, label: 'observatory' },
  ]

  return (
    <group position={base}>
      {/* 石砌基座（地牢） */}
      <Selectable id="dungeon" labelOffset={1.2}>
        <Box size={[W + 0.6, 1, W + 0.6]} position={[0, 0.5, 0]} color={P.stoneDark} />
        <mesh position={[0, 0.55, (W + 0.6) / 2 + 0.01]}>
          <boxGeometry args={[0.5, 0.3, 0.04]} />
          <Mat color="#3b3b4a" />
        </mesh>
        {cutaway && (
          <group position={[0, 0.5, 0.6]}>
            {[-1.2, -0.6, 0.6].map((x) => (
              <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.25, 0.25, 0.5, 10]} />
                <Mat color={P.woodDark} />
              </mesh>
            ))}
            <mesh position={[1.3, -0.1, 0]}>
              <sphereGeometry args={[0.18, 10, 8]} />
              <Mat color="#9a9aa8" />
            </mesh>
          </group>
        )}
      </Selectable>

      <Selectable id="keep" position={[0, 1, 0]} labelOffset={FLOOR * 4 + 3.2}>
        {cutaway ? (
          <>
            {/* 后半外墙 */}
            <Box size={[W, FLOOR * 4, 0.3]} position={[0, FLOOR * 2, -W / 2 + 0.15]} color={P.stone} />
            <Box size={[0.3, FLOOR * 4, W / 2]} position={[-W / 2 + 0.15, FLOOR * 2, -W / 4]} color={P.stone} />
            <Box size={[0.3, FLOOR * 4, W / 2]} position={[W / 2 - 0.15, FLOOR * 2, -W / 4]} color={P.stone} />
            {/* 剖面边缘的淡色切口 */}
            <Box size={[W, FLOOR * 4, 0.06]} position={[0, FLOOR * 2, 0]} color={P.stoneShade} opacity={0.25} />
          </>
        ) : (
          <>
            <Box size={[W, FLOOR * 4, W]} position={[0, FLOOR * 2, 0]} color={P.stone} />
            {floors.map((f, i) => (
              <group key={f.label}>
                <Window position={[-1, f.y + 1.3, W / 2 + 0.02]} lit={night} />
                <Window position={[1, f.y + 1.3, W / 2 + 0.02]} lit={night} />
                <Window position={[W / 2 + 0.02, f.y + 1.3, 0]} rotation={[0, Math.PI / 2, 0]} lit={night && i % 2 === 0} />
                <Window position={[-W / 2 - 0.02, f.y + 1.3, 0]} rotation={[0, Math.PI / 2, 0]} lit={night && i % 2 === 1} />
              </group>
            ))}
          </>
        )}

        {/* 楼层板与内部 */}
        {cutaway && (
          <group>
            {floors.map((f) => (
              <Box key={f.label} size={[W - 0.3, 0.12, W - 0.3]} position={[0, f.y + 0.06, 0]} color={P.woodDark} />
            ))}
            <KeepInterior floorH={FLOOR} width={W} />
          </group>
        )}

        {/* 顶部雉堞与屋顶 */}
        <Crenellation length={W} position={[0, FLOOR * 4 + 0.2, W / 2 - 0.2]} />
        <Crenellation length={W} position={[0, FLOOR * 4 + 0.2, -W / 2 + 0.2]} />
        <Crenellation length={W} position={[W / 2 - 0.2, FLOOR * 4 + 0.2, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Crenellation length={W} position={[-W / 2 + 0.2, FLOOR * 4 + 0.2, 0]} rotation={[0, Math.PI / 2, 0]} />
        <mesh position={[0, FLOOR * 4 + 0.4 + 1.3, 0]} castShadow>
          <coneGeometry args={[W * 0.62, 2.6, 4]} />
          <Mat color={P.roof} />
        </mesh>
        <RoundTower position={[W / 2 - 0.3, FLOOR * 4 - 1, -W / 2 + 0.3]} radius={0.5} height={2.4} roofHeight={1.4} windows={false} flag={false} />
        {/* 塔顶的小王子与狐狸 */}
        <Selectable id="prince" position={[-0.6, FLOOR * 4 + 0.4, 0.3]} labelOffset={1.8}>
          <LittlePrince />
        </Selectable>
        <Selectable id="fox" position={[0.5, FLOOR * 4 + 0.4, 0.6]} rotation={[0, -0.8, 0]} labelOffset={1}>
          <Fox />
        </Selectable>
      </Selectable>
    </group>
  )
}

function KeepInterior({ floorH, width }: { floorH: number; width: number }) {
  const w = width
  return (
    <group>
      {/* 一层：厨房 */}
      <Selectable id="kitchen" position={[0, 0.12, 0]} labelOffset={1.4}>
        <Box size={[1.2, 1.4, 0.5]} position={[-1.2, 0.7, -w / 2 + 0.5]} color={P.stoneDark} />
        <mesh position={[-1.2, 0.45, -w / 2 + 0.76]}>
          <sphereGeometry args={[0.22, 10, 8]} />
          <Mat color={P.flame} emissive={P.flame} emissiveIntensity={1.5} />
        </mesh>
        <pointLight position={[-1.2, 0.6, -w / 2 + 1]} color={P.flame} intensity={2} distance={3} />
        <Box size={[1.4, 0.08, 0.6]} position={[0.8, 0.7, -0.6]} color={P.wood} />
        {[0.4, 0.9, 1.3].map((x) => (
          <mesh key={x} position={[x, 0.3, -1.4]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 8, 6]} />
            <Mat color="#e5cfae" />
          </mesh>
        ))}
        <Figure body="#d8a7b8" hair="#7a4e37" hat="cap" scale={0.8} />
      </Selectable>
      {/* 二层：王座厅 */}
      <Selectable id="throne-room" position={[0, floorH + 0.12, 0]} labelOffset={1.6}>
        <Box size={[0.9, 0.02, w - 0.8]} position={[0, 0.02, -0.2]} color="#c75c6b" />
        <Box size={[0.9, 0.4, 0.5]} position={[0, 0.2, -w / 2 + 0.6]} color={P.gold} />
        <Box size={[0.9, 1.3, 0.12]} position={[0, 0.85, -w / 2 + 0.4]} color={P.gold} />
        {[-1.3, 1.3].map((x) =>
          [-1, 0.4].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.9, z]}>
              <cylinderGeometry args={[0.1, 0.12, 1.8, 8]} />
              <Mat color={P.stoneShade} />
            </mesh>
          )),
        )}
        <group position={[0, 0.4, -w / 2 + 0.7]}>
          <Selectable id="king" labelOffset={1.5}>
            <Figure body="#b45b7a" hair="#f4f0e8" hat="crown" cape="#8f3a5f" scale={0.75} />
          </Selectable>
        </group>
      </Selectable>
      {/* 三层：寝室 */}
      <Selectable id="bedchamber" position={[0, floorH * 2 + 0.12, 0]} labelOffset={1.5}>
        <Box size={[1.4, 0.4, 2]} position={[-1.1, 0.2, -0.6]} color="#f3e6ef" />
        <Box size={[1.4, 0.1, 0.5]} position={[-1.1, 0.45, -1.3]} color="#ffffff" />
        <Box size={[1.5, 1.6, 0.1]} position={[-1.1, 0.8, -w / 2 + 0.25]} color={P.wood} />
        <Box size={[0.3, 1.9, 2.2]} position={[w / 2 - 0.35, 0.95, -0.6]} color={P.woodDark} />
        {[0.3, 0.9, 1.5].map((y, yi) =>
          [-1.4, -0.9, -0.4, 0.1].map((z, zi) => (
            <mesh key={`${y}${z}`} position={[w / 2 - 0.35, y, z]}>
              <boxGeometry args={[0.32, 0.4, 0.3]} />
              <Mat color={BOOK_COLORS[(yi + zi) % BOOK_COLORS.length]} />
            </mesh>
          )),
        )}
        <pointLight position={[-0.2, 0.8, 0.5]} color={P.lamp} intensity={1} distance={3} />
        <mesh position={[-0.2, 0.3, 0.6]}>
          <sphereGeometry args={[0.1, 8, 6]} />
          <Mat color={P.lamp} emissive={P.lamp} emissiveIntensity={1.5} />
        </mesh>
      </Selectable>
      {/* 顶层：观星台 */}
      <Selectable id="observatory" position={[0, floorH * 3 + 0.12, 0]} labelOffset={1.6}>
        <mesh position={[0.6, 0.3, -0.5]}>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
          <Mat color={P.woodDark} />
        </mesh>
        <mesh position={[0.6, 0.85, -0.9]} rotation={[-0.8, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.14, 1.3, 10]} />
          <Mat color={P.gold} />
        </mesh>
        <Box size={[1.2, 0.06, 0.8]} position={[-1, 0.7, 0]} color={P.wood} />
        <Box size={[1, 0.02, 0.7]} position={[-1, 0.74, 0]} color="#fff8e6" />
        <group position={[-0.3, 0, -0.9]}>
          <Selectable id="geographer" labelOffset={1.4}>
            <Figure body="#6f8fb3" hair="#e8e8e8" scale={0.75} />
          </Selectable>
        </group>
      </Selectable>
    </group>
  )
}

function GreatHall() {
  const { night } = useScene()
  return (
    <Selectable id="great-hall" position={[2.6, 0, -2.2]} labelOffset={4.6}>
      <Box size={[4.6, 2.6, 2.8]} position={[0, 1.3, 0]} color={P.stone} />
      <GableRoof width={4.6} depth={2.8} height={1.6} position={[0, 2.6, 0]} />
      {[-1.4, 0, 1.4].map((x) => (
        <Window key={x} position={[x, 1.6, 1.42]} lit={night} />
      ))}
      <mesh position={[1.6, 3.4, -0.6]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <Mat color={P.stoneDark} />
      </mesh>
    </Selectable>
  )
}

function Chapel() {
  const { night } = useScene()
  return (
    <Selectable id="chapel" position={[3.4, 0, 2.6]} labelOffset={5}>
      <Box size={[2, 2.2, 3]} position={[0, 1.1, 0]} color="#fbf6ee" />
      <GableRoof width={2} depth={3} height={1.2} position={[0, 2.2, 0]} color={P.roofDark} />
      <mesh position={[0, 3.9, -0.8]} castShadow>
        <coneGeometry args={[0.45, 1.6, 6]} />
        <Mat color={P.roofDark} />
      </mesh>
      <mesh position={[0, 4.85, -0.8]}>
        <boxGeometry args={[0.06, 0.4, 0.06]} />
        <Mat color={P.gold} emissive={P.gold} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 4.92, -0.8]}>
        <boxGeometry args={[0.24, 0.06, 0.06]} />
        <Mat color={P.gold} emissive={P.gold} emissiveIntensity={0.5} />
      </mesh>
      {/* 彩色玻璃窗 */}
      {[
        [-0.9, '#e07a7a'],
        [0.9, '#8fb3d9'],
      ].map(([z, c]) => (
        <mesh key={String(z)} position={[1.02, 1.3, Number(z)]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.3, 0.6]} />
          <Mat color={String(c)} emissive={String(c)} emissiveIntensity={night ? 1 : 0.2} />
        </mesh>
      ))}
    </Selectable>
  )
}

function Stable() {
  const spark = useRef<Mesh>(null)
  useFrame((state) => {
    if (spark.current) {
      const s = 0.8 + Math.sin(state.clock.elapsedTime * 9) * 0.2
      spark.current.scale.setScalar(s)
    }
  })
  return (
    <Selectable id="stable" position={[-3.8, 0, 3.4]} labelOffset={3.6}>
      <Box size={[3.6, 1.6, 2]} position={[0, 0.8, 0]} color={P.wood} />
      <GableRoof width={3.6} depth={2} height={1} position={[0, 1.6, 0]} color={P.woodDark} />
      {/* 马厩门 */}
      <Box size={[0.9, 1.1, 0.06]} position={[0.9, 0.55, 1.02]} color={P.woodDark} />
      <Horse position={[1.2, 0, 1.9]} rotation={0.4} />
      <Horse position={[-0.2, 0, 2.2]} rotation={-0.6} color="#d6d2cc" />
      {/* 铁匠炉 */}
      <Box size={[0.9, 0.9, 0.9]} position={[-1.2, 0.45, 1.5]} color={P.stoneDark} />
      <mesh ref={spark} position={[-1.2, 1.0, 1.5]}>
        <sphereGeometry args={[0.2, 10, 8]} />
        <Mat color={P.flame} emissive={P.flame} emissiveIntensity={2} />
      </mesh>
      <pointLight position={[-1.2, 1.2, 1.8]} color={P.flame} intensity={3} distance={4} />
      <Box size={[0.5, 0.3, 0.3]} position={[-2.1, 0.45, 2.2]} color="#6b6b7a" />
      <group position={[-2.6, 0, 2.6]} rotation={[0, 0.9, 0]}>
        <Selectable id="blacksmith" labelOffset={1.5}>
          <Figure body="#8a6f5a" hair="#3f2c22" scale={0.95} />
        </Selectable>
      </group>
    </Selectable>
  )
}

function Well() {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.8
  })
  return (
    <Selectable id="well" position={[0.4, 0, 0.6]} labelOffset={2.2}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.55, 0.6, 14]} />
        <Mat color={P.stoneDark} />
      </mesh>
      <mesh position={[0, 0.61, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.02, 14]} />
        <Mat color={P.waterDeep} />
      </mesh>
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, 0.9, 0]}>
          <boxGeometry args={[0.08, 1.2, 0.08]} />
          <Mat color={P.woodDark} />
        </mesh>
      ))}
      <mesh ref={ref} position={[0, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 1.1, 8]} />
        <Mat color={P.wood} />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <coneGeometry args={[0.85, 0.5, 4]} />
        <Mat color={P.roofDark} />
      </mesh>
    </Selectable>
  )
}

function RoseGarden() {
  return (
    <Selectable id="rose" position={[-4.3, 0, -4.2]} labelOffset={1.6}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.1, 16]} />
        <Mat color={P.grassDark} />
      </mesh>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2
        return (
          <group key={i} position={[Math.cos(a) * 0.8, 0.1, Math.sin(a) * 0.8]}>
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 5]} />
              <Mat color={P.leafDark} />
            </mesh>
            <mesh position={[0, 0.55, 0]}>
              <sphereGeometry args={[0.1, 8, 6]} />
              <Mat color={P.rose} />
            </mesh>
          </group>
        )
      })}
      {/* 玻璃罩下的那一朵 */}
      <group position={[0, 0.1, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.7, 5]} />
          <Mat color={P.leafDark} />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.14, 10, 8]} />
          <Mat color="#e4506f" />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <capsuleGeometry args={[0.28, 0.5, 6, 16]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.22} roughness={0.1} transmission={0.6} thickness={0.2} />
        </mesh>
      </group>
    </Selectable>
  )
}

function Knight() {
  return (
    <group position={[1.2, 0, WALL + 3.6]} rotation={[0, Math.PI, 0]}>
      <Selectable id="knight" labelOffset={1.7}>
        <Figure body="#9fb0c8" hair="#3f2c22" hat="helmet" cape="#6f93bf" />
        <mesh position={[0.35, 0.9, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 2, 6]} />
          <Mat color={P.woodDark} />
        </mesh>
        <mesh position={[0.35, 1.95, 0]}>
          <coneGeometry args={[0.07, 0.25, 6]} />
          <Mat color={P.silver} />
        </mesh>
        <mesh position={[-0.3, 0.55, 0.15]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.35, 0.45, 0.06]} />
          <Mat color={P.roof} />
        </mesh>
        <mesh position={[-0.3, 0.6, 0.19]} rotation={[0, 0.3, 0]}>
          <sphereGeometry args={[0.07, 8, 6]} />
          <Mat color={P.rose} />
        </mesh>
      </Selectable>
    </group>
  )
}

export function Castle() {
  return (
    <group>
      {/* 庭院地面 */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[WALL * 2 - 0.8, 0.04, WALL * 2 - 0.8]} />
        <Mat color="#e9dcc3" />
      </mesh>
      <CurtainWall />
      <Towers />
      <Gatehouse />
      <Keep />
      <GreatHall />
      <Chapel />
      <Stable />
      <Well />
      <RoseGarden />
      <Knight />
    </group>
  )
}

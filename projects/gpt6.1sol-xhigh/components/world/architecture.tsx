'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { palette as p } from '@/lib/world-data'

type Position = [number, number, number]

export function Block({ position = [0, 0, 0], size, color = p.stone, rotation, ...props }: { position?: Position; size: Position; color?: string; rotation?: Position } & Omit<React.ComponentProps<'mesh'>, 'position' | 'rotation' | 'scale'>) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow {...props}><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.9} /></mesh>
}

function Flag({ position }: { position: Position }) {
  const flag = useRef<THREE.Group>(null)
  useFrame(({ clock }) => { if (flag.current) flag.current.rotation.y = Math.sin(clock.elapsedTime * 1.4 + position[0]) * 0.2 })
  return <group position={position}><mesh position={[0, 0.45, 0]}><cylinderGeometry args={[0.022, 0.022, 0.9, 6]} /><meshStandardMaterial color={p.ink} /></mesh><group ref={flag}><mesh position={[0.28, 0.68, 0]}><planeGeometry args={[0.55, 0.27, 4, 1]} /><meshStandardMaterial color={p.gold} side={THREE.DoubleSide} roughness={1} /></mesh></group><mesh position={[0, 0.94, 0]}><sphereGeometry args={[0.055, 8, 6]} /><meshStandardMaterial color={p.gold} /></mesh></group>
}

function Window({ position, rotation = 0, lit = false, small = false }: { position: Position; rotation?: number; lit?: boolean; small?: boolean }) {
  const w = small ? 0.16 : 0.25
  const h = small ? 0.37 : 0.6
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, h * 0.15, 0]}><boxGeometry args={[w + 0.11, h + 0.1, 0.055]} /><meshStandardMaterial color={p.paper} roughness={1} /></mesh>
    <mesh position={[0, h * 0.15, 0.035]}><boxGeometry args={[w, h, 0.025]} /><meshStandardMaterial color={lit ? p.gold : p.ink} emissive={p.gold} emissiveIntensity={lit ? 0.6 : 0} roughness={0.85} /></mesh>
    <mesh position={[0, h * 0.65, 0.037]}><circleGeometry args={[w / 2, 12, 0, Math.PI]} /><meshStandardMaterial color={lit ? p.gold : p.ink} emissive={p.gold} emissiveIntensity={lit ? 0.5 : 0} side={THREE.DoubleSide} /></mesh>
    <Block position={[0, h * 0.15, 0.065]} size={[0.035, h, 0.035]} color={p.stone} />
    <Block position={[0, h * 0.15, 0.065]} size={[w, 0.035, 0.035]} color={p.stone} />
    <Block position={[0, -h * 0.42, 0.08]} size={[w + 0.2, 0.075, 0.15]} color={p.paper} />
  </group>
}

export function Tower({ position, height = 5, radius = 0.7, roof = true, lit = false, flag = true }: { position: Position; height?: number; radius?: number; roof?: boolean; lit?: boolean; flag?: boolean }) {
  return <group position={position}>
    <mesh position={[0, height / 2, 0]} castShadow receiveShadow><cylinderGeometry args={[radius * 0.93, radius, height, 14]} /><meshStandardMaterial color={p.stone} roughness={1} /></mesh>
    {[0.25, height * 0.36, height * 0.7, height - 0.12].map((y, i) => <mesh key={i} position={[0, y, 0]} castShadow><cylinderGeometry args={[radius * 1.04, radius * 1.04, i === 3 ? 0.25 : 0.1, 14]} /><meshStandardMaterial color={p.paper} roughness={1} /></mesh>)}
    {Array.from({ length: 3 }, (_, floor) => Array.from({ length: 5 }, (_, side) => {
      const a = side * Math.PI * 2 / 5
      return <Window key={`${floor}-${side}`} position={[Math.sin(a) * radius, height * (0.22 + floor * 0.27), Math.cos(a) * radius]} rotation={a} small={radius < 0.65} lit={lit} />
    }))}
    {roof ? <group position={[0, height + radius * 1.2, 0]}>
      <mesh castShadow><coneGeometry args={[radius * 1.44, radius * 2.8, 12]} /><meshStandardMaterial color={p.sage} roughness={0.95} flatShading /></mesh>
      {[0.15, 0.42, 0.69].map((f) => <mesh key={f} position={[0, -radius * 1.4 + f * radius * 2.8, 0]}><cylinderGeometry args={[radius * 1.44 * (1 - f), radius * 1.44 * (1 - f) + 0.035, 0.045, 12]} /><meshStandardMaterial color={p.ink} transparent opacity={0.2} /></mesh>)}
      <mesh position={[0, radius * 1.45, 0]}><sphereGeometry args={[0.065, 8, 6]} /><meshStandardMaterial color={p.gold} /></mesh>
      {flag && <Flag position={[0, radius * 1.43, 0]} />}
    </group> : <>{Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5; return <Block key={i} position={[Math.sin(a) * radius, height + 0.23, Math.cos(a) * radius]} size={[0.28, 0.5, 0.28]} /> })}</>}
    {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <Block key={i} position={[Math.sin(a) * radius * 0.96, 0.28, Math.cos(a) * radius * 0.96]} size={[0.17, 0.55, 0.17]} color={p.paper} rotation={[0, a, 0]} /> })}
  </group>
}

function CurtainWall({ position, length, rotation = 0 }: { position: Position; length: number; rotation?: number }) {
  return <group position={position} rotation={[0, rotation, 0]}>
    <Block position={[0, 1.1, 0]} size={[length, 2.2, 0.42]} />
    <Block position={[0, 2.18, 0]} size={[length + 0.06, 0.16, 0.53]} color={p.paper} />
    <Block position={[0, 0.22, 0.1]} size={[length, 0.36, 0.57]} color={p.paper} />
    {Array.from({ length: Math.ceil(length / 0.52) }, (_, i) => <Block key={i} position={[-length / 2 + 0.2 + i * 0.52, 2.46, 0]} size={[0.29, 0.44, 0.48]} />)}
    {Array.from({ length: Math.floor(length / 1.4) }, (_, i) => <Block key={i} position={[-length / 2 + 0.7 + i * 1.4, 1.32, 0.225]} size={[0.09, 0.48, 0.025]} color={p.ink} />)}
    {Array.from({ length: Math.floor(length / 2) }, (_, i) => <Block key={i} position={[-length / 2 + 0.6 + i * 2, 0.9, 0.28]} size={[0.27, 1.8, 0.27]} color={p.paper} />)}
  </group>
}

export function Person({ position, color = p.sage, rotation = 0, role = 'villager' }: { position: Position; color?: string; rotation?: number; role?: 'villager' | 'guard' | 'prince' | 'gardener' }) {
  return <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, 0.38, 0]} castShadow><coneGeometry args={[0.13, 0.34, 7]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
    <mesh position={[0, 0.66, 0]} castShadow><sphereGeometry args={[0.1, 9, 7]} /><meshStandardMaterial color={p.stone} /></mesh>
    <mesh position={[0, 0.72, -0.015]}><sphereGeometry args={[0.105, 8, 5, 0, Math.PI * 2, 0, Math.PI * 0.6]} /><meshStandardMaterial color={role === 'prince' ? p.gold : p.ink} /></mesh>
    {[-0.055, 0.055].map(x => <Block key={x} position={[x, 0.12, 0]} size={[0.055, 0.24, 0.07]} color={p.ink} />)}
    {[-1, 1].map(s => <Block key={s} position={[s * 0.14, 0.42, 0]} size={[0.06, 0.24, 0.07]} color={color} rotation={[0, 0, s * 0.2]} />)}
    {role === 'prince' && <><Block position={[0, 0.55, 0]} size={[0.23, 0.055, 0.19]} color={p.gold} /><Block position={[0.18, 0.55, -0.04]} size={[0.38, 0.07, 0.035]} color={p.gold} rotation={[0, 0.2, 0.15]} /></>}
    {role === 'guard' && <><Block position={[0.2, 0.47, 0]} size={[0.025, 0.93, 0.025]} color={p.ink} /><mesh position={[0.2, 0.99, 0]}><coneGeometry args={[0.055, 0.15, 4]} /><meshStandardMaterial color={p.paper} /></mesh></>}
    {role === 'gardener' && <mesh position={[0, 0.77, 0]}><cylinderGeometry args={[0.17, 0.17, 0.035, 10]} /><meshStandardMaterial color={p.gold} /></mesh>}
  </group>
}

function Furniture({ floor }: { floor: number }) {
  if (floor === 0) return <group>
    <Block position={[0, 0.56, 0]} size={[1.65, 0.13, 1.1]} color={p.ink} />
    {[-0.65, 0.65].map(x => [-0.38, 0.38].map(z => <Block key={`${x}-${z}`} position={[x, 0.26, z]} size={[0.1, 0.55, 0.1]} color={p.ink} />))}
    {[-1, 1].map(x => <group key={x}><Block position={[x, 0.32, 0]} size={[0.4, 0.13, 1.1]} color={p.ink} /><Block position={[x, 0.16, 0]} size={[0.14, 0.3, 0.85]} color={p.ink} /></group>)}
    {[-0.45, 0, 0.45].map(x => <mesh key={x} position={[x, 0.645, 0.23]}><cylinderGeometry args={[0.12, 0.12, 0.03, 12]} /><meshStandardMaterial color={p.paper} /></mesh>)}
    <Block position={[0, 0.71, -0.15]} size={[0.16, 0.2, 0.16]} color={p.gold} />
    <Block position={[0, 0.6, -1.17]} size={[1.15, 1.2, 0.32]} color={p.paper} />
    <Block position={[0, 0.45, -0.98]} size={[0.65, 0.7, 0.08]} color={p.ink} />
    <mesh position={[0, 0.28, -0.9]}><coneGeometry args={[0.16, 0.32, 6]} /><meshStandardMaterial color={p.gold} emissive={p.gold} emissiveIntensity={0.6} /></mesh>
  </group>
  if (floor === 1) return <group>
    {[-1.45, 1.45].map(x => <group key={x} position={[x, 0, -0.6]}>
      <Block position={[0, 0.65, 0]} size={[0.32, 1.3, 1.3]} color={p.ink} />
      {[0.2, 0.58, 0.96].map(y => <group key={y}><Block position={[0, y, 0.05]} size={[0.39, 0.07, 1.35]} color={p.stone} />{Array.from({ length: 7 }, (_, i) => <Block key={i} position={[x > 0 ? -0.18 : 0.18, y + 0.16, -0.49 + i * 0.16]} size={[0.22, 0.25 + (i % 3) * 0.025, 0.1]} color={[p.gold, p.sage, p.paper][i % 3]} />)}</group>)}
    </group>)}
    <Block position={[0, 0.55, 0.2]} size={[1.2, 0.1, 0.75]} color={p.ink} />
    <Block position={[0, 0.25, 0.2]} size={[0.65, 0.5, 0.45]} color={p.ink} />
    <Block position={[0.05, 0.62, 0.2]} size={[0.5, 0.025, 0.36]} color={p.paper} rotation={[0, 0.2, 0]} />
    <Person position={[0.7, 0, 0.6]} color={p.gold} />
  </group>
  return <group>
    <Block position={[-0.55, 0.28, -0.3]} size={[1.15, 0.45, 1.8]} color={p.ink} />
    <Block position={[-0.55, 0.53, -0.2]} size={[1.12, 0.16, 1.55]} color={p.sage} />
    <Block position={[-0.55, 0.65, -0.85]} size={[0.8, 0.15, 0.4]} color={p.paper} />
    <Block position={[0.78, 0.32, -0.8]} size={[0.45, 0.64, 0.45]} color={p.stone} />
    <mesh position={[0.78, 0.75, -0.8]}><sphereGeometry args={[0.12, 8, 6]} /><meshStandardMaterial color={p.gold} emissive={p.gold} emissiveIntensity={0.35} /></mesh>
    <Block position={[0.2, 0.035, 0.8]} size={[1.6, 0.025, 0.7]} color={p.gold} />
  </group>
}

function Keep({ cutaway, lit }: { cutaway: boolean; lit: boolean }) {
  return <group position={[0, 0.35, -0.55]}>
    <Block position={[0, 3.5, -1.45]} size={[3.8, 7, 0.25]} />
    {[-1.9, 1.9].map(x => <Block key={x} position={[x, 3.5, 0]} size={[0.25, 7, 3.1]} />)}
    {!cutaway && <Block position={[0, 3.5, 1.5]} size={[3.8, 7, 0.22]} />}
    {[0, 1, 2].map(floor => <group key={floor} position={[0, floor * 2.25 + 0.14, 0]}>
      <Block size={[3.9, 0.18, 3.2]} color={p.paper} />
      {Array.from({ length: 10 }, (_, i) => <Block key={i} position={[-1.7 + i * 0.38, 0.101, 0]} size={[0.012, 0.008, 3.1]} color={p.stone} />)}
      <Furniture floor={floor} />
      {!cutaway && [-1, 0, 1].map(x => <Window key={x} position={[x * 1.15, 1, 1.63]} lit={lit} />)}
      {cutaway && <Block position={[1.3, 0.6, 0.5]} size={[0.15, 1.2, 1.3]} color={p.ink} rotation={[0, 0, -0.4]} />}
      {[0, 1, 2, 3, 4].map(i => <Block key={i} position={[1.2, i * 0.22 + 0.15, -0.8 + i * 0.25]} size={[0.6, 0.14, 0.3]} color={p.stone} />)}
    </group>)}
    {!cutaway && <group position={[0, 8.05, 0]}>
      <mesh rotation={[0, Math.PI / 4, 0]} castShadow><coneGeometry args={[3.04, 2.8, 4]} /><meshStandardMaterial color={p.sage} roughness={1} flatShading /></mesh>
      <Block position={[0, 1.3, 0]} size={[0.13, 0.13, 3.4]} color={p.gold} />
      <Tower position={[0, 0.85, -0.1]} height={2.1} radius={0.35} lit={lit} />
    </group>}
    {[2.28, 4.53, 6.78].map(y => <Block key={y} position={[0, y, 1.6]} size={[3.95, 0.12, 0.2]} color={p.paper} visible={!cutaway} />)}
  </group>
}

export function Castle({ cutaway, night }: { cutaway: boolean; night: boolean }) {
  return <group name="星语城堡" scale={0.9}>
    <Block position={[0, 0.12, -0.4]} size={[10.4, 0.28, 7.2]} color={p.paper} />
    <CurtainWall position={[-4.75, 0.23, -0.6]} length={6.8} rotation={Math.PI / 2} />
    <CurtainWall position={[4.75, 0.23, -0.6]} length={6.8} rotation={Math.PI / 2} />
    <CurtainWall position={[0, 0.23, -3.9]} length={9.5} />
    {!cutaway && <><CurtainWall position={[-3.05, 0.23, 2.85]} length={3.4} /><CurtainWall position={[3.05, 0.23, 2.85]} length={3.4} /></>}
    {[-4.75, 4.75].map(x => [-3.85, 2.8].map(z => <Tower key={`${x}-${z}`} position={[x, 0.3, z]} height={z < 0 ? 4.7 : 3.8} radius={0.66} lit={night} flag={z < 0} />))}
    <Keep cutaway={cutaway} lit={night} />
    <Tower position={[-2.4, 0.3, -0.5]} height={8.2} radius={0.7} lit={night} />
    <Tower position={[2.3, 0.3, -0.7]} height={9.6} radius={0.72} lit={night} />
    <Tower position={[-1.25, 0.3, -2.65]} height={10.4} radius={0.56} lit={night} />
    <Tower position={[1.3, 0.3, -2.6]} height={7.5} radius={0.52} lit={night} />
    {!cutaway && <group position={[0, 0.3, 2.9]}>
      {[-1.2, 1.2].map(x => <Tower key={x} position={[x, 0, 0]} height={3.4} radius={0.48} lit={night} flag={false} />)}
      <Block position={[0, 2.35, 0]} size={[1.5, 0.8, 0.6]} />
      <mesh position={[0, 1.25, 0.36]}><torusGeometry args={[0.6, 0.16, 6, 18, Math.PI]} /><meshStandardMaterial color={p.paper} /></mesh>
      {[-0.66, 0.66].map(x => <Block key={x} position={[x, 0.63, 0.36]} size={[0.25, 1.25, 0.23]} color={p.paper} />)}
      <Block position={[0, 0.75, -0.2]} size={[1.1, 1.5, 0.1]} color={p.ink} />
      {[-0.4, -0.2, 0, 0.2, 0.4].map(x => <Block key={x} position={[x, 1.05, 0.39]} size={[0.045, 1.55, 0.04]} color={p.ink} />)}
      <Block position={[0, 0.06, 0.8]} size={[1.4, 0.15, 1.6]} color={p.stone} />
      {[-1.85, 1.85].map(x => <Person key={x} position={[x, 0.1, 0.6]} role="guard" />)}
    </group>}
    <group position={[3.1, 0.45, 0.8]}>
      <mesh><cylinderGeometry args={[0.56, 0.64, 0.18, 16]} /><meshStandardMaterial color={p.stone} /></mesh>
      <mesh position={[0, 0.13, 0]}><cylinderGeometry args={[0.47, 0.47, 0.1, 16]} /><meshStandardMaterial color={p.sage} roughness={0.2} /></mesh>
      <mesh position={[0, 0.43, 0]}><cylinderGeometry args={[0.065, 0.12, 0.7, 8]} /><meshStandardMaterial color={p.paper} /></mesh>
      <mesh position={[0, 0.75, 0]}><sphereGeometry args={[0.15, 10, 8]} /><meshStandardMaterial color={p.gold} /></mesh>
    </group>
    <Person position={[-3.8, 2.6, -0.8]} role="prince" />
    <Person position={[2.8, 0.3, 1.9]} color={p.gold} rotation={1.4} />
  </group>
}

export function House({ position, rotation = 0, scale = 1 }: { position: Position; rotation?: number; scale?: number }) {
  return <group position={position} rotation={[0, rotation, 0]} scale={scale} name="木骨架村屋">
    <Block position={[0, 0.65, 0]} size={[1.4, 1.3, 1.2]} color={p.paper} />
    <Block position={[0, 0.16, 0]} size={[1.5, 0.32, 1.3]} />
    <mesh position={[0, 1.64, 0]} rotation={[0, Math.PI / 4, 0]} castShadow><coneGeometry args={[1.23, 1, 4]} /><meshStandardMaterial color={p.sage} roughness={1} /></mesh>
    {[-0.65, 0, 0.65].map(x => <Block key={x} position={[x, 0.72, 0.62]} size={[0.065, 1.2, 0.06]} color={p.ink} />)}
    {[0.4, 1.2].map(y => <Block key={y} position={[0, y, 0.63]} size={[1.4, 0.06, 0.065]} color={p.ink} />)}
    <Block position={[-0.4, 0.45, 0.65]} size={[0.32, 0.7, 0.045]} color={p.ink} />
    <Window position={[0.34, 0.65, 0.65]} small />
    <Block position={[0.48, 1.85, -0.3]} size={[0.23, 0.8, 0.25]} />
    <Block position={[0.48, 2.27, -0.3]} size={[0.32, 0.1, 0.33]} color={p.paper} />
  </group>
}

export function Windmill({ position }: { position: Position }) {
  const blades = useRef<THREE.Group>(null)
  useFrame((_, dt) => { if (blades.current) blades.current.rotation.z -= dt * 0.18 })
  return <group position={position} rotation={[0, 0.4, 0]} name="旋转的风车">
    <mesh position={[0, 1.25, 0]} castShadow><cylinderGeometry args={[0.42, 0.67, 2.5, 9]} /><meshStandardMaterial color={p.paper} /></mesh>
    <mesh position={[0, 2.7, 0]} castShadow><coneGeometry args={[0.7, 0.8, 9]} /><meshStandardMaterial color={p.sage} /></mesh>
    <Window position={[0, 1.2, 0.52]} small />
    <group position={[0, 2.1, 0.6]} ref={blades} rotation={[0, 0, 0.3]}>
      {[0, 1, 2, 3].map(i => <group key={i} rotation={[0, 0, i * Math.PI / 2]}>
        <Block position={[0, 0.7, 0]} size={[0.055, 1.5, 0.06]} color={p.ink} />
        <Block position={[0.12, 1, 0]} size={[0.32, 0.8, 0.045]} color={p.stone} />
        {[0.65, 0.85, 1.05, 1.25, 1.4].map(y => <Block key={y} position={[0.12, y, 0.03]} size={[0.36, 0.035, 0.035]} color={p.ink} />)}
      </group>)}
      <mesh><sphereGeometry args={[0.13, 8, 6]} /><meshStandardMaterial color={p.gold} /></mesh>
    </group>
  </group>
}

'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { palette as p } from '@/lib/world-data'
import { Block, House, Person, Windmill } from './architecture'

type Position = [number, number, number]
const random = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }

function IslandRock() {
  const geometry = useMemo(() => {
    const segments = 42
    const layers = [{ y: 0, r: 9.2, x: 0 }, { y: -0.6, r: 9.4, x: 0 }, { y: -1.9, r: 8.4, x: -0.2 }, { y: -3.7, r: 6.7, x: 0.1 }, { y: -5.6, r: 4.2, x: 0.4 }, { y: -7.6, r: 0.55, x: 1 }]
    const vertices: number[] = [], colors: number[] = []
    const base = new THREE.Color(p.stone), ink = new THREE.Color(p.ink), paper = new THREE.Color(p.paper)
    const point = (layer: number, i: number) => {
      const l = layers[layer], a = i / segments * Math.PI * 2
      const r = l.r * (0.9 + random(i % segments + 2) * 0.16)
      return [Math.cos(a) * r + l.x, l.y + (layer === 0 ? 0 : (random(i + layer * 90) - 0.5) * 0.7), Math.sin(a) * r * 0.83]
    }
    for (let layer = 0; layer < layers.length - 1; layer++) {
      for (let i = 0; i < segments; i++) {
        const a = point(layer, i), b = point(layer, (i + 1) % segments), c = point(layer + 1, i), d = point(layer + 1, (i + 1) % segments)
        for (const [n, triangle] of [[0, [a, b, c]], [1, [b, d, c]]] as const) {
          const color = base.clone().lerp(random(i * 7 + layer) > 0.4 ? paper : ink, random(i * 3 + layer * 21 + n) * (layer > 1 ? 0.29 : 0.18))
          triangle.forEach(v => { vertices.push(...v); colors.push(color.r, color.g, color.b) })
        }
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    g.computeVertexNormals()
    return g
  }, [])
  return <mesh geometry={geometry} castShadow receiveShadow name="浮岛岩石地层"><meshStandardMaterial vertexColors flatShading roughness={1} side={THREE.DoubleSide} /></mesh>
}

function Meadow() {
  const geometry = useMemo(() => {
    const vertices: number[] = [], colors: number[] = []
    const sage = new THREE.Color(p.sage), paper = new THREE.Color(p.paper)
    for (let i = 0; i < 42; i++) {
      const a = i * Math.PI / 21, b = (i + 1) * Math.PI / 21
      const ra = 9.2 * (0.9 + random(i + 2) * 0.16), rb = 9.2 * (0.9 + random((i + 1) % 42 + 2) * 0.16)
      vertices.push(0, 0.035, 0, Math.cos(b) * rb, 0.035, Math.sin(b) * rb * 0.83, Math.cos(a) * ra, 0.035, Math.sin(a) * ra * 0.83)
      const c = sage.clone().lerp(paper, 0.13 + random(i) * 0.15)
      for (let j = 0; j < 3; j++) colors.push(c.r, c.g, c.b)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); g.computeVertexNormals()
    return g
  }, [])
  return <mesh geometry={geometry} receiveShadow name="岛上草地"><meshStandardMaterial vertexColors roughness={1} /></mesh>
}

export function Tree({ position, scale = 1, gold = false, pine = false }: { position: Position; scale?: number; gold?: boolean; pine?: boolean }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.65, 0]} castShadow><cylinderGeometry args={[0.07, 0.12, 1.3, 6]} /><meshStandardMaterial color={p.ink} roughness={1} /></mesh>
    {pine ? [0, 1, 2].map(i => <mesh key={i} position={[0, 0.9 + i * 0.43, 0]} castShadow><coneGeometry args={[0.65 - i * 0.12, 1.15, 7]} /><meshStandardMaterial color={p.sage} roughness={1} flatShading /></mesh>) : <>
      <mesh position={[0, 1.65, 0]} scale={[0.88, 1.08, 0.85]} castShadow><icosahedronGeometry args={[0.85, 1]} /><meshStandardMaterial color={gold ? p.gold : p.sage} roughness={1} flatShading /></mesh>
      <mesh position={[0.44, 1.25, 0.15]} scale={[0.85, 0.9, 0.9]} castShadow><icosahedronGeometry args={[0.6, 1]} /><meshStandardMaterial color={gold ? p.gold : p.sage} roughness={1} flatShading /></mesh>
    </>}
  </group>
}

function Path({ points, width = 0.6 }: { points: Position[]; width?: number }) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map(v => new THREE.Vector3(...v)))
    const positions: number[] = [], indices: number[] = []
    const up = new THREE.Vector3(0, 1, 0)
    for (let i = 0; i <= 50; i++) {
      const t = i / 50, pos = curve.getPoint(t), side = curve.getTangent(t).cross(up).normalize().multiplyScalar(width / 2)
      positions.push(...pos.clone().add(side).toArray(), ...pos.clone().sub(side).toArray())
      if (i < 50) { const j = i * 2; indices.push(j, j + 2, j + 1, j + 1, j + 2, j + 3) }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals(); return g
  }, [points, width])
  return <mesh geometry={geometry} receiveShadow><meshStandardMaterial color={p.stone} roughness={1} side={THREE.DoubleSide} /></mesh>
}

function Flowers() {
  const positions = useMemo(() => Array.from({ length: 110 }, (_, i) => {
    const a = random(i * 3) * Math.PI * 2, r = 5.7 + random(i * 7) * 2.7
    return [Math.cos(a) * r, 0.12, Math.sin(a) * r * 0.8] as Position
  }), [])
  return <group>{positions.map((pos, i) => <group key={i} position={pos}>
    <mesh position={[0, 0.12, 0]}><cylinderGeometry args={[0.013, 0.013, 0.25, 4]} /><meshStandardMaterial color={p.sage} /></mesh>
    <mesh position={[0, 0.25, 0]}><icosahedronGeometry args={[0.055 + random(i) * 0.035, 0]} /><meshStandardMaterial color={i % 4 === 0 ? p.paper : p.gold} roughness={1} /></mesh>
  </group>)}</group>
}

function Waterfall() {
  const streaks = useRef<THREE.Group>(null)
  useFrame(({ clock }) => { if (streaks.current) streaks.current.children.forEach((child, i) => { child.position.y = -((clock.elapsedTime * 0.9 + i * 0.47) % 6.4) - 0.4 }) })
  return <group name="浅湖与云间瀑布">
    <mesh position={[6.6, 0.09, 0.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1.6, 1]}><circleGeometry args={[1.1, 32]} /><meshStandardMaterial color={p.paper} roughness={0.28} metalness={0.12} /></mesh>
    <mesh position={[6.6, 0.1, 0.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1.6, 1]}><circleGeometry args={[0.98, 32]} /><meshStandardMaterial color={p.sage} transparent opacity={0.77} roughness={0.2} metalness={0.1} /></mesh>
    {Array.from({ length: 17 }, (_, i) => { const a = i / 17 * Math.PI * 2; return <mesh key={i} position={[6.6 + Math.cos(a) * 1.12, 0.13, 0.6 + Math.sin(a) * 1.72]} scale={[0.24, 0.15, 0.2]} castShadow><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color={i % 3 ? p.stone : p.paper} roughness={1} /></mesh> })}
    <mesh position={[7.1, 0.095, 2.7]} rotation={[-Math.PI / 2, 0, -0.3]}><planeGeometry args={[0.68, 2.3]} /><meshStandardMaterial color={p.sage} roughness={0.18} /></mesh>
    {[0, 1, 2].map(i => <mesh key={i} position={[7.22 + i * 0.12, -3.15, 3.65 + i * 0.03]} rotation={[0.025, 0, -0.04]}><planeGeometry args={[0.28, 6.5, 1, 6]} /><meshStandardMaterial color={i === 1 ? p.paper : p.sage} transparent opacity={i === 1 ? 0.7 : 0.4} side={THREE.DoubleSide} roughness={0.18} /></mesh>)}
    <group ref={streaks}>{Array.from({ length: 13 }, (_, i) => <mesh key={i} position={[7.05 + random(i) * 0.55, -i * 0.48, 3.72]}><boxGeometry args={[0.015, 0.22 + random(i) * 0.3, 0.015]} /><meshStandardMaterial color={p.paper} transparent opacity={0.7} /></mesh>)}</group>
  </group>
}

function Rose() {
  return <group position={[3.4, 0.1, 5.6]} name="玻璃罩中的玫瑰">
    <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.3, 0.35, 0.12, 16]} /><meshStandardMaterial color={p.stone} /></mesh>
    <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.022, 0.022, 0.55, 6]} /><meshStandardMaterial color={p.sage} /></mesh>
    {[0, 1, 2, 3, 4].map(i => <mesh key={i} position={[Math.cos(i * 1.256) * 0.065, 0.63, Math.sin(i * 1.256) * 0.065]}><sphereGeometry args={[0.09, 7, 5]} /><meshStandardMaterial color={p.gold} /></mesh>)}
    <mesh position={[0, 0.43, 0]} scale={[1, 1.4, 1]}><sphereGeometry args={[0.33, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={p.paper} transparent opacity={0.22} roughness={0.05} depthWrite={false} /></mesh>
    <mesh position={[0, 0.26, 0]}><cylinderGeometry args={[0.33, 0.33, 0.5, 16, 1, true]} /><meshStandardMaterial color={p.paper} transparent opacity={0.16} roughness={0.05} side={THREE.DoubleSide} depthWrite={false} /></mesh>
  </group>
}

export function Landscape() {
  const trees = useMemo(() => Array.from({ length: 27 }, (_, i) => {
    const a = i / 27 * Math.PI * 2
    return { position: [Math.cos(a) * (7.5 + random(i) * 0.5), 0.05, Math.sin(a) * (5.9 + random(i + 8) * 0.45)] as Position, scale: 0.65 + random(i + 14) * 0.5, gold: i % 5 === 0, pine: i > 10 && i < 22 }
  }).filter(t => !(t.position[0] > 5.7 && t.position[2] > -1.4 && t.position[2] < 4.3)), [])
  return <group name="浮空岛">
    <IslandRock /><Meadow />
    {Array.from({ length: 11 }, (_, i) => <mesh key={i} position={[-4.5 + random(i * 3) * 9, -2 - random(i * 5) * 4, 3.5 - random(i * 7) * 7]} scale={[0.7 + random(i), 0.8 + random(i * 4), 0.6]} rotation={[i, i * 2, 0]} castShadow><dodecahedronGeometry args={[1.25, 0]} /><meshStandardMaterial color={i % 3 === 0 ? p.paper : p.stone} roughness={1} flatShading /></mesh>)}
    <mesh position={[1.15, -8.7, 0.4]} rotation={[0.4, 0.7, 0.2]} scale={[0.45, 0.75, 0.45]}><dodecahedronGeometry args={[0.6]} /><meshStandardMaterial color={p.stone} roughness={1} /></mesh>
    <Path points={[[0, 0.08, 3.2], [0, 0.08, 4.5], [1.2, 0.08, 5.2], [3.5, 0.08, 5.4], [6, 0.08, 4.5]]} width={0.7} />
    <Path points={[[0, 0.081, 4.7], [-2.2, 0.081, 4.5], [-4.2, 0.081, 3.3], [-6, 0.081, 2.6], [-6.2, 0.081, 0]]} width={0.55} />
    {trees.map((tree, i) => <Tree key={i} {...tree} />)}
    <Tree position={[-5.7, 0, 4.8]} scale={0.85} gold /><Tree position={[4.7, 0, 4.3]} scale={0.8} gold />
    <House position={[-6.3, 0.12, 1.9]} rotation={0.3} scale={0.84} />
    <House position={[-6.8, 0.12, -0.5]} rotation={0.7} scale={0.72} />
    <House position={[-4.7, 0.12, 4.7]} rotation={-0.2} scale={0.8} />
    <Windmill position={[-6.2, 0.1, 3.6]} />
    <Flowers /><Waterfall /><Rose />
    <Person position={[-5.2, 0.08, 2.6]} color={p.gold} rotation={-0.6} />
    <Person position={[-3.1, 0.08, 4.7]} rotation={1} />
    <Person position={[4.3, 0.08, 5.4]} role="gardener" />
    <group position={[2.2, 0.12, 6.2]} rotation={[0, -0.3, 0]}>
      <Block position={[0, 0.35, 0]} size={[1.05, 0.1, 0.35]} color={p.ink} /><Block position={[0, 0.64, -0.15]} size={[1.05, 0.45, 0.08]} color={p.ink} />
      {[-0.4, 0.4].map(x => <Block key={x} position={[x, 0.17, 0]} size={[0.1, 0.35, 0.3]} color={p.ink} />)}
    </group>
    {[0, 1, 2].map(i => <Block key={i} position={[0, 0.08 + i * 0.04, 3.6 - i * 0.2]} size={[1.3, 0.12, 0.25]} color={p.paper} />)}
  </group>
}

export function Clouds() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => { if (group.current) group.current.position.x = Math.sin(clock.elapsedTime * 0.06) * 0.5 })
  return <group ref={group} name="漂浮的云">
    {[[11, -3.5, -5, 1.2], [-12, -1.4, -4, 1.1], [3, -7.5, 8, 1.4], [-8, -6, 6, 0.9], [10, 5, -8, 0.65]].map(([x, y, z, s], i) => <group key={i} position={[x, y, z]} scale={s}>
      {[[-1, 0, 0, 1.5], [0, 0.4, 0, 1.9], [1.5, 0.1, 0, 1.2], [0.5, -0.3, 0.7, 1.4]].map(([cx, cy, cz, r], j) => <mesh key={j} position={[cx, cy, cz]} scale={[1.25, 0.48, 0.8]}><icosahedronGeometry args={[r, 2]} /><meshStandardMaterial color={p.paper} transparent opacity={0.84} roughness={1} depthWrite={false} /></mesh>)}
    </group>)}
  </group>
}

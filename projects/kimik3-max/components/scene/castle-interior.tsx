'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { P } from '@/lib/palette'

// 摇曳的烛火
function Flame({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const s = scale * (1 + Math.sin(t * 9 + position[0] * 7 + position[2] * 5) * 0.2)
    ref.current?.scale.setScalar(s)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshBasicMaterial color={P.flame} />
    </mesh>
  )
}

// 闪烁的暖光
function FlickerLight({
  position,
  intensity = 1,
  distance = 12,
  color = '#ffbf7a',
}: {
  position: [number, number, number]
  intensity?: number
  distance?: number
  color?: string
}) {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (ref.current) {
      ref.current.intensity = intensity * (1 + Math.sin(t * 8 + position[0]) * 0.18)
    }
  })
  return <pointLight ref={ref} position={position} intensity={intensity} distance={distance} color={color} />
}

// 纹章旗
function Banner({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 6]} />
        <meshStandardMaterial color={P.woodDark} />
      </mesh>
      <mesh position={[0, -0.9, 0.06]}>
        <boxGeometry args={[1.1, 2.1, 0.05]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.7, 0.1]}>
        <circleGeometry args={[0.32, 16]} />
        <meshStandardMaterial color={P.gold} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// 一层 · 宴会大厅
export function GreatHall() {
  return (
    <group>
      {/* 深红地毯 */}
      <mesh position={[0, 0.08, 0.4]}>
        <cylinderGeometry args={[2.1, 2.1, 0.08, 24]} />
        <meshStandardMaterial color={P.roseDark} />
      </mesh>
      {/* 长桌 */}
      <group position={[0, 0, 0.4]}>
        <mesh position={[0, 1.0, 0]} castShadow>
          <boxGeometry args={[5.2, 0.22, 1.5]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
        {[
          [-2.3, -0.55],
          [2.3, -0.55],
          [-2.3, 0.55],
          [2.3, 0.55],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.45, z]}>
            <boxGeometry args={[0.22, 0.9, 0.22]} />
            <meshStandardMaterial color={P.woodDark} flatShading />
          </mesh>
        ))}
        {/* 长椅 */}
        {[-1.25, 1.25].map((z, i) => (
          <mesh key={i} position={[0, 0.5, z]}>
            <boxGeometry args={[4.8, 0.16, 0.5]} />
            <meshStandardMaterial color={P.woodDark} flatShading />
          </mesh>
        ))}
        {/* 银杯与瓷盘 */}
        {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
          <group key={i}>
            <mesh position={[x, 1.22, -0.4]}>
              <cylinderGeometry args={[0.09, 0.07, 0.26, 8]} />
              <meshStandardMaterial color={P.gold} metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[x, 1.13, 0.35]}>
              <cylinderGeometry args={[0.26, 0.26, 0.04, 12]} />
              <meshStandardMaterial color="#f8f2e4" />
            </mesh>
          </group>
        ))}
        {/* 桌面烛台 */}
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.06, 0.12, 0.4, 8]} />
          <meshStandardMaterial color={P.brass} metalness={0.5} roughness={0.4} />
        </mesh>
        <Flame position={[0, 1.58, 0]} />
      </group>

      {/* 领主高座 */}
      <group position={[0, 0, -3.2]}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[3.2, 0.5, 2]} />
          <meshStandardMaterial color={P.wallShade} flatShading />
        </mesh>
        <mesh position={[0, 0.85, -0.3]}>
          <boxGeometry args={[1.1, 0.7, 0.9]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
        <mesh position={[0, 1.9, -0.7]}>
          <boxGeometry args={[1.1, 2.6, 0.25]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
        <mesh position={[0, 1.0, -0.25]}>
          <boxGeometry args={[0.9, 0.25, 0.7]} />
          <meshStandardMaterial color={P.roseDark} />
        </mesh>
        <mesh position={[0, 3.35, -0.7]}>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial color={P.gold} metalness={0.5} roughness={0.35} />
        </mesh>
      </group>

      {/* 石砌壁炉 */}
      <group position={[-3.2, 0, -3.6]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[2.2, 2.2, 0.5]} />
          <meshStandardMaterial color={P.wallShade} flatShading />
        </mesh>
        <mesh position={[0, 0.85, 0.28]}>
          <boxGeometry args={[1.3, 1.3, 0.3]} />
          <meshStandardMaterial color="#3d3350" />
        </mesh>
        {/* 柴火与火焰 */}
        {[0.15, -0.15].map((x, i) => (
          <mesh key={i} position={[x, 0.35, 0.3]} rotation={[0, 0, Math.PI / 2 + i * 0.4]}>
            <cylinderGeometry args={[0.09, 0.09, 0.9, 6]} />
            <meshStandardMaterial color={P.woodDark} flatShading />
          </mesh>
        ))}
        <mesh position={[0, 0.75, 0.3]}>
          <coneGeometry args={[0.4, 0.9, 8]} />
          <meshBasicMaterial color="#ff9d5c" />
        </mesh>
        <Flame position={[0, 1.05, 0.3]} scale={1.4} />
        <FlickerLight position={[0, 1.4, 1]} intensity={1.6} distance={10} color="#ff9d5c" />
      </group>

      {/* 铜吊灯 */}
      <group position={[0, 4.1, 0.4]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1, 6]} />
          <meshStandardMaterial color={P.night} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.95, 0.07, 8, 24]} />
          <meshStandardMaterial color={P.brass} metalness={0.5} roughness={0.4} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2
          const x = Math.cos(a) * 0.95
          const z = Math.sin(a) * 0.95
          return (
            <group key={i} position={[x, 0, z]}>
              <mesh position={[0, 0.14, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.28, 6]} />
                <meshStandardMaterial color="#f8f2e4" />
              </mesh>
              <Flame position={[0, 0.36, 0]} scale={0.8} />
            </group>
          )
        })}
        <FlickerLight position={[0, -0.4, 0]} intensity={1.2} distance={11} />
      </group>

      {/* 纹章旗 */}
      <Banner position={[-4.05, 3.6, 0]} color={P.rose} />
      <Banner position={[4.05, 3.6, 0]} color={P.roof} />
    </group>
  )
}

// 二层 · 领主居室
export function Solar() {
  return (
    <group>
      {/* 地毯 */}
      <mesh position={[0.6, 0.08, 0.2]}>
        <cylinderGeometry args={[1.5, 1.5, 0.07, 20]} />
        <meshStandardMaterial color={P.roof} />
      </mesh>
      {/* 华盖床 */}
      <group position={[-2.2, 0, -2.2]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[2.4, 0.5, 1.6]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
        <mesh position={[0, 0.68, 0]}>
          <boxGeometry args={[2.2, 0.22, 1.4]} />
          <meshStandardMaterial color="#f8f2e4" />
        </mesh>
        <mesh position={[0.4, 0.82, 0]}>
          <boxGeometry args={[1.2, 0.14, 1.3]} />
          <meshStandardMaterial color={P.rose} />
        </mesh>
        <mesh position={[-0.8, 0.85, 0]}>
          <boxGeometry args={[0.5, 0.18, 0.7]} />
          <meshStandardMaterial color="#fdf8ee" />
        </mesh>
        {/* 床柱与华盖 */}
        {[
          [-1.1, -0.7],
          [1.1, -0.7],
          [-1.1, 0.7],
          [1.1, 0.7],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 1.3, z]}>
            <cylinderGeometry args={[0.07, 0.07, 2.6, 6]} />
            <meshStandardMaterial color={P.woodDark} />
          </mesh>
        ))}
        <mesh position={[0, 2.65, 0]}>
          <boxGeometry args={[2.5, 0.14, 1.8]} />
          <meshStandardMaterial color={P.rose} />
        </mesh>
      </group>
      {/* 书桌与摊开的书 */}
      <group position={[2.6, 0, -2.6]}>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[1.6, 0.14, 0.9]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
        {[
          [-0.65, -0.3],
          [0.65, -0.3],
          [-0.65, 0.3],
          [0.65, 0.3],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.36, z]}>
            <boxGeometry args={[0.12, 0.72, 0.12]} />
            <meshStandardMaterial color={P.woodDark} />
          </mesh>
        ))}
        <mesh position={[-0.2, 0.86, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.45, 0.05, 0.6]} />
          <meshStandardMaterial color="#fdf8ee" />
        </mesh>
        <mesh position={[0.25, 0.86, 0]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.45, 0.05, 0.6]} />
          <meshStandardMaterial color="#fdf8ee" />
        </mesh>
        <Flame position={[0.6, 1.05, -0.25]} scale={0.8} />
        <mesh position={[0.6, 0.92, -0.25]}>
          <cylinderGeometry args={[0.05, 0.08, 0.22, 6]} />
          <meshStandardMaterial color={P.brass} />
        </mesh>
      </group>
      {/* 椅子 */}
      <group position={[2.6, 0, -1.2]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.6, 0.12, 0.6]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
        <mesh position={[0, 0.95, 0.26]}>
          <boxGeometry args={[0.6, 0.9, 0.1]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
      </group>
      {/* 小书架 */}
      <group position={[-3.9, 0, 1.6]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.4, 2, 1.6]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
        {[0.5, 1.0, 1.5].map((y, i) => (
          <group key={i} position={[0.12, y, 0]}>
            {[-0.5, -0.15, 0.2, 0.55].map((z, j) => (
              <mesh key={j} position={[0, 0, z]}>
                <boxGeometry args={[0.2, 0.36, 0.26]} />
                <meshStandardMaterial color={[P.rose, P.roof, P.gold, P.leaf][(i + j) % 4]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  )
}

// 顶层 · 观星书房（露天）
export function Observatory() {
  return (
    <group>
      {/* 黄铜望远镜 */}
      <group position={[1.6, 0, -1.4]} rotation={[0, -0.6, 0]}>
        <group position={[0, 1.35, 0]} rotation={[0, 0, -0.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.16, 0.22, 1.7, 10]} />
            <meshStandardMaterial color={P.brass} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.18, 10]} />
            <meshStandardMaterial color={P.brass} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.4, 0.6, Math.sin(a) * 0.4]}
              rotation={[Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35]}
            >
              <cylinderGeometry args={[0.04, 0.04, 1.4, 6]} />
              <meshStandardMaterial color={P.woodDark} />
            </mesh>
          )
        })}
      </group>
      {/* 星图桌 */}
      <group position={[-1.8, 0, 0.6]}>
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[1.5, 0.12, 1.1]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
        {[
          [-0.6, -0.4],
          [0.6, -0.4],
          [-0.6, 0.4],
          [0.6, 0.4],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.34, z]}>
            <boxGeometry args={[0.1, 0.68, 0.1]} />
            <meshStandardMaterial color={P.woodDark} />
          </mesh>
        ))}
        {/* 星图：深蓝纸面 + 白色星点 */}
        <mesh position={[0, 0.78, 0]}>
          <boxGeometry args={[1.2, 0.02, 0.85]} />
          <meshStandardMaterial color="#3d4a72" />
        </mesh>
        {[
          [-0.4, -0.2],
          [-0.1, 0.15],
          [0.2, -0.1],
          [0.42, 0.25],
          [0.05, -0.32],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.81, z]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshBasicMaterial color="#fdf8ee" />
          </mesh>
        ))}
      </group>
      {/* 地球仪 */}
      <group position={[-3.2, 0, -2.4]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 1, 8]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.42, 14, 14]} />
          <meshStandardMaterial color={P.water} flatShading />
        </mesh>
        <mesh position={[0.12, 1.45, 0.28]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={P.grass} flatShading />
        </mesh>
      </group>
      {/* 大书架 */}
      <group position={[3.9, 0, 1.2]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.45, 2.2, 2]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
        {[0.55, 1.1, 1.65].map((y, i) => (
          <group key={i} position={[-0.14, y, 0]}>
            {[-0.7, -0.35, 0, 0.35, 0.7].map((z, j) => (
              <mesh key={j} position={[0, 0, z]}>
                <boxGeometry args={[0.22, 0.4, 0.28]} />
                <meshStandardMaterial color={[P.rose, P.roof, P.gold, P.leaf, P.roseDark][(i + j) % 5]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      {/* 小凳子 */}
      <mesh position={[0.2, 0.3, 1.8]}>
        <cylinderGeometry args={[0.35, 0.4, 0.6, 8]} />
        <meshStandardMaterial color={P.wood} flatShading />
      </mesh>
    </group>
  )
}

// 礼拜堂内部
export function ChapelInterior() {
  return (
    <group>
      {/* 中央红毯 */}
      <mesh position={[0, 0.07, 0.8]}>
        <boxGeometry args={[1.2, 0.06, 5.6]} />
        <meshStandardMaterial color={P.roseDark} />
      </mesh>
      {/* 祭坛 */}
      <group position={[0, 0, -3.2]}>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[2.2, 1.1, 1]} />
          <meshStandardMaterial color={P.wallShade} flatShading />
        </mesh>
        <mesh position={[0, 1.12, 0]}>
          <boxGeometry args={[2.4, 0.08, 1.2]} />
          <meshStandardMaterial color="#fdf8ee" />
        </mesh>
        {/* 黄铜十字架 */}
        <mesh position={[0, 1.75, -0.2]}>
          <boxGeometry args={[0.1, 1.1, 0.1]} />
          <meshStandardMaterial color={P.brass} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.95, -0.2]}>
          <boxGeometry args={[0.55, 0.1, 0.1]} />
          <meshStandardMaterial color={P.brass} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* 祭坛蜡烛 */}
        {[-0.85, 0.85].map((x, i) => (
          <group key={i} position={[x, 1.16, 0.2]}>
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.36, 6]} />
              <meshStandardMaterial color="#f8f2e4" />
            </mesh>
            <Flame position={[0, 0.44, 0]} scale={0.9} />
          </group>
        ))}
        <FlickerLight position={[0, 2, 0.8]} intensity={1} distance={8} />
      </group>
      {/* 橡木长椅 */}
      {[-0.4, 1.6].map((z, row) =>
        [-1.6, 1.6].map((x, col) => (
          <group key={`${row}-${col}`} position={[x, 0, z]}>
            <mesh position={[0, 0.42, 0]}>
              <boxGeometry args={[1.8, 0.12, 0.45]} />
              <meshStandardMaterial color={P.wood} flatShading />
            </mesh>
            <mesh position={[0, 0.75, -0.2]}>
              <boxGeometry args={[1.8, 0.55, 0.08]} />
              <meshStandardMaterial color={P.wood} flatShading />
            </mesh>
            {[-0.75, 0.75].map((lx, i) => (
              <mesh key={i} position={[lx, 0.2, 0]}>
                <boxGeometry args={[0.1, 0.4, 0.4]} />
                <meshStandardMaterial color={P.woodDark} />
              </mesh>
            ))}
          </group>
        )),
      )}
    </group>
  )
}

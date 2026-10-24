'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { P } from '@/lib/palette'
import { GreatHall, Solar, Observatory, ChapelInterior } from './castle-interior'

// 城墙顶部的垛口
function Merlons({ length, axis = 'x' }: { length: number; axis?: 'x' | 'z' }) {
  const count = Math.max(2, Math.floor(length / 1.3))
  const items = []
  for (let i = 0; i <= count; i++) {
    const t = -length / 2 + (i * length) / count
    items.push(
      <mesh key={i} position={axis === 'x' ? [t, 0.4, 0] : [0, 0.4, t]}>
        <boxGeometry args={axis === 'x' ? [0.7, 0.8, 0.85] : [0.85, 0.8, 0.7]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>,
    )
  }
  return <group>{items}</group>
}

// 一段带巡道与垛口的城墙
function CurtainWall({
  position,
  length,
  axis = 'x',
}: {
  position: [number, number, number]
  length: number
  axis?: 'x' | 'z'
}) {
  return (
    <group position={position} rotation={axis === 'z' ? [0, Math.PI / 2, 0] : undefined}>
      <mesh position={[0, 2.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 4.5, 1]} />
        <meshStandardMaterial color={P.wall} flatShading />
      </mesh>
      {/* 巡道石板 */}
      <mesh position={[0, 4.55, 0]}>
        <boxGeometry args={[length, 0.18, 1.5]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>
      <group position={[0, 4.6, 0]}>
        <Merlons length={length} axis="x" />
      </group>
    </group>
  )
}

// 圆形角楼：塔身 + 蓝色锥顶 + 玫瑰色旗帜
function Tower({
  position,
  height = 9,
  radius = 2.1,
  flag = true,
}: {
  position: [number, number, number]
  height?: number
  radius?: number
  flag?: boolean
}) {
  const flagRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (flagRef.current) {
      flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 1.8 + position[0]) * 0.3
    }
  })

  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow>
        <cylinderGeometry args={[radius, radius * 1.18, height, 12]} />
        <meshStandardMaterial color={P.wall} flatShading />
      </mesh>
      {/* 塔顶檐口 */}
      <mesh position={[0, height + 0.25, 0]}>
        <cylinderGeometry args={[radius * 1.28, radius * 1.05, 0.6, 12]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>
      {/* 锥形屋顶 */}
      <mesh position={[0, height + 0.55 + radius * 0.95, 0]} castShadow>
        <coneGeometry args={[radius * 1.32, radius * 1.9, 12]} />
        <meshStandardMaterial color={P.roof} flatShading />
      </mesh>
      {/* 箭窗 */}
      {[0.45, 0.7].map((h, i) => (
        <mesh key={i} position={[0, height * h, radius * 1.05]}>
          <boxGeometry args={[0.4, 0.8, 0.12]} />
          <meshStandardMaterial color="#5c4a3a" />
        </mesh>
      ))}
      {flag && (
        <group position={[0, height + radius * 1.9 + 1.1, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.8, 6]} />
            <meshStandardMaterial color={P.woodDark} />
          </mesh>
          <group ref={flagRef} position={[0, 1.2, 0]}>
            <mesh position={[0.5, 0, 0]}>
              <boxGeometry args={[1, 0.55, 0.04]} />
              <meshStandardMaterial color={P.rose} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.32, 0, 0.03]}>
              <circleGeometry args={[0.14, 12]} />
              <meshStandardMaterial color={P.gold} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  )
}

// 城门楼：双塔 + 拱顶 + 铁闸 + 吊桥
function Gatehouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Tower position={[-2.9, 0, 0]} height={7.5} radius={1.5} flag={false} />
      <Tower position={[2.9, 0, 0]} height={7.5} radius={1.5} flag={false} />
      {/* 门洞上方拱体 */}
      <mesh position={[0, 5.4, 0]} castShadow>
        <boxGeometry args={[4.4, 2.6, 1.6]} />
        <meshStandardMaterial color={P.wall} flatShading />
      </mesh>
      <group position={[0, 6.7, 0]}>
        <Merlons length={4.4} axis="x" />
      </group>
      {/* 门洞侧柱 */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 1.7, 0]}>
          <boxGeometry args={[1.4, 3.4, 1.6]} />
          <meshStandardMaterial color={P.wall} flatShading />
        </mesh>
      ))}
      {/* 铁闸门（半升起） */}
      <group position={[0, 3.4, 0]}>
        {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 2.2, 6]} />
            <meshStandardMaterial color={P.night} metalness={0.4} roughness={0.5} />
          </mesh>
        ))}
        {[0.1, 1.0].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 2.2, 6]} />
            <meshStandardMaterial color={P.night} metalness={0.4} roughness={0.5} />
          </mesh>
        ))}
      </group>
      {/* 敞开的橡木大门 */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.4, 0, 0.8]} rotation={[0, side * 0.9, 0]}>
          <mesh position={[side * 0.7, 1.6, 0]} castShadow>
            <boxGeometry args={[1.4, 3.2, 0.16]} />
            <meshStandardMaterial color={P.wood} flatShading />
          </mesh>
          <mesh position={[side * 0.7, 1.6, 0.1]}>
            <boxGeometry args={[1.1, 0.14, 0.06]} />
            <meshStandardMaterial color={P.woodDark} />
          </mesh>
        </group>
      ))}
      {/* 家训石匾 */}
      <mesh position={[0, 4.6, 0.85]}>
        <boxGeometry args={[2.2, 0.7, 0.12]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>
      <mesh position={[0, 4.6, 0.93]}>
        <circleGeometry args={[0.22, 16]} />
        <meshStandardMaterial color={P.gold} />
      </mesh>
      {/* 吊桥 */}
      <mesh position={[0, 0.12, 3.4]} rotation={[-0.04, 0, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.18, 4.6]} />
        <meshStandardMaterial color={P.wood} flatShading />
      </mesh>
      {[-1.4, 1.4].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 3.4]}>
          <boxGeometry args={[0.14, 0.6, 4.4]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
      ))}
    </group>
  )
}

// 主堡：朝庭院敞开的三层剖面塔楼
function Keep({ position }: { position: [number, number, number] }) {
  const W = 9 // 宽（x）
  const D = 8 // 深（z）
  const H = 13 // 总高
  const T = 0.7 // 墙厚

  return (
    <group position={position}>
      {/* 后墙 */}
      <mesh position={[0, H / 2, -D / 2]} castShadow>
        <boxGeometry args={[W, H, T]} />
        <meshStandardMaterial color={P.wall} flatShading />
      </mesh>
      {/* 两侧墙 */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(side * (W - T)) / 2, H / 2, 0]} castShadow>
          <boxGeometry args={[T, H, D]} />
          <meshStandardMaterial color={P.wall} flatShading />
        </mesh>
      ))}
      {/* 正面剖切立柱（保持建筑轮廓） */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(side * (W - T)) / 2, H / 2, D / 2 - T / 2]}>
          <boxGeometry args={[T, H, T]} />
          <meshStandardMaterial color={P.wallShade} flatShading />
        </mesh>
      ))}
      {/* 橡木楼板 */}
      {[5, 9.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[W - T, 0.4, D - T]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
      ))}
      {/* 屋顶平台与垛口 */}
      <mesh position={[0, H + 0.2, 0]}>
        <boxGeometry args={[W, 0.4, D]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>
      <group position={[0, H + 0.4, 0]}>
        <group position={[0, 0, -D / 2 + 0.3]}>
          <Merlons length={W} axis="x" />
        </group>
        <group position={[0, 0, D / 2 - 0.3]}>
          <Merlons length={W} axis="x" />
        </group>
        <group position={[-W / 2 + 0.3, 0, 0]}>
          <Merlons length={D} axis="z" />
        </group>
        <group position={[W / 2 - 0.3, 0, 0]}>
          <Merlons length={D} axis="z" />
        </group>
      </group>
      {/* 后墙暖光窗（由内点亮） */}
      {[
        [-2.2, 2.6],
        [2.2, 2.6],
        [-2.2, 7.2],
        [2.2, 7.2],
        [0, 11.5],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -D / 2 - 0.05]}>
          <boxGeometry args={[0.9, 1.3, 0.1]} />
          <meshStandardMaterial color="#ffd98a" emissive="#ffbf6a" emissiveIntensity={0.9} />
        </mesh>
      ))}
      {/* 螺旋石阶（角落踏步） */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = i * 0.7
        return (
          <mesh key={i} position={[3.2 + Math.cos(a) * 0.7, 0.6 + i * 0.55, -2.6 + Math.sin(a) * 0.7]}>
            <boxGeometry args={[0.9, 0.16, 0.9]} />
            <meshStandardMaterial color={P.wallShade} flatShading />
          </mesh>
        )
      })}

      {/* 三层内部 */}
      <GreatHall />
      <group position={[0, 5.2, 0]}>
        <Solar />
      </group>
      <group position={[0, 9.9, 0]}>
        <Observatory />
      </group>
    </group>
  )
}

// 礼拜堂：彩绘玻璃 + 小钟楼
function Chapel({ position }: { position: [number, number, number] }) {
  const W = 7
  const D = 9
  const H = 5

  return (
    <group position={position}>
      {/* 后墙与侧墙（正面敞开可见内部） */}
      <mesh position={[0, H / 2, -D / 2]} castShadow>
        <boxGeometry args={[W, H, 0.6]} />
        <meshStandardMaterial color={P.wall} flatShading />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(side * (W - 0.6)) / 2, H / 2, 0]} castShadow>
          <boxGeometry args={[0.6, H, D]} />
          <meshStandardMaterial color={P.wall} flatShading />
        </mesh>
      ))}
      {/* 正面立柱与山墙 */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(side * (W - 0.6)) / 2, H / 2, D / 2 - 0.3]}>
          <boxGeometry args={[0.6, H, 0.6]} />
          <meshStandardMaterial color={P.wallShade} flatShading />
        </mesh>
      ))}
      {/* 人字形屋顶 */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[(side * W) / 4, H + 1.05, 0]}
          rotation={[0, 0, side * -0.5]}
          castShadow
        >
          <boxGeometry args={[W / 2 + 1.1, 0.3, D + 1]} />
          <meshStandardMaterial color={P.roof} flatShading />
        </mesh>
      ))}
      {/* 屋脊 */}
      <mesh position={[0, H + 1.95, 0]}>
        <boxGeometry args={[0.4, 0.3, D + 1]} />
        <meshStandardMaterial color={P.roofDark} flatShading />
      </mesh>
      {/* 正面玫瑰窗 */}
      <mesh position={[0, H + 0.4, D / 2 + 0.05]}>
        <circleGeometry args={[0.85, 20]} />
        <meshStandardMaterial color={P.rose} emissive={P.rose} emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, H + 0.4, D / 2 + 0.02]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.85, 0.09, 8, 24]} />
        <meshStandardMaterial color={P.wallShade} flatShading />
      </mesh>
      {/* 侧面彩绘玻璃 */}
      {[-1, 1].map((side) =>
        [-2, 0.5].map((z, i) => (
          <mesh key={`${side}-${i}`} position={[(side * W) / 2, 2.8, z]}>
            <boxGeometry args={[0.1, 1.9, 0.9]} />
            <meshStandardMaterial
              color={i === 0 ? P.gold : P.roof}
              emissive={i === 0 ? P.gold : P.roof}
              emissiveIntensity={0.65}
            />
          </mesh>
        )),
      )}
      {/* 小钟楼与金铃 */}
      <group position={[0, H + 2.1, D / 2 - 0.6]}>
        {[-0.4, 0.4].map((x, i) => (
          <mesh key={i} position={[x, 0.5, 0]}>
            <boxGeometry args={[0.16, 1, 0.16]} />
            <meshStandardMaterial color={P.wallShade} />
          </mesh>
        ))}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[1.2, 0.2, 0.4]} />
          <meshStandardMaterial color={P.wallShade} flatShading />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <coneGeometry args={[0.75, 0.7, 4]} />
          <meshStandardMaterial color={P.roof} flatShading />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.28, 10, 10]} />
          <meshStandardMaterial color={P.gold} metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      <ChapelInterior />
    </group>
  )
}

// 庭院：水井、大旗、草靶、酒桶与干草垛
function Courtyard() {
  const flagRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (flagRef.current) {
      flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 1.5) * 0.22
    }
  })

  return (
    <group>
      {/* 水井 */}
      <group position={[-2, 0, -5]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[1, 1.1, 1, 12]} />
          <meshStandardMaterial color={P.wallShade} flatShading />
        </mesh>
        <mesh position={[0, 1.02, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 0.1, 12]} />
          <meshStandardMaterial color="#3d3350" />
        </mesh>
        {[-0.9, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 1.6, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 1.6, 6]} />
            <meshStandardMaterial color={P.woodDark} />
          </mesh>
        ))}
        <mesh position={[0, 2.5, 0]}>
          <coneGeometry args={[1.3, 0.8, 8]} />
          <meshStandardMaterial color={P.roof} flatShading />
        </mesh>
        {/* 轱辘与水桶 */}
        <mesh position={[0, 1.9, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 1.7, 8]} />
          <meshStandardMaterial color={P.wood} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.22, 0.18, 0.4, 8]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
      </group>

      {/* 庭院大旗 */}
      <group position={[3, 0, -4]}>
        <mesh position={[0, 2.6, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 5.2, 8]} />
          <meshStandardMaterial color={P.woodDark} />
        </mesh>
        <group ref={flagRef} position={[0, 4.4, 0]}>
          <mesh position={[0.75, -0.5, 0]}>
            <boxGeometry args={[1.5, 1.9, 0.05]} />
            <meshStandardMaterial color={P.rose} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.75, -0.3, 0.04]}>
            <circleGeometry args={[0.3, 16]} />
            <meshStandardMaterial color={P.gold} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* 草靶与木剑 */}
      <group position={[6, 0, -3]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1.4, 10]} />
          <meshStandardMaterial color={P.wheat} flatShading />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 10, 10]} />
          <meshStandardMaterial color={P.wheat} flatShading />
        </mesh>
        <mesh position={[0.3, 1.1, 0.3]} rotation={[0.6, 0, 0.9]}>
          <boxGeometry args={[0.08, 1.1, 0.08]} />
          <meshStandardMaterial color={P.wood} />
        </mesh>
      </group>

      {/* 酒桶 */}
      {[
        [-6, -3.2],
        [-5, -3.6],
        [-5.5, -2.4],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.55, z]} castShadow>
          <cylinderGeometry args={[0.5, 0.55, 1.1, 10]} />
          <meshStandardMaterial color={P.wood} flatShading />
        </mesh>
      ))}
      {/* 干草垛 */}
      {[
        [7.5, -6.5],
        [6.3, -7.2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.5, z]} castShadow>
          <cylinderGeometry args={[0.7, 0.8, 1, 10]} />
          <meshStandardMaterial color={P.wheat} flatShading />
        </mesh>
      ))}
    </group>
  )
}

// 整座城堡
export function Castle() {
  return (
    <group>
      {/* 后墙与两侧墙 */}
      <CurtainWall position={[0, 0, -18]} length={30} axis="x" />
      <CurtainWall position={[-15, 0, -8]} length={20} axis="z" />
      <CurtainWall position={[15, 0, -8]} length={20} axis="z" />
      {/* 前墙（城门两侧） */}
      <CurtainWall position={[-8.9, 0, 2]} length={12.2} axis="x" />
      <CurtainWall position={[8.9, 0, 2]} length={12.2} axis="x" />
      {/* 四角塔楼 */}
      <Tower position={[-15, 0, -18]} />
      <Tower position={[15, 0, -18]} />
      <Tower position={[-15, 0, 2]} />
      <Tower position={[15, 0, 2]} />
      {/* 城门楼 */}
      <Gatehouse position={[0, 0, 2]} />
      {/* 主堡与礼拜堂 */}
      <Keep position={[-8.5, 0, -12]} />
      <Chapel position={[9, 0, -13]} />
      {/* 庭院 */}
      <Courtyard />
    </group>
  )
}

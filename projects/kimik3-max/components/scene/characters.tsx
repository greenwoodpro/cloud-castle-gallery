'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { P } from '@/lib/palette'

// 小王子：金发、绿衣、玫瑰色围巾，提着黄铜水壶
function LittlePrince({ position }: { position: [number, number, number] }) {
  const scarfRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (scarfRef.current) {
      scarfRef.current.rotation.x = 0.5 + Math.sin(clock.elapsedTime * 2.2) * 0.18
    }
  })

  return (
    <group position={position} rotation={[0, -0.9, 0]}>
      {/* 腿 */}
      {[-0.14, 0.14].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.6, 8]} />
          <meshStandardMaterial color={P.woodDark} flatShading />
        </mesh>
      ))}
      {/* 绿色外衣 */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.34, 0.85, 10]} />
        <meshStandardMaterial color={P.princeCoat} flatShading />
      </mesh>
      {/* 手臂 */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.32, 1.05, 0.05]} rotation={[0.3, 0, side * -0.5]}>
          <cylinderGeometry args={[0.06, 0.07, 0.55, 6]} />
          <meshStandardMaterial color={P.princeCoat} flatShading />
        </mesh>
      ))}
      {/* 头与金发 */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <sphereGeometry args={[0.28, 14, 14]} />
        <meshStandardMaterial color={P.skin} flatShading />
      </mesh>
      <mesh position={[0, 1.78, -0.04]} scale={[1.05, 0.75, 1.05]}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color={P.hair} flatShading />
      </mesh>
      {/* 玫瑰色围巾，随风飘起 */}
      <mesh position={[0, 1.42, 0]}>
        <torusGeometry args={[0.2, 0.07, 8, 16]} />
        <meshStandardMaterial color={P.rose} flatShading />
      </mesh>
      <mesh ref={scarfRef} position={[0, 1.42, -0.3]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.16, 0.04, 0.7]} />
        <meshStandardMaterial color={P.rose} flatShading />
      </mesh>
      {/* 黄铜水壶 */}
      <group position={[0.5, 0.55, 0.15]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.35, 10]} />
          <meshStandardMaterial color={P.brass} metalness={0.5} roughness={0.4} flatShading />
        </mesh>
        <mesh position={[0.22, 0.22, 0]} rotation={[0, 0, -0.7]}>
          <cylinderGeometry args={[0.04, 0.05, 0.35, 6]} />
          <meshStandardMaterial color={P.brass} metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}

// 狐狸：坐在麦田边，尾巴尖有一小撮白毛
function Fox({ position }: { position: [number, number, number] }) {
  const tailRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(clock.elapsedTime * 1.6) * 0.25
    }
  })

  return (
    <group position={position} rotation={[0, 2.4, 0]}>
      {/* 坐姿身体 */}
      <mesh position={[0, 0.42, 0]} rotation={[0.35, 0, 0]} castShadow>
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshStandardMaterial color={P.fox} flatShading />
      </mesh>
      {/* 胸口白毛 */}
      <mesh position={[0, 0.45, 0.3]}>
        <sphereGeometry args={[0.22, 10, 10]} />
        <meshStandardMaterial color="#fdf3e0" flatShading />
      </mesh>
      {/* 头与吻部 */}
      <mesh position={[0, 0.95, 0.12]} castShadow>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color={P.fox} flatShading />
      </mesh>
      <mesh position={[0, 0.88, 0.42]} rotation={[1.2, 0, 0]}>
        <coneGeometry args={[0.14, 0.35, 8]} />
        <meshStandardMaterial color="#fdf3e0" flatShading />
      </mesh>
      {/* 尖耳朵 */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.16, 1.22, 0.08]} rotation={[0, 0, side * -0.25]}>
          <coneGeometry args={[0.1, 0.28, 6]} />
          <meshStandardMaterial color={P.fox} flatShading />
        </mesh>
      ))}
      {/* 前腿 */}
      {[-0.15, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.25, 0.32]}>
          <cylinderGeometry args={[0.07, 0.08, 0.5, 6]} />
          <meshStandardMaterial color={P.fox} flatShading />
        </mesh>
      ))}
      {/* 大尾巴 */}
      <group ref={tailRef} position={[0, 0.3, -0.4]}>
        <mesh position={[0, 0.1, -0.35]} rotation={[1.1, 0, 0]} castShadow>
          <capsuleGeometry args={[0.16, 0.7, 4, 8]} />
          <meshStandardMaterial color={P.fox} flatShading />
        </mesh>
        <mesh position={[0, 0.42, -0.72]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#fdf3e0" flatShading />
        </mesh>
      </group>
    </group>
  )
}

// 点灯人与他的路灯
function Lamplighter({ position }: { position: [number, number, number] }) {
  const lampRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (lampRef.current) {
      lampRef.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 3) * 0.15
    }
  })

  return (
    <group position={position}>
      {/* 路灯 */}
      <group>
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.11, 3.2, 8]} />
          <meshStandardMaterial color={P.night} flatShading />
        </mesh>
        <mesh position={[0, 3.3, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.5]} />
          <meshStandardMaterial color="#ffd98a" emissive="#ffc46a" emissiveIntensity={1.2} transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 3.68, 0]}>
          <coneGeometry args={[0.42, 0.35, 4]} />
          <meshStandardMaterial color={P.night} flatShading />
        </mesh>
        <pointLight ref={lampRef} position={[0, 3.3, 0]} intensity={1.4} distance={10} color="#ffc46a" />
      </group>
      {/* 点灯人：蓝衣、圆帽，伸手向灯 */}
      <group position={[0.65, 0, 0.3]} rotation={[0, -0.5, 0]}>
        {[-0.12, 0.12].map((x, i) => (
          <mesh key={i} position={[x, 0.28, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.55, 8]} />
            <meshStandardMaterial color={P.night} flatShading />
          </mesh>
        ))}
        <mesh position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 0.8, 10]} />
          <meshStandardMaterial color={P.roof} flatShading />
        </mesh>
        <mesh position={[-0.3, 1.15, 0]} rotation={[0, 0, 0.9]}>
          <cylinderGeometry args={[0.05, 0.06, 0.55, 6]} />
          <meshStandardMaterial color={P.roof} flatShading />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow>
          <sphereGeometry args={[0.24, 12, 12]} />
          <meshStandardMaterial color={P.skin} flatShading />
        </mesh>
        <mesh position={[0, 1.72, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.22, 10]} />
          <meshStandardMaterial color={P.night} flatShading />
        </mesh>
        <mesh position={[0, 1.63, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 10]} />
          <meshStandardMaterial color={P.night} flatShading />
        </mesh>
      </group>
    </group>
  )
}

// 城门守卫：灰甲、红缨长矛
function Guard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {[-0.13, 0.13].map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.6, 8]} />
          <meshStandardMaterial color={P.night} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.32, 0.85, 10]} />
        <meshStandardMaterial color="#9aa3b2" flatShading />
      </mesh>
      <mesh position={[0, 1.58, 0]} castShadow>
        <sphereGeometry args={[0.26, 12, 12]} />
        <meshStandardMaterial color={P.skin} flatShading />
      </mesh>
      {/* 头盔与红缨 */}
      <mesh position={[0, 1.72, 0]} scale={[1.05, 0.8, 1.05]}>
        <sphereGeometry args={[0.27, 12, 12]} />
        <meshStandardMaterial color="#9aa3b2" metalness={0.4} roughness={0.5} flatShading />
      </mesh>
      <mesh position={[0, 1.98, 0]}>
        <coneGeometry args={[0.09, 0.3, 6]} />
        <meshStandardMaterial color={P.rose} flatShading />
      </mesh>
      {/* 长矛 */}
      <group position={[0.42, 0, 0.1]}>
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.8, 6]} />
          <meshStandardMaterial color={P.woodDark} />
        </mesh>
        <mesh position={[0, 2.95, 0]}>
          <coneGeometry args={[0.09, 0.35, 6]} />
          <meshStandardMaterial color="#c8cfda" metalness={0.5} roughness={0.4} flatShading />
        </mesh>
        <mesh position={[0, 2.7, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={P.rose} />
        </mesh>
      </group>
    </group>
  )
}

// 岛上所有人物
export function Characters() {
  return (
    <group>
      <LittlePrince position={[-11.5, 0, 12.8]} />
      <Fox position={[12, 0, 8.2]} />
      <Lamplighter position={[2.5, 0, 7.5]} />
      <Guard position={[2.2, 0, 4.2]} />
    </group>
  )
}

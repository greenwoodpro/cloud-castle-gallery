'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Stars } from '@react-three/drei'

// 黄昏渐变天穹：地平线蜜桃色 → 天顶雾蓝色
export function SkyDome() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new THREE.Color('#9db9e4') },
          uMid: { value: new THREE.Color('#f4d6bd') },
          uBottom: { value: new THREE.Color('#f2e2cc') },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uTop;
          uniform vec3 uMid;
          uniform vec3 uBottom;
          varying vec3 vDir;
          void main() {
            float h = vDir.y;
            vec3 col = h > 0.0
              ? mix(uMid, uTop, pow(clamp(h, 0.0, 1.0), 0.55))
              : mix(uMid, uBottom, pow(clamp(-h, 0.0, 1.0), 0.5));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [],
  )

  return (
    <mesh material={material} scale={[420, 420, 420]} renderOrder={-10}>
      <sphereGeometry args={[1, 32, 24]} />
    </mesh>
  )
}

// 落日：发光圆盘 + 光晕
export function Sun() {
  return (
    <group position={[150, 55, -110]}>
      <mesh>
        <sphereGeometry args={[14, 24, 24]} />
        <meshBasicMaterial color="#ffdca8" fog={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[20, 24, 24]} />
        <meshBasicMaterial color="#ffe9c4" transparent opacity={0.35} fog={false} />
      </mesh>
    </group>
  )
}

// 小王子世界里必不可少的星星
export function StarField() {
  return (
    <Stars radius={260} depth={60} count={2600} factor={5} saturation={0} fade speed={0.5} />
  )
}

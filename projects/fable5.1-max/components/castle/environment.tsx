'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { Mat } from './primitives'
import { Selectable } from './selectable'
import { Birds } from './characters'
import { useScene } from '@/lib/scene-store'
import { P } from './palette'

const DAY = { top: '#cdbfe8', bottom: '#ffd9c2', fog: '#f3d9d4' }
const NIGHT = { top: '#1c2140', bottom: '#4a4f85', fog: '#2a2f55' }

/** 用一个大球做渐变天空 */
function SkyDome() {
  const { night } = useScene()
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color(DAY.top) },
      uBottom: { value: new THREE.Color(DAY.bottom) },
    }),
    [],
  )
  const target = night ? NIGHT : DAY
  useFrame(() => {
    uniforms.uTop.value.lerp(new THREE.Color(target.top), 0.04)
    uniforms.uBottom.value.lerp(new THREE.Color(target.bottom), 0.04)
  })
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[120, 32, 16]} />
      <shaderMaterial
        ref={mat}
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`uniform vec3 uTop; uniform vec3 uBottom; varying vec3 vPos; void main(){ float h = normalize(vPos).y * 0.5 + 0.5; h = smoothstep(0.1, 0.9, h); gl_FragColor = vec4(mix(uBottom, uTop, h), 1.0); }`}
      />
    </mesh>
  )
}

function SceneFog() {
  const { scene } = useThree()
  const { night } = useScene()
  const target = useMemo(() => new THREE.Color(), [])
  useFrame(() => {
    target.set(night ? NIGHT.fog : DAY.fog)
    if (!scene.fog) scene.fog = new THREE.Fog(target.getHex(), 40, 120)
    ;(scene.fog as THREE.Fog).color.lerp(target, 0.04)
  })
  return null
}

function Sun() {
  const { night } = useScene()
  const ref = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (!ref.current) return
    const targetY = night ? -30 : 18
    ref.current.position.y += (targetY - ref.current.position.y) * 0.04
  })
  return (
    <mesh ref={ref} position={[-60, 18, -40]}>
      <sphereGeometry args={[5, 24, 16]} />
      <meshBasicMaterial color="#ffe3a8" />
    </mesh>
  )
}

function Moon() {
  const { night } = useScene()
  const ref = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (!ref.current) return
    const targetY = night ? 30 : -30
    ref.current.position.y += (targetY - ref.current.position.y) * 0.04
  })
  return (
    <mesh ref={ref} position={[50, -30, -50]}>
      <sphereGeometry args={[3.5, 24, 16]} />
      <meshBasicMaterial color="#f6f1dc" />
    </mesh>
  )
}

function Planets() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })
  const planets = [
    { pos: [45, 20, -30], r: 2.4, color: '#f2b8c6', ring: '#ffd6e0' },
    { pos: [-40, 26, 35], r: 1.8, color: '#a9d8ef', ring: null },
    { pos: [30, 8, 55], r: 1.2, color: '#f3c35b', ring: '#f9e2a6', b612: true },
  ] as const
  return (
    <Selectable id="stars" labelOffset={0}>
      <group ref={ref}>
        {planets.map((p, i) => (
          <group key={i} position={p.pos as unknown as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[p.r, 20, 14]} />
              <Mat color={p.color} emissive={p.color} emissiveIntensity={0.3} />
            </mesh>
            {p.ring && (
              <mesh rotation={[Math.PI / 2.6, 0, 0.4]}>
                <torusGeometry args={[p.r * 1.8, 0.12, 6, 40]} />
                <Mat color={p.ring} emissive={p.ring} emissiveIntensity={0.4} />
              </mesh>
            )}
            {'b612' in p && (
              <mesh position={[0, p.r + 0.3, 0]}>
                <sphereGeometry args={[0.22, 8, 6]} />
                <Mat color={P.rose} emissive={P.rose} emissiveIntensity={0.8} />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </Selectable>
  )
}

function Cloud({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * 0.05 * speed
    ref.current.position.x = position[0] + Math.sin(t) * 6
    ref.current.position.y = position[1] + Math.sin(t * 2.3) * 0.5
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      {[
        [0, 0, 0, 1.4],
        [1.4, 0.3, 0.2, 1.1],
        [-1.3, 0.2, -0.1, 1],
        [0.4, 0.8, 0.1, 0.9],
        [-0.5, -0.3, 0.6, 0.8],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 14, 10]} />
          <meshStandardMaterial color={P.cloud} roughness={1} transparent opacity={0.92} />
        </mesh>
      ))}
    </group>
  )
}

function Clouds() {
  return (
    <Selectable id="clouds" labelOffset={0}>
      <Cloud position={[-22, -6, 10]} scale={1.6} speed={1.2} />
      <Cloud position={[20, -10, -14]} scale={2} speed={0.8} />
      <Cloud position={[6, -14, 22]} scale={1.8} speed={1} />
      <Cloud position={[-18, 6, -24]} scale={1.3} speed={1.4} />
      <Cloud position={[28, 4, 18]} scale={1.1} speed={0.9} />
      <Cloud position={[-30, -2, -4]} scale={1.5} speed={1.1} />
      <Cloud position={[0, -22, -6]} scale={2.6} speed={0.6} />
    </Selectable>
  )
}

function Lighting() {
  const { night } = useScene()
  const sun = useRef<THREE.DirectionalLight>(null)
  const amb = useRef<THREE.AmbientLight>(null)
  const hemi = useRef<THREE.HemisphereLight>(null)
  useFrame(() => {
    if (sun.current) sun.current.intensity += ((night ? 0.35 : 2.2) - sun.current.intensity) * 0.05
    if (amb.current) amb.current.intensity += ((night ? 0.25 : 0.7) - amb.current.intensity) * 0.05
    if (hemi.current) hemi.current.intensity += ((night ? 0.3 : 0.9) - hemi.current.intensity) * 0.05
  })
  return (
    <>
      <ambientLight ref={amb} intensity={0.7} color="#fff1e6" />
      <hemisphereLight ref={hemi} args={['#dfe9ff', '#f3d6b8', 0.9]} />
      <directionalLight
        ref={sun}
        position={[-18, 22, -10]}
        intensity={2.2}
        color={night ? '#9fb3e6' : '#fff0d6'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-bias={-0.0005}
      />
    </>
  )
}

export function Environment() {
  const { night } = useScene()
  return (
    <>
      <SkyDome />
      <SceneFog />
      <Lighting />
      <Sun />
      <Moon />
      <Planets />
      <Clouds />
      <Birds />
      <Selectable id="sky" labelOffset={0}>
        <group />
      </Selectable>
      <group visible={night}>
        <Stars radius={90} depth={30} count={2500} factor={5} saturation={0.3} fade speed={0.6} />
      </group>
    </>
  )
}

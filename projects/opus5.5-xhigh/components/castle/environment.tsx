'use client'

import * as THREE from 'three'
import { Instance, Instances, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { PALETTE, Part, Toon, getGradientMap, seeded, useNight } from './materials'
import { LittlePrince } from './characters'
import { B612, type Vec3 } from './layout'

export const SKY = {
  day: { top: '#8db6dc', horizon: '#fcefdc', bottom: '#d3dcec', fog: '#f4ebdc' },
  night: { top: '#17213f', horizon: '#3e4677', bottom: '#262c52', fog: '#2f3561' },
}

export function SkyDome() {
  const night = useNight()
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new THREE.Color(SKY.day.top) },
          uHorizon: { value: new THREE.Color(SKY.day.horizon) },
          uBottom: { value: new THREE.Color(SKY.day.bottom) },
        },
        vertexShader: `
          varying vec3 vPos;
          void main() {
            vPos = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uTop;
          uniform vec3 uHorizon;
          uniform vec3 uBottom;
          varying vec3 vPos;
          void main() {
            float h = vPos.y;
            vec3 col = h > 0.0
              ? mix(uHorizon, uTop, pow(smoothstep(-0.02, 0.5, h), 0.7))
              : mix(uHorizon, uBottom, smoothstep(0.0, -0.35, h));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [],
  )
  useEffect(() => {
    const c = night ? SKY.night : SKY.day
    material.uniforms.uTop.value.set(c.top)
    material.uniforms.uHorizon.value.set(c.horizon)
    material.uniforms.uBottom.value.set(c.bottom)
  }, [night, material])

  return (
    <mesh material={material} renderOrder={-1}>
      <sphereGeometry args={[240, 32, 16]} />
    </mesh>
  )
}

export function Celestial() {
  const night = useNight()
  return (
    <group>
      <group position={night ? [-60, 55, -90] : [70, 60, -80]}>
        <mesh>
          <circleGeometry args={[night ? 4 : 6, 40]} />
          <meshBasicMaterial color={night ? '#f4efd9' : '#fff3d6'} fog={false} />
        </mesh>
        <mesh position={[0, 0, -0.1]}>
          <circleGeometry args={[night ? 6.5 : 10, 40]} />
          <meshBasicMaterial color={night ? '#f4efd9' : '#fff3d6'} transparent opacity={0.25} fog={false} />
        </mesh>
        {night && (
          <mesh position={[1.4, 0.9, 0.05]}>
            <circleGeometry args={[3.4, 40]} />
            <meshBasicMaterial color={SKY.night.top} fog={false} />
          </mesh>
        )}
      </group>
      {night && <Stars radius={150} depth={40} count={2500} factor={5} saturation={0} fade speed={0.6} />}
    </group>
  )
}

type CloudSpec = { center: Vec3; scale: number; seed: number }

function cloudPuffs(spec: CloudSpec) {
  const r = seeded(spec.seed)
  const n = 6 + Math.floor(r() * 4)
  return Array.from({ length: n }).map((_, i) => {
    const x = (i - n / 2) * 0.9 + (r() - 0.5) * 0.6
    const s = 1 - Math.abs(i - n / 2) / n + r() * 0.35
    return {
      p: [spec.center[0] + x * spec.scale, spec.center[1] + s * 0.35 * spec.scale, spec.center[2] + (r() - 0.5) * 1.2 * spec.scale] as Vec3,
      s: Math.max(0.5, s * 1.3) * spec.scale,
    }
  })
}

export function Clouds() {
  const map = useMemo(() => getGradientMap(), [])
  const night = useNight()
  const { sea, sky } = useMemo(() => {
    const r = seeded(321)
    const seaSpecs: CloudSpec[] = []
    for (let i = 0; i < 46; i++) {
      const a = r() * Math.PI * 2
      const d = 6 + r() * 70
      seaSpecs.push({ center: [Math.cos(a) * d, -17 - r() * 6, Math.sin(a) * d], scale: 2 + r() * 2.6, seed: i * 13 + 1 })
    }
    const skySpecs: CloudSpec[] = []
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + r() * 0.4
      const d = 30 + r() * 25
      skySpecs.push({ center: [Math.cos(a) * d, 2 + r() * 14, Math.sin(a) * d], scale: 1.1 + r() * 1.3, seed: i * 7 + 500 })
    }
    return { sea: seaSpecs.flatMap(cloudPuffs), sky: skySpecs.flatMap(cloudPuffs) }
  }, [])
  const seaRef = useRef<THREE.Group>(null)
  const skyRef = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (seaRef.current) seaRef.current.rotation.y += dt * 0.004
    if (skyRef.current) skyRef.current.rotation.y -= dt * 0.008
  })
  const color = night ? '#8e93bd' : '#ffffff'
  return (
    <group>
      <group ref={seaRef}>
        <Instances limit={sea.length}>
          <icosahedronGeometry args={[1, 2]} />
          <meshToonMaterial color={color} gradientMap={map} />
          {sea.map((p, i) => (
            <Instance key={i} position={p.p} scale={p.s} />
          ))}
        </Instances>
      </group>
      <group ref={skyRef}>
        <Instances limit={sky.length}>
          <icosahedronGeometry args={[1, 2]} />
          <meshToonMaterial color={color} gradientMap={map} />
          {sky.map((p, i) => (
            <Instance key={i} position={p.p} scale={p.s} />
          ))}
        </Instances>
      </group>
    </group>
  )
}

function Bird({ offset, phase }: { offset: Vec3; phase: number }) {
  const left = useRef<THREE.Mesh>(null)
  const right = useRef<THREE.Mesh>(null)
  const wing = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0.06, 0, 0, -0.06, 0.3, 0.02, -0.04], 3))
    g.computeVertexNormals()
    return g
  }, [])
  useFrame(({ clock }) => {
    const f = Math.sin(clock.elapsedTime * 7 + phase) * 0.6
    if (left.current) left.current.rotation.z = f
    if (right.current) right.current.rotation.z = -f
  })
  return (
    <group position={offset}>
      <mesh ref={left} geometry={wing}>
        <meshBasicMaterial color="#6b5a4b" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={right} geometry={wing} scale={[-1, 1, 1]}>
        <meshBasicMaterial color="#6b5a4b" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export function Birds() {
  const flock = useRef<THREE.Group>(null)
  const formation = useMemo(() => {
    const list: Vec3[] = [[0, 0, 0]]
    for (let i = 1; i <= 4; i++) {
      list.push([-i * 0.6, Math.sin(i) * 0.15, -i * 0.6])
      list.push([i * 0.6, Math.cos(i) * 0.15, -i * 0.6])
    }
    return list
  }, [])
  useFrame(({ clock }) => {
    if (!flock.current) return
    const t = clock.elapsedTime * 0.07
    const r = 30
    flock.current.position.set(Math.cos(t) * r, 13 + Math.sin(t * 3) * 1.5, Math.sin(t) * r)
    flock.current.rotation.y = -t
  })
  return (
    <group ref={flock}>
      {formation.map((o, i) => (
        <Bird key={i} offset={o} phase={i * 0.7} />
      ))}
    </group>
  )
}

function Islet({ position, scale = 1, phase = 0, tree = false }: { position: Vec3; scale?: number; phase?: number; tree?: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * 0.5 + phase
    ref.current.position.y = position[1] + Math.sin(t) * 0.4
    ref.current.rotation.y = t * 0.15
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      <Part color={PALETTE.grass} position={[0, 0, 0]} outline outlineThickness={0.04}>
        <cylinderGeometry args={[1, 0.95, 0.3, 9]} />
      </Part>
      <Part color={PALETTE.rock} position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]} outline outlineThickness={0.04}>
        <coneGeometry args={[0.95, 1.9, 9]} />
      </Part>
      {tree && (
        <group position={[0.2, 0.15, 0]}>
          <Part color={PALETTE.woodDark} position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.6, 6]} />
          </Part>
          <Part color={PALETTE.leaf} position={[0, 0.8, 0]} outline outlineThickness={0.02}>
            <icosahedronGeometry args={[0.45, 1]} />
          </Part>
        </group>
      )}
    </group>
  )
}

export function FloatingRocks() {
  return (
    <group>
      <Islet position={[-22, 3, -8]} scale={1.6} tree />
      <Islet position={[19, -3, 14]} scale={1.2} phase={1} />
      <Islet position={[-16, -6, 18]} scale={0.9} phase={2} tree />
      <Islet position={[8, -9, -22]} scale={1.1} phase={3} />
      <Islet position={[-26, -2, 4]} scale={0.6} phase={4} />
      <Islet position={[22, 5, 2]} scale={0.7} phase={5} />
    </group>
  )
}

function OnSphere({ radius, lat, lon, children }: { radius: number; lat: number; lon: number; children: React.ReactNode }) {
  const { position, quaternion } = useMemo(() => {
    const n = new THREE.Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon))
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), n)
    return { position: n.multiplyScalar(radius), quaternion: q }
  }, [radius, lat, lon])
  return (
    <group position={position} quaternion={quaternion}>
      {children}
    </group>
  )
}

function Volcano({ active }: { active: boolean }) {
  const smoke = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!smoke.current) return
    smoke.current.children.forEach((c, i) => {
      const t = (clock.elapsedTime * 0.4 + i / 3) % 1
      c.position.y = 0.3 + t * 0.8
      c.scale.setScalar(0.05 + t * 0.1)
    })
  })
  return (
    <group>
      <Part color={PALETTE.rockDark} position={[0, 0.15, 0]} outline outlineThickness={0.01}>
        <cylinderGeometry args={[0.08, 0.25, 0.3, 10]} />
      </Part>
      {active && (
        <>
          <mesh position={[0, 0.305, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.07, 10]} />
            <meshBasicMaterial color={PALETTE.fire} />
          </mesh>
          <group ref={smoke}>
            {[0, 1, 2].map((i) => (
              <mesh key={i}>
                <sphereGeometry args={[1, 8, 6]} />
                <meshBasicMaterial color={PALETTE.snow} transparent opacity={0.6} depthWrite={false} />
              </mesh>
            ))}
          </group>
        </>
      )}
    </group>
  )
}

function Rose() {
  return (
    <group>
      <Part color={PALETTE.leafDark} position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.24, 4]} />
      </Part>
      <Part color={PALETTE.leaf} position={[0.04, 0.1, 0]} rotation={[0, 0, -0.8]} scale={[1, 0.4, 0.6]}>
        <sphereGeometry args={[0.04, 6, 4]} />
      </Part>
      <Part color="#e0566a" position={[0, 0.26, 0]} outline outlineThickness={0.006}>
        <sphereGeometry args={[0.05, 10, 8]} />
      </Part>
      <mesh position={[0, 0.17, 0]}>
        <sphereGeometry args={[0.2, 20, 14, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
        <meshPhysicalMaterial color={PALETTE.glass} transparent opacity={0.28} roughness={0.1} depthWrite={false} />
      </mesh>
    </group>
  )
}

export function AsteroidB612() {
  const ref = useRef<THREE.Group>(null)
  const R = 2.2
  const craters = useMemo(() => {
    const r = seeded(612)
    return Array.from({ length: 9 }).map(() => ({ lat: (r() - 0.6) * 2.4, lon: r() * Math.PI * 2, s: 0.15 + r() * 0.25 }))
  }, [])
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.y = B612[1] + Math.sin(t * 0.4) * 0.5
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.05
  })
  return (
    <group ref={ref} position={B612}>
      <Part color="#f2d9a6" outline outlineThickness={0.05}>
        <icosahedronGeometry args={[R, 3]} />
      </Part>
      {craters.map((c, i) => (
        <OnSphere key={i} radius={R - 0.02} lat={c.lat} lon={c.lon}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <circleGeometry args={[c.s, 14]} />
            <Toon color="#dcbc85" />
          </mesh>
        </OnSphere>
      ))}
      <OnSphere radius={R} lat={Math.PI / 2 - 0.001} lon={0}>
        <LittlePrince position={[0, -0.02, 0]} rotation={-2.3} />
      </OnSphere>
      <OnSphere radius={R} lat={1.15} lon={0.6}>
        <Rose />
      </OnSphere>
      <OnSphere radius={R} lat={0.95} lon={2.4}>
        <Volcano active />
      </OnSphere>
      <OnSphere radius={R} lat={1.0} lon={3.1}>
        <Volcano active={false} />
      </OnSphere>
      <OnSphere radius={R} lat={0.8} lon={2.0}>
        <Volcano active />
      </OnSphere>
      {[
        [1.0, -1.0],
        [0.7, -1.6],
        [1.2, 4.2],
      ].map(([lat, lon], i) => (
        <OnSphere key={i} radius={R} lat={lat} lon={lon}>
          <Part color={PALETTE.leafDark} position={[0, 0.06, 0]}>
            <coneGeometry args={[0.03, 0.12, 4]} />
          </Part>
          <Part color={PALETTE.leaf} position={[0.03, 0.1, 0]} rotation={[0, 0, -0.9]} scale={[1, 0.4, 0.6]}>
            <sphereGeometry args={[0.035, 6, 4]} />
          </Part>
        </OnSphere>
      ))}
      <OnSphere radius={R} lat={0.9} lon={-0.4}>
        <group>
          <Part color={PALETTE.wood} position={[0, 0.15, 0]}>
            <boxGeometry args={[0.24, 0.03, 0.22]} />
          </Part>
          <Part color={PALETTE.wood} position={[0, 0.3, -0.1]}>
            <boxGeometry args={[0.24, 0.3, 0.03]} />
          </Part>
          {[
            [-0.1, -0.09],
            [0.1, -0.09],
            [-0.1, 0.09],
            [0.1, 0.09],
          ].map(([x, z], i) => (
            <Part key={i} color={PALETTE.woodDark} position={[x, 0.07, z]}>
              <boxGeometry args={[0.025, 0.15, 0.025]} />
            </Part>
          ))}
        </group>
      </OnSphere>
    </group>
  )
}

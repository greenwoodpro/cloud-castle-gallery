'use client'

import * as THREE from 'three'
import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { PALETTE, Part, Toon, getGradientMap, seeded, useNight } from './materials'
import { Gable, LampPost } from './props'
import { Figure, Fox, Sheep } from './characters'
import {
  CRAGS,
  FIELDS,
  FOX,
  LAKE,
  MEADOW,
  PLATEAU,
  VILLAGE,
  WATERFALL,
  WINDMILL,
  edgeRadius,
  insideIsland,
  type Vec3,
} from './layout'

const TOP_DEPTH = 0.45
const UNDER_HEIGHT = 13

function useIslandGeometries() {
  return useMemo(() => {
    const shape = new THREE.Shape()
    const steps = 160
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2
      const r = edgeRadius(a)
      const x = Math.cos(a) * r
      const y = -Math.sin(a) * r
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    }
    const top = new THREE.ExtrudeGeometry(shape, {
      depth: TOP_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.18,
      bevelSegments: 2,
      curveSegments: 4,
    })
    top.rotateX(-Math.PI / 2)
    top.translate(0, -TOP_DEPTH - 0.12, 0)

    const radial = 96
    const rings = 22
    const under = new THREE.CylinderGeometry(1, 1, 1, radial, rings, true)
    const pos = under.attributes.position
    const colors: number[] = []
    const cGrass = new THREE.Color(PALETTE.grassDeep)
    const cSoil = new THREE.Color(PALETTE.soil)
    const cSand = new THREE.Color(PALETTE.stoneWarm)
    const cRock = new THREE.Color(PALETTE.rock)
    const cDark = new THREE.Color(PALETTE.rockDark)
    const cMoss = new THREE.Color(PALETTE.pine)
    const tmp = new THREE.Color()

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i)
      const vz = pos.getZ(i)
      const vy = pos.getY(i)
      const t = 0.5 - vy
      const a = Math.atan2(vz, vx)
      const terrace = 1 - 0.05 * Math.round(Math.sin(t * 40) * 0.5 + 0.5)
      const taper = Math.pow(1 - t, 0.85) * 0.97 + 0.03
      const jag = 1 + 0.1 * Math.sin(a * 7 + t * 9) * t + 0.06 * Math.sin(a * 15 - t * 17) * t
      const r = edgeRadius(a) * taper * jag * (t > 0.02 ? terrace : 1)
      pos.setXYZ(i, Math.cos(a) * r, -TOP_DEPTH - t * UNDER_HEIGHT, Math.sin(a) * r)

      if (t < 0.04) tmp.copy(cGrass)
      else if (t < 0.14) tmp.copy(cSoil)
      else if (t < 0.45) tmp.copy(Math.floor(t * 22) % 2 === 0 ? cSand : cRock)
      else tmp.copy(Math.floor(t * 16) % 2 === 0 ? cRock : cDark)
      if (t > 0.3 && Math.sin(a * 6 + t * 30) > 0.75) tmp.lerp(cMoss, 0.5)
      colors.push(tmp.r, tmp.g, tmp.b)
    }
    under.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    under.computeVertexNormals()
    return { top, under }
  }, [])
}

function IslandBody() {
  const { top, under } = useIslandGeometries()
  const map = useMemo(() => getGradientMap(), [])
  return (
    <group>
      <mesh geometry={top} receiveShadow castShadow>
        <meshToonMaterial color={PALETTE.grass} gradientMap={map} />
      </mesh>
      <mesh geometry={under} castShadow>
        <meshToonMaterial vertexColors gradientMap={map} side={THREE.DoubleSide} />
      </mesh>
      <HangingRoots />
    </group>
  )
}

function HangingRoots() {
  const roots = useMemo(() => {
    const r = seeded(42)
    return Array.from({ length: 22 }).map(() => {
      const a = r() * Math.PI * 2
      const rad = edgeRadius(a) * (0.82 + r() * 0.1)
      const start = new THREE.Vector3(Math.cos(a) * rad, -TOP_DEPTH - 0.6 - r() * 1.2, Math.sin(a) * rad)
      const len = 2 + r() * 4
      const pts = [start]
      for (let k = 1; k <= 4; k++) {
        pts.push(
          new THREE.Vector3(
            start.x + Math.sin(k + a) * 0.35,
            start.y - (len * k) / 4,
            start.z + Math.cos(k * 1.3 + a) * 0.35,
          ),
        )
      }
      const curve = new THREE.CatmullRomCurve3(pts)
      return {
        geo: new THREE.TubeGeometry(curve, 16, 0.05 + r() * 0.05, 5, false),
        color: r() > 0.5 ? PALETTE.woodDark : PALETTE.leafDark,
      }
    })
  }, [])
  return (
    <group>
      {roots.map((root, i) => (
        <mesh key={i} geometry={root.geo}>
          <Toon color={root.color} />
        </mesh>
      ))}
    </group>
  )
}

function Plateau() {
  const boulders = useMemo(() => {
    const r = seeded(7)
    return Array.from({ length: 16 }).map(() => {
      const a = r() * Math.PI * 2
      if (Math.abs(a - Math.PI / 2) < 0.35) return null
      const d = PLATEAU.radius + 0.2 + r() * 0.5
      return {
        pos: [PLATEAU.x + Math.cos(a) * d, 0.15, PLATEAU.z + Math.sin(a) * d] as Vec3,
        s: 0.3 + r() * 0.5,
        rot: r() * 3,
      }
    })
  }, [])
  return (
    <group>
      <Part color={PALETTE.rock} position={[PLATEAU.x, (PLATEAU.height - 0.05) / 2 - 0.1, PLATEAU.z]} outline outlineThickness={0.03}>
        <cylinderGeometry args={[PLATEAU.radius, PLATEAU.radius + 0.9, PLATEAU.height + 0.15, 40]} />
      </Part>
      <Part color={PALETTE.grass} position={[PLATEAU.x, PLATEAU.height - 0.04, PLATEAU.z]}>
        <cylinderGeometry args={[PLATEAU.radius + 0.1, PLATEAU.radius, 0.08, 40]} />
      </Part>
      {boulders.map(
        (b, i) =>
          b && (
            <Part key={i} color={i % 2 ? PALETTE.rock : PALETTE.rockDark} position={b.pos} rotation={[b.rot, b.rot * 2, 0]} scale={b.s} outline outlineThickness={0.03}>
              <dodecahedronGeometry args={[1, 0]} />
            </Part>
          ),
      )}
      <Part color={PALETTE.soil} position={[0, 0.72, 7.05]} rotation={[0.44, 0, 0]}>
        <boxGeometry args={[1.1, 0.12, 3.4]} />
      </Part>
      <mesh position={[0, PLATEAU.height + 0.02, 4.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.4, 1.1]} />
        <Toon color={PALETTE.water} />
      </mesh>
      <mesh position={[0, PLATEAU.height + 0.015, 4.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.8, 1.5]} />
        <Toon color={PALETTE.rockDark} />
      </mesh>
    </group>
  )
}

function Path() {
  const stones = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 8.7),
      new THREE.Vector3(1.5, 0, 9.8),
      new THREE.Vector3(4.5, 0, 9.4),
      new THREE.Vector3(6.8, 0, 7.6),
      new THREE.Vector3(VILLAGE.x, 0, VILLAGE.z),
    ])
    const west = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 8.7),
      new THREE.Vector3(-1.8, 0, 9.4),
      new THREE.Vector3(-3.8, 0, 8.2),
    ])
    const list: { p: THREE.Vector3; r: number }[] = []
    const r = seeded(11)
    for (const c of [curve, west]) {
      const n = Math.floor(c.getLength() / 0.42)
      for (let i = 0; i <= n; i++) {
        const p = c.getPointAt(i / n)
        list.push({ p: new THREE.Vector3(p.x + (r() - 0.5) * 0.25, 0.02, p.z + (r() - 0.5) * 0.25), r: r() * 3 })
      }
    }
    return list
  }, [])
  const map = useMemo(() => getGradientMap(), [])
  return (
    <group>
      <Instances limit={stones.length} receiveShadow>
        <circleGeometry args={[0.22, 6]} />
        <meshToonMaterial color={PALETTE.stoneWarm} gradientMap={map} />
        {stones.map((s, i) => (
          <Instance key={i} position={s.p} rotation={[-Math.PI / 2, 0, s.r]} />
        ))}
      </Instances>
      <LampPost position={[1.2, 0, 10.4]} />
      <LampPost position={[3.0, 0, 10.1]} />
      <LampPost position={[5.4, 0, 9.3]} />
      <LampPost position={[7.4, 0, 7.6]} />
      <Figure position={[3.6, 0, 9.6]} rotation={-0.6} robe={PALETTE.clothBlue} hat="cap" hatColor={PALETTE.ink} pose="pole" phase={1.1}>
        <group position={[0, -0.15, 0.05]} rotation={[-0.35, 0, 0]}>
          <Part color={PALETTE.woodDark} position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 1.1, 4]} />
          </Part>
          <mesh position={[0, 1.0, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color={PALETTE.fire} />
          </mesh>
        </group>
      </Figure>
    </group>
  )
}

function Lake() {
  const waterRef = useRef<THREE.Mesh>(null)
  const edgeA = Math.atan2(WATERFALL.z, WATERFALL.x)
  const edgeR = edgeRadius(edgeA) + 0.1
  const edge: Vec3 = [Math.cos(edgeA) * edgeR, 0, Math.sin(edgeA) * edgeR]
  const streamStart: Vec3 = [LAKE.x - LAKE.radius * 0.8, 0, LAKE.z + 0.4]
  const streamLen = Math.hypot(edge[0] - streamStart[0], edge[2] - streamStart[2])
  const streamAngle = Math.atan2(edge[0] - streamStart[0], edge[2] - streamStart[2])

  const reeds = useMemo(() => {
    const r = seeded(5)
    return Array.from({ length: 34 }).map(() => {
      const a = r() * Math.PI * 2
      const d = LAKE.radius + 0.05 + r() * 0.35
      return [LAKE.x + Math.cos(a) * d, 0.18, LAKE.z + Math.sin(a) * d * 0.85] as Vec3
    })
  }, [])
  const map = useMemo(() => getGradientMap(), [])

  useFrame(({ clock }) => {
    if (waterRef.current) waterRef.current.position.y = 0.04 + Math.sin(clock.elapsedTime) * 0.005
  })

  return (
    <group>
      <mesh position={[LAKE.x, 0.025, LAKE.z]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.85, 1]} receiveShadow>
        <circleGeometry args={[LAKE.radius + 0.5, 40]} />
        <Toon color="#eadbb5" />
      </mesh>
      <mesh ref={waterRef} position={[LAKE.x, 0.04, LAKE.z]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.85, 1]} receiveShadow>
        <circleGeometry args={[LAKE.radius, 40]} />
        <Toon color={PALETTE.water} />
      </mesh>
      {[0.6, 1.4, 2.1].map((s, i) => (
        <mesh key={i} position={[LAKE.x + 0.5, 0.05, LAKE.z - 0.3]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.85, 1]}>
          <ringGeometry args={[s, s + 0.03, 40]} />
          <meshBasicMaterial color={PALETTE.snow} transparent opacity={0.55} />
        </mesh>
      ))}
      <group position={[streamStart[0], 0.035, streamStart[2]]} rotation={[0, streamAngle, 0]}>
        <mesh position={[0, 0, streamLen / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, streamLen + 0.4]} />
          <Toon color={PALETTE.water} />
        </mesh>
      </group>
      <Waterfall position={edge} angle={edgeA} />
      <Instances limit={reeds.length} castShadow>
        <coneGeometry args={[0.03, 0.4, 4]} />
        <meshToonMaterial color={PALETTE.leafDark} gradientMap={map} />
        {reeds.map((p, i) => (
          <Instance key={i} position={p} rotation={[(i % 3) * 0.08, 0, ((i % 5) - 2) * 0.06]} />
        ))}
      </Instances>
      <group position={[LAKE.x + 1.6, 0.08, LAKE.z + 2.1]} rotation={[0, -0.6, 0]}>
        <Part color={PALETTE.wood} position={[0, 0.05, -0.8]} outline outlineThickness={0.01}>
          <boxGeometry args={[0.45, 0.06, 1.8]} />
        </Part>
        {[-0.2, 0.2].map((x) =>
          [-1.5, -0.3].map((z) => (
            <Part key={`${x}${z}`} color={PALETTE.woodDark} position={[x, -0.05, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.3, 5]} />
            </Part>
          )),
        )}
        <group position={[0.55, 0.0, -1.5]} rotation={[0, 0.3, 0]}>
          <Part color={PALETTE.roofRose} scale={[0.35, 0.18, 0.8]} outline outlineThickness={0.01}>
            <sphereGeometry args={[1, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          </Part>
        </group>
      </group>
    </group>
  )
}

function Waterfall({ position, angle }: { position: Vec3; angle: number }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(PALETTE.water) },
          uFoam: { value: new THREE.Color(PALETTE.snow) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          uniform vec3 uFoam;
          varying vec2 vUv;
          void main() {
            float stripes = step(0.62, fract(vUv.y * 9.0 + uTime * 1.2 + sin(vUv.x * 18.0) * 0.08));
            vec3 col = mix(uColor, uFoam, stripes * 0.75);
            float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
            float fade = smoothstep(0.0, 0.55, vUv.y);
            gl_FragColor = vec4(col, 0.88 * edge * fade);
          }
        `,
      }),
    [],
  )
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.95, 10, 1, 30)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i)
      const k = (5 - y) / 10
      p.setZ(i, k * k * 3.2 + 0.1)
      p.setX(i, p.getX(i) * (1 + k * 1.2))
      p.setY(i, y - 5)
    }
    g.computeVertexNormals()
    return g
  }, [])
  const mist = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
    if (mist.current) {
      mist.current.children.forEach((c, i) => {
        const t = clock.elapsedTime * 0.5 + i
        c.position.y = -9.5 + ((t * 0.6) % 2)
        c.scale.setScalar(0.6 + Math.sin(t) * 0.15)
      })
    }
  })

  const rot = Math.PI / 2 - angle
  return (
    <group position={position} rotation={[0, rot, 0]}>
      <mesh geometry={geo} material={material} position={[0, 0.03, 0]} />
      <group ref={mist} position={[0, 0, 3.4]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[(i - 2.5) * 0.45, -9.5, (i % 2) * 0.4]}>
            <sphereGeometry args={[0.7, 10, 8]} />
            <meshBasicMaterial color={PALETTE.snow} transparent opacity={0.55} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

type TreeSpot = { p: Vec3; s: number; kind: 'round' | 'pine' }

function useTreeSpots() {
  return useMemo(() => {
    const r = seeded(2024)
    const spots: TreeSpot[] = []
    const ok = (x: number, z: number) => {
      if (!insideIsland(x, z, 1.4)) return false
      if (Math.hypot(x - PLATEAU.x, z - PLATEAU.z) < PLATEAU.radius + 1.6) return false
      if (Math.hypot(x - LAKE.x, z - LAKE.z) < LAKE.radius + 1.2) return false
      if (Math.hypot(x - CRAGS.x, z - CRAGS.z) < 3.2) return false
      if (Math.hypot(x - 6.5, z + 11) < 1.6) return false
      if (Math.hypot(x - WINDMILL.x, z - WINDMILL.z) < 2.8) return false
      return spots.every((s) => Math.hypot(s.p[0] - x, s.p[2] - z) > 1.0)
    }
    let tries = 0
    while (spots.length < 70 && tries < 4000) {
      tries++
      const x = (r() - 0.5) * 32
      const z = -16 + r() * 10
      if (!ok(x, z)) continue
      spots.push({ p: [x, 0, z], s: 0.75 + r() * 0.55, kind: r() > 0.45 ? 'round' : 'pine' })
    }
    const extras: Vec3[] = [
      [6.2, 0, 11.6],
      [-0.6, 0, 13.4],
      [11.8, 0, 3.2],
      [-12.4, 0, 6.2],
      [-11.8, 0, -3.8],
      [13.6, 0, 7.4],
      [-4.4, 0, 13.2],
      [8.4, 0, 1.4],
    ]
    extras.forEach((p, i) => {
      if (insideIsland(p[0], p[2], 1)) spots.push({ p, s: 0.8 + (i % 3) * 0.15, kind: i % 3 === 0 ? 'pine' : 'round' })
    })
    return spots
  }, [])
}

function Forest() {
  const spots = useTreeSpots()
  const map = useMemo(() => getGradientMap(), [])
  const round = spots.filter((s) => s.kind === 'round')
  const pine = spots.filter((s) => s.kind === 'pine')
  const mushrooms = useMemo(() => {
    const r = seeded(99)
    return Array.from({ length: 14 }).map(() => {
      const t = round[Math.floor(r() * round.length)]
      return t ? ([t.p[0] + (r() - 0.5) * 1.2, 0, t.p[2] + 0.6 + r() * 0.4] as Vec3) : null
    })
  }, [round])

  return (
    <group>
      <Instances limit={spots.length} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 1, 6]} />
        <meshToonMaterial color={PALETTE.woodDark} gradientMap={map} />
        {spots.map((s, i) => (
          <Instance key={i} position={[s.p[0], 0.5 * s.s, s.p[2]]} scale={[s.s, s.s, s.s]} />
        ))}
      </Instances>
      <Instances limit={round.length * 2} castShadow receiveShadow>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshToonMaterial color={PALETTE.leaf} gradientMap={map} />
        {round.map((s, i) => (
          <Instance key={i} position={[s.p[0], 1.35 * s.s, s.p[2]]} scale={s.s} rotation={[i, i * 2, 0]} />
        ))}
        {round.map((s, i) => (
          <Instance key={`b${i}`} position={[s.p[0] + 0.35 * s.s, 1.0 * s.s, s.p[2] + 0.2 * s.s]} scale={s.s * 0.6} color={PALETTE.leafDark} />
        ))}
      </Instances>
      <Instances limit={pine.length * 3} castShadow receiveShadow>
        <coneGeometry args={[0.6, 1, 7]} />
        <meshToonMaterial color={PALETTE.pine} gradientMap={map} />
        {pine.flatMap((s, i) =>
          [0, 1, 2].map((k) => (
            <Instance
              key={`${i}-${k}`}
              position={[s.p[0], (0.9 + k * 0.5) * s.s, s.p[2]]}
              scale={[s.s * (1 - k * 0.25), s.s * 0.9, s.s * (1 - k * 0.25)]}
            />
          )),
        )}
      </Instances>
      {mushrooms.map(
        (m, i) =>
          m && (
            <group key={i} position={m}>
              <Part color={PALETTE.snow} position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.025, 0.03, 0.1, 6]} />
              </Part>
              <Part color={PALETTE.cloth} position={[0, 0.1, 0]} outline outlineThickness={0.006}>
                <sphereGeometry args={[0.07, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
              </Part>
            </group>
          ),
      )}
      <group position={[6.5, 0, -11]} rotation={[0, 0.4, 0]}>
        <group position={[0, 0.6, 0]} rotation={[-0.15, 0, 0]}>
          <Part color={PALETTE.wheat} rotation={[Math.PI / 2, 0, 0]} outline outlineThickness={0.01}>
            <cylinderGeometry args={[0.32, 0.32, 0.06, 20]} />
          </Part>
          {[0.24, 0.12].map((r, i) => (
            <mesh key={r} position={[0, 0, 0.032 + i * 0.001]}>
              <ringGeometry args={[r - 0.05, r, 20]} />
              <meshBasicMaterial color={i === 0 ? PALETTE.cloth : PALETTE.clothBlue} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
        {[-0.2, 0.2].map((x) => (
          <Part key={x} color={PALETTE.woodDark} position={[x, 0.3, -0.1]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 4]} />
          </Part>
        ))}
      </group>
    </group>
  )
}

function Crags() {
  const rocks = useMemo(() => {
    const r = seeded(31)
    return Array.from({ length: 11 }).map((_, i) => {
      const a = r() * Math.PI * 2
      const d = i === 0 ? 0 : 0.8 + r() * 2
      const s = i === 0 ? 1.6 : 0.5 + r() * 0.9
      return {
        pos: [CRAGS.x + Math.cos(a) * d, s * 0.55, CRAGS.z + Math.sin(a) * d] as Vec3,
        scale: [s, s * (1.2 + r() * 0.9), s] as Vec3,
        rot: [r() * 0.4, r() * 3, r() * 0.4] as Vec3,
        color: r() > 0.5 ? PALETTE.rock : PALETTE.rockDark,
      }
    })
  }, [])
  return (
    <group>
      <Part color={PALETTE.grassDeep} position={[CRAGS.x, 0, CRAGS.z]} scale={[3.4, 0.5, 3]}>
        <sphereGeometry args={[1, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </Part>
      {rocks.map((rk, i) => (
        <Part key={i} color={rk.color} position={rk.pos} scale={rk.scale} rotation={rk.rot} outline outlineThickness={0.03}>
          <dodecahedronGeometry args={[1, 0]} />
        </Part>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <Part key={`f${i}`} color={PALETTE.lavender} position={[CRAGS.x + Math.cos(i * 1.7) * 2.6, 0.12, CRAGS.z + Math.sin(i * 1.7) * 2.2]}>
          <sphereGeometry args={[0.08, 6, 6]} />
        </Part>
      ))}
      <Sheep position={[CRAGS.x + 2.3, 0.2, CRAGS.z + 1.5]} rotation={0.8} phase={9} />
    </group>
  )
}

function Fields() {
  const plots = useMemo(() => {
    const colors = [PALETTE.wheat, PALETTE.lavender, PALETTE.meadow, PALETTE.wheat, PALETTE.soil, PALETTE.lavender, PALETTE.meadow, PALETTE.wheat, PALETTE.grassDeep]
    const list: { pos: Vec3; color: string; kind: string }[] = []
    for (let gx = 0; gx < 3; gx++) {
      for (let gz = 0; gz < 3; gz++) {
        const idx = gx * 3 + gz
        const x = (gx - 1) * 2.3
        const z = (gz - 1) * 1.75
        list.push({ pos: [x, 0, z], color: colors[idx], kind: colors[idx] })
      }
    }
    return list
  }, [])
  const map = useMemo(() => getGradientMap(), [])
  const lavender = useMemo(() => {
    const pts: Vec3[] = []
    plots.forEach((p) => {
      if (p.color !== PALETTE.lavender) return
      for (let row = 0; row < 4; row++) {
        for (let k = 0; k < 7; k++) pts.push([p.pos[0] - 0.9 + k * 0.3, 0.09, p.pos[2] - 0.55 + row * 0.37])
      }
    })
    return pts
  }, [plots])
  const wheat = useMemo(() => {
    const pts: Vec3[] = []
    plots.forEach((p) => {
      if (p.color !== PALETTE.wheat) return
      for (let row = 0; row < 5; row++) pts.push([p.pos[0], 0.1, p.pos[2] - 0.6 + row * 0.3])
    })
    return pts
  }, [plots])
  const wheatRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (wheatRef.current) wheatRef.current.rotation.z = Math.sin(clock.elapsedTime * 1.2) * 0.01
  })

  return (
    <group position={[FIELDS.x, 0, FIELDS.z]} rotation={[0, 0.35, 0]}>
      {plots.map((p, i) => (
        <mesh key={i} position={[p.pos[0], 0.03, p.pos[2]]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2.15, 1.6]} />
          <Toon color={p.color} />
        </mesh>
      ))}
      <group ref={wheatRef}>
        <Instances limit={wheat.length} castShadow receiveShadow>
          <boxGeometry args={[2, 0.16, 0.16]} />
          <meshToonMaterial color="#e8bf55" gradientMap={map} />
          {wheat.map((p, i) => (
            <Instance key={i} position={p} />
          ))}
        </Instances>
      </group>
      <Instances limit={lavender.length} castShadow>
        <sphereGeometry args={[0.1, 6, 5]} />
        <meshToonMaterial color="#a491d1" gradientMap={map} />
        {lavender.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>
      {[-3.45, 3.45].map((x) => (
        <Part key={x} color={PALETTE.leafDark} position={[x, 0.15, 0]}>
          <boxGeometry args={[0.25, 0.3, 5.3]} />
        </Part>
      ))}
      <Part color={PALETTE.stoneShade} position={[0, 0.12, -2.7]} outline outlineThickness={0.01}>
        <boxGeometry args={[6.9, 0.24, 0.22]} />
      </Part>
      <group position={[2.3, 0, 0]}>
        <Part color={PALETTE.woodDark} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 4]} />
        </Part>
        <Part color={PALETTE.woodDark} position={[0, 0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 4]} />
        </Part>
        <Part color={PALETTE.cloth} position={[0, 0.6, 0]}>
          <boxGeometry args={[0.18, 0.22, 0.1]} />
        </Part>
        <Part color={PALETTE.thatch} position={[0, 0.82, 0]}>
          <sphereGeometry args={[0.08, 8, 6]} />
        </Part>
        <Part color={PALETTE.thatch} position={[0, 0.89, 0]} outline outlineThickness={0.006}>
          <coneGeometry args={[0.13, 0.1, 10]} />
        </Part>
      </group>
      <Figure position={[-1.2, 0, 0.4]} rotation={0.8} robe="#c9a77a" hat="straw" pose="bend" phase={0.3} />
    </group>
  )
}

function Meadow() {
  const map = useMemo(() => getGradientMap(), [])
  const flowers = useMemo(() => {
    const r = seeded(77)
    const list: { p: Vec3; c: string }[] = []
    const colors = [PALETTE.snow, PALETTE.wheat, PALETTE.roofRose, PALETTE.lavender]
    let tries = 0
    while (list.length < 160 && tries < 3000) {
      tries++
      const x = (r() - 0.5) * 30
      const z = (r() - 0.5) * 30
      if (!insideIsland(x, z, 0.8)) continue
      if (Math.hypot(x - PLATEAU.x, z - PLATEAU.z) < PLATEAU.radius + 0.6) continue
      if (Math.hypot(x - LAKE.x, z - LAKE.z) < LAKE.radius + 0.6) continue
      if (Math.hypot(x - FIELDS.x, z - FIELDS.z) < 4) continue
      list.push({ p: [x, 0.05, z], c: colors[Math.floor(r() * colors.length)] })
    }
    return list
  }, [])
  const sheep = useMemo(
    () =>
      [
        [MEADOW.x - 1.2, MEADOW.z - 0.5, 0.4],
        [MEADOW.x + 0.4, MEADOW.z - 1.1, 2],
        [MEADOW.x + 1.4, MEADOW.z + 0.3, -1],
        [MEADOW.x - 0.3, MEADOW.z + 0.8, 1.2],
        [MEADOW.x + 2.2, MEADOW.z - 0.8, 3],
        [MEADOW.x - 1.9, MEADOW.z + 0.6, -0.5],
      ] as [number, number, number][],
    [],
  )
  return (
    <group>
      <Instances limit={flowers.length}>
        <sphereGeometry args={[0.055, 6, 5]} />
        <meshToonMaterial gradientMap={map} />
        {flowers.map((f, i) => (
          <Instance key={i} position={f.p} color={f.c} />
        ))}
      </Instances>
      {sheep.map(([x, z, r], i) => (
        <Sheep key={i} position={[x, 0, z]} rotation={r} phase={i * 1.3} />
      ))}
      <Figure position={[MEADOW.x - 0.4, 0, MEADOW.z - 1.8]} rotation={2.6} robe={PALETTE.roofRose} hat="kerchief" hatColor={PALETTE.snow} hair={PALETTE.wheat} pose="idle" phase={2.4}>
        <group position={[0, -0.12, 0.04]}>
          <Part color={PALETTE.wood} position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.75, 4]} />
          </Part>
          <Part color={PALETTE.wood} position={[0.04, 0.48, 0]}>
            <torusGeometry args={[0.04, 0.008, 4, 10, Math.PI]} />
          </Part>
        </group>
      </Figure>
      <Fox position={FOX} rotation={-2.4} />
    </group>
  )
}

function Cottage({ position, rotation = 0, roof = PALETTE.thatch, smoke = true, phase = 0 }: { position: Vec3; rotation?: number; roof?: string; smoke?: boolean; phase?: number }) {
  const smokeRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!smokeRef.current) return
    smokeRef.current.children.forEach((c, i) => {
      const t = (clock.elapsedTime * 0.35 + i / 3 + phase) % 1
      c.position.y = t * 1.4
      c.position.x = Math.sin(t * 4 + i) * 0.12 + t * 0.3
      c.scale.setScalar(0.06 + t * 0.16)
    })
  })
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Part color={PALETTE.snow} position={[0, 0.45, 0]} outline outlineThickness={0.015}>
        <boxGeometry args={[1.2, 0.9, 0.95]} />
      </Part>
      {[-0.45, 0, 0.45].map((x) => (
        <Part key={x} color={PALETTE.woodDark} position={[x, 0.45, 0.48]}>
          <boxGeometry args={[0.05, 0.9, 0.02]} />
        </Part>
      ))}
      <Part color={PALETTE.woodDark} position={[0, 0.62, 0.48]}>
        <boxGeometry args={[1.2, 0.05, 0.02]} />
      </Part>
      <Part color={PALETTE.wood} position={[0.22, 0.25, 0.49]}>
        <boxGeometry args={[0.24, 0.5, 0.02]} />
      </Part>
      <WindowLit position={[-0.22, 0.4, 0.49]} />
      <Gable width={1.45} height={0.8} length={1.35} color={roof} position={[0, 0.9, 0]} rotation={Math.PI / 2} />
      <Part color={PALETTE.rockDark} position={[0.35, 1.35, -0.15]}>
        <boxGeometry args={[0.16, 0.5, 0.16]} />
      </Part>
      {smoke && (
        <group ref={smokeRef} position={[0.35, 1.6, -0.15]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i}>
              <sphereGeometry args={[1, 8, 6]} />
              <meshBasicMaterial color={PALETTE.snow} transparent opacity={0.7} depthWrite={false} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}

function WindowLit({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.2, 0.2, 0.02]} />
        <NightAwareGlass />
      </mesh>
    </group>
  )
}

function NightAwareGlass() {
  const night = useNight()
  return <Toon color={night ? '#ffd889' : '#6f7f9a'} emissive={night ? '#ffb24d' : '#000000'} emissiveIntensity={night ? 1.3 : 0} />
}

function Windmill() {
  const blades = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (blades.current) blades.current.rotation.z += dt * 0.6
  })
  return (
    <group position={[WINDMILL.x, 0, WINDMILL.z]}>
      <Part color={PALETTE.grassDeep} scale={[2.6, 0.9, 2.6]}>
        <sphereGeometry args={[1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </Part>
      <group position={[0, 0.85, 0]} rotation={[0, -0.9, 0]}>
        <Part color={PALETTE.snow} position={[0, 1.1, 0]} outline outlineThickness={0.02}>
          <cylinderGeometry args={[0.45, 0.7, 2.2, 14]} />
        </Part>
        <Part color={PALETTE.roofRose} position={[0, 2.5, 0]} outline outlineThickness={0.02}>
          <coneGeometry args={[0.6, 0.7, 14]} />
        </Part>
        <Part color={PALETTE.wood} position={[0, 0.3, 0.68]}>
          <boxGeometry args={[0.28, 0.5, 0.05]} />
        </Part>
        <WindowLit position={[0, 1.4, 0.53]} />
        <group ref={blades} position={[0, 2.15, 0.62]}>
          <Part color={PALETTE.woodDark}>
            <sphereGeometry args={[0.08, 8, 8]} />
          </Part>
          {[0, 1, 2, 3].map((i) => (
            <group key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
              <Part color={PALETTE.woodDark} position={[0, 0.75, 0]}>
                <boxGeometry args={[0.04, 1.5, 0.03]} />
              </Part>
              <Part color={PALETTE.snow} position={[0.12, 0.85, 0.01]} outline outlineThickness={0.008}>
                <boxGeometry args={[0.22, 1.1, 0.01]} />
              </Part>
            </group>
          ))}
        </group>
      </group>
    </group>
  )
}

function Village() {
  return (
    <group>
      <Cottage position={[VILLAGE.x, 0, VILLAGE.z]} rotation={-0.9} phase={0} />
      <Cottage position={[VILLAGE.x + 2, 0, VILLAGE.z - 1.4]} rotation={-1.4} roof={PALETTE.roofRose} phase={0.3} />
      <Cottage position={[VILLAGE.x + 1.2, 0, VILLAGE.z + 1.9]} rotation={-0.4} phase={0.6} />
      <Cottage position={[VILLAGE.x - 1.6, 0, VILLAGE.z + 2.4]} rotation={0.2} roof={PALETTE.roofBlue} smoke={false} />
      <Cottage position={[VILLAGE.x + 3.3, 0, VILLAGE.z + 0.9]} rotation={-1.2} phase={0.8} />
      <group position={[VILLAGE.x + 0.6, 0, VILLAGE.z + 0.4]}>
        <Part color={PALETTE.wood} position={[0, 0.3, 0]}>
          <boxGeometry args={[0.7, 0.05, 0.4]} />
        </Part>
        <Gable width={0.85} height={0.25} length={0.55} color={PALETTE.cloth} position={[0, 0.7, 0]} rotation={Math.PI / 2} />
        {[-0.3, 0.3].map((x) => (
          <Part key={x} color={PALETTE.woodDark} position={[x, 0.35, 0]}>
            <boxGeometry args={[0.04, 0.7, 0.04]} />
          </Part>
        ))}
        {[-0.15, 0, 0.15].map((x, i) => (
          <Part key={`p${x}`} color={[PALETTE.wheat, PALETTE.cloth, PALETTE.leaf][i]} position={[x, 0.37, 0]}>
            <sphereGeometry args={[0.06, 8, 6]} />
          </Part>
        ))}
      </group>
      <Figure position={[VILLAGE.x + 0.6, 0, VILLAGE.z + 0.9]} rotation={Math.PI} robe={PALETTE.leafDark} hat="kerchief" hatColor={PALETTE.cloth} pose="wave" phase={0.8} />
      <Figure position={[VILLAGE.x - 0.4, 0, VILLAGE.z + 1.0]} rotation={-0.8} robe={PALETTE.wood} hat="cap" hatColor={PALETTE.roofRose} pose="walk" phase={0.2} />
      <Windmill />
    </group>
  )
}

export function Island() {
  return (
    <group>
      <IslandBody />
      <Plateau />
      <Path />
      <Lake />
      <Forest />
      <Crags />
      <Fields />
      <Meadow />
      <Village />
    </group>
  )
}

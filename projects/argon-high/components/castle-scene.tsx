'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
  TimeMode,
  INTERIOR_SECTIONS,
  CASTLE_CHARACTERS,
  TERRAIN_ZONES,
} from '@/lib/castle-data'

export interface HotspotItem {
  id: string
  label: string
  sublabel: string
  category: 'interior' | 'character' | 'terrain'
  position: [number, number, number]
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]
  cutawayRequired?: boolean
  color: string
}

interface ScreenHotspot extends HotspotItem {
  x: number
  y: number
  visible: boolean
}

interface CastleSceneProps {
  timeMode: TimeMode
  sunsetIndex: number
  cutawayMode: boolean
  showHotspots: boolean
  activeHotspotCategory: 'interior' | 'character' | 'terrain' | 'all'
  autoRotate: boolean
  activeSelectionId: string | null
  cameraCommand: {
    position: [number, number, number]
    target: [number, number, number]
    timestamp: number
  } | null
  onSelectHotspot: (item: HotspotItem) => void
}

function createStorybookTexture(
  baseHex: string,
  accentHex: string,
  pattern: 'stone' | 'roof'
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = baseHex
  ctx.fillRect(0, 0, 256, 256)

  for (let i = 0; i < 32; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const r = 18 + Math.random() * 44
    const grad = ctx.createRadialGradient(x, y, 2, x, y, r)
    grad.addColorStop(0, accentHex + '33')
    grad.addColorStop(1, accentHex + '00')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  if (pattern === 'stone') {
    ctx.strokeStyle = accentHex + '45'
    ctx.lineWidth = 1.5
    const rows = 8
    const rowH = 256 / rows
    for (let r = 0; r < rows; r++) {
      const y = r * rowH
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(256, y)
      ctx.stroke()
      const cols = 4
      const colW = 256 / cols
      const offset = (r % 2) * (colW / 2)
      for (let c = 0; c <= cols; c++) {
        const x = (c * colW + offset) % 256
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + rowH)
        ctx.stroke()
      }
    }
  } else if (pattern === 'roof') {
    ctx.strokeStyle = accentHex + '55'
    ctx.lineWidth = 1.5
    for (let y = 0; y < 256; y += 16) {
      for (let x = 0; x < 256; x += 20) {
        const ox = (y / 16) % 2 === 0 ? 0 : 10
        ctx.beginPath()
        ctx.arc(x + ox, y, 10, 0, Math.PI)
        ctx.stroke()
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  return tex
}

export default function CastleScene({
  timeMode,
  sunsetIndex,
  cutawayMode,
  showHotspots,
  activeHotspotCategory,
  autoRotate,
  activeSelectionId,
  cameraCommand,
  onSelectHotspot,
}: CastleSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [screenHotspots, setScreenHotspots] = useState<ScreenHotspot[]>([])

  const allHotspots = React.useMemo<HotspotItem[]>(() => {
    const list: HotspotItem[] = []
    INTERIOR_SECTIONS.forEach((sec) => {
      list.push({
        id: sec.id,
        label: `${sec.floor} · ${sec.name}`,
        sublabel: sec.architecturalStyle,
        category: 'interior',
        position: sec.hotspotPosition,
        cameraPosition: sec.cameraPosition,
        cameraTarget: sec.cameraTarget,
        cutawayRequired: sec.cutawayRequired,
        color: sec.colorAccent,
      })
    })
    CASTLE_CHARACTERS.forEach((char) => {
      list.push({
        id: char.id,
        label: char.name,
        sublabel: char.title,
        category: 'character',
        position: char.position,
        cameraPosition: char.cameraPosition,
        cameraTarget: char.cameraTarget,
        cutawayRequired: char.cutawayRequired,
        color: char.badgeColor,
      })
    })
    TERRAIN_ZONES.forEach((zone) => {
      list.push({
        id: zone.id,
        label: zone.name,
        sublabel: zone.elevation,
        category: 'terrain',
        position: zone.position,
        cameraPosition: zone.cameraPosition,
        cameraTarget: zone.cameraTarget,
        cutawayRequired: false,
        color: zone.palette[0] || '#6B9E78',
      })
    })
    return list
  }, [])

  const stateRef = useRef({
    timeMode,
    sunsetIndex,
    cutawayMode,
    showHotspots,
    autoRotate,
  })

  useEffect(() => {
    stateRef.current = {
      timeMode,
      sunsetIndex,
      cutawayMode,
      showHotspots,
      autoRotate,
    }
  }, [timeMode, sunsetIndex, cutawayMode, showHotspots, autoRotate])

  const cameraFlightRef = useRef<{
    active: boolean
    targetPos: THREE.Vector3
    targetLookAt: THREE.Vector3
  }>({
    active: false,
    targetPos: new THREE.Vector3(46, 30, 52),
    targetLookAt: new THREE.Vector3(0, 6, 0),
  })

  useEffect(() => {
    if (cameraCommand) {
      cameraFlightRef.current = {
        active: true,
        targetPos: new THREE.Vector3(...cameraCommand.position),
        targetLookAt: new THREE.Vector3(...cameraCommand.target),
      }
    }
  }, [cameraCommand])

  const handleHotspotClick = useCallback(
    (item: HotspotItem) => {
      onSelectHotspot(item)
    },
    [onSelectHotspot]
  )

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2('#F3C69F', 0.0052)

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 450)
    camera.position.set(46, 30, 52)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.08
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 6, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.maxDistance = 145
    controls.minDistance = 6
    controls.maxPolarAngle = Math.PI * 0.88
    controls.minPolarAngle = 0.05

    const onControlStart = () => {
      cameraFlightRef.current.active = false
    }
    controls.addEventListener('start', onControlStart)

    const stoneTex = createStorybookTexture('#F2E5D5', '#C7B299', 'stone')
    stoneTex.repeat.set(3, 3)
    const darkStoneTex = createStorybookTexture('#D8C8B8', '#9E8C7A', 'stone')
    darkStoneTex.repeat.set(2, 2)
    const slateRoofTex = createStorybookTexture('#4E7088', '#2F4858', 'roof')
    slateRoofTex.repeat.set(2, 2)
    const terracottaRoofTex = createStorybookTexture('#D47A6A', '#9E4F42', 'roof')
    terracottaRoofTex.repeat.set(2, 2)

    const mats = {
      creamStone: new THREE.MeshStandardMaterial({
        map: stoneTex,
        color: '#F5E8D7',
        roughness: 0.85,
        metalness: 0.04,
      }),
      warmStone: new THREE.MeshStandardMaterial({
        map: darkStoneTex,
        color: '#E6D2BC',
        roughness: 0.88,
        metalness: 0.05,
      }),
      foundationRock: new THREE.MeshStandardMaterial({
        color: '#9F8C86',
        roughness: 0.92,
        flatShading: true,
      }),
      underRockMid: new THREE.MeshStandardMaterial({
        color: '#887478',
        roughness: 0.9,
        flatShading: true,
      }),
      underRockDeep: new THREE.MeshStandardMaterial({
        color: '#5E5061',
        roughness: 0.9,
        flatShading: true,
      }),
      blueRoof: new THREE.MeshStandardMaterial({
        map: slateRoofTex,
        color: '#4F758E',
        roughness: 0.72,
        metalness: 0.08,
      }),
      coralRoof: new THREE.MeshStandardMaterial({
        map: terracottaRoofTex,
        color: '#D87A68',
        roughness: 0.74,
        metalness: 0.06,
      }),
      goldTrim: new THREE.MeshStandardMaterial({
        color: '#E8B85A',
        roughness: 0.35,
        metalness: 0.65,
      }),
      meadowTop: new THREE.MeshStandardMaterial({
        color: '#78A87E',
        roughness: 0.88,
        flatShading: true,
      }),
      wheatGold: new THREE.MeshStandardMaterial({
        color: '#E9C168',
        roughness: 0.82,
        flatShading: true,
      }),
      lavenderGrass: new THREE.MeshStandardMaterial({
        color: '#9486B8',
        roughness: 0.85,
        flatShading: true,
      }),
      darkTimber: new THREE.MeshStandardMaterial({
        color: '#6E4B3A',
        roughness: 0.85,
      }),
      warmOak: new THREE.MeshStandardMaterial({
        color: '#9C6B49',
        roughness: 0.8,
      }),
      waterMat: new THREE.MeshStandardMaterial({
        color: '#64B6C8',
        roughness: 0.18,
        metalness: 0.1,
        transparent: true,
        opacity: 0.84,
      }),
      crystalPurple: new THREE.MeshStandardMaterial({
        color: '#A584E8',
        emissive: '#6E44B8',
        emissiveIntensity: 0.7,
        roughness: 0.2,
        flatShading: true,
      }),
      crystalCyan: new THREE.MeshStandardMaterial({
        color: '#6CE5E8',
        emissive: '#289BA8',
        emissiveIntensity: 0.8,
        roughness: 0.2,
        flatShading: true,
      }),
      windowGlow: new THREE.MeshBasicMaterial({
        color: '#FFD07B',
      }),
      glassBell: new THREE.MeshPhysicalMaterial({
        color: '#E6F7FF',
        transparent: true,
        opacity: 0.36,
        roughness: 0.08,
        transmission: 0.6,
      }),
    }

    const hemiLight = new THREE.HemisphereLight('#FFE6C7', '#6E5A7A', 1.15)
    hemiLight.position.set(0, 60, 0)
    scene.add(hemiLight)

    const sunLight = new THREE.DirectionalLight('#FFB87A', 1.85)
    sunLight.position.set(55, 42, 45)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.camera.near = 10
    sunLight.shadow.camera.far = 160
    const d = 42
    sunLight.shadow.camera.left = -d
    sunLight.shadow.camera.right = d
    sunLight.shadow.camera.top = d
    sunLight.shadow.camera.bottom = -d
    sunLight.shadow.bias = -0.0005
    scene.add(sunLight)

    const rimLight = new THREE.DirectionalLight('#F4978E', 0.75)
    rimLight.position.set(-45, 25, -40)
    scene.add(rimLight)

    const crystalUnderLight = new THREE.PointLight('#8A6FE8', 2.2, 38)
    crystalUnderLight.position.set(0, -14, 0)
    scene.add(crystalUnderLight)

    const interiorHearthLight = new THREE.PointLight('#FF9E44', 1.8, 22)
    interiorHearthLight.position.set(0, 5.5, 0)
    scene.add(interiorHearthLight)

    const cryptCoreLight = new THREE.PointLight('#5CE1E6', 2.0, 18)
    cryptCoreLight.position.set(0, 0.5, 0)
    scene.add(cryptCoreLight)

    const skyGeo = new THREE.SphereGeometry(220, 32, 32)
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color('#3F3364') },
        midColor: { value: new THREE.Color('#C96E7B') },
        bottomColor: { value: new THREE.Color('#F7C58E') },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 midColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          vec3 col = mix(bottomColor, midColor, smoothstep(-0.25, 0.22, h));
          col = mix(col, topColor, smoothstep(0.18, 0.78, h));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
    const skyDome = new THREE.Mesh(skyGeo, skyMat)
    scene.add(skyDome)

    const celestialOrbGroup = new THREE.Group()
    const sunOrb = new THREE.Mesh(
      new THREE.SphereGeometry(6.5, 24, 24),
      new THREE.MeshBasicMaterial({ color: '#FFE099' })
    )
    celestialOrbGroup.add(sunOrb)

    const sunHalo = new THREE.Mesh(
      new THREE.SphereGeometry(10.5, 24, 24),
      new THREE.MeshBasicMaterial({
        color: '#FFA866',
        transparent: true,
        opacity: 0.25,
      })
    )
    celestialOrbGroup.add(sunHalo)
    celestialOrbGroup.position.set(85, 42, -95)
    scene.add(celestialOrbGroup)

    const worldGroup = new THREE.Group()
    scene.add(worldGroup)

    const islandGroup = new THREE.Group()
    worldGroup.add(islandGroup)

    const topDisk = new THREE.Mesh(
      new THREE.CylinderGeometry(24, 25.5, 2.6, 18),
      mats.meadowTop
    )
    topDisk.position.y = -1.3
    topDisk.receiveShadow = true
    islandGroup.add(topDisk)

    const wheatTerrace = new THREE.Mesh(
      new THREE.CylinderGeometry(11, 12.2, 1.2, 12),
      mats.wheatGold
    )
    wheatTerrace.position.set(10.5, -0.3, 8.5)
    wheatTerrace.receiveShadow = true
    islandGroup.add(wheatTerrace)

    const lavenderTerrace = new THREE.Mesh(
      new THREE.CylinderGeometry(8.5, 9.5, 1.0, 10),
      mats.lavenderGrass
    )
    lavenderTerrace.position.set(11, -0.4, -9)
    lavenderTerrace.receiveShadow = true
    islandGroup.add(lavenderTerrace)

    const citadelMound = new THREE.Mesh(
      new THREE.CylinderGeometry(15.2, 17.5, 2.2, 14),
      mats.foundationRock
    )
    citadelMound.position.set(0, 0.8, -1)
    citadelMound.receiveShadow = true
    citadelMound.castShadow = true
    islandGroup.add(citadelMound)

    const rootLayers = [
      { rTop: 25.2, rBot: 20.5, h: 4.5, y: -4.8, mat: mats.foundationRock },
      { rTop: 20.5, rBot: 14.2, h: 5.5, y: -9.8, mat: mats.underRockMid },
      { rTop: 14.2, rBot: 7.5, h: 6.0, y: -15.5, mat: mats.underRockDeep },
      { rTop: 7.5, rBot: 1.2, h: 5.8, y: -21.4, mat: mats.underRockDeep },
    ]
    rootLayers.forEach((layer, idx) => {
      const geo = new THREE.CylinderGeometry(
        layer.rTop,
        layer.rBot,
        layer.h,
        11 + idx
      )
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i)
        const vz = pos.getZ(i)
        const angle = Math.atan2(vz, vx)
        const wobble = 1 + Math.sin(angle * 5 + idx * 2) * 0.08
        pos.setX(i, vx * wobble)
        pos.setZ(i, vz * wobble)
      }
      geo.computeVertexNormals()
      const mesh = new THREE.Mesh(geo, layer.mat)
      mesh.position.y = layer.y
      mesh.castShadow = true
      mesh.receiveShadow = true
      islandGroup.add(mesh)
    })

    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2
      const dist = 9 + (i % 3) * 5.2
      const crag = new THREE.Mesh(
        new THREE.ConeGeometry(2.2 + (i % 2) * 1.1, 6.5 + (i % 3) * 2.5, 6),
        mats.underRockMid
      )
      crag.position.set(
        Math.cos(angle) * dist,
        -9 - (18 - dist) * 0.65,
        Math.sin(angle) * dist
      )
      crag.rotation.x = Math.PI + (Math.random() - 0.5) * 0.18
      crag.rotation.z = (Math.random() - 0.5) * 0.18
      islandGroup.add(crag)

      if (i % 2 === 0) {
        const crystalGeo = new THREE.OctahedronGeometry(
          1.1 + (i % 3) * 0.45,
          0
        )
        crystalGeo.scale(0.65, 2.4, 0.65)
        const crystal = new THREE.Mesh(
          crystalGeo,
          i % 4 === 0 ? mats.crystalCyan : mats.crystalPurple
        )
        crystal.position.set(
          Math.cos(angle) * (dist - 1.2),
          -10 - (18 - dist) * 0.6,
          Math.sin(angle) * (dist - 1.2)
        )
        crystal.rotation.set(
          (Math.random() - 0.5) * 0.6,
          angle,
          (Math.random() - 0.5) * 0.6
        )
        islandGroup.add(crystal)
      }
    }

    const waterGroup = new THREE.Group()
    islandGroup.add(waterGroup)

    const moatGeo = new THREE.RingGeometry(15.2, 18.2, 32)
    moatGeo.rotateX(-Math.PI / 2)
    const moatMesh = new THREE.Mesh(moatGeo, mats.waterMat)
    moatMesh.position.set(0, 0.08, -1)
    waterGroup.add(moatMesh)

    const riverChannel = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.2, 12),
      mats.waterMat
    )
    riverChannel.position.set(-12.5, 0.08, 12.5)
    riverChannel.rotation.y = Math.PI / 4
    waterGroup.add(riverChannel)

    const waterfallMat = new THREE.MeshStandardMaterial({
      color: '#8CE7F2',
      emissive: '#3898A8',
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.78,
      roughness: 0.2,
      side: THREE.DoubleSide,
    })
    const waterfallMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 2.4, 24, 12, 1, true),
      waterfallMat
    )
    waterfallMesh.position.set(-16.8, -11.8, 16.8)
    waterGroup.add(waterfallMesh)

    const mistPuffs: { mesh: THREE.Mesh; speed: number; baseOffset: number }[] =
      []
    const mistMat = new THREE.MeshStandardMaterial({
      color: '#FFF9F0',
      transparent: true,
      opacity: 0.65,
      roughness: 1,
    })
    for (let i = 0; i < 16; i++) {
      const puff = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.7 + Math.random() * 0.9, 1),
        mistMat
      )
      puff.position.set(
        -16.8 + (Math.random() - 0.5) * 3.2,
        -22 + Math.random() * 22,
        16.8 + (Math.random() - 0.5) * 3.2
      )
      waterGroup.add(puff)
      mistPuffs.push({
        mesh: puff,
        speed: 2.5 + Math.random() * 2.0,
        baseOffset: Math.random() * Math.PI * 2,
      })
    }

    // East Satellite Island: B-612 Rose Conservatory Isle
    const roseIsleGroup = new THREE.Group()
    roseIsleGroup.position.set(34, 2.2, -4)
    worldGroup.add(roseIsleGroup)

    const roseIsleTop = new THREE.Mesh(
      new THREE.CylinderGeometry(7.2, 7.8, 1.6, 12),
      mats.meadowTop
    )
    roseIsleTop.receiveShadow = true
    roseIsleGroup.add(roseIsleTop)

    const roseIsleRoot = new THREE.Mesh(
      new THREE.ConeGeometry(7.6, 11.5, 9),
      mats.underRockMid
    )
    roseIsleRoot.position.y = -6.5
    roseIsleRoot.rotation.x = Math.PI
    roseIsleGroup.add(roseIsleRoot)

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 3.1, 0.9, 16),
      mats.creamStone
    )
    pedestal.position.y = 1.1
    roseIsleGroup.add(pedestal)

    const roseGroup = new THREE.Group()
    roseGroup.position.set(0, 1.6, 0)
    roseIsleGroup.add(roseGroup)

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 1.5, 8),
      new THREE.MeshStandardMaterial({ color: '#4B8B5A' })
    )
    stem.position.y = 0.75
    roseGroup.add(stem)

    const roseBlossom = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.42, 1),
      new THREE.MeshStandardMaterial({
        color: '#E63956',
        emissive: '#9E1B32',
        emissiveIntensity: 0.35,
        roughness: 0.4,
      })
    )
    roseBlossom.position.y = 1.55
    roseGroup.add(roseBlossom)

    const bellJar = new THREE.Mesh(
      new THREE.CylinderGeometry(1.05, 1.15, 2.4, 20, 1, false),
      mats.glassBell
    )
    bellJar.position.y = 1.2
    roseGroup.add(bellJar)

    const bellDome = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      mats.glassBell
    )
    bellDome.position.y = 2.4
    roseGroup.add(bellDome)

    const bellHandle = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 12, 12),
      mats.goldTrim
    )
    bellHandle.position.y = 3.5
    roseGroup.add(bellHandle)

    const eastBridgeGroup = new THREE.Group()
    worldGroup.add(eastBridgeGroup)
    for (let i = 0; i < 6; i++) {
      const t = i / 5
      const bx = 21.5 + t * 6.5
      const bz = -2.2 - t * 1.2
      const by = 0.6 + Math.sin(t * Math.PI) * 1.8 + t * 1.8
      const seg = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.45, 2.2),
        mats.creamStone
      )
      seg.position.set(bx, by, bz)
      seg.rotation.y = 0.18
      eastBridgeGroup.add(seg)
    }

    // West Satellite Island: Windmill & Twin Mini Volcanoes Isle
    const westIsleGroup = new THREE.Group()
    westIsleGroup.position.set(-34, 1.5, -6)
    worldGroup.add(westIsleGroup)

    const westIsleTop = new THREE.Mesh(
      new THREE.CylinderGeometry(8.5, 9.2, 1.8, 12),
      mats.wheatGold
    )
    westIsleTop.receiveShadow = true
    westIsleGroup.add(westIsleTop)

    const westIsleRoot = new THREE.Mesh(
      new THREE.ConeGeometry(8.8, 13, 9),
      mats.underRockDeep
    )
    westIsleRoot.position.y = -7.3
    westIsleRoot.rotation.x = Math.PI
    westIsleGroup.add(westIsleRoot)

    const windmillTower = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 2.2, 6.2, 10),
      mats.creamStone
    )
    windmillTower.position.set(-1.5, 3.8, -1.5)
    windmillTower.castShadow = true
    westIsleGroup.add(windmillTower)

    const windmillCap = new THREE.Mesh(
      new THREE.ConeGeometry(1.85, 2.2, 10),
      mats.coralRoof
    )
    windmillCap.position.set(-1.5, 7.9, -1.5)
    westIsleGroup.add(windmillCap)

    const windmillBladesGroup = new THREE.Group()
    windmillBladesGroup.position.set(-1.5, 5.8, 0.1)
    westIsleGroup.add(windmillBladesGroup)

    for (let b = 0; b < 4; b++) {
      const armGroup = new THREE.Group()
      armGroup.rotation.z = (b * Math.PI) / 2
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 4.4, 0.18),
        mats.darkTimber
      )
      beam.position.y = 2.2
      armGroup.add(beam)

      const sail = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 3.5, 0.06),
        new THREE.MeshStandardMaterial({ color: '#FFF7E8', roughness: 0.9 })
      )
      sail.position.set(0.45, 2.4, 0.05)
      armGroup.add(sail)
      windmillBladesGroup.add(armGroup)
    }

    const activeVolcano = new THREE.Mesh(
      new THREE.ConeGeometry(2.2, 2.8, 9),
      mats.underRockMid
    )
    activeVolcano.position.set(3.2, 2.1, 2.0)
    westIsleGroup.add(activeVolcano)

    const volcanoCraterGlow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.5, 0.3, 8),
      new THREE.MeshBasicMaterial({ color: '#FF7B54' })
    )
    volcanoCraterGlow.position.set(3.2, 3.42, 2.0)
    westIsleGroup.add(volcanoCraterGlow)

    const extinctVolcano = new THREE.Mesh(
      new THREE.ConeGeometry(1.7, 1.9, 8),
      mats.foundationRock
    )
    extinctVolcano.position.set(4.8, 1.6, -1.2)
    westIsleGroup.add(extinctVolcano)

    for (let i = 0; i < 7; i++) {
      const t = i / 6
      const bx = -22 - t * 5.2
      const bz = -3.2 - t * 2.0
      const by = 0.5 - Math.sin(t * Math.PI) * 0.4 + t * 1.2
      const plank = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.22, 1.9),
        mats.warmOak
      )
      plank.position.set(bx, by, bz)
      worldGroup.add(plank)
    }

    // Castle Architecture
    const castleGroup = new THREE.Group()
    castleGroup.position.set(0, 1.9, -1)
    islandGroup.add(castleGroup)

    const createTower = (
      x: number,
      z: number,
      radius: number,
      height: number,
      roofHeight: number,
      roofMat: THREE.Material,
      hasSpireFlag = true
    ) => {
      const tGroup = new THREE.Group()
      tGroup.position.set(x, 0, z)

      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius * 1.06, height, 16),
        mats.creamStone
      )
      body.position.y = height / 2
      body.castShadow = true
      body.receiveShadow = true
      tGroup.add(body)

      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 1.14, radius * 1.04, 0.8, 16),
        mats.warmStone
      )
      collar.position.y = height - 0.2
      tGroup.add(collar)

      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(radius * 1.24, roofHeight, 16),
        roofMat
      )
      roof.position.y = height + roofHeight / 2 + 0.1
      roof.castShadow = true
      tGroup.add(roof)

      for (let w = 0; w < 4; w++) {
        const wa = (w * Math.PI) / 2 + Math.PI / 4
        const win = new THREE.Mesh(
          new THREE.BoxGeometry(0.45, 0.95, 0.2),
          mats.windowGlow
        )
        win.position.set(
          Math.cos(wa) * (radius + 0.02),
          height * 0.65,
          Math.sin(wa) * (radius + 0.02)
        )
        win.rotation.y = -wa + Math.PI / 2
        tGroup.add(win)
      }

      if (hasSpireFlag) {
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 2.2, 6),
          mats.goldTrim
        )
        pole.position.y = height + roofHeight + 1.0
        tGroup.add(pole)

        const pennant = new THREE.Mesh(
          new THREE.ConeGeometry(0.35, 1.3, 4),
          mats.coralRoof
        )
        pennant.rotation.z = -Math.PI / 2
        pennant.position.set(0.65, height + roofHeight + 1.7, 0)
        tGroup.add(pennant)
      }

      castleGroup.add(tGroup)
      return tGroup
    }

    createTower(-11.5, -10.5, 2.5, 13.5, 5.5, mats.blueRoof, true)
    createTower(11.5, -10.5, 2.5, 14.2, 5.8, mats.coralRoof, true)
    createTower(-11.5, 9.5, 2.3, 11.5, 4.8, mats.coralRoof, true)
    createTower(11.5, 9.5, 2.3, 11.5, 4.8, mats.blueRoof, true)

    createTower(-6.8, -5.8, 1.9, 19.5, 6.2, mats.blueRoof, true)
    createTower(6.8, -5.8, 2.1, 21.0, 6.8, mats.coralRoof, true)
    createTower(-6.8, 4.2, 1.8, 16.5, 5.2, mats.coralRoof, false)
    createTower(6.8, 4.2, 1.8, 16.5, 5.2, mats.blueRoof, false)

    const addCurtainWall = (
      x: number,
      z: number,
      w: number,
      h: number,
      d: number
    ) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats.warmStone)
      wall.position.set(x, h / 2, z)
      wall.castShadow = true
      wall.receiveShadow = true
      castleGroup.add(wall)

      const count = Math.floor(Math.max(w, d) / 1.4)
      const isAlongX = w > d
      for (let i = 0; i < count; i++) {
        const offset = -Math.max(w, d) / 2 + 0.7 + i * 1.4
        const merlon = new THREE.Mesh(
          new THREE.BoxGeometry(
            isAlongX ? 0.75 : w + 0.2,
            0.75,
            isAlongX ? d + 0.2 : 0.75
          ),
          mats.creamStone
        )
        merlon.position.set(
          isAlongX ? x + offset : x,
          h + 0.37,
          isAlongX ? z : z + offset
        )
        castleGroup.add(merlon)
      }
    }

    addCurtainWall(0, -10.5, 22, 7.2, 1.5)
    addCurtainWall(-11.5, -0.5, 1.5, 6.8, 19)
    addCurtainWall(11.5, -0.5, 1.5, 6.8, 19)
    addCurtainWall(-7.2, 9.5, 8.2, 6.5, 1.5)
    addCurtainWall(7.2, 9.5, 8.2, 6.5, 1.5)

    const gatehouseLeft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.75, 9.2, 12),
      mats.creamStone
    )
    gatehouseLeft.position.set(-2.6, 4.6, 10.2)
    castleGroup.add(gatehouseLeft)

    const gatehouseRight = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.75, 9.2, 12),
      mats.creamStone
    )
    gatehouseRight.position.set(2.6, 4.6, 10.2)
    castleGroup.add(gatehouseRight)

    const gateLintel = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 3.4, 2.2),
      mats.warmStone
    )
    gateLintel.position.set(0, 7.5, 10.2)
    castleGroup.add(gateLintel)

    const drawbridge = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.35, 6.8),
      mats.darkTimber
    )
    drawbridge.position.set(0, 0.1, 14.2)
    drawbridge.rotation.x = 0.08
    castleGroup.add(drawbridge)

    // Central Keep Rear/Side Walls & Cutaway Front Facade
    const keepBackWall = new THREE.Mesh(
      new THREE.BoxGeometry(12.6, 18.0, 1.1),
      mats.creamStone
    )
    keepBackWall.position.set(0, 9.0, -5.2)
    keepBackWall.castShadow = true
    keepBackWall.receiveShadow = true
    castleGroup.add(keepBackWall)

    const keepLeftWall = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 18.0, 9.6),
      mats.creamStone
    )
    keepLeftWall.position.set(-5.8, 9.0, -0.8)
    keepLeftWall.castShadow = true
    castleGroup.add(keepLeftWall)

    const keepRightWall = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 18.0, 9.6),
      mats.creamStone
    )
    keepRightWall.position.set(5.8, 9.0, -0.8)
    keepRightWall.castShadow = true
    castleGroup.add(keepRightWall)

    const keepRoofBase = new THREE.Mesh(
      new THREE.BoxGeometry(13.2, 1.0, 10.6),
      mats.warmStone
    )
    keepRoofBase.position.set(0, 18.2, -0.8)
    castleGroup.add(keepRoofBase)

    for (let p = 0; p < 8; p++) {
      const pa = (p / 8) * Math.PI * 2
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.32, 4.2, 10),
        mats.creamStone
      )
      pillar.position.set(
        Math.cos(pa) * 3.8,
        20.6,
        -0.8 + Math.sin(pa) * 3.8
      )
      castleGroup.add(pillar)
    }

    const observatoryDomeRoof = new THREE.Mesh(
      new THREE.ConeGeometry(5.2, 6.5, 16),
      mats.blueRoof
    )
    observatoryDomeRoof.position.set(0, 25.8, -0.8)
    observatoryDomeRoof.castShadow = true
    castleGroup.add(observatoryDomeRoof)

    const cutawayFrontGroup = new THREE.Group()
    castleGroup.add(cutawayFrontGroup)

    const frontFacadeMat = mats.creamStone.clone()
    frontFacadeMat.transparent = true
    frontFacadeMat.opacity = 1.0

    const frontFacadeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(12.2, 17.8, 1.0),
      frontFacadeMat
    )
    frontFacadeMesh.position.set(0, 8.9, 3.8)
    frontFacadeMesh.castShadow = true
    cutawayFrontGroup.add(frontFacadeMesh)

    const roseWindowFrame = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.22, 12, 24),
      mats.goldTrim
    )
    roseWindowFrame.position.set(0, 12.2, 4.35)
    cutawayFrontGroup.add(roseWindowFrame)

    const roseWindowGlass = new THREE.Mesh(
      new THREE.CircleGeometry(1.95, 24),
      new THREE.MeshBasicMaterial({ color: '#FF9E6D' })
    )
    roseWindowGlass.position.set(0, 12.2, 4.32)
    cutawayFrontGroup.add(roseWindowGlass)

    // 5-Floor Interior Furnishings
    const interiorGroup = new THREE.Group()
    castleGroup.add(interiorGroup)

    const floorHeights = [0.1, 4.6, 9.2, 13.8, 18.2]
    floorHeights.forEach((fy, idx) => {
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(11.0, 0.38, 8.6),
        idx === 0 ? mats.foundationRock : mats.warmOak
      )
      slab.position.set(0, fy, -0.8)
      slab.receiveShadow = true
      interiorGroup.add(slab)
    })

    // B1 Alchemical Aether Core
    const cryptVaultGroup = new THREE.Group()
    cryptVaultGroup.position.set(0, -1.6, -0.8)
    castleGroup.add(cryptVaultGroup)

    const aetherHeartCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.25, 0),
      mats.crystalCyan
    )
    aetherHeartCore.position.set(0, 0.8, 0)
    cryptVaultGroup.add(aetherHeartCore)

    const aetherBrassRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.1, 12, 32),
      mats.goldTrim
    )
    aetherBrassRing.position.set(0, 0.8, 0)
    cryptVaultGroup.add(aetherBrassRing)

    // 1F Banquet Hall
    const banquetTable = new THREE.Mesh(
      new THREE.BoxGeometry(6.4, 0.85, 1.8),
      mats.warmOak
    )
    banquetTable.position.set(0, 0.72, -0.5)
    interiorGroup.add(banquetTable)

    const fireplaceBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 3.6, 1.2),
      mats.foundationRock
    )
    fireplaceBody.position.set(0, 2.0, -4.2)
    interiorGroup.add(fireplaceBody)

    const fireGlow = new THREE.Mesh(
      new THREE.ConeGeometry(0.65, 1.1, 8),
      new THREE.MeshBasicMaterial({ color: '#FF7B29' })
    )
    fireGlow.position.set(0, 1.0, -3.7)
    interiorGroup.add(fireGlow)

    // 2F Scriptorium Library
    for (const bx of [-4.2, -1.8, 1.8, 4.2]) {
      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 3.6, 0.75),
        mats.darkTimber
      )
      shelf.position.set(bx, 6.6, -4.1)
      interiorGroup.add(shelf)
    }

    const terrestrialGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 16),
      new THREE.MeshStandardMaterial({ color: '#64A6BD', roughness: 0.5 })
    )
    terrestrialGlobe.position.set(2.4, 5.8, 0.2)
    interiorGroup.add(terrestrialGlobe)

    // 3F Royal Solarium
    const canopyBedBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.75, 2.2),
      mats.coralRoof
    )
    canopyBedBase.position.set(-2.5, 9.8, -1.8)
    interiorGroup.add(canopyBedBase)

    const canopyTop = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.25, 2.4),
      mats.goldTrim
    )
    canopyTop.position.set(-2.5, 12.2, -1.8)
    interiorGroup.add(canopyTop)

    // 4F Celestial Armillary Observatory
    const armillaryGroup = new THREE.Group()
    armillaryGroup.position.set(0, 20.6, -0.8)
    castleGroup.add(armillaryGroup)

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.08, 12, 32),
      mats.goldTrim
    )
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.07, 12, 32),
      mats.goldTrim
    )
    ring2.rotation.x = Math.PI / 3
    const centerStar = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 16, 16),
      mats.windowGlow
    )
    armillaryGroup.add(ring1, ring2, centerStar)

    // 6 Characters
    const buildCharacterPawn = (
      pos: [number, number, number],
      tunicColor: string,
      hairOrHatColor: string,
      options?: {
        hasScarf?: boolean
        hasPointedHat?: boolean
        hasLantern?: boolean
        isFox?: boolean
      }
    ) => {
      const charGroup = new THREE.Group()
      charGroup.position.set(...pos)

      if (options?.isFox) {
        const foxMat = new THREE.MeshStandardMaterial({
          color: '#E06D44',
          roughness: 0.75,
        })
        const whiteMat = new THREE.MeshStandardMaterial({
          color: '#FFF8EE',
          roughness: 0.85,
        })
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(0.65, 0.55, 1.1),
          foxMat
        )
        body.position.y = 0.45
        charGroup.add(body)

        const tail = new THREE.Mesh(
          new THREE.ConeGeometry(0.28, 0.95, 7),
          whiteMat
        )
        tail.rotation.x = -Math.PI / 3
        tail.position.set(0, 0.65, -0.75)
        charGroup.add(tail)

        worldGroup.add(charGroup)
        return { group: charGroup, scarf: null, tail }
      }

      const body = new THREE.Mesh(
        new THREE.ConeGeometry(0.52, 1.45, 12),
        new THREE.MeshStandardMaterial({ color: tunicColor, roughness: 0.75 })
      )
      body.position.y = 0.72
      charGroup.add(body)

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.36, 16, 16),
        new THREE.MeshStandardMaterial({ color: '#FFE3CC', roughness: 0.7 })
      )
      head.position.y = 1.65
      charGroup.add(head)

      if (options?.hasPointedHat) {
        const wizardHat = new THREE.Mesh(
          new THREE.ConeGeometry(0.48, 1.1, 12),
          new THREE.MeshStandardMaterial({ color: hairOrHatColor })
        )
        wizardHat.position.y = 2.35
        charGroup.add(wizardHat)
      } else {
        const hair = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.39, 1),
          new THREE.MeshStandardMaterial({ color: hairOrHatColor })
        )
        hair.position.set(0, 1.78, -0.05)
        charGroup.add(hair)
      }

      let scarfMesh: THREE.Mesh | null = null
      if (options?.hasScarf) {
        scarfMesh = new THREE.Mesh(
          new THREE.BoxGeometry(1.65, 0.18, 0.32),
          new THREE.MeshStandardMaterial({
            color: '#FFD15C',
            emissive: '#D49B2A',
            emissiveIntensity: 0.2,
          })
        )
        scarfMesh.position.set(0.85, 1.38, -0.15)
        charGroup.add(scarfMesh)
      }

      if (options?.hasLantern) {
        const lanternOrb = new THREE.Mesh(
          new THREE.SphereGeometry(0.28, 12, 12),
          mats.windowGlow
        )
        lanternOrb.position.set(0.65, 1.2, 0.35)
        charGroup.add(lanternOrb)
      }

      worldGroup.add(charGroup)
      return { group: charGroup, scarf: scarfMesh, tail: null }
    }

    const princeObj = buildCharacterPawn([6.8, 18.5, 3.2], '#3B7A57', '#FFD45E', {
      hasScarf: true,
    })
    const foxObj = buildCharacterPawn([11.5, 0.35, 9.2], '#E06D44', '#FFF8EE', {
      isFox: true,
    })
    buildCharacterPawn([-1.5, 20.3, -1.8], '#3D4073', '#2B2D5C', {
      hasPointedHat: true,
    })
    buildCharacterPawn([-3.5, 2.0, 12.2], '#C85A53', '#4A5568', {
      hasLantern: true,
    })
    buildCharacterPawn([-2.2, 6.7, -0.6], '#8C6246', '#5C4033')
    buildCharacterPawn([32.2, 3.0, -3.2], '#5B8C6E', '#D98A5B')

    // Trees
    const treePositions: [number, number, number, 'cypress' | 'apple'][] = [
      [-16, 0, -10, 'cypress'],
      [-18, 0, -4, 'cypress'],
      [-15, 0, 5, 'apple'],
      [15, 0.3, 6, 'apple'],
      [13, 0.3, 12, 'apple'],
      [8, 0.3, 14, 'apple'],
      [16, 0.1, -9, 'cypress'],
      [14, 0.1, -13, 'cypress'],
    ]
    treePositions.forEach(([tx, ty, tz, type], idx) => {
      const tGroup = new THREE.Group()
      tGroup.position.set(tx, ty, tz)
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.35, 1.4, 7),
        mats.darkTimber
      )
      trunk.position.y = 0.7
      tGroup.add(trunk)

      const crown =
        type === 'cypress'
          ? new THREE.Mesh(
              new THREE.ConeGeometry(1.1, 4.2, 8),
              new THREE.MeshStandardMaterial({
                color: idx % 2 === 0 ? '#4D7C6A' : '#5E8E72',
                roughness: 0.85,
                flatShading: true,
              })
            )
          : new THREE.Mesh(
              new THREE.DodecahedronGeometry(1.45, 1),
              new THREE.MeshStandardMaterial({
                color: idx % 2 === 0 ? '#79A86B' : '#E2956B',
                roughness: 0.85,
                flatShading: true,
              })
            )
      crown.position.y = type === 'cypress' ? 2.8 : 2.1
      crown.castShadow = true
      tGroup.add(crown)
      islandGroup.add(tGroup)
    })

    // Clouds & Starfield
    const cloudsGroup = new THREE.Group()
    scene.add(cloudsGroup)
    const cloudMat = new THREE.MeshStandardMaterial({
      color: '#FFF6EB',
      roughness: 0.92,
      flatShading: true,
    })
    for (let c = 0; c < 12; c++) {
      const singleCloud = new THREE.Group()
      const angle = (c / 12) * Math.PI * 2
      const radius = 34 + (c % 3) * 14
      singleCloud.position.set(
        Math.cos(angle) * radius,
        -8 + (c % 4) * 9,
        Math.sin(angle) * radius
      )
      for (let p = 0; p < 3; p++) {
        const puff = new THREE.Mesh(
          new THREE.DodecahedronGeometry(1.8 + (p % 2) * 0.9, 1),
          cloudMat
        )
        puff.position.set((p - 1) * 1.7, (p % 2) * 0.5, 0)
        singleCloud.add(puff)
      }
      cloudsGroup.add(singleCloud)
    }

    const starCount = 450
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 95 + Math.random() * 90
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = Math.abs(r * Math.cos(phi)) - 15
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    )
    const starMat = new THREE.PointsMaterial({
      color: '#FFF4C8',
      size: 1.35,
      transparent: true,
      opacity: 0.85,
    })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    let frameId = 0
    const clock = new THREE.Clock()
    let lastHotspotProjectionTime = 0

    const targetTopCol = new THREE.Color()
    const targetMidCol = new THREE.Color()
    const targetBotCol = new THREE.Color()
    const targetFogCol = new THREE.Color()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()
      const curState = stateRef.current

      const sunsetProgress = (curState.sunsetIndex - 1) / 43
      if (curState.timeMode === 'sunset') {
        targetTopCol
          .set('#3A2E5E')
          .lerp(new THREE.Color('#251E47'), sunsetProgress * 0.5)
        targetMidCol
          .set('#D9727E')
          .lerp(new THREE.Color('#C45B7A'), sunsetProgress * 0.5)
        targetBotCol
          .set('#F9C784')
          .lerp(new THREE.Color('#FF9B6A'), sunsetProgress * 0.5)
        targetFogCol.set('#E8A88A')
        sunLight.intensity = 1.85 - sunsetProgress * 0.35
        sunLight.color.set('#FFB070')
        hemiLight.intensity = 1.15
        starMat.opacity = 0.45 + sunsetProgress * 0.35
        celestialOrbGroup.position.set(85, 38 - sunsetProgress * 22, -95)
      } else if (curState.timeMode === 'morning') {
        targetTopCol.set('#5B89B4')
        targetMidCol.set('#A5C9DC')
        targetBotCol.set('#FBF0D9')
        targetFogCol.set('#E6E6DC')
        sunLight.intensity = 2.05
        sunLight.color.set('#FFF2D6')
        hemiLight.intensity = 1.35
        starMat.opacity = 0.08
        celestialOrbGroup.position.set(75, 56, -85)
      } else {
        targetTopCol.set('#0F152B')
        targetMidCol.set('#1F2B52')
        targetBotCol.set('#3B3F6E')
        targetFogCol.set('#23294A')
        sunLight.intensity = 0.65
        sunLight.color.set('#9DB8FF')
        hemiLight.intensity = 0.65
        starMat.opacity = 0.98
        celestialOrbGroup.position.set(70, 52, -90)
      }

      skyMat.uniforms.topColor.value.lerp(targetTopCol, 0.05)
      skyMat.uniforms.midColor.value.lerp(targetMidCol, 0.05)
      skyMat.uniforms.bottomColor.value.lerp(targetBotCol, 0.05)
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.lerp(targetFogCol, 0.05)
      }

      const targetCutawayX = curState.cutawayMode ? 15.5 : 0
      const targetCutawayOpacity = curState.cutawayMode ? 0.12 : 1.0
      cutawayFrontGroup.position.x = THREE.MathUtils.lerp(
        cutawayFrontGroup.position.x,
        targetCutawayX,
        0.08
      )
      frontFacadeMat.opacity = THREE.MathUtils.lerp(
        frontFacadeMat.opacity,
        targetCutawayOpacity,
        0.08
      )

      worldGroup.position.y = Math.sin(elapsed * 0.85) * 0.42
      roseIsleGroup.position.y = 2.2 + Math.sin(elapsed * 1.1 + 1.2) * 0.55
      westIsleGroup.position.y = 1.5 + Math.sin(elapsed * 0.95 + 2.5) * 0.48

      windmillBladesGroup.rotation.z = -elapsed * 0.65
      armillaryGroup.rotation.y = elapsed * 0.5
      aetherHeartCore.rotation.y = elapsed * 0.9
      aetherBrassRing.rotation.x = elapsed * 0.6

      if (princeObj.scarf) {
        princeObj.scarf.rotation.y = Math.sin(elapsed * 3.8) * 0.22
      }
      if (foxObj.tail) {
        foxObj.tail.rotation.z = Math.sin(elapsed * 2.6) * 0.25
      }

      mistPuffs.forEach((p) => {
        p.mesh.position.y += 0.045 * p.speed
        if (p.mesh.position.y > 0.2) {
          p.mesh.position.y = -22.5
        }
      })

      cloudsGroup.rotation.y = elapsed * 0.025

      if (cameraFlightRef.current.active) {
        camera.position.lerp(cameraFlightRef.current.targetPos, 0.065)
        controls.target.lerp(cameraFlightRef.current.targetLookAt, 0.075)
        if (
          camera.position.distanceTo(cameraFlightRef.current.targetPos) <
            0.35 &&
          controls.target.distanceTo(cameraFlightRef.current.targetLookAt) <
            0.25
        ) {
          cameraFlightRef.current.active = false
        }
      } else if (curState.autoRotate) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.55
      } else {
        controls.autoRotate = false
      }

      controls.update()
      renderer.render(scene, camera)

      if (elapsed - lastHotspotProjectionTime > 0.065) {
        lastHotspotProjectionTime = elapsed
        if (!curState.showHotspots) {
          setScreenHotspots([])
        } else {
          const rect = renderer.domElement.getBoundingClientRect()
          const projected: ScreenHotspot[] = allHotspots.map((item) => {
            const worldVec = new THREE.Vector3(
              item.position[0],
              item.position[1] + worldGroup.position.y,
              item.position[2]
            )
            worldVec.project(camera)
            const isBehind = worldVec.z > 1.0
            const sx = (worldVec.x * 0.5 + 0.5) * rect.width
            const sy = (-(worldVec.y * 0.5) + 0.5) * rect.height
            const inBounds =
              !isBehind &&
              sx >= 20 &&
              sx <= rect.width - 20 &&
              sy >= 50 &&
              sy <= rect.height - 40
            return {
              ...item,
              x: sx,
              y: sy,
              visible: inBounds,
            }
          })
          setScreenHotspots(projected)
        }
      }
    }

    animate()

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      controls.removeEventListener('start', onControlStart)
      controls.dispose()
      renderer.dispose()
    }
  }, [allHotspots])

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="小王子风格中世纪欧洲浮空岛城堡 3D 交互场景"
      />

      {showHotspots && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {screenHotspots.map((spot) => {
            if (!spot.visible) return null
            const isSelected = activeSelectionId === spot.id
            if (
              activeHotspotCategory !== 'all' &&
              spot.category !== activeHotspotCategory &&
              !isSelected
            ) {
              return null
            }
            const badgeText =
              spot.category === 'interior'
                ? '内'
                : spot.category === 'character'
                  ? '人'
                  : '境'
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => handleHotspotClick(spot)}
                style={{
                  transform: `translate3d(${Math.round(spot.x)}px, ${Math.round(spot.y)}px, 0)`,
                }}
                className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200 shadow-md backdrop-blur-md border ${
                  isSelected
                    ? 'bg-amber-100/95 text-amber-950 border-amber-500 scale-110 z-30 ring-2 ring-amber-400/60'
                    : 'bg-stone-900/75 text-amber-50/95 border-amber-200/30 hover:bg-amber-950/90 hover:border-amber-300/70 hover:scale-105 z-10'
                }`}
              >
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-stone-950"
                  style={{ backgroundColor: spot.color }}
                >
                  {badgeText}
                </span>
                <span className="whitespace-nowrap tracking-wide">
                  {spot.label}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

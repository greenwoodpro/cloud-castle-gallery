import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { palette, type Vec3 } from './world-data'

export const colors = {
  stone: palette.paper,
  stoneShade: new THREE.Color(palette.paper).lerp(new THREE.Color(palette.gold), 0.27).getStyle(),
  rock: new THREE.Color(palette.paper).lerp(new THREE.Color(palette.ink), 0.37).getStyle(),
  rockShade: new THREE.Color(palette.paper).lerp(new THREE.Color(palette.ink), 0.48).getStyle(),
  grass: palette.sage,
  grassLight: new THREE.Color(palette.sage).lerp(new THREE.Color(palette.paper), 0.22).getStyle(),
  leaves: new THREE.Color(palette.sage).lerp(new THREE.Color(palette.ink), 0.18).getStyle(),
  roof: palette.slate,
  roofLight: new THREE.Color(palette.slate).lerp(new THREE.Color(palette.paper), 0.18).getStyle(),
  wood: palette.gold,
  dark: palette.ink,
  water: new THREE.Color(palette.slate).lerp(new THREE.Color(palette.paper), 0.35).getStyle(),
  flower: palette.paper,
  light: palette.gold,
}
export type MaterialName = keyof typeof colors

export function seededRandom(seed = 42) {
  let state = seed
  return () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 4294967296 }
}

export class ModelKit {
  layer = 'landscape'
  private buckets = new Map<string, THREE.BufferGeometry[]>()
  private matrix = new THREE.Matrix4()
  private rotation = new THREE.Quaternion()

  add(geometry: THREE.BufferGeometry, material: MaterialName, position: Vec3 = [0, 0, 0], scale: Vec3 = [1, 1, 1], rotation: Vec3 = [0, 0, 0]) {
    this.rotation.setFromEuler(new THREE.Euler(...rotation))
    this.matrix.compose(new THREE.Vector3(...position), this.rotation, new THREE.Vector3(...scale))
    const flat = geometry.index ? geometry.toNonIndexed() : geometry
    if (flat !== geometry) geometry.dispose()
    flat.applyMatrix4(this.matrix)
    flat.deleteAttribute('uv')
    if (!flat.attributes.normal) flat.computeVertexNormals()
    const key = `${this.layer}:${material}`
    if (!this.buckets.has(key)) this.buckets.set(key, [])
    this.buckets.get(key)!.push(flat)
  }

  box(position: Vec3, scale: Vec3, material: MaterialName, rotation: Vec3 = [0, 0, 0]) {
    this.add(new THREE.BoxGeometry(1, 1, 1), material, position, scale, rotation)
  }

  cylinder(position: Vec3, top: number, bottom: number, height: number, material: MaterialName, sides = 12, rotation: Vec3 = [0, 0, 0]) {
    this.add(new THREE.CylinderGeometry(top, bottom, height, sides), material, position, [1, 1, 1], rotation)
  }

  ball(position: Vec3, scale: Vec3, material: MaterialName, detail = 1) {
    this.add(new THREE.IcosahedronGeometry(1, detail), material, position, scale)
  }

  beam(start: Vec3, end: Vec3, radius: number, material: MaterialName) {
    const a = new THREE.Vector3(...start), b = new THREE.Vector3(...end)
    const direction = b.clone().sub(a)
    const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 6)
    geometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize()))
    this.add(geometry, material, a.add(b).multiplyScalar(0.5).toArray() as Vec3)
  }

  arch(position: Vec3, width: number, height: number, depth: number, material: MaterialName, rotation = 0) {
    const r = width / 2
    const shape = new THREE.Shape()
    shape.moveTo(-r, 0)
    shape.lineTo(r, 0)
    shape.lineTo(r, height - r)
    shape.absarc(0, height - r, r, 0, Math.PI, false)
    shape.lineTo(-r, 0)
    const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 10 })
    this.add(geo, material, position, [1, 1, 1], [0, rotation, 0])
  }

  finish() {
    const root = new THREE.Group()
    root.name = '星屿 · 云端城堡'
    const layers = new Map<string, THREE.Group>()
    const materials = new Map<string, THREE.MeshStandardMaterial>()
    for (const [key, geometries] of this.buckets) {
      const [layer, material] = key.split(':') as [string, MaterialName]
      if (!layers.has(layer)) {
        const group = new THREE.Group()
        group.name = layer
        layers.set(layer, group)
        root.add(group)
      }
      if (!materials.has(material)) {
        materials.set(material, new THREE.MeshStandardMaterial({
          color: colors[material], roughness: 0.95, metalness: 0,
          flatShading: material === 'rock' || material === 'rockShade',
          ...(material === 'light' ? { emissive: palette.gold, emissiveIntensity: 0.15 } : {}),
          ...(material === 'water' ? { roughness: 0.3, metalness: 0.12 } : {}),
        }))
      }
      const geometry = mergeGeometries(geometries)
      geometries.forEach(g => g.dispose())
      if (!geometry) continue
      const mesh = new THREE.Mesh(geometry, materials.get(material))
      mesh.name = `${layer}-${material}`
      mesh.castShadow = material !== 'water'
      mesh.receiveShadow = true
      layers.get(layer)!.add(mesh)
    }
    this.buckets.clear()
    return root
  }
}

export function disposeWorld(root: THREE.Group) {
  const materials = new Set<THREE.Material>()
  root.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()
      if (Array.isArray(object.material)) object.material.forEach(m => materials.add(m))
      else materials.add(object.material)
    }
  })
  materials.forEach(material => material.dispose())
}

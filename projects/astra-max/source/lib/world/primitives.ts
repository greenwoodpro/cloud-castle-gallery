import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { WORLD_COLORS, type Vector3Tuple } from '../world-data'

export const mix = (a: string, b: string, amount: number) => new THREE.Color(a).lerp(new THREE.Color(b), amount)

export function createMaterials() {
  const { paper, ink, sage, rose, gold } = WORLD_COLORS
  const mat = (color: THREE.ColorRepresentation, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.93, ...extra })
  return {
    stone: mat(mix(paper, gold, 0.19)),
    trim: mat(mix(paper, gold, 0.37)),
    mortar: mat(mix(paper, ink, 0.22)),
    roof: mat(rose),
    roofLight: mat(mix(rose, paper, 0.23)),
    roofDark: mat(mix(rose, ink, 0.2)),
    grass: mat(mix(sage, paper, 0.2)),
    grassLight: mat(mix(sage, gold, 0.22)),
    leaf: mat(sage),
    leafLight: mat(mix(sage, paper, 0.23)),
    leafDark: mat(mix(sage, ink, 0.24)),
    rock: mat(mix(paper, ink, 0.42), { flatShading: true }),
    rockLight: mat(mix(paper, gold, 0.46), { flatShading: true }),
    rockDark: mat(mix(paper, ink, 0.56), { flatShading: true }),
    wood: mat(mix(gold, ink, 0.43)),
    woodLight: mat(mix(gold, paper, 0.12)),
    dark: mat(ink),
    gold: mat(gold),
    rose: mat(mix(rose, paper, 0.12)),
    paper: mat(paper),
    skin: mat(mix(paper, rose, 0.27)),
    water: mat(mix(sage, paper, 0.46), { roughness: 0.28, metalness: 0.12, transparent: true, opacity: 0.88 }),
    foam: mat(paper, { transparent: true, opacity: 0.72 }),
    window: mat(mix(gold, paper, 0.35), { emissive: gold, emissiveIntensity: 0.16 }),
    cloud: mat(paper, { transparent: true, opacity: 0.66, depthWrite: false, flatShading: false }),
  }
}

export type Materials = ReturnType<typeof createMaterials>
export type MaterialKey = keyof Materials

export class WorldBuilder {
  readonly materials = createMaterials()

  mesh(parent: THREE.Group, geometry: THREE.BufferGeometry, material: MaterialKey, position: Vector3Tuple = [0, 0, 0], rotation: Vector3Tuple = [0, 0, 0], scale: Vector3Tuple = [1, 1, 1]) {
    const mesh = new THREE.Mesh(geometry, this.materials[material])
    mesh.position.set(...position)
    mesh.rotation.set(...rotation)
    mesh.scale.set(...scale)
    mesh.castShadow = material !== 'water' && material !== 'cloud' && material !== 'foam'
    mesh.receiveShadow = true
    parent.add(mesh)
    return mesh
  }

  box(parent: THREE.Group, position: Vector3Tuple, size: Vector3Tuple, material: MaterialKey = 'stone', rotation: Vector3Tuple = [0, 0, 0]) {
    return this.mesh(parent, new THREE.BoxGeometry(...size), material, position, rotation)
  }

  cylinder(parent: THREE.Group, position: Vector3Tuple, top: number, bottom: number, height: number, material: MaterialKey = 'stone', segments = 16) {
    return this.mesh(parent, new THREE.CylinderGeometry(top, bottom, height, segments), material, position)
  }

  sphere(parent: THREE.Group, position: Vector3Tuple, scale: Vector3Tuple, material: MaterialKey = 'leaf', detail = 1) {
    return this.mesh(parent, new THREE.IcosahedronGeometry(1, detail), material, position, [0, 0, 0], scale)
  }

  beam(parent: THREE.Group, start: Vector3Tuple, end: Vector3Tuple, width: number, material: MaterialKey = 'wood') {
    const a = new THREE.Vector3(...start)
    const b = new THREE.Vector3(...end)
    const middle = a.clone().add(b).multiplyScalar(0.5)
    const mesh = this.box(parent, middle.toArray() as Vector3Tuple, [width, a.distanceTo(b), width], material)
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize())
    return mesh
  }

  arch(parent: THREE.Group, position: Vector3Tuple, width: number, height: number, material: MaterialKey, rotation = 0, depth = 0.035) {
    const shape = new THREE.Shape()
    const radius = width / 2
    shape.moveTo(-radius, 0)
    shape.lineTo(radius, 0)
    shape.lineTo(radius, height - radius)
    shape.absarc(0, height - radius, radius, 0, Math.PI, false)
    shape.lineTo(-radius, 0)
    return this.mesh(parent, new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 10 }), material, position, [0, rotation, 0])
  }

  roof(parent: THREE.Group, position: Vector3Tuple, width: number, depth: number, height: number, material: MaterialKey = 'roof') {
    const shape = new THREE.Shape()
    shape.moveTo(-width / 2, 0)
    shape.lineTo(width / 2, 0)
    shape.lineTo(0, height)
    shape.closePath()
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false })
    geometry.translate(0, 0, -depth / 2)
    return this.mesh(parent, geometry, material, position)
  }

  group(parent: THREE.Group, name: string, position: Vector3Tuple = [0, 0, 0]) {
    const group = new THREE.Group()
    group.name = name
    group.position.set(...position)
    parent.add(group)
    return group
  }
}

export function seeded(index: number, seed = 1) {
  const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453123
  return value - Math.floor(value)
}

// Batch static geometry by material, while retaining independently animated and cutaway groups.
export function mergeStatic(group: THREE.Group) {
  group.updateMatrixWorld(true)
  const inverse = group.matrixWorld.clone().invert()
  const buckets = new Map<THREE.Material, THREE.BufferGeometry[]>()
  const originals = new Set<THREE.BufferGeometry>()
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || Array.isArray(object.material)) return
    originals.add(object.geometry)
    let geometry = object.geometry.clone()
    if (geometry.index) {
      const indexed = geometry
      geometry = indexed.toNonIndexed()
      indexed.dispose()
    }
    for (const key of Object.keys(geometry.attributes)) {
      if (key !== 'position' && key !== 'normal') geometry.deleteAttribute(key)
    }
    geometry.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, object.matrixWorld))
    const list = buckets.get(object.material) ?? []
    list.push(geometry)
    buckets.set(object.material, list)
  })
  group.clear()
  for (const [material, geometries] of buckets) {
    const combined = mergeGeometries(geometries, false)
    if (combined) {
      const mesh = new THREE.Mesh(combined, material)
      mesh.castShadow = !(material as THREE.MeshStandardMaterial).transparent
      mesh.receiveShadow = true
      group.add(mesh)
    }
    geometries.forEach((geometry) => geometry.dispose())
  }
  originals.forEach((geometry) => geometry.dispose())
}

import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { PALETTE } from './config'

export const blend = (a: string, b: string, weight: number) => new THREE.Color(a).lerp(new THREE.Color(b), weight)
const material = (color: THREE.ColorRepresentation, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.94, flatShading: true, ...extra })

export const MAT = {
  stone: material(PALETTE.paper),
  stoneShade: material(blend(PALETTE.paper, PALETTE.clay, 0.19)),
  stoneEdge: material(blend(PALETTE.paper, PALETTE.ink, 0.2)),
  rock: material(blend(PALETTE.clay, PALETTE.ink, 0.26)),
  rockLight: material(blend(PALETTE.paper, PALETTE.clay, 0.58)),
  rockDark: material(blend(PALETTE.clay, PALETTE.ink, 0.48)),
  grass: material(PALETTE.sage),
  grassLight: material(blend(PALETTE.sage, PALETTE.paper, 0.27)),
  grassDark: material(blend(PALETTE.sage, PALETTE.ink, 0.22)),
  leaf: material(blend(PALETTE.sage, PALETTE.gold, 0.18)),
  pine: material(blend(PALETTE.sage, PALETTE.ink, 0.16)),
  wood: material(blend(PALETTE.clay, PALETTE.ink, 0.3)),
  woodLight: material(blend(PALETTE.clay, PALETTE.gold, 0.28)),
  roof: material(PALETTE.clay),
  roofLight: material(blend(PALETTE.clay, PALETTE.paper, 0.24)),
  gold: material(PALETTE.gold),
  dark: material(PALETTE.ink),
  water: material(blend(PALETTE.sage, PALETTE.paper, 0.24), { roughness: 0.24, metalness: 0.15 }),
  foam: material(PALETTE.paper, { transparent: true, opacity: 0.7, depthWrite: false }),
  cloud: material(PALETTE.paper, { transparent: true, opacity: 0.78, depthWrite: false }),
  glass: material(PALETTE.paper, { transparent: true, opacity: 0.2, roughness: 0.15, depthWrite: false }),
  glow: material(PALETTE.gold, { emissive: PALETTE.gold, emissiveIntensity: 0.25 }),
}

export type Materials = typeof MAT
export type Point = [number, number, number]

export function mesh(parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, position: Point = [0, 0, 0], rotation?: Point) {
  const result = new THREE.Mesh(geo, mat)
  result.position.set(...position)
  if (rotation) result.rotation.set(...rotation)
  result.castShadow = !mat.transparent
  result.receiveShadow = true
  parent.add(result)
  return result
}

export function box(parent: THREE.Object3D, size: Point, position: Point, mat = MAT.stone, rotation?: Point) {
  return mesh(parent, new THREE.BoxGeometry(...size), mat, position, rotation)
}

export function ball(parent: THREE.Object3D, radius: number, position: Point, mat = MAT.leaf, scale?: Point, detail = 1) {
  const result = mesh(parent, new THREE.IcosahedronGeometry(radius, detail), mat, position)
  if (scale) result.scale.set(...scale)
  return result
}

export function cylinder(parent: THREE.Object3D, top: number, bottom: number, height: number, position: Point, mat = MAT.stone, segments = 16) {
  return mesh(parent, new THREE.CylinderGeometry(top, bottom, height, segments), mat, position)
}

export function beam(parent: THREE.Object3D, a: Point, b: Point, width = 0.07, mat = MAT.wood) {
  const start = new THREE.Vector3(...a)
  const end = new THREE.Vector3(...b)
  const result = mesh(parent, new THREE.CylinderGeometry(width, width, start.distanceTo(end), 6), mat)
  result.position.copy(start.add(end).multiplyScalar(0.5))
  result.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...b).sub(new THREE.Vector3(...a)).normalize())
  return result
}

export function archGeometry(width: number, height: number, depth: number) {
  const r = width / 2
  const shape = new THREE.Shape()
  shape.moveTo(-r, 0)
  shape.lineTo(r, 0)
  shape.lineTo(r, height - r)
  shape.absarc(0, height - r, r, 0, Math.PI, false)
  shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 10 })
  geometry.translate(0, 0, -depth / 2)
  return geometry
}

export function windowArch(parent: THREE.Object3D, position: Point, width = 0.32, height = 0.7, facing = 0, lit = false) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.rotation.y = facing
  parent.add(group)
  mesh(group, archGeometry(width + 0.16, height + 0.12, 0.12), MAT.stoneShade)
  const pane = mesh(group, archGeometry(width, height, 0.13), lit ? MAT.glow : MAT.dark, [0, 0.04, 0.03])
  pane.userData.window = true
  box(group, [0.035, height - 0.06, 0.04], [0, height / 2 + 0.02, 0.12], MAT.gold)
  box(group, [width, 0.035, 0.04], [0, height * 0.46, 0.12], MAT.gold)
  box(group, [width + 0.25, 0.09, 0.25], [0, -0.015, 0.05], MAT.stoneEdge)
  return group
}

export function gableRoof(parent: THREE.Object3D, width: number, depth: number, height: number, position: Point, mat = MAT.roof) {
  const shape = new THREE.Shape()
  shape.moveTo(-width / 2, 0)
  shape.lineTo(width / 2, 0)
  shape.lineTo(0, height)
  shape.closePath()
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false })
  geo.translate(0, 0, -depth / 2)
  const roof = mesh(parent, geo, mat, position)
  for (let i = 1; i < 7; i++) {
    const t = i / 7
    for (const side of [-1, 1]) {
      const x = (width / 2) * (1 - t) * side
      beam(parent, [position[0] + x, position[1] + height * t + 0.012, position[2] - depth / 2], [position[0] + x, position[1] + height * t + 0.012, position[2] + depth / 2], 0.012, MAT.roofLight)
    }
  }
  beam(parent, [position[0], position[1] + height + 0.015, position[2] - depth / 2 - 0.04], [position[0], position[1] + height + 0.015, position[2] + depth / 2 + 0.04], 0.055, MAT.roofLight)
  return roof
}

export function flag(parent: THREE.Object3D, position: Point, small = false) {
  const scale = small ? 0.65 : 1
  beam(parent, position, [position[0], position[1] + 1.15 * scale, position[2]], 0.025, MAT.wood)
  ball(parent, 0.07 * scale, [position[0], position[1] + 1.17 * scale, position[2]], MAT.gold)
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.72 * scale, -0.12 * scale)
  shape.lineTo(0.57 * scale, -0.32 * scale)
  shape.lineTo(0, -0.36 * scale)
  shape.closePath()
  const mat = MAT.gold.clone()
  mat.side = THREE.DoubleSide
  const pennant = mesh(parent, new THREE.ShapeGeometry(shape), mat, [position[0], position[1] + 1.05 * scale, position[2]])
  pennant.name = 'wind-flag'
  pennant.userData.animated = 'flag'
}

export function person(parent: THREE.Object3D, position: Point, style: 'prince' | 'villager' | 'guard' | 'gardener' | 'baker' = 'villager', facing = 0) {
  const p = new THREE.Group()
  p.position.set(...position)
  p.rotation.y = facing
  parent.add(p)
  const coat = style === 'prince' ? MAT.grassDark : style === 'guard' ? MAT.stoneEdge : style === 'baker' ? MAT.stone : MAT.roof
  cylinder(p, 0.1, 0.14, 0.28, [0, 0.31, 0], coat, 7)
  ball(p, 0.115, [0, 0.55, 0], MAT.stoneShade, undefined, 1)
  ball(p, 0.118, [0, 0.6, -0.012], style === 'prince' ? MAT.gold : MAT.wood, [1, 0.5, 1])
  for (const side of [-1, 1]) {
    beam(p, [side * 0.055, 0.2, 0], [side * 0.075, 0.04, 0.015], 0.038, MAT.dark)
    ball(p, 0.047, [side * 0.075, 0.035, 0.04], MAT.wood, [1, 0.65, 1.4])
    beam(p, [side * 0.1, 0.41, 0], [side * 0.16, 0.27, 0.035], 0.037, coat)
    ball(p, 0.038, [side * 0.16, 0.26, 0.035], MAT.stoneShade)
    ball(p, 0.012, [side * 0.044, 0.555, 0.102], MAT.dark, undefined, 0)
  }
  if (style === 'prince') {
    cylinder(p, 0.105, 0.105, 0.045, [0, 0.445, 0], MAT.gold, 8)
    box(p, [0.08, 0.22, 0.025], [0.14, 0.38, -0.045], MAT.gold, [0, 0, -0.7])
  }
  if (style === 'gardener') {
    cylinder(p, 0.17, 0.17, 0.025, [0, 0.65, 0], MAT.gold, 10)
    cylinder(p, 0.095, 0.12, 0.09, [0, 0.69, 0], MAT.gold, 10)
    cylinder(p, 0.065, 0.07, 0.11, [0.2, 0.17, 0.09], MAT.stoneEdge, 8)
    beam(p, [0.23, 0.2, 0.09], [0.33, 0.24, 0.09], 0.02, MAT.stoneEdge)
  }
  if (style === 'guard') {
    cylinder(p, 0.095, 0.12, 0.12, [0, 0.64, 0], MAT.stoneEdge, 10)
    beam(p, [0.22, 0.03, 0], [0.22, 0.95, 0], 0.018, MAT.wood)
    mesh(p, new THREE.ConeGeometry(0.05, 0.15, 4), MAT.stoneEdge, [0.22, 1.0, 0])
  }
  if (style === 'baker') ball(p, 0.12, [0, 0.69, 0], MAT.stone, [1, 0.8, 1])
  return p
}

export function optimize(group: THREE.Group) {
  group.updateMatrixWorld(true)
  const buckets = new Map<THREE.Material, THREE.BufferGeometry[]>()
  const removable: THREE.Mesh[] = []
  const inverse = group.matrixWorld.clone().invert()
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || !object.visible || object.userData.animated || Array.isArray(object.material)) return
    let parent = object.parent
    while (parent && parent !== group) {
      if (parent.userData.animated) return
      parent = parent.parent
    }
    const geo = object.geometry.clone()
    geo.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, object.matrixWorld))
    geo.deleteAttribute('uv')
    const list = buckets.get(object.material) ?? []
    list.push(geo.index ? geo.toNonIndexed() : geo)
    buckets.set(object.material, list)
    removable.push(object)
  })
  for (const object of removable) {
    object.removeFromParent()
    object.geometry.dispose()
  }
  for (const [mat, geometries] of buckets) {
    const merged = mergeGeometries(geometries, false)
    if (merged) {
      const result = mesh(group, merged, mat)
      result.name = `${group.name}-details`
    }
    for (const geo of geometries) geo.dispose()
  }
}

export function seededRandom(seed = 42) {
  let state = seed
  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

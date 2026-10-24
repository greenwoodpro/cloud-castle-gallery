import * as THREE from 'three'
import { WorldBuilder, seeded, mergeStatic } from './primitives'
import { createCastle } from './castle'
import { createLandscape } from './landscape'
import { createVillage } from './village'

export function createWorld() {
  const builder = new WorldBuilder()
  const root = new THREE.Group()
  root.name = '云屿 · 风栖城堡'
  const landscape = createLandscape(builder, root)
  const castle = createCastle(builder, root)
  const village = createVillage(builder, root)
  const clouds = new THREE.Group()
  clouds.name = '缓缓流动的云海'
  const cloudPositions = [[-7, -1.3, 2], [7.4, -1, -2], [-3.7, -3.8, 3.5], [5.3, -4.3, 1], [-3, -1.3, -6.7], [8, -2.3, 4.7]]
  cloudPositions.forEach((position, i) => {
    const cloud = builder.group(clouds, '云朵', position as [number, number, number])
    for (let puff = 0; puff < 6; puff++) {
      builder.sphere(cloud, [(puff - 2.5) * 0.55, Math.sin(puff * 1.7) * 0.14, seeded(puff, i + 80) * 0.5], [0.65 + seeded(puff, i) * 0.3, 0.3 + seeded(puff, i + 12) * 0.25, 0.56], 'cloud', 2)
    }
    mergeStatic(cloud)
  })

  const birds = new THREE.Group()
  birds.name = '绕塔飞行的白鸟'
  for (let i = 0; i < 5; i++) {
    const bird = builder.group(birds, '飞鸟')
    builder.sphere(bird, [0, 0, 0], [0.045, 0.038, 0.13], 'paper', 1)
    for (const side of [-1, 1]) builder.box(bird, [side * 0.13, 0.025, 0], [0.24, 0.018, 0.1], 'paper', [0, 0, side * 0.18])
    mergeStatic(bird)
  }

  return {
    root,
    clouds,
    birds,
    ...landscape,
    ...castle,
    ...village,
    materials: builder.materials,
    dispose() {
      const geometries = new Set<THREE.BufferGeometry>()
      const materials = new Set<THREE.Material>(Object.values(builder.materials))
      for (const group of [root, clouds, birds]) group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry)
          if (Array.isArray(object.material)) object.material.forEach((material) => materials.add(material))
          else materials.add(object.material)
        }
      })
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
    },
  }
}

export type WorldModel = ReturnType<typeof createWorld>

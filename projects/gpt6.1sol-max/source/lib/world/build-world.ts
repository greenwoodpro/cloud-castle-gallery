import * as THREE from 'three'
import { makeCastle } from './castle'
import { island, makeClouds, makeForest, makeGarden, makeWater, tree } from './nature'
import { MAT, ball, optimize } from './primitives'
import { makeVillage } from './village'

export function createWorld() {
  const world = new THREE.Group()
  world.name = '云间之境 · 浮空城堡'
  const terrain = new THREE.Group(); terrain.name = 'island-terrain'
  island(terrain)
  optimize(terrain)
  world.add(terrain)
  const builders = [
    ['rose-garden', makeGarden],
    ['whispering-forest', makeForest],
    ['windmill-village', makeVillage],
    ['starlight-waterfall', makeWater],
  ] as const
  for (const [name, build] of builders) {
    const zone = new THREE.Group()
    zone.name = name
    build(zone)
    optimize(zone)
    world.add(zone)
  }
  const castle = makeCastle()
  world.add(castle.main, castle.cutaway, castle.interior, castle.towers)
  const clouds = new THREE.Group(); clouds.name = 'wandering-clouds'
  makeClouds(clouds)
  world.add(clouds)
  const satellites = new THREE.Group(); satellites.name = 'little-satellite-islands'
  for (const [x, y, z, s] of [[-10.5, -0.2, -2.8, 0.13], [10.4, -1.8, 3.0, 0.1], [-8.3, -2.2, 6.7, 0.075]]) {
    const little = new THREE.Group()
    little.position.set(x, y, z)
    little.scale.setScalar(s)
    island(little)
    tree(little, [0, 0.2, 0], 2.2)
    satellites.add(little)
  }
  for (let i = 0; i < 6; i++) ball(satellites, 0.18 + (i % 3) * 0.08, [-9.3 + i * 0.24, -2.9 - i * 0.28, 4 + i * 0.35], MAT.rockLight, [1, 1.2, 0.8], 0)
  optimize(satellites)
  world.add(satellites)
  world.updateMatrixWorld(true)
  return world
}

export function setInterior(world: THREE.Group, enabled: boolean) {
  const cutaway = world.getObjectByName('castle-cutaway')
  const interior = world.getObjectByName('castle-interior')
  const towers = world.getObjectByName('castle-towers')
  if (cutaway) cutaway.visible = !enabled
  if (interior) interior.visible = enabled
  if (towers) towers.visible = !enabled
}

export function getAnimatedObjects(world: THREE.Group) {
  const animated: THREE.Object3D[] = []
  world.traverse((object) => { if (object.userData.animated) animated.push(object) })
  return animated
}

export function animateWorld(objects: THREE.Object3D[], elapsed: number, delta: number) {
  for (const object of objects) {
    if (object.userData.animated === 'windmill') object.rotation.z -= delta * 0.24
    if (object.userData.animated === 'flag') object.rotation.y = Math.sin(elapsed * 1.7 + object.position.y) * 0.13
    if (object.userData.animated === 'cloud') object.position.x = object.userData.originX + Math.sin(elapsed * 0.075 + object.userData.phase) * 0.35
  }
}

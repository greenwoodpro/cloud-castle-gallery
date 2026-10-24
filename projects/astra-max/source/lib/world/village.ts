import * as THREE from 'three'
import { WorldBuilder, mergeStatic, type MaterialKey } from './primitives'
import type { Vector3Tuple } from '../world-data'

function cottage(b: WorldBuilder, root: THREE.Group, position: Vector3Tuple, scale: number, rotation: number) {
  const group = b.group(root, '木骨架红瓦村舍', position)
  group.scale.setScalar(scale)
  group.rotation.y = rotation
  b.box(group, [0, 0.12, 0], [1.23, 0.24, 1.3], 'rockLight')
  b.box(group, [0, 0.65, 0], [1.1, 1.05, 1.17], 'stone')
  b.roof(group, [0, 1.19, 0], 1.45, 1.48, 0.7, 'roof')
  b.roof(group, [0, 1.17, 0.61], 1.1, 0.05, 0.59, 'stone')
  for (const x of [-0.52, 0, 0.52]) b.box(group, [x, 0.69, 0.604], [0.055, 1.03, 0.05], 'wood')
  for (const y of [0.23, 0.77, 1.17]) b.box(group, [0, y, 0.61], [1.12, 0.055, 0.05], 'wood')
  b.beam(group, [-0.53, 1.19, 0.65], [0, 1.76, 0.65], 0.055)
  b.beam(group, [0.53, 1.19, 0.65], [0, 1.76, 0.65], 0.055)
  b.beam(group, [-0.5, 0.78, 0.63], [-0.04, 1.16, 0.63], 0.035)
  b.beam(group, [0.04, 1.16, 0.63], [0.5, 0.78, 0.63], 0.035)
  b.arch(group, [-0.23, 0.22, 0.63], 0.33, 0.56, 'wood')
  b.sphere(group, [-0.13, 0.45, 0.68], [0.025, 0.025, 0.025], 'gold')
  b.box(group, [0.3, 0.57, 0.64], [0.28, 0.29, 0.05], 'dark')
  b.box(group, [0.3, 0.57, 0.68], [0.21, 0.22, 0.02], 'window')
  b.box(group, [0.3, 0.57, 0.71], [0.025, 0.25, 0.025], 'wood')
  b.box(group, [0.3, 0.57, 0.71], [0.25, 0.025, 0.025], 'wood')
  b.box(group, [0.3, 0.37, 0.75], [0.34, 0.1, 0.15], 'woodLight')
  for (let i = 0; i < 4; i++) b.sphere(group, [0.18 + i * 0.075, 0.45, 0.75], [0.05, 0.06, 0.05], i % 2 ? 'rose' : 'leaf')
  b.box(group, [0.3, 1.65, -0.24], [0.22, 0.75, 0.23], 'trim')
  b.box(group, [0.3, 2.04, -0.24], [0.31, 0.08, 0.32], 'stone')
  b.box(group, [-0.23, 0.16, 0.81], [0.47, 0.1, 0.29], 'stone')
  for (let i = 0; i < 3; i++) {
    const log = b.cylinder(group, [0.76, 0.18 + (i === 2 ? 0.12 : 0), 0.12 + (i % 2) * 0.19], 0.09, 0.09, 0.45, 'woodLight', 8)
    log.rotation.z = Math.PI / 2
  }
}

export function person(b: WorldBuilder, parent: THREE.Group, position: Vector3Tuple, coat: MaterialKey, angle = 0, child = false) {
  const group = b.group(parent, child ? '星星旅人 · 金色围巾' : '岛上的居民', position)
  group.rotation.y = angle
  group.scale.setScalar(child ? 0.85 : 1)
  for (const x of [-0.053, 0.053]) {
    b.box(group, [x, 0.1, 0], [0.065, 0.19, 0.075], 'dark')
    b.box(group, [x, 0.025, 0.025], [0.075, 0.055, 0.12], 'wood')
  }
  b.cylinder(group, [0, 0.29, 0], 0.073, 0.13, 0.24, coat, 10)
  b.sphere(group, [0, 0.49, 0], [0.105, 0.12, 0.1], 'skin', 2)
  b.sphere(group, [0, 0.565, -0.015], [0.109, 0.075, 0.103], child ? 'gold' : 'wood', 1)
  for (const x of [-0.036, 0.036]) b.sphere(group, [x, 0.49, 0.096], [0.01, 0.013, 0.008], 'dark', 1)
  b.beam(group, [-0.085, 0.37, 0], [-0.145, 0.22, 0.025], 0.055, coat)
  b.beam(group, [0.085, 0.37, 0], [0.145, 0.22, 0.025], 0.055, coat)
  for (const x of [-0.145, 0.145]) b.sphere(group, [x, 0.21, 0.03], [0.035, 0.037, 0.035], 'skin', 1)
  if (child) {
    b.cylinder(group, [0, 0.405, 0], 0.09, 0.09, 0.06, 'gold', 12)
    b.box(group, [0.2, 0.395, -0.04], [0.4, 0.08, 0.025], 'gold', [0, 0.2, -0.16])
  } else {
    b.cylinder(group, [0, 0.575, 0], 0.07, 0.125, 0.09, coat, 12)
  }
  return group
}

function fox(b: WorldBuilder, parent: THREE.Group, x: number, z: number) {
  const group = b.group(parent, '溪边的小狐狸', [x, 0.09, z])
  group.rotation.y = -0.6
  b.sphere(group, [0, 0.15, 0], [0.15, 0.13, 0.29], 'rose', 1)
  b.sphere(group, [0, 0.31, 0.2], [0.13, 0.13, 0.15], 'rose', 1)
  b.sphere(group, [0, 0.27, 0.32], [0.07, 0.065, 0.1], 'paper', 1)
  b.sphere(group, [0, 0.29, 0.407], [0.023, 0.023, 0.02], 'dark', 1)
  for (const side of [-1, 1]) {
    b.cylinder(group, [side * 0.08, 0.45, 0.19], 0, 0.06, 0.17, 'rose', 4)
    b.sphere(group, [side * 0.058, 0.34, 0.33], [0.013, 0.013, 0.013], 'dark', 1)
    for (const pz of [-0.12, 0.15]) b.box(group, [side * 0.085, 0.055, pz], [0.055, 0.11, 0.07], 'wood')
  }
  b.sphere(group, [0.17, 0.19, -0.3], [0.12, 0.11, 0.3], 'rose', 1).rotation.y = -0.65
  b.sphere(group, [0.28, 0.19, -0.48], [0.085, 0.08, 0.12], 'paper', 1)
}

function sheep(b: WorldBuilder, parent: THREE.Group, x: number, z: number) {
  const group = b.group(parent, '草坡上的绵羊', [x, 0.08, z])
  b.sphere(group, [0, 0.22, 0], [0.22, 0.18, 0.29], 'paper', 2)
  b.sphere(group, [0, 0.3, 0.28], [0.1, 0.12, 0.1], 'wood', 1)
  for (const px of [-0.12, 0.12]) for (const pz of [-0.13, 0.13]) b.box(group, [px, 0.07, pz], [0.045, 0.16, 0.045], 'wood')
}

export function createVillage(b: WorldBuilder, root: THREE.Group) {
  const village = b.group(root, '村庄 · 村舍与农田')
  const residents = b.group(root, '居民 · 旅人、面包师、园丁与守塔人')
  cottage(b, village, [-4.25, 0.03, 1.05], 0.9, 0.38)
  cottage(b, village, [-3.05, 0.04, 2.65], 0.74, -0.2)
  cottage(b, village, [-4.52, 0.02, 2.75], 0.64, 0.3)

  const mill = b.group(village, '磨坊', [-3.65, 0.08, -0.7])
  b.cylinder(mill, [0, 0.85, 0], 0.36, 0.52, 1.7, 'stone', 14)
  b.cylinder(mill, [0, 1.98, 0], 0, 0.62, 0.77, 'roof', 14)
  b.arch(mill, [0, 0.02, 0.49], 0.29, 0.49, 'wood')
  b.arch(mill, [0, 0.89, 0.43], 0.19, 0.3, 'window')
  const windmill = b.group(root, '风车 · 旋转叶片', [-3.65, 1.75, -0.15])
  b.sphere(windmill, [0, 0, 0.06], [0.11, 0.11, 0.1], 'wood', 2)
  for (let i = 0; i < 4; i++) {
    const blade = b.group(windmill, '帆布风车叶片')
    blade.rotation.z = i * Math.PI / 2 + 0.2
    b.box(blade, [0, 0.59, 0], [0.045, 1.22, 0.045], 'wood')
    b.box(blade, [0.115, 0.74, 0.01], [0.25, 0.72, 0.025], 'paper')
    for (let j = 0; j < 5; j++) b.box(blade, [0.115, 0.42 + j * 0.15, 0.035], [0.28, 0.02, 0.03], 'woodLight')
  }
  mergeStatic(windmill)

  for (let row = 0; row < 3; row++) {
    b.box(village, [-5.05 + row * 0.28, 0.06, -0.65], [0.2, 0.05, 0.95], 'wood')
    for (let i = 0; i < 7; i++) b.sphere(village, [-5.05 + row * 0.28, 0.15, -1.04 + i * 0.13], [0.085, 0.09, 0.08], row === 1 ? 'grassLight' : 'leaf', 0)
  }
  for (let i = 0; i < 8; i++) {
    const x = -5.43 + i * 0.2
    b.box(village, [x, 0.26, -1.3], [0.045, 0.42, 0.045], 'woodLight')
  }
  b.box(village, [-4.73, 0.32, -1.3], [1.5, 0.04, 0.05], 'woodLight')
  for (const x of [-3.4, -3.1]) {
    b.cylinder(village, [x, 0.25, 1.75], 0.13, 0.13, 0.36, 'wood', 12)
    for (const y of [0.14, 0.34]) b.cylinder(village, [x, y, 1.75], 0.137, 0.137, 0.025, 'dark', 12)
  }

  person(b, residents, [2.85, 0.12, 2.7], 'leaf', 0.8, true)
  person(b, residents, [-3.95, 0.12, 1.98], 'paper', -0.3)
  person(b, residents, [1.95, 0.12, 3.79], 'rose', 1.2)
  person(b, residents, [-0.83, 0.12, 2.04], 'leafDark', 0.1)
  fox(b, residents, 3.28, 3.16)
  sheep(b, residents, -1.6, 3.75)
  sheep(b, residents, -2.4, 3.55)
  for (const group of [village, residents]) mergeStatic(group)
  return { windmill }
}

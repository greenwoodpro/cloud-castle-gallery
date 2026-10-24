import * as THREE from 'three'
import { Builder, mat4, noOutline, PALETTE, toon, unitGeo } from './core'
import type { CastleMaterials } from './castle'
import { CHAPEL, G, HALL, KEEP, KITCHEN, STAR_TOWER } from './layout'

export interface Anchor {
  position: THREE.Vector3
  rotation: number
}

function fireCluster(group: THREE.Group, flames: THREE.Mesh[], x: number, y: number, z: number, scale = 1) {
  const colors = ['#ffd27a', '#ffad5a', '#ff8a4c']
  colors.forEach((c, i) => {
    const flame = new THREE.Mesh(unitGeo.cone(7), noOutline(new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.92 })))
    const s = (0.24 - i * 0.05) * scale
    flame.scale.set(s, s * 2.6, s)
    flame.position.set(x + (i - 1) * 0.08 * scale, y, z + ((i % 2) - 0.5) * 0.08 * scale)
    flame.userData.base = flame.scale.y
    flame.userData.phase = Math.random() * 10
    flames.push(flame)
    group.add(flame)
  })
}

function warmLight(group: THREE.Group, lights: THREE.PointLight[], x: number, y: number, z: number, base: number, color = '#ffb36b') {
  const light = new THREE.PointLight(color, base, 7, 2)
  light.position.set(x, y, z)
  light.userData.base = base
  lights.push(light)
  group.add(light)
}

function candle(b: Builder, M: CastleMaterials, x: number, y: number, z: number, h = 0.22) {
  b.cyl(M.cream, 0.035, 0.035, h, x, y, z, 6)
  b.cone(M.flame, 0.03, 0.08, x, y + h + 0.01, z, 5)
}

function spiralStair(b: Builder, M: CastleMaterials) {
  const cx = -2.8
  const cz = -7.3
  b.cyl(M.shade, 0.13, 0.13, 8.4, cx, G, cz, 8)
  const steps = 42
  for (let i = 0; i < steps; i++) {
    const a = i * ((Math.PI * 2) / 13)
    const y = G + (i * 8.3) / steps
    b.box(M.shade, 0.72, 0.1, 0.34, cx + Math.cos(a) * 0.45, y, cz + Math.sin(a) * 0.45, -a)
  }
}

function keepFloors(b: Builder, M: CastleMaterials) {
  const [L0, L1, L2] = KEEP.levels
  b.box(M.plank, 7.2, 0.06, 4.7, 0, L0, -5.75)
  for (const L of [L1, L2]) {
    b.box(M.plank, 5.6, 0.18, 4.7, 0.8, L - 0.18, -5.75)
    b.box(M.plank, 1.6, 0.18, 3.1, -2.8, L - 0.18, -4.95)
    for (let i = 0; i < 6; i++) b.box(M.woodDark, 0.12, 0.16, 4.7, -1.6 + i * 1.05, L - 0.36, -5.75)
  }
  spiralStair(b, M)

  const rack = M.woodDark
  b.box(rack, 0.2, 1.7, 2.2, 3.45, L0, -5.6)
  b.box(rack, 0.3, 0.08, 2.2, 3.35, L0 + 1.2, -5.6)
  for (let i = 0; i < 6; i++) {
    const z = -6.5 + i * 0.36
    b.cyl(M.wood, 0.025, 0.025, 1.9, 3.25, L0, z, 5)
    b.cone(M.iron, 0.06, 0.22, 3.25, L0 + 1.9, z, 5)
  }
  const shieldColors = [M.royal, M.crimson, M.gold]
  for (let i = 0; i < 3; i++) {
    b.batcher.add(new THREE.CylinderGeometry(0.34, 0.34, 0.06, 14).rotateX(Math.PI / 2), shieldColors[i], b.base.clone().multiply(mat4(-0.6 + i * 1.1, L0 + 1.55, -8.05)))
    b.box(M.white, 0.08, 0.5, 0.07, -0.6 + i * 1.1, L0 + 1.3, -8.0)
  }
  const barrel = toon('#a77650')
  for (let i = 0; i < 3; i++) {
    b.cyl(barrel, 0.27, 0.3, 0.7, 1.4 + i * 0.62, L0, -7.75, 10)
    b.cyl(M.iron, 0.305, 0.305, 0.04, 1.4 + i * 0.62, L0 + 0.18, -7.75, 10)
  }
  b.box(M.wood, 0.9, 0.5, 0.55, -1.2, L0, -3.9)
  b.box(M.gold, 0.95, 0.06, 0.6, -1.2, L0 + 0.5, -3.9)
  b.box(M.wood, 0.9, 0.2, 0.55, -1.2, L0 + 0.56, -3.9)
  for (let i = 0; i < 4; i++) b.sphere(M.cream, 0.28, -0.2 + i * 0.3, L0 + 0.22, -4.0 + (i % 2) * 0.35, 1, 0.75, 1)
  b.cyl(M.iron, 0.18, 0.22, 0.8, 2.3, L0, -4.4, 10)
  b.sphere(M.iron, 0.2, 2.3, L0 + 1.0, -4.4)
  b.box(M.wood, 0.06, 0.25, 0.06, 2.3, L0 + 0.8, -4.4)

  const shelfColors = ['#c0574f', '#5d7aa6', '#7fa06a', '#e2b45a', '#8a6a9a', '#d98b5f']
  for (let s = 0; s < 3; s++) {
    const sx = -1.4 + s * 1.65
    b.box(M.woodDark, 1.55, 2.5, 0.42, sx, L1, -7.88)
    for (let row = 0; row < 4; row++) {
      let bx = sx - 0.68
      let k = 0
      while (bx < sx + 0.66) {
        const bw = 0.08 + ((row * 7 + k * 3 + s) % 4) * 0.025
        const bh = 0.38 + ((k + row) % 3) * 0.05
        b.box(toon(shelfColors[(k + row * 2 + s) % shelfColors.length]), bw, bh, 0.3, bx + bw / 2, L1 + 0.12 + row * 0.6, -7.68)
        bx += bw + 0.012
        k++
      }
    }
  }
  b.box(M.woodDark, 0.4, 2.2, 1.6, 3.35, L1, -5.2)
  for (let row = 0; row < 3; row++) {
    for (let k = 0; k < 8; k++) b.box(toon(shelfColors[(k + row) % 6]), 0.28, 0.36, 0.13, 3.18, L1 + 0.15 + row * 0.66, -5.85 + k * 0.18)
  }
  b.box(M.royal, 2.6, 0.02, 1.8, 0.6, L1, -5.0)
  b.box(M.wood, 1.3, 0.08, 0.7, 0.6, L1 + 0.72, -5.4)
  for (const [lx, lz] of [[-0.0, -5.7], [1.2, -5.7], [0.0, -5.1], [1.2, -5.1]]) b.box(M.woodDark, 0.07, 0.72, 0.07, lx, L1, lz)
  b.box(M.white, 0.42, 0.03, 0.3, 0.45, L1 + 0.8, -5.4, 0.15)
  b.box(M.cream, 0.02, 0.05, 0.3, 0.45, L1 + 0.8, -5.4, 0.15)
  candle(b, M, 1.05, L1 + 0.8, -5.6)
  b.cyl(M.opening, 0.04, 0.05, 0.08, 0.9, L1 + 0.8, -5.25, 6)
  b.box(M.wood, 0.5, 0.06, 0.48, 0.6, L1 + 0.36, -4.72)
  for (const [cx, cz] of [[0.39, -4.52], [0.81, -4.52], [0.39, -4.92], [0.81, -4.92]]) b.box(M.woodDark, 0.05, 0.36, 0.05, cx, L1, cz)
  b.box(M.wood, 0.5, 0.75, 0.06, 0.6, L1 + 0.42, -4.47)
  b.box(M.cream, 1.4, 0.95, 0.03, -3.58, L1 + 1.0, -4.6, Math.PI / 2)
  b.box(toon('#9cb88a'), 0.5, 0.4, 0.035, -3.56, L1 + 1.2, -4.8, Math.PI / 2)
  b.box(toon('#9cb88a'), 0.35, 0.3, 0.035, -3.56, L1 + 1.4, -4.2, Math.PI / 2)

  b.box(M.wood, 1.9, 0.4, 2.3, 1.1, L2, -7.0)
  b.box(M.white, 1.75, 0.18, 2.1, 1.1, L2 + 0.4, -7.0)
  b.box(M.royal, 1.8, 0.1, 1.4, 1.1, L2 + 0.55, -6.6)
  b.box(M.cream, 0.6, 0.16, 0.36, 0.7, L2 + 0.58, -7.75)
  b.box(M.cream, 0.6, 0.16, 0.36, 1.5, L2 + 0.58, -7.75)
  for (const [px, pz] of [[0.2, -8.05], [2.0, -8.05], [0.2, -5.9], [2.0, -5.9]]) b.cyl(M.woodDark, 0.05, 0.05, 2.3, px, L2, pz, 6)
  b.box(M.crimson, 2.0, 0.16, 2.3, 1.1, L2 + 2.3, -7.0)
  b.box(M.gold, 2.06, 0.06, 2.36, 1.1, L2 + 2.25, -7.0)
  b.box(M.crimson, 0.04, 1.6, 0.5, 0.2, L2 + 0.7, -6.2)
  b.box(M.crimson, 0.04, 1.6, 0.5, 2.0, L2 + 0.7, -6.2)
  b.box(M.crimson, 1.8, 1.7, 0.04, 1.1, L2 + 0.6, -8.05)
  b.box(M.woodDark, 0.6, 1.9, 1.1, 3.25, L2, -4.6)
  b.box(M.gold, 0.04, 0.12, 0.04, 2.93, L2 + 1.0, -4.5)
  b.box(M.wood, 0.9, 0.75, 0.45, -1.2, L2, -7.85)
  b.batcher.add(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 16).rotateX(Math.PI / 2), toon('#cfe3ea'), b.base.clone().multiply(mat4(-1.2, L2 + 1.15, -8.02)))
  b.cyl(M.crimson, 0.9, 0.9, 0.02, 0.9, L2, -4.6, 20)
  b.cyl(M.wood, 0.25, 0.25, 0.05, -1.6, L2 + 0.55, -4.3, 10)
  b.cyl(M.woodDark, 0.04, 0.04, 0.55, -1.6, L2, -4.3, 5)
  b.cyl(toon('#d8e6ee'), 0.06, 0.08, 0.18, -1.6, L2 + 0.6, -4.3, 8)
  for (let i = 0; i < 3; i++) b.sphere(toon(PALETTE.crimson), 0.05, -1.6 + (i - 1) * 0.05, L2 + 0.85, -4.3)
}

function hallInterior(b: Builder, M: CastleMaterials, group: THREE.Group, flames: THREE.Mesh[], lights: THREE.PointLight[]) {
  const cx = (HALL.x0 + HALL.x1) / 2
  b.box(M.plank, 4.2, 0.05, 6.8, cx, G, 0.75)
  b.box(M.shade, 4.2, 0.3, 1.4, cx, G, -1.95)
  b.box(M.crimson, 2.4, 0.02, 1.2, cx, G + 0.3, -1.95)
  b.box(M.crimson, 1.0, 0.02, 4.7, cx, G + 0.05, 1.0)
  const ty = G + 0.3
  b.box(M.gold, 0.95, 0.45, 0.8, cx, ty, -2.2)
  b.box(M.crimson, 0.8, 0.1, 0.7, cx, ty + 0.45, -2.17)
  b.box(M.gold, 0.95, 1.6, 0.14, cx, ty + 0.45, -2.55)
  b.box(M.crimson, 0.7, 1.2, 0.04, cx, ty + 0.65, -2.47)
  for (const sx of [-0.44, 0.44]) {
    b.box(M.gold, 0.1, 0.35, 0.75, cx + sx, ty + 0.45, -2.2)
    b.sphere(M.gold, 0.08, cx + sx, ty + 0.85, -1.85)
    b.sphere(M.gold, 0.1, cx + sx, ty + 2.1, -2.55)
  }
  b.box(M.crimson, 1.6, 0.12, 1.1, cx, G + 3.25, -2.15)
  b.box(M.gold, 1.66, 0.06, 1.16, cx, G + 3.2, -2.15)
  b.box(M.crimson, 1.6, 2.9, 0.05, cx, G + 0.35, -2.6)
  b.box(M.gold, 0.5, 0.5, 0.06, cx, G + 2.3, -2.56)

  for (const tx of [4.75, 7.35]) {
    b.box(M.wood, 0.85, 0.08, 3.8, tx, G + 0.72, 1.2)
    for (const lz of [-0.55, 2.95]) {
      b.box(M.woodDark, 0.7, 0.72, 0.1, tx, G, lz)
    }
    for (const bx of [-0.58, 0.58]) {
      b.box(M.woodDark, 0.3, 0.06, 3.6, tx + bx, G + 0.42, 1.2)
      b.box(M.woodDark, 0.24, 0.42, 0.08, tx + bx, G, -0.4)
      b.box(M.woodDark, 0.24, 0.42, 0.08, tx + bx, G, 2.8)
    }
    for (let i = 0; i < 5; i++) {
      const z = -0.3 + i * 0.75
      b.cyl(M.white, 0.16, 0.16, 0.025, tx - 0.22, G + 0.8, z, 12)
      b.cyl(M.white, 0.16, 0.16, 0.025, tx + 0.22, G + 0.8, z + 0.3, 12)
      b.cyl(M.gold, 0.04, 0.03, 0.14, tx - 0.05, G + 0.8, z + 0.15, 6)
    }
    b.sphere(toon('#b36a3e'), 0.2, tx, G + 0.95, 0.9, 1.3, 0.8, 1)
    b.cyl(M.white, 0.25, 0.2, 0.06, tx, G + 0.8, 1.9, 12)
    for (let k = 0; k < 5; k++) b.sphere(toon(k % 2 ? '#d9534f' : '#e8b84a'), 0.06, tx + Math.cos(k) * 0.12, G + 0.9, 1.9 + Math.sin(k) * 0.12)
    candle(b, M, tx, G + 0.8, -0.1)
    candle(b, M, tx, G + 0.8, 2.6)
  }

  for (const bz of [-0.4, 2.6]) {
    b.box(M.royal, 0.04, 1.6, 0.7, HALL.x1 - 0.37, G + 1.8, bz)
    b.box(M.gold, 0.05, 0.36, 0.36, HALL.x1 - 0.38, G + 2.6, bz)
    b.cone(M.royal, 0.36, 0.3, HALL.x1 - 0.37, G + 1.5, bz, 4, Math.PI / 4)
  }

  b.box(M.shade, 1.7, 1.7, 0.55, cx, G, HALL.z1 - 0.6)
  b.arch(M.opening, 1.0, 1.05, 0.06, cx, G, HALL.z1 - 0.89)
  b.box(M.dark, 1.9, 0.14, 0.7, cx, G + 1.7, HALL.z1 - 0.62)
  b.cyl(M.woodDark, 0.07, 0.07, 0.7, cx, G + 0.08, HALL.z1 - 1.0, 6, 0, Math.PI / 2)
  fireCluster(group, flames, cx, G + 0.08, HALL.z1 - 1.0, 1)
  warmLight(group, lights, cx, G + 0.9, HALL.z1 - 1.6, 4.5)

  b.batcher.add(unitGeo.torus(0.06, 18), M.woodDark, b.base.clone().multiply(mat4(cx, G + 3.1, 1.0, Math.PI / 2, 0, 0, 0.75, 0.75, 0.75)))
  b.cyl(M.iron, 0.015, 0.015, 3.2, cx, G + 3.1, 1.0, 4)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    candle(b, M, cx + Math.cos(a) * 0.75, G + 3.12, 1.0 + Math.sin(a) * 0.75, 0.16)
  }
  warmLight(group, lights, cx, G + 2.8, 1.0, 2.5, '#ffd08a')
}

function chapelInterior(b: Builder, M: CastleMaterials, group: THREE.Group, lights: THREE.PointLight[]) {
  const cx = (CHAPEL.x0 + CHAPEL.x1) / 2
  b.box(M.shade, 3.3, 0.05, 6, cx, G, 0.75)
  b.box(M.royal, 0.6, 0.02, 5, cx, G + 0.05, 1.1)
  b.box(M.shade, 1.6, 0.18, 0.9, cx, G, -1.75)
  b.box(M.white, 1.3, 0.85, 0.55, cx, G + 0.18, -1.8)
  b.box(M.gold, 1.34, 0.1, 0.58, cx, G + 0.95, -1.8)
  b.box(M.gold, 0.07, 0.6, 0.06, cx, G + 1.05, -1.95)
  b.box(M.gold, 0.32, 0.06, 0.06, cx, G + 1.45, -1.95)
  candle(b, M, cx - 0.45, G + 1.05, -1.8, 0.3)
  candle(b, M, cx + 0.45, G + 1.05, -1.8, 0.3)
  b.arch(M.stained, 0.6, 1.8, 0.08, cx, G + 1.4, CHAPEL.z0 + 0.37)
  for (let row = 0; row < 4; row++) {
    const z = 0 + row * 0.9
    for (const px of [cx - 0.95, cx + 0.95]) {
      b.box(M.wood, 1.15, 0.07, 0.36, px, G + 0.42, z)
      b.box(M.wood, 1.15, 0.5, 0.06, px, G + 0.45, z + 0.2)
      b.box(M.woodDark, 0.06, 0.45, 0.36, px - 0.55, G, z)
      b.box(M.woodDark, 0.06, 0.45, 0.36, px + 0.55, G, z)
    }
  }
  b.box(M.woodDark, 0.08, 1.0, 0.08, cx + 1.1, G, -1.0)
  b.box(M.wood, 0.4, 0.05, 0.3, cx + 1.1, G + 1.0, -1.0, 0, -0.4)
  for (const sx of [-1.25, 1.25]) {
    b.cyl(M.iron, 0.04, 0.06, 1.3, cx + sx, G, -1.4, 6)
    candle(b, M, cx + sx, G + 1.3, -1.4, 0.25)
  }
  warmLight(group, lights, cx, G + 1.8, -1.2, 1.8, '#ffd9a0')
}

function kitchenInterior(b: Builder, M: CastleMaterials, group: THREE.Group, flames: THREE.Mesh[], lights: THREE.PointLight[]) {
  const cz = (KITCHEN.z0 + KITCHEN.z1) / 2
  b.box(M.shade, 3.6, 0.05, 3.2, -6.55, G, cz)
  b.arch(M.opening, 0.8, 0.95, 0.06, KITCHEN.x0 + 1.12, G, cz, Math.PI / 2)
  b.cyl(M.woodDark, 0.06, 0.06, 0.6, KITCHEN.x0 + 1.35, G + 0.06, cz, 6, Math.PI / 2)
  fireCluster(group, flames, KITCHEN.x0 + 1.5, G + 0.05, cz, 0.85)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    b.batcher.add(unitGeo.cyl(1, 4), M.iron, b.base.clone().multiply(mat4(KITCHEN.x0 + 1.5 + Math.cos(a) * 0.32, G, cz + Math.sin(a) * 0.32, Math.sin(a) * 0.2, 0, -Math.cos(a) * 0.2, 0.025, 1.0, 0.025)))
  }
  b.sphere(toon('#3d3a3f'), 0.3, KITCHEN.x0 + 1.5, G + 0.72, cz, 1, 0.8, 1)
  b.cyl(toon('#c9a15a'), 0.25, 0.25, 0.02, KITCHEN.x0 + 1.5, G + 0.86, cz, 12)
  warmLight(group, lights, KITCHEN.x0 + 1.9, G + 0.8, cz, 3.5)

  b.box(M.wood, 1.4, 0.08, 0.75, -5.75, G + 0.75, 7.75)
  for (const [lx, lz] of [[-6.35, 7.45], [-5.15, 7.45], [-6.35, 8.05], [-5.15, 8.05]]) b.box(M.woodDark, 0.07, 0.75, 0.07, lx, G, lz)
  for (let i = 0; i < 3; i++) b.sphere(toon('#c98a4b'), 0.12, -6.2 + i * 0.25, G + 0.88, 7.6, 1.5, 0.75, 1)
  b.sphere(toon('#e3893f'), 0.15, -5.4, G + 0.95, 7.9)
  b.sphere(toon('#8fb36f'), 0.14, -5.15, G + 0.93, 7.6)
  b.cyl(toon('#d9a85a'), 0.18, 0.16, 0.08, -5.6, G + 0.83, 7.55, 12)
  for (const sy of [1.3, 1.9]) {
    b.box(M.woodDark, 2.2, 0.06, 0.3, -6.3, G + sy, KITCHEN.z0 + 0.45)
    for (let k = 0; k < 6; k++) b.cyl(toon(['#c98a4b', '#7fa0b8', '#e2d3b0', '#b8504a'][k % 4]), 0.08, 0.09, 0.22, -7.2 + k * 0.36, G + sy + 0.06, KITCHEN.z0 + 0.45, 8)
  }
  b.box(M.woodDark, 3.3, 0.1, 0.1, -6.55, G + 2.6, cz)
  for (let k = 0; k < 5; k++) b.cyl(toon(k % 2 ? '#8fb36f' : '#b8604a'), 0.05, 0.03, 0.4, -7.4 + k * 0.4, G + 2.2, cz, 6)
  b.cyl(toon('#a77650'), 0.28, 0.3, 0.7, -8.0, G, 8.05, 10)
  b.sphere(M.cream, 0.3, -7.4, G + 0.22, 8.1, 1, 0.75, 1)
}

function smithyInterior(b: Builder, M: CastleMaterials, group: THREE.Group, flames: THREE.Mesh[], lights: THREE.PointLight[]) {
  b.box(M.shade, 1.3, 0.85, 1.0, 7.7, G, 7.7)
  b.box(M.coal, 0.95, 0.05, 0.65, 7.7, G + 0.85, 7.7)
  b.cone(M.shade, 0.95, 0.9, 7.7, G + 1.9, 7.8, 4, Math.PI / 4)
  b.box(M.shade, 0.4, 1.0, 0.4, 7.7, G + 2.6, 7.9)
  fireCluster(group, flames, 7.7, G + 0.88, 7.7, 0.6)
  b.box(M.wood, 0.5, 0.25, 0.8, 6.85, G + 0.6, 7.75, 0, 0, 0.2)
  b.box(toon('#5b4030'), 0.45, 0.12, 0.75, 6.85, G + 0.45, 7.75)
  b.box(M.iron, 0.32, 0.45, 0.32, 6.5, G, 6.9)
  b.box(M.iron, 0.7, 0.18, 0.3, 6.5, G + 0.45, 6.9)
  b.batcher.add(unitGeo.cone(6), M.iron, b.base.clone().multiply(mat4(6.95, G + 0.54, 6.9, 0, 0, -Math.PI / 2, 0.09, 0.25, 0.09)))
  b.cyl(toon('#a77650'), 0.3, 0.32, 0.6, 5.2, G, 8.0, 10)
  b.cyl(toon(PALETTE.waterDeep), 0.27, 0.27, 0.02, 5.2, G + 0.58, 8.0, 10)
  b.box(M.woodDark, 1.6, 1.0, 0.06, 6.0, G + 1.3, 8.47)
  for (let k = 0; k < 4; k++) {
    b.box(M.iron, 0.06, 0.5, 0.05, 5.5 + k * 0.33, G + 1.5, 8.43)
    b.batcher.add(unitGeo.torus(0.25, 10), M.iron, b.base.clone().multiply(mat4(5.5 + k * 0.33, G + 2.1, 8.43, 0, 0, 0, 0.1, 0.1, 0.1)))
  }
  warmLight(group, lights, 7.4, G + 1.4, 7.2, 3.2, '#ff9a5a')
}

function observatory(b: Builder, M: CastleMaterials, group: THREE.Group) {
  const y = G + STAR_TOWER.h + 0.28
  const { x, z } = STAR_TOWER
  b.box(M.wood, 0.8, 0.06, 0.5, x - 0.6, y + 0.65, z - 0.65, 0.6)
  b.box(M.woodDark, 0.06, 0.65, 0.06, x - 0.85, y, z - 0.75)
  b.box(M.woodDark, 0.06, 0.65, 0.06, x - 0.35, y, z - 0.5)
  b.box(M.cream, 0.5, 0.02, 0.36, x - 0.6, y + 0.72, z - 0.65, 0.8)
  candle(b, M, x - 0.35, y + 0.71, z - 0.55, 0.14)
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2
    b.batcher.add(unitGeo.cyl(1, 4), M.woodDark, b.base.clone().multiply(mat4(x + 0.75 + Math.cos(a) * 0.2, y, z + 0.6 + Math.sin(a) * 0.2, Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25, 0.025, 0.9, 0.025)))
  }
  b.batcher.add(unitGeo.cyl(0.7, 10), M.gold, b.base.clone().multiply(mat4(x + 0.75, y + 0.88, z + 0.6, 0.9, 0.6, 0, 0.09, 1.3, 0.09)))

  const globe = new THREE.Group()
  const sphere = new THREE.Mesh(unitGeo.sphere(18, 14), toon('#9cc6dc'))
  sphere.scale.setScalar(0.34)
  globe.add(sphere)
  const land = toon(PALETTE.leaf)
  for (let i = 0; i < 6; i++) {
    const patch = new THREE.Mesh(unitGeo.sphere(8, 6), land)
    const a = i * 1.1
    const e = Math.sin(i * 2.3) * 0.6
    patch.position.set(Math.cos(a) * Math.cos(e) * 0.3, Math.sin(e) * 0.3, Math.sin(a) * Math.cos(e) * 0.3)
    patch.scale.set(0.11, 0.08, 0.11)
    globe.add(patch)
  }
  const meridian = new THREE.Mesh(unitGeo.torus(0.04, 24), toon(PALETTE.gold))
  meridian.scale.setScalar(0.4)
  globe.add(meridian)
  globe.position.set(x - 0.1, y + 1.0, z + 0.85)
  globe.rotation.z = 0.4
  b.cyl(M.woodDark, 0.05, 0.12, 0.6, x - 0.1, y, z + 0.85, 8)
  group.add(globe)
  return globe
}

export function buildInteriors(b: Builder, M: CastleMaterials) {
  const group = new THREE.Group()
  group.name = 'interior-animated'
  const flames: THREE.Mesh[] = []
  const lights: THREE.PointLight[] = []

  keepFloors(b, M)
  hallInterior(b, M, group, flames, lights)
  chapelInterior(b, M, group, lights)
  kitchenInterior(b, M, group, flames, lights)
  smithyInterior(b, M, group, flames, lights)
  const globe = observatory(b, M, group)
  warmLight(group, lights, 0.8, KEEP.levels[1] + 1.8, -5.6, 2.2, '#ffd9a0')
  warmLight(group, lights, 1.0, KEEP.levels[2] + 1.8, -5.4, 2.0, '#ffd9a0')

  const bell = new THREE.Group()
  const bellBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.3, 0.42, 14, 1, true), toon(PALETTE.gold, { side: THREE.DoubleSide }))
  bellBody.position.y = -0.3
  bell.add(bellBody)
  const clapper = new THREE.Mesh(unitGeo.sphere(8, 6), toon(PALETTE.woodDark))
  clapper.scale.setScalar(0.07)
  clapper.position.y = -0.5
  bell.add(clapper)
  bell.position.set((CHAPEL.x0 + CHAPEL.x1) / 2, G + CHAPEL.h + 2.75 + 1.28, CHAPEL.z1 - 0.3)
  group.add(bell)

  const L = KEEP.levels
  const anchors: Record<string, Anchor> = {
    king: { position: new THREE.Vector3((HALL.x0 + HALL.x1) / 2, G + 0.85, -2.15), rotation: 0 },
    princess: { position: new THREE.Vector3(0.6, L[1] + 0.42, -4.75), rotation: Math.PI },
    cat: { position: new THREE.Vector3(1.35, L[2] + 0.65, -6.4), rotation: 0.6 },
    geographer: { position: new THREE.Vector3(STAR_TOWER.x + 0.15, G + STAR_TOWER.h + 0.28, STAR_TOWER.z + 0.05), rotation: 0.9 },
    cook: { position: new THREE.Vector3(KITCHEN.x0 + 2.35, G, (KITCHEN.z0 + KITCHEN.z1) / 2), rotation: -Math.PI / 2 },
    smith: { position: new THREE.Vector3(5.85, G, 6.9), rotation: Math.PI / 2 },
    monk: { position: new THREE.Vector3((CHAPEL.x0 + CHAPEL.x1) / 2, G, -0.9), rotation: Math.PI },
  }

  return {
    group,
    anchors,
    update(time: number, night: number) {
      flames.forEach((f) => {
        const flicker = 1 + Math.sin(time * 9 + f.userData.phase) * 0.12 + Math.sin(time * 23 + f.userData.phase) * 0.06
        f.scale.y = f.userData.base * flicker
      })
      lights.forEach((l, i) => {
        l.intensity = l.userData.base * (0.25 + night * 0.95) * (1 + Math.sin(time * 11 + i) * 0.06)
      })
      globe.rotation.y = time * 0.35
      bell.rotation.x = Math.sin(time * 1.6) * 0.35
    },
  }
}

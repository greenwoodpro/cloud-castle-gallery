import * as THREE from 'three'
import { Batcher, Builder, mat4, noOutline, PALETTE, toon } from './core'
import { buildInteriors } from './interior'
import { CHAPEL, CORNER_TOWERS, G, HALL, KEEP, KITCHEN, SMITHY, STAR_TOWER } from './layout'

const prismGeo = new THREE.CylinderGeometry(1, 1, 1, 3).rotateX(-Math.PI / 2).translate(0, 0.5, 0)
const pyramidGeo = new THREE.ConeGeometry(1, 1, 4).rotateY(Math.PI / 4).translate(0, 0.5, 0)

export function createMaterials() {
  return {
    stone: toon(PALETTE.stone),
    shade: toon(PALETTE.stoneShade),
    dark: toon(PALETTE.stoneDark),
    roofBlue: toon(PALETTE.roofBlue),
    roofRose: toon(PALETTE.roofRose),
    roofSlate: toon(PALETTE.roofSlate),
    roofDeep: toon('#45608f'),
    wood: toon(PALETTE.wood),
    woodDark: toon(PALETTE.woodDark),
    plank: toon(PALETTE.plank),
    door: toon('#6a4b38'),
    opening: toon('#3f3530'),
    gold: toon(PALETTE.gold),
    crimson: toon(PALETTE.crimson),
    royal: toon(PALETTE.royal),
    cream: toon(PALETTE.cream),
    white: toon(PALETTE.white),
    iron: toon('#6d6f78'),
    leaf: toon(PALETTE.leaf),
    window: new THREE.MeshToonMaterial({ color: PALETTE.windowDay, emissive: PALETTE.windowNight, emissiveIntensity: 0 }),
    stained: new THREE.MeshToonMaterial({ color: '#8fb0d8', emissive: '#f0c27a', emissiveIntensity: 0 }),
    flame: noOutline(new THREE.MeshBasicMaterial({ color: '#ffc46b' })),
    coal: noOutline(new THREE.MeshBasicMaterial({ color: '#ff8a4c' })),
  }
}

export type CastleMaterials = ReturnType<typeof createMaterials>

export function prism(b: Builder, m: THREE.Material, halfWidth: number, height: number, length: number, x: number, y: number, z: number, ry = 0) {
  b.batcher.add(prismGeo, m, b.base.clone().multiply(mat4(x, y, z, 0, ry, 0, halfWidth / 0.866, height / 1.5, length)))
}

function pyramid(b: Builder, m: THREE.Material, hx: number, hz: number, height: number, x: number, y: number, z: number) {
  b.batcher.add(pyramidGeo, m, b.base.clone().multiply(mat4(x, y, z, 0, 0, 0, hx / 0.707, height, hz / 0.707)))
}

export function windowAt(b: Builder, M: CastleMaterials, x: number, y: number, z: number, ry: number, w = 0.5, h = 0.9) {
  b.arch(M.window, w, h, 0.14, x, y, z, ry)
  b.box(M.shade, w + 0.18, 0.08, 0.22, x, y - 0.07, z, ry)
}

function towerWindows(b: Builder, M: CastleMaterials, cx: number, cz: number, r: number, levels: number[], angles: number[]) {
  levels.forEach((y, li) => {
    angles.forEach((a0) => {
      const a = a0 + li * 0.35
      windowAt(b, M, cx + Math.sin(a) * (r + 0.01), y, cz + Math.cos(a) * (r + 0.01), a, 0.42, 0.8)
    })
  })
}

function cornerTower(b: Builder, M: CastleMaterials, cx: number, cz: number, roof: THREE.Material) {
  const r = 2
  b.cyl(M.dark, 2.3, 2.45, 0.9, cx, G - 0.3, cz, 20)
  b.cyl(M.stone, r, r, 8.4, cx, G, cz, 20)
  b.cyl(M.shade, 2.08, 2.08, 0.18, cx, G + 4.6, cz, 20)
  b.cyl(M.shade, 2.32, 2.05, 0.5, cx, G + 8.3, cz, 20)
  b.ringMerlons(M.shade, 2.18, G + 8.8, 14, cx, cz, 0.44)
  b.cone(roof, 2.55, 5.2, cx, G + 9, cz, 20)
  b.sphere(M.gold, 0.16, cx, G + 14.25, cz)
  b.cyl(M.woodDark, 0.035, 0.035, 1.3, cx, G + 14.2, cz, 5)
  const outward = Math.atan2(cx, cz)
  towerWindows(b, M, cx, cz, r, [G + 2.4, G + 5.3], [outward - 0.7, outward + 0.7])
  towerWindows(b, M, cx, cz, r, [G + 7.1], [outward])
}

function curtainWalls(b: Builder, M: CastleMaterials) {
  const top = G + 5
  b.box(M.stone, 18, 5, 1, 0, G, -9)
  b.box(M.stone, 1, 5, 18, -9, G, 0)
  b.box(M.stone, 1, 5, 18, 9, G, 0)
  b.box(M.stone, 6.4, 5, 1, -5.8, G, 9)
  b.box(M.stone, 6.4, 5, 1, 5.8, G, 9)
  b.box(M.dark, 18.6, 0.6, 1.4, 0, G - 0.4, -9)
  b.box(M.dark, 1.4, 0.6, 18.6, -9, G - 0.4, 0)
  b.box(M.dark, 1.4, 0.6, 18.6, 9, G - 0.4, 0)
  b.box(M.dark, 6.6, 0.6, 1.4, -5.8, G - 0.4, 9)
  b.box(M.dark, 6.6, 0.6, 1.4, 5.8, G - 0.4, 9)

  b.box(M.shade, 14, 0.16, 1.15, 0, top - 0.1, -9)
  b.box(M.shade, 1.15, 0.16, 14, -9, top - 0.1, 0)
  b.box(M.shade, 1.15, 0.16, 14, 9, top - 0.1, 0)
  b.merlons(M.stone, -6.8, -9.36, 6.8, -9.36, top, 0.32)
  b.merlons(M.stone, -9.36, -6.8, -9.36, 6.8, top, 0.32)
  b.merlons(M.stone, 9.36, -6.8, 9.36, 6.8, top, 0.32)
  b.merlons(M.stone, -6.8, 9.36, -4.2, 9.36, top, 0.32)
  b.merlons(M.stone, 4.2, 9.36, 6.8, 9.36, top, 0.32)
  b.box(M.shade, 14, 0.35, 0.2, 0, top, -8.6)
  b.box(M.shade, 0.2, 0.35, 14, -8.6, top, 0)
  b.box(M.shade, 0.2, 0.35, 14, 8.6, top, 0)

  for (let i = -3; i <= 3; i++) {
    if (i === 0) continue
    b.box(M.opening, 0.14, 0.9, 0.06, i * 2, G + 2.6, -9.52)
    b.box(M.opening, 0.06, 0.9, 0.14, -9.52, G + 2.6, i * 2)
    b.box(M.opening, 0.06, 0.9, 0.14, 9.52, G + 2.6, i * 2)
  }

  b.arch(M.door, 1, 1.7, 0.1, -9.52, G, -5.5, -Math.PI / 2)
  b.arch(M.door, 1, 1.7, 0.1, 5.5, G, -9.52, Math.PI)

  for (let i = 0; i < 12; i++) {
    const rise = 5 / 12
    b.box(M.shade, 1.1, rise * (i + 1), 0.36, -7.95, G, -3.2 - i * 0.36)
  }
}

function gatehouse(b: Builder, M: CastleMaterials) {
  b.box(M.stone, 3.6, 6.4, 2.4, 0, G, 9.3)
  b.box(M.shade, 3.9, 0.4, 2.7, 0, G + 6.2, 9.3)
  b.merlons(M.stone, -1.8, 10.55, 1.8, 10.55, G + 6.6, 0.3)
  b.merlons(M.stone, -1.8, 8.05, 1.8, 8.05, G + 6.6, 0.3)
  for (const sx of [-1, 1]) {
    const cx = sx * 2.6
    b.cyl(M.dark, 1.75, 1.85, 0.8, cx, G - 0.3, 9.7, 18)
    b.cyl(M.stone, 1.5, 1.5, 7.4, cx, G, 9.7, 18)
    b.cyl(M.shade, 1.75, 1.55, 0.4, cx, G + 7.3, 9.7, 18)
    b.cone(M.roofRose, 1.95, 3.8, cx, G + 7.7, 9.7, 18)
    b.sphere(M.gold, 0.13, cx, G + 11.55, 9.7)
    windowAt(b, M, cx + sx * 0.6, G + 3.4, 11.12, sx * 0.4, 0.38, 0.75)
    windowAt(b, M, cx + sx * 0.6, G + 5.6, 11.12, sx * 0.4, 0.38, 0.75)
  }
  b.arch(M.opening, 2.2, 3.3, 0.1, 0, G, 10.52)
  b.arch(M.opening, 2.2, 3.3, 0.1, 0, G, 8.08)
  b.box(M.opening, 2.1, 0.02, 2.4, 0, G + 0.01, 9.3)
  for (let i = -3; i <= 3; i++) b.box(M.iron, 0.06, 1.2, 0.06, i * 0.3, G + 2.15, 10.62)
  b.box(M.iron, 2.1, 0.07, 0.07, 0, G + 2.6, 10.62)
  b.box(M.iron, 2.1, 0.07, 0.07, 0, G + 3.0, 10.62)
  b.box(M.plank, 2.3, 0.14, 3.2, 0, G - 0.08, 12.1)
  for (let i = 0; i < 8; i++) b.box(M.woodDark, 2.3, 0.02, 0.04, 0, G + 0.06, 10.75 + i * 0.4)
  for (const sx of [-1, 1]) {
    b.batcher.add(
      new THREE.CylinderGeometry(0.03, 0.03, 1, 4).translate(0, 0.5, 0),
      M.iron,
      b.base.clone().multiply(mat4(sx * 1.05, G + 0.05, 13.6, -0.72, 0, 0, 1, 4.3, 1)),
    )
  }
  b.box(M.royal, 1.1, 1.6, 0.05, 0, G + 4.2, 10.56)
  b.box(M.gold, 0.5, 0.5, 0.06, 0, G + 4.75, 10.57)
}

function keep(b: Builder, shell: Builder, M: CastleMaterials) {
  const { x0, x1, z0, z1, top } = KEEP
  const w = x1 - x0
  const d = z1 - z0
  const cx = (x0 + x1) / 2
  const cz = (z0 + z1) / 2
  const H = top - G
  b.box(M.dark, w + 0.4, 0.5, d + 0.4, cx, G - 0.3, cz)
  b.box(M.stone, 0.4, H, d, x0 + 0.2, G, cz)
  b.box(M.stone, 0.4, H, d, x1 - 0.2, G, cz)
  b.box(M.stone, w, H, 0.4, cx, G, z0 + 0.2)
  shell.box(M.stone, w, H, 0.4, cx, G, z1 - 0.2)
  for (const y of [G + 2.9, G + 5.8]) {
    b.box(M.shade, 0.5, 0.14, d + 0.1, x0 + 0.2, y - 0.1, cz)
    b.box(M.shade, 0.5, 0.14, d + 0.1, x1 - 0.2, y - 0.1, cz)
    shell.box(M.shade, w + 0.1, 0.14, 0.5, cx, y - 0.1, z1 - 0.2)
  }
  shell.arch(M.door, 1.3, 2.2, 0.12, 0, G, z1 + 0.02)
  shell.box(M.shade, 1.7, 0.18, 0.3, 0, G + 2.25, z1 + 0.05)
  for (const lx of [-2.4, 2.4]) {
    windowAt(shell, M, lx, G + 0.9, z1 + 0.02, 0)
    windowAt(shell, M, lx, G + 3.7, z1 + 0.02, 0, 0.6, 1.1)
    windowAt(shell, M, lx, G + 6.6, z1 + 0.02, 0, 0.6, 1.1)
  }
  windowAt(shell, M, 0, G + 3.7, z1 + 0.02, 0, 0.7, 1.3)
  windowAt(shell, M, 0, G + 6.6, z1 + 0.02, 0, 0.7, 1.3)
  shell.box(M.shade, 1.6, 0.12, 0.6, 0, G + 3.55, z1 + 0.28)
  for (let i = -3; i <= 3; i++) shell.box(M.shade, 0.06, 0.55, 0.06, i * 0.24, G + 3.6, z1 + 0.55)
  shell.box(M.shade, 1.6, 0.06, 0.06, 0, G + 4.15, z1 + 0.55)

  for (const [lx, side] of [[x0 - 0.01, -Math.PI / 2], [x1 + 0.01, Math.PI / 2]] as const) {
    for (const wz of [-7, -4.6]) {
      windowAt(b, M, lx, G + 3.7, wz, side)
      windowAt(b, M, lx, G + 6.6, wz, side)
    }
  }

  shell.box(M.shade, w + 0.5, 0.35, d + 0.5, cx, top - 0.1, cz)
  shell.merlons(M.stone, x0 - 0.1, z1 + 0.15, x1 + 0.1, z1 + 0.15, top + 0.25, 0.3)
  shell.merlons(M.stone, x0 - 0.1, z0 - 0.15, x1 + 0.1, z0 - 0.15, top + 0.25, 0.3)
  shell.merlons(M.stone, x0 - 0.15, z0, x0 - 0.15, z1, top + 0.25, 0.3)
  shell.merlons(M.stone, x1 + 0.15, z0, x1 + 0.15, z1, top + 0.25, 0.3)
  shell.box(M.plank, w - 0.2, 0.2, d - 0.2, cx, top - 0.3, cz)
  const roof = shell
  pyramid(roof, M.roofSlate, w / 2 - 0.3, d / 2 - 0.3, 4.4, cx, top + 0.2, cz)
  roof.sphere(M.gold, 0.18, cx, top + 4.7, cz)
}

function starTower(b: Builder, M: CastleMaterials) {
  const { x, z, r, h } = STAR_TOWER
  const top = G + h
  b.cyl(M.stone, r, r * 1.08, h, x, G, z, 18)
  b.cyl(M.shade, r + 0.08, r + 0.08, 0.16, x, G + 9.2, z, 18)
  towerWindows(b, M, x, z, r, [G + 9.8, G + 11.6, G + 13.2], [Math.PI * 0.25, Math.PI * 0.9, -Math.PI * 0.4])
  b.cyl(M.shade, 2.15, 1.6, 0.55, x, top - 0.3, z, 20)
  b.ringMerlons(M.stone, 2.05, top + 0.25, 16, x, z, 0.4)
  b.cyl(M.plank, 1.95, 1.95, 0.06, x, top + 0.22, z, 20)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + 0.3
    b.cyl(M.shade, 0.09, 0.09, 2.3, x + Math.sin(a) * 1.3, top + 0.25, z + Math.cos(a) * 1.3, 6)
  }
  b.cyl(M.shade, 1.55, 1.45, 0.3, x, top + 2.5, z, 18)
  b.cone(M.roofDeep, 1.95, 3.6, x, top + 2.8, z, 18)
  b.cyl(M.gold, 0.04, 0.04, 0.6, x, top + 6.3, z, 5)
}

function greatHall(b: Builder, shell: Builder, M: CastleMaterials) {
  const { x0, x1, z0, z1, h } = HALL
  const w = x1 - x0
  const d = z1 - z0
  const cx = (x0 + x1) / 2
  const cz = (z0 + z1) / 2
  b.box(M.stone, 0.35, h, d, x1 - 0.175, G, cz)
  b.box(M.stone, w, h, 0.35, cx, G, z0 + 0.175)
  b.box(M.stone, w, h, 0.35, cx, G, z1 - 0.175)
  shell.box(M.stone, 0.35, h, d, x0 + 0.175, G, cz)
  shell.box(M.dark, 0.5, 0.4, d + 0.2, x0 + 0.15, G - 0.2, cz)
  shell.arch(M.door, 1.2, 2.1, 0.12, x0 - 0.02, G, 2.6, -Math.PI / 2)
  for (const wz of [-1.6, 0.6]) windowAt(shell, M, x0 - 0.02, G + 1.4, wz, -Math.PI / 2, 0.55, 1.6)
  windowAt(b, M, x0 + 0.9, G + 1.6, z1 + 0.01, 0, 0.5, 1.4)
  windowAt(b, M, x1 - 0.9, G + 1.6, z1 + 0.01, 0, 0.5, 1.4)
  for (const wz of [-1.4, 1.2, 3.4]) windowAt(b, M, 9.52, G + 2.2, wz, Math.PI / 2, 0.4, 1.1)
  prism(shell, M.stone, w / 2, 2.6, d - 0.05, cx, G + h, cz)
  prism(shell, M.roofRose, w / 2 + 0.45, 2.85, d + 0.5, cx, G + h - 0.25, cz)
  b.box(M.shade, 0.9, 6.4, 0.7, cx, G + 1.6, z1 - 0.5)
  b.box(M.dark, 1.05, 0.3, 0.85, cx, G + 8, z1 - 0.5)
}

function chapel(b: Builder, shell: Builder, M: CastleMaterials) {
  const { x0, x1, z0, z1, h } = CHAPEL
  const w = x1 - x0
  const d = z1 - z0
  const cx = (x0 + x1) / 2
  const cz = (z0 + z1) / 2
  b.box(M.stone, 0.35, h, d, x0 + 0.175, G, cz)
  b.box(M.stone, w, h, 0.35, cx, G, z0 + 0.175)
  b.box(M.stone, w, h, 0.35, cx, G, z1 - 0.175)
  shell.box(M.stone, 0.35, h, d, x1 - 0.175, G, cz)
  shell.arch(M.door, 1.1, 2.2, 0.12, x1 + 0.02, G, 1.6, Math.PI / 2)
  shell.arch(M.stained, 0.5, 1.6, 0.12, x1 + 0.02, G + 1.4, -1, Math.PI / 2)
  for (const wz of [-1.2, 0.6, 2.4]) b.arch(M.stained, 0.5, 1.6, 0.14, x0 - 0.02, G + 1.4, wz, -Math.PI / 2)
  prism(b, M.stone, w / 2, 3, 0.36, cx, G + h, z1 - 0.18)
  prism(shell, M.stone, w / 2, 3, d - 0.4, cx, G + h, cz - 0.2)
  prism(shell, M.roofBlue, w / 2 + 0.4, 3.35, d + 0.5, cx, G + h - 0.3, cz)
  b.batcher.add(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 20).rotateX(Math.PI / 2), M.stained, b.base.clone().multiply(mat4(cx, G + h + 0.9, z1 + 0.02)))
  b.batcher.add(new THREE.TorusGeometry(0.64, 0.08, 6, 24), M.shade, b.base.clone().multiply(mat4(cx, G + h + 0.9, z1 + 0.06)))
  const by = G + h + 2.75
  b.box(M.stone, 0.18, 1.3, 0.5, cx - 0.45, by, z1 - 0.3)
  b.box(M.stone, 0.18, 1.3, 0.5, cx + 0.45, by, z1 - 0.3)
  b.box(M.shade, 1.2, 0.12, 0.7, cx, by + 1.3, z1 - 0.3)
  b.cone(M.roofBlue, 0.75, 0.9, cx, by + 1.42, z1 - 0.3, 4, Math.PI / 4)
  b.box(M.gold, 0.06, 0.6, 0.06, cx, by + 2.3, z1 - 0.3)
  b.box(M.gold, 0.36, 0.06, 0.06, cx, by + 2.65, z1 - 0.3)
}

function kitchen(b: Builder, shell: Builder, M: CastleMaterials) {
  const { x0, x1, z0, z1, h } = KITCHEN
  const w = x1 - x0
  const d = z1 - z0
  const cx = (x0 + x1) / 2
  const cz = (z0 + z1) / 2
  b.box(M.cream, 0.3, h, d, x0 + 0.15, G, cz)
  b.box(M.cream, w, h, 0.3, cx, G, z0 + 0.15)
  shell.box(M.cream, 0.3, h, d, x1 - 0.15, G, cz)
  for (const fz of [z0 + 0.15, z1 - 0.3]) {
    b.box(M.woodDark, w, 0.14, 0.34, cx, G + h - 0.14, fz)
  }
  b.box(M.woodDark, 0.14, h, 0.34, x0 + 1.6, G, z0 + 0.15)
  b.box(M.woodDark, 0.14, h, 0.34, x0 + 2.8, G, z0 + 0.15)
  windowAt(b, M, cx, G + 1.3, z0 - 0.01, Math.PI, 0.55, 0.8)
  shell.arch(M.door, 0.95, 1.9, 0.1, x1 + 0.02, G, cz, Math.PI / 2)
  shell.box(M.woodDark, 0.34, 0.14, d, x1 - 0.15, G + h - 0.14, cz)
  prism(shell, M.cream, d / 2, 1.9, w - 0.05, cx, G + h, cz, Math.PI / 2)
  prism(shell, toon('#b9785f'), d / 2 + 0.4, 2.15, w + 0.45, cx, G + h - 0.2, cz, Math.PI / 2)
  b.box(M.shade, 1, 6.6, 1.05, x0 + 0.6, G, cz)
  b.box(M.dark, 1.15, 0.25, 1.2, x0 + 0.6, G + 6.6, cz)
}

function smithy(b: Builder, shell: Builder, M: CastleMaterials) {
  const { x0, x1, z0, z1 } = SMITHY
  for (const px of [x0 + 0.2, x1 - 0.25]) b.box(M.woodDark, 0.2, 2.6, 0.2, px, G, z0 + 0.15)
  b.box(M.woodDark, x1 - x0, 0.2, 0.22, (x0 + x1) / 2, G + 2.5, z0 + 0.15)
  shell.box(toon('#a97462'), x1 - x0 + 0.5, 0.16, z1 - z0 + 0.6, (x0 + x1) / 2, G + 2.95, (z0 + z1) / 2 - 0.1, 0, -0.28)
}

function courtyard(b: Builder, M: CastleMaterials) {
  b.cyl(M.dark, 0.85, 0.9, 0.75, -1.8, G, 3, 16)
  b.cyl(toon(PALETTE.waterDeep), 0.68, 0.68, 0.02, -1.8, G + 0.7, 3, 16)
  b.box(M.woodDark, 0.12, 1.9, 0.12, -2.6, G + 0.6, 3)
  b.box(M.woodDark, 0.12, 1.9, 0.12, -1.0, G + 0.6, 3)
  b.box(M.woodDark, 1.8, 0.1, 0.1, -1.8, G + 2.2, 3)
  prism(b, M.roofRose, 1.1, 0.6, 1.2, -1.8, G + 2.3, 3, Math.PI / 2)
  b.cyl(M.wood, 0.14, 0.12, 0.26, -1.8, G + 1.4, 3, 8)

  b.box(M.woodDark, 0.14, 1.6, 0.14, 2.6, G, 6.3)
  b.box(M.woodDark, 1.1, 0.12, 0.12, 2.6, G + 1.15, 6.3)
  b.sphere(toon('#d9c08f'), 0.28, 2.6, G + 1.75, 6.3)
  b.cyl(toon('#d9c08f'), 0.25, 0.22, 0.7, 2.6, G + 0.5, 6.3, 8)

  b.box(M.wood, 1.2, 0.5, 2, 2.9, G + 0.45, 3.4, 0.2)
  for (const wz of [-0.7, 0.7]) {
    b.batcher.add(new THREE.CylinderGeometry(0.42, 0.42, 0.1, 12).rotateZ(Math.PI / 2), M.woodDark, b.base.clone().multiply(mat4(2.9, G + 0.42, 3.4 + wz, 0, 0.2, 0)))
  }
  b.sphere(toon(PALETTE.wheat), 0.55, 2.9, G + 1.05, 3.4, 1.1, 0.6, 1.6)

  const barrel = toon('#a77650')
  for (const [bx, bz] of [[-4.0, 5.6], [-3.6, 6.3], [-4.1, 7.0]] as const) {
    b.cyl(barrel, 0.3, 0.34, 0.7, bx, G, bz, 10)
    b.cyl(M.iron, 0.345, 0.345, 0.05, bx, G + 0.2, bz, 10)
  }
  b.box(M.plank, 0.6, 0.5, 0.6, -3.2, G, 7.6, 0.3)
  b.box(M.plank, 0.45, 0.4, 0.45, -3.25, G + 0.5, 7.55, 0.6)

  const bed = toon('#9b7a5c')
  for (let i = 0; i < 3; i++) {
    b.box(bed, 0.9, 0.3, 2.4, 5.6 + i * 1.05, G, -5.6)
    for (let k = 0; k < 4; k++) b.sphere(toon(i === 1 ? '#e3836e' : PALETTE.leaf), 0.17, 5.6 + i * 1.05 + (k % 2) * 0.3 - 0.15, G + 0.42, -6.5 + k * 0.6)
  }
  b.cyl(M.wood, 0.14, 0.18, 1.4, 7.6, G, -3.8, 6)
  b.sphere(toon(PALETTE.leafDeep), 0.95, 7.6, G + 2.1, -3.8)
  for (let i = 0; i < 6; i++) b.sphere(toon('#e3836e'), 0.1, 7.6 + Math.sin(i * 2) * 0.8, G + 1.9 + (i % 3) * 0.25, -3.8 + Math.cos(i * 2) * 0.8)

  for (const [lx, lz] of [[-2.6, 6.8], [2.4, -1.8], [-3.2, -1.8]] as const) {
    b.cyl(M.iron, 0.05, 0.07, 2.2, lx, G, lz, 6)
    b.box(M.iron, 0.34, 0.06, 0.34, lx, G + 2.2, lz)
    b.box(M.window, 0.26, 0.36, 0.26, lx, G + 2.26, lz)
    b.cone(M.iron, 0.26, 0.24, lx, G + 2.62, lz, 4, Math.PI / 4)
  }
}

export interface FlagUniforms {
  uTime: { value: number }
}

function createFlag(color: string, uniforms: FlagUniforms, length = 1.1) {
  const shape = new THREE.BufferGeometry()
  const segs = 10
  const positions: number[] = []
  const indices: number[] = []
  for (let i = 0; i <= segs; i++) {
    const t = i / segs
    const half = 0.32 * (1 - t * 0.85)
    positions.push(t * length, half, 0, t * length, -half, 0)
  }
  for (let i = 0; i < segs; i++) {
    const a = i * 2
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
  }
  shape.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  shape.setIndex(indices)
  shape.computeVertexNormals()
  const material = noOutline(new THREE.MeshToonMaterial({ color, side: THREE.DoubleSide }))
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime
    shader.vertexShader =
      'uniform float uTime;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        transformed.z += sin(position.x * 5.0 - uTime * 4.5) * 0.12 * position.x;`,
      )
  }
  material.customProgramCacheKey = () => 'flag-wave'
  const mesh = new THREE.Mesh(shape, material)
  mesh.castShadow = true
  return mesh
}

export function createCastle() {
  const M = createMaterials()
  const batcher = new Batcher()
  const core = new Builder(batcher, new THREE.Matrix4(), 'core')
  const shell = core.withLayer('shell')

  curtainWalls(core, M)
  CORNER_TOWERS.forEach(([x, z], i) => cornerTower(core, M, x, z, i % 2 === 0 ? M.roofBlue : M.roofSlate))
  gatehouse(core, M)
  keep(core, shell, M)
  starTower(core, M)
  greatHall(core, shell, M)
  chapel(core, shell, M)
  kitchen(core, shell, M)
  smithy(core, shell, M)
  courtyard(core, M)
  const interior = buildInteriors(core, M)

  const group = new THREE.Group()
  group.name = 'castle'
  const batch = batcher.build('castle-batch')
  group.add(batch)
  group.add(interior.group)
  const shellGroup = (batch.userData.layers as Map<string, THREE.Group>).get('shell')

  const flagUniforms: FlagUniforms = { uTime: { value: 0 } }
  const flagSpots: [number, number, number, string][] = [
    ...CORNER_TOWERS.map(([x, z], i) => [x, G + 15.25, z, i % 2 === 0 ? PALETTE.gold : PALETTE.crimson] as [number, number, number, string]),
    [STAR_TOWER.x, G + STAR_TOWER.h + 6.75, STAR_TOWER.z, PALETTE.royal],
  ]
  for (const [x, y, z, color] of flagSpots) {
    const flag = createFlag(color, flagUniforms, 0.9)
    flag.position.set(x + 0.03, y - 0.28, z)
    flag.rotation.y = -0.6
    group.add(flag)
  }

  const starShape = new THREE.Shape()
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2
    const r = i % 2 === 0 ? 0.55 : 0.24
    if (i === 0) starShape.moveTo(Math.cos(a) * r, Math.sin(a) * r)
    else starShape.lineTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  const starMat = new THREE.MeshToonMaterial({ color: PALETTE.gold, emissive: '#ffcf5a', emissiveIntensity: 0.3 })
  starMat.userData.outlineParameters = { thickness: 0.003, color: [0.4, 0.3, 0.15], alpha: 0.8 }
  const star = new THREE.Mesh(
    new THREE.ExtrudeGeometry(starShape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 1 }).center(),
    starMat,
  )
  star.position.set(STAR_TOWER.x, G + STAR_TOWER.h + 7.4, STAR_TOWER.z)
  group.add(star)

  return {
    group,
    shell: shellGroup,
    materials: M,
    anchors: interior.anchors,
    smokeSources: [
      new THREE.Vector3(KITCHEN.x0 + 0.6, G + 7.1, (KITCHEN.z0 + KITCHEN.z1) / 2),
      new THREE.Vector3((HALL.x0 + HALL.x1) / 2, G + 8.5, HALL.z1 - 0.5),
    ],
    update(time: number, night: number) {
      flagUniforms.uTime.value = time
      star.rotation.y = time * 0.6
      star.position.y = G + STAR_TOWER.h + 7.4 + Math.sin(time * 1.2) * 0.08
      starMat.emissiveIntensity = 0.25 + night * 1.1
      M.window.emissiveIntensity = night * 1.15
      M.window.color.set(night > 0.5 ? PALETTE.windowNight : PALETTE.windowDay)
      M.stained.emissiveIntensity = night * 0.9
      interior.update(time, night)
    },
  }
}

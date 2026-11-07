import * as THREE from 'three'
import { C } from './palette'
import { Batcher, mulberry32, roundedBoxGeometry, toonMaterial, tubeAlong } from './utils'

export type CharacterInfo = {
  id: string
  name: string
  role: string
  quote: string
}

export type Character = {
  group: THREE.Group
  info: CharacterInfo
  tick: (time: number) => void
}

type PersonOptions = {
  scale?: number
  robe?: number
  robeAlt?: number
  trim?: number
  skin?: number
  hair?: number
  hairStyle?: 'prince' | 'short' | 'bald' | 'bun' | 'hood' | 'hat' | 'helmet' | 'chef' | 'crown' | 'beret'
  sleeves?: number
  legs?: number
  scarf?: number
  beard?: number
  blush?: boolean
  seated?: boolean
}

const _random = mulberry32(555)

/** 一个圆润、温和的小人：所有角色都从这套骨架派生。 */
function buildPerson(batch: Batcher, o: PersonOptions = {}) {
  const s = o.scale ?? 1
  const skin = o.skin ?? C.skin
  const robe = o.robe ?? C.clothBlue
  const trim = o.trim ?? C.gold
  const hair = o.hair ?? C.hairGold
  const seated = o.seated ?? false

  const hipY = seated ? 0.34 * s : 0.62 * s
  const torsoH = 0.6 * s

  // 腿
  if (!seated) {
    for (const side of [-1, 1]) {
      batch.add(new THREE.CylinderGeometry(0.075 * s, 0.085 * s, 0.62 * s, 6), o.legs ?? robe, {
        position: [side * 0.11 * s, 0.31 * s, 0],
      })
      batch.add(roundedBoxGeometry(0.17 * s, 0.1 * s, 0.26 * s, 0.04 * s, 1), C.woodDark, {
        position: [side * 0.11 * s, 0.05 * s, 0.03 * s],
      })
    }
  } else {
    for (const side of [-1, 1]) {
      batch.add(new THREE.CylinderGeometry(0.08 * s, 0.075 * s, 0.42 * s, 6), o.legs ?? robe, {
        position: [side * 0.11 * s, 0.3 * s, 0.24 * s],
        rotation: [Math.PI / 2.3, 0, 0],
      })
      batch.add(new THREE.CylinderGeometry(0.075 * s, 0.07 * s, 0.34 * s, 6), o.legs ?? robe, {
        position: [side * 0.11 * s, 0.14 * s, 0.44 * s],
      })
      batch.add(roundedBoxGeometry(0.17 * s, 0.1 * s, 0.26 * s, 0.04 * s, 1), C.woodDark, {
        position: [side * 0.11 * s, 0.05 * s, 0.52 * s],
      })
    }
  }

  // 长袍 / 上衣
  batch.add(new THREE.CylinderGeometry(0.19 * s, 0.31 * s, torsoH, 10), robe, {
    position: [0, hipY + torsoH / 2 - 0.06 * s, 0],
  })
  batch.add(new THREE.TorusGeometry(0.2 * s, 0.035 * s, 4, 12), trim, {
    position: [0, hipY + torsoH - 0.08 * s, 0],
    rotation: [Math.PI / 2, 0, 0],
  })
  // 腰带
  batch.add(new THREE.TorusGeometry(0.235 * s, 0.035 * s, 4, 12), o.trim ?? C.woodDark, {
    position: [0, hipY + 0.06 * s, 0],
    rotation: [Math.PI / 2, 0, 0],
  })

  const shoulderY = hipY + torsoH - 0.1 * s
  // 手臂
  for (const side of [-1, 1]) {
    batch.add(new THREE.CylinderGeometry(0.055 * s, 0.05 * s, 0.46 * s, 6), o.sleeves ?? robe, {
      position: [side * 0.25 * s, shoulderY - 0.2 * s, 0],
      rotation: [0, 0, side * 0.22],
    })
    batch.add(new THREE.SphereGeometry(0.062 * s, 7, 6), skin, {
      position: [side * 0.3 * s, shoulderY - 0.44 * s, 0],
    })
  }

  // 头
  const headY = shoulderY + 0.26 * s
  batch.add(new THREE.SphereGeometry(0.2 * s, 14, 12), skin, {
    position: [0, headY, 0],
    scale: [1, 1.04, 0.96],
  })
  batch.add(new THREE.CylinderGeometry(0.075 * s, 0.09 * s, 0.1 * s, 8), skin, {
    position: [0, shoulderY + 0.06 * s, 0],
  })
  // 眼睛与腮红
  for (const side of [-1, 1]) {
    batch.add(new THREE.SphereGeometry(0.026 * s, 6, 5), C.ink, {
      position: [side * 0.075 * s, headY + 0.02 * s, 0.175 * s],
    })
    if (o.blush !== false) {
      batch.add(new THREE.SphereGeometry(0.036 * s, 6, 5), C.leafRose, {
        position: [side * 0.13 * s, headY - 0.05 * s, 0.14 * s],
        scale: [1, 0.7, 0.5],
      })
    }
  }
  // 鼻子与嘴
  batch.add(new THREE.SphereGeometry(0.024 * s, 5, 4), C.skinShade, {
    position: [0, headY - 0.02 * s, 0.19 * s],
  })
  batch.add(roundedBoxGeometry(0.06 * s, 0.014 * s, 0.02 * s, 0.006 * s, 1), C.roofDeep, {
    position: [0, headY - 0.09 * s, 0.18 * s],
  })

  // 发型
  switch (o.hairStyle ?? 'short') {
    case 'prince': {
      batch.add(new THREE.SphereGeometry(0.212 * s, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.9), hair, {
        position: [0, headY + 0.012 * s, -0.012 * s],
      })
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2
        batch.add(new THREE.ConeGeometry(0.055 * s, 0.2 * s, 4), hair, {
          position: [Math.cos(a) * 0.15 * s, headY + 0.15 * s + (i % 3) * 0.03 * s, Math.sin(a) * 0.15 * s],
          rotation: [Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6],
        })
      }
      break
    }
    case 'bun': {
      batch.add(new THREE.SphereGeometry(0.208 * s, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.8), hair, {
        position: [0, headY + 0.01 * s, -0.01 * s],
      })
      batch.add(new THREE.SphereGeometry(0.1 * s, 8, 6), hair, { position: [0, headY + 0.06 * s, -0.2 * s] })
      break
    }
    case 'bald': {
      batch.add(new THREE.TorusGeometry(0.185 * s, 0.035 * s, 4, 14, Math.PI * 1.3), hair, {
        position: [0, headY - 0.02 * s, -0.02 * s],
        rotation: [Math.PI / 2.2, 0, Math.PI * 0.85],
      })
      break
    }
    case 'hood': {
      batch.add(new THREE.SphereGeometry(0.245 * s, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.6), robe, {
        position: [0, headY + 0.01 * s, -0.03 * s],
      })
      break
    }
    case 'helmet': {
      batch.add(new THREE.SphereGeometry(0.222 * s, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.75), C.guardSteel, {
        position: [0, headY + 0.015 * s, 0],
      })
      batch.add(new THREE.TorusGeometry(0.215 * s, 0.03 * s, 4, 14), C.guardSteelDark, {
        position: [0, headY + 0.02 * s, 0],
        rotation: [Math.PI / 2, 0, 0],
      })
      batch.add(roundedBoxGeometry(0.05 * s, 0.2 * s, 0.05 * s, 0.02 * s, 1), C.guardSteelDark, {
        position: [0, headY - 0.03 * s, 0.2 * s],
      })
      batch.add(new THREE.ConeGeometry(0.06 * s, 0.2 * s, 6), C.clothRed, {
        position: [0, headY + 0.26 * s, 0],
      })
      break
    }
    case 'chef': {
      batch.add(new THREE.CylinderGeometry(0.17 * s, 0.19 * s, 0.1 * s, 10), C.clothCream, {
        position: [0, headY + 0.17 * s, 0],
      })
      batch.add(new THREE.SphereGeometry(0.19 * s, 10, 8), C.clothCream, {
        position: [0, headY + 0.3 * s, 0],
        scale: [1, 0.85, 1],
      })
      break
    }
    case 'crown': {
      batch.add(new THREE.SphereGeometry(0.208 * s, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.85), hair, {
        position: [0, headY + 0.01 * s, -0.01 * s],
      })
      batch.add(new THREE.CylinderGeometry(0.19 * s, 0.2 * s, 0.11 * s, 12), C.gold, {
        position: [0, headY + 0.19 * s, 0],
      })
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2
        batch.add(new THREE.ConeGeometry(0.045 * s, 0.14 * s, 4), C.gold, {
          position: [Math.cos(a) * 0.185 * s, headY + 0.3 * s, Math.sin(a) * 0.185 * s],
        })
      }
      batch.add(new THREE.SphereGeometry(0.045 * s, 6, 5), C.clothRed, {
        position: [0, headY + 0.2 * s, 0.19 * s],
      })
      break
    }
    case 'hat': {
      batch.add(new THREE.CylinderGeometry(0.3 * s, 0.32 * s, 0.04 * s, 12), C.woodDark, {
        position: [0, headY + 0.16 * s, 0],
      })
      batch.add(new THREE.CylinderGeometry(0.17 * s, 0.19 * s, 0.2 * s, 12), C.woodDark, {
        position: [0, headY + 0.26 * s, 0],
      })
      break
    }
    case 'beret': {
      batch.add(new THREE.SphereGeometry(0.21 * s, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), C.clothRed, {
        position: [0, headY + 0.11 * s, 0],
        scale: [1.15, 0.6, 1.15],
      })
      break
    }
    default: {
      batch.add(new THREE.SphereGeometry(0.208 * s, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.85), hair, {
        position: [0, headY + 0.01 * s, -0.01 * s],
      })
    }
  }

  // 胡子
  if (o.beard) {
    batch.add(new THREE.SphereGeometry(0.15 * s, 10, 8, 0, Math.PI * 2, Math.PI / 2.6, Math.PI / 2), o.beard, {
      position: [0, headY - 0.02 * s, 0.03 * s],
      scale: [1, 1.25, 1],
    })
  }

  // 围巾
  if (o.scarf) {
    batch.add(new THREE.TorusGeometry(0.13 * s, 0.055 * s, 5, 12), o.scarf, {
      position: [0, shoulderY + 0.08 * s, 0],
      rotation: [Math.PI / 2.2, 0, 0],
    })
    batch.add(roundedBoxGeometry(0.11 * s, 0.5 * s, 0.05 * s, 0.02 * s, 1), o.scarf, {
      position: [0.09 * s, shoulderY - 0.16 * s, -0.13 * s],
      rotation: [0.2, 0, -0.15],
    })
  }

  return { headY, shoulderY, hipY, s }
}

/* ------------------------------------------------------------------ */
/* 角色工厂                                                            */
/* ------------------------------------------------------------------ */

function finish(
  batch: Batcher,
  info: CharacterInfo,
  pos: THREE.Vector3,
  rotY: number,
  extras?: { group?: THREE.Group; tick?: (t: number) => void },
): Character {
  const group = extras?.group ?? new THREE.Group()
  const mesh = batch.build(toonMaterial({}))
  if (mesh) {
    mesh.castShadow = true
    group.add(mesh)
  }
  group.userData.character = info
  group.traverse((o) => {
    o.userData.characterRoot = group
  })
  group.position.copy(pos)
  group.rotation.y = rotY
  group.userData.baseY = pos.y
  group.userData.baseRot = rotY
  group.userData.phase = _random() * Math.PI * 2
  const baseTick = extras?.tick
  return {
    group,
    info,
    tick(time) {
      group.position.y = group.userData.baseY + Math.sin(time * 1.6 + group.userData.phase) * 0.022
      group.rotation.y = group.userData.baseRot + Math.sin(time * 0.42 + group.userData.phase * 1.7) * 0.09
      baseTick?.(time)
    },
  }
}

export function makePrince(pos: THREE.Vector3, rotY = 0, seated = false): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 0.86,
    robe: C.princeGreen,
    robeAlt: C.princeGreen,
    legs: C.princeBlue,
    sleeves: C.princeGreen,
    trim: C.gold,
    hair: C.hairGold,
    hairStyle: 'prince',
    scarf: C.gold,
    skin: C.skin,
    seated,
  })
  // 腰间的短剑（其实是把小铲子，用来清理猴面包树）
  b.add(roundedBoxGeometry(0.05, 0.34, 0.05, 0.02, 1), C.guardSteel, { position: [0.3, 0.5, 0.05], rotation: [0, 0, -0.3] })
  b.add(roundedBoxGeometry(0.12, 0.05, 0.05, 0.02, 1), C.gold, { position: [0.27, 0.36, 0.05] })
  return finish(b, {
    id: 'prince',
    name: '小王子',
    role: '来自 B-612 小行星的旅行者',
    quote: '只有用心才能看得清，重要的东西用眼睛是看不见的。',
  }, pos, rotY)
}

export function makeFox(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  const fur = 0xd98a4f
  const cream = C.clothCream
  // 身体
  b.add(new THREE.SphereGeometry(0.3, 12, 10), fur, { position: [0, 0.34, 0], scale: [0.85, 0.8, 1.35] })
  b.add(new THREE.SphereGeometry(0.24, 10, 8), cream, { position: [0, 0.28, 0.12], scale: [0.7, 0.6, 1.1] })
  // 头
  b.add(new THREE.SphereGeometry(0.2, 12, 10), fur, { position: [0, 0.56, 0.36], scale: [0.92, 0.9, 0.95] })
  b.add(new THREE.ConeGeometry(0.11, 0.26, 6), fur, { position: [0, 0.52, 0.55], rotation: [Math.PI / 2.1, 0, 0] })
  b.add(new THREE.SphereGeometry(0.035, 5, 4), C.ink, { position: [0, 0.53, 0.66] })
  for (const s of [-1, 1]) {
    b.add(new THREE.ConeGeometry(0.085, 0.24, 5), fur, { position: [s * 0.11, 0.74, 0.32], rotation: [s * 0.1, 0, s * -0.22] })
    b.add(new THREE.ConeGeometry(0.05, 0.14, 5), C.leafRose, { position: [s * 0.11, 0.72, 0.34], rotation: [s * 0.1, 0, s * -0.22] })
    b.add(new THREE.SphereGeometry(0.026, 5, 4), C.ink, { position: [s * 0.085, 0.6, 0.5] })
    b.add(new THREE.SphereGeometry(0.05, 6, 5), cream, { position: [s * 0.13, 0.5, 0.44], scale: [1, 0.8, 0.7] })
  }
  // 腿
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(new THREE.CylinderGeometry(0.045, 0.04, 0.28, 5), fur, { position: [sx * 0.15, 0.14, sz * 0.26] })
      b.add(roundedBoxGeometry(0.09, 0.06, 0.13, 0.02, 1), C.ink, { position: [sx * 0.15, 0.03, sz * 0.28] })
    }
  }
  // 尾巴
  const tail: THREE.Vector3[] = []
  for (let i = 0; i <= 6; i++) {
    const t = i / 6
    tail.push(new THREE.Vector3(0, 0.36 + Math.sin(t * 1.7) * 0.28, -0.3 - t * 0.5))
  }
  b.add(tubeAlong(tail, 0.11, 20, 6), fur)
  b.add(new THREE.SphereGeometry(0.13, 8, 6), cream, { position: [0, 0.56, -0.8], scale: [1, 1, 1.2] })
  return finish(b, {
    id: 'fox',
    name: '狐狸',
    role: '被驯服的朋友',
    quote: '你为你的玫瑰花费的时间，才使你的玫瑰变得如此重要。',
  }, pos, rotY)
}

export function makeSheep(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  const wool = C.clothCream
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2
    b.add(new THREE.IcosahedronGeometry(0.2 + (i % 3) * 0.05, 1), wool, {
      position: [Math.cos(a) * 0.16, 0.44 + (i % 2) * 0.08, Math.sin(a) * 0.24],
    })
  }
  b.add(new THREE.IcosahedronGeometry(0.28, 1), wool, { position: [0, 0.46, 0] })
  b.add(new THREE.SphereGeometry(0.15, 10, 8), C.skinShade, { position: [0, 0.44, 0.36], scale: [0.85, 1.1, 0.9] })
  for (const s of [-1, 1]) {
    b.add(new THREE.SphereGeometry(0.06, 6, 5), C.skinShade, { position: [s * 0.13, 0.52, 0.34] })
    b.add(new THREE.SphereGeometry(0.022, 5, 4), C.ink, { position: [s * 0.06, 0.47, 0.48] })
    b.add(new THREE.ConeGeometry(0.05, 0.14, 5), wool, { position: [0, 0.58, 0.34] })
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(new THREE.CylinderGeometry(0.04, 0.035, 0.3, 5), C.skinShade, { position: [sx * 0.14, 0.15, sz * 0.2] })
    }
  }
  return finish(b, {
    id: 'sheep',
    name: '绵羊',
    role: '住在带孔的木箱里',
    quote: '箱子里的绵羊，比画出来的更让人安心。',
  }, pos, rotY)
}

export function makeKing(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.12,
    robe: C.kingPurple,
    legs: C.kingPurple,
    sleeves: C.kingPurple,
    trim: C.clothCream,
    hair: C.clothCream,
    hairStyle: 'crown',
    beard: C.clothCream,
    seated: true,
  })
  // 王袍下摆与权杖
  b.add(new THREE.SphereGeometry(0.42, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), C.kingPurple, {
    position: [0, 0.3, 0.1],
    scale: [1.1, 0.6, 1.2],
  })
  b.add(new THREE.CylinderGeometry(0.035, 0.035, 1.0, 6), C.gold, { position: [0.36, 0.75, 0.16], rotation: [0.2, 0, -0.15] })
  b.add(new THREE.SphereGeometry(0.09, 8, 6), C.gold, { position: [0.44, 1.24, 0.24] })
  b.add(new THREE.TorusGeometry(0.07, 0.022, 4, 10), C.gold, { position: [0.44, 1.32, 0.24], rotation: [Math.PI / 2, 0, 0] })
  return finish(b, {
    id: 'king',
    name: '国王',
    role: '统治一切的君主',
    quote: '我命令你打一个哈欠，因为我从未见过有人打哈欠。',
  }, pos, rotY)
}

export function makeGuard(pos: THREE.Vector3, rotY = 0, spear = true): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.05,
    robe: C.clothBlue,
    legs: C.guardSteelDark,
    sleeves: C.guardSteel,
    trim: C.guardSteelDark,
    hair: C.woodDark,
    hairStyle: 'helmet',
    beard: undefined,
  })
  // 锁子甲与胸甲
  b.add(roundedBoxGeometry(0.36, 0.42, 0.26, 0.08, 2), C.guardSteel, { position: [0, 0.98, 0] })
  b.add(roundedBoxGeometry(0.3, 0.3, 0.06, 0.03, 1), C.clothRed, { position: [0, 0.98, 0.15] })
  b.add(new THREE.TorusGeometry(0.16, 0.05, 4, 12), C.guardSteelDark, { position: [0, 1.2, 0], rotation: [Math.PI / 2, 0, 0] })
  if (spear) {
    b.add(new THREE.CylinderGeometry(0.032, 0.032, 2.1, 5), C.woodDark, { position: [0.34, 1.05, 0.02], rotation: [0, 0, 0.06] })
    b.add(new THREE.ConeGeometry(0.075, 0.34, 5), C.guardSteel, { position: [0.4, 2.24, 0.02] })
    b.add(roundedBoxGeometry(0.16, 0.24, 0.03, 0.01, 1), C.clothRed, { position: [0.4, 1.95, 0.02] })
  }
  // 腰间的剑
  b.add(roundedBoxGeometry(0.06, 0.62, 0.05, 0.02, 1), C.guardSteelDark, { position: [-0.3, 0.62, 0.02], rotation: [0, 0, 0.18] })
  b.add(roundedBoxGeometry(0.16, 0.05, 0.05, 0.02, 1), C.gold, { position: [-0.26, 0.92, 0.02] })
  return finish(b, {
    id: 'guard',
    name: '卫兵',
    role: '城墙与城门的守望者',
    quote: '日落之前不许任何人过桥——这是国王的命令。',
  }, pos, rotY)
}

export function makeCook(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.08,
    robe: C.clothCream,
    legs: C.woodDark,
    sleeves: C.clothCream,
    trim: C.clothRed,
    hair: C.woodDark,
    hairStyle: 'chef',
    beard: undefined,
  })
  // 围裙
  b.add(roundedBoxGeometry(0.42, 0.62, 0.08, 0.04, 1), C.clothCream, { position: [0, 0.72, 0.24] })
  b.add(roundedBoxGeometry(0.1, 0.3, 0.04, 0.02, 1), C.clothCream, { position: [0, 1.1, 0.16], rotation: [0.3, 0, 0] })
  // 长柄勺
  b.add(new THREE.CylinderGeometry(0.028, 0.028, 0.85, 5), C.woodLight, { position: [0.36, 0.95, 0.14], rotation: [0.4, 0, -0.35] })
  b.add(new THREE.SphereGeometry(0.11, 8, 6, 0, Math.PI * 2, 0, Math.PI / 1.6), C.guardSteelDark, {
    position: [0.5, 0.62, 0.3],
    rotation: [Math.PI, 0, 0],
  })
  return finish(b, {
    id: 'cook',
    name: '厨师',
    role: '厨房与面包房的主人',
    quote: '面包要等它自己发起来，急不得。',
  }, pos, rotY)
}

export function makeAstronomer(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.1,
    robe: C.clothBlue,
    legs: C.clothBlue,
    sleeves: C.clothBlue,
    trim: C.gold,
    hair: C.clothCream,
    hairStyle: 'bald',
    beard: C.clothCream,
  })
  // 缀满星星的长袍
  for (let i = 0; i < 14; i++) {
    const a = _random() * Math.PI * 2
    const yy = 0.4 + _random() * 0.7
    b.add(new THREE.IcosahedronGeometry(0.032, 0), C.gold, {
      position: [Math.cos(a) * 0.26, yy, Math.sin(a) * 0.26],
    })
  }
  // 尖顶帽
  b.add(new THREE.ConeGeometry(0.22, 0.62, 10), C.clothBlue, { position: [0, 1.72, 0], rotation: [0.12, 0, 0.1] })
  b.add(new THREE.TorusGeometry(0.22, 0.04, 4, 12), C.gold, { position: [0, 1.44, 0], rotation: [Math.PI / 2, 0, 0] })
  b.add(new THREE.IcosahedronGeometry(0.05, 0), C.gold, { position: [0.06, 2.0, 0.02] })
  // 手里的星盘
  b.add(new THREE.TorusGeometry(0.16, 0.025, 4, 16), C.goldDeep, { position: [0.34, 0.95, 0.16], rotation: [0.5, 0.3, 0] })
  b.add(new THREE.TorusGeometry(0.11, 0.02, 4, 14), C.gold, { position: [0.34, 0.95, 0.16], rotation: [0.9, 0.3, 0.4] })
  return finish(b, {
    id: 'astronomer',
    name: '天文学家',
    role: '书房与星象室的守望者',
    quote: '那颗小行星只被望远镜看见过一次，编号是 B-612。',
  }, pos, rotY)
}

export function makeMinstrel(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.0,
    robe: C.roofDeep,
    legs: C.woodDark,
    sleeves: C.roofDeep,
    trim: C.gold,
    hair: C.woodDark,
    hairStyle: 'beret',
  })
  // 鲁特琴
  b.add(new THREE.SphereGeometry(0.22, 12, 10), C.woodLight, { position: [0.24, 0.86, 0.16], scale: [1, 0.55, 1.25] })
  b.add(roundedBoxGeometry(0.08, 0.5, 0.06, 0.02, 1), C.woodDark, { position: [0.34, 1.16, 0.06], rotation: [0, 0, -0.5] })
  b.add(new THREE.TorusGeometry(0.07, 0.02, 4, 10), C.woodDark, { position: [0.24, 0.88, 0.3] })
  for (let i = 0; i < 3; i++) {
    b.add(roundedBoxGeometry(0.012, 0.42, 0.012, 0.004, 1), C.clothCream, {
      position: [0.28 + i * 0.02, 1.02, 0.14],
      rotation: [0, 0, -0.5],
    })
  }
  return finish(b, {
    id: 'minstrel',
    name: '吟游诗人',
    role: '大厅里的歌者',
    quote: '我唱的都是远方的事，越远越好听。',
  }, pos, rotY)
}

export function makeLady(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.0,
    robe: C.leafRose,
    legs: C.leafRose,
    sleeves: C.clothCream,
    trim: C.gold,
    hair: C.woodDark,
    hairStyle: 'bun',
  })
  b.add(new THREE.SphereGeometry(0.36, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), C.leafRose, {
    position: [0, 0.6, 0],
    scale: [1, 0.7, 1],
  })
  // 托盘与杯子
  b.add(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 12), C.goldDeep, { position: [0.28, 0.98, 0.2] })
  b.add(new THREE.CylinderGeometry(0.07, 0.1, 0.18, 8), C.gold, { position: [0.24, 1.09, 0.2] })
  b.add(new THREE.CylinderGeometry(0.07, 0.1, 0.18, 8), C.gold, { position: [0.36, 1.09, 0.2] })
  return finish(b, {
    id: 'lady',
    name: '侍女',
    role: '大厅与寝室的照料者',
    quote: '殿下的玫瑰今晚也要罩上玻璃罩。',
  }, pos, rotY)
}

export function makeMerchant(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.06,
    robe: C.grassDry,
    legs: C.woodDark,
    sleeves: C.grassDry,
    trim: C.woodDark,
    hair: C.woodDark,
    hairStyle: 'hat',
    beard: C.woodDark,
  })
  b.add(roundedBoxGeometry(0.3, 0.34, 0.24, 0.08, 2), C.woodDark, { position: [0.3, 0.78, 0.1] })
  b.add(new THREE.TorusGeometry(0.1, 0.025, 4, 12), C.gold, { position: [0.3, 0.98, 0.1] })
  for (let i = 0; i < 4; i++) {
    b.add(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 10), C.gold, { position: [0.24 + (i % 2) * 0.12, 0.7 + Math.floor(i / 2) * 0.05, 0.28] })
  }
  return finish(b, {
    id: 'merchant',
    name: '商人',
    role: '市集上的杂货贩',
    quote: '我卖的是节省时间的药丸，一周能省下五十三分钟。',
  }, pos, rotY)
}

export function makeLamplighter(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.0,
    robe: C.guardSteelDark,
    legs: C.woodDark,
    sleeves: C.guardSteelDark,
    trim: C.gold,
    hair: C.woodDark,
    hairStyle: 'short',
  })
  // 长杆与灯
  b.add(new THREE.CylinderGeometry(0.03, 0.03, 1.9, 5), C.woodDark, { position: [0.32, 1.0, 0.06], rotation: [0.15, 0, -0.12] })
  b.add(roundedBoxGeometry(0.22, 0.28, 0.22, 0.05, 1), C.gold, { position: [0.44, 2.0, 0.16] })
  b.add(new THREE.ConeGeometry(0.16, 0.16, 4), C.roofDeep, { position: [0.44, 2.2, 0.16] })
  const glow = new Batcher()
  glow.add(roundedBoxGeometry(0.14, 0.2, 0.14, 0.03, 1), C.lampGlow, { position: [0.44, 2.0, 0.16] })
  const group = new THREE.Group()
  const glowMesh = glow.build(toonMaterial({ emissive: C.lampGlow, emissiveIntensity: 1.2 }))
  if (glowMesh) group.add(glowMesh)
  return finish(b, {
    id: 'lamplighter',
    name: '点灯人',
    role: '黄昏时点亮全岛的灯',
    quote: '命令就是命令，天黑了就要点灯。',
  }, pos, rotY, { group })
}

export function makeShepherd(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 1.02,
    robe: C.grassDeep,
    legs: C.woodDark,
    sleeves: C.grassDeep,
    trim: C.woodDark,
    hair: C.woodDark,
    hairStyle: 'hood',
  })
  b.add(new THREE.CylinderGeometry(0.035, 0.035, 1.8, 5), C.wood, { position: [0.32, 0.9, 0.04], rotation: [0, 0, -0.1] })
  b.add(new THREE.TorusGeometry(0.09, 0.03, 4, 10, Math.PI * 1.4), C.wood, { position: [0.36, 1.82, 0.04], rotation: [0, 0, -0.6] })
  return finish(b, {
    id: 'shepherd',
    name: '牧羊人',
    role: '岛上的牧人',
    quote: '羊群认得路，我只要跟着它们走。',
  }, pos, rotY)
}

export function makeChild(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  buildPerson(b, {
    scale: 0.72,
    robe: C.gold,
    legs: C.clothBlue,
    sleeves: C.gold,
    trim: C.clothRed,
    hair: C.woodDark,
    hairStyle: 'short',
  })
  // 手里的小木马
  b.add(roundedBoxGeometry(0.2, 0.12, 0.34, 0.05, 1), C.woodLight, { position: [0.26, 0.72, 0.14] })
  b.add(new THREE.ConeGeometry(0.06, 0.18, 5), C.woodLight, { position: [0.26, 0.84, 0.3], rotation: [Math.PI / 2.4, 0, 0] })
  return finish(b, {
    id: 'child',
    name: '村里的孩子',
    role: '在石板路上跑来跑去',
    quote: '城堡里有五层楼，我数过很多次。',
  }, pos, rotY)
}

export function makeHorse(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  const coat = 0x9a6b45
  const mane = C.woodDark
  b.add(new THREE.SphereGeometry(0.42, 12, 10), coat, { position: [0, 0.86, 0], scale: [0.72, 0.85, 1.5] })
  b.add(new THREE.CylinderGeometry(0.16, 0.22, 0.72, 8), coat, { position: [0, 1.24, 0.5], rotation: [0.7, 0, 0] })
  b.add(new THREE.SphereGeometry(0.19, 10, 8), coat, { position: [0, 1.52, 0.78], scale: [0.8, 0.9, 1.35] })
  for (const s of [-1, 1]) {
    b.add(new THREE.ConeGeometry(0.06, 0.16, 5), coat, { position: [s * 0.1, 1.68, 0.68] })
    b.add(new THREE.SphereGeometry(0.028, 5, 4), C.ink, { position: [s * 0.1, 1.56, 0.9] })
  }
  b.add(new THREE.SphereGeometry(0.05, 6, 5), C.ink, { position: [0, 1.48, 1.02] })
  for (let i = 0; i < 7; i++) {
    b.add(roundedBoxGeometry(0.06, 0.24 - i * 0.02, 0.1, 0.03, 1), mane, {
      position: [0, 1.5 - i * 0.09, 0.42 + i * 0.06],
      rotation: [0.5 + i * 0.06, 0, 0],
    })
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(new THREE.CylinderGeometry(0.075, 0.06, 0.86, 6), coat, { position: [sx * 0.22, 0.43, sz * 0.42] })
      b.add(roundedBoxGeometry(0.14, 0.1, 0.18, 0.03, 1), C.ink, { position: [sx * 0.22, 0.05, sz * 0.44] })
    }
  }
  const tail: THREE.Vector3[] = []
  for (let i = 0; i <= 5; i++) {
    const t = i / 5
    tail.push(new THREE.Vector3(0, 1.05 - t * 0.5, -0.6 - t * 0.22))
  }
  b.add(tubeAlong(tail, 0.07, 16, 5), mane)
  return finish(b, {
    id: 'horse',
    name: '马',
    role: '马厩里的老伙计',
    quote: '它不喜欢吊桥放下来的声音。',
  }, pos, rotY)
}

export function makeCat(pos: THREE.Vector3, rotY = 0): Character {
  const b = new Batcher()
  const fur = C.guardSteel
  b.add(new THREE.SphereGeometry(0.19, 10, 8), fur, { position: [0, 0.22, 0], scale: [0.85, 0.85, 1.3] })
  b.add(new THREE.SphereGeometry(0.14, 10, 8), fur, { position: [0, 0.36, 0.22] })
  for (const s of [-1, 1]) {
    b.add(new THREE.ConeGeometry(0.055, 0.12, 4), fur, { position: [s * 0.08, 0.48, 0.2] })
    b.add(new THREE.ConeGeometry(0.03, 0.07, 4), C.leafRose, { position: [s * 0.08, 0.47, 0.21] })
    b.add(new THREE.SphereGeometry(0.022, 5, 4), C.gold, { position: [s * 0.055, 0.38, 0.34] })
    b.add(new THREE.CylinderGeometry(0.035, 0.03, 0.18, 5), fur, { position: [s * 0.1, 0.09, 0.12] })
    b.add(new THREE.CylinderGeometry(0.035, 0.03, 0.18, 5), fur, { position: [s * 0.1, 0.09, -0.12] })
  }
  const tail: THREE.Vector3[] = []
  for (let i = 0; i <= 5; i++) {
    const t = i / 5
    tail.push(new THREE.Vector3(0, 0.24 + Math.sin(t * 2.4) * 0.24, -0.22 - t * 0.3))
  }
  b.add(tubeAlong(tail, 0.035, 14, 5), fur)
  return finish(b, {
    id: 'cat',
    name: '厨房的猫',
    role: '守着面包炉取暖',
    quote: '它只在有火的时候出现。',
  }, pos, rotY)
}

/* ------------------------------------------------------------------ */
/* 飞鸟                                                                */
/* ------------------------------------------------------------------ */

export type Flock = { group: THREE.Group; tick: (t: number) => void }

export function makeFlock(count = 9, radius = 46, centerY = 26): Flock {
  const group = new THREE.Group()
  const birds: Array<{ mesh: THREE.Mesh; r: number; a: number; y: number; speed: number; phase: number }> = []
  const mat = toonMaterial({})
  for (let i = 0; i < count; i++) {
    const b = new Batcher()
    b.add(new THREE.SphereGeometry(0.16, 7, 6), C.clothCream, { scale: [0.8, 0.8, 1.5] })
    b.add(new THREE.ConeGeometry(0.06, 0.16, 4), C.gold, { position: [0, 0, 0.24], rotation: [Math.PI / 2, 0, 0] })
    const wingGeo = roundedBoxGeometry(0.62, 0.05, 0.26, 0.02, 1)
    b.add(wingGeo, C.clothCream, { position: [0.32, 0.04, 0] })
    b.add(wingGeo, C.clothCream, { position: [-0.32, 0.04, 0] })
    const mesh = b.build(mat)
    if (!mesh) continue
    mesh.castShadow = false
    group.add(mesh)
    birds.push({
      mesh,
      r: radius + (Math.random() - 0.5) * 16,
      a: Math.random() * Math.PI * 2,
      y: centerY + (Math.random() - 0.5) * 12,
      speed: 0.09 + Math.random() * 0.07,
      phase: Math.random() * Math.PI * 2,
    })
  }
  return {
    group,
    tick(t) {
      for (const bird of birds) {
        bird.a += bird.speed * 0.016
        const x = Math.cos(bird.a) * bird.r
        const z = Math.sin(bird.a) * bird.r
        bird.mesh.position.set(x, bird.y + Math.sin(t * 0.7 + bird.phase) * 1.6, z)
        bird.mesh.rotation.y = -bird.a + Math.PI / 2
        bird.mesh.rotation.z = Math.sin(t * 7 + bird.phase) * 0.35
      }
    },
  }
}

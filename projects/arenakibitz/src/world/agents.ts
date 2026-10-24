import * as THREE from 'three'
import { RESIDENTS, type ResidentSpec } from './data'
import { box, cylinder, mesh, standard } from './geometry'

export type AgentState =
  | '工作' | '回家' | '休息' | '交谈' | '巡逻' | '避雨' | '观星'
  | '用餐' | '漫步' | '回应你' | '好奇' | '照料' | '采集' | '演奏'

export interface Agent {
  spec: ResidentSpec
  root: THREE.Group
  leftArm: THREE.Group
  rightArm: THREE.Group
  leftLeg: THREE.Group
  rightLeg: THREE.Group
  head: THREE.Group
  target: THREE.Vector3
  state: AgentState
  activity: string
  timer: number
  speed: number
  energy: number
  walkPhase: number
  routeIndex: number
  lineIndex: number
  talkingTo: string | null
  wave: number
  arrived: boolean
}

interface Sheep {
  root: THREE.Group
  head: THREE.Group
  target: THREE.Vector3
  state: '吃草' | '漫步' | '休息' | '受惊'
  timer: number
  phase: number
  speed: number
}

export interface AgentSnapshot {
  id: string
  state: AgentState
  activity: string
  energy: number
  line: string
  position: [number, number, number]
}

export interface PopulationContext {
  hour: number
  rain: number
  wind: number
  paused: boolean
}

const skinTones = ['#d8ae8b', '#c89778', '#e1b998', '#b9856a']
const hairTones = ['#5c4638', '#7b5b3e', '#a47c50', '#4a4140', '#8a6d55']

function limb(parent: THREE.Object3D, x: number, y: number, material: THREE.Material, length: number, arm = false) {
  const pivot = new THREE.Group()
  pivot.position.set(x, y, 0)
  parent.add(pivot)
  cylinder(pivot, arm ? 0.065 : 0.075, arm ? 0.055 : 0.065, length, 6, [0, -length / 2, 0], material)
  if (!arm) box(pivot, [0.14, 0.09, 0.25], [0, -length - 0.015, 0.06], standard('#55493e'))
  return pivot
}

function roleAccessory(root: THREE.Group, spec: ResidentSpec, head: THREE.Group, rightArm: THREE.Group) {
  const role = spec.role
  if (role.includes('看守') || role.includes('卫兵')) {
    const helmet = cylinder(head, 0.2, 0.23, 0.2, 8, [0, 0.17, 0], standard('#788084', 0.45, 0.35))
    helmet.scale.z = 1.05
    box(head, [0.055, 0.25, 0.05], [0, 0.12, 0.22], standard('#697174', 0.45, 0.35))
    const spear = cylinder(root, 0.025, 0.025, 1.75, 5, [0.43, 0.9, 0], standard('#6b503b'))
    spear.rotation.z = -0.08
    mesh(new THREE.ConeGeometry(0.07, 0.22, 5), standard('#929b9a', 0.4, 0.4), root, [0.5, 1.8, 0])
  } else if (role.includes('园丁') || role.includes('牧羊') || role.includes('采药')) {
    cylinder(head, 0.34, 0.34, 0.045, 12, [0, 0.19, 0], standard('#b49a67'))
    cylinder(head, 0.18, 0.22, 0.2, 10, [0, 0.29, 0], standard('#aa8d5e'))
    if (role.includes('牧羊')) cylinder(root, 0.025, 0.035, 1.55, 6, [0.38, 0.75, 0], standard('#766044'), [0, 0, -0.15])
  } else if (role.includes('星象')) {
    cylinder(head, 0.03, 0.22, 0.45, 9, [0, 0.34, 0], standard('#4b5f82'))
    mesh(new THREE.SphereGeometry(0.045, 6, 5), standard('#d0b466'), head, [0, 0.59, 0])
    box(rightArm, [0.28, 0.06, 0.38], [0.12, -0.48, 0.12], standard('#d7c9a7'), [0.2, 0, 0.2])
  } else if (role.includes('抄写') || role.includes('岛务') || role.includes('地图')) {
    box(rightArm, [0.3, 0.06, 0.4], [0.1, -0.47, 0.13], standard('#d9caa8'), [0.25, 0, 0.15])
  } else if (role.includes('面包')) {
    cylinder(head, 0.22, 0.25, 0.18, 9, [0, 0.24, 0], standard('#e5dbc5'))
    const bread = mesh(new THREE.SphereGeometry(0.17, 8, 5), standard('#b9824d'), rightArm, [0.1, -0.53, 0.18])
    bread.scale.set(1, 0.55, 1.4)
  } else if (role.includes('铁匠') || role.includes('石匠')) {
    box(rightArm, [0.28, 0.14, 0.14], [0.05, -0.55, 0], standard('#626968', 0.45, 0.35))
    cylinder(rightArm, 0.035, 0.035, 0.5, 6, [0.05, -0.36, 0], woodMaterial())
  } else if (role.includes('吟游')) {
    const lute = mesh(new THREE.SphereGeometry(0.22, 9, 6), standard('#a87745'), root, [0.28, 0.78, 0.18])
    lute.scale.set(0.75, 1, 0.35)
    box(root, [0.08, 0.65, 0.07], [0.28, 1.15, 0.18], standard('#755034'), [0, 0, -0.2])
  } else if (role.includes('守灯')) {
    const lantern = mesh(new THREE.OctahedronGeometry(0.14, 0), new THREE.MeshStandardMaterial({ color: '#d6b36c', emissive: '#e9a855', emissiveIntensity: 0.7 }), rightArm, [0, -0.58, 0])
    lantern.castShadow = false
  }
}

function woodMaterial() {
  return standard('#6f513b')
}

function createPerson(spec: ResidentSpec, index: number) {
  const root = new THREE.Group()
  root.name = spec.name
  const bodyMat = standard(spec.color)
  const accentMat = standard(spec.accent)
  const body = cylinder(root, 0.23, 0.34, 0.75, 8, [0, 0.95, 0], bodyMat)
  body.scale.z = 0.82
  cylinder(root, 0.25, 0.29, 0.12, 8, [0, 0.57, 0], accentMat)
  const head = new THREE.Group()
  head.position.set(0, 1.52, 0)
  root.add(head)
  const face = mesh(new THREE.SphereGeometry(0.215, 10, 7), standard(skinTones[index % skinTones.length]), head)
  face.scale.set(0.9, 1.05, 0.92)
  const hair = mesh(new THREE.SphereGeometry(0.222, 9, 6, 0, Math.PI * 2, 0, Math.PI * 0.52), standard(hairTones[index % hairTones.length]), head, [0, 0.055, -0.01])
  hair.scale.set(0.96, 1, 0.96)
  for (const x of [-0.075, 0.075]) {
    const eye = mesh(new THREE.SphereGeometry(0.016, 5, 4), new THREE.MeshBasicMaterial({ color: '#3f4140' }), head, [x, 0.025, 0.198])
    eye.castShadow = false
  }
  const nose = mesh(new THREE.ConeGeometry(0.025, 0.07, 5), standard(skinTones[index % skinTones.length]), head, [0, -0.025, 0.22], [Math.PI / 2, 0, 0])
  nose.castShadow = false
  const leftArm = limb(root, -0.28, 1.22, bodyMat, 0.58, true)
  const rightArm = limb(root, 0.28, 1.22, bodyMat, 0.58, true)
  const leftLeg = limb(root, -0.13, 0.58, standard('#544f52'), 0.5)
  const rightLeg = limb(root, 0.13, 0.58, standard('#544f52'), 0.5)
  roleAccessory(root, spec, head, rightArm)
  root.scale.setScalar(0.82 + (index % 4) * 0.025)
  root.traverse((child) => {
    child.userData.residentId = spec.id
  })
  return { root, head, leftArm, rightArm, leftLeg, rightLeg }
}

function createSheep(index: number) {
  const root = new THREE.Group()
  const wool = standard(index % 3 === 0 ? '#d7d3c5' : '#e8e2d2')
  const body = mesh(new THREE.IcosahedronGeometry(0.43, 1), wool, root, [0, 0.52, 0])
  body.scale.set(1.2, 0.85, 0.85)
  for (const p of [[-0.28, 0.68, 0.12], [0.05, 0.78, -0.15], [0.3, 0.65, 0.1]] as [number, number, number][]) {
    mesh(new THREE.IcosahedronGeometry(0.25, 1), wool, root, p)
  }
  const head = new THREE.Group()
  head.position.set(0.53, 0.54, 0)
  root.add(head)
  const face = mesh(new THREE.IcosahedronGeometry(0.22, 1), standard('#73685c'), head)
  face.scale.set(1.1, 0.9, 0.8)
  for (const z of [-0.17, 0.17]) {
    const ear = mesh(new THREE.ConeGeometry(0.08, 0.25, 5), standard('#73685c'), head, [-0.02, 0.12, z], [Math.PI / 2, 0, 0])
    ear.scale.z = 0.6
  }
  for (const x of [-0.28, 0.28]) for (const z of [-0.22, 0.22]) cylinder(root, 0.045, 0.05, 0.43, 5, [x, 0.22, z], standard('#655d53'))
  root.scale.setScalar(0.85 + (index % 3) * 0.08)
  return { root, head }
}

export class Population {
  readonly group = new THREE.Group()
  readonly agents: Agent[] = []
  readonly sheep: Sheep[] = []
  private socialClock = 0

  constructor() {
    this.group.name = '岛屿居民与羊群'
    RESIDENTS.forEach((spec, index) => {
      const model = createPerson(spec, index)
      const start = new THREE.Vector3(...(index % 3 === 0 ? spec.home : spec.work))
      start.x += Math.sin(index * 2.1) * 0.25
      start.z += Math.cos(index * 1.7) * 0.25
      model.root.position.copy(start)
      this.group.add(model.root)
      this.agents.push({
        spec,
        ...model,
        target: start.clone(),
        state: '漫步',
        activity: '刚刚开始这一天',
        timer: index * 0.17,
        speed: 0.65 + (index % 5) * 0.07,
        energy: 0.65 + (index % 4) * 0.08,
        walkPhase: index,
        routeIndex: index % 4,
        lineIndex: 0,
        talkingTo: null,
        wave: 0,
        arrived: false,
      })
    })
    for (let i = 0; i < 8; i++) {
      const model = createSheep(i)
      model.root.position.set(-11.5 + (i % 4) * 1.05, 0.15, -9.2 + Math.floor(i / 4) * 1.3)
      this.group.add(model.root)
      this.sheep.push({
        ...model,
        target: model.root.position.clone(),
        state: '吃草',
        timer: 2 + i * 0.7,
        phase: i,
        speed: 0.35 + (i % 3) * 0.06,
      })
    }
  }

  private workActivity(agent: Agent): { state: AgentState; activity: string } {
    const role = agent.spec.role
    if (role.includes('卫兵') || role.includes('看守')) return { state: '巡逻', activity: role.includes('看守') ? '检查吊桥与门闩' : '沿城墙检查垛口' }
    if (role.includes('星象')) return { state: '观星', activity: '校准星盘与风向仪' }
    if (role.includes('园丁')) return { state: '照料', activity: '查看玫瑰与药草木牌' }
    if (role.includes('采药')) return { state: '采集', activity: '整理干燥的药草' }
    if (role.includes('吟游')) return { state: '演奏', activity: '为井边的听众弹琴' }
    if (role.includes('面包')) return { state: '工作', activity: '照看炉中的黑麦面包' }
    if (role.includes('磨坊')) return { state: '工作', activity: '倾听水轮并筛选新麦粉' }
    if (role.includes('铁匠')) return { state: '工作', activity: '修复温室的细铰链' }
    if (role.includes('石匠')) return { state: '工作', activity: '检查北坡石埂的裂缝' }
    if (role.includes('抄写')) return { state: '工作', activity: '把口述补充进岛屿地图' }
    if (role.includes('岛务')) return { state: '工作', activity: '核对水位与储粮记录' }
    if (role.includes('守灯')) return { state: '工作', activity: '整理彩窗下的许愿木牌' }
    if (role.includes('牧羊')) return { state: '照料', activity: '清点羊群与休耕花带' }
    if (role.includes('信使')) return { state: '工作', activity: '喂马并整理待送的口信' }
    return { state: '工作', activity: '练习手艺并修改秘密地图' }
  }

  private setGoal(agent: Agent, target: [number, number, number], state: AgentState, activity: string, duration = 8) {
    agent.target.set(...target)
    agent.state = state
    agent.activity = activity
    agent.timer = duration + Math.random() * 6
    agent.arrived = false
    agent.talkingTo = null
  }

  private decide(agent: Agent, context: PopulationContext) {
    const { hour, rain } = context
    const id = agent.spec.id
    if (rain > 0.5 && !['otto', 'mael', 'elwin'].includes(id) && agent.root.position.y < 2) {
      const shelters: [number, number, number][] = [[-1, 0.35, 4.15], [1.8, 0.35, 1.2], [-6.2, 0.35, 0.4]]
      const shelter = shelters[Math.floor(Math.random() * shelters.length)]
      shelter[0] += (Math.random() - 0.5) * 0.8
      this.setGoal(agent, shelter, '避雨', '在檐下等这阵雨过去', 10)
      return
    }
    if (hour >= 22 || hour < 5.5) {
      if (id === 'elwin') {
        this.setGoal(agent, agent.spec.work, '观星', '记录浮岛今夜的航向', 15)
      } else if (id === 'mael' || id === 'otto') {
        this.patrol(agent)
      } else {
        this.setGoal(agent, agent.spec.home, '回家', '沿着灯火回家休息', 14)
      }
      return
    }
    if (hour >= 11.5 && hour < 13.2 && !['mael', 'otto', 'elwin'].includes(id)) {
      const index = RESIDENTS.indexOf(agent.spec)
      const target: [number, number, number] = index % 2 === 0
        ? [1.1 + (index % 4) * 0.65, 0.35, -0.3 + Math.floor(index / 4) * 0.45]
        : [-2.7 + (index % 5) * 0.65, 0.35, 2.3 + Math.floor(index / 5) * 0.35]
      this.setGoal(agent, target, '用餐', '与大家分食面包和热汤', 12)
      return
    }
    if (hour >= 18.2 && hour < 21.5 && !['mael', 'elwin'].includes(id)) {
      if (Math.random() < 0.68) {
        const angle = Math.random() * Math.PI * 2
        this.setGoal(agent, [-1.5 + Math.cos(angle) * 2.1, 0.35, 2.4 + Math.sin(angle) * 1.25], Math.random() < 0.35 ? '演奏' : '漫步', '在庭院里度过晚餐后的时光', 10)
      } else this.setGoal(agent, agent.spec.home, '回家', '带着一天的见闻回家', 12)
      return
    }
    if (id === 'mael' || id === 'otto') {
      this.patrol(agent)
      return
    }
    const work = this.workActivity(agent)
    const target = [...agent.spec.work] as [number, number, number]
    if (agent.root.position.y < 2 && !['sophia', 'rosalind', 'elwin'].includes(id)) {
      target[0] += (Math.random() - 0.5) * 1.25
      target[2] += (Math.random() - 0.5) * 1.25
    }
    this.setGoal(agent, target, work.state, work.activity, 9)
  }

  private patrol(agent: Agent) {
    const routes: [number, number, number][] = agent.spec.id === 'mael'
      ? [[4.55, 3.55, 4], [4.55, 3.55, -4.4], [-7.55, 3.55, -4.4], [-7.55, 3.55, 4]]
      : [[-1.6, 0.35, 5.7], [-0.2, 0.35, 5.4], [-1.2, 0.35, 3.8], [-2.2, 0.35, 4.2]]
    agent.routeIndex = (agent.routeIndex + 1) % routes.length
    this.setGoal(agent, routes[agent.routeIndex], '巡逻', agent.spec.id === 'mael' ? '沿城墙检查灯火与垛口' : '查看吊桥、门闩与来往粮车', 8)
  }

  update(dt: number, context: PopulationContext) {
    if (context.paused) return
    this.socialClock -= dt
    const checkSocial = this.socialClock <= 0
    if (checkSocial) this.socialClock = 0.45
    for (const agent of this.agents) {
      agent.timer -= dt
      agent.wave = Math.max(0, agent.wave - dt)
      if (agent.timer <= 0 && !['交谈', '回应你', '好奇'].includes(agent.state)) this.decide(agent, context)
      if ((agent.state === '交谈' || agent.state === '回应你' || agent.state === '好奇') && agent.timer <= 0) this.decide(agent, context)
      const delta = agent.target.clone().sub(agent.root.position)
      const horizontalDistance = Math.hypot(delta.x, delta.z)
      const distance = delta.length()
      const stationary = ['休息', '交谈', '避雨', '观星', '用餐', '回应你', '好奇', '照料', '采集', '演奏'].includes(agent.state) && agent.arrived
      if (distance > 0.12 && !['交谈', '回应你', '好奇'].includes(agent.state)) {
        const speed = agent.speed * (agent.state === '避雨' ? 1.35 : agent.energy < 0.25 ? 0.65 : 1)
        const step = Math.min(distance, speed * dt)
        agent.root.position.addScaledVector(delta.normalize(), step)
        if (horizontalDistance > 0.05) agent.root.rotation.y = Math.atan2(delta.x, delta.z)
        agent.walkPhase += dt * speed * 8
        agent.arrived = false
      } else {
        if (!agent.arrived) {
          agent.arrived = true
          if (agent.state === '回家') {
            agent.state = '休息'
            agent.activity = '在家中休息，恢复精力'
            agent.timer = 9 + Math.random() * 9
          }
        }
        agent.walkPhase += dt * 1.4
      }
      agent.energy = THREE.MathUtils.clamp(agent.energy + (agent.state === '休息' ? dt * 0.012 : -dt * 0.0008), 0.1, 1)
      const moving = distance > 0.15 && !stationary && !['交谈', '回应你', '好奇'].includes(agent.state)
      const swing = moving ? Math.sin(agent.walkPhase) * 0.55 : Math.sin(agent.walkPhase * 0.4) * 0.035
      agent.leftArm.rotation.x = swing
      agent.rightArm.rotation.x = agent.wave > 0 ? -1.9 + Math.sin(agent.wave * 10) * 0.3 : -swing
      agent.rightArm.rotation.z = agent.wave > 0 ? -0.65 : 0
      agent.leftLeg.rotation.x = -swing * 0.75
      agent.rightLeg.rotation.x = swing * 0.75
      agent.head.rotation.y = Math.sin(agent.walkPhase * 0.17) * 0.08
      // Keep the simulation position stable; walking is expressed by the articulated limbs.
      agent.root.scale.y = (0.82 + (RESIDENTS.indexOf(agent.spec) % 4) * 0.025) * (1 + Math.sin(agent.walkPhase * 2) * (moving ? 0.012 : 0.002))
    }
    if (checkSocial) this.handleSocial()
    this.updateSheep(dt)
  }

  private handleSocial() {
    for (let i = 0; i < this.agents.length; i++) {
      const a = this.agents[i]
      if (!a.arrived || a.root.position.y > 2 || ['避雨', '回应你', '好奇'].includes(a.state)) continue
      for (let j = i + 1; j < this.agents.length; j++) {
        const b = this.agents[j]
        if (!b.arrived || b.root.position.y > 2 || b.state === '避雨') continue
        if (a.root.position.distanceToSquared(b.root.position) < 1.2 && Math.random() < 0.16) {
          a.state = '交谈'
          b.state = '交谈'
          a.activity = `正与${b.spec.name}谈论岛上的日常`
          b.activity = `正听${a.spec.name}说话`
          a.timer = b.timer = 3 + Math.random() * 4
          a.talkingTo = b.spec.id
          b.talkingTo = a.spec.id
          a.root.lookAt(b.root.position.x, a.root.position.y, b.root.position.z)
          b.root.lookAt(a.root.position.x, b.root.position.y, a.root.position.z)
          break
        }
      }
    }
  }

  private updateSheep(dt: number) {
    for (const sheep of this.sheep) {
      sheep.timer -= dt
      if (sheep.timer <= 0) {
        if (sheep.state === '受惊') sheep.state = '吃草'
        const choice = Math.random()
        sheep.state = choice < 0.5 ? '吃草' : choice < 0.78 ? '漫步' : '休息'
        sheep.timer = 3 + Math.random() * 7
        if (sheep.state === '漫步') {
          sheep.target.set(-11 + Math.random() * 5, 0.16, -10.5 + Math.random() * 4.5)
        }
      }
      const delta = sheep.target.clone().sub(sheep.root.position)
      delta.y = 0
      const moving = sheep.state === '漫步' || sheep.state === '受惊'
      if (moving && delta.length() > 0.15) {
        const speed = sheep.state === '受惊' ? sheep.speed * 3.2 : sheep.speed
        sheep.root.position.addScaledVector(delta.normalize(), speed * dt)
        sheep.root.rotation.y = Math.atan2(delta.x, delta.z) + Math.PI / 2
        sheep.phase += dt * speed * 10
        sheep.root.position.y = 0.16 + Math.abs(Math.sin(sheep.phase)) * 0.025
      } else {
        sheep.root.position.y = THREE.MathUtils.lerp(sheep.root.position.y, 0.16, 0.1)
        sheep.phase += dt
      }
      sheep.head.rotation.z = sheep.state === '吃草' ? -0.75 + Math.sin(sheep.phase * 2) * 0.12 : Math.sin(sheep.phase) * 0.06
    }
  }

  reactTo(point: THREE.Vector3) {
    for (const sheep of this.sheep) {
      const distance = sheep.root.position.distanceTo(point)
      if (distance < 5) {
        const away = sheep.root.position.clone().sub(point).setY(0).normalize()
        if (away.lengthSq() < 0.1) away.set(1, 0, 0)
        sheep.target.copy(sheep.root.position).addScaledVector(away, 2.5 + Math.random() * 2)
        sheep.target.x = THREE.MathUtils.clamp(sheep.target.x, -12, -6)
        sheep.target.z = THREE.MathUtils.clamp(sheep.target.z, -11, -5.8)
        sheep.target.y = 0.16
        sheep.state = '受惊'
        sheep.timer = 2.5 + Math.random() * 2
      }
    }
    for (const agent of this.agents) {
      if (agent.root.position.y < 1 && agent.root.position.distanceTo(point) < 3.2) {
        agent.state = '好奇'
        agent.activity = '注意到你落在草地上的光点'
        agent.timer = 2.5
        agent.root.lookAt(point.x, agent.root.position.y, point.z)
      }
    }
  }

  greet(id: string) {
    const agent = this.agents.find((item) => item.spec.id === id)
    if (!agent) return
    agent.state = '回应你'
    agent.activity = '停下手边的事，向你挥手'
    agent.timer = 4
    agent.wave = 4
    agent.lineIndex = (agent.lineIndex + 1) % agent.spec.lines.length
  }

  snapshot(id: string): AgentSnapshot | null {
    const agent = this.agents.find((item) => item.spec.id === id)
    if (!agent) return null
    return {
      id: agent.spec.id,
      state: agent.state,
      activity: agent.activity,
      energy: agent.energy,
      line: agent.spec.lines[agent.lineIndex],
      position: agent.root.position.toArray(),
    }
  }

  snapshots() {
    return this.agents.map((agent) => this.snapshot(agent.spec.id)!)
  }
}

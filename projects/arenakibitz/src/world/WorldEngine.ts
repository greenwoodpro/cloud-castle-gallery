import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { buildCastle, type CastleRefs } from './castle'
import { applySeason, buildEnvironment, type EnvironmentRefs } from './environment'
import { Population, type AgentSnapshot } from './agents'
import { IslandAudio } from './audio'
import { LOCATIONS, type Season, type WeatherMode } from './data'

export interface WorldSettings {
  timeScale: number
  wind: number
  weather: WeatherMode
  season: Season
  cutaway: boolean
  autoRotate: boolean
  reducedMotion: boolean
  paused: boolean
}

export interface EngineStatus {
  hour: number
  weather: 'clear' | 'cloudy' | 'rain'
  rain: number
  fps: number
  quality: string
  residents: AgentSnapshot[]
}

interface EngineCallbacks {
  onLocation: (id: string) => void
  onResident: (id: string) => void
  onStatus: (status: EngineStatus) => void
}

interface SmokeParticle {
  source: THREE.Vector3
  age: number
  life: number
  drift: number
}

interface Pulse {
  mesh: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>
  age: number
}

export class WorldEngine {
  private container: HTMLElement
  private callbacks: EngineCallbacks
  private renderer: THREE.WebGLRenderer
  private labelRenderer: CSS2DRenderer
  private scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private resizeObserver: ResizeObserver
  private castle: CastleRefs
  private environment: EnvironmentRefs
  private population = new Population()
  private audio = new IslandAudio()
  private settings: WorldSettings = {
    timeScale: 1,
    wind: 0.35,
    weather: 'auto',
    season: '春',
    cutaway: false,
    autoRotate: false,
    reducedMotion: false,
    paused: false,
  }
  private frameId = 0
  private previousTime = performance.now()
  private elapsed = 0
  private hour = 9.15
  private currentWeather: EngineStatus['weather'] = 'clear'
  private weatherTimer = 52
  private rain = 0
  private cloudiness = 0.15
  private sun: THREE.DirectionalLight
  private hemisphere: THREE.HemisphereLight
  private sky: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>
  private sunDisc: THREE.Mesh
  private moonDisc: THREE.Mesh
  private focus: { camera: THREE.Vector3; target: THREE.Vector3 } | null = null
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2()
  private pointerDown = new THREE.Vector2()
  private labels = new Map<string, HTMLElement>()
  private pulses: Pulse[] = []
  private smoke: SmokeParticle[] = []
  private smokePoints: THREE.Points
  private smokePositions: Float32Array
  private smokeAlpha: Float32Array
  private frameCount = 0
  private frameClock = 0
  private statusClock = 0
  private fps = 60
  private pixelRatio = Math.min(window.devicePixelRatio, 1.65)
  private quality = '细腻'
  private disposed = false

  constructor(container: HTMLElement, callbacks: EngineCallbacks) {
    this.container = container
    this.callbacks = callbacks
    this.scene.fog = new THREE.FogExp2('#b8cbd0', 0.0065)
    this.camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 300)
    this.camera.position.set(28, 21, 31)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(this.pixelRatio)
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.08
    this.renderer.domElement.className = 'world-canvas'
    this.renderer.domElement.setAttribute('aria-label', '可自由旋转的云上玫瑰堡三维场景')
    container.appendChild(this.renderer.domElement)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(container.clientWidth, container.clientHeight)
    this.labelRenderer.domElement.className = 'world-label-layer'
    container.appendChild(this.labelRenderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0.5, 0)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.065
    this.controls.minDistance = 3.2
    this.controls.maxDistance = 88
    this.controls.minPolarAngle = 0.03
    this.controls.maxPolarAngle = Math.PI - 0.03
    this.controls.panSpeed = 0.7
    this.controls.rotateSpeed = 0.55
    this.controls.zoomSpeed = 0.8
    this.controls.autoRotateSpeed = 0.32
    this.controls.addEventListener('start', () => { this.focus = null })

    this.hemisphere = new THREE.HemisphereLight('#dce5dd', '#657068', 1.0)
    this.scene.add(this.hemisphere)
    this.sun = new THREE.DirectionalLight('#ffe3b5', 2.1)
    this.sun.position.set(30, 45, 22)
    this.sun.castShadow = true
    this.sun.shadow.mapSize.set(2048, 2048)
    this.sun.shadow.camera.left = -25
    this.sun.shadow.camera.right = 25
    this.sun.shadow.camera.top = 25
    this.sun.shadow.camera.bottom = -25
    this.sun.shadow.camera.near = 1
    this.sun.shadow.camera.far = 110
    this.sun.shadow.bias = -0.00025
    this.sun.shadow.normalBias = 0.025
    this.scene.add(this.sun, this.sun.target)

    const sky = this.createSky()
    this.sky = sky.mesh
    this.sunDisc = sky.sun
    this.moonDisc = sky.moon
    this.scene.add(this.sky, this.sunDisc, this.moonDisc)

    this.environment = buildEnvironment()
    this.castle = buildCastle()
    this.scene.add(this.environment.group, this.castle.group, this.population.group)
    applySeason(this.environment, this.settings.season)
    this.createLabels()
    const smoke = this.createSmoke()
    this.smokePoints = smoke.points
    this.smokePositions = smoke.positions
    this.smokeAlpha = smoke.alpha
    this.scene.add(this.smokePoints)

    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown)
    this.renderer.domElement.addEventListener('pointerup', this.onPointerUp)
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(container)
    this.frameId = requestAnimationFrame(this.animate)
  }

  private createSky() {
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uDay: { value: 1 },
        uDusk: { value: 0 },
      },
      vertexShader: `
        varying vec3 vDirection;
        void main() {
          vDirection = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uDay;
        uniform float uDusk;
        varying vec3 vDirection;
        float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
        void main() {
          float h = clamp(vDirection.y * 0.5 + 0.5, 0.0, 1.0);
          vec3 nightLow = vec3(0.12, 0.17, 0.26);
          vec3 nightHigh = vec3(0.035, 0.065, 0.15);
          vec3 dayLow = vec3(0.79, 0.84, 0.79);
          vec3 dayHigh = vec3(0.39, 0.61, 0.72);
          vec3 night = mix(nightLow, nightHigh, smoothstep(0.12, 0.95, h));
          vec3 day = mix(dayLow, dayHigh, smoothstep(0.05, 0.95, h));
          vec3 col = mix(night, day, uDay);
          vec3 dusk = vec3(0.91, 0.59, 0.43);
          col = mix(col, dusk, uDusk * pow(1.0 - h, 2.0) * 0.7);
          vec3 cell = floor(vDirection * 430.0);
          float starHash = hash(cell);
          float star = smoothstep(0.9965, 1.0, starHash);
          float twinkle = 0.65 + sin(uTime * 1.4 + starHash * 30.0) * 0.35;
          col += star * twinkle * (1.0 - uDay) * vec3(0.95, 0.88, 0.66);
          float band = pow(max(0.0, 1.0 - abs(vDirection.x * 0.7 + vDirection.y * 0.45 - vDirection.z * 0.2)), 18.0);
          col += band * (1.0 - uDay) * vec3(0.035, 0.04, 0.075);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(135, 32, 20), material)
    mesh.frustumCulled = false
    const sun = new THREE.Mesh(new THREE.SphereGeometry(2.3, 20, 14), new THREE.MeshBasicMaterial({ color: '#f4d79a', fog: false }))
    const moon = new THREE.Mesh(new THREE.SphereGeometry(1.55, 18, 12), new THREE.MeshBasicMaterial({ color: '#d9dfcf', fog: false }))
    return { mesh, sun, moon }
  }

  private createLabels() {
    for (const location of LOCATIONS) {
      if (location.id === 'overview') continue
      const element = document.createElement('button')
      element.type = 'button'
      element.className = 'world-label'
      element.setAttribute('aria-label', `造访${location.name}`)
      element.innerHTML = `<span class="world-label__dot"></span><span class="world-label__text">${location.shortName}</span>`
      element.addEventListener('click', (event) => {
        event.stopPropagation()
        this.callbacks.onLocation(location.id)
      })
      const label = new CSS2DObject(element)
      label.position.set(...location.position)
      label.name = `地名：${location.name}`
      this.scene.add(label)
      this.labels.set(location.id, element)
    }
  }

  private createSmoke() {
    const sources = [
      ...this.castle.smokeSources,
      new THREE.Vector3(6.6, 3.25, 3.6),
      new THREE.Vector3(8.1, 4.2, 2.7),
      new THREE.Vector3(-11.2, 2.7, -1.8),
    ]
    const count = 96
    const positions = new Float32Array(count * 3)
    const alpha = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const source = sources[i % sources.length]
      const particle = {
        source,
        age: Math.random() * 5,
        life: 4 + Math.random() * 3,
        drift: Math.random() * 2 - 1,
      }
      this.smoke.push(particle)
      positions.set(source.toArray(), i * 3)
      alpha[i] = 0
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alpha, 1))
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uPixelRatio: { value: this.pixelRatio } },
      vertexShader: `
        attribute float aAlpha;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 24.0 * uPixelRatio * (12.0 / -mv.z);
          vAlpha = aAlpha;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float soft = 1.0 - smoothstep(0.08, 0.5, d);
          gl_FragColor = vec4(vec3(0.73, 0.75, 0.72), soft * vAlpha * 0.35);
        }
      `,
    })
    return { points: new THREE.Points(geometry, material), positions, alpha }
  }

  private onPointerDown = (event: PointerEvent) => {
    this.pointerDown.set(event.clientX, event.clientY)
  }

  private onPointerUp = (event: PointerEvent) => {
    if (this.pointerDown.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 5) return
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1)
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const peopleHits = this.raycaster.intersectObject(this.population.group, true)
    if (peopleHits.length) {
      let object: THREE.Object3D | null = peopleHits[0].object
      let id: string | undefined
      while (object && !id) {
        id = object.userData.residentId
        object = object.parent
      }
      if (id) {
        this.population.greet(id)
        this.callbacks.onResident(id)
        return
      }
    }
    const terrainHit = this.raycaster.intersectObject(this.environment.top, false)[0]
    if (terrainHit) {
      this.population.reactTo(terrainHit.point)
      const material = new THREE.MeshBasicMaterial({ color: '#f1d58b', transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.31, 32), material)
      ring.rotation.x = -Math.PI / 2
      ring.position.copy(terrainHit.point)
      ring.position.y += 0.08
      this.scene.add(ring)
      this.pulses.push({ mesh: ring, age: 0 })
    }
  }

  private resize() {
    if (this.disposed || this.container.clientWidth === 0 || this.container.clientHeight === 0) return
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.labelRenderer.setSize(width, height)
  }

  private updateWeather(dt: number) {
    if (this.settings.weather === 'auto') {
      this.weatherTimer -= dt
      if (this.weatherTimer <= 0) {
        const choices: EngineStatus['weather'][] = this.currentWeather === 'clear'
          ? ['clear', 'cloudy', 'cloudy', 'rain']
          : this.currentWeather === 'cloudy' ? ['clear', 'rain', 'cloudy'] : ['cloudy', 'clear']
        this.currentWeather = choices[Math.floor(Math.random() * choices.length)]
        this.weatherTimer = 50 + Math.random() * 65
      }
    } else this.currentWeather = this.settings.weather
    const rainTarget = this.currentWeather === 'rain' ? 1 : 0
    const cloudTarget = this.currentWeather === 'clear' ? 0.12 : this.currentWeather === 'cloudy' ? 0.72 : 1
    this.rain = THREE.MathUtils.lerp(this.rain, rainTarget, 1 - Math.exp(-dt * 0.35))
    this.cloudiness = THREE.MathUtils.lerp(this.cloudiness, cloudTarget, 1 - Math.exp(-dt * 0.2))
  }

  private updateDayNight() {
    const solarAngle = ((this.hour - 6) / 24) * Math.PI * 2
    const elevation = Math.sin(solarAngle)
    const day = THREE.MathUtils.smoothstep(elevation, -0.16, 0.24)
    const night = 1 - day
    const dusk = Math.max(0, 1 - Math.abs(elevation) * 4.5) * (0.35 + day * 0.65)
    const sunPosition = new THREE.Vector3(Math.cos(solarAngle) * 65, elevation * 65, 28)
    this.sun.position.copy(sunPosition)
    this.sunDisc.position.copy(sunPosition.clone().normalize().multiplyScalar(105))
    this.moonDisc.position.copy(sunPosition.clone().normalize().multiplyScalar(-105))
    this.sunDisc.visible = elevation > -0.2
    this.moonDisc.visible = elevation < 0.35
    this.sun.intensity = 0.12 + day * 2.15
    this.sun.color.set(day < 0.45 ? '#b9c9df' : dusk > 0.35 ? '#ffd0a0' : '#ffe5bb')
    this.hemisphere.intensity = 0.28 + day * 0.88
    this.hemisphere.color.set(day > 0.4 ? '#dce5dd' : '#7c8ca8')
    this.sky.material.uniforms.uDay.value = day
    this.sky.material.uniforms.uDusk.value = dusk
    this.environment.rockMaterial.uniforms.uDay.value = day
    this.environment.rockMaterial.uniforms.uSunDirection.value.copy(sunPosition).normalize()
    this.environment.fireflyMaterial.uniforms.uNight.value = Math.max(0, night - this.rain * 0.6)
    for (const material of this.environment.waterMaterials) material.uniforms.uDay.value = day
    for (const material of this.castle.windowMaterials) material.emissiveIntensity = 0.08 + night * 1.65
    for (const light of this.castle.lights) light.intensity = 0.18 + night * 1.05
    const fogColor = new THREE.Color('#b8cbd0').lerp(new THREE.Color('#26344c'), night * 0.88)
    if (this.rain > 0.2) fogColor.lerp(new THREE.Color('#879da4'), this.rain * 0.35)
    ;(this.scene.fog as THREE.FogExp2).color.copy(fogColor)
    this.renderer.toneMappingExposure = 0.88 + day * 0.2
    return { day, night }
  }

  private updateEnvironment(dt: number, night: number) {
    const motion = this.settings.reducedMotion ? 0.3 : 1
    const wind = this.settings.wind
    for (const material of this.environment.waterMaterials) {
      material.uniforms.uTime.value = this.elapsed
      material.uniforms.uWind.value = wind
    }
    this.sky.material.uniforms.uTime.value = this.elapsed
    this.sky.position.copy(this.camera.position)
    for (const uniforms of this.environment.windUniforms) {
      uniforms.uTime.value = this.elapsed
      uniforms.uWind.value = wind * motion
    }
    for (const material of this.castle.flagMaterials) {
      material.uniforms.uTime.value = this.elapsed
      material.uniforms.uWind.value = wind * motion
    }
    this.environment.fireflyMaterial.uniforms.uTime.value = this.elapsed
    this.environment.fireflyMaterial.uniforms.uWind.value = wind * motion
    this.environment.waterWheel.rotation.z -= dt * (0.42 + this.rain * 0.28) * motion

    for (const cloud of this.environment.clouds) {
      cloud.group.position.x += dt * cloud.speed * (0.8 + wind * 4) * motion
      cloud.group.position.z += dt * cloud.speed * wind * 0.7 * motion
      cloud.group.position.y = cloud.baseY + Math.sin(this.elapsed * 0.08 + cloud.phase) * 0.5 * motion
      if (cloud.group.position.x > 56) cloud.group.position.x = -56
      const material = (cloud.group.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial
      material.opacity = 0.28 + this.cloudiness * 0.38
    }
    for (const floater of this.environment.floaters) {
      floater.mesh.position.y = floater.baseY + Math.sin(this.elapsed * 0.45 + floater.phase) * 0.18 * motion
      floater.mesh.rotation.y += dt * 0.05 * motion
    }
    for (const flame of this.castle.flames) {
      flame.scale.y = 0.85 + Math.sin(this.elapsed * 11 + flame.position.x * 7) * 0.16
      flame.rotation.y += dt * 0.8
    }

    for (const bird of this.environment.birds) {
      const roost = THREE.MathUtils.smoothstep(night, 0.45, 0.9)
      bird.phase += dt * bird.speed * (1 + wind * 0.35) * motion * (1 - roost * 0.94)
      const shelter = Math.max(this.rain * 0.55, roost * 0.82)
      const radius = bird.radius * (1 - shelter * 0.5)
      const angle = bird.phase
      const flightX = bird.center.x + Math.cos(angle) * radius
      const flightZ = bird.center.z + Math.sin(angle) * radius
      bird.root.position.set(
        THREE.MathUtils.lerp(flightX, -12 + Math.cos(angle) * 2.2, roost),
        bird.height * (1 - shelter) + 2 * shelter + Math.sin(angle * 2.3) * 0.7 * (1 - roost),
        THREE.MathUtils.lerp(flightZ, -3 + Math.sin(angle) * 2.2, roost),
      )
      bird.root.rotation.y = -angle
      const flap = Math.sin(this.elapsed * 7 + bird.phase * 4) * 0.65 * (1 - roost * 0.96)
      bird.left.rotation.z = flap
      bird.right.rotation.z = -flap
    }
    for (const butterfly of this.environment.butterflies) {
      butterfly.phase += dt * butterfly.speed * motion
      const a = butterfly.phase
      butterfly.root.position.set(
        butterfly.center.x + Math.cos(a * 1.3) * butterfly.radius + Math.sin(this.elapsed) * wind * 0.2,
        butterfly.center.y + Math.sin(a * 2.7) * 0.35,
        butterfly.center.z + Math.sin(a) * butterfly.radius,
      )
      butterfly.root.rotation.y = -a
      const flap = Math.sin(this.elapsed * 12 + a) * 1.0
      butterfly.left.rotation.y = flap
      butterfly.right.rotation.y = -flap
      const visible = Math.max(0, 1 - this.rain * 1.5) * Math.max(0.15, 1 - night * 0.9)
      butterfly.root.scale.setScalar(visible)
    }

    if (this.rain > 0.01) {
      const positions = this.environment.rainPositions
      const count = positions.length / 6
      for (let i = 0; i < count; i++) {
        const index = i * 6
        positions[index + 1] -= dt * (12 + (i % 7))
        positions[index] += dt * wind * 1.8
        if (positions[index + 1] < -2) {
          positions[index + 1] = 20 + Math.random() * 6
          positions[index] = (Math.random() - 0.5) * 38
          positions[index + 2] = (Math.random() - 0.5) * 38
        }
        positions[index + 3] = positions[index] + wind * 0.12
        positions[index + 4] = positions[index + 1] - 0.65
        positions[index + 5] = positions[index + 2] + 0.03
      }
      this.environment.rain.geometry.attributes.position.needsUpdate = true
    }
    this.environment.rainMaterial.opacity = this.rain * 0.55
    this.environment.rain.geometry.setDrawRange(0, Math.floor(420 * (this.quality === '流畅' ? 0.45 : 1) * Math.max(0.05, this.rain)) * 2)

    const mist = this.environment.mistPositions
    for (let i = 0; i < mist.length / 3; i++) {
      mist[i * 3 + 1] += dt * (0.25 + (i % 5) * 0.05) * motion
      mist[i * 3] += dt * wind * 0.08
      if (mist[i * 3 + 1] > -4) {
        mist[i * 3 + 1] = -12
        mist[i * 3] = 11.8 + (Math.random() - 0.5) * 3
      }
    }
    this.environment.mist.geometry.attributes.position.needsUpdate = true
    this.updateSmoke(dt, wind, motion)
  }

  private updateSmoke(dt: number, wind: number, motion: number) {
    for (let i = 0; i < this.smoke.length; i++) {
      const particle = this.smoke[i]
      particle.age += dt * motion
      if (particle.age > particle.life) {
        particle.age = 0
        particle.life = 4 + Math.random() * 3
        particle.drift = Math.random() * 2 - 1
      }
      const t = particle.age
      this.smokePositions[i * 3] = particle.source.x + t * wind * 0.55 + Math.sin(t * 1.7 + particle.drift) * 0.12
      this.smokePositions[i * 3 + 1] = particle.source.y + t * 0.62
      this.smokePositions[i * 3 + 2] = particle.source.z + particle.drift * t * 0.14
      this.smokeAlpha[i] = Math.sin(Math.min(1, t / particle.life) * Math.PI) * (1 - this.rain * 0.65)
    }
    this.smokePoints.geometry.attributes.position.needsUpdate = true
    this.smokePoints.geometry.attributes.aAlpha.needsUpdate = true
  }

  private updateCutaway(dt: number) {
    const target = this.settings.cutaway ? 0.075 : 1
    for (const material of this.castle.cutawayMaterials) {
      material.opacity = this.settings.reducedMotion ? target : THREE.MathUtils.lerp(material.opacity, target, 1 - Math.exp(-dt * 5))
      material.depthWrite = material.opacity > 0.55
    }
  }

  private updatePulses(dt: number) {
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i]
      pulse.age += dt
      const scale = 1 + pulse.age * 3.5
      pulse.mesh.scale.setScalar(scale)
      pulse.mesh.material.opacity = Math.max(0, 0.8 * (1 - pulse.age / 1.5))
      if (pulse.age > 1.5) {
        this.scene.remove(pulse.mesh)
        pulse.mesh.geometry.dispose()
        pulse.mesh.material.dispose()
        this.pulses.splice(i, 1)
      }
    }
  }

  private updateCamera(dt: number) {
    this.controls.autoRotate = this.settings.autoRotate && !this.settings.reducedMotion && !this.focus
    this.controls.enableDamping = !this.settings.reducedMotion
    if (this.focus) {
      if (this.settings.reducedMotion) {
        this.camera.position.copy(this.focus.camera)
        this.controls.target.copy(this.focus.target)
        this.focus = null
      } else {
        const alpha = 1 - Math.exp(-dt * 2.4)
        this.camera.position.lerp(this.focus.camera, alpha)
        this.controls.target.lerp(this.focus.target, alpha)
        if (this.camera.position.distanceTo(this.focus.camera) < 0.04 && this.controls.target.distanceTo(this.focus.target) < 0.03) this.focus = null
      }
    }
    this.controls.update()
  }

  private adaptQuality(dt: number) {
    this.frameCount++
    this.frameClock += dt
    if (this.frameClock < 3) return
    this.fps = Math.round(this.frameCount / this.frameClock)
    const maxRatio = Math.min(window.devicePixelRatio, 1.65)
    if (this.fps < 42 && this.pixelRatio > 0.85) {
      this.pixelRatio = Math.max(0.85, this.pixelRatio - 0.2)
      this.renderer.setPixelRatio(this.pixelRatio)
      this.environment.fireflyMaterial.uniforms.uPixelRatio.value = this.pixelRatio
      ;(this.smokePoints.material as THREE.ShaderMaterial).uniforms.uPixelRatio.value = this.pixelRatio
    } else if (this.fps > 57 && this.pixelRatio < maxRatio) {
      this.pixelRatio = Math.min(maxRatio, this.pixelRatio + 0.1)
      this.renderer.setPixelRatio(this.pixelRatio)
    }
    this.quality = this.pixelRatio < 1.05 ? '流畅' : this.pixelRatio < 1.4 ? '均衡' : '细腻'
    this.frameClock = 0
    this.frameCount = 0
  }

  private animate = (now: number) => {
    if (this.disposed) return
    this.frameId = requestAnimationFrame(this.animate)
    const rawDt = Math.min(0.05, Math.max(0.001, (now - this.previousTime) / 1000))
    this.previousTime = now
    const dt = this.settings.paused ? 0 : rawDt
    if (dt > 0) {
      this.elapsed += dt
      this.hour = (this.hour + dt * this.settings.timeScale * 0.08) % 24
      this.updateWeather(dt)
      const { night } = this.updateDayNight()
      this.population.update(dt, { hour: this.hour, rain: this.rain, wind: this.settings.wind, paused: false })
      this.updateEnvironment(dt, night)
      this.updateCutaway(dt)
      this.updatePulses(dt)
      this.audio.update(dt, this.settings.wind, this.rain, night)
    }
    this.updateCamera(rawDt)
    this.adaptQuality(rawDt)
    this.statusClock += rawDt
    if (this.statusClock > 0.65) {
      this.statusClock = 0
      this.callbacks.onStatus({
        hour: this.hour,
        weather: this.currentWeather,
        rain: this.rain,
        fps: this.fps,
        quality: this.quality,
        residents: this.population.snapshots(),
      })
    }
    this.renderer.render(this.scene, this.camera)
    this.labelRenderer.render(this.scene, this.camera)
  }

  updateSettings(settings: Partial<WorldSettings>) {
    const previousSeason = this.settings.season
    this.settings = { ...this.settings, ...settings }
    if (settings.season && settings.season !== previousSeason) applySeason(this.environment, settings.season)
    if (settings.weather && settings.weather !== 'auto') this.currentWeather = settings.weather
  }

  focusLocation(id: string) {
    const location = LOCATIONS.find((item) => item.id === id)
    if (!location) return
    this.focus = { camera: new THREE.Vector3(...location.camera), target: new THREE.Vector3(...location.target) }
    for (const [labelId, element] of this.labels) element.classList.toggle('is-active', labelId === id)
  }

  focusResident(id: string) {
    const snapshot = this.population.snapshot(id)
    if (!snapshot) return
    const position = new THREE.Vector3(...snapshot.position)
    const offset = this.camera.position.clone().sub(this.controls.target).normalize().multiplyScalar(7)
    offset.y = Math.max(3, offset.y)
    this.focus = { camera: position.clone().add(offset), target: position.clone().add(new THREE.Vector3(0, 0.8, 0)) }
  }

  greetResident(id: string) {
    this.population.greet(id)
    this.callbacks.onStatus({
      hour: this.hour,
      weather: this.currentWeather,
      rain: this.rain,
      fps: this.fps,
      quality: this.quality,
      residents: this.population.snapshots(),
    })
  }

  setHour(hour: number) {
    this.hour = ((hour % 24) + 24) % 24
    this.updateDayNight()
  }

  async setAudio(enabled: boolean) {
    await this.audio.setEnabled(enabled)
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.frameId)
    this.resizeObserver.disconnect()
    this.controls.dispose()
    this.audio.dispose()
    this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown)
    this.renderer.domElement.removeEventListener('pointerup', this.onPointerUp)
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
        object.geometry?.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => material?.dispose())
      }
    })
    this.renderer.dispose()
    this.renderer.domElement.remove()
    this.labelRenderer.domElement.remove()
  }
}

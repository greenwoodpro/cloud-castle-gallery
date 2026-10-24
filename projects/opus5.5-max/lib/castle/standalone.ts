import { CastleEngine } from './engine'
import { CATEGORIES, LOCATIONS } from './locations'

const TIMES: [string, number][] = [
  ['清晨', 6.9],
  ['正午', 12],
  ['黄昏', 17.6],
  ['星夜', 22.5],
]

function button(label: string, onClick: () => void) {
  const el = document.createElement('button')
  el.type = 'button'
  el.textContent = label
  el.addEventListener('click', onClick)
  return el
}

function boot() {
  const scene = document.getElementById('scene')
  const bar = document.getElementById('bar')
  const select = document.getElementById('place') as HTMLSelectElement | null
  const card = document.getElementById('card')
  if (!scene || !bar || !select || !card) return

  let engine: CastleEngine
  try {
    engine = new CastleEngine(scene)
  } catch {
    card.hidden = false
    card.textContent = '你的浏览器似乎无法运行 WebGL，请换用最新版的 Chrome、Edge 或 Safari。'
    return
  }
  engine.setTimeOfDay(17.6)
  engine.setAutoRotate(true)

  let cutaway = false
  let autoRotate = true
  const timeButtons = TIMES.map(([label, hour]) =>
    button(label, () => {
      engine.setTimeOfDay(hour)
      timeButtons.forEach((b) => b.classList.toggle('on', b.textContent === label))
    }),
  )
  timeButtons[2].classList.add('on')
  timeButtons.forEach((b) => bar.appendChild(b))

  const cutBtn = button('剖面视图', () => {
    cutaway = !cutaway
    engine.setCutaway(cutaway)
    cutBtn.classList.toggle('on', cutaway)
  })
  const rotateBtn = button('自动环游', () => {
    autoRotate = !autoRotate
    engine.setAutoRotate(autoRotate)
    rotateBtn.classList.toggle('on', autoRotate)
  })
  rotateBtn.classList.add('on')
  bar.append(cutBtn, rotateBtn, button('复位视角', () => engine.resetView()))

  for (const category of CATEGORIES) {
    const group = document.createElement('optgroup')
    group.label = category.label
    for (const l of LOCATIONS.filter((x) => x.category === category.id)) {
      const option = document.createElement('option')
      option.value = l.id
      option.textContent = `${l.name} · ${l.subtitle}`
      group.appendChild(option)
    }
    select.appendChild(group)
  }

  select.addEventListener('change', () => {
    const location = LOCATIONS.find((l) => l.id === select.value)
    if (!location) return
    if (location.cutaway && !cutaway) {
      cutaway = true
      engine.setCutaway(true)
      cutBtn.classList.add('on')
    }
    autoRotate = false
    engine.setAutoRotate(false)
    rotateBtn.classList.remove('on')
    engine.focusLocation(location)
    card.hidden = false
    card.replaceChildren()
    const title = document.createElement('h2')
    title.textContent = location.name
    const subtitle = document.createElement('p')
    subtitle.className = 'sub'
    subtitle.textContent = location.subtitle
    card.append(title, subtitle)
    for (const text of location.paragraphs) {
      const p = document.createElement('p')
      p.textContent = text
      card.appendChild(p)
    }
    const facts = document.createElement('dl')
    for (const f of location.facts) {
      const dt = document.createElement('dt')
      dt.textContent = f.label
      const dd = document.createElement('dd')
      dd.textContent = f.value
      facts.append(dt, dd)
    }
    card.appendChild(facts)
  })
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else boot()

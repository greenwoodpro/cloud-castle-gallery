import { createFloatingCastle } from './scene.js'
import { INTRO, SECTIONS, TIMES } from './content.js'

const $ = (id) => document.getElementById(id)
const state = { time: 'day', cutaway: false, autoRotate: true, section: SECTIONS[0].id, active: null }

const api = createFloatingCastle($('scene'), {
  onReady: () => $('loading').remove(),
})

$('intro-title').textContent = INTRO.title
$('intro-subtitle').textContent = INTRO.subtitle
$('intro-body').textContent = INTRO.body

function el(tag, attrs = {}, text) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v)
  if (text !== undefined) node.textContent = text
  return node
}

function renderTimes() {
  const wrap = $('times')
  wrap.replaceChildren(
    ...TIMES.map((t) => {
      const b = el('button', { type: 'button', role: 'radio', 'aria-checked': String(state.time === t.id) }, t.label)
      b.addEventListener('click', () => setTime(t.id))
      return b
    }),
  )
}

function renderTabs() {
  $('tabs').replaceChildren(
    ...SECTIONS.map((s) => {
      const b = el('button', { type: 'button', role: 'tab', class: 'tab', 'aria-selected': String(s.id === state.section) }, s.label)
      b.addEventListener('click', () => {
        state.section = s.id
        renderTabs()
        renderList()
      })
      return b
    }),
  )
}

function renderList() {
  const section = SECTIONS.find((s) => s.id === state.section)
  $('list').replaceChildren(
    ...section.items.map((item) => {
      const li = el('li')
      const active = state.active === item.key
      const row = el('button', { type: 'button', class: 'row', 'aria-expanded': String(active) })
      row.append(el('span', { class: 'dot', 'aria-hidden': 'true' }), el('span', { class: 'row-title' }, item.title), el('span', { class: 'tag' }, item.tag))
      row.addEventListener('click', () => select(item))
      li.append(row)
      if (active) li.append(el('p', { class: 'body' }, item.body))
      return li
    }),
  )
}

function setTime(t) {
  state.time = t
  api.setTimeOfDay(t)
  renderTimes()
}
function setCutaway(on) {
  state.cutaway = on
  api.setCutaway(on)
  $('toggle-cutaway').setAttribute('aria-pressed', String(on))
}
function setAutoRotate(on) {
  state.autoRotate = on
  api.setAutoRotate(on)
  $('toggle-rotate').setAttribute('aria-pressed', String(on))
}
function select(item) {
  state.active = state.active === item.key ? null : item.key
  setAutoRotate(false)
  if (item.interior) setCutaway(true)
  if (item.time) setTime(item.time)
  api.flyTo(item.key)
  renderList()
}

$('toggle-cutaway').addEventListener('click', () => setCutaway(!state.cutaway))
$('toggle-rotate').addEventListener('click', () => setAutoRotate(!state.autoRotate))
$('reset').addEventListener('click', () => {
  state.active = null
  api.flyTo('overview')
  renderList()
})
$('close-panel').addEventListener('click', () => {
  $('panel').hidden = true
  $('open-panel').hidden = false
})
$('open-panel').addEventListener('click', () => {
  $('panel').hidden = false
  $('open-panel').hidden = true
})

renderTimes()
renderTabs()
renderList()

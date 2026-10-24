import { createViewer, VIEWS, type Mood } from './scene'

const host = document.getElementById('app') as HTMLElement
const status = document.getElementById('status') as HTMLElement
const hint = document.getElementById('hint') as HTMLElement
const viewBar = document.getElementById('views') as HTMLElement
const moodBar = document.getElementById('moods') as HTMLElement
const rotateBtn = document.getElementById('rotate') as HTMLButtonElement

createViewer(host, (p, t) => {
  status.textContent = `${t}… ${Math.round(p * 100)}%`
})
  .then((viewer) => {
    status.remove()
    const viewButtons: HTMLButtonElement[] = []
    for (const v of VIEWS) {
      const b = document.createElement('button')
      b.textContent = v.label
      b.addEventListener('click', () => {
        viewButtons.forEach((x) => x.classList.remove('on'))
        b.classList.add('on')
        hint.textContent = v.hint
        rotateBtn.classList.remove('on')
        viewer.setAutoRotate(false)
        viewer.flyTo(v.id)
      })
      viewBar.appendChild(b)
      viewButtons.push(b)
    }
    viewButtons[0].classList.add('on')
    const moods: Array<[Mood, string]> = [
      ['day', '白昼'],
      ['dusk', '黄昏'],
      ['night', '星夜'],
    ]
    const moodButtons: HTMLButtonElement[] = []
    for (const [id, label] of moods) {
      const b = document.createElement('button')
      b.textContent = label
      if (id === 'day') b.classList.add('on')
      b.addEventListener('click', () => {
        moodButtons.forEach((x) => x.classList.remove('on'))
        b.classList.add('on')
        viewer.setMood(id)
      })
      moodBar.appendChild(b)
      moodButtons.push(b)
    }
    rotateBtn.addEventListener('click', () => {
      const on = !rotateBtn.classList.contains('on')
      rotateBtn.classList.toggle('on', on)
      viewer.setAutoRotate(on)
    })
    document.body.classList.add('ready')
  })
  .catch((e: unknown) => {
    status.textContent = `加载失败：${e instanceof Error ? e.message : String(e)}。请使用支持 WebGL 的浏览器。`
  })

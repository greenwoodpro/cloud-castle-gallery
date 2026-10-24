export class IslandAudio {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private windGain: GainNode | null = null
  private windFilter: BiquadFilterNode | null = null
  private padGain: GainNode | null = null
  private oscillators: OscillatorNode[] = []
  private chimeClock = 5
  private enabled = false

  async setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (enabled) {
      if (!this.context) this.create()
      if (this.context?.state === 'suspended') await this.context.resume()
    }
    if (this.context && this.master) {
      this.master.gain.cancelScheduledValues(this.context.currentTime)
      this.master.gain.setTargetAtTime(enabled ? 0.22 : 0, this.context.currentTime, 0.35)
    }
  }

  private create() {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const context = new AudioContextClass()
    this.context = context
    this.master = context.createGain()
    this.master.gain.value = 0
    this.master.connect(context.destination)

    const length = context.sampleRate * 3
    const buffer = context.createBuffer(1, length, context.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1
      last = last * 0.985 + white * 0.015
      data[i] = last * 3.2
    }
    const source = context.createBufferSource()
    source.buffer = buffer
    source.loop = true
    this.windFilter = context.createBiquadFilter()
    this.windFilter.type = 'lowpass'
    this.windFilter.frequency.value = 620
    this.windGain = context.createGain()
    this.windGain.gain.value = 0.2
    source.connect(this.windFilter)
    this.windFilter.connect(this.windGain)
    this.windGain.connect(this.master)
    source.start()

    this.padGain = context.createGain()
    this.padGain.gain.value = 0.055
    const padFilter = context.createBiquadFilter()
    padFilter.type = 'lowpass'
    padFilter.frequency.value = 520
    this.padGain.connect(padFilter)
    padFilter.connect(this.master)
    // An open, quiet fifth with a soft upper colour; no recordings are used.
    for (const [frequency, gain] of [[110, 0.45], [164.81, 0.22], [220, 0.12]] as const) {
      const oscillator = context.createOscillator()
      const voiceGain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency
      oscillator.detune.value = (Math.random() - 0.5) * 5
      voiceGain.gain.value = gain
      oscillator.connect(voiceGain)
      voiceGain.connect(this.padGain)
      oscillator.start()
      this.oscillators.push(oscillator)
    }
  }

  update(dt: number, wind: number, rain: number, night: number) {
    if (!this.context || !this.enabled) return
    const now = this.context.currentTime
    this.windGain?.gain.setTargetAtTime(0.1 + wind * 0.33 + rain * 0.15, now, 0.8)
    this.windFilter?.frequency.setTargetAtTime(380 + wind * 900 + rain * 350, now, 0.7)
    this.padGain?.gain.setTargetAtTime(0.035 + night * 0.025, now, 1.4)
    this.chimeClock -= dt
    if (this.chimeClock <= 0) {
      this.chimeClock = 9 + Math.random() * 15
      this.chime(night > 0.45 ? 329.63 : 440)
    }
  }

  private chime(base: number) {
    if (!this.context || !this.master) return
    const context = this.context
    const now = context.currentTime
    const notes = [1, 1.5, 2.005]
    notes.forEach((ratio, index) => {
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const filter = context.createBiquadFilter()
      oscillator.type = 'sine'
      oscillator.frequency.value = base * ratio
      filter.type = 'lowpass'
      filter.frequency.value = 1800
      const start = now + index * 0.32
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.055 / (index + 1), start + 0.025)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 3.8)
      oscillator.connect(filter)
      filter.connect(gain)
      gain.connect(this.master!)
      oscillator.start(start)
      oscillator.stop(start + 4)
    })
  }

  dispose() {
    this.oscillators.forEach((oscillator) => oscillator.stop())
    this.context?.close()
    this.context = null
  }
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useAmbientAudio() {
  const context = useRef<AudioContext | null>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = useCallback(async () => {
    if (!context.current) {
      const audio = new AudioContext()
      const buffer = audio.createBuffer(1, audio.sampleRate * 6, audio.sampleRate)
      const channel = buffer.getChannelData(0)
      let previous = 0
      for (let i = 0; i < channel.length; i++) {
        previous = (previous + (Math.random() * 2 - 1) * 0.02) / 1.02
        channel[i] = previous * 3.5
      }
      const source = audio.createBufferSource()
      source.buffer = buffer
      source.loop = true
      const filter = audio.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 560
      const volume = audio.createGain()
      volume.gain.value = 0.07
      source.connect(filter).connect(volume).connect(audio.destination)
      source.start()
      context.current = audio
      await audio.resume()
      setPlaying(true)
      return
    }
    if (context.current.state === 'running') {
      await context.current.suspend()
      setPlaying(false)
    } else {
      await context.current.resume()
      setPlaying(true)
    }
  }, [])
  useEffect(() => () => { void context.current?.close() }, [])
  return { playing, toggle }
}

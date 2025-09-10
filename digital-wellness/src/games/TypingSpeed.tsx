import { useEffect, useMemo, useRef, useState } from 'react'

const samples = [
  'Mindful breathing brings calm and clarity.',
  'Small steps forward still count as progress.',
  'You are stronger than you think.',
  'Take a pause, relax your shoulders, and smile.',
]

function pickSample() {
  return samples[Math.floor(Math.random() * samples.length)]
}

export default function TypingSpeed({ onExit }: { onExit: () => void }) {
  const [target, setTarget] = useState<string>(pickSample())
  const [text, setText] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    if (!finished && text === target) setFinished(true)
  }, [text, target, finished])

  const wpm = useMemo(() => {
    if (!startTime) return 0
    const minutes = (Date.now() - startTime) / 60000
    const words = text.trim().length / 5
    return Math.max(0, Math.round(words / minutes))
  }, [startTime, text])

  const accuracy = useMemo(() => {
    let correct = 0
    for (let i = 0; i < text.length; i++) if (text[i] === target[i]) correct++
    return Math.round((correct / target.length) * 100)
  }, [text, target])

  function onChange(v: string) {
    if (!startTime) setStartTime(Date.now())
    setText(v)
  }

  function reset() {
    setTarget(pickSample())
    setText('')
    setStartTime(null)
    setFinished(false)
    inputRef.current?.focus()
  }

  return (
    <div className="game typing">
      <div className="game-header">
        <h2>Typing Speed</h2>
        <button className="btn secondary" onClick={onExit}>Back</button>
      </div>
      <p className="typing-target">
        {target.split('').map((ch, i) => (
          <span key={i} className={i < text.length ? (text[i] === ch ? 'ok' : 'err') : ''}>{ch}</span>
        ))}
      </p>
      <input
        ref={inputRef}
        className="typing-input"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && finished) reset() }}
        placeholder="Start typing here..."
      />
      <div className="stats">
        <span>WPM: {isFinite(wpm) ? wpm : 0}</span>
        <span>Accuracy: {isFinite(accuracy) ? accuracy : 0}%</span>
      </div>
      <div className="btn-row">
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}


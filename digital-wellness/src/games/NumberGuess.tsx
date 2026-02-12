import { useMemo, useState } from 'react'

function makeSecret(): number {
  return Math.floor(Math.random() * 100) + 1
}

export default function NumberGuess({ onExit }: { onExit: () => void }) {
  const [secret, setSecret] = useState<number>(makeSecret())
  const [tries, setTries] = useState(0)
  const [hint, setHint] = useState('Guess a number between 1 and 100')
  const [value, setValue] = useState('')

  function submit() {
    const num = Number(value)
    if (!num || num < 1 || num > 100) {
      setHint('Enter a number 1-100')
      return
    }
    setTries((t) => t + 1)
    if (num === secret) {
      setHint(`🎉 Correct! You found it in ${tries + 1} tries.`)
    } else if (num < secret) {
      setHint('Too low ⬆️')
    } else {
      setHint('Too high ⬇️')
    }
    setValue('')
  }

  function reset() {
    setSecret(makeSecret())
    setTries(0)
    setHint('Guess a number between 1 and 100')
    setValue('')
  }

  const disabled = useMemo(() => hint.startsWith('🎉'), [hint])

  return (
    <div className="game guess">
      <div className="game-header">
        <h2>Number Guess</h2>
        <button className="btn secondary" onClick={onExit}>Back</button>
      </div>
      <p className="game-status">{hint}</p>
      <div className="input-row">
        <input
          type="number"
          min={1}
          max={100}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
          disabled={disabled}
        />
        <button className="btn primary" onClick={submit} disabled={disabled}>Guess</button>
      </div>
      <div className="btn-row">
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}


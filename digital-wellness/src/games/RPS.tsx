import { useMemo, useState } from 'react'

type Choice = 'Rock' | 'Paper' | 'Scissors'
const choices: Choice[] = ['Rock', 'Paper', 'Scissors']

function playRound(player: Choice, cpu: Choice): 0 | 1 | -1 {
  if (player === cpu) return 0
  if (
    (player === 'Rock' && cpu === 'Scissors') ||
    (player === 'Paper' && cpu === 'Rock') ||
    (player === 'Scissors' && cpu === 'Paper')
  ) return 1
  return -1
}

export default function RPS({ onExit }: { onExit: () => void }) {
  const [playerScore, setPlayerScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0)
  const [lastResult, setLastResult] = useState<string>('Make your move!')

  function choose(c: Choice) {
    const cpu = choices[Math.floor(Math.random() * 3)]
    const res = playRound(c, cpu)
    if (res === 1) {
      setPlayerScore((s) => s + 1)
      setLastResult(`${c} beats ${cpu}. You win this round!`)
    } else if (res === -1) {
      setCpuScore((s) => s + 1)
      setLastResult(`${cpu} beats ${c}. CPU wins this round.`)
    } else {
      setLastResult(`Both chose ${c}. It's a tie.`)
    }
  }

  const status = useMemo(() => {
    if (playerScore >= 3) return 'You won the match! 🎉'
    if (cpuScore >= 3) return 'CPU won the match. Try again!'
    return `First to 3 wins.`
  }, [playerScore, cpuScore])

  function reset() {
    setPlayerScore(0)
    setCpuScore(0)
    setLastResult('Make your move!')
  }

  return (
    <div className="game rps">
      <div className="game-header">
        <h2>Rock Paper Scissors</h2>
        <button className="btn secondary" onClick={onExit}>Back</button>
      </div>
      <p className="game-status">{status}</p>
      <div className="scores">
        <span>You: {playerScore}</span>
        <span>CPU: {cpuScore}</span>
      </div>
      <p className="last-result">{lastResult}</p>
      <div className="btn-row">
        {choices.map((c) => (
          <button key={c} className="btn primary" onClick={() => choose(c)}>{c}</button>
        ))}
      </div>
      <button className="btn" onClick={reset}>Reset</button>
    </div>
  )
}


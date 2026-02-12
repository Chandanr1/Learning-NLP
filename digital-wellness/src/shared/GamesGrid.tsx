import { Link } from 'react-router-dom'
import RPS from '../games/RPS'
import MemoryFlip from '../games/MemoryFlip'
import TicTacToe from '../games/TicTacToe'
import NumberGuess from '../games/NumberGuess'
import TypingSpeed from '../games/TypingSpeed'
import { useState } from 'react'

type Props = {
  showDescriptions?: boolean
}

const gameDefs = [
  { key: 'rps', title: 'Rock Paper Scissors', desc: 'Win 3 rounds first' },
  { key: 'memory', title: 'Memory Flip', desc: 'Match all pairs' },
  { key: 'ttt', title: 'Tic Tac Toe', desc: 'Best your opponent' },
  { key: 'guess', title: 'Number Guess', desc: 'Find the secret number' },
  { key: 'typing', title: 'Typing Speed', desc: 'Type fast and accurate' },
]

export default function GamesGrid({ showDescriptions }: Props) {
  const [active, setActive] = useState<string | null>(null)

  function renderActive() {
    switch (active) {
      case 'rps': return <RPS onExit={() => setActive(null)} />
      case 'memory': return <MemoryFlip onExit={() => setActive(null)} />
      case 'ttt': return <TicTacToe onExit={() => setActive(null)} />
      case 'guess': return <NumberGuess onExit={() => setActive(null)} />
      case 'typing': return <TypingSpeed onExit={() => setActive(null)} />
      default: return null
    }
  }

  if (active) {
    return <div className="game-container">{renderActive()}</div>
  }

  return (
    <div className="games-grid">
      {gameDefs.map((g) => (
        <div key={g.key} className="game-card">
          <div className="game-title">{g.title}</div>
          {showDescriptions && <p className="game-desc">{g.desc}</p>}
          <div className="btn-row">
            <button className="btn primary" onClick={() => setActive(g.key)}>Play Now</button>
          </div>
        </div>
      ))}
      {!showDescriptions && (
        <div className="more-link">
          <Link to="/games" className="btn secondary">View all games</Link>
        </div>
      )}
    </div>
  )
}


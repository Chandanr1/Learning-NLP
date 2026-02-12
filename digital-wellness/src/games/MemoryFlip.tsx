import { useEffect, useMemo, useState } from 'react'

type Card = {
  id: number
  value: string
  flipped: boolean
  matched: boolean
}

function generateDeck(): Card[] {
  const emojis = ['🍎','🍋','🍇','🍓','🥑','🥝']
  const pairs = [...emojis, ...emojis]
  const shuffled = pairs
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((o, i) => ({ id: i, value: o.v, flipped: false, matched: false }))
  return shuffled
}

export default function MemoryFlip({ onExit }: { onExit: () => void }) {
  const [deck, setDeck] = useState<Card[]>(generateDeck())
  const [first, setFirst] = useState<number | null>(null)
  const [lock, setLock] = useState(false)

  useEffect(() => {
    if (deck.every((c) => c.matched)) {
      // game finished
    }
  }, [deck])

  function flip(card: Card) {
    if (lock || card.flipped || card.matched) return
    const newDeck = deck.map((c) => c.id === card.id ? { ...c, flipped: true } : c)
    setDeck(newDeck)
    if (first === null) {
      setFirst(card.id)
    } else {
      const prev = newDeck.find((c) => c.id === first)!
      if (prev.value === card.value) {
        setDeck(newDeck.map((c) => c.flipped && c.value === card.value ? { ...c, matched: true } : c))
        setFirst(null)
      } else {
        setLock(true)
        setTimeout(() => {
          setDeck((d) => d.map((c) => c.flipped && !c.matched ? { ...c, flipped: false } : c))
          setFirst(null)
          setLock(false)
        }, 700)
      }
    }
  }

  function reset() {
    setDeck(generateDeck())
    setFirst(null)
    setLock(false)
  }

  const remainingPairs = useMemo(() => deck.filter((c) => !c.matched).length / 2, [deck])

  return (
    <div className="game memory">
      <div className="game-header">
        <h2>Memory Flip</h2>
        <button className="btn secondary" onClick={onExit}>Back</button>
      </div>
      <p className="game-status">Pairs left: {remainingPairs}</p>
      <div className="memory-grid">
        {deck.map((c) => (
          <button
            key={c.id}
            className={`card ${c.flipped || c.matched ? 'show' : ''}`}
            onClick={() => flip(c)}
          >
            <span>{c.flipped || c.matched ? c.value : '❓'}</span>
          </button>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}


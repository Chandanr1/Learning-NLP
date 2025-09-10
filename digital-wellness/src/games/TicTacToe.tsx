import { useMemo, useState } from 'react'

type Cell = 'X' | 'O' | null

function realWinner(board: Cell[]): Cell | 'draw' | null {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for (const [a,b,c] of lines) {
    const va = board[a]
    if (va && va === board[b] && va === board[c]) return va
  }
  if (board.every(Boolean)) return 'draw'
  return null
}

function aiMove(board: Cell[]): number {
  // naive AI: pick winning move if exists, else random
  const emptyIdx = board.map((v, i) => v ? -1 : i).filter((i) => i !== -1)
  // try to win
  for (const i of emptyIdx) {
    const cloned = [...board]
    cloned[i] = 'O'
    if (realWinner(cloned) === 'O') return i
  }
  // block
  for (const i of emptyIdx) {
    const cloned = [...board]
    cloned[i] = 'X'
    if (realWinner(cloned) === 'X') return i
  }
  return emptyIdx[Math.floor(Math.random() * emptyIdx.length)] ?? 0
}

export default function TicTacToe({ onExit }: { onExit: () => void }) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const winner = useMemo(() => realWinner(board), [board])

  function clickCell(i: number) {
    if (winner || board[i]) return
    const next = [...board]
    next[i] = 'X'
    setBoard(next)
    setTimeout(() => {
      setBoard((b) => {
        if (realWinner(b) || b.every(Boolean)) return b
        const idx = aiMove(b)
        const clone = [...b]
        clone[idx] = 'O'
        return clone
      })
    }, 250)
  }

  function reset() {
    setBoard(Array(9).fill(null))
  }

  return (
    <div className="game ttt">
      <div className="game-header">
        <h2>Tic Tac Toe</h2>
        <button className="btn secondary" onClick={onExit}>Back</button>
      </div>
      <p className="game-status">{winner ? (winner === 'draw' ? 'It\'s a draw.' : `${winner} wins!`) : 'Your turn (X)'}</p>
      <div className="ttt-grid">
        {board.map((cell, i) => (
          <button key={i} className="ttt-cell" onClick={() => clickCell(i)}>
            {cell ?? ''}
          </button>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}


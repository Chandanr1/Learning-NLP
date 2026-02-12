import { useState } from 'react'
import { generateBotReply } from './chatBot'

export default function MiniChat() {
  const [history, setHistory] = useState<string[]>([
    'Hello 👋 I\'m here to listen. How are you feeling today?'
  ])
  const [text, setText] = useState('')

  function send() {
    const t = text.trim()
    if (!t) return
    setHistory((h) => [...h, t])
    setText('')
    const reply = generateBotReply(t)
    setTimeout(() => setHistory((h) => [...h, reply]), 300)
  }

  return (
    <div className="mini-chat">
      <div className="mini-chat-log">
        {history.map((m, i) => (
          <div key={i} className={`mini-msg ${i % 2 === 0 ? 'bot' : 'user'}`}>{m}</div>
        ))}
      </div>
      <div className="mini-chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn primary" onClick={send}>Send</button>
      </div>
    </div>
  )
}


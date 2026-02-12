import { useEffect, useMemo, useRef, useState } from 'react'
import { generateBotReply } from '../shared/chatBot'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: crypto.randomUUID(), role: 'assistant', content: 'Hello 👋 I\'m here to listen. How are you feeling today?' },
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isThinking])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsThinking(true)
    const reply = generateBotReply(text)
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: reply }])
      setIsThinking(false)
    }, 600)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const placeholder = useMemo(() => 'Message Digital Wellness...', [])

  return (
    <div className="chatgpt-layout">
      <aside className="chat-sidebar">
        <div className="sidebar-header">Conversations</div>
        <button className="btn secondary" onClick={() => setMessages([{ id: crypto.randomUUID(), role: 'assistant', content: 'New chat started. What\'s on your mind?' }])}>+ New chat</button>
        <p className="sidebar-note">This is a local demo. No data leaves your device.</p>
      </aside>
      <section className="chat-main">
        <div className="chat-title">AI Mental Health Chatbot</div>
        <div className="chat-log" ref={listRef}>
          {messages.map((m) => (
            <div key={m.id} className={`chat-row ${m.role}`}>
              <div className="avatar">{m.role === 'assistant' ? '💬' : '🙂'}</div>
              <div className="bubble">{m.content}</div>
            </div>
          ))}
          {isThinking && (
            <div className="chat-row assistant">
              <div className="avatar">💬</div>
              <div className="bubble thinking">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
        </div>
        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            rows={2}
          />
          <button className="btn primary" onClick={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  )
}


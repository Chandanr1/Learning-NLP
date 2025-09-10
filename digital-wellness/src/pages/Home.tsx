import { Link } from 'react-router-dom'
import MiniChat from '../shared/MiniChat'
import GamesGrid from '../shared/GamesGrid'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">Welcome to <span>Digital Wellness</span></h1>
          <p className="hero-sub">A safe space for students to seek mental health support, play relaxing games, and connect without stigma.</p>
          <div className="btn-row">
            <Link to="/chatbot" className="btn primary">Go to Chatbot</Link>
            <Link to="/games" className="btn success">Explore Games</Link>
          </div>
        </div>
        <div className="hero-right">
          <MiniChat />
        </div>
      </section>

      <section className="games-section">
        <div className="section-title">
          <span className="emoji">🎮</span>
          <h2>Fun Games for Stress Relief</h2>
        </div>
        <GamesGrid />
      </section>
    </div>
  )
}


import GamesGrid from '../shared/GamesGrid'

export default function GamesHub() {
  return (
    <div className="games-page">
      <h1 className="page-title">Games</h1>
      <p className="page-sub">All five games are available below. Click any to start playing.</p>
      <GamesGrid showDescriptions />
    </div>
  )
}


import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import ChatbotPage from './pages/Chatbot'
import GamesHub from './pages/Games'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">Digital Wellness</Link>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/chatbot" className={({ isActive }) => isActive ? 'active' : ''}>Chatbot</NavLink>
          <NavLink to="/games" className={({ isActive }) => isActive ? 'active' : ''}>Games</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Layout() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container main-content">
        <Outlet />
      </main>
      <footer className="footer container">Made with ❤️ for student wellness</footer>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chatbot" element={<ChatbotPage />} />
        <Route path="games" element={<GamesHub />} />
      </Route>
    </Routes>
  )
}

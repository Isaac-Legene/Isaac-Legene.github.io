import { NavLink, Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="nav-shell">
      <Link to="/" className="brand">
        <span className="brand-mark">IL</span>
        <span>
          <strong>Isaac Legene</strong>
          <small>AI & Robotics Portfolio</small>
        </span>
      </Link>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/experience" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Experience
        </NavLink>
        <NavLink to="/research" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Research
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Projects
        </NavLink>
      </div>
    </nav>
  )
}

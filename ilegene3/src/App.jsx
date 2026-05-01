import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ExperiencePage from './pages/ExperiencePage'
import ResearchPage from './pages/ResearchPage'
import ProjectsPage from './pages/ProjectsPage'
import DeepRlPage from './pages/DeepRlPage'
import MineTrackPage from './pages/MineTrackPage'

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/deep-rl" element={<DeepRlPage />} />
        <Route path="/projects/minetrack" element={<MineTrackPage />} />
        <Route path="/projects/minetrack/overview" element={<MineTrackPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

import ShinyText from '../components/ShinyText'
import { Link } from 'react-router-dom'

export default function ProjectsPage() {
  const projects = [
    { to: '/projects/deep-rl', title: 'Deep Reinforcement Learning CS 8803' },
    { to: '/projects/minetrack', title: 'Machine Learning CS 7641' }
  ]

  return (
    <main className="page">
      <section className="reveal">
        <p className="eyebrow">Projects</p>
        <h1>
          <ShinyText text="Robotics course projects." speed={2.2} color="#9aa7b8" shineColor="#ffffff" spread={120} direction="left" />
        </h1>
      </section>

      <div className="cards cards-2 reveal delay-1">
        {projects.map((project) => (
          <Link key={project.to} className="card card-link" to={project.to}>
            <span>Featured project</span>
            <strong>{project.title}</strong>
          </Link>
        ))}
      </div>
    </main>
  )
}

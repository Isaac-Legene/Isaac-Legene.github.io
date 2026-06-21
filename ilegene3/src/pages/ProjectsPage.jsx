import ShinyText from '../components/ShinyText'
import { Link } from 'react-router-dom'

export default function ProjectsPage() {
  const projects = [
    {
      to: '/projects/deep-rl',
      title: 'Deep Reinforcement Learning CS 8803',
      course: 'CS 8803',
      focus: 'Deep RL',
      summary: 'Robotics-focused reinforcement learning coursework and implementation notes.',
    },
    {
      to: '/projects/minetrack',
      title: 'Machine Learning CS 7641',
      course: 'CS 7641',
      focus: 'MineTrack',
      summary: 'Machine learning project report with visual results, analysis, and legacy materials.',
    },
    {
      to: '/projects/computer-vision',
      title: 'Computer Vision CS 6746',
      course: 'CS 6746',
      focus: 'Vision',
      summary: 'Computer vision project work organized for quick review and navigation.',
    },
  ]

  return (
    <main className="page">
      <section className="reveal">
        <p className="eyebrow">Projects</p>
        <h1>
          <ShinyText text="Robotics course projects." speed={2.2} color="#9aa7b8" shineColor="#ffffff" spread={120} direction="left" />
        </h1>
      </section>

      <div className="cards cards-3 reveal delay-1">
        {projects.map((project) => (
          <Link key={project.to} className="card card-link" to={project.to}>
            <span>{project.course}</span>
            <strong>{project.title}</strong>
            <p>{project.summary}</p>
            <div className="card-meta" aria-label={`${project.focus} project`}>
              <small>{project.focus}</small>
              <small>Featured project</small>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

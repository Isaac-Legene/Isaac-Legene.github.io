import { Link } from 'react-router-dom'

export default function ProjectsPage() {
  const projects = [
    {
      to: '/projects/deep-rl',
      title: 'Deep Reinforcement Learning CS 8803',

    },
    {
      to: '/projects/minetrack',
      title: 'Machine Learning CS 7641',
    }
  ]

  return (
    <main className="page">
      <section className="reveal">
        <p className="eyebrow">Projects</p>
        <h1>Robotics course projects.</h1>
      </section>

      <div className="cards cards-2 reveal delay-1">
        {projects.map((project) => (
          <Link key={project.to} className="card card-link" to={project.to}>
            <span>Featured project</span>
            <strong>{project.title}</strong>
            <p>{project.text}</p>
          </Link>
        ))}
      </div>

    </main>
  )
}

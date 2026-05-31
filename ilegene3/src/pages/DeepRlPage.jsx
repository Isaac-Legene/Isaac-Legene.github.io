import { useEffect, useState } from 'react'
import ShinyText from '../components/ShinyText'
import './DeepRlPage.css'

const LEGACY_BASE = '/legacy/class-projects/cs8803-drl/'

const TOC = [
  { id: 'abstract', label: 'Abstract' },
  { id: 'overview', label: 'Overview' },
  { id: 'method', label: 'Methodology' },
  { id: 'results', label: 'Results' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'references', label: 'References' },
]

const HIGHLIGHTS = [
  {
    index: '(01)',
    title: 'PPO + Self-Play',
    body: 'Proximal Policy Optimization with archived opponent policies to handle non-stationarity in 2v2 SoccerTwos.',
  },
  {
    index: '(02)',
    title: 'Reward Shaping',
    body: 'Potential-based dense rewards for goal proximity and ball control to address sparse goal signals.',
  },
  {
    index: '(03)',
    title: '15M Timesteps',
    body: 'Curriculum learning, observation augmentation, and league-style evaluation across 200-game matchups.',
  },
]

function resolveLegacyPath(basePath, rel) {
  if (!rel) return rel
  if (rel.startsWith('http') || rel.startsWith('data:') || rel.startsWith('/')) return rel

  let path = rel
  const baseParts = basePath.split('/').filter(Boolean)
  while (path.startsWith('../')) {
    path = path.slice(3)
    baseParts.pop()
  }
  if (path.startsWith('./')) path = path.slice(2)

  return '/' + [...baseParts, path].join('/')
}

function rewriteLegacyUrls(root, basePath = LEGACY_BASE) {
  root.querySelectorAll('[src]').forEach((el) => {
    const src = el.getAttribute('src')
    if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) return
    el.setAttribute('src', resolveLegacyPath(basePath, src))
    if (el.tagName.toLowerCase() === 'video') el.setAttribute('preload', 'metadata')
  })
}

export default function DeepRlPage() {
  const [reportHtml, setReportHtml] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadLegacy() {
      const base = import.meta.env.BASE_URL || '/'
      const resp = await fetch(`${base}legacy/class-projects/cs8803-drl/index.html`)
      if (!resp.ok) throw new Error(`Failed to load DRL legacy page: ${resp.status}`)
      const text = await resp.text()
      if (cancelled) return

      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'text/html')
      const content = doc.querySelector('.content.markdown-body')

      if (content) {
        const clone = content.cloneNode(true)
        rewriteLegacyUrls(clone)
        if (!cancelled) setReportHtml(clone.innerHTML)
      } else if (!cancelled) {
        setReportHtml('')
      }
    }

    loadLegacy()
      .catch(() => {
        if (!cancelled) setReportHtml('')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="page deep-rl-page">
      <section className="drl-hero reveal">
        <p className="drl-hero-eyebrow">Deep Reinforcement Learning</p>

        <h1 className="drl-hero-title">
          <ShinyText
            text="Multi-Agent Competition in SoccerTwos."
            speed={2.4}
            color="#c8d0dc"
            shineColor="#ffffff"
            spread={120}
            direction="left"
          />
        </h1>

        <p className="drl-hero-lede">
          Final project on multi-agent RL in competitive environments — PPO, self-play, and potential-based
          reward shaping in the Unity SoccerTwos 2v2 environment.
        </p>

        <p className="drl-hero-authors">Isaac Legene · Aaron Pinder · Yatin Chandar</p>

        <div className="drl-hero-tags">
          <span>PPO + Self-Play</span>
          <span>Reward Shaping</span>
          <span>Multi-Agent</span>
        </div>

        <a className="drl-see-works" href="#report">
          SEE REPORT ↓
        </a>
      </section>

      <section className="drl-highlights reveal delay-1" aria-label="Project highlights">
        {HIGHLIGHTS.map((item) => (
          <article key={item.index} className="drl-highlight">
            <p className="drl-highlight-index">{item.index}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section id="report" className="drl-report-shell reveal delay-2">
        <aside className="drl-toc" aria-label="Report contents">
          <p className="drl-toc-label">Contents</p>
          <nav>
            {TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {loading ? (
          <p className="drl-loading">Loading report…</p>
        ) : reportHtml ? (
          <article className="deep-rl-report" dangerouslySetInnerHTML={{ __html: reportHtml }} />
        ) : (
          <p className="drl-loading">Could not load report content.</p>
        )}
      </section>
    </main>
  )
}

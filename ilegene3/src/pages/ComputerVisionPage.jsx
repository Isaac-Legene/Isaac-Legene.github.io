import { useEffect, useState } from 'react'
import ShinyText from '../components/ShinyText'
import './DeepRlPage.css'
import './ComputerVisionPage.css'

const LEGACY_BASE = '/legacy/class-projects/cs6746-cv/'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'project-1', label: 'P1 — Hybrid Images' },
  { id: 'project-2', label: 'P2 — SIFT' },
  { id: 'project-3', label: 'P3 — Recognition' },
  { id: 'project-4', label: 'P4 — Segmentation' },
  { id: 'project-5', label: 'P5 — PointNet' },
  { id: 'project-6', label: 'P6 — NeRF' },
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
  root.querySelectorAll('[href]').forEach((el) => {
    const href = el.getAttribute('href')
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('/')) {
      return
    }
    if (href.includes('class-projects.html')) {
      el.setAttribute('href', '/projects')
      return
    }
    if (href.endsWith('index.html')) {
      el.setAttribute('href', '/projects')
      return
    }
    el.setAttribute('href', resolveLegacyPath(basePath, href))
  })

  root.querySelectorAll('[src]').forEach((el) => {
    const src = el.getAttribute('src')
    if (!src || src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) return
    el.setAttribute('src', resolveLegacyPath(basePath, src))
    if (el.tagName.toLowerCase() === 'img') el.setAttribute('loading', 'lazy')
    if (el.tagName.toLowerCase() === 'video') el.setAttribute('preload', 'metadata')
  })
}

export default function ComputerVisionPage() {
  const [reportHtml, setReportHtml] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadLegacy() {
      const base = import.meta.env.BASE_URL || '/'
      const resp = await fetch(`${base}legacy/class-projects/cs6746-cv/index.html`)
      if (!resp.ok) throw new Error(`Failed to load Computer Vision legacy page: ${resp.status}`)
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
    <main className="page deep-rl-page cv-page">
      <header className="cv-hero-header reveal">
        <div className="cv-hero-main">
          <p className="drl-hero-eyebrow">Computer Vision</p>

          <h1 className="drl-hero-title">
            <ShinyText
              text="CS 6746 — Computer Vision."
              speed={2.4}
              color="#c8d0dc"
              shineColor="#ffffff"
              spread={120}
              direction="left"
            />
          </h1>

          <p className="drl-hero-lede">
            Six Georgia Tech projects spanning classical image processing, deep recognition and segmentation, and 3D
            perception with point clouds and neural radiance fields.
          </p>

          <p className="drl-hero-authors">Isaac Legene</p>

          <div className="drl-hero-tags">
            <span>Hybrid Images</span>
            <span>SIFT</span>
            <span>PSPNet</span>
            <span>PointNet</span>
            <span>NeRF</span>
          </div>

          <a className="drl-see-works" href="#overview">
            SEE PROJECTS ↓
          </a>
        </div>

        <aside className="cv-toc drl-toc" aria-label="Report contents">
          <p className="drl-toc-label">Contents</p>
          <nav>
            {TOC.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
      </header>

      <section id="report" className="cv-report-full reveal delay-1">
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

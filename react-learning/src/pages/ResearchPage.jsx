import { useEffect, useState } from 'react'

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

function rewriteLegacyUrls(root, basePath = '/legacy/class-projects/lidar-lab-research/') {
  root.querySelectorAll('[src]').forEach((el) => {
    const src = el.getAttribute('src')
    if (!src) return
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('/')) return
    el.setAttribute('src', resolveLegacyPath(basePath, src))
    if (el.tagName.toLowerCase() === 'img') el.setAttribute('loading', 'lazy')
    if (el.tagName.toLowerCase() === 'video') el.setAttribute('preload', 'metadata')
  })

  root.querySelectorAll('[href]').forEach((el) => {
    const href = el.getAttribute('href')
    if (!href) return
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('/')) return

    if (href.endsWith('index.html')) {
      el.setAttribute('href', '/projects')
      return
    }
    if (href.includes('../../experience.html')) {
      el.setAttribute('href', '/experience')
      return
    }

    el.setAttribute('href', resolveLegacyPath(basePath, href))
  })
}

export default function ResearchPage() {
  const [pageHtml, setPageHtml] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadLegacy() {
      const resp = await fetch('/legacy/class-projects/lidar-lab-research/index.html')
      const text = await resp.text()
      if (cancelled) return
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'text/html')
      const main = doc.querySelector('.page') || doc.querySelector('main')
      // Inject legacy styles into head so layout & sizes match original page
      const styleBlocks = Array.from(doc.querySelectorAll('style'))
      if (styleBlocks.length) {
        const combined = styleBlocks.map((s) => s.textContent || '').join('\n')
        const rewritten = combined.replace(/url\((?:"|'|)(?!https?:|data:|\/)([^)"']+)(?:"|'|)\)/g, (m, p1) => {
          const newPath = resolveLegacyPath('/legacy/class-projects/lidar-lab-research/', p1.trim())
          return `url(${newPath})`
        })
        const styleId = 'legacy-styles-research'
        let headStyle = document.getElementById(styleId)
        if (!headStyle) {
          headStyle = document.createElement('style')
          headStyle.id = styleId
          headStyle.innerHTML = rewritten
          document.head.appendChild(headStyle)
        } else {
          headStyle.innerHTML = rewritten
        }
      }
      if (main) {
        const clone = main.cloneNode(true)
        rewriteLegacyUrls(clone, '/legacy/class-projects/lidar-lab-research/')
        if (!cancelled) setPageHtml(clone.outerHTML)
      } else {
        if (!cancelled) setPageHtml(text)
      }
    }

    loadLegacy().catch(() => {
      if (!cancelled) setPageHtml('')
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="page legacy-embed">
      {pageHtml ? (
        <div className="legacy-content" dangerouslySetInnerHTML={{ __html: pageHtml }} />
      ) : (
        <section className="content-section reveal">
          <p className="eyebrow">Research</p>
          <h1>Loading legacy Research content...</h1>
        </section>
      )}
    </main>
  )
}

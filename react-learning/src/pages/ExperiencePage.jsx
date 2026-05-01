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

function rewriteLegacyUrls(root, basePath = '/legacy/') {
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

    if (href === 'index.html') {
      el.setAttribute('href', '/')
      return
    }
    if (href.endsWith('experience.html')) {
      el.setAttribute('href', '/experience')
      return
    }
    if (href.includes('class-projects/lidar-lab-research')) {
      el.setAttribute('href', '/research')
      return
    }

    el.setAttribute('href', resolveLegacyPath(basePath, href))
  })
}

export default function ExperiencePage() {
  const [pageHtml, setPageHtml] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadLegacy() {
      const resp = await fetch('/legacy/experience.html')
      const text = await resp.text()
      if (cancelled) return
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'text/html')
      const main = doc.querySelector('.page') || doc.querySelector('main')
      // Extract legacy <style> blocks and inject into document head (scoped)
      const styleBlocks = Array.from(doc.querySelectorAll('style'))
      if (styleBlocks.length) {
        const combined = styleBlocks.map((s) => s.textContent || '').join('\n')
        // rewrite url(...) paths inside styles to absolute legacy paths
        const rewritten = combined.replace(/url\((?:"|'|)(?!https?:|data:|\/)([^)"']+)(?:"|'|)\)/g, (m, p1) => {
          const newPath = resolveLegacyPath('/legacy/', p1.trim())
          return `url(${newPath})`
        })
        const styleId = 'legacy-styles-experience'
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
        rewriteLegacyUrls(clone, '/legacy/')
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
          <p className="eyebrow">Experience</p>
          <h1>Loading legacy Experience content...</h1>
        </section>
      )}
    </main>
  )
}

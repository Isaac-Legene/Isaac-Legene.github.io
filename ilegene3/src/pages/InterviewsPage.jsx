import { useEffect, useMemo, useState } from 'react'
import ShinyText from '../components/ShinyText'
import './InterviewsPage.css'

function formatDate(value) {
  if (!value) return 'Date unknown'
  const dt = new Date(value)
  if (Number.isNaN(dt.getTime())) return value
  return dt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function InterviewsPage() {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const base = import.meta.env.BASE_URL || '/'

    fetch(`${base}data/interviews.json`)
      .then((resp) => {
        if (!resp.ok) throw new Error(`Failed to load interviews (${resp.status})`)
        return resp.json()
      })
      .then((payload) => {
        if (!cancelled) setData(payload)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const interviews = useMemo(() => {
    if (!data?.interviews) return []
    const q = query.trim().toLowerCase()
    if (!q) return data.interviews
    return data.interviews.filter((item) =>
      [item.company, item.position, item.date, item.evidence]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [data, query])

  const companyCounts = useMemo(() => {
    const counts = new Map()
    for (const item of interviews) {
      counts.set(item.company, (counts.get(item.company) || 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [interviews])

  return (
    <main className="page interviews-page">
      <section className="reveal">
        <p className="eyebrow">Graduate job search</p>
        <h1>
          <ShinyText
            text="Interview history."
            speed={2.2}
            color="#9aa7b8"
            shineColor="#ffffff"
            spread={120}
            direction="left"
          />
        </h1>
        {data ? (
          <p className="lede interviews-meta">
            {data.stats.interviews} interviews across {data.stats.companies} companies.
            {data.generated_at ? ` Updated ${formatDate(data.generated_at)}.` : ''}
          </p>
        ) : null}
      </section>

      {error ? (
        <section className="content-section reveal delay-1">
          <p>{error}</p>
        </section>
      ) : null}

      {!data && !error ? (
        <section className="content-section reveal delay-1">
          <p className="lede">Loading interviews...</p>
        </section>
      ) : null}

      {data ? (
        <>
          <section className="interviews-toolbar reveal delay-1">
            <input
              type="search"
              className="interviews-search"
              placeholder="Search company or position..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search interviews"
            />
          </section>

          <section className="stats-grid reveal delay-2">
            <div className="stat-card">
              <p>Interviews</p>
              <h3>{interviews.length}</h3>
            </div>
            <div className="stat-card">
              <p>Companies</p>
              <h3>{companyCounts.length}</h3>
            </div>
            <div className="stat-card">
              <p>Latest</p>
              <h3>{interviews[0] ? formatDate(interviews[0].date) : '—'}</h3>
            </div>
          </section>

          <section className="content-section reveal delay-3">
            <div className="section-heading">
              <h2>By company</h2>
            </div>
            <div className="interviews-company-grid">
              {companyCounts.map(([company, count]) => (
                <div key={company} className="interviews-company-chip">
                  <strong>{company}</strong>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section reveal delay-4">
            <div className="section-heading">
              <h2>All interviews</h2>
            </div>
            <div className="interviews-table-wrap">
              <table className="interviews-table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Company</th>
                    <th scope="col">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {interviews.map((item, index) => (
                    <tr key={`${item.company}-${item.date}-${index}`}>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.company}</td>
                      <td>{item.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </main>
  )
}

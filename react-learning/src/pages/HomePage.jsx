export default function HomePage() {
  return (
    <main className="page page-home">
      <section className="home-simple home-simple-grid reveal">
        <div>
          <p className="eyebrow">Isaac Legene</p>
          <h1>Robotics Engineer</h1>
          <p className="lede">
            Humanoid learning, controls integration, and research across simulation and hardware.
          </p>
          <div className="home-simple-links home-icon-links">
            <a className="button button-secondary icon-link" href="https://play.unity.com/en/user/5cc45f2f-e3e8-4f9f-82aa-cf762efe00d1" target="_blank" rel="noreferrer">
              <img src="/unity-logo-home.png" alt="" aria-hidden="true" />
              <span>Unity</span>
            </a>
            <a className="button button-secondary icon-link" href="https://github.gatech.edu/ilegene3" target="_blank" rel="noreferrer">
              <svg className="git-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.398 7.861 10.92.575.106.786-.25.786-.556 0-.274-.01-1-.015-1.962-3.198.695-3.873-1.54-3.873-1.54-.523-1.327-1.278-1.68-1.278-1.68-1.045-.714.08-.7.08-.7 1.154.08 1.76 1.186 1.76 1.186 1.026 1.757 2.693 1.25 3.348.955.104-.744.402-1.25.732-1.538-2.553-.29-5.238-1.277-5.238-5.684 0-1.255.45-2.282 1.186-3.085-.119-.291-.514-1.46.113-3.045 0 0 .967-.31 3.168 1.178A11.03 11.03 0 0 1 12 6.317a11 11 0 0 1 2.885.388c2.199-1.489 3.164-1.178 3.164-1.178.63 1.586.234 2.754.115 3.045.739.803 1.184 1.83 1.184 3.085 0 4.418-2.69 5.39-5.252 5.674.413.356.78 1.058.78 2.133 0 1.541-.013 2.783-.013 3.162 0 .309.207.668.79.555C20.21 21.395 23.5 17.083 23.5 12c0-6.351-5.149-11.5-11.5-11.5Z"
                />
              </svg>
              <span>Git</span>
            </a>
            <a className="button button-secondary icon-link" href="/IaacLegene-3-1-25.pdf" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 21 20" aria-hidden="true"><use href="/icons.svg#documentation-icon" /></svg>
              <span>Resume</span>
            </a>
            <a className="button button-secondary icon-link" href="https://www.linkedin.com/in/isaac-legene-b298a9a1/" target="_blank" rel="noreferrer">
              <span className="linkedin-mark" aria-hidden="true">in</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <img src="/images/headshotnobackground.png" alt="Isaac Legene" className="home-simple-image" />
      </section>
    </main>
  )
}

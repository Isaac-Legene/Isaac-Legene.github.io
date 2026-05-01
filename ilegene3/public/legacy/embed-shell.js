if (window.top !== window.self) {
  document.documentElement.classList.add('embedded-shell')

  const style = document.createElement('style')
  style.textContent = `
    html.embedded-shell nav {
      display: none !important;
    }

    html.embedded-shell body {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
  `

  document.head.appendChild(style)
}
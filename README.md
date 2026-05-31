# Isaac Legene — Portfolio (GitHub Pages)

Live site: https://isaac-legene.github.io/

## Structure

| Path | Purpose |
|------|---------|
| `ilegene3/` | React source (Vite + React Router) |
| `legacy/` | Static HTML, media, and embeds served at `/legacy/...` |
| `assets/`, `index.html` | Production build output (do not edit by hand) |
| `deploy.ps1` | Build and copy artifacts to repo root |

## Develop

```powershell
.\launch-dev.ps1
```

Opens http://localhost:5173

## Deploy

```powershell
.\deploy.ps1
git add -A
git commit -m "Deploy site build"
git push
```

## Routes

- `/` — Home
- `/experience` — Experience (legacy HTML embed)
- `/research` — Research
- `/projects` — Project list
- `/projects/deep-rl` — Deep RL report
- `/projects/minetrack` — Machine Learning (MineTrack)

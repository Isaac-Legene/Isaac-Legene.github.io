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

`deploy.ps1` copies `index.html` → `404.html` so refreshing deep links (e.g. `/experience`) works on GitHub Pages.

## Routes

- `/` — Home
- `/experience` — Experience (legacy HTML embed)
- `/research` — Research
- `/projects` — Project list
- `/projects/deep-rl` — Deep RL report
- `/projects/minetrack` — Machine Learning (MineTrack)
- `/interviews` — Graduate job search interview history

## Interview data

Before deploy, export from the job-search dashboard:

```powershell
python "c:\Users\isaac\Documents\Humanoid job search\dashboard\export_interviews.py"
```

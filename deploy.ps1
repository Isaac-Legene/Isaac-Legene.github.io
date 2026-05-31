# Build React app and publish to GitHub Pages root.
# Run from repo root: .\deploy.ps1

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

Push-Location (Join-Path $root 'ilegene3')
npm run build
Pop-Location

Copy-Item -Path (Join-Path $root 'ilegene3\dist\*') -Destination $root -Recurse -Force
Copy-Item -Path (Join-Path $root 'ilegene3\public\legacy\*') -Destination (Join-Path $root 'legacy') -Recurse -Force
Copy-Item -Path (Join-Path $root 'legacy\class-projects\*') -Destination (Join-Path $root 'class-projects') -Recurse -Force
Copy-Item -Path (Join-Path $root 'legacy\experience.html') -Destination (Join-Path $root 'experience.html') -Force

Write-Host 'Deploy copy complete. Review with: git status'
Write-Host 'Then: git add -A && git commit -m "Deploy site build" && git push'

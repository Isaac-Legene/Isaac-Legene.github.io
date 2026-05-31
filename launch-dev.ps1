# Start the portfolio live preview (ilegene3 / Vite).
# Usage:
#   .\launch-dev.ps1           # dev server + external browser
#   .\launch-dev.ps1 -InCursor # dev server + open repo in Cursor (use task for in-editor preview)

param([switch]$InCursor)

$ErrorActionPreference = "Stop"
$RepoRoot = $PSScriptRoot
$AppDir = Join-Path $RepoRoot "ilegene3"
$Url = "http://localhost:5173"
$CursorCli = "$env:LOCALAPPDATA\Programs\cursor\resources\app\bin\cursor.cmd"

if (-not (Test-Path $AppDir)) {
    Write-Error "App folder not found: $AppDir"
    exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed or not on PATH. Install from https://nodejs.org"
    exit 1
}

Set-Location $AppDir

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies (first run)..."
    npm install
}

if ($InCursor -and (Test-Path $CursorCli)) {
    Write-Host "Opening portfolio workspace in Cursor..."
    Start-Process $CursorCli -ArgumentList "`"$RepoRoot`""
    Write-Host "In Cursor: Ctrl+Shift+P -> Tasks: Run Task -> portfolio: open in Cursor"
    Write-Host "Or: Ctrl+Shift+P -> Simple Browser: Show -> $Url"
    Write-Host ""
}

Write-Host "Starting portfolio live preview"
Write-Host "  Local:  $Url"
Write-Host "  Stop:   Ctrl+C"
Write-Host ""

npm run dev

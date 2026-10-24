param(
  [string]$Url = 'http://127.0.0.1:8123/index.html',
  [string]$Shots = '[]',
  [string]$Out = 'shots',
  [int]$Port = 9333
)
$ErrorActionPreference = 'Continue'
$base = Join-Path $env:LOCALAPPDATA 'Temp\opencode'
$prof = Join-Path $base ("edgeprof-" + (Get-Random))
New-Item -ItemType Directory -Force -Path $prof | Out-Null

Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" -ErrorAction SilentlyContinue |
  Where-Object { $_.CommandLine -like "*--remote-debugging-port=$Port*" } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 500

$edgeArgs = @(
  '--headless=new', "--remote-debugging-port=$Port", "--user-data-dir=$prof",
  '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader',
  '--no-first-run', '--no-default-browser-check', '--disable-extensions',
  '--window-size=1360,800', '--hide-scrollbars', 'about:blank'
)
$edge = Start-Process -FilePath 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -ArgumentList $edgeArgs -WindowStyle Hidden -PassThru
Start-Sleep 3
$ok = $false
for ($i = 0; $i -lt 20; $i++) {
  try { Invoke-WebRequest -Uri "http://127.0.0.1:$Port/json/version" -UseBasicParsing -TimeoutSec 2 | Out-Null; $ok = $true; break } catch { Start-Sleep 1 }
}
if (-not $ok) { Write-Output 'EDGE CDP NOT UP'; exit 1 }

Push-Location (Split-Path $PSScriptRoot -Parent)
node tools/shot.mjs $Url $Out $Shots
$code = $LASTEXITCODE
Pop-Location
Stop-Process -Id $edge.Id -Force -ErrorAction SilentlyContinue
exit $code

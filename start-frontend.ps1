# Script PowerShell untuk menjalankan frontend PITIPAW

Write-Host "=== PITIPAW Frontend Launcher ===" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>$null
    Write-Host "✅ Python ditemukan: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python tidak ditemukan. Install Python terlebih dahulu." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check backend status
Write-Host "🔍 Checking backend connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method Get -TimeoutSec 3 -ErrorAction Stop
    Write-Host "✅ Backend terhubung di http://localhost:5000" -ForegroundColor Green
    $backendStatus = "CONNECTED"
} catch {
    Write-Host "⚠️  Backend tidak terhubung - akan menggunakan mode fallback" -ForegroundColor Yellow
    $backendStatus = "OFFLINE"
}

Write-Host ""
Write-Host "🚀 Starting frontend server..." -ForegroundColor Cyan
Write-Host "📍 Frontend akan tersedia di: http://localhost:8000" -ForegroundColor Blue
Write-Host ""

if ($backendStatus -eq "CONNECTED") {
    Write-Host "🟢 Mode: Production (dengan backend)" -ForegroundColor Green
} else {
    Write-Host "🟡 Mode: Demo (tanpa backend)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Available pages:" -ForegroundColor Cyan
Write-Host "   • Landing Page: http://localhost:8000" -ForegroundColor White
Write-Host "   • Product Page: http://localhost:8000/user.html" -ForegroundColor White
Write-Host "   • Login Page: http://localhost:8000/login.html" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Tekan Ctrl+C untuk stop server" -ForegroundColor Red
Write-Host ""

# Auto-open browser
Start-Process "http://localhost:8000"

# Start Python HTTP server
python -m http.server 8000

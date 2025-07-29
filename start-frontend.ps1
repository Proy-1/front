# PITIPAW Frontend Server
# Script untuk menjalankan frontend di port 3000

Write-Host "=== PITIPAW Frontend ===" -ForegroundColor Cyan
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

# Check backend status (optional)
Write-Host "🔍 Checking backend connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method Get -TimeoutSec 3 -ErrorAction Stop
    Write-Host "✅ Backend terhubung di http://localhost:5000" -ForegroundColor Green
    $backendStatus = "ONLINE"
} catch {
    Write-Host "⚠️  Backend offline - menggunakan mode demo" -ForegroundColor Yellow
    $backendStatus = "OFFLINE"
}

Write-Host ""
Write-Host "🚀 Starting PITIPAW Frontend..." -ForegroundColor Cyan
Write-Host "📍 URL: http://localhost:3000" -ForegroundColor Blue
Write-Host ""

if ($backendStatus -eq "ONLINE") {
    Write-Host "🟢 Mode: Production (dengan backend)" -ForegroundColor Green
} else {
    Write-Host "🟡 Mode: Demo (tanpa backend)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Available pages:" -ForegroundColor Cyan
Write-Host "   • Home: http://localhost:3000" -ForegroundColor White
Write-Host "   • Shop: http://localhost:3000/user.html" -ForegroundColor White
Write-Host "   • Login: http://localhost:3000/login.html" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Tekan Ctrl+C untuk stop server" -ForegroundColor Red
Write-Host ""

# Auto-open browser
Start-Process "http://localhost:3000"

# Start Python HTTP server
python -m http.server 3000

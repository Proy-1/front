@echo off
REM PITIPAW Frontend Server

echo === PITIPAW Frontend ===
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python tidak ditemukan. Install Python terlebih dahulu.
    pause
    exit /b 1
)

echo ✅ Python ditemukan
echo.

REM Check backend status (optional)
echo 🔍 Checking backend connection...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend terhubung di http://localhost:5000
    set BACKEND_STATUS=ONLINE
) else (
    echo ⚠️  Backend offline - menggunakan mode demo
    set BACKEND_STATUS=OFFLINE
)

echo.
echo 🚀 Starting PITIPAW Frontend...
echo 📍 URL: http://localhost:3000
echo.

if "%BACKEND_STATUS%"=="ONLINE" (
    echo 🟢 Mode: Production (dengan backend)
) else (
    echo 🟡 Mode: Demo (tanpa backend)
)

echo.
echo 📋 Available pages:
echo    • Home: http://localhost:3000
echo    • Shop: http://localhost:3000/user.html
echo    • Login: http://localhost:3000/login.html
echo.
echo 🛑 Tekan Ctrl+C untuk stop server
echo.

REM Start Python HTTP server
python -m http.server 3000

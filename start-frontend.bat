@echo off
REM Script untuk menjalankan frontend PITIPAW di Windows

echo === PITIPAW Frontend Launcher ===
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

REM Check backend status
echo 🔍 Checking backend connection...
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend terhubung di http://localhost:5000
    set BACKEND_STATUS=CONNECTED
) else (
    echo ⚠️  Backend tidak terhubung - akan menggunakan mode fallback
    set BACKEND_STATUS=OFFLINE
)

echo.
echo 🚀 Starting frontend server...
echo 📍 Frontend akan tersedia di: http://localhost:8000
echo.

if "%BACKEND_STATUS%"=="CONNECTED" (
    echo 🟢 Mode: Production (dengan backend)
) else (
    echo 🟡 Mode: Demo (tanpa backend)
)

echo.
echo 📋 Available pages:
echo    • Landing Page: http://localhost:8000
echo    • Product Page: http://localhost:8000/user.html
echo    • Login Page: http://localhost:8000/login.html
echo.
echo 🛑 Tekan Ctrl+C untuk stop server
echo.

REM Start Python HTTP server
python -m http.server 8000

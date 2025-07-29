@echo off
echo ==============================================
echo        PITIPAW CRAFT - Launch Options
echo ==============================================
echo.
echo Status Backend Dashboard: ONLINE ✅ (port 5000)
echo.
echo Pilih cara menjalankan frontend:
echo.
echo [1] Quick Start (file://)
echo     - Cepat tapi ada CORS limitation
echo     - Hanya tampilkan produk demo
echo.
echo [2] Development Server (RECOMMENDED)
echo     - HTTP server di port 3000
echo     - TIDAK ada masalah CORS
echo     - Tampilkan produk ASLI dari dashboard
echo.
echo [3] Test Integration (troubleshooting)
echo     - Test koneksi backend
echo     - Debugging tools
echo.

choice /c 123 /n /m "Pilih opsi (1-3): "

if errorlevel 3 goto test
if errorlevel 2 goto server  
if errorlevel 1 goto quick

:quick
echo.
echo [Quick Start] Membuka user.html langsung...
echo ⚠️  Perhatian: Mungkin tampil produk demo karena CORS
start "" "user.html"
goto end

:server
echo.
echo [Development Server] Starting HTTP server...
echo ✅ Solusi terbaik untuk melihat produk dashboard
call fix-cors.bat
goto end

:test
echo.
echo [Test Integration] Running integration tests...
powershell -ExecutionPolicy Bypass -File "test-integration.ps1"
goto end

:end
echo.
echo ==============================================
pause

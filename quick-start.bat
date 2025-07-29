@echo off
echo ==============================================
echo        PITIPAW CRAFT - Quick Start
echo ==============================================
echo.

echo [1] Membuka user.html di browser...
start "" "user.html"

echo.
echo [2] Instruksi menjalankan backend dashboard:
echo    - Buka terminal baru
echo    - cd ke folder dashboard-1
echo    - Jalankan: go run main.go
echo    - Backend akan berjalan di http://localhost:5000
echo.

echo [3] Setelah backend berjalan:
echo    - Refresh halaman user.html
echo    - Produk dari dashboard akan muncul otomatis
echo.

echo ==============================================
echo Tekan tombol apa saja untuk menutup...
pause >nul

@echo off
echo ===============================================
echo       PITIPAW - MENGATASI MASALAH CORS
echo ===============================================
echo.
echo ❌ MASALAH: Mode Offline karena CORS policy
echo ✅ SOLUSI: Menjalankan HTTP server di port 3000
echo.
echo Backend dashboard sudah berjalan di port 5000 ✅
echo Sekarang menjalankan frontend di port 3000...
echo.
echo 🌐 Frontend akan tersedia di: http://localhost:3000
echo 📱 User page: http://localhost:3000/user.html
echo.
echo 🛑 Tekan Ctrl+C untuk stop server
echo ===============================================
echo.

python -m http.server 3000

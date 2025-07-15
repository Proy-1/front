#!/bin/bash
# Script untuk menjalankan frontend PITIPAW

echo "=== PITIPAW Frontend Launcher ==="
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python tidak ditemukan. Install Python terlebih dahulu."
    exit 1
fi

echo "✅ Python ditemukan: $PYTHON_CMD"

# Check backend status
echo "🔍 Checking backend connection..."
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend terhubung di http://localhost:5000"
    BACKEND_STATUS="CONNECTED"
else
    echo "⚠️  Backend tidak terhubung - akan menggunakan mode fallback"
    BACKEND_STATUS="OFFLINE"
fi

echo ""
echo "🚀 Starting frontend server..."
echo "📍 Frontend akan tersedia di: http://localhost:8000"
echo ""

if [ "$BACKEND_STATUS" = "CONNECTED" ]; then
    echo "🟢 Mode: Production (dengan backend)"
else
    echo "🟡 Mode: Demo (tanpa backend)"
fi

echo ""
echo "📋 Available pages:"
echo "   • Landing Page: http://localhost:8000"
echo "   • Product Page: http://localhost:8000/user.html"
echo "   • Login Page: http://localhost:8000/login.html"
echo ""
echo "🛑 Tekan Ctrl+C untuk stop server"
echo ""

# Start Python HTTP server
$PYTHON_CMD -m http.server 8000

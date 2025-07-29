# PITIPAW Craft - Frontend Integration

## 🎯 Cara Menampilkan Produk dari Dashboard ke User.html

### 1. Pastikan Backend Dashboard Berjalan

```bash
# Masuk ke folder dashboard
cd path/to/dashboard-1

# Jalankan backend Go
go run main.go
```

Backend akan berjalan di: `http://localhost:5000`

### 2. Buka Frontend

```bash
# Langsung buka user.html di browser
# Atau gunakan quick start
quick-start.bat
```

### 3. Verifikasi Koneksi

Di `user.html` akan terlihat:
- 🟢 **Backend Terhubung** - Produk akan dimuat dari dashboard
- 🟡 **Mode Offline** - Menampilkan produk demo/fallback

## 📦 Cara Kerja Integrasi

### Alur Data Produk

1. **Frontend** memanggil API `http://localhost:5000/api/products`
2. **Backend Dashboard** mengirim data produk dari database
3. **API Service** memproses gambar dan normalisasi data
4. **User Interface** menampilkan produk secara real-time

### Format Data yang Didukung

Backend dapat mengirim produk dengan struktur:
```json
{
  "products": [
    {
      "_id": "12345",
      "name": "Nama Produk",
      "price": 15000,
      "image_url": "uploads/gambar.jpg",
      "description": "Deskripsi produk",
      "category": "strap-bag",
      "stock": 10
    }
  ]
}
```

### Auto-Fallback

Jika backend tidak tersedia:
- Otomatis beralih ke mode fallback
- Menampilkan 6 produk demo
- Tetap fungsional untuk development

## 🖼️ Pengelolaan Gambar

### Format URL yang Didukung

- `uploads/filename.jpg` → `http://localhost:5000/static/uploads/filename.jpg`
- `http://full-url.com/image.jpg` → tetap menggunakan full URL
- `img/local.png` → menggunakan gambar lokal frontend

### Fallback Gambar

Jika gambar tidak dapat dimuat:
- Otomatis menggunakan `img/Pitipaw.png`
- Console akan menampilkan warning untuk debugging

## 🔧 Troubleshooting

### Backend Tidak Terhubung

```
❌ Backend Error
```

**Solusi:**
1. Pastikan Go backend berjalan di port 5000
2. Cek CORS settings di backend
3. Pastikan endpoint `/api/products` dan `/api/health` tersedia

### Produk Tidak Muncul

```
🟡 Mode Offline - 6 produk fallback
```

**Solusi:**
1. Tambah produk melalui dashboard admin
2. Pastikan endpoint `/api/products` mengembalikan data
3. Cek console browser untuk error details

### Gambar Tidak Muncul

**Solusi:**
1. Pastikan gambar di folder `uploads/` di backend
2. Cek static file serving di backend
3. Verifikasi CORS untuk static files

## 📱 Fitur Frontend

### Real-time Updates

- **Auto-refresh** status backend setiap 5 menit
- **Manual refresh** dengan tombol "Refresh Produk"
- **Live product count** dari dashboard vs fallback

### User Experience

- **Loading indicators** saat memuat data
- **Error handling** yang user-friendly
- **Product modal** untuk detail produk
- **Responsive design** untuk mobile

## 🚀 Quick Start Commands

### Opsi 1: Menu Launcher (Recommended)
```bash
launch-menu.bat
```
Akan muncul menu:
- [1] Quick Start - Buka langsung user.html  
- [2] Development Server - HTTP server di port 3000
- [3] Test Integration - Troubleshooting tools

### Opsi 2: Direct Commands
```bash
# Quick start (simple)
quick-start.bat

# Development server (professional)  
start-frontend.bat
# atau
start-frontend.ps1

# Integration testing
test-integration.bat
# atau 
test-integration.ps1
```

## 📝 Log Console

Monitor integrasi melalui Developer Tools:

```
🚀 Initializing PITIPAW frontend...
📍 Backend URL: http://localhost:5000
🔍 Backend health check result: true
🌐 Fetching products from dashboard backend
📦 Loaded 8 products from dashboard backend
✅ Integration successful!
```

---

**💡 Tips:**
- Gunakan browser Developer Tools untuk debugging
- Check Network tab untuk melihat API calls
- Monitor Console untuk status integrasi

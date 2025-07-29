# PITIPAW Frontend

Frontend untuk toko online PITIPAW Craft yang dapat berjalan standalone atau terintegrasi dengan backend API.

## 🚀 Fitur

- **Tampilan Produk Dinamis**: Mengambil data produk dari backend API (jika tersedia)
- **Mode Fallback**: Tetap berfungsi dengan data static jika backend offline
- **Detail Produk**: Halaman detail lengkap untuk setiap produk
- **WhatsApp Integration**: Langsung chat untuk pembelian
- **Responsive Design**: Tampil baik di desktop dan mobile
- **Standalone**: Bisa berjalan tanpa dependency repo lain

## 📋 Quick Start

### Menjalankan Frontend

```powershell
# Metode 1: PowerShell (Recommended)
.\start-frontend.ps1

# Metode 2: Command Prompt
.\start-frontend.bat

# Metode 3: Manual
python -m http.server 3000
```

Frontend akan tersedia di: **http://localhost:3000**

### Integrasi Backend (Opsional)

Jika Anda memiliki backend API yang kompatibel:

1. Pastikan backend berjalan di `http://localhost:5000`
2. API endpoints yang dibutuhkan:
   - `GET /api/health` - Health check
   - `GET /api/products` - Daftar produk
   - `GET /api/products/{id}` - Detail produk

Frontend akan otomatis mendeteksi dan menggunakan backend jika tersedia.

## 🎨 Halaman yang Tersedia

- **`index.html`** - Landing page
- **`user.html`** - Halaman utama produk
- **`product-detail.html`** - Detail produk
- **`login.html`** - Halaman login
- **`register.html`** - Halaman register

## 🔧 Konfigurasi

Edit `js/config.js` untuk menyesuaikan:

```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:5000',  // URL backend API
    frontendPort: 3000,               // Port frontend
    fallbackMode: true,               // Mode fallback
    timeout: 5000                     // Timeout API calls
};
```

## 📦 File Structure

```
frontend/
├── index.html              # Landing page
├── user.html               # Main shop page
├── product-detail.html     # Product detail page
├── login.html              # Login page
├── register.html           # Register page
├── style.css               # Main styles
├── js/
│   ├── config.js          # Configuration
│   └── api-service.js     # API service layer
├── img/                   # Product images
├── start-frontend.ps1     # Start script (PowerShell)
├── start-frontend.bat     # Start script (Batch)
└── README.md              # This file
```

## 📱 Screenshots & Demo

Akses **http://localhost:3000** untuk melihat demo live.

## 📞 Support

- **WhatsApp**: +6283137760847
- **Instagram**: @pitipaw_craft

## 📄 License

MIT License

---

**PITIPAW Craft** - Handmade with ❤️

# PITIPAW Frontend

Frontend untuk toko online PITIPAW Craft yang terintegrasi dengan backend API dan dashboard admin.

## 🚀 Fitur

- **Tampilan Produk Dinamis**: Mengambil data produk dari backend API
- **Mode Fallback**: Tetap berfungsi meskipun backend offline dengan data static
- **Detail Produk**: Halaman detail lengkap untuk setiap produk
- **Keranjang Belanja**: Fungsionalitas add to cart (localStorage)
- **WhatsApp Integration**: Langsung chat untuk pembelian
- **Responsive Design**: Tampil baik di desktop dan mobile
- **Real-time Status**: Menampilkan status koneksi backend

## 🔗 Integrasi

### Backend Repository
- **URL**: https://github.com/Proy-1/back
- **API Base URL**: `http://localhost:5000`
- **Endpoints**:
  - `GET /api/products` - Ambil semua produk
  - `GET /api/products/{id}` - Ambil detail produk
  - `GET /api/health` - Health check
  - Dan lainnya...

### Dashboard Admin
- **URL**: https://github.com/Proy-1/dashboard-1
- **Fungsi**: Mengelola produk (CRUD operations)
- **Access**: Melalui tombol "Dashboard Admin" di halaman produk

## 📋 Setup Instructions

### 1. Setup Backend (Recommended)

Untuk mendapatkan fitur lengkap, setup backend terlebih dahulu:

```bash
# Clone backend repository
git clone https://github.com/Proy-1/back.git
cd back/backend

# Install dependencies
pip install flask flask-cors pymongo python-dotenv werkzeug

# Create .env file
echo "MONGO_URI=mongodb://localhost:27017/pitipaw" > .env

# Run backend
python app.py
```

Backend akan berjalan di: `http://localhost:5000`

### 2. Setup Dashboard (Optional)

```bash
# Clone dashboard repository
git clone https://github.com/Proy-1/dashboard-1.git
cd dashboard-1

# Run dashboard
.\start-dashboard.ps1
# atau
.\start-dashboard.bat
```

### 3. Run Frontend

```bash
# Di folder frontend
python -m http.server 8000
# atau buka index.html langsung di browser
```

Akses di: `http://localhost:8000`

## 🔧 Konfigurasi

### API Configuration

Edit `js/config.js` untuk mengubah konfigurasi:

```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:5000', // Ubah jika backend di URL lain
    endpoints: {
        products: '/api/products',
        health: '/api/health',
        // ...
    },
    fallbackMode: true, // Mode fallback jika backend offline
    timeout: 5000
};
```

### Mode Operasi

#### 1. Dengan Backend (Production Mode)
- ✅ Data produk real-time dari database
- ✅ CRUD operations via dashboard
- ✅ Status koneksi real-time
- ✅ Semua fitur aktif

#### 2. Tanpa Backend (Demo Mode)
- ⚠️ Data produk static/fallback
- ⚠️ Operasi CRUD tidak tersimpan
- ⚠️ Mode offline indicator
- ✅ UI tetap berfungsi normal

## 📞 Support

- **WhatsApp**: +6283137760847
- **Instagram**: @pitipaw_craft
- **Backend Issues**: https://github.com/Proy-1/back/issues
- **Dashboard Issues**: https://github.com/Proy-1/dashboard-1/issues

---

**PITIPAW Craft** - Handmade with ❤️

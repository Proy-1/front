# 🔧 TROUBLESHOOTING: Mode Offline Problem

## ❌ **MASALAH: "Mode Offline" Padahal Backend Berjalan**

### 🔍 **Diagnosis:**
- ✅ Backend dashboard BERJALAN di `http://localhost:5000`
- ✅ Endpoint `/api/products` mengembalikan data produk
- ❌ Frontend tetap menampilkan "Mode Offline"
- ❌ Hanya muncul produk fallback/demo

### 🎯 **ROOT CAUSE: CORS (Cross-Origin Resource Sharing)**

Ketika frontend dibuka dengan `file://` protocol (dobel-klik user.html), browser memblokir request ke `http://localhost:5000` karena kebijakan keamanan CORS.

## ✅ **SOLUSI:**

### **Opsi 1: Gunakan HTTP Server (RECOMMENDED)**

```bash
# Jalankan script fix CORS
fix-cors.bat

# Atau manual
python -m http.server 3000
```

Kemudian buka: `http://localhost:3000/user.html`

### **Opsi 2: Gunakan Menu Launcher**

```bash
launch-menu.bat
# Pilih opsi [2] Development Server
```

### **Opsi 3: Gunakan Start Frontend Script**

```bash
start-frontend.bat
# atau
start-frontend.ps1
```

## 🔬 **Verifikasi Backend (sudah OK):**

```bash
# Health check
curl http://localhost:5000/api/health
# Response: {"database":"connected","status":"ok",...}

# Products check  
curl http://localhost:5000/api/products
# Response: {"products":[{"name":"Baruu",...}, {"name":"Dimsum23",...}]}
```

## 📋 **Data Produk di Backend:**

Saat ini backend memiliki **4 produk**:
1. **Baruu** (Rp 15.000) - elektronik
2. **Dimsum23** (Rp 15.000) - makanan  
3. **Dimsum** (Rp 15.000) - makanan [dengan gambar]
4. **Mentai** (Rp 10.000) - makanan [dengan gambar]

## 🎯 **HASIL SETELAH FIX:**

- ✅ Status: "🟢 Backend Terhubung"
- ✅ Counter: "📦 4 produk (4 dari dashboard)"
- ✅ Produk asli dari dashboard muncul di grid
- ✅ Gambar dari Cloudinary load dengan baik

## 💡 **Tips untuk Development:**

1. **Selalu gunakan HTTP server** untuk development
2. **Jangan buka file:// langsung** untuk testing integrasi
3. **Monitor console** untuk debug CORS issues
4. **Gunakan Network tab** di DevTools untuk melihat blocked requests

---

**🚀 Quick Fix Command:**
```bash
fix-cors.bat
```
Lalu buka: `http://localhost:3000/user.html`

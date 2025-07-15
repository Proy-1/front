// Konfigurasi Frontend PITIPAW
const API_CONFIG = {
    // Backend API URL - ubah sesuai environment
    baseURL: 'http://localhost:5000',
    
    // Static files URL (untuk gambar uploads)
    staticURL: 'http://localhost:5000/static',
    
    // API Endpoints
    endpoints: {
        products: '/api/products',
        health: '/api/health',
        upload: '/api/upload',
        login: '/api/login',
        register: '/api/register',
        stats: '/api/stats'
    },
    
    // Fallback mode jika backend tidak tersedia
    fallbackMode: true,
    
    // Timeout untuk API calls (dalam ms)
    timeout: 5000,
    
    // Frontend port (untuk development)
    frontendPort: 3000
};

// Helper untuk membuat URL lengkap
function getApiUrl(endpoint) {
    return API_CONFIG.baseURL + API_CONFIG.endpoints[endpoint];
}

// Helper untuk URL static files (gambar)
function getStaticUrl(filepath) {
    if (!filepath) return null;
    
    // Jika sudah full URL, return as-is
    if (filepath.startsWith('http://') || filepath.startsWith('https://')) {
        return filepath;
    }
    
    // Jika path relatif lokal (img/), return as-is untuk fallback
    if (filepath.startsWith('img/')) {
        return filepath;
    }
    
    // Jika path uploads dari backend
    if (filepath.startsWith('uploads/')) {
        return `${API_CONFIG.staticURL}/${filepath}`;
    }
    
    // Default: anggap dari uploads
    return `${API_CONFIG.staticURL}/uploads/${filepath}`;
}

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}

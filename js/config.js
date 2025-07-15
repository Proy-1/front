// Konfigurasi Backend API
const API_CONFIG = {
    baseURL: 'http://localhost:5000',
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
    timeout: 5000
};

// Helper untuk membuat URL lengkap
function getApiUrl(endpoint) {
    return API_CONFIG.baseURL + API_CONFIG.endpoints[endpoint];
}

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}

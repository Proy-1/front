// API Service untuk komunikasi dengan backend
class ApiService {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.fallbackMode = API_CONFIG.fallbackMode;
    }

    // Cek koneksi backend
    async checkBackendHealth() {
        try {
            const response = await fetch(getApiUrl('health'), {
                method: 'GET',
                timeout: API_CONFIG.timeout
            });
            return response.ok;
        } catch (error) {
            console.warn('Backend tidak tersedia, menggunakan mode fallback');
            return false;
        }
    }

    // Get all products
    async getProducts() {
        try {
            const isBackendAvailable = await this.checkBackendHealth();
            
            if (isBackendAvailable) {
                const response = await fetch(getApiUrl('products'));
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data.products || data;
            } else {
                // Fallback ke data static
                return this.getFallbackProducts();
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            return this.getFallbackProducts();
        }
    }

    // Fallback products jika backend tidak tersedia
    getFallbackProducts() {
        return [
            { 
                _id: '1',
                name: 'CALMY', 
                price: 15000, 
                imageUrl: 'img/calmy.png',
                description: 'Strap bag dengan desain calm dan elegan',
                category: 'strap-bag',
                stock: 10
            },
            { 
                _id: '2',
                name: 'MARIPOSA', 
                price: 18000, 
                imageUrl: 'img/mrps.png',
                description: 'Keychain dengan motif kupu-kupu cantik',
                category: 'keychain',
                stock: 15
            },
            { 
                _id: '3',
                name: 'SEA', 
                price: 12000, 
                imageUrl: 'img/sea.png',
                description: 'Lanyard dengan tema laut yang menyegarkan',
                category: 'lanyard',
                stock: 8
            },
            { 
                _id: '4',
                name: 'CUTIE', 
                price: 20000, 
                imageUrl: 'img/ct.png',
                description: 'Strap bag dengan desain menggemaskan',
                category: 'strap-bag',
                stock: 12
            },
            { 
                _id: '5',
                name: 'CANDY', 
                price: 15000, 
                imageUrl: 'img/cnd.png',
                description: 'Keychain dengan warna-warna manis',
                category: 'keychain',
                stock: 20
            },
            { 
                _id: '6',
                name: 'BEE', 
                price: 17000, 
                imageUrl: 'img/bee.png',
                description: 'Lanyard dengan motif lebah yang lucu',
                category: 'lanyard',
                stock: 6
            },
        ];
    }

    // Get single product
    async getProduct(id) {
        try {
            const isBackendAvailable = await this.checkBackendHealth();
            
            if (isBackendAvailable) {
                const response = await fetch(`${getApiUrl('products')}/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } else {
                // Fallback: cari dari data static
                const products = this.getFallbackProducts();
                return products.find(p => p._id === id);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            const products = this.getFallbackProducts();
            return products.find(p => p._id === id);
        }
    }

    // Add product (untuk admin dashboard)
    async addProduct(productData) {
        try {
            const isBackendAvailable = await this.checkBackendHealth();
            
            if (isBackendAvailable) {
                const response = await fetch(getApiUrl('products'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } else {
                console.warn('Backend tidak tersedia - operasi add product dalam mode demo');
                return { success: false, message: 'Backend tidak tersedia' };
            }
        } catch (error) {
            console.error('Error adding product:', error);
            return { success: false, message: error.message };
        }
    }

    // Update product
    async updateProduct(id, productData) {
        try {
            const isBackendAvailable = await this.checkBackendHealth();
            
            if (isBackendAvailable) {
                const response = await fetch(`${getApiUrl('products')}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } else {
                console.warn('Backend tidak tersedia - operasi update product dalam mode demo');
                return { success: false, message: 'Backend tidak tersedia' };
            }
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, message: error.message };
        }
    }

    // Delete product
    async deleteProduct(id) {
        try {
            const isBackendAvailable = await this.checkBackendHealth();
            
            if (isBackendAvailable) {
                const response = await fetch(`${getApiUrl('products')}/${id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } else {
                console.warn('Backend tidak tersedia - operasi delete product dalam mode demo');
                return { success: false, message: 'Backend tidak tersedia' };
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, message: error.message };
        }
    }

    // Format harga ke Rupiah
    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    }
}

// Instance global API service
const apiService = new ApiService();

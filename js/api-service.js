// API Service untuk komunikasi dengan backend
class ApiService {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
        this.fallbackMode = API_CONFIG.fallbackMode;
    }

    // Cek koneksi backend
    async checkBackendHealth() {
        try {
            console.log('🔍 Checking backend health at:', getApiUrl('health'));
            const response = await fetch(getApiUrl('health'), {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: API_CONFIG.timeout
            });
            console.log('🔍 Health check response:', response.status, response.ok);
            return response.ok;
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                console.warn('⚠️ CORS Error: Gunakan HTTP server untuk mengatasi masalah ini');
                console.warn('💡 Jalankan: python -m http.server 3000');
                console.warn('💡 Atau gunakan: fix-cors.bat');
            } else {
                console.warn('⚠️ Backend tidak tersedia, menggunakan mode fallback. Error:', error.message);
            }
            return false;
        }
    }

    // Get all products
    async getProducts() {
        try {
            const isBackendAvailable = await this.checkBackendHealth();
            console.log('🔍 Backend health check result:', isBackendAvailable);
            
            if (isBackendAvailable) {
                console.log('🌐 Fetching products from dashboard backend:', getApiUrl('products'));
                const response = await fetch(getApiUrl('products'));
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('📦 Raw response from dashboard backend:', data);
                
                let products = data.products || data;
                console.log('📋 Products array from dashboard:', products);
                
                if (products && products.length > 0) {
                    console.log('✅ Loaded', products.length, 'products from dashboard backend');
                    console.log('🔍 First product example:', products[0]);
                } else {
                    console.log('⚠️ No products found in dashboard, using fallback');
                    return this.getFallbackProducts();
                }
                
                // Smart image URL detection for backend products
                for (const product of products) {
                    // Try different possible field names for image
                    const originalImageUrl = product.imageUrl || 
                                           product.image_url ||  // Backend menggunakan snake_case!
                                           product.image || 
                                           product.imagePath || 
                                           product.img || 
                                           product.photo || 
                                           product.picture ||
                                           product.fileName ||
                                           product.file ||
                                           product.attachment ||
                                           product.media;
                                           
                    console.log(`🖼️ Processing product ${product.name}:`);
                    console.log('  - Original product data:', product);
                    console.log('  - Selected field image_url:', product.image_url);
                    console.log('  - Selected field imageUrl:', product.imageUrl);
                    console.log('  - Final selected URL:', originalImageUrl);
                    
                    if (originalImageUrl && originalImageUrl !== 'undefined' && originalImageUrl !== 'null') {
                        // Try to find working image URL
                        product.imageUrl = await this.findWorkingImageUrl(originalImageUrl);
                        console.log('  - Final processed imageUrl:', product.imageUrl);
                    } else {
                        console.log('  - No image URL found, using fallback');
                        product.imageUrl = 'img/Pitipaw.png';
                    }
                }
                
                console.log('✅ Final products with normalized URLs:', products);
                return products;
            } else {
                console.log('🟡 Backend not available, using fallback products');
                // Fallback ke data static
                return this.getFallbackProducts();
            }
        } catch (error) {
            console.error('❌ Error fetching products:', error);
            console.log('🟡 Falling back to static products');
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
                const product = await response.json();
                
                // Normalize image URL
                return {
                    ...product,
                    imageUrl: this.normalizeImageUrl(product.imageUrl || product.image)
                };
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

    // Normalize image URL untuk menangani berbagai format path
    normalizeImageUrl(imageUrl) {
        if (!imageUrl) {
            return 'img/Pitipaw.png'; // Default fallback image
        }

        console.log('Normalizing image URL:', imageUrl); // Debug log

        // Jika sudah full URL (http/https), return as-is
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            console.log('Full URL detected:', imageUrl);
            return imageUrl;
        }

        // Jika path relatif lokal (img/), return as-is
        if (imageUrl.startsWith('img/')) {
            console.log('Local image path detected:', imageUrl);
            return imageUrl;
        }

        // Jika path backend uploads
        if (imageUrl.startsWith('uploads/')) {
            const staticUrl = getStaticUrl(imageUrl);
            console.log('Backend uploads path detected:', imageUrl, '-> Static URL:', staticUrl);
            return staticUrl;
        }

        // Jika path dimulai dengan static/
        if (imageUrl.startsWith('static/')) {
            const staticUrl = `${API_CONFIG.baseURL}/${imageUrl}`;
            console.log('Static path detected:', imageUrl, '-> Full URL:', staticUrl);
            return staticUrl;
        }

        // Jika hanya filename, anggap dari uploads
        if (!imageUrl.includes('/')) {
            const staticUrl = getStaticUrl(`uploads/${imageUrl}`);
            console.log('Filename only detected:', imageUrl, '-> Static URL:', staticUrl);
            return staticUrl;
        }

        // Default: gunakan getStaticUrl helper
        const staticUrl = getStaticUrl(imageUrl);
        console.log('Default case:', imageUrl, '-> Static URL:', staticUrl);
        return staticUrl;
    }

    // Check if image URL is accessible
    async checkImageUrl(imageUrl) {
        try {
            const response = await fetch(imageUrl, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Pre-load image untuk memastikan dapat diakses
    async preloadImage(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log('Successfully preloaded image:', imageUrl);
                resolve(true);
            };
            img.onerror = () => {
                console.warn('Failed to preload image:', imageUrl);
                resolve(false);
            };
            img.src = imageUrl;
        });
    }

    // Validate and fix image URLs for products
    async validateProductImages(products) {
        for (const product of products) {
            const originalUrl = product.imageUrl;
            const normalizedUrl = this.normalizeImageUrl(originalUrl);
            
            console.log(`Validating image for ${product.name}:`, originalUrl, '->', normalizedUrl);
            
            // Test if normalized URL works
            const isValid = await this.preloadImage(normalizedUrl);
            
            if (!isValid && !normalizedUrl.startsWith('img/')) {
                console.warn(`Image failed for ${product.name}, falling back to local image`);
                product.imageUrl = 'img/Pitipaw.png';
            } else {
                product.imageUrl = normalizedUrl;
            }
        }
        
        return products;
    }

    // Test multiple possible image URL formats
    testImageUrls(originalUrl) {
        const possibleUrls = [];
        
        if (!originalUrl || originalUrl === 'undefined') {
            // If no URL provided, try common filenames from dashboard
            const commonFilenames = [
                'product1.jpg', 'product2.jpg', 'product.jpg', 'image.jpg',
                'product1.png', 'product2.png', 'product.png', 'image.png'
            ];
            
            commonFilenames.forEach(filename => {
                possibleUrls.push({
                    type: 'common_filename',
                    url: `${API_CONFIG.baseURL}/static/uploads/${filename}`
                });
            });
            
            return possibleUrls;
        }
        
        // 1. Original URL as-is (if it's already a full URL)
        if (originalUrl.startsWith('http')) {
            possibleUrls.push({
                type: 'original_full',
                url: originalUrl
            });
        }
        
        // 2. Normalized via our function
        possibleUrls.push({
            type: 'normalized',
            url: this.normalizeImageUrl(originalUrl)
        });
        
        // 3. Direct static path variations
        const filename = originalUrl.split('/').pop();
        possibleUrls.push({
            type: 'static_uploads',
            url: `${API_CONFIG.baseURL}/static/uploads/${filename}`
        });
        
        possibleUrls.push({
            type: 'uploads_only',
            url: `${API_CONFIG.baseURL}/uploads/${filename}`
        });
        
        // 4. If it's already a path, try different combinations
        if (originalUrl.includes('/')) {
            possibleUrls.push({
                type: 'direct_static',
                url: `${API_CONFIG.baseURL}/static/${originalUrl}`
            });
            
            possibleUrls.push({
                type: 'direct_base',
                url: `${API_CONFIG.baseURL}/${originalUrl}`
            });
        }
        
        // 5. Try without any path prefix
        possibleUrls.push({
            type: 'filename_only',
            url: `${API_CONFIG.baseURL}/static/uploads/${originalUrl}`
        });
        
        return possibleUrls;
    }

    // Test which image URL works
    async findWorkingImageUrl(originalUrl) {
        const possibleUrls = this.testImageUrls(originalUrl);
        
        console.log(`🔍 Testing ${possibleUrls.length} possible URLs for: ${originalUrl}`);
        
        for (const urlTest of possibleUrls) {
            try {
                const testSuccess = await this.preloadImage(urlTest.url);
                if (testSuccess) {
                    console.log(`✅ Working URL found (${urlTest.type}):`, urlTest.url);
                    return urlTest.url;
                }
                console.log(`❌ Failed URL (${urlTest.type}):`, urlTest.url);
            } catch (error) {
                console.log(`❌ Error testing URL (${urlTest.type}):`, urlTest.url, error.message);
            }
        }
        
        console.log(`⚠️ No working URL found for: ${originalUrl}, using fallback`);
        return 'img/Pitipaw.png';
    }

}

// Instance global API service
const apiService = new ApiService();

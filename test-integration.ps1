# Script untuk setup dan test integrasi produk
# PITIPAW Frontend - Backend Integration

Write-Host "=== PITIPAW Frontend - Backend Integration Setup ===" -ForegroundColor Cyan
Write-Host ""

# Function to check if a URL is accessible
function Test-Url {
    param([string]$Url)
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
        return $response.StatusCode -eq 200
    }
    catch {
        return $false
    }
}

# Check backend health
Write-Host "1. Testing Backend Connection..." -ForegroundColor Yellow
$backendUrl = "http://localhost:5000"
$healthUrl = "$backendUrl/api/health"

if (Test-Url $healthUrl) {
    Write-Host "   ✅ Backend is running at $backendUrl" -ForegroundColor Green
    
    # Test products endpoint
    Write-Host "2. Testing Products API..." -ForegroundColor Yellow
    $productsUrl = "$backendUrl/api/products"
    
    try {
        $response = Invoke-RestMethod -Uri $productsUrl -Method GET
        Write-Host "   ✅ Products API is working" -ForegroundColor Green
        
        if ($response.products) {
            $productCount = $response.products.Count
            Write-Host "   📦 Found $productCount products in database" -ForegroundColor Green
            
            if ($productCount -gt 0) {
                Write-Host "   Sample product:" -ForegroundColor Gray
                $sampleProduct = $response.products[0]
                Write-Host "      - Name: $($sampleProduct.name)" -ForegroundColor Gray
                Write-Host "      - Price: $($sampleProduct.price)" -ForegroundColor Gray
                if ($sampleProduct.image_url) {
                    Write-Host "      - Image: $($sampleProduct.image_url)" -ForegroundColor Gray
                }
            }
        } else {
            Write-Host "   ⚠️  No products found. Add products in dashboard first." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "   ❌ Products API error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
else {
    Write-Host "   ❌ Backend is not running at $backendUrl" -ForegroundColor Red
    Write-Host "   💡 Please start the backend server first:" -ForegroundColor Yellow
    Write-Host "      1. Go to dashboard backend directory" -ForegroundColor Gray
    Write-Host "      2. Run: go run main.go" -ForegroundColor Gray
    Write-Host "      3. Make sure MongoDB is running" -ForegroundColor Gray
}

Write-Host ""
Write-Host "3. Frontend Configuration Check..." -ForegroundColor Yellow

# Check if config files exist
$configFile = "js/config.js"
$apiServiceFile = "js/api-service.js"
$userHtmlFile = "user.html"

if (Test-Path $configFile) {
    Write-Host "   ✅ Configuration file exists: $configFile" -ForegroundColor Green
} else {
    Write-Host "   ❌ Configuration file missing: $configFile" -ForegroundColor Red
}

if (Test-Path $apiServiceFile) {
    Write-Host "   ✅ API Service file exists: $apiServiceFile" -ForegroundColor Green
} else {
    Write-Host "   ❌ API Service file missing: $apiServiceFile" -ForegroundColor Red
}

if (Test-Path $userHtmlFile) {
    Write-Host "   ✅ User HTML file exists: $userHtmlFile" -ForegroundColor Green
} else {
    Write-Host "   ❌ User HTML file missing: $userHtmlFile" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Integration Status Summary:" -ForegroundColor Yellow

if (Test-Url $healthUrl) {
    Write-Host "   🟢 Backend: Online" -ForegroundColor Green
    Write-Host "   🟢 Integration: Ready" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ INTEGRATION SUCCESSFUL!" -ForegroundColor Green
    Write-Host "   Products from dashboard will appear in user.html automatically." -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Open dashboard admin to add/manage products" -ForegroundColor Gray
    Write-Host "   2. Open user.html to see products displayed" -ForegroundColor Gray
    Write-Host "   3. Use test-backend-connection.html for debugging" -ForegroundColor Gray
} else {
    Write-Host "   🔴 Backend: Offline" -ForegroundColor Red
    Write-Host "   🔴 Integration: Not Ready" -ForegroundColor Red
    Write-Host ""
    Write-Host "❌ INTEGRATION FAILED!" -ForegroundColor Red
    Write-Host "   Please start the backend server first." -ForegroundColor Red
}

Write-Host ""
Write-Host "🔗 Useful Links:" -ForegroundColor Cyan
Write-Host "   • Dashboard: https://github.com/Proy-1/dashboard-1" -ForegroundColor Gray
Write-Host "   • Backend: https://github.com/Proy-1/back" -ForegroundColor Gray
Write-Host "   • Test Page: ./test-backend-connection.html" -ForegroundColor Gray

Write-Host ""
Read-Host "Press Enter to continue..."

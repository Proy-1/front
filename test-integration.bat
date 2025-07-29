@echo off
title PITIPAW - Backend Integration Test
color 0B

echo.
echo ========================================
echo    PITIPAW Backend Integration Test
echo ========================================
echo.

echo [1] Testing Backend Connection...
curl -s http://localhost:5000/api/health > nul 2>&1
if %errorlevel% == 0 (
    echo     ✓ Backend is running at http://localhost:5000
    echo.
    
    echo [2] Testing Products API...
    curl -s http://localhost:5000/api/products > products_test.json 2>&1
    if %errorlevel% == 0 (
        echo     ✓ Products API is accessible
        echo.
        
        echo [3] Opening Test Page...
        start test-backend-connection.html
        echo     ✓ Test page opened in browser
        echo.
        
        echo [4] Opening User Page...
        start user.html
        echo     ✓ User page opened in browser
        echo.
        
        echo ========================================
        echo    INTEGRATION STATUS: SUCCESS ✓
        echo ========================================
        echo.
        echo Products from dashboard will now appear
        echo in user.html automatically!
        echo.
        echo Next steps:
        echo 1. Open dashboard to manage products
        echo 2. Check user.html to see products
        echo 3. Use test page for debugging
        
    ) else (
        echo     ✗ Products API is not accessible
        echo.
        echo ========================================
        echo    INTEGRATION STATUS: PARTIAL ✗
        echo ========================================
        echo.
        echo Backend is running but API might have issues.
        echo Check the backend logs for errors.
    )
    
) else (
    echo     ✗ Backend is not running
    echo.
    echo ========================================
    echo    INTEGRATION STATUS: FAILED ✗
    echo ========================================
    echo.
    echo Please start the backend server first:
    echo 1. Go to dashboard backend directory
    echo 2. Run: go run main.go
    echo 3. Make sure MongoDB is running
    echo 4. Then run this script again
)

echo.
echo Useful Links:
echo - Dashboard: https://github.com/Proy-1/dashboard-1
echo - Backend: https://github.com/Proy-1/back
echo.

if exist products_test.json del products_test.json

pause

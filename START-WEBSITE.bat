@echo off
echo 🚀 STARTING ELECTROSTORE - Complete MERN Stack E-commerce
echo.

echo ===================================================================
echo                     ELECTROSTORE STARTUP GUIDE
echo ===================================================================
echo.

echo 📋 WHAT'S INCLUDED:
echo   ✅ Backend API with authentication and cart functionality
echo   ✅ Frontend React app with Redux state management
echo   ✅ Fake products data (no external DB needed initially)
echo   ✅ Complete cart system (add/remove/update quantities)
echo   ✅ User authentication (login/register/logout)
echo   ✅ Orders page with order history
echo   ✅ Responsive design for all devices
echo.

echo 🔧 PREREQUISITES:
echo   • Node.js (v16 or higher)
echo   • MongoDB (optional - app works with fake data)
echo.

echo 📍 STARTUP COMMANDS:
echo.
echo   1. INSTALL ALL DEPENDENCIES:
echo      npm run install-deps
echo.
echo   2. START FULL APPLICATION:
echo      npm start
echo.
echo   3. OR START INDIVIDUALLY:
echo      Backend:  npm run server   (Port 5000)
echo      Frontend: npm run client   (Port 3000)
echo.

echo 🌐 ACCESS YOUR WEBSITE:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.

echo 🎯 TEST FEATURES:
echo   • Browse products on homepage
echo   • Add items to cart from product cards
echo   • View cart at /cart
echo   • Register/login at /login or /register
echo   • View orders at /orders (after login)
echo.

echo 📦 FAKE PRODUCTS INCLUDED:
echo   • iPhone 15 Pro Max ($1,199)
echo   • Samsung Galaxy S24 Ultra ($1,299)
echo   • MacBook Pro 16-inch M3 ($2,499)
echo   • Sony WH-1000XM5 Headphones ($399)
echo   • iPad Pro 12.9-inch M2 ($1,099)
echo   • PlayStation 5 ($499)
echo.

echo ===================================================================
echo                         READY TO START!
echo ===================================================================
echo.

set /p choice="Do you want to start the application now? (y/n): "
if /i "%choice%"=="y" (
    echo.
    echo 🚀 Starting ElectroStore...
    npm start
) else (
    echo.
    echo 📝 To start later, run: npm start
    echo.
)

pause

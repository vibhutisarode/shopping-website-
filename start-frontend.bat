@echo off
echo 🚀 Starting ElectroStore Frontend...
echo.

echo ⚙️ Installing compatible dependencies...
cd /d "c:\Users\vibhu\OneDrive\Desktop\piyushproject\frontend"
npm install --legacy-peer-deps

echo.
echo 🔧 Clearing cache...
npm start -- --reset-cache

pause

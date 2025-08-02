@echo off
echo 🚀 Starting ElectroStore Application...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

:: Start backend server
echo 📡 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

:: Wait a bit for backend to start
timeout /t 5 /nobreak >nul

:: Start frontend server
echo 🌐 Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo 🎉 Both servers are starting!
echo.
echo Backend API: http://localhost:5000
echo Frontend App: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul

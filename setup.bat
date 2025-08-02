@echo off
echo 🚀 Setting up ElectroStore - Electronic Appliances E-commerce Website
echo ==================================================================

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (v16 or higher) first.
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

echo.
echo 📦 Installing dependencies...

:: Install root dependencies
npm install

:: Install backend dependencies
echo Installing backend dependencies...
cd backend
npm install
cd ..

:: Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo 📋 Setup Instructions:
echo ======================
echo.
echo 1. Backend Setup:
echo    - Copy backend\.env.example to backend\.env
echo    - Update the environment variables in backend\.env
echo    - Make sure MongoDB is running
echo.
echo 2. Frontend Setup:
echo    - The frontend is already configured to connect to http://localhost:5000
echo.
echo 3. Start Development:
echo    - Run 'npm run dev' to start both frontend and backend
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:5000
echo.
echo 🎉 Setup complete! Happy coding!
echo.
echo Quick Commands:
echo - npm run dev        # Start both frontend and backend
echo - npm run server     # Start only backend
echo - npm run client     # Start only frontend
echo - npm run build      # Build frontend for production
echo.
pause

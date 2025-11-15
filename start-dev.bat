@echo off
echo ========================================
echo Personal Finance MVP - Starting Dev Server
echo ========================================
echo.

echo Checking if Netlify CLI is installed...
call netlify --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Netlify CLI is not installed!
    echo Please run: npm install -g netlify-cli
    pause
    exit /b 1
)

echo.
echo Checking environment variables...
if not exist .env (
    echo ERROR: .env file not found!
    echo Please create .env file with your Supabase credentials
    pause
    exit /b 1
)

echo.
echo Starting Netlify Dev...
echo This will start both frontend and backend
echo.
echo Access the app at: http://localhost:8888
echo Press Ctrl+C to stop
echo.

netlify dev

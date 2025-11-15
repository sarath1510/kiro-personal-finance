@echo off
echo ========================================
echo Testing API Endpoints
echo ========================================
echo.

echo Test 1: Check if backend is responding
echo.
curl -X POST http://localhost:8888/api/login -H "Content-Type: application/json" -d "{\"username\":\"user1\",\"password\":\"password123\"}"
echo.
echo.

echo Test 2: Try to register a new user
echo.
curl -X POST http://localhost:8888/api/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\",\"role\":\"user\"}"
echo.
echo.

pause

@echo off
echo Testing Backend API...
echo.

echo Test 1: Checking if functions can be loaded
cd netlify\functions
node -e "console.log('Node.js is working'); console.log('bcrypt:', require('bcrypt') ? 'OK' : 'FAIL'); console.log('jsonwebtoken:', require('jsonwebtoken') ? 'OK' : 'FAIL');"
cd ..\..

echo.
echo Test 2: Starting Netlify Functions
echo Press Ctrl+C to stop
echo.
netlify functions:serve

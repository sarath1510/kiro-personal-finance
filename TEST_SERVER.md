# Testing the Local Server

## Quick Diagnosis

If you're getting a 404 error, let's figure out what's happening:

### Step 1: Check if Netlify Dev is Running

In your terminal where you ran `netlify dev`, you should see output like:

```
◈ Netlify Dev ◈
◈ Starting Netlify Dev with Create React App
◈ Functions server is listening on 64583
◈ Setting up local development server

   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │   ◈ Server now ready on http://localhost:8888  │
   │                                                 │
   └─────────────────────────────────────────────────┘
```

If you don't see this, the server isn't running properly.

### Step 2: Test the Backend API First

Open a new terminal and test if the backend functions work:

```bash
curl http://localhost:8888/.netlify/functions/api-login
```

You should get a response (even if it's an error about missing credentials).

### Step 3: Check What's Actually Running

Try these URLs in your browser:

1. **http://localhost:8888** - Should show the React app
2. **http://localhost:8888/login** - Should show login page
3. **http://localhost:8888/api/profile** - Should show 401 error (expected)

### Common Issues and Fixes

#### Issue 1: "Cannot GET /"
**Cause**: Frontend hasn't been built or Vite isn't starting

**Fix**: 
```bash
# Stop netlify dev (Ctrl+C)
# Build the frontend first
cd frontend
npm run build
cd ..
# Try again
netlify dev
```

#### Issue 2: "404 Not Found" for everything
**Cause**: Netlify CLI might not be detecting the frontend

**Fix**: Try running frontend and backend separately:

**Terminal 1 - Backend:**
```bash
netlify functions:serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then access: http://localhost:5173

#### Issue 3: Functions return 404
**Cause**: Functions directory not detected

**Fix**: Check that `netlify/functions` exists and has .js files

```bash
# List functions
dir netlify\functions\*.js
```

You should see files like:
- api-login.js
- api-register.js
- api-profile.js
- etc.

### Step 4: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Share the error details

Common errors:
- **"Failed to load resource: 404"** - Check which resource (URL)
- **"CORS error"** - Backend is running but CORS issue
- **"Network error"** - Backend isn't running

### Step 5: Check Netlify Dev Output

Look at the terminal where `netlify dev` is running. You should see:

```
◈ Loaded function api-login
◈ Loaded function api-register
◈ Loaded function api-profile
◈ Loaded function api-transactions
◈ Loaded function api-budgets
◈ Loaded function api-reports-spending
```

If you don't see these, the functions aren't loading.

### Alternative: Run Without Netlify CLI

If Netlify CLI is causing issues, you can run the app differently:

**Option 1: Frontend Only (for testing UI)**
```bash
cd frontend
npm run dev
```
Access at: http://localhost:5173
(API calls won't work, but you can see the UI)

**Option 2: Test Backend Only**
```bash
netlify functions:serve
```
Then test with curl:
```bash
curl -X POST http://localhost:9999/api-login -H "Content-Type: application/json" -d "{\"username\":\"user1\",\"password\":\"password123\"}"
```

### Debug Checklist

- [ ] `netlify dev` is running without errors
- [ ] You see "Server now ready on http://localhost:8888"
- [ ] Functions are loaded (check terminal output)
- [ ] Frontend is building (check terminal output)
- [ ] .env file has correct Supabase credentials
- [ ] You're accessing http://localhost:8888 (not 5173)

### Get More Info

Run this to see what's happening:

```bash
# Check if port 8888 is in use
netstat -ano | findstr :8888

# Check Netlify CLI version
netlify --version

# Check Node version
node --version
```

### Still Having Issues?

Share these details:
1. Full error message from browser console
2. Terminal output from `netlify dev`
3. Which URL you're trying to access
4. Output of `dir netlify\functions\*.js`

I'll help you fix it!

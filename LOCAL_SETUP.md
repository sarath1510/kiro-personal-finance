# Local Development Setup Guide

This guide will help you run the Personal Finance MVP locally on your machine.

## Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- Git
- A Supabase account (free tier is fine)

## Step 1: Install Dependencies

### Install Backend Dependencies
```bash
cd netlify/functions
npm install
cd ../..
```

### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Install Netlify CLI (for running functions locally)
```bash
npm install -g netlify-cli
```

## Step 2: Set Up Supabase Database

### Create Supabase Project
1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: personal-finance-mvp
   - Database Password: (choose a strong password)
   - Region: (choose closest to you)
4. Wait for project to be created (~2 minutes)

### Run Database Migrations
1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy the entire contents of `sql/migrations.sql`
4. Paste into the SQL Editor
5. Click "Run" or press Ctrl+Enter
6. You should see "Success. No rows returned"

### Generate Password Hashes for Seed Data
```bash
cd netlify/functions
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(hash => console.log(hash));"
```

Copy the output hash (it will look like `$2b$10$...`)

### Update Seed Data
1. Open `sql/seed.sql` in your editor
2. Find the INSERT INTO users statement
3. Replace ALL THREE placeholder hashes with the hash you just generated
4. Save the file

### Run Seed Data
1. In Supabase SQL Editor, click "New Query"
2. Copy the entire contents of your updated `sql/seed.sql`
3. Paste into the SQL Editor
4. Click "Run"
5. You should see a success message with row counts

### Get Supabase Credentials
1. In Supabase dashboard, go to "Project Settings" (gear icon)
2. Click "API" in the left sidebar
3. Copy these values:
   - **Project URL** (under "Project URL")
   - **service_role key** (under "Project API keys" - click "Reveal" to see it)

## Step 3: Configure Environment Variables

### Create Backend .env File
Create a file named `.env` in the project root:

```bash
# Create .env file
touch .env
```

Add these contents (replace with your actual values):

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_random_32_character_secret_key_here
NODE_ENV=development
```

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your JWT_SECRET in the .env file.

### Create Frontend .env File
Create a file named `.env` in the `frontend` directory:

```bash
cd frontend
touch .env
```

Add this content:

```env
VITE_API_BASE_URL=http://localhost:8888
```

## Step 4: Start the Application

### Option A: Using Netlify CLI (Recommended)

This runs both frontend and backend together:

```bash
# From project root
netlify dev
```

The application will start on http://localhost:8888

### Option B: Run Frontend and Backend Separately

**Terminal 1 - Backend (Netlify Functions):**
```bash
netlify functions:serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend will be on http://localhost:5173
Backend will be on http://localhost:8888

## Step 5: Test the Application

### Access the Application
1. Open your browser
2. Go to http://localhost:8888 (if using Netlify CLI) or http://localhost:5173 (if running separately)
3. You should see the login page

### Test Login
Use one of the seeded accounts:
- **Username**: `user1`
- **Password**: `password123`

Click "Sign in" - you should be redirected to the dashboard!

### Test Registration
1. Click "create a new account"
2. Fill in the form:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
   - Role: User
3. Click "Create account"
4. You should be redirected to login
5. Login with your new credentials

## Step 6: Test API Endpoints Directly

### Test Registration Endpoint
```bash
curl -X POST http://localhost:8888/api/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"apitest\",\"email\":\"apitest@example.com\",\"password\":\"password123\",\"role\":\"user\"}"
```

### Test Login Endpoint
```bash
curl -X POST http://localhost:8888/api/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"user1\",\"password\":\"password123\"}"
```

Save the `accessToken` from the response.

### Test Profile Endpoint
```bash
curl http://localhost:8888/api/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### Test Transactions Endpoint
```bash
curl http://localhost:8888/api/transactions \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

## Troubleshooting

### Issue: "Cannot find module 'bcrypt'"
**Solution:**
```bash
cd netlify/functions
npm install
```

### Issue: "SUPABASE_URL is not configured"
**Solution:**
- Make sure `.env` file exists in project root
- Check that environment variables are set correctly
- Restart the Netlify dev server

### Issue: "Invalid credentials" when logging in
**Solution:**
- Make sure you generated real bcrypt hashes
- Make sure you updated seed.sql with the generated hashes
- Re-run the seed.sql in Supabase

### Issue: Frontend can't connect to backend
**Solution:**
- Make sure Netlify CLI is running (`netlify dev`)
- Check that `VITE_API_BASE_URL` is set to `http://localhost:8888`
- Check browser console for CORS errors

### Issue: "Port 8888 already in use"
**Solution:**
```bash
# Kill the process using port 8888
# On Windows:
netstat -ano | findstr :8888
taskkill /PID <PID> /F

# Then restart netlify dev
```

### Issue: Functions return 500 errors
**Solution:**
- Check the Netlify CLI terminal for error messages
- Verify Supabase credentials are correct
- Make sure migrations ran successfully

## Viewing Logs

### Backend Logs
When running `netlify dev`, function logs appear in the terminal.

### Frontend Logs
Open browser DevTools (F12) and check the Console tab.

### Database Logs
In Supabase dashboard, go to "Logs" to see database queries.

## Development Workflow

### Making Changes

**Backend Changes:**
1. Edit files in `netlify/functions/`
2. Save the file
3. Netlify CLI will automatically reload the function

**Frontend Changes:**
1. Edit files in `frontend/src/`
2. Save the file
3. Vite will hot-reload the page automatically

### Testing Changes
1. Make your changes
2. Test in the browser
3. Check console for errors
4. Test API endpoints with curl

### Committing Changes
```bash
git add .
git commit -m "Your commit message"
```

## Quick Reference

### Start Development Server
```bash
netlify dev
```

### Access Points
- **Frontend**: http://localhost:8888
- **API**: http://localhost:8888/api/*
- **Functions**: http://localhost:8888/.netlify/functions/*

### Test Accounts
- Username: `user1` / Password: `password123`
- Username: `user2` / Password: `password123`
- Username: `hardcoder1` / Password: `password123` (admin role)

### Useful Commands
```bash
# Install all dependencies
cd netlify/functions && npm install && cd ../..
cd frontend && npm install && cd ..

# Generate password hash
cd netlify/functions && node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(hash => console.log(hash));"

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Run linting
cd frontend && npm run lint

# Build frontend
cd frontend && npm run build
```

## Next Steps

Once everything is running locally:
1. ✅ Test login and registration
2. ✅ Test API endpoints
3. ✅ Explore the database in Supabase dashboard
4. ✅ Make changes and see hot-reload in action
5. ✅ Implement remaining UI pages (dashboard, transactions, budgets, reports)

## Need Help?

- Check the terminal output for error messages
- Check browser console (F12) for frontend errors
- Review the README.md for API documentation
- Check Supabase logs for database issues

Happy coding! 🚀

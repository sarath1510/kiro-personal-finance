# Quick Start - Test Locally

## ✅ What's Already Done

- ✅ Dependencies installed (backend & frontend)
- ✅ JWT Secret generated
- ✅ Password hash generated and updated in seed.sql
- ✅ .env files created

## 🎯 What You Need to Do Now

### 1. Set Up Supabase (5 minutes)

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in:
   - Name: `personal-finance-mvp`
   - Database Password: (choose any password)
   - Region: (choose closest to you)
4. Wait ~2 minutes for project creation

### 2. Run Database Scripts

**Run Migrations:**
1. In Supabase dashboard, click "SQL Editor"
2. Click "New Query"
3. Open `sql/migrations.sql` from your project
4. Copy ALL the content
5. Paste into Supabase SQL Editor
6. Click "Run" (or Ctrl+Enter)
7. Should see "Success. No rows returned"

**Run Seed Data:**
1. Click "New Query" again
2. Open `sql/seed.sql` from your project
3. Copy ALL the content
4. Paste into Supabase SQL Editor
5. Click "Run"
6. Should see success with row counts

### 3. Get Supabase Credentials

1. In Supabase, click the gear icon (Project Settings)
2. Click "API" in left sidebar
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **service_role key** (click "Reveal" to see it)

### 4. Update .env File

Open the `.env` file in your project root and update:

```env
SUPABASE_URL=https://xxxxx.supabase.co  # <- Paste your Project URL here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...    # <- Paste your service_role key here
JWT_SECRET=fb67bdd91981c3313ef56b19919e35681d2c0c2b0b6d46162253995b1e1efae0  # <- Already set
NODE_ENV=development
```

Save the file!

### 5. Install Netlify CLI

```bash
npm install -g netlify-cli
```

### 6. Start the Application

```bash
netlify dev
```

Wait for it to start (takes ~10-20 seconds)

### 7. Open in Browser

Go to: **http://localhost:8888**

You should see the login page!

### 8. Test Login

Use these credentials:
- **Username**: `user1`
- **Password**: `password123`

Click "Sign in" - you should be redirected to the dashboard!

## 🎉 Success!

If you can login, everything is working! You now have:
- ✅ Backend API running on port 8888
- ✅ Frontend running on port 8888
- ✅ Database connected to Supabase
- ✅ Authentication working

## 🧪 Test the API Directly

Open a new terminal and try:

```bash
# Test login
curl -X POST http://localhost:8888/api/login -H "Content-Type: application/json" -d "{\"username\":\"user1\",\"password\":\"password123\"}"
```

You should get back a JSON response with `accessToken` and `refreshToken`!

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check that you updated `.env` with correct Supabase credentials
- Make sure you copied the **service_role** key, not the anon key

### "Invalid credentials" when logging in
- Make sure you ran seed.sql successfully
- Check Supabase dashboard > Table Editor > users table to see if users exist

### "Port 8888 already in use"
```bash
# Kill the process and try again
netstat -ano | findstr :8888
taskkill /PID <PID> /F
netlify dev
```

### Functions return errors
- Check the terminal where `netlify dev` is running for error messages
- Make sure all environment variables are set in `.env`

## 📝 What's Next?

Now that it's running locally, you can:

1. **Test the existing features:**
   - Login/Register
   - View the placeholder pages

2. **Implement the UI pages:**
   - Dashboard with real data
   - Transactions CRUD
   - Budgets management
   - Reports with charts

3. **Test API endpoints:**
   - Use curl or Postman
   - Check the README.md for API documentation

4. **Make changes:**
   - Edit files in `frontend/src/` or `netlify/functions/`
   - Changes auto-reload!

## 🔗 Useful Links

- **Local App**: http://localhost:8888
- **Supabase Dashboard**: https://supabase.com/dashboard
- **API Docs**: See README.md
- **Full Setup Guide**: See LOCAL_SETUP.md

## 💡 Tips

- Keep the `netlify dev` terminal open to see logs
- Open browser DevTools (F12) to see frontend logs
- Check Supabase > Logs to see database queries
- Press Ctrl+C to stop the server

---

**Need help?** Check LOCAL_SETUP.md for detailed troubleshooting!

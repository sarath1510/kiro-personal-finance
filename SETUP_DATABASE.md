# Database Setup - Step by Step

## Quick Check: Do you have data in Supabase?

1. Go to https://supabase.com/dashboard
2. Click on your project: `personal-finance-mvp`
3. Click "Table Editor" in the left sidebar
4. Do you see these tables?
   - users
   - categories
   - transactions
   - budgets

**If NO** → Follow the steps below
**If YES** → Skip to "Verify Users Exist"

## Step 1: Run Migrations (Create Tables)

1. In Supabase dashboard, click "SQL Editor" in left sidebar
2. Click "New Query" button
3. Open the file `sql/migrations.sql` from your project
4. Copy **ALL** the content (Ctrl+A, Ctrl+C)
5. Paste into the Supabase SQL Editor
6. Click "Run" button (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

## Step 2: Run Seed Data (Add Sample Users)

1. Still in SQL Editor, click "New Query" again
2. Open the file `sql/seed.sql` from your project
3. Copy **ALL** the content
4. Paste into the Supabase SQL Editor
5. Click "Run"
6. You should see success message with row counts:
   ```
   Users created: 3
   Categories created: 15
   Transactions created: 30
   Budgets created: 4
   ```

## Step 3: Verify Users Exist

1. Go back to "Table Editor"
2. Click on "users" table
3. You should see 3 rows:
   - hardcoder1
   - user1
   - user2

**Check the password_hash column** - it should start with `$2b$10$wr4Xfm3q...`

If it shows a different hash or placeholder, the seed data wasn't updated correctly.

## Step 4: Test Login Again

Now try logging in with:
- Username: `user1`
- Password: `password123`

## Troubleshooting

### Issue: "Success. No rows returned" but no tables appear

**Solution**: Refresh the page or click on "Table Editor" again

### Issue: Seed data fails with "duplicate key" error

**Solution**: The data already exists. Check Table Editor to verify.

### Issue: Login still fails after running scripts

**Possible causes:**

1. **Wrong password hash in database**
   - Check users table in Supabase
   - Password hash should be: `$2b$10$wr4Xfm3qMRFup/yd6kJzeec.aZO3Euub2RQN13H6mP4wdfHByQhZO`
   - If different, re-run seed.sql

2. **Backend can't connect to database**
   - Check .env file has correct SUPABASE_URL
   - Check .env file has correct SUPABASE_SERVICE_ROLE_KEY
   - Restart netlify dev after changing .env

3. **Backend function error**
   - Check the terminal where netlify dev is running
   - Look for error messages when you click login
   - Share the error message

### Quick Test: Register a New User

Instead of using seed data, try registering a new user:

1. Click "create a new account" on login page
2. Fill in:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Role: User
3. Click "Create account"
4. Try logging in with the new user

If registration works but login with seed users doesn't, it's a password hash issue.

## Need More Help?

Share these details:
1. Screenshot of Supabase Table Editor showing users table
2. Error message from browser console (F12)
3. Error message from netlify dev terminal
4. Result of running test-api.bat

I'll help you fix it!

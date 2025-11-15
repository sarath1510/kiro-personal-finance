# Important Notes for Deployment

## ⚠️ Critical: Password Hashes in Seed Data

The `sql/seed.sql` file contains **placeholder password hashes** that need to be replaced with real bcrypt hashes before running in production.

### Why This Matters

The placeholder hashes in the seed file won't work for authentication. You need to generate real bcrypt hashes for the password "password123".

### How to Generate Real Password Hashes

**Option 1: Using Node.js (Recommended)**

```bash
# Navigate to the functions directory
cd netlify/functions

# Install dependencies if not already installed
npm install

# Generate a hash for "password123"
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(hash => console.log(hash));"
```

This will output something like:
```
$2b$10$K7L/MtJ8Yj8qYqYqYqYqYuYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqY
```

**Option 2: Use the Registration API**

After deploying, you can skip the seed data and just register users through the `/api/register` endpoint:

```bash
curl -X POST https://your-site.netlify.app/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "email": "user1@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Steps to Update Seed File

1. Generate 3 password hashes using the command above (run it 3 times or use the same hash for all)
2. Open `sql/seed.sql`
3. Find the INSERT INTO users statement
4. Replace the placeholder hashes with your generated hashes:

```sql
INSERT INTO users (id, username, email, password_hash, role, created_at) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'hardcoder1', 'hardcoder1@example.com', 'YOUR_GENERATED_HASH_HERE', 'hardcoder', '2024-01-01 10:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'user1', 'user1@example.com', 'YOUR_GENERATED_HASH_HERE', 'user', '2024-01-02 10:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'user2', 'user2@example.com', 'YOUR_GENERATED_HASH_HERE', 'user', '2024-01-03 10:00:00')
ON CONFLICT (id) DO NOTHING;
```

5. Save the file
6. Run the seed script in Supabase SQL Editor

## Environment Variables Checklist

Before deploying, make sure you have these environment variables ready:

### For Netlify Dashboard

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
NODE_ENV=production
VITE_API_BASE_URL=https://your-site-name.netlify.app
```

### Generating JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This will output a secure random string like:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

## Deployment Order

Follow this order to avoid issues:

1. ✅ Create GitHub repository and push code
2. ✅ Create Supabase project
3. ✅ Generate password hashes
4. ✅ Update seed.sql with real hashes
5. ✅ Run migrations.sql in Supabase
6. ✅ Run seed.sql in Supabase
7. ✅ Get Supabase credentials (URL and service role key)
8. ✅ Generate JWT_SECRET
9. ✅ Create Netlify site from GitHub repo
10. ✅ Add all environment variables in Netlify
11. ✅ Deploy!

## Testing After Deployment

1. Visit your Netlify site URL
2. Try to register a new user
3. Try to login with the registered user
4. If login works, test the API endpoints
5. Check Netlify function logs for any errors

## Common Issues

### "Invalid credentials" when logging in
- **Cause**: Password hashes in seed data are placeholders
- **Fix**: Generate real bcrypt hashes and update seed.sql

### Functions return 500 errors
- **Cause**: Missing or incorrect environment variables
- **Fix**: Double-check all environment variables in Netlify dashboard

### "Cannot connect to database"
- **Cause**: Incorrect Supabase credentials
- **Fix**: Verify SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

### Frontend shows blank page
- **Cause**: Build failed or incorrect VITE_API_BASE_URL
- **Fix**: Check Netlify build logs and verify environment variables

## Security Reminders

- ✅ Never commit `.env` files
- ✅ Never commit real passwords or API keys
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Keep Supabase service role key secret
- ✅ Use HTTPS in production (Netlify provides this automatically)
- ✅ Regularly rotate JWT_SECRET and API keys

## Need Help?

1. Check DEPLOYMENT.md for detailed deployment steps
2. Check README.md for API documentation
3. Check PROJECT_SUMMARY.md for project overview
4. Review Netlify function logs for backend errors
5. Check browser console for frontend errors

## Quick Start Commands

```bash
# Generate password hash
cd netlify/functions && npm install
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(hash => console.log(hash));"

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Test locally with Netlify CLI
npm install -g netlify-cli
netlify dev

# Deploy to Netlify (after connecting to GitHub)
git push origin main
```

## Success Checklist

Before considering deployment complete:

- [ ] Password hashes generated and updated in seed.sql
- [ ] Migrations run successfully in Supabase
- [ ] Seed data inserted in Supabase
- [ ] All environment variables set in Netlify
- [ ] Site deployed successfully
- [ ] Can access the login page
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] API endpoints respond correctly
- [ ] No errors in Netlify function logs
- [ ] GitHub Actions CI passes

---

**Remember**: The placeholder password hashes in seed.sql MUST be replaced before the application will work properly!

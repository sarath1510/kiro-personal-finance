# Deployment Guide

This guide will help you deploy the Personal Finance MVP to Netlify and set up the Supabase database.

## Prerequisites

- GitHub account
- Netlify account
- Supabase account
- Git installed locally

## Step 1: Create GitHub Repository

1. Go to GitHub and create a new **public** repository named `kiro-personal-finance`
2. Copy the repository URL

3. Add the remote and push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/kiro-personal-finance.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned
3. Go to the SQL Editor in your Supabase dashboard
4. Run the migrations:
   - Open `sql/migrations.sql` from your project
   - Copy all the content
   - Paste into the SQL Editor and click "Run"
5. Run the seed data:
   - Open `sql/seed.sql` from your project
   - **IMPORTANT**: You need to generate real password hashes first
   - See "Generating Password Hashes" section below
   - Copy the updated content
   - Paste into the SQL Editor and click "Run"
6. Get your credentials:
   - Go to Project Settings > API
   - Copy the `URL` (this is your `SUPABASE_URL`)
   - Copy the `service_role` key (this is your `SUPABASE_SERVICE_ROLE_KEY`)
   - **Keep these secret!**

### Generating Password Hashes

The seed file contains placeholder password hashes. You need to generate real ones:

**Option 1: Use Node.js script**
```bash
cd netlify/functions
npm install
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(hash => console.log(hash));"
```

Copy the output hash and replace the placeholder hashes in `sql/seed.sql` for all three users.

**Option 2: Use the registration endpoint**
After deploying, you can register users through the API instead of using seed data.

## Step 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and log in
2. Click "Add new site" > "Import an existing project"
3. Choose "GitHub" and authorize Netlify to access your repositories
4. Select your `kiro-personal-finance` repository
5. Netlify should auto-detect the build settings from `netlify.toml`:
   - Build command: `cd frontend && npm ci && npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`
6. Click "Show advanced" and add environment variables:

### Required Environment Variables

Add these in the Netlify dashboard:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_random_32_character_secret_key_here
NODE_ENV=production
VITE_API_BASE_URL=https://your-site-name.netlify.app
```

**Important Notes:**
- `JWT_SECRET` should be a random string of at least 32 characters
- Generate it with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `VITE_API_BASE_URL` will be your Netlify site URL (you can update this after deployment)

7. Click "Deploy site"

## Step 4: Update VITE_API_BASE_URL

After your first deployment:

1. Copy your Netlify site URL (e.g., `https://your-site-name.netlify.app`)
2. Go to Site settings > Environment variables
3. Update `VITE_API_BASE_URL` to your actual Netlify URL
4. Trigger a new deployment (Site overview > Trigger deploy > Deploy site)

## Step 5: Verify Deployment

1. Visit your Netlify site URL
2. You should see the login page
3. Try logging in with test credentials:
   - Username: `user1`
   - Password: `password123`
4. If login works, you're all set!

### Testing the API

You can test the API endpoints directly:

```bash
# Test registration
curl -X POST https://your-site.netlify.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","role":"user"}'

# Test login
curl -X POST https://your-site.netlify.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Step 6: Monitor and Debug

### View Function Logs

1. Go to your Netlify site dashboard
2. Click "Functions" in the top menu
3. Click on any function to see its logs
4. Check for errors if something isn't working

### View Build Logs

1. Go to "Deploys" in your Netlify dashboard
2. Click on the latest deploy
3. View the build logs to debug any build issues

### Common Issues

**Issue: Functions return 500 errors**
- Check that all environment variables are set correctly
- Verify Supabase credentials are correct
- Check function logs in Netlify dashboard

**Issue: Frontend can't connect to API**
- Verify `VITE_API_BASE_URL` is set to your Netlify site URL
- Check CORS settings in function responses
- Redeploy after updating environment variables

**Issue: Database connection fails**
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct
- Check that migrations ran successfully in Supabase
- Verify your Supabase project is active

**Issue: Login fails with "Invalid credentials"**
- Verify you generated real password hashes in seed data
- Or register a new user through the registration page
- Check that the JWT_SECRET is set

## Step 7: Set Up Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS
4. Update `VITE_API_BASE_URL` to your custom domain
5. Redeploy

## Continuous Deployment

Every time you push to the `main` branch on GitHub:
1. GitHub Actions will run linting and build checks
2. Netlify will automatically deploy the new version
3. Your site will be updated within a few minutes

## Security Checklist

- [ ] All environment variables are set in Netlify (not in code)
- [ ] `.env` files are in `.gitignore` (never commit secrets)
- [ ] JWT_SECRET is a strong random string
- [ ] Supabase service role key is kept secret
- [ ] CORS is configured to only allow your domain
- [ ] Password hashes in seed data are real bcrypt hashes

## Next Steps

- Add more features (CSV import, categories management, etc.)
- Implement the remaining UI pages (dashboard, transactions, budgets, reports)
- Add more comprehensive tests
- Set up monitoring and error tracking
- Add analytics

## Support

If you encounter issues:
1. Check the Netlify function logs
2. Check the browser console for frontend errors
3. Verify all environment variables are set correctly
4. Review the README.md for API documentation
5. Check GitHub Actions for CI/CD issues

## Repository Structure

```
kiro-personal-finance/
├── frontend/              # React frontend
├── netlify/functions/     # Serverless backend
├── sql/                   # Database migrations and seeds
├── .github/workflows/     # CI/CD configuration
├── README.md             # Main documentation
├── DEPLOYMENT.md         # This file
└── netlify.toml          # Netlify configuration
```

Congratulations! Your Personal Finance MVP is now deployed and ready to use! 🎉

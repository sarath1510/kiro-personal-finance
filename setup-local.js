#!/usr/bin/env node

/**
 * Local Setup Helper Script
 * This script helps you generate the necessary credentials for local development
 */

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

console.log('\n🚀 Personal Finance MVP - Local Setup Helper\n');
console.log('='.repeat(50));

// Generate JWT Secret
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('\n✅ Generated JWT_SECRET:');
console.log(jwtSecret);

// Generate password hash
console.log('\n📝 To generate password hash for seed data, run:');
console.log('cd netlify/functions');
console.log('node -e "const bcrypt = require(\'bcrypt\'); bcrypt.hash(\'password123\', 10).then(hash => console.log(hash));"');

// Create .env template
const envTemplate = `# Backend Environment Variables
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=${jwtSecret}
NODE_ENV=development
`;

const frontendEnvTemplate = `# Frontend Environment Variables
VITE_API_BASE_URL=http://localhost:8888
`;

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate);
  console.log('\n✅ Created .env file in project root');
  console.log('   Please update SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
} else {
  console.log('\n⚠️  .env file already exists in project root');
}

if (!fs.existsSync(frontendEnvPath)) {
  fs.writeFileSync(frontendEnvPath, frontendEnvTemplate);
  console.log('✅ Created .env file in frontend directory');
} else {
  console.log('⚠️  .env file already exists in frontend directory');
}

console.log('\n' + '='.repeat(50));
console.log('\n📋 Next Steps:\n');
console.log('1. Create a Supabase project at https://supabase.com');
console.log('2. Run migrations.sql in Supabase SQL Editor');
console.log('3. Generate password hash (command shown above)');
console.log('4. Update sql/seed.sql with the generated hash');
console.log('5. Run seed.sql in Supabase SQL Editor');
console.log('6. Update .env with your Supabase credentials');
console.log('7. Run: npm install -g netlify-cli');
console.log('8. Run: netlify dev');
console.log('9. Open http://localhost:8888 in your browser');
console.log('\n✨ Happy coding!\n');

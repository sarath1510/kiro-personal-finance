# Personal Finance MVP

A full-stack personal finance application that helps users monitor spending, manage budgets, and visualize financial patterns.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Transaction Management**: Create, view, update, and delete income/expense transactions
- **Budget Tracking**: Set budgets for different categories and monitor spending
- **Financial Reports**: Visualize spending patterns with interactive charts
- **CSV Import**: Bulk import transactions from CSV files
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- React 18 with Vite
- TailwindCSS for styling
- Chart.js (react-chartjs-2) for data visualization
- Axios for API communication
- React Router for navigation

### Backend
- Netlify Functions (Node.js serverless)
- JWT authentication with bcrypt password hashing
- Supabase PostgreSQL database

### Deployment & CI/CD
- Netlify (frontend + serverless functions)
- GitHub Actions for continuous integration
- Public GitHub repository

## Project Structure

```
kiro-personal-finance/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API and auth services
│   │   └── hooks/        # Custom React hooks
│   └── package.json
├── netlify/
│   └── functions/        # Serverless backend functions
│       └── utils/        # Shared utilities
├── sql/                  # Database migrations and seeds
│   ├── migrations.sql
│   └── seed.sql
├── .github/
│   └── workflows/        # CI/CD configuration
│       └── ci.yml
├── .env.example          # Environment variables template
├── netlify.toml          # Netlify configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- Netlify account (for deployment)
- Git

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/kiro-personal-finance.git
cd kiro-personal-finance
```

#### 2. Set Up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the migrations script:
   - Copy the contents of `sql/migrations.sql`
   - Paste and execute in the SQL Editor
4. Run the seed script:
   - Copy the contents of `sql/seed.sql`
   - Paste and execute in the SQL Editor
5. Get your credentials:
   - Go to Project Settings > API
   - Copy the `URL` (SUPABASE_URL)
   - Copy the `service_role` key (SUPABASE_SERVICE_ROLE_KEY)

#### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your actual values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_random_32_character_secret_key
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:8888
```

#### 4. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd ../netlify/functions
npm install
```

#### 5. Run the Application Locally

**Option A: Using Netlify CLI (Recommended)**

Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

From the project root, run:
```bash
netlify dev
```

This will start both the frontend (on port 8888) and the Netlify Functions.

**Option B: Run Frontend and Backend Separately**

Terminal 1 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 2 - Backend (requires Netlify CLI):
```bash
netlify functions:serve
```

#### 6. Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:8888 (with Netlify CLI) or http://localhost:5173 (Vite only)
- API Functions: http://localhost:8888/.netlify/functions/

## Sample Credentials

After running the seed script, you can log in with these test accounts:

**Hardcoder Account:**
- Username: `hardcoder1`
- Password: `password123`

**User Accounts:**
- Username: `user1` / Password: `password123`
- Username: `user2` / Password: `password123`

## API Documentation

### Authentication Endpoints

#### POST /api/register
Register a new user account.

**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "user" | "hardcoder"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "role": "string",
  "created_at": "timestamp"
}
```

#### POST /api/login
Authenticate and receive JWT tokens.

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "accessToken": "jwt_string",
  "refreshToken": "jwt_string",
  "user": {
    "id": "uuid",
    "username": "string",
    "role": "string"
  }
}
```

#### POST /api/token/refresh
Refresh an expired access token.

**Request:**
```json
{
  "refreshToken": "jwt_string"
}
```

**Response (200):**
```json
{
  "accessToken": "jwt_string"
}
```

#### GET /api/profile
Get the authenticated user's profile.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "role": "string",
  "created_at": "timestamp"
}
```

### Transaction Endpoints

#### GET /api/transactions
List user's transactions with optional date filtering.

**Query Parameters:**
- `start` (optional): Start date (YYYY-MM-DD)
- `end` (optional): End date (YYYY-MM-DD)

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": "decimal",
      "date": "YYYY-MM-DD",
      "category_id": "uuid",
      "category_name": "string",
      "description": "string",
      "is_expense": "boolean"
    }
  ],
  "total": "integer"
}
```

#### POST /api/transactions
Create a new transaction.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "amount": "decimal",
  "date": "YYYY-MM-DD",
  "category_id": "uuid",
  "description": "string",
  "is_expense": "boolean"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "amount": "decimal",
  "date": "YYYY-MM-DD",
  "category_id": "uuid",
  "description": "string",
  "is_expense": "boolean"
}
```

#### PUT /api/transactions/:id
Update an existing transaction.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "amount": "decimal",
  "date": "YYYY-MM-DD",
  "category_id": "uuid",
  "description": "string",
  "is_expense": "boolean"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "amount": "decimal",
  "date": "YYYY-MM-DD",
  "category_id": "uuid",
  "description": "string",
  "is_expense": "boolean"
}
```

#### DELETE /api/transactions/:id
Delete a transaction.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (204):** No content

### Budget Endpoints

#### GET /api/budgets
List user's budgets with spending information.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "budgets": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "category_name": "string",
      "amount": "decimal",
      "period": "string",
      "spent": "decimal"
    }
  ]
}
```

#### POST /api/budgets
Create a new budget.

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Request:**
```json
{
  "category_id": "uuid",
  "amount": "decimal",
  "period": "monthly" | "weekly" | "yearly"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "category_id": "uuid",
  "amount": "decimal",
  "period": "string"
}
```

### Reports Endpoints

#### GET /api/reports/spending-by-category
Get aggregated spending by category.

**Query Parameters:**
- `start` (optional): Start date (YYYY-MM-DD)
- `end` (optional): End date (YYYY-MM-DD)

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200):**
```json
{
  "data": [
    {
      "category_name": "string",
      "total": "decimal"
    }
  ]
}
```

### Error Responses

All endpoints return errors in this format:

```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

**Common HTTP Status Codes:**
- `200 OK`: Successful GET/PUT request
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Duplicate resource
- `500 Internal Server Error`: Server-side error

## Deployment

### Deploy to Netlify

1. Push your code to a public GitHub repository
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Configure build settings (should auto-detect from netlify.toml):
   - Build command: `cd frontend && npm ci && npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`
6. Add environment variables in Netlify dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `VITE_API_BASE_URL` (set to your Netlify site URL)
7. Deploy!

### Verify Deployment

After deployment:
- Visit your Netlify site URL
- Test user registration and login
- Create and manage transactions
- View reports and charts
- Check Netlify function logs for any errors

## CI/CD

GitHub Actions automatically runs on every push:
- Lints frontend code with ESLint
- Builds frontend to check for errors
- Runs backend tests (if configured)

View the CI status in the Actions tab of your GitHub repository.

## Security Notes

- Never commit `.env` files or expose secrets
- Access tokens expire after 15 minutes for security
- Passwords are hashed with bcrypt (10 salt rounds)
- All API endpoints validate user ownership of resources
- CORS is configured to allow only your frontend domain

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues or questions, please open an issue on GitHub.

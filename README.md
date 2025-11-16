# Personal Finance MVP

A full-stack personal finance management application with user authentication, transaction tracking, budgeting, and reporting features.

## 🚀 Live Demo

**Deployed URL**: [Your Netlify URL]

**Test Account**:
- Username: `sarath123`
- Password: `sarath123`

## 📋 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Transaction Management**: Track income and expenses with categories
- **Budgets**: Set monthly budgets and track utilization
- **Reports & Analytics**:
  - Monthly summary (income, expenses, net)
  - Category breakdown (pie chart)
  - Spending over time (line chart)
  - Top merchants analysis
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** 18 with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Chart.js** with react-chartjs-2 for visualizations
- **Axios** for API calls

### Backend
- **Netlify Functions** (serverless)
- **Supabase** (PostgreSQL database)
- **JWT** for authentication
- **bcrypt** for password hashing

### Deployment
- **Frontend & Functions**: Netlify
- **Database**: Supabase (hosted PostgreSQL)

## 📁 Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   └── hooks/           # Custom React hooks
│   ├── public/
│   └── package.json
│
├── netlify/
│   └── functions/           # Serverless API functions
│       ├── api-*.js         # API endpoints
│       └── utils/           # Shared utilities
│
├── sql/                     # Database schema and seeds
│   ├── migrations.sql       # Database schema
│   └── seed.sql             # Sample data
│
├── scripts/                 # Utility scripts
│   └── add-transactions.js  # Script to add sample data
│
├── netlify.toml             # Netlify configuration
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (20+ recommended for Supabase)
- npm or yarn
- Supabase account
- Netlify account (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd kiro-personal-finance
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

3. **Set up the database**
   
   Run the SQL scripts in your Supabase SQL editor:
   ```bash
   # First, run migrations
   sql/migrations.sql
   
   # Then, run seeds (optional, for sample data)
   sql/seed.sql
   ```

4. **Install dependencies**
   ```bash
   # Install root dependencies (for scripts)
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install function dependencies
   cd ../netlify/functions
   npm install
   cd ../..
   ```

5. **Run the development server**
   ```bash
   # Start frontend (from frontend directory)
   cd frontend
   npm run dev
   
   # Frontend will run on http://localhost:5173
   ```

6. **Test with Netlify Dev (optional)**
   ```bash
   # Install Netlify CLI globally
   npm install -g netlify-cli
   
   # Run with Netlify Dev (from root)
   netlify dev
   ```

## 🌐 Deployment

### Deploy to Netlify

1. **Connect your repository** to Netlify

2. **Configure build settings**:
   - Build command: `cd netlify/functions && npm install && cd ../../frontend && npm install --include=dev && npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`

3. **Set environment variables** in Netlify dashboard:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   VITE_API_BASE_URL=your_netlify_url
   NODE_VERSION=18
   ```

4. **Deploy**: Push to your main branch or click "Deploy" in Netlify

## 📊 Database Schema

### Tables
- **users**: User accounts with authentication
- **categories**: Transaction categories (per user)
- **transactions**: Income and expense records
- **budgets**: Monthly budget limits per category

### Key Features
- Row Level Security (RLS) policies for data isolation
- UUID primary keys
- Timestamps for audit trails
- Foreign key constraints for data integrity

## 🔐 API Endpoints

### Authentication
- `POST /api/register` - Create new user account
- `POST /api/login` - User login

### Transactions
- `GET /api/transactions` - List user transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - List user categories

### Budgets
- `GET /api/budgets` - List user budgets
- `POST /api/budgets` - Create budget
- `DELETE /api/budgets/:id` - Delete budget

### Reports
- `GET /api/reports/spending` - Spending by category

## 🎨 Color Scheme

- **Light Blue**: `#E9F1FA` - Backgrounds
- **Bright Blue**: `#00ABE4` - Primary actions, links
- **White**: `#FFFFFF` - Cards, content areas

## 📱 Responsive Design

- **Mobile**: Hamburger menu, card-based transaction list
- **Tablet**: Horizontal scrollable navigation
- **Desktop**: Full navigation bar, table-based views

## 🧪 Testing

Sample data is included for testing:
- 3 test users with different transaction patterns
- Multiple categories
- Sample budgets
- Transactions spanning multiple months

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🐛 Known Issues

- Browser password managers may show warnings (this is a browser feature, not an app bug)
- Supabase free tier pauses after 7 days of inactivity (auto-wakes on access)

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review the code comments
3. Open an issue on GitHub

## 🎯 Future Enhancements

- Recurring transactions
- Multi-currency support
- Export to CSV/PDF
- Mobile app (React Native)
- Shared budgets for families
- Bill reminders
- Investment tracking

---

**Built with ❤️ using React, Supabase, and Netlify**

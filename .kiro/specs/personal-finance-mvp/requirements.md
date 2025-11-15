# Requirements Document

## Introduction

This document specifies the requirements for a Personal Finance MVP application that enables users to monitor spending, manage budgets, and visualize financial patterns. The system consists of a React frontend, Netlify serverless backend, Supabase database, and includes authentication, transaction management, budget tracking, and reporting capabilities.

## Glossary

- **Finance System**: The complete Personal Finance MVP application including frontend, backend, and database
- **User**: An authenticated person with role "user" who can manage their own financial data
- **Hardcoder**: An authenticated person with role "hardcoder" who has administrative privileges
- **Transaction**: A financial record representing income or expense with amount, date, category, and description
- **Budget**: A spending limit defined for a specific category and time period
- **Category**: A classification for transactions (e.g., groceries, entertainment, salary)
- **Access Token**: A short-lived JWT token (15 minutes) used for API authentication
- **Refresh Token**: A long-lived JWT token used to obtain new access tokens
- **Netlify Functions**: Serverless backend functions deployed on Netlify platform
- **Supabase**: PostgreSQL database service used for data persistence

## Requirements

### Requirement 1: User Registration and Authentication

**User Story:** As a new user, I want to register an account with username, email, and password, so that I can securely access my financial data

#### Acceptance Criteria

1. WHEN a user submits registration data with username, email, password, and role, THE Finance System SHALL create a new user record in Supabase with hashed password using bcrypt
2. WHEN a user submits valid login credentials, THE Finance System SHALL return an access token with 15-minute expiration and a refresh token
3. WHEN a user submits a valid refresh token, THE Finance System SHALL return a new access token
4. IF a user submits invalid credentials during login, THEN THE Finance System SHALL return an authentication error with status 401
5. THE Finance System SHALL store password hashes using bcrypt with minimum 10 salt rounds

### Requirement 2: User Profile Management

**User Story:** As an authenticated user, I want to view my profile information, so that I can verify my account details

#### Acceptance Criteria

1. WHEN an authenticated user requests their profile, THE Finance System SHALL return username, email, role, and creation date
2. IF an unauthenticated request is made to the profile endpoint, THEN THE Finance System SHALL return an authorization error with status 401
3. THE Finance System SHALL verify JWT access tokens for all protected endpoints using middleware

### Requirement 3: Transaction Management

**User Story:** As a user, I want to create, view, update, and delete transactions, so that I can track my income and expenses

#### Acceptance Criteria

1. WHEN a user creates a transaction with amount, date, category ID, description, and expense flag, THE Finance System SHALL store the transaction associated with the user ID
2. WHEN a user requests transactions with start and end date filters, THE Finance System SHALL return only transactions within the specified date range belonging to that user
3. WHEN a user updates a transaction they own, THE Finance System SHALL modify the transaction record with new values
4. WHEN a user deletes a transaction they own, THE Finance System SHALL remove the transaction record from the database
5. IF a user attempts to modify or delete a transaction they do not own, THEN THE Finance System SHALL return an authorization error with status 403
6. THE Finance System SHALL validate that transaction amounts are numeric values
7. THE Finance System SHALL validate that transaction dates follow YYYY-MM-DD format

### Requirement 4: Budget Management

**User Story:** As a user, I want to create and view budgets for different categories, so that I can control my spending

#### Acceptance Criteria

1. WHEN a user creates a budget with category ID, amount, and period, THE Finance System SHALL store the budget associated with the user ID
2. WHEN a user requests their budgets, THE Finance System SHALL return all budgets belonging to that user with category information
3. THE Finance System SHALL validate that budget amounts are positive numeric values
4. THE Finance System SHALL associate each budget with exactly one category and one user

### Requirement 5: Financial Reporting

**User Story:** As a user, I want to view spending aggregated by category and over time, so that I can understand my financial patterns

#### Acceptance Criteria

1. WHEN a user requests spending by category with start and end date filters, THE Finance System SHALL return aggregated expense totals grouped by category name for the specified period
2. THE Finance System SHALL calculate aggregations using only transactions where is_expense flag is true
3. THE Finance System SHALL return spending data in a format suitable for chart visualization with category names and total amounts
4. WHEN a user requests reports without date filters, THE Finance System SHALL return data for the current month

### Requirement 6: CSV Transaction Import

**User Story:** As a user, I want to import transactions from a CSV file, so that I can quickly add historical financial data

#### Acceptance Criteria

1. WHEN a user uploads a CSV file with transaction data, THE Finance System SHALL parse the CSV and create transaction records for the authenticated user
2. THE Finance System SHALL validate each CSV row for required fields before creating transactions
3. IF the CSV contains invalid data, THEN THE Finance System SHALL return validation errors with row numbers
4. THE Finance System SHALL sanitize CSV input to prevent injection attacks

### Requirement 7: Database Schema and Data Model

**User Story:** As a system administrator, I want a well-structured database schema, so that data integrity is maintained

#### Acceptance Criteria

1. THE Finance System SHALL maintain a users table with columns: id, username, email, password_hash, role, created_at
2. THE Finance System SHALL maintain a categories table with columns: id, user_id, name
3. THE Finance System SHALL maintain a transactions table with columns: id, user_id, category_id, amount, date, description, is_expense
4. THE Finance System SHALL maintain a budgets table with columns: id, user_id, category_id, amount, period
5. THE Finance System SHALL enforce foreign key constraints between transactions and users, transactions and categories, budgets and users, budgets and categories
6. THE Finance System SHALL include database migration scripts in the sql directory
7. THE Finance System SHALL provide seed data with 3 sample users, 30 sample transactions, and 4 example budgets

### Requirement 8: Frontend User Interface

**User Story:** As a user, I want an intuitive web interface, so that I can easily manage my finances

#### Acceptance Criteria

1. THE Finance System SHALL provide registration and login pages that store access tokens in localStorage
2. THE Finance System SHALL provide a dashboard displaying total balance, monthly expense, monthly income, and recent transactions
3. THE Finance System SHALL provide a transactions page with list view, pagination, date and category filters, and edit/delete actions
4. THE Finance System SHALL provide a budgets page showing budget list and utilization bars
5. THE Finance System SHALL provide a reports page with pie chart for spending by category and bar/line chart for spending over time
6. THE Finance System SHALL implement responsive design that works on mobile and desktop devices
7. THE Finance System SHALL use TailwindCSS for styling
8. THE Finance System SHALL use Chart.js via react-chartjs-2 for data visualization
9. THE Finance System SHALL use Axios for API communication with base URL from VITE_API_BASE_URL environment variable

### Requirement 9: Security and Data Protection

**User Story:** As a user, I want my financial data to be secure, so that my privacy is protected

#### Acceptance Criteria

1. THE Finance System SHALL hash all passwords using bcrypt before storing in the database
2. THE Finance System SHALL sign JWT tokens using a secret key from JWT_SECRET environment variable
3. THE Finance System SHALL set access token expiration to 15 minutes
4. THE Finance System SHALL validate and sanitize all user inputs before processing
5. THE Finance System SHALL configure CORS to allow requests from the deployed Netlify frontend and http://localhost:5173
6. THE Finance System SHALL prevent users from accessing or modifying other users' data

### Requirement 10: Deployment and Infrastructure

**User Story:** As a developer, I want automated deployment and CI/CD, so that changes are deployed reliably

#### Acceptance Criteria

1. THE Finance System SHALL deploy the frontend to Netlify from the frontend directory with build command "npm ci && npm run build"
2. THE Finance System SHALL deploy Netlify Functions from the netlify/functions directory
3. THE Finance System SHALL configure environment variables in Netlify: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, JWT_SECRET, NODE_ENV, VITE_API_BASE_URL
4. THE Finance System SHALL run GitHub Actions on every push to execute linting and build validation
5. THE Finance System SHALL run frontend build with "npm ci && npm run build" in CI pipeline
6. THE Finance System SHALL run backend tests using Jest in CI pipeline
7. THE Finance System SHALL use ESLint for code quality checks in CI pipeline

### Requirement 11: Documentation and Developer Experience

**User Story:** As a developer, I want comprehensive documentation, so that I can set up and maintain the system

#### Acceptance Criteria

1. THE Finance System SHALL include a README.md with step-by-step local setup instructions
2. THE Finance System SHALL include a .env.example file listing all required environment variables without values
3. THE Finance System SHALL document all API endpoints with request and response examples
4. THE Finance System SHALL provide instructions for creating a Supabase project and configuring database credentials
5. THE Finance System SHALL provide instructions for running frontend locally with npm commands
6. THE Finance System SHALL provide instructions for running Netlify Functions locally using Netlify CLI
7. THE Finance System SHALL provide instructions for running database migrations and seed data
8. THE Finance System SHALL document sample user credentials for testing

### Requirement 12: Public Repository and Version Control

**User Story:** As a stakeholder, I want the code in a public GitHub repository, so that the project is accessible and transparent

#### Acceptance Criteria

1. THE Finance System SHALL maintain a public GitHub repository with all source code
2. THE Finance System SHALL organize code with top-level directories: frontend, netlify/functions, sql, .github/workflows
3. THE Finance System SHALL commit the initial scaffold and all subsequent changes to the repository
4. THE Finance System SHALL include .gitignore files to exclude node_modules, .env files, and build artifacts
5. THE Finance System SHALL provide the final repository URL upon project completion

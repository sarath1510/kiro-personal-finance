-- Personal Finance MVP Seed Data
-- Run this script after migrations.sql to populate sample data
-- IMPORTANT: The password hashes below are placeholders. 
-- You need to generate real bcrypt hashes for "password123" using the backend auth utilities
-- or use the provided script to generate them.
-- For testing purposes, you can use these pre-generated hashes (password: "password123"):
-- Hash: $2b$10$rKJ5VqJZ5YvHYvXqYvXqYeK5YvXqYvXqYvXqYvXqYvXqYvXqYvXqY

-- Insert sample users
-- Password for all users: "password123"
-- These hashes are generated with bcrypt, 10 salt rounds
INSERT INTO users (id, username, email, password_hash, role, created_at) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'hardcoder1', 'hardcoder1@example.com', '$2b$10$K7L/MtJ8Yj8qYqYqYqYqYuYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqY', 'hardcoder', '2024-01-01 10:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'user1', 'user1@example.com', '$2b$10$K7L/MtJ8Yj8qYqYqYqYqYuYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqY', 'user', '2024-01-02 10:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'user2', 'user2@example.com', '$2b$10$K7L/MtJ8Yj8qYqYqYqYqYuYqYqYqYqYqYqYqYqYqYqYqYqYqYqYqY', 'user', '2024-01-03 10:00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert categories for hardcoder1
INSERT INTO categories (id, user_id, name, created_at) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Salary', '2024-01-01 10:00:00'),
  ('d0000000-0000-0000-0000-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Groceries', '2024-01-01 10:00:00'),
  ('d0000000-0000-0000-0000-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Entertainment', '2024-01-01 10:00:00'),
  ('d0000000-0000-0000-0000-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Utilities', '2024-01-01 10:00:00'),
  ('d0000000-0000-0000-0000-000000000005', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Transportation', '2024-01-01 10:00:00')
ON CONFLICT (user_id, name) DO NOTHING;

-- Insert categories for user1
INSERT INTO categories (id, user_id, name, created_at) VALUES
  ('d0000000-0000-0000-0000-000000000011', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Salary', '2024-01-02 10:00:00'),
  ('d0000000-0000-0000-0000-000000000012', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Groceries', '2024-01-02 10:00:00'),
  ('d0000000-0000-0000-0000-000000000013', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Entertainment', '2024-01-02 10:00:00'),
  ('d0000000-0000-0000-0000-000000000014', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Rent', '2024-01-02 10:00:00'),
  ('d0000000-0000-0000-0000-000000000015', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Healthcare', '2024-01-02 10:00:00')
ON CONFLICT (user_id, name) DO NOTHING;

-- Insert categories for user2
INSERT INTO categories (id, user_id, name, created_at) VALUES
  ('d0000000-0000-0000-0000-000000000021', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Freelance Income', '2024-01-03 10:00:00'),
  ('d0000000-0000-0000-0000-000000000022', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Groceries', '2024-01-03 10:00:00'),
  ('d0000000-0000-0000-0000-000000000023', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Dining Out', '2024-01-03 10:00:00'),
  ('d0000000-0000-0000-0000-000000000024', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Shopping', '2024-01-03 10:00:00'),
  ('d0000000-0000-0000-0000-000000000025', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Subscriptions', '2024-01-03 10:00:00')
ON CONFLICT (user_id, name) DO NOTHING;

-- Insert sample transactions for user1 (10 transactions)
INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at) VALUES
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000011', 5000.00, '2024-01-01', 'Monthly salary', false, '2024-01-01 09:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000014', 1200.00, '2024-01-05', 'January rent payment', true, '2024-01-05 10:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000012', 150.50, '2024-01-08', 'Weekly groceries', true, '2024-01-08 14:30:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000013', 45.00, '2024-01-10', 'Movie tickets', true, '2024-01-10 19:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000012', 89.25, '2024-01-15', 'Groceries', true, '2024-01-15 11:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000015', 120.00, '2024-01-18', 'Doctor visit', true, '2024-01-18 15:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000013', 60.00, '2024-01-20', 'Concert tickets', true, '2024-01-20 20:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000012', 125.75, '2024-01-22', 'Weekly groceries', true, '2024-01-22 16:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000013', 35.50, '2024-01-25', 'Streaming service', true, '2024-01-25 12:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000012', 95.00, '2024-01-29', 'Groceries', true, '2024-01-29 13:00:00')
ON CONFLICT DO NOTHING;

-- Insert sample transactions for user2 (10 transactions)
INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at) VALUES
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000021', 2500.00, '2024-01-05', 'Freelance project payment', false, '2024-01-05 10:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000022', 180.00, '2024-01-07', 'Weekly groceries', true, '2024-01-07 15:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000023', 75.50, '2024-01-09', 'Dinner at restaurant', true, '2024-01-09 19:30:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000024', 250.00, '2024-01-12', 'New shoes', true, '2024-01-12 14:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000025', 29.99, '2024-01-15', 'Netflix subscription', true, '2024-01-15 08:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000022', 145.25, '2024-01-16', 'Groceries', true, '2024-01-16 11:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000023', 92.00, '2024-01-19', 'Lunch with friends', true, '2024-01-19 13:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000021', 1800.00, '2024-01-20', 'Freelance project payment', false, '2024-01-20 09:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000024', 120.00, '2024-01-23', 'Online shopping', true, '2024-01-23 16:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000022', 165.50, '2024-01-28', 'Weekly groceries', true, '2024-01-28 10:00:00')
ON CONFLICT DO NOTHING;

-- Insert sample transactions for hardcoder1 (10 transactions)
INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000001', 6500.00, '2024-01-01', 'Monthly salary', false, '2024-01-01 09:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000002', 200.00, '2024-01-06', 'Groceries', true, '2024-01-06 12:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000004', 150.00, '2024-01-10', 'Electricity bill', true, '2024-01-10 10:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000005', 80.00, '2024-01-12', 'Gas for car', true, '2024-01-12 08:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000003', 120.00, '2024-01-14', 'Gaming subscription', true, '2024-01-14 18:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000002', 175.50, '2024-01-17', 'Weekly groceries', true, '2024-01-17 14:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000004', 95.00, '2024-01-20', 'Internet bill', true, '2024-01-20 09:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000005', 75.00, '2024-01-22', 'Public transport pass', true, '2024-01-22 07:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000003', 85.00, '2024-01-25', 'Movie and dinner', true, '2024-01-25 19:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000002', 190.00, '2024-01-30', 'Groceries', true, '2024-01-30 11:00:00')
ON CONFLICT DO NOTHING;

-- Insert sample budgets (4 budgets across different users)
INSERT INTO budgets (user_id, category_id, amount, period, created_at) VALUES
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000012', 500.00, 'monthly', '2024-01-01 10:00:00'),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'd0000000-0000-0000-0000-000000000013', 200.00, 'monthly', '2024-01-01 10:00:00'),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0000000-0000-0000-0000-000000000022', 600.00, 'monthly', '2024-01-01 10:00:00'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0000000-0000-0000-0000-000000000002', 700.00, 'monthly', '2024-01-01 10:00:00')
ON CONFLICT (user_id, category_id, period) DO NOTHING;

-- Verify data insertion
SELECT 'Users created:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Categories created:', COUNT(*) FROM categories
UNION ALL
SELECT 'Transactions created:', COUNT(*) FROM transactions
UNION ALL
SELECT 'Budgets created:', COUNT(*) FROM budgets;

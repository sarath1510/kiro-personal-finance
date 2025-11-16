-- Add transactions for user sarath1510
-- This script adds realistic transactions from Oct 25, 2024 to Nov 16, 2024

-- First, let's get the user_id and category IDs
-- Assuming user sarath1510 exists, we'll use their categories

-- Note: Replace USER_ID with actual user_id from users table where username = 'sarath1510'
-- You can get this by running: SELECT id FROM users WHERE username = 'sarath1510';

-- For this script, we'll use a variable approach
DO $$
DECLARE
    v_user_id UUID;
    v_salary_cat UUID;
    v_transport_cat UUID;
    v_food_cat UUID;
    v_trip_cat UUID;
    v_utilities_cat UUID;
    v_groceries_cat UUID;
    v_shopping_cat UUID;
    v_entertainment_cat UUID;
BEGIN
    -- Get user ID
    SELECT id INTO v_user_id FROM users WHERE username = 'sarath1510';
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User sarath1510 not found';
    END IF;

    -- Get or create category IDs
    SELECT id INTO v_salary_cat FROM categories WHERE user_id = v_user_id AND name = 'Salary';
    SELECT id INTO v_transport_cat FROM categories WHERE user_id = v_user_id AND name = 'Transportation';
    SELECT id INTO v_food_cat FROM categories WHERE user_id = v_user_id AND name = 'Food';
    SELECT id INTO v_trip_cat FROM categories WHERE user_id = v_user_id AND name = 'Trip';
    SELECT id INTO v_utilities_cat FROM categories WHERE user_id = v_user_id AND name = 'Utilities';
    SELECT id INTO v_groceries_cat FROM categories WHERE user_id = v_user_id AND name = 'Groceries';
    SELECT id INTO v_shopping_cat FROM categories WHERE user_id = v_user_id AND name = 'Shopping';
    SELECT id INTO v_entertainment_cat FROM categories WHERE user_id = v_user_id AND name = 'Entertainment';

    -- Add salary transaction (Oct 24, 2024)
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES (v_user_id, v_salary_cat, 70000.00, '2024-10-24', 'Monthly Salary - October', false, NOW());

    -- October 25 (Friday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-10-25', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-10-25', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-10-25', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-10-25', 'Swiggy dinner', true, NOW());

    -- October 26 (Saturday) - Weekend
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_groceries_cat, 1200.00, '2024-10-26', 'Weekly groceries - Big Bazaar', true, NOW()),
        (v_user_id, v_food_cat, 180.00, '2024-10-26', 'Breakfast outside', true, NOW()),
        (v_user_id, v_entertainment_cat, 450.00, '2024-10-26', 'Movie tickets', true, NOW());

    -- October 27 (Sunday) - Weekend
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_food_cat, 200.00, '2024-10-27', 'Lunch with friends', true, NOW()),
        (v_user_id, v_utilities_cat, 850.00, '2024-10-27', 'Electricity bill', true, NOW());

    -- October 28 (Monday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-10-28', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-10-28', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-10-28', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-10-28', 'Swiggy dinner', true, NOW());

    -- October 29 (Tuesday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-10-29', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-10-29', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-10-29', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-10-29', 'Swiggy dinner', true, NOW()),
        (v_user_id, v_utilities_cat, 599.00, '2024-10-29', 'Internet bill', true, NOW());

    -- October 30 (Wednesday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-10-30', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-10-30', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-10-30', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-10-30', 'Swiggy dinner', true, NOW());

    -- October 31 (Thursday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-10-31', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-10-31', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-10-31', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-10-31', 'Swiggy dinner', true, NOW()),
        (v_user_id, v_shopping_cat, 1200.00, '2024-10-31', 'New shoes', true, NOW());

    -- November 1 (Friday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-11-01', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-11-01', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-11-01', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-11-01', 'Swiggy dinner', true, NOW());

    -- November 2 (Saturday) - Weekend before trip
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_groceries_cat, 800.00, '2024-11-02', 'Groceries', true, NOW()),
        (v_user_id, v_shopping_cat, 2500.00, '2024-11-02', 'Shopping for trip', true, NOW()),
        (v_user_id, v_food_cat, 350.00, '2024-11-02', 'Dinner at restaurant', true, NOW());

    -- November 3-9 (Trip week) - On leave
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_trip_cat, 15000.00, '2024-11-03', 'Trip expenses - Nov 3-9', true, NOW());

    -- November 10 (Sunday) - Back from trip
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_food_cat, 200.00, '2024-11-10', 'Lunch', true, NOW());

    -- November 11 (Monday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-11-11', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-11-11', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-11-11', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-11-11', 'Swiggy dinner', true, NOW());

    -- November 12 (Tuesday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-11-12', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-11-12', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-11-12', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-11-12', 'Swiggy dinner', true, NOW()),
        (v_user_id, v_entertainment_cat, 299.00, '2024-11-12', 'Netflix subscription', true, NOW());

    -- November 13 (Wednesday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-11-13', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-11-13', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-11-13', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-11-13', 'Swiggy dinner', true, NOW()),
        (v_user_id, v_groceries_cat, 950.00, '2024-11-13', 'Weekly groceries', true, NOW());

    -- November 14 (Thursday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-11-14', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-11-14', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-11-14', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-11-14', 'Swiggy dinner', true, NOW());

    -- November 15 (Friday) - Office day
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_transport_cat, 60.00, '2024-11-15', 'Auto to office', true, NOW()),
        (v_user_id, v_food_cat, 50.00, '2024-11-15', 'Office tiffin', true, NOW()),
        (v_user_id, v_food_cat, 60.00, '2024-11-15', 'Office lunch', true, NOW()),
        (v_user_id, v_food_cat, 150.00, '2024-11-15', 'Swiggy dinner', true, NOW()),
        (v_user_id, v_entertainment_cat, 600.00, '2024-11-15', 'Friday night out', true, NOW());

    -- November 16 (Saturday) - Today
    INSERT INTO transactions (user_id, category_id, amount, date, description, is_expense, created_at)
    VALUES 
        (v_user_id, v_groceries_cat, 1100.00, '2024-11-16', 'Weekend groceries', true, NOW()),
        (v_user_id, v_food_cat, 250.00, '2024-11-16', 'Brunch', true, NOW());

    -- Add budgets
    INSERT INTO budgets (user_id, category_id, amount, period, created_at)
    VALUES 
        (v_user_id, v_food_cat, 8000.00, 'monthly', NOW()),
        (v_user_id, v_transport_cat, 2000.00, 'monthly', NOW()),
        (v_user_id, v_groceries_cat, 5000.00, 'monthly', NOW()),
        (v_user_id, v_entertainment_cat, 3000.00, 'monthly', NOW()),
        (v_user_id, v_utilities_cat, 2000.00, 'monthly', NOW())
    ON CONFLICT (user_id, category_id, period) DO NOTHING;

    RAISE NOTICE 'Successfully added transactions and budgets for user sarath1510';
END $$;

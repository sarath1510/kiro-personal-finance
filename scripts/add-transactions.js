require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addTransactions() {
  try {
    console.log('Starting to add transactions for user sarath1510...');

    // Get user ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('username', 'sarath1510')
      .single();

    if (userError || !user) {
      console.error('User not found:', userError);
      return;
    }

    const userId = user.id;
    console.log('Found user ID:', userId);

    // Get categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name')
      .eq('user_id', userId);

    if (catError) {
      console.error('Error fetching categories:', catError);
      return;
    }

    const catMap = {};
    categories.forEach(cat => {
      catMap[cat.name] = cat.id;
    });

    console.log('Found categories:', Object.keys(catMap));

    // Prepare transactions
    const transactions = [
      // October 24 - Salary
      { user_id: userId, category_id: catMap['Salary'], amount: 70000.00, date: '2024-10-24', description: 'Monthly Salary - October', is_expense: false },
      
      // October 25 (Friday) - Office day
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-10-25', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-10-25', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-10-25', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-10-25', description: 'Swiggy dinner', is_expense: true },
      
      // October 26 (Saturday)
      { user_id: userId, category_id: catMap['Groceries'], amount: 1200.00, date: '2024-10-26', description: 'Weekly groceries - Big Bazaar', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 180.00, date: '2024-10-26', description: 'Breakfast outside', is_expense: true },
      { user_id: userId, category_id: catMap['Entertainment'], amount: 450.00, date: '2024-10-26', description: 'Movie tickets', is_expense: true },
      
      // October 27 (Sunday)
      { user_id: userId, category_id: catMap['Food'], amount: 200.00, date: '2024-10-27', description: 'Lunch with friends', is_expense: true },
      { user_id: userId, category_id: catMap['Utilities'], amount: 850.00, date: '2024-10-27', description: 'Electricity bill', is_expense: true },
      
      // October 28 (Monday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-10-28', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-10-28', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-10-28', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-10-28', description: 'Swiggy dinner', is_expense: true },
      
      // October 29 (Tuesday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-10-29', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-10-29', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-10-29', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-10-29', description: 'Swiggy dinner', is_expense: true },
      { user_id: userId, category_id: catMap['Utilities'], amount: 599.00, date: '2024-10-29', description: 'Internet bill', is_expense: true },
      
      // October 30 (Wednesday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-10-30', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-10-30', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-10-30', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-10-30', description: 'Swiggy dinner', is_expense: true },
      
      // October 31 (Thursday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-10-31', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-10-31', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-10-31', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-10-31', description: 'Swiggy dinner', is_expense: true },
      { user_id: userId, category_id: catMap['Shopping'], amount: 1200.00, date: '2024-10-31', description: 'New shoes', is_expense: true },
      
      // November 1 (Friday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-11-01', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-11-01', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-11-01', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-11-01', description: 'Swiggy dinner', is_expense: true },
      
      // November 2 (Saturday)
      { user_id: userId, category_id: catMap['Groceries'], amount: 800.00, date: '2024-11-02', description: 'Groceries', is_expense: true },
      { user_id: userId, category_id: catMap['Shopping'], amount: 2500.00, date: '2024-11-02', description: 'Shopping for trip', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 350.00, date: '2024-11-02', description: 'Dinner at restaurant', is_expense: true },
      
      // November 3-9 (Trip)
      { user_id: userId, category_id: catMap['Trip'], amount: 15000.00, date: '2024-11-03', description: 'Trip expenses - Nov 3-9', is_expense: true },
      
      // November 10 (Sunday)
      { user_id: userId, category_id: catMap['Food'], amount: 200.00, date: '2024-11-10', description: 'Lunch', is_expense: true },
      
      // November 11 (Monday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-11-11', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-11-11', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-11-11', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-11-11', description: 'Swiggy dinner', is_expense: true },
      
      // November 12 (Tuesday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-11-12', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-11-12', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-11-12', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-11-12', description: 'Swiggy dinner', is_expense: true },
      { user_id: userId, category_id: catMap['Entertainment'], amount: 299.00, date: '2024-11-12', description: 'Netflix subscription', is_expense: true },
      
      // November 13 (Wednesday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-11-13', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-11-13', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-11-13', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-11-13', description: 'Swiggy dinner', is_expense: true },
      { user_id: userId, category_id: catMap['Groceries'], amount: 950.00, date: '2024-11-13', description: 'Weekly groceries', is_expense: true },
      
      // November 14 (Thursday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-11-14', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-11-14', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-11-14', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-11-14', description: 'Swiggy dinner', is_expense: true },
      
      // November 15 (Friday) - Office
      { user_id: userId, category_id: catMap['Transportation'], amount: 60.00, date: '2024-11-15', description: 'Auto to office', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 50.00, date: '2024-11-15', description: 'Office tiffin', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 60.00, date: '2024-11-15', description: 'Office lunch', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 150.00, date: '2024-11-15', description: 'Swiggy dinner', is_expense: true },
      { user_id: userId, category_id: catMap['Entertainment'], amount: 600.00, date: '2024-11-15', description: 'Friday night out', is_expense: true },
      
      // November 16 (Saturday) - Today
      { user_id: userId, category_id: catMap['Groceries'], amount: 1100.00, date: '2024-11-16', description: 'Weekend groceries', is_expense: true },
      { user_id: userId, category_id: catMap['Food'], amount: 250.00, date: '2024-11-16', description: 'Brunch', is_expense: true },
    ];

    console.log(`Inserting ${transactions.length} transactions...`);

    const { data, error } = await supabase
      .from('transactions')
      .insert(transactions);

    if (error) {
      console.error('Error inserting transactions:', error);
      return;
    }

    console.log('✅ Successfully added all transactions!');

    // Add budgets
    const budgets = [
      { user_id: userId, category_id: catMap['Food'], amount: 8000.00, period: 'monthly' },
      { user_id: userId, category_id: catMap['Transportation'], amount: 2000.00, period: 'monthly' },
      { user_id: userId, category_id: catMap['Groceries'], amount: 5000.00, period: 'monthly' },
      { user_id: userId, category_id: catMap['Entertainment'], amount: 3000.00, period: 'monthly' },
      { user_id: userId, category_id: catMap['Utilities'], amount: 2000.00, period: 'monthly' },
    ];

    console.log('Adding budgets...');

    const { data: budgetData, error: budgetError } = await supabase
      .from('budgets')
      .upsert(budgets, { onConflict: 'user_id,category_id,period' });

    if (budgetError) {
      console.error('Error adding budgets:', budgetError);
    } else {
      console.log('✅ Successfully added budgets!');
    }

    console.log('\n📊 Summary:');
    console.log(`- Total transactions: ${transactions.length}`);
    console.log(`- Total budgets: ${budgets.length}`);
    console.log(`- Income: ₹70,000`);
    const totalExpenses = transactions.filter(t => t.is_expense).reduce((sum, t) => sum + t.amount, 0);
    console.log(`- Total expenses: ₹${totalExpenses.toFixed(2)}`);
    console.log(`- Net: ₹${(70000 - totalExpenses).toFixed(2)}`);

  } catch (error) {
    console.error('Error:', error);
  }
}

addTransactions();

import { useState, useEffect } from 'react';
import api from '../../services/api';

function AccountSummary() {
  const [summary, setSummary] = useState({
    balance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      
      // Get current month date range
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split('T')[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split('T')[0];

      // Fetch all transactions for current month
      const response = await api.get(
        `/.netlify/functions/api-transactions?start=${startOfMonth}&end=${endOfMonth}`
      );

      const transactions = response.data.transactions || [];

      // Calculate totals
      let income = 0;
      let expense = 0;

      transactions.forEach(transaction => {
        const amount = parseFloat(transaction.amount);
        if (transaction.is_expense) {
          expense += amount;
        } else {
          income += amount;
        }
      });

      setSummary({
        balance: income - expense,
        monthlyIncome: income,
        monthlyExpense: expense
      });
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <p className={`text-3xl font-bold mt-2 ${
              summary.balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${summary.balance.toFixed(2)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${
            summary.balance >= 0 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <svg className={`w-8 h-8 ${
              summary.balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Income */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Income</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${summary.monthlyIncome.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Expenses */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              ${summary.monthlyExpense.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;

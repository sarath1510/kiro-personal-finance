import { useState, useEffect } from 'react';
import api from '../../services/api';

function MonthlySummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // YYYY-MM format
  );

  useEffect(() => {
    fetchSummary();
  }, [selectedMonth]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const startDate = `${selectedMonth}-01`;
      const endDate = new Date(selectedMonth + '-01');
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      const endDateStr = endDate.toISOString().split('T')[0];

      const response = await api.get(
        `/.netlify/functions/api-transactions?start=${startDate}&end=${endDateStr}`
      );

      const transactions = response.data.transactions || [];
      
      const income = transactions
        .filter(t => !t.is_expense)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      const expenses = transactions
        .filter(t => t.is_expense)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      setSummary({
        income,
        expenses,
        net: income - expenses,
        transactionCount: transactions.length
      });
    } catch (error) {
      console.error('Failed to fetch monthly summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl font-semibold">Monthly Summary</h2>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright-blue text-sm"
        />
      </div>

      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-light-blue rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Income</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              ${summary.income.toFixed(2)}
            </p>
          </div>
          <div className="bg-light-blue rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
            <p className="text-xl sm:text-2xl font-bold text-red-600">
              ${summary.expenses.toFixed(2)}
            </p>
          </div>
          <div className="bg-light-blue rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Net</p>
            <p className={`text-xl sm:text-2xl font-bold ${summary.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${summary.net.toFixed(2)}
            </p>
          </div>
          <div className="bg-light-blue rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Transactions</p>
            <p className="text-xl sm:text-2xl font-bold text-bright-blue">
              {summary.transactionCount}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlySummary;

import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import BudgetList from '../components/budgets/BudgetList';
import BudgetForm from '../components/budgets/BudgetForm';
import api from '../services/api';

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/.netlify/functions/api-budgets');
      setBudgets(response.data.budgets || []);
    } catch (error) {
      console.error('Failed to fetch budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this budget?')) {
      return;
    }

    try {
      await api.delete(`/.netlify/functions/api-budgets/${id}`);
      fetchBudgets();
    } catch (error) {
      console.error('Failed to delete budget:', error);
      alert('Failed to delete budget');
    }
  };

  return (
    <div className="min-h-screen bg-light-blue">
      <Navbar />
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Budgets</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-bright-blue hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Budget
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bright-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading budgets...</p>
          </div>
        ) : (
          <BudgetList budgets={budgets} onDelete={handleDelete} />
        )}
      </div>

      {isFormOpen && (
        <BudgetForm
          onClose={() => setIsFormOpen(false)}
          onSuccess={fetchBudgets}
        />
      )}
    </div>
  );
}

export default Budgets;

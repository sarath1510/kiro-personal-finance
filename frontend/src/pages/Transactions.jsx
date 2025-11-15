import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import TransactionList from '../components/transactions/TransactionList';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionForm from '../components/transactions/TransactionForm';
import api from '../services/api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    categoryId: ''
  });

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let url = '/.netlify/functions/api-transactions';
      const params = [];
      
      if (filters.startDate) params.push(`start=${filters.startDate}`);
      if (filters.endDate) params.push(`end=${filters.endDate}`);
      
      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await api.get(url);
      let txns = response.data.transactions || [];

      // Filter by category if selected
      if (filters.categoryId) {
        txns = txns.filter(t => t.category_id === filters.categoryId);
      }

      setTransactions(txns);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleFormSuccess = () => {
    fetchTransactions();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Transaction
            </button>
          </div>

          <TransactionFilters onFilterChange={setFilters} />

          {loading ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading transactions...</p>
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              onEdit={handleEdit}
              onDelete={fetchTransactions}
              onRefresh={fetchTransactions}
            />
          )}
        </div>
      </div>

      {isFormOpen && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default Transactions;

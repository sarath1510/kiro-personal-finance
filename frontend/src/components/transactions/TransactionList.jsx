import { useState } from 'react';
import api from '../../services/api';

function TransactionList({ transactions, onEdit, onDelete, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/.netlify/functions/api-transactions-id/${id}`);
      onRefresh();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      alert('Failed to delete transaction');
    } finally {
      setDeletingId(null);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-600 text-lg">No transactions found</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or add a new transaction</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {transaction.description || 'No description'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {transaction.category_name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                <span className={transaction.is_expense ? 'text-red-600' : 'text-green-600'}>
                  {transaction.is_expense ? '-' : '+'}${parseFloat(transaction.amount).toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(transaction)}
                  className="text-primary-600 hover:text-primary-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  disabled={deletingId === transaction.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {deletingId === transaction.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;

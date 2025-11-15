import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import AccountSummary from '../components/dashboard/AccountSummary';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import QuickAddModal from '../components/dashboard/QuickAddModal';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionAdded = () => {
    // Trigger refresh of components
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-light-blue">
      <Navbar />
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-bright-blue hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Transaction
          </button>
        </div>

        <AccountSummary key={`summary-${refreshKey}`} />
        <RecentTransactions key={`transactions-${refreshKey}`} />
      </div>

      <QuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleTransactionAdded}
      />
    </div>
  );
}

export default Dashboard;

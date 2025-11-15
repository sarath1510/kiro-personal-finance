import { useState, useEffect } from 'react';
import api from '../../services/api';

function TopMerchants() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/.netlify/functions/api-transactions?start=${dateRange.start}&end=${dateRange.end}`
      );

      const transactions = response.data.transactions || [];
      
      // Group by description (merchant) and sum amounts
      const merchantMap = {};
      transactions
        .filter(t => t.is_expense && t.description)
        .forEach(t => {
          const merchant = t.description.trim();
          if (!merchantMap[merchant]) {
            merchantMap[merchant] = {
              name: merchant,
              total: 0,
              count: 0,
              category: t.category_name
            };
          }
          merchantMap[merchant].total += parseFloat(t.amount);
          merchantMap[merchant].count += 1;
        });

      // Sort by total and get top 10
      const sorted = Object.values(merchantMap)
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

      setMerchants(sorted);
    } catch (error) {
      console.error('Failed to fetch top merchants:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Top Merchants</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright-blue text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bright-blue text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="animate-pulse flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : merchants.length > 0 ? (
        <div className="space-y-2">
          {merchants.map((merchant, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-light-blue rounded hover:bg-blue-100 transition-colors gap-2"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{merchant.name}</p>
                <p className="text-sm text-gray-600">
                  {merchant.count} transaction{merchant.count > 1 ? 's' : ''} • {merchant.category}
                </p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-lg font-bold text-red-600">
                  ${merchant.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p>No merchant data for this period</p>
          <p className="text-sm mt-2">Add descriptions to your transactions to see top merchants</p>
        </div>
      )}
    </div>
  );
}

export default TopMerchants;

import Navbar from '../components/common/Navbar';
import SpendingByCategory from '../components/reports/SpendingByCategory';

function Reports() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>
          
          <div className="grid grid-cols-1 gap-6">
            <SpendingByCategory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;

import Navbar from '../components/common/Navbar';
import MonthlySummary from '../components/reports/MonthlySummary';
import SpendingByCategory from '../components/reports/SpendingByCategory';
import SpendingOverTime from '../components/reports/SpendingOverTime';
import TopMerchants from '../components/reports/TopMerchants';

function Reports() {
  return (
    <div className="min-h-screen bg-light-blue">
      <Navbar />
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Reports</h1>
        
        <div className="space-y-4 sm:space-y-6">
          <MonthlySummary />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <SpendingByCategory />
            <SpendingOverTime />
          </div>
          
          <TopMerchants />
        </div>
      </div>
    </div>
  );
}

export default Reports;

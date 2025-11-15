import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop and Tablet View */}
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-shrink-0 mr-4">
              <Link to="/dashboard" className="text-lg sm:text-xl font-bold text-bright-blue">
                Finance
              </Link>
            </div>
            
            {/* Horizontal scrollable menu for mobile/tablet */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4 sm:space-x-6 min-w-max">
                <Link
                  to="/dashboard"
                  className={`${
                    isActive('/dashboard')
                      ? 'border-bright-blue text-bright-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium whitespace-nowrap`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className={`${
                    isActive('/transactions')
                      ? 'border-bright-blue text-bright-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium whitespace-nowrap`}
                >
                  Transactions
                </Link>
                <Link
                  to="/budgets"
                  className={`${
                    isActive('/budgets')
                      ? 'border-bright-blue text-bright-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium whitespace-nowrap`}
                >
                  Budgets
                </Link>
                <Link
                  to="/reports"
                  className={`${
                    isActive('/reports')
                      ? 'border-bright-blue text-bright-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium whitespace-nowrap`}
                >
                  Reports
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center ml-4 flex-shrink-0">
            <span className="hidden md:block text-gray-700 mr-3 text-sm">
              {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="bg-bright-blue hover:bg-primary-700 text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

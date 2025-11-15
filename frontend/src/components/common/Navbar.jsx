import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-lg sm:text-xl font-bold text-bright-blue">
              Finance
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`${
                isActive('/dashboard')
                  ? 'border-bright-blue text-bright-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`${
                isActive('/transactions')
                  ? 'border-bright-blue text-bright-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Transactions
            </Link>
            <Link
              to="/budgets"
              className={`${
                isActive('/budgets')
                  ? 'border-bright-blue text-bright-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Budgets
            </Link>
            <Link
              to="/reports"
              className={`${
                isActive('/reports')
                  ? 'border-bright-blue text-bright-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
            >
              Reports
            </Link>
          </div>

          {/* Desktop User Info and Logout */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-gray-700 text-sm">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="bg-bright-blue hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-bright-blue hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bright-blue"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              onClick={handleNavClick}
              className={`${
                isActive('/dashboard')
                  ? 'bg-light-blue text-bright-blue'
                  : 'text-gray-700 hover:bg-light-blue hover:text-bright-blue'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              onClick={handleNavClick}
              className={`${
                isActive('/transactions')
                  ? 'bg-light-blue text-bright-blue'
                  : 'text-gray-700 hover:bg-light-blue hover:text-bright-blue'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Transactions
            </Link>
            <Link
              to="/budgets"
              onClick={handleNavClick}
              className={`${
                isActive('/budgets')
                  ? 'bg-light-blue text-bright-blue'
                  : 'text-gray-700 hover:bg-light-blue hover:text-bright-blue'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Budgets
            </Link>
            <Link
              to="/reports"
              onClick={handleNavClick}
              className={`${
                isActive('/reports')
                  ? 'bg-light-blue text-bright-blue'
                  : 'text-gray-700 hover:bg-light-blue hover:text-bright-blue'
              } block px-3 py-2 rounded-md text-base font-medium`}
            >
              Reports
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-bright-blue flex items-center justify-center text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.username}</div>
                <div className="text-sm font-medium text-gray-500">{user?.role}</div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-light-blue hover:text-bright-blue"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

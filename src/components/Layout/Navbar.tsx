import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../../lib/supabase';

export default function Navbar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-900">BryanHanley.VC</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-900 font-medium transition">
              Home
            </Link>
            {authenticated && (
              <>
                <Link to="/evaluate" className="text-gray-700 hover:text-brand-900 font-medium transition">
                  Evaluate
                </Link>
                <Link to="/portfolio" className="text-gray-700 hover:text-brand-900 font-medium transition">
                  Portfolio
                </Link>
              </>
            )}
            <Link to="/methodology" className="text-gray-700 hover:text-brand-900 font-medium transition">
              Methodology
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-900 font-medium transition">
              About
            </Link>
          </div>

          <div>
            {authenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-brand-900 text-white px-4 py-2 rounded-lg hover:bg-brand-800 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

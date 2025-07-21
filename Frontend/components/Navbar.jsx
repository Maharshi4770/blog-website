import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Set firstName from localStorage on mount
    const updateFirstName = () => {
      const stored = localStorage.getItem('firstName');
      setFirstName(stored || '');
    };
    updateFirstName();
    // Listen for changes to localStorage (e.g., login/logout in other tabs)
    window.addEventListener('storage', updateFirstName);
    // Listen for navigation events (e.g., after login)
    window.addEventListener('focus', updateFirstName);
    return () => {
      window.removeEventListener('storage', updateFirstName);
      window.removeEventListener('focus', updateFirstName);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            BlogHub
          </Link>
          <div className='flex gap-10 ml-90'>
          <Link to="/" className="text-blue-700 font-medium hover:underline">Home</Link>
          <Link to="/dashboard" className="text-blue-700 font-medium hover:underline">Dashboard</Link>
          <Link to="/preview" className="text-blue-700 font-medium hover:underline">Preview</Link>
          </div>
        </div>
        <div className="space-x-4 flex items-center">
          {firstName && (
            <span className="font-semibold text-blue-700">Hi, {firstName}</span>
          )}
          {firstName ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

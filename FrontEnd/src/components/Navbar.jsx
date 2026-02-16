import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = ({ userRole = 'seller' }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        isActive(to) ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SkillMarket</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/about" label="About" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/contact" label="Contact" />
            {user && (userRole === 'seller' || user?.role === 'seller') && (
              <NavLink to="/dashboard" label="Dashboard" />
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-900 hidden sm:inline">{user.name}</span>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setAuthTab('login'); setAuthOpen(true); }}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthTab('signup'); setAuthOpen(true); }}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Join Now
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialTab={authTab}
      />
    </>
  );
};

export default Navbar;

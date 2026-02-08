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
      className={`${isActive(to) ? 'text-indigo-600' : 'hover:text-indigo-600'} relative py-1 transition-colors`}
    >
      {label}
      {isActive(to) && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
    </Link>
  );

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 glass-card px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-indigo-200">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">SkillMarket</span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8 text-sm font-bold text-slate-500">
          <NavLink to="/" label="Home" />
          <NavLink to="/about" label="About Us" />
          <NavLink to="/blog" label="Blog" />
          <NavLink to="/contact" label="Contact" />
          {user && (userRole === 'seller' || user?.role === 'seller') && (
            <NavLink to="/dashboard" label="Seller Panel" />
          )}
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-sm font-bold text-slate-700 hidden sm:inline">{user.name}</span>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-bold text-slate-700 hover:text-indigo-600 px-4 py-2 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => { setAuthTab('login'); setAuthOpen(true); }}
                className="text-sm font-bold text-slate-700 hover:text-indigo-600 px-4 py-2 transition-all"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('signup'); setAuthOpen(true); }}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200"
              >
                Join Now
              </button>
            </>
          )}
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

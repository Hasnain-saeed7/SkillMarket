import React, { useState } from 'react';
import { login, signup } from '../api/client';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [tab, setTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { loginSuccess } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') {
        const { data } = await login({ email: form.email, password: form.password });
        loginSuccess(data.user, data.access_token);
      } else {
        const { data } = await signup({
          name: form.name,
          email: form.email,
          password: form.password,
          role: 'seller',
        });
        loginSuccess(data.user, data.access_token);
      }
      onClose();
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      // Better error handling: show backend error or network issue
      let errorMsg = 'Something went wrong';
      
      if (err.response) {
        // Backend responded with error
        const detail = err.response.data?.detail;
        if (typeof detail === 'string') {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          errorMsg = detail.map(d => d.msg || d).join(', ');
        } else if (detail) {
          errorMsg = JSON.stringify(detail);
        } else {
          errorMsg = `Error ${err.response.status}: ${err.response.statusText}`;
        }
      } else if (err.request) {
        // Request made but no response (network error)
        errorMsg = 'Network error: Could not reach server. Please check if the backend is running on http://127.0.0.1:8000';
      } else {
        // Something else happened
        errorMsg = err.message || 'An unexpected error occurred';
      }
      
      setError(errorMsg);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in">
      {/* Fensea-style glassmorphic modal */}
      <div className="glass-card w-full max-w-md overflow-hidden animate-scale-in">
        {/* Header with tabs */}
        <div className="p-6 border-b border-white/20 flex justify-between items-center bg-gradient-to-r from-white/50 to-white/30">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setTab('login'); setError(''); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                tab === 'login' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setError(''); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                tab === 'signup' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              Sign Up
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/50 transition-all flex items-center justify-center text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 text-sm font-medium animate-slide-left">
              {error}
            </div>
          )}

          {tab === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-slate-900 via-indigo-700 to-purple-700 text-white py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

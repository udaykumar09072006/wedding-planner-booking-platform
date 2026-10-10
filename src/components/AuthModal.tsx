import React, { useState } from 'react';
import { X, Heart, Store, UserCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuthModal, loginAs } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'couple' | 'vendor'>('couple');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role, {
      name: name || (role === 'couple' ? 'Chloe & Liam' : 'Grand Lotus Resort Manager'),
      email: email || (role === 'couple' ? 'couple@example.com' : 'vendor@example.com'),
      phone: phone || '+1 (555) 123-4567',
      partnerName: partnerName || (role === 'couple' ? 'Liam' : undefined),
      weddingDate: weddingDate || (role === 'couple' ? '2026-11-14' : undefined)
    });
  };

  const handleQuickDemo = (demoRole: 'couple' | 'vendor') => {
    loginAs(demoRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Access bookings, vendor portfolios, and wedding tools.
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Pill Bar */}
        <div className="px-6 py-3 bg-violet-50/70 dark:bg-violet-950/30 border-b border-violet-100 dark:border-violet-900/50">
          <p className="text-[11px] font-semibold text-violet-800 dark:text-violet-300 uppercase tracking-wider mb-2">
            One-Click Internship Testing:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('couple')}
              className="py-1.5 px-2 bg-white dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-900/40 border border-violet-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Demo Couple</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('vendor')}
              className="py-1.5 px-2 bg-white dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-900/40 border border-violet-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-violet-600" />
              <span>Demo Vendor</span>
            </button>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('couple')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                role === 'couple'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>I'm a Couple</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('vendor')}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                role === 'vendor'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Wedding Vendor</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {role === 'couple' ? 'Couple Full Name' : 'Business / Contact Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'couple' ? 'Chloe & Liam' : 'The Grand Lotus Palace'}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              defaultValue="password123"
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {activeTab === 'register' && role === 'couple' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Partner Name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Liam"
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Wedding Date
                </label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer shadow-sm mt-2"
          >
            {activeTab === 'login' ? `Sign In as ${role === 'couple' ? 'Couple' : 'Vendor'}` : 'Create Free Account'}
          </button>

          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            {activeTab === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-violet-600 dark:text-violet-400 font-semibold hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-violet-600 dark:text-violet-400 font-semibold hover:underline cursor-pointer"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

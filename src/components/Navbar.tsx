import React, { useState } from 'react';
import { 
  Heart, 
  Scale, 
  Sun, 
  Moon, 
  User as UserIcon, 
  ChevronDown, 
  Store, 
  Calendar,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    darkMode, 
    toggleDarkMode, 
    currentUser, 
    openAuthModal, 
    logout, 
    loginAs,
    wishlist, 
    compareList 
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => navigateTo('home')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
            Vendor<span className="text-violet-600 dark:text-violet-400">Hub</span>
          </span>
          <span className="sr-only">VendorHub Homepage</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => navigateTo('listing')}
            className={`whitespace-nowrap hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer ${
              currentPage === 'listing' ? 'text-violet-600 dark:text-violet-400 font-semibold' : ''
            }`}
          >
            Browse Vendors
          </button>

          <button
            onClick={() => {
              navigateTo('home');
              setTimeout(() => {
                const el = document.getElementById('categories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="whitespace-nowrap hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
          >
            Categories
          </button>

          <button
            onClick={() => navigateTo('compare')}
            className={`relative whitespace-nowrap hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'compare' ? 'text-violet-600 dark:text-violet-400 font-semibold' : ''
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Compare</span>
            {compareList.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-violet-600 rounded-full">
                {compareList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('wishlist')}
            className={`relative whitespace-nowrap hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'wishlist' ? 'text-violet-600 dark:text-violet-400 font-semibold' : ''
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-rose-500 rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              if (!currentUser) {
                openAuthModal();
              } else if (currentUser.role === 'vendor') {
                navigateTo('vendor-dashboard');
              } else {
                navigateTo('user-dashboard');
              }
            }}
            className={`whitespace-nowrap hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer ${
              currentPage === 'user-dashboard' || currentPage === 'vendor-dashboard'
                ? 'text-violet-600 dark:text-violet-400 font-semibold'
                : ''
            }`}
          >
            {currentUser?.role === 'vendor' ? 'Vendor Portal' : 'My Bookings'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User state / Action */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 bg-violet-50 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-violet-200 dark:border-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-semibold">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[110px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                    <span className="inline-block mt-1 text-xs text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded">
                      Role: {currentUser.role === 'vendor' ? 'Vendor Partner' : 'Couple / Client'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('user-dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Couple Dashboard & Bookings</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigateTo('vendor-dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-slate-400" />
                      <span>Vendor Business Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        // Fast role switcher
                        const nextRole = currentUser.role === 'couple' ? 'vendor' : 'couple';
                        loginAs(nextRole);
                        setUserDropdownOpen(false);
                        navigateTo(nextRole === 'vendor' ? 'vendor-dashboard' : 'user-dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-slate-700 mt-1 pt-2"
                    >
                      <span>Switch to {currentUser.role === 'couple' ? 'Vendor Mode' : 'Couple Mode'} (Demo)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-violet-500/20"
            >
              Sign In / Register
            </button>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          <button
            onClick={() => {
              navigateTo('listing');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-slate-700 dark:text-slate-200 py-1.5"
          >
            Browse All Vendors
          </button>
          <button
            onClick={() => {
              navigateTo('compare');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-slate-700 dark:text-slate-200 py-1.5"
          >
            Compare Vendors ({compareList.length})
          </button>
          <button
            onClick={() => {
              navigateTo('wishlist');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-slate-700 dark:text-slate-200 py-1.5"
          >
            Saved Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => {
              navigateTo('user-dashboard');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-slate-700 dark:text-slate-200 py-1.5"
          >
            Couple Dashboard
          </button>
          <button
            onClick={() => {
              navigateTo('vendor-dashboard');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-slate-700 dark:text-slate-200 py-1.5"
          >
            Vendor Business Portal
          </button>
        </div>
      )}
    </header>
  );
};

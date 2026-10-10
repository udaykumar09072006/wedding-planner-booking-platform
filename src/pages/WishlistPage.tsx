import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VendorCard } from '../components/VendorCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, vendors, navigateTo } = useApp();

  const savedVendors = vendors.filter(v => wishlist.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
            Curated Shortlist
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-0.5">
            Saved Wedding Vendors ({savedVendors.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Keep track of your favorite venues, artists, and caterers before making final deposits.
          </p>
        </div>

        {savedVendors.length > 0 && (
          <button
            onClick={() => navigateTo('listing')}
            className="px-4 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
          >
            Explore More Vendors
          </button>
        )}
      </div>

      {savedVendors.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Click the heart icon on any vendor profile or card to save them to your private wedding shortlist.
          </p>
          <button
            onClick={() => navigateTo('listing')}
            className="mt-6 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-xs hover:bg-violet-700 transition-colors cursor-pointer shadow-sm inline-flex items-center gap-1.5"
          >
            <span>Discover Top Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </div>
  );
};

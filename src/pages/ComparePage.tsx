import React from 'react';
import { 
  Scale, 
  Trash2, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  X,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ComparePage: React.FC = () => {
  const { 
    compareList, 
    vendors, 
    toggleCompare, 
    clearCompare, 
    navigateTo, 
    openBookingModal 
  } = useApp();

  const comparedVendors = vendors.filter(v => compareList.includes(v.id));

  if (comparedVendors.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-950/50 text-violet-600 flex items-center justify-center mx-auto mb-4">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
          No Vendors in Comparison
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          Compare up to 4 wedding vendors side-by-side on pricing, response time, client ratings, and included services.
        </p>
        <button
          onClick={() => navigateTo('listing')}
          className="mt-6 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-xs hover:bg-violet-700 transition-colors cursor-pointer shadow-sm"
        >
          Browse Vendors to Compare
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
            Decision Matrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-0.5">
            Compare Wedding Vendors ({comparedVendors.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('listing')}
            className="px-3.5 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            + Add Another Vendor
          </button>
          <button
            onClick={clearCompare}
            className="px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 w-48 bg-slate-50/70 dark:bg-slate-800/40 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Criteria
              </th>
              {comparedVendors.map((vendor) => (
                <th key={vendor.id} className="p-4 w-72 align-top">
                  <div className="relative">
                    <button
                      onClick={() => toggleCompare(vendor.id)}
                      className="absolute -top-1 -right-1 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="h-28 rounded-lg overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={vendor.coverImage}
                        alt={vendor.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider block">
                      {vendor.subCategory}
                    </span>
                    <h3 
                      onClick={() => navigateTo('detail', vendor.id)}
                      className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 hover:underline cursor-pointer"
                    >
                      {vendor.name}
                    </h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            
            {/* Rating row */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Client Rating
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">
                      {vendor.rating}
                    </span>
                    <span className="text-slate-400">({vendor.reviewCount} reviews)</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Starting Price */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Starting Rate
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4">
                  <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                    ${vendor.startingPrice.toLocaleString()}
                  </span>
                  <span className="text-slate-400"> / {vendor.priceUnit}</span>
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Location & Base
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{vendor.city}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Response Time */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Response Time
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-violet-500" />
                    <span>{vendor.responseTime}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Experience */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Experience
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4 text-slate-800 dark:text-slate-200 font-medium">
                  {vendor.experienceYears} Years in Industry
                </td>
              ))}
            </tr>

            {/* Packages count */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Pricing Packages
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4">
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {vendor.packages.map(p => (
                      <li key={p.id} className="flex items-center justify-between">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{p.name}</span>
                        <span className="tabular-nums font-semibold">${p.price.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Top Amenities */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Key Amenities
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4">
                  <div className="space-y-1">
                    {vendor.amenities.slice(0, 3).map((a, i) => (
                      <div key={i} className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-violet-500 shrink-0" />
                        <span className="line-clamp-1">{a}</span>
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Direct Booking CTA */}
            <tr>
              <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">
                Direct Booking
              </td>
              {comparedVendors.map((vendor) => (
                <td key={vendor.id} className="p-4">
                  <button
                    onClick={() => openBookingModal(vendor)}
                    className="w-full py-2.5 px-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors cursor-pointer text-center shadow-xs"
                  >
                    Reserve with {vendor.name.split(' ')[0]}
                  </button>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};

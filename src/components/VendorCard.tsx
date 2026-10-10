import React from 'react';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  Heart, 
  Scale, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Vendor } from '../types';
import { useApp } from '../context/AppContext';

interface VendorCardProps {
  vendor: Vendor;
  viewMode?: 'grid' | 'list';
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, viewMode = 'grid' }) => {
  const { 
    navigateTo, 
    toggleWishlist, 
    isWishlisted, 
    toggleCompare, 
    isInCompare,
    openBookingModal 
  } = useApp();

  const wishlisted = isWishlisted(vendor.id);
  const compared = isInCompare(vendor.id);

  if (viewMode === 'list') {
    return (
      <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-violet-300 dark:hover:border-violet-700/60 transition-all flex flex-col sm:flex-row shadow-xs hover:shadow-md">
        {/* Left Image Section */}
        <div className="relative sm:w-72 h-56 sm:h-auto shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={vendor.coverImage}
            alt={vendor.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(vendor.id);
            }}
            aria-label="Save vendor"
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 shadow-xs transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Unboxed Metadata Header */}
            <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-medium text-violet-700 dark:text-violet-400">{vendor.subCategory}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {vendor.city}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Responds {vendor.responseTime}
                </span>
              </div>
              {vendor.verified && (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
            </div>

            <h3 
              onClick={() => navigateTo('detail', vendor.id)}
              className="text-lg font-semibold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-colors"
            >
              {vendor.name}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {vendor.tagline}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {vendor.amenities.slice(0, 3).map((amenity, i) => (
                <span key={i} className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-violet-500" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{vendor.rating}</span>
                <span>({vendor.reviewCount} reviews)</span>
              </div>
              <div className="mt-1">
                <span className="text-xs text-slate-400">Starting at </span>
                <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                  ${vendor.startingPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400"> / {vendor.priceUnit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCompare(vendor.id);
                }}
                className={`p-2 text-xs rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  compared 
                    ? 'bg-violet-50 dark:bg-violet-950/60 border-violet-400 text-violet-700 dark:text-violet-300 font-medium' 
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                title="Compare side-by-side"
              >
                <Scale className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{compared ? 'Compared' : 'Compare'}</span>
              </button>

              <button
                onClick={() => navigateTo('detail', vendor.id)}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                View Packages
              </button>

              <button
                onClick={() => openBookingModal(vendor)}
                className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Book Date
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-violet-300 dark:hover:border-violet-700/60 transition-all flex flex-col shadow-xs hover:shadow-md">
      {/* Top Image Section (65% visually) */}
      <div 
        onClick={() => navigateTo('detail', vendor.id)}
        className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
      >
        <img
          src={vendor.coverImage}
          alt={vendor.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Top Badges / Buttons */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {vendor.featured ? (
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
              Featured Partner
            </span>
          ) : <span />}

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare(vendor.id);
              }}
              aria-label="Add to comparison"
              className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
                compared 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800'
              }`}
              title={compared ? 'Remove from compare' : 'Compare vendor'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(vendor.id);
              }}
              aria-label="Save to wishlist"
              className="p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-xs shadow-xs transition-colors cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom subtle gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end px-3 pb-2">
          <div className="flex items-center justify-between w-full text-xs text-white">
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3 text-violet-300" />
              {vendor.city}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-violet-300" />
              {vendor.responseTime}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium text-violet-700 dark:text-violet-400">{vendor.subCategory}</span>
            {vendor.verified && (
              <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          <h3 
            onClick={() => navigateTo('detail', vendor.id)}
            className="font-semibold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-colors line-clamp-1"
          >
            {vendor.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {vendor.tagline}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{vendor.rating}</span>
              <span className="text-[11px] text-slate-400">({vendor.reviewCount})</span>
            </div>
            <div className="mt-0.5">
              <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                ${vendor.startingPrice.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400"> / {vendor.priceUnit}</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('detail', vendor.id)}
            className="flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 px-3 py-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

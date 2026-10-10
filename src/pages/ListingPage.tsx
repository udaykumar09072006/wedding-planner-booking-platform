import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  Star, 
  MapPin, 
  Calendar, 
  X,
  Scale,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_INFO, CITIES } from '../data/mockVendors';
import { VendorCategory } from '../types';
import { VendorCard } from '../components/VendorCard';

export const ListingPage: React.FC = () => {
  const { 
    vendors, 
    filters, 
    setFilters, 
    resetFilters, 
    compareList, 
    navigateTo,
    clearCompare 
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available subcategories for current category selection
  const currentCategorySubCats = useMemo(() => {
    if (filters.category === 'all') {
      const allSubs: string[] = [];
      Object.values(CATEGORY_INFO).forEach(c => allSubs.push(...c.subCategories));
      return Array.from(new Set(allSubs));
    }
    return CATEGORY_INFO[filters.category]?.subCategories || [];
  }, [filters.category]);

  // Filtered & sorted vendor list
  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      // Category filter
      if (filters.category !== 'all' && vendor.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subCategory && vendor.subCategory !== filters.subCategory) {
        return false;
      }

      // City filter
      if (filters.city !== 'All Cities' && vendor.city !== filters.city) {
        return false;
      }

      // Price filter
      if (vendor.startingPrice < filters.minPrice || vendor.startingPrice > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && vendor.rating < filters.minRating) {
        return false;
      }

      // Availability Date filter
      if (filters.availabilityDate && vendor.bookedDates.includes(filters.availabilityDate)) {
        return false; // booked on this date
      }

      // Search query (name, tagline, city, subCategory, about)
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesName = vendor.name.toLowerCase().includes(q);
        const matchesTagline = vendor.tagline.toLowerCase().includes(q);
        const matchesSub = vendor.subCategory.toLowerCase().includes(q);
        const matchesCity = vendor.city.toLowerCase().includes(q);
        const matchesAbout = vendor.about.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesSub && !matchesCity && !matchesAbout) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'price-asc') {
        return a.startingPrice - b.startingPrice;
      }
      if (filters.sortBy === 'price-desc') {
        return b.startingPrice - a.startingPrice;
      }
      if (filters.sortBy === 'reviews-desc') {
        return b.reviewCount - a.reviewCount;
      }
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [vendors, filters]);

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.subCategory !== '' || 
    filters.search !== '' || 
    filters.city !== 'All Cities' || 
    filters.minPrice > 0 || 
    filters.maxPrice < 20000 || 
    filters.minRating > 0 || 
    filters.availabilityDate !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Compare Floating Banner if items selected */}
      {compareList.length > 0 && (
        <div className="p-4 rounded-xl bg-violet-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Scale className="w-5 h-5 text-violet-200" />
            <span>
              You have selected <strong className="underline">{compareList.length}</strong> {compareList.length === 1 ? 'vendor' : 'vendors'} to compare.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-violet-200 hover:text-white hover:bg-violet-700 transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={() => navigateTo('compare')}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-violet-700 hover:bg-violet-50 transition-colors cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span>View Side-by-Side Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Page Title & Search Bar Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
            {filters.category === 'all' 
              ? 'All Wedding Vendors' 
              : CATEGORY_INFO[filters.category]?.name || 'Wedding Vendors'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showing <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{filteredVendors.length}</span> verified wedding professionals
          </p>
        </div>

        {/* Search input in header */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search by vendor name, service, or style..."
              className="w-full pl-9 pr-8 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {filters.search && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Layout Grid: Left Sidebar + Right Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 space-y-6`}>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-violet-600" />
                Filter Vendors
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset All
                </button>
              )}
            </div>

            {/* 1. Category Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Category
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, category: 'all', subCategory: '' }))}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                    filters.category === 'all'
                      ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] text-slate-400">{vendors.length}</span>
                </button>
                {(Object.keys(CATEGORY_INFO) as VendorCategory[]).map(key => {
                  const isSelected = filters.category === key;
                  const count = vendors.filter(v => v.category === key).length;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, category: key, subCategory: '' }))}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{CATEGORY_INFO[key].name}</span>
                      <span className="text-[11px] text-slate-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Sub-Category Selector */}
            {currentCategorySubCats.length > 0 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Specialized Service
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, subCategory: '' }))}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                      filters.subCategory === ''
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    All
                  </button>
                  {currentCategorySubCats.map(sub => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, subCategory: sub }))}
                      className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                        filters.subCategory === sub
                          ? 'bg-violet-600 text-white font-medium'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Location / City Filter */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                City / Location
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* 4. Price Range Filter */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Starting Price Range
                </label>
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 tabular-nums">
                  Up to ${filters.maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="20000"
                step="100"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-violet-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>$50</span>
                <span>$20,000+</span>
              </div>
            </div>

            {/* 5. Rating Filter */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Minimum Client Rating
              </label>
              <div className="space-y-1">
                {[0, 4.5, 4.8].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, minRating: rate }))}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      filters.minRating === rate
                        ? 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Star className={`w-3.5 h-3.5 ${rate > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                      {rate === 0 ? 'Any Rating' : `${rate} Stars & Above`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Availability Date Filter */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Check Specific Open Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.availabilityDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, availabilityDate: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              {filters.availabilityDate && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, availabilityDate: '' }))}
                  className="text-[11px] text-violet-600 hover:underline mt-1 cursor-pointer block"
                >
                  Clear date check
                </button>
              )}
            </div>

          </div>
        </aside>

        {/* Right Listings Results */}
        <main className="lg:col-span-3 space-y-4">
          
          {/* Controls Bar: Sort By & View Mode */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort By:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="py-1 px-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium cursor-pointer focus:outline-none"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="reviews-desc">Most Reviewed</option>
              </select>
            </div>

            {/* View Mode Grid/List toggle */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Vendors Grid or List */}
          {filteredVendors.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white">No Vendors Found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                No vendors match your current filter parameters. Try loosening your price limit, picking another city, or resetting filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVendors.map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} viewMode="list" />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  Camera, 
  UtensilsCrossed, 
  Flower2, 
  Sparkles, 
  Music, 
  CalendarCheck, 
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_INFO, CITIES } from '../data/mockVendors';
import { VendorCategory } from '../types';
import { VendorCard } from '../components/VendorCard';

export const HomePage: React.FC = () => {
  const { vendors, navigateTo, setCategoryFilter, setFilters, openAuthModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      category: selectedCat === 'all' ? 'all' : (selectedCat as VendorCategory),
      city: selectedCity
    }));
    navigateTo('listing');
  };

  const getCategoryIcon = (cat: VendorCategory) => {
    switch (cat) {
      case 'venues': return <Building2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      case 'photographers': return <Camera className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      case 'caterers': return <UtensilsCrossed className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      case 'florists': return <Flower2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      case 'makeup': return <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      case 'djs': return <Music className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      case 'planners': return <CalendarCheck className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
    }
  };

  const featuredVendors = vendors.filter(v => v.featured).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[580px] flex items-center">
        {/* Background photo with subtle dark scrim */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_wedding_couple_1791613820623.jpg"
            alt="Luxury wedding celebration under floral canopy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              The Premier Wedding Marketplace
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12] mt-3 mb-5 text-balance">
              Find & Book Your Dream Wedding Team
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Discover verified venues, photographers, caterers, florists, and makeup artists. Compare packages, check open dates, and reserve without hidden markups.
            </p>

            {/* Comprehensive Search Bar Container */}
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white dark:bg-slate-900 p-2 sm:p-3 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 text-slate-900 dark:text-white"
            >
              {/* Category picker */}
              <div className="sm:col-span-4 relative border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-700 pb-2 sm:pb-0 sm:pr-2">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 pt-1">
                  Service Category
                </label>
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="w-full px-3 py-1 text-sm font-medium bg-transparent focus:outline-none cursor-pointer text-slate-900 dark:text-white"
                >
                  <option value="all" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Categories</option>
                  {(Object.keys(CATEGORY_INFO) as VendorCategory[]).map(key => (
                    <option key={key} value={key} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {CATEGORY_INFO[key].name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City picker */}
              <div className="sm:col-span-4 relative border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-700 pb-2 sm:pb-0 sm:pr-2">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 pt-1">
                  Location / City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-1 text-sm font-medium bg-transparent focus:outline-none cursor-pointer text-slate-900 dark:text-white"
                >
                  {CITIES.map(c => (
                    <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{c}</option>
                  ))}
                </select>
              </div>

              {/* Keyword / Name */}
              <div className="sm:col-span-4 flex items-center justify-between gap-2 pl-2">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1 pt-1">
                    Keyword
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Palace, Candid, Mandap..."
                    className="w-full px-1 py-1 text-sm bg-transparent focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </form>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-300">
              <span className="text-slate-400">Trending searches:</span>
              {['Banquet Halls', 'Resort Lawn', 'Candid Photography', 'Mandap Decor', 'Bridal Makeup'].map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setFilters(prev => ({ ...prev, search: term, category: 'all' }));
                    navigateTo('listing');
                  }}
                  className="hover:text-white underline underline-offset-4 decoration-violet-400 cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Adjacency Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white tabular-nums">1,200+</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified Wedding Pros</p>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white tabular-nums">4.92 / 5</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Average Client Rating</p>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 dark:text-white tabular-nums">48,000+</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Couples Connected</p>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-violet-600 dark:text-violet-400 tabular-nums">$0 Markup</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Direct Vendor Pricing</p>
          </div>
        </div>
      </section>

      {/* 3. Vendor Categories Module */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Browse by Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
              Wedding Vendor Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, category: 'all' }));
              navigateTo('listing');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(Object.keys(CATEGORY_INFO) as VendorCategory[]).map((catKey) => {
            const cat = CATEGORY_INFO[catKey];
            return (
              <div
                key={catKey}
                onClick={() => setCategoryFilter(catKey)}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-600 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 flex items-center justify-center mb-4 group-hover:scale-108 transition-transform">
                    {getCategoryIcon(catKey)}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{cat.count}+ Listed</span>
                  <span className="font-medium text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Vendors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
              Handpicked Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
              Featured Wedding Professionals
            </h2>
          </div>
          <button
            onClick={() => navigateTo('listing')}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 cursor-pointer"
          >
            <span>Explore All {vendors.length} Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* 5. Trending Wedding Services Bento/Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden relative">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              Wedding Trends 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2 mb-4">
              Bespoke Experiences Curated for Your Big Day
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              From cinematic 4K drone trailers and starlit royal palace lawns to authentic Awadhi live dum biryanis and fairy wisteria mandaps, discover the top requested experiences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <h4 className="font-semibold text-sm text-white">Cinematic Drone Reels</h4>
                <p className="text-xs text-slate-400 mt-1">48h teaser delivery for instant sharing</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <h4 className="font-semibold text-sm text-white">Botanical Mandaps</h4>
                <p className="text-xs text-slate-400 mt-1">Living floral pergolas & arches</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <h4 className="font-semibold text-sm text-white">Interactive Food Bars</h4>
                <p className="text-xs text-slate-400 mt-1">Live chaat, artisanal kulfi & tapas</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('listing')}
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <span>Explore Curated Vendors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Testimonials from Happy Couples */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Real Love Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white mt-1">
            Loved by Over 48,000 Newlyweds
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            See how VendorHub simplified planning for couples across the nation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">
              "We booked our venue, photographer, and florist in a single weekend through VendorHub! Being able to see genuine pricing packages upfront without sending 50 emails saved our sanity."
            </p>
            <div className="text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block">Chloe & Liam Vance</span>
              <span className="text-slate-400">Married at Napa Gateway · Oct 2026</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">
              "The comparison feature was a lifesaver. We compared 3 caterers side-by-side to review plate costs, live counters, and guest reviews. The booking deposit was smooth and safe."
            </p>
            <div className="text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block">Aarav & Priya Sharma</span>
              <span className="text-slate-400">Married in Chicago · Sep 2026</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-4">
              "Our photographer Aura Lens Studios delivered beyond our wildest expectations. Their response time was under 30 minutes right from our initial booking on VendorHub!"
            </p>
            <div className="text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block">Marcus & Sierra Reed</span>
              <span className="text-slate-400">Married in New York · Aug 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Vendor Partner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-violet-50 dark:bg-violet-950/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Are you a wedding vendor? Grow your bookings.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Join thousands of top venues, photographers, florists, and planners. Showcase your portfolio and connect directly with engaged couples.
            </p>
          </div>
          <button
            onClick={openAuthModal}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            List Your Business Free
          </button>
        </div>
      </section>

    </div>
  );
};

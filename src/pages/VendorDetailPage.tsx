import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Scale, 
  Share2, 
  Calendar, 
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORY_INFO } from '../data/mockVendors';

export const VendorDetailPage: React.FC = () => {
  const { 
    selectedVendor, 
    navigateTo, 
    toggleWishlist, 
    isWishlisted, 
    toggleCompare, 
    isInCompare, 
    openBookingModal, 
    openReviewModal,
    showToast 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'packages' | 'about' | 'availability' | 'reviews'>('packages');

  if (!selectedVendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-slate-500">Vendor not found.</p>
        <button
          onClick={() => navigateTo('listing')}
          className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg text-xs"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const wishlisted = isWishlisted(selectedVendor.id);
  const compared = isInCompare(selectedVendor.id);

  // Generate calendar days for current month (e.g., Nov 2026)
  const currentMonthDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
    const isBooked = selectedVendor.bookedDates.includes(dateStr);
    return { day, dateStr, isBooked };
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Vendor link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button & Action controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('listing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Vendors</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleCompare(selectedVendor.id)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              compared
                ? 'bg-violet-50 dark:bg-violet-950/60 border-violet-400 text-violet-700 dark:text-violet-300 font-semibold'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{compared ? 'In Comparison' : 'Compare'}</span>
          </button>

          <button
            onClick={() => toggleWishlist(selectedVendor.id)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              wishlisted
                ? 'border-rose-200 bg-rose-50 text-rose-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Share Profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gallery Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Large Image */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 h-[380px] sm:h-[460px] relative shadow-xs">
          <img
            src={selectedVendor.images[activeImageIndex] || selectedVendor.coverImage}
            alt={selectedVendor.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {selectedVendor.verified && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Vendor Partner</span>
            </div>
          )}
        </div>

        {/* Side Thumbnails */}
        <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
          {selectedVendor.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`rounded-xl overflow-hidden cursor-pointer border-2 transition-all shrink-0 w-32 h-24 lg:w-full lg:h-[142px] ${
                activeImageIndex === idx
                  ? 'border-violet-600 ring-2 ring-violet-400/40'
                  : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${selectedVendor.name} preview ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content & Sticky Booking Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 cols: Profile Details, Packages, Availability & Reviews */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-semibold text-violet-700 dark:text-violet-400 uppercase tracking-wider">
                {CATEGORY_INFO[selectedVendor.category]?.name || selectedVendor.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedVendor.subCategory}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {selectedVendor.city}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
              {selectedVendor.name}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {selectedVendor.tagline}
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Rating</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5 tabular-nums text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {selectedVendor.rating} ({selectedVendor.reviewCount})
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Experience</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 text-sm tabular-nums">
                  {selectedVendor.experienceYears}+ Years Active
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Response Time</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 text-sm">
                  {selectedVendor.responseTime}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Location</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 text-sm truncate block" title={selectedVendor.address}>
                  {selectedVendor.city}
                </span>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('packages')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'packages'
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Packages & Pricing ({selectedVendor.packages.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'about'
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              About & Amenities
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'availability'
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Availability Calendar
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Client Reviews ({selectedVendor.reviews.length})
            </button>
          </div>

          {/* Tab 1: Pricing Packages */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white">
                  Curated Service Packages
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  All packages include standard setup, backup staff, and 100% verified vendor satisfaction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {selectedVendor.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                      pkg.popular
                        ? 'border-violet-400 bg-violet-50/40 dark:bg-violet-950/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white">{pkg.name}</h4>
                        {pkg.popular && (
                          <span className="text-[11px] font-semibold text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/60 px-2 py-0.5 rounded">
                            Popular Choice
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {pkg.description}
                      </p>

                      <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-4 tabular-nums">
                        ${pkg.price.toLocaleString()}{' '}
                        <span className="text-xs font-normal text-slate-400">/ {pkg.priceUnit || selectedVendor.priceUnit}</span>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                          Package Inclusions:
                        </span>
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => openBookingModal(selectedVendor, pkg.id)}
                        className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm text-center"
                      >
                        Select & Book Package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: About & Amenities */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white">
                  About {selectedVendor.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2 whitespace-pre-line">
                  {selectedVendor.about}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-base text-slate-900 dark:text-white mb-3">
                  Key Amenities & Equipment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedVendor.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-base text-slate-900 dark:text-white mb-3">
                  Location & Contact Information
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-violet-500 shrink-0" />
                    <span>{selectedVendor.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Phone className="w-4 h-4 text-violet-500 shrink-0" />
                    <span>{selectedVendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Mail className="w-4 h-4 text-violet-500 shrink-0" />
                    <span>{selectedVendor.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Availability Calendar */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white">
                  Live Availability Calendar
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Dates marked in green are open for booking. Booked dates are reserved by other couples.
                </p>
              </div>

              {/* Month Calendar Grid */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-base text-slate-900 dark:text-white">November 2026</h4>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-500"></span>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-700"></span>
                      <span>Reserved</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 mb-2">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {currentMonthDays.map(({ day, dateStr, isBooked }) => (
                    <button
                      key={day}
                      disabled={isBooked}
                      onClick={() => openBookingModal(selectedVendor)}
                      className={`p-3 rounded-xl text-center text-xs font-medium transition-all ${
                        isBooked
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed line-through'
                          : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 cursor-pointer border border-emerald-200 dark:border-emerald-800/60'
                      }`}
                      title={isBooked ? `November ${day}: Reserved` : `November ${day}: Available to Book`}
                    >
                      <span className="block font-bold">{day}</span>
                      <span className="text-[10px] block opacity-75">{isBooked ? 'Booked' : 'Open'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white">
                    Client Ratings & Reviews
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Verified feedback from couples who celebrated with {selectedVendor.name}.
                  </p>
                </div>
                <button
                  onClick={() => openReviewModal(selectedVendor)}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Write a Review
                </button>
              </div>

              {/* Reviews Summary Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-8 shadow-xs">
                <div className="text-center sm:border-r border-slate-200 dark:border-slate-800 sm:pr-8">
                  <div className="text-4xl font-bold font-display text-slate-900 dark:text-white tabular-nums">
                    {selectedVendor.rating}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-amber-400 my-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">Based on {selectedVendor.reviews.length} reviews</span>
                </div>

                <div className="flex-1 space-y-1.5 w-full text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500">5 Star</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }} />
                    </div>
                    <span className="w-8 text-right font-medium">92%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500">4 Star</span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '8%' }} />
                    </div>
                    <span className="w-8 text-right font-medium">8%</span>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {selectedVendor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold text-sm text-slate-900 dark:text-white">{rev.author}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {rev.authorLocation && `${rev.authorLocation} · `}{rev.eventType} · {rev.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      "{rev.comment}"
                    </p>

                    {rev.vendorReply && (
                      <div className="mt-3 p-3 rounded-xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-xs">
                        <span className="font-semibold text-violet-800 dark:text-violet-300 block mb-0.5">
                          Response from {selectedVendor.name}:
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 italic">{rev.vendorReply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 4 cols: Sticky Booking Module */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
            
            <div>
              <span className="text-xs text-slate-400">Starting Price</span>
              <div className="text-3xl font-display font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                ${selectedVendor.startingPrice.toLocaleString()}
                <span className="text-xs font-normal text-slate-400"> / {selectedVendor.priceUnit}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-violet-500" />
                  Response Time:
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedVendor.responseTime}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Booking Guarantee:
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">100% Protected</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-violet-500" />
                  Deposit to Lock:
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">25% Advance</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => openBookingModal(selectedVendor)}
                className="w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md text-center"
              >
                Book Appointment / Reserve Date
              </button>

              <button
                onClick={() => {
                  setActiveTab('packages');
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs transition-colors cursor-pointer text-center"
              >
                Compare Packages
              </button>
            </div>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              No cancellation fee within 48 hours of booking. Direct communication via phone and email.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

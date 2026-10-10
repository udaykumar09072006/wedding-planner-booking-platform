import React, { useState } from 'react';
import { 
  Store, 
  DollarSign, 
  Calendar, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Edit3, 
  Save, 
  MessageSquare,
  Users,
  ShieldCheck,
  Plus,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

export const VendorDashboardPage: React.FC = () => {
  const { 
    vendors, 
    bookings, 
    updateBookingStatus, 
    updateVendorProfile,
    showToast,
    loginAs,
    navigateTo 
  } = useApp();

  // Pick first vendor as the active managed business (or match by currentUser.vendorId)
  const currentVendor = vendors[0]; // The Grand Lotus Palace & Resort

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'profile' | 'reviews' | 'calendar'>('overview');

  // Business profile form state
  const [name, setName] = useState(currentVendor.name);
  const [tagline, setTagline] = useState(currentVendor.tagline);
  const [startingPrice, setStartingPrice] = useState(currentVendor.startingPrice);
  const [priceUnit, setPriceUnit] = useState(currentVendor.priceUnit);
  const [responseTime, setResponseTime] = useState(currentVendor.responseTime);
  const [about, setAbout] = useState(currentVendor.about);

  // Review reply state
  const [replyText, setReplyText] = useState<{ [reviewId: string]: string }>({});

  const vendorBookings = bookings.filter(b => b.vendorId === currentVendor.id);
  const confirmedBookings = vendorBookings.filter(b => b.status === 'confirmed');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateVendorProfile({
      id: currentVendor.id,
      name,
      tagline,
      startingPrice: Number(startingPrice),
      priceUnit,
      responseTime,
      about
    });
  };

  const handleSendReply = (reviewId: string) => {
    const text = replyText[reviewId];
    if (!text?.trim()) return;
    
    // Update review reply in vendor
    const updatedReviews = currentVendor.reviews.map(r => 
      r.id === reviewId ? { ...r, vendorReply: text } : r
    );
    updateVendorProfile({
      id: currentVendor.id,
      reviews: updatedReviews
    });
    setReplyText(prev => ({ ...prev, [reviewId]: '' }));
    showToast('Your response was posted to the client review!', 'success');
  };

  // Toggle calendar date block
  const toggleDateBlock = (dateStr: string) => {
    const isBooked = currentVendor.bookedDates.includes(dateStr);
    const newDates = isBooked
      ? currentVendor.bookedDates.filter(d => d !== dateStr)
      : [...currentVendor.bookedDates, dateStr];
    
    updateVendorProfile({
      id: currentVendor.id,
      bookedDates: newDates
    });
    showToast(isBooked ? `Unblocked ${dateStr}` : `Date marked unavailable: ${dateStr}`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              Vendor Management Portal
            </span>
            <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Partner
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold">
            {currentVendor.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {currentVendor.subCategory} · {currentVendor.city} · Member since 2021
          </p>
        </div>

        {/* Demo Switch to Couple Mode */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              loginAs('couple');
              navigateTo('user-dashboard');
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer border border-slate-700 flex items-center gap-1.5"
          >
            <span>Switch to Couple View</span>
          </button>
          <button
            onClick={() => navigateTo('detail', currentVendor.id)}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm"
          >
            Preview Live Profile
          </button>
        </div>
      </div>

      {/* Analytics KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">Total Inquiries</span>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 tabular-nums">
            {vendorBookings.length + 12}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">+18% this month</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">Confirmed Bookings</span>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 tabular-nums">
            {confirmedBookings.length}
          </div>
          <span className="text-[11px] text-violet-600 font-medium">Dates reserved</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">Contracted Revenue</span>
          <div className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
            ${totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Direct booking value</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">Average Rating</span>
          <div className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-1 flex items-center gap-1.5 tabular-nums">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            {currentVendor.rating}
          </div>
          <span className="text-[11px] text-slate-400">Based on {currentVendor.reviews.length} reviews</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 ${
            activeTab === 'overview'
              ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Incoming Bookings ({vendorBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 ${
            activeTab === 'profile'
              ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Edit Business Listing
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 ${
            activeTab === 'calendar'
              ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Availability Calendar
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 ${
            activeTab === 'reviews'
              ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Client Reviews ({currentVendor.reviews.length})
        </button>
      </div>

      {/* Tab 1: Bookings Management */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">
              Recent Couple Inquiries & Reservations
            </h3>
            <span className="text-xs text-slate-400">Manage acceptance and status</span>
          </div>

          {vendorBookings.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500">
              No inquiries yet for this listing.
            </div>
          ) : (
            <div className="space-y-3">
              {vendorBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded ${
                        b.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : b.status === 'pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {b.status}
                      </span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{b.clientName}</span>
                      <span className="text-xs text-slate-400">({b.clientPhone})</span>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                      <p>
                        Event Date: <strong className="text-violet-600 dark:text-violet-400">{b.eventDate}</strong> · Package: <strong>{b.packageName}</strong>
                      </p>
                      {b.customRequests && (
                        <p className="text-slate-500 italic mt-1 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                          Notes: "{b.customRequests}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-left md:text-right text-xs">
                      <span className="text-slate-400 block">Total Package</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">${b.totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.status !== 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'confirmed')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium cursor-pointer"
                        >
                          Accept
                        </button>
                      )}
                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'completed')}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-medium cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'cancelled')}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-600 dark:text-slate-300 text-xs font-medium cursor-pointer"
                        >
                          Decline
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Edit Business Listing */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white">Business Profile Settings</h3>
              <p className="text-xs text-slate-500">Update your public marketplace details.</p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Average Response Time
              </label>
              <input
                type="text"
                value={responseTime}
                onChange={(e) => setResponseTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Short Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Starting Price ($)
              </label>
              <input
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Price Unit
              </label>
              <input
                type="text"
                value={priceUnit}
                onChange={(e) => setPriceUnit(e.target.value)}
                placeholder="per day, per event, per plate"
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              About Description
            </label>
            <textarea
              rows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </form>
      )}

      {/* Tab 3: Calendar Availability Manager */}
      {activeTab === 'calendar' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">
              Manage November 2026 Availability
            </h3>
            <p className="text-xs text-slate-500">
              Click any date box to toggle availability on or off. Green indicates available for new couple inquiries.
            </p>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
              const isBooked = currentVendor.bookedDates.includes(dateStr);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDateBlock(dateStr)}
                  className={`p-3 rounded-xl text-center text-xs font-medium transition-all cursor-pointer ${
                    isBooked
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                  }`}
                >
                  <span className="block font-bold">{day}</span>
                  <span className="text-[10px] block">{isBooked ? 'Unavailable' : 'Available'}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Reviews & Replies */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">
              Client Feedback & Official Responses
            </h3>
            <span className="text-xs text-slate-400">Total {currentVendor.reviews.length} reviews</span>
          </div>

          <div className="space-y-4">
            {currentVendor.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-semibold text-sm text-slate-900 dark:text-white">{rev.author}</h5>
                    <p className="text-[11px] text-slate-400">{rev.eventType} · {rev.date}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "{rev.comment}"
                </p>

                {rev.vendorReply ? (
                  <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30 text-xs border border-violet-100 dark:border-violet-900/40">
                    <span className="font-semibold text-violet-800 dark:text-violet-300 block mb-0.5">Your Published Reply:</span>
                    <p className="text-slate-600 dark:text-slate-300">{rev.vendorReply}</p>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Write an official response to this review..."
                      value={replyText[rev.id] || ''}
                      onChange={(e) => setReplyText(prev => ({ ...prev, [rev.id]: e.target.value }))}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendReply(rev.id)}
                      className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 cursor-pointer flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reply</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

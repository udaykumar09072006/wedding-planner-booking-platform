import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Receipt, 
  Heart, 
  Store, 
  Plus, 
  DollarSign, 
  ListTodo, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

export const UserDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    bookings, 
    updateBookingStatus, 
    navigateTo, 
    loginAs,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'checklist' | 'budget'>('bookings');
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);

  // Wedding checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Finalize wedding venue and lock date', done: true, category: 'Venue' },
    { id: 2, task: 'Book candid photographer and cinematic videographer', done: true, category: 'Photo' },
    { id: 3, task: 'Schedule catering menu tasting session', done: false, category: 'Catering' },
    { id: 4, task: 'Select bridal makeup artist & schedule trial look', done: false, category: 'Beauty' },
    { id: 5, task: 'Design floral mandap and stage backdrop concept', done: false, category: 'Decor' },
    { id: 6, task: 'Curate wedding party playlist & "Do-Not-Play" list', done: false, category: 'Music' }
  ]);

  const toggleTask = (id: number) => {
    setChecklist(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    showToast('Checklist updated', 'info');
  };

  const coupleName = currentUser?.name || 'Chloe & Liam';
  const weddingDateStr = currentUser?.weddingDate || '2026-11-14';

  // Calculate days left
  const weddingDate = new Date(weddingDateStr);
  const today = new Date('2026-10-10');
  const daysRemaining = Math.max(0, Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalSpend = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalDeposited = confirmedBookings.reduce((sum, b) => sum + b.advanceDeposit, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner & Wedding Countdown */}
      <div className="rounded-3xl bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
              Couple Planning Hub
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold mt-1">
              Welcome, {coupleName}
            </h1>
            <p className="text-xs sm:text-sm text-violet-200 mt-1">
              Target Wedding Date: <span className="font-semibold">{weddingDateStr}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
            <div className="text-center">
              <span className="text-3xl font-bold font-display block tabular-nums text-white">
                {daysRemaining}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-violet-200">Days to "I Do"</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <span className="text-3xl font-bold font-display block tabular-nums text-white">
                {confirmedBookings.length}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-violet-200">Vendors Locked</span>
            </div>
          </div>
        </div>

        {/* Demo Switch to Vendor Mode */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
          <span className="text-violet-200">Want to test the Vendor view for this internship project?</span>
          <button
            onClick={() => {
              loginAs('vendor');
              navigateTo('vendor-dashboard');
            }}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Switch to Vendor Dashboard</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Booked Vendors ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'checklist'
              ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ListTodo className="w-4 h-4" />
          <span>Wedding Checklist</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'budget'
              ? 'border-violet-600 text-violet-600 dark:text-violet-400 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Budget Tracker</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white">No Active Bookings Yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore vendor packages and book your date to track your wedding team here.
              </p>
              <button
                onClick={() => navigateTo('listing')}
                className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg text-xs font-semibold"
              >
                Find Vendors
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                      <img
                        src={booking.vendorCoverImage}
                        alt={booking.vendorName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : booking.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {booking.status}
                        </span>
                        <span className="text-xs text-slate-400">Ref #{booking.id}</span>
                      </div>

                      <h3 
                        onClick={() => navigateTo('detail', booking.vendorId)}
                        className="font-semibold text-base text-slate-900 dark:text-white hover:text-violet-600 cursor-pointer"
                      >
                        {booking.vendorName}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1 font-medium text-slate-800 dark:text-slate-200">
                          <Calendar className="w-3.5 h-3.5 text-violet-600" />
                          {booking.eventDate}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{booking.packageName}</span>
                        {booking.guestCount && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{booking.guestCount} Guests</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Financial status & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-slate-400 block">Total Package</span>
                      <span className="font-bold text-slate-900 dark:text-white text-base tabular-nums">
                        ${booking.totalPrice.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-medium">
                        Paid Deposit: ${booking.advanceDeposit.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedReceipt(booking)}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                        title="View Official Receipt"
                      >
                        <Receipt className="w-4 h-4" />
                        <span className="hidden sm:inline">Receipt</span>
                      </button>

                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium cursor-pointer transition-colors"
                        >
                          Cancel
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

      {/* Tab 2: Wedding Checklist */}
      {activeTab === 'checklist' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Milestone Wedding Checklist
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Keep every vendor contract and timeline item organized.
              </p>
            </div>
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 dark:bg-violet-950/60 px-3 py-1 rounded-full">
              {checklist.filter(c => c.done).length} of {checklist.length} Completed
            </span>
          </div>

          <div className="space-y-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleTask(item.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  item.done
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 opacity-80'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-violet-600 accent-violet-600 cursor-pointer"
                  />
                  <span className={`text-xs sm:text-sm font-medium ${item.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {item.task}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Budget Tracker */}
      {activeTab === 'budget' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Committed Total</span>
            <div className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              ${totalSpend.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Across {confirmedBookings.length} vendor agreements</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deposit Paid (25%)</span>
            <div className="text-3xl font-display font-bold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
              ${totalDeposited.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Cleared via secure simulated gateway</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Remaining Balance</span>
            <div className="text-3xl font-display font-bold text-violet-600 dark:text-violet-400 mt-1 tabular-nums">
              ${(totalSpend - totalDeposited).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Payable directly on event day</p>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Booking Confirmation
              </span>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation ID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vendor:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedReceipt.vendorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Package:</span>
                <span>{selectedReceipt.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Event Date:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedReceipt.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span>{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                <span>Advance Paid:</span>
                <span className="text-emerald-600">${selectedReceipt.advanceDeposit.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2 bg-violet-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

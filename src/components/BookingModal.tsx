import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  CreditCard, 
  CheckCircle, 
  Lock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BookingModal: React.FC = () => {
  const { 
    isBookingOpen, 
    bookingTarget, 
    closeBookingModal, 
    createBooking, 
    currentUser 
  } = useApp();

  if (!isBookingOpen || !bookingTarget) return null;

  const { vendor, preselectedPackageId } = bookingTarget;

  // Form states
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Package & Date, 2: Couple Info, 3: Payment & Summary
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    preselectedPackageId || vendor.packages[0]?.id || ''
  );
  const [eventDate, setEventDate] = useState<string>('2026-11-28');
  const [eventType, setEventType] = useState<string>('Wedding Ceremony & Reception');
  const [guestCount, setGuestCount] = useState<number>(200);
  const [clientName, setClientName] = useState<string>(currentUser?.name || '');
  const [clientEmail, setClientEmail] = useState<string>(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState<string>(currentUser?.phone || '');
  const [customRequests, setCustomRequests] = useState<string>('');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'consultation'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const activePackage = vendor.packages.find(p => p.id === selectedPackageId) || vendor.packages[0];
  const basePrice = activePackage?.price || vendor.startingPrice;
  const platformFee = Math.round(basePrice * 0.025); // 2.5% platform fee
  const totalPrice = basePrice + platformFee;
  const advanceDeposit = Math.round(totalPrice * 0.25); // 25% to lock date

  const isDateBooked = vendor.bookedDates.includes(eventDate);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (isDateBooked) return;
      setStep(2);
    } else if (step === 2) {
      if (!clientName || !clientEmail || !clientPhone) return;
      setStep(3);
    }
  };

  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    // Simulate real gateway processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        createBooking({
          vendorId: vendor.id,
          vendorName: vendor.name,
          vendorCategory: vendor.category,
          vendorCoverImage: vendor.coverImage,
          clientName,
          clientEmail,
          clientPhone,
          eventDate,
          eventType,
          packageId: activePackage.id,
          packageName: activePackage.name,
          guestCount,
          customRequests,
          totalPrice,
          advanceDeposit,
          paymentMethod: paymentMethod === 'card' 
            ? 'Credit Card (Simulated)' 
            : paymentMethod === 'upi' 
            ? 'Instant UPI / Transfer' 
            : 'Pay at Consultation'
        });
      }, 900);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              Wedding Reservation
            </span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
              Book with {vendor.name}
            </h2>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-medium">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[11px] font-bold">1</span>
            <span>Package & Date</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">· · ·</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[11px] font-bold">2</span>
            <span>Couple Details</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">· · ·</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[11px] font-bold">3</span>
            <span>Summary & Pay</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {paymentSuccess ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Payment & Booking Verified!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
                Your date has been officially reserved with {vendor.name}. A confirmation receipt and calendar invitation are generating...
              </p>
            </div>
          ) : step === 1 ? (
            <div className="space-y-6">
              {/* Packages selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Select Pricing Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vendor.packages.map((pkg) => {
                    const isSelected = pkg.id === selectedPackageId;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-violet-600 bg-violet-50/50 dark:bg-violet-950/30 ring-1 ring-violet-600'
                            : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{pkg.name}</h4>
                          {pkg.popular && (
                            <span className="text-[10px] font-semibold text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/60 px-1.5 py-0.5 rounded">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {pkg.description}
                        </p>
                        <div className="mt-3 text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                          ${pkg.price.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-slate-500">/ {pkg.priceUnit || vendor.priceUnit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Event Date & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Desired Event Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      min="2026-10-10"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                  {isDateBooked ? (
                    <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      Date unavailable. Please choose another date.
                    </p>
                  ) : (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3" />
                      Date is available for reservation!
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Estimated Guests
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      min="10"
                      max="2000"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Event Occasion / Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option>Wedding Ceremony & Reception</option>
                  <option>Sangeet & Mehendi Celebration</option>
                  <option>Cocktail & Ring Ceremony</option>
                  <option>Post-Wedding Brunch</option>
                </select>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Couple / Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Chloe Bennett & Liam Smith"
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@wedding.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Special Instructions or Aesthetic Preferences
                </label>
                <textarea
                  rows={3}
                  value={customRequests}
                  onChange={(e) => setCustomRequests(e.target.value)}
                  placeholder="Mention your theme colors, preferred timing, dietary requirements, or specific requests..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cost Breakdown */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm space-y-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>{activePackage.name} Package</span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>VendorHub Protection & Concierge (2.5%)</span>
                  <span className="tabular-nums">${platformFee.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>Total Event Package</span>
                  <span className="tabular-nums">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-violet-200 dark:border-violet-900/60 flex justify-between text-violet-700 dark:text-violet-400 font-semibold">
                  <span>Advance Deposit to Lock Date (25%)</span>
                  <span className="tabular-nums text-base">${advanceDeposit.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Remaining ${(totalPrice - advanceDeposit).toLocaleString()} due on event date directly to vendor.
                </p>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Payment Simulation Method
                </label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-violet-600 bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-violet-600 bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Instant Transfer / UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('consultation')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'consultation'
                        ? 'border-violet-600 bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Pay on Consultation
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        256-bit Encrypted Checkout
                      </span>
                      <span>Demo Mode</span>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-sm font-mono border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-sm font-mono border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 text-sm font-mono border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <p className="font-semibold text-slate-900 dark:text-white">Simulated Instant UPI / Net Banking</p>
                    <p>Virtual VPA handle will be processed instantly: <span className="font-mono text-violet-600">vendorhub@axisbank</span></p>
                  </div>
                )}

                {paymentMethod === 'consultation' && (
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">Reserve Now, Pay at In-Person Meeting</p>
                    <p>Your date will be held as Pending for 48 hours while you connect with {vendor.name}.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        {!paymentSuccess && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                disabled={step === 1 && isDateBooked}
                onClick={handleNextStep}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmAndPay}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'consultation'
                        ? 'Confirm Booking Reservation'
                        : `Pay Deposit $${advanceDeposit.toLocaleString()}`}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

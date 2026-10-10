import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Vendor, 
  Booking, 
  User, 
  PageRoute, 
  FilterOptions, 
  VendorCategory,
  VendorReview 
} from '../types';
import { INITIAL_VENDORS, INITIAL_BOOKINGS } from '../data/mockVendors';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Navigation
  currentPage: PageRoute;
  selectedVendorId: string | null;
  navigateTo: (page: PageRoute, vendorId?: string) => void;
  
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Authentication
  currentUser: User | null;
  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginAs: (role: 'couple' | 'vendor', user?: Partial<User>) => void;
  logout: () => void;
  
  // Vendors data
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  addVendorReview: (vendorId: string, review: Omit<VendorReview, 'id' | 'date'>) => void;
  updateVendorProfile: (updated: Partial<Vendor> & { id: string }) => void;
  
  // Filters
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  setCategoryFilter: (category: VendorCategory | 'all') => void;
  
  // Wishlist & Compare
  wishlist: string[];
  toggleWishlist: (vendorId: string) => void;
  isWishlisted: (vendorId: string) => boolean;
  compareList: string[];
  toggleCompare: (vendorId: string) => void;
  isInCompare: (vendorId: string) => boolean;
  clearCompare: () => void;
  
  // Booking modal & list
  bookings: Booking[];
  isBookingOpen: boolean;
  bookingTarget: { vendor: Vendor; preselectedPackageId?: string } | null;
  openBookingModal: (vendor: Vendor, preselectedPackageId?: string) => void;
  closeBookingModal: () => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  
  // Review modal
  isReviewOpen: boolean;
  reviewTarget: Vendor | null;
  openReviewModal: (vendor: Vendor) => void;
  closeReviewModal: () => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const DEFAULT_FILTERS: FilterOptions = {
  category: 'all',
  subCategory: '',
  search: '',
  city: 'All Cities',
  minPrice: 0,
  maxPrice: 20000,
  minRating: 0,
  availabilityDate: '',
  sortBy: 'featured'
};

const DEFAULT_COUPLE: User = {
  id: 'usr-couple-1',
  name: 'Chloe & Liam',
  email: 'chloe.bennett@example.com',
  phone: '+1 (415) 321-9988',
  role: 'couple',
  partnerName: 'Liam Smith',
  weddingDate: '2026-11-14'
};

const DEFAULT_VENDOR_USER: User = {
  id: 'usr-vendor-1',
  name: 'Elena Rostova',
  email: 'events@grandlotusresort.com',
  phone: '+1 (415) 892-4410',
  role: 'vendor',
  vendorId: 'v-101'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>('v-101');
  
  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('vendorhub_theme') === 'dark';
  });

  // User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vendorhub_user');
    return saved ? JSON.parse(saved) : DEFAULT_COUPLE;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Vendors state
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('vendorhub_vendors');
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('vendorhub_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Wishlist & Compare
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vendorhub_wishlist');
    return saved ? JSON.parse(saved) : ['v-101', 'v-102'];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('vendorhub_compare');
    return saved ? JSON.parse(saved) : [];
  });

  // Filters
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTarget, setBookingTarget] = useState<{ vendor: Vendor; preselectedPackageId?: string } | null>(null);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<Vendor | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('vendorhub_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vendorhub_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vendorhub_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vendorhub_vendors', JSON.stringify(vendors));
  }, [vendors]);

  useEffect(() => {
    localStorage.setItem('vendorhub_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('vendorhub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('vendorhub_compare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageRoute, vendorId?: string) => {
    if (vendorId) {
      setSelectedVendorId(vendorId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCategoryFilter = (category: VendorCategory | 'all') => {
    setFilters(prev => ({
      ...prev,
      category,
      subCategory: ''
    }));
    navigateTo('listing');
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const openAuthModal = () => setIsAuthOpen(true);
  const closeAuthModal = () => setIsAuthOpen(false);

  const loginAs = (role: 'couple' | 'vendor', userOverrides?: Partial<User>) => {
    const base = role === 'couple' ? DEFAULT_COUPLE : DEFAULT_VENDOR_USER;
    const user = { ...base, ...userOverrides };
    setCurrentUser(user);
    setIsAuthOpen(false);
    showToast(`Logged in as ${user.name} (${role === 'vendor' ? 'Vendor Manager' : 'Couple'})`, 'info');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const toggleWishlist = (vendorId: string) => {
    const exists = wishlist.includes(vendorId);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== vendorId));
      showToast('Removed from saved wishlist', 'info');
    } else {
      setWishlist(prev => [...prev, vendorId]);
      showToast('Saved to your wishlist!', 'success');
    }
  };

  const isWishlisted = (vendorId: string) => wishlist.includes(vendorId);

  const toggleCompare = (vendorId: string) => {
    if (compareList.includes(vendorId)) {
      setCompareList(prev => prev.filter(id => id !== vendorId));
      showToast('Removed from comparison list', 'info');
    } else {
      if (compareList.length >= 4) {
        showToast('You can compare up to 4 vendors at a time', 'error');
        return;
      }
      setCompareList(prev => [...prev, vendorId]);
      showToast('Added to comparison. Tap "Compare" to view side-by-side.', 'success');
    }
  };

  const isInCompare = (vendorId: string) => compareList.includes(vendorId);
  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison cleared', 'info');
  };

  const openBookingModal = (vendor: Vendor, preselectedPackageId?: string) => {
    setBookingTarget({ vendor, preselectedPackageId });
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingTarget(null);
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setBookings(prev => [newBooking, ...prev]);

    // Also mark date as booked in vendor's calendar
    setVendors(prev => prev.map(v => {
      if (v.id === newBooking.vendorId) {
        return {
          ...v,
          bookedDates: [...v.bookedDates, newBooking.eventDate]
        };
      }
      return v;
    }));

    closeBookingModal();
    showToast(`Booking Confirmed! Reference ID: #${newBooking.id}`, 'success');
    navigateTo('user-dashboard');
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    showToast(`Booking status updated to ${status}`, 'info');
  };

  const openReviewModal = (vendor: Vendor) => {
    setReviewTarget(vendor);
    setIsReviewOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewOpen(false);
    setReviewTarget(null);
  };

  const addVendorReview = (vendorId: string, reviewInput: Omit<VendorReview, 'id' | 'date'>) => {
    const newReview: VendorReview = {
      ...reviewInput,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0
    };

    setVendors(prev => prev.map(vendor => {
      if (vendor.id === vendorId) {
        const updatedReviews = [newReview, ...vendor.reviews];
        const newCount = updatedReviews.length;
        const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAvg = Number((totalRating / newCount).toFixed(2));
        return {
          ...vendor,
          reviews: updatedReviews,
          reviewCount: newCount,
          rating: newAvg
        };
      }
      return vendor;
    }));

    closeReviewModal();
    showToast('Your review was published successfully!', 'success');
  };

  const updateVendorProfile = (updated: Partial<Vendor> & { id: string }) => {
    setVendors(prev => prev.map(v => v.id === updated.id ? { ...v, ...updated } : v));
    showToast('Vendor profile updated successfully', 'success');
  };

  const selectedVendor = vendors.find(v => v.id === selectedVendorId) || vendors[0];

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedVendorId,
        navigateTo,
        darkMode,
        toggleDarkMode,
        currentUser,
        isAuthOpen,
        openAuthModal,
        closeAuthModal,
        loginAs,
        logout,
        vendors,
        selectedVendor,
        addVendorReview,
        updateVendorProfile,
        filters,
        setFilters,
        resetFilters,
        setCategoryFilter,
        wishlist,
        toggleWishlist,
        isWishlisted,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        bookings,
        isBookingOpen,
        bookingTarget,
        openBookingModal,
        closeBookingModal,
        createBooking,
        updateBookingStatus,
        isReviewOpen,
        reviewTarget,
        openReviewModal,
        closeReviewModal,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

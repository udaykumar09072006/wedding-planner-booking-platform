import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ListingPage } from './pages/ListingPage';
import { VendorDetailPage } from './pages/VendorDetailPage';
import { ComparePage } from './pages/ComparePage';
import { WishlistPage } from './pages/WishlistPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { VendorDashboardPage } from './pages/VendorDashboardPage';
import { BookingModal } from './components/BookingModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main className="flex-1">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'listing' && <ListingPage />}
      {currentPage === 'detail' && <VendorDetailPage />}
      {currentPage === 'compare' && <ComparePage />}
      {currentPage === 'wishlist' && <WishlistPage />}
      {currentPage === 'user-dashboard' && <UserDashboardPage />}
      {currentPage === 'vendor-dashboard' && <VendorDashboardPage />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Modals & Notifications */}
        <BookingModal />
        <WriteReviewModal />
        <AuthModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}

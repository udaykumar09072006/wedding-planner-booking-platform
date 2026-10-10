export type VendorCategory = 
  | 'venues' 
  | 'photographers' 
  | 'caterers' 
  | 'florists' 
  | 'makeup' 
  | 'djs' 
  | 'planners';

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  priceUnit?: string;
  description: string;
  inclusions: string[];
  popular?: boolean;
}

export interface VendorReview {
  id: string;
  author: string;
  authorLocation?: string;
  avatar?: string;
  date: string;
  rating: number;
  comment: string;
  eventType: string;
  helpfulCount: number;
  vendorReply?: string;
}

export interface Vendor {
  id: string;
  name: string;
  tagline: string;
  category: VendorCategory;
  subCategory: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  priceUnit: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  responseTime: string;
  experienceYears: number;
  images: string[];
  coverImage: string;
  verified: boolean;
  featured?: boolean;
  about: string;
  amenities: string[];
  packages: PricingPackage[];
  reviews: VendorReview[];
  bookedDates: string[]; // YYYY-MM-DD
}

export interface Booking {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCategory: VendorCategory;
  vendorCoverImage: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  eventType: string;
  packageId: string;
  packageName: string;
  guestCount?: number;
  customRequests?: string;
  totalPrice: number;
  advanceDeposit: number;
  paymentMethod: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'couple' | 'vendor';
  partnerName?: string;
  weddingDate?: string;
  vendorId?: string; // If role is vendor, references their vendor listing
}

export type PageRoute = 
  | 'home' 
  | 'listing' 
  | 'detail' 
  | 'compare' 
  | 'user-dashboard' 
  | 'vendor-dashboard' 
  | 'wishlist';

export interface FilterOptions {
  category: VendorCategory | 'all';
  subCategory: string;
  search: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  availabilityDate: string;
  sortBy: 'featured' | 'rating-desc' | 'price-asc' | 'price-desc' | 'reviews-desc';
}

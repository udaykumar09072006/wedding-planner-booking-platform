import { Vendor, VendorCategory } from '../types';

export const CATEGORY_INFO: Record<VendorCategory, {
  name: string;
  iconName: string;
  description: string;
  subCategories: string[];
  count: number;
}> = {
  venues: {
    name: 'Venues',
    iconName: 'Building2',
    description: 'Banquet halls, luxury resorts, heritage farmhouses & scenic beaches',
    subCategories: ['Banquet Halls', 'Resorts', 'Farmhouses', 'Beach Venues'],
    count: 84
  },
  photographers: {
    name: 'Photographers',
    iconName: 'Camera',
    description: 'Candid storytellers, pre-wedding specialists & cinematic films',
    subCategories: ['Wedding Photography', 'Pre-wedding Shoots', 'Candid Photography', 'Video Coverage'],
    count: 112
  },
  caterers: {
    name: 'Caterers',
    iconName: 'UtensilsCrossed',
    description: 'Authentic royal banquets, continental buffets & bespoke gourmet spreads',
    subCategories: ['Indian Cuisine', 'Continental', 'Biryani Specialists', 'Dessert Catering'],
    count: 67
  },
  florists: {
    name: 'Florists & Decor',
    iconName: 'Flower2',
    description: 'Fairytale mandaps, breathtaking entrance arches & bridal florals',
    subCategories: ['Wedding Decor', 'Bridal Bouquets', 'Floral Arrangements', 'Mandap Decor'],
    count: 53
  },
  makeup: {
    name: 'Makeup & Styling',
    iconName: 'Sparkles',
    description: 'HD bridal transformations, intricate henna mehndi & luxury draping',
    subCategories: ['Bridal Makeup', 'Mehndi Artists', 'Hairstyling', 'Draping'],
    count: 78
  },
  djs: {
    name: 'DJs & Entertainment',
    iconName: 'Music',
    description: 'High-energy sound stages, Sangeet choreographers & live artists',
    subCategories: ['Bollywood & EDM DJs', 'Live Acoustic Bands', 'Sound & Stage Lighting', 'Sangeet Choreography'],
    count: 42
  },
  planners: {
    name: 'Wedding Planners',
    iconName: 'CalendarCheck',
    description: 'End-to-end wedding curators, day-of coordinators & destination experts',
    subCategories: ['Full Wedding Planning', 'Day-of Coordination', 'Destination Wedding Curators', 'Budget & Vendor Management'],
    count: 36
  }
};

export const CITIES = [
  'All Cities',
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Miami, FL',
  'Austin, TX',
  'Seattle, WA'
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'v-101',
    name: 'The Grand Lotus Palace & Resort',
    tagline: 'Imperial lakeside banquet gardens & grand ballroom for fairytale weddings',
    category: 'venues',
    subCategory: 'Resorts',
    rating: 4.9,
    reviewCount: 148,
    startingPrice: 4500,
    priceUnit: 'per day',
    city: 'San Francisco, CA',
    address: '8400 Lakeside Boulevard, Napa Valley Gateway',
    phone: '+1 (415) 892-4410',
    email: 'events@grandlotusresort.com',
    responseTime: '< 1 hour',
    experienceYears: 14,
    coverImage: '/src/assets/images/venue_grand_resort_1791613836591.jpg',
    images: [
      '/src/assets/images/venue_grand_resort_1791613836591.jpg',
      '/src/assets/images/hero_wedding_couple_1791613820623.jpg',
      '/src/assets/images/decor_mandap_floral_1791613861460.jpg'
    ],
    verified: true,
    featured: true,
    about: 'Nestled amidst whispering vineyards and an illuminated private lagoon, The Grand Lotus Palace combines timeless architectural grandeur with ultra-modern hospitality. Featuring 2 massive pillarless ballrooms with 24-foot ceilings, an expansive 3-acre starlit amphitheater lawn, and luxury bridal suites.',
    amenities: [
      'Capacity: 150 - 1,200 Guests',
      'Dedicated Bridal & Groom Dressing Suites',
      'Valet Parking for 350+ Cars',
      'In-House Sound & Stage Rigging',
      'Outside Catering Allowed with Kitchen Access',
      'Full Generator Backup'
    ],
    packages: [
      {
        id: 'pkg-1',
        name: 'Silver Grand Lawn',
        price: 4500,
        priceUnit: 'per day',
        description: 'Ideal for intimate receptions and sunset sangeet ceremonies.',
        inclusions: [
          '8 hours venue access (Lawns + Patio)',
          'Standard ambient lighting & security team',
          'Bridal preparation suite',
          'Tables and Chiavari chairs for up to 250 guests',
          'Cleaning and post-event turnaround'
        ]
      },
      {
        id: 'pkg-2',
        name: 'Royal Heritage Palace',
        price: 8200,
        priceUnit: 'per day',
        popular: true,
        description: 'Our flagship package with full ballroom, amphitheater, and lawn access.',
        inclusions: [
          'Full 14 hours private venue exclusivity',
          'Access to Crystal Ballroom & Starlight Lawn',
          '2 Luxury dressing suites with champagne welcome',
          'Valet parking team included',
          'Audio-visual trussing & dancefloor',
          'Dedicated on-site venue coordinator'
        ]
      },
      {
        id: 'pkg-3',
        name: 'Weekend Destination Extravaganza',
        price: 15500,
        priceUnit: 'full weekend',
        description: 'Complete 2-day wedding weekend with guest cottage suites included.',
        inclusions: [
          '48 hours complete property buyout',
          'Accommodation for 32 close family members',
          'Haldi, Mehendi, Wedding & Reception spaces',
          'Complimentary pre-wedding shoot access prior to event'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena & Marcus Vance',
        authorLocation: 'San Francisco, CA',
        date: 'October 2026',
        rating: 5,
        eventType: 'Wedding & Reception (450 Guests)',
        comment: 'Words cannot express how magical our wedding was at Grand Lotus. The evening lighting across the palace lawn took our breath away. Our guests from New York and London are still raving about the experience!',
        helpfulCount: 24,
        vendorReply: 'Elena & Marcus, hosting your special night was our absolute honor. Wishing you a lifetime of joy!'
      },
      {
        id: 'rev-2',
        author: 'Priya & Kabir Nair',
        authorLocation: 'San Jose, CA',
        date: 'August 2026',
        rating: 5,
        eventType: 'Sangeet & Wedding (600 Guests)',
        comment: 'The team was flawlessly accommodating with our multiple ceremony transitions from the mandap lawn to the ballroom dinner. The bridal suite was spacious and calming.',
        helpfulCount: 16
      }
    ],
    bookedDates: ['2026-10-18', '2026-10-24', '2026-11-07', '2026-11-14', '2026-12-05']
  },
  {
    id: 'v-102',
    name: 'Aura Lens Studios',
    tagline: 'Emotion-driven candid wedding stories & cinematic 4K documentary films',
    category: 'photographers',
    subCategory: 'Candid Photography',
    rating: 4.95,
    reviewCount: 204,
    startingPrice: 2200,
    priceUnit: 'per event',
    city: 'New York, NY',
    address: '420 Broadway, SoHo Creative Arts District',
    phone: '+1 (212) 555-0189',
    email: 'hello@auralensstudios.com',
    responseTime: '< 30 mins',
    experienceYears: 9,
    coverImage: '/src/assets/images/photo_candid_shoot_1791613847934.jpg',
    images: [
      '/src/assets/images/photo_candid_shoot_1791613847934.jpg',
      '/src/assets/images/hero_wedding_couple_1791613820623.jpg'
    ],
    verified: true,
    featured: true,
    about: 'We believe real wedding photographs should feel alive with tears of happiness, unscripted belly laughs, and quiet stolen glances. Led by internationally published photographer Julian Reyes, Aura Lens delivers soulful, color-graded imagery and magazine-worthy portraiture without awkward posed stiffness.',
    amenities: [
      'Dual Lead Photographers + Cinematic Drone Pilot',
      'Teaser Gallery within 48 Hours',
      'High-Resolution Online Client Gallery with Print Rights',
      'Full Raw Footage + Highlight Teaser + 30-min Feature Film',
      'Pre-Wedding Engagement Session Included'
    ],
    packages: [
      {
        id: 'pkg-201',
        name: 'The Essential Story',
        price: 2200,
        priceUnit: 'per event',
        description: 'Single day comprehensive photo coverage.',
        inclusions: [
          '6 Hours of uninterrupted coverage',
          '1 Senior Candid Photographer + 1 Traditional',
          '350+ Color-corrected edited high-res images',
          'Private online gallery (1 year access)',
          '48-hour social media highlight sneaks'
        ]
      },
      {
        id: 'pkg-202',
        name: 'Signature Cinema & Heritage Album',
        price: 3800,
        priceUnit: 'per event',
        popular: true,
        description: 'Full day coverage with photo, video, and handcrafted flush-mount album.',
        inclusions: [
          '10 Hours full wedding coverage',
          '2 Lead Photographers + 2 Cinematic Videographers',
          'Licensed 4K Drone aerial footage',
          '3-minute Cinematic Wedding Trailer + 25-minute Documentary Film',
          '12x12 Handcrafted Italian leather wedding album (40 pages)',
          '600+ hand-retouched photographs'
        ]
      },
      {
        id: 'pkg-203',
        name: 'The Royal Multi-Day Chronicle',
        price: 5900,
        priceUnit: 'per wedding',
        description: 'Comprehensive 3-day coverage (Mehendi, Sangeet, Ceremony & Reception).',
        inclusions: [
          'Full 3-day coverage by 5-member dream team',
          'Complimentary destination engagement session',
          'Same-day reception edit video teaser for guests',
          '2 Parent gift albums + 1 Luxury master album'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-201',
        author: 'Sophie & Liam Chen',
        authorLocation: 'Manhattan, NY',
        date: 'September 2026',
        rating: 5,
        eventType: 'Autumn Wedding at Central Park Conservatory',
        comment: 'Julian and his team made us feel completely at ease. We were terrified of feeling awkward in front of the lens, but our photos look like a Vogue editorial! And getting 40 sneak peek images 24 hours later was unbelievable.',
        helpfulCount: 31
      }
    ],
    bookedDates: ['2026-10-20', '2026-11-01', '2026-11-15', '2026-11-28']
  },
  {
    id: 'v-103',
    name: 'Petal & Pergola Floral Artistry',
    tagline: 'Romantic floral installations, botanical mandaps, and bespoke wedding styling',
    category: 'florists',
    subCategory: 'Mandap Decor',
    rating: 4.88,
    reviewCount: 92,
    startingPrice: 1800,
    priceUnit: 'per event',
    city: 'Los Angeles, CA',
    address: '710 Beverly Blvd, West Hollywood Design Quarter',
    phone: '+1 (310) 492-7733',
    email: 'design@petalandpergola.com',
    responseTime: '< 2 hours',
    experienceYears: 11,
    coverImage: '/src/assets/images/decor_mandap_floral_1791613861460.jpg',
    images: [
      '/src/assets/images/decor_mandap_floral_1791613861460.jpg',
      '/src/assets/images/venue_grand_resort_1791613836591.jpg'
    ],
    verified: true,
    featured: true,
    about: 'Specializing in lush, romantic floral installations that transform standard spaces into botanical wonders. From cascading wisteria canopies and fragrant jasmine mandaps to modern minimalist tablescapes and organic bridal bouquets, our team creates sensory floral memories.',
    amenities: [
      '3D Visual Concept Mockups before production',
      'Locally & ethically sourced fresh seasonal blooms',
      'Full setup, teardown and floral repurposing service',
      'Custom backdrops, pedestals and luxury candle styling',
      'Bridal party personal flowers delivered in fresh chill boxes'
    ],
    packages: [
      {
        id: 'pkg-301',
        name: 'Intimate Botanical Elegance',
        price: 1800,
        priceUnit: 'per event',
        description: 'Perfect for micro weddings and ceremony focal points.',
        inclusions: [
          'Bridal bouquet + Groom boutonniere',
          '4 Bridesmaid bouquets + 4 Groomsmen boutonnieres',
          'Floral ceremony arch or 2 large altar urns',
          'Sweetheart table centerpiece with taper candles'
        ]
      },
      {
        id: 'pkg-302',
        name: 'The Fairytale Mandap & Ballroom',
        price: 4200,
        priceUnit: 'per event',
        popular: true,
        description: 'Complete stage mandap styling and reception tablescapes.',
        inclusions: [
          '4-pillar fully wrapped floral mandap or circular arch',
          'Aisle runner flower meadows (12 arrangements)',
          'Bridal party personal florals (up to 12 members)',
          '15 Low & high lush dining centerpieces',
          'Ambient hurricane glass candle styling'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-301',
        author: 'Aria & Dev Patel',
        authorLocation: 'Los Angeles, CA',
        date: 'September 2026',
        rating: 5,
        eventType: 'Outdoor Garden Wedding (280 Guests)',
        comment: 'The floral mandap was the showstopper of our entire wedding! Everyone gasped when they saw the arch. The blooms stayed fresh and fragrant despite the warm afternoon sun.',
        helpfulCount: 19
      }
    ],
    bookedDates: ['2026-10-25', '2026-11-08', '2026-12-12']
  },
  {
    id: 'v-104',
    name: 'Saffron & Sage Royal Banquets',
    tagline: 'Artisanal culinary journeys, authentic regional delicacies & interactive live food counters',
    category: 'caterers',
    subCategory: 'Indian Cuisine',
    rating: 4.92,
    reviewCount: 165,
    startingPrice: 42,
    priceUnit: 'per plate',
    city: 'Chicago, IL',
    address: '1120 Michigan Avenue, Culinary Arts Quarter',
    phone: '+1 (312) 781-9900',
    email: 'tastings@saffronsagecatering.com',
    responseTime: '< 1 hour',
    experienceYears: 16,
    coverImage: '/src/assets/images/hero_wedding_couple_1791613820623.jpg',
    images: [
      '/src/assets/images/hero_wedding_couple_1791613820623.jpg',
      '/src/assets/images/venue_grand_resort_1791613836591.jpg'
    ],
    verified: true,
    featured: true,
    about: 'Food is the soul of any wedding. Saffron & Sage brings Michelin-trained executive chefs and master traditional cooks together. We specialize in live flaming chaat counters, dum pukht biryanis cooked on slow charcoal, tandoor flatbreads made on-site, and artisanal dessert bars.',
    amenities: [
      'Complimentary Tasting Session for Bride & Groom',
      'Live Chaat & Tawa Counter Setup',
      'Uniformed Silver-Service Waitstaff & Captains',
      'Custom Menus: Jain, Vegan, Halal, Gluten-Free options',
      'Luxury Bone China & Crystal Glassware Rental Available'
    ],
    packages: [
      {
        id: 'pkg-401',
        name: 'The Classic Celebration Buffet',
        price: 42,
        priceUnit: 'per plate',
        description: 'Comprehensive 4-course meal for memorable celebrations.',
        inclusions: [
          '3 Vegetarian + 2 Non-Vegetarian Starters passed butler-style',
          'Live Chaat Bazaar (Pani Puri, Papdi Chaat, Dahi Vada)',
          '5 Main Course curries, saffron pulao & freshly baked breads',
          '3 Traditional Hot & Cold Desserts with Ice Cream bar'
        ]
      },
      {
        id: 'pkg-402',
        name: 'The Royal Nawabi Feast',
        price: 68,
        priceUnit: 'per plate',
        popular: true,
        description: 'Lavish multi-course culinary experience with interactive live counters.',
        inclusions: [
          '5 Starters (including Galouti kebabs & Paneer tikka)',
          'Live Tandoori & Shawarma Stations',
          'Signature Awadhi Dum Biryani & Dal Bukhara simmered for 24h',
          'Artisanal Kulfi & Jalebi Rabri counter with gold leaf garnish',
          'Full Mocktail & Chai bar throughout the event'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-401',
        author: 'Kavita & Rohan Singhania',
        authorLocation: 'Chicago, IL',
        date: 'October 2026',
        rating: 5,
        eventType: 'Reception Dinner (380 Guests)',
        comment: 'Our guests still text us asking about the Biryani and the live dessert station! Hot, prompt, and served with impeccable elegance.',
        helpfulCount: 22
      }
    ],
    bookedDates: ['2026-10-17', '2026-10-31', '2026-11-21']
  },
  {
    id: 'v-105',
    name: 'Glamour Touch Bridal Artistry',
    tagline: 'High-definition bridal makeup, couture hair design & luxury silk draping',
    category: 'makeup',
    subCategory: 'Bridal Makeup',
    rating: 4.96,
    reviewCount: 138,
    startingPrice: 450,
    priceUnit: 'per session',
    city: 'Miami, FL',
    address: '220 Ocean Drive, South Beach Beauty Lounge',
    phone: '+1 (305) 674-8890',
    email: 'bookings@glamourtouchbrides.com',
    responseTime: '< 30 mins',
    experienceYears: 8,
    coverImage: '/src/assets/images/photo_candid_shoot_1791613847934.jpg',
    images: [
      '/src/assets/images/photo_candid_shoot_1791613847934.jpg',
      '/src/assets/images/hero_wedding_couple_1791613820623.jpg'
    ],
    verified: true,
    featured: true,
    about: 'Celebrity makeup artist Maya Lin brings over 8 years of bridal expertise, specializing in luminous, camera-ready bridal looks that last 16+ hours through dancing and emotional tears. Using only luxury products (Charlotte Tilbury, Dior, NARS, Tom Ford).',
    amenities: [
      'Pre-wedding Bridal Trial Session with customized mood board',
      'Premium Mink Lashes & Airbrush Foundation Included',
      'Assistance with Dupatta / Saree / Veil draping & jewelry placement',
      'On-location touchup kit provided for the day',
      'Mother of the Bride & Bridal Party packages available'
    ],
    packages: [
      {
        id: 'pkg-501',
        name: 'Reception Glam Look',
        price: 450,
        priceUnit: 'per session',
        description: 'Single ceremony high-definition bridal styling.',
        inclusions: [
          'HD or Airbrush Makeup application',
          'Intricate couture hair styling with fresh floral inserts',
          'Luxury silk or velvet draping & jewelry setting',
          'Emergency touch-up lip kit'
        ]
      },
      {
        id: 'pkg-502',
        name: 'The Ultimate Bridal Duo (Ceremony + Reception)',
        price: 850,
        priceUnit: 'full day',
        popular: true,
        description: 'Morning traditional ceremony look + evening glamour reception makeover.',
        inclusions: [
          '2 complete distinct hair & makeup transformations',
          'Bridal trial session included prior to wedding week',
          'Stylist stays through the ceremony for tears & photo touch-ups',
          'Complimentary styling for the Mother of the Bride'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-501',
        author: 'Natasha Reynolds',
        authorLocation: 'Miami, FL',
        date: 'October 2026',
        rating: 5,
        eventType: 'Wedding & Sangeet',
        comment: 'Maya made me feel like royalty! My makeup didn’t budge in Miami humidity, and looked so soft and radiant both in person and on 4K video.',
        helpfulCount: 29
      }
    ],
    bookedDates: ['2026-10-18', '2026-10-25', '2026-11-14']
  },
  {
    id: 'v-106',
    name: 'Pulse & Bass Wedding Entertainment',
    tagline: 'Electrifying DJ performances, visual lighting rigs & unforgettable dance floors',
    category: 'djs',
    subCategory: 'Bollywood & EDM DJs',
    rating: 4.87,
    reviewCount: 88,
    startingPrice: 1200,
    priceUnit: 'per event',
    city: 'Austin, TX',
    address: '602 Congress Ave, Austin Music Hall',
    phone: '+1 (512) 472-8812',
    email: 'info@pulsenbassevents.com',
    responseTime: '< 1 hour',
    experienceYears: 10,
    coverImage: '/src/assets/images/hero_wedding_couple_1791613820623.jpg',
    images: [
      '/src/assets/images/hero_wedding_couple_1791613820623.jpg'
    ],
    verified: true,
    featured: false,
    about: 'We know how to pack a wedding dance floor from the first beat to the 2 AM send-off. With seamless transitions between Top 40, 90s Throwbacks, Hip Hop, Bollywood, and Afrobeat, DJ Zain and our MCs keep the energy unstoppable.',
    amenities: [
      'State-of-the-art QSC Line Array sound system',
      'Wireless handheld & lavalier microphones for speeches',
      'Intelligent moving head lighting & cold spark fountain machines',
      'Custom playlist consultation & "Do-Not-Play" strict list',
      'Low-fog dry ice machine for the First Dance cloud effect'
    ],
    packages: [
      {
        id: 'pkg-601',
        name: 'The Party Starter',
        price: 1200,
        priceUnit: 'per event',
        description: '5 hours of high-energy music and reception sound.',
        inclusions: [
          '5 hours DJ & sound service',
          'Premium dual sound speakers + wireless mic',
          'Basic sound-activated dance lighting tree',
          'Consultation session to build custom playlist'
        ]
      },
      {
        id: 'pkg-602',
        name: 'The Stadium Experience',
        price: 2400,
        priceUnit: 'per event',
        popular: true,
        description: 'Concert-grade production, MC, cold sparks, and cloud dance effect.',
        inclusions: [
          'Full day ceremony + cocktail + reception coverage (up to 8 hrs)',
          'Lead DJ + Professional Interactive Master of Ceremonies (MC)',
          'Dancing on the Clouds low-fog dry ice machine for First Dance',
          '4 Indoor Cold Spark pyrotechnic sparklers for grand entrance',
          'Custom LED monogram projection of couple initials'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-601',
        author: 'David & Rachel Miller',
        authorLocation: 'Austin, TX',
        date: 'August 2026',
        rating: 5,
        eventType: 'Wedding Reception (220 Guests)',
        comment: 'Our guests literally did not leave the dance floor all night. The cold sparklers during our entrance set the room on fire in the best way possible!',
        helpfulCount: 14
      }
    ],
    bookedDates: ['2026-10-24', '2026-11-07', '2026-12-31']
  },
  {
    id: 'v-107',
    name: 'Serenade Moments Wedding Curators',
    tagline: 'Bespoke planning, flawless timeline management & serene couple experience',
    category: 'planners',
    subCategory: 'Full Wedding Planning',
    rating: 4.98,
    reviewCount: 114,
    startingPrice: 2800,
    priceUnit: 'per wedding',
    city: 'Seattle, WA',
    address: '1420 5th Avenue, Seattle Center',
    phone: '+1 (206) 624-9980',
    email: 'serenade@serenademoments.com',
    responseTime: '< 1 hour',
    experienceYears: 12,
    coverImage: '/src/assets/images/venue_grand_resort_1791613836591.jpg',
    images: [
      '/src/assets/images/venue_grand_resort_1791613836591.jpg',
      '/src/assets/images/decor_mandap_floral_1791613861460.jpg'
    ],
    verified: true,
    featured: true,
    about: 'Your engagement should be filled with anticipation and celebration, not stress spreadsheets. Serenade Moments takes the weight off your shoulders by curating contracts, negotiating vendor rates, designing cohesive aesthetic mood boards, and ensuring down-to-the-minute execution.',
    amenities: [
      'Comprehensive budget management & tracking software',
      'Curated vendor recommendations matching your aesthetic & budget',
      'Complete run-of-show timeline distributed to all vendors',
      'Emergency bridal kit with 80+ essential items',
      'Lead Planner + 2 Assistant Coordinators on-site all day'
    ],
    packages: [
      {
        id: 'pkg-701',
        name: 'Month-Of Coordination & Peace of Mind',
        price: 2800,
        priceUnit: 'per wedding',
        description: 'For couples who planned the details but want zero stress on the wedding day.',
        inclusions: [
          'Handover begins 6 weeks prior to wedding date',
          'Vendor contract review and arrival confirmation',
          'Detailed day-of master itinerary creation',
          'Rehearsal coordination (1 hour prior day)',
          '10 Hours on-site coordination with 2 planners'
        ]
      },
      {
        id: 'pkg-702',
        name: 'Full-Service Conception to Send-Off',
        price: 5600,
        priceUnit: 'per wedding',
        popular: true,
        description: 'Complete hands-on curation, vendor negotiation, and wedding design.',
        inclusions: [
          'Unlimited planning meetings and design consultations',
          'Vendor matching, contract negotiation & budget tracking',
          'Custom 3D layout and styling board creation',
          'Guest RSVP tracking and seating layout assistance',
          '3 Coordinators managing rehearsal, ceremony, and reception'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-701',
        author: 'Jessica & Tyler Hayes',
        authorLocation: 'Seattle, WA',
        date: 'September 2026',
        rating: 5,
        eventType: 'Destination Wedding at San Juan Islands',
        comment: 'Hiring Serenade Moments was the single best decision of our entire wedding. Claire and her team solved three unexpected vendor crises before we even knew they happened. We felt like relaxed guests at our own wedding!',
        helpfulCount: 38
      }
    ],
    bookedDates: ['2026-10-17', '2026-11-14', '2026-11-21', '2026-12-19']
  },
  {
    id: 'v-108',
    name: 'Ocean Breeze Villa & Beach Pavilion',
    tagline: 'Panoramic coastal cliffs, sandy ceremony shoreline & private sunset gazebo',
    category: 'venues',
    subCategory: 'Beach Venues',
    rating: 4.86,
    reviewCount: 76,
    startingPrice: 3800,
    priceUnit: 'per day',
    city: 'Miami, FL',
    address: '1900 Ocean Drive, Biscayne Bay Shores',
    phone: '+1 (305) 538-4422',
    email: 'events@oceanbreezevilla.com',
    responseTime: '< 2 hours',
    experienceYears: 7,
    coverImage: '/src/assets/images/venue_grand_resort_1791613836591.jpg',
    images: [
      '/src/assets/images/venue_grand_resort_1791613836591.jpg',
      '/src/assets/images/hero_wedding_couple_1791613820623.jpg'
    ],
    verified: true,
    featured: false,
    about: 'Say your vows with the gentle sound of Atlantic waves as your backdrop. Ocean Breeze Villa offers a secluded tropical oasis featuring pristine white sands, an elevated cliffside cocktail terrace, and an air-conditioned glass pavilion for nighttime dining.',
    amenities: [
      'Capacity: 50 - 450 Guests',
      'Private Beach Permit & Shoreline Access included',
      'Glass-enclosed air-conditioned pavilion with 360 ocean views',
      'Dedicated Honeymoon Suite for the night of the event',
      'Flexible outdoor music curfew until 11:30 PM'
    ],
    packages: [
      {
        id: 'pkg-801',
        name: 'Sunset Shoreline Ceremony',
        price: 3800,
        priceUnit: 'per day',
        description: 'Beach ceremony + cliffside cocktail hour access.',
        inclusions: [
          'Beachfront driftwood arbor setup',
          'Seating for up to 180 guests on sand or lawn',
          'Sound system for ceremony vows & string quartet',
          'Terrace cocktail space with tiki torches'
        ]
      },
      {
        id: 'pkg-802',
        name: 'The Coastal Grand Affair',
        price: 7200,
        priceUnit: 'per day',
        popular: true,
        description: 'Complete day & evening access to shoreline, pavilion, and private villa.',
        inclusions: [
          '12 Hours full estate access',
          'Glass dining pavilion + ocean lawn + beach ceremony area',
          'Luxury bridal suite + private pool terrace access',
          'Security staff and post-event cleanup'
        ]
      }
    ],
    reviews: [
      {
        id: 'rev-801',
        author: 'Monique & Alex Rivera',
        authorLocation: 'Fort Lauderdale, FL',
        date: 'August 2026',
        rating: 5,
        eventType: 'Beach Wedding (160 Guests)',
        comment: 'The sunset over the water during our ceremony felt straight out of a movie. The glass pavilion meant we had ocean views while our guests stayed comfortable in the cool AC during dinner.',
        helpfulCount: 11
      }
    ],
    bookedDates: ['2026-10-23', '2026-11-20', '2026-12-04']
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'bk-901',
    vendorId: 'v-101',
    vendorName: 'The Grand Lotus Palace & Resort',
    vendorCategory: 'venues' as VendorCategory,
    vendorCoverImage: '/src/assets/images/venue_grand_resort_1791613836591.jpg',
    clientName: 'Chloe Bennett & Liam Smith',
    clientEmail: 'chloe.bennett@example.com',
    clientPhone: '+1 (415) 321-9988',
    eventDate: '2026-11-14',
    eventType: 'Wedding Ceremony & Grand Reception',
    packageId: 'pkg-2',
    packageName: 'Royal Heritage Palace',
    guestCount: 350,
    customRequests: 'Outdoor floral mandap on lawn followed by indoor banquet dinner in Crystal Ballroom.',
    totalPrice: 8200,
    advanceDeposit: 2050,
    paymentMethod: 'Credit Card (Simulated)',
    status: 'confirmed' as const,
    createdAt: '2026-10-01'
  },
  {
    id: 'bk-902',
    vendorId: 'v-102',
    vendorName: 'Aura Lens Studios',
    vendorCategory: 'photographers' as VendorCategory,
    vendorCoverImage: '/src/assets/images/photo_candid_shoot_1791613847934.jpg',
    clientName: 'Chloe Bennett & Liam Smith',
    clientEmail: 'chloe.bennett@example.com',
    clientPhone: '+1 (415) 321-9988',
    eventDate: '2026-11-14',
    eventType: 'Full Day Wedding Cinema & Photo',
    packageId: 'pkg-202',
    packageName: 'Signature Cinema & Heritage Album',
    guestCount: 350,
    customRequests: 'Special emphasis on golden hour portraits and grandparents candid reactions.',
    totalPrice: 3800,
    advanceDeposit: 950,
    paymentMethod: 'Instant Transfer (Simulated)',
    status: 'confirmed' as const,
    createdAt: '2026-10-03'
  }
];


export const featuredProperties = [
  {
    id: '1',
    title: 'Modern Family Home with Garden',
    price: 35000000, // ₹3.5 Crores
    location: 'Bandra West, Mumbai',
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    type: 'house',
    image: 'photo-1487958449943-2429e8be8625',
    featured: true,
    description: 'Beautiful modern family home with spacious garden, updated kitchen, and premium finishes throughout.',
    amenities: ['Garden', 'Garage', 'Fireplace', 'Modern Kitchen', 'Walk-in Closet'],
    yearBuilt: 2018,
    lotSize: 0.25,
  },
  {
    id: '2',
    title: 'Luxury Downtown Apartment',
    price: 55000000, // ₹5.5 Crores
    location: 'Connaught Place, New Delhi',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'apartment',
    image: 'photo-1721322800607-8c38375eef04',
    featured: true,
    description: 'High-end apartment in the heart of downtown with stunning city views and luxury amenities.',
    amenities: ['City View', 'Gym', 'Concierge', 'Rooftop Terrace', 'In-unit Laundry'],
    yearBuilt: 2020,
    floor: 15,
  },
  {
    id: '3',
    title: 'Charming Victorian House',
    price: 45000000, // ₹4.5 Crores
    location: 'Koregaon Park, Pune',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: 'house',
    image: 'photo-1518005020951-eccb494ad742',
    featured: false,
    description: 'Beautifully restored Victorian home with original hardwood floors and period details.',
    amenities: ['Hardwood Floors', 'Period Details', 'Bay Windows', 'Clawfoot Tub'],
    yearBuilt: 1895,
    lotSize: 0.15,
  },
  {
    id: '4',
    title: 'Contemporary Condo with Pool',
    price: 25000000, // ₹2.5 Crores
    location: 'Whitefield, Bangalore',
    bedrooms: 2,
    bathrooms: 1,
    area: 950,
    type: 'apartment',
    image: 'photo-1466442929976-97f336a657be',
    featured: false,
    description: 'Modern condo in desirable complex with pool, fitness center, and covered parking.',
    amenities: ['Pool', 'Fitness Center', 'Covered Parking', 'Balcony'],
    yearBuilt: 2015,
    floor: 3,
  },
  {
    id: '5',
    title: 'Spacious Family Ranch',
    price: 32000000, // ₹3.2 Crores
    location: 'Gurgaon, Haryana',
    bedrooms: 5,
    bathrooms: 3,
    area: 2800,
    type: 'house',
    image: 'photo-1492321936769-b49830bc1d1e',
    featured: true,
    description: 'Large ranch-style home perfect for families, featuring open floor plan and mountain views.',
    amenities: ['Mountain Views', 'Open Floor Plan', 'Large Yard', '2-Car Garage'],
    yearBuilt: 2010,
    lotSize: 0.3,
  },
  {
    id: '6',
    title: 'Prime Commercial Plot',
    price: 75000000, // ₹7.5 Crores
    location: 'Lower Parel, Mumbai',
    bedrooms: 0,
    bathrooms: 0,
    area: 5000,
    type: 'commercial',
    image: 'photo-1433086966358-54859d0ed716',
    featured: false,
    description: 'Prime commercial land perfect for development, located in high-traffic area.',
    amenities: ['High Traffic', 'Corner Lot', 'Development Ready', 'Utilities Available'],
    yearBuilt: 0,
    lotSize: 1.2,
  }
];

export const allProperties = [
  ...featuredProperties,
  {
    id: '7',
    title: 'Cozy Studio Apartment',
    price: 15000000, // ₹1.5 Crores
    location: 'Andheri East, Mumbai',
    bedrooms: 0,
    bathrooms: 1,
    area: 450,
    type: 'apartment',
    image: 'photo-1649972904349-6e44c42644a7',
    featured: false,
    description: 'Perfect starter home or investment property in vibrant neighborhood.',
    amenities: ['Updated Kitchen', 'Hardwood Floors', 'Near Transit'],
    yearBuilt: 2005,
    floor: 8,
  },
  {
    id: '8',
    title: 'Suburban Family Home',
    price: 28000000, // ₹2.8 Crores
    location: 'Sector 56, Noida',
    bedrooms: 4,
    bathrooms: 2,
    area: 2200,
    type: 'house',
    image: 'photo-1488590528505-98d2b5aba04b',
    featured: false,
    description: 'Great family home in quiet suburban neighborhood with excellent schools.',
    amenities: ['Quiet Neighborhood', 'Great Schools', 'Backyard', 'Garage'],
    yearBuilt: 2008,
    lotSize: 0.2,
  }
];

// Helper function to format price in INR
export const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

// Popular locations for search
export const popularLocations = [
  'Bandra West, Mumbai',
  'Connaught Place, New Delhi',
  'Koregaon Park, Pune',
  'Whitefield, Bangalore',
  'Gurgaon, Haryana',
  'Lower Parel, Mumbai',
  'Andheri East, Mumbai',
  'Sector 56, Noida',
  'MG Road, Bangalore',
  'Cyber City, Gurgaon'
];

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    rating: 5,
    text: 'RealtyHub helped me find my dream home in Bandra. The process was smooth and the team was very professional.',
    image: 'photo-1472099645785-5658abf4ff4e'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'Excellent service! They understood my requirements perfectly and found me a great apartment in CP.',
    image: 'photo-1438761681033-6461ffad8d80'
  },
  {
    id: 3,
    name: 'Amit Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'The best real estate platform in India. Quick, reliable, and transparent. Highly recommended!',
    image: 'photo-1507003211169-0a1dd7228f2d'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    location: 'Pune',
    rating: 4,
    text: 'Found my perfect home through RealtyHub. The search filters and location suggestions were very helpful.',
    image: 'photo-1494790108755-2616b612b786'
  }
];

export const SEED_CARS = [
  {
    id: 1, make: 'Toyota', model: 'Corolla Quest', year: 2022,
    transmission: 'Manual', city: 'Johannesburg', area: 'Sandton',
    weeklyRent: 3200, deposit: 5000, status: 'available',
    emoji: '🚗', featured: true,
    description: 'Well-maintained Corolla Quest, perfect for Uber. Full service history, no accidents. PrDP required, clean driving record, and a R5 000 refundable deposit.',
    ownerId: 'o1', ownerName: 'Sipho Dlamini', ownerInitials: 'SD',
    ownerVerified: true, ownerPhone: '0821234567',
    specs: ['Petrol', '1.6L', 'A/C', 'Service history'],
    reviews: [
      { author: 'Thabo M.', rating: 5, text: 'Sipho was professional, car in excellent condition.', date: '2025-02-10' },
      { author: 'Lungelo K.', rating: 5, text: 'Smooth process, highly recommend.', date: '2025-01-22' },
    ]
  },
  {
    id: 2, make: 'Volkswagen', model: 'Polo Vivo', year: 2021,
    transmission: 'Manual', city: 'Cape Town', area: 'Bellville',
    weeklyRent: 2800, deposit: 4000, status: 'available',
    emoji: '🚙', featured: false,
    description: 'Reliable Polo Vivo with full service history. Great on fuel, comfortable for passengers. Driver must have active Uber account and valid PrDP.',
    ownerId: 'o2', ownerName: 'Thembi Nkosi', ownerInitials: 'TN',
    ownerVerified: true, ownerPhone: '0831234567',
    specs: ['Petrol', '1.4L', 'Good on fuel', 'A/C'],
    reviews: [
      { author: 'Yusuf A.', rating: 4, text: 'Good car, owner responds quickly on WhatsApp.', date: '2025-03-01' },
    ]
  },
  {
    id: 3, make: 'Toyota', model: 'Etios', year: 2020,
    transmission: 'Manual', city: 'Durban', area: 'Pinetown',
    weeklyRent: 2500, deposit: 3500, status: 'available',
    emoji: '🚘', featured: false,
    description: 'Toyota Etios sedan, popular Uber vehicle. Low running costs, easy to maintain. Deposit negotiable for experienced Uber drivers with good ratings.',
    ownerId: 'o3', ownerName: 'Bongani Cele', ownerInitials: 'BC',
    ownerVerified: false, ownerPhone: '0841234567',
    specs: ['Petrol', '1.5L', 'Low mileage', 'A/C'],
    reviews: []
  },
  {
    id: 4, make: 'Hyundai', model: 'Grand i10', year: 2023,
    transmission: 'Automatic', city: 'Johannesburg', area: 'Midrand',
    weeklyRent: 3500, deposit: 5000, status: 'available',
    emoji: '🚕', featured: true,
    description: 'Brand new Grand i10 automatic. Ideal for experienced Uber drivers. Excellent fuel economy. Must have Uber Pro Gold rating or above.',
    ownerId: 'o4', ownerName: 'Priya Pillay', ownerInitials: 'PP',
    ownerVerified: true, ownerPhone: '0851234567',
    specs: ['Petrol', '1.2L', 'Automatic', 'New model'],
    reviews: [
      { author: 'Siphamandla D.', rating: 5, text: 'Amazing car, great value for money!', date: '2025-03-10' },
      { author: 'Nomvula Z.', rating: 4, text: 'Very clean car, owner is very friendly.', date: '2025-02-28' },
    ]
  },
  {
    id: 5, make: 'Nissan', model: 'Almera', year: 2019,
    transmission: 'Manual', city: 'Pretoria', area: 'Centurion',
    weeklyRent: 2200, deposit: 3000, status: 'rented',
    emoji: '🚗', featured: false,
    description: 'Nissan Almera, solid and reliable. Available from next Monday. Driver must have valid PrDP and minimum 6 months Uber experience.',
    ownerId: 'o5', ownerName: 'Johan van Wyk', ownerInitials: 'JV',
    ownerVerified: false, ownerPhone: '0861234567',
    specs: ['Petrol', '1.6L', 'A/C', 'Spacious'],
    reviews: []
  },
  {
    id: 6, make: 'Toyota', model: 'Corolla Cross', year: 2023,
    transmission: 'Automatic', city: 'Cape Town', area: 'Claremont',
    weeklyRent: 5500, deposit: 8000, status: 'available',
    emoji: '🚙', featured: true,
    description: 'Premium Corolla Cross, Uber Select-ready. Leather seats, excellent condition. Driver must maintain 4.8+ Uber rating. References required.',
    ownerId: 'o6', ownerName: 'Fatima Davids', ownerInitials: 'FD',
    ownerVerified: true, ownerPhone: '0871234567',
    specs: ['Hybrid', 'Auto', 'Leather seats', 'Select-ready'],
    reviews: [
      { author: 'Regan P.', rating: 5, text: 'Top class vehicle, worth every cent.', date: '2025-03-05' },
    ]
  },
];

export const SEED_DRIVERS = [
  {
    id: 'd1', name: 'Thabo Mokoena', initials: 'TM',
    city: 'Johannesburg', uberRating: 4.9, trips: 1240,
    experience: '3 years', licenseVerified: true, criminalClear: true,
    prdpVerified: true, idVerified: true,
    verificationStatus: 'verified',
    bio: 'Full-time Uber driver based in Joburg. Professional, punctual and clean record.',
    reviews: [
      { author: 'Sipho D.', rating: 5, text: 'Excellent driver, took great care of the car.', date: '2025-02-14' },
    ]
  },
  {
    id: 'd2', name: 'Ayanda Zulu', initials: 'AZ',
    city: 'Durban', uberRating: 4.7, trips: 860,
    experience: '2 years', licenseVerified: true, criminalClear: true,
    prdpVerified: true, idVerified: false,
    verificationStatus: 'partial',
    bio: 'Experienced Uber driver in Durban. Never had an accident.',
    reviews: []
  },
];

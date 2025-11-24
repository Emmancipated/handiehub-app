// Seller profile data structure
export interface SellerProfile {
  id: string;
  name: string;
  businessName: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  location: string;
  phone: string;
  email: string;
  isVerified: boolean;
  responseTime: string;
  completionRate: number;
  specialties: string[];
  description: string;
  experience: string;
  languages: string[];
  availability: string;
  joinedDate: string;
  totalOrders: number;
  portfolio: string[];
}

// Product/Service data structure
export interface SellerProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  currency: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  deliveryTime: string;
  features: string[];
  specifications?: any;
}

// Review data structure
export interface SellerReview {
  id: string;
  customerName: string;
  customerImage: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  orderId: string;
  productId: string;
  images?: string[];
  isVerified: boolean;
}

// Sample seller profiles
export const sampleSellers: SellerProfile[] = [
  {
    id: "seller-1",
    name: "David Farinde",
    businessName: "Premium Carpentry Solutions",
    profileImage: require("../../assets/images/ProfilePic.png"),
    rating: 4.8,
    reviewCount: 127,
    location: "Lagos, Nigeria",
    phone: "+234 801 234 5678",
    email: "david@premiumcarpentry.com",
    isVerified: true,
    responseTime: "Within 2 hours",
    completionRate: 98,
    specialties: ["Kitchen Design", "Custom Furniture", "Woodworking"],
    description: "Professional carpenter with over 10 years of experience in custom furniture design and kitchen installations. Specializing in modern and traditional woodworking techniques.",
    experience: "10+ years",
    languages: ["English", "Yoruba"],
    availability: "Monday - Saturday, 8AM - 6PM",
    joinedDate: "2020-03-15",
    totalOrders: 245,
    portfolio: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "seller-2",
    name: "Grace Okafor",
    businessName: "Sparkle Clean Services",
    profileImage: require("../../assets/images/ProfilePic.png"),
    rating: 4.9,
    reviewCount: 89,
    location: "Abuja, Nigeria",
    phone: "+234 802 345 6789",
    email: "grace@sparkleclean.com",
    isVerified: true,
    responseTime: "Within 1 hour",
    completionRate: 100,
    specialties: ["Deep Cleaning", "Office Cleaning", "Post-Construction"],
    description: "Professional cleaning services with eco-friendly products. Specializing in residential and commercial cleaning with attention to detail.",
    experience: "7+ years",
    languages: ["English", "Hausa"],
    availability: "Monday - Sunday, 6AM - 8PM",
    joinedDate: "2021-01-10",
    totalOrders: 156,
    portfolio: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Sample products for sellers
export const sampleProducts: SellerProduct[] = [
  {
    id: "prod-1",
    title: "Custom Kitchen Cabinet Design",
    description: "Modern kitchen cabinet design with soft-close drawers and premium wood finish",
    category: "Carpentry",
    subCategory: "Cabinet Installation",
    price: 150000,
    currency: "NGN",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 23,
    isAvailable: true,
    deliveryTime: "4-6 weeks",
    features: ["Soft-close drawers", "Premium wood finish", "Custom measurements", "Installation included"],
    specifications: {
      material: "Oak Wood",
      dimensions: "Custom",
      warranty: "2 years"
    }
  },
  {
    id: "prod-2",
    title: "Custom Dining Table",
    description: "Handcrafted dining table with elegant design and durable construction",
    category: "Carpentry",
    subCategory: "Furniture Making",
    price: 85000,
    currency: "NGN",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 15,
    isAvailable: true,
    deliveryTime: "3-4 weeks",
    features: ["Handcrafted", "Elegant design", "Durable construction", "Custom size"],
    specifications: {
      material: "Mahogany Wood",
      dimensions: "Custom",
      warranty: "1 year"
    }
  },
  {
    id: "prod-3",
    title: "House Deep Cleaning Service",
    description: "Complete deep cleaning of residential properties including all rooms and appliances",
    category: "Cleaning",
    subCategory: "Deep Cleaning",
    price: 45000,
    currency: "NGN",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 67,
    isAvailable: true,
    deliveryTime: "1 day",
    features: ["Eco-friendly products", "Professional equipment", "All rooms included", "Appliance cleaning"],
    specifications: {
      duration: "6-8 hours",
      team: "2-3 professionals",
      products: "Eco-friendly"
    }
  }
];

// Sample reviews
export const sampleReviews: SellerReview[] = [
  {
    id: "rev-1",
    customerName: "Sarah Johnson",
    customerImage: require("../../assets/images/ProfilePic.png"),
    rating: 5,
    title: "Excellent work!",
    comment: "David did an amazing job on our kitchen cabinets. The quality is outstanding and the attention to detail is impressive. Highly recommended!",
    date: "2024-01-15",
    orderId: "ORD-2024-001",
    productId: "prod-1",
    isVerified: true
  },
  {
    id: "rev-2",
    customerName: "Michael Brown",
    customerImage: require("../../assets/images/ProfilePic.png"),
    rating: 4,
    title: "Good quality work",
    comment: "The dining table turned out great. David was professional and completed the work on time. Minor issue with delivery but overall satisfied.",
    date: "2024-01-10",
    orderId: "ORD-2024-002",
    productId: "prod-2",
    isVerified: true
  },
  {
    id: "rev-3",
    customerName: "Jennifer Davis",
    customerImage: require("../../assets/images/ProfilePic.png"),
    rating: 5,
    title: "Perfect cleaning service",
    comment: "Grace and her team did an excellent job cleaning our house. Everything was spotless and they used eco-friendly products. Will definitely book again!",
    date: "2024-01-12",
    orderId: "ORD-2024-003",
    productId: "prod-3",
    isVerified: true
  },
  {
    id: "rev-4",
    customerName: "Robert Wilson",
    customerImage: require("../../assets/images/ProfilePic.png"),
    rating: 4,
    title: "Professional service",
    comment: "Good work overall. The cabinets look great and the installation was smooth. Would recommend for custom furniture work.",
    date: "2024-01-08",
    orderId: "ORD-2024-004",
    productId: "prod-1",
    isVerified: false
  },
  {
    id: "rev-5",
    customerName: "Lisa Anderson",
    customerImage: require("../../assets/images/ProfilePic.png"),
    rating: 5,
    title: "Outstanding quality",
    comment: "David exceeded our expectations. The custom furniture pieces are beautifully crafted and the service was top-notch. Worth every penny!",
    date: "2024-01-05",
    orderId: "ORD-2024-005",
    productId: "prod-2",
    isVerified: true
  }
];

// Helper functions
export const getSellerById = (id: string): SellerProfile | undefined => {
  return sampleSellers.find(seller => seller.id === id);
};

export const getProductsBySellerId = (sellerId: string): SellerProduct[] => {
  // In a real app, this would filter products by seller ID
  // For now, return all products as they're all from the same seller
  return sampleProducts;
};

export const getReviewsBySellerId = (sellerId: string): SellerReview[] => {
  // In a real app, this would filter reviews by seller ID
  // For now, return all reviews as they're all for the same seller
  return sampleReviews;
};

export const formatCurrency = (amount: number, currency: string = "NGN"): string => {
  return `${currency} ${amount.toLocaleString()}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return "#10b981";
  if (rating >= 4.0) return "#3b82f6";
  if (rating >= 3.0) return "#f59e0b";
  return "#ef4444";
};

export const getStarRating = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "★".repeat(fullStars);
  if (hasHalfStar) stars += "☆";
  return stars;
};


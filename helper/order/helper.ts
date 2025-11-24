export const categories = ["All order", "Pending", "Paid", "Cancelled"];

// Comprehensive order data structure
export interface OrderItem {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  currency: string;
  status:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "paid";
  paymentStatus: "pending" | "paid" | "refunded" | "failed";
  orderDate: string;
  expectedCompletionDate?: string;
  completionDate?: string;
  quantity?: number;
  seller: {
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
  };
  serviceDetails: {
    type: "product" | "service";
    images: string[];
    specifications?: any;
    requirements?: string[];
    timeline?: string;
    materials?: string[];
  };
  location: {
    address: string;
    city: string;
    state: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  communication: {
    lastMessage?: string;
    messageCount: number;
    lastMessageTime?: string;
  };
  progress?: {
    currentStep: number;
    totalSteps: number;
    steps: string[];
  };
}

// Sample order data
export const sampleOrders: OrderItem[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    title: "Custom Kitchen Cabinet Design",
    description:
      "Modern kitchen cabinet design with soft-close drawers and premium wood finish",
    category: "Carpentry",
    subCategory: "Cabinet Installation",
    price: 150000,
    currency: "NGN",
    status: "in_progress",
    paymentStatus: "paid",
    orderDate: "2024-01-15",
    expectedCompletionDate: "2024-02-15",
    quantity: 1,
    seller: {
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
    },
    serviceDetails: {
      type: "service",
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      requirements: ["Measurements", "Material preferences", "Timeline"],
      timeline: "4-6 weeks",
      materials: ["Oak Wood", "Soft-close hinges", "Premium handles"],
    },
    location: {
      address: "123 Victoria Island, Lagos",
      city: "Lagos",
      state: "Lagos State",
    },
    communication: {
      lastMessage: "Materials have been ordered and will arrive by Friday",
      messageCount: 15,
      lastMessageTime: "2024-01-20T10:30:00Z",
    },
    progress: {
      currentStep: 2,
      totalSteps: 4,
      steps: [
        "Design Approved",
        "Materials Ordered",
        "Installation Started",
        "Final Inspection",
      ],
    },
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    title: "House Deep Cleaning Service",
    description:
      "Complete deep cleaning of 3-bedroom apartment including all rooms and appliances",
    category: "Cleaning",
    subCategory: "Deep Cleaning",
    price: 45000,
    currency: "NGN",
    status: "completed",
    paymentStatus: "paid",
    orderDate: "2024-01-10",
    completionDate: "2024-01-12",
    quantity: 1,
    seller: {
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
    },
    serviceDetails: {
      type: "service",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      requirements: ["Access instructions", "Special areas to focus on"],
      timeline: "1 day",
      materials: ["Eco-friendly cleaning products", "Professional equipment"],
    },
    location: {
      address: "456 Maitama, Abuja",
      city: "Abuja",
      state: "FCT",
    },
    communication: {
      lastMessage:
        "Cleaning completed successfully. Thank you for choosing our services!",
      messageCount: 8,
      lastMessageTime: "2024-01-12T16:00:00Z",
    },
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    title: "Plumbing Repair - Kitchen Sink",
    description: "Fix leaking kitchen sink and install new faucet",
    category: "Plumbing",
    subCategory: "Pipe Installation & Repair",
    price: 25000,
    currency: "NGN",
    status: "pending",
    paymentStatus: "pending",
    orderDate: "2024-01-18",
    expectedCompletionDate: "2024-01-20",
    quantity: 1,
    seller: {
      id: "seller-3",
      name: "Michael Adebayo",
      businessName: "Quick Fix Plumbing",
      profileImage: require("../../assets/images/ProfilePic.png"),
      rating: 4.7,
      reviewCount: 156,
      location: "Port Harcourt, Nigeria",
      phone: "+234 803 456 7890",
      email: "michael@quickfixplumbing.com",
      isVerified: true,
      responseTime: "Within 3 hours",
      completionRate: 95,
      specialties: [
        "Emergency Repairs",
        "Kitchen Plumbing",
        "Bathroom Installation",
      ],
    },
    serviceDetails: {
      type: "service",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      requirements: ["Access to water main", "Preferred appointment time"],
      timeline: "2-3 hours",
      materials: ["New faucet", "Pipe fittings", "Sealant"],
    },
    location: {
      address: "789 GRA, Port Harcourt",
      city: "Port Harcourt",
      state: "Rivers State",
    },
    communication: {
      lastMessage: "I'll be there tomorrow morning at 9 AM as scheduled",
      messageCount: 5,
      lastMessageTime: "2024-01-19T14:20:00Z",
    },
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    title: "Electrical Wiring Installation",
    description:
      "Install new electrical outlets and lighting fixtures in living room",
    category: "Electrical",
    subCategory: "Wiring Installation",
    price: 75000,
    currency: "NGN",
    status: "confirmed",
    paymentStatus: "paid",
    orderDate: "2024-01-16",
    expectedCompletionDate: "2024-01-22",
    quantity: 1,
    seller: {
      id: "seller-4",
      name: "Sarah Johnson",
      businessName: "Safe Electric Solutions",
      profileImage: require("../../assets/images/ProfilePic.png"),
      rating: 4.9,
      reviewCount: 203,
      location: "Lagos, Nigeria",
      phone: "+234 804 567 8901",
      email: "sarah@safeelectric.com",
      isVerified: true,
      responseTime: "Within 1 hour",
      completionRate: 99,
      specialties: [
        "Wiring Installation",
        "Smart Home Setup",
        "Electrical Inspections",
      ],
    },
    serviceDetails: {
      type: "service",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      requirements: ["Electrical permit", "Access to electrical panel"],
      timeline: "1-2 days",
      materials: ["Copper wiring", "Outlets", "Light fixtures", "Conduit"],
    },
    location: {
      address: "321 Ikoyi, Lagos",
      city: "Lagos",
      state: "Lagos State",
    },
    communication: {
      lastMessage: "Permit approved! We can start installation tomorrow",
      messageCount: 12,
      lastMessageTime: "2024-01-17T11:15:00Z",
    },
  },
  {
    id: "5",
    orderNumber: "ORD-2024-005",
    title: "Childcare Services - Weekend",
    description: "Professional childcare services for weekend event",
    category: "Nanny & Childcare",
    subCategory: "Babysitting",
    price: 30000,
    currency: "NGN",
    status: "completed",
    paymentStatus: "paid",
    orderDate: "2024-01-14",
    completionDate: "2024-01-14",
    quantity: 1,
    seller: {
      id: "seller-5",
      name: "Blessing Okonkwo",
      businessName: "Little Angels Care",
      profileImage: require("../../assets/images/ProfilePic.png"),
      rating: 4.8,
      reviewCount: 67,
      location: "Lagos, Nigeria",
      phone: "+234 805 678 9012",
      email: "blessing@littleangelscare.com",
      isVerified: true,
      responseTime: "Within 2 hours",
      completionRate: 100,
      specialties: ["Event Childcare", "Special Needs Care", "Tutoring"],
    },
    serviceDetails: {
      type: "service",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      requirements: [
        "Child's age and needs",
        "Event details",
        "Emergency contacts",
      ],
      timeline: "6 hours",
      materials: ["Educational toys", "First aid kit", "Snacks"],
    },
    location: {
      address: "654 Lekki, Lagos",
      city: "Lagos",
      state: "Lagos State",
    },
    communication: {
      lastMessage: "Children had a wonderful time! Thank you for trusting us.",
      messageCount: 6,
      lastMessageTime: "2024-01-14T20:00:00Z",
    },
  },
  {
    id: "6",
    orderNumber: "ORD-2024-006",
    title: "Garden Landscaping Design",
    description:
      "Complete garden design and landscaping for residential property",
    category: "Landscaping",
    subCategory: "Garden Design",
    price: 200000,
    currency: "NGN",
    status: "pending",
    paymentStatus: "pending",
    orderDate: "2024-01-17",
    expectedCompletionDate: "2024-02-17",
    quantity: 1,
    seller: {
      id: "seller-6",
      name: "Emmanuel Kalu",
      businessName: "Green Thumb Landscaping",
      profileImage: require("../../assets/images/ProfilePic.png"),
      rating: 4.6,
      reviewCount: 45,
      location: "Abuja, Nigeria",
      phone: "+234 806 789 0123",
      email: "emmanuel@greenthumb.com",
      isVerified: true,
      responseTime: "Within 4 hours",
      completionRate: 92,
      specialties: ["Garden Design", "Lawn Care", "Tree Services"],
    },
    serviceDetails: {
      type: "service",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      requirements: ["Site survey", "Design preferences", "Budget approval"],
      timeline: "4-6 weeks",
      materials: ["Plants", "Soil", "Irrigation system", "Decorative stones"],
    },
    location: {
      address: "987 Asokoro, Abuja",
      city: "Abuja",
      state: "FCT",
    },
    communication: {
      lastMessage: "Site survey completed. Design proposal ready for review",
      messageCount: 9,
      lastMessageTime: "2024-01-18T16:45:00Z",
    },
  },
];

// Filter orders by status
export const filterOrdersByStatus = (
  orders: OrderItem[],
  status: string
): OrderItem[] => {
  if (status === "All order") return orders;
  if (status === "Pending")
    return orders.filter((order) => order.status === "pending");
  if (status === "Paid")
    return orders.filter((order) => order.paymentStatus === "paid");
  return orders;
};

// Get order status color
export const getOrderStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "#B97502";
    case "confirmed":
      return "#3b82f6";
    case "in_progress":
      return "#f59e0b";
    case "completed":
      return "#10b981";
    case "cancelled":
      return "#ef4444";
    case "paid":
      return "#06C167";
    default:
      return "#6b7280";
  }
};

// Get order status text
export const getOrderStatusText = (status: string): string => {
  switch (status) {
    case "pending":
      return "Pending";
    case "confirmed":
      return "Confirmed";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    case "paid":
      return "Paid";
    default:
      return status;
  }
};

// Format currency
export const formatCurrency = (
  amount: number,
  currency: string = "NGN"
): string => {
  return `${currency} ${amount.toLocaleString()}`;
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

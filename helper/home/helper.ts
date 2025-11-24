import {
  chatIcon,
  chatIcon2,
  homeIcon,
  homeIcon2,
  orderIcon,
  orderIcon2,
  walletIcon,
  walletIcon2,
} from "../../assets/svgs/svgs";

export const navIcons = [
  { text: "Home", inactiveIcon: homeIcon, activeIcon: homeIcon2 },
  { text: "Order", inactiveIcon: orderIcon, activeIcon: orderIcon2 },
  { text: "Chat", inactiveIcon: chatIcon, activeIcon: chatIcon2 },
  { text: "Wallet", inactiveIcon: walletIcon, activeIcon: walletIcon2 },
];

export const categories = [
  "All Categories",
  "Plumbing",
  "Carpentry",
  "Cleaning",
  "Nanny",
  "Welding",
];

// Comprehensive category data with sub-categories
export const categoryData = [
  {
    id: "all",
    name: "All Categories",
    icon: "🏠",
    description: "Browse all available services",
    subCategories: [],
    color: "#6366f1",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "🔧",
    description: "Professional plumbing services",
    subCategories: [
      "Pipe Installation & Repair",
      "Drain Cleaning",
      "Water Heater Services",
      "Bathroom Remodeling",
      "Kitchen Plumbing",
      "Emergency Repairs",
      "Leak Detection",
      "Sewer Services",
    ],
    color: "#3b82f6",
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: "🔨",
    description: "Expert woodworking and construction",
    subCategories: [
      "Furniture Making",
      "Cabinet Installation",
      "Door & Window Installation",
      "Deck Building",
      "Custom Shelving",
      "Repair Services",
      "Wood Flooring",
      "Trim Work",
    ],
    color: "#f59e0b",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "🧹",
    description: "Professional cleaning services",
    subCategories: [
      "House Cleaning",
      "Office Cleaning",
      "Deep Cleaning",
      "Move-in/Move-out",
      "Window Cleaning",
      "Carpet Cleaning",
      "Post-Construction",
      "Regular Maintenance",
    ],
    color: "#10b981",
  },
  {
    id: "nanny",
    name: "Nanny & Childcare",
    icon: "👶",
    description: "Trusted childcare services",
    subCategories: [
      "Full-time Nanny",
      "Part-time Care",
      "Babysitting",
      "Tutoring",
      "Special Needs Care",
      "Emergency Care",
      "Overnight Care",
      "Summer Programs",
    ],
    color: "#ec4899",
  },
  {
    id: "welding",
    name: "Welding",
    icon: "⚡",
    description: "Professional welding services",
    subCategories: [
      "Metal Fabrication",
      "Structural Welding",
      "Auto Body Repair",
      "Custom Metalwork",
      "Pipe Welding",
      "Emergency Repairs",
      "Artistic Welding",
      "Industrial Services",
    ],
    color: "#ef4444",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "⚡",
    description: "Licensed electrical services",
    subCategories: [
      "Wiring Installation",
      "Outlet & Switch Repair",
      "Light Fixture Installation",
      "Circuit Breaker Services",
      "Emergency Electrical",
      "Smart Home Setup",
      "Generator Installation",
      "Electrical Inspections",
    ],
    color: "#fbbf24",
  },
  {
    id: "painting",
    name: "Painting",
    icon: "🎨",
    description: "Professional painting services",
    subCategories: [
      "Interior Painting",
      "Exterior Painting",
      "Cabinet Refinishing",
      "Wallpaper Removal",
      "Pressure Washing",
      "Color Consultation",
      "Commercial Painting",
      "Touch-up Services",
    ],
    color: "#8b5cf6",
  },
  {
    id: "landscaping",
    name: "Landscaping",
    icon: "🌱",
    description: "Beautiful outdoor spaces",
    subCategories: [
      "Lawn Care",
      "Garden Design",
      "Tree Services",
      "Irrigation Systems",
      "Hardscaping",
      "Seasonal Cleanup",
      "Pest Control",
      "Maintenance Plans",
    ],
    color: "#059669",
  },
];

// Get category by ID
export const getCategoryById = (id: string) => {
  return categoryData.find((category) => category.id === id);
};

// Get all sub-categories for a category
export const getSubCategories = (categoryId: string) => {
  const category = getCategoryById(categoryId);
  return category ? category.subCategories : [];
};

// Search categories by name
export const searchCategories = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return categoryData.filter(
    (category) =>
      category.name.toLowerCase().includes(lowercaseQuery) ||
      category.subCategories.some((sub) =>
        sub.toLowerCase().includes(lowercaseQuery)
      )
  );
};

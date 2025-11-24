import { StyleSheet } from "react-native";
import { primaryBlack, primaryColor, grayText, secondaryColor } from "../colors";

export const sellerProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  
  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  
  backButton: {
    fontSize: 16,
    color: primaryColor,
    fontWeight: "500",
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: primaryBlack,
  },
  
  // Card styles
  card: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 12,
  },
  
  // Seller info styles
  sellerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  
  sellerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  
  sellerName: {
    fontSize: 20,
    fontWeight: "700",
    color: primaryBlack,
    marginRight: 8,
  },
  
  verifiedBadge: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  
  verifiedText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  
  businessName: {
    fontSize: 16,
    color: grayText,
    marginBottom: 8,
  },
  
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  
  starRating: {
    fontSize: 14,
    marginRight: 4,
  },
  
  ratingValue: {
    fontSize: 14,
    color: primaryBlack,
    fontWeight: "600",
    marginRight: 8,
  },
  
  reviewCount: {
    fontSize: 14,
    color: grayText,
  },
  
  location: {
    fontSize: 14,
    color: grayText,
  },
  
  description: {
    fontSize: 14,
    color: primaryBlack,
    lineHeight: 20,
    marginBottom: 16,
  },
  
  // Stats styles
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  
  statItem: {
    flex: 1,
    marginRight: 8,
  },
  
  statItemLast: {
    flex: 1,
    marginLeft: 8,
  },
  
  statLabel: {
    fontSize: 12,
    color: grayText,
    marginBottom: 2,
  },
  
  statValue: {
    fontSize: 14,
    color: primaryBlack,
    fontWeight: "500",
  },
  
  // Contact button styles
  contactButton: {
    backgroundColor: primaryColor,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  
  contactButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  
  // Specialties styles
  specialtiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  
  specialtyTag: {
    backgroundColor: secondaryColor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  
  specialtyText: {
    fontSize: 12,
    color: primaryBlack,
    fontWeight: "500",
  },
  
  // Portfolio styles
  portfolioContainer: {
    flexDirection: "row",
  },
  
  portfolioImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  
  // Tabs styles
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 4,
  },
  
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  
  tabButtonActive: {
    backgroundColor: primaryColor,
  },
  
  tabButtonInactive: {
    backgroundColor: "transparent",
  },
  
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  
  tabTextActive: {
    color: "white",
  },
  
  tabTextInactive: {
    color: grayText,
  },
  
  // Content styles
  contentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 16,
  },
  
  // Product card styles
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 200,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 4,
  },
  
  productDescription: {
    fontSize: 12,
    color: grayText,
    marginBottom: 8,
  },
  
  productRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  
  productStarRating: {
    fontSize: 12,
    marginRight: 4,
  },
  
  productReviewCount: {
    fontSize: 12,
    color: grayText,
  },
  
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: primaryBlack,
    marginBottom: 8,
  },
  
  bookButton: {
    backgroundColor: primaryColor,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  
  bookButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  
  // Review card styles
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  
  customerImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  
  customerInfo: {
    flex: 1,
  },
  
  customerName: {
    fontSize: 14,
    fontWeight: "600",
    color: primaryBlack,
    marginRight: 8,
  },
  
  reviewVerifiedBadge: {
    backgroundColor: "#10b981",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  
  reviewVerifiedText: {
    fontSize: 8,
    color: "white",
    fontWeight: "600",
  },
  
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  reviewStarRating: {
    fontSize: 12,
    marginRight: 4,
  },
  
  reviewDate: {
    fontSize: 12,
    color: grayText,
  },
  
  reviewTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 4,
  },
  
  reviewComment: {
    fontSize: 14,
    color: primaryBlack,
    lineHeight: 20,
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  loadingText: {
    marginTop: 12,
    color: grayText,
    fontSize: 16,
  },
  
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  
  errorTitle: {
    fontSize: 18,
    color: primaryBlack,
    textAlign: "center",
    marginBottom: 16,
  },
  
  errorButton: {
    backgroundColor: primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  
  errorButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});


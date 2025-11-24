import { StyleSheet } from "react-native";
import { primaryBlack, primaryColor, grayText, secondaryColor } from "../colors";

export const orderDetailsStyles = StyleSheet.create({
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
    padding: 16,
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
    marginBottom: 16,
  },
  
  // Order status styles
  orderStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  
  orderNumber: {
    fontSize: 14,
    color: grayText,
    fontWeight: "500",
  },
  
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  
  // Service info styles
  serviceInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  
  serviceIconText: {
    fontSize: 18,
  },
  
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 4,
  },
  
  serviceSubtitle: {
    fontSize: 12,
    color: grayText,
  },
  
  serviceDescription: {
    fontSize: 14,
    color: primaryBlack,
    lineHeight: 20,
    marginBottom: 12,
  },
  
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: primaryBlack,
  },
  
  orderDate: {
    fontSize: 12,
    color: grayText,
  },
  
  // Progress styles
  progressContainer: {
    marginBottom: 16,
  },
  
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  
  progressStep: {
    fontSize: 14,
    color: primaryBlack,
    fontWeight: "500",
  },
  
  progressPercentage: {
    fontSize: 12,
    color: grayText,
  },
  
  progressBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 16,
  },
  
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 3,
  },
  
  progressStepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  
  progressStepIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  
  progressStepText: {
    fontSize: 14,
    fontWeight: "400",
  },
  
  // Seller info styles
  sellerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  
  sellerName: {
    fontSize: 16,
    fontWeight: "600",
    color: primaryBlack,
    marginRight: 8,
  },
  
  verifiedBadge: {
    backgroundColor: "#10b981",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  
  verifiedText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  
  businessName: {
    fontSize: 14,
    color: grayText,
    marginBottom: 4,
  },
  
  sellerStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  rating: {
    fontSize: 12,
    color: grayText,
    marginRight: 12,
  },
  
  location: {
    fontSize: 12,
    color: grayText,
  },
  
  sellerStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
  
  // Service details styles
  detailItem: {
    marginBottom: 12,
  },
  
  detailLabel: {
    fontSize: 12,
    color: grayText,
    marginBottom: 4,
  },
  
  detailValue: {
    fontSize: 14,
    color: primaryBlack,
    fontWeight: "500",
  },
  
  detailValueCapitalize: {
    fontSize: 14,
    color: primaryBlack,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  
  requirementItem: {
    fontSize: 14,
    color: primaryBlack,
    marginBottom: 2,
  },
  
  // Location styles
  locationAddress: {
    fontSize: 14,
    color: primaryBlack,
    marginBottom: 4,
  },
  
  locationCity: {
    fontSize: 12,
    color: grayText,
  },
  
  // Communication styles
  communicationContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
  },
  
  communicationHeader: {
    fontSize: 12,
    color: grayText,
    marginBottom: 8,
  },
  
  lastMessage: {
    fontSize: 14,
    color: primaryBlack,
    lineHeight: 20,
  },
  
  // Action buttons styles
  actionButtonsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  
  actionButtonPrimary: {
    backgroundColor: "#3b82f6",
    marginRight: 8,
  },
  
  actionButtonSuccess: {
    backgroundColor: "#10b981",
    marginRight: 8,
  },
  
  actionButtonSecondary: {
    backgroundColor: "#f3f4f6",
    marginLeft: 8,
  },
  
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  
  actionButtonTextPrimary: {
    color: "white",
  },
  
  actionButtonTextSecondary: {
    color: primaryBlack,
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


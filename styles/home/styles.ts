import { StyleSheet } from "react-native";
import { primaryBlack, primaryColor, secondaryColor, white } from "../colors";
import { headerFontWeight } from "../fonts";
import {
  mainHeaderFontSize,
  primaryBorderRadius,
  primaryBorderWidth,
  primaryGap,
  primaryLineHeight,
  primaryMargin,
  primaryPadding,
  tertiaryPadding,
} from "../topography";

export const styles = StyleSheet.create({
  appContainer: {
    paddingHorizontal: tertiaryPadding,
    paddingTop: tertiaryPadding,
    backgroundColor: "white",
    flex: 1,
  },
  logoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  guestCTA: {},
  headerSection: {
    fontSize: mainHeaderFontSize,
    fontWeight: headerFontWeight,
    color: primaryBlack,
    marginBottom: primaryMargin,
  },
  navBlock: { flex: 1 },
  navContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: primaryGap,
    marginVertical: 20,
  },
  lasthandieGroup: {
    marginBottom: 100,
  },
  scrollView: {
    backgroundColor: white,
    flex: 1,
  },
  navItems: {
    borderColor: secondaryColor,
    paddingVertical: primaryPadding,
    paddingHorizontal: 18,
    color: primaryColor,
    borderWidth: primaryBorderWidth,
    backgroundColor: white,
    borderRadius: primaryBorderRadius,
    lineHeight: primaryLineHeight,
    width: "49%",
    textAlign: "center",
  },
  navItemActive: {
    backgroundColor: primaryColor,
    textAlign: "center",
  },
  navItemActiveText: {
    color: white,
    textAlign: "center",
  },
  navItemInactiveText: {
    color: primaryColor,
  },

  // Hero Section Styles
  heroSection: {
    backgroundColor: primaryColor,
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: white,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 16,
    color: white,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
    opacity: 0.9,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 8,
    paddingVertical: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: white,
    borderRadius: 8,
    paddingVertical: 12,
  },

  // Section Styles
  sectionContainer: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: primaryBlack,
  },
  viewAllText: {
    fontSize: 14,
    color: primaryColor,
    fontWeight: "600",
  },

  // Products Section
  productsContainer: {
    paddingRight: 16,
  },
  productCardWrapper: {
    marginRight: 12,
    width: 200,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    color: primaryBlack,
    fontSize: 14,
  },

  // Services Section
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "48%",
    marginBottom: 12,
  },

  // Testimonials Section
  testimonialsContainer: {
    paddingRight: 16,
  },
  testimonialCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 280,
    minHeight: 120,
  },
  testimonialText: {
    fontSize: 14,
    color: primaryBlack,
    lineHeight: 20,
    marginBottom: 12,
    fontStyle: "italic",
  },
  testimonialAuthor: {
    alignItems: "flex-start",
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: primaryBlack,
  },
  authorLocation: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  // Features Section
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: primaryBlack,
    textAlign: "center",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },

  // CTA Section
  ctaSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryBlack,
    textAlign: "center",
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  ctaButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  ctaPrimaryButton: {
    flex: 1,
    backgroundColor: primaryColor,
    borderRadius: 8,
    paddingVertical: 12,
  },
  ctaSecondaryButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: primaryColor,
    borderRadius: 8,
    paddingVertical: 12,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  emptyStateButton: {
    backgroundColor: primaryColor,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

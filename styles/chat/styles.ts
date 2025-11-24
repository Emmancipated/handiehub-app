import { StyleSheet } from "react-native";
import {
  black100,
  grayText,
  primaryBlack,
  primaryColor,
  primaryOrange,
  secondaryColor,
  white,
} from "../../styles/colors";
import { headerFontSize, mainHeaderFontSize } from "../../styles/topography";
import {
  headerFontWeight,
  regularFontSize,
  regularFontWeight,
  subHeaderFontWeight,
} from "../../styles/fonts";

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: white,
  },
  headerSection: {
    fontSize: 20,
    fontWeight: headerFontWeight,
    color: black100,
  },
  headerMini: {
    fontSize: 14,
    fontWeight: "400",
    color: grayText,
  },
  leftArrow: {
    transform: [{ rotate: "90deg" }],
    fontWeight: subHeaderFontWeight,
  },

  imageStyleHead: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },

  imageWrapper: {
    paddingTop: 32,
  },
  imageStyle: {
    width: 120,
    borderRadius: 100,
    resizeMode: "contain",
    alignSelf: "center",
    height: 120,
  },
  cardName: {
    // flex: 1,
    flexDirection: "row",
    gap: 4,
    marginVertical: 14,
    alignItems: "center",
    alignSelf: "center",
  },
  handieName: {
    fontSize: headerFontSize,
    color: primaryBlack,
    fontWeight: subHeaderFontWeight,
  },
  regularFont: {
    color: grayText,
    fontWeight: regularFontWeight,
    textAlign: "center",
  },
  ratingNumber: {
    color: primaryOrange,
    fontSize: regularFontSize,
    fontWeight: regularFontWeight,
  },
  ratingCount: {
    color: grayText,
  },
  messageButton: {
    backgroundColor: secondaryColor,
    paddingHorizontal: 32,
    paddingVertical: 14,
    gap: 8,
    borderRadius: 100,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "600",
    color: primaryColor,
  },
});

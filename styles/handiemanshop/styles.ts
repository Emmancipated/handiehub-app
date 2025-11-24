import { StyleSheet } from "react-native";
import { primaryBlack, primaryColor, white } from "../colors";
import { mainHeaderFontSize } from "..//topography";
import { headerFontWeight, subHeaderFontWeight } from "../fonts";

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: white,
  },
  headerSection: {
    fontSize: mainHeaderFontSize,
    fontWeight: headerFontWeight,
    color: primaryBlack,
  },
  headerLink: {
    color: primaryColor,
    fontWeight: subHeaderFontWeight,
  },
  leftArrow: {
    transform: [{ rotate: "90deg" }],
    fontWeight: subHeaderFontWeight,
  },
  actionButtonWrapper: {
    marginVertical: 30,
  },
});

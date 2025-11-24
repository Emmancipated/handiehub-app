import { Dimensions, StyleSheet } from "react-native";
import { primaryBlack, white } from "../../styles/colors";
import { headerFontWeight } from "../../styles/fonts";
import {
  mainHeaderFontSize,
  primaryGap,
  tertiaryPadding,
} from "../../styles/topography";

const { width } = Dimensions.get("window");
const gap = 12;
const itemsPerRow = 2;
const totalGapSize = (itemsPerRow - 1) * gap;
const windowWidth = width - tertiaryPadding * 2;
const childWidth = (windowWidth - totalGapSize) / itemsPerRow;

export const styles = StyleSheet.create({
  appContainer: {
    // paddingHorizontal: tertiaryPadding,
    // backgroundColor: white,
    paddingHorizontal: tertiaryPadding,
    paddingTop: tertiaryPadding,
    backgroundColor: "white",
    flex: 1,
  },
  headerSection: {
    fontSize: mainHeaderFontSize,
    fontWeight: headerFontWeight,
    color: primaryBlack,
  },
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
  },
  gridItem: {
    marginHorizontal: gap / 2,
    minWidth: childWidth,
    maxWidth: childWidth,
    marginVertical: gap / 2,
  },
});

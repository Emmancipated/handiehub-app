import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { primaryColor, secondaryColor, white } from "../../../styles/colors";

import {
  primaryBorderRadius,
  primaryBorderWidth,
  primaryLineHeight,
  primaryPadding,
  secondaryPadding,
} from "../../../styles/topography";
import { SvgXml } from "react-native-svg";

export const CategoryItem = ({
  category,
  activeIndex,
  svg,
  action,
}: {
  category: string;
  activeIndex: string;
  svg?: string;
  action: () => void;
}) => {
  return (
    <>
      <TouchableOpacity onPress={action} activeOpacity={0.7}>
        <View
          style={[
            styles.navItems,
            activeIndex ? styles.navItemActive : styles.navItems,
          ]}
        >
          <Text
            style={
              activeIndex
                ? styles.navItemActiveText
                : styles.navItemInactiveText
            }
          >
            {category}
          </Text>
          {svg && <SvgXml xml={svg} width="24px" height="24px" />}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  navItems: {
    borderColor: secondaryColor,
    paddingVertical: primaryPadding,
    paddingHorizontal: 18,
    color: primaryColor,
    borderWidth: primaryBorderWidth,
    backgroundColor: white,
    borderRadius: primaryBorderRadius,
    // lineHeight: primaryLineHeight,
    flexDirection: "row",
    // minHeight: 45,
  },
  navItemActive: {
    backgroundColor: primaryColor,
  },
  navItemActiveText: {
    color: white,
  },
  navItemInactiveText: {
    color: primaryColor,
  },
});

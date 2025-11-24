import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { primaryColor, secondaryColor, white } from "../../styles/colors";

import {
  primaryBorderRadius,
  primaryBorderWidth,
  primaryLineHeight,
  primaryPadding,
  secondaryPadding,
} from "../../styles/topography";
import { SvgXml } from "react-native-svg";
import { Link } from "expo-router";

export const ActionLink = ({
  bgColor,
  text,
  linkTo,
}: {
  bgColor: boolean;
  text: string;
  linkTo: string;
}) => {
  return (
    <>
      <TouchableOpacity activeOpacity={0.7}>
        <View
          style={[
            styles.navItems,
            bgColor ? styles.navItemActive : styles.navItems,
          ]}
        >
          <Link
            style={[
              bgColor ? styles.navItemActiveText : styles.navItemInactiveText,
            ]}
            href={linkTo}
          >
            {text}
          </Link>
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
    lineHeight: primaryLineHeight,
    flexDirection: "row",
    // display: "flex",
    // width: "100%",
    textAlign: "center",
  },
  navItemActive: {
    backgroundColor: primaryColor,
  },
  navItemActiveText: {
    color: white,
    // width: "100%",
    // textAlign: "center",
  },
  navItemInactiveText: {
    color: primaryColor,
  },
});

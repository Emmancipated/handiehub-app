import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { primaryColor, secondaryColor, white } from "../../styles/colors";

import {
  primaryBorderRadius,
  primaryBorderWidth,
  primaryLineHeight,
} from "../../styles/topography";

export const ActionLayoutButton = ({
  purpleColor,
  text,
  action,
  activated,
}: {
  purpleColor: boolean;
  text: string;
  action: () => void;
  activated: boolean;
}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ opacity: activated ? 1 : 0.5 }}
        onPress={action}
        disabled={!activated}
      >
        <View
          style={[
            styles.navItems,
            purpleColor ? styles.purpleBg : styles.lightBlue,
          ]}
        >
          <Text
            style={[
              styles.text,
              purpleColor ? styles.textPurple : styles.textLightBlue,
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  navItems: {
    borderColor: secondaryColor,
    paddingVertical: 12,
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
  purpleBg: { backgroundColor: primaryColor, color: white },
  lightBlue: { backgroundColor: secondaryColor, color: primaryColor },
  navItemActive: {
    backgroundColor: secondaryColor,
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
  textPurple: { color: white },
  textLightBlue: { color: primaryColor },
  navItemInactiveText: {
    color: white,
  },
});

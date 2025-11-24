import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { primaryColor, secondaryColor, white } from "../../../styles/colors";
import {
  primaryBorderRadius,
  primaryMargin,
  tertiaryPadding,
} from "../../../styles/topography";
import { regularFontSize, subHeaderFontWeight } from "../../../styles/fonts";
export const ActionButton = ({
  text,
  lightPurple,
  action,
  activateButton,
}: {
  text: string;
  lightPurple?: boolean;
  action?: () => void;
  activateButton: boolean;
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={action}
        disabled={activateButton}
        style={[activateButton && { opacity: 0.5 }]}
      >
        <Text style={[styles.buttonStyle, lightPurple && styles.lightPurple]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: primaryColor,
    padding: tertiaryPadding,
    marginTop: primaryMargin,
    borderRadius: primaryBorderRadius,
    textAlign: "center",
    fontWeight: subHeaderFontWeight,
    fontSize: regularFontSize,
    color: white,
  },
  lightPurple: {
    backgroundColor: secondaryColor,
    color: primaryColor,
  },
});

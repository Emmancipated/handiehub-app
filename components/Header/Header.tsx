import React from "react";
import { StyleSheet, View } from "react-native";
import { primaryMargin } from "../../styles/topography";

export const HeaderGroup = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.logoSection}>{children}</View>;
};

const styles = StyleSheet.create({
  logoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: primaryMargin,
    marginVertical: 30,
  },
});

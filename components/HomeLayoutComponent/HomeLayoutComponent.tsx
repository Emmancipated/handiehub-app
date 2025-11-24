import React from "react";
import { StyleSheet, View } from "react-native";

export const HomeLayoutComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <View style={styles.logoSection}>{children}</View>;
};

const styles = StyleSheet.create({
  logoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },
});

import React from "react";
import { Image, StyleSheet } from "react-native";

export const Logo = () => {
  return (
    <Image
      source={require("../../../assets/images/logo.png")}
      style={styles.logoStyle}
    />
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
});

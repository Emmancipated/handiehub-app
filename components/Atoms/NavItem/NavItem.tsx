import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { grayText, primaryColor } from "../../../styles/colors";
import { regularFontSize, subHeaderFontWeight } from "../../../styles/fonts";
import { primaryGap, primaryPadding } from "../../../styles/topography";

export const NavItem = ({
  text,
  svg,
  photo,
  activeNav,
  action,
}: {
  text: string;
  svg?: React.JSX.Element | null;
  photo?: string;
  activeNav: string;
  action: () => void;
}) => {
  return (
    <TouchableOpacity onPress={action} activeOpacity={0.8}>
      <View style={styles.navItem}>
        {photo &&
          (activeNav !== text ? (
            <View style={styles.inactiveProfilePic}>
              <Image
                source={require("../../../assets/images/Ellipse_15.png")}
                style={styles.profilePic}
                alt="profile-pic"
              />
            </View>
          ) : (
            <View style={styles.activeProfilePic}>
              <Image
                source={require("../../../assets/images/Ellipse_15.png")}
                style={styles.profilePic}
                alt="profile-pic"
              />
            </View>
          ))}
        {svg}
        <Text
          style={[
            styles.navText,
            activeNav === text ? styles.navActiveText : styles.navText,
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navItem: {
    flexDirection: "column",
    alignItems: "center",
    gap: primaryGap,
    padding: primaryPadding,
  },
  navText: {
    color: grayText,
    fontSize: regularFontSize,
    fontWeight: subHeaderFontWeight,
  },
  navActiveText: {
    color: primaryColor,
  },
  profilePic: {
    resizeMode: "contain",
    width: 22,
    height: 22,
    borderRadius: 12,
  },
  activeProfilePic: {
    backgroundColor: primaryColor,
    padding: 2,
    borderRadius: 24,
  },
  inactiveProfilePic: {
    padding: 2,
    borderRadius: 14,
  },
});

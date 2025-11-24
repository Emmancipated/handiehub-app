import { Tabs } from "expo-router";
import React from "react";

import {
  analyticsIcon,
  analyticsIcon2,
  orderIcon,
  orderIcon2,
  productsIcon,
  productsIcon2,
  walletIcon,
  walletIcon2,
} from "@/assets/svgs/svgs";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { primaryColor } from "@/styles/colors";
import { Image, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        animation: "shift",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SvgXml xml={analyticsIcon2} width="28px" height="28px" />
            ) : (
              <SvgXml xml={analyticsIcon} width="28px" height="28px" />
            ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Order",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SvgXml xml={orderIcon2} width="28px" height="28px" />
            ) : (
              <SvgXml xml={orderIcon} width="28px" height="28px" />
            ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SvgXml xml={productsIcon2} width="28px" height="28px" />
            ) : (
              <SvgXml xml={productsIcon} width="28px" height="28px" />
            ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SvgXml xml={walletIcon2} width="28px" height="28px" />
            ) : (
              <SvgXml xml={walletIcon} width="28px" height="28px" />
            ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={require("../../../assets/images/Ellipse_15.png")}
                style={[styles.profilePic, styles.activeProfilePic]}
                alt="profile-pic"
              />
            ) : (
              <Image
                source={require("../../../assets/images/Ellipse_15.png")}
                style={styles.profilePic}
                alt="profile-pic"
              />
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    resizeMode: "contain",
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
  },
  activeProfilePic: {
    borderColor: primaryColor,
  },
});

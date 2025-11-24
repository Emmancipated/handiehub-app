import {
  chatIcon,
  chatIcon2,
  homeIcon3,
  homeIcon4,
  orderIcon,
  orderIcon2,
  walletIcon,
  walletIcon2,
} from "@/assets/svgs/svgs";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { primaryColor } from "@/styles/colors";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
const ThemeColour = {
  darker: "#000000",
  lighter: "#ffffff",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = useColorScheme() === "dark";
  const [showTab, setShowTab] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? ThemeColour.darker : ThemeColour.lighter,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        animation: "shift",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: showTab ? "flex" : "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SvgXml xml={homeIcon4} width="28px" height="28px" />
            ) : (
              <SvgXml xml={homeIcon3} width="28px" height="28px" />
            ),
        }}
      />
      <Tabs.Screen
        name="order"
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
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <SvgXml xml={chatIcon2} width="28px" height="28px" />
            ) : (
              <SvgXml xml={chatIcon} width="28px" height="28px" />
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
        name="userprofile"
        options={{
          title: "More",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Image
                source={require("../../assets/images/Ellipse_15.png")}
                // style={[styles.profilePic, styles.activeProfilePic]}
                style={styles.profilePic}
                alt="profile-pic"
              />
            ) : (
              <Image
                source={require("../../assets/images/Ellipse_15.png")}
                // style={styles.profilePic}
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

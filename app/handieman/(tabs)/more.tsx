import {
  analyticsIcon,
  backArrowIcon,
  editPen,
  userIcon,
} from "@/assets/svgs/svgs";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  foundationGray100,
  grayText,
  primaryBlack,
  primaryColor,
  white,
} from "@/styles/colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
const SellerTab = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleLogout = () => {
    // Implement logout logic here
    router.replace("/auth/login");
  };

  const menuItems = [
    {
      id: "profile",
      title: "Profile",
      subtitle: "Manage your personal information",
      icon: userIcon,
      action: () => router.push("/user/profile" as any),
    },
    {
      id: "addresses",
      title: "Delivery Addresses",
      subtitle: "Manage your delivery locations",
      icon: analyticsIcon,
      action: () => router.push("/user/profile" as any),
    },
    {
      id: "settings",
      title: "Account Settings",
      subtitle: "Privacy, notifications, and more",
      icon: editPen,
      action: () => router.push("/user/profile" as any),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/user/profile" as any)}
        >
          <SvgXml xml={editPen} width="20" height="20" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../../assets/images/ProfilePic.png")}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          <Text style={styles.memberSince}>Member since January 2024</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Addresses</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <SvgXml xml={item.icon} width="24" height="24" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <SvgXml xml={backArrowIcon} width="16" height="16" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutLeft}>
            <SvgXml xml={userIcon} width="24" height="24" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>HandieHub v1.0.0</Text>
          <Text style={styles.appCopyright}>
            © 2024 HandieHub. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: foundationGray100,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryBlack,
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: primaryColor,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryBlack,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: grayText,
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    color: grayText,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: foundationGray100,
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 32,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: grayText,
  },
  menuContainer: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: foundationGray100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: foundationGray100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: grayText,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  logoutLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  appInfo: {
    alignItems: "center",
    paddingBottom: 32,
  },
  appVersion: {
    fontSize: 14,
    color: grayText,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: grayText,
    textAlign: "center",
  },
});

export default SellerTab;

import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  backArrowIcon,
  editIcon,
  locationIcon,
  logoutIcon,
  plusIcon,
  settingsIcon,
  userIcon,
} from "@/assets/svgs/svgs";
import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import {
  foundationGray100,
  grayText,
  primaryBlack,
  primaryColor,
  white,
} from "@/styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
interface DeliveryAddress {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  isDefault: boolean;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  joinDate: string;
}

const UserProfilePage = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const { tab } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState<
    "profile" | "addresses" | "settings"
  >("profile");

  useEffect(() => {
    if (tab && ["profile", "addresses", "settings"].includes(tab as string)) {
      setActiveTab(tab as "profile" | "addresses" | "settings");
    }
  }, [tab]);

  // Mock user data - replace with actual data from context/API
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    profileImage: require("../../assets/images/ProfilePic.png"),
    joinDate: "January 2024",
  });

  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>(
    [
      {
        id: "1",
        name: "Home",
        address: "123 Victoria Island, Lagos",
        city: "Lagos",
        state: "Lagos State",
        phone: "+234 801 234 5678",
        isDefault: true,
      },
      {
        id: "2",
        name: "Office",
        address: "456 Ikoyi, Lagos",
        city: "Lagos",
        state: "Lagos State",
        phone: "+234 802 345 6789",
        isDefault: false,
      },
    ]
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Implement logout logic here
          router.replace("/auth/login");
        },
      },
    ]);
  };

  const handleAddAddress = () => {
    router.push("/user/add-address");
  };

  const handleEditProfile = () => {
    router.push("/user/edit-profile");
  };

  const handleEditAddress = (addressId: string) => {
    router.push(`/user/edit-address/${addressId}`);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setDeliveryAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  const renderProfileTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            source={userProfile.profileImage}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.editImageButton}
            onPress={handleEditProfile}
          >
            <SvgXml xml={editIcon} width="16" height="16" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileEmail}>{userProfile.email}</Text>
        <Text style={styles.joinDate}>Member since {userProfile.joinDate}</Text>
      </View>

      {/* Profile Actions */}
      <View style={styles.profileActions}>
        <TouchableOpacity style={styles.actionItem} onPress={handleEditProfile}>
          <View style={styles.actionLeft}>
            <SvgXml xml={userIcon} width="24" height="24" />
            <Text style={styles.actionText}>Edit Profile</Text>
          </View>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionLeft}>
            <SvgXml xml={settingsIcon} width="24" height="24" />
            <Text style={styles.actionText}>Account Settings</Text>
          </View>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={handleLogout}>
          <View style={styles.actionLeft}>
            <SvgXml xml={logoutIcon} width="24" height="24" />
            <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
          </View>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>
      </View>

      {/* Account Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Account Overview</Text>
        <View style={styles.statsGrid}>
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
      </View>
    </ScrollView>
  );

  const renderAddressesTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.addressesHeader}>
        <Text style={styles.sectionTitle}>Delivery Addresses</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
          <SvgXml xml={plusIcon} width="16" height="16" />
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
      </View>

      {deliveryAddresses.map((address) => (
        <View key={address.id} style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <View style={styles.addressTitleRow}>
              <Text style={styles.addressName}>{address.name}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.editAddressButton}
              onPress={() => handleEditAddress(address.id)}
            >
              <SvgXml xml={editIcon} width="16" height="16" />
            </TouchableOpacity>
          </View>

          <Text style={styles.addressText}>{address.address}</Text>
          <Text style={styles.addressText}>
            {address.city}, {address.state}
          </Text>
          <Text style={styles.addressPhone}>{address.phone}</Text>

          {!address.isDefault && (
            <TouchableOpacity
              style={styles.setDefaultButton}
              onPress={() => handleSetDefaultAddress(address.id)}
            >
              <Text style={styles.setDefaultText}>Set as Default</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {deliveryAddresses.length === 0 && (
        <View style={styles.emptyState}>
          <SvgXml xml={locationIcon} width="48" height="48" />
          <Text style={styles.emptyStateTitle}>No Addresses Yet</Text>
          <Text style={styles.emptyStateText}>
            Add your first delivery address to get started with orders
          </Text>
          <ActionButton
            text="Add Address"
            action={handleAddAddress}
            activateButton={false}
          />
        </View>
      )}
    </ScrollView>
  );

  const renderSettingsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Account Settings</Text>

      {/* Notification Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <TouchableOpacity style={styles.toggleButton}>
            <View style={styles.toggleActive} />
          </TouchableOpacity>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email Notifications</Text>
          <TouchableOpacity style={styles.toggleButton}>
            <View style={styles.toggleActive} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Privacy Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>Privacy</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy Policy</Text>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Terms of Service</Text>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>Support</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Help Center</Text>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Contact Us</Text>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Report a Problem</Text>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>App Information</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>About HandieHub</Text>
          <SvgXml xml={backArrowIcon} width="16" height="16" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <SvgXml xml={backArrowIcon} width="24" height="24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "profile" && styles.activeTab]}
          onPress={() => setActiveTab("profile")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "profile" && styles.activeTabText,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "addresses" && styles.activeTab]}
          onPress={() => setActiveTab("addresses")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "addresses" && styles.activeTabText,
            ]}
          >
            Addresses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "settings" && styles.activeTab]}
          onPress={() => setActiveTab("settings")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "settings" && styles.activeTabText,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === "profile" && renderProfileTab()}
      {activeTab === "addresses" && renderAddressesTab()}
      {activeTab === "settings" && renderSettingsTab()}
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: primaryBlack,
  },
  headerRight: {
    width: 40,
  },
  tabNavigation: {
    flexDirection: "row",
    backgroundColor: white,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: foundationGray100,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: primaryColor,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: grayText,
  },
  activeTabText: {
    color: primaryColor,
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: primaryColor,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: primaryColor,
    borderRadius: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: white,
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
  joinDate: {
    fontSize: 14,
    color: grayText,
  },
  profileActions: {
    marginBottom: 32,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: foundationGray100,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: primaryBlack,
    marginLeft: 12,
  },
  logoutText: {
    color: "#FF3B30",
  },
  statsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: primaryBlack,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: foundationGray100,
    borderRadius: 12,
    paddingVertical: 20,
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
  addressesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  addressCard: {
    backgroundColor: white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: foundationGray100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  addressTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressName: {
    fontSize: 16,
    fontWeight: "600",
    color: primaryBlack,
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: primaryColor,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultBadgeText: {
    color: white,
    fontSize: 10,
    fontWeight: "600",
  },
  editAddressButton: {
    padding: 4,
  },
  addressText: {
    fontSize: 14,
    color: grayText,
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 14,
    color: grayText,
    marginBottom: 8,
  },
  setDefaultButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },
  setDefaultText: {
    fontSize: 14,
    color: primaryColor,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: primaryBlack,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: grayText,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  settingsSection: {
    marginBottom: 32,
    paddingTop: 20,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: foundationGray100,
  },
  settingLabel: {
    fontSize: 16,
    color: primaryBlack,
  },
  settingValue: {
    fontSize: 14,
    color: grayText,
  },
  toggleButton: {
    width: 50,
    height: 30,
    backgroundColor: foundationGray100,
    borderRadius: 15,
    padding: 2,
  },
  toggleActive: {
    width: 26,
    height: 26,
    backgroundColor: primaryColor,
    borderRadius: 13,
    marginLeft: 22,
  },
});

export default UserProfilePage;

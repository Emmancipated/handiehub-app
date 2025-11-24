import { backArrowIcon, cameraAction } from "@/assets/svgs/svgs";
import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  foundationGray100,
  grayText,
  primaryBlack,
  primaryColor,
  white,
} from "@/styles/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
const EditProfilePage = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    profileImage: require("../../assets/images/ProfilePic.png"),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (validateForm()) {
      // Here you would typically save the profile to your backend/context
      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
  };

  const handleChangeProfileImage = () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      {
        text: "Take Photo",
        onPress: () => {
          // Implement camera functionality
          console.log("Take photo");
        },
      },
      {
        text: "Choose from Gallery",
        onPress: () => {
          // Implement gallery picker
          console.log("Choose from gallery");
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image source={formData.profileImage} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.changeImageButton}
              onPress={handleChangeProfileImage}
            >
              <SvgXml xml={cameraAction} width="20" height="20" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileImageText}>
            Tap to change profile picture
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              placeholderTextColor={grayText}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email address"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              placeholderTextColor={grayText}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              placeholderTextColor={grayText}
              keyboardType="phone-pad"
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          {/* Account Info */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>January 2024</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Account Status</Text>
              <Text style={[styles.infoValue, styles.statusActive]}>
                Active
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>Today</Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <ActionButton
            text="Save Changes"
            action={handleSaveProfile}
            activateButton={false}
          />
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: primaryColor,
  },
  changeImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: primaryColor,
    borderRadius: 20,
    padding: 8,
    borderWidth: 3,
    borderColor: white,
  },
  profileImageText: {
    fontSize: 14,
    color: grayText,
    textAlign: "center",
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: foundationGray100,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: primaryBlack,
    backgroundColor: white,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
  infoSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: foundationGray100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: primaryBlack,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: foundationGray100,
  },
  infoLabel: {
    fontSize: 16,
    color: grayText,
  },
  infoValue: {
    fontSize: 16,
    color: primaryBlack,
    fontWeight: "500",
  },
  statusActive: {
    color: "#30B42D",
  },
  buttonContainer: {
    paddingBottom: 32,
  },
});

export default EditProfilePage;

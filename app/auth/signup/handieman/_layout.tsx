import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  // SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Slot,
  useRouter,
  usePathname,
  useGlobalSearchParams,
} from "expo-router";
import { Logo } from "@/components/Atoms/Logo/Logo";
import { primaryColor, primaryGray } from "@/styles/colors";
import { Animated } from "react-native";
import { ActionLink } from "@/components/Auth/ActionLink";
import { ActionLayoutLink } from "@/components/Auth/ActionLayoutLink";
import { ActionLayoutButton } from "@/components/Auth/ActionLayoutButton";
import { useAppContext } from "@/context/StoreContext";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { updateHandiemanSignup } from "@/services/authService";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

const Layout: React.FC = () => {
  const router = useRouter();
  const uploadedImagesRef = useRef<string[] | null>(null);
  const { appState, setAppState } = useAppContext();
  const {
    activateHandiemanButton,
    image,
    images,
    address,
    city,
    state,
    country,
    phone,
    profession,
    skills,
    description,
  } = appState.authState.handiemanSignUpForm;

  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(2);
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const params = useGlobalSearchParams();
  const [activateButton, setActivateButton] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });
  const [dp_url, setDp_url] = useState<string>("");

  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  const startAnimation = (animatedValue: Animated.Value, toPurple: boolean) => {
    Animated.timing(animatedValue, {
      toValue: toPurple ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const interpolatedColor1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [primaryGray, primaryColor],
  });

  const interpolatedColor2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [primaryGray, primaryColor],
  });

  const interpolatedColor3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [primaryGray, primaryColor],
  });

  const uploadToCloudinary = async (photoUri: string) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("file", {
      uri: photoUri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);

    formData.append(
      "upload_preset",
      process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
    formData.append("tags", "user-profile");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      setDp_url(data.secure_url);
      setAppState((prevState) => ({
        ...prevState,
        authState: {
          ...prevState.authState,
          handiemanSignUpForm: {
            ...prevState.authState.handiemanSignUpForm,
            image: data.secure_url,
            activateHandiemanButton: false,
          },
        },
      }));
      router.push("/auth/signup/handieman/handiemandetailtwo");
      setLoading(false);
      return data.secure_url; // URL of uploaded image
    } catch (error) {
      setLoading(false);
    }
  };
  const uploadImageToCloudinary = async (imageUri: string) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);
    formData.append(
      "upload_preset",
      process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
    formData.append("tags", "multi,upload");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(response, "response from uploading many");
    const data = await response.json();
    return data.secure_url; // or public_id, etc.
  };
  const uploadMultipleImages = async (imageUris: string[]) => {
    const uploadPromises = imageUris.map((uri) => uploadImageToCloudinary(uri));
    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls; // array of secure URLs
  };
  useEffect(() => {
    // Handle animation logic based on the current page
    startAnimation(animatedValue1, currentPage >= 1);
    startAnimation(animatedValue2, currentPage >= 2);
    startAnimation(animatedValue3, currentPage >= 3);
  }, [currentPage]);

  const handleHandiemanSignUp = async () => {
    switch (pathname) {
      case "/auth/signup/handieman/handiemandetailone":
        await uploadToCloudinary(image);
        // uploadProfileImage(image);
        break;
      case "/auth/signup/handieman/handiemandetailtwo":
        router.push("/auth/signup/handieman/handiemandetailthree");
        break;
      case "/auth/signup/handieman/handiemandetailthree":
        await handleUpdateHandieman();
        break;
      default:
        console.log("default");
        break;
    }
    console.log(pathname);
  };

  const handleUpdateHandieman = async () => {
    setLoading(true);

    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setApiResponse({
          responseType: "",
          response: "",
        });
      }, 2000);
    };

    try {
      // Only upload if not already uploaded
      if (!uploadedImagesRef.current) {
        uploadedImagesRef.current = await uploadMultipleImages(images);
      }

      const updateHandiemanPayload = {
        email: "emmancipationera@gmail.com", //I would user the email from the auth state
        address,
        city,
        state,
        country: country?.label,
        dp_url: dp_url,
        phoneNumber: phone,
        productsImageUrl: uploadedImagesRef.current, // use uploaded ones
        profession: [{ name: profession?.label, skills: skills }],
        description,
      };

      //       (alias) type UpdateHandiemanDto = {
      //     email?: string;
      //     dp_url?: string;
      //     country?: string;
      //     address?: string;
      //     state?: string;
      //     phoneNumber?: string;
      //     profession?: [{
      //         name?: string;
      //         skills?: [string, ...string[]];
      //     }, ...{
      //         name?: string;
      //         skills?: [string, ...string[]];
      //     }[]];
      //     productsImageUrl?: [...];
      // }
      console.log(image, "updateHandiemanPayload");
      const updated = await updateHandiemanSignup(updateHandiemanPayload);

      if (updated && updated?.data?.statusCode === 200) {
        setApiResponse({
          responseType: "success",
          response: updated?.data?.message,
        });
        setTimeout(() => {
          router.push({
            pathname: "/",
          });
        }, 3000);
      } else {
        setApiResponse({
          responseType: "failed",
          response: updated?.message,
        });
      }
      return updated;
    } catch (error) {
      console.log(error, "As an error");
    } finally {
      clearAll();
    }
  };

  useEffect(() => {
    // Handle page navigation logic
    switch (pathname) {
      case "/auth/signup/handieman/handiemandetailone":
        setCurrentPage(1);
        break;
      case "/auth/signup/handieman/handiemandetailtwo":
        setCurrentPage(2);
        break;
      case "/auth/signup/handieman/handiemandetailthree":
        setCurrentPage(3);
        break;
      default:
        setCurrentPage(1);
        break;
    }
  }, [pathname, currentPage, params]);

  console.log(appState.authState.handiemanSignUpForm, "from the main layout");

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Logo />
          </View>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              columnGap: 8,
            }}
          >
            <Animated.View
              style={[
                styles.animatedView,
                { backgroundColor: interpolatedColor1 },
              ]}
            />
            <Animated.View
              style={[
                styles.animatedView,
                { backgroundColor: interpolatedColor2 },
              ]}
            />
            <Animated.View
              style={[
                styles.animatedView,
                { backgroundColor: interpolatedColor3 },
              ]}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Slot />
        </View>

        <View style={styles.footer}>
          <View
            style={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
              marginVertical: "auto",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              columnGap: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <ActionLayoutButton
                purpleColor={false}
                text={"Back"}
                action={() => router.back()}
                activated={true}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ActionLayoutButton
                purpleColor={true}
                text={"Proceed"}
                action={handleHandiemanSignUp}
                activated={activateHandiemanButton}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    height: "12%",
    position: "relative",
    zIndex: 100,
    backgroundColor: "white",
  },
  logoSection: { alignItems: "center", marginVertical: 10 },
  animatedView: {
    width: "auto",
    height: 8,
    borderRadius: 10,
    flex: 1,
  },
  content: {
    height: "76%",
    position: "relative",
    zIndex: 90,
  },
  footer: {
    height: "12%",
    backgroundColor: "white",
    // flex: 1,
  },
  footerText: {
    fontSize: 16,
  },
});

export default Layout;

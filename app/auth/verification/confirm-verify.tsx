import {
  // SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "@/components/Atoms/Logo/Logo";
import { fontFamily } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import { verifyUserAccount } from "@/services/authService";
import SuccessSlideIn from "@/components/Notifications/Notificationslider";
import { useAppContext } from "@/context/StoreContext";
import { useRouter, useLocalSearchParams } from "expo-router";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
const ConfirmVerifyScreen = ({ navigation }: { navigation: any }) => {
  const { appState } = useAppContext();
  const isDarkMode = useColorScheme() === "dark";
  const { token } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });

  useEffect(() => {
    handleVerifyUserAccount();
  }, []);

  const handleVerifyUserAccount = async () => {
    const verifyAccountPayload = {
      email: appState?.authState?.signUpEmail,
      otp,
    };
    setLoading(true);
    const clearAll = () => {
      setLoading(false);
      setTimeout(() => {
        setApiResponse({
          responseType: "",
          response: "",
        });
      }, 5000);
    };
    try {
      const data = await verifyUserAccount(verifyAccountPayload);
      // setLoading(true);
      if (data && data?.data?.statusCode === 200) {
        setApiResponse({
          responseType: "success",
          response: data?.data?.message,
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setApiResponse({
          responseType: "failed",
          response: data?.message,
        });
      }
      return data;
    } catch (error) {
      console.log(error, "As an error");
      // setLoading(true);
      // setOpenModal(true);
      return error;
    } finally {
      clearAll();
    }
  };

  console.log(token);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.container}>
        <View style={styles.logoSection}>
          <Logo />
        </View>

        <View style={styles.headerContainer}>
          <Image source={require("@/assets/images/emailBox.png")} />
          <Text style={styles.headerText}>Verify your email address</Text>
        </View>
        <View style={styles.bannerHeader}>
          {apiResponse.response !== "" && (
            <Text style={styles.bannerText}>{apiResponse.response}</Text>
          )}
        </View>
        <View style={styles.redirectContainer}>
          <ActionButton
            text={"Unverified? Retry"}
            activateButton={false}
            action={handleVerifyUserAccount}
          />
        </View>
        <SuccessSlideIn
          openModal={apiResponse.responseType !== ""}
          responseType={apiResponse.responseType}
          successActionResponse={apiResponse.response}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmVerifyScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    // paddingTop: 40,
    backgroundColor: "white",
    height: "100%",
  },
  logoSection: { alignItems: "center", marginVertical: 16 },
  headerContainer: { alignItems: "center", marginVertical: 14 },
  headerText: {
    color: "#131313",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    // fontFamily: fontFamily,
  },
  bannerHeader: { alignItems: "center", marginVertical: 1 },
  bannerText: {
    color: "#868686",
    fontWeight: "700",
    fontSize: 14,
    fontFamily: fontFamily,
    // lineHeight: 32,
  },
  redirectContainer: { marginVertical: 16 },
});

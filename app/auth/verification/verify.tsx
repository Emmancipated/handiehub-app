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
import { useState } from "react";
import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import { activateButton } from "@/utils/Validators";
import { verifyUserAccount, resendVerification } from "@/services/authService";
import SuccessSlideIn from "@/components/Notifications/Notificationslider";
import { useAppContext } from "@/context/StoreContext";
import { OtpInput } from "react-native-otp-entry";
import tw from "twrnc";
import { useRouter } from "expo-router";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
const VerifyScreen = () => {
  const { appState } = useAppContext();
  const { signUpEmail } = appState.authState;
  const isDarkMode = useColorScheme() === "dark";
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });
  const router = useRouter();

  const handleOtpInput = async (otp: string) => {
    await handleVerifyUserAccount(otp);
  };

  const handleVerifyUserAccount = async (otp: string) => {
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

  const handleResendVerification = async () => {
    const resendVerificationPayload = {
      email: signUpEmail,
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
      const data = await resendVerification(resendVerificationPayload);
      // setLoading(true);
      if (data && data?.data?.statusCode === 200) {
        setApiResponse({
          responseType: "success",
          response: data?.data?.message,
        });
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
          <Text style={styles.bannerText}>
            Kindly check for the OTP sent to your email {""}
            <Text style={{ fontWeight: "700", color: "#131313" }}>
              {appState.authState.signUpEmail}
            </Text>{" "}
            to verify your account
          </Text>
        </View>

        <View style={tw`mt-6`}>
          <OtpInput
            numberOfDigits={6}
            focusColor="#5B48FC"
            autoFocus={false}
            hideStick={true}
            placeholder="5"
            blurOnFilled={true}
            disabled={loading}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => console.log("Focused")}
            onBlur={() => console.log("Blurred")}
            onTextChange={(text) => console.log(text)}
            onFilled={handleOtpInput}
            textInputProps={{
              accessibilityLabel: "One-Time Password",
            }}
            textProps={{
              accessibilityRole: "text",
              accessibilityLabel: "OTP digit",
              allowFontScaling: false,
            }}
          />
        </View>
        <View style={styles.redirectContainer}>
          <ActionButton
            text={"Didn’t see it? Resend"}
            activateButton={loading}
            action={handleResendVerification}
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

export default VerifyScreen;

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

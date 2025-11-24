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
import { activateButton, ValidateEmail } from "@/utils/Validators";
import { resendVerification } from "@/services/authService";
import SuccessSlideIn from "@/components/Notifications/Notificationslider";
import { useAppContext } from "@/context/StoreContext";
import { AuthInput } from "@/components/Auth/AuthInput";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

const ResendVerifyScreen = ({ navigation }: { navigation: any }) => {
  const { appState } = useAppContext();
  const { signUpEmail } = appState.authState;
  const isDarkMode = useColorScheme() === "dark";
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errMessage, setErrMessage] = useState({
    email: "",
  });
  const [validateSuccess, setValidateSuccess] = useState({
    email: false,
  });

  const handleInput = (name: string, value: string) => {
    const addColour = () => {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Invalid ${name}`,
      }));
    };

    const removeColour = () => {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    };

    if (value.length === 0) {
      setErrMessage((prevState) => ({
        ...prevState,
        [name]: `Enter your ${name}`,
      }));
    } else if (name === "email") {
      if (!ValidateEmail(value)) {
        addColour();
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
      } else {
        removeColour();
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: true,
        }));
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResendVerification = async () => {
    const resendVerificationPayload = {
      email: formData.email || signUpEmail,
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
        <AuthInput
          label="Email"
          action={(value) => handleInput("email", value)}
          inputType="email"
          placeHolder="Enter email"
          value={formData.email || ""}
          errorMessage={errMessage.email}
        />
        <View style={styles.bannerHeader}>
          <Text style={styles.bannerText}>
            Kindly input the email address you registered with.
          </Text>
        </View>
        <View style={styles.redirectContainer}>
          <ActionButton
            text={"Verify"}
            activateButton={!activateButton(validateSuccess)}
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

export default ResendVerifyScreen;

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

import {
  // SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "@/components/Atoms/Logo/Logo";
import { fontFamily } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { AuthInput } from "@/components/Auth/AuthInput";
import { Link } from "expo-router";
import { primaryColor } from "@/styles/colors";
import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import {
  activateButton,
  ValidateEmail,
  ValidatePassword,
} from "@/utils/Validators";
import { loginUser, registerUser } from "@/services/authService";
import { updateSignUpUser } from "@/config";
import { getAllUsers } from "@/services/landingPage";
import CheckBoxComponent from "@/components/Atoms/CheckBox/CheckBoxComponent";
import { useRouter, useLocalSearchParams } from "expo-router";
import SuccessSlideIn from "@/components/Notifications/Notificationslider";
import { useAppContext } from "@/context/StoreContext";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

const SignUpDetailScreen = ({ navigation }: { navigation: any }) => {
  const { appState, setAppState } = useAppContext();
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const { accountType } = useLocalSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });
  const handleCheckBoxChange = (newValue: boolean) => {
    setIsChecked(newValue);
    setValidateSuccess((prevState) => ({
      ...prevState,
      checkbox: newValue,
    }));
  };

  const [formData, setFormData] = useState({
    "First name": "",
    "Last name": "",
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState({
    "First name": "",
    "Last name": "",
    email: "",
    password: "",
  });
  const [validateSuccess, setValidateSuccess] = useState({
    "First name": false,
    "Last name": false,
    email: false,
    password: false,
    checkbox: isChecked,
  });

  useEffect(() => {
    if (!accountType) {
      Alert.alert("Error", "You must select an account type first.");
      router.replace("/auth/signup");
    }
  }, [accountType]);

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
    } else if (name === "First name" || name === "Last name") {
      if (value.length < 2) {
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
    } else if (name === "password") {
      if (!ValidatePassword(value)) {
        addColour();
        setValidateSuccess((prevState) => ({
          ...prevState,
          [name]: false,
        }));
        setErrMessage((prevState) => ({
          ...prevState,
          [name]: `password should be 8 characters with atleast a capital letter, number, and special character`,
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

  const registerPayload = {
    first_name: formData["First name"],
    last_name: formData["Last name"],
    email: formData.email,
    password: formData.password,
    role: accountType as string,
  };

  const handleSignUpSubmit = async () => {
    setLoading(true);
    setAppState((prevState) => ({
      ...prevState,
      authState: {
        ...prevState.authState,
        signUpEmail: formData.email,
      },
    }));
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
      const data = await registerUser(registerPayload);
      // setLoading(true);

      if (data && data?.data?.statusCode === 200) {
        setApiResponse({
          responseType: "success",
          response: data?.data?.message,
        });
        setTimeout(() => {
          router.push({
            pathname: "/auth/verification/verify",
          });
        }, 3000);
      } else {
        setApiResponse({
          responseType: "failed",
          response: data?.message,
        });
        if (
          data?.statusCode === 400 &&
          data?.message === "Email is already in use, please verify account"
        ) {
          setTimeout(() => {
            router.push({
              pathname: "/auth/verification/verify",
            });
          }, 3000);
        }
      }
      console.log(data.data);
      return data;
    } catch (error) {
      console.log(error, "As an error");
      // setLoading(true);
      // setOpenModal(true);
      // return error;
    } finally {
      clearAll();
    }
  };

  const handlegetAllUsers = async () => {
    try {
      const data = await getAllUsers();
      console.log(data.data, "login page");
      return data;
    } catch (error) {
      console.log(error, "error from login");
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
          <Text style={styles.headerText}>Become a Handiehub Handieman </Text>
        </View>
        <View style={styles.bannerHeader}>
          <Text style={styles.bannerText}>
            Sign up to your handiehub account to continue
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthInput
            label="First name"
            action={(value) => handleInput("First name", value)}
            inputType="text"
            placeHolder="First name"
            value={formData["First name"] || ""}
            errorMessage={errMessage["First name"]}
          />
          <AuthInput
            label="Last name"
            action={(value) => handleInput("Last name", value)}
            inputType="text"
            placeHolder="Last name"
            value={formData["Last name"] || ""}
            errorMessage={errMessage["Last name"]}
          />

          <AuthInput
            label="Email"
            action={(value) => handleInput("email", value)}
            inputType="email"
            placeHolder="Enter email"
            value={formData.email || ""}
            errorMessage={errMessage.email}
          />
          <AuthInput
            label="Password"
            action={(value) => handleInput("password", value)}
            inputType="password"
            placeHolder="Enter password"
            value={formData.password || ""}
            errorMessage={errMessage.password}
          />

          <View style={styles.checker}>
            <View style={styles.checkboxContainer}>
              {/* <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                onFillColor="#5B48FC"
                onCheckColor="#5B48FC"
                boxType="square"
                tintColor="#5B48FC"
                tintColors={{ true: "#5B48FC", false: "" }}
                
              /> */}

              <CheckBoxComponent
                value={isChecked}
                onValueChange={handleCheckBoxChange}
              />
              <Text
                style={styles.label}
                onPress={() => handleCheckBoxChange(!isChecked)}
              >
                By continuing with Google or Email, you agree to Handiehub{" "}
                <Link
                  href="../../auth/forgot-password"
                  style={styles.forgotPassword}
                >
                  Terms and Privacy Policy.
                </Link>
              </Text>
            </View>
          </View>

          <ActionButton
            text={"Sign Up"}
            activateButton={!activateButton(validateSuccess) || loading}
            // action={() =>
            //   fetchData("https://handiehub-backend.onrender.com/auth/login")
            // }
            action={handleSignUpSubmit}
          />
          <View style={styles.redirectContainer}>
            <Link href={"/auth/login"} style={styles.signUp}>
              Have an account? Log In now
            </Link>
          </View>
          {/* <View style={styles.redirectContainer}>
            <Link href={"/auth/verification/resend"} style={styles.signUp}>
              Unverifed? Verify now
            </Link>
          </View> */}

          <View style={styles.redirectContainer}>
            <Link
              href={"/auth/signup/handieman/handiemandetailone"}
              style={styles.signUp}
            >
              Experiment
            </Link>
          </View>
        </ScrollView>
        <SuccessSlideIn
          openModal={apiResponse.responseType !== ""}
          responseType={apiResponse.responseType}
          successActionResponse={apiResponse.response}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUpDetailScreen;

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
    lineHeight: 32,
  },
  redirectContainer: { marginVertical: 16 },
  forgotPassword: {
    color: primaryColor,
    fontWeight: "600",
  },
  signUp: {
    color: primaryColor,
    fontWeight: "600",
    textAlign: "center",
  },
  checker: {
    flex: 1,
    marginVertical: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 2,
    alignItems: "center",
    position: "relative",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

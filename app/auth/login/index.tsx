import {
  // SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
  StyleSheet,
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
import { loginUser } from "@/services/authService";
import { updateSignUpUser } from "@/config";
import { getAllUsers } from "@/services/landingPage";
import { SvgXml } from "react-native-svg";
import { handieManIcon, userIcon } from "@/assets/svgs/svgs";
import CheckBoxComponent from "@/components/Atoms/CheckBox/CheckBoxComponent";
import tw from "twrnc";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

const LoginScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [choice, setChoice] = useState("user");
  const [futureChoice, setFutureChoice] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState({
    email: "",
    password: "",
  });
  const [validateSuccess, setValidateSuccess] = useState({
    email: false,
    password: false,
  });

  // useEffect(() => {
  //   loadSavedPreferences();
  // }, []);
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

  const loginPayload = {
    username: formData.email,
    password: formData.password,
  };

  const handleSignInSubmit = async () => {
    // setLoading(true);
    // const clearAll = () => {
    //   setLoading(false);
    //   setTimeout(() => {
    //     setSuccessRes("");
    //     setOpenModal(false);
    //   }, 2000);
    // };
    // console.log("This one click login page");
    try {
      const data = await loginUser(loginPayload);
      // const data = await fetch("https://handiehub-backend.onrender.com");
      console.log(data?.data, "From the login page");

      // setLoading(true);
      // setSuccessRes(data);
      // setOpenModal(true);
      // setTimeout(() => {
      //   updateSignUpUser(loginPayload.email);
      //   data.response &&
      //     data?.response?.statusCode === 200 &&
      //     navigate.push("/");
      // }, 3000);
      return data;
    } catch (error) {
      console.log(error, "error from the login page response");
      // setLoading(true);
      // setOpenModal(true);
      return error;
    } finally {
      // clearAll();
    }
    // await fetchData("https://handiehub-backend.onrender.com/users");
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

  async function fetchData(url: string) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add other headers if necessary, e.g., Authorization
        },
        body: JSON.stringify(loginPayload),
      });

      const data = await response.json(); // Parse JSON response
      console.log(data);

      return data; // Return the data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  }

  const handleRememberChoice = async (value: boolean) => {
    setFutureChoice(value);
    try {
      // if (value === true) {
      //   await AsyncStorage.setItem("loginChoice", choice);
      // } else {
      //   await AsyncStorage.removeItem("loginChoice");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  // const loadSavedPreferences = async () => {
  //   try {
  //     const savedRememberChoice = await AsyncStorage.getItem("loginChoice");

  //     if (savedRememberChoice !== "" && savedRememberChoice !== null) {
  //       setChoice(savedRememberChoice);
  //     }
  //   } catch (error) {
  //     console.error("Error loading preferences:", error);
  //   }
  // };
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
          <Text style={styles.headerText}>Welcome to Handiehub </Text>
        </View>
        <View style={styles.bannerHeader}>
          <Text style={styles.bannerText}>
            Login to your handiehub account to continue
          </Text>
        </View>

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

        <View style={styles.redirectContainer}>
          <Link href={"/auth/forgot-password"} style={styles.forgotPassword}>
            Forgot Password
          </Link>
        </View>

        <Text style={[styles.bannerText, { color: "#131313" }]}>Login as</Text>
        <View style={tw`flex flex-row items-center gap-x-12`}>
          <View style={tw`flex flex-row items-center gap-x-2`}>
            <CheckBoxComponent
              value={choice === "user"}
              onValueChange={(value) => {
                setChoice("user");
                setIsChecked(value);
              }}
            />
            <SvgXml
              xml={userIcon}
              width="24px"
              height="24px"
              // style={{ marginBottom: 10 }}
            />
            <Text style={tw` text-#131313 font-medium`}>User</Text>
          </View>
          <View style={tw`flex flex-row items-center gap-x-2`}>
            <CheckBoxComponent
              value={choice === "handieman"}
              onValueChange={(value) => {
                setChoice("handieman");
                setIsChecked(value);
              }}
            />
            <SvgXml
              xml={handieManIcon}
              width="24px"
              height="24px"
              // style={{ marginBottom: 10 }}
            />

            <Text style={tw` text-#131313 font-medium`}>Handieman</Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center gap-x-2 my-4`}>
          <CheckBoxComponent
            value={futureChoice}
            onValueChange={handleRememberChoice}
          />

          <Text style={tw` text-#131313 font-medium`}>
            Remember my choice for future logins
          </Text>
        </View>

        <ActionButton
          text={"Log in"}
          activateButton={!activateButton(validateSuccess)}
          // action={() =>
          //   fetchData("https://handiehub-backend.onrender.com/auth/login")
          // }
          action={handleSignInSubmit}
        />
        <View style={{ marginVertical: 16 }}>
          <Link href={"/auth/signup"} style={styles.signUp}>
            Not registered? Sign up now
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
  redirectContainer: { marginBottom: 16 },
  forgotPassword: {
    color: primaryColor,
    fontWeight: "600",
  },
  signUp: {
    color: primaryColor,
    fontWeight: "600",
    textAlign: "center",
  },
});

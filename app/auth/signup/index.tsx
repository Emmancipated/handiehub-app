import {
  // SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "@/components/Atoms/Logo/Logo";
import { useState } from "react";
import { Link } from "expo-router";
import {
  grayText,
  primaryBlack,
  primaryColor,
  secondaryColor,
} from "@/styles/colors";
import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import { SvgXml } from "react-native-svg";
import { handieManSignUp, userSignUp } from "@/assets/svgs/svgs";
import { useRouter } from "expo-router";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
const SelectAccountType = ({ navigation }: { navigation: any }) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const isDarkMode = useColorScheme() === "dark";

  const handleProceed = () => {
    if (!selectedType) {
      Alert.alert("Error", "Please select an account type before proceeding.");
      return;
    }
    router.push({
      pathname: "/auth/signup/details",
      params: { accountType: selectedType },
    });
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

        <View style={styles.bannerContainer}>
          <Text style={styles.bannerText}>
            How will you like to use Handiehub?
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelectedType("handieman")}
        >
          <View
            style={[
              styles.accountTypeInactive,
              selectedType === "handieman" && styles.accountTypeActive,
            ]}
          >
            <View>
              <View>
                <SvgXml xml={handieManSignUp} width="48px" height="48px" />
              </View>
              <Text style={styles.accountTypeHeader}>Join as a Handie man</Text>
              <Text style={styles.accountTypeText}>
                As a handie man, you get to get job offers from clients on
                Handiehub
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setSelectedType("user")}
        >
          <View
            style={[
              styles.accountTypeInactive,
              selectedType === "user" && styles.accountTypeActive,
            ]}
          >
            <View>
              <View>
                <SvgXml xml={userSignUp} width="48px" height="48px" />
              </View>
              <Text style={styles.accountTypeHeader}>Join as a User</Text>
              <Text style={styles.accountTypeText}>
                As a user, you get to get access to plethora of skilled artisans
                on Handiehub
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <ActionButton
          text={"Proceed"}
          activateButton={selectedType === null}
          action={handleProceed}
        />
        <View style={{ marginVertical: 16 }}>
          <Link
            href={"/auth/login"}
            style={{
              color: primaryColor,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Have an account? Log In now
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectAccountType;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    // paddingTop: 40,
    backgroundColor: "white",
    height: "100%",
  },
  logoSection: { alignItems: "center", marginVertical: 14 },
  bannerContainer: { alignItems: "center", marginVertical: 10 },
  bannerText: {
    color: "#131313",
    fontWeight: "700",
    fontSize: 24,
    // fontFamily: fontFamily,
    textAlign: "center",
    lineHeight: 32,
  },
  accountTypeInactive: {
    marginVertical: 12,
    backgroundColor: secondaryColor,
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  accountTypeHeader: {
    color: primaryBlack,
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 10,
  },
  accountTypeText: { color: grayText, lineHeight: 24 },
  accountTypeActive: {
    borderWidth: 2,
    borderColor: primaryColor,
    backgroundColor: "white",
  },
});

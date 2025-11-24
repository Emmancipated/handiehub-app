import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { AuthInput } from "@/components/Auth/AuthInput";
import { gray_400, primaryBlack, primaryGray, white } from "@/styles/colors";
import { activateButton } from "@/utils/Validators";
import SuccessSlideIn from "@/components/Notifications/Notificationslider";
import { useAppContext } from "@/context/StoreContext";
import { SvgXml } from "react-native-svg";
import {
  blackCameraSvg,
  grayCameraSvg,
  handieManIcon,
  userIcon,
} from "@/assets/svgs/svgs";
import * as ImagePicker from "expo-image-picker";
import React from "react";
const HandieManDetailOneScreen = ({ navigation }: { navigation: any }) => {
  const { appState, setAppState } = useAppContext();
  const { address, city, state, country, image, phone } =
    appState.authState.handiemanSignUpForm;
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });
  const [formData, setFormData] = useState({
    country: { label: "", value: "" },
    address: "",
    state: "",
    phone: "",
    image: "",
    city: "",
  });
  const [errMessage, setErrMessage] = useState({
    country: "",
    address: "",
    state: "",
    phone: "",
    image: "",
    city: "",
  });
  const [validateSuccess, setValidateSuccess] = useState({
    country: false,
    address: false,
    state: false,
    phone: false,
    image: false,
    city: false,
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      setValidateSuccess((prevState) => ({
        ...prevState,
        image: true,
      }));
      setFormData((prevState) => ({
        ...prevState,
        image: result.assets[0].uri,
      }));
    }
  };

  const uploadToCloudinary = async (uri: string) => {
    const data = new FormData();
    const file = {
      uri: uri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as unknown as Blob;
    data.append("file", file);
    data.append("upload_preset", "<YOUR_UPLOAD_PRESET>");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/<YOUR_CLOUD_NAME>/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json = await response.json();
    console.log(json.secure_url);
  };

  useEffect(() => {
    if (address && city && state && country.value && image && phone) {
      setFormData({ address, city, state, country, image, phone });
      setValidateSuccess({
        country: true,
        address: true,
        state: true,
        phone: true,
        city: true,
        image: true,
      });
    }
  }, []);
  useEffect(() => {
    const allowActivateButton = activateButton(validateSuccess);

    if (allowActivateButton) {
      setAppState((prevState) => ({
        ...prevState,
        authState: {
          ...prevState.authState,
          handiemanSignUpForm: {
            ...prevState.authState.handiemanSignUpForm,
            ...formData,
            activateHandiemanButton: true,
          },
        },
      }));
    } else {
      setAppState((prevState) => ({
        ...prevState,
        authState: {
          ...prevState.authState,
          handiemanSignUpForm: {
            ...prevState.authState.handiemanSignUpForm,
            activateHandiemanButton: false,
          },
        },
      }));
    }
  }, [formData]);

  const getValidNumber = (number: boolean) => {
    if (number) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        phone: true,
      }));
    } else {
      setValidateSuccess((prevState) => ({
        ...prevState,
        phone: false,
      }));
    }
  };

  const handleInput = (name: string, value: string | any) => {
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
    } else if (name === "country") {
      if (value === "") {
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
    } else if (name === "address" || name === "state" || name === "city") {
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
    }
    setFormData((prevState) => ({
      ...prevState,
      // [name]: name === "phone" ? value.replace(/\s+/g, "") : value,
      [name]: name === "country" ? value : value,
    }));
  };

  const registerPayload = {
    country: formData.country,
    address: formData.address,
    state: formData.state,
    phone: formData.phone,
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.profilePicWrapper}>
              {!formData.image && (
                <>
                  <SvgXml
                    xml={grayCameraSvg}
                    width="24px"
                    height="24px"
                    style={{ marginBottom: 10 }}
                  />
                  <Text style={styles.profilePicCTA}>Upload photo</Text>
                </>
              )}

              {formData.image ? ( // prettier-ignore
                <Image
                  source={{ uri: formData.image }}
                  // source={{
                  //   uri: "http://res.cloudinary.com/dggdg23d9/image/upload/v1735210768/wrhmbluhf9vhjcgtiu0s.png",
                  // }}
                  style={styles.profilePic}
                />
              ) : (
                ""
              )}

              <TouchableOpacity
                style={styles.profilePicCTAButton}
                activeOpacity={0.7}
                onPress={pickImage}
              >
                <SvgXml xml={blackCameraSvg} width="24px" height="24px" />
                <Text
                  style={{
                    color: primaryBlack,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {formData.image ? "Edit photo" : "Add photo"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {!formData.image && (
            <Text style={styles.errorBlock}>
              Please select an image with your face showing
            </Text>
          )}

          <AuthInput
            label="Country"
            action={(value) => handleInput("country", value)}
            inputType="dropdown"
            placeHolder="Select Country"
            value={formData.country.value}
            errorMessage={errMessage.country}
            // dropdownArray={formattedDropdown(countries)}
          />
          <AuthInput
            label="Address"
            action={(value) => handleInput("address", value)}
            inputType="text"
            placeHolder="Enter your address"
            value={formData.address}
            errorMessage={errMessage.address}
          />

          <AuthInput
            label="City"
            action={(value) => handleInput("city", value)}
            inputType="text"
            placeHolder="Enter your city"
            value={formData.city}
            errorMessage={errMessage.city}
          />
          <AuthInput
            label="State"
            action={(value) => handleInput("state", value)}
            inputType="text"
            placeHolder="Enter your state"
            value={formData.state}
            errorMessage={errMessage.state}
          />
          <AuthInput
            label="Phone number"
            action={(value) => handleInput("phone", value)}
            inputType="phone"
            placeHolder="Enter phone number"
            value={formData.phone}
            errorMessage={errMessage.phone}
            getValidNumber={getValidNumber}
          />
          <SuccessSlideIn
            openModal={apiResponse.responseType !== ""}
            responseType={apiResponse.responseType}
            successActionResponse={apiResponse.response}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HandieManDetailOneScreen;

const styles = StyleSheet.create({
  container: {},
  headerContainer: { alignItems: "center", marginVertical: 14 },
  profilePicWrapper: {
    backgroundColor: primaryGray,
    width: 164,
    height: 164,
    borderRadius: 82,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 50,
    marginBottom: 20,
  },
  profilePicCTA: { color: gray_400, fontSize: 14, fontWeight: "600" },
  profilePic: { width: 164, height: 164, borderRadius: 82 },
  profilePicCTAButton: {
    position: "absolute",
    bottom: -20,
    right: 0,
    left: 0,
    backgroundColor: white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    // iOS shadow
    shadowColor: "#0000009a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    // Android shadow
    elevation: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 6,
  },
  errorBlock: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
});

// const router = useRouter();
// const params = useGlobalSearchParams();

// const toggleBoolean = () => {
//   router.setParams({ showHeader: params.showHeader === 'true' ? 'false' : 'true' });
// };

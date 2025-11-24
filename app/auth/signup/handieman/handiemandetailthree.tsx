import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontFamily } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { AuthInput } from "@/components/Auth/AuthInput";
import { gray_400, white } from "@/styles/colors";
import { activateButton } from "@/utils/Validators";
import { getAllUsers } from "@/services/landingPage";
import SuccessSlideIn from "@/components/Notifications/Notificationslider";
import { useAppContext } from "@/context/StoreContext";
import { SvgXml } from "react-native-svg";
import { blackCameraSvg, grayCameraSvg } from "@/assets/svgs/svgs";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { handymanProfessions } from "@/constants/ProfessionList";
import { formattedDropdown } from "@/utils/utilities";

const HandieManDetailThreeScreen = () => {
  const { appState, setAppState } = useAppContext();
  const { images } = appState.authState.handiemanSignUpForm;
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });
  const [addedImage, setAddedImage] = useState(false);
  const [image, setImage] = useState<string | null>(null);

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
      setAddedImage(true);
    }
  };

  // const uploadToCloudinary = async (uri: string) => {
  //   const data = new FormData();
  //   const file = {
  //     uri: uri,
  //     type: "image/jpeg",
  //     name: "upload.jpg",
  //   } as unknown as Blob;
  //   data.append("file", file);
  //   data.append("upload_preset", "<YOUR_UPLOAD_PRESET>");

  //   const response = await fetch(
  //     "https://api.cloudinary.com/v1_1/<YOUR_CLOUD_NAME>/image/upload",
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   );

  //   const json = await response.json();
  //   console.log(json.secure_url);
  // };

  const [formData, setFormData] = useState<{ images: string[]; image: string }>(
    {
      // images: images,
      images: [],
      image: "",
    }
  );
  const [errMessage, setErrMessage] = useState({
    image: "Pick an image, and click the plus button to add",
  });

  const [validateSuccess, setValidateSuccess] = useState({
    // images: images.length > 3,
    images: false,
  });

  useEffect(() => {
    if (formData.images.length < 4) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        images: false,
      }));
    } else {
      setValidateSuccess((prevState) => ({
        ...prevState,
        images: true,
      }));
      setErrMessage((prevState) => ({
        ...prevState,
        image: "",
      }));
    }
  }, [formData]);

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

  const handleAddToArray = () => {
    if (
      formData.images.includes(formData.image) === false &&
      formData.image !== ""
    ) {
      if (formData.images.length < 3) {
        setValidateSuccess((prevState) => ({
          ...prevState,
          images: false,
        }));
        setErrMessage((prevState) => ({
          ...prevState,
          image: "Select atleast four (4) images",
        }));
      } else {
        setValidateSuccess((prevState) => ({
          ...prevState,
          images: true,
        }));
        setErrMessage((prevState) => ({
          ...prevState,
          image: "",
        }));
      }
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, formData.image],
        image: "",
      }));
      setAppState((prevState) => ({
        ...prevState,
        authState: {
          ...prevState.authState,
          handiemanSignUpForm: {
            ...prevState.authState.handiemanSignUpForm,
            images: [
              ...prevState.authState.handiemanSignUpForm.images,
              formData.image,
            ],
          },
        },
      }));
      setAddedImage(false);
    }
  };

  const handleRemoveFromArray = (value: string) => {
    const newImages = formData.images.filter((image) => image !== value);
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
    setAppState((prevState) => ({
      ...prevState,
      authState: {
        ...prevState.authState,
        handiemanSignUpForm: {
          ...prevState.authState.handiemanSignUpForm,
          images: newImages,
        },
      },
    }));
    if (newImages.length < 4) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        images: false,
      }));
      setErrMessage((prevState) => ({
        ...prevState,
        image: "Select atleast four (4) images",
      }));
    } else {
      setValidateSuccess((prevState) => ({
        ...prevState,
        images: true,
      }));
      setErrMessage((prevState) => ({
        ...prevState,
        image: "",
      }));
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.bannerContainer}>
            <Text style={styles.headerText}>Show some of your works</Text>
            <Text style={styles.bannerText}>
              Tell us more about yourself and what you do
            </Text>
          </View>

          <AuthInput
            label="Show some of your works"
            action={(value) => {}}
            inputType="images_upload"
            placeHolder="Select picture"
            value={formData.image}
            errorMessage={errMessage.image}
            addSelector={pickImage}
            showItem={addedImage}
            selectorArray={formData.images || images}
            addToArray={handleAddToArray}
            removeSelector={handleRemoveFromArray}
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

export default HandieManDetailThreeScreen;

const styles = StyleSheet.create({
  container: {},
  headerContainer: { alignItems: "center", marginVertical: 14 },
  bannerContainer: { marginVertical: 0 },
  headerText: {
    color: "#131313",
    fontWeight: "700",
    fontSize: 24,
    // fontFamily: fontFamily,
    // textAlign: "center",
    lineHeight: 32,
  },
  bannerText: {
    color: "#868686",
    fontWeight: "700",
    fontSize: 14,
    fontFamily: fontFamily,
    lineHeight: 32,
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

  skillsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  skillChip: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  skillText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});

import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontFamily } from "@/styles/fonts";
import { useEffect, useState } from "react";
import { AuthInput } from "@/components/Auth/AuthInput";
import { gray_400, white } from "@/styles/colors";
import { activateButton } from "@/utils/Validators";
import { getAllUsers } from "@/services/landingPage";
import SuccessSlideIn from "@/components/Notifications/Notificationslider";
import { useAppContext } from "@/context/StoreContext";
import React from "react";
import { handymanProfessions } from "@/constants/ProfessionList";
import { formattedDropdown } from "@/utils/utilities";

const HandieManDetailTwoScreen = ({ navigation }: { navigation: any }) => {
  const { appState, setAppState } = useAppContext();
  const { profession, skills, description } =
    appState.authState.handiemanSignUpForm;
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    responseType: "",
    response: "",
  });

  const [formData, setFormData] = useState<{
    profession: any;
    skills: string[];
    description: string;
  }>({
    profession: "",
    skills: [],
    description: "",
  });
  const [errMessage, setErrMessage] = useState({
    profession: "",
    skills: "",
    description: "",
  });
  const professions = handymanProfessions.map((item) => item.profession);

  const [inputValue, setInputValue] = useState(""); // To store the current text input
  const [validateSuccess, setValidateSuccess] = useState({
    profession: false,
    skills: false,
    description: false,
  });
  useEffect(() => {
    if (profession && skills && description) {
      setFormData({ profession, skills, description });
      setValidateSuccess({
        profession: true,
        skills: true,
        description: true,
      });
    }
  }, []);

  useEffect(() => {
    if (formData.skills.length === 0) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        skills: false,
      }));
    } else {
      setValidateSuccess((prevState) => ({
        ...prevState,
        skills: true,
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
  console.log(appState.authState.handiemanSignUpForm, "from page 2");

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
    } else if (name === "profession") {
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
        // setFormData((prevState) => ({
        //   ...prevState,
        //   profession: value,
        //   skills: professionSkills[0]?.skills || [],
        // }));
      }
    } else if (name === "description") {
      if (value.length < 10) {
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

  // Function to handle adding a skill
  const addSkill = () => {
    if (
      inputValue.trim() !== "" &&
      formData.skills.includes(inputValue) === false
    ) {
      setFormData((prevState) => ({
        ...prevState,
        skills: [...formData.skills, inputValue],
      }));
      setInputValue("");
    }
  };

  const removeSkill = (value: string) => {
    const newSkills = formData.skills.filter((skill) => skill !== value);
    setFormData((prevState) => ({
      ...prevState,
      skills: newSkills,
    }));
    if (newSkills.length === 0) {
      setValidateSuccess((prevState) => ({
        ...prevState,
        skills: false,
      }));
    } else {
      setValidateSuccess((prevState) => ({
        ...prevState,
        skills: true,
      }));
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.bannerContainer}>
            <Text style={styles.headerText}>
              Tell us about yourself and what you do
            </Text>
            <Text style={styles.bannerText}>
              Tell us more about yourself and what you do
            </Text>
          </View>

          <AuthInput
            label="Profession"
            action={(value) => handleInput("profession", value)}
            inputType="dropdownGlobal"
            placeHolder="Select Profession"
            value={formData.profession}
            errorMessage={errMessage.profession}
            globalDropdownArray={formattedDropdown(professions)}
          />

          <AuthInput
            label="Skills"
            action={setInputValue}
            inputType="selector"
            placeHolder="Type a skill and press Enter"
            value={inputValue}
            errorMessage={
              formData.skills.length < 1 ? "Add at least 2 skills" : ""
            }
            selectorArray={formData.skills}
            addSelector={addSkill}
            removeSelector={(e) => removeSkill(e)}
          />

          <AuthInput
            label="Tell us about yourself"
            action={(value) => handleInput("description", value)}
            inputType="textarea"
            placeHolder="Type a message here..."
            value={formData.description}
            errorMessage={errMessage.description}
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

export default HandieManDetailTwoScreen;

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

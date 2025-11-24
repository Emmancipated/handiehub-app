import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  primaryMargin,
  primaryPadding,
  secondaryGap,
  tertiaryPadding,
} from "../../styles/topography";
import {
  black100,
  foundationGray100,
  primaryColor,
  secondaryGray,
  white,
  secondaryColor,
  primaryBlack,
  grayText,
} from "../../styles/colors";
import { SvgXml } from "react-native-svg";
import {
  closeIcon,
  backArrowIcon,
  briefCaseIcon,
} from "../../assets/svgs/svgs";
import { fontFamily, subHeaderFontSize } from "../../styles/fonts";
import { BookHandiemanInput } from "../Atoms/BookHandieManInput/HandieManInput";
import { ActionButton } from "../Atoms/ActionButton/ActionButton";
// import CheckBox from "@react-native-community/checkbox";

const { width } = Dimensions.get("window");

const EndCardDetailsModal = ({
  actionOne,
  actionTwo,
}: {
  actionOne: () => void;
  actionTwo: () => void;
}) => {
  const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: 720,
        }}
      >
        <View>
          <View style={styles.headerWrapper}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: 8,
                alignItems: "center",
              }}
            >
              <Pressable onPress={actionTwo}>
                <SvgXml xml={backArrowIcon} width="24px" height="24px" />
              </Pressable>
              <Text style={styles.header}>Enter card details</Text>
            </View>
            <Pressable onPress={actionTwo}>
              <SvgXml xml={closeIcon} width="24px" height="24px" />
            </Pressable>
          </View>

          <BookHandiemanInput
            title="Card number"
            placeHolder="1234 5678 9101 1121"
            inputType="text"
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 12,
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "48%" }}>
              <BookHandiemanInput
                title="Expiry date"
                placeHolder="12/23"
                inputType="text"
              />
            </View>
            <View style={{ width: "48%" }}>
              <BookHandiemanInput
                title="CVV"
                placeHolder="123"
                inputType="text"
              />
            </View>
          </View>

          <BookHandiemanInput
            title="Cardholder name"
            placeHolder="Farinde David"
            inputType="text"
          />
        </View>

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
            <Text style={styles.label}>Save card details</Text>
          </View>
        </View>

        <View style={styles.actionButton}>
          <ActionButton text="Make Payment" action={actionOne} activateButton />
        </View>
      </View>
    </View>
  );
};

export default EndCardDetailsModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    width: width,
    padding: tertiaryPadding,
    flex: 1,
    height: "100%",
  },
  actionButton: {
    marginVertical: 16,
  },
  header: {
    fontWeight: "bold",
    color: "#000000",
    fontSize: 20,
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: secondaryGap,
  },
  checker: {
    flex: 1,
    marginVertical: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

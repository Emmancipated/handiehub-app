import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  addIcon,
  cameraAction,
  closeIcon,
  closeIconWhite,
  deleteIcon,
  dropDownArrow,
  editPen,
  eyeIcon,
} from "@/assets/svgs/svgs";
import { fontFamily } from "@/styles/fonts";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import PhoneInput from "react-native-phone-input";
import { useAppContext } from "@/context/StoreContext";
import { primaryColor, secondaryColor } from "@/styles/colors";
import {
  primaryBorderRadius,
  primaryBorderWidth,
  primaryLineHeight,
  primaryPadding,
} from "@/styles/topography";
import RNPickerSelect from "react-native-picker-select";
import { Dropdown, SelectCountry } from "react-native-element-dropdown";
import { countriesWithFlags } from "@/constants/CountryList";
import AntDesign from "@expo/vector-icons/AntDesign";

// Get the width of screen
const { width } = Dimensions.get("window");
const windowWidth = width - 32;

const gap = 10;
const itemPerRow = 4;
const totalGapSize = (itemPerRow - 1) * gap;
const childWidth = (windowWidth - totalGapSize) / itemPerRow;
export const AuthInput = ({
  label,
  action,
  errorMessage,
  inputType,
  inputName,
  placeHolder,
  value,
  getValidNumber,
  dropdownArray,
  selectorArray,
  addSelector,
  removeSelector,
  showItem,
  addToArray,
  globalDropdownArray,
}: {
  label: string;
  action: (input: string) => void;
  errorMessage?: string;
  inputType: string;
  inputName?: string;
  placeHolder: string;
  value?: string;
  getValidNumber?: (value: boolean) => void;
  dropdownArray?: {
    label: string;
    value: string;
    image: {
      uri: string;
    };
  }[];
  selectorArray?: string[];
  addSelector?: () => void;
  removeSelector?: (input: string) => void;
  showItem?: boolean;
  addToArray?: () => void;
  globalDropdownArray?: {
    label: string;
    value: string;
  }[];
}) => {
  const { appState, setAppState } = useAppContext();
  const { phone } = appState.authState.handiemanSignUpForm;
  const [isFocused, setIsFocused] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);

  const [phoneCountryCode, setPhoneCountryCode] = useState<CountryCode>("NG");
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef<PhoneInput>(null);

  const handleCountrySelect = (country: any) => {
    setPhoneCountryCode(country.cca2);
    const newPhoneNumber = `+${country.callingCode[0]}`;
    setPhoneNumber(newPhoneNumber);
    if (phoneInput.current) {
      phoneInput.current.selectCountry(country.cca2.toLowerCase());
      phoneInput.current.setValue(newPhoneNumber);
    }
    setShowPhoneCountryPicker(false);
  };
  const countryData = useMemo(() => countriesWithFlags, []);
  interface RenderItemProps {
    item: string;
  }

  const renderItem = useCallback(({ item }: RenderItemProps) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  }, []);

  const globalData = useMemo(() => globalDropdownArray, []);
  interface globalRenderItemProps {
    label: string;
    value: string;
  }
  const dropDownvalue = value;
  const renderItemGlobal = ({ label, value }: globalRenderItemProps) => {
    return (
      <View style={stylesLocal.item}>
        <Text style={stylesLocal.textItem}>{label}</Text>
        {value === dropDownvalue && (
          <AntDesign
            style={stylesLocal.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <>
      {inputType === "email" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <TextInput
            style={[stylesLocal.input, isFocused && stylesLocal.inputFocused]}
            placeholder={placeHolder}
            value={value}
            onChangeText={(value) => action(value)}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {inputType === "password" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              style={[stylesLocal.input, isFocused && stylesLocal.inputFocused]}
              placeholder={placeHolder}
              value={value}
              onChangeText={(value) => action(value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={checkPassword}
            />
            <View style={stylesLocal.floatingEye}>
              <SvgXml
                xml={eyeIcon}
                width="18px"
                height="18px"
                onPress={() => setCheckPassword(!checkPassword)}
              />
            </View>
          </View>
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {/* {inputType === "dropdown" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <RNPickerSelect
            onValueChange={(value) => {
              setIsFocused(false);
              return action(value);
            }}
            items={dropdownArray ?? []}
            style={{
              inputAndroid: [
                stylesLocal.inputDropdown,
                isFocused && stylesLocal.inputFocused, // Apply focus style
                // hasError && styles.inputError, // Apply error style
              ],
              inputIOS: [
                stylesLocal.inputDropdown,
                isFocused && stylesLocal.inputFocused, // Apply focus style
                // hasError && styles.inputError, // Apply error style
              ],
            }}
            placeholder={{ label: "", value: "" }}
            useNativeAndroidPickerStyle={false}
            onOpen={() => {
              setIsFocused(true);
            }}
            Icon={() => (
              <SvgXml
                xml={dropDownArrow}
                width="24px"
                height="24px"
                style={stylesLocal.floatingEye}
              />
            )}
            value={value}
          />
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )} */}

      {inputType === "dropdown" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>

          <SelectCountry
            style={[
              stylesLocal.inputDropdown,
              isFocused && stylesLocal.inputFocusedDropdown,
              { height: 55 },
            ]}
            selectedTextStyle={stylesLocal.selectedTextStyle}
            placeholderStyle={stylesLocal.placeholderStyle}
            imageStyle={stylesLocal.imageStyle}
            iconStyle={stylesLocal.iconStyle}
            maxHeight={200}
            value={value}
            data={countryData}
            valueField="value"
            labelField="label"
            imageField="image"
            placeholder={placeHolder}
            searchPlaceholder="Search..."
            onChange={(value) => {
              return action(value);
            }}
            renderItem={renderItem}
            autoScroll={false}
            search
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {inputType === "dropdownGlobal" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>

          <Dropdown
            style={[
              stylesLocal.inputDropdown,
              isFocused && stylesLocal.inputFocusedDropdown,
            ]}
            placeholderStyle={stylesLocal.placeholderStyle}
            selectedTextStyle={stylesLocal.selectedTextStyle}
            // inputSearchStyle={stylesLocal.inputSearchStyle}
            iconStyle={stylesLocal.iconStyle}
            data={globalData as any}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeHolder}
            searchPlaceholder="Search..."
            value={value}
            onChange={(value) => {
              return action(value);
            }}
            renderItem={renderItemGlobal}
            autoScroll={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {inputType === "text" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <TextInput
            style={[stylesLocal.input, isFocused && stylesLocal.inputFocused]}
            placeholder={placeHolder}
            value={value}
            onChangeText={(value) => action(value)}
            // autoCapitalize="none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {inputType === "phone" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <PhoneInput
            ref={phoneInput}
            style={[
              stylesLocal.input,
              stylesLocal.phoneInput,
              isFocused && stylesLocal.inputFocused,
            ]}
            initialValue={phoneNumber || value}
            initialCountry={phoneCountryCode.toLowerCase() ?? "us"}
            onPressFlag={() => setShowPhoneCountryPicker(true)}
            onChangePhoneNumber={(text) => {
              setPhoneNumber(text);
              getValidNumber &&
                getValidNumber(phoneInput.current?.isValidNumber() ?? false);
              return action(text);
            }}
            autoFormat
            textProps={{
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
            }}
          />

          <CountryPicker
            countryCode={phoneCountryCode ?? "US"}
            visible={showPhoneCountryPicker ?? false}
            onSelect={handleCountrySelect}
            onClose={() => setShowPhoneCountryPicker(false)}
            withFlagButton={false}
            withFilter
          />
          <View>
            <Text style={stylesLocal.errorBlock}>
              {phoneInput.current?.isValidNumber()
                ? ""
                : "Please enter a valid number"}
            </Text>
          </View>
        </View>
      )}

      {inputType === "selector" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <View
            style={[
              stylesLocal.container,
              stylesLocal.inActiveBorder,
              isFocused && stylesLocal.inputFocused,
            ]}
          >
            <ScrollView
              horizontal
              style={stylesLocal.selectorRowContainer}
              showsHorizontalScrollIndicator={false}
            >
              {selectorArray?.map((item, index) => (
                <View key={index} style={stylesLocal.selectorChip}>
                  <Text style={stylesLocal.selectorText}>{item}</Text>
                  <Pressable
                    onPress={() => removeSelector && removeSelector(item)}
                  >
                    <SvgXml xml={closeIconWhite} width="16px" height="16px" />
                  </Pressable>
                </View>
              ))}
            </ScrollView>

            <TextInput
              style={[stylesLocal.input, stylesLocal.transparentBorder]}
              placeholder={placeHolder}
              value={value}
              onChangeText={(value) => action(value)}
              // autoCapitalize="none"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={addSelector}
            />
          </View>
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {inputType === "textarea" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <TextInput
            style={[stylesLocal.input, isFocused && stylesLocal.inputFocused]}
            placeholder={placeHolder}
            value={value}
            onChangeText={(value) => action(value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
          />
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {inputType === "images_upload" && (
        <View style={stylesLocal.container}>
          <Text style={stylesLocal.label}>{label}</Text>
          <View
            style={[
              stylesLocal.multiImageConatiner,
              { borderWidth: showItem ? 0 : 2 },
            ]}
          >
            {showItem ? (
              <View style={stylesLocal.multiActiveImageContainer}>
                <Image
                  source={{
                    uri: value,
                  }}
                  style={stylesLocal.multiActiveImage}
                />
                <View style={stylesLocal.activeImageEditContainer}>
                  <Pressable onPress={addSelector}>
                    <SvgXml xml={editPen} width="18px" height="18px" />
                  </Pressable>
                </View>
              </View>
            ) : (
              <Pressable onPress={addSelector}>
                <View style={{ display: "flex", alignItems: "center" }}>
                  <View style={stylesLocal.activeImageAddContainer}>
                    <SvgXml xml={cameraAction} width="18px" height="18px" />
                  </View>

                  <Text style={stylesLocal.activeImageAddText}>
                    Drag and drop a Photo or{" "}
                    <Text style={{ color: primaryColor }}>Browse</Text>
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
          <View>
            <Text style={stylesLocal.errorBlock}>{errorMessage}</Text>
          </View>

          <View style={stylesLocal.addedImageArray}>
            {selectorArray &&
              selectorArray.map((item) => (
                <View style={{ position: "relative" }} key={item}>
                  <Image
                    source={{
                      uri: item,
                    }}
                    style={{
                      // flex: 1,
                      // resizeMode: "cover",
                      // borderRadius: 12,
                      ...stylesLocal.singleItem,
                    }}
                  />
                  <View style={stylesLocal.activeImageEditContainer}>
                    <Pressable
                      onPress={() => removeSelector && removeSelector(item)}
                    >
                      <SvgXml xml={deleteIcon} width="18px" height="18px" />
                    </Pressable>
                  </View>
                </View>
              ))}
            <View
              style={{
                // position: "relative",
                // flex: 1,
                // borderRadius: 12,
                ...stylesLocal.singleItem,
                height: 80,
                width: 80,
              }}
            >
              <View style={stylesLocal.activeImageEditContainer}>
                <Pressable onPress={addToArray}>
                  <SvgXml xml={addIcon} width="18px" height="18px" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const stylesLocal = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  label: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: fontFamily,
  },
  input: {
    borderColor: "#E8E8E8",
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  phoneInput: {
    paddingVertical: 16,
  },
  inputFocused: {
    borderColor: "#5B48FC",
  },
  inputDropdown: {
    borderColor: "#E8E8E8",
    borderWidth: 2,
    padding: 10,
    marginTop: 8,
    borderRadius: 8,
    color: "#000000",
    // backgroundColor: "red",
    // paddingRight: 30,
  },
  inputFocusedDropdown: {
    borderColor: "#5B48FC",
  },
  errorBlock: { fontSize: 12, color: "red", minHeight: 16 },
  floatingEye: { position: "absolute", top: 24, right: 16 },
  selectorRowContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
    columnGap: 10,
  },
  inActiveBorder: {
    borderColor: "#E8E8E8",
    borderWidth: 2,
    borderRadius: 8,
  },
  transparentBorder: { borderColor: "transparent" },

  selectorChip: {
    borderColor: secondaryColor,
    paddingVertical: primaryPadding,
    paddingHorizontal: 18,
    color: primaryColor,
    borderWidth: primaryBorderWidth,
    backgroundColor: primaryColor,
    borderRadius: primaryBorderRadius,
    // lineHeight: primaryLineHeight,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  selectorText: {
    color: "white",
    fontSize: 14,
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
  multiImageConatiner: {
    borderColor: "#E8E8E8",
    borderRadius: 12,
    // padding: 10,
    marginTop: 8,
    borderStyle: "dashed",
    height: 164,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  multiActiveImageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  multiActiveImage: {
    flex: 1,
    resizeMode: "cover",
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  activeImageEditContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    display: "flex",
    marginBottom: 10,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  activeImageAddContainer: {
    backgroundColor: "#EAEBECCC",
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    display: "flex",
    marginBottom: 10,
  },
  activeImageAddText: {
    color: "#868686",
    fontSize: 14,
    fontWeight: "400",
  },
  addedImageArray: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // marginVertical: -(gap / 2),
    marginVertical: 10,
    marginHorizontal: -(gap / 2),
    rowGap: gap,
  },
  singleItem: {
    marginHorizontal: gap / 2,
    minWidth: childWidth,
    maxWidth: childWidth,
    aspectRatio: 1,
    borderColor: "#E8E8E8",
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: "dashed",
  },

  dropdown: {
    // margin: 16,
    height: 50,
    width: "100%",
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
    borderColor: "red",
    borderWidth: 2,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});

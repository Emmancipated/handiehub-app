// import React, { useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import AntDesign from "@expo/vector-icons/AntDesign";

// const data = [
//   { label: "Item 1", value: "1" },
//   { label: "Item 2", value: "2" },
//   { label: "Item 3", value: "3" },
//   { label: "Item 4", value: "4" },
//   { label: "Item 5", value: "5" },
//   { label: "Item 6", value: "6" },
//   { label: "Item 7", value: "7" },
//   { label: "Item 8", value: "8" },
// ];

// const DropdownComponent = () => {
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && { color: "blue" }]}>
//           Dropdown label
//         </Text>
//       );
//     }
//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       {renderLabel()}
//       <Dropdown
//         style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={data}
//         search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? "Select item" : "..."}
//         searchPlaceholder="Search..."
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={(item) => {
//           setValue(item.value);
//           setIsFocus(false);
//         }}
//         renderLeftIcon={() => (
//           <AntDesign
//             style={styles.icon}
//             color={isFocus ? "blue" : "black"}
//             name="Safety"
//             size={20}
//           />
//         )}
//       />
//     </View>
//   );
// };

// export default DropdownComponent;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "white",
//     padding: 16,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: "gray",
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: "absolute",
//     backgroundColor: "white",
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });

// import React, { useState } from "react";
// import { StyleSheet } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import AntDesign from "@expo/vector-icons/AntDesign";

// const data = [
//   { label: "Item 1", value: "1" },
//   { label: "Item 2", value: "2" },
//   { label: "Item 3", value: "3" },
//   { label: "Item 4", value: "4" },
//   { label: "Item 5", value: "5" },
//   { label: "Item 6", value: "6" },
//   { label: "Item 7", value: "7" },
//   { label: "Item 8", value: "8" },
// ];

// const DropdownComponent = () => {
//   const [value, setValue] = useState(null);

//   return (
//     <Dropdown
//       style={styles.dropdown}
//       placeholderStyle={styles.placeholderStyle}
//       selectedTextStyle={styles.selectedTextStyle}
//       inputSearchStyle={styles.inputSearchStyle}
//       iconStyle={styles.iconStyle}
//       data={data}
//       search
//       maxHeight={300}
//       labelField="label"
//       valueField="value"
//       placeholder="Select item"
//       searchPlaceholder="Search..."
//       value={value}
//       onChange={(item) => {
//         setValue(item.value);
//       }}
//       renderLeftIcon={() => (
//         <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
//       )}
//     />
//   );
// };

// export default DropdownComponent;

// const styles = StyleSheet.create({
//   dropdown: {
//     margin: 16,
//     height: 50,
//     borderBottomColor: "gray",
//     borderBottomWidth: 0.5,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });

import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Item ", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

// import React, { useState } from "react";
// import { StyleSheet } from "react-native";
// import { SelectCountry } from "react-native-element-dropdown";

// const local_data = [
//   {
//     value: "1",
//     lable: "Country 1",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "2",
//     lable: "Country 2",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "3",
//     lable: "Country 3",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "4",
//     lable: "Country 4",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "5",
//     lable: "Country 5",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
// ];

// const SelectCountryScreen = (_props) => {
//   const [country, setCountry] = useState("1");

//   return (
//     <SelectCountry
//       style={styles.dropdown}
//       selectedTextStyle={styles.selectedTextStyle}
//       placeholderStyle={styles.placeholderStyle}
//       imageStyle={styles.imageStyle}
//       inputSearchStyle={styles.inputSearchStyle}
//       iconStyle={styles.iconStyle}
//       search
//       maxHeight={200}
//       value={country}
//       data={local_data}
//       valueField="value"
//       labelField="lable"
//       imageField="image"
//       placeholder="Select country"
//       searchPlaceholder="Search..."
//       onChange={(e) => {
//         setCountry(e.value);
//       }}
//     />
//   );
// };

// export default SelectCountryScreen;

// const styles = StyleSheet.create({
//   dropdown: {
//     margin: 16,
//     height: 50,
//     borderBottomColor: "gray",
//     borderBottomWidth: 0.5,
//   },
//   imageStyle: {
//     width: 24,
//     height: 24,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });

// import { countriesWithFlags } from "@/constants/CountryList";
// import React, { useCallback, useMemo, useState } from "react";
// import { StyleSheet, View, Text } from "react-native";
// import { SelectCountry } from "react-native-element-dropdown";

// const local_data = [
//   {
//     value: "1",
//     lable: "Country 1",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "2",
//     lable: "Country 2",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "3",
//     lable: "Country 3",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "4",
//     lable: "Country 4",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
//   {
//     value: "5",
//     lable: "Country 5",
//     image: {
//       uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
//     },
//   },
// ];

// const SelectCountryScreen = () => {
//   const [country, setCountry] = useState("");
//   const data = useMemo(() => countriesWithFlags, []);

//   const renderItem = useCallback((item) => {
//     return (
//       <View>
//         <Text>{item}</Text>
//       </View>
//     );
//   }, []);

//   return (
//     <SelectCountry
//       style={styles.dropdown}
//       selectedTextStyle={styles.selectedTextStyle}
//       placeholderStyle={styles.placeholderStyle}
//       imageStyle={styles.imageStyle}
//       iconStyle={styles.iconStyle}
//       maxHeight={200}
//       value={country}
//       data={data}
//       valueField="value"
//       labelField="label"
//       imageField="image"
//       placeholder="Select country"
//       searchPlaceholder="Search..."
//       onChange={(e) => {
//         setCountry(e.value);
//       }}
//       renderItem={renderItem}
//       autoScroll={false}
//       search
//     />
//   );
// };

// export default SelectCountryScreen;

// const styles = StyleSheet.create({
//   dropdown: {
//     // margin: 16,
//     height: 50,
//     width: "100%",
//     backgroundColor: "#EEEEEE",
//     borderRadius: 22,
//     paddingHorizontal: 8,
//     borderColor: "red",
//     borderWidth: 2,
//   },
//   imageStyle: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
// });

import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { checkMark, ratingStar } from "../../assets/svgs/svgs";
import {
  grayText,
  primaryBlack,
  primaryColor,
  primaryGray,
  primaryOrange,
  white,
} from "../../styles/colors";
import {
  regularFontSize,
  regularFontWeight,
  subHeaderFontWeight,
} from "../../styles/fonts";
import {
  primaryBorderRadius,
  primaryBorderWidth,
  primaryPadding,
} from "../../styles/topography";

export const ServiceCard = ({
  style,
  truncate,
  navigation,
}: {
  style?: any;
  truncate?: boolean;
  navigation: any;
}) => {
  let name = "Adebimbe Sylvesteredg";

  return (
    <View style={[styles.cardContainer, style]}>
      <Pressable onPress={navigation}>
        <View style={styles.cardImageContainer}>
          <View style={styles.handieHubLabelContainer}>
            <Text style={styles.handieHubLabel}>Handiehub</Text>
          </View>

          <Image
            source={require("../../assets/images/image5.jpg")}
            style={styles.cardImage}
            alt="service"
          />
        </View>

        <View
          style={tw`
    flex-row  my-[14px] items-center justify-between`}
        >
          <Image
            source={require("../../assets/images/Ellipse_15.png")}
            style={styles.profilePic}
            alt="profile-pic"
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[tw`flex-1 mx-2`, styles.handieName]}
          >
            {name}
          </Text>

          <SvgXml xml={checkMark} width="20px" height="20px" />
        </View>

        <Text style={styles.cardContent}>
          Everything carpentry and furniture, we deliver worldwide{" "}
        </Text>
        <View style={[styles.cardName, styles.cardRatingSection]}>
          <SvgXml xml={ratingStar} width="20px" height="20px" />
          <Text style={styles.ratingNumber}>5.0</Text>
          <Text style={styles.ratingCount}>(128)</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 250,
    padding: primaryPadding,
    borderWidth: primaryBorderWidth,
    borderColor: primaryGray,
    borderRadius: 15,
  },
  cardImageContainer: {
    height: 140,
    position: "relative",
  },
  handieHubLabelContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  handieHubLabel: {
    color: white,
    backgroundColor: primaryColor,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: primaryBorderRadius,
  },
  cardImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  cardName: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    marginVertical: 14,
    alignItems: "center",
  },
  profilePic: {
    resizeMode: "contain",
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  handieName: {
    fontSize: 16,
    color: primaryBlack,
    fontWeight: subHeaderFontWeight,
  },
  cardContent: {
    flexWrap: "wrap",
    color: grayText,
  },
  cardRatingSection: {
    marginBottom: 0,
  },
  ratingNumber: {
    color: primaryOrange,
    fontSize: regularFontSize,
    fontWeight: regularFontWeight,
  },
  ratingCount: {
    color: grayText,
  },
});

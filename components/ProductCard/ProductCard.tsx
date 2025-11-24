import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import {
  primaryBorderRadius,
  primaryBorderWidth,
  primaryPadding,
} from "../../styles/topography";
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
import { checkMark, ratingStar } from "../../assets/svgs/svgs";
import { Link } from "expo-router";

export const ProductCard = ({
  handiemanBizName,
  image,
  dp,
  name,
  description = "description",
  style,
  truncate,
  navigation,
  price,
}: {
  style?: any;
  truncate?: boolean;
  navigation: any;
  handiemanBizName: string;
  image: string;
  dp: string;
  name: string;
  description: string;
  price: string;
}) => {
  // let name = 'Adebimbe Sylvesteredg';

  return (
    <Link href={navigation}>
      <View style={[styles.cardContainer, style]}>
        <View style={styles.cardImageContainer}>
          <View style={styles.handieHubLabelContainer}>
            <Text style={styles.handieHubLabel}>{handiemanBizName}</Text>
          </View>

          <Image
            source={{ uri: image }}
            style={styles.cardImage}
            alt="service"
          />
        </View>

        <View style={styles.cardName}>
          <Image
            source={{ uri: dp }}
            style={styles.profilePic}
            alt="profile-pic"
          />
          {truncate ? (
            <Text style={styles.handieName}>{`${name.substring(
              0,
              10
            )}...`}</Text>
          ) : (
            <Text style={styles.handieName}>{`${name.substring(
              0,
              21
            )}...`}</Text>
          )}

          <SvgXml xml={checkMark} width="20px" height="20px" />
        </View>

        <Text style={styles.cardContent}>{description}</Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "700" }}>{`₦ ${price}`}</Text>
          {/* <View style={[styles.cardName, styles.cardRatingSection]}> */}
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SvgXml xml={ratingStar} width="20px" height="20px" />
            <Text style={styles.ratingNumber}>5.0</Text>
            <Text style={styles.ratingCount}>(128)</Text>
          </View>
        </View>
      </View>
    </Link>
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
    resizeMode: "cover",
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

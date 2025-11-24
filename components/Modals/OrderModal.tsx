import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { closeIcon } from "../../assets/svgs/svgs";
import { grayText, primaryBlack, white } from "../../styles/colors";
import { regularFontWeight, subHeaderFontWeight } from "../../styles/fonts";
import {
  headerFontSize,
  secondaryGap,
  tertiaryPadding,
} from "../../styles/topography";
import { ActionButton } from "../Atoms/ActionButton/ActionButton";

const { width } = Dimensions.get("window");

const OrderModal = ({
  actionOne,
  actionTwo,
}: {
  actionOne: () => void;
  actionTwo: () => void;
}) => {
  // const images = [
  //   {
  //     uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
  //   },
  //   {
  //     uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
  //   },
  //   {
  //     uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
  //   },
  // ];

  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const localImages = [
    { key: "firstOne", image: require("../../assets/images/chairImage.png") },
    { key: "secondOne", image: require("../../assets/images/chairImage.png") },
  ].map((image) => ({
    uri: RNImage.resolveAssetSource(image.image).uri,
    key: image.key,
  }));

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>Order</Text>
            <Pressable onPress={actionTwo}>
              <SvgXml xml={closeIcon} width="24px" height="24px" />
            </Pressable>
          </View>

          <View>
            <View style={styles.imageWrapper}>
              <Image
                source={require("../../assets/images/ProfilePic.png")}
                alt="profile-picture"
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.cardName}>
              <Text style={styles.handieName}>David Farinde</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 16,
                marginHorizontal: "auto",
              }}
            >
              <Text style={styles.regularFont}>+2347064821231</Text>
              <Text style={styles.regularFont}>NGN 100,000</Text>
              <Text style={styles.regularFont}>Pending</Text>
            </View>
          </View>

          <ScrollView style={{ minHeight: 400 }}>
            <View>
              <Text
                style={{
                  color: "#131313",
                  fontWeight: 700,
                  fontSize: 18,
                  marginVertical: 12,
                }}
              >
                Project brief
              </Text>
              <Text style={{ color: "#868686", fontWeight: 400, fontSize: 14 }}>
                Making fine furniture starts with the basics. Practicing basic
                techniques, just to improve on them, is not only a very good
                idea, it is a necessity. When I'm in the shop, and either don't
                feel like working on a particular project, or just need a break
                from the rest of the world, I will follow along in the path of
                previous master craftsmen who, while training apprentices, would
                have them repeat the same task, sometimes for weeks or months at
                a time, until they master it. The only difference is there is no
                master to guide me.
              </Text>
            </View>

            {/* <Image
            source={require('../../assets/images/chairImage.png')}
            alt="chair"
            // style={styles.imageStyle}
            style={{ width: '100%', resizeMode: 'contain' }}
          /> */}

            <View style={styles.containerTwo}>
              {localImages.map((image, index) => (
                <TouchableOpacity
                  key={image.key}
                  onPress={() => {
                    setImageIndex(0);
                    setIsVisible(true);
                  }}
                >
                  <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                </TouchableOpacity>
              ))}

              <ImageViewing
                images={localImages}
                imageIndex={imageIndex}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
              />
            </View>
          </ScrollView>
          <View style={styles.actionButton}>
            <View style={{ width: "48%" }}>
              <ActionButton text="Project Done" action={actionOne} />
            </View>
            <View style={{ width: "48%" }}>
              <ActionButton text="Project Done" action={actionOne} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    width: width,
    padding: tertiaryPadding,
    height: "100%",
  },
  actionButton: {
    marginVertical: 16,
    backgroundColor: "white",
    flexDirection: "row",
    columnGap: 16,
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
  imageWrapper: {
    paddingTop: 16,
  },
  imageStyle: {
    width: 120,
    borderRadius: 100,
    resizeMode: "contain",
    alignSelf: "center",
    height: 120,
  },
  cardName: {
    // flex: 1,
    flexDirection: "row",
    gap: 4,
    marginVertical: 12,
    alignItems: "center",
    alignSelf: "center",
  },
  handieName: {
    fontSize: headerFontSize,
    color: primaryBlack,
    fontWeight: subHeaderFontWeight,
  },
  regularFont: {
    color: grayText,
    fontWeight: regularFontWeight,
    textAlign: "center",
  },
  containerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  containerTwo: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: "row",
  },
  thumbnail: {
    width: width,
    height: width * (3 / 4),
    resizeMode: "contain",
  },
});

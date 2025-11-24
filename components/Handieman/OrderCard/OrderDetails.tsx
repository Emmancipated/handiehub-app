import { closeIcon } from "@/assets/svgs/svgs";
import {
  formatCurrency,
  getOrderStatusColor,
  getOrderStatusText,
  OrderItem,
} from "@/helper/order/helper";
import { grayText, primaryBlack, white } from "@/styles/colors";
import { regularFontWeight, subHeaderFontWeight } from "@/styles/fonts";
import {
  headerFontSize,
  secondaryGap,
  tertiaryPadding,
} from "@/styles/topography";
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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";

const { width } = Dimensions.get("window");

const OrderDetails = ({
  oncLose,
  selectedOrder,
}: {
  oncLose: () => void;
  selectedOrder: OrderItem;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const localImages = [
    { key: "firstOne", image: require("../../assets/images/chairImage.png") },
    { key: "secondOne", image: require("../../assets/images/chairImage.png") },
  ].map((image) => ({
    uri: RNImage.resolveAssetSource(image.image).uri,
    key: image.key,
  }));
  const {
    orderNumber,
    orderDate,
    seller,
    status,
    expectedCompletionDate,
    price,
    currency,
    location,
    title,
  } = selectedOrder;
  const statusText = getOrderStatusText(status);
  const statusColor = getOrderStatusColor(status);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>Order Detail</Text>
            <Pressable onPress={oncLose}>
              <SvgXml xml={closeIcon} width="24px" height="24px" />
            </Pressable>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <View style={tw`bg-[#f8f9fa] p-2 rounded-[6px] my-2`}>
                <Text style={tw`text-[#131313] font-semibold text-[18px]`}>
                  Order information
                </Text>
              </View>

              <View style={tw`flex-col gap-y-2`}>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>
                    Order Number :
                  </Text>
                  <Text style={styles.regularFont}>{orderNumber}</Text>
                </View>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>
                    Order Date :
                  </Text>
                  <Text style={styles.regularFont}>{orderDate}</Text>
                </View>

                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>Handieman :</Text>
                  <Text style={styles.regularFont}>{seller.name}</Text>
                </View>

                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>
                    Order Status :
                  </Text>
                  <Text style={[styles.regularFont, { color: statusColor }]}>
                    {statusText}
                  </Text>
                </View>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>
                    Expected Delivery :
                  </Text>
                  <Text style={styles.regularFont}>
                    {expectedCompletionDate}
                  </Text>
                </View>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>Delivered :</Text>
                  <Text style={styles.regularFont}>
                    {expectedCompletionDate}
                  </Text>
                </View>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>
                    Total Amount :
                  </Text>
                  <Text style={styles.regularFont}>
                    {formatCurrency(price, currency)}
                  </Text>
                </View>
              </View>

              <View style={tw`bg-[#f8f9fa] p-2 rounded-[6px] my-2`}>
                <Text style={tw`text-[#131313] font-semibold text-[18px]`}>
                  Delivery information
                </Text>
              </View>

              <View style={tw`flex-col gap-y-2`}>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>Name :</Text>
                  <Text style={styles.regularFont}>NGN 100,000</Text>
                </View>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>Address :</Text>
                  <Text style={styles.regularFont}>{location.address}</Text>
                </View>
                <View style={tw` flex-row justify-between py-1`}>
                  <Text style={tw`font-semibold text-[16px]`}>Contact :</Text>
                  <Text style={styles.regularFont}>NGN 100,000</Text>
                </View>
              </View>
            </View>

            <View style={tw`bg-[#f8f9fa] p-2 rounded-[6px] my-2`}>
              <Text style={tw`text-[#131313] font-semibold text-[18px]`}>
                Items/ Services Ordered
              </Text>
            </View>

            {localImages.map((image, index) => (
              <Pressable
                key={image.key}
                onPress={() => {
                  setImageIndex(0);
                  setIsVisible(true);
                }}
              >
                <View
                  style={tw`my-1 border-b border-[#FAFAFA] pb-1 flex-row justify-between items-end`}
                >
                  <View>
                    <Image
                      source={{ uri: image.uri }}
                      style={tw`w-[80px] h-[80px] rounded-[6px]`}
                    />
                    <Text style={tw`text-[#868686] text-xs`}>
                      Name: {title}{" "}
                    </Text>
                    <Text style={tw`text-[#868686] text-xs`}>Quantity: 2 </Text>
                    <Text>Price: NGN 100,000</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => console.log("Clicked")}
                    style={tw`bg-[#5B48FC] py-2 px-3 rounded-[6px]`}
                  >
                    <Text style={tw`text-white font-bold`}>Bug Again</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            ))}

            {/* <ImageViewing
              images={localImages}
              imageIndex={imageIndex}
              visible={isVisible}
              onRequestClose={() => setIsVisible(false)}
            /> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OrderDetails;

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

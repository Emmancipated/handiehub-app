import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";

import {
  OrderItem,
  getOrderStatusColor,
  getOrderStatusText,
  formatCurrency,
  formatDate,
} from "@/helper/order/helper";
import { grayText, primaryBlack, secondaryColor } from "@/styles/colors";
import tw from "twrnc";
import CountdownTimer from "../CountDown";

interface OrderCardProps {
  order: OrderItem;
  onPress: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const statusColor = getOrderStatusColor(order.status);
  const statusText = getOrderStatusText(order.status);
  // const target = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const target = new Date(Date.now() + 1 * 60 * 1000);

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Header with Order Number and Status */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: grayText,
              fontWeight: "500",
            }}
          >
            {order.orderNumber} {`(Qty: 2)`}
          </Text>
          <View
            style={{
              backgroundColor: statusColor + "15",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: statusColor,
                fontWeight: "600",
              }}
            >
              {statusText}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 12,
            alignItems: "center",
          }}
        >
          {/* Service Icon */}
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: secondaryColor,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Text style={{ fontSize: 20 }}>
              <Image
                source={require("../../../assets/images/chairImage.png")}
                style={tw`w-[80px] h-[80px] rounded-[6px]`}
              />
            </Text>
          </View>

          {/* Service Details */}
          <View style={{ flex: 1 }}>
            <Text style={tw`text-base font-semibold text-[#131313] mb-1`}>
              {order.title}
            </Text>
            {order.expectedCompletionDate && (
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-base font-semibold `}>
                  Auto cancellation:{" "}
                </Text>
                <CountdownTimer targetTime={target} />
              </View>
            )}
          </View>
        </View>

        {/* Price and Date */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: primaryBlack,
              }}
            >
              {formatCurrency(order.price, order.currency)}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: grayText,
              }}
            >
              Ordered {formatDate(order.orderDate)}
            </Text>
          </View>

          {order.expectedCompletionDate && (
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 12,
                  color: grayText,
                  fontWeight: "500",
                }}
              >
                Expected: {formatDate(order.expectedCompletionDate)}
              </Text>
              {order.completionDate && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#10b981",
                    fontWeight: "500",
                  }}
                >
                  Completed: {formatDate(order.completionDate)}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

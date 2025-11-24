import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { briefCaseIcon } from "../../assets/svgs/svgs";
import {
  OrderItem,
  getOrderStatusColor,
  getOrderStatusText,
  formatCurrency,
  formatDate,
} from "../../helper/order/helper";
import { grayText, primaryBlack, secondaryColor } from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import { Boxes } from "lucide-react-native";

interface OrderCardProps {
  order: OrderItem;
  onPress: () => void;
  onContactSeller?: () => void;
  onTrackOrder?: () => void;
  onReviewOrder?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPress,
  onContactSeller,
  onTrackOrder,
  onReviewOrder,
}) => {
  const statusColor = getOrderStatusColor(order.status);
  const statusText = getOrderStatusText(order.status);

  const getCategoryIcon = (category: string): string => {
    switch (category.toLowerCase()) {
      case "carpentry":
        return "🔨";
      case "cleaning":
        return "🧹";
      case "plumbing":
        return "🔧";
      case "electrical":
        return "⚡";
      case "nanny & childcare":
        return "👶";
      case "landscaping":
        return "🌱";
      case "painting":
        return "🎨";
      case "welding":
        return "⚡";
      default:
        return "📦";
    }
  };

  const getActionButtons = () => {
    const buttons = [];

    if (order.status === "pending") {
      buttons.push(
        <TouchableOpacity
          key="contact"
          onPress={onContactSeller}
          style={{
            backgroundColor: "#f3f4f6",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: primaryBlack,
              fontWeight: "500",
            }}
          >
            Contact
          </Text>
        </TouchableOpacity>
      );
    }

    if (order.status === "in_progress" || order.status === "confirmed") {
      buttons.push(
        <TouchableOpacity
          key="track"
          onPress={onTrackOrder}
          style={{
            backgroundColor: "#3b82f6",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "white",
              fontWeight: "500",
            }}
          >
            Track
          </Text>
        </TouchableOpacity>
      );
    }

    if (order.status === "completed") {
      buttons.push(
        <TouchableOpacity
          key="review"
          onPress={onReviewOrder}
          style={{
            backgroundColor: "#10b981",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "white",
              fontWeight: "500",
            }}
          >
            Review
          </Text>
        </TouchableOpacity>
      );
    }

    return buttons;
  };

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
            {order.orderNumber}
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
              {/* {getCategoryIcon(order.category)} */}
              <Boxes color="#5B48FC" size={32} />
            </Text>
          </View>

          {/* Service Details */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: primaryBlack,
                marginBottom: 4,
              }}
            >
              {order.title}
            </Text>
            {/* <Text
              style={{
                fontSize: 12,
                color: grayText,
                marginBottom: 8,
                lineHeight: 16,
              }}
            >
              {order.description}
            </Text> */}

            {/* Seller Information */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Image
                source={order.seller.profileImage}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  marginRight: 6,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: primaryBlack,
                  fontWeight: "500",
                  marginRight: 8,
                }}
              >
                {order.seller.name}
              </Text>
              {order.seller.isVerified && (
                <View
                  style={{
                    backgroundColor: "#10b981",
                    borderRadius: 8,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    marginRight: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    ✓
                  </Text>
                </View>
              )}
              <Text
                style={{
                  fontSize: 10,
                  color: grayText,
                }}
              >
                ⭐ {order.seller.rating} ({order.seller.reviewCount})
              </Text>
            </View>

            {/* Seller Business Info */}
            {/* <Text
              style={{
                fontSize: 11,
                color: grayText,
                marginBottom: 4,
              }}
            >
              {order.seller.businessName} • {order.seller.location}
            </Text> */}
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

        {/* Progress Bar (for in-progress orders) */}
        {/* {order.progress && (
          <View
            style={{
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: primaryBlack,
                  fontWeight: "500",
                }}
              >
                Progress
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: grayText,
                }}
              >
                {order.progress.currentStep} of {order.progress.totalSteps}
              </Text>
            </View>
            <View
              style={{
                height: 4,
                backgroundColor: "#e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${
                    (order.progress.currentStep / order.progress.totalSteps) *
                    100
                  }%`,
                  backgroundColor: "#3b82f6",
                  borderRadius: 2,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 10,
                color: grayText,
                marginTop: 4,
              }}
            >
              {order.progress.steps[order.progress.currentStep - 1]}
            </Text>
          </View>
        )} */}

        {/* Communication Info */}
        {/* {order.communication.lastMessage && (
          <View
            style={{
              backgroundColor: "#f8f9fa",
              padding: 8,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: grayText,
                marginBottom: 2,
              }}
            >
              Last message ({order.communication.messageCount} messages)
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: primaryBlack,
                lineHeight: 16,
              }}
            >
              {order.communication.lastMessage}
            </Text>
          </View>
        )} */}

        {/* Action Buttons */}
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {getActionButtons()}

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={onContactSeller}
            style={{
              backgroundColor: "#f3f4f6",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: primaryBlack,
                fontWeight: "500",
              }}
            >
              Message
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </Pressable>
  );
};

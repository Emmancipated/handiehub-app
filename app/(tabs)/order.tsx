import OrderDetails from "@/components/OrderCard/OrderDetails";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  // SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { CategoryItem } from "../../components/Atoms/CategoryItem/CategoryItem";
import { NotificationIcon } from "../../components/Atoms/NotificationIcon/NotificationIcon";
import { ModalsWrapper } from "../../components/ModalsWrapper/ModalsWrapper";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import {
  categories,
  filterOrdersByStatus,
  OrderItem,
  sampleOrders,
} from "../../helper/order/helper";
import { primaryBlack, primaryColor } from "../../styles/colors";
import { styles } from "../../styles/order/styles";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

const OrderScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [active, setActive] = useState(0);
  const [orders, setOrders] = useState<OrderItem[]>(sampleOrders);
  const [filteredOrders, setFilteredOrders] =
    useState<OrderItem[]>(sampleOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem>(
    sampleOrders[0]
  );

  // Filter orders based on selected category
  useEffect(() => {
    const selectedCategory = categories[active];
    const filtered = filterOrdersByStatus(orders, selectedCategory);
    setFilteredOrders(filtered);
  }, [active, orders]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      const selectedCategory = categories[active];
      setFilteredOrders(filterOrdersByStatus(orders, selectedCategory));
    } else {
      const searchResults = orders.filter(
        (order) =>
          order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.seller.businessName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(searchResults);
    }
  }, [searchQuery, active, orders]);

  const handleOrderPress = (order: OrderItem) => {
    setSelectedOrder(order);
    setModalVisible(true);
    // Navigate to order details page
    // router.push(`/order/${order.id}`);
  };

  const handleContactSeller = (order: OrderItem) => {
    // Navigate to chat with seller
    // router.push("/(tabs)/chat");
  };

  const handleTrackOrder = (order: OrderItem) => {
    // Navigate to order tracking page
    router.push("/(tabs)");
  };

  const handleReviewOrder = (order: OrderItem) => {
    // Navigate to review page
    router.push("/(tabs)");
  };

  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const inProgress = orders.filter((o) => o.status === "in_progress").length;
    const completed = orders.filter((o) => o.status === "completed").length;

    return { total, pending, inProgress, completed };
  };

  const stats = getOrderStats();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={[styles.appContainer]}>
        <View style={{ height: "100%" }}>
          <View style={tw`flex flex-row items-center justify-between `}>
            <View />
            <Text style={styles.headerSection}>Orders</Text>
            <NotificationIcon />
          </View>

          {/* Order Statistics */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: primaryBlack,
                }}
              >
                {stats.total}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#666",
                }}
              >
                Total Orders
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#B97502",
                }}
              >
                {stats.pending}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#666",
                }}
              >
                Pending
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#f59e0b",
                }}
              >
                {stats.inProgress}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#666",
                }}
              >
                In Progress
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#10b981",
                }}
              >
                {stats.completed}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#666",
                }}
              >
                Completed
              </Text>
            </View>
          </View>

          {/* Search Bar */}
          <View
            style={{
              paddingHorizontal: 16,
              marginBottom: 16,
              borderRadius: 100,
            }}
          >
            <View
              style={tw` rounded-[100px] overflow-hidden border border-[#e5e7eb]`}
            >
              <TextInput
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 16,
                }}
                placeholder="Search orders, sellers, or services..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Filter Categories */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
          >
            {categories.map((category, i) => (
              <CategoryItem
                category={category}
                key={category}
                activeIndex={i === active ? category : ""}
                svg={""}
                action={() => setActive(i)}
              />
            ))}
          </View>

          {/* Orders List */}
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={primaryColor} />
                <Text
                  style={{
                    marginTop: 12,
                    color: "#666",
                    fontSize: 14,
                  }}
                >
                  Loading orders...
                </Text>
              </View>
            ) : filteredOrders.length > 0 ? (
              <View style={{ paddingHorizontal: 16 }}>
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onPress={() => handleOrderPress(order)}
                    onContactSeller={() => handleContactSeller(order)}
                    onTrackOrder={() => handleTrackOrder(order)}
                    onReviewOrder={() => handleReviewOrder(order)}
                  />
                ))}
              </View>
            ) : (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#666",
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                >
                  {searchQuery
                    ? `No orders found for "${searchQuery}"`
                    : "No orders found for this filter"}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)")}
                  style={{
                    backgroundColor: primaryColor,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Browse Services
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>

        <ModalsWrapper
          isOpen={modalVisible}
          closeModal={() => setModalVisible(false)}
        >
          <OrderDetails
            oncLose={() => setModalVisible(false)}
            selectedOrder={selectedOrder}
          />
        </ModalsWrapper>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

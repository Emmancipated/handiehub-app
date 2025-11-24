import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HeaderGroup } from "../../components/Header/Header";
import { NotificationIcon } from "../../components/Atoms/NotificationIcon/NotificationIcon";
import {
  getSellerById,
  getProductsBySellerId,
  getReviewsBySellerId,
  formatCurrency,
  formatDate,
  getRatingColor,
  getStarRating,
  SellerProfile,
  SellerProduct,
  SellerReview,
} from "../../helper/seller/helper";
import {
  primaryBlack,
  primaryColor,
  grayText,
  secondaryColor,
} from "../../styles/colors";
import { fontFamily } from "../../styles/fonts";
import { sellerProfileStyles } from "../../styles/seller/profile";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
const SellerProfileScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [seller, setSeller] = useState<SellerProfile | null>(null);
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [reviews, setReviews] = useState<SellerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "reviews">(
    "products"
  );

  useEffect(() => {
    const fetchSellerData = async () => {
      setLoading(true);
      try {
        const sellerData = getSellerById(id || "");
        if (sellerData) {
          setSeller(sellerData);
          setProducts(getProductsBySellerId(id || ""));
          setReviews(getReviewsBySellerId(id || ""));
        } else {
          Alert.alert("Error", "Seller not found");
          router.back();
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load seller profile");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSellerData();
    }
  }, [id, router]);

  const handleContactSeller = () => {
    router.push("/(tabs)/chat");
  };

  const handleBookService = (product: SellerProduct) => {
    Alert.alert("Book Service", `Booking ${product.title} - Coming soon!`);
  };

  const handleViewProduct = (product: SellerProduct) => {
    router.push(`/product/${product.id}`);
  };

  const renderProduct = ({ item }: { item: SellerProduct }) => (
    <TouchableOpacity
      onPress={() => handleViewProduct(item)}
      style={sellerProfileStyles.productCard}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={sellerProfileStyles.productImage}
        resizeMode="cover"
      />
      <Text style={sellerProfileStyles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={sellerProfileStyles.productDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={sellerProfileStyles.productRating}>
        <Text
          style={[
            sellerProfileStyles.productStarRating,
            { color: getRatingColor(item.rating) },
          ]}
        >
          {getStarRating(item.rating)}
        </Text>
        <Text style={sellerProfileStyles.productReviewCount}>
          ({item.reviewCount})
        </Text>
      </View>
      <Text style={sellerProfileStyles.productPrice}>
        {formatCurrency(item.price, item.currency)}
      </Text>
      <TouchableOpacity
        onPress={() => handleBookService(item)}
        style={sellerProfileStyles.bookButton}
      >
        <Text style={sellerProfileStyles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderReview = ({ item }: { item: SellerReview }) => (
    <View style={sellerProfileStyles.reviewCard}>
      <View style={sellerProfileStyles.reviewHeader}>
        <Image
          source={item.customerImage}
          style={sellerProfileStyles.customerImage}
        />
        <View style={sellerProfileStyles.customerInfo}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Text style={sellerProfileStyles.customerName}>
              {item.customerName}
            </Text>
            {item.isVerified && (
              <View style={sellerProfileStyles.reviewVerifiedBadge}>
                <Text style={sellerProfileStyles.reviewVerifiedText}>✓</Text>
              </View>
            )}
          </View>
          <View style={sellerProfileStyles.reviewRating}>
            <Text
              style={[
                sellerProfileStyles.reviewStarRating,
                { color: getRatingColor(item.rating) },
              ]}
            >
              {getStarRating(item.rating)}
            </Text>
            <Text style={sellerProfileStyles.reviewDate}>
              {formatDate(item.date)}
            </Text>
          </View>
        </View>
      </View>
      <Text style={sellerProfileStyles.reviewTitle}>{item.title}</Text>
      <Text style={sellerProfileStyles.reviewComment}>{item.comment}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={sellerProfileStyles.loadingContainer}>
          <ActivityIndicator size="large" color={primaryColor} />
          <Text style={sellerProfileStyles.loadingText}>
            Loading seller profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!seller) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={sellerProfileStyles.errorContainer}>
          <Text style={sellerProfileStyles.errorTitle}>Seller not found</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={sellerProfileStyles.errorButton}
          >
            <Text style={sellerProfileStyles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? "light-content" : "dark-content"}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    <View style={{ flex: 1 }}>
      {/* Header */}
      <HeaderGroup>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={sellerProfileStyles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={sellerProfileStyles.headerTitle}>Seller Profile</Text>
        <NotificationIcon />
      </HeaderGroup>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Seller Info Card */}
        <View style={sellerProfileStyles.card}>
          <View style={sellerProfileStyles.sellerInfoContainer}>
            <Image
              source={seller.profileImage}
              style={sellerProfileStyles.sellerImage}
            />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Text style={sellerProfileStyles.sellerName}>
                  {seller.name}
                </Text>
                {seller.isVerified && (
                  <View style={sellerProfileStyles.verifiedBadge}>
                    <Text style={sellerProfileStyles.verifiedText}>
                      ✓ Verified
                    </Text>
                  </View>
                )}
              </View>
              <Text style={sellerProfileStyles.businessName}>
                {seller.businessName}
              </Text>
              <View style={sellerProfileStyles.ratingContainer}>
                <Text
                  style={[
                    sellerProfileStyles.starRating,
                    { color: getRatingColor(seller.rating) },
                  ]}
                >
                  {getStarRating(seller.rating)}
                </Text>
                <Text style={sellerProfileStyles.ratingValue}>
                  {seller.rating}
                </Text>
                <Text style={sellerProfileStyles.reviewCount}>
                  ({seller.reviewCount} reviews)
                </Text>
              </View>
              <Text style={sellerProfileStyles.location}>
                📍 {seller.location}
              </Text>
            </View>
          </View>

          <Text style={sellerProfileStyles.description}>
            {seller.description}
          </Text>

          <View style={sellerProfileStyles.statsRow}>
            <View style={sellerProfileStyles.statItem}>
              <Text style={sellerProfileStyles.statLabel}>Experience</Text>
              <Text style={sellerProfileStyles.statValue}>
                {seller.experience}
              </Text>
            </View>
            <View style={sellerProfileStyles.statItemLast}>
              <Text style={sellerProfileStyles.statLabel}>Completion Rate</Text>
              <Text style={sellerProfileStyles.statValue}>
                {seller.completionRate}%
              </Text>
            </View>
          </View>

          <View style={sellerProfileStyles.statsRow}>
            <View style={sellerProfileStyles.statItem}>
              <Text style={sellerProfileStyles.statLabel}>Response Time</Text>
              <Text style={sellerProfileStyles.statValue}>
                {seller.responseTime}
              </Text>
            </View>
            <View style={sellerProfileStyles.statItemLast}>
              <Text style={sellerProfileStyles.statLabel}>Total Orders</Text>
              <Text style={sellerProfileStyles.statValue}>
                {seller.totalOrders}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleContactSeller}
            style={sellerProfileStyles.contactButton}
          >
            <Text style={sellerProfileStyles.contactButtonText}>
              Contact Seller
            </Text>
          </TouchableOpacity>
        </View>

        {/* Specialties */}
        <View style={sellerProfileStyles.card}>
          <Text style={sellerProfileStyles.cardTitle}>Specialties</Text>
          <View style={sellerProfileStyles.specialtiesContainer}>
            {seller.specialties.map((specialty, index) => (
              <View key={index} style={sellerProfileStyles.specialtyTag}>
                <Text style={sellerProfileStyles.specialtyText}>
                  {specialty}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Portfolio */}
        {seller.portfolio.length > 0 && (
          <View style={sellerProfileStyles.card}>
            <Text style={sellerProfileStyles.cardTitle}>Portfolio</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              {seller.portfolio.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={sellerProfileStyles.portfolioImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Tabs */}
        <View style={sellerProfileStyles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("products")}
            style={[
              sellerProfileStyles.tabButton,
              activeTab === "products"
                ? sellerProfileStyles.tabButtonActive
                : sellerProfileStyles.tabButtonInactive,
            ]}
          >
            <Text
              style={[
                sellerProfileStyles.tabText,
                activeTab === "products"
                  ? sellerProfileStyles.tabTextActive
                  : sellerProfileStyles.tabTextInactive,
              ]}
            >
              Products & Services ({products.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("reviews")}
            style={[
              sellerProfileStyles.tabButton,
              activeTab === "reviews"
                ? sellerProfileStyles.tabButtonActive
                : sellerProfileStyles.tabButtonInactive,
            ]}
          >
            <Text
              style={[
                sellerProfileStyles.tabText,
                activeTab === "reviews"
                  ? sellerProfileStyles.tabTextActive
                  : sellerProfileStyles.tabTextInactive,
              ]}
            >
              Reviews ({reviews.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === "products" ? (
          <View style={{ marginHorizontal: 16 }}>
            <Text style={sellerProfileStyles.contentTitle}>
              Products & Services
            </Text>
            <FlatList
              data={products}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            />
          </View>
        ) : (
          <View style={{ marginHorizontal: 16 }}>
            <Text style={sellerProfileStyles.contentTitle}>
              Customer Reviews
            </Text>
            <FlatList
              data={reviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

export default SellerProfileScreen;

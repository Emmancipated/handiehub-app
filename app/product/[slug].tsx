// import { useEffect, useState } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Text, View, ActivityIndicator } from "react-native";
// import { getProduct } from "@/services/productServices";

// export default function ProductPage() {
//   const { slug } = useLocalSearchParams(); // Get slug from URL
//   const router = useRouter();
//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         // const response = await fetch(`https://your-api.com/products/${slug}`);
//         const response = await getProduct(slug as string);

//         if (response.statusCode === 404) {
//           setNotFound(true);
//         } else {
//           const data = response;
//           setProduct(data);
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setNotFound(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [slug]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (notFound) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//           404 - Product Not Found
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product?.name}</Text>
//       <Text>{product?.description}</Text>
//     </View>
//   );
// }

import { getProduct } from "@/services/productServices";
import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowBigLeft } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const { width } = Dimensions.get("window");

const ProductDetailScreen = () => {
  const { slug } = useLocalSearchParams();
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  console.log(slug);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await fetch(`https://your-api.com/products/${slug}`);
        const response = await getProduct(slug as string);

        if (response.statusCode === 404) {
          setNotFound(true);
        } else {
          const data = response;
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const router = useRouter();
  // In a real app, you would get this data from route.params or an API call
  const product = {
    id: "1",
    name: "Ambience Black Chair",
    price: 249.99,
    rating: 4.6,
    reviews: 223,
    seller: {
      name: "Ambience Furniture Ambience Furniture Ambience Furniture",
      isVerified: true,
      responseTime: "2 hours",
    },
    description:
      "Everything urgently available. Modern black furniture, we deliver worldwide.",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    colors: ["#000000", "#614A3D", "#CCCCCC"],
    inStock: true,
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const handleBuyNow = () => {
    // Navigate to checkout screen
    // Alert.alert("Success", "Proceeding to checkout...");
    router.navigate("/checkout/payment");
  };

  const handleAddToCart = () => {
    Alert.alert("Success", "Product added to cart!");
  };

  const checkAvailability = () => {
    setCheckingAvailability(true);
    // Simulate API call to check availability
    setTimeout(() => {
      setCheckingAvailability(false);
      Alert.alert(
        "Availability Confirmed",
        `${product.seller.name} has confirmed this item is available for delivery within 3-5 business days.`
      );
    }, 1500);
  };

  // const renderStars = (rating) => {
  //   const stars = [];
  //   const fullStars = Math.floor(rating);
  //   const halfStar = rating - fullStars >= 0.5;

  //   for (let i = 0; i < 5; i++) {
  //     if (i < fullStars) {
  //       stars.push(
  //         <SvgXml
  //           xml={briefCaseIcon}
  //           width="24px"
  //           height="24px"
  //           key={`star-${i}`}
  //         />
  //       );
  //     } else if (i === fullStars && halfStar) {
  //       stars.push(
  //         <SvgXml
  //           xml={briefCaseIcon}
  //           width="24px"
  //           height="24px"
  //           key={`star-${i}`}
  //         />
  //       );
  //     } else {
  //       stars.push(
  //         <SvgXml
  //           xml={briefCaseIcon}
  //           width="24px"
  //           height="24px"
  //           key={`star-${i}`}
  //         />
  //       );
  //     }
  //   }

  //   return stars;
  // };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    return [...Array(5)].map((_, i) => {
      if (i < fullStars) {
        return <Ionicons key={i} name="star" size={20} color="#FFD700" />;
      } else if (i === fullStars && halfStar) {
        return <Ionicons key={i} name="star-half" size={20} color="#FFD700" />;
      } else {
        return (
          <Ionicons key={i} name="star-outline" size={20} color="#FFD700" />
        );
      }
    });
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <ArrowBigLeft color="#5B48FC" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        {/* <View style={styles.header}>
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="share" size={24} color="#333" />
          </TouchableOpacity>
        </View> */}

        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[selectedImage] }}
            style={styles.mainImage}
          />
          <View style={styles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                style={[
                  styles.thumbnailWrapper,
                  selectedImage === index && styles.selectedThumbnail,
                ]}
              >
                <Image source={{ uri: image }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            {/* <View style={styles.favoriteButton}>
              <AntDesign name="heart" size={24} color="#333" />
            </View> */}
            <AnimatedHeart />
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>{renderStars(product.rating)}</View>
            <RatingStars defaultRating={5} size={20} />
            <Text style={styles.reviews}>
              {product.rating} ({product.reviews})
            </Text>
          </View>

          <Text style={styles.price}>${product.price}</Text>

          {/* Seller Info */}
          <View style={styles.sellerContainer}>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerNameContainer}>
                <Text style={styles.sellerLabel}>Seller:</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[tw`flex-1 mx-2`, styles.sellerName]}
                >
                  {product.seller.name}
                </Text>
                {product.seller.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Feather name="check" size={12} color="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.responseTime}>
                Response time: {product.seller.responseTime}
              </Text>
            </View>
            {/* <TouchableOpacity
              style={[
                styles.checkAvailabilityButton,
                checkingAvailability && styles.checkingButton,
              ]}
              onPress={checkAvailability}
              disabled={checkingAvailability}
            >
              {checkingAvailability ? (
                <Text style={styles.checkButtonText}>Checking...</Text>
              ) : (
                <Text style={styles.checkButtonText}>Check Availability</Text>
              )}
            </TouchableOpacity> */}
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Color Selection */}
          <View style={styles.colorContainer}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {product.colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === index && styles.selectedColorOption,
                  ]}
                  onPress={() => setSelectedColor(index)}
                />
              ))}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Feather name="minus" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Feather name="plus" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Feather name="shopping-cart" size={20} color="#7B3DFF" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  mainImage: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
  thumbnailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  thumbnailWrapper: {
    marginHorizontal: 5,
    borderRadius: 8,
    padding: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedThumbnail: {
    borderColor: "#7B3DFF",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  infoContainer: {
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  stars: {
    flexDirection: "row",
  },
  reviews: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },
  sellerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sellerLabel: {
    fontSize: 14,
    color: "#666",
  },
  sellerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 5,
  },
  verifiedBadge: {
    backgroundColor: "#7B3DFF",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  responseTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  checkAvailabilityButton: {
    backgroundColor: "#F0E6FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  checkingButton: {
    backgroundColor: "#E0D6EF",
  },
  checkButtonText: {
    color: "#7B3DFF",
    fontSize: 12,
    fontWeight: "600",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
  },
  colorContainer: {
    marginTop: 20,
  },
  colorOptions: {
    flexDirection: "row",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#7B3DFF",
  },
  quantityContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 15,
  },
  actionContainer: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#fff",
  },
  cartButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#7B3DFF",
    borderRadius: 10,
  },
  cartButtonText: {
    color: "#7B3DFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  buyButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#7B3DFF",
    borderRadius: 10,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  burst: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,0,0,0.4)",
  },
});

const AnimatedStar = ({
  filled,
  half,
  onPress,
  size = 26,
}: {
  filled: boolean;
  half: boolean;
  onPress: () => void;
  size: number;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.3,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [filled, half]);

  const iconName = filled ? "star" : half ? "star-half" : "star-outline";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons name={iconName} size={size} color="#FFD700" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const RatingStars = ({
  defaultRating = 0,
  size,
}: {
  defaultRating: number;
  size: number;
}) => {
  const [rating, setRating] = useState(defaultRating);

  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = rating + 0.5 === star;

        return (
          <AnimatedStar
            key={star}
            filled={filled}
            half={half}
            size={size}
            onPress={() => setRating(star)}
          />
        );
      })}
    </View>
  );
};

const AnimatedHeart = () => {
  const [liked, setLiked] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const burst = useRef(new Animated.Value(0)).current;

  const triggerAnimation = () => {
    setLiked(!liked);

    Animated.parallel([
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.4,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(burst, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => burst.setValue(0));
  };

  const burstStyle = {
    opacity: burst,
    transform: [
      {
        scale: burst.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 2],
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback onPress={triggerAnimation}>
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Burst Effect */}
        <Animated.View style={[styles.burst, burstStyle]} />

        {/* Heart */}
        <Animated.View style={{ transform: [{ scale }] }}>
          {/* <AntDesign
            name={liked ? "heart" : "heart-o"}
            size={26}
            color={liked ? "red" : "#333"}
          /> */}
          <FontAwesome
            name={liked ? "heart" : "heart-o"}
            size={26}
            color={liked ? "red" : "#333"}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

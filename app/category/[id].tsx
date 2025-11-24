import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { getCategoryById, getSubCategories } from "@/helper/home/helper";
import {
  getAllProducts,
  getProductsByCategory,
} from "@/services/productServices";
import { primaryBlack, primaryColor, white } from "@/styles/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowBigLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

export default function CategoryPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const category = getCategoryById(id as string);
  const subCategories = getSubCategories(id as string);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productsData;

        if (id === "all") {
          // Fetch all products for "All Categories"
          productsData = await getAllProducts("1", "50");
        } else {
          // Fetch products by specific category
          productsData = await getProductsByCategory(id as string, "1", "50");
        }

        setProducts(productsData?.data || []);
      } catch (error) {
        console.log("Error fetching products:", error);
        // Fallback to all products if category-specific fetch fails
        try {
          const fallbackData = await getAllProducts("1", "50");
          setProducts(fallbackData?.data || []);
        } catch (fallbackError) {
          console.log("Fallback fetch also failed:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleSubCategoryPress = (subCategory: string) => {
    setSelectedSubCategory(
      selectedSubCategory === subCategory ? "" : subCategory
    );
  };

  const handleBackPress = () => {
    router.back();
  };

  if (!category) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: primaryBlack }}>
            Category not found
          </Text>
          <ActionButton
            text="Go Back"
            action={handleBackPress}
            activateButton={false}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        <TouchableOpacity onPress={handleBackPress} style={{ marginRight: 12 }}>
          <Text style={{ fontSize: 18, color: primaryColor }}>
            <ArrowBigLeft color="#5B48FC" size={24} />
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: primaryBlack,
            }}
          >
            {category.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              marginTop: 2,
            }}
          >
            {category.description}
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Category Icon and Info */}
        <View
          style={{
            backgroundColor: category.color + "10",
            padding: 20,
            alignItems: "center",
            margin: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 48, marginBottom: 8 }}>{category.icon}</Text>
          <Text
            style={{
              fontSize: 16,
              color: primaryBlack,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            {category.description}
          </Text>
        </View>

        {/* Sub-categories */}
        {subCategories.length > 0 && (
          <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: primaryBlack,
                marginBottom: 12,
              }}
            >
              Sub-categories
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {subCategories.map((subCategory, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSubCategoryPress(subCategory)}
                  style={{
                    backgroundColor:
                      selectedSubCategory === subCategory
                        ? category.color
                        : "#f3f4f6",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor:
                      selectedSubCategory === subCategory
                        ? category.color
                        : "#e5e7eb",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color:
                        selectedSubCategory === subCategory
                          ? white
                          : primaryBlack,
                      fontWeight:
                        selectedSubCategory === subCategory ? "600" : "400",
                    }}
                  >
                    {subCategory}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Products/Services Section */}
        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: primaryBlack,
              }}
            >
              Available Services
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666",
              }}
            >
              {products.length} services
            </Text>
          </View>

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
                Loading services...
              </Text>
            </View>
          ) : products.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {products.map((product, index) => (
                <View
                  key={product?._id || index}
                  style={{ width: "48%", marginBottom: 12 }}
                >
                  <ProductCard
                    navigation={`/product/${product?.slug}`}
                    handiemanBizName={
                      product?.handieman?.handiemanProfile?.businessName
                    }
                    image={product?.images?.[0]}
                    dp={product?.handieman?.handiemanProfile?.dp_url}
                    description={product?.description}
                    name={product?.name}
                    price={product?.amount}
                  />
                </View>
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
                No services available in this category yet
              </Text>
              <ActionButton
                text="Browse All Categories"
                action={() => router.push("/(tabs)")}
                activateButton={false}
              />
            </View>
          )}
        </View>

        {/* Call to Action */}
        <View
          style={{
            backgroundColor: "#f8f9fa",
            margin: 16,
            padding: 20,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: primaryBlack,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Need {category.name.toLowerCase()} service?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Post your job and get quotes from qualified professionals
          </Text>
          <ActionButton
            text="Post a Job"
            action={() => router.push("/handieman")}
            activateButton={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { ActionButton } from "@/components/Atoms/ActionButton/ActionButton";
import { categoryData, searchCategories } from "@/helper/home/helper";
import { primaryBlack, primaryColor, white } from "@/styles/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

export default function AllCategoriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const filteredCategories = searchQuery
    ? searchCategories(searchQuery)
    : categoryData;

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleBackPress = () => {
    router.back();
  };

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
          <Text style={{ fontSize: 18, color: primaryColor }}>←</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: primaryBlack,
            flex: 1,
          }}
        >
          All Categories
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#f8f9fa",
        }}
      >
        <TextInput
          style={{
            backgroundColor: white,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
          placeholder="Search categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Categories Grid */}
        <View
          style={{
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: primaryBlack,
              marginBottom: 16,
            }}
          >
            {searchQuery
              ? `Search Results (${filteredCategories.length})`
              : "Browse by Category"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryPress(category.id)}
                style={{
                  width: "48%",
                  backgroundColor: white,
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
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 36, marginBottom: 8 }}>
                    {category.icon}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: primaryBlack,
                      textAlign: "center",
                      marginBottom: 4,
                    }}
                  >
                    {category.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#666",
                      textAlign: "center",
                      lineHeight: 14,
                      marginBottom: 8,
                    }}
                  >
                    {category.description}
                  </Text>
                  <View
                    style={{
                      backgroundColor: category.color + "15",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: category.color,
                        fontWeight: "600",
                      }}
                    >
                      {category.subCategories.length} services
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredCategories.length === 0 && (
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
                No categories found for "{searchQuery}"
              </Text>
              <ActionButton
                text="Clear Search"
                action={() => setSearchQuery("")}
                activateButton={false}
              />
            </View>
          )}
        </View>

        {/* Popular Sub-categories */}
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: primaryBlack,
              marginBottom: 16,
            }}
          >
            Popular Services
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {categoryData.slice(0, 5).map((category) => (
              <View key={category.id} style={{ marginRight: 12 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: category.color,
                    marginBottom: 8,
                    textAlign: "center",
                  }}
                >
                  {category.icon} {category.name}
                </Text>
                <View
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: 8,
                    padding: 8,
                    minWidth: 120,
                  }}
                >
                  {category.subCategories
                    .slice(0, 3)
                    .map((subCategory, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleCategoryPress(category.id)}
                        style={{
                          paddingVertical: 4,
                          paddingHorizontal: 8,
                          marginBottom: 4,
                          backgroundColor: white,
                          borderRadius: 6,
                          borderWidth: 1,
                          borderColor: "#e5e7eb",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            color: primaryBlack,
                            textAlign: "center",
                          }}
                        >
                          {subCategory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  {category.subCategories.length > 3 && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#666",
                        textAlign: "center",
                        marginTop: 4,
                      }}
                    >
                      +{category.subCategories.length - 3} more
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
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
            Can't find what you're looking for?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Post your specific job requirements and get matched with the right
            professionals
          </Text>
          <ActionButton
            text="Post a Custom Job"
            action={() => router.push("/handieman")}
            activateButton={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { NotificationIcon } from "@/components/Atoms/NotificationIcon/NotificationIcon";
import { primaryColor } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
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

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isActive: boolean;
  image?: string;
}

const SellerProductsScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Plumbing Repair",
      description: "General plumbing repairs and maintenance",
      category: "Plumbing",
      price: 50,
      isActive: true,
    },
    {
      id: "2",
      name: "Electrical Work",
      description: "Electrical installation and repair",
      category: "Electrical",
      price: 75,
      isActive: true,
    },
    {
      id: "3",
      name: "Painting Service",
      description: "Interior and exterior painting",
      category: "Painting",
      price: 40,
      isActive: false,
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );
  const [bulkActionMode, setBulkActionMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  // Filter products based on search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const searchResults = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(searchResults);
    }
  }, [searchQuery, products]);

  const getProductStats = () => {
    const total = products.length;
    const active = products.filter((p) => p.isActive).length;
    const inactive = products.filter((p) => !p.isActive).length;

    return { total, active, inactive };
  };

  const stats = getProductStats();

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", category: "", price: "" });
    setModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
    });
    setModalVisible(true);
  };

  const handleSaveProduct = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.price
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                category: formData.category,
                price: Number.parseFloat(formData.price),
              }
            : p
        )
      );
      Alert.alert("Success", "Product updated successfully");
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        isActive: true,
      };
      setProducts([...products, newProduct]);
      Alert.alert("Success", "Product added successfully");
    }

    setModalVisible(false);
    setFormData({ name: "", description: "", category: "", price: "" });
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: () => {
            setProducts(products.filter((p) => p.id !== productId));
            Alert.alert("Success", "Product deleted successfully");
          },
        },
      ]
    );
  };

  const handleToggleProduct = (productId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleBulkToggle = (enable: boolean) => {
    if (selectedProducts.size === 0) {
      Alert.alert("Error", "Please select at least one product");
      return;
    }

    setProducts(
      products.map((p) =>
        selectedProducts.has(p.id) ? { ...p, isActive: enable } : p
      )
    );

    Alert.alert(
      "Success",
      `${selectedProducts.size} product(s) ${enable ? "enabled" : "disabled"}`
    );
    setSelectedProducts(new Set());
    setBulkActionMode(false);
  };

  return (
    <SafeAreaView style={[backgroundStyle, tw`flex-1`]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`pb-6`}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={tw`flex-row justify-between items-center px-4 py-4`}>
          <Text
            style={tw`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            My Products
          </Text>
          <NotificationIcon />
        </View>

        {/* Product Statistics */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between gap-2`}>
            <View
              style={tw`flex-1 rounded-lg p-3 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Text
                style={tw`text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {stats.total}
              </Text>
              <Text
                style={tw`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Products
              </Text>
            </View>

            <View
              style={tw`flex-1 rounded-lg p-3 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Text style={tw`text-lg font-bold text-green-500`}>
                {stats.active}
              </Text>
              <Text
                style={tw`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Active
              </Text>
            </View>

            <View
              style={tw`flex-1 rounded-lg p-3 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Text style={tw`text-lg font-bold text-red-500`}>
                {stats.inactive}
              </Text>
              <Text
                style={tw`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Inactive
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={tw`px-4 mb-4`}>
          <View
            style={tw`flex-row items-center ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            } rounded-lg px-3 py-2`}
          >
            <TextInput
              style={tw`flex-1 ${isDarkMode ? "text-white" : "text-black"}`}
              placeholder="Search products..."
              placeholderTextColor={isDarkMode ? "#999" : "#666"}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Bulk Action Bar */}
        {bulkActionMode && selectedProducts.size > 0 && (
          <View
            style={tw`px-4 mb-4 flex-row items-center justify-between ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            } rounded-lg p-3`}
          >
            <Text
              style={tw`${
                isDarkMode ? "text-white" : "text-black"
              } font-semibold`}
            >
              {selectedProducts.size} selected
            </Text>
            <View style={tw`flex-row gap-2`}>
              <TouchableOpacity
                onPress={() => handleBulkToggle(true)}
                style={tw`px-3 py-2 rounded-lg bg-green-500`}
              >
                <Text style={tw`text-white text-xs font-semibold`}>Enable</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBulkToggle(false)}
                style={tw`px-3 py-2 rounded-lg bg-red-500`}
              >
                <Text style={tw`text-white text-xs font-semibold`}>
                  Disable
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={tw`px-4 mb-4 flex-row gap-2`}>
          <TouchableOpacity
            onPress={handleAddProduct}
            style={{
              flex: 1,
              backgroundColor: primaryColor,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={tw`text-white text-center font-semibold`}>
              + Add Product
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setBulkActionMode(!bulkActionMode)}
            style={tw`flex-1 rounded-lg p-3 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <Text
              style={tw`${
                isDarkMode ? "text-white" : "text-black"
              } text-center font-semibold`}
            >
              {bulkActionMode ? "Cancel" : "Bulk Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Products List */}
        {loading ? (
          <View style={tw`flex-1 justify-center items-center py-8`}>
            <ActivityIndicator size="large" color={primaryColor} />
            <Text
              style={tw`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Loading products...
            </Text>
          </View>
        ) : filteredProducts.length > 0 ? (
          <View style={tw`px-4`}>
            {filteredProducts.map((product) => (
              <View
                key={product.id}
                style={tw`${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                } rounded-lg p-4 mb-3 flex-row items-center justify-between`}
              >
                {/* Checkbox for bulk actions */}
                {bulkActionMode && (
                  <TouchableOpacity
                    onPress={() => handleSelectProduct(product.id)}
                    style={tw`w-6 h-6 rounded border-2 ${
                      selectedProducts.has(product.id)
                        ? "bg-blue-500 border-blue-500"
                        : isDarkMode
                        ? "border-gray-600"
                        : "border-gray-300"
                    } mr-3 justify-center items-center`}
                  >
                    {selectedProducts.has(product.id) && (
                      <Text style={tw`text-white font-bold`}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}

                {/* Product Info */}
                <View style={tw`flex-1`}>
                  <Text
                    style={tw`font-semibold text-base ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={tw`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    } mt-1`}
                  >
                    {product.description}
                  </Text>
                  <View style={tw`flex-row items-center gap-2 mt-2`}>
                    <Text
                      style={tw`text-xs px-2 py-1 rounded ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      } ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {product.category}
                    </Text>
                    <Text style={tw`font-bold text-sm text-[#5B48FC]`}>
                      ${product.price}
                    </Text>
                  </View>
                </View>

                {/* Status Badge and Actions */}
                <View style={tw`flex-row items-center gap-2 ml-3`}>
                  <View
                    style={tw`px-2 py-1 rounded ${
                      product.isActive ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Text
                      style={tw`text-xs font-semibold ${
                        product.isActive ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </Text>
                  </View>

                  {!bulkActionMode && (
                    <View style={tw`flex-row gap-1`}>
                      <TouchableOpacity
                        onPress={() => handleToggleProduct(product.id)}
                        style={tw`p-2 rounded ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <Text style={tw`text-lg`}>
                          {product.isActive ? "⏸" : "▶"}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => handleEditProduct(product)}
                        style={{
                          padding: 8,
                          borderRadius: 6,
                          backgroundColor: primaryColor,
                        }}
                      >
                        <Text style={tw`text-lg`}>✏️</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => handleDeleteProduct(product.id)}
                        style={tw`p-2 rounded bg-red-500`}
                      >
                        <Text style={tw`text-lg`}>🗑</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={tw`flex-1 justify-center items-center py-8`}>
            <Text
              style={tw`text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } mb-4`}
            >
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : "No products yet. Add your first product!"}
            </Text>
            <TouchableOpacity
              onPress={handleAddProduct}
              style={{
                backgroundColor: primaryColor,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text style={tw`text-white font-semibold`}>Add Product</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add/Edit Product Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={[backgroundStyle, tw`flex-1`]}>
          <ScrollView
            style={tw`flex-1`}
            contentContainerStyle={tw`p-4`}
            showsVerticalScrollIndicator={false}
          >
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text
                style={tw`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {editingProduct ? "Edit Product" : "Add New Product"}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={tw`text-2xl`}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={tw`mb-4`}>
              <Text
                style={tw`font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Product Name
              </Text>
              <TextInput
                style={tw`border rounded-lg p-3 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-300 text-black"
                }`}
                placeholder="Enter product name"
                placeholderTextColor={isDarkMode ? "#999" : "#666"}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>

            <View style={tw`mb-4`}>
              <Text
                style={tw`font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Description
              </Text>
              <TextInput
                style={tw`border rounded-lg p-3 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-300 text-black"
                }`}
                placeholder="Enter product description"
                placeholderTextColor={isDarkMode ? "#999" : "#666"}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={tw`mb-4`}>
              <Text
                style={tw`font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Category
              </Text>
              <TextInput
                style={tw`border rounded-lg p-3 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-300 text-black"
                }`}
                placeholder="e.g., Plumbing, Electrical"
                placeholderTextColor={isDarkMode ? "#999" : "#666"}
                value={formData.category}
                onChangeText={(text) =>
                  setFormData({ ...formData, category: text })
                }
              />
            </View>

            <View style={tw`mb-6`}>
              <Text
                style={tw`font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Price ($)
              </Text>
              <TextInput
                style={tw`border rounded-lg p-3 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-300 text-black"
                }`}
                placeholder="Enter price"
                placeholderTextColor={isDarkMode ? "#999" : "#666"}
                value={formData.price}
                onChangeText={(text) =>
                  setFormData({ ...formData, price: text })
                }
                keyboardType="decimal-pad"
              />
            </View>

            {/* Action Buttons */}
            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`flex-1 rounded-lg p-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <Text
                  style={tw`text-center font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSaveProduct}
                style={{
                  flex: 1,
                  backgroundColor: primaryColor,
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <Text style={tw`text-center font-semibold text-white`}>
                  {editingProduct ? "Update" : "Add"} Product
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default SellerProductsScreen;

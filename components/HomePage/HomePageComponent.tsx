import { styles } from "@/styles/home/styles";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Logo } from "../Atoms/Logo/Logo";
import { NotificationIcon } from "../Atoms/NotificationIcon/NotificationIcon";
import { Link } from "expo-router";
import { SearchBar } from "../Atoms/SearchBar/SearchBar";
import { categories, categoryData } from "@/helper/home/helper";
import { CategoryItem } from "../Atoms/CategoryItem/CategoryItem";
import { HandieMenGroup } from "../handieMenGroup/HandieMenGroup";
import { ServiceCard } from "../serviceCard/ServiceCard";
const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
import { ActionLink } from "../Auth/ActionLink";
import { ActionButton } from "../Atoms/ActionButton/ActionButton";
import { getAllProducts } from "@/services/productServices";
import { ProductCard } from "../ProductCard/ProductCard";
import { useRouter } from "expo-router";
import { primaryColor, primaryBlack, white } from "@/styles/colors";
import tw from "twrnc";
import { ArrowDownAZ, Library, Hammer } from "lucide-react-native";
const numColumns = 2; // Number of columns in the grid
const screenWidth = Dimensions.get("window").width - 32;
const itemMargin = 1; // Margin between grid items
const itemWidth = (screenWidth - (numColumns + 1) * itemMargin) / numColumns;

export const categoryDataIcon = [
  {
    id: "all",
    name: "All Categories",
    iconProp: <ArrowDownAZ color="#5B48FC" size={32} />,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    iconProp: <Library color="#5B48FC" size={32} />,
  },
  {
    id: "carpentry",
    name: "Carpentry",
    iconProp: <Hammer color="#5B48FC" size={32} />,
  },
  {
    id: "cleaning",
    name: "Cleaning",
    iconProp: <ArrowDownAZ color="red" size={32} />,
  },
  {
    id: "nanny",
    name: "Nanny & Childcare",
    iconProp: <ArrowDownAZ color="red" size={32} />,
  },
  {
    id: "welding",
    name: "Welding",
    iconProp: <ArrowDownAZ color="red" size={32} />,
  },
  {
    id: "electrical",
    name: "Electrical",
    iconProp: <ArrowDownAZ color="red" size={32} />,
  },
  {
    id: "painting",
    name: "Painting",
    iconProp: <ArrowDownAZ color="red" size={32} />,
  },
  {
    id: "landscaping",
    name: "Landscaping",
    iconProp: <ArrowDownAZ color="red" size={32} />,
  },
];

function HomePageComponent() {
  const [active, setActive] = useState(0);
  const [activeNav, setActiveNav] = useState("Home");
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useRouter();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [0, -10], // Adjusts logoSection's position when scrolling
    extrapolate: "clamp",
  });

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    const handleGetAllProducts = async () => {
      try {
        const products = await getAllProducts("1", "10");
        console.log(products, "get prdt");

        setProducts(products?.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllProducts();
  }, []);
  const services = Array.from({ length: 4 }).map((_, i) => ({ id: `s-${i}` }));

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.appContainer}>
        <View>
          <Animated.View
          // style={[
          //   {
          //     transform: [{ translateY: headerTranslate }],
          //   },
          // ]}
          >
            <View style={tw`flex flex-row items-center justify-between `}>
              <Logo />
              <NotificationIcon />
            </View>
            <View
              style={tw`flex flex-row items-center justify-between mb-4 mt-1`}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.navItems, styles.navItemActive]}
              >
                <View>
                  <Link
                    style={[styles.navItemActiveText]}
                    href={"/auth/signup"}
                  >
                    Signup
                  </Link>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={[styles.navItems]}>
                <View>
                  <Link
                    style={[
                      styles.navItemActiveText,
                      styles.navItemInactiveText,
                    ]}
                    href={"/auth/login"}
                  >
                    Login
                  </Link>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            <Link href="/handieman">View Handieman</Link>
            <Link href="/(tabs)">View Logged In user</Link>
            <Text style={styles.headerSection}>Welcome Sly👋🏼</Text>
            <Text>Search for any service of your choice</Text>

            <SearchBar />

            {/* Hero Section */}
            <View style={tw`bg-[#5B48FC] items-center rounded-[22px] p-6 my-5`}>
              <Text
                style={tw` text-[28px] font-bold text-white text-center mb-3 leading-[34px]`}
              >
                Find the Perfect Handieman for Every Job
              </Text>
              <Text
                style={tw`font-base text-white text-center mb-6 leading-[22px] opacity-75 `}
              >
                Connect with skilled professionals for all your home and
                business needs. Quality service, fair prices, guaranteed
                satisfaction.
              </Text>
              <View style={tw`flex-row gap-[12px] w-full`}>
                <ActionButton
                  text="Browse Services"
                  action={() => navigate.navigate("/(tabs)")}
                  activateButton={false}
                  lightPurple
                />
                <ActionButton
                  text="Become a Handieman"
                  action={() => navigate.navigate("/auth/signup")}
                  activateButton={false}
                  lightPurple
                />
              </View>
            </View>

            {/* Categories Section */}
            <View style={{ marginVertical: 20 }}>
              <View style={tw` flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-[20px] font-bold text-[#131313]`}>
                  Popular Categories
                </Text>
                <TouchableOpacity
                  onPress={() => navigate.navigate("/category/all")}
                >
                  <Text style={tw` text-sm text-[#5B48FC] font-semibold`}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Enhanced Categories Grid */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                {categoryData.slice(0, 8).map((category, i) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() =>
                      navigate.navigate(`/category/${category.id}`)
                    }
                    style={{
                      width: "48%",
                      backgroundColor: white,
                      borderRadius: 22,
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
                      <Text style={{ fontSize: 32, marginBottom: 4 }}>
                        {category.icon}
                      </Text>
                      {/* {categoryDataIcon[i].name === category.name &&
                        categoryDataIcon[i].iconProp} */}
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
                        }}
                      >
                        {category.subCategories.length} services
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Horizontal Scroll for More Categories */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
              >
                {categoryData.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() =>
                      navigate.navigate(`/category/${category.id}`)
                    }
                    style={{
                      backgroundColor: category.color + "15",
                      borderRadius: 20,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 8,
                      borderWidth: 1,
                      borderColor: category.color + "30",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: category.color,
                        fontWeight: "600",
                      }}
                    >
                      {category.icon} {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Featured Products Section */}
            <View style={{ marginVertical: 20 }}>
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
                    fontSize: 20,
                    fontWeight: "bold",
                    color: primaryBlack,
                  }}
                >
                  Featured Products
                </Text>
                <TouchableOpacity
                  onPress={() => navigate.navigate("/(tabs)/handiemanshop")}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: primaryColor,
                      fontWeight: "600",
                    }}
                  >
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
              >
                {products && products.length > 0 ? (
                  products.slice(0, 5).map((product) => (
                    <View
                      key={product?._id}
                      style={{
                        marginRight: 12,
                        width: 200,
                      }}
                    >
                      <ProductCard
                        navigation={`/product/${product?.slug}`}
                        handiemanBizName={
                          product?.handieman.handiemanProfile.businessName
                        }
                        image={product?.images[0]}
                        dp={product?.handieman.handiemanProfile.dp_url}
                        description={product?.description}
                        name={product?.name}
                        price={product?.amount}
                      />
                    </View>
                  ))
                ) : (
                  <View
                    style={{
                      padding: 20,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: primaryBlack,
                        fontSize: 14,
                      }}
                    >
                      Loading featured products...
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>

            {/* Services Showcase */}
            <View style={{ marginVertical: 20 }}>
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
                    fontSize: 20,
                    fontWeight: "bold",
                    color: primaryBlack,
                  }}
                >
                  Top Services
                </Text>
                <TouchableOpacity
                  onPress={() => navigate.navigate("/handieman")}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: primaryColor,
                      fontWeight: "600",
                    }}
                  >
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                }}
                renderItem={({ item }) => (
                  <View style={{ width: "48%", marginBottom: 12 }}>
                    <ServiceCard
                      navigation={() => navigate.push("/product/item")}
                      style={{ width: itemWidth }}
                    />
                  </View>
                )}
                scrollEnabled={false}
              />
            </View>

            {/* Testimonials Section */}
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: primaryBlack,
                  marginBottom: 16,
                }}
              >
                What Our Customers Say
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
              >
                <View
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: 12,
                    padding: 16,
                    marginRight: 12,
                    width: 280,
                    minHeight: 120,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: primaryBlack,
                      lineHeight: 20,
                      marginBottom: 12,
                      fontStyle: "italic",
                    }}
                  >
                    "Excellent service! The handieman was professional,
                    punctual, and did amazing work. Highly recommended!"
                  </Text>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: primaryBlack,
                      }}
                    >
                      Sarah Johnson
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginTop: 2,
                      }}
                    >
                      Lagos, Nigeria
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: 12,
                    padding: 16,
                    marginRight: 12,
                    width: 280,
                    minHeight: 120,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: primaryBlack,
                      lineHeight: 20,
                      marginBottom: 12,
                      fontStyle: "italic",
                    }}
                  >
                    "Quick response time and fair pricing. My plumbing issue was
                    fixed in no time. Will definitely use again!"
                  </Text>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: primaryBlack,
                      }}
                    >
                      Michael Adebayo
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginTop: 2,
                      }}
                    >
                      Abuja, Nigeria
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: 12,
                    padding: 16,
                    marginRight: 12,
                    width: 280,
                    minHeight: 120,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: primaryBlack,
                      lineHeight: 20,
                      marginBottom: 12,
                      fontStyle: "italic",
                    }}
                  >
                    "Outstanding craftsmanship and attention to detail. The
                    carpenter exceeded my expectations completely."
                  </Text>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: primaryBlack,
                      }}
                    >
                      Grace Okafor
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginTop: 2,
                      }}
                    >
                      Port Harcourt, Nigeria
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>

            {/* Why Choose Us Section */}
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: primaryBlack,
                  marginBottom: 16,
                }}
              >
                Why Choose HandieHub?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "48%",
                    backgroundColor: "#f8f9fa",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>⚡</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: primaryBlack,
                      textAlign: "center",
                      marginBottom: 4,
                    }}
                  >
                    Quick Response
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                      textAlign: "center",
                      lineHeight: 16,
                    }}
                  >
                    Get connected with handiemen in minutes, not hours
                  </Text>
                </View>
                <View
                  style={{
                    width: "48%",
                    backgroundColor: "#f8f9fa",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>🛡️</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: primaryBlack,
                      textAlign: "center",
                      marginBottom: 4,
                    }}
                  >
                    Verified Professionals
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                      textAlign: "center",
                      lineHeight: 16,
                    }}
                  >
                    All handiemen are background checked and verified
                  </Text>
                </View>
                <View
                  style={{
                    width: "48%",
                    backgroundColor: "#f8f9fa",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>💰</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: primaryBlack,
                      textAlign: "center",
                      marginBottom: 4,
                    }}
                  >
                    Fair Pricing
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                      textAlign: "center",
                      lineHeight: 16,
                    }}
                  >
                    Transparent pricing with no hidden fees
                  </Text>
                </View>
                <View
                  style={{
                    width: "48%",
                    backgroundColor: "#f8f9fa",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>⭐</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: primaryBlack,
                      textAlign: "center",
                      marginBottom: 4,
                    }}
                  >
                    Quality Guarantee
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#666",
                      textAlign: "center",
                      lineHeight: 16,
                    }}
                  >
                    100% satisfaction guarantee on all services
                  </Text>
                </View>
              </View>
            </View>

            {/* CTA Section */}
            <View style={tw`bg-[#f8f9fa] rounded-[16px] p-6 my-5 items-center`}>
              <Text
                style={tw` text-[24px] font-bold text-[#131313] text-center mb-2`}
              >
                Ready to Get Started?
              </Text>
              <Text
                style={tw`font-base text-[#666] text-center mb-6 leading-[22px]`}
              >
                Join thousands of satisfied customers who trust HandieHub for
                their home and business needs
              </Text>
              <View style={tw`flex-row gap-[12px] w-full justify-center`}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.navItems, styles.navItemActive]}
                >
                  <View>
                    <Link
                      style={[styles.navItemActiveText]}
                      href={"/seller/all"}
                    >
                      Find a Handieman
                    </Link>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.navItems, styles.navItemActive]}
                >
                  <View>
                    <Link
                      style={[styles.navItemActiveText]}
                      href={"/handieman/(tabs)"}
                    >
                      Start Earning
                    </Link>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Recently Viewed Section */}
            <HandieMenGroup
              header="Recently Viewed"
              style={styles.lasthandieGroup}
            >
              <View
                style={{
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    textAlign: "center",
                    marginBottom: 16,
                    lineHeight: 20,
                  }}
                >
                  No recently viewed items yet. Start browsing to see your
                  history here!
                </Text>
                <ActionButton
                  text="Browse Services"
                  action={() => navigate.navigate("/(tabs)")}
                  activateButton={false}
                />
              </View>
            </HandieMenGroup>
          </Animated.ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomePageComponent;
{
  /* <AnimatedScrollingButton
                    currentStep={currentStep}
                    onPress={download}
                    steps={[
                        {
                            Icon: (
                                <MaterialCommunityIcons
                                    accessible={false}
                                    color={theme.colors.textInverted}
                                    name="download"
                                    size={18}
                                />
                            ),
                            title: "Download",
                        },
                        {
                            Icon: (
                                <MaterialCommunityIcons
                                    accessible={false}
                                    color={theme.colors.textInverted}
                                    name="progress-download"
                                    size={18}
                                />
                            ),
                            title: "Downloading...",
                        },
                        {
                            Icon: (
                                <MaterialCommunityIcons
                                    accessible={false}
                                    color={theme.colors.textInverted}
                                    name="check"
                                    size={18}
                                />
                            ),
                            title: "Downloaded",
                        },
                    ]}
                /> */
}

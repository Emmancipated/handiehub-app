import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { styles } from "@/styles/order/styles";
import { HeaderGroup } from "@/components/Header/Header";
import { NotificationIcon } from "@/components/Atoms/NotificationIcon/NotificationIcon";
import { categories } from "@/helper/order/helper";
import { CategoryItem } from "@/components/Atoms/CategoryItem/CategoryItem";
import { briefCaseIcon, filterIcon } from "@/assets/svgs/svgs";
import { grayText, primaryBlack, secondaryColor } from "@/styles/colors";
import { fontFamily } from "@/styles/fonts";
import { ModalsWrapper } from "@/components/ModalsWrapper/ModalsWrapper";
import OrderModal from "@/components/Modals/OrderModal";
import { Logo } from "@/components/Atoms/Logo/Logo";
import { getHandiemanOverview } from "@/services/handiemanService";
import { usePathname } from "expo-router";
import tw from "twrnc";
import { useRouter } from "expo-router";

const Colors = {
  darker: "#000000",
  lighter: "#ffffff",
};
const filterArray = [
  { value: "all", text: "All time" },
  { value: "lastWeek", text: "Last week" },
  { value: "lastMonth", text: "Last month" },
  { value: "last3Month", text: "Last 3 months" },
];
const numColumns = 2; // Number of columns in the grid
const screenWidth = Dimensions.get("window").width - 32;
const itemMargin = 8; // Margin between grid items
const itemWidth = (screenWidth - (numColumns + 1) * itemMargin) / numColumns;

const HandiemanHomeScreen = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [dashboard, setDashboard] = useState([
    { id: "1", text: "Total revenue", value: "" },
    { id: "2", text: "Total orders", value: "" },
    { id: "3", text: "Completed orders", value: "" },
    { id: "4", text: "Pending orders", value: "" },
    { id: "5", text: "Declined orders", value: "" },
  ]);
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [active, setActive] = useState(0);
  const [activeNav, setActiveNav] = useState("Home");
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [openMo, setOpenMo] = useState("");
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  useEffect(() => {
    handleGetOverview();
  }, [filter, "sellerId"]);

  const handleGetOverview = async () => {
    setRefreshing(true);
    // setLoading(true);
    // const clearAll = () => {
    //   setLoading(false);
    //   setTimeout(() => {
    //     setSuccessRes("");
    //     setOpenModal(false);
    //   }, 2000);
    // };
    try {
      const data = await getHandiemanOverview(
        "684ea30cb607aee1b6acc23e",
        filter
      );
      const updatedDashboard = dashboard.map((item) => {
        switch (item.text) {
          case "Total revenue":
            return { ...item, value: data.totalRevenue };
          case "Total orders":
            return { ...item, value: data.totalOrders };
          case "Completed orders":
            return { ...item, value: data.completedOrders };
          case "Pending orders":
            return { ...item, value: data.pendingOrders };
          case "Declined orders":
            return { ...item, value: data.declinedOrders };
          default:
            return item;
        }
      });
      setDashboard(updatedDashboard);

      // setLoading(true);
      // setSuccessRes(data);
      // setOpenModal(true);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      // setLoading(true);
      // setOpenModal(true);
      return error;
    } finally {
      setRefreshing(false);
      // clearAll();
    }
  };

  const GridItem = ({ text, value }: { text: string; value: string }) => (
    <View
      style={{
        width: itemWidth,
        height: itemWidth / 2, // Make items square
        margin: itemMargin,
        // backgroundColor: "#e0e0e0",
        // justifyContent: "center",
        // alignItems: "center",
        borderWidth: 1,
        borderColor: "#F3F3F3",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <Text
        style={{
          color: "#868686",
          fontFamily: fontFamily,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          color: "#131313",
          fontFamily: fontFamily,
          fontWeight: "700",
          fontSize: 24,
          marginTop: 12,
        }}
      >
        {`${text === "Total revenue" ? `₦ ${value}` : `${value}`}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.appContainer}>
        {/* <View> */}
        <View style={{ height: "100%" }}>
          <View style={tw`flex flex-row items-center justify-between mt-2`}>
            <Logo />
            <NotificationIcon />
          </View>
          <Text style={styles.headerSection}>Welcome Sly👋🏼</Text>
          <Text style={{ marginVertical: 5 }}>
            Here's your analytics overview
          </Text>

          <ScrollView
            horizontal
            contentContainerStyle={styles.navContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {filterArray.map((category, i) => (
                <CategoryItem
                  category={category.text}
                  key={category.value}
                  activeIndex={i === active ? category.text : ""}
                  // svg={i === 0 ? filterIcon : ""}
                  action={() => {
                    setActive(i);
                    setFilter(category.value);
                  }}
                />
              ))}
            </View>
          </ScrollView>
          {/* <View style={{ minHeight: 1 }}> */}
          <FlatList
            data={dashboard}
            renderItem={({ item }) => (
              <GridItem text={item.text} value={item.value} />
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing} // Control the refreshing state
                onRefresh={handleGetOverview} // Callback when the user pulls to refresh
              />
            }
            numColumns={numColumns}
            ListFooterComponent={
              <View>
                <View style={tw`flex-row items-center justify-between my-2`}>
                  <Text style={tw`text-[18px] font-semibold text-[#131313]`}>
                    Recent orders
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={tw`text-sm font-medium text-[#5B48FC]`}
                      onPress={() => router.push("/handieman/(tabs)/order")}
                    >
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={tw` flex-row justify-between items-center`}>
                  <View style={tw`flex-row gap-x-[12px] mt-4`}>
                    <View
                      style={tw`w-[48px] h-[48px] rounded-full p-4 bg-[#EFEDFF] items-center justify-center`}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={[
                          tw` text-base font-semibold text-[#131313]`,
                          {
                            fontFamily: fontFamily,
                          },
                        ]}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={tw`flex-row items-center gap-x-2 overflow-hidden`}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={[
                            tw`text-[#868686] text-sm font-normal`,
                            {
                              fontFamily: fontFamily,
                            },
                          ]}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={[
                            tw`text-[#868686] font-sm font-normal`,
                            {
                              fontFamily: fontFamily,
                            },
                          ]}
                        >
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text
                      style={tw`text-[#131313] font-bold text-base self-end`}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={tw`text-[#868686] font-normal text-sm self-end`}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View style={tw` flex-row justify-between items-center`}>
                  <View style={tw`flex-row gap-x-[12px] mt-4`}>
                    <View
                      style={tw`w-[48px] h-[48px] rounded-full p-4 bg-[#EFEDFF] items-center justify-center`}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={[
                          tw` text-base font-semibold text-[#131313]`,
                          {
                            fontFamily: fontFamily,
                          },
                        ]}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={tw`flex-row items-center gap-x-2 overflow-hidden`}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={[
                            tw`text-[#868686] text-sm font-normal`,
                            {
                              fontFamily: fontFamily,
                            },
                          ]}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={[
                            tw`text-[#868686] font-sm font-normal`,
                            {
                              fontFamily: fontFamily,
                            },
                          ]}
                        >
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text
                      style={tw`text-[#131313] font-bold text-base self-end`}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={tw`text-[#868686] font-normal text-sm self-end`}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: "#06C167",
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          Paid
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: "#B97502",
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          In Progress
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          Pending
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: "#009A51",
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          Paid
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 3rd, 2023
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 12,
                      marginTop: 16,
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        padding: 16,
                        backgroundColor: secondaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: fontFamily,
                          color: primaryBlack,
                        }}
                      >
                        Cabinet design
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 8,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/ProfilePic.png")}
                          alt="profile-picture"
                          style={{ width: 16, height: 16, borderRadius: 999 }}
                        />
                        <Text
                          style={{
                            color: grayText,
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          David Farinde
                        </Text>
                        <Text
                          style={{
                            color: "#009A51",
                            fontSize: 14,
                            fontWeight: "400",
                            fontFamily: fontFamily,
                          }}
                        >
                          Paidsssss
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#131313",
                        fontWeight: "700",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      NGN 100,000
                    </Text>
                    <Text
                      style={{
                        color: "#868686",
                        fontWeight: "400",
                        fontSize: 14,
                        alignSelf: "flex-end",
                      }}
                    >
                      Sept 23rd, 2023
                    </Text>
                  </View>
                </View>
              </View>
            }
            // contentContainerStyle={{ padding: itemMargin }}
          />
        </View>

        <ModalsWrapper isOpen={openMo === "mode"}>
          <OrderModal
            actionOne={() => {
              setModalVisible(false);
              setOpenMo("modeTwo");
            }}
            actionTwo={() => {
              setModalVisible(false);
              setOpenMo("");
            }}
          />
        </ModalsWrapper>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default HandiemanHomeScreen;

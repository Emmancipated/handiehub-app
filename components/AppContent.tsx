// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Slot, Stack, useRouter } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState, useRef } from "react";
// import * as Linking from "expo-linking";
// // import { Linking } from "react-native";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/useColorScheme";
// import { HomeLayoutComponent } from "@/components/HomeLayoutComponent/HomeLayoutComponent";
// import {
//   HandieHubProviderComponent,
//   useAppContext,
// } from "@/context/StoreContext";

// import { Text, View, Button, Platform } from "react-native";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// async function sendPushNotification(expoPushToken: string) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

// function handleRegistrationError(errorMessage: string) {
//   alert(errorMessage);
//   throw new Error(errorMessage);
// }

// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       handleRegistrationError(
//         "Permission not granted to get push token for push notification!"
//       );
//       return;
//     }
//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ??
//       Constants?.easConfig?.projectId;
//     if (!projectId) {
//       handleRegistrationError("Project ID not found");
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(pushTokenString);
//       return pushTokenString;
//     } catch (e: unknown) {
//       handleRegistrationError(`${e}`);
//     }
//   } else {
//     handleRegistrationError("Must use physical device for push notifications");
//   }
// }

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function AppContent() {
//   const { appState, setAppState } = useAppContext();
//   const colorScheme = useColorScheme();
//   const [test, setTest] = useState(false);
//   const router = useRouter();

//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState<
//     Notifications.Notification | undefined
//   >(undefined);
//   const notificationListener = useRef<Notifications.EventSubscription>();
//   const responseListener = useRef<Notifications.EventSubscription>();

//   useEffect(() => {
//     // Handle the initial URL when the app is launched via a link
//     Linking.getInitialURL().then((url) => {
//       console.log("Initial URL is: ", url);

//       if (url) {
//         const parsedUrl = Linking.parse(url).path;
//         if (parsedUrl) {
//           router.push(parsedUrl as any);
//         }
//       }
//     });

//     // Listen for incoming links while the app is running
//     const handleUrl = (event: { url: any }) => {
//       const url = event.url;
//       console.log("event URL is: ", url);
//       if (url) {
//         const parsedPath = Linking.parse(url).path;
//         if (parsedPath) {
//           router.push(parsedPath as any);
//         }
//       }
//     };

//     const subscription = Linking.addEventListener("url", handleUrl);
//     console.log("Initial SUB is:  ", subscription);

//     return () => subscription.remove();
//   }, [router]);

//   // useEffect(() => {
//   //   const handleDeepLink = (event: { url: any; }) => {
//   //     const url = event.url;
//   //     console.log("Deep link received:", url);

//   //     // Handle the URL in your app
//   //   };

//   //   Linking.addEventListener("url", handleDeepLink);

//   //   return () => {
//   //     Linking.removeEventListener("url", handleDeepLink);
//   //   };
//   // }, []);

//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//     "Proxima Nova": require("../assets/fonts/Proxima-Nova-Font.otf"),
//     "Proxima Nova Black": require("../assets/fonts/Proximanova-black.otf"),
//     "Proxima Nova Regular": require("../assets/fonts/Proximanova-regularit.otf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }
//   let accountType = "user";

//   useEffect(() => {
//     registerForPushNotificationsAsync()
//       .then(
//         (token) =>
//           setAppState((prevState) => ({
//             ...prevState,
//             pushNotificationState: {
//               ...prevState.pushNotificationState,
//               expoPushToken: token ?? "",
//             },
//           }))
//         // console.log(token)
//       )
//       .catch((error: any) =>
//         // setAppState((prevState) => ({
//         //   ...prevState,
//         //   pushNotificationState: {
//         //     ...prevState.pushNotificationState,
//         //     expoPushToken: `${error}`,
//         //   },
//         // }))
//         console.log(error)
//       );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setAppState((prevState) => ({
//           ...prevState,
//           pushNotificationState: {
//             ...prevState.pushNotificationState,
//             notification: notification,
//           },
//         }));
//         console.log(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       notificationListener.current &&
//         Notifications.removeNotificationSubscription(
//           notificationListener.current
//         );
//       responseListener.current &&
//         Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen
//           name="handieman/(tabs)"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//     </ThemeProvider>
//   );
// }

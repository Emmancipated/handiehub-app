import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
// import { WebView } from "react-native-webview";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import WebView from "react-native-webview";

export default function PaystackPaymentScreen() {
  // const { email, amount } = route.params;
  const { email, amount } = useLocalSearchParams();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const navigate = useRouter();
  const webview = useRef(null);

  const handleOpenUrl = async (checkoutUrl: string) => {
    await WebBrowser.openBrowserAsync(checkoutUrl);
  };

  useEffect(() => {
    const initTransaction = async () => {
      try {
        const response = await axios.post(
          "https://406f-102-89-23-31.ngrok-free.app/api/transaction/initialize-payment",
          {
            email: "emmancipationera@gmail.com",
            amount: 300,
            reference: null,
            callbackUrl: "https://dev.cecurestream.com/checkout/payment",
          }
        );
        console.log("Init response", response.data);
        setCheckoutUrl(response.data?.data?.authorization_url);
        // handleOpenUrl(response.data?.data?.authorization_url);
      } catch (err) {
        console.error("Init error", err);
      }
    };

    initTransaction();
  }, []);

  const openUrl = async () => {
    await WebBrowser.openBrowserAsync(checkoutUrl as string);
  };
  const handleNavigationChange = (navState: any) => {
    const { url, title } = navState;

    if (!url) return;
    console.log("Navigation state change:", navState);

    if (
      // url.startsWith("https://dev.cecurestream.com/checkout/payment?trxref")
      // title === "Paystack Checkout"
      title.startsWith("dev.cecurestream.com/checkout/payment?trxref")
    ) {
      navigate.push("/product/test-product");
      // webview?.current.injectJavaScript(
      //   "https://dev.cecurestream.com/checkout/payment"
      // );
    }

    // if (url.includes("payment-success")) {
    //   navigation.replace("PaymentSuccess");
    // } else if (url.includes("payment-failed")) {
    //   navigation.replace("PaymentFailed");
    // }
  };

  if (!checkoutUrl) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <>
      <WebView
        source={{ uri: checkoutUrl }}
        onNavigationStateChange={handleNavigationChange}
      />
      {/* <WebView
        source={{ uri: checkoutUrl }}
        onNavigationStateChange={handleNavigationChange}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" />}
      /> */}
      {/* <ActivityIndicator size="large" style={{ flex: 1 }} /> */}
    </>
  );
}

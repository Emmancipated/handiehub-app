import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { white } from "../../styles/colors";
import { largePadding, primaryMargin } from "../../styles/topography";

const { width } = Dimensions.get("window");

type ModalsWrapperProps = {
  closeModal?: () => void;
  children?: React.ReactNode;
  isOpen: boolean;
};
export const ModalsWrapper = ({
  children,
  closeModal,
  isOpen,
}: ModalsWrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <View>{children}</View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    height: "100%",
  },
});

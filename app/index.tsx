import CameraScreen from "@/components/CameraScreen";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const index = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <CameraScreen />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>ダミーのOCR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});

export default index;

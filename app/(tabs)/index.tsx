import ScanCameraView from "@/components/ScanCameraView";
import React from "react";
import { View } from "react-native";

const ImportCameraIndex = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScanCameraView />
    </View>
  );
};

export default ImportCameraIndex;

import React, { useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";
import { processImage } from "../controllers/cloudVisionApi"; // API処理をimport

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // 写真撮影後にAPI処理を呼び出す
  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo) return;
      await processImage(photo.uri); // API処理を呼び出し
    }
  };
  
  // カメラの許可をリクエスト
  if (!permission) {
    return <Text>Loading...</Text>;
  }

  // カメラ権限はまだ付与されていない
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button onPress={requestPermission} title="カメラを起動" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} ref={cameraRef}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapture} // 写真撮影
        >
          <Text style={styles.captureText}>撮影</Text>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    flex: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 50,
    padding: 20,
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
  captureText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default CameraScreen;

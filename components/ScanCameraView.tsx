import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";
import { processImage } from "../controllers/cloudVisionApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanCameraView = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  // 写真撮影後にvision API処理を呼び出す
  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo) {
        const result = await processImage(photo.uri); // API処理を呼び出し

        if (result) {
          //keyはuuidとかでつけたい
          await AsyncStorage.setItem('@photo_result', result);
          alert("読み込みに成功しました");
        } else {
          alert("読み込みに失敗しました");
        }
      }
    }
  };

  // カメラの許可をリクエスト
  if (!permission) {
    return <Text>Loading...</Text>;
  }

  // カメラの権限付与をリクエスト
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
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
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
    bottom: 64,
  },
  captureText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default ScanCameraView;

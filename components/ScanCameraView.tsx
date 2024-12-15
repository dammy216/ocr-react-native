import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";
import { processOCR } from "../shared/externalApiRequest";
import { useFocusEffect } from "@react-navigation/native";
import { addTextData } from "@/shared/myApiRequest";
import { ImageEditor } from "expo-image-editor";

const ScanCameraView = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | undefined>(undefined);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      // カメラを起動
      if (cameraRef.current) {
        cameraRef.current.resumePreview();
      }
      // カメラを停止
      return () => {
        if (cameraRef.current) {
          cameraRef.current.pausePreview();
        }
      };
    }, [])
  );

  // 写真撮影後の処理
  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo) {
        setCapturedPhotoUri(photo.uri);
        setIsEditorVisible(true);
      }
    }
  };

  // 編集後の画像処理
  const handleEditComplete = async (editedUri: string | null) => {
    if (editedUri) {
      const result = await processOCR(editedUri);
      if (result) {
        const sanitizedData = result.replace(/[^\S\u3000]+/g, " ").trim();
        await addTextData(sanitizedData);
        alert("読み込みに成功しました");
      } else {
        alert("読み込みに失敗しました");
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

  // 編集画面を表示するか、通常のカメラ画面を表示する
  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} ref={cameraRef}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.captureText}>撮影</Text>
        </TouchableOpacity>
        <ImageEditor
          imageUri={capturedPhotoUri}
          onEditingComplete={(editedData) => handleEditComplete(editedData.uri)}
          onCloseEditor={() => setIsEditorVisible(false)}
          mode="crop-only"
          visible={isEditorVisible} />
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

import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { processImage } from "../controllers/cloudVisionApi";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addTextData } from "@/controllers/myApiRequest";

const ImportFileView = () => {
  // pdfから読み込む
  const handleGetPdf = async () => {
    const document: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });

    if (!document.canceled) {
      const { uri } = document.assets[0];

      if (uri) {
        const result = await processImage(uri);

        if (result) {
          const sanitizedData = result.replace(/[^\S\u3000]+/g, " ").trim();
          await addTextData(sanitizedData);
          alert("読み込みに成功しました");
        } else {
          alert("読み込みに失敗しました");
        }
      }
    }
  };

  //画像から読み込む
  const handleGetImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("写真フォルダへのアクセス権限が必要です");
      return;
    }

    const image: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });

    if (!image.canceled) {
      const { uri } = image.assets[0];

      if (uri) {
        const result = await processImage(uri);

        if (result) {
          const sanitizedData = result.replace(/[^\S\u3000]+/g, " ").trim();
          await addTextData(sanitizedData);
          alert("読み込みに成功しました");
        } else {
          alert("読み込みに失敗しました");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ファイルを選択してください</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGetPdf} style={styles.importPdfButton}>
          <Text>PDFから読み込む</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGetImage} style={styles.importImageButton}>
          <Text>画像から読み込む</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    gap: 40,
    left: 0,
    right: 0,
    bottom: 30
  },
  importPdfButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 50,
    padding: 20,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  importImageButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 50,
    padding: 20,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
});
export default ImportFileView;

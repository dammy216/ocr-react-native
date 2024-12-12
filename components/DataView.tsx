import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllData } from '@/controllers/myApiRequest';
import { ScanData } from '@/types/textData';
import { Ionicons } from "@expo/vector-icons";


const DataView = () => {
  const [scanData, setScanData] = useState<ScanData[]>([]);
  // タブがフォーカスされたときに呼ばれる処理
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await getAllData();
        
        if(data){
          setScanData(data);
        } else{
          alert("テキストデータの取得に失敗しました");
        }
      };

      fetchData();
    }, [])
  );

  const renderData = (data: ScanData) => {
    return (
    <View style={styles.dataContainer}>
      <View style={styles.textView}>
        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.dataText}>{data.text}</Text>
      </View>
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Ionicons name="ellipsis-horizontal" size={20} color="gray" onPress={() => {}}/>
        </TouchableOpacity>
    </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>OCR取り込み結果</Text>
      <FlatList data={scanData} renderItem={({ item }) => renderData(item)} />
    </View>
  );
};

export default DataView;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 80,
    marginBottom: 16,
  },
  dataContainer: {
    marginVertical: 8,
    marginHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  textView: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flex: 1,
  },
  dataText: {
    fontSize: 16,
  },
  controlButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 50,
    padding: 8,
    alignSelf: "flex-start",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
});
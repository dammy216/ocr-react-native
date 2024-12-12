import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllData } from '@/controllers/myApiResults';
import { ScanData } from '@/types/textData';

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
        <Text style={styles.dataText}>{data.text}</Text>
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <Text>OCR取り込み結果</Text>
      <FlatList data={scanData} renderItem={({ item }) => renderData(item)} />
    </View>
  );
};

export default DataView;

const styles = StyleSheet.create({
  dataContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
  }
});
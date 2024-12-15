import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { deleteTextData, getAllData } from '@/shared/myApiRequest';
import { ScanData } from '@/types/textData';
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import * as Clipboard from 'expo-clipboard';

const DataView = () => {
  const [scanData, setScanData] = useState<ScanData[]>([]);
  // タブがフォーカスされたときに呼ばれる処理
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // テキストデータの取得
  const fetchData = async () => {
    try {
      setScanData(await getAllData() ?? []);
    } catch (error) {
      alert("テキストデータの取得に失敗しました");
    }
  };

  //クリップボードにコピー
  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      alert("コピーしました");
    } catch (error) {
      alert("コピーに失敗しました");
    }
  };

  //テキストデータの削除
  const handleDelete = async (id: string) => {
    //フロントに元データを保存して削除
    const originalData: ScanData[] = [...scanData];
    setScanData(scanData.filter((data) => data.id !== id));

    try {
      await deleteTextData(id);
    } catch (error) {
      //失敗したら元データを再表示させる
      setScanData(originalData);
      alert(`削除に失敗しました`);
    }
  };

  const renderData = (data: ScanData) => {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.textView}>
          <Text numberOfLines={3} ellipsizeMode='tail' style={styles.dataText}>{data.text}</Text>
        </View>
        <Menu>
          <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerWrapper: styles.controlButton }}>
            <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionsContainer}>
            <MenuOption onSelect={() => { handleCopy(data.text); }}>
              <Text>コピー</Text>
            </MenuOption>
            <MenuOption onSelect={() => { handleDelete(data.id); }}>
              <Text style={{ color: "red" }}>削除</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
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
    marginTop: 48,
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
  optionsContainer: {
    marginTop: 40,
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 152,
  },
});
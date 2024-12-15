import { ScanData } from "@/types/textData";
import axios from "axios";

//テキストデータの取得
export const getAllData = async (): Promise<ScanData[] | null> => {
  try {
    const response = await axios.get("http://192.168.32.197:3000/api/v1/data/get");
    return response ? response.data : null;
  } catch (error) {
    console.log("テキストデータの取得に失敗しました", error);
    return null;
  }
};

//テキストデータの追加
export const addTextData = async (data: string): Promise<any> => {
  try {
    await axios.post("http://192.168.32.197:3000/api/v1/data/post", { text: data });
  } catch (error) {
    console.log("テキストデータの追加に失敗しました", error);
  }
};

//テキストデータの削除
export const deleteTextData = async (id: string): Promise<any> => {
  try {
    await axios.delete(`http://192.168.32.197:3000/api/v1/data/delete/${id}`);
  } catch (error) {
    console.log("テキストデータの削除に失敗しました", error);
  }
};
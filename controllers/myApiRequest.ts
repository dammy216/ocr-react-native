import { ScanData } from "@/types/textData";
import axios from "axios";

//テキストデータの取得
export const getAllData = async (): Promise<ScanData[] | undefined> => {
  try {
    const response = await axios.get("http://192.168.32.197:3000/api/v1/data");

    if (response.data) {
      return response.data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log("テキストデータの取得に失敗しました", error);
  }
};

//テキストデータの追加
export const addTextData = async (data: string): Promise<any> => {
  try {
    await axios.post("http://192.168.32.197:3000/api/v1/import", { text: data });
  } catch (error) {
    console.log("テキストデータの追加に失敗しました", error);
  }
};
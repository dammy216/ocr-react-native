import { ScanData } from "@/types/textData";
import axios from "axios";

//テキストデータの取得
export const getAllData = async (): Promise<ScanData[] | undefined> => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/data");
    return response.data;

  } catch (error) {
    console.log("テキストデータの取得に失敗しました", error);
  }
};
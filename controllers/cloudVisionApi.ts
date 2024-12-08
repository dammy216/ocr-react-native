import axios from "axios";

// Google Vision APIのレスポンス型を定義
interface VisionResponse {
  responses: {
    textAnnotations: Array<{
      description: string;
    }>;
  }[];
}

// 画像をGoogle Vision APIに送信してOCR処理を行う
export const processImage = async (
  uri: string
): Promise<string | undefined> => {
  try {
    // 画像をbase64エンコード
    const base64 = await fetch(uri);
    const imageBlob = await base64.blob();

    const imageBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve((reader.result as string).split(",")[1] ?? "");
        } else {
          reject(new Error("Base64 encoding failed"));
        }
      };
      reader.readAsDataURL(imageBlob);
    });

    // Google Cloud Vision APIに画像を送信
    const response = await axios.post<VisionResponse>(
      `https://vision.googleapis.com/v1/images:annotate?key=`,
      {
        requests: [
          {
            image: { content: imageBase64 },
            features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
          },
        ],
      }
    );

    return response.data.responses[0]?.textAnnotations[0]?.description;
    // OCR結果を表示または処理する
  } catch (error) {
    console.error("エラーメッセージ", error);
  }
};

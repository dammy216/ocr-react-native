import axios from "axios";
import e, { text } from "express";

// Google Vision APIのレスポンス型を定義
type VisionResponse = {
  responses: {
    textAnnotations: Array<{
      description: string;
    }>;
  }[];
};

//Gemini APIのレスポンス型を定義
type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
};

// Cloud VIsionでOCR処理を行う
export const processOCR = async (uri: string): Promise<string | undefined> => {
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
  } catch (error) {
    console.error("Cloud Vision API エラーメッセージ", error);
  }
};


// Geminiにプロンプトを投げる
export const processChat = async (message: string): Promise<string | undefined> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=`,
      {
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API エラーメッセージ', error);
  }
};

import { Poppler } from "node-poppler";
 
const poppler = new Poppler();
 
// 最初のページだけ画像化
const popplerOptions = {
  firstPageToConvert: 1,
  lastPageToConvert: 1,
  pngFile: true,
  singleFile: true
};
 
const pdfToImage = async (pdfUri) => {
  try {
    const imageUri = await poppler.pdfToCairo(pdfUri, undefined, popplerOptions);
    return imageUri;
  } catch (error) {
    console.log("画像変換に失敗しました", error);
  }
};
 
export default pdfToImage;
import express from 'express';
import mongoose from 'mongoose';
import TextSchema from '../models/TextSchema.js';
import cors from 'cors';

const app = express();

app.use(express.json());
//クライアントのurlを許可
app.use(cors({
  origin: 'http://localhost:8081', 
}));

app.use(express.static('public'));

mongoose.connect('')
  .then(() => {
    console.log('データベースに接続しました');
  })
  .catch((error) => {
    console.error('接続に失敗しました:', error);
  });

//getメソッド
app.get('/api/v1/data', async (req, res) => {
  try {
    const allData = await TextSchema.find();

    // ObjectId を文字列に変換
    const convertedIdData = allData.map(item => ({
      id: item._id.toString(),
      ...item._doc, 
    }));

    res.status(200).json(convertedIdData);

  } catch (error) {
    console.log(error);
  }
});

//postメソッド
app.post('/api/v1/import', async (req, res) => {
  try {
    const createText = await TextSchema.create(req.body);
    res.status(200).json(createText);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
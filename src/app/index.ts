import express from 'express';
import 'dotenv/config';
import '@/app/connect';
import Routes from '@/routes';
import * as Exception from '@/app/exception';

const app = express();
// 中介軟體（解析 JSON 請求體）
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 靜態資源服務
// app.use(express.static("public"));

// api進入點
app.use(Routes);
// 錯誤捕捉
app.use(Exception.sendNotFoundError);
app.use(Exception.catchCustomError);

// 啟動伺服器
app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});

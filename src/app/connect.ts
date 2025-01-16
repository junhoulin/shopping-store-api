import mongoose from 'mongoose';

const { DATABASE, DATABASE_PASSWORD } = process.env;

mongoose.set('strictQuery', false);

if (!DATABASE || !DATABASE_PASSWORD) {
  throw new Error('DATABASE 或 DATABASE_PASSWORD 未設定');
}

mongoose
  .connect(DATABASE?.replace('<password>', `${DATABASE_PASSWORD}`))
  .then(() => {
    console.log('[ mongodb 連線成功 ]');
  })
  .catch(error => {
    console.log('[ mongodb 連線錯誤 ]', error.message);
  });


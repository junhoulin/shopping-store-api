import UserModel from '@/models/userModel';
import { Request, Response } from 'express';
// 獲取所有使用者
export const getALLUsers = (_req: Request, res: Response) => {
  const users = UserModel.getALL();
  res.send({
    status: 'success',
    users
  });
};

// 創建新的使用者
export const CreatedUsers = (req: Request, res: Response) => {
  const { name, password } = req.body;
  const newUser = UserModel.created(name, password); // 把 title 包裝成物件
  res.send({
    status: 'success',
    user: newUser
  });
};


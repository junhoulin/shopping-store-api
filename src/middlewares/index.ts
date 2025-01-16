import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { verifyToken } from '@/utils';
import UsersModel from '@/models/userModel';

export const isAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
    const result = verifyToken(token);
    console.log(result);
    const user = await UsersModel.findById(result.userId);
    if (!user) {
      throw createHttpError(404, '此使用者不存在');
    }
    console.log(user);
    // req.user ??= user;
    next();
  } catch (error) {
    next(error);
  }
};


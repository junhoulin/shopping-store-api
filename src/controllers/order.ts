import { RequestHandler } from 'express';
import { verifyToken } from '@/utils';

export const getStore: RequestHandler = async (req, res, next) => {
  const body = req.body;
  const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
  const user = verifyToken(token);
  const userId = user.userId;
  try {
    res.send({
      status: true,
      userId,
      body
    });
  } catch (error) {
    next(error);
  }
};


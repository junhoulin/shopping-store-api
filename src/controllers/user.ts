import type { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import UsersModel from '@/models/userModel';
import { generateToken } from '@/utils';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, phone, birthday, address } = req.body;

    const checkEmail = await UsersModel.findOne({ email });
    if (checkEmail) {
      throw createHttpError(400, '此 Email 已註冊');
    }

    const _result = await UsersModel.create({
      name,
      email,
      phone,
      birthday,
      address,
      password: await bcrypt.hash(password, 6)
    });
    const { password: _, ...result } = _result.toObject();

    res.send({
      status: true,
      token: generateToken({ userId: result.id }),
      result
    });
  } catch (error) {
    next(error);
  }
};


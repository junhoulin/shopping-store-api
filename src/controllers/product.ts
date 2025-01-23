import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import ProductModal from '@/models/product';

export const getProduct: RequestHandler = async (_req, res, next) => {
  try {
    const result = await ProductModal.find({
      status: 1
    });
    res.send({
      status: true,
      result
    });
  } catch (error) {
    next(error);
  }
};

export const getOneProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw createHttpError(400, '請輸入產品ID');
    }
    const result = await ProductModal.findOne({
      status: 1,
      _id: id
    });
    res.send({
      status: true,
      result
    });
  } catch (error) {
    next(error);
  }
};

export const createOneProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name, category, description, descriptionList, colorType, imageUrl, imageUrlList, areaInfo, price } =
      req.body;
    const result = await ProductModal.create({
      name,
      category,
      description,
      descriptionList,
      colorType,
      imageUrl,
      imageUrlList,
      areaInfo,
      price
    });
    res.send({
      status: true,
      result
    });
  } catch (error) {
    next(error);
  }
};

export const searchProducts: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      throw createHttpError(400, '請輸入關鍵字');
    }
    const query: any = {
      name: { $regex: name, $options: 'i' },
      status: 1
    };
    const result = await ProductModal.find(query);
    res.send({
      status: true,
      result
    });
  } catch (error) {
    next(error);
  }
};


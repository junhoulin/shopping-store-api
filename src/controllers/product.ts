import { RequestHandler } from 'express';
// import createHttpError from "http-errors";
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

export const createOneProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, descriptionList, colorType, imageUrl, imageUrlList, areaInfo, maxCount, price } =
      req.body;
    const result = await ProductModal.create({
      name,
      description,
      descriptionList,
      colorType,
      imageUrl,
      imageUrlList,
      areaInfo,
      maxCount,
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


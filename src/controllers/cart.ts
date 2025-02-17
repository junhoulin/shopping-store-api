import { RequestHandler } from 'express';
import CartModal from '@/models/userCart';
import { verifyToken } from '@/utils';

export const getCart: RequestHandler = async (req, res, next) => {
  const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
  const user = verifyToken(token);
  const userId = user.userId;
  try {
    const cart = await CartModal.find({ userId }).populate('userId');
    res.send({
      status: true,
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const addCart: RequestHandler = async (req, res, next) => {
  //計算總價並確定數字型別
  const { productId, productName, imageUrl, color, size, quantity, price } = req.body;
  const quantityNum = Number(quantity);
  const priceNum = Number(price);
  const total = quantityNum * priceNum;

  const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
  const user = verifyToken(token);
  const userId = user.userId;

  try {
    const cart = await CartModal.findOne({ userId });
    if (cart) {
      // 購物車如果已經有相同產品再新增的話
      const item = cart.cartList.find(
        item => item.productId === productId && item.color === color && item.size === size
      );
      if (item) {
        item.quantity += quantityNum;
        item.total = item.quantity * item.price; // 更新總價
      } else {
        cart.cartList.push({ productId, productName, imageUrl, color, size, quantity, price, total });
      }
      cart.totalPrice = cart.cartList.reduce((acc, item) => acc + item.total, 0);
      await cart.save();
    }
    res.send({
      status: true,
      cart
    });
  } catch (error) {
    next(error);
  }
};

export const updateCart: RequestHandler = async (req, res, next) => {
  const { productId, quantity, color, size } = req.body; // 你可以傳遞商品ID和新的數量
  const quantityNum = Number(quantity);
  const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
  const user = verifyToken(token);
  const userId = user.userId;

  try {
    const cart = await CartModal.findOne({ userId });
    if (cart) {
      // 找到對應的商品並更新數量
      const item = cart.cartList.find(item => item.productId === productId && item.color === color);
      if (item) {
        item.size = size;
        item.quantity = quantityNum;
        item.total = item.quantity * item.price; // 更新總價
      }
      // 更新總價格
      cart.totalPrice = cart.cartList.reduce((acc, item) => acc + item.total, 0);
      // 保存更新後的購物車
      await cart.save();
    }

    res.send({ status: true, cart });
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem: RequestHandler = async (req, res, next) => {
  const { productId, color, size } = req.body;
  const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
  const user = verifyToken(token);
  const userId = user.userId;
  try {
    const cart = await CartModal.findOne({ userId });
    if (cart) {
      cart.cartList = cart.cartList.filter(
        item => !(item.productId === productId && item.color === color && item.size === size)
      );
      cart.totalPrice = cart.cartList.reduce((acc, item) => acc + item.total, 0);
      await cart.save();
      res.send({ status: true, cart });
    }
  } catch (error) {
    next(error);
  }
};


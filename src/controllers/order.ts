import { RequestHandler } from 'express';
import OrderModal from '@/models/userOrder';
import CartModal from '@/models/userCart';
import { verifyToken } from '@/utils';
import createHttpError from 'http-errors';

export const getOrder: RequestHandler = async (req, res, next) => {
  const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
  const user = verifyToken(token);
  const userId = user.userId;
  try {
    const order = await OrderModal.find({ userId }).populate('userId');
    res.send({
      status: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

export const addOrder: RequestHandler = async (req, res, next) => {
  //計算總價並確定數字型別
  const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
  const user = verifyToken(token);
  const userId = user.userId;
  try {
    let order = await OrderModal.findOne({ userId });
    const cart = await CartModal.findOne({ userId });

    if (cart) {
      const newOrder = {
        cartList: cart.cartList,
        recipient: req.body.recipient || {
          name: '',
          mail: '',
          phone: '',
          address: ''
        },
        ShippingArea: req.body.ShippingArea || '',
        ShippingType: req.body.ShippingType || '',
        supermarket: req.body.supermarket || '',
        totalPrice: req.body.finalPrice,
        payType: req.body.payType || '',
        payFinal: false,
        billType: req.body.billType || '',
        bill: req.body.bill || '',
        isShip: false
      };
      // 確保當 order 不存在時，newOrder 會自動生成 _id
      if (!order) {
        order = new OrderModal({ userId, orderList: [newOrder] });
      } else {
        order.orderList.push(newOrder);
      }
      await order.save();
    }

    res.send({
      status: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

export const infoOrder: RequestHandler = async (req, res, next) => {
  const { orderId } = req.body;
  console.log(orderId);
  try {
    const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
    const user = verifyToken(token);
    const userId = user.userId;
    const userInfo = await OrderModal.findOne({ userId });
    // @ts-ignore
    const targetOrder = userInfo?.orderList.find(item => String(item._id) === orderId); // 強制轉換為字串
    if (!targetOrder) {
      throw createHttpError(404, '找不到訂單');
    }
    res.send({
      status: true,
      targetOrder
    });
  } catch (error) {
    next(error);
  }
};

export const updatOrder: RequestHandler = async (req, res, next) => {
  const { orderId, isShip, payFinal } = req.body;
  if (!orderId) {
    throw createHttpError(404, '請輸入訂單編號');
  }
  try {
    const token = `${req.headers.authorization?.replace('Bearer ', '')}`;
    const user = verifyToken(token);
    const userId = user.userId;
    const userInfo = await OrderModal.findOne({ userId });

    if (userInfo) {
      // @ts-ignore
      const targetOrder = userInfo?.orderList.find(item => String(item._id) === orderId);
      if (!targetOrder) {
        throw createHttpError(404, '找不到訂單');
      } else {
        if (isShip) {
          targetOrder.isShip = isShip;
        }
        if (payFinal) {
          targetOrder.payFinal = payFinal;
        }
        await userInfo.save();
      }
      res.send({
        status: true,
        targetOrder
      });
    }
  } catch (error) {
    next(error);
  }
};


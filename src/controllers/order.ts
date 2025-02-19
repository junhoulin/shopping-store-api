import { RequestHandler } from 'express';
import OrderModal from '@/models/userOrder';
import CartModal from '@/models/userCart';
import { verifyToken } from '@/utils';

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


import { Router } from 'express';
import { getCart, addCart, updateCart, deleteCartItem } from '@/controllers/cart';
import { isAuth } from '@/middlewares/index';
const router = Router();

router.get('/cartlist', isAuth, getCart);
router.post('/addcart', isAuth, addCart);
router.put('/addcart', isAuth, updateCart);
router.delete('/deletecart', isAuth, deleteCartItem);
export default router;


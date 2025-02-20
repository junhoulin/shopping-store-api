import { Router } from 'express';
import { getOrder, addOrder, infoOrder, updatOrder } from '@/controllers/order';
import { isAuth } from '@/middlewares/index';
const router = Router();

router.post('/getorder', isAuth, getOrder);
router.post('/addorder', isAuth, addOrder);
router.post('/info', isAuth, infoOrder);
router.put('/updatcart', isAuth, updatOrder);
export default router;


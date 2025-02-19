import { Router } from 'express';
import { getOrder, addOrder } from '@/controllers/order';
import { isAuth } from '@/middlewares/index';
const router = Router();

router.post('/getorder', isAuth, getOrder);
router.post('/addorder', isAuth, addOrder);
export default router;


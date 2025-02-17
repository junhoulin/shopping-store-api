import { Router } from 'express';
import { getStore } from '@/controllers/order';
import { isAuth } from '@/middlewares/index';
const router = Router();

router.post('/getstore', isAuth, getStore);

export default router;


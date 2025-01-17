import { Router } from 'express';
import { getProduct } from '@/controllers/product';

const router = Router();

router.get('/productlist', getProduct);

export default router;


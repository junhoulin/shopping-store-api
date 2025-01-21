import { Router } from 'express';
import { createOneProduct } from '@/controllers/product';

const router = Router();

router.post('/addproduct', createOneProduct);

export default router;


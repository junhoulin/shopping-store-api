import { Router } from 'express';
import { getProduct, searchProducts, getOneProduct } from '@/controllers/product';

const router = Router();

router.get('/productlist', getProduct);
router.get('/getoneproduct/:id', getOneProduct);
router.get('/searchproducts', searchProducts);

export default router;


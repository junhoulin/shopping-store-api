// src/routes/index.ts
import { Router } from 'express';
import user from './api/v1/user/user';
import cart from './api/v1/user/cart';
import order from './api/v1/user/order';
import product from './api/v1/user/product';
import adminproduct from './api/v1/admin/product';
const routes = Router();

routes.use('/api/v1/user', user);
routes.use('/api/v1/product', product);
routes.use('/api/v1/cart', cart);
routes.use('/api/v1/order', order);
routes.use('/api/v1/admin/product', adminproduct);
export default routes;

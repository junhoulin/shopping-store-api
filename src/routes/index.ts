// src/routes/index.ts
import { Router } from 'express';
import user from './api/v1/user/user';
import product from './api/v1/user/product';
import adminproduct from './api/v1/amin/product';
const routes = Router();

routes.use('/api/v1/user', user);
routes.use('/api/v1/product', product);
routes.use('/api/v1/admin/product', adminproduct);
export default routes;

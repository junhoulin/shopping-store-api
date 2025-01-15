// src/routes/index.ts
import { Router } from 'express';
import user from './api/v1/user';
const routes = Router();

routes.use('/api/v1/user', user);

export default routes;

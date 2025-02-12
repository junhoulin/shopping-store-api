import { Router } from 'express';
import * as UserController from '@/controllers/user';
import { isAuth } from '@/middlewares/index';

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/check', isAuth, UserController.check);
router.get('/info', isAuth, UserController.info);
export default router;


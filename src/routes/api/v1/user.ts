import { Router } from 'express';
import * as UserController from '@/controllers/user';

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

export default router;


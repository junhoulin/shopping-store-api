import { Router } from 'express';
import * as UserController from '@/controllers/user';

const router = Router();

router.post('/signup', UserController.signup);

export default router;


import { Router } from 'express';
import { getALLUsers, CreatedUsers } from '@/controllers/userController';

const router = Router();

router.get('/', getALLUsers);

router.post('/', CreatedUsers);

export default router;


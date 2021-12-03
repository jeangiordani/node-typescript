import { Router } from 'express';

import errorMiddleware from '../middlewares/errorMiddleware';

import userRouter from './users';
import authRouter from './auth';

const router = Router();

router.use(errorMiddleware);

router.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

router.use(authRouter);
router.use(userRouter);

export default router;

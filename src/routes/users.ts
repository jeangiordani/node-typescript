import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

import authMiddleware from '../middlewares/authMiddleware';

import UserServiceTypeORM from '../services/UserServiceTypeORM';

const userService = new UserServiceTypeORM();
const userController = new UserController(userService);

const userRouter = Router();

userRouter.get('/users', authMiddleware, (req: Request, res: Response) => {
  return userController.index(req, res);
});
userRouter.post('/users', (req: Request, res: Response, next: NextFunction) => {
  return userController.store(req, res, next);
});

export default userRouter;

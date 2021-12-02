import { NextFunction, Response, Request, Router } from 'express';
import AuthController from '../controllers/AuthController';

import AuthServiceTypeORM from '../services/AuthServiceTypeORM';

const authService = new AuthServiceTypeORM();
const authController = new AuthController(authService);

const authRouter = Router();

authRouter.post('/auth', (req: Request, res: Response, next: NextFunction) => {
  return authController.authenticate(req, res, next);
});

export default authRouter;

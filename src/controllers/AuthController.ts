import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import AuthServiceContract from '../services/contracts/AuthServiceContract';

interface UserResponse {
  id: string;
  email: string;
}

class AuthController {
  private authService: AuthServiceContract;

  constructor(authService: AuthServiceContract) {
    this.authService = authService;
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await this.authService.authenticate(email, password);

      return res.json({ user: user.user, token: user.token });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;

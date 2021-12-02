import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import UserServiceContract from '../services/contracts/UserServiceContract';

class UserController {
  private userService: UserServiceContract;

  constructor(userService: UserServiceContract) {
    this.userService = userService;
  }

  async store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user = await this.userService.createUser(email, password);

      return res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async index(req: Request, res: Response): Promise<Response<User>> {
    const users = await this.userService.findAll();

    return res.json({ data: users });
  }
}

export default UserController;

import { getRepository, Repository } from 'typeorm';
import HttpException from '../exceptions/HttpException';
import User from '../models/User';
import ExcludePassword from '../utils/ExcludePassword';
import AuthServiceContract from './contracts/AuthServiceContract';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthResponse {
  user: User;
  token: string;
}

export default class AuthServiceTypeORM implements AuthServiceContract {
  async authenticate(email: string, password: string): Promise<AuthResponse> {
    const userRepository: Repository<User> = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(401, 'Wrong Credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new HttpException(401, 'Email/Password are not valid');
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    const response: AuthResponse = {
      user: ExcludePassword.single(user) as User,
      token: token,
    };

    return response;
  }
}

import { getRepository, Repository } from 'typeorm';
import User from '../models/User';
import UserServiceContract from './contracts/UserServiceContract';
import HttpException from '../exceptions/HttpException';
import ExcludePassword from '../utils/ExcludePassword';

export default class UserServiceTypeORM implements UserServiceContract {
  async createUser(email: string, password: string): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      console.log(userExists);

      throw new HttpException(409, 'Email already exists.');
    }

    const user = await userRepository.create({ email, password });

    await userRepository.save(user);

    return ExcludePassword.single(user) as User;
  }
  async findAll(): Promise<User[]> {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return ExcludePassword.array(users) as User[];
  }
}

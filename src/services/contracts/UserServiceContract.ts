import User from '../../models/User';

interface UserResponse {
  id: string;
  email: string;
}
export default interface UserServiceContract {
  createUser(email: string, password: string): Promise<UserResponse>;
  findAll(): Promise<UserResponse[]>;
}

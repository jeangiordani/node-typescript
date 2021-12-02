import User from '../../models/User';

interface AuthResponse {
  user: User;
  token: string;
}
export default interface AuthServiceContract {
  authenticate(email: string, password: string): Promise<AuthResponse>;
}

import User from '../models/User';

interface UserResponse {
  id: string;
  email: string;
}

export default class ExcludePassword {
  static array(array: User[]) {
    const userResponse: UserResponse[] = [];
    array.forEach((user) => {
      var withoutPassword: UserResponse = { id: user.id, email: user.email };
      userResponse.push(withoutPassword);
    });

    return userResponse;
  }

  static single(user: User) {
    const userResponse: UserResponse = { id: user.id, email: user.email };

    return userResponse;
  }
}

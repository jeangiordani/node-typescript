import UserController from '../src/controllers/UserController';
import { Request, Response, NextFunction } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import UserServiceContract from '../src/services/contracts/UserServiceContract';
import HttpException from '../src/exceptions/HttpException';

interface UserResponse {
  id: string;
  email: string;
}

const userService: jest.Mocked<UserServiceContract> = {
  createUser: jest.fn(),
  findAll: jest.fn(),
};

describe('UserController', () => {
  const mockRequest = getMockReq({
    body: {
      email: 'teste@teste.com',
      password: '12345',
    },
  });

  const { res, next, mockClear } = getMockRes();

  const mockResponse = res;

  const mockNext = next;

  beforeEach(() => {
    mockClear(); // can also use clearMockRes()
  });

  it('should call store method once', async () => {
    const userController = new UserController(userService);

    const spy = jest.spyOn(userController, 'store');

    await userController.store(mockRequest, mockResponse, mockNext);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockRequest, mockResponse, mockNext);
    expect(spy).toReturn();
  });

  it('should call the res.json with specific data', async () => {
    const userController = new UserController(userService);

    //
    const userResponse: UserResponse = {
      id: '1',
      email: 'teste@teste.com',
    };

    userService.createUser.mockResolvedValueOnce(userResponse);

    await userController.store(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        data: {
          id: userResponse.id,
          email: userResponse.email,
        },
      })
    );

    expect(mockResponse.json).not.toBeCalledWith(
      expect.objectContaining({
        data: {
          id: '',
          email: '',
        },
      })
    );

    expect(mockNext).not.toBeCalled();
  });

  it('should throw an exception type of HttpException', async () => {
    const userController = new UserController(userService);

    //
    const userResponse: UserResponse = {
      id: '1',
      email: 'teste@teste.com',
    };

    userService.createUser.mockResolvedValueOnce(
      new HttpException(409, 'Email already exists.') as any
    );

    try {
      await userController.store(mockRequest, mockResponse, mockNext);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(mockNext).toBeCalled();
    }
  });

  it('should return all users', async () => {
    const userController = new UserController(userService);

    //
    const userResponse: UserResponse[] = [
      {
        id: '1',
        email: 'teste@teste.com',
      },
      {
        id: '2',
        email: 'teste2@teste.com',
      },
    ];

    userService.findAll.mockResolvedValueOnce(userResponse);

    await userController.index(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledWith(
      expect.objectContaining({
        data: [
          {
            id: '1',
            email: 'teste@teste.com',
          },
          {
            id: '2',
            email: 'teste2@teste.com',
          },
        ],
      })
    );
  });
});

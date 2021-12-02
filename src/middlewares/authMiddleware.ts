import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';

interface TokenPayload {
  id: number;
  eat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpException(401, 'No token found.');
  }

  const [, token] = authorization.split(' ');
  try {
    const data = jwt.verify(token, 'secret');
    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
}

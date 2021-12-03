import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import Joi from 'joi';
import { validators } from '../schemas';

function validatorMiddleware(validator: Joi.ObjectSchema<any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    const validated = validator.validate(req.body);
    if (validated.error) {
      let str = validated.error.message.replace('"', '');
      str = str.replace('"', '');

      throw new HttpException(422, str);
    }
    try {
      next();
    } catch (err) {
      return res.json(err);
    }
  };
}

export default validatorMiddleware;

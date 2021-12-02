import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  email: Joi.string().email().required().min(8),

  password: Joi.string().required(),
});

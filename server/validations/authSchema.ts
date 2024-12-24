import Joi from 'joi';

const signupSchema = Joi.object({
  username: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'user name cannot be empty',
    'string.min': 'user name must be at least 2 characters',
    'string.max': 'user name must not exceed 25 characters',
    'any.required': 'user name is a required field',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required()
    .messages({
      'string.empty': 'Email cannot be empty',
      'string.base': 'Email must be a valid email',
      'any.required': 'Email is a required field',
    }),
  password: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'password cannot be empty',
    'string.base': 'password must be a valid password',
    'string.min': 'password must be at least 2 characters',
    'string.max': 'password must not exceed 25 characters',
    'any.required': 'Password is a required field',
  }),
  cover: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'cover cannot be empty',
    'string.base': 'cover must be a valid password',
    'string.min': 'cover must be at least 2 characters',
    'string.max': 'cover must not exceed 25 characters',
    'any.required': 'cover is a required field',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'Email is required',
    'string.min': 'Email must be at least 2 characters',
    'string.max': 'Email must not exceed 25 characters',
    'any.required': 'Email is a required field',
  }),

  password: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'password cannot be empty',
    'string.base': 'password must be a valid password',
    'string.min': 'password must be at least 2 characters',
    'string.max': 'password must not exceed 50 characters',
    'any.required': 'Password is a required field',
  }),
});

export { signupSchema, loginSchema };

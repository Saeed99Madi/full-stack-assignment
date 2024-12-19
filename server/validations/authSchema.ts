import Joi from 'joi';

const signupSchema = Joi.object({
  username: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'This field cannot be empty',
    'string.min': 'This field must be at least 2 characters',
    'string.max': 'This field must not exceed 25 characters',
    'any.required': 'Username is a required field',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required()
    .messages({
      'string.empty': 'This field cannot be empty',
      'string.base': 'This field must be a valid email',
      'any.required': 'Email is a required field',
    }),
  password: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'This field cannot be empty',
    'string.base': 'This field must be a valid password',
    'string.min': 'This field must be at least 2 characters',
    'string.max': 'This field must not exceed 25 characters',
    'any.required': 'Password is a required field',
  }),
  cover: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'This field cannot be empty',
    'string.base': 'This field must be a valid password',
    'string.min': 'This field must be at least 2 characters',
    'string.max': 'This field must not exceed 25 characters',
    'any.required': 'Password is a required field',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().min(2).max(25).required().messages({
    'string.empty': 'Username is required',
    'string.min': 'This field must be at least 2 characters',
    'string.max': 'This field must not exceed 25 characters',
    'any.required': 'Username is a required field',
  }),

  password: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'This field cannot be empty',
    'string.base': 'This field must be a valid password',
    'string.min': 'This field must be at least 2 characters',
    'string.max': 'This field must not exceed 50 characters',
    'any.required': 'Password is a required field',
  }),
});

export { signupSchema, loginSchema };

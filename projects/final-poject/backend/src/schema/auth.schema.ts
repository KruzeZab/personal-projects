import Joi from 'joi';

export const getLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().required(),
});

export const getSignupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
});

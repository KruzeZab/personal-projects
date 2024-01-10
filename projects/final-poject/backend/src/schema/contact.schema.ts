import Joi from 'joi';

export const getContactSignupSchema = Joi.object({
  message: Joi.string().required(),
  userId: Joi.number().required(),
  realtorId: Joi.number().required(),
});

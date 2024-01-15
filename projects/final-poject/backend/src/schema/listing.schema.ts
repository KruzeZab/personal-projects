import Joi from 'joi';

export const getListingSchema = Joi.object({
  photo_1: Joi.string().optional(),
  photo_2: Joi.string().optional(),
  photo_3: Joi.string().optional(),
  photo_4: Joi.string().optional(),
  photo_5: Joi.string().optional(),
  photo_6: Joi.string().optional(),
  photo_7: Joi.string().optional(),
  realtorId: Joi.number().required(),
  title: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string()
    .valid(
      'province_1',
      'province_2',
      'province_3',
      'province_4',
      'province_5',
      'province_6',
      'province_7',
    )
    .default('province_1'),
  zipcode: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  bedrooms: Joi.number().integer().required(),
  bathrooms: Joi.number().integer().required(),
  garage: Joi.number().integer().required(),
  sqft: Joi.number().integer().required(),
  lot_size: Joi.number().required(),
});

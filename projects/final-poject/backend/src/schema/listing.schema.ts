import Joi from 'joi';

export const getListingSchema = Joi.object({
  photos: Joi.array().items(Joi.string()).required(),
  realtorId: Joi.number().required(),
  title: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string()
    .valid(
      'province_1',
      'province_2',
      'bagmati',
      'gandaki',
      'province_5',
      'karnali',
      'sudur_paschim',
    )
    .default('province_1'),
  zicpode: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  bedrooms: Joi.number().integer().required(),
  bathrooms: Joi.number().integer().required(),
  garage: Joi.number().integer().required(),
  sqft: Joi.number().integer().required(),
  lot_size: Joi.number().required(),
});

import * as Joi from 'joi';

const productSchema = (data: object) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    gender: Joi.string().min(4).max(50).required(),
    publish: Joi.string().min(4).max(50).required(),
    category: Joi.string().min(4).max(50).required(),
    inventoryType: Joi.string().min(4).max(50).required(),
    description: Joi.string().min(4).max(5000).required(),
    subDescription: Joi.string().min(4).max(5000).required(),
    coverUrl: Joi.string().min(4).max(50).required(),
    price: Joi.number().min(4).max(50).required(),
    priceSale: Joi.number().min(4).max(50).required(),
    totalRatings: Joi.number().min(4).max(50).required(),
    totalSold: Joi.number().min(4).max(50).required(),
    totalReviews: Joi.number().min(4).max(50).required(),
    taxes: Joi.number().min(4).max(50).required(),
    quantity: Joi.number().min(4).max(50).required(),
    available: Joi.string().min(4).max(50).required(),
  });
  return schema.validateAsync(data);
};

export { productSchema };

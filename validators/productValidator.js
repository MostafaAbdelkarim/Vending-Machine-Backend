const Joi = require('joi');

const productValidation = {
    body: Joi.object()
      .keys({
        productName: Joi.string().min(3).max(50).required(),
        cost: Joi.number().required(),
        amountAvailable: Joi.number().required(),
      })
      .required(),
  };

module.exports = {
  productValidation,
};
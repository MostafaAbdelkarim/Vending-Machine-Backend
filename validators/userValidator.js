const Joi = require('joi');

const createUserValidation = {
    body: Joi.object()
      .keys({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(8).max(1024).required(),
        role: Joi.string().valid('Buyer', 'Seller').required(),
      })
      .required(),
  };

const loginUserValidation = {
  body: Joi.object()
    .keys({
      username: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(8).max(1024).required(),
    })
    .required(),
};

const depositeValidation = {
  body: Joi.object()
    .keys({
      amount: Joi.number().min(1).max(50).equal(5,10,20,50,100).required(),
    })
    .required(),
};

const buyValidation = {
  body: Joi.object()
    .keys({
      productId: Joi.string().required(),
      amountOfProducts: Joi.number().required(),
    })
    .required(),
};

  
module.exports = {
  createUserValidation, 
  loginUserValidation, 
  depositeValidation,
  buyValidation
};
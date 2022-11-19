const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');
const RequestValidator = require('../middleware/requestValidator');
const {productValidation} = require('../validators/productValidator');
const jwtAuth = require('../middleware/auth');

const roleBuyer = (req, res, next) => jwtAuth.authUsingHeader(req, res, next, 'Buyer');
const roleSeller = (req, res, next) => jwtAuth.authUsingHeader(req, res, next, 'Seller');

router.post('/create', roleSeller, RequestValidator.validate(productValidation), ProductController.createProduct);

router.put('/update/:id', roleSeller, ProductController.updateProductById)

router.delete('/delete/:id', roleSeller, ProductController.deleteProductById)

router.get('/get/:id', roleBuyer, ProductController.getProductById);

router.get('/get_all', roleBuyer, ProductController.getAllProducts);


module.exports = router;
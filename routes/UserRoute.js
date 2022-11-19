const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const RequestValidator = require('../middleware/requestValidator');
const {createUserValidation, loginUserValidation, depositeValidation, buyValidation} = require('../validators/userValidator');
const jwtAuth = require('../middleware/auth');

//Request Handler for accessibility for a certain role.
const roleBuyer = (req, res, next) => jwtAuth.authUsingHeader(req, res, next, 'Buyer');

router.post('/register', RequestValidator.validate(createUserValidation), UserController.createUser);

router.post('/login', RequestValidator.validate(loginUserValidation), UserController.loginUser);

router.post('/deposite', roleBuyer, RequestValidator.validate(depositeValidation), UserController.depositeAmount);

router.post('/reset', roleBuyer, UserController.resetAmount);

router.post('/buy', roleBuyer, RequestValidator.validate(buyValidation), UserController.buyProduct);

// any authenticated user can access these endpoints for demonestration purposes
router.get('/logout', jwtAuth.authUsingHeader, UserController.userLogout);//for logout is idempotent

router.get('/get_all', jwtAuth.authUsingHeader, UserController.getAllUsers);

router.get('/id/:id', jwtAuth.authUsingHeader, UserController.getUserById);

router.put('/:id', jwtAuth.authUsingHeader, UserController.updateUserById);

router.delete('/:id', jwtAuth.authUsingHeader, UserController.deleteUserById);


module.exports = router;
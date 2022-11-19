const _ = require('lodash');
const decode = require('jwt-decode');
const {encodePassword, comparePasswords} = require('../config/bCryptCommons');
const {Product} = require('../models/ProductModel');
const {User} = require('../models/UserModel');
const UserAlreadyRegistered = require('../exceptions/customExceptions/UserAlreadyRegistered');
const NotEnoughFundsException = require('../exceptions/customExceptions/NotEnoughFundsException')
const Unautorized = require('../exceptions/customExceptions/UnauthorizedException');
const NotFoundError = require('../exceptions/customExceptions/NotFoundException');

const createUser = async (req, res) => {

    let user = await User.findOne({username: req.username});
    if(user) throw new UserAlreadyRegistered('User Already Registered');
    
    user = new User ({
        username: req.username,
        password: await encodePassword(req.password),
        role: req.role, 
        deposite: 0,
    });
    await user.save();
    return user;
};

const getAllUsers = () => {
    return User.find().sort('name');
};

const getUserById = async (req, res) =>{
    
    const user = await User.findById(req);
    if(_.isEmpty(user)) throw new NotFoundError('User not found');
    return user;
};

const updateUserById = async (req, res) =>{

    const user = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: await encodePassword(req.body.password),
        role: req.body.role,
        deposite: req.body.deposite,
    }, {new: true});
    if(!user) throw new NotFoundError('User with given Id not found');
    return user;
};

const deleteUserById = async (req, res) =>{
    
    const user = await User.findByIdAndRemove(req.params.id);
    if(!user) throw new NotFoundError('User not found');
    return user;
};

const loginUser = async (req, res) => {
    
    let user = await User.findOne({username: req.username});
    if(!user) throw new NotFoundError('User not found');

    const validPass = await comparePasswords(req.password, user.password);
    if(!validPass) throw new NotFoundError('Incorrect Password');

    const token = user.generateAuthToken();
    
    return {token, user};
};

const depositeAmount = async (req, res) => {
    
    let userPayload = checkIfUserIsNotSeller(req, res);

    let user = await User.findOne({_id: userPayload._id});
    if(!user) throw new NotFoundError('User Not Found');
    
    user = await User.findByIdAndUpdate(userPayload._id, {
        deposite: user.deposite + req.body.amount,
    }, {new: true});
    
    return {user};
    
};

const resetAmount = async (req, res) => {
   
    let userPayload = checkIfUserIsNotSeller(req, res);
    let user = await User.findByIdAndUpdate(userPayload._id, {
        deposite: 0,
    }, {new: true});
    if(!user) throw new NotFoundError('User not found');
    return {user};
};

const buyProduct = async (req, res) => {

    let userPayload = checkIfUserIsNotSeller(req, res);
    
    let user = await User.findOne({_id: userPayload._id});
    if(!user) throw new NotFoundError('User not found');

    let product = await Product.findOne({_id: req.body.productId});
    if(!product) throw new NotFoundError('Product not found');

    let totalCost = req.body.amountOfProducts * product.cost;
    if(user.deposite < totalCost) throw new NotEnoughFundsException('Not enough funds');

    user = await User.findByIdAndUpdate(userPayload._id, {
        deposite: user.deposite - totalCost,
    }, {new: true});

    product = await Product.findByIdAndUpdate(product.id, {
        amountAvailable: product.amountAvailable - req.body.amountOfProducts,
    }, {new: true});
    
    return {user, product, totalCost};
}

const checkIfUserIsNotSeller = (req, res) => {
    const authHeader = req.headers.authorization;
    if(authHeader === undefined) throw new Unautorized('Unauthorized');
    else {
        const token = authHeader.split(' ')[1];
        const userPayload = decode(token);
        if(userPayload.role != 'Buyer') return null;
        return userPayload;
    }
};


module.exports = {
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById, 
    loginUser, 
    depositeAmount,
    resetAmount,
    buyProduct
};
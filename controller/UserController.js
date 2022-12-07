const UserService = require('../service/UserService');
const _ = require('lodash');


const createUser = async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body);
        return res.status(201).send(_.pick(user, ['_id', 'username', 'role']));
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try{
        const user = await UserService.getAllUsers();
        res.status(200).send(user);
    }
    catch(error){
        next(error);
    };
};

const getUserById = async (req, res, next) => {
    try{
        const user = await UserService.getUserById(req.params.id);
        res.status(200).send(user);
    }
    catch(error){
        next(error);
    };
};

const updateUserById = async (req, res, next) => {
    try{
        const user = result = await UserService.updateUserById(req);
        res.status(200).send(user);
    }
    catch(error){
        next(error);
    };
};

const deleteUserById = async (req, res, next) => {
    try{
        const user =  result = await UserService.deleteUserById(req);
        res.status(200).send(user);
    }
    catch(error){
        next(error);
    };
};

const loginUser = async (req, res, next) => {
    try{
        const result = {user, token} = await UserService.loginUser(req.body);
        return res.status(200).send({'Username': `${user.username}`, 'Token': result.token});
    }
    catch (error){
        next(error);
    };
};

const userLogout = async (req, res, next) => {
    try{
        res.cookie('jwtToken', "", {maxAge: 1});
        res.clearCookie('jwtToken');
        res.removeHeader('Authorization');
        res.status(200).send('Logout Success');
    }
    catch (error){
        next(error);
    };
};

const depositeAmount = async (req, res, next) => {
    try {
        const {user} = await UserService.depositeAmount(req);
        return res.status(200).send({'Username': `${user.username}`, 'Amount': `${user.deposite}`});
    } catch (error) {
       next(error);
    }
};

const resetAmount = async (req, res, next) => {
    try {
        const {user} = await UserService.resetAmount(req);
        return res.status(200).send({'Username': `${user.username}`, 'Amount': `${user.deposite}`});
    } catch (error) {
        next(error);
    }
};

const buyProduct = async (req, res, next) => {
    try {
        const result = {user, product, totalCost} = await UserService.buyProduct(req);
        return res.status(200).send({
            'Total spent': `${totalCost}`, 
            'Product': `${result.product.productName}`, 
            'Current Available amount': `${result.user.deposite}`});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById, 
    loginUser, 
    userLogout, 
    depositeAmount,
    resetAmount,
    buyProduct
};
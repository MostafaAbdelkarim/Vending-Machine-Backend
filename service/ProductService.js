const {Product} = require('../models/ProductModel');
const {User} = require('../models/UserModel')
const _ = require('lodash');
const decode = require('jwt-decode');
const UnauthorizedException = require('../exceptions/customExceptions/UnauthorizedException');
const NotFoundException = require('../exceptions/customExceptions/NotFoundException');
const ProductAlreadyExistsException = require('../exceptions/customExceptions/ProductAlreadyExistsException');

const createProduct = async (req, res) => {

    let userPayload = checkIfUserIsNotSeller(req, res);

    let user = await User.findOne({_id: userPayload._id});
    if(_.isEmpty(user)) throw new NotFoundException('User not found');

    let product = await Product.findOne({productName: req.body.productName});
    if(product) throw new ProductAlreadyExistsException('Product Already Exists');
    
    product = new Product ({userId: userPayload._id,...req.body});

    await product.save();
    return {product};
};

const getAllProducts = () => {
    
    return Product.find().sort('name');
};

const getProductById = async (req, res) =>{
    
    const product = await Product.findById(req.params.id);
    if(_.isEmpty(product)) throw new NotFoundException('Product not found');
    return product;
};

const updateProductById = async (req, res) =>{

    const product = await Product.findByIdAndUpdate(req.params.id, {...req.body,}, {new: true});
    if(_.isEmpty(product)) throw new NotFoundException('Product with given Id not found');
    return product;
};

const deleteProductById = async (req, res) =>{
    let product = await Product.findByIdAndRemove(req.params.id);
    if(!_.isEmpty(product)) throw new NotFoundException('Error');
    else return true;
};

const checkIfUserIsNotSeller = (req, res) => {
    const authHeader = req.headers.authorization;
    if(authHeader === undefined) throw new UnauthorizedException('Unauthorized');
    else {
        const token = authHeader.split(' ')[1];
        const userPayload = decode(token);
        if(userPayload.role != 'Seller') return null;
        return userPayload;
    }
}

module.exports = {
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProductById, 
    deleteProductById
};
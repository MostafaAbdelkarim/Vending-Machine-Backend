const ProductService = require('../service/ProductService');
const _ = require('lodash');

const createProduct = async (req, res, next) => {
    try{
        const result = {product, report} = await ProductService.createProduct(req);
        return res.status(201).send(_.pick(result.product, ['productName', 'cost', 'amountAvailable']));
    }
    catch (error){
        next(error);
    };
};

const getAllProducts = async (req, res, next) => {
    try{
        const product = await ProductService.getAllProducts(req);
        return res.status(200).send(product);
    }
    catch(error){
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await ProductService.getProductById(req);
        res.status(200).send(product);
    } catch (error) {
        next(error);
    }
}

const updateProductById = async (req, res, next) => {
    try {
        const product = await ProductService.updateProductById(req);
        res.status(200).send(product);
    } catch (error) {
        next(error);
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        await ProductService.deleteProductById(req);
        return res.status(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProductById, 
    deleteProductById
};
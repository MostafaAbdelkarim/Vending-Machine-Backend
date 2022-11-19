const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    productName: {
        type: String,
        required: [true, 'Product Name must be provided'],
        minlength: 5,
        maxlength: 100
    },
    cost: {
        type: Number,
        required: true
    },
    amountAvailable: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model('product', productSchema);


module.exports = {Product};
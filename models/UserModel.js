const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Pleae enter your username'],
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Pleae enter your password'],
        minlength: 8,
        maxlength: 255
    },
    role: {
        type: String,
        required: [true, 'Pleae enter your role'],
        enum: ['Buyer', 'Seller']
    },
    deposite: {
        type: Number,
        required: false,
        enum: [0,5,10,20,50,100]
    }
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, role: this.role}, config.get('jwtPrivateKey'), {expiresIn: '10h'});
    return token;
  };

const User = mongoose.model('user', userSchema);

module.exports = {User};

const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost/FlapKap')
    .then(() => console.log('Connected to MongoDB Seccessfully.. '))
    .catch(err => console.error(`Cannot connect to MongoDB, Error: ${err}`));



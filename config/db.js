const mongoose = require('mongoose');
const config = require('config');


module.exports = mongoose.connect(config.get('RemoteDB'))
    .then(() => console.log('Connected to MongoDB Seccessfully.. '))
    .catch(err => console.error(`Cannot connect to MongoDB, Error: ${err}`));

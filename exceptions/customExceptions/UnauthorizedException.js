const ApplicationExceptions = require('../ApplicationExceptions'); 
class Unautorized extends ApplicationExceptions {
    constructor(message) {
      super(message, 401);
    }
  };
  
module.exports = Unautorized;
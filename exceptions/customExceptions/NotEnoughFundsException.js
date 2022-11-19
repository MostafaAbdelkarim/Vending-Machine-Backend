const ApplicationExceptions = require('../ApplicationExceptions'); 
class NotEnoughFundsException extends ApplicationExceptions {
    constructor(message) {
      super(message, 400);
    }
  };
  
module.exports = NotEnoughFundsException;
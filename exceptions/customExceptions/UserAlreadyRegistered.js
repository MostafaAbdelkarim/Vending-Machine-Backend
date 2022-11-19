const ApplicationExceptions = require('../ApplicationExceptions'); 
class UserAlreadyRegistered extends ApplicationExceptions {
    constructor(message, statusCode, status) {
      super(message, statusCode=400, status='Failed');
    }
  };
  
module.exports = UserAlreadyRegistered;
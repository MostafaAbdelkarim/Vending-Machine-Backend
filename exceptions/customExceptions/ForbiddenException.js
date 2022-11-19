const ApplicationExceptions = require('../ApplicationExceptions'); 
class Forbidden extends ApplicationExceptions {
    constructor(message) {
      super(message, 403);
    }
  };
  
module.exports = Forbidden;
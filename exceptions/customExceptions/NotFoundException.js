const ApplicationExceptions = require('../ApplicationExceptions'); 
class NotFoundError extends ApplicationExceptions {
    constructor(message) {
      super(message || 'Not found.', 404);
    }
  };
  
module.exports = NotFoundError;
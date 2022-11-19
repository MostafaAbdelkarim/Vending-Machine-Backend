class ApplicationExceptions extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.status = 'Failed';
  }
}

module.exports = ApplicationExceptions;
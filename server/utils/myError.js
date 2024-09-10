class MyError extends Error {
    constructor(message, statusCode) {
      super(message); // Call the super constructor to initialize 'this'
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      // Capture the stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = MyError;
class ErrorResponse {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  console.error(err);

  res.status(error.statusCode).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = {
  errorHandler,
  ErrorResponse,
};

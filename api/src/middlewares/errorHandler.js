const errorHandler = (err, req, res, next) => {
  // middleware to handle the erros
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    statusCode,
    message: err.message || err.error || 'Internal server error',
    ...(err.stack && { stack: (console.error(err.stack), err.stack) }),
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;

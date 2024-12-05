// middleware to handle the errors
const errorHandler = (err, req, res, next) => {
  const stack = err.stack ? console.error(err.stack) && err.stack : null;
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack,
  });
};

export default errorHandler;

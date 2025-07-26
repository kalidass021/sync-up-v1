import { STATUS_CODES } from "../constants/appConstants";

const errorHandler = (err, req, res, next) => {
  // middleware to handle the erros
  err.stack && console.error(err.stack);
  const statusCode = err.statusCode || STATUS_CODES.InternalServerError;
  const errorResponse = {
    success: false,
    statusCode,
    message: err.message || err.error || 'Internal server error',
    ...(err.stack && { stack: err.stack }),
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;

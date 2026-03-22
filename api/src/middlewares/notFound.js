import { sendResponse } from '../core';
import { STATUS_CODES } from '../constants';

// middleware to handle undefined routes
const notFound = (req, res, next) => {
  return sendResponse(STATUS_CODES.NotFound, `${req.originalUrl} not found`)(
    req,
    res,
    next,
  );
};

export default notFound;

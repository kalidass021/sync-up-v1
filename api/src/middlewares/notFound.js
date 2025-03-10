import { error } from '../utils';

// middleware to handle undefined routes
const notFound = (req, res, next) => {
  return next(error(404, `${req.originalUrl} not found`));
};

export default notFound;

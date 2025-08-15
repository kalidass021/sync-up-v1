import rateLimit from 'express-rate-limit';
import { CONFIG_ERRORS } from '../constants';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per windowMs
  message: CONFIG_ERRORS.RATE_LIMIT_ERROR,
});

export default rateLimiter;

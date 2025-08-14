import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
})

export default rateLimiter;
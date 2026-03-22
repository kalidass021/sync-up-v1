import { error } from '../utils';

const sendResponse = (statusCode, message, data = null) => {
  return (req, res, next = null) => {
    const success = statusCode >= 200 && statusCode < 300;

    if (!success && statusCode >= 400 && typeof next === 'function') {
      const err = error(statusCode, message);
      return next(err);
    }

    const responsePayload = {
      success,
      statusCode,
      message,
      ...(data && { data }),
      timeStamp: new Date().toISOString(),
    };

    return res.status(statusCode).json(responsePayload);
  };
};

export default sendResponse;

import sendResponse from '../core/sendResponse';

const apiStatus = (req, res) => {
  return sendResponse(200, 'API is working!', {
    environment: process.env.NODE_ENV,
  })(req, res);
};

export default apiStatus;

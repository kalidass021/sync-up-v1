import sendResponse from '../core/sendResponse';
import { API_STATUS } from '../constants';

const apiStatus = (req, res) => {
  return sendResponse(200, API_STATUS.WORKING, {
    environment: process.env.NODE_ENV,
  })(req, res);
};

export default apiStatus;

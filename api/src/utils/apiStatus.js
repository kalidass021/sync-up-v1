import sendResponse from '../core/sendResponse';
import { STATUS_CODES } from '../constants';
import { API_STATUS } from '../constants';

const apiStatus = (req, res) => {
  return sendResponse(STATUS_CODES.OK, API_STATUS.WORKING, {
    environment: process.env.NODE_ENV,
  })(req, res);
};

export default apiStatus;

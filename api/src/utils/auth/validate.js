import { EMAIL_REGEX as emailRegex } from '../constants';
import error from '../error';

export const validateSignupData = (
  { fullName, username, email, password },
  next
) => {
  if (!fullName || !username || !email || !password) {
    return next(error(400, 'All fields are required'));
  }

  if (!emailRegex.test(email)) {
    return next(error(400, 'Invalid email format'));
  }

  if (fullName.length < 6) {
    return next(error(400, 'Name must be at least 6 characters'));
  }

  if (username.length < 6) {
    return next(error(400, 'Username must be at least 6 characters'));
  }

  if (password.length < 6) {
    return next(error(400, 'Password must be at least 6 characters'));
  }
};

export const validateSigninData = ({email, password}, next) => {
  if (!email || !password) {
    return next(error(400, 'All fields are required'));
  }
};

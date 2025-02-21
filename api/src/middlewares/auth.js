import jwt from 'jsonwebtoken';
import User from '../models/User';
import error from '../utils/error';

const auth = async (req, res, next) => {
  try {
    // read jwt from the 'jwt' cookie
    const token = req.cookies.jwt;
    if (!token) {
      return next(error(401, 'Unauthorized: No token provided'));
    }

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    // edge case
    if (!decodedObj) {
      return next(error(401, 'Unauthorized: Invalid token'));
    }

    const user = await User.findById(decodedObj.userId).select('-password');
    // check before adding the user to the req obj
    if (!user) {
      return next(error(404, 'User not found'));
    }

    // add the user to the req object
    req.user = user;
    // call the next function
    next();
  } catch (err) {
    console.error(`Error while auth ${err.message}`);
    next(err);
  }
};

export default auth;

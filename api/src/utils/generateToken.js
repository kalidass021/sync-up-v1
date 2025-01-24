import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
  // generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // set jwt as an HTTP-Only cookie
  // below jwt is variable name for the token
  res.cookie('jwt', token, {
    httpOnly: true, // prevent XSS attacks and cross-site scripting attacks
    secure: process.env.NODE_ENV === 'production', // ensure cookie is sent over HTTPS
    sameSite: 'None', // prevent CSRF attacks and cross-site request forgery attacks if it set to strict
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
    maxAge: 30 * 24 * 60 * 60 * 1000, // milli seconds
  });

  return token;
};

export default generateToken;

import bcrypt from 'bcryptjs';
import { User } from '../models';
import {
  generateToken,
  error,
  validateSignupData,
  validateSigninData,
} from '../utils';

export const authCheck = async (req, res, next) => {
  res.status(200).json({ message: 'Authorized' });
};

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;
    // validate signup data
    validateSignupData({ fullName, username, email, password }, next);

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return next(error(400, 'Username already exists'));
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(error(400, 'Email already exists'));
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // save the user details
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // generate token
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImgId: newUser.profileImgId,
    });
  } catch (err) {
    console.error(`Error in signup controller ${err.message}`);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validate signin data
    validateSigninData({ email, password }, next);

    const user = await User.findOne({ email });

    if (!user) {
      return next(error(401, 'Invalid email or password'));
    }

    // if existingUser check the password
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ''
    );

    if (!isPasswordValid) {
      return next(error(401, 'Invalid email or password'));
    }

    // call the generate token function to generate token and set the cookie
    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImgId: user.profileImgId,
    });
  } catch (err) {
    console.error(`Error in signin controller ${err.message}`);
    next(err);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.cookie('syncup_token', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict', // match the sameSite setting while cookie was set
      domain:
        process.env.NODE_ENV === 'production'
          ? new URL(process.env.CLIENT_URL_PROD).hostname
          : new URL(process.env.CLIENT_URL_DEV).hostname, // match the domain name setting while cookie was set
      maxAge: 0,
    });

    res.status(200).json({ message: 'Signed out' });
  } catch (err) {
    console.error(`Error in signout controller ${err.message}`);
    next(err);
  }
};

export const getCurrentUserProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const user = await User.findById(userId).select('-password');

    res.status(200).json(user);
  } catch (err) {
    console.error(`Error while fetching current user profile: ${err.message}`);
    next(err);
  }
};

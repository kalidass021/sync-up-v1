import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import error from '../utils/error.js';

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return next(error(400, 'All fields are required'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      profileImg: newUser.profileImg,
      converImg: newUser.coverImg,
    });
  } catch (err) {
    console.error(`Error in signup controller ${err.message}`);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(error(400, 'All fields are required'));
    }

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
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (err) {
    console.error(`Error in signin controller ${err.message}`);
    next(err);
  }
};

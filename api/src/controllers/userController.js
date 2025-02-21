import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import User from '../models/User';
import Notification from '../models/Notification';
import error from '../utils/error';
import { EMAIL_REGEX as emailRegex } from '../utils/constants';

export const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      return next(error(404, `${username} not found`));
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(`Error while fetching user profile ${err.message}`);
    next(err);
  }
};

export const followOrUnfollowUser = async (req, res, next) => {
  try {
    const { _id: currentUserId } = req.user;
    const { id: targetUserId } = req.params;

    // current user or follower
    const currentUser = await User.findById(currentUserId);
    // target user
    const targetUser = await User.findById(targetUserId);

    if (currentUserId.toString() === targetUserId.toString) {
      return next(error(400, "You can't follow or unfollow yourself"));
    }

    if (!currentUser || !targetUser) {
      return next(error(400, 'User not found'));
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // unfollow the user
      // remove target user from the current user's following arr
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { following: targetUserId },
      });
      // remove current user from the target user's followers' arr
      await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUserId },
      });

      // for unfollow we don't need to send notification
      res.status(200).json({ message: 'User unfollowed' });
    } else {
      // follow the user
      // add the target user in the current user's following arr
      await User.findByIdAndUpdate(currentUserId, {
        $push: { following: targetUserId },
      });
      // add the current user in the target user's followers arr
      await User.findByIdAndUpdate(targetUserId, {
        $push: { followers: currentUserId },
      });

      // send the notification to the user
      const newNotification = new Notification({
        from: currentUserId,
        to: targetUserId,
        type: 'follow',
      });

      await newNotification.save();

      res.status(200).json({ message: 'User followed' });
    }
  } catch (err) {
    console.error(`Error in follow or unfollow user controller ${err.message}`);
    next(err);
  }
};

export const getSuggestedUsers = async (req, res, next) => {
  try {
    // current userId
    const { _id: userId } = req.user;
    // users followed by current user
    const followedByCurrentUser = await User.findById(userId).select(
      'following'
    );

    // exclude the current user from the suggested users arr
    // get some users excluding the current user
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $project: { password: 0 } }, // exclude the password field
    ]);

    // exclude the users already followed by current user
    const suggestedUsers = users
      .filter((user) => !followedByCurrentUser.following.includes(user._id))
      .splice(0, 10); // send only 10 users

    res.status(200).json(suggestedUsers);
  } catch (err) {
    console.error(`Error while fetching suggested users ${err.messge}`);
    next(err);
  }
};

export const fetchAllUsers = async (req, res, next) => {
  try {
    // current userId
    const {_id: userId} = req.user;
    // fetch the users from the mongo db except the current user
    const users = await User.find({_id: {$ne: userId}});
    res.status(200).json(users);
  } catch (err) {
    console.error(`Error while fetching all users: ${err.message}`);
    next(err);
  }
}

export const searchUsers = async (req, res, next) => {
  try {
    const {query: searchText} = req.query;
    if (!searchText) {
      return next(error(400, 'Search text is required'));
    }
    // create case insensitive regex
    const searchTextRegex = new RegExp(searchText, 'i'); // i flag for case insentivity
    // perform search using mongo db's regex search
    const users = await User.find({
      $or: [
        {fullName: {$regex: searchTextRegex}},
        {username: {$regex: searchTextRegex}},
      ]
    });
    
    res.status(200).json(users);
  } catch (err) {
    console.error(`Error while searching users: ${err.message}`);
    next(err);
  }
}

export const updateUserProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { username } = req.params;
    const {
      fullName,
      username: updatedUsername,
      email,
      profileImg,
      bio,
      currentPassword,
      newPassword,
    } = req.body;

    if (updatedUsername && email) {
      return next(error(400, "You can't update username and email together"));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(error(404, 'User not found'));
    }

    if (user.username !== username) {
      return next(error(400, 'You can only update your own profile'));
    }

    if (updatedUsername) {
      if (updatedUsername === username) {
        return next(
          error(
            400,
            'The new username must be different from the current username'
          )
        );
      }
      // ensure updated username is unique
      const usernameExists = await User.findOne({ username: updatedUsername });
      if (usernameExists) {
        return next(error(400, 'Username already taken'));
      }
    }

    if (email) {
      if (!emailRegex.test(email)) {
        return next(error(400, 'Invalid email format'));
      }

      // ensure updated email is unique
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return next(error(400, 'Email already taken'));
      }
    }

    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return next(
        error(400, 'Please provide both current password and new password')
      );
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return next(error(400, 'Current password is incorrect'));
      }

      if (newPassword.length < 6) {
        return next(400, 'Password must be at least 6 characters long');
      }

      if (newPassword === currentPassword) {
        return next(
          400,
          'Your new password must be different from current password'
        );
      }

      // hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      // update the password
      user.password = hashedPassword;
    }

    // destroy the old profile image on the cloudinary and upload the new image
    // at this point our app only have profileImg, we may add cover img later
    const cloudinaryImgId =
      profileImg &&
      (user.profileImgId &&
        (await cloudinary.uploader.destroy(user.profileImgId)),
      await cloudinary.uploader.upload(profileImg, {
        folder: 'sync-up/users/profileImages',
      })).public_id;

    // update the user profile details
    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    // user.link = link || user.link; // at this point we don't have link in our app
    user.profileImgId = cloudinaryImgId || user.profileImgId;

    const updatedUser = await user.save();
    // password should be null in response
    updatedUser.password = null;

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(`Error while updating the user details ${err.message}`);
    next(err);
  }
};

import User from '../models/User.js';
import Notification from '../models/Notification.js';
import error from '../utils/error.js';

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

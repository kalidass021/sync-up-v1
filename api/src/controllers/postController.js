import Post from '../models/Post.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import error from '../utils/error.js';

export const createPost = async (req, res, next) => {
  try {
    const { caption, image, location, tags } = req.body;

    // we need to add a creator in the post
    const { _id: userId } = req.user;

    if (!caption && !image) {
      return next(error(400, 'Post must have caption or image'));
    }

    // let cloudinaryImgSecureUrl;

    // if (image) {
    //   const uploadResponse = await cloudinary.uploader.upload(image, {
    //     folder: 'sync-up/posts',
    //   });
    //   cloudinaryImgSecureUrl = uploadResponse.secure_url;
    // }

    const cloudinaryImgId =
      image &&
      (
        await cloudinary.uploader.upload(image, {
          folder: 'sync-up/posts',
        })
      ).public_id; // upload will return upload response // on upload response we're getting secure url
    // if we need https url we need to use .secure_url

    const newPost = new Post({
      creator: userId,
      caption,
      imgId: cloudinaryImgId || '',
      location,
      tags,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error(`Error while post creation ${err.message || err.error}`);
    next(err);
  }
};

export const getRecentPosts = async (req, res, next) => {
  try {
    // fetch recent posts, sorted by created at in descending order
    const recentPosts = await Post.find().sort({ createdAt: -1 }).populate({
      path: 'creator',
      select: 'profileImg fullName',
    });

    // in the above code without populate method it will return posts with userId only
    // but we  want other user details to display in the frontend, we're getting that using populate
    // we're selecting the properties using select method

    res.status(200).json(recentPosts);
  } catch (err) {
    console.error(`Error while fetching recent posts ${err}`);
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { _id: userId } = req.user;
    const post = await Post.findById(postId);

    if (!post) {
      return next(error(404, 'Post not found'));
    }

    if (post.creator.toString() !== userId.toString()) {
      return next(error(401, "You're not authorized to delete this post"));
    }

    if (post.imgId) {
      await cloudinary.uploader.destroy(post.imgId);
    }

    // delete post from mongo db
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Post removed successfully' });
  } catch (err) {
    console.error(`Error while post deletion ${err.message || err.error}`);
    next(err);
  }
};

export const likeOrUnlikePost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return next(error(404, 'Post not found'));
    }

    // check wheather the user is already like post or not
    const likedBefore = post.likes.includes(userId);

    if (likedBefore) {
      // user already liked the post
      // unlike the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      // remove the postId from the user's liked posts
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      // reload the posts to get the updated likes array
      const updatedPost = await Post.findById(postId);
      const updatedLikes = updatedPost.likes;

      res.status(200).json(updatedLikes);
      // we don't need to send any notification for unlike post
    } else {
      // user not liked the post already
      // like the post
      post.likes.push(userId);
      // push the postId into user's liked posts
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      // save the post
      post.save();

      // create a notification
      const notification = new Notification({
        from: userId,
        to: post.creator._id,
        type: 'like',
      });

      await notification.save();

      // reload the post to get a updated likes
      const updatedPost = await Post.findById(postId);
      const updatedLikes = updatedPost.likes;

      res.status(200).json(updatedLikes);
    }
  } catch (err) {
    console.error(`Error in like or unlike post controller ${err.message}`);
    next(err);
  }
};

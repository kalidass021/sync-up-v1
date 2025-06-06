import { v2 as cloudinary } from 'cloudinary';
import { Post, User, Notification } from '../models';
import { error } from '../utils';
import { MEME_API_URL } from '../utils/constants';

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

export const getSpecificPost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const specificPost = await Post.findById(postId).populate({
      path: 'creator',
      select: 'profileImgId fullName username',
    });

    if (!specificPost) {
      return next(error(404, 'Post not found'));
    }

    res.status(200).json(specificPost);
  } catch (err) {
    console.error(`Error while fetching specific post ${err.message}`);
    next(err);
  }
};

export const getRecentPosts = async (req, res, next) => {
  try {
    // fetch recent posts, sorted by created at in descending order
    const recentPosts = await Post.find().sort({ createdAt: -1 }).populate({
      path: 'creator',
      select: 'profileImgId fullName username',
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

export const getUserPosts = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return next(error(404, 'User not found'));
    }

    const posts = await Post.find({ creator: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while fetching user posts: ${err.message}`);
    next(err);
  }
};

export const getPostsByIds = async (req, res, next) => {
  try {
    const postIds = req.query?.ids.split(',') || [];

    if (!Array.isArray(postIds)) {
      return next(error(400, 'PostIds must be an array'));
    }

    if (!postIds.length) {
      return next(error(400, 'PostIds must be an non-empty array'));
    }
    const posts = await Post.find({ _id: { $in: postIds } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: 'creator',
        select: 'profileImgId fullName username',
      });

    res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while fetching posts by ids: ${err.message}`);
    next(err);
  }
};

export const getInfinitePosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 9 } = req.query;
    // ensure page and limit are integers
    const PAGE = parseInt(page);
    const LIMIT = parseInt(limit > 9 ? 9 : limit); // restrict the max limit to 9

    const SKIP = (PAGE - 1) * LIMIT;
    const posts = await Post.find()
      .skip(SKIP) // skip the number of posts based on current page
      .limit(LIMIT) // limit the number of posts returned
      .sort({ createdAt: -1 })
      .populate({
        path: 'creator',
        select: 'profileImgId fullName username', // select specific fields from the creator
      });

    // if posts.length === 0
    if (!posts.length) {
      return next(error(404, 'No posts found'));
    }

    // count the number of posts for pagination calculation
    const TOTAL_POSTS = await Post.countDocuments();
    // caculate total pages
    const TOTAL_PAGES = Math.ceil(TOTAL_POSTS / limit);

    // send the paginated posts along with pagination info
    res.status(200).json({
      success: true,
      posts,
      totalPages: TOTAL_PAGES,
      currentPage: PAGE,
    });
  } catch (err) {
    console.error(`Error while fetching inifinite posts ${err.message}`);
    next(err);
  }
};

export const searchPosts = async (req, res, next) => {
  try {
    const { query: searchText } = req.query;

    if (!searchText) {
      return next(error(400, 'Search text is required'));
    }

    // create the case-insensitive regex for the search text
    const searchTextRegex = new RegExp(searchText, 'i'); // i flag for case-insensitive matching
    // perform search using mongo db's regex search
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'users', // collection name
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      {
        $match: {
          $or: [
            { caption: { $regex: searchTextRegex } },
            { location: { $regex: searchTextRegex } },
            { tags: { $regex: searchTextRegex } },
            { 'creator.username': { $regex: searchTextRegex } },
            { 'creator.fullName': { $regex: searchTextRegex } },
          ],
        },
      },
      {
        $project: {
          caption: 1,
          location: 1,
          tags: 1,
          imgId: 1,
          likes: 1,
          saves: 1,
          comments: 1,
          createdAt: 1,
          updatedAt: 1,
          creator: {
            _id: 1,
            username: 1,
            fullName: 1,
            profileImgId: 1,
          },
        },
      },
    ]).sort({ createdAt: -1 });
    if (!posts.length) {
      return next(error(404, 'No posts found'));
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while searching posts ${err.message}`);
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const { id: postId } = req.params;
    const { caption, image, location, tags } = req.body;

    // find the post by id
    const post = await Post.findById(postId);

    if (!post) {
      return next(error(404, 'Post not found'));
    }

    // ensure the user is creator of the post
    if (post.creator.toString() !== userId.toString()) {
      return next(
        error(403, 'Forbidden. You do not have permission to delete this post')
      );
    }

    // destroy the old image on the cloudinary, and upload the new image if provided
    const cloudinaryImgId =
      image &&
      (await cloudinary.uploader.destroy(post.imgId),
      (
        await cloudinary.uploader.upload(image, {
          folder: 'sync-up/posts',
        })
      ).public_id);

    // update post fields
    post.caption = caption || post.caption;
    post.imgId = cloudinaryImgId || post.imgId;
    post.location = location || post.location;
    post.tags = tags || post.tags;

    // save the updated post
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(`Error while updating the post ${err.message}`);
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
      return next(
        error(403, 'Forbidden. You do not have permission to delete this post')
      );
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

    // check whether the user is already like post or not
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
      await post.save();

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

export const saveOrUnsavePost = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return next(error(404, 'Post not found'));
    }

    //  check whether the user already saved post or not
    const savedBefore = post.saves.includes(userId);

    if (savedBefore) {
      // user already saved the post
      // unsave the post
      await Post.updateOne({ _id: postId }, { $pull: { saves: userId } });
      // remove the postId from the user's liked posts
      await User.updateOne({ _id: userId }, { $pull: { savedPosts: postId } });

      // reload the posts to get the updated likes array
      const updatedPost = await Post.findById(postId);
      const updatedSaves = updatedPost.saves;

      res.status(200).json(updatedSaves);
    } else {
      // user not saved the post already
      // save the post
      post.saves.push(userId);
      // push the postId into user's liked posts
      await User.updateOne({ _id: userId }, { $push: { savedPosts: postId } });
      // save the post
      await post.save();

      // reload the post to get a updated saves
      const updatedPost = await Post.findById(postId);
      const updatedSaves = updatedPost.saves;

      res.status(200).json(updatedSaves);
    }
  } catch (err) {
    console.error(`Error in save or unsave post controller ${err.message}`);
    next(err);
  }
};

export const fetchMemeOfTheDay = async (req, res, next) => {
  try {
    const memeAPIResponse = await fetch(MEME_API_URL);
    const meme = await memeAPIResponse.json();
    res.status(200).json(meme);
  } catch (err) {
    console.error(`Error while fetching meme of the day: ${err.message}`);
    next(err);
  }
}

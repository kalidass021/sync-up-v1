import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/Post.js';
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

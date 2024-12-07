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

    const cloudinaryImgSecureUrl =
      image &&
      (
        await cloudinary.uploader.upload(image, {
          folder: 'sync-up/posts',
        })
      ).secure_url; // upload will return upload response // on upload response we're getting secure url

    const newPost = new Post({
      creator: userId,
      caption,
      img: cloudinaryImgSecureUrl || '',
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

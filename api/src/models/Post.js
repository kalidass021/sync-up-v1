import { model, Schema } from 'mongoose';

const postSchema = Schema(
  {
    // posted by user
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caption: {
      type: String,
      // required: true,
    },
    imgId: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;

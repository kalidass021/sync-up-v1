import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    },
  ],
  profileImgId: {
    type: String,
    default: '',
  },
  coverImgId: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  likedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      default: [],
    },
  ],
  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      default: [],
    },
  ],
}, {timestamps: true});

const User = model('User', userSchema);

export default User;
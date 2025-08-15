import { v2 as cloudinary } from 'cloudinary';
import { CONFIG_ERRORS } from '../constants';

// configure cloudinary
const cloudinaryConfig = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (err) {
    console.error(`${CONFIG_ERRORS.CLOUDINARY_ERROR} ${err.message}`);
  }
};

export default cloudinaryConfig;

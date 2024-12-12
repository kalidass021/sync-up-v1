import { v2 as cloudinary } from 'cloudinary';

// configure cloudinary
const cloudinaryConfig = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (err) {
    console.error(`Error while configuring cloudinary ${err.message}`);
  }
};

export default cloudinaryConfig;

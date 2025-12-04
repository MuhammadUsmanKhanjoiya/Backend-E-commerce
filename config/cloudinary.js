import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {
  cloudinary.config({
    api_key: process.env.Cloudinary_api_Key,
    api_secret: process.env.Cloudinary_api_secret,
    cloud_name: process.env.Cloudinary_name,
  });
};
export default connectCloudinary;
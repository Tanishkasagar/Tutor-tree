// Importing the v2 version of the cloudinary library for interacting with Cloudinary's API
import { v2 as cloudinary } from 'cloudinary';

// Async function to connect to Cloudinary
const connectCloudinary = async () => {

    // Configuring the Cloudinary instance with necessary credentials from environment variables
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,  
        api_key: process.env.CLOUDINARY_API_KEY,        
        api_secret: process.env.CLOUDINARY_SECRET_KEY   
    });

}

// Exporting the connectCloudinary function for use in other parts of the application
export default connectCloudinary;

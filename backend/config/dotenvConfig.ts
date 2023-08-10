import dotenv from 'dotenv'
dotenv.config()

const config = {
    jwt_secret : process.env.JWT_SECRET,
    region:process.env.REGION,
    aws_access_key:process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key:process.env.AWS_SECRET_KEY,
    cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET,
    port:process.env.PORT
}

export default config
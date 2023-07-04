import dotenv from 'dotenv'
dotenv.config()

const config = {
    jwt_secret : process.env.JWT_SECRET,
    region:process.env.REGION,
    aws_access_key:process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key:process.env.AWS_SECRET_KEY
}

export default config
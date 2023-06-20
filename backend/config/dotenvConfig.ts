import dotenv from 'dotenv'
dotenv.config()

const config = {
    jwt_secret : process.env.JWT_SECRET
}

export default config
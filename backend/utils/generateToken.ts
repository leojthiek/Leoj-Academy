import jwt from 'jsonwebtoken'
import config from '../config/dotenvConfig'

const generateToken =(id:string)=>{
   const secretKey:string = config.jwt_secret
   const token = jwt.sign({id},secretKey,{expiresIn:'30d'})
   return token
}

export default generateToken
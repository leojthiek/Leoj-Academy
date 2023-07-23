import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/UserEntity"
import { validate } from "class-validator"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken"



//  @ REGISTERING A USER


const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    const user = new User({ email, password, username })

    const userRepository = AppDataSource.getRepository(User)
    const userEmail = await userRepository.findOne({ where: { email } })
    const userName = await userRepository.findOne({ where: { username } })

    if (userEmail) {
      return res.status(400).json({ errors: "email already exists" })
    }
    if (userName) {
      return res.status(400).json({ errors: "username already taken" })
    }

    const userValidation = await validate(user)

    if (userValidation.length > 0) {
      const errors = userValidation.map((error) => error.constraints[Object.keys(error.constraints)[0]]);
      return res.status(400).json({ errors });
    }
    

    await AppDataSource.manager.save(user)

    return res.json({user:user})
  } catch (error) {
    console.log(error)
    return res.status(400).json({errors:'registration failed something wrong with the server'})
  }
}


// @ USER AUTHENTICATION

const loginController = async(req:Request,res:Response)=>{
    const {email,password}= req.body

    try {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where : {email}})

        if(!user){
            return res.status(400).json({errors:"invalid credential"})
        }

        const comparePassword = await bcrypt.compare(password,(user).password)

        if(!comparePassword){
            return res.status(400).json({errors:"invalid credential"})
        }
        if(user && comparePassword){
            const token = generateToken(user.id)
             const {id,email,permission,username} = user
            const userInfo = {id,email,permission,username,token}
            return res.status(200).json({userInfo:userInfo})
        }
    } catch (error) {
        console.log(error)
    }
}

export { registerController,loginController }

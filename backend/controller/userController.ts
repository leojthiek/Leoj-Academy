import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/UserEntity"
import { validate } from "class-validator"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken"
import initializeDataSource from "../utils/inititialisedDataSource"



//  @ REGISTERING A USER


const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
     
    await initializeDataSource()

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
      res.status(400).json({ errors: userValidation })
    }

    await AppDataSource.manager.save(user)

    return res.json(user)
  } catch (error) {
    console.log(error)
  }
}


// @ USER AUTHENTICATION

const loginController = async(req:Request,res:Response)=>{
    const {email,password}= req.body

    try {
        await initializeDataSource()
        const userRepository = await AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where : {email}})

        if(!user){
            return res.status(400).json({error:"invalid credential"})
        }

        const comparePassword = await bcrypt.compare(password,(await user).password)

        if(!comparePassword){
            return res.status(400).json({errors:"invalid credential"})
        }
        if(user && comparePassword){
            const token = generateToken(user.id)
            return res.status(200).json({user,token})
        }
    } catch (error) {
        console.log(error)
    }
}

export { registerController,loginController }

import jwt from "jsonwebtoken"
import { User } from "../entities/UserEntity"
import { NextFunction, Request, Response } from "express"
import config from "../config/dotenvConfig"
import initializeDataSource from "../utils/inititialisedDataSource"
import { AppDataSource } from "../data-source"

interface UserRequest extends Request {
  user: User
}

const protect = async (req: UserRequest, res: Response, next: NextFunction) => {
  let token: string

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const UserRepository = AppDataSource.getRepository(User)
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, config.jwt_secret) as { id: string }

      const user = await UserRepository.findOne({ where: { id: decoded.id } })

      if (user) {
        req.user = user
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({ errors: "Unauthorized, token not found" })
    }
  } else {
    return res.status(400).json({ errors: "Unauthorized, plese sign in to continue" })
  }

  next()
}

export { protect }

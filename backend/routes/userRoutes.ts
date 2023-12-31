import express from "express";
import { loginController, registerController } from "../controller/userController";


const router = express.Router()

router.route('/register').post(registerController)
router.route('/login').post(loginController)


export default router
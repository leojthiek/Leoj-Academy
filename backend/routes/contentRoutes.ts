import express from 'express'
import { getVideoContent } from '../controller/contentController'


const router = express.Router()


router.route('/video').get(getVideoContent)

export default router
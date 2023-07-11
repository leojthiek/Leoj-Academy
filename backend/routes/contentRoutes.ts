import express from 'express'
import { getVideoContent } from '../controller/contentController'
import { protect } from '../middleware/protect'


const router = express.Router()


router.route('/video').get(getVideoContent)

export default router
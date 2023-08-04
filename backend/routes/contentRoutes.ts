import express from 'express'
import { createContent, getVideoContent } from '../controller/contentController'
import { protect } from '../middleware/protect'


const router = express.Router()


router.route('/video/:id').get(protect,getVideoContent)
router.route('/admin/content/create/:id').post(createContent)

export default router
import express from 'express'
import { createContent, getChapterContent, getVideoContent } from '../controller/contentController'
import { protect } from '../middleware/protect'


const router = express.Router()


router.route('/video/:id').get(protect,getVideoContent)
router.route('/admin/content/create/:id').post(createContent)
router.route('/chapter/:id').get(getChapterContent)

export default router
import express from "express";
import { createChaters, createCourse, getCourseChapter, getCourseDetails, getCoursePurchaseDetail, getCourseWithSameCategory, getCourseWithSameInstructor, getOneLatestCreatedCourse, getTopCourse } from "../controller/courseController";
import { protect } from "../middleware/protect";

const router = express.Router()

router.route('/admin/createcourse').post(createCourse)
router.route('/topCourse').get(getTopCourse)
router.route('/category/course/:id').get(getCourseWithSameCategory)
router.route('/courseDetail/:id').get(getCourseDetails)
router.route('/instructor/course/:id').get(getCourseWithSameInstructor)
router.route('/purchase/courseDetail/:id').get(protect,getCoursePurchaseDetail)
router.route('/admin/chapter/create/:id').post(createChaters)
router.route('/admin/course/latest').get(getOneLatestCreatedCourse)
router.route('/:id').get(getCourseChapter)

export default router
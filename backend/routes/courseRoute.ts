import express from "express";
import { createCourse, getCourseDetails, getCoursePurchaseDetail, getCourseWithSameCategory, getCourseWithSameInstructor, getTopCourse } from "../controller/courseController";
import { protect } from "../middleware/protect";

const router = express.Router()

router.route('/admin/createcourse').post(createCourse)
router.route('/topCourse').get(getTopCourse)
router.route('/category/course/:id').get(getCourseWithSameCategory)
router.route('/courseDetail/:id').get(getCourseDetails)
router.route('/instructor/course/:id').get(getCourseWithSameInstructor)
router.route('/purchase/courseDetail/:id').get(protect,getCoursePurchaseDetail)



export default router
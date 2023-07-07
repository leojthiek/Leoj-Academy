import express from "express";
import { createCourse, getCourseDetails, getCourseWithSameInstructor, getTopCourse } from "../controller/courseController";

const router = express.Router()

router.route('/admin/createcourse').post(createCourse)
router.route('/topCourse').get(getTopCourse)
router.route('/courseDetail/:id').get(getCourseDetails)
router.route('/instructor/course/:id').get(getCourseWithSameInstructor)


export default router
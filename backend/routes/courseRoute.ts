import express from "express";
import { createCourse, getTopCourse } from "../controller/courseController";

const router = express.Router()

router.route('/admin/createcourse').post(createCourse)
router.route('/topCourse').get(getTopCourse)


export default router
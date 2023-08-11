"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var courseController_1 = require("../controller/courseController");
var protect_1 = require("../middleware/protect");
var router = express_1.default.Router();
router.route('/admin/createcourse').post(courseController_1.createCourse);
router.route('/topCourse').get(courseController_1.getTopCourse);
router.route('/category/course/:id').get(courseController_1.getCourseWithSameCategory);
router.route('/courseDetail/:id').get(courseController_1.getCourseDetails);
router.route('/instructor/course/:id').get(courseController_1.getCourseWithSameInstructor);
router.route('/purchase/courseDetail/:id').get(protect_1.protect, courseController_1.getCoursePurchaseDetail);
router.route('/admin/chapter/create/:id').post(courseController_1.createChaters);
router.route('/admin/course/latest').get(courseController_1.getOneLatestCreatedCourse);
router.route('/:id').get(courseController_1.getCourseChapter);
exports.default = router;
//# sourceMappingURL=courseRoute.js.map
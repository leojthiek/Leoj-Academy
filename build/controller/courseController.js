"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseChapter = exports.getOneLatestCreatedCourse = exports.createChaters = exports.getCoursePurchaseDetail = exports.getCourseWithSameCategory = exports.getCourseWithSameInstructor = exports.getCourseDetails = exports.getTopCourse = exports.createCourse = void 0;
var data_source_1 = require("../data-source");
var CourseEntity_1 = require("../entities/CourseEntity");
var CoursePurchaseEntity_1 = require("../entities/CoursePurchaseEntity");
var ChapterEntity_1 = require("../entities/ChapterEntity");
var cloudinary_1 = require("cloudinary");
//  @ CREATING A COURSE
var createCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, course_name, course_description, course_price, course_category, course_instructor, course_image, rating, numOfReviews, imageBase64, uploadRes, course, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, course_name = _a.course_name, course_description = _a.course_description, course_price = _a.course_price, course_category = _a.course_category, course_instructor = _a.course_instructor, course_image = _a.course_image, rating = _a.rating, numOfReviews = _a.numOfReviews;
                imageBase64 = Array.isArray(course_image) ? course_image[0] : course_image;
                if (!imageBase64) return [3 /*break*/, 3];
                return [4 /*yield*/, cloudinary_1.v2.uploader.upload(imageBase64, {
                        upload_preset: "second-project"
                    })];
            case 1:
                uploadRes = _b.sent();
                if (!uploadRes) return [3 /*break*/, 3];
                course = new CourseEntity_1.Course({
                    course_name: course_name,
                    course_category: course_category,
                    course_description: course_description,
                    course_image: uploadRes.secure_url,
                    course_instructor: course_instructor,
                    course_price: course_price,
                    rating: rating,
                    numOfReviews: numOfReviews,
                });
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(course)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ course: course })];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res
                    .status(400)
                    .json({ errors: "server error while creating course,please try again" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCourse = createCourse;
//  CREATE CHAPTERS COURSE
var createChaters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, _a, Chapter_title, Chapter_description, courseRepository, course, chapters, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                courseId = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, Chapter_title = _a.Chapter_title, Chapter_description = _a.Chapter_description;
                if (Chapter_title === "") {
                    return [2 /*return*/, res.status(400).json({ errors: "chapter title cannot be empty" })];
                }
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.findOne({ where: { id: courseId } })];
            case 2:
                course = _b.sent();
                if (!course) {
                    return [2 /*return*/, res.status(400).json({ error: "course not found" })];
                }
                chapters = new ChapterEntity_1.Chapters({
                    Chapter_title: Chapter_title,
                    Chapter_description: Chapter_description,
                    course: course,
                });
                return [4 /*yield*/, data_source_1.AppDataSource.manager.save(chapters)];
            case 3:
                _b.sent();
                res.status(200).json({ chapters: chapters });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(400).json({
                    errors: "something went wrong while creating chapter, please try again",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createChaters = createChaters;
// GET 4 TOP COURSE
var getTopCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseRepository, topCourse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.find({
                        order: {
                            rating: "DESC",
                        },
                        take: 4,
                    })];
            case 1:
                topCourse = _a.sent();
                if (topCourse) {
                    res.status(200).json({ course: topCourse });
                }
                else {
                    res.status(400).json({ errors: "courses not found" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res
                    .status(401)
                    .json({ error: "Something is wrong with the server please try again" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTopCourse = getTopCourse;
// GET COURSE LATEST CREATED
var getOneLatestCreatedCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseRepository, getLatest, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.find({
                        order: {
                            createAt: "DESC",
                        },
                        take: 1,
                    })];
            case 1:
                getLatest = _a.sent();
                if (getLatest) {
                    res.status(200).json({ course: getLatest });
                }
                else {
                    res.status(400).json({ errors: "courses not found" });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                res
                    .status(401)
                    .json({ error: "Something is wrong with the server please try again" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOneLatestCreatedCourse = getOneLatestCreatedCourse;
// GET  COURSE DETAILS
var getCourseDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, courseRepository, courseDetail, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.findOne({
                        where: { id: courseId },
                        relations: ["chapter", "chapter.content"],
                    })];
            case 2:
                courseDetail = _a.sent();
                if (!courseDetail) {
                    return [2 /*return*/, res.status(400).json({ errors: "course details not found" })];
                }
                res.status(200).json({ course: courseDetail });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log("error", error_5);
                res.status(400).json({ errors: "failed to retrive course details" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCourseDetails = getCourseDetails;
// GET ALL CHAPTER FROM SPECIFIC COURSE
var getCourseChapter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, courseRepository, chapters, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courseId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.findOne({
                        where: { id: courseId },
                        relations: ["chapter"],
                    })];
            case 2:
                chapters = _a.sent();
                if (!chapters) {
                    return [2 /*return*/, res.status(400).json({ errors: "course details not found" })];
                }
                res.status(200).json({ course: chapters });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.log("error", error_6);
                res.status(400).json({ errors: "failed to retrive course details" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCourseChapter = getCourseChapter;
var getCoursePurchaseDetail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, courseId, courseRepository, courseDetail, coursePurchaseRepo, coursePurchase, course, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                courseId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.findOne({
                        where: { id: courseId },
                        relations: ["chapter", "chapter.content"],
                    })];
            case 2:
                courseDetail = _a.sent();
                if (!courseDetail) {
                    return [2 /*return*/, res.status(400).json({ errors: "course details not found" })];
                }
                coursePurchaseRepo = data_source_1.AppDataSource.getRepository(CoursePurchaseEntity_1.CoursePurchase);
                return [4 /*yield*/, coursePurchaseRepo.findOne({
                        where: { user: { id: userId }, course: { id: courseId }, isPaid: true },
                    })];
            case 3:
                coursePurchase = _a.sent();
                if (coursePurchase) {
                    course = { courseDetail: courseDetail, coursePurchase: coursePurchase };
                    res.status(200).json({ course: course });
                }
                else {
                    res.status(400).json({ errors: "course not purchase" });
                }
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.log("error", error_7);
                res.status(400).json({ errors: "failed to retrive course details" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getCoursePurchaseDetail = getCoursePurchaseDetail;
// GET COURSE UNDER SPECIFIC INSTRUCTOR
var getCourseWithSameInstructor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, courseRepository, course, instructorName, courseWithSameInstructor, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                courseId = req.params.id;
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.findOne({ where: { id: courseId } })];
            case 1:
                course = _a.sent();
                if (!course) return [3 /*break*/, 3];
                instructorName = course.course_instructor;
                return [4 /*yield*/, courseRepository.find({
                        where: {
                            course_instructor: instructorName,
                        },
                        order: {
                            rating: "DESC",
                        },
                        take: 4,
                    })];
            case 2:
                courseWithSameInstructor = _a.sent();
                if (courseWithSameInstructor) {
                    res.status(200).json({ instructorCourse: courseWithSameInstructor });
                }
                else {
                    res.status(400).json({ errors: "Course not found" });
                }
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({ errors: "Course not found" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_8 = _a.sent();
                console.log(error_8);
                res.status(400).json({ error: "Something went wrong with the server" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getCourseWithSameInstructor = getCourseWithSameInstructor;
// GET TOP RATED 4 COURSE WITH SAME CATEGORY
var getCourseWithSameCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, courseRepository, course, categoryName, courseWithSameCategory, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                courseId = req.params.id;
                courseRepository = data_source_1.AppDataSource.getRepository(CourseEntity_1.Course);
                return [4 /*yield*/, courseRepository.findOne({ where: { id: courseId } })];
            case 1:
                course = _a.sent();
                if (!course) return [3 /*break*/, 3];
                categoryName = course.course_category;
                return [4 /*yield*/, courseRepository.find({
                        where: {
                            course_category: categoryName,
                        },
                        order: {
                            rating: "DESC",
                        },
                        take: 4,
                    })];
            case 2:
                courseWithSameCategory = _a.sent();
                if (courseWithSameCategory) {
                    res.status(200).json({ courseCategory: courseWithSameCategory });
                }
                else {
                    res.status(400).json({ errors: "Course not found" });
                }
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({ errors: "Course not found" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_9 = _a.sent();
                console.log(error_9);
                res.status(400).json({ errors: "Something went wrong with the server" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getCourseWithSameCategory = getCourseWithSameCategory;
//# sourceMappingURL=courseController.js.map
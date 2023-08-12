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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChapterContent = exports.createContent = exports.getVideoContent = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
var data_source_1 = require("../data-source");
var CoursePurchaseEntity_1 = require("../entities/CoursePurchaseEntity");
var ChapterEntity_1 = require("../entities/ChapterEntity");
var multer_1 = require("../middleware/multer");
var ContentEntity_1 = require("../entities/ContentEntity");
var s3client = new client_s3_1.S3Client({
    region: dotenvConfig_1.default.region,
    credentials: {
        accessKeyId: dotenvConfig_1.default.aws_access_key,
        secretAccessKey: dotenvConfig_1.default.aws_secret_key,
    },
});
var getVideoContent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, bucketName, keyName, userId, courseId, coursePurchaseRepo, coursePurchase, command, signedUrl, error_1, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 8, , 9]);
                _a = req.query, bucketName = _a.bucketName, keyName = _a.keyName;
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                courseId = req.params.id;
                coursePurchaseRepo = data_source_1.AppDataSource.getRepository(CoursePurchaseEntity_1.CoursePurchase);
                return [4 /*yield*/, coursePurchaseRepo.findOne({
                        where: {
                            user: { id: userId },
                            course: { id: String(courseId) },
                            isPaid: true,
                        },
                    })];
            case 1:
                coursePurchase = _c.sent();
                if (!coursePurchase) return [3 /*break*/, 6];
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                if (!keyName || !bucketName) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: "No video found for the specific key or bucket" })];
                }
                command = new client_s3_1.GetObjectCommand({
                    Bucket: "leojacademy-video",
                    Key: keyName.toString(),
                });
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3client, command, {
                        expiresIn: 3600,
                    })];
            case 3:
                signedUrl = _c.sent();
                res.status(200).json({ url: signedUrl });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                console.log(error_1);
                res.status(500).json({ errors: "Internal Server Error" });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                res
                    .status(403)
                    .json({ errors: "Unauthorized. Please purchase the course." });
                _c.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _c.sent();
                console.error("Error generating signed URL for video:", error_2);
                res.status(500).json({ errors: "Internal Server Error" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getVideoContent = getVideoContent;
// CREATING A CONTENT SPECIFIC WISE OF ITS CHAPTER
var createContent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, courseRepository, contentChapter_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chapterId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                courseRepository = data_source_1.AppDataSource.getRepository(ChapterEntity_1.Chapters);
                return [4 /*yield*/, courseRepository.findOne({
                        where: { id: chapterId },
                    })];
            case 2:
                contentChapter_1 = _a.sent();
                if (!contentChapter_1) {
                    return [2 /*return*/, res.status(400).json({ error: "chapter not found" })];
                }
                multer_1.upload.single("video")(req, res, function (err) {
                    return __awaiter(this, void 0, void 0, function () {
                        var file, videoKey, _a, title, description, content;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (err) {
                                        console.log(err);
                                        return [2 /*return*/, res.status(500).json({ errors: "failed uploading the file" })];
                                    }
                                    file = req.file;
                                    videoKey = file.key;
                                    _a = req.body, title = _a.title, description = _a.description;
                                    if (title === "") {
                                        return [2 /*return*/, res.status(400).json({ errors: "chapter title cannot be empty" })];
                                    }
                                    content = new ContentEntity_1.Contents({
                                        title: title,
                                        description: description,
                                        videoURL: videoKey,
                                        contentChapter: contentChapter_1,
                                    });
                                    return [4 /*yield*/, data_source_1.AppDataSource.manager.save(content)];
                                case 1:
                                    _b.sent();
                                    res.status(200).json({ content: content });
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(400).json({
                    errors: "something went wrong while creating content, please try again",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createContent = createContent;
// GETTING COURSE CHAPTER CONTENT
var getChapterContent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, courseRepository, contents, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chapterId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                courseRepository = data_source_1.AppDataSource.getRepository(ChapterEntity_1.Chapters);
                return [4 /*yield*/, courseRepository.findOne({
                        where: { id: chapterId },
                        relations: ["content"],
                    })];
            case 2:
                contents = _a.sent();
                if (!contents) {
                    return [2 /*return*/, res.status(400).json({ errors: "course details not found" })];
                }
                res.status(200).json({ chapter: contents });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log("error", error_4);
                res.status(400).json({ errors: "failed to retrive course details" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getChapterContent = getChapterContent;
//# sourceMappingURL=contentController.js.map
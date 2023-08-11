"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var dotenvConfig_1 = __importDefault(require("../config/dotenvConfig"));
var client_s3_1 = require("@aws-sdk/client-s3");
var s3client = new client_s3_1.S3Client({
    region: dotenvConfig_1.default.region,
    credentials: {
        accessKeyId: dotenvConfig_1.default.aws_access_key,
        secretAccessKey: dotenvConfig_1.default.aws_secret_key,
    },
});
exports.upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3client,
        bucket: 'leojacademy-video',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            var videoKey = Date.now() + file.originalname;
            cb(null, videoKey);
        }
    })
});
//# sourceMappingURL=multer.js.map
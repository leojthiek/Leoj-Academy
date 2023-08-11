"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    jwt_secret: process.env.JWT_SECRET,
    region: process.env.REGION,
    aws_access_key: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_key: process.env.AWS_SECRET_KEY,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    port: process.env.PORT,
    postgres_host: process.env.DATABASE_HOST,
    postgres_database_password: process.env.DATABASE_PASSWORD
};
exports.default = config;
//# sourceMappingURL=dotenvConfig.js.map
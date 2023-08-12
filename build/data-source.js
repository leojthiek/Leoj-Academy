"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dotenvConfig_1 = __importDefault(require("./config/dotenvConfig"));
var UserEntity_1 = require("./entities/UserEntity");
var CourseEntity_1 = require("./entities/CourseEntity");
var CoursePurchaseEntity_1 = require("./entities/CoursePurchaseEntity");
var ContentEntity_1 = require("./entities/ContentEntity");
var ChapterEntity_1 = require("./entities/ChapterEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: dotenvConfig_1.default.postgres_host,
    port: 5432,
    username: "postgres",
    password: dotenvConfig_1.default.postgres_database_password,
    database: "postgres",
    cache: false,
    synchronize: false,
    logging: false,
    entities: [UserEntity_1.User, CourseEntity_1.Course, CoursePurchaseEntity_1.CoursePurchase, ContentEntity_1.Contents, ChapterEntity_1.Chapters],
    migrations: ["./backend/migrations/*.ts"],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map
import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "./config/dotenvConfig"
import { User } from "./entities/UserEntity"
import { Course } from "./entities/CourseEntity"
import { CoursePurchase } from "./entities/CoursePurchaseEntity"
import { Contents } from "./entities/ContentEntity"
import { Chapters } from "./entities/ChapterEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.postgres_host,
    port: 5432,
    username: "postgres",
    password: config.postgres_database_password,
    database: "postgres",
    cache:false,
    synchronize: false,
    logging: false,
    entities: [User,Course,CoursePurchase,Contents,Chapters],
    migrations: ["./backend/migrations/*.ts"],
    subscribers: [],
})

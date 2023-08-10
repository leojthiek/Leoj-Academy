import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/UserEntity"
import { Course } from "./entities/courseEntity"
import { Chapters } from "./entities/ChapterEntity"
import { Contents } from "./entities/ContentEntity"
import { CoursePurchase } from "./entities/CoursePurchaseEntity"
import config from "./config/dotenvConfig"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.postgres_host,
    port: 5432,
    username: "postgres",
    password: config.postgres_database_password,
    database: "postgres",
    cache:false,
    synchronize: true,
    logging: false,
    entities: [User,Course,Chapters,Contents,CoursePurchase],
    migrations: ["./backend/migrations/*.ts"],
    subscribers: [],
})

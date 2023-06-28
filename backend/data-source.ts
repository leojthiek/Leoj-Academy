import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/UserEntity"
import { Course } from "./entities/courseEntity"
import { Chapters } from "./entities/ChapterEntity"
import { Contents } from "./entities/ContentEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "joel",
    password: "rokiemlo",
    database: "leoj_academy",
    synchronize: true,
    logging: false,
    entities: [User,Course,Chapters,Contents],
    migrations: ["./backend/migrations/*.ts"],
    subscribers: [],
})

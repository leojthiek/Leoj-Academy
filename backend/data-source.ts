import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/UserEntity"
import { Course } from "./entities/courseEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "joel",
    password: "rokiemlo",
    database: "leoj_academy",
    synchronize: true,
    logging: false,
    entities: [User,Course],
    migrations: ["./backend/migrations/*.ts"],
    subscribers: [],
})

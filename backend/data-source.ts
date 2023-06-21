import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/UserEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "joel",
    password: "rokiemlo",
    database: "leoj_academy",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: ["./backend/migrations/*.ts"],
    subscribers: [],
})

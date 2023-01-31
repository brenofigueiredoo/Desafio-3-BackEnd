import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test"
      ? {
          type: "sqlite",
          database: ":memory:",
          synchronize: true,
          entities: ["src/entities/*.ts"],
        }
      : {
          type: "postgres",
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB,
          logging: true,
          synchronize: false,
          entities: ["src/entities/*.ts"],
          migrations: ["src/migrations/*.ts"],
        }
  );
  
export default AppDataSource;
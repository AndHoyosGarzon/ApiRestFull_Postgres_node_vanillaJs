import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  user: "postgres",
  password: "039227",
  host: "localhost",
  port: 5432,
  database: "jwt_db",
});

export default db;

import mysql from "mysql2";
import dbConfig from "../db/db.config";

export default mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});
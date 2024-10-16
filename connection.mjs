import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "db_perkantoran",
});

db.connect((error) => {
  if (error) {
    console.error("Database tidak terhubung");
    return;
  }
  console.log("Database Terhubung");
});

export default db;

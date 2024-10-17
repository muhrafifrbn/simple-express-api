import express from "express";
import bodyParser from "body-parser";
import { response } from "./controller/fungsi.mjs";
import db from "./connection.mjs";

const app = express();

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD Mahasiswa");
});

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM tester";
  db.query(sql, (error, result) => {
    try {
      if (error) throw error;
      response(200, result, "Show Data", res);
    } catch (error) {
      response(500, error.sqlMessage, "Error", res);
    }
  });
});

app.listen(3000, () => console.log("Server berjalan"));

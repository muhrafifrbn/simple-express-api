import express from "express";
import bodyParser from "body-parser";
import db from "./connection.mjs";
import { response, getDataFromDatabase } from "./controller/fungsi.mjs";

const app = express();

// Menggunakan bodyParser untuk memparsing inputan dari luar
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/get-data", (req, res) => {
  const sql = req.query.sql;
  console.log(sql);
  getDataFromDatabase({ query: sql, res, message: "Menampilkan Data" });
});

app.get("/cek", (req, res) => {
  db.query("SELECT * FROM tester", (error, result, fields) => {
    res.send(result);
  });
});

app.get("/show", (req, res) => {
  const sql = "SELECT * FROM tester";
  db.query(sql, (error, result) => {
    response(200, result, "Show Data", res);
  });
});

app.get("/find/:nim", (req, res) => {
  const sql = "SELECT * FROM tester WHERE nim = " + req.params.nim;
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error.sqlMessage);
      response(500, result, error.sqlMessage, res);
    } else {
      response(200, result, "find data success", res);
    }
  });
});

app.post("/login", (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => console.log("Server berjalan"));

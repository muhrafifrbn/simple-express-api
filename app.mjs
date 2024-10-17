import express from "express";
import bodyParser from "body-parser";
import { response } from "./controller/fungsi.mjs";
import db from "./connection.mjs";

const app = express();

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD Mahasiswa");
});

// Menampilkan semua data mahasiswa
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

// menampilakan data mahasiswa berdasarkan nim
app.get("/mahasiswa/:nim", (req, res) => {
  const sql = `SELECT * FROM tester WHERE nim = ${req.params.nim}`;
  const message = "display data base on nim";
  db.query(sql, (error, result) => {
    try {
      if (error) throw error;
      response(200, result, message, res);
    } catch (error) {
      response(500, error.sqlMessage, message, res);
    }
  });
});

app.listen(3000, () => console.log("Server berjalan"));

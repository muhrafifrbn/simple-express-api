import express from "express";
import bodyParser from "body-parser";
import { response } from "./controller/fungsi.mjs";
import db from "./connection.mjs";

const app = express();

app.use(bodyParser.json());

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
      response(500, error.sqlMessage, "Error", res);
    }
  });
});

// Menambahkan data mahasiswa
app.post("/mahasiswa/store", (req, res) => {
  const { nim, nama, alamat } = req.body;
  const message = "Insert data";
  const sql = `INSERT INTO tester (nim,nama,alamat) VALUES ('${nim}', '${nama}', '${alamat}')`;

  db.query(sql, (error, result, fields) => {
    try {
      if (error) throw error;
      if (result.affectedRows > 0) {
        let data = { isSucces: "true" };
        response(200, data, message, res);
      }
    } catch (error) {
      response(500, error.sqlMessage, "Error save data", res);
    }
  });
});

// Memperbarui data
app.put("/mahasiswa/update", (req, res) => {
  const { id, nama, alamat } = req.body;
  const message = "update data";
  const sql = `UPDATE tester SET nama='${nama}', alamat='${alamat}' WHERE id='${id}'`;

  db.query(sql, (error, result) => {
    try {
      if (error) throw error;
      if (result.affectedRows > 0) {
        const data = { isSucces: true };
        response(200, data, message, res);
      } else {
        response(404, "User Not Found", "Error update data", res);
      }
    } catch (error) {
      response(500, error.sqlMessage, "Error update data", res);
    }
  });
});

app.listen(3000, () => console.log("Server berjalan"));

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
      if (result.length != 0) {
        response(200, result, message, res);
        console.log(result);
      } else {
        response(200, "", "User Not Found", res);
      }
    } catch (error) {
      response(500, error.sqlMessage, "Error", res);
    }
  });
});

// Menambahkan data mahasiswa
app.post("/mahasiswa/store", (req, res) => {
  const { nim, nama, alamat } = req.body;
  const sql = `INSERT INTO tester (nim,nama,alamat) VALUES ('${nim}', '${nama}', '${alamat}')`;

  db.query(sql, (error, result, fields) => {
    try {
      if (error) throw error;
      if (result.affectedRows > 0) {
        let data = { isSucces: "true" };
        response(200, data, "Succes Insert data", res);
      }
    } catch (error) {
      response(500, "", error.sqlMessage, res);
    }
  });
});

// Memperbarui data
app.put("/mahasiswa/update", (req, res) => {
  const { id, nama, alamat } = req.body;
  const sql = `UPDATE tester SET nama='${nama}', alamat='${alamat}' WHERE id='${id}'`;

  db.query(sql, (error, result) => {
    try {
      if (error) throw error;
      if (result.affectedRows > 0) {
        const data = { isSucces: true };
        response(200, data, "Succes update data", res);
      } else {
        response(404, "", "User Not Found", res);
      }
    } catch (error) {
      response(500, "", error.sqlMessage, res);
    }
  });
});

app.delete("/mahasiswa/delete", (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM tester WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    try {
      if (error) throw error;
      if (result.affectedRows > 0) {
        response(200, "", "Succes delete data", res);
      } else {
        response(403, "", "user not found", res);
      }
    } catch (error) {
      response(500, "", sqlMessage, res);
    }
  });
});

app.listen(3000, () => console.log("Server berjalan"));

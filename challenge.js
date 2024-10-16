import express from "express";
import bodyParser from "body-parser";
import { add, getData } from "./controller/fungsi.mjs";

const app = express();

// Menggunakan bodyParser untuk memparsing inputan dari luar
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  res.send(req.body);
});

app.post("/add", async (req, res) => {
  const hasil = await add(req.body);
  res.send(hasil);
});

app.get("/show", async (req, res) => {
  const result = await getData();
  res.send(result);
});

app.listen(3306, () => console.log("Server berjalan"));

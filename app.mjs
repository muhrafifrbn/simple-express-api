import express from "express";
import bodyParser from "body-parser";

const app = express();

// Menggunakan bodyParser untuk memparsing inputan dari luar
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  res.send(req.body);
});

app.listen(3306, () => console.log("Server berjalan"));

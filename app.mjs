import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("Halaman About");
});

app.listen(3306, () => console.log("Server berjalan"));

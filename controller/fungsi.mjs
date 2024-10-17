import { writeFile, readFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import db from "../connection.mjs";

if (!existsSync("./data")) {
  mkdirSync("./data");
}

async function add(data) {
  try {
    const result = JSON.parse(await loadData());
    result.push(data);
    await writeFile("./data/user.json", JSON.stringify(result, null, 2));
    return "Berhasil Ditambahkan";
  } catch (error) {
    console.log(error);
    return "Gagal Ditambahkan!";
  }
}

async function getData() {
  try {
    let result = await readFile("./data/user.json", { encoding: "utf-8" });
    return result;
  } catch (error) {
    console.log(error);
    return "Terjadi error";
  }
}

function getDataFromDatabase({ query, res, message }) {
  db.query(query, (error, result) => {
    response(200, result, message, res);
  });
}

async function loadData() {
  return await readFile("./data/user.json", { encoding: "utf-8" });
}

const response = (statusResponse, result, message, res) => {
  res.status(statusResponse).json({
    message,
    statusResponse,
    payload: {
      data: result,
    },
    paggination: {
      prev: "",
      next: "",
      max: "",
    },
  });
};

export { add, getData, loadData, response, getDataFromDatabase };

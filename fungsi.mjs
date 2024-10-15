import { writeFile, readFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

if (!existsSync("./data")) {
  mkdirSync("./data");
}

async function add(data) {
  try {
    const result = await loadData();
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

async function loadData() {
  return await readFile("./data/user.json", { encoding: "utf-8" });
}

export { add, getData, loadData };

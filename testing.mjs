import test from "node:test";
import assert from "node:assert";
import { add, loadData } from "./fungsi.mjs";

test("testing function loadData", async () => {
  let data = JSON.parse(await loadData());
  assert.deepStrictEqual(data, []);
});

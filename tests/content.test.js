import test from "node:test";
import assert from "node:assert/strict";
import {
  games,
  vocabulary,
  categories,
  conversations,
  safetyQuestions,
  schoolQuestions,
  accountQuestions,
  sentences,
  emailFields,
} from "../playground/content.js";
import { readProgress, saveProgress } from "../playground/storage.js";
import { hasLine } from "../playground/games/loteria.js";
test("all eight activities and three vocabulary collections have unique, bilingual content", () => {
  assert.equal(games.length, 8);
  assert.equal(new Set(games.map((g) => g.id)).size, 8);
  assert.equal(vocabulary.length, 18);
  assert.equal(new Set(vocabulary.map((v) => v.id)).size, 18);
  for (const group of Object.keys(categories))
    assert.equal(vocabulary.filter((v) => v.category === group).length, 6);
  for (const g of games)
    for (const field of ["subtitle", "description", "skill"])
      for (const lang of ["es", "en"]) assert.ok(g[field][lang].length > 3);
  for (const list of [
    conversations,
    safetyQuestions,
    schoolQuestions,
    accountQuestions,
  ])
    for (const q of list) {
      assert.ok(q.options[q.answer]);
      assert.ok(
        q.prompt &&
          q.translation &&
          q.why.es &&
          q.why.en &&
          q.hint.es &&
          q.hint.en,
      );
      for (const o of q.options) assert.ok(o.en && o.es);
    }
  assert.equal(sentences.length, 4);
  assert.equal(emailFields.length, 5);
});
test("completion data tolerates corrupt, blocked, and obsolete storage", () => {
  assert.deepEqual(readProgress({ getItem: () => "{broken" }), []);
  assert.deepEqual(
    readProgress({
      getItem: () =>
        JSON.stringify(["match", "match", "unknown", 42, null, "email"]),
    }),
    ["match", "email"],
  );
  assert.deepEqual(
    readProgress({
      getItem: () => {
        throw Error("blocked");
      },
    }),
    [],
  );
  assert.equal(
    saveProgress(["match"], {
      setItem: () => {
        throw Error("full");
      },
    }),
    false,
  );
});
test("lotería recognizes rows, columns, diagonals and does not accept incomplete lines", () => {
  for (const line of [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ])
    assert.ok(hasLine(new Set(line)));
  assert.equal(hasLine(new Set([0, 1, 3, 5])), false);
});

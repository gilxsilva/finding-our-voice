import { games } from "./content.js";
const key = "fov-playground-v1";
const valid = new Set(games.map((game) => game.id));
export function readProgress(storage) {
  try {
    const value = JSON.parse((storage ?? globalThis.localStorage).getItem(key));
    return Array.isArray(value)
      ? [...new Set(value.filter((id) => valid.has(id)))]
      : [];
  } catch {
    return [];
  }
}
export function saveProgress(ids, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(
      key,
      JSON.stringify(ids.filter((id) => valid.has(id))),
    );
    return true;
  } catch {
    return false;
  }
}
export function readLanguage() {
  try {
    return localStorage.getItem("fov-playground-lang") === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}
export function saveLanguage(lang) {
  try {
    localStorage.setItem("fov-playground-lang", lang);
  } catch {
    /* Session still works. */
  }
}

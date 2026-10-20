import { vocabulary, categories, bi } from "../content.js";
import { shuffle, feedbackHTML, icon } from "../ui.js";
export function createMatch(ctx) {
  let category = "supplies",
    words = [],
    order = [],
    matched = new Set(),
    selected = { es: null, en: null },
    feedback = null;
  function start() {
    words = vocabulary.filter((w) => w.category === category);
    order = shuffle(words);
    matched = new Set();
    selected = { es: null, en: null };
    feedback = null;
  }
  start();
  return {
    render() {
      return `<label class="field-label" for="category">${ctx.tr(bi("Elige tu mundo de palabras", "Choose your word world"))}</label><select id="category">${Object.entries(
        categories,
      )
        .map(
          ([id, label]) =>
            `<option value="${id}" ${category === id ? "selected" : ""}>${ctx.tr(label)}</option>`,
        )
        .join("")}</select>
      <div class="step-top"><h2 id="step-heading" tabindex="-1">${ctx.tr(bi("Dos idiomas. Una conexión.", "Two languages. One connection."))}</h2><span>${matched.size} / ${words.length}</span></div>
      <p>${ctx.tr(bi("Toca una palabra en español y su pareja en inglés, en cualquier orden. También puedes usar Tab y Enter.", "Choose a Spanish word and its English match, in either order. You can also use Tab and Enter."))}</p>
      <progress value="${matched.size}" max="${words.length}" aria-label="${ctx.tr(bi("Parejas encontradas", "Pairs found"))}"></progress>
      <div class="match-grid">${["es", "en"].map((side) => `<section aria-label="${side === "es" ? "Español" : "English"}"><h3 lang="${side}">${side === "es" ? "Español" : "English"}</h3>${(side === "es" ? words : order).map((w) => `<button id="${side}-${w.id}" data-action="match" data-side="${side}" data-word="${w.id}" lang="${side}" class="match-word ${selected[side] === w.id ? "selected" : ""} ${matched.has(w.id) ? "matched" : ""}" aria-pressed="${selected[side] === w.id}" ${matched.has(w.id) ? "disabled" : ""}>${icon(w.icon)}<span>${w[side]}</span>${matched.has(w.id) ? '<span aria-hidden="true">✓</span>' : ""}</button>`).join("")}</section>`).join("")}</div>
      ${feedbackHTML(feedback, ctx.tr)}${matched.size === words.length ? `<button id="finish" class="button primary" data-action="finish">${ctx.tr(bi("¡Todas conectadas! Terminar", "All connected! Finish"))} →</button>` : ""}`;
    },
    change(target) {
      if (target.id === "category") {
        category = target.value;
        start();
        ctx.render();
        ctx.announce(ctx.tr(categories[category]));
        ctx.focus("category");
      }
    },
    click(action, target) {
      if (action === "finish" && matched.size === words.length)
        return ctx.complete();
      if (action !== "match") return;
      const { side, word } = target.dataset;
      if (matched.has(word)) return;
      selected[side] = selected[side] === word ? null : word;
      if (selected.es && selected.en) {
        if (selected.es === selected.en) {
          const w = words.find((w) => w.id === word);
          matched.add(word);
          feedback = {
            tone: "success",
            text: bi(
              `${w.es} = ${w.en}. ¡Una conexión más!`,
              `${w.es} = ${w.en}. One more connection!`,
            ),
          };
          selected = { es: null, en: null };
          ctx.speak(w.en);
        } else {
          feedback = {
            tone: "retry",
            text: bi(
              "Aún no son pareja. Elige otra palabra; puedes cambiar cualquiera de las dos.",
              "These are not a pair yet. Choose another word; you can change either selection.",
            ),
          };
        }
      } else feedback = null;
      ctx.render();
      if (feedback) ctx.announce(ctx.tr(feedback.text));
      if (matched.size === words.length) ctx.focus("finish");
      else if (matched.has(word))
        ctx.focus(`es-${words.find((w) => !matched.has(w.id)).id}`);
    },
  };
}

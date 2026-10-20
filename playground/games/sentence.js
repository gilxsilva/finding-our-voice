import { sentences, bi } from "../content.js";
import { shuffle, english, feedbackHTML, audioButton } from "../ui.js";
export function createSentence(ctx) {
  let step = 0,
    tokens = [],
    selected = [],
    feedback = null,
    solved = false;
  function start() {
    tokens = shuffle(
      sentences[step].en.split(" ").map((text, id) => ({ text, id })),
    );
    selected = [];
    feedback = null;
    solved = false;
  }
  start();
  return {
    render() {
      const item = sentences[step];
      return `<div class="step-top"><span class="eyebrow">${ctx.tr(bi("Construye tu voz", "Build your voice"))}</span><span>${step + 1} / ${sentences.length}</span></div><progress max="${sentences.length}" value="${step + (solved ? 1 : 0)}" aria-label="${ctx.tr(bi("Avance", "Progress"))}"></progress>
      <h2 id="step-heading" tabindex="-1" lang="es">${item.es}</h2><p>${ctx.tr(bi("Elige las palabras en orden. Para quitar una, tócala en tu frase. No necesitas arrastrar.", "Choose the words in order. To remove one, select it in your sentence. No dragging needed."))}</p>
      <div class="sentence-tray" role="group" aria-label="${ctx.tr(bi("Tu frase: selecciona una palabra para quitarla", "Your sentence: select a word to remove it"))}">${
        selected.length
          ? selected
              .map((id) => {
                const token = tokens.find((t) => t.id === id);
                return `<button id="chosen-${id}" class="word-token" data-action="remove" data-index="${id}" ${solved ? "disabled" : ""} aria-label="${ctx.tr(bi("Quitar", "Remove"))} ${token.text}">${english(token.text)} <span aria-hidden="true">×</span></button>`;
              })
              .join("")
          : `<span class="muted">${ctx.tr(bi("Tu frase empieza aquí…", "Your sentence starts here…"))}</span>`
      }</div>
      <div class="word-bank" role="group" aria-label="${ctx.tr(bi("Palabras disponibles", "Available words"))}">${tokens.map((token) => `<button id="token-${token.id}" class="word-token" data-action="word" data-index="${token.id}" ${selected.includes(token.id) || solved ? "disabled" : ""}>${english(token.text)}</button>`).join("")}</div>
      <div class="actions"><button id="check-sentence" class="button primary" data-action="check" ${solved || selected.length !== tokens.length ? "disabled" : ""}>${ctx.tr(bi("Comprobar frase", "Check sentence"))}</button><button id="clear-sentence" class="button subtle" data-action="clear" ${solved || !selected.length ? "disabled" : ""}>${ctx.tr(bi("Empezar de nuevo", "Start over"))}</button></div>
      ${feedbackHTML(feedback, ctx.tr)}${solved ? `${audioButton(item.en, ctx.tr)} <button id="next" class="button primary" data-action="next">${ctx.tr(step === sentences.length - 1 ? bi("Terminar actividad", "Finish activity") : bi("Siguiente frase", "Next sentence"))} →</button>` : ""}`;
    },
    click(action, target) {
      const id = Number(target.dataset.index);
      if (!solved && action === "word" && !selected.includes(id)) {
        selected.push(id);
        feedback = null;
        ctx.render();
        ctx.announce(
          selected.map((i) => tokens.find((t) => t.id === i).text).join(" "),
        );
        ctx.focus(
          selected.length === tokens.length
            ? "check-sentence"
            : `token-${tokens.find((t) => !selected.includes(t.id)).id}`,
        );
      }
      if (!solved && action === "remove") {
        selected = selected.filter((i) => i !== id);
        feedback = null;
        ctx.render();
        ctx.focus(`token-${id}`);
      }
      if (!solved && action === "clear") {
        selected = [];
        feedback = null;
        ctx.render();
        ctx.focus(`token-${tokens[0].id}`);
      }
      if (!solved && action === "check" && selected.length === tokens.length) {
        solved =
          selected.map((i) => tokens.find((t) => t.id === i).text).join(" ") ===
          sentences[step].en;
        feedback = {
          tone: solved ? "success" : "retry",
          text: solved
            ? sentences[step].note
            : bi(
                "Revisa el inicio y el final. La mayúscula va primero y el signo de puntuación al final. Toca palabras de tu frase para cambiarlas de lugar.",
                "Check the beginning and end. The capital letter goes first and punctuation goes last. Select words in your sentence to move them.",
              ),
        };
        ctx.render();
        ctx.announce(ctx.tr(feedback.text));
        if (solved) ctx.focus("next");
      }
      if (action === "next" && solved) {
        if (step === sentences.length - 1) return ctx.complete();
        step++;
        start();
        ctx.render();
        ctx.focus("step-heading");
      }
    },
  };
}

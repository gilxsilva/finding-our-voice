import { vocabulary, bi } from "../content.js";
import { shuffle, icon, english, feedbackHTML, audioButton } from "../ui.js";
export const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export function hasLine(marked) {
  return winningLines.some((line) => line.every((index) => marked.has(index)));
}
export function createLoteria(ctx) {
  const board = shuffle(vocabulary).slice(0, 9),
    calls = shuffle(board);
  let call = -1,
    marked = new Set(),
    feedback = null,
    classroom = false;
  return {
    render() {
      const current = calls[call],
        won = hasLine(marked),
        ready =
          current && marked.has(board.findIndex((w) => w.id === current.id));
      return `<div class="step-top"><h2 id="step-heading" tabindex="-1">${ctx.tr(bi("Una línea. Muchas palabras.", "One line. So many words."))}</h2><span>${marked.size} / 9</span></div>
      <label class="check-label"><input id="classroom" type="checkbox" ${classroom ? "checked" : ""}>${ctx.tr(bi("Modo para la clase", "Classroom mode"))}</label>
      <p>${ctx.tr(classroom ? bi("Compartan esta pantalla. Una persona canta la palabra; el grupo encuentra la tarjeta y explica su significado. Sin reloj ni competencia.", "Share this screen. One person calls the word; the group finds the card and explains its meaning. No timer or competition.") : bi("Saca una palabra y marca su tarjeta. Completa una fila, columna o diagonal para cantar ¡Lotería!", "Draw a word and mark its card. Complete a row, column, or diagonal to call ¡Lotería!"))}</p>
      <div class="loteria-call ${classroom ? "classroom" : ""}"><span class="eyebrow">${ctx.tr(bi("La palabra es…", "The word is…"))}</span>${current ? `<p class="called-word" lang="en">${current.en}</p>${audioButton(current.en, ctx.tr)}` : `<p>${ctx.tr(bi("¿Listos para empezar?", "Ready to begin?"))}</p>`}
      <button id="draw" class="button primary" data-action="draw" ${won || (current && !ready) ? "disabled" : ""}>${ctx.tr(call < 0 ? bi("Sacar una palabra", "Draw a word") : bi("Siguiente palabra", "Next word"))} →</button></div>
      <div class="loteria-board ${classroom ? "classroom" : ""}" role="group" aria-label="${ctx.tr(bi("Tablero de lotería", "Lotería board"))}">${board.map((w, i) => `<button id="card-${i}" data-action="mark" data-index="${i}" class="loteria-card ${marked.has(i) ? "marked" : ""}" aria-pressed="${marked.has(i)}" ${won || marked.has(i) ? "disabled" : ""}><span class="card-no" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${icon(w.icon)}<strong lang="es">${w.es}</strong>${marked.has(i) ? `<span lang="en">✓ ${w.en}</span>` : ""}</button>`).join("")}</div>
      ${feedbackHTML(feedback, ctx.tr)}${won ? `<button id="finish" class="button primary" data-action="finish">¡Lotería! ${ctx.tr(bi("Terminar", "Finish"))} →</button>` : ""}`;
    },
    change(target) {
      if (target.id === "classroom") {
        classroom = target.checked;
        ctx.render();
        ctx.focus("classroom");
      }
    },
    click(action, target) {
      if (action === "finish" && hasLine(marked)) return ctx.complete();
      const current = calls[call];
      if (
        action === "draw" &&
        !hasLine(marked) &&
        (!current || marked.has(board.findIndex((w) => w.id === current.id)))
      ) {
        call++;
        feedback = null;
        ctx.render();
        ctx.announce(calls[call].en);
        ctx.speak(calls[call].en);
        ctx.focus(
          `card-${board.findIndex((w) => !marked.has(board.indexOf(w)))}`,
        );
      }
      if (action === "mark" && !hasLine(marked)) {
        const i = Number(target.dataset.index);
        if (marked.has(i)) return;
        if (!current)
          feedback = {
            tone: "retry",
            text: bi("Primero saca una palabra.", "Draw a word first."),
          };
        else if (board[i].id === current.id) {
          marked.add(i);
          feedback = {
            tone: "success",
            text: hasLine(marked)
              ? bi(
                  "¡Lotería! Completaste una línea. Lee tus palabras en voz alta si quieres.",
                  "¡Lotería! You completed a line. Read your words aloud if you like.",
                )
              : bi(
                  `${current.en} significa ${current.es}. ¡Tarjeta encontrada!`,
                  `${current.en} means ${current.es}. Card found!`,
                ),
          };
        } else
          feedback = {
            tone: "retry",
            text: bi(
              `Busca “${current.en}”. Puedes escucharla otra vez. No pierdes ninguna tarjeta.`,
              `Look for “${current.en}”. You can listen again. You do not lose any cards.`,
            ),
          };
        ctx.render();
        ctx.announce(ctx.tr(feedback.text));
        if (hasLine(marked)) ctx.focus("finish");
        else if (marked.has(i)) ctx.focus("draw");
      }
    },
  };
}

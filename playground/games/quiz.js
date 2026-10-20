import {
  conversations,
  safetyQuestions,
  accountQuestions,
  schoolQuestions,
  bi,
} from "../content.js";
import {
  bilingual,
  english,
  feedbackHTML,
  audioButton,
  scheduleHTML,
} from "../ui.js";
export function createQuiz(id, ctx) {
  const questions = {
    conversation: conversations,
    safety: safetyQuestions,
    account: accountQuestions,
    school: schoolQuestions,
  }[id];
  let step = 0,
    feedback = null,
    solved = false,
    selected = null;
  return {
    render() {
      const q = questions[step];
      return `<div class="step-top"><span class="eyebrow">${ctx.tr(q.scene)}</span><span>${step + 1} / ${questions.length}</span></div><progress max="${questions.length}" value="${step + (solved ? 1 : 0)}" aria-label="${ctx.tr(bi("Avance de la actividad", "Activity progress"))}"></progress>
      ${id === "account" ? `<p class="notice">${ctx.tr(bi("SIMULACIÓN · Sin registro, sin datos personales ni contraseñas reales.", "SIMULATION · No registration, personal details, or real passwords."))}</p>` : ""}
      <h2 id="step-heading" tabindex="-1">${ctx.tr(q.context)}</h2>${q.document === "schedule" ? scheduleHTML(ctx.tr) : ""}
      <div class="prompt"><p lang="en">${q.prompt}</p>${ctx.support() ? `<p class="translation" lang="es">${q.translation}</p>` : ""}${audioButton(q.prompt, ctx.tr)}</div>
      <fieldset class="answers"><legend>${ctx.tr(bi("¿Qué eliges?", "What do you choose?"))}</legend>${q.options.map((o, i) => `<button type="button" id="answer-${i}" data-action="answer" data-index="${i}" class="answer ${selected === i ? (solved ? "correct" : "incorrect") : ""}" ${solved ? "disabled" : ""}><span class="answer-number" aria-hidden="true">${String.fromCharCode(65 + i)}</span><span>${bilingual(o, ctx)}</span>${selected === i ? `<span>${ctx.tr(solved ? bi("✓ Correcto", "✓ Correct") : bi("↻ Reintenta", "↻ Try again"))}</span>` : ""}</button>`).join("")}</fieldset>
      ${feedbackHTML(feedback, ctx.tr)}${solved ? `<button id="next" class="button primary" data-action="next">${ctx.tr(step === questions.length - 1 ? bi("Terminar actividad", "Finish activity") : bi("Continuar", "Continue"))} →</button>` : ""}`;
    },
    click(action, target) {
      if (action === "answer" && !solved) {
        selected = Number(target.dataset.index);
        solved = selected === questions[step].answer;
        feedback = {
          tone: solved ? "success" : "retry",
          text: solved ? questions[step].why : questions[step].hint,
        };
        ctx.render();
        ctx.announce(ctx.tr(feedback.text));
        if (solved) ctx.focus("next");
      }
      if (action === "next" && solved) {
        if (step === questions.length - 1) return ctx.complete();
        step++;
        solved = false;
        selected = null;
        feedback = null;
        ctx.render();
        ctx.focus("step-heading");
      }
    },
  };
}

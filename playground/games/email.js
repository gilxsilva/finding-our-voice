import { emailFields, bi } from "../content.js";
import { escapeHTML, english, feedbackHTML, audioButton } from "../ui.js";
export function validateEmail(values) {
  return emailFields.filter(
    (field) =>
      Number(values[field.id]) !== field.answer || values[field.id] === "",
  );
}
export function createEmail(ctx) {
  const values = Object.fromEntries(emailFields.map((f) => [f.id, ""]));
  let checked = false,
    solved = false;
  const value = (id) => {
    const f = emailFields.find((f) => f.id === id);
    return values[id] === "" ? "…" : f.options[Number(values[id])];
  };
  return {
    render() {
      const errors = checked ? validateEmail(values) : [];
      return `<div class="step-top"><span class="eyebrow">${ctx.tr(bi("De Alex para Ms. Rivera", "From Alex to Ms. Rivera"))}</span><span>${emailFields.filter((f) => values[f.id] !== "").length} / 5</span></div>
      <h2 id="step-heading" tabindex="-1">${ctx.tr(bi("Pide ayuda con tu tarea.", "Ask for help with your homework."))}</h2><p class="notice">${ctx.tr(bi("CORREO DE PRÁCTICA · Usa las opciones para armar tu mensaje en inglés. Nada se envía. No introduzcas datos reales.", "PRACTICE EMAIL · Use the choices to compose your message in English. Nothing is sent. Do not enter real details."))}</p>
      <div class="email-layout"><form id="email-form" novalidate><div class="composer-fields">${emailFields.map((field) => `<div class="field"><label for="email-${field.id}">${ctx.tr(field.label)}</label><p id="hint-${field.id}" class="field-hint">${ctx.tr(field.hint)}</p><select id="email-${field.id}" name="${field.id}" aria-describedby="hint-${field.id}${errors.includes(field) ? ` error-${field.id}` : ""}" ${checked ? `aria-invalid="${errors.includes(field)}"` : ""} ${solved ? "disabled" : ""}><option value="">${ctx.tr(bi("Elige una opción…", "Choose an option…"))}</option>${field.options.map((opt, i) => `<option value="${i}" ${values[field.id] === String(i) ? "selected" : ""} lang="en">${escapeHTML(opt)}</option>`).join("")}</select>${errors.includes(field) ? `<p id="error-${field.id}" class="field-error">↻ ${ctx.tr(field.why)}</p>` : ""}</div>`).join("")}</div>${!solved ? `<button id="review-email" type="submit" class="button primary">${ctx.tr(bi("Revisar mi correo de práctica", "Review my practice email"))}</button>` : ""}</form>
      <aside class="email-preview" aria-label="${ctx.tr(bi("Vista previa de tu correo", "Email preview"))}"><div class="preview-bar">${ctx.tr(bi("Vista previa · No se enviará", "Preview · Will not be sent"))}</div><div class="preview-body"><p><strong>${ctx.tr(bi("Para", "To"))}:</strong> ${english(value("recipient"))}</p><p><strong>${ctx.tr(bi("Asunto", "Subject"))}:</strong> ${english(value("subject"))}</p><hr><p>${english(value("greeting"))}</p><p>${english(value("message"))}</p><p>${english(value("closing"))}</p></div></aside></div>
      ${checked ? feedbackHTML({ tone: solved ? "success" : "retry", text: solved ? bi("Tu correo tiene destinatario, asunto claro, saludo, petición concreta y despedida. En la vida real, revisa la dirección antes de enviar.", "Your email has a recipient, clear subject, greeting, specific request, and closing. In real life, check the address before sending.") : bi(`Revisa ${errors.length} ${errors.length === 1 ? "parte" : "partes"} de tu correo. Las pistas te muestran cómo mejorarlo.`, `Review ${errors.length} ${errors.length === 1 ? "part" : "parts"} of your email. The hints show how to improve it.`) }, ctx.tr) : ""}
      ${solved ? `${audioButton("Hello Ms. Rivera. I need help with my homework. Could you help me after class? Thank you, Alex.", ctx.tr)} <button id="finish" class="button primary" data-action="finish">${ctx.tr(bi("Terminar actividad", "Finish activity"))} →</button>` : ""}`;
    },
    change(target) {
      if (target.form?.id === "email-form") {
        values[target.name] = target.value;
        checked = false;
        ctx.render();
        ctx.focus(target.id);
      }
    },
    submit() {
      checked = true;
      const errors = validateEmail(values);
      solved = !errors.length;
      ctx.render();
      ctx.announce(
        ctx.tr(
          solved
            ? bi(
                "Tu correo está listo. ¡Buen trabajo!",
                "Your email is ready. Well done!",
              )
            : bi(
                "Revisa las partes señaladas con las pistas.",
                "Review the marked parts using the hints.",
              ),
        ),
      );
      ctx.focus(solved ? "finish" : `email-${errors[0].id}`);
    },
    click(action) {
      if (action === "finish" && solved) ctx.complete();
    },
  };
}

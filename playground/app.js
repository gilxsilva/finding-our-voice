import { games, bi } from "./content.js";
import { icon } from "./ui.js";
import {
  readProgress,
  saveProgress,
  readLanguage,
  saveLanguage,
} from "./storage.js";
import { createMatch } from "./games/match.js";
import { createLoteria } from "./games/loteria.js";
import { createSentence } from "./games/sentence.js";
import { createEmail } from "./games/email.js";
import { createQuiz } from "./games/quiz.js";
let lang = readLanguage(),
  support = true,
  audio = false,
  completed = [],
  storageAvailable = true;
// Accessing localStorage itself can throw in restricted browsers.
try {
  completed = readProgress();
  storageAvailable = saveProgress(completed);
} catch {
  storageAvailable = false;
}
let filter = "all",
  resetPending = false,
  route = "",
  done = false;
const sessions = new Map();
const main = document.querySelector("main");
const tr = (item) => (typeof item === "string" ? item : item[lang]);
const focus = (id) => document.getElementById(id)?.focus();
function announce(message) {
  const node = document.getElementById("announcer");
  node.textContent = "";
  requestAnimationFrame(() => {
    node.textContent = message;
  });
}
function stopAudio() {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* Audio is optional. */
  }
}
function speak(text, explicit = false) {
  if (!audio && !explicit) return;
  if (
    !("speechSynthesis" in window) ||
    !("SpeechSynthesisUtterance" in window)
  ) {
    announce(
      tr(
        bi(
          "El audio no está disponible. Puedes leer todas las palabras en pantalla.",
          "Audio is unavailable. You can read all the words on screen.",
        ),
      ),
    );
    return;
  }
  try {
    stopAudio();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.onerror = (event) => {
      if (["canceled", "interrupted"].includes(event.error)) return;
      announce(
        tr(
          bi(
            "No se pudo reproducir el audio. Lee el texto en pantalla.",
            "Audio could not play. Read the text on screen.",
          ),
        ),
      );
    };
    speechSynthesis.speak(utterance);
  } catch {
    announce(
      tr(
        bi(
          "Puedes seguir jugando con el texto en pantalla.",
          "You can keep playing using the text on screen.",
        ),
      ),
    );
  }
}
function complete() {
  controller(route).done = true;
  if (!completed.includes(route)) completed.push(route);
  storageAvailable = saveProgress(completed);
  done = true;
  stopAudio();
  render();
  focus("completion-heading");
}
function context() {
  return {
    tr,
    render,
    focus,
    announce,
    complete,
    speak,
    support: () => support,
  };
}
function controller(id) {
  if (!sessions.has(id)) {
    const ctx = context();
    sessions.set(
      id,
      id === "match"
        ? createMatch(ctx)
        : id === "loteria"
          ? createLoteria(ctx)
          : id === "sentence"
            ? createSentence(ctx)
            : id === "email"
              ? createEmail(ctx)
              : createQuiz(id, ctx),
    );
  }
  return sessions.get(id);
}
function header() {
  return `<div class="header-inner"><a class="brand" href="index.html" aria-label="Finding Our Voice"><span class="brand-mark">FOV<span aria-hidden="true">✳</span></span><span class="brand-name">FINDING<br>OUR VOICE</span></a><nav aria-label="${tr(bi("Navegación principal", "Main navigation"))}"><a class="site-link" href="index.html#about">${tr(bi("Nuestra historia", "Our story"))}</a><a class="playground-link" href="#">Playground</a></nav><div class="header-tools"><button id="audio-toggle" class="tool-button" aria-pressed="${audio}" title="${tr(bi("Audio automático al jugar", "Automatic audio while playing"))}">${icon("sound")}<span>${tr(audio ? bi("Audio sí", "Audio on") : bi("Audio no", "Audio off"))}</span></button><button id="language" class="language-button" aria-label="${lang === "es" ? "Switch interface to English" : "Cambiar la interfaz a español"}"><span class="${lang === "es" ? "active" : ""}" lang="es">ES</span><span aria-hidden="true">/</span><span class="${lang === "en" ? "active" : ""}" lang="en">EN</span></button></div></div>`;
}
function footer() {
  return `<div class="footer-inner"><p><strong>Finding Our Voice</strong><br>${tr(bi("Hecho para encontrar tu voz. Y usarla.", "Made to help you find your voice. And use it."))}</p><a href="index.html#team">${tr(bi("Un proyecto con raíces en Mission High School, San Francisco", "Rooted in Mission High School, San Francisco"))} ↗</a><p class="privacy-note">${tr(bi("Sin cuentas. Sin anuncios. Sin datos personales.", "No accounts. No ads. No personal data."))}</p></div>`;
}
const groups = {
  all: bi("Todas las actividades", "All activities"),
  words: bi("Palabras y frases", "Words & sentences"),
  school: bi("Mi vida escolar", "My school life"),
  digital: bi("Mi mundo digital", "My digital world"),
};
function heroArt() {
  return `<svg class="hero-art" viewBox="0 0 460 300" fill="none" aria-hidden="true"><path d="M25 254c54-37 118-32 178-10s135 43 224-16" stroke="#3D2B1A" stroke-width="2" stroke-dasharray="5 8"/><g transform="rotate(-9 150 160)"><rect x="50" y="58" width="190" height="200" rx="12" fill="#fffaf0" stroke="#3D2B1A" stroke-width="3"/><path d="M75 62v193" stroke="#c07d52" stroke-width="2"/><path d="M62 90h22m-22 30h22m-22 30h22m-22 30h22m-22 30h22" stroke="#3D2B1A" stroke-width="3" stroke-linecap="round"/><path d="M106 111h94m-94 21h64m-64 55h94m-94 21h80" stroke="#dccba8" stroke-width="3"/><text x="105" y="92" font-size="18" font-weight="700" fill="#3D2B1A">MY NEXT CHAPTER</text><path d="m126 152 12 12 26-27" stroke="#4e6b4c" stroke-width="5" stroke-linecap="round"/></g><g transform="rotate(7 317 100)"><path d="M231 25h183v108h-89l-33 31v-31h-61V25Z" fill="#3D2B1A"/><text x="253" y="72" font-size="24" font-weight="700" fill="#F5C132">Your voice</text><text x="253" y="103" font-size="24" font-weight="700" fill="#fffaf0">belongs here.</text></g><g transform="rotate(13 323 221)"><rect x="253" y="180" width="134" height="79" rx="8" fill="#b9d7c4" stroke="#3D2B1A" stroke-width="3"/><path d="m254 182 66 44 65-44m-131 75 47-45m84 45-47-45" stroke="#3D2B1A" stroke-width="2"/></g><path d="m39 15 4 13 14 1-11 9 3 14-11-8-12 8 4-14-11-9 14-1 6-13Zm381 141 3 10 11 1-9 7 3 11-9-6-9 6 3-11-9-7 11-1 5-10Z" fill="#fffaf0" stroke="#3D2B1A" stroke-width="2"/><path d="m200 21 4 15m-12-6 18-3" stroke="#3D2B1A" stroke-width="3" stroke-linecap="round"/></svg>`;
}
function dashboard() {
  const count = completed.length;
  return `<section class="dashboard-hero"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow">FINDING OUR VOICE PLAYGROUND</p><h1 id="page-heading" tabindex="-1">${tr(bi("Tu idioma es tu raíz.", "Your language is your root."))}<br><span>${tr(bi("Tu voz, el siguiente paso.", "Your voice is your next step."))}</span></h1><p>${tr(bi("Un espacio para practicar inglés, probar cosas nuevas y sentirte más en casa. A tu ritmo. A tu manera.", "A space to practice English, try something new, and feel more at home. Your pace. Your way."))}</p><a class="button primary" href="#match">${tr(count ? bi("Seguir practicando", "Keep practicing") : bi("Vamos a jugar", "Let’s play"))} ${icon("arrow")}</a><span class="hero-note">${tr(bi("8 actividades · Cero presión", "8 activities · Zero pressure"))}</span></div>${heroArt()}</div></section>
  <div class="dashboard-body"><section class="journey" aria-labelledby="journey-heading"><div class="journey-icon">${icon("star")}</div><div class="journey-text"><h2 id="journey-heading">${tr(count === 8 ? bi("¡Mira todo lo que lograste!", "Look at everything you did!") : bi("Cada intento cuenta.", "Every try counts."))}</h2><p>${tr(bi("Tu progreso se guarda solo en este navegador. Puedes repetir todo.", "Your progress is saved only in this browser. You can replay everything."))}</p></div><div class="journey-progress"><span>${count} / 8 <span>${tr(bi("completadas", "completed"))}</span></span><progress max="8" value="${count}" aria-label="${tr(bi("Actividades completadas", "Completed activities"))}"></progress></div></section>
  ${!storageAvailable ? `<p class="notice">${tr(bi("El guardado no está disponible en este navegador. Tu progreso dura esta sesión.", "Saving is unavailable in this browser. Progress lasts for this session."))}</p>` : ""}
  <section aria-labelledby="activities-heading"><div class="section-heading"><div><p class="eyebrow">${tr(bi("UN POCO DE PRÁCTICA. MUCHAS POSIBILIDADES.", "A LITTLE PRACTICE. A LOT OF POSSIBILITY."))}</p><h2 id="activities-heading">${tr(bi("¿Qué quieres explorar hoy?", "What will you explore today?"))}</h2></div><span class="activity-count">${tr(bi("Pequeños retos para tu mundo real", "Small challenges for your real world"))}</span></div>
  <div class="filters" role="group" aria-label="${tr(bi("Filtrar actividades", "Filter activities"))}">${Object.entries(
    groups,
  )
    .map(
      ([key, label]) =>
        `<button id="filter-${key}" data-filter="${key}" aria-pressed="${filter === key}" class="filter ${filter === key ? "active" : ""}">${tr(label)}</button>`,
    )
    .join("")}</div>
  <div class="activity-grid">${games
    .filter((g) => filter === "all" || g.group === filter)
    .map(
      (g) =>
        `<a class="activity-card ${g.color}" href="#${g.id}" aria-labelledby="title-${g.id} subtitle-${g.id}"><div class="card-top"><span class="activity-icon">${icon(g.icon)}</span><span class="card-meta">${completed.includes(g.id) ? `<span class="completed-tag">✓ ${tr(bi("Completada", "Completed"))}</span>` : `${g.time} min`}</span></div><span class="card-skill">${tr(g.skill)}</span><h3 id="title-${g.id}" lang="${g.id === "loteria" ? "es" : "en"}">${g.name}</h3><p id="subtitle-${g.id}" class="card-subtitle">${tr(g.subtitle)}</p><p class="card-description">${tr(g.description)}</p><span class="card-bottom">${tr(completed.includes(g.id) ? bi("Volver a jugar", "Play again") : bi("Explorar actividad", "Explore activity"))}<span class="arrow-circle">${icon("arrow")}</span></span></a>`,
    )
    .join("")}</div></section>
  <aside class="reassurance"><span>${icon("people")}</span><div><h2>${tr(bi("Aquí, equivocarse también es aprender.", "Here, mistakes are part of learning."))}</h2><p>${tr(bi("No hay calificaciones ni cronómetro. Usa las pistas, cambia de idioma y vuelve a intentar las veces que quieras. Tu español también es una fortaleza.", "No grades or timers. Use the hints, switch languages, and try as often as you like. Your Spanish is a strength, too."))}</p></div></aside>
  <section class="teacher-note"><div><h2>${tr(bi("¿Aprendemos en grupo?", "Learning together?"))}</h2><p>${tr(bi("Prueben el modo para la clase de Lotería. Compartan la pantalla, lean las palabras y túrnense para explicar sus respuestas.", "Try Lotería’s classroom mode. Share the screen, read the words, and take turns explaining your answers."))}</p></div><a class="button secondary" href="#loteria">${tr(bi("Abrir Lotería", "Open Lotería"))} →</a></section>
  <div class="reset-row">${resetPending ? `<p>${tr(bi("¿Borrar las marcas de actividades completadas en este navegador?", "Clear completed activity marks in this browser?"))}</p><button id="confirm-reset" class="button subtle">${tr(bi("Sí, borrar progreso", "Yes, clear progress"))}</button><button id="cancel-reset" class="button secondary">${tr(bi("Cancelar", "Cancel"))}</button>` : `<button id="reset-progress" class="text-button">${tr(bi("Reiniciar mi progreso", "Reset my progress"))}</button>`}</div></div>`;
}
function resources(id) {
  if (!["safety", "account"].includes(id)) return "";
  return `<aside class="resource-note"><strong>${tr(bi("Para tu vida digital real", "For your real digital life"))}</strong><p>${tr(bi("Las instrucciones cambian. Consulta la guía oficial y pide apoyo a una persona de confianza.", "Instructions change. Check the official guidance and ask someone you trust for support."))}</p><a href="${id === "account" ? "https://consumer.ftc.gov/articles/creating-strong-passwords-and-other-ways-protect-your-accounts" : "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams"}" target="_blank" rel="noopener noreferrer">${tr(id === "account" ? bi("FTC: cómo proteger tus cuentas (en inglés, nueva pestaña)", "FTC: protecting your accounts (opens a new tab)") : bi("FTC: cómo reconocer el phishing (en inglés, nueva pestaña)", "FTC: recognizing phishing (opens a new tab)"))} ↗</a></aside>`;
}
function gamePage(g) {
  return `<div class="game-container"><a class="back-link" href="#">← ${tr(bi("Todas las actividades", "All activities"))}</a><div class="game-title"><span class="activity-icon ${g.color}">${icon(g.icon)}</span><div><p class="eyebrow">${tr(g.skill)} · ${g.time} min</p><h1 id="page-heading" tabindex="-1" lang="${g.id === "loteria" ? "es" : "en"}">${g.name}</h1></div></div>
  <div class="game-toolbar"><span>${tr(bi("Sin prisa. Puedes volver a intentar.", "Take your time. You can try again."))}</span>${["conversation", "school", "safety", "account"].includes(g.id) ? `<button id="support" class="button subtle" aria-pressed="${support}">${tr(support ? bi("Apoyo en español: sí", "Spanish support: on") : bi("Apoyo en español: no", "Spanish support: off"))}</button>` : ""}</div>
  <section class="game-panel">${done ? completion(g) : controller(g.id).render()}</section>${resources(g.id)}<p class="session-note">${tr(bi("Puedes volver al tablero sin perder este intento. Al recargar, el intento empieza de nuevo.", "You can return to the dashboard without losing this attempt. Reloading starts the attempt over."))}</p></div>`;
}
function completion(g) {
  const next = games.find((game) => !completed.includes(game.id));
  return `<div class="completion"><span class="completion-star">${icon("star")}</span><p class="eyebrow">${tr(bi("UN PASO MÁS. UNA VOZ MÁS FUERTE.", "ONE MORE STEP. ONE STRONGER VOICE."))}</p><h2 id="completion-heading" tabindex="-1">${tr(bi("¡Lo lograste!", "You did it!"))}</h2><p>${tr(bi(`Completaste ${g.name}. Cada palabra y cada decisión cuentan.`, `You completed ${g.name}. Every word and every decision counts.`))}</p><div class="completion-stat">${completed.length} / 8 ${tr(bi("actividades completadas", "activities completed"))}</div>${!storageAvailable ? `<p>${tr(bi("No se pudo guardar. Tu progreso sigue disponible durante esta sesión.", "Saving failed. Your progress is still available during this session."))}</p>` : ""}<div class="actions"><a class="button primary" href="${next ? "#" + next.id : "#"}">${tr(next ? bi("Explorar otra actividad", "Explore another activity") : bi("Ver todos mis logros", "See all my progress"))} →</a><button id="replay" class="button secondary">${tr(bi("Volver a jugar", "Play again"))}</button></div><a class="back-link" href="#">${tr(bi("Volver al Playground", "Back to Playground"))}</a></div>`;
}
function render() {
  const active = document.activeElement?.id;
  document.documentElement.lang = lang;
  document.getElementById("header").innerHTML = header();
  document.getElementById("footer").innerHTML = footer();
  const g = games.find((g) => g.id === route);
  main.innerHTML = g ? gamePage(g) : dashboard();
  document.title = `${g ? g.name + " · " : ""}Playground · Finding Our Voice`;
  if (active) focus(active);
}
function readRoute() {
  const id = location.hash.slice(1);
  return games.some((g) => g.id === id) ? id : "";
}
function navigate() {
  stopAudio();
  route = readRoute();
  done = Boolean(sessions.get(route)?.done);
  render();
  window.scrollTo(0, 0);
  focus("page-heading");
}
document.addEventListener("click", (event) => {
  if (event.target.closest(".skip-link")) {
    event.preventDefault();
    main.focus();
    return;
  }
  const button = event.target.closest("button");
  if (!button) return;
  const id = button.id;
  if (id === "language") {
    lang = lang === "es" ? "en" : "es";
    saveLanguage(lang);
    render();
    return;
  }
  if (id === "audio-toggle") {
    audio = !audio;
    if (!audio) stopAudio();
    render();
    return;
  }
  if (id === "support") {
    support = !support;
    render();
    return;
  }
  if (button.dataset.filter) {
    filter = button.dataset.filter;
    render();
    announce(
      tr(bi("Lista de actividades actualizada.", "Activity list updated.")),
    );
    return;
  }
  if (id === "reset-progress") {
    resetPending = true;
    render();
    focus("cancel-reset");
    return;
  }
  if (id === "cancel-reset") {
    resetPending = false;
    render();
    focus("reset-progress");
    return;
  }
  if (id === "confirm-reset") {
    completed = [];
    sessions.clear();
    storageAvailable = saveProgress(completed);
    resetPending = false;
    render();
    announce(tr(bi("Progreso reiniciado.", "Progress reset.")));
    focus("reset-progress");
    return;
  }
  if (id === "replay") {
    sessions.delete(route);
    done = false;
    render();
    focus("page-heading");
    return;
  }
  if (button.dataset.action === "speak") {
    speak(button.dataset.speech, true);
    return;
  }
  if (route && !done) controller(route).click?.(button.dataset.action, button);
});
document.addEventListener("change", (event) => {
  if (route && !done) controller(route).change?.(event.target);
});
document.addEventListener("submit", (event) => {
  if (event.target.id === "email-form") {
    event.preventDefault();
    controller(route).submit();
  }
});
window.addEventListener("hashchange", navigate);
window.addEventListener("pagehide", stopAudio);
navigate();

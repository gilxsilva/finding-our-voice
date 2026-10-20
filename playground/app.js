import { games, bi } from "./content.js";
import { icon } from "./ui.js";
import { siteLinks, wave, bubble, star } from "./brand.js";
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
let menuOpen = false;
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
  return `<div class="header-inner">
    <a class="brand" href="index.html" aria-label="Finding Our Voice"><span class="brand-mark">FOV</span></a>
    <nav id="site-menu" class="site-links ${menuOpen ? "is-open" : ""}" aria-label="${tr(bi("Navegación principal", "Main navigation"))}">
      ${siteLinks.map((link) => `<a href="index.html#${link.route}">${tr(link.label)}</a>`).join("")}
      <a class="playground-link" href="#" aria-current="page">Playground</a>
      <a class="mobile-involved" href="index.html#get-involved">${tr(bi("Únete", "Get Involved"))}</a>
    </nav>
    <div class="header-tools">
      <button id="audio-toggle" class="tool-button" aria-pressed="${audio}" aria-label="${tr(audio ? bi("Audio automático activado", "Automatic audio on") : bi("Audio automático desactivado", "Automatic audio off"))}">${icon("sound")}<span>${tr(audio ? bi("Audio sí", "Audio on") : bi("Audio no", "Audio off"))}</span></button>
      <button id="language" class="language-button" aria-label="${lang === "es" ? "Switch interface to English" : "Cambiar la interfaz a español"}"><span class="${lang === "es" ? "active" : ""}" lang="es">ES</span><span aria-hidden="true">/</span><span class="${lang === "en" ? "active" : ""}" lang="en">EN</span></button>
      <a class="header-cta" href="index.html#get-involved">${tr(bi("Únete", "Get Involved"))}</a>
    </div>
    <button id="menu-toggle" class="menu-toggle" aria-label="${tr(bi("Menú del sitio", "Site menu"))}" aria-expanded="${menuOpen}" aria-controls="site-menu"><span></span><span></span><span></span></button>
  </div>`;
}
function footer() {
  return `<div class="footer-inner"><div><a class="footer-brand" href="index.html">${tr(bi("Encontrando Nuestra Voz", "Finding Our Voice"))}</a><p>${tr(bi("Fundado en Mission High School · San Francisco, CA", "Founded at Mission High School · San Francisco, CA"))}</p></div>
    <nav class="footer-links" aria-label="${tr(bi("Pie de página", "Footer"))}">${siteLinks.map((link) => `<a href="index.html#${link.route}">${tr(link.label)}</a>`).join("")}<a href="#">Playground</a><a href="index.html#get-involved">${tr(bi("Únete", "Get Involved"))}</a></nav>
    <p class="privacy-note">${tr(bi("Playground · Sin cuentas. Sin anuncios. Sin datos personales.", "Playground · No accounts. No ads. No personal data."))}</p>
  </div>`;
}
function setMenu(open) {
  menuOpen = open;
  document.getElementById("site-menu")?.classList.toggle("is-open", open);
  document
    .getElementById("menu-toggle")
    ?.setAttribute("aria-expanded", String(open));
}
const groups = {
  all: bi("Todas las actividades", "All activities"),
  words: bi("Palabras y frases", "Words & sentences"),
  school: bi("Mi vida escolar", "My school life"),
  digital: bi("Mi mundo digital", "My digital world"),
};
function heroArt() {
  return `<svg class="hero-arcs" viewBox="0 0 1400 650" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true"><path d="M0 150 Q350 -20 700 150 T1400 150M0 350 Q350 180 700 350 T1400 350M0 550 Q350 380 700 550 T1400 550" stroke="#F5C132" stroke-width="2"/></svg>`;
}
function dashboard() {
  const count = completed.length;
  return `<section class="dashboard-hero">${heroArt()}<div class="hero-inner"><div class="hero-copy"><p class="eyebrow">FINDING OUR VOICE PLAYGROUND</p><div class="hero-headline-wrap"><div class="hero-bubble">${bubble}</div><div class="hero-star">${star}</div><h1 id="page-heading" tabindex="-1"><span>${tr(bi("TU VOZ.", "YOUR VOICE."))}</span><span>${tr(bi("EN ACCIÓN.", "IN ACTION."))}</span></h1></div><p>${tr(bi("Un espacio para practicar inglés, probar cosas nuevas y sentirte más en casa. A tu ritmo. A tu manera.", "A space to practice English, try something new, and feel more at home. Your pace. Your way."))}</p><div class="hero-actions"><a class="button primary" href="#match">${tr(count ? bi("Seguir practicando", "Keep practicing") : bi("Vamos a jugar", "Let’s play"))} ${icon("arrow")}</a><a class="button hero-story" href="index.html#about">${tr(bi("Nuestra historia", "Our story"))}</a></div><p class="hero-note">${tr(bi("8 actividades · Cero presión · Tu español es una fortaleza", "8 activities · Zero pressure · Your Spanish is a strength"))}</p></div></div></section>
  <div class="dashboard-body"><section class="journey" aria-labelledby="journey-heading"><div class="journey-icon">${icon("star")}</div><div class="journey-text"><h2 id="journey-heading">${tr(count === 8 ? bi("¡Mira todo lo que lograste!", "Look at everything you did!") : bi("Cada intento cuenta.", "Every try counts."))}</h2><p>${tr(bi("Tu progreso se guarda solo en este navegador. Puedes repetir todo.", "Your progress is saved only in this browser. You can replay everything."))}</p></div><div class="journey-progress"><span>${count} / 8 <span>${tr(bi("completadas", "completed"))}</span></span><progress max="8" value="${count}" aria-label="${tr(bi("Actividades completadas", "Completed activities"))}"></progress></div></section>
  ${!storageAvailable ? `<p class="notice">${tr(bi("El guardado no está disponible en este navegador. Tu progreso dura esta sesión.", "Saving is unavailable in this browser. Progress lasts for this session."))}</p>` : ""}
  <section aria-labelledby="activities-heading"><div class="section-heading"><div><p class="eyebrow">${tr(bi("UN POCO DE PRÁCTICA. MUCHAS POSIBILIDADES.", "A LITTLE PRACTICE. A LOT OF POSSIBILITY."))}</p><h2 id="activities-heading">${tr(bi("¿Qué quieres explorar hoy?", "What will you explore today?"))}</h2><span class="heading-wave">${wave}</span></div><span class="activity-count">${tr(bi("Pequeños retos para tu mundo real", "Small challenges for your real world"))}</span></div>
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
  menuOpen = false;
  stopAudio();
  route = readRoute();
  done = Boolean(sessions.get(route)?.done);
  render();
  window.scrollTo(0, 0);
  focus("page-heading");
}
document.addEventListener("click", (event) => {
  if (
    menuOpen &&
    (!event.target.closest("#header") || event.target.closest(".site-links a"))
  )
    setMenu(false);
  if (event.target.closest(".skip-link")) {
    event.preventDefault();
    main.focus();
    return;
  }
  const button = event.target.closest("button");
  if (!button) return;
  const id = button.id;
  if (id === "menu-toggle") {
    setMenu(!menuOpen);
    return;
  }
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuOpen) {
    setMenu(false);
    focus("menu-toggle");
  }
});

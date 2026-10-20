export const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const shuffle = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const shapes = {
  book: '<path d="M12 6c-3-3-7-3-10-2v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 2Zm0 0v15M5 8h4M5 12h4m6-4h4m-4 4h4"/>',
  notebook:
    '<rect x="5" y="2" width="15" height="20" rx="2"/><path d="M3 6h4m-4 4h4m-4 4h4m-4 4h4m4-12h5m-5 4h5"/>',
  pencil: '<path d="m3 21 1-6L17 2l5 5L9 20l-6 1Zm1-6 5 5M14 5l5 5"/>',
  backpack:
    '<rect x="4" y="7" width="16" height="15" rx="4"/><path d="M8 7V5a4 4 0 0 1 8 0v2M4 12h16m-12 3h8v4H8z"/>',
  calculator:
    '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 5h8v4H8zm0 8h1m3 0h1m3 0h0M8 17h1m3 0h1m3 0h0"/>',
  folder: '<path d="M2 7V4h7l3 3h10v14H2V7Zm0 3h20"/>',
  chat: '<path d="M3 3h18v13H9l-6 5V3Z"/><path d="M7 8h10M7 12h6"/>',
  people:
    '<circle cx="9" cy="7" r="4"/><path d="M2 22v-4a7 7 0 0 1 14 0v4m0-19a4 4 0 0 1 0 8m3 3c3 1 3 4 3 8"/>',
  cup: '<path d="M5 5h13l-2 17H7L5 5Zm2-3h9m-9 8h10"/>',
  calendar:
    '<rect x="2" y="4" width="20" height="18" rx="2"/><path d="M7 2v5m10-5v5M2 10h20M7 14h3m4 0h3m-10 4h3"/>',
  bus: '<rect x="3" y="2" width="18" height="18" rx="3"/><path d="M3 12h18M7 20v2m10-2v2M7 16h1m8 0h1M12 2v10"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5M2 20l7-8m13 8-7-8"/>',
  cards:
    '<rect x="2" y="3" width="9" height="14" rx="2"/><rect x="13" y="7" width="9" height="14" rx="2"/><path d="m5 9 1 2 2-4m8 7h3"/>',
  grid: '<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M2 9h20M2 15h20M9 2v20m6-20v20"/>',
  blocks:
    '<rect x="1" y="4" width="9" height="7" rx="1"/><rect x="13" y="4" width="10" height="7" rx="1"/><rect x="5" y="15" width="14" height="7" rx="1"/>',
  lock: '<rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V6a5 5 0 0 1 10 0v4m-5 5v3"/>',
  shield:
    '<path d="m12 2 9 4v7c0 5-9 9-9 9S3 18 3 13V6l9-4Z"/><path d="m7 12 3 3 7-7"/>',
  school: '<path d="M2 22V9l10-7 10 7v13H2Zm7 0v-7h6v7M6 10h2m8 0h2M12 2v7"/>',
  sound:
    '<path d="M3 9h4l5-5v16l-5-5H3V9Zm13-2c4 3 4 7 0 10m3-13c6 5 6 11 0 16"/>',
  star: '<path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1 3-6Z"/>',
  arrow: '<path d="M3 12h18m-7-7 7 7-7 7"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
};
export const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || shapes.star}</svg>`;
export const english = (text) => `<span lang="en">${escapeHTML(text)}</span>`;
export const feedbackHTML = (feedback, tr) =>
  feedback
    ? `<div class="feedback ${feedback.tone}"><strong>${feedback.tone === "success" ? tr({ es: "¡Bien hecho!", en: "Well done!" }) : tr({ es: "Vamos paso a paso.", en: "One step at a time." })}</strong> ${escapeHTML(tr(feedback.text))}</div>`
    : "";
export const audioButton = (text, tr) =>
  `<button type="button" class="button subtle audio" data-action="speak" data-speech="${escapeHTML(text)}">${icon("sound")}${tr({ es: "Escuchar", en: "Listen" })}</button>`;
export const bilingual = (item, ctx) =>
  `${english(item.en)}${ctx.support() ? `<small lang="es">${escapeHTML(item.es)}</small>` : ""}`;
export const scheduleHTML = (tr) =>
  `<div class="schedule"><table><caption>${tr({ es: "Tu horario de práctica · Día de ejemplo", en: "Your practice schedule · Sample day" })}</caption><thead><tr><th scope="col">${tr({ es: "Hora", en: "Time" })}</th><th scope="col">${tr({ es: "Clase", en: "Class" })}</th><th scope="col">${tr({ es: "Lugar", en: "Room" })}</th></tr></thead><tbody><tr><td>8:30–10:00 a.m.</td><td lang="en">English</td><td>204</td></tr><tr><td>10:15–11:45 a.m.</td><td lang="en">Math</td><td>110</td></tr><tr><td>12:00–12:40 p.m.</td><td lang="en">Lunch</td><td lang="en">Cafeteria</td></tr><tr><td>1:00–2:30 p.m.</td><td lang="en">Art</td><td>105</td></tr></tbody></table></div>`;

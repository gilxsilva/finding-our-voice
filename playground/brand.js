import { bi } from "./content.js";

// The same labels, destinations, palette and line illustrations as index.html.
// Both Playground navigation regions use this list to stay consistent.
export const siteLinks = [
  { route: "about", label: bi("Acerca de", "About") },
  { route: "programs", label: bi("Programas", "Programs") },
  { route: "voices", label: bi("Voces Estudiantiles", "Student Voices") },
  { route: "resources", label: bi("Recursos", "Resources") },
  { route: "team", label: bi("Conoce al Equipo", "Meet the Team") },
];
export const wave = `<svg viewBox="0 0 220 16" fill="none" aria-hidden="true"><path d="M3 12 Q22 2 44 12 Q66 22 88 9 Q110 0 132 12 Q154 22 176 9 Q198 0 217 12" stroke="#F5C132" stroke-width="3" stroke-linecap="round"/></svg>`;
export const bubble = `<svg viewBox="0 0 100 78" fill="none" aria-hidden="true"><path d="M8 5 Q6 3 12 3 L84 5 Q92 5 92 14 L90 50 Q90 58 82 58 L54 58 L42 74 L40 58 L18 58 Q10 58 10 50 L8 14 Q8 8 8 5Z" stroke="#F5C132" stroke-width="2.5" fill="rgba(245,193,50,.14)" stroke-linejoin="round"/><circle cx="34" cy="34" r="5" fill="#F5C132"/><circle cx="50" cy="34" r="5" fill="#F5C132"/><circle cx="66" cy="34" r="5" fill="#F5C132"/></svg>`;
export const star = `<svg viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M30 4 L34 20 L50 20 L37 30 L42 46 L30 36 L18 46 L23 30 L10 20 L26 20Z" stroke="#F5C132" stroke-width="2" fill="rgba(245,193,50,.2)" stroke-linejoin="round"/></svg>`;

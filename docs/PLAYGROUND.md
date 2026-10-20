# Finding Our Voice Playground

A small, Spanish-first bilingual learning hub for newcomer teenagers. It extends the existing static site without a framework migration, backend, authentication, tracking, or production build step.

## Evaluate locally

Run `npm start` and open `http://127.0.0.1:4173/playground.html` in a modern browser. Try a phone-sized window, then a tablet and desktop. The nonprofit home page has Playground links in its hero, desktop navigation, mobile menu, and footer. Legacy HTML pages also link to the hub.

Use ES / EN at any point. The interface changes language while your current choices and activity remain. An explicitly selected language also carries between the nonprofit site and Playground. The four scenario activities offer optional Spanish translations of English prompts and answers. Matching and Lotería use both languages as part of their core interaction; sentence building starts with a Spanish target; email uses guided English composition.

| Activity | First-version scope | Completion |
| --- | --- | --- |
| Match It! | 18 vocabulary words, three categories of six; choose either language first | Match six pairs in one category |
| Lotería de Palabras | Random 3 × 3 board and unique calls; optional audio; cooperative shared-screen classroom mode | Complete a row, column, or diagonal |
| What Would You Say? | Four school and friendship situations | Find an appropriate response in each situation |
| Build a Sentence | Four practical phrases with selectable word tiles; remove or clear words | Build all four phrases in order |
| Email Simulator | Guided recipient, subject, greeting, request, closing; live preview and specific field hints | Compose all five parts appropriately |
| My First Online Account | Fictional username, password strategy, verification, and multi-factor authentication | Complete four safe decisions |
| Safe or Sketchy? | Five realistic digital safety situations with reasons and next steps | Identify each safe or suspicious behavior |
| School Day Challenge | Fictional schedule, room change, lunch, homework support announcement | Read and answer four situations |

All activities are untimed, have retries and explanations, and end with a completion screen and replay option. Progress records practice completion, not a proficiency grade. Match and sentence games require selecting buttons; no dragging is necessary. Focus moves to the next useful control or step. Native buttons/selects work with touch and keyboard. Feedback is announced through a persistent live region. Reduced motion and forced colors are supported.

## Privacy and offline behavior

The Playground has no form requesting a real name, email address, password, or other personal details. Email and account choices use fictional `.example` addresses. The email exercise never sends mail; the account exercise never creates an account. There are no analytics, third-party requests, or production runtime dependencies in the Playground.

Only completed game IDs (`fov-playground-v1`) and the interface language (`fov-playground-lang`, mirrored to the existing site preference `fov-lang`) are stored in localStorage. Attempts remain in memory while navigating within the page. Reloading starts the current attempt over. Reset progress clears completion marks and in-memory attempts after an inline confirmation. Storage failures fall back to session memory and explain that saving is unavailable.

The files run on any static HTTP host. They do not require third-party services. This version does not include a service worker or guarantee offline reopening of a page that has not been cached by the browser. Optional speech synthesis depends on the device/browser and its installed voices; its availability and voice quality vary, and some browser voices may use network services. Audio is off by default. Every spoken prompt is also visible as text. Activities remain playable without speech synthesis.

Digital safety guidance links to current official [FTC phishing guidance](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams) and [FTC account protection guidance](https://consumer.ftc.gov/articles/creating-strong-passwords-and-other-ways-protect-your-accounts), reviewed October 20, 2026. Actual school procedures and schedules should be confirmed with the student's school.

## Development map

- `playground/app.js`: dashboard, routing, language, optional speech, progress, focus and announcements.
- `playground/brand.js`: the original site navigation destinations and gold line illustrations, reused across the Playground header, hero, and footer.
- `playground/content.js`: shared vocabulary, bilingual scenarios, sentence targets and email choices.
- `playground/games/`: focused controllers for matching, Lotería, sentence building, email, and shared scenario interactions.
- `playground/ui.js`: shared icons, escaped text, feedback, bilingual choices and schedule.
- `playground/storage.js`: validated, versioned browser-local progress and safe storage handling.
- `playground/playground.css`: isolated design tokens, layouts, game controls, breakpoints and accessibility preferences.
- `playground/fonts/`: unmodified Barlow and Barlow Condensed files from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/barlow), plus the SIL Open Font License.

The original nonprofit content and founder biographies remain in `index.html`. Legacy documents remain at their original paths. Their existing contact behavior and external resources were preserved. No deployment configuration, domain, or production branch was changed.

## Testing

Install development dependencies with `npm ci`. The public site itself needs none.

- `npm run test:unit`: bilingual content integrity, corrupt/blocked storage, Lotería winning lines.
- `npm test`: Playwright end-to-end suite using installed Google Chrome; includes keyboard activation, language/state retention, retries, completion, layout at four sizes, no external Playground requests, accessibility checks and nonprofit regressions.
- If a managed environment prevents launching Chrome, start the local server and open `/tests/browser.html`. Its in-browser suite exercises the same learner journeys and runs axe in an iframe using the locally installed development dependency. It resets local practice progress; use a separate local browser origin for evaluation if preserving progress matters.
- `/tests/fallback.html` is a test-only fixture that disables storage and speech synthesis before loading the real application modules. It is not linked from the public experience.

Manual review should include Tab / Shift+Tab, Enter / Space, native select arrow keys, the skip link, visible focus on long/mobile screens, 200% browser zoom, iOS Safari, Android Chrome, and a screen reader such as VoiceOver or NVDA. Automated accessibility checks do not certify WCAG conformance.

## Next iteration

1. Run short, compensated usability sessions with newcomer students and bilingual educators; check language, cultural fit, difficulty and comprehension.
2. Expand conversation branches and scenario sets, add flexible sentence variants and a carefully scoped free-writing email mode. This version deliberately uses guided choices rather than judging arbitrary writing.
3. Add teacher-printable Lotería boards and independent local board seeds. Current classroom mode is cooperative on one shared screen, without live multiplayer.
4. Add professionally reviewed recordings and test voice behavior on actual student devices; preserve the text fallback.
5. Validate with VoiceOver/NVDA and real mobile devices, then address observed barriers.
6. Reconcile inconsistent dates and impact figures in the older legacy pages with the founders before changing historical content. This feature preserves those records.

No activities are placeholders. The scope is intentionally small: four or five scenarios per decision activity, a guided email, and an account-safety simulation rather than an actual signup form.

## Design alignment revision

The Playground now follows the existing nonprofit website’s dark brown poster hero, oversized uppercase Barlow Condensed headings, FOV wordmark, Mission Gold pill buttons, parchment sections, gold-topped white cards, and outlined speech bubble/star/wave illustrations. The full nonprofit navigation and matching footer stay available from the hub and games. On phones, a keyboard-accessible disclosure menu supports Escape, outside clicks and focus return. Game feedback colors remain reserved for success and retry states.

For a future Vercel release, keep the nonprofit pages and Playground in one static project and domain, with the learning hub at `/playground.html`. Start with a reviewable preview, then release the reviewed commit to production. Vercel supports static frontend hosting; see its [frontend documentation](https://vercel.com/docs/frameworks/frontend). This revision does not connect hosting, change DNS, merge the PR, or deploy.

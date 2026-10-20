# Playground verification — October 20, 2026

## Design alignment revision

The current revision aligns the Playground masthead, full navigation, hero, headings, illustrations, buttons, cards and footer with the original nonprofit site. An explicit language choice is shared through the site's existing `fov-lang` preference. The content/storage suite now has **4 passing checks** and JavaScript/CSS syntax checks pass.

Browser verification of this revision is pending: the browser safety gate refused inspection of a stale connection-error tab because it had an internal browser URL. The local server is serving HTTP 200 again; the user has been asked to refresh the ordinary preview before browser work resumes. No attempt was made to bypass that gate. The expanded browser-hosted suite includes a nineteenth check for the shared navigation, mobile disclosure, Escape/focus return and language continuity.

The results below record the first playable version, before this design revision. They must not be read as a new browser test pass for the revised design.

## Result

All eight activities were completed through the actual app in the Codex in-app browser. The browser-hosted suite finished **18 passed, 0 failed**. The Node content/storage suite finished **3 passed, 0 failed**. No deployment was performed.

## Evidence and coverage

| Boundary | Evidence |
| --- | --- |
| Static site loads | Local server returned HTTP 200 for `/playground.html`; all module and local font assets loaded |
| Dashboard → activities | Eight linked cards; all three category filters; unknown hashes return to dashboard |
| Choice → validation → feedback | Wrong and correct answers exercised in all four scenario games; matching corrections; incorrect sentence order; five email field hints; wrong Lotería cards |
| Feedback → completion | All eight games reached completion screens; each scenario explanation shown before continuing |
| Completion → storage → reload | All eight completion IDs retained after reload; reset cancel/confirm checked; attempts retained through in-page navigation and browser Back/Forward |
| Language and help | ES/EN switching retained sentence words, email choices, scenario answers and step; Spanish support toggled in scenario games |
| Restricted capabilities | A test-only fixture disabled localStorage and speech synthesis; an entire conversation activity completed, explained saving failure, and still switched language |
| Optional audio | Visible text fallback and explicit listen controls checked; absent speech API exercised. Device voice quality was not audibly assessed |
| Responsive layout | Dashboard plus every activity fit 320, 375, 768 and 1440 CSS-pixel viewports without horizontal overflow; desktop and 390px screenshots visually reviewed |
| Accessibility | Axe reported zero WCAG A/AA tagged violations in Spanish and English on dashboard and all eight game entry states (18 audited views); native keyboard Enter/Space, retry, next-step focus, language toggle and skip-link route behavior checked |
| External services | Browser resource entries confirmed no external Playground asset requests; simulations used choices and fictional `.example` addresses; no email-send or account-create request exists |
| Nonprofit regression | Home, About, Programs, Voices, Resources, Team, four complete founder biographies, Get Involved/contact form presence, language toggle and all four legacy document URLs checked |

The original site's contact behavior was preserved. Testing confirms the contact form still appears, not that it delivers messages; the existing implementation only displays a confirmation.

## Runner limitation

The standalone Playwright suite contains 20 tests but could not launch Google Chrome in this managed environment (the browser process exited during startup, before tests ran). These are **not counted as passing tests**. The checked-in browser-hosted runner (`/tests/browser.html`) provided the executed end-to-end, responsive, and axe evidence instead. Run `npm ci`, `npm start`, then open that test page and click **Run all browser checks**. It resets local practice progress.

The Playwright suite remains available through `npm test` on a machine that permits launching installed Google Chrome. The test-only server and dependencies are not required by production hosting.

## Remaining validation

No formal WCAG conformance certification is claimed. Test actual iOS Safari and Android devices, 200% zoom, VoiceOver/NVDA announcement quality, and device speech voices. Classroom mode is a cooperative shared-screen activity, not networked multiplayer. Email composition is guided rather than free text. Student and educator usability feedback should drive expansion.

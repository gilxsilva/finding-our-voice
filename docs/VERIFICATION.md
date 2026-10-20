# Playground verification — October 20, 2026

## Result

The current design revision passed **19 browser-hosted checks, 0 failures**, and **4 Node content/storage checks, 0 failures**. All eight activities were completed through the actual app in the Codex in-app browser. Desktop and mobile screenshots were visually reviewed, including the masthead, poster hero, gold/white cards, mobile disclosure and game frame. No deployment or merge was performed.

The previously blocked stale error page was refreshed by the user, restoring normal browser access. The browser suite then ran on a dedicated test origin at `http://127.0.0.1:4174`, separate from the user preview at port 4173. The runner is disabled on the preview origin so its resets cannot clear the learner's saved preview progress.

## Evidence and coverage

| Boundary | Evidence |
| --- | --- |
| Static site loads | Local servers returned HTTP 200; all module and local font assets loaded |
| Shared nonprofit identity | FOV masthead, full nonprofit navigation, brown poster hero, uppercase Barlow Condensed headings, gold pill buttons, outlined illustrations, parchment and matching footer visually reviewed |
| Mobile menu and language continuity | Disclosure opens/closes; Escape returns focus to the menu control; an explicit language choice carries in both directions between the nonprofit site and Playground |
| Dashboard → activities | Eight linked cards; all three category filters; unknown hashes return to dashboard |
| Choice → validation → feedback | Wrong and correct answers exercised in all four scenario games; matching corrections; incorrect sentence order; five email field hints; wrong Lotería cards |
| Feedback → completion | All eight games reached completion screens; each scenario explanation shown before continuing |
| Completion → storage → reload | All eight completion IDs retained after reload; reset cancel/confirm checked on test origin; attempts retained through in-page navigation and browser Back/Forward |
| Language and help | ES/EN switching retained sentence words, email choices, scenario answers and step; Spanish support toggled in scenario games |
| Restricted capabilities | Test fixture disabled localStorage and speech synthesis; an entire conversation activity completed, explained saving failure, and still switched language |
| Optional audio | Visible text fallback and explicit listen controls checked; absent speech API exercised. Device voice quality was not audibly assessed |
| Responsive layout | Dashboard plus every activity fit 320, 375, 768 and 1440 CSS-pixel viewports without horizontal overflow; desktop and 390px phone layouts visually reviewed |
| Accessibility | Axe reported zero WCAG A/AA tagged violations in Spanish and English on dashboard and all eight game entry states (18 audited views). Native Enter/Escape menu controls, focus return, language switching and the game draw control were manually exercised |
| External services and runtime | Resource entries confirmed no external Playground assets; local simulations use fictional `.example` addresses. No runtime errors appeared in the inspected game preview console |
| Nonprofit regression | Home, About, Programs, Voices, Resources, Team, four complete founder biographies, Get Involved/contact form presence, language toggle and all four legacy document URLs checked |

The original site's contact behavior was preserved. Testing confirms the contact form still appears, not that it delivers messages; the existing implementation only displays a confirmation.

## Reproduce

Run `npm ci`, then `npm run test:unit` for the four content/storage checks. For the browser-hosted suite, run `npm run test:browser`, open `http://127.0.0.1:4174/tests/browser.html`, and click **Run all browser checks**. Only disposable practice state on this dedicated test origin is reset. The regular preview remains at `http://127.0.0.1:4173` using `npm start`.

The standalone Playwright suite contains 20 tests but could not launch Google Chrome in this managed environment during the first iteration. Those tests are **not counted as passing**. The executed browser-hosted suite supplies the current end-to-end, responsive and axe evidence instead. Run `npm test` on a machine that permits launching installed Google Chrome.

The development servers and test dependencies are not required by production hosting.

## Remaining validation

No formal WCAG conformance certification is claimed. Test actual iOS Safari and Android devices, 200% zoom, VoiceOver/NVDA announcement quality, and device speech voices. Classroom mode is cooperative on one shared screen. Email composition is guided. Student and educator usability feedback should drive expansion.

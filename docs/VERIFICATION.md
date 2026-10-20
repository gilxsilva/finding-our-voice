# Playground verification — October 20, 2026

## Result

The release passed **20 standalone Playwright tests on GitHub Actions**, **19 browser-hosted checks**, and **4 Node content/storage checks**, with no test failures in those executed runs. All eight activities were completed through the actual app in the Codex in-app browser. Desktop and mobile screenshots were visually reviewed, including the masthead, poster hero, gold/white cards, mobile disclosure and game frame. The app was packaged and released to Vercel production; PR #1 integrates the reviewed version into `main`. See the release notes below.

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

The managed local environment still cannot launch Google Chrome (the process aborts before any test runs). The same standalone suite subsequently ran successfully on GitHub’s Ubuntu runner: **20 passed**, including all eight activities, original-site regressions, language/state behavior, four layout widths, and axe audits. See [the successful workflow run](https://github.com/gilxsilva/finding-our-voice/actions/runs/39517371599) for commit `2cc70580821244da0364a9cfb4cf1f2194c148c8`. GitHub Actions repeats these checks for pull requests and pushes to `main`.

The development servers and test dependencies are not required by production hosting.

## Remaining validation

No formal WCAG conformance certification is claimed. Test actual iOS Safari and Android devices, 200% zoom, VoiceOver/NVDA announcement quality, and device speech voices. Classroom mode is cooperative on one shared screen. Email composition is guided. Student and educator usability feedback should drive expansion.

## Initial Vercel release — October 20, 2026

The `finding-our-voice` project in Gil Silva’s projects is connected to `gilxsilva/finding-our-voice`. Vercel reported the production deployment of commit `fcec1ee99eec6e5e2a08525fe27d05cd10c1c6b7` as **READY**, with no alias error, and assigned `https://finding-our-voice.vercel.app`. The build logs confirm the exact Git commit, successful static packaging, and completed deployment. A subsequent documentation-only commit adds the live links and this release record.

`npm run build` passed locally; public output bytes matched their source files, all six HTML documents were retained, and tests/documentation/dependencies were excluded. The four content/storage tests passed again. No application code changed in this publishing revision, so the earlier 19 browser checks still describe that application revision.

Public HTTPS verification was attempted but could not complete from this environment: the browser reported an unreachable address and command-line DNS resolution failed (including for GitHub). Vercel’s authenticated fetch was rejected by automatic approval review because it could create an authentication-bypass link; no bypass was created and protection was not changed. The deployment status and alias are confirmed by Vercel, but public reachability and post-deployment browser interactions remain to be checked from a normal browser. No production completion data was reset.

At that initial release, main and the existing GitHub Pages deployment had not yet been merged or altered. The public verification gap was resolved by the follow-up below.

## Production readiness and public verification — October 20, 2026

After network access recovered, the public Vercel domain returned HTTP 200 without authentication. **All 23 public assets** (six HTML pages, CSS/JavaScript modules, fonts and license) returned 200 and matched the source bytes from the static build. `/tests/browser.html`, `/node_modules/axe-core/axe.min.js`, `/README.md`, and `/.git/config` returned 404. No authentication bypass or protection changes were used.

In the public in-app browser, all eight cards rendered. ES/EN switching worked; a conversation exercised an incorrect answer, retry, keyboard continuation, all four steps, completion, and persistence after reloading the dashboard. The GitHub Actions suite supplies additional complete game, mobile-layout, keyboard and nonprofit-route coverage. Application code has not changed since that tested release.

The repository website link now points to `https://finding-our-voice.vercel.app/`. README and the [production guide](PRODUCTION.md) document the exact repository/project, `main` release workflow, build output, checks, privacy boundaries, preserved routes, and rollback procedure. User authorization now includes merging PR #1 and releasing the merged commit. The final merge SHA and production deployment are recorded in GitHub and Vercel rather than embedded in a commit that would change that SHA.

Production entry points: [website](https://finding-our-voice.vercel.app/) and [Playground](https://finding-our-voice.vercel.app/playground.html). Remaining device, screen-reader, speech-quality and student usability checks are follow-up work, not completed certifications.

# Production and maintenance

## Project identity

- Repository: [gilxsilva/finding-our-voice](https://github.com/gilxsilva/finding-our-voice).
- Production branch: `main`.
- Vercel team: **Gil Silva’s projects** (`gil-silvas-projects`).
- Vercel project: **finding-our-voice** (`prj_ZEul4tNTisQbTiTbdcdTlp2WIbdF`).
- [Vercel project dashboard](https://vercel.com/gil-silvas-projects/finding-our-voice).
- Website: <https://finding-our-voice.vercel.app/>.
- Playground: <https://finding-our-voice.vercel.app/playground.html>.
- Existing GitHub Pages address: <https://gilxsilva.github.io/finding-our-voice/>.

Both hosts use the same static HTML/CSS/JavaScript and relative links. Keep all nonprofit pages, founder hash routes, and the Playground in this repository. No backend, accounts, environment variables, paid API, or database is needed.

## Review and publish

1. Make changes on a feature branch and open a PR against `main`.
2. Run `npm ci`, `npm run test:unit`, `npm run build`, and `npm test` (installed Google Chrome required). GitHub Actions repeats these checks with Chrome on Ubuntu. The workflow has read-only repository permissions and does not deploy.
3. Review content, layout, accessibility, and the Vercel preview when available. Resolve failing checks before merging.
4. Merge the reviewed PR. Vercel's Git integration builds `main` with `npm run build` and publishes `dist/`. Confirm that the production deployment is **Ready**, its source is the merged commit, and the domain points to it.
5. Verify the public release as described below. GitHub Pages retains its existing publishing configuration and updates from the repository's configured source.

The publishing script copies only the six public HTML documents, `style.css`, `script.js`, and `playground/` with its local fonts and font license. Tests, dependencies, development tooling, documentation, and Git metadata are excluded from the Vercel output. `cleanUrls: false` preserves existing `.html` URLs. Hash routes require no server rewrites.

## Verify a release

- Open the website without signing into Vercel, follow the Playground link, and confirm all eight cards appear.
- Switch ES / EN, enter an activity, make a wrong choice, retry, and finish it. Reload to confirm its completion mark remains. Do not clear an existing learner's progress during testing.
- Follow the site links back to About and Team; open the four founder biographies and check their history is intact.
- Try a phone width and use Tab, Enter, and Escape. Listen controls must have visible text alternatives.
- Check all six HTML paths, game modules, CSS, and font files return successful responses. The public Vercel paths `/tests/browser.html` and `/node_modules/axe-core/axe.min.js` should return 404.
- Check the browser console for application errors. A deployment status alone is not proof of working interactions.

See [verification evidence](VERIFICATION.md) for what was actually tested and remaining device/screen-reader checks. Browser-only tests can run on the dedicated local test origin at port 4174, as documented in the README; never publish that runner.

## Recover and maintain

If a release breaks essential behavior, select a known working production deployment in the Vercel dashboard and roll back. Then fix or revert the change through a PR so `main` matches the intended production version. Confirm the public domain after recovery.

Keep dependencies locked and review updates through PRs. Check FTC links and school-related guidance periodically; school schedules in the games are fictional. Preserve the original program history and contact information unless the founders provide corrections. The inherited contact form displays a confirmation and does not deliver email; the Playground email exercise is also a simulation. Do not add real student information, passwords, tracking, or mail delivery without a separate design and privacy review.

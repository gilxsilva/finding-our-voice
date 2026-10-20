# FINDING OUR VOICE

**A student-founded program at Mission High School, San Francisco.**
Built in partnership with 826 Valencia to support newcomer immigrant, refugee, and undocumented students in learning English and navigating the U.S. education system.

## Live website

- [Finding Our Voice](https://finding-our-voice.vercel.app/)
- [Finding Our Voice Playground — all eight activities](https://finding-our-voice.vercel.app/playground.html)
- [Review the feature in PR #1](https://github.com/gilxsilva/finding-our-voice/pull/1)

Vercel production hosts the feature branch release. The pull request remains open and `main` is unmerged. The existing GitHub Pages site is unchanged.

---

## Who We Are

Finding Our Voice was started by students who saw a gap and decided to close it. We noticed newcomer students struggling to find their place in a new language and a new country. So we did something about it.

Co-founded by **Gil Silva, Yuli, Emir, and Darwing** at Mission High School in San Francisco.

**30+ students helped. $10,000 grant from Youth Funding Youth Ideas. One student-led program.**

---

## What's in This Repo

This is the source code for the Finding Our Voice website. The nonprofit site and Playground use HTML, CSS, and JavaScript without a framework or production runtime dependencies.

```
index.html       existing bilingual nonprofit site and founder routes
playground.html  Spanish-first learning dashboard and eight activities
playground/      shared content, game modules, styles, and local fonts
*.html           existing legacy document routes (preserved)
style.css        styles for legacy document routes
tests/           content checks, browser suite, and development server
docs/            Playground guide and verification notes
README.md        you're reading it
```

The nonprofit site uses Google Fonts (Barlow Condensed + Barlow). The Playground bundles those fonts locally under the SIL Open Font License and uses inline SVG illustrations, so its activities need no external services. A dependency-free publishing script copies only public assets into `dist/`.

---

## Finding Our Voice Playground

A Spanish-first, bilingual learning hub for newcomer teenagers ages 13–18, with the same Mission Gold, brown, typography, and visual identity as the nonprofit site.

| Activity | Practice |
| --- | --- |
| Match It! | Spanish–English vocabulary in three categories |
| Lotería de Palabras | Vocabulary bingo, optional audio, and a shared-screen classroom mode |
| What Would You Say? | School conversations and friendships |
| Build a Sentence | Four useful English phrases with selectable word tiles |
| Email Simulator | A guided practice email to a teacher |
| My First Online Account | Fictional account creation, password strategies, and verification |
| Safe or Sketchy? | Scams, phishing, and safer online decisions |
| School Day Challenge | Schedules, announcements, and everyday school situations |

All eight activities include feedback, retries, completion, and replay. Switch ES / EN without losing your current choices. Progress and language are saved only in the browser; there are no student accounts, analytics, real passwords, or email delivery. Audio is optional and always has visible text. The games work without external services.

## Running It Locally

1. Clone the repository and start a local static server:
   ```bash
   git clone https://github.com/gilxsilva/finding-our-voice.git
   cd finding-our-voice
   npm start
   ```
2. Open `http://127.0.0.1:4173/` for the nonprofit site or `http://127.0.0.1:4173/playground.html` for the learning hub.

Node 20+ is needed only for the included development server and test tools. You can also use any ordinary static HTTP server. Serve the files over HTTP; the Playground uses JavaScript modules and cannot be launched reliably by double-clicking its HTML file.

For test instructions, activity details, and first-version limitations, see [the Playground guide](docs/PLAYGROUND.md). To run checks:

```bash
npm ci
npm run test:unit
npm test
```

`npm test` uses installed Google Chrome. For a browser-only alternative, run `npm ci` and `npm run test:browser`, then open `http://127.0.0.1:4174/tests/browser.html`. This dedicated test origin resets only its test progress and preserves preview progress on port 4173.

## Hosting on Vercel

The `finding-our-voice` Vercel project belongs to **Gil Silva’s projects** and connects to this GitHub repository. It hosts the nonprofit website and Playground together.

- Framework preset: **Other** (plain static files).
- Build command: `npm run build`.
- Output directory: `dist`.
- No environment variables, backend, or database required.
- `vercel.json` keeps the build settings in version control.

Run `npm run build` to produce the public files locally. This copies the six HTML pages, shared legacy CSS/JavaScript, and the complete `playground/` directory, including licensed local fonts. Tests, documentation, dependencies, and repository metadata are excluded. Existing document URLs and hash routes are preserved.

Local development, testing, and build commands do not publish anything. Release the reviewed commit through Vercel; check the home page, `/playground.html`, language switching, a full activity, and the original founder pages before sharing the release. The current feature is maintained on `codex/playground` in [PR #1](https://github.com/gilxsilva/finding-our-voice/pull/1); publishing it does not merge that PR.

---

## Design

The site uses the Mission High School color palette and draws inspiration from 826 Valencia's bold editorial style.

| Token | Value | Use |
|---|---|---|
| Mission Gold | `#F5C132` | Headlines, accents, CTAs |
| Bulldog Brown | `#3D2B1A` | Navbar, dark sections |
| Warm Brown | `#7A4F2E` | Body text, labels |
| Parchment | `#FDF6E3` | Light section backgrounds |

Typography: **Barlow Condensed 800** for all headlines (all caps, tight), **Barlow 400** for body copy.

---

## Get Involved

Want to volunteer, donate, or partner with us? Reach out:

- Email: [info@findingourvoice.org](mailto:info@findingourvoice.org)
- LinkedIn: [Finding Our Voice SF](https://www.linkedin.com/company/finding-our-voice-sf/about/)

---

*Founded at Mission High School, San Francisco.*

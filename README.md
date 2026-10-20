# FINDING OUR VOICE

**A student-founded program at Mission High School, San Francisco.**
Built in partnership with 826 Valencia to support newcomer immigrant, refugee, and undocumented students in learning English and navigating the U.S. education system.

---

## Who We Are

Finding Our Voice was started by students who saw a gap and decided to close it. We noticed newcomer students struggling to find their place in a new language and a new country. So we did something about it.

Co-founded by **Gil Silva, Yuli, Emir, and Darwing** at Mission High School in San Francisco.

**30+ students helped. $10,000 grant from Youth Funding Youth Ideas. One student-led program.**

---

## What's in This Repo

This is the source code for the Finding Our Voice website. The nonprofit site and Playground use HTML, CSS, and JavaScript without a framework or production build step.

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

The nonprofit site uses Google Fonts (Barlow Condensed + Barlow). The Playground bundles those fonts locally under the SIL Open Font License and uses inline SVG illustrations, so its activities need no external services. There is no production build step.

---

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

`npm test` uses installed Google Chrome. For a browser-only alternative, open `http://127.0.0.1:4173/tests/browser.html` after `npm ci` and `npm start`. This test page resets practice progress in that local browser origin.

No deployment is performed by these commands. Existing hosting can continue to serve these files as static assets.

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

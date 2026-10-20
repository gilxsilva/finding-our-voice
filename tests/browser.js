// An in-browser counterpart to the Playwright suite for environments without
// permission to launch a headless process. Never loaded by the public pages.
import {
  games,
  vocabulary,
  conversations,
  accountQuestions,
  safetyQuestions,
  schoolQuestions,
  sentences,
  emailFields,
} from "../playground/content.js";
const frame = document.querySelector("iframe");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const wait = () => new Promise((resolve) => setTimeout(resolve, 45));
let doc,
  win,
  passed = 0,
  failed = 0;
const assert = (value, message) => {
  if (!value) throw Error(message);
};
const $ = (selector) => doc.querySelector(selector);
const text = (selector) => $(selector)?.textContent || "";
async function click(selector) {
  const element = $(selector);
  assert(element && !element.disabled, `Enabled element missing: ${selector}`);
  element.click();
  await wait();
}
async function choose(selector, value) {
  const element = $(selector);
  assert(element, `Missing ${selector}`);
  element.value = String(value);
  element.dispatchEvent(new win.Event("change", { bubbles: true }));
  await wait();
}
async function open(id = "") {
  await new Promise((resolve) => {
    frame.onload = resolve;
    frame.src = "/playground.html?qa=" + Date.now() + (id ? "#" + id : "");
  });
  doc = frame.contentDocument;
  win = frame.contentWindow;
  await wait();
  assert($("#page-heading"), "Page rendered");
}
async function check(name, fn) {
  const item = document.createElement("li");
  results.append(item);
  item.textContent = "Checking: " + name;
  try {
    await fn();
    passed++;
    item.className = "pass";
    item.textContent = "PASS — " + name;
  } catch (e) {
    failed++;
    item.className = "fail";
    item.textContent = "FAIL — " + name + ": " + e.message;
  }
  status.textContent = `${passed} passed · ${failed} failed`;
}
async function injectAxe() {
  await new Promise((resolve, reject) => {
    const script = doc.createElement("script");
    script.src = "/node_modules/axe-core/axe.min.js";
    script.onload = resolve;
    script.onerror = reject;
    doc.head.append(script);
  });
}
async function run() {
  if (location.port !== "4174") return;
  document.querySelector("#run").disabled = true;
  results.innerHTML = "";
  passed = 0;
  failed = 0;
  localStorage.removeItem("fov-playground-v1");
  localStorage.removeItem("fov-playground-lang");
  localStorage.removeItem("fov-lang");
  await check(
    "Spanish-first dashboard, all filters, reset cancel and confirm",
    async () => {
      await open();
      assert(doc.documentElement.lang === "es", "Spanish first");
      assert(
        doc.querySelectorAll(".activity-card").length === 8,
        "Eight cards",
      );
      for (const [group, count] of [
        ["digital", 3],
        ["school", 2],
        ["words", 3],
        ["all", 8],
      ]) {
        await click("#filter-" + group);
        assert(
          doc.querySelectorAll(".activity-card").length === count,
          "Filter " + group,
        );
      }
      await click("#reset-progress");
      await click("#cancel-reset");
      await click("#reset-progress");
      await click("#confirm-reset");
    },
  );
  await check(
    "Shared site navigation, mobile menu, Escape and language continuity",
    async () => {
      frame.style.width = "375px";
      frame.style.maxWidth = "none";
      await open();
      assert(
        doc.querySelectorAll(".site-links a").length === 7,
        "Full original navigation plus Playground",
      );
      assert(
        win.getComputedStyle($("#site-menu")).display === "none",
        "Mobile links start collapsed",
      );
      await click("#menu-toggle");
      assert(
        $("#menu-toggle").getAttribute("aria-expanded") === "true",
        "Menu expanded",
      );
      assert(
        win.getComputedStyle($("#site-menu")).display === "flex",
        "Menu visible",
      );
      doc.dispatchEvent(
        new win.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
      assert(
        $("#menu-toggle").getAttribute("aria-expanded") === "false",
        "Escape closes menu",
      );
      assert(
        doc.activeElement.id === "menu-toggle",
        "Focus returns to menu control",
      );
      await click("#language");
      assert(localStorage.getItem("fov-lang") === "en", "Site language saved");
      await new Promise((resolve) => {
        frame.onload = resolve;
        frame.src = "/index.html#about";
      });
      doc = frame.contentDocument;
      win = frame.contentWindow;
      await wait();
      assert(
        doc.documentElement.lang === "en",
        "Original site uses the same language",
      );
      await click("#lang-toggle");
      await open();
      assert(
        doc.documentElement.lang === "es",
        "Playground respects Spanish selected on original site",
      );
      frame.style.width = "1440px";
    },
  );
  await check(
    "Match It: all three categories, incorrect pair, retry, completion",
    async () => {
      await open("match");
      for (const category of ["supplies", "places", "everyday"]) {
        await choose("#category", category);
        const words = vocabulary.filter((w) => w.category === category);
        await click("#es-" + words[0].id);
        await click("#en-" + words[1].id);
        assert($(".feedback.retry"), "Incorrect feedback");
        await click("#es-" + words[1].id);
        for (const w of words.filter((w) => w !== words[1])) {
          await click("#en-" + w.id);
          await click("#es-" + w.id);
        }
        assert(doc.querySelectorAll(".matched").length === 12, "All six pairs");
      }
      await click("#finish");
      assert($("#completion-heading"), "Completed");
      assert(
        JSON.parse(localStorage.getItem("fov-playground-v1")).includes("match"),
        "Saved",
      );
    },
  );
  await check(
    "Lotería: classroom mode, incorrect card, unique calls, line win, replay",
    async () => {
      await open("loteria");
      await click("#classroom");
      assert($(".loteria-board.classroom"), "Classroom mode");
      await click("#card-0");
      assert($(".feedback.retry"), "Prompt before draw");
      const called = new Set();
      while (!$("#finish")) {
        await click("#draw");
        const en = text(".called-word");
        assert(!called.has(en), "Unique draw");
        called.add(en);
        assert(called.size <= 9, "Bounded game");
        const w = vocabulary.find((w) => w.en === en);
        const cards = [...doc.querySelectorAll(".loteria-card:not(:disabled)")];
        const wrong = cards.find(
          (card) => card.querySelector("strong").textContent !== w.es,
        );
        if (wrong) {
          await click("#" + wrong.id);
          assert($(".feedback.retry"), "Incorrect card feedback");
        }
        const right = cards.find(
          (card) => card.querySelector("strong").textContent === w.es,
        );
        await click("#" + right.id);
      }
      await click("#finish");
      assert($("#completion-heading"), "Completed");
      await click("#replay");
      assert(!$(".marked"), "Replay cleared board");
    },
  );
  for (const [id, questions] of Object.entries({
    conversation: conversations,
    account: accountQuestions,
    safety: safetyQuestions,
    school: schoolQuestions,
  })) {
    await check(
      `${id}: every wrong/correct choice, explanations, focus and completion`,
      async () => {
        await open(id);
        for (const [i, q] of questions.entries()) {
          await click("#answer-" + ((q.answer + 1) % q.options.length));
          assert($(".feedback.retry"), "Retry feedback");
          assert(!$("#next"), "Cannot skip incorrect answer");
          await click("#answer-" + q.answer);
          assert($(".feedback.success"), "Success explanation");
          assert(doc.activeElement.id === "next", "Focus on continue");
          if (i === 0) {
            await click("#language");
            assert($(".feedback.success"), "Language retains answer");
            await click("#support");
            await click("#support");
            await click("#language");
          }
          await click("#next");
        }
        assert($("#completion-heading"), "Completed");
      },
    );
  }
  await check(
    "Build a Sentence: incorrect order, remove word, clear, four sentences",
    async () => {
      await open("sentence");
      for (const [i, sentence] of sentences.entries()) {
        if (i === 0) {
          // Deliberately put the last word first, then the other words.
          const tokens = sentence.en.split(" ");
          for (const token of [tokens.at(-1), ...tokens.slice(0, -1)]) {
            const button = [
              ...doc.querySelectorAll(".word-bank button:not(:disabled)"),
            ].find((b) => b.textContent.trim() === token);
            await click("#" + button.id);
          }
          await click("#check-sentence");
          assert($(".feedback.retry"), "Incorrect feedback");
          const chosen = $(".sentence-tray button");
          await click("#" + chosen.id);
          assert(
            doc.querySelectorAll(".sentence-tray button").length ===
              tokens.length - 1,
            "Remove works",
          );
          await click("#clear-sentence");
          assert(!$(".sentence-tray button"), "Clear works");
        }
        for (const token of sentence.en.split(" ")) {
          const button = [
            ...doc.querySelectorAll(".word-bank button:not(:disabled)"),
          ].find((b) => b.textContent.trim() === token);
          await click("#" + button.id);
        }
        await click("#check-sentence");
        assert($(".feedback.success"), "Correct sentence");
        await click("#next");
      }
      assert($("#completion-heading"), "Completed");
    },
  );
  await check(
    "Email: invalid field hints, guided composer, state preservation, preview, completion",
    async () => {
      await open("email");
      await click("#review-email");
      assert(
        doc.querySelectorAll(".field-error").length === 5,
        "Five field hints",
      );
      assert(doc.activeElement.id === "email-recipient", "Focus first error");
      for (const field of emailFields)
        await choose("#email-" + field.id, field.answer);
      await click("#language");
      assert($("#email-subject").value === "1", "Draft preserved in English");
      await click("#language");
      assert(
        text(".email-preview").includes("Could you help me after class?"),
        "Preview has request",
      );
      await click("#review-email");
      assert($(".feedback.success"), "Correct composition");
      await click("#finish");
      assert($("#completion-heading"), "Completed");
    },
  );
  await check(
    "All eight completions persist after reload; reset and browser history",
    async () => {
      await open();
      assert(
        doc.querySelectorAll(".completed-tag").length === 8,
        "Eight completion marks",
      );
      assert(
        JSON.parse(localStorage.getItem("fov-playground-v1")).length === 8,
        "Only eight IDs",
      );
      await click('a.activity-card[href="#sentence"]');
      await click(".word-bank button");
      const before = text(".sentence-tray");
      await click("#language");
      assert(text(".sentence-tray") === before, "Language retains sentence");
      await click("a.back-link");
      await click('a.activity-card[href="#sentence"]');
      assert(text(".sentence-tray") === before, "Route retains sentence");
      await click("a.back-link");
      win.history.back();
      await wait();
      assert(win.location.hash === "#sentence", "Back returns to activity");
      assert(text(".sentence-tray") === before, "Back retains sentence");
      win.history.forward();
      await wait();
      assert(
        doc.querySelectorAll(".activity-card").length === 8,
        "Forward returns to dashboard",
      );
      await click("#reset-progress");
      await click("#confirm-reset");
      assert(!$(".completed-tag"), "Reset clears marks");
      await open("missing");
      assert(
        doc.querySelectorAll(".activity-card").length === 8,
        "Unknown route is dashboard",
      );
    },
  );
  await check(
    "Skip link stays in the activity; local assets need no external services",
    async () => {
      await open("school");
      await click(".skip-link");
      assert(win.location.hash === "#school", "Skip link preserved route");
      assert(doc.activeElement.id === "main", "Skip link focused content");
      await doc.fonts.ready;
      const external = win.performance
        .getEntriesByType("resource")
        .filter((entry) => new URL(entry.name).origin !== win.location.origin);
      assert(external.length === 0, "No external asset requests");
    },
  );
  await check(
    "Unavailable storage and audio: full activity still completes",
    async () => {
      await new Promise((resolve) => {
        frame.onload = resolve;
        frame.src = "/tests/fallback.html#conversation";
      });
      doc = frame.contentDocument;
      win = frame.contentWindow;
      await wait();
      assert($("#page-heading"), "Fallback rendered");
      await click('[data-action="speak"]');
      for (const q of conversations) {
        await click("#answer-" + q.answer);
        await click("#next");
      }
      assert($("#completion-heading"), "Completed without storage");
      assert(
        text(".completion").includes("No se pudo guardar"),
        "Saving limitation explained",
      );
      await click("#language");
      assert(
        doc.documentElement.lang === "en",
        "Language works without storage",
      );
    },
  );
  for (const width of [320, 375, 768, 1440]) {
    await check(
      `Responsive layout: ${width}px, all eight activities and dashboard`,
      async () => {
        frame.style.width = width + "px";
        frame.style.maxWidth = "none";
        for (const id of ["", ...games.map((g) => g.id)]) {
          await open(id);
          assert(
            doc.documentElement.scrollWidth <= win.innerWidth,
            `${id || "dashboard"}: ${doc.documentElement.scrollWidth} > ${win.innerWidth}`,
          );
        }
      },
    );
  }
  frame.style.width = "1440px";
  await check(
    "Automated WCAG checks in Spanish and English: dashboard plus eight games",
    async () => {
      const violations = [];
      for (const id of ["", ...games.map((g) => g.id)]) {
        await open(id);
        await injectAxe();
        for (let i = 0; i < 2; i++) {
          const audit = await win.axe.run(doc, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
            },
          });
          for (const v of audit.violations)
            violations.push({
              route: id || "dashboard",
              lang: doc.documentElement.lang,
              id: v.id,
              nodes: v.nodes.map((n) => n.target),
            });
          await click("#language");
        }
      }
      assert(!violations.length, JSON.stringify(violations));
    },
  );
  await check(
    "Original nonprofit routes, history, founder profiles and language toggle",
    async () => {
      localStorage.removeItem("fov-lang");
      await new Promise((resolve) => {
        frame.onload = resolve;
        frame.src = "/index.html";
      });
      doc = frame.contentDocument;
      win = frame.contentWindow;
      await wait();
      assert(text(".hero__headline").includes("FINDING"), "Original hero");
      assert($('.hero__btns a[href="playground.html"]'), "New entry point");
      for (const route of [
        "about",
        "programs",
        "voices",
        "resources",
        "team",
      ]) {
        await click(`.nav__links a[data-route="${route}"]`);
        assert(win.location.hash === "#" + route, "Route " + route);
      }
      for (const id of ["gil", "yuli", "emir", "darwing"]) {
        await click(`.team-card[data-route="${id}"]`);
        assert(
          doc.querySelectorAll(".founder-bios p").length === 4,
          "Bio intact",
        );
        await click(".back-btn");
      }
      await click("#lang-toggle");
      assert(doc.documentElement.lang === "es", "Legacy language toggle");
      await click('.nav__links a[data-route="about"]');
      assert(text(".story__body").includes("$10,000"), "History retained");
      await click(".nav__cta");
      assert($("#contact-form"), "Contact form retained");
      for (const page of ["about", "our-work", "get-involved", "contact"]) {
        await new Promise((resolve) => {
          frame.onload = resolve;
          frame.src = "/" + page + ".html";
        });
        doc = frame.contentDocument;
        await wait();
        assert($('nav a[href="playground.html"]'), "Legacy route " + page);
      }
    },
  );
  status.textContent = `DONE — ${passed} passed · ${failed} failed`;
  document.querySelector("#run").disabled = false;
}
if (location.port === "4174") {
  document.querySelector("#run").addEventListener("click", run);
} else {
  document.querySelector("#run").disabled = true;
  status.textContent =
    "Testing is disabled on the preview origin. Run npm run test:browser, then open http://127.0.0.1:4174/tests/browser.html. Preview progress on port 4173 is preserved.";
}

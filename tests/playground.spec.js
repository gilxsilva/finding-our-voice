import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
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
async function open(page, id = "") {
  await page.goto(`/playground.html${id ? "#" + id : ""}`);
  await expect(page.locator("#page-heading")).toBeVisible();
}
async function finish(page) {
  await expect(page.locator("#completion-heading")).toHaveText("¡Lo lograste!");
}
for (const [id, questions] of Object.entries({
  conversation: conversations,
  account: accountQuestions,
  safety: safetyQuestions,
  school: schoolQuestions,
})) {
  test(`${id}: wrong answers can retry; every scenario reaches completion`, async ({
    page,
  }) => {
    await open(page, id);
    for (const q of questions) {
      await page
        .locator(`#answer-${(q.answer + 1) % q.options.length}`)
        .click();
      await expect(page.locator(".feedback.retry")).toBeVisible();
      await expect(page.locator("#next")).toHaveCount(0);
      await page.locator(`#answer-${q.answer}`).click();
      await expect(page.locator(".feedback.success")).toBeVisible();
      await expect(page.locator("#next")).toBeFocused();
      await page.locator("#next").click();
    }
    await finish(page);
    await expect
      .poll(() =>
        page.evaluate(() =>
          JSON.parse(localStorage.getItem("fov-playground-v1")),
        ),
      )
      .toContain(id);
  });
}
test("Match It: incorrect pair, both selection orders, all categories and saved completion", async ({
  page,
}) => {
  await open(page, "match");
  for (const category of ["supplies", "places", "everyday"]) {
    await page.locator("#category").selectOption(category);
    const words = vocabulary.filter((w) => w.category === category);
    await page.locator(`#es-${words[0].id}`).click();
    await page.locator(`#en-${words[1].id}`).click();
    await expect(page.locator(".feedback.retry")).toBeVisible();
    // Changing the Spanish word to match the selected English word fixes the pair.
    await page.locator(`#es-${words[1].id}`).click();
    for (const w of words.filter((w) => w !== words[1])) {
      await page.locator(`#en-${w.id}`).click();
      await page.locator(`#es-${w.id}`).click();
    }
    await expect(page.locator(".match-word.matched")).toHaveCount(12);
  }
  await page.locator("#finish").click();
  await finish(page);
  await page.locator("a.back-link").last().click();
  await expect(page.locator('a[href="#match"] .completed-tag')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('a[href="#match"] .completed-tag')).toHaveCount(1);
});
test("Lotería: classroom mode, invalid marks, correct calls, line win and replay", async ({
  page,
}) => {
  await open(page, "loteria");
  await page.locator("#classroom").check();
  await expect(page.locator(".loteria-board.classroom")).toBeVisible();
  await page.locator(".loteria-card").first().click();
  await expect(page.locator(".feedback.retry")).toBeVisible();
  let draws = 0;
  while ((await page.locator("#finish").count()) === 0) {
    await page.locator("#draw").click();
    draws++;
    const called = (await page.locator(".called-word").innerText()).trim();
    const word = vocabulary.find((v) => v.en === called);
    const wrong = page
      .locator(".loteria-card:not(:disabled)")
      .filter({ hasNot: page.getByText(word.es, { exact: true }) })
      .first();
    if (await wrong.count()) {
      await wrong.click();
      await expect(page.locator(".feedback.retry")).toBeVisible();
    }
    await page
      .locator(".loteria-card")
      .filter({ has: page.getByText(word.es, { exact: true }) })
      .click();
    expect(draws).toBeLessThanOrEqual(9);
  }
  await page.locator("#finish").click();
  await finish(page);
  await page.locator("#replay").click();
  await expect(page.locator(".loteria-card")).toHaveCount(9);
  await expect(page.locator(".marked")).toHaveCount(0);
});
test("sentence building: wrong order, clear, remove, keyboard activation and four completions", async ({
  page,
}) => {
  await open(page, "sentence");
  for (const [step, sentence] of sentences.entries()) {
    if (step === 0) {
      const tokens = sentence.en.split(" ");
      for (const token of [tokens.at(-1), ...tokens.slice(0, -1)]) {
        await page
          .locator(".word-bank button:not(:disabled)")
          .filter({ has: page.getByText(token, { exact: true }) })
          .first()
          .click();
      }
      await page.locator("#check-sentence").click();
      await expect(page.locator(".feedback.retry")).toBeVisible();
      await page.locator("#clear-sentence").click();
    }
    for (const token of sentence.en.split(" ")) {
      const button = page
        .locator(".word-bank button:not(:disabled)")
        .filter({ has: page.getByText(token, { exact: true }) })
        .first();
      await button.focus();
      await page.keyboard.press("Enter");
    }
    await page.locator("#check-sentence").click();
    await expect(page.locator(".feedback.success")).toBeVisible();
    await page.locator("#next").click();
  }
  await finish(page);
});
test("email: actionable field feedback, guided composition and preview with no network send", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (r) => {
    if (r.method() !== "GET") requests.push(r.url());
  });
  await open(page, "email");
  await page.locator("#review-email").click();
  await expect(page.locator(".field-error")).toHaveCount(5);
  await expect(page.locator("#email-recipient")).toBeFocused();
  for (const field of emailFields)
    await page.locator(`#email-${field.id}`).selectOption(String(field.answer));
  await expect(page.locator(".email-preview")).toContainText(
    "Could you help me after class?",
  );
  await page.locator("#review-email").click();
  await expect(page.locator(".feedback.success")).toBeVisible();
  await page.locator("#finish").click();
  await finish(page);
  expect(requests).toEqual([]);
});
test("language and Spanish support switching preserve selected words, choices and draft", async ({
  page,
}) => {
  await open(page, "sentence");
  await page.locator(".word-bank button").first().click();
  const chosen = await page.locator(".sentence-tray").innerText();
  await page.locator("#language").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".sentence-tray")).toHaveText(chosen);
  await page.locator("a.back-link").first().click();
  await page.locator('a[href="#email"].activity-card').click();
  await page.locator("#email-subject").selectOption("1");
  await page.locator("#language").click();
  await expect(page.locator("#email-subject")).toHaveValue("1");
  await page.locator("a.back-link").first().click();
  await page.locator('a[href="#sentence"].activity-card').click();
  await expect(page.locator(".sentence-tray")).toHaveText(chosen);
  await page.goBack();
  await expect(page.locator(".activity-card")).toHaveCount(8);
  await page.goForward();
  await expect(page.locator(".sentence-tray")).toHaveText(chosen);
});
test("dashboard categories, unknown hash, reset cancel/confirm and privacy storage schema", async ({
  page,
}) => {
  await open(page);
  await page.evaluate(() =>
    localStorage.setItem("fov-playground-v1", '["match","email"]'),
  );
  await page.reload();
  await page.locator("#filter-digital").click();
  await expect(page.locator(".activity-card")).toHaveCount(3);
  await page.locator("#filter-school").click();
  await expect(page.locator(".activity-card")).toHaveCount(2);
  await page.locator("#filter-all").click();
  await page.locator("#reset-progress").click();
  await page.locator("#cancel-reset").click();
  await expect(page.locator(".completed-tag")).toHaveCount(2);
  await page.locator("#reset-progress").click();
  await page.locator("#confirm-reset").click();
  await expect(page.locator(".completed-tag")).toHaveCount(0);
  await page.goto("/playground.html#missing");
  await expect(page.locator(".activity-card")).toHaveCount(8);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([
    "fov-playground-v1",
  ]);
});
test("blocked storage and absent speech synthesis still allow play", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
    Object.defineProperty(window, "speechSynthesis", { value: undefined });
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      value: undefined,
    });
  });
  await open(page);
  await expect(page.locator(".notice")).toContainText(
    "guardado no está disponible",
  );
  await page.locator('.activity-card[href="#conversation"]').click();
  await page.locator('[data-action="speak"]').click();
  await page.locator("#answer-0").click();
  await expect(page.locator("#next")).toBeVisible();
});
test("no external requests or runtime errors across Playground routes", async ({
  page,
}) => {
  const errors = [],
    external = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4173/")) external.push(r.url());
  });
  await open(page);
  for (const g of games) {
    await page.locator(`a.activity-card[href="#${g.id}"]`).click();
    await page.locator("a.back-link").first().click();
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
for (const width of [320, 375, 768, 1440]) {
  test(`layout ${width}px: dashboard and every activity fit the viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await open(page);
    for (const route of ["", ...games.map((g) => g.id)]) {
      if (route) await page.goto("/playground.html#" + route);
      await expect(page.locator("#page-heading")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  });
}
test("WCAG automated checks: dashboard and every game in both languages", async ({
  page,
}) => {
  for (const route of ["", ...games.map((g) => g.id)]) {
    await open(page, route);
    for (let i = 0; i < 2; i++) {
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        route,
      ).toEqual([]);
      await page.locator("#language").click();
    }
  }
});
test("screenshots: desktop, mobile and sample activity", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open(page);
  await page.screenshot({
    path: "test-results/screenshots/playground-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/screenshots/playground-mobile.png",
    fullPage: true,
  });
  await page.goto("/playground.html#loteria");
  await page.locator("#draw").click();
  await page.screenshot({
    path: "test-results/screenshots/loteria-mobile.png",
    fullPage: true,
  });
});

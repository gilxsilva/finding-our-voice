import { test, expect } from "@playwright/test";
test("nonprofit navigation, Spanish, founder biographies and history remain available", async ({
  page,
}) => {
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.goto("/index.html");
  await expect(page.locator(".hero__headline")).toContainText("FINDING");
  await expect(
    page.locator('.hero__btns a[href="playground.html"]'),
  ).toBeVisible();
  const routes = ["about", "programs", "voices", "resources", "team"];
  for (const route of routes) {
    await page.locator(`.nav__links a[data-route="${route}"]`).click();
    await expect(page).toHaveURL(new RegExp("#" + route + "$"));
  }
  for (const [id, name] of [
    ["gil", "Gil Silva"],
    ["yuli", "Yuli Zhang"],
    ["emir", "Emir Magdaleno"],
    ["darwing", "Darwing Gonzalez"],
  ]) {
    await page.locator(`.team-card[data-route="${id}"]`).click();
    await expect(page.locator(".founder-hero__name")).toHaveText(name);
    await expect(page.locator(".founder-bios p")).toHaveCount(4);
    await page.locator('[data-route="team"].back-btn').click();
  }
  await page.locator("#lang-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await page.locator('.nav__links [data-route="about"]').click();
  await expect(page.locator(".story__body")).toContainText("$10,000");
  await page.locator(".nav__cta").click();
  await expect(page.locator("#contact-form")).toBeVisible();
  await page.locator('.nav__links a[href="playground.html"]').click();
  await expect(page.locator(".activity-card")).toHaveCount(8);
});
test("existing mobile menu and legacy document routes still open", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/index.html");
  await page.locator("#hamburger").click();
  await expect(page.locator("#hamburger")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.locator('#drawer a[href="playground.html"]').click();
  await expect(page.locator(".activity-card")).toHaveCount(8);
  for (const route of ["about", "our-work", "get-involved", "contact"]) {
    const response = await page.goto(`/${route}.html`);
    expect(response.status()).toBe(200);
    await expect(page.locator('nav a[href="playground.html"]')).toBeVisible();
  }
});

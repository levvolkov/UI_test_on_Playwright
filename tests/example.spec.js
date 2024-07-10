const { test, expect } = require("@playwright/test");
const { email, password, invalidEmail, invalidPassword } = require("../user.js");

test("Successfull authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("h2")).toHaveText("Моё обучение", { timeout: 10000,});
  await page.screenshot({ path: "./screenshots/successfulAuth.png" });
});

test("Unsuccessfull authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(invalidEmail);
  await page.getByPlaceholder("Пароль").fill(invalidPassword);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.locator("text=Вы ввели неправильно логин или пароль")).toBeVisible();
  await page.screenshot({ path: "./screenshots/unsuccessfulAuth.png" });
});
const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, editBlog } = require("./helper");

describe.only("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Kunle Ade",
        username: "kunleade",
        password: "kunledegreat",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
    //   await expect(page.getByText("Blog App, Fullstack Open")).toBeVisible();
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByTestId("loginform");

    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("user can login with correct credentials", async ({ page }) => {
      await loginWith(page, "kunleade", "kunledegreat");

      await expect(page.getByText("Kunle Ade logged in")).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
      await loginWith(page, "kunleade", "wrong");

      const errorDiv = page.locator(".error");

      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
      await expect(errorDiv).toContainText("invalid username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("Kunle Ade logged in")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "kunleade", "kunledegreat");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright Test",
        "http://localhost:5173/blog-created-playwright"
      );

      await expect(
        page.getByText("a blog created by playwright Playwright Test")
      ).toBeVisible();
    });
  });

  describe("When logged in, edit", () => {
    test("a blog can be edited", async ({ page }) => {
      await loginWith(page, "kunleade", "kunledegreat");

      await expect(page.getByText("Kunle Ade logged in")).toBeVisible();

      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright Test",
        "http://localhost:5173/blog-created-playwright"
      );

      await expect(
        page.getByText("a blog created by playwright Playwright Test")
      ).toBeVisible();

      await editBlog(
        page,
        "a blog re-edited by playwright",
        "Playwright Test",
        "http://localhost:5173/blog-re-edited-playwright"
      );

      await expect(
        page.getByText("a blog re-edited by playwright Playwright Test")
      ).toBeVisible();
    });
  });

  describe("When logged in, delete", () => {
    test("a blog can be deleted", async ({ page }) => {
      await loginWith(page, "kunleade", "kunledegreat");

      await expect(page.getByText("Kunle Ade logged in")).toBeVisible();

      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright Test",
        "http://localhost:5173/blog-created-playwright"
      );

      await expect(
        page.getByText("a blog created by playwright Playwright Test")
      ).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("remove")).toBeVisible();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();

      await page.goto("/");
    });
  });

  describe.only("When logged in, sort", () => {
    test("blogs can be sorted", async ({ page }) => {
      await loginWith(page, "kunleade", "kunledegreat");

      await expect(page.getByText("Kunle Ade logged in")).toBeVisible();

      await createBlog(
        page,
        "a blog created by playwright",
        "Test Playwright",
        "http://localhost:5173/blog-created-playwright"
      );
      await createBlog(
        page,
        "another blog created by playwright",
        "Playwright Test",
        "http://localhost:5173/blog-created-playwright"
      );

      await expect(
        page.getByText("a blog created by playwright Test Playwright")
      ).toBeVisible();
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("likes")).toBeVisible();

      for (let i = 0; i < 3; i++) {
        await page.getByTestId("likes-count-0").click();
      }

      await expect(
        page.getByText("another blog created by playwright Playwright Test")
      ).toBeVisible();
      await page.getByRole("button", { name: "view" }).click();
      // await expect(page.getByText("likes 0")).toBeVisible();

      for (let i = 0; i < 7; i++) {
        await page.getByTestId("likes-count-1").click();
      }

      await page.getByRole("button", { name: "sort" }).click();

      await expect(page.getByText("sorted")).toBeVisible();
    });
  });
});

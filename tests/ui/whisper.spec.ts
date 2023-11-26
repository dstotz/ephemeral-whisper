import { test, expect } from "@playwright/test";
import {
  createWhisperAction,
  createWhisperRecord,
  getWhisperRecord,
  updateWhisperRecord,
} from "../helpers/whisper";
import { Whisper } from "@prisma/client";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Create", () => {
  let content = "Hello World";

  test("Should create new whisper", async ({ page }) => {
    const newWhisperId = await createWhisperAction(page, content);
    expect(newWhisperId).not.toBeNull();
  });
});

test.describe("View", () => {
  let whisper: Whisper | null = null;

  test.afterEach(() => {
    whisper = null;
  });

  test.describe("Delete on open", () => {
    test.describe("When true", () => {
      test.beforeEach(async () => {
        whisper = await createWhisperRecord({ deleteOnOpen: true });
      });

      test("it should be deleted on open", async ({ page }) => {
        await page.goto(`/whisper/${whisper!.id}/view`, {
          waitUntil: "domcontentloaded",
        });
        const dbRecord = await getWhisperRecord(whisper!.id);
        expect(dbRecord).toBeNull();
      });

      test("it should show delete warning page", async ({ page }) => {
        await page.goto(`/whisper/${whisper!.id}`);
        expect(page.url().endsWith("/warn")).toBe(true);
      });

      test.describe("When show delete warning is set to false", () => {
        test("it should not show delete warning", async ({ page }) => {
          whisper = await updateWhisperRecord(whisper!.id, {
            showDeleteOnReadWarning: false,
          });
          await page.goto(`/whisper/${whisper!.id}`, {
            waitUntil: "domcontentloaded",
          });
          expect(page.url().endsWith("/view")).toBe(true);
        });
      });
    });

    test.describe("When false", () => {
      test.beforeEach(async () => {
        whisper = await createWhisperRecord({ deleteOnOpen: false });
      });

      test("it should not be deleted on open", async ({ page }) => {
        await page.goto(`/whisper/${whisper!.id}/view`, {
          waitUntil: "domcontentloaded",
        });
        const dbRecord = await getWhisperRecord(whisper!.id);
        expect(dbRecord).toEqual(whisper);
      });

      test("it should not show delete warning page", async ({ page }) => {
        await page.goto(`/whisper/${whisper!.id}`, {
          waitUntil: "domcontentloaded",
        });
        expect(page.url().endsWith("/view")).toBe(true);
      });
    });
  });

  test.describe("When whisper is expired", () => {
    test("it should delete the whisper instead of showing it", async ({
      page,
    }) => {
      whisper = await createWhisperRecord({
        deleteAt: new Date(new Date().getTime() - 1000 * 60 * 60),
      });
      await page.goto(`/whisper/${whisper!.id}/view`);
      await expect(
        page.getByRole("heading", { name: "Whisper not found" })
      ).toBeVisible();
      const dbRecord = await getWhisperRecord(whisper!.id);
      expect(dbRecord).toBeNull();
    });
  });
});

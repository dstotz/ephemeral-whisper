import { test, expect } from "@playwright/test";
import { createWhisperRecord, getWhisperRecord } from "../helpers/whisper";

test.describe("API", () => {
  test.describe("purge-expired-whispers", () => {
    test("it should delete expired whispers", async ({ request }) => {
      const expiredWhisper = await createWhisperRecord({
        deleteAt: new Date(new Date().getTime() - 1000 * 60 * 60),
      });
      const activeWhisper = await createWhisperRecord({
        deleteAt: new Date(new Date().getTime() + 1000 * 60 * 60),
      });
      const response = await request.get("/api/purge-expired-whispers");
      expect(response.status()).toBe(200);
      const expiredDbRecord = await getWhisperRecord(expiredWhisper.id);
      expect(expiredDbRecord).toBeNull();
      const activeDbRecord = await getWhisperRecord(activeWhisper.id);
      expect(activeDbRecord).toEqual(activeWhisper);
    });
  });
});

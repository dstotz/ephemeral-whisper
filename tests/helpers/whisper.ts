import { Page } from "@playwright/test";
import db from "@/lib/db";
import { Prisma, Whisper } from "@prisma/client";
import { encryptString } from "@/lib/encryption/client";

export const createWhisperAction = async (
  page: Page,
  content: string
): Promise<string | undefined> => {
  const whisperInput = page.getByTestId("whisper-input");
  await whisperInput.fill(content);

  const createWhisperPromise = page.waitForResponse("/");
  await page.getByRole("button", { name: "Create Whisper" }).click();
  await createWhisperPromise;

  return await getWhisperIdFromUrl(page);
};

export const getWhisperIdFromUrl = async (
  page: Page
): Promise<string | undefined> => {
  await page.url().includes("/whisper/");
  const url = await page.url();
  const whisperId = url.split("/").pop();
  return whisperId;
};

export const createWhisperRecord = async (data: Partial<Whisper>) => {
  const futureTime = new Date(new Date().getTime() + 1000 * 60 * 60);

  const defaultData: Prisma.WhisperCreateArgs["data"] = {
    data: "Hello World",
    deleteAt: futureTime,
  };

  const whisperData = { ...defaultData, ...data };
  whisperData.data = encryptString(whisperData.data);

  return await db.whisper.create({ data: whisperData });
};

export const getWhisperRecord = async (id: string) => {
  return await db.whisper.findFirst({ where: { id } });
};

export const updateWhisperRecord = async (
  id: string,
  data: Partial<Whisper>
) => {
  return await db.whisper.update({ where: { id }, data });
};

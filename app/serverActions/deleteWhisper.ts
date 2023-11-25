"use server";

import db from "@/lib/db";

export const deleteWhisperServerAction = async (
  whisperId: string
): Promise<void> => {
  const deleted = await db.whisper.delete({ where: { id: whisperId } });

  if (!deleted) {
    throw new Error("Failed to delete whisper");
  }
};

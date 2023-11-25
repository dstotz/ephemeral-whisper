"use server";

import db from "@/lib/db";
import { decryptString } from "@/lib/encryption/server";
import { Whisper } from "@prisma/client";
import { deleteWhisperServerAction } from "./deleteWhisper";

export const readWhisperServerAction = async (
  whisperId: string
): Promise<Whisper | null> => {
  let whisper = await db.whisper.findFirst({
    where: { id: whisperId },
  });

  // Delete whisper if it's expired
  if (whisper?.deleteAt && whisper.deleteAt <= new Date()) {
    deleteWhisperServerAction(whisperId);
    whisper = null;
  }

  // Decrypt whisper data
  if (whisper) {
    whisper.data = decryptString(whisper.data);
  }

  return whisper;
};

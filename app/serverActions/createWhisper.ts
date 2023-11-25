"use server";

import db from "@/lib/db";
import { CreateWhisperOpts } from "@/types/whisper";
import { Whisper } from "@prisma/client";

export const createWhisperServerAction = async (
  encryptedData: string,
  opts: CreateWhisperOpts
): Promise<Whisper> => {
  let deleteAt = opts.deleteAt;
  delete opts.deleteAt;

  // Default date to now + 30 days
  if (!deleteAt) {
    const deafultDate = new Date();
    deafultDate.setDate(deafultDate.getDate() + 30);
    deleteAt = deafultDate;
  }

  return await db.whisper.create({
    data: {
      data: encryptedData,
      deleteAt,
      ...opts,
    },
  });
};

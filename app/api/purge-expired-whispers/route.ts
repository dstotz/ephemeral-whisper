import { type NextRequest } from "next/server";
import db from "@/lib/db";

let locked = false;

export async function GET(_request: NextRequest) {
  if (locked) {
    return new Response("Locked", { status: 423 });
  } else {
    locked = true;
  }

  try {
    const { count } = await db.whisper.deleteMany({
      where: {
        deleteAt: {
          lte: new Date(),
        },
      },
    });
    console.log(`Deleted ${count} expired whispers`);
  } finally {
    locked = false;
  }

  return new Response("OK");
}

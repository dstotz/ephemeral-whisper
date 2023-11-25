"use server";

import { createDecipheriv, privateDecrypt } from "crypto";
import { encryptedSymmetricKey, ivBuffer } from "./client";

const encrptionPassphrase = process.env.ENCRYPTION_PASSPHRASE;
const privateKey = Buffer.from(process.env.PRIVATE_KEY_BASE64, "base64");

const decryptedSymmetricKey = privateDecrypt(
  { key: privateKey, passphrase: encrptionPassphrase },
  encryptedSymmetricKey
);

export const decryptString = (encryptedText: string) => {
  const decipher = createDecipheriv(
    "aes-256-cbc",
    decryptedSymmetricKey,
    ivBuffer
  );
  let decryptedText = decipher.update(encryptedText, "base64", "utf8");
  decryptedText += decipher.final("utf8");
  return decryptedText;
};

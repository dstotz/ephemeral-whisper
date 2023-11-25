import { createCipheriv, publicEncrypt } from "crypto";

const publicKey = Buffer.from(
  process.env.NEXT_PUBLIC_CLIENT_PUBLIC_KEY_BASE64,
  "base64"
);
const symmetricKey = Buffer.from(
  process.env.NEXT_PUBLIC_SYMETRIC_KEY_BASE64,
  "base64"
);

export const encryptedSymmetricKey = publicEncrypt(publicKey, symmetricKey);
export const ivBuffer = Buffer.from(
  process.env.NEXT_PUBLIC_IV_BASE64,
  "base64"
);

export const encryptString = (text: string) => {
  const cipher = createCipheriv("aes-256-cbc", symmetricKey, ivBuffer);
  let encryptedText = cipher.update(text, "utf8", "base64");
  encryptedText += cipher.final("base64");
  return encryptedText;
};

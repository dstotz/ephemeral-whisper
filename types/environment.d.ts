declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server env vars
      DATABASE_URL: string;
      ENCRYPTION_PASSPHRASE: string;
      SYMETRIC_KEY_BASE64: string;
      PRIVATE_KEY_BASE64: string;
      PUBLIC_KEY_BASE64: string;
      IV_BASE64: string;
      // Client env vars
      NEXT_PUBLIC_CLIENT_PUBLIC_KEY_BASE64: string;
      NEXT_PUBLIC_IV_BASE64: string;
      NEXT_PUBLIC_SYMETRIC_KEY_BASE64: string;
    }
  }
}

export {};

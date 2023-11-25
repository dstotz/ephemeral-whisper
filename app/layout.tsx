import { Metadata } from "next";
import { AppLayout } from "./components/AppLayout";

import "./index.css";
import "@radix-ui/themes/styles.css";

export const metadata: Metadata = {
  title: "Ephemeral Whisper",
  description: "A simple, secure, ephemeral note sharing service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

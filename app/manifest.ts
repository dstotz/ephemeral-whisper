import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ephemeral Whisper",
    short_name: "Ephemeral Whisper",
    description: "A simple, secure, ephemeral note sharing service",
    start_url: "/whisper",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

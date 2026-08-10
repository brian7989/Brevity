import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Brevity",
    short_name: "Brevity",
    description: "A daily game for writing with clarity and brevity.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f1e9",
    theme_color: "#f4f1e9",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/brevity-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/brevity-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/brevity-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

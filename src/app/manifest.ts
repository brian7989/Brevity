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
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

import { APP_DESCRIPTION, APP_SHORT_TITLE, THEME_COLOR } from "./meta";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_SHORT_TITLE,
    theme_color: THEME_COLOR,
    background_color: THEME_COLOR,
    description: APP_DESCRIPTION,
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        purpose: "any",
      },
    ],
    start_url: "/dashboard",
    display: "standalone",
    screenshots: [
      {
        src: "/ogp.webp",
        sizes: "1366x768",
        type: "image/png",
      },
    ],
  };
}

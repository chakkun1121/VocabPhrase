import {
  APP_DESCRIPTION,
  APP_SHORT_TITLE,
  APP_TITLE,
  THEME_COLOR,
} from "./meta";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_TITLE,
    short_name: APP_SHORT_TITLE,
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
    start_url: "/app",
    display: "standalone",
    screenshots: [
      {
        src: "/ogp.png",
        sizes: "1366x768",
        type: "image/png",
      },
    ],
  };
}

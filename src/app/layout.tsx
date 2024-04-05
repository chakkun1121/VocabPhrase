import { Metadata, Viewport } from "next";
import {
  APP_URL,
  APP_SHORT_TITLE,
  AUTHOR_NAME,
  APP_DESCRIPTION,
  APP_TITLE,
  THEME_COLOR,
  GOOGLE_VERIFICATION,
} from "./meta";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_SHORT_TITLE} | ${AUTHOR_NAME}`,
    template: `%s | ${APP_SHORT_TITLE} | ${AUTHOR_NAME}`,
  },
  description: APP_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  authors: [
    {
      name: AUTHOR_NAME,
      url: "chakkun1121.github.io",
    },
  ],
  openGraph: {
    type: "website",
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_SHORT_TITLE,
    images: [
      {
        url: "https://vocab-phrase.vercel.app/ogp.webp",
        width: 1200,
        height: 630,
        alt: "VocabPhrase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@chakkun1121",
    creator: "@chakkun1121",
    images: "https://vocab-phrase.vercel.app/ogp.webp",
  },
  verification: {
    google: GOOGLE_VERIFICATION,
  },
};
export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

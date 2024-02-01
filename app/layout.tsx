import type { Metadata, Viewport } from "next";
import "./globals.css";
import RecoilProvider from "@/app/_components/recoil";
import NextAuthProvider from "./providers/NextAuth";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  APP_DESCRIPTION,
  APP_SHORT_TITLE,
  APP_TITLE,
  APP_URL,
  AUTHOR_NAME,
  THEME_COLOR,
} from "./meta";
import HelpKeyShortCut from "./_components/helpKeyShortCut";

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
        url: "https://vocab-phrase.vercel.app/ogp.png",
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
    images: "https://vocab-phrase.vercel.app/ogp.png",
  },
  verification: {
    google: "FhajSGsTRj5nzX9KNqpV8Q0VCWzLMQ1sgjscBh4umlw",
  },
};
export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-MNPB0JEZCF" />
      )}
      <NextAuthProvider>
        <RecoilProvider>
          <HelpKeyShortCut />
          <body>{children}</body>
        </RecoilProvider>
      </NextAuthProvider>
    </html>
  );
}

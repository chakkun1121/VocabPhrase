import type { Metadata, Viewport } from "next";
import "./globals.css";
import RecoilProvider from "@/app/_components/recoil";
import NextAuthProvider from "./providers/NextAuth";
import { GoogleAnalytics } from "@next/third-parties/google";
const title = "英文、英単語専用のweb単語帳アプリ VocabPhrase";
const description = "英文、英単語専用のweb単語帳アプリ VocabPhrase です。";
const url = "https://vocab-phrase.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "VocabPhrase | chakkun1121",
    template: "%s | VocabPhrase | chakkun1121",
  },
  description,
  alternates: {
    canonical: "/",
  },
  authors: [
    {
      name: "chakkun1121",
      url: "chakkun1121.github.io",
    },
  ],
  openGraph: {
    type: "website",
    title,
    description,
    url,
    siteName: "VocabPhrase",
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
  themeColor: "#327eba",
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
          <body className="min-h-screen">{children}</body>
        </RecoilProvider>
      </NextAuthProvider>
    </html>
  );
}

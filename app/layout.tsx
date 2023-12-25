import type { Metadata } from "next";
import "./globals.css";
import RecoilProvider from "@/app/_components/recoil";
import NextAuthProvider from "./providers/NextAuth";

export const metadata: Metadata = {
  metadataBase: new URL("https://vocab-phrase.vercel.app"),
  title: {
    default: "VocabPhrase | chakkun1121",
    template: "%s | VocabPhrase | chakkun1121",
  },
  description: "VocabPhrase",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <NextAuthProvider>
        <RecoilProvider>
          <body className="min-h-screen">{children}</body>
        </RecoilProvider>
      </NextAuthProvider>
    </html>
  );
}

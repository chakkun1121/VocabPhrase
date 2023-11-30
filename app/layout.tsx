import type { Metadata } from "next";
import "./globals.css";
import RecoilProvider from "@/app/_components/recoil";

export const metadata: Metadata = {
  title: "VocabPhrase",
  description: "VocabPhrase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <RecoilProvider>
        <body>{children}</body>
      </RecoilProvider>
    </html>
  );
}

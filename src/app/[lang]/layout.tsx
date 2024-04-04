import { dir } from "i18next";
import type { Metadata, Viewport } from "next";
import "../globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import HelpKeyShortCut from "../../components/functional/helpKeyShortCut";
import RecoilProvider from "@/components/providers/recoil";
import NextAuthProvider from "@/components/providers/NextAuth";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GOOGLE_ANALYTICS_ID } from "../meta";
const languages = ["en", "ja"];
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang} dir={dir(lang)} className={notoSansJP.className}>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
      )}
      <NextAuthProvider>
        <RecoilProvider>
          <HelpKeyShortCut />
          <body className="select-none print:hidden">
            {children}
            <Toaster />
          </body>
        </RecoilProvider>
      </NextAuthProvider>
    </html>
  );
}
export async function generateStaticParams() {
  return languages.map(lang => ({ lang }));
}

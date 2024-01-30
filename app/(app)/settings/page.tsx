import { Metadata } from "next";
import Settings from "./main";

export default function Page() {
  return <Settings />;
}
export const metadata: Metadata = {
  title: "設定",
  description: "VocabPhraseの設定ページです。",
  robots: "noindex",
};

import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Settings from "./main";

export default async function Page() {
  const session = await getServerSession();
  if (!session) redirect("/login?redirectTo=/settings");
  return <Settings />;
}
export const metadata: Metadata = {
  title: "設定",
  description: "VocabPhraseの設定ページです。",
  robots: "noindex",
};

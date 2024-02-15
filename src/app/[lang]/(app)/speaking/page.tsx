import Header from "@/components/layouts/header";
import { redirect } from "next/navigation";
import SpeakingHome from "./home";
import { Metadata } from "next";

export default function Speaking({
  params: { lang },
  searchParams: { fileId },
}: {
  params: { lang: string };
  searchParams: { fileId: string };
}) {
  if (!fileId) redirect("/app");
  return (
    <>
      <Header />
      <SpeakingHome fileId={fileId} />
    </>
  );
}
export const metadata: Metadata = {
  title: "スピーキング練習ページ",
};

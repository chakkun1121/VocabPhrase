import { redirect } from "next/navigation";
import Speaking from "./main";
import { speakingMode } from "../menu";

export default function Page({
  params: { lang, mode },
  searchParams: { fileId },
}: {
  params: { lang: "ja" | "en"; mode: string };
  searchParams: { fileId: string };
}) {
  if (!fileId || !speakingMode.find((m) => m.id === mode))
    redirect("./speaking");

  return <Speaking fileId={fileId} mode={mode} lang={lang} />;
}
